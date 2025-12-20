import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Switch component
 * Tests various states and sizes
 */

const SWITCH_STORY_URL = '/iframe.html?id=forms-switch--';

test.describe('Switch Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default switch renders correctly', async ({ page }) => {
    await page.goto(`${SWITCH_STORY_URL}default`);

    const switchEl = page.locator('ha-switch');
    await expect(switchEl).toBeVisible();

    await expect(page).toHaveScreenshot('switch-default.png');
  });

  test('checked state renders correctly', async ({ page }) => {
    await page.goto(`${SWITCH_STORY_URL}checked`);

    const switchEl = page.locator('ha-switch');
    await expect(switchEl).toBeVisible();

    await expect(page).toHaveScreenshot('switch-checked.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${SWITCH_STORY_URL}disabled`);

    const switchEl = page.locator('ha-switch');
    await expect(switchEl).toBeVisible();

    await expect(page).toHaveScreenshot('switch-disabled.png');
  });

  test('with label renders correctly', async ({ page }) => {
    await page.goto(`${SWITCH_STORY_URL}with-label`);

    const switchEl = page.locator('ha-switch');
    await expect(switchEl).toBeVisible();

    await expect(page).toHaveScreenshot('switch-with-label.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${SWITCH_STORY_URL}sizes`);

    const switchEl = page.locator('ha-switch[size="sm"]').first();
    await expect(switchEl).toBeVisible();

    await expect(page).toHaveScreenshot('switch-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${SWITCH_STORY_URL}sizes`);

    const switchEl = page.locator('ha-switch[size="lg"]').first();
    await expect(switchEl).toBeVisible();

    await expect(page).toHaveScreenshot('switch-large.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${SWITCH_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const switchEl = page.locator('ha-switch');
    await expect(switchEl).toBeVisible();

    await expect(page).toHaveScreenshot('switch-dark-theme.png');
  });
});
