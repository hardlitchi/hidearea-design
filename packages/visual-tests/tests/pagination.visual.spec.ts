import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Pagination component
 */

const PAGINATION_STORY_URL = '/iframe.html?id=navigation-pagination--';

test.describe('Pagination Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default pagination renders correctly', async ({ page }) => {
    await page.goto(`${PAGINATION_STORY_URL}default`);

    const pagination = page.locator('ha-pagination');
    await expect(pagination).toBeVisible();

    await expect(page).toHaveScreenshot('pagination-default.png');
  });

  test('with many pages renders correctly', async ({ page }) => {
    await page.goto(`${PAGINATION_STORY_URL}many-pages`);

    const pagination = page.locator('ha-pagination');
    await expect(pagination).toBeVisible();

    await expect(page).toHaveScreenshot('pagination-many-pages.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${PAGINATION_STORY_URL}sizes`);

    const pagination = page.locator('ha-pagination[size="sm"]').first();
    await expect(pagination).toBeVisible();

    await expect(page).toHaveScreenshot('pagination-small.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${PAGINATION_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const pagination = page.locator('ha-pagination');
    await expect(pagination).toBeVisible();

    await expect(page).toHaveScreenshot('pagination-dark-theme.png');
  });
});
