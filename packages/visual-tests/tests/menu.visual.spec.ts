import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Menu component
 * Tests various states and orientations
 */

const MENU_STORY_URL = '/iframe.html?id=navigation-menu--';

test.describe('Menu Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default menu renders correctly', async ({ page }) => {
    await page.goto(`${MENU_STORY_URL}default`);

    const menu = page.locator('ha-menu');
    await expect(menu).toBeVisible();

    await expect(page).toHaveScreenshot('menu-default.png');
  });

  test('horizontal menu renders correctly', async ({ page }) => {
    await page.goto(`${MENU_STORY_URL}horizontal`);

    const menu = page.locator('ha-menu');
    await expect(menu).toBeVisible();

    await expect(page).toHaveScreenshot('menu-horizontal.png');
  });

  test('with icons renders correctly', async ({ page }) => {
    await page.goto(`${MENU_STORY_URL}with-icons`);

    const menu = page.locator('ha-menu');
    await expect(menu).toBeVisible();

    await expect(page).toHaveScreenshot('menu-with-icons.png');
  });

  test('nested menu renders correctly', async ({ page }) => {
    await page.goto(`${MENU_STORY_URL}nested`);

    const menu = page.locator('ha-menu');
    await expect(menu).toBeVisible();

    await expect(page).toHaveScreenshot('menu-nested.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${MENU_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const menu = page.locator('ha-menu');
    await expect(menu).toBeVisible();

    await expect(page).toHaveScreenshot('menu-dark-theme.png');
  });
});
