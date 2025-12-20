import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for List component
 * Tests various states and styles
 */

const LIST_STORY_URL = '/iframe.html?id=data-display-list--';

test.describe('List Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default list renders correctly', async ({ page }) => {
    await page.goto(`${LIST_STORY_URL}default`);

    const list = page.locator('ha-list');
    await expect(list).toBeVisible();

    await expect(page).toHaveScreenshot('list-default.png');
  });

  test('bordered list renders correctly', async ({ page }) => {
    await page.goto(`${LIST_STORY_URL}bordered`);

    const list = page.locator('ha-list');
    await expect(list).toBeVisible();

    await expect(page).toHaveScreenshot('list-bordered.png');
  });

  test('hoverable list renders correctly', async ({ page }) => {
    await page.goto(`${LIST_STORY_URL}hoverable`);

    const list = page.locator('ha-list');
    await expect(list).toBeVisible();

    await expect(page).toHaveScreenshot('list-hoverable.png');
  });

  test('divided list renders correctly', async ({ page }) => {
    await page.goto(`${LIST_STORY_URL}divided`);

    const list = page.locator('ha-list');
    await expect(list).toBeVisible();

    await expect(page).toHaveScreenshot('list-divided.png');
  });

  test('with icons renders correctly', async ({ page }) => {
    await page.goto(`${LIST_STORY_URL}with-icons`);

    const list = page.locator('ha-list');
    await expect(list).toBeVisible();

    await expect(page).toHaveScreenshot('list-with-icons.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${LIST_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const list = page.locator('ha-list');
    await expect(list).toBeVisible();

    await expect(page).toHaveScreenshot('list-dark-theme.png');
  });
});
