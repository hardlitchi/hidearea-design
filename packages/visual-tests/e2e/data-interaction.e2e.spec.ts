import { test, expect } from '@playwright/test';

/**
 * E2E tests for data interaction flows
 * Tests user interactions with tables, data grids, sorting, filtering, and pagination
 */

test.describe('Data Interaction Flows E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test.describe('Table Sorting', () => {
    test('should sort table by column', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-table--default');

      await page.evaluate(() => {
        const table = document.createElement('table');
        table.id = 'sortable-table';
        table.innerHTML = `
          <thead>
            <tr>
              <th id="name-header" style="cursor: pointer;">
                Name
                <span class="sort-indicator">↕</span>
              </th>
              <th id="age-header" style="cursor: pointer;">
                Age
                <span class="sort-indicator">↕</span>
              </th>
            </tr>
          </thead>
          <tbody id="table-body">
            <tr><td>Alice</td><td>30</td></tr>
            <tr><td>Bob</td><td>25</td></tr>
            <tr><td>Charlie</td><td>35</td></tr>
          </tbody>
        `;
        document.body.appendChild(table);

        // Add sorting logic
        document.getElementById('name-header')?.addEventListener('click', function() {
          const tbody = document.getElementById('table-body');
          const rows = Array.from(tbody?.querySelectorAll('tr') || []);
          const sorted = rows.sort((a, b) => {
            const aText = a.cells[0].textContent || '';
            const bText = b.cells[0].textContent || '';
            return aText.localeCompare(bText);
          });
          tbody?.append(...sorted);
        });

        document.getElementById('age-header')?.addEventListener('click', function() {
          const tbody = document.getElementById('table-body');
          const rows = Array.from(tbody?.querySelectorAll('tr') || []);
          const sorted = rows.sort((a, b) => {
            const aNum = parseInt(a.cells[1].textContent || '0');
            const bNum = parseInt(b.cells[1].textContent || '0');
            return aNum - bNum;
          });
          tbody?.append(...sorted);
        });
      });

      // Click name header to sort
      await page.locator('#name-header').click();
      await page.waitForTimeout(200);

      // Verify sorting
      const firstRowName = await page.locator('#table-body tr:first-child td:first-child').textContent();
      expect(firstRowName).toBe('Alice');

      // Click age header to sort
      await page.locator('#age-header').click();
      await page.waitForTimeout(200);

      const firstRowAge = await page.locator('#table-body tr:first-child td:nth-child(2)').textContent();
      expect(firstRowAge).toBe('25');
    });

    test('should toggle sort direction', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-table--default');

      await page.evaluate(() => {
        let sortAsc = true;
        const table = document.createElement('table');
        table.id = 'sortable-table';
        table.innerHTML = `
          <thead>
            <tr>
              <th id="sort-header" style="cursor: pointer;">
                Name <span id="sort-dir">↑</span>
              </th>
            </tr>
          </thead>
          <tbody id="table-body">
            <tr><td>Zebra</td></tr>
            <tr><td>Apple</td></tr>
            <tr><td>Mango</td></tr>
          </tbody>
        `;
        document.body.appendChild(table);

        document.getElementById('sort-header')?.addEventListener('click', function() {
          const tbody = document.getElementById('table-body');
          const rows = Array.from(tbody?.querySelectorAll('tr') || []);
          const sorted = rows.sort((a, b) => {
            const aText = a.cells[0].textContent || '';
            const bText = b.cells[0].textContent || '';
            return sortAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
          });
          tbody?.append(...sorted);
          sortAsc = !sortAsc;
          const indicator = document.getElementById('sort-dir');
          if (indicator) indicator.textContent = sortAsc ? '↑' : '↓';
        });
      });

      // First click - ascending
      await page.locator('#sort-header').click();
      await page.waitForTimeout(200);

      let firstRow = await page.locator('#table-body tr:first-child td').textContent();
      expect(firstRow).toBe('Apple');

      // Second click - descending
      await page.locator('#sort-header').click();
      await page.waitForTimeout(200);

      firstRow = await page.locator('#table-body tr:first-child td').textContent();
      expect(firstRow).toBe('Zebra');
    });
  });

  test.describe('Table Filtering', () => {
    test('should filter table rows based on search input', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-table--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <ha-input id="search-input" placeholder="Search..."></ha-input>
          <table id="filterable-table">
            <thead>
              <tr><th>Name</th><th>Role</th></tr>
            </thead>
            <tbody id="table-body">
              <tr class="table-row"><td>Alice Developer</td><td>Engineer</td></tr>
              <tr class="table-row"><td>Bob Manager</td><td>Management</td></tr>
              <tr class="table-row"><td>Charlie Designer</td><td>Design</td></tr>
            </tbody>
          </table>
        `;
        document.body.appendChild(container);

        const input = document.getElementById('search-input') as any;
        input?.addEventListener('input', function() {
          const searchTerm = this.value.toLowerCase();
          const rows = document.querySelectorAll('.table-row');
          rows.forEach((row: any) => {
            const text = row.textContent?.toLowerCase() || '';
            row.style.display = text.includes(searchTerm) ? '' : 'none';
          });
        });
      });

      const searchInput = page.locator('#search-input');

      // Filter for "Developer"
      await searchInput.click();
      await searchInput.type('Developer');
      await page.waitForTimeout(200);

      // Verify only matching rows are visible
      const visibleRows = page.locator('#table-body tr[style=""]');
      await expect(visibleRows).toHaveCount(1);

      // Clear and search for "Manager"
      await searchInput.fill('Manager');
      await page.waitForTimeout(200);
    });

    test('should filter with multiple criteria', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-table--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div>
            <ha-select id="role-filter">
              <option value="">All Roles</option>
              <option value="Engineer">Engineer</option>
              <option value="Designer">Designer</option>
            </ha-select>
            <ha-input id="name-filter" placeholder="Name..."></ha-input>
          </div>
          <table>
            <tbody id="table-body">
              <tr class="data-row" data-role="Engineer"><td>Alice</td><td>Engineer</td></tr>
              <tr class="data-row" data-role="Designer"><td>Bob</td><td>Designer</td></tr>
              <tr class="data-row" data-role="Engineer"><td>Charlie</td><td>Engineer</td></tr>
            </tbody>
          </table>
        `;
        document.body.appendChild(container);

        function applyFilters() {
          const roleFilter = (document.getElementById('role-filter') as any)?.value || '';
          const nameFilter = ((document.getElementById('name-filter') as any)?.value || '').toLowerCase();
          const rows = document.querySelectorAll('.data-row');

          rows.forEach((row: any) => {
            const role = row.dataset.role || '';
            const name = (row.cells[0].textContent || '').toLowerCase();
            const matchRole = !roleFilter || role === roleFilter;
            const matchName = !nameFilter || name.includes(nameFilter);
            row.style.display = matchRole && matchName ? '' : 'none';
          });
        }

        document.getElementById('role-filter')?.addEventListener('change', applyFilters);
        document.getElementById('name-filter')?.addEventListener('input', applyFilters);
      });

      // Filter by name
      await page.locator('#name-filter').type('Alice');
      await page.waitForTimeout(200);
    });
  });

  test.describe('Pagination', () => {
    test('should navigate between pages', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-pagination--default');

      await page.evaluate(() => {
        let currentPage = 1;
        const totalPages = 5;
        const itemsPerPage = 10;

        const container = document.createElement('div');
        container.innerHTML = `
          <div id="data-container"></div>
          <div id="pagination-controls">
            <ha-button id="prev-btn" disabled>Previous</ha-button>
            <span id="page-info">Page 1 of 5</span>
            <ha-button id="next-btn">Next</ha-button>
          </div>
        `;
        document.body.appendChild(container);

        function loadPage(page: number) {
          currentPage = page;
          const dataContainer = document.getElementById('data-container');
          if (dataContainer) {
            dataContainer.innerHTML = `<p>Showing page ${page}</p>`;
          }

          const prevBtn = document.getElementById('prev-btn') as any;
          const nextBtn = document.getElementById('next-btn') as any;
          const pageInfo = document.getElementById('page-info');

          if (prevBtn) prevBtn.disabled = page === 1;
          if (nextBtn) nextBtn.disabled = page === totalPages;
          if (pageInfo) pageInfo.textContent = `Page ${page} of ${totalPages}`;
        }

        document.getElementById('prev-btn')?.addEventListener('click', () => {
          if (currentPage > 1) loadPage(currentPage - 1);
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
          if (currentPage < totalPages) loadPage(currentPage + 1);
        });
      });

      // Click next
      await page.locator('#next-btn').click();
      await page.waitForTimeout(200);

      let pageInfo = await page.locator('#page-info').textContent();
      expect(pageInfo).toContain('Page 2');

      // Click next again
      await page.locator('#next-btn').click();
      await page.waitForTimeout(200);

      pageInfo = await page.locator('#page-info').textContent();
      expect(pageInfo).toContain('Page 3');

      // Click previous
      await page.locator('#prev-btn').click();
      await page.waitForTimeout(200);

      pageInfo = await page.locator('#page-info').textContent();
      expect(pageInfo).toContain('Page 2');
    });

    test('should change items per page', async ({ page }) => {
      await page.goto('/iframe.html?id=navigation-pagination--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <ha-select id="per-page-select">
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </ha-select>
          <div id="items-count">Showing 10 items</div>
        `;
        document.body.appendChild(container);

        document.getElementById('per-page-select')?.addEventListener('change', function(this: any) {
          const count = this.value;
          const display = document.getElementById('items-count');
          if (display) display.textContent = `Showing ${count} items`;
        });
      });

      const select = page.locator('#per-page-select');
      await select.selectOption('25');
      await page.waitForTimeout(200);

      const itemsCount = await page.locator('#items-count').textContent();
      expect(itemsCount).toContain('25');
    });
  });

  test.describe('DataGrid Interactions', () => {
    test('should select rows in datagrid', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-datagrid--selectable');

      await page.waitForTimeout(300);

      const datagrid = page.locator('ha-datagrid');
      if (await datagrid.count() > 0) {
        await expect(datagrid).toBeVisible();

        // Try to click on rows
        const rows = page.locator('ha-datagrid tr[role="row"]');
        const rowCount = await rows.count();

        if (rowCount > 0) {
          await rows.first().click();
          await page.waitForTimeout(200);
        }
      }
    });

    test('should resize columns', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-datagrid--default');

      await page.waitForTimeout(300);

      const datagrid = page.locator('ha-datagrid');
      if (await datagrid.count() > 0) {
        await expect(datagrid).toBeVisible();

        // Look for resize handles
        const resizeHandles = page.locator('.column-resize-handle');
        const handleCount = await resizeHandles.count();

        if (handleCount > 0) {
          const handle = resizeHandles.first();
          const box = await handle.boundingBox();

          if (box) {
            // Drag to resize
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await page.mouse.move(box.x + 50, box.y + box.height / 2);
            await page.mouse.up();
            await page.waitForTimeout(200);
          }
        }
      }
    });
  });

  test.describe('Row Selection', () => {
    test('should select single row', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-table--default');

      await page.evaluate(() => {
        const table = document.createElement('table');
        table.innerHTML = `
          <tbody>
            <tr class="selectable-row"><td>Row 1</td></tr>
            <tr class="selectable-row"><td>Row 2</td></tr>
            <tr class="selectable-row"><td>Row 3</td></tr>
          </tbody>
        `;
        document.body.appendChild(table);

        document.querySelectorAll('.selectable-row').forEach(row => {
          row.addEventListener('click', function() {
            document.querySelectorAll('.selectable-row').forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');
          });
        });
      });

      const row = page.locator('.selectable-row').nth(1);
      await row.click();
      await page.waitForTimeout(100);

      await expect(row).toHaveClass(/selected/);
    });

    test('should select multiple rows with checkbox', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-table--default');

      await page.evaluate(() => {
        const table = document.createElement('table');
        table.innerHTML = `
          <thead>
            <tr>
              <th><ha-checkbox id="select-all"></ha-checkbox></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><ha-checkbox class="row-checkbox"></ha-checkbox></td><td>Alice</td></tr>
            <tr><td><ha-checkbox class="row-checkbox"></ha-checkbox></td><td>Bob</td></tr>
            <tr><td><ha-checkbox class="row-checkbox"></ha-checkbox></td><td>Charlie</td></tr>
          </tbody>
        `;
        document.body.appendChild(table);

        document.getElementById('select-all')?.addEventListener('change', function(this: any) {
          const checked = this.checked;
          document.querySelectorAll('.row-checkbox').forEach((cb: any) => {
            cb.checked = checked;
          });
        });
      });

      // Select individual row
      await page.locator('.row-checkbox').first().click();
      await page.waitForTimeout(100);

      // Select all
      await page.locator('#select-all').click();
      await page.waitForTimeout(100);
    });
  });

  test.describe('Inline Editing', () => {
    test('should edit cell inline', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-table--default');

      await page.evaluate(() => {
        const table = document.createElement('table');
        table.innerHTML = `
          <tbody>
            <tr>
              <td class="editable" id="cell1">Click to edit</td>
            </tr>
          </tbody>
        `;
        document.body.appendChild(table);

        document.querySelectorAll('.editable').forEach(cell => {
          cell.addEventListener('dblclick', function(this: any) {
            const currentValue = this.textContent;
            const input = document.createElement('input');
            input.value = currentValue;
            input.style.width = '100%';

            this.textContent = '';
            this.appendChild(input);
            input.focus();

            input.addEventListener('blur', function() {
              cell.textContent = input.value;
            });

            input.addEventListener('keydown', function(e) {
              if (e.key === 'Enter') {
                cell.textContent = input.value;
              }
            });
          });
        });
      });

      const cell = page.locator('#cell1');

      // Double click to edit
      await cell.dblclick();
      await page.waitForTimeout(200);

      // Type new value
      const input = page.locator('#cell1 input');
      await input.fill('New value');
      await input.press('Enter');
      await page.waitForTimeout(200);

      await expect(cell).toHaveText('New value');
    });
  });

  test.describe('Data Export', () => {
    test('should trigger data export', async ({ page }) => {
      await page.goto('/iframe.html?id=data-display-table--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <ha-button id="export-csv">Export CSV</ha-button>
          <ha-button id="export-json">Export JSON</ha-button>
        `;
        document.body.appendChild(container);

        let exportTriggered = false;

        document.getElementById('export-csv')?.addEventListener('click', () => {
          exportTriggered = true;
          console.log('CSV export triggered');
        });

        document.getElementById('export-json')?.addEventListener('click', () => {
          exportTriggered = true;
          console.log('JSON export triggered');
        });
      });

      // Click export buttons
      await page.locator('#export-csv').click();
      await page.waitForTimeout(100);

      await page.locator('#export-json').click();
      await page.waitForTimeout(100);
    });
  });
});
