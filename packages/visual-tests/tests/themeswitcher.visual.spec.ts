import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for ThemeSwitcher component
 * Tests various states and configurations
 */

const THEMESWITCHER_STORY_URL = '/iframe.html?id=utilities-themeswitcher--';

test.describe('ThemeSwitcher Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default themeswitcher renders correctly', async ({ page }) => {
    await page.goto(`${THEMESWITCHER_STORY_URL}default`);

    const themeswitcher = page.locator('ha-themeswitcher');
    await expect(themeswitcher).toBeVisible();

    await expect(page).toHaveScreenshot('themeswitcher-default.png');
  });

  test('with label renders correctly', async ({ page }) => {
    await page.goto(`${THEMESWITCHER_STORY_URL}with-label`);

    const themeswitcher = page.locator('ha-themeswitcher');
    await expect(themeswitcher).toBeVisible();

    await expect(page).toHaveScreenshot('themeswitcher-with-label.png');
  });

  test('icon only renders correctly', async ({ page }) => {
    await page.goto(`${THEMESWITCHER_STORY_URL}icon-only`);

    const themeswitcher = page.locator('ha-themeswitcher');
    await expect(themeswitcher).toBeVisible();

    await expect(page).toHaveScreenshot('themeswitcher-icon-only.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${THEMESWITCHER_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const themeswitcher = page.locator('ha-themeswitcher');
    await expect(themeswitcher).toBeVisible();

    await expect(page).toHaveScreenshot('themeswitcher-dark-theme.png');
  });
});
