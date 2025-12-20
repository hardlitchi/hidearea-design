import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Grid component
 * Tests various layouts and responsive behavior
 */

const GRID_STORY_URL = '/iframe.html?id=layout-grid--';

test.describe('Grid Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default grid renders correctly', async ({ page }) => {
    await page.goto(`${GRID_STORY_URL}default`);

    const grid = page.locator('ha-grid');
    await expect(grid).toBeVisible();

    await expect(page).toHaveScreenshot('grid-default.png');
  });

  test('with columns renders correctly', async ({ page }) => {
    await page.goto(`${GRID_STORY_URL}columns`);

    const grid = page.locator('ha-grid');
    await expect(grid).toBeVisible();

    await expect(page).toHaveScreenshot('grid-columns.png');
  });

  test('with gaps renders correctly', async ({ page }) => {
    await page.goto(`${GRID_STORY_URL}gaps`);

    const grid = page.locator('ha-grid');
    await expect(grid).toBeVisible();

    await expect(page).toHaveScreenshot('grid-gaps.png');
  });

  test('responsive grid renders correctly', async ({ page }) => {
    await page.goto(`${GRID_STORY_URL}responsive`);

    const grid = page.locator('ha-grid');
    await expect(grid).toBeVisible();

    await expect(page).toHaveScreenshot('grid-responsive.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${GRID_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const grid = page.locator('ha-grid');
    await expect(grid).toBeVisible();

    await expect(page).toHaveScreenshot('grid-dark-theme.png');
  });
});
