import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Chip component
 * Tests various variants, sizes, and states
 */

const CHIP_STORY_URL = '/iframe.html?id=data-display-chip--';

test.describe('Chip Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default chip renders correctly', async ({ page }) => {
    await page.goto(`${CHIP_STORY_URL}default`);

    const chip = page.locator('ha-chip');
    await expect(chip).toBeVisible();

    await expect(page).toHaveScreenshot('chip-default.png');
  });

  test('primary variant renders correctly', async ({ page }) => {
    await page.goto(`${CHIP_STORY_URL}variants`);

    const chip = page.locator('ha-chip[variant="primary"]').first();
    await expect(chip).toBeVisible();

    await expect(page).toHaveScreenshot('chip-primary.png');
  });

  test('success variant renders correctly', async ({ page }) => {
    await page.goto(`${CHIP_STORY_URL}variants`);

    const chip = page.locator('ha-chip[variant="success"]').first();
    await expect(chip).toBeVisible();

    await expect(page).toHaveScreenshot('chip-success.png');
  });

  test('error variant renders correctly', async ({ page }) => {
    await page.goto(`${CHIP_STORY_URL}variants`);

    const chip = page.locator('ha-chip[variant="error"]').first();
    await expect(chip).toBeVisible();

    await expect(page).toHaveScreenshot('chip-error.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${CHIP_STORY_URL}sizes`);

    const chip = page.locator('ha-chip[size="sm"]').first();
    await expect(chip).toBeVisible();

    await expect(page).toHaveScreenshot('chip-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${CHIP_STORY_URL}sizes`);

    const chip = page.locator('ha-chip[size="lg"]').first();
    await expect(chip).toBeVisible();

    await expect(page).toHaveScreenshot('chip-large.png');
  });

  test('closable chip renders correctly', async ({ page }) => {
    await page.goto(`${CHIP_STORY_URL}closable`);

    const chip = page.locator('ha-chip');
    await expect(chip).toBeVisible();

    await expect(page).toHaveScreenshot('chip-closable.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${CHIP_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const chip = page.locator('ha-chip');
    await expect(chip).toBeVisible();

    await expect(page).toHaveScreenshot('chip-dark-theme.png');
  });
});
