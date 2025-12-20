import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Select component
 * Tests various states and sizes
 */

const SELECT_STORY_URL = '/iframe.html?id=forms-select--';

test.describe('Select Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default select renders correctly', async ({ page }) => {
    await page.goto(`${SELECT_STORY_URL}default`);

    const select = page.locator('ha-select');
    await expect(select).toBeVisible();

    await expect(page).toHaveScreenshot('select-default.png');
  });

  test('with placeholder renders correctly', async ({ page }) => {
    await page.goto(`${SELECT_STORY_URL}with-placeholder`);

    const select = page.locator('ha-select');
    await expect(select).toBeVisible();

    await expect(page).toHaveScreenshot('select-placeholder.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${SELECT_STORY_URL}disabled`);

    const select = page.locator('ha-select');
    await expect(select).toBeVisible();

    await expect(page).toHaveScreenshot('select-disabled.png');
  });

  test('error state renders correctly', async ({ page }) => {
    await page.goto(`${SELECT_STORY_URL}error`);

    const select = page.locator('ha-select');
    await expect(select).toBeVisible();

    await expect(page).toHaveScreenshot('select-error.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${SELECT_STORY_URL}sizes`);

    const select = page.locator('ha-select[size="sm"]').first();
    await expect(select).toBeVisible();

    await expect(page).toHaveScreenshot('select-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${SELECT_STORY_URL}sizes`);

    const select = page.locator('ha-select[size="lg"]').first();
    await expect(select).toBeVisible();

    await expect(page).toHaveScreenshot('select-large.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${SELECT_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const select = page.locator('ha-select');
    await expect(select).toBeVisible();

    await expect(page).toHaveScreenshot('select-dark-theme.png');
  });
});
