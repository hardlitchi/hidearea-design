import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Textarea component
 * Tests various states and sizes
 */

const TEXTAREA_STORY_URL = '/iframe.html?id=forms-textarea--';

test.describe('Textarea Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default textarea renders correctly', async ({ page }) => {
    await page.goto(`${TEXTAREA_STORY_URL}default`);

    const textarea = page.locator('ha-textarea');
    await expect(textarea).toBeVisible();

    await expect(page).toHaveScreenshot('textarea-default.png');
  });

  test('with placeholder renders correctly', async ({ page }) => {
    await page.goto(`${TEXTAREA_STORY_URL}with-placeholder`);

    const textarea = page.locator('ha-textarea');
    await expect(textarea).toBeVisible();

    await expect(page).toHaveScreenshot('textarea-placeholder.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${TEXTAREA_STORY_URL}disabled`);

    const textarea = page.locator('ha-textarea');
    await expect(textarea).toBeVisible();

    await expect(page).toHaveScreenshot('textarea-disabled.png');
  });

  test('readonly state renders correctly', async ({ page }) => {
    await page.goto(`${TEXTAREA_STORY_URL}readonly`);

    const textarea = page.locator('ha-textarea');
    await expect(textarea).toBeVisible();

    await expect(page).toHaveScreenshot('textarea-readonly.png');
  });

  test('error state renders correctly', async ({ page }) => {
    await page.goto(`${TEXTAREA_STORY_URL}error`);

    const textarea = page.locator('ha-textarea');
    await expect(textarea).toBeVisible();

    await expect(page).toHaveScreenshot('textarea-error.png');
  });

  test('with rows attribute renders correctly', async ({ page }) => {
    await page.goto(`${TEXTAREA_STORY_URL}rows`);

    const textarea = page.locator('ha-textarea');
    await expect(textarea).toBeVisible();

    await expect(page).toHaveScreenshot('textarea-rows.png');
  });

  test('focus state renders correctly', async ({ page }) => {
    await page.goto(`${TEXTAREA_STORY_URL}default`);

    const textarea = page.locator('ha-textarea');
    await expect(textarea).toBeVisible();

    await textarea.focus();

    await expect(page).toHaveScreenshot('textarea-focus.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${TEXTAREA_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const textarea = page.locator('ha-textarea');
    await expect(textarea).toBeVisible();

    await expect(page).toHaveScreenshot('textarea-dark-theme.png');
  });
});
