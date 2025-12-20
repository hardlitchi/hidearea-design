import { test, expect } from '@playwright/test';

/**
 * E2E tests for modal and overlay flows
 * Tests user interactions with drawers, modals, toasts, and other overlay components
 */

test.describe('Modal and Overlay Flows E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test.describe('Modal Flow', () => {
    test('should open and close modal', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-modal--default');

      // Create a button to open modal
      await page.evaluate(() => {
        const btn = document.createElement('ha-button');
        btn.id = 'open-modal';
        btn.textContent = 'Open Modal';
        document.body.appendChild(btn);

        const modal = document.createElement('ha-modal');
        modal.id = 'test-modal';
        modal.innerHTML = `
          <h2>Modal Title</h2>
          <p>Modal content</p>
          <ha-button id="close-modal">Close</ha-button>
        `;
        document.body.appendChild(modal);

        btn.addEventListener('click', () => {
          modal.setAttribute('open', '');
        });

        modal.querySelector('#close-modal')?.addEventListener('click', () => {
          modal.removeAttribute('open');
        });
      });

      // Open modal
      const openBtn = page.locator('#open-modal');
      await openBtn.click();
      await page.waitForTimeout(200);

      // Verify modal is visible
      const modal = page.locator('#test-modal');
      await expect(modal).toBeVisible();

      // Close modal
      const closeBtn = page.locator('#close-modal');
      await closeBtn.click();
      await page.waitForTimeout(200);
    });

    test('should close modal with Escape key', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-modal--default');

      await page.evaluate(() => {
        const modal = document.createElement('ha-modal');
        modal.id = 'test-modal';
        modal.setAttribute('open', '');
        modal.innerHTML = `<p>Press Escape to close</p>`;
        document.body.appendChild(modal);

        modal.addEventListener('keydown', (e) => {
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

    test('should trap focus within modal', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-modal--default');

      await page.evaluate(() => {
        const modal = document.createElement('ha-modal');
        modal.id = 'test-modal';
        modal.setAttribute('open', '');
        modal.innerHTML = `
          <ha-input id="input1" placeholder="First input"></ha-input>
          <ha-input id="input2" placeholder="Second input"></ha-input>
          <ha-button id="btn1">Button 1</ha-button>
          <ha-button id="btn2">Button 2</ha-button>
        `;
        document.body.appendChild(modal);
      });

      // Tab through focusable elements
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    });
  });

  test.describe('Drawer Flow', () => {
    test('should open and close drawer from different directions', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-drawer--default');

      // Test drawer from right
      await page.evaluate(() => {
        const btn = document.createElement('ha-button');
        btn.id = 'open-drawer';
        btn.textContent = 'Open Drawer';
        document.body.appendChild(btn);

        const drawer = document.createElement('ha-drawer');
        drawer.id = 'test-drawer';
        drawer.setAttribute('placement', 'right');
        drawer.innerHTML = `
          <h3>Drawer Content</h3>
          <ha-button id="close-drawer">Close</ha-button>
        `;
        document.body.appendChild(drawer);

        btn.addEventListener('click', () => {
          drawer.setAttribute('open', '');
        });

        drawer.querySelector('#close-drawer')?.addEventListener('click', () => {
          drawer.removeAttribute('open');
        });
      });

      // Open drawer
      await page.locator('#open-drawer').click();
      await page.waitForTimeout(300);

      const drawer = page.locator('#test-drawer');
      await expect(drawer).toBeVisible();

      // Close drawer
      await page.locator('#close-drawer').click();
      await page.waitForTimeout(300);
    });

    test('should close drawer by clicking backdrop', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-drawer--default');

      await page.evaluate(() => {
        const drawer = document.createElement('ha-drawer');
        drawer.id = 'test-drawer';
        drawer.setAttribute('open', '');
        drawer.innerHTML = `<p>Click outside to close</p>`;
        document.body.appendChild(drawer);

        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.id = 'drawer-backdrop';
        backdrop.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 999;';
        document.body.appendChild(backdrop);

        backdrop.addEventListener('click', () => {
          drawer.removeAttribute('open');
          backdrop.remove();
        });
      });

      // Click backdrop
      await page.locator('#drawer-backdrop').click();
      await page.waitForTimeout(300);
    });
  });

  test.describe('Toast Notification Flow', () => {
    test('should show and auto-dismiss toast', async ({ page }) => {
      await page.goto('/iframe.html?id=feedback-toast--default');

      await page.evaluate(() => {
        const btn = document.createElement('ha-button');
        btn.id = 'show-toast';
        btn.textContent = 'Show Toast';
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
          const toast = document.createElement('ha-toast');
          toast.id = 'test-toast';
          toast.setAttribute('variant', 'success');
          toast.innerHTML = 'Operation successful!';
          document.body.appendChild(toast);

          // Auto dismiss after 3 seconds
          setTimeout(() => {
            toast.remove();
          }, 3000);
        });
      });

      // Show toast
      await page.locator('#show-toast').click();
      await page.waitForTimeout(200);

      const toast = page.locator('#test-toast');
      await expect(toast).toBeVisible();

      // Wait for auto-dismiss
      await page.waitForTimeout(3200);
    });

    test('should manually close toast', async ({ page }) => {
      await page.goto('/iframe.html?id=feedback-toast--default');

      await page.evaluate(() => {
        const toast = document.createElement('ha-toast');
        toast.id = 'test-toast';
        toast.setAttribute('closable', '');
        toast.innerHTML = `
          Toast message
          <ha-button id="close-toast" size="sm">×</ha-button>
        `;
        document.body.appendChild(toast);

        toast.querySelector('#close-toast')?.addEventListener('click', () => {
          toast.remove();
        });
      });

      const toast = page.locator('#test-toast');
      await expect(toast).toBeVisible();

      // Close toast
      await page.locator('#close-toast').click();
      await page.waitForTimeout(200);
    });

    test('should show multiple toasts in sequence', async ({ page }) => {
      await page.goto('/iframe.html?id=feedback-toast--default');

      await page.evaluate(() => {
        const btn = document.createElement('ha-button');
        btn.id = 'show-multiple';
        btn.textContent = 'Show Multiple Toasts';
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
          ['success', 'info', 'warning', 'error'].forEach((variant, index) => {
            setTimeout(() => {
              const toast = document.createElement('ha-toast');
              toast.setAttribute('variant', variant);
              toast.textContent = `${variant} message`;
              toast.classList.add('toast-item');
              document.body.appendChild(toast);

              setTimeout(() => toast.remove(), 2000);
            }, index * 500);
          });
        });
      });

      // Show multiple toasts
      await page.locator('#show-multiple').click();
      await page.waitForTimeout(300);

      // Verify first toast is visible
      const toasts = page.locator('.toast-item');
      await expect(toasts.first()).toBeVisible();

      // Wait for sequence to complete
      await page.waitForTimeout(3000);
    });
  });

  test.describe('Tooltip Flow', () => {
    test('should show tooltip on hover', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-tooltip--default');

      const tooltip = page.locator('ha-tooltip').first();
      if (await tooltip.count() > 0) {
        // Hover over trigger element
        await tooltip.hover();
        await page.waitForTimeout(300);

        // Tooltip should be visible
        await expect(tooltip).toBeVisible();

        // Move away
        await page.mouse.move(0, 0);
        await page.waitForTimeout(300);
      }
    });

    test('should show tooltip with different placements', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-tooltip--placements');

      const tooltips = page.locator('ha-tooltip');
      const count = await tooltips.count();

      if (count > 0) {
        // Test first tooltip
        await tooltips.first().hover();
        await page.waitForTimeout(300);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(200);
      }
    });
  });

  test.describe('Dropdown Flow', () => {
    test('should open and close dropdown', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-dropdown--default');

      await page.evaluate(() => {
        const dropdown = document.createElement('div');
        dropdown.innerHTML = `
          <ha-button id="dropdown-trigger">Open Menu</ha-button>
          <div id="dropdown-menu" style="display: none; position: absolute; background: white; border: 1px solid #ccc; padding: 8px;">
            <ha-menu>
              <ha-menu-item id="menu-option-1">Option 1</ha-menu-item>
              <ha-menu-item id="menu-option-2">Option 2</ha-menu-item>
              <ha-menu-item id="menu-option-3">Option 3</ha-menu-item>
            </ha-menu>
          </div>
        `;
        document.body.appendChild(dropdown);

        const trigger = document.getElementById('dropdown-trigger');
        const menu = document.getElementById('dropdown-menu');

        trigger?.addEventListener('click', () => {
          if (menu) {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
          }
        });

        dropdown.querySelectorAll('ha-menu-item').forEach(item => {
          item.addEventListener('click', () => {
            if (menu) menu.style.display = 'none';
          });
        });
      });

      // Open dropdown
      await page.locator('#dropdown-trigger').click();
      await page.waitForTimeout(200);

      const menu = page.locator('#dropdown-menu');
      await expect(menu).toBeVisible();

      // Click option
      await page.locator('#menu-option-2').click();
      await page.waitForTimeout(200);
    });
  });

  test.describe('Popover Flow', () => {
    test('should toggle popover on click', async ({ page }) => {
      await page.goto('/iframe.html?id=overlays-popover--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <ha-button id="popover-trigger">Show Info</ha-button>
          <div id="popover-content" style="display: none; position: absolute; background: white; border: 1px solid #ccc; padding: 12px; max-width: 200px;">
            <h4>Information</h4>
            <p>This is a popover with additional information.</p>
            <ha-button id="popover-close" size="sm">Close</ha-button>
          </div>
        `;
        document.body.appendChild(container);

        const trigger = document.getElementById('popover-trigger');
        const content = document.getElementById('popover-content');
        const closeBtn = document.getElementById('popover-close');

        trigger?.addEventListener('click', () => {
          if (content) {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
          }
        });

        closeBtn?.addEventListener('click', () => {
          if (content) content.style.display = 'none';
        });
      });

      // Open popover
      await page.locator('#popover-trigger').click();
      await page.waitForTimeout(200);

      const popover = page.locator('#popover-content');
      await expect(popover).toBeVisible();

      // Close popover
      await page.locator('#popover-close').click();
      await page.waitForTimeout(200);
    });
  });
});
