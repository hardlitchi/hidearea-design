import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Tooltip component
 * Tests various placements and variants
 */

const TOOLTIP_STORY_URL = '/iframe.html?id=overlays-tooltip--';

test.describe('Tooltip Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default tooltip renders correctly', async ({ page }) => {
    await page.goto(`${TOOLTIP_STORY_URL}default`);

    const trigger = page.locator('button');
    await expect(trigger).toBeVisible();

    // Hover to show tooltip
    await trigger.hover();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('tooltip-default.png', {
      fullPage: true,
    });
  });

  test('top placement renders correctly', async ({ page }) => {
    await page.goto(`${TOOLTIP_STORY_URL}placements`);

    const trigger = page.locator('button').first();
    await expect(trigger).toBeVisible();

    await trigger.hover();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('tooltip-top.png', {
      fullPage: true,
    });
  });

  test('info variant renders correctly', async ({ page }) => {
    await page.goto(`${TOOLTIP_STORY_URL}variants`);

    const trigger = page.locator('button').first();
    await expect(trigger).toBeVisible();

    await trigger.hover();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('tooltip-info.png', {
      fullPage: true,
    });
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${TOOLTIP_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const trigger = page.locator('button');
    await expect(trigger).toBeVisible();

    await trigger.hover();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('tooltip-dark-theme.png', {
      fullPage: true,
    });
  });
});
