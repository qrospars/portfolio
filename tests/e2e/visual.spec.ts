import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => sessionStorage.setItem('quentin-rivers-seed', 'visual-regression'));
});

test('homepage hero', async ({ page }) => {
  await page.goto('/portfolio/');
  await expect(page.locator('[data-rivers-hero]')).toHaveScreenshot('homepage-hero.png', { animations: 'disabled' });
});

test('work index', async ({ page }) => {
  await page.goto('/portfolio/work/');
  await expect(page.locator('[data-work-index]')).toHaveScreenshot('work-index.png', { animations: 'disabled' });
});

test('case-study template', async ({ page }) => {
  await page.goto('/portfolio/work/artelia/');
  await expect(page.locator('.case-study__header')).toHaveScreenshot('case-study-header.png', { animations: 'disabled' });
});

test('series template', async ({ page }) => {
  await page.goto('/portfolio/work/my-universe/');
  await expect(page.locator('.series-page__header')).toHaveScreenshot('series-header.png', { animations: 'disabled' });
});

test('living styleguide', async ({ page }) => {
  await page.goto('/portfolio/styleguide/');
  await expect(page.locator('.styleguide-hero')).toHaveScreenshot('styleguide-hero.png', { animations: 'disabled' });
});
