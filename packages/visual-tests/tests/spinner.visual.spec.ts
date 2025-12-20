import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Spinner component
 * Tests various sizes and variants
 */

const SPINNER_STORY_URL = '/iframe.html?id=feedback-spinner--';

test.describe('Spinner Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default spinner renders correctly', async ({ page }) => {
    await page.goto(`${SPINNER_STORY_URL}default`);

    const spinner = page.locator('ha-spinner');
    await expect(spinner).toBeVisible();

    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot('spinner-default.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${SPINNER_STORY_URL}sizes`);

    const spinner = page.locator('ha-spinner[size="sm"]').first();
    await expect(spinner).toBeVisible();

    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot('spinner-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${SPINNER_STORY_URL}sizes`);

    const spinner = page.locator('ha-spinner[size="lg"]').first();
    await expect(spinner).toBeVisible();

    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot('spinner-large.png');
  });

  test('primary variant renders correctly', async ({ page }) => {
    await page.goto(`${SPINNER_STORY_URL}variants`);

    const spinner = page.locator('ha-spinner[variant="primary"]').first();
    await expect(spinner).toBeVisible();

    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot('spinner-primary.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${SPINNER_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const spinner = page.locator('ha-spinner');
    await expect(spinner).toBeVisible();

    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot('spinner-dark-theme.png');
  });
});
