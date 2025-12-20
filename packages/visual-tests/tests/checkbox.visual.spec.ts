import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Checkbox component
 * Tests various states, variants, and sizes
 */

const CHECKBOX_STORY_URL = '/iframe.html?id=forms-checkbox--';

test.describe('Checkbox Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default checkbox renders correctly', async ({ page }) => {
    await page.goto(`${CHECKBOX_STORY_URL}default`);

    const checkbox = page.locator('ha-checkbox');
    await expect(checkbox).toBeVisible();

    await expect(page).toHaveScreenshot('checkbox-default.png');
  });

  test('checked state renders correctly', async ({ page }) => {
    await page.goto(`${CHECKBOX_STORY_URL}default-checked`);

    const checkbox = page.locator('ha-checkbox');
    await expect(checkbox).toBeVisible();

    await expect(page).toHaveScreenshot('checkbox-checked.png');
  });

  test('indeterminate state renders correctly', async ({ page }) => {
    await page.goto(`${CHECKBOX_STORY_URL}indeterminate`);

    const checkbox = page.locator('ha-checkbox');
    await expect(checkbox).toBeVisible();

    await expect(page).toHaveScreenshot('checkbox-indeterminate.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${CHECKBOX_STORY_URL}disabled`);

    const checkbox = page.locator('ha-checkbox');
    await expect(checkbox).toBeVisible();

    await expect(page).toHaveScreenshot('checkbox-disabled.png');
  });

  test('with description renders correctly', async ({ page }) => {
    await page.goto(`${CHECKBOX_STORY_URL}with-description`);

    const checkbox = page.locator('ha-checkbox');
    await expect(checkbox).toBeVisible();

    await expect(page).toHaveScreenshot('checkbox-with-description.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${CHECKBOX_STORY_URL}sizes`);

    const checkbox = page.locator('ha-checkbox[size="sm"]').first();
    await expect(checkbox).toBeVisible();

    await expect(page).toHaveScreenshot('checkbox-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${CHECKBOX_STORY_URL}sizes`);

    const checkbox = page.locator('ha-checkbox[size="lg"]').first();
    await expect(checkbox).toBeVisible();

    await expect(page).toHaveScreenshot('checkbox-large.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${CHECKBOX_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const checkbox = page.locator('ha-checkbox');
    await expect(checkbox).toBeVisible();

    await expect(page).toHaveScreenshot('checkbox-dark-theme.png');
  });
});
