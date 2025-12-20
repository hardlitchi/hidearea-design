import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Radio component
 * Tests various states and sizes
 */

const RADIO_STORY_URL = '/iframe.html?id=forms-radio--';

test.describe('Radio Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default radio renders correctly', async ({ page }) => {
    await page.goto(`${RADIO_STORY_URL}default`);

    const radio = page.locator('ha-radio');
    await expect(radio).toBeVisible();

    await expect(page).toHaveScreenshot('radio-default.png');
  });

  test('checked state renders correctly', async ({ page }) => {
    await page.goto(`${RADIO_STORY_URL}checked`);

    const radio = page.locator('ha-radio');
    await expect(radio).toBeVisible();

    await expect(page).toHaveScreenshot('radio-checked.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${RADIO_STORY_URL}disabled`);

    const radio = page.locator('ha-radio');
    await expect(radio).toBeVisible();

    await expect(page).toHaveScreenshot('radio-disabled.png');
  });

  test('radio group renders correctly', async ({ page }) => {
    await page.goto(`${RADIO_STORY_URL}radio-group`);

    const radioGroup = page.locator('ha-radio').first();
    await expect(radioGroup).toBeVisible();

    await expect(page).toHaveScreenshot('radio-group.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${RADIO_STORY_URL}sizes`);

    const radio = page.locator('ha-radio[size="sm"]').first();
    await expect(radio).toBeVisible();

    await expect(page).toHaveScreenshot('radio-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${RADIO_STORY_URL}sizes`);

    const radio = page.locator('ha-radio[size="lg"]').first();
    await expect(radio).toBeVisible();

    await expect(page).toHaveScreenshot('radio-large.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${RADIO_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const radio = page.locator('ha-radio');
    await expect(radio).toBeVisible();

    await expect(page).toHaveScreenshot('radio-dark-theme.png');
  });
});
