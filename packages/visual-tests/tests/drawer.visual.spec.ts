import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Drawer component
 */

const DRAWER_STORY_URL = '/iframe.html?id=overlays-drawer--';

test.describe('Drawer Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('drawer from right renders correctly', async ({ page }) => {
    await page.goto(`${DRAWER_STORY_URL}default`);

    // Click trigger to open drawer
    const trigger = page.locator('button').first();
    await trigger.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('drawer-right.png', {
      fullPage: true,
    });
  });

  test('drawer from left renders correctly', async ({ page }) => {
    await page.goto(`${DRAWER_STORY_URL}left`);

    const trigger = page.locator('button').first();
    await trigger.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('drawer-left.png', {
      fullPage: true,
    });
  });

  test('drawer from top renders correctly', async ({ page }) => {
    await page.goto(`${DRAWER_STORY_URL}top`);

    const trigger = page.locator('button').first();
    await trigger.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('drawer-top.png', {
      fullPage: true,
    });
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${DRAWER_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const trigger = page.locator('button').first();
    await trigger.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('drawer-dark-theme.png', {
      fullPage: true,
    });
  });
});
