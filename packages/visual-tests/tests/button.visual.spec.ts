import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Button component
 * Tests various states, variants, and sizes
 */

const BUTTON_STORY_URL = '/iframe.html?id=forms-button--';

test.describe('Button Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Storybook
    await page.goto('http://localhost:6006');
  });

  test('default button renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}primary`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    // Take snapshot
    await expect(page).toHaveScreenshot('button-default.png');
  });

  test('primary variant renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}primary`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    await expect(page).toHaveScreenshot('button-primary.png');
  });

  test('secondary variant renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}secondary`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    await expect(page).toHaveScreenshot('button-secondary.png');
  });

  test('danger variant renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}danger`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    await expect(page).toHaveScreenshot('button-danger.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}small`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    await expect(page).toHaveScreenshot('button-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}large`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    await expect(page).toHaveScreenshot('button-large.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}disabled`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    await expect(page).toHaveScreenshot('button-disabled.png');
  });

  test('loading state renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}loading`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    // Wait for loading animation to start
    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot('button-loading.png');
  });

  test('hover state renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}primary`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    // Hover over button
    await button.hover();

    await expect(page).toHaveScreenshot('button-hover.png');
  });

  test('focus state renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}primary`);

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    // Focus button
    await button.focus();

    await expect(page).toHaveScreenshot('button-focus.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${BUTTON_STORY_URL}primary`);

    // Set dark theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const button = page.locator('ha-button');
    await expect(button).toBeVisible();

    await expect(page).toHaveScreenshot('button-dark-theme.png');
  });
});
