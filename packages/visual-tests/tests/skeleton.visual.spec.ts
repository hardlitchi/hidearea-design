import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Skeleton component
 * Tests various variants and states
 */

const SKELETON_STORY_URL = '/iframe.html?id=feedback-skeleton--';

test.describe('Skeleton Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default skeleton renders correctly', async ({ page }) => {
    await page.goto(`${SKELETON_STORY_URL}default`);

    const skeleton = page.locator('ha-skeleton');
    await expect(skeleton).toBeVisible();

    await expect(page).toHaveScreenshot('skeleton-default.png');
  });

  test('text variant renders correctly', async ({ page }) => {
    await page.goto(`${SKELETON_STORY_URL}variants`);

    const skeleton = page.locator('ha-skeleton[variant="text"]').first();
    await expect(skeleton).toBeVisible();

    await expect(page).toHaveScreenshot('skeleton-text.png');
  });

  test('circular variant renders correctly', async ({ page }) => {
    await page.goto(`${SKELETON_STORY_URL}variants`);

    const skeleton = page.locator('ha-skeleton[variant="circular"]').first();
    await expect(skeleton).toBeVisible();

    await expect(page).toHaveScreenshot('skeleton-circular.png');
  });

  test('rectangular variant renders correctly', async ({ page }) => {
    await page.goto(`${SKELETON_STORY_URL}variants`);

    const skeleton = page.locator('ha-skeleton[variant="rectangular"]').first();
    await expect(skeleton).toBeVisible();

    await expect(page).toHaveScreenshot('skeleton-rectangular.png');
  });

  test('animated skeleton renders correctly', async ({ page }) => {
    await page.goto(`${SKELETON_STORY_URL}animated`);

    await page.waitForTimeout(100);

    const skeleton = page.locator('ha-skeleton');
    await expect(skeleton).toBeVisible();

    await expect(page).toHaveScreenshot('skeleton-animated.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${SKELETON_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const skeleton = page.locator('ha-skeleton');
    await expect(skeleton).toBeVisible();

    await expect(page).toHaveScreenshot('skeleton-dark-theme.png');
  });
});
