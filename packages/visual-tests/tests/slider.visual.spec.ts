import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Slider component
 * Tests various states and sizes
 */

const SLIDER_STORY_URL = '/iframe.html?id=forms-slider--';

test.describe('Slider Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default slider renders correctly', async ({ page }) => {
    await page.goto(`${SLIDER_STORY_URL}default`);

    const slider = page.locator('ha-slider');
    await expect(slider).toBeVisible();

    await expect(page).toHaveScreenshot('slider-default.png');
  });

  test('with value renders correctly', async ({ page }) => {
    await page.goto(`${SLIDER_STORY_URL}with-value`);

    const slider = page.locator('ha-slider');
    await expect(slider).toBeVisible();

    await expect(page).toHaveScreenshot('slider-with-value.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${SLIDER_STORY_URL}disabled`);

    const slider = page.locator('ha-slider');
    await expect(slider).toBeVisible();

    await expect(page).toHaveScreenshot('slider-disabled.png');
  });

  test('with steps renders correctly', async ({ page }) => {
    await page.goto(`${SLIDER_STORY_URL}with-steps`);

    const slider = page.locator('ha-slider');
    await expect(slider).toBeVisible();

    await expect(page).toHaveScreenshot('slider-with-steps.png');
  });

  test('with marks renders correctly', async ({ page }) => {
    await page.goto(`${SLIDER_STORY_URL}with-marks`);

    const slider = page.locator('ha-slider');
    await expect(slider).toBeVisible();

    await expect(page).toHaveScreenshot('slider-with-marks.png');
  });

  test('range slider renders correctly', async ({ page }) => {
    await page.goto(`${SLIDER_STORY_URL}range`);

    const slider = page.locator('ha-slider');
    await expect(slider).toBeVisible();

    await expect(page).toHaveScreenshot('slider-range.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${SLIDER_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const slider = page.locator('ha-slider');
    await expect(slider).toBeVisible();

    await expect(page).toHaveScreenshot('slider-dark-theme.png');
  });
});
