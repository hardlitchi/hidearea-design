import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for ColorPicker component
 * Tests various states and formats
 */

const COLORPICKER_STORY_URL = '/iframe.html?id=forms-colorpicker--';

test.describe('ColorPicker Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default colorpicker renders correctly', async ({ page }) => {
    await page.goto(`${COLORPICKER_STORY_URL}default`);

    const colorpicker = page.locator('ha-colorpicker');
    await expect(colorpicker).toBeVisible();

    await expect(page).toHaveScreenshot('colorpicker-default.png');
  });

  test('with value renders correctly', async ({ page }) => {
    await page.goto(`${COLORPICKER_STORY_URL}with-value`);

    const colorpicker = page.locator('ha-colorpicker');
    await expect(colorpicker).toBeVisible();

    await expect(page).toHaveScreenshot('colorpicker-with-value.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${COLORPICKER_STORY_URL}disabled`);

    const colorpicker = page.locator('ha-colorpicker');
    await expect(colorpicker).toBeVisible();

    await expect(page).toHaveScreenshot('colorpicker-disabled.png');
  });

  test('with alpha channel renders correctly', async ({ page }) => {
    await page.goto(`${COLORPICKER_STORY_URL}with-alpha`);

    const colorpicker = page.locator('ha-colorpicker');
    await expect(colorpicker).toBeVisible();

    await expect(page).toHaveScreenshot('colorpicker-with-alpha.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${COLORPICKER_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const colorpicker = page.locator('ha-colorpicker');
    await expect(colorpicker).toBeVisible();

    await expect(page).toHaveScreenshot('colorpicker-dark-theme.png');
  });
});
