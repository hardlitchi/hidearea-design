import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Avatar component
 * Tests various sizes, variants, and states
 */

const AVATAR_STORY_URL = '/iframe.html?id=data-display-avatar--';

test.describe('Avatar Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default avatar renders correctly', async ({ page }) => {
    await page.goto(`${AVATAR_STORY_URL}default`);

    const avatar = page.locator('ha-avatar');
    await expect(avatar).toBeVisible();

    await expect(page).toHaveScreenshot('avatar-default.png');
  });

  test('with image renders correctly', async ({ page }) => {
    await page.goto(`${AVATAR_STORY_URL}with-image`);

    const avatar = page.locator('ha-avatar');
    await expect(avatar).toBeVisible();

    await expect(page).toHaveScreenshot('avatar-image.png');
  });

  test('with initials renders correctly', async ({ page }) => {
    await page.goto(`${AVATAR_STORY_URL}with-initials`);

    const avatar = page.locator('ha-avatar');
    await expect(avatar).toBeVisible();

    await expect(page).toHaveScreenshot('avatar-initials.png');
  });

  test('small size renders correctly', async ({ page }) => {
    await page.goto(`${AVATAR_STORY_URL}sizes`);

    const avatar = page.locator('ha-avatar[size="sm"]').first();
    await expect(avatar).toBeVisible();

    await expect(page).toHaveScreenshot('avatar-small.png');
  });

  test('large size renders correctly', async ({ page }) => {
    await page.goto(`${AVATAR_STORY_URL}sizes`);

    const avatar = page.locator('ha-avatar[size="lg"]').first();
    await expect(avatar).toBeVisible();

    await expect(page).toHaveScreenshot('avatar-large.png');
  });

  test('rounded variant renders correctly', async ({ page }) => {
    await page.goto(`${AVATAR_STORY_URL}shapes`);

    const avatar = page.locator('ha-avatar[shape="rounded"]').first();
    await expect(avatar).toBeVisible();

    await expect(page).toHaveScreenshot('avatar-rounded.png');
  });

  test('square variant renders correctly', async ({ page }) => {
    await page.goto(`${AVATAR_STORY_URL}shapes`);

    const avatar = page.locator('ha-avatar[shape="square"]').first();
    await expect(avatar).toBeVisible();

    await expect(page).toHaveScreenshot('avatar-square.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${AVATAR_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const avatar = page.locator('ha-avatar');
    await expect(avatar).toBeVisible();

    await expect(page).toHaveScreenshot('avatar-dark-theme.png');
  });
});
