import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Badge component
 * Tests various variants and sizes
 */

const BADGE_STORY_URL = '/iframe.html?id=data-display-badge--';

test.describe('Badge Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default badge renders correctly', async ({ page }) => {
    await page.goto(`${BADGE_STORY_URL}default`);

    const badge = page.locator('ha-badge');
    await expect(badge).toBeVisible();

    await expect(page).toHaveScreenshot('badge-default.png');
  });

  test('primary variant renders correctly', async ({ page }) => {
    await page.goto(`${BADGE_STORY_URL}variants`);

    const badge = page.locator('ha-badge[variant="primary"]').first();
    await expect(badge).toBeVisible();

    await expect(page).toHaveScreenshot('badge-primary.png');
  });

  test('success variant renders correctly', async ({ page }) => {
    await page.goto(`${BADGE_STORY_URL}variants`);

    const badge = page.locator('ha-badge[variant="success"]').first();
    await expect(badge).toBeVisible();

    await expect(page).toHaveScreenshot('badge-success.png');
  });

  test('warning variant renders correctly', async ({ page }) => {
    await page.goto(`${BADGE_STORY_URL}variants`);

    const badge = page.locator('ha-badge[variant="warning"]').first();
    await expect(badge).toBeVisible();

    await expect(page).toHaveScreenshot('badge-warning.png');
  });

  test('error variant renders correctly', async ({ page }) => {
    await page.goto(`${BADGE_STORY_URL}variants`);

    const badge = page.locator('ha-badge[variant="error"]').first();
    await expect(badge).toBeVisible();

    await expect(page).toHaveScreenshot('badge-error.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${BADGE_STORY_URL}sizes`);

    const badge = page.locator('ha-badge[size="sm"]').first();
    await expect(badge).toBeVisible();

    await expect(page).toHaveScreenshot('badge-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${BADGE_STORY_URL}sizes`);

    const badge = page.locator('ha-badge[size="lg"]').first();
    await expect(badge).toBeVisible();

    await expect(page).toHaveScreenshot('badge-large.png');
  });

  test('dot badge renders correctly', async ({ page }) => {
    await page.goto(`${BADGE_STORY_URL}dot`);

    const badge = page.locator('ha-badge');
    await expect(badge).toBeVisible();

    await expect(page).toHaveScreenshot('badge-dot.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${BADGE_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const badge = page.locator('ha-badge');
    await expect(badge).toBeVisible();

    await expect(page).toHaveScreenshot('badge-dark-theme.png');
  });
});
