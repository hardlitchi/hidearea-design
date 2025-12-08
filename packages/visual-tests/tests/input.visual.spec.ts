import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Input component
 * Tests various states, sizes, and types
 */

const INPUT_STORY_URL = '/iframe.html?id=components-input--';

test.describe('Input Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default input renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}default`);

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    await expect(page).toHaveScreenshot('input-default.png');
  });

  test('with placeholder renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}with-placeholder`);

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    await expect(page).toHaveScreenshot('input-placeholder.png');
  });

  test('with value renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}with-value`);

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    await expect(page).toHaveScreenshot('input-value.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}small`);

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    await expect(page).toHaveScreenshot('input-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}large`);

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    await expect(page).toHaveScreenshot('input-large.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}disabled`);

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    await expect(page).toHaveScreenshot('input-disabled.png');
  });

  test('error state renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}error`);

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    await expect(page).toHaveScreenshot('input-error.png');
  });

  test('focus state renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}default`);

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    // Focus input
    await input.click();

    await expect(page).toHaveScreenshot('input-focus.png');
  });

  test('password type renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}password`);

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    await expect(page).toHaveScreenshot('input-password.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${INPUT_STORY_URL}default`);

    // Set dark theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const input = page.locator('ha-input');
    await expect(input).toBeVisible();

    await expect(page).toHaveScreenshot('input-dark-theme.png');
  });
});
