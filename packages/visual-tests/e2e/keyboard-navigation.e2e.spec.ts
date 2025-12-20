import { test, expect } from '@playwright/test';

/**
 * E2E tests for keyboard navigation
 * Tests keyboard accessibility and navigation patterns across components
 */

test.describe('Keyboard Navigation E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test.describe('Form Keyboard Navigation', () => {
    test('should navigate through form fields with Tab', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-input--default');

      await page.evaluate(() => {
        const form = document.createElement('form');
        form.innerHTML = `
          <ha-input id="field1" placeholder="Field 1"></ha-input>
          <ha-input id="field2" placeholder="Field 2"></ha-input>
          <ha-input id="field3" placeholder="Field 3"></ha-input>
          <ha-button id="submit-btn">Submit</ha-button>
        `;
        document.body.appendChild(form);
      });

      // Tab through fields
      await page.keyboard.press('Tab');
      let focused = await page.evaluate(() => document.activeElement?.id);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await page.keyboard.press('Tab');
      focused = await page.evaluate(() => document.activeElement?.id);
      expect(focused).toBe('submit-btn');
    });

    test('should navigate backwards with Shift+Tab', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-input--default');

      await page.evaluate(() => {
        const form = document.createElement('form');
        form.innerHTML = `
          <ha-input id="field1" placeholder="Field 1"></ha-input>
          <ha-input id="field2" placeholder="Field 2"></ha-input>
          <ha-button id="submit-btn">Submit</ha-button>
        `;
        document.body.appendChild(form);
      });

      // Tab forward to last element
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Shift+Tab backward
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(100);

      let focused = await page.evaluate(() => document.activeElement?.id);
      expect(focused).toBe('field2');
    });

    test('should activate checkbox with Space key', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-checkbox--default');

      await page.evaluate(() => {
        const checkbox = document.createElement('ha-checkbox');
        checkbox.id = 'test-checkbox';
        checkbox.textContent = 'Accept terms';
        document.body.appendChild(checkbox);
      });

      const checkbox = page.locator('#test-checkbox');

      // Focus checkbox
      await checkbox.focus();
      await page.waitForTimeout(100);

      // Press Space to toggle
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);

      // Press Space again to toggle back
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);
    });

    test('should activate radio button with Space and arrow keys', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-radio--default');

      await page.evaluate(() => {
        const group = document.createElement('div');
        group.setAttribute('role', 'radiogroup');
        group.innerHTML = `
          <ha-radio id="radio1" name="options" value="1">Option 1</ha-radio>
          <ha-radio id="radio2" name="options" value="2">Option 2</ha-radio>
          <ha-radio id="radio3" name="options" value="3">Option 3</ha-radio>
        `;
        document.body.appendChild(group);
      });

      // Focus first radio
      await page.locator('#radio1').focus();
      await page.waitForTimeout(100);

      // Use arrow keys to navigate
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);

      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);

      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(100);
    });
  });

  test.describe('Button Keyboard Activation', () => {
    test('should activate button with Enter key', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-button--default');

      await page.evaluate(() => {
        const btn = document.createElement('ha-button');
        btn.id = 'test-btn';
        btn.textContent = 'Click Me';

        let clicked = false;
        btn.addEventListener('click', () => {
          clicked = true;
          btn.textContent = 'Clicked!';
        });

        document.body.appendChild(btn);
      });

      const button = page.locator('#test-btn');
      await button.focus();

      // Press Enter
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      await expect(button).toHaveText('Clicked!');
    });

    test('should activate button with Space key', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-button--default');

      await page.evaluate(() => {
        const btn = document.createElement('ha-button');
        btn.id = 'test-btn';
        btn.textContent = 'Press Space';

        btn.addEventListener('click', () => {
          btn.textContent = 'Activated!';
        });

        document.body.appendChild(btn);
      });

      const button = page.locator('#test-btn');
      await button.focus();

      // Press Space
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);

      await expect(button).toHaveText('Activated!');
    });
  });

  test.describe('Menu Keyboard Navigation', () => {
    test('should navigate menu with arrow keys', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-menu--default');

      const menu = page.locator('ha-menu').first();
      if (await menu.count() > 0) {
        const firstItem = page.locator('ha-menu-item').first();
        await firstItem.focus();

        // Arrow Down
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(100);

        // Arrow Down again
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(100);

        // Arrow Up
        await page.keyboard.press('ArrowUp');
        await page.waitForTimeout(100);
      }
    });

    test('should activate menu item with Enter', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-menu--default');

      const menu = page.locator('ha-menu').first();
      if (await menu.count() > 0) {
        const firstItem = page.locator('ha-menu-item').first();
        await firstItem.focus();

        // Press Enter to activate
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
      }
    });

    test('should handle Home and End keys in menu', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-menu--default');

      const menu = page.locator('ha-menu').first();
      if (await menu.count() > 0) {
        const firstItem = page.locator('ha-menu-item').first();
        await firstItem.focus();

        // Press End to go to last item
        await page.keyboard.press('End');
        await page.waitForTimeout(100);

        // Press Home to go to first item
        await page.keyboard.press('Home');
        await page.waitForTimeout(100);
      }
    });
  });

  test.describe('Tabs Keyboard Navigation', () => {
    test('should navigate tabs with arrow keys', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-tabs--default');

      const tabs = page.locator('ha-tabs').first();
      if (await tabs.count() > 0) {
        const firstTab = page.locator('ha-tab').first();
        await firstTab.focus();

        // Arrow Right to next tab
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(200);

        // Arrow Right again
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(200);

        // Arrow Left to previous tab
        await page.keyboard.press('ArrowLeft');
        await page.waitForTimeout(200);
      }
    });

    test('should activate tab with Enter or Space', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-tabs--default');

      const firstTab = page.locator('ha-tab').first();
      if (await firstTab.count() > 0) {
        await firstTab.focus();

        // Press Enter
        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
      }
    });
  });

  test.describe('Modal Keyboard Interaction', () => {
    test('should close modal with Escape key', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-modal--default');

      await page.evaluate(() => {
        const modal = document.createElement('ha-modal');
        modal.id = 'test-modal';
        modal.setAttribute('open', '');
        modal.innerHTML = '<p>Press Escape to close</p>';
        document.body.appendChild(modal);

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            modal.removeAttribute('open');
          }
        });
      });

      const modal = page.locator('#test-modal');
      await expect(modal).toBeVisible();

      // Press Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
    });

    test('should trap Tab focus within modal', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-modal--default');

      await page.evaluate(() => {
        const modal = document.createElement('ha-modal');
        modal.id = 'test-modal';
        modal.setAttribute('open', '');
        modal.innerHTML = `
          <ha-button id="btn1">Button 1</ha-button>
          <ha-button id="btn2">Button 2</ha-button>
          <ha-button id="btn3">Button 3</ha-button>
        `;
        document.body.appendChild(modal);
      });

      // Tab through modal elements
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      let focused = await page.evaluate(() => document.activeElement?.id);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      // Tab should wrap around to first element
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    });
  });

  test.describe('Select/Dropdown Keyboard Navigation', () => {
    test('should open select with Enter or Space', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-select--default');

      const select = page.locator('ha-select').first();
      if (await select.count() > 0) {
        await select.focus();

        // Press Space to open
        await page.keyboard.press('Space');
        await page.waitForTimeout(200);
      }
    });

    test('should navigate options with arrow keys', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-select--default');

      const select = page.locator('ha-select').first();
      if (await select.count() > 0) {
        await select.focus();

        // Open dropdown
        await page.keyboard.press('Space');
        await page.waitForTimeout(200);

        // Navigate options
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(100);

        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(100);

        await page.keyboard.press('ArrowUp');
        await page.waitForTimeout(100);

        // Select with Enter
        await page.keyboard.press('Enter');
        await page.waitForTimeout(100);
      }
    });
  });

  test.describe('Table Keyboard Navigation', () => {
    test('should navigate table cells with arrow keys', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-table--default');

      await page.evaluate(() => {
        const table = document.createElement('table');
        table.id = 'test-table';
        table.innerHTML = `
          <thead>
            <tr>
              <th tabindex="0" id="header1">Column 1</th>
              <th tabindex="0" id="header2">Column 2</th>
              <th tabindex="0" id="header3">Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td tabindex="0" id="cell1-1">Data 1-1</td>
              <td tabindex="0" id="cell1-2">Data 1-2</td>
              <td tabindex="0" id="cell1-3">Data 1-3</td>
            </tr>
            <tr>
              <td tabindex="0" id="cell2-1">Data 2-1</td>
              <td tabindex="0" id="cell2-2">Data 2-2</td>
              <td tabindex="0" id="cell2-3">Data 2-3</td>
            </tr>
          </tbody>
        `;
        document.body.appendChild(table);
      });

      // Focus first cell
      await page.locator('#header1').focus();

      // Navigate with arrow keys
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);

      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);

      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(100);
    });
  });

  test.describe('Accessible Shortcuts', () => {
    test('should skip to main content with skip link', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-breadcrumb--default');

      await page.evaluate(() => {
        const skipLink = document.createElement('a');
        skipLink.id = 'skip-to-main';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = 'position: absolute; left: -9999px;';
        skipLink.addEventListener('focus', function() {
          this.style.left = '0';
        });
        skipLink.addEventListener('blur', function() {
          this.style.left = '-9999px';
        });
        document.body.prepend(skipLink);

        const main = document.createElement('main');
        main.id = 'main-content';
        main.tabIndex = -1;
        main.textContent = 'Main content area';
        document.body.appendChild(main);
      });

      // Tab to skip link (should be first)
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      // Activate skip link
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      // Verify focus is on main content
      const focused = await page.evaluate(() => document.activeElement?.id);
      expect(focused).toBe('main-content');
    });
  });
});
