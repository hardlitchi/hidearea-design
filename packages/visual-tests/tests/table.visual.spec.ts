import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Table component
 */

const TABLE_STORY_URL = '/iframe.html?id=data-display-table--';

test.describe('Table Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default table renders correctly', async ({ page }) => {
    await page.goto(`${TABLE_STORY_URL}default`);

    const table = page.locator('ha-table');
    await expect(table).toBeVisible();

    await expect(page).toHaveScreenshot('table-default.png');
  });

  test('striped table renders correctly', async ({ page }) => {
    await page.goto(`${TABLE_STORY_URL}striped`);

    const table = page.locator('ha-table');
    await expect(table).toBeVisible();

    await expect(page).toHaveScreenshot('table-striped.png');
  });

  test('bordered table renders correctly', async ({ page }) => {
    await page.goto(`${TABLE_STORY_URL}bordered`);

    const table = page.locator('ha-table');
    await expect(table).toBeVisible();

    await expect(page).toHaveScreenshot('table-bordered.png');
  });

  test('hoverable table renders correctly', async ({ page }) => {
    await page.goto(`${TABLE_STORY_URL}hoverable`);

    const table = page.locator('ha-table');
    await expect(table).toBeVisible();

    // Hover over first row
    const firstRow = page.locator('tbody tr').first();
    await firstRow.hover();

    await expect(page).toHaveScreenshot('table-hover.png');
  });

  test('compact table renders correctly', async ({ page }) => {
    await page.goto(`${TABLE_STORY_URL}compact`);

    const table = page.locator('ha-table');
    await expect(table).toBeVisible();

    await expect(page).toHaveScreenshot('table-compact.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${TABLE_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const table = page.locator('ha-table');
    await expect(table).toBeVisible();

    await expect(page).toHaveScreenshot('table-dark-theme.png');
  });
});
