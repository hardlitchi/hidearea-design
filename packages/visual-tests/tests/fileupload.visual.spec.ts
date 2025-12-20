import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for FileUpload component
 * Tests various states and configurations
 */

const FILEUPLOAD_STORY_URL = '/iframe.html?id=forms-fileupload--';

test.describe('FileUpload Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('default fileupload renders correctly', async ({ page }) => {
    await page.goto(`${FILEUPLOAD_STORY_URL}default`);

    const fileupload = page.locator('ha-fileupload');
    await expect(fileupload).toBeVisible();

    await expect(page).toHaveScreenshot('fileupload-default.png');
  });

  test('drag and drop area renders correctly', async ({ page }) => {
    await page.goto(`${FILEUPLOAD_STORY_URL}drag-drop`);

    const fileupload = page.locator('ha-fileupload');
    await expect(fileupload).toBeVisible();

    await expect(page).toHaveScreenshot('fileupload-drag-drop.png');
  });

  test('disabled state renders correctly', async ({ page }) => {
    await page.goto(`${FILEUPLOAD_STORY_URL}disabled`);

    const fileupload = page.locator('ha-fileupload');
    await expect(fileupload).toBeVisible();

    await expect(page).toHaveScreenshot('fileupload-disabled.png');
  });

  test('with file list renders correctly', async ({ page }) => {
    await page.goto(`${FILEUPLOAD_STORY_URL}with-files`);

    const fileupload = page.locator('ha-fileupload');
    await expect(fileupload).toBeVisible();

    await expect(page).toHaveScreenshot('fileupload-with-files.png');
  });

  test('multiple files renders correctly', async ({ page }) => {
    await page.goto(`${FILEUPLOAD_STORY_URL}multiple`);

    const fileupload = page.locator('ha-fileupload');
    await expect(fileupload).toBeVisible();

    await expect(page).toHaveScreenshot('fileupload-multiple.png');
  });

  test('dark theme renders correctly', async ({ page }) => {
    await page.goto(`${FILEUPLOAD_STORY_URL}default`);

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const fileupload = page.locator('ha-fileupload');
    await expect(fileupload).toBeVisible();

    await expect(page).toHaveScreenshot('fileupload-dark-theme.png');
  });
});
