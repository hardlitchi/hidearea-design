import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for DatePicker component
 * Tests various states and formats
 */

const DATEPICKER_STORY_URL = '/iframe.html?id=forms-datepicker--';

test.describe('DatePicker Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default datepicker renders correctly', async ({ page }) => {
    await page.goto(`${DATEPICKER_STORY_URL}default`);

    const datepicker = page.locator('ha-datepicker');
    await expect(datepicker).toBeVisible();

    await expect(page).toHaveScreenshot('datepicker-default.png');
  });

  test('with value renders correctly', async ({ page }) => {
    await page.goto(`${DATEPICKER_STORY_URL}with-value`);

    const datepicker = page.locator('ha-datepicker');
    await expect(datepicker).toBeVisible();

    await expect(page).toHaveScreenshot('datepicker-with-value.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${DATEPICKER_STORY_URL}disabled`);

    const datepicker = page.locator('ha-datepicker');
    await expect(datepicker).toBeVisible();

    await expect(page).toHaveScreenshot('datepicker-disabled.png');
  });

  test('with min/max dates renders correctly', async ({ page }) => {
    await page.goto(`${DATEPICKER_STORY_URL}min-max`);

    const datepicker = page.locator('ha-datepicker');
    await expect(datepicker).toBeVisible();

    await expect(page).toHaveScreenshot('datepicker-min-max.png');
  });

  test('range picker renders correctly', async ({ page }) => {
    await page.goto(`${DATEPICKER_STORY_URL}range`);

    const datepicker = page.locator('ha-datepicker');
    await expect(datepicker).toBeVisible();

    await expect(page).toHaveScreenshot('datepicker-range.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${DATEPICKER_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const datepicker = page.locator('ha-datepicker');
    await expect(datepicker).toBeVisible();

    await expect(page).toHaveScreenshot('datepicker-dark-theme.png');
  });
});
