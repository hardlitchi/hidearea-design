import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for TimePicker component
 * Tests various states and formats
 */

const TIMEPICKER_STORY_URL = '/iframe.html?id=forms-timepicker--';

test.describe('TimePicker Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default timepicker renders correctly', async ({ page }) => {
    await page.goto(`${TIMEPICKER_STORY_URL}default`);

    const timepicker = page.locator('ha-timepicker');
    await expect(timepicker).toBeVisible();

    await expect(page).toHaveScreenshot('timepicker-default.png');
  });

  test('with value renders correctly', async ({ page }) => {
    await page.goto(`${TIMEPICKER_STORY_URL}with-value`);

    const timepicker = page.locator('ha-timepicker');
    await expect(timepicker).toBeVisible();

    await expect(page).toHaveScreenshot('timepicker-with-value.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${TIMEPICKER_STORY_URL}disabled`);

    const timepicker = page.locator('ha-timepicker');
    await expect(timepicker).toBeVisible();

    await expect(page).toHaveScreenshot('timepicker-disabled.png');
  });

  test('24-hour format renders correctly', async ({ page }) => {
    await page.goto(`${TIMEPICKER_STORY_URL}format-24`);

    const timepicker = page.locator('ha-timepicker');
    await expect(timepicker).toBeVisible();

    await expect(page).toHaveScreenshot('timepicker-24-hour.png');
  });

  test('with seconds renders correctly', async ({ page }) => {
    await page.goto(`${TIMEPICKER_STORY_URL}with-seconds`);

    const timepicker = page.locator('ha-timepicker');
    await expect(timepicker).toBeVisible();

    await expect(page).toHaveScreenshot('timepicker-with-seconds.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${TIMEPICKER_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const timepicker = page.locator('ha-timepicker');
    await expect(timepicker).toBeVisible();

    await expect(page).toHaveScreenshot('timepicker-dark-theme.png');
  });
});
