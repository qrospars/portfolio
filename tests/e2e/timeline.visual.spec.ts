import { expect, test } from '@playwright/test';

test('desktop Path start and active cursor', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.goto('/portfolio/');
  const stage = page.locator('[data-path-stage]');
  await stage.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const box = await stage.boundingBox();
  await page.mouse.move((box?.x ?? 0) + (box?.width ?? 0) * 0.72, (box?.y ?? 0) + 400);
  await expect(stage).toHaveScreenshot('timeline-desktop-start.png', { animations: 'disabled' });

  await page.mouse.wheel(0, 2600);
  await page.waitForTimeout(200);
  await expect(stage).toHaveScreenshot('timeline-desktop-middle.png', { animations: 'disabled' });
});

test('mobile Path fallback', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile');
  await page.goto('/portfolio/');
  const timeline = page.locator('[data-path-timeline]');
  await timeline.scrollIntoViewIfNeeded();
  await expect(timeline).toHaveScreenshot('timeline-mobile.png', { animations: 'disabled' });
});
