import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for DataGrid component
 * Tests various states and features
 */

const DATAGRID_STORY_URL = '/iframe.html?id=data-display-datagrid--';

test.describe('DataGrid Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default datagrid renders correctly', async ({ page }) => {
    await page.goto(`${DATAGRID_STORY_URL}default`);

    await page.waitForTimeout(100);

    const datagrid = page.locator('ha-datagrid');
    await expect(datagrid).toBeVisible();

    await expect(page).toHaveScreenshot('datagrid-default.png');
  });

  test('with data renders correctly', async ({ page }) => {
    await page.goto(`${DATAGRID_STORY_URL}with-data`);

    await page.waitForTimeout(100);

    const datagrid = page.locator('ha-datagrid');
    await expect(datagrid).toBeVisible();

    await expect(page).toHaveScreenshot('datagrid-with-data.png');
  });

  test('sortable columns render correctly', async ({ page }) => {
    await page.goto(`${DATAGRID_STORY_URL}sortable`);

    await page.waitForTimeout(100);

    const datagrid = page.locator('ha-datagrid');
    await expect(datagrid).toBeVisible();

    await expect(page).toHaveScreenshot('datagrid-sortable.png');
  });

  test('with pagination renders correctly', async ({ page }) => {
    await page.goto(`${DATAGRID_STORY_URL}pagination`);

    await page.waitForTimeout(100);

    const datagrid = page.locator('ha-datagrid');
    await expect(datagrid).toBeVisible();

    await expect(page).toHaveScreenshot('datagrid-pagination.png');
  });

  test('selectable rows render correctly', async ({ page }) => {
    await page.goto(`${DATAGRID_STORY_URL}selectable`);

    await page.waitForTimeout(100);

    const datagrid = page.locator('ha-datagrid');
    await expect(datagrid).toBeVisible();

    await expect(page).toHaveScreenshot('datagrid-selectable.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${DATAGRID_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    await page.waitForTimeout(100);

    const datagrid = page.locator('ha-datagrid');
    await expect(datagrid).toBeVisible();

    await expect(page).toHaveScreenshot('datagrid-dark-theme.png');
  });
});
