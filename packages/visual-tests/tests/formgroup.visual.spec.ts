import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for FormGroup component
 * Tests various layouts and states
 */

const FORMGROUP_STORY_URL = '/iframe.html?id=forms-formgroup--';

test.describe('FormGroup Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default formgroup renders correctly', async ({ page }) => {
    await page.goto(`${FORMGROUP_STORY_URL}default`);

    const formgroup = page.locator('ha-formgroup');
    await expect(formgroup).toBeVisible();

    await expect(page).toHaveScreenshot('formgroup-default.png');
  });

  test('with label renders correctly', async ({ page }) => {
    await page.goto(`${FORMGROUP_STORY_URL}with-label`);

    const formgroup = page.locator('ha-formgroup');
    await expect(formgroup).toBeVisible();

    await expect(page).toHaveScreenshot('formgroup-with-label.png');
  });

  test('with error renders correctly', async ({ page }) => {
    await page.goto(`${FORMGROUP_STORY_URL}with-error`);

    const formgroup = page.locator('ha-formgroup');
    await expect(formgroup).toBeVisible();

    await expect(page).toHaveScreenshot('formgroup-with-error.png');
  });

  test('with helper text renders correctly', async ({ page }) => {
    await page.goto(`${FORMGROUP_STORY_URL}with-helper`);

    const formgroup = page.locator('ha-formgroup');
    await expect(formgroup).toBeVisible();

    await expect(page).toHaveScreenshot('formgroup-with-helper.png');
  });

  test('required field renders correctly', async ({ page }) => {
    await page.goto(`${FORMGROUP_STORY_URL}required`);

    const formgroup = page.locator('ha-formgroup');
    await expect(formgroup).toBeVisible();

    await expect(page).toHaveScreenshot('formgroup-required.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${FORMGROUP_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const formgroup = page.locator('ha-formgroup');
    await expect(formgroup).toBeVisible();

    await expect(page).toHaveScreenshot('formgroup-dark-theme.png');
  });
});
