import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Progress component
 * Tests various states and types
 */

const PROGRESS_STORY_URL = '/iframe.html?id=feedback-progress--';

test.describe('Progress Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default progress renders correctly', async ({ page }) => {
    await page.goto(`${PROGRESS_STORY_URL}default`);

    const progress = page.locator('ha-progress');
    await expect(progress).toBeVisible();

    await expect(page).toHaveScreenshot('progress-default.png');
  });

  test('with value renders correctly', async ({ page }) => {
    await page.goto(`${PROGRESS_STORY_URL}with-value`);

    const progress = page.locator('ha-progress');
    await expect(progress).toBeVisible();

    await expect(page).toHaveScreenshot('progress-with-value.png');
  });

  test('indeterminate state renders correctly', async ({ page }) => {
    await page.goto(`${PROGRESS_STORY_URL}indeterminate`);

    const progress = page.locator('ha-progress');
    await expect(progress).toBeVisible();

    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot('progress-indeterminate.png');
  });

  test('success variant renders correctly', async ({ page }) => {
    await page.goto(`${PROGRESS_STORY_URL}success`);

    const progress = page.locator('ha-progress');
    await expect(progress).toBeVisible();

    await expect(page).toHaveScreenshot('progress-success.png');
  });

  test('error variant renders correctly', async ({ page }) => {
    await page.goto(`${PROGRESS_STORY_URL}error`);

    const progress = page.locator('ha-progress');
    await expect(progress).toBeVisible();

    await expect(page).toHaveScreenshot('progress-error.png');
  });

  test('circular type renders correctly', async ({ page }) => {
    await page.goto(`${PROGRESS_STORY_URL}circular`);

    const progress = page.locator('ha-progress');
    await expect(progress).toBeVisible();

    await expect(page).toHaveScreenshot('progress-circular.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${PROGRESS_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const progress = page.locator('ha-progress');
    await expect(progress).toBeVisible();

    await expect(page).toHaveScreenshot('progress-dark-theme.png');
  });
});
