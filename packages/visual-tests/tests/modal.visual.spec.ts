import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Modal component
 * Tests various sizes and states
 */

const MODAL_STORY_URL = '/iframe.html?id=components-modal--';

test.describe('Modal Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default modal renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}default`);

    // Open modal
    const openButton = page.locator('button');
    await openButton.click();

    const modal = page.locator('ha-modal[open]');
    await expect(modal).toBeVisible();

    // Wait for animation
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('modal-default.png', {
      fullPage: true,
    });
  });

  test('small modal renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}small`);

    const openButton = page.locator('button');
    await openButton.click();

    const modal = page.locator('ha-modal[open]');
    await expect(modal).toBeVisible();

    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('modal-small.png', {
      fullPage: true,
    });
  });

  test('large modal renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}large`);

    const openButton = page.locator('button');
    await openButton.click();

    const modal = page.locator('ha-modal[open]');
    await expect(modal).toBeVisible();

    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('modal-large.png', {
      fullPage: true,
    });
  });

  test('fullscreen modal renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}fullscreen`);

    const openButton = page.locator('button');
    await openButton.click();

    const modal = page.locator('ha-modal[open]');
    await expect(modal).toBeVisible();

    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('modal-fullscreen.png', {
      fullPage: true,
    });
  });

  test('modal with long content renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}with-long-content`);

    const openButton = page.locator('button');
    await openButton.click();

    const modal = page.locator('ha-modal[open]');
    await expect(modal).toBeVisible();

    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('modal-long-content.png', {
      fullPage: true,
    });
  });

  test('dark theme modal renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}default`);

    // Set dark theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const openButton = page.locator('button');
    await openButton.click();

    const modal = page.locator('ha-modal[open]');
    await expect(modal).toBeVisible();

    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('modal-dark-theme.png', {
      fullPage: true,
    });
  });

  test('mobile viewport modal renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${MODAL_STORY_URL}default`);

    const openButton = page.locator('button');
    await openButton.click();

    const modal = page.locator('ha-modal[open]');
    await expect(modal).toBeVisible();

    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('modal-mobile.png', {
      fullPage: true,
    });
  });
});
