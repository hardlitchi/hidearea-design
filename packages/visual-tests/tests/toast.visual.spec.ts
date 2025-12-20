import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Toast component
 */

const TOAST_STORY_URL = '/iframe.html?id=feedback-toast--';

test.describe('Toast Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('info toast renders correctly', async ({ page }) => {
    await page.goto(`${TOAST_STORY_URL}default`);

    // Click trigger to show toast
    const trigger = page.locator('button').first();
    await trigger.click();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('toast-info.png', {
      fullPage: true,
    });
  });

  test('success toast renders correctly', async ({ page }) => {
    await page.goto(`${TOAST_STORY_URL}success`);

    const trigger = page.locator('button').first();
    await trigger.click();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('toast-success.png', {
      fullPage: true,
    });
  });

  test('warning toast renders correctly', async ({ page }) => {
    await page.goto(`${TOAST_STORY_URL}warning`);

    const trigger = page.locator('button').first();
    await trigger.click();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('toast-warning.png', {
      fullPage: true,
    });
  });

  test('error toast renders correctly', async ({ page }) => {
    await page.goto(`${TOAST_STORY_URL}error`);

    const trigger = page.locator('button').first();
    await trigger.click();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('toast-error.png', {
      fullPage: true,
    });
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${TOAST_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const trigger = page.locator('button').first();
    await trigger.click();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('toast-dark-theme.png', {
      fullPage: true,
    });
  });
});
