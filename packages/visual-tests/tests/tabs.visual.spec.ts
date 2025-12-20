import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Tabs component
 * Tests various orientations and sizes
 */

const TABS_STORY_URL = '/iframe.html?id=navigation-tabs--';

test.describe('Tabs Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default tabs render correctly', async ({ page }) => {
    await page.goto(`${TABS_STORY_URL}default`);

    const tabs = page.locator('ha-tabs');
    await expect(tabs).toBeVisible();

    await expect(page).toHaveScreenshot('tabs-default.png');
  });

  test('vertical orientation renders correctly', async ({ page }) => {
    await page.goto(`${TABS_STORY_URL}vertical`);

    const tabs = page.locator('ha-tabs');
    await expect(tabs).toBeVisible();

    await expect(page).toHaveScreenshot('tabs-vertical.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${TABS_STORY_URL}sizes`);

    const tabs = page.locator('ha-tabs[size="sm"]').first();
    await expect(tabs).toBeVisible();

    await expect(page).toHaveScreenshot('tabs-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${TABS_STORY_URL}sizes`);

    const tabs = page.locator('ha-tabs[size="lg"]').first();
    await expect(tabs).toBeVisible();

    await expect(page).toHaveScreenshot('tabs-large.png');
  });

  test('active tab renders correctly', async ({ page }) => {
    await page.goto(`${TABS_STORY_URL}default`);

    const tabs = page.locator('ha-tabs');
    await expect(tabs).toBeVisible();

    // Click second tab
    const secondTab = page.locator('ha-tab-item').nth(1);
    await secondTab.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('tabs-active.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${TABS_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const tabs = page.locator('ha-tabs');
    await expect(tabs).toBeVisible();

    await expect(page).toHaveScreenshot('tabs-dark-theme.png');
  });
});
