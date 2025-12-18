import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Modal component
 * Tests various sizes and states
 */

const MODAL_STORY_URL = '/iframe.html?id=overlays-modal--';

test.describe('Modal Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default modal renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}default`);

    // Open modal
    const openButton = page.getByRole('button', { name: 'Open Modal' });
    await openButton.click();

    const modal = page.locator('ha-modal[open]');

    // Wait for animation
    await page.waitForTimeout(1000);
    await expect(modal).toHaveAttribute("open");

    await expect(page).toHaveScreenshot('modal-default.png', {
      fullPage: true,
    });
  });

  test('sizes story renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}sizes`);

    // Open first modal (extra small)
    const openButton = page.locator('button').first();
    await openButton.click();

    const modal = page.locator('ha-modal[open]');

    // Wait for animation
    await page.waitForTimeout(1000);
    await expect(modal).toHaveAttribute("open");

    await expect(page).toHaveScreenshot('modal-sizes.png', {
      fullPage: true,
    });
  });

  test('variants story renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}variants`);

    // Open first modal (default)
    const openButton = page.locator('button').first();
    await openButton.click();

    const modal = page.locator('ha-modal[open]');

    // Wait for animation
    await page.waitForTimeout(1000);
    await expect(modal).toHaveAttribute("open");

    await expect(page).toHaveScreenshot('modal-variants.png', {
      fullPage: true,
    });
  });

  test('with footer story renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}with-footer`);

    const openButton = page.getByRole('button', { name: 'Open Modal' });
    await openButton.click();

    const modal = page.locator('ha-modal[open]');

    // Wait for animation
    await page.waitForTimeout(1000);
    await expect(modal).toHaveAttribute("open");

    await expect(page).toHaveScreenshot('modal-with-footer.png', {
      fullPage: true,
    });
  });

  test('long content story renders correctly', async ({ page }) => {
    await page.goto(`${MODAL_STORY_URL}long-content`);

    const openButton = page.getByRole('button', { name: /Open.*Modal/i });
    await openButton.click();

    const modal = page.locator('ha-modal[open]');

    // Wait for animation
    await page.waitForTimeout(1000);
    await expect(modal).toHaveAttribute("open");

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

    const openButton = page.getByRole('button', { name: 'Open Modal' });
    await openButton.click();

    const modal = page.locator('ha-modal[open]');

    // Wait for animation
    await page.waitForTimeout(1000);
    await expect(modal).toHaveAttribute("open");

    await expect(page).toHaveScreenshot('modal-dark-theme.png', {
      fullPage: true,
    });
  });

  test('mobile viewport modal renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${MODAL_STORY_URL}default`);

    const openButton = page.getByRole('button', { name: 'Open Modal' });
    await openButton.click();

    const modal = page.locator('ha-modal[open]');

    // Wait for animation
    await page.waitForTimeout(1000);
    await expect(modal).toHaveAttribute("open");

    await expect(page).toHaveScreenshot('modal-mobile.png', {
      fullPage: true,
    });
  });
});
