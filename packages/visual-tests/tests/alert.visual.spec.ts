import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Alert component
 * Tests various variants and states
 */

const ALERT_STORY_URL = '/iframe.html?id=feedback-alert--';

test.describe('Alert Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default alert renders correctly', async ({ page }) => {
    await page.goto(`${ALERT_STORY_URL}default`);

    const alert = page.locator('ha-alert');
    await expect(alert).toBeVisible();

    await expect(page).toHaveScreenshot('alert-default.png');
  });

  test('info variant renders correctly', async ({ page }) => {
    await page.goto(`${ALERT_STORY_URL}info`);

    const alert = page.locator('ha-alert');
    await expect(alert).toBeVisible();

    await expect(page).toHaveScreenshot('alert-info.png');
  });

  test('success variant renders correctly', async ({ page }) => {
    await page.goto(`${ALERT_STORY_URL}success`);

    const alert = page.locator('ha-alert');
    await expect(alert).toBeVisible();

    await expect(page).toHaveScreenshot('alert-success.png');
  });

  test('warning variant renders correctly', async ({ page }) => {
    await page.goto(`${ALERT_STORY_URL}warning`);

    const alert = page.locator('ha-alert');
    await expect(alert).toBeVisible();

    await expect(page).toHaveScreenshot('alert-warning.png');
  });

  test('error variant renders correctly', async ({ page }) => {
    await page.goto(`${ALERT_STORY_URL}error`);

    const alert = page.locator('ha-alert');
    await expect(alert).toBeVisible();

    await expect(page).toHaveScreenshot('alert-error.png');
  });

  test('closable alert renders correctly', async ({ page }) => {
    await page.goto(`${ALERT_STORY_URL}closable`);

    const alert = page.locator('ha-alert');
    await expect(alert).toBeVisible();

    await expect(page).toHaveScreenshot('alert-closable.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${ALERT_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const alert = page.locator('ha-alert');
    await expect(alert).toBeVisible();

    await expect(page).toHaveScreenshot('alert-dark-theme.png');
  });
});
