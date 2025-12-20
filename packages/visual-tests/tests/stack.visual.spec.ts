import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Stack component
 * Tests various directions and spacing
 */

const STACK_STORY_URL = '/iframe.html?id=layout-stack--';

test.describe('Stack Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default stack renders correctly', async ({ page }) => {
    await page.goto(`${STACK_STORY_URL}default`);

    const stack = page.locator('ha-stack');
    await expect(stack).toBeVisible();

    await expect(page).toHaveScreenshot('stack-default.png');
  });

  test('horizontal stack renders correctly', async ({ page }) => {
    await page.goto(`${STACK_STORY_URL}horizontal`);

    const stack = page.locator('ha-stack');
    await expect(stack).toBeVisible();

    await expect(page).toHaveScreenshot('stack-horizontal.png');
  });

  test('with spacing renders correctly', async ({ page }) => {
    await page.goto(`${STACK_STORY_URL}spacing`);

    const stack = page.locator('ha-stack').first();
    await expect(stack).toBeVisible();

    await expect(page).toHaveScreenshot('stack-spacing.png');
  });

  test('with alignment renders correctly', async ({ page }) => {
    await page.goto(`${STACK_STORY_URL}alignment`);

    const stack = page.locator('ha-stack').first();
    await expect(stack).toBeVisible();

    await expect(page).toHaveScreenshot('stack-alignment.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${STACK_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const stack = page.locator('ha-stack');
    await expect(stack).toBeVisible();

    await expect(page).toHaveScreenshot('stack-dark-theme.png');
  });
});
