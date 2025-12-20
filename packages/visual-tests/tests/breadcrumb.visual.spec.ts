import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Breadcrumb component
 */

const BREADCRUMB_STORY_URL = '/iframe.html?id=navigation-breadcrumb--';

test.describe('Breadcrumb Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default breadcrumb renders correctly', async ({ page }) => {
    await page.goto(`${BREADCRUMB_STORY_URL}default`);

    const breadcrumb = page.locator('ha-breadcrumb');
    await expect(breadcrumb).toBeVisible();

    await expect(page).toHaveScreenshot('breadcrumb-default.png');
  });

  test('with custom separator renders correctly', async ({ page }) => {
    await page.goto(`${BREADCRUMB_STORY_URL}custom-separator`);

    const breadcrumb = page.locator('ha-breadcrumb');
    await expect(breadcrumb).toBeVisible();

    await expect(page).toHaveScreenshot('breadcrumb-custom-separator.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${BREADCRUMB_STORY_URL}sizes`);

    const breadcrumb = page.locator('ha-breadcrumb[size="sm"]').first();
    await expect(breadcrumb).toBeVisible();

    await expect(page).toHaveScreenshot('breadcrumb-small.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${BREADCRUMB_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const breadcrumb = page.locator('ha-breadcrumb');
    await expect(breadcrumb).toBeVisible();

    await expect(page).toHaveScreenshot('breadcrumb-dark-theme.png');
  });
});
