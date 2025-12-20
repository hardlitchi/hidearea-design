import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for Accordion component
 * Tests various states
 */

const ACCORDION_STORY_URL = '/iframe.html?id=data-display-accordion--';

test.describe('Accordion Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default accordion renders correctly', async ({ page }) => {
    await page.goto(`${ACCORDION_STORY_URL}default`);

    const accordion = page.locator('ha-accordion');
    await expect(accordion).toBeVisible();

    await expect(page).toHaveScreenshot('accordion-default.png');
  });

  test('expanded accordion renders correctly', async ({ page }) => {
    await page.goto(`${ACCORDION_STORY_URL}default`);

    const accordion = page.locator('ha-accordion');
    await expect(accordion).toBeVisible();

    // Click to expand
    const trigger = page.locator('ha-accordion button').first();
    await trigger.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('accordion-expanded.png');
  });

  test('multiple items renders correctly', async ({ page }) => {
    await page.goto(`${ACCORDION_STORY_URL}multiple-items`);

    const accordion = page.locator('ha-accordion').first();
    await expect(accordion).toBeVisible();

    await expect(page).toHaveScreenshot('accordion-multiple.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${ACCORDION_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const accordion = page.locator('ha-accordion');
    await expect(accordion).toBeVisible();

    await expect(page).toHaveScreenshot('accordion-dark-theme.png');
  });
});
