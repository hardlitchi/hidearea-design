import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Container component
 * Tests various sizes and responsive behavior
 */

const CONTAINER_STORY_URL = '/iframe.html?id=layout-container--';

test.describe('Container Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default container renders correctly', async ({ page }) => {
    await page.goto(`${CONTAINER_STORY_URL}default`);

    const container = page.locator('ha-container');
    await expect(container).toBeVisible();

    await expect(page).toHaveScreenshot('container-default.png');
  });

  test('small container renders correctly', async ({ page }) => {
    await page.goto(`${CONTAINER_STORY_URL}sizes`);

    const container = page.locator('ha-container[size="sm"]').first();
    await expect(container).toBeVisible();

    await expect(page).toHaveScreenshot('container-small.png');
  });

  test('large container renders correctly', async ({ page }) => {
    await page.goto(`${CONTAINER_STORY_URL}sizes`);

    const container = page.locator('ha-container[size="lg"]').first();
    await expect(container).toBeVisible();

    await expect(page).toHaveScreenshot('container-large.png');
  });

  test('fluid container renders correctly', async ({ page }) => {
    await page.goto(`${CONTAINER_STORY_URL}fluid`);

    const container = page.locator('ha-container');
    await expect(container).toBeVisible();

    await expect(page).toHaveScreenshot('container-fluid.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${CONTAINER_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const container = page.locator('ha-container');
    await expect(container).toBeVisible();

    await expect(page).toHaveScreenshot('container-dark-theme.png');
  });
});
