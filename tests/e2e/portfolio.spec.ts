import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '/portfolio/',
  '/portfolio/work/',
  '/portfolio/work/artelia/',
  '/portfolio/work/my-universe/',
  '/portfolio/about/',
  '/portfolio/contact/',
];

test.describe('portfolio', () => {
  test('publishes the editorial work architecture and complete dated Path', async ({ page }) => {
    await page.goto('/portfolio/');
    await expect(page.getByRole('heading', { level: 1, name: /Hi, I'm Quentin/ })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Selected work' })).toBeVisible();
    await expect(page.locator('[data-path-timeline]')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 2, name: 'A path, not a ladder.' })).toBeVisible();
    await expect(page.locator('[data-event-dot]')).toHaveCount(16);
    await expect(page.locator('[data-path-lane-label]')).toHaveCount(10);
  });

  test('uses one primary navigation and a compact balanced cross-section', async ({ page }, testInfo) => {
    await page.goto('/portfolio/');

    await expect(page.locator('[data-nav][aria-label="Primary"]')).toHaveCount(1);
    if (testInfo.project.name !== 'mobile') {
      await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    }
    await expect(page.locator('.rivers-hero__nav')).toHaveCount(0);
    await expect(page.locator('.cross-card')).toHaveCount(2);
    await expect(page.locator('.cross-card')).toContainText([
      'Rebuilding a Consultancy Website in 15 Days',
      'KPI Frameworks for UX Optimisations',
    ]);
    await expect(page.getByRole('link', { name: 'View all work' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Browse the archive by project' })).toHaveAttribute('href', '/portfolio/work/');

    const selectedImages = page.locator('.cross-card__media img');
    await expect(selectedImages).toHaveCount(2);
    for (const image of await selectedImages.all()) {
      const box = await image.boundingBox();
      expect((box?.width ?? 0) / (box?.height ?? 1)).toBeCloseTo(16 / 9, 1);
    }

    if (testInfo.project.name !== 'mobile') {
      const viewport = page.viewportSize();
      const selectedWork = await page.locator('#selected-work').boundingBox();
      expect(selectedWork?.height).toBeLessThanOrEqual((viewport?.height ?? 0) + 1);
    }
  });

  test('scrubs one active Path event while its discipline rail stays fixed', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium');
    await page.goto('/portfolio/');
    const stage = page.locator('[data-path-stage]');
    await stage.scrollIntoViewIfNeeded();
    await expect(page.locator('[data-path-timeline]')).toHaveClass(/is-desktop/);
    await expect(stage).toBeVisible();

    const canvasWidth = await page.locator('[data-path-canvas]').evaluate((element) => element.getBoundingClientRect().width);
    const dotCoordinates = await page.locator('[data-event-dot] .path__dot').evaluateAll((dots) => (
      dots.map((dot) => Number(dot.getAttribute('cx')))
    ));
    expect(canvasWidth).toBeGreaterThan(6000);
    expect(Math.min(...dotCoordinates.slice(1).map((x, index) => x - (dotCoordinates[index] ?? 0)))).toBeGreaterThanOrEqual(575);

    const railBefore = await page.locator('[data-path-rail]').boundingBox();
    const stageBox = await stage.boundingBox();
    expect(stageBox).not.toBeNull();
    await page.mouse.move((stageBox?.x ?? 0) + (stageBox?.width ?? 0) * 0.72, (stageBox?.y ?? 0) + 420);
    await expect(page.locator('[data-path-timeline]')).toHaveClass(/has-pointer/);
    await expect(page.locator('[data-event-card]:visible')).toHaveCount(1);
    await expect(page.locator('[data-path-lane-label].is-active')).toHaveCount(1);

    const firstActiveTitle = await page.locator('[data-event-card]:visible h3').innerText();
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(150);
    const railAfter = await page.locator('[data-path-rail]').boundingBox();
    const secondActiveTitle = await page.locator('[data-event-card]:visible h3').innerText();
    expect(Math.abs((railAfter?.x ?? 0) - (railBefore?.x ?? 0))).toBeLessThan(1);
    expect(firstActiveTitle).not.toBe(secondActiveTitle);
  });

  test('supports keyboard traversal across Path dots', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium');
    await page.goto('/portfolio/');
    await page.locator('[data-path-stage]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-path-timeline]')).toHaveClass(/is-desktop/);
    const firstDot = page.locator('[data-event-dot]').first();
    await firstDot.focus();
    await expect(page.locator('[data-event-card]:visible h3')).toHaveText('Designs & Concept Art');
    await firstDot.press('ArrowRight');
    await expect(page.locator('[data-event-card]:visible h3')).toHaveText('Muscle Fibers Finder');
    await expect(page.locator('[data-path-lane-label="aiAgents"]')).toHaveClass(/is-active/);
  });

  test('supports work browsing, deep links, and browser history', async ({ page }) => {
    await page.goto('/portfolio/work/');
    await expect(page.getByRole('heading', { level: 2, name: 'Case studies' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Visual series' })).toBeVisible();
    const firstWork = page.getByRole('link', { name: /Maritime Traffic Tool/ });
    await firstWork.focus();
    await expect(page.locator('[data-work-preview="artelia"]')).toHaveClass(/is-active/);
    await firstWork.click();
    await expect(page).toHaveURL(/\/work\/artelia\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Maritime Traffic Tool' })).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/work\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Work' })).toBeVisible();
  });

  test('loads published routes directly with base-safe canonicals and a no-index 404', async ({ page }) => {
    const routes = [
      ['/portfolio/', "Hi, I'm Quentin", 'https://qrospars.github.io/portfolio/'],
      ['/portfolio/work/', 'Work', 'https://qrospars.github.io/portfolio/work/'],
      ['/portfolio/work/artelia/', 'Maritime Traffic Tool', 'https://qrospars.github.io/portfolio/work/artelia/'],
      ['/portfolio/work/rebuilding-consultancy-website/', 'Rebuilding a Consultancy Website in 15 Days', 'https://qrospars.github.io/portfolio/work/rebuilding-consultancy-website/'],
      ['/portfolio/work/my-universe/#dashboard-design', 'My Universe', 'https://qrospars.github.io/portfolio/work/my-universe/'],
      ['/portfolio/about/', "Hi, I'm Quentin", 'https://qrospars.github.io/portfolio/about/'],
      ['/portfolio/contact/', 'Contact', 'https://qrospars.github.io/portfolio/contact/'],
    ] as const;

    for (const [path, heading, canonical] of routes) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    }

    await page.goto('/portfolio/does-not-exist/');
    await expect(page.getByRole('heading', { level: 1, name: 'This path ends here.' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  });

  test('opens a visual piece at its shareable series anchor', async ({ page }) => {
    await page.goto('/portfolio/work/my-universe/#dashboard-design');
    await expect(page.locator('#dashboard-design')).toBeVisible();
  });

  test('keeps base-aware primary navigation and route focus predictable', async ({ page }) => {
    await page.goto('/portfolio/work/my-universe/#dashboard-design');
    const primaryNavigation = page.locator('[data-nav]');
    await expect(primaryNavigation.locator('a').filter({ hasText: /^Work$/ })).toHaveAttribute('aria-current', 'page');
    await expect(primaryNavigation.locator('a').filter({ hasText: /^Home$/ })).not.toHaveAttribute('aria-current', 'page');
    await primaryNavigation.getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL(/\/portfolio\/work\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Work' })).toBeFocused();
  });

  test('opens the mobile navigation with an accessible state', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile');
    await page.goto('/portfolio/');
    const menu = page.getByRole('button', { name: 'Menu' });
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  });

  test('uses a persistent, route-based Contact path without duplicated About copy', async ({ page }) => {
    await page.goto('/portfolio/about/');
    await expect(page.locator('main')).not.toContainText("If you think I am someone interesting to talk to, don't hesitate");
    const header = page.locator('[data-header]');
    await expect(header).toHaveCSS('position', 'fixed');
    await page.evaluate(() => window.scrollTo(0, 120));
    await expect(header).toHaveAttribute('data-scrolled', '');

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/portfolio\/contact\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible();
    await expect(page.getByRole('link', { name: /rospars\.quentin@outlook\.com/ })).toHaveAttribute('href', 'mailto:rospars.quentin@outlook.com');
  });

  test('uses editorial actions instead of rounded pills', async ({ page }) => {
    await page.goto('/portfolio/');
    const aboutAction = page.getByRole('link', { name: 'More about me' });
    await expect(aboutAction).toHaveCSS('border-radius', '0px');
    await expect(aboutAction).toHaveCSS('border-top-width', '0px');
  });

  test('uses a single-expand vertical Path on mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile');
    await page.goto('/portfolio/');
    await expect(page.locator('[data-path-stage]')).toBeHidden();
    await expect(page.locator('[data-vertical-panel]:visible')).toHaveCount(1);
    const maritimeTrigger = page.getByRole('button', { name: /Maritime Traffic Tool/ });
    await maritimeTrigger.click();
    await expect(maritimeTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('[data-vertical-panel]:visible')).toHaveCount(1);
    await expect(page.locator('[data-vertical-event].is-active')).toContainText('Maritime Traffic Tool');
  });

  for (const path of pages) {
    test(`has no serious automated accessibility violations on ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
      expect(serious).toEqual([]);
    });
  }

  test('keeps core content available without JavaScript', async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium');
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/portfolio/work/');
    await expect(page.getByRole('heading', { level: 1, name: 'Work' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Maritime Traffic Tool/ })).toBeVisible();
    await page.goto('/portfolio/');
    await expect(page.getByRole('heading', { level: 2, name: 'A path, not a ladder.' })).toBeVisible();
    await expect(page.locator('[data-vertical-panel]')).toHaveCount(16);
    await expect(page.locator('[data-vertical-event]').filter({ hasText: 'Designs & Concept Art' })).toBeVisible();
    await context.close();
  });

  test('provides a static hero for reduced motion and canvas failure', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: unknown[]) {
        if (this.hasAttribute('data-rivers-canvas')) return null;
        return Reflect.apply(original, this, args);
      } as typeof original;
    });
    await page.goto('/portfolio/');
    await expect(page.getByRole('heading', { level: 1, name: /Hi, I'm Quentin/ })).toBeVisible();
    await expect(page.locator('[data-rivers-canvas]')).not.toHaveCSS('background-image', 'none');
    await expect(page.locator('[data-path-stage]')).toBeHidden();
    await expect(page.locator('[data-vertical-panel]:visible')).toHaveCount(1);
  });
});
