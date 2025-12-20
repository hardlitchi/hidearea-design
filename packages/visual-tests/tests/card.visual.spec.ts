import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Card component
 * Tests various variants and layouts
 */

const CARD_STORY_URL = '/iframe.html?id=data-display-card--';

test.describe('Card Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default card renders correctly', async ({ page }) => {
    await page.goto(`${CARD_STORY_URL}default`);

    const card = page.locator('ha-card');
    await expect(card).toBeVisible();

    await expect(page).toHaveScreenshot('card-default.png');
  });

  test('elevated variant renders correctly', async ({ page }) => {
    await page.goto(`${CARD_STORY_URL}elevated`);

    const card = page.locator('ha-card');
    await expect(card).toBeVisible();

    await expect(page).toHaveScreenshot('card-elevated.png');
  });

  test('outlined variant renders correctly', async ({ page }) => {
    await page.goto(`${CARD_STORY_URL}outlined`);

    const card = page.locator('ha-card');
    await expect(card).toBeVisible();

    await expect(page).toHaveScreenshot('card-outlined.png');
  });

  test('with header renders correctly', async ({ page }) => {
    await page.goto(`${CARD_STORY_URL}with-header`);

    const card = page.locator('ha-card');
    await expect(card).toBeVisible();

    await expect(page).toHaveScreenshot('card-with-header.png');
  });

  test('with footer renders correctly', async ({ page }) => {
    await page.goto(`${CARD_STORY_URL}with-footer`);

    const card = page.locator('ha-card');
    await expect(card).toBeVisible();

    await expect(page).toHaveScreenshot('card-with-footer.png');
  });

  test('hover state renders correctly', async ({ page }) => {
    await page.goto(`${CARD_STORY_URL}interactive`);

    const card = page.locator('ha-card');
    await expect(card).toBeVisible();

    await card.hover();

    await expect(page).toHaveScreenshot('card-hover.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${CARD_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const card = page.locator('ha-card');
    await expect(card).toBeVisible();

    await expect(page).toHaveScreenshot('card-dark-theme.png');
  });
});
