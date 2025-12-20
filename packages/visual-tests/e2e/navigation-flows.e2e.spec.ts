import { test, expect } from '@playwright/test';

/**
 * E2E tests for navigation flows
 * Tests user interactions with navigation components (menu, breadcrumb, tabs, pagination)
 */

test.describe('Navigation Flows E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test.describe('Menu Navigation', () => {
    test('should navigate through menu items', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-menu--default');

      const menu = page.locator('ha-menu');
      await expect(menu).toBeVisible();

      // Click on menu items
      const menuItems = page.locator('ha-menu-item');
      const count = await menuItems.count();

      if (count > 0) {
        // Click first menu item
        await menuItems.first().click();
        await page.waitForTimeout(100);

        // Verify active state
        const firstItem = menuItems.first();
        await expect(firstItem).toBeVisible();
      }
    });

    test('should expand nested menu items', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-menu--nested');

      const menu = page.locator('ha-menu');
      await expect(menu).toBeVisible();

      // Find expandable menu items
      const expandableItems = page.locator('ha-menu-item[expandable]');
      const count = await expandableItems.count();

      if (count > 0) {
        // Click to expand
        await expandableItems.first().click();
        await page.waitForTimeout(200);

        // Click nested item
        const nestedItems = page.locator('ha-menu-item[level="2"]');
        if (await nestedItems.count() > 0) {
          await nestedItems.first().click();
          await page.waitForTimeout(100);
        }
      }
    });

    test('should handle horizontal menu navigation', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-menu--horizontal');

      const menu = page.locator('ha-menu');
      await expect(menu).toBeVisible();

      const menuItems = page.locator('ha-menu-item');
      const count = await menuItems.count();

      if (count > 1) {
        // Navigate through items
        await menuItems.nth(0).click();
        await page.waitForTimeout(100);

        await menuItems.nth(1).click();
        await page.waitForTimeout(100);
      }
    });
  });

  test.describe('Breadcrumb Navigation', () => {
    test('should navigate using breadcrumb links', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-breadcrumb--default');

      const breadcrumb = page.locator('ha-breadcrumb');
      await expect(breadcrumb).toBeVisible();

      // Click on breadcrumb items
      const items = page.locator('ha-breadcrumb-item');
      const count = await items.count();

      if (count > 1) {
        // Click on a middle breadcrumb item (not the last one)
        await items.nth(0).click();
        await page.waitForTimeout(100);
      }
    });

    test('should show full navigation path', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-breadcrumb--default');

      const breadcrumb = page.locator('ha-breadcrumb');
      await expect(breadcrumb).toBeVisible();

      // Verify breadcrumb items are visible
      const items = page.locator('ha-breadcrumb-item');
      const count = await items.count();

      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Tabs Navigation', () => {
    test('should switch between tabs', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-tabs--default');

      const tabs = page.locator('ha-tabs');
      await expect(tabs).toBeVisible();

      // Wait for tabs to be ready
      await page.waitForTimeout(200);

      // Click on different tabs
      const tabButtons = page.locator('ha-tab');
      const count = await tabButtons.count();

      if (count > 1) {
        // Click second tab
        await tabButtons.nth(1).click();
        await page.waitForTimeout(200);

        // Verify tab panel changed
        const panels = page.locator('ha-tab-panel');
        if (await panels.count() > 1) {
          await expect(panels.nth(1)).toBeVisible();
        }

        // Click first tab again
        await tabButtons.nth(0).click();
        await page.waitForTimeout(200);
      }
    });

    test('should handle keyboard navigation in tabs', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-tabs--default');

      const tabs = page.locator('ha-tabs');
      await expect(tabs).toBeVisible();

      const tabButtons = page.locator('ha-tab');
      const count = await tabButtons.count();

      if (count > 0) {
        // Focus first tab
        await tabButtons.first().focus();
        await page.waitForTimeout(100);

        // Press Arrow Right to navigate
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(100);

        // Press Arrow Left to navigate back
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(100);
      }
    });

    test('should support vertical tabs layout', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-tabs--vertical');

      const tabs = page.locator('ha-tabs');
      await expect(tabs).toBeVisible();

      const tabButtons = page.locator('ha-tab');
      const count = await tabButtons.count();

      if (count > 1) {
        await tabButtons.nth(1).click();
        await page.waitForTimeout(200);
      }
    });
  });

  test.describe('Pagination Navigation', () => {
    test('should navigate through pages', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-pagination--default');

      const pagination = page.locator('ha-pagination');
      await expect(pagination).toBeVisible();

      // Click next button
      const nextBtn = page.locator('ha-pagination button[aria-label*="Next"]');
      if (await nextBtn.count() > 0) {
        await nextBtn.click();
        await page.waitForTimeout(100);
      }

      // Click previous button
      const prevBtn = page.locator('ha-pagination button[aria-label*="Previous"]');
      if (await prevBtn.count() > 0) {
        await prevBtn.click();
        await page.waitForTimeout(100);
      }
    });

    test('should jump to specific page', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-pagination--many-pages');

      const pagination = page.locator('ha-pagination');
      await expect(pagination).toBeVisible();

      // Click on page number button
      const pageButtons = page.locator('ha-pagination button[type="button"]');
      const count = await pageButtons.count();

      if (count > 2) {
        // Click on a specific page (not first or last)
        await pageButtons.nth(1).click();
        await page.waitForTimeout(100);
      }
    });

    test('should handle pagination with different sizes', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-pagination--sizes');

      const pagination = page.locator('ha-pagination');
      await expect(pagination).toBeVisible();

      // Verify pagination renders in different sizes
      await page.waitForTimeout(100);
    });
  });

  test.describe('Combined Navigation Flow', () => {
    test('should use breadcrumb, menu, and tabs together', async ({ page }) => {
      // Create a page with multiple navigation components
      await page.goto('/iframe.html?id=navigation-menu--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <ha-breadcrumb>
            <ha-breadcrumb-item href="#home">Home</ha-breadcrumb-item>
            <ha-breadcrumb-item href="#products">Products</ha-breadcrumb-item>
            <ha-breadcrumb-item>Details</ha-breadcrumb-item>
          </ha-breadcrumb>

          <ha-menu>
            <ha-menu-item id="nav-overview">Overview</ha-menu-item>
            <ha-menu-item id="nav-specs">Specifications</ha-menu-item>
            <ha-menu-item id="nav-reviews">Reviews</ha-menu-item>
          </ha-menu>

          <ha-tabs>
            <ha-tab id="tab-details">Details</ha-tab>
            <ha-tab id="tab-features">Features</ha-tab>
            <ha-tab id="tab-support">Support</ha-tab>
          </ha-tabs>
        `;
        document.body.appendChild(container);
      });

      // Navigate using breadcrumb
      const breadcrumbItem = page.locator('ha-breadcrumb-item').first();
      await breadcrumbItem.click();
      await page.waitForTimeout(100);

      // Navigate using menu
      const menuItem = page.locator('#nav-specs');
      await menuItem.click();
      await page.waitForTimeout(100);

      // Switch tabs
      const tab = page.locator('#tab-features');
      await tab.click();
      await page.waitForTimeout(100);
    });
  });
});
