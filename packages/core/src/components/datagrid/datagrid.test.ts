import { describe, it, expect, beforeEach, vi } from "vitest";
import { HaDataGrid } from "./datagrid";
import type { DataGridColumn, DataGridRow } from "./datagrid";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";

describe("HaDataGrid", () => {
  let datagrid: HaDataGrid;

  const sampleColumns: DataGridColumn[] = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: false },
    { key: "age", label: "Age", sortable: true, width: "100px" },
  ];

  const sampleData: DataGridRow[] = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 30 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 25 },
    { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 },
    { id: 4, name: "Diana", email: "diana@example.com", age: 28 },
    { id: 5, name: "Eve", email: "eve@example.com", age: 32 },
  ];

  beforeEach(async () => {
    datagrid = document.createElement("ha-datagrid") as HaDataGrid;
    document.body.appendChild(datagrid);
    await waitForCustomElement("ha-datagrid");
  });

  describe("Component Registration", () => {
    it("should be defined", () => {
      expect(customElements.get("ha-datagrid")).toBeDefined();
    });

    it("should create shadow root", () => {
      expect(datagrid.shadowRoot).not.toBeNull();
    });
  });

  describe("Initial State", () => {
    it("should render empty table initially", () => {
      const table = queryShadow(datagrid, "table");
      expect(table).not.toBeNull();
    });

    it("should have default page size of 10", () => {
      expect(datagrid.getAttribute("page-size")).toBeNull();
      datagrid.setData(sampleData);
      datagrid.setColumns(sampleColumns);
      // With 5 items and page size 10, pagination should not be visible
      const pagination = queryShadow(datagrid, ".datagrid-pagination") as HTMLElement;
      expect(pagination.style.display).toBe("none");
    });
  });

  describe("Columns and Data", () => {
    it("should render columns", () => {
      datagrid.setColumns(sampleColumns);
      const headers = queryShadow(datagrid, "thead th", true);
      expect(headers.length).toBe(4); // 4 data columns
    });

    it("should render data rows", () => {
      datagrid.setColumns(sampleColumns);
      datagrid.setData(sampleData);
      const rows = queryShadow(datagrid, "tbody tr", true);
      expect(rows.length).toBe(5);
    });

    it("should render cell content", () => {
      datagrid.setColumns(sampleColumns);
      datagrid.setData(sampleData);
      const firstCell = queryShadow(datagrid, "tbody tr:first-child td:first-child");
      expect(firstCell?.textContent).toBe("1");
    });

    it("should apply column width", () => {
      datagrid.setColumns(sampleColumns);
      const firstHeader = queryShadow(datagrid, "thead th:first-child") as HTMLElement;
      expect(firstHeader?.style.width).toBe("80px");
    });
  });

  describe("Sorting", () => {
    beforeEach(() => {
      datagrid.setColumns(sampleColumns);
      datagrid.setData(sampleData);
    });

    it("should mark sortable columns", () => {
      const sortableHeaders = queryShadow(datagrid, ".datagrid-header-cell--sortable", true);
      expect(sortableHeaders.length).toBe(3); // id, name, age are sortable
    });

    it("should not mark non-sortable columns", () => {
      const emailHeader = queryShadow(datagrid, "thead th:nth-child(3)");
      expect(emailHeader?.classList.contains("datagrid-header-cell--sortable")).toBe(false);
    });

    it("should show sort icon", () => {
      const sortIcon = queryShadow(datagrid, ".sort-icon");
      expect(sortIcon).not.toBeNull();
    });

    it("should sort ascending on first click", () => {
      const nameHeader = queryShadow(datagrid, "thead th:nth-child(2)") as HTMLElement;
      nameHeader?.click();

      const firstCell = queryShadow(datagrid, "tbody tr:first-child td:nth-child(2)");
      expect(firstCell?.textContent).toBe("Alice");
    });

    it("should sort descending on second click", () => {
      const nameHeader = queryShadow(datagrid, "thead th:nth-child(2)") as HTMLElement;
      nameHeader?.click(); // asc
      nameHeader?.click(); // desc

      const firstCell = queryShadow(datagrid, "tbody tr:first-child td:nth-child(2)");
      expect(firstCell?.textContent).toBe("Eve");
    });

    it("should clear sort on third click", () => {
      const nameHeader = queryShadow(datagrid, "thead th:nth-child(2)") as HTMLElement;
      nameHeader?.click(); // asc
      nameHeader?.click(); // desc
      nameHeader?.click(); // clear

      const firstCell = queryShadow(datagrid, "tbody tr:first-child td:nth-child(1)");
      expect(firstCell?.textContent).toBe("1"); // Original order
    });

    it("should emit sort-change event", () => {
      const handler = vi.fn();
      datagrid.addEventListener("sort-change", handler);

      const nameHeader = queryShadow(datagrid, "thead th:nth-child(2)") as HTMLElement;
      nameHeader?.click();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.sortKey).toBe("name");
      expect(handler.mock.calls[0][0].detail.sortDirection).toBe("asc");
    });

    it("should sort numbers correctly", () => {
      const ageHeader = queryShadow(datagrid, "thead th:nth-child(4)") as HTMLElement;
      ageHeader?.click();

      const firstCell = queryShadow(datagrid, "tbody tr:first-child td:nth-child(4)");
      expect(firstCell?.textContent).toBe("25");
    });
  });

  describe("Selection", () => {
    beforeEach(() => {
      datagrid.setAttribute("selectable", "");
      datagrid.setColumns(sampleColumns);
      datagrid.setData(sampleData);
    });

    it("should show checkbox column when selectable", () => {
      const checkboxCells = queryShadow(datagrid, ".datagrid-cell--checkbox", true);
      expect(checkboxCells.length).toBeGreaterThan(0);
    });

    it("should have checkbox in header", () => {
      const headerCheckbox = queryShadow(datagrid, "thead .datagrid-cell--checkbox input[type='checkbox']");
      expect(headerCheckbox).not.toBeNull();
    });

    it("should select row when checkbox clicked", () => {
      const firstCheckbox = queryShadow(datagrid, "tbody tr:first-child .datagrid-cell--checkbox input") as HTMLInputElement;
      firstCheckbox?.click();

      expect(datagrid.getSelectedRows()).toContain(0);
    });

    it("should select all rows when header checkbox clicked", () => {
      const headerCheckbox = queryShadow(datagrid, "thead .datagrid-cell--checkbox input") as HTMLInputElement;
      headerCheckbox?.click();

      expect(datagrid.getSelectedRows().length).toBe(5);
    });

    it("should deselect row when clicked again", () => {
      const firstCheckbox = queryShadow(datagrid, "tbody tr:first-child .datagrid-cell--checkbox input") as HTMLInputElement;
      firstCheckbox?.click();
      firstCheckbox?.click();

      expect(datagrid.getSelectedRows()).not.toContain(0);
    });

    it("should clear all selections", () => {
      const firstCheckbox = queryShadow(datagrid, "tbody tr:first-child .datagrid-cell--checkbox input") as HTMLInputElement;
      firstCheckbox?.click();

      datagrid.clearSelection();

      expect(datagrid.getSelectedRows().length).toBe(0);
    });

    it("should emit selection-change event", () => {
      const handler = vi.fn();
      datagrid.addEventListener("selection-change", handler);

      const firstCheckbox = queryShadow(datagrid, "tbody tr:first-child .datagrid-cell--checkbox input") as HTMLInputElement;
      firstCheckbox?.click();

      expect(handler).toHaveBeenCalled();
    });

    it("should apply selected row class", () => {
      const firstCheckbox = queryShadow(datagrid, "tbody tr:first-child .datagrid-cell--checkbox input") as HTMLInputElement;
      firstCheckbox?.click();

      const firstRow = queryShadow(datagrid, "tbody tr:first-child");
      expect(firstRow?.classList.contains("datagrid-row--selected")).toBe(true);
    });
  });

  describe("Pagination", () => {
    const largeData: DataGridRow[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      email: `person${i + 1}@example.com`,
      age: 20 + (i % 30),
    }));

    beforeEach(() => {
      datagrid.setColumns(sampleColumns);
      datagrid.setData(largeData);
    });

    it("should show pagination when data exceeds page size", () => {
      const pagination = queryShadow(datagrid, ".datagrid-pagination") as HTMLElement;
      expect(pagination.style.display).not.toBe("none");
    });

    it("should show correct page info", () => {
      const pageInfo = queryShadow(datagrid, ".pagination-page");
      expect(pageInfo?.textContent).toContain("Page 1 of 3");
    });

    it("should show correct item count", () => {
      const info = queryShadow(datagrid, ".pagination-info");
      expect(info?.textContent).toBe("1-10 of 25");
    });

    it("should display only page size items", () => {
      const rows = queryShadow(datagrid, "tbody tr", true);
      expect(rows.length).toBe(10);
    });

    it("should navigate to next page", () => {
      const nextBtn = queryShadow(datagrid, ".pagination-button:nth-child(4)") as HTMLButtonElement;
      nextBtn?.click();

      const info = queryShadow(datagrid, ".pagination-info");
      expect(info?.textContent).toBe("11-20 of 25");
    });

    it("should navigate to previous page", () => {
      const nextBtn = queryShadow(datagrid, ".pagination-button:nth-child(4)") as HTMLButtonElement;
      nextBtn?.click();

      const prevBtn = queryShadow(datagrid, ".pagination-button:nth-child(2)") as HTMLButtonElement;
      prevBtn?.click();

      const info = queryShadow(datagrid, ".pagination-info");
      expect(info?.textContent).toBe("1-10 of 25");
    });

    it("should navigate to first page", () => {
      const nextBtn = queryShadow(datagrid, ".pagination-button:nth-child(4)") as HTMLButtonElement;
      nextBtn?.click();

      const firstBtn = queryShadow(datagrid, ".pagination-button:first-child") as HTMLButtonElement;
      firstBtn?.click();

      const pageInfo = queryShadow(datagrid, ".pagination-page");
      expect(pageInfo?.textContent).toContain("Page 1 of");
    });

    it("should navigate to last page", () => {
      const lastBtn = queryShadow(datagrid, ".pagination-button:last-child") as HTMLButtonElement;
      lastBtn?.click();

      const info = queryShadow(datagrid, ".pagination-info");
      expect(info?.textContent).toBe("21-25 of 25");
    });

    it("should disable first/prev buttons on first page", () => {
      const firstBtn = queryShadow(datagrid, ".pagination-button:first-child") as HTMLButtonElement;
      const prevBtn = queryShadow(datagrid, ".pagination-button:nth-child(2)") as HTMLButtonElement;

      expect(firstBtn?.disabled).toBe(true);
      expect(prevBtn?.disabled).toBe(true);
    });

    it("should disable next/last buttons on last page", () => {
      const lastBtn = queryShadow(datagrid, ".pagination-button:last-child") as HTMLButtonElement;
      lastBtn?.click();

      const nextBtn = queryShadow(datagrid, ".pagination-button:nth-child(4)") as HTMLButtonElement;
      const lastBtn2 = queryShadow(datagrid, ".pagination-button:last-child") as HTMLButtonElement;

      expect(nextBtn?.disabled).toBe(true);
      expect(lastBtn2?.disabled).toBe(true);
    });

    it("should emit page-change event", () => {
      const handler = vi.fn();
      datagrid.addEventListener("page-change", handler);

      const nextBtn = queryShadow(datagrid, ".pagination-button:nth-child(4)") as HTMLButtonElement;
      nextBtn?.click();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.currentPage).toBe(2);
    });

    it("should respect custom page size", () => {
      datagrid.setAttribute("page-size", "5");
      const rows = queryShadow(datagrid, "tbody tr", true);
      expect(rows.length).toBe(5);
    });

    it("should reset to first page when data changes", () => {
      const nextBtn = queryShadow(datagrid, ".pagination-button:nth-child(4)") as HTMLButtonElement;
      nextBtn?.click();

      datagrid.setData(largeData);

      const pageInfo = queryShadow(datagrid, ".pagination-page");
      expect(pageInfo?.textContent).toContain("Page 1 of");
    });
  });

  describe("Attributes", () => {
    beforeEach(() => {
      datagrid.setColumns(sampleColumns);
      datagrid.setData(sampleData);
    });

    it("should apply striped class", () => {
      datagrid.setAttribute("striped", "");
      const table = queryShadow(datagrid, "table");
      expect(table?.classList.contains("datagrid--striped")).toBe(true);
    });

    it("should apply bordered class", () => {
      datagrid.setAttribute("bordered", "");
      const table = queryShadow(datagrid, "table");
      expect(table?.classList.contains("datagrid--bordered")).toBe(true);
    });

    it("should apply hoverable class", () => {
      datagrid.setAttribute("hoverable", "");
      const table = queryShadow(datagrid, "table");
      expect(table?.classList.contains("datagrid--hoverable")).toBe(true);
    });

    it("should apply selectable class", () => {
      datagrid.setAttribute("selectable", "");
      const table = queryShadow(datagrid, "table");
      expect(table?.classList.contains("datagrid--selectable")).toBe(true);
    });
  });

  describe("CSS Parts", () => {
    it("should expose table part", () => {
      const table = queryShadow(datagrid, "[part='table']");
      expect(table).not.toBeNull();
    });

    it("should expose header part", () => {
      const header = queryShadow(datagrid, "[part='header']");
      expect(header).not.toBeNull();
    });

    it("should expose body part", () => {
      const body = queryShadow(datagrid, "[part='body']");
      expect(body).not.toBeNull();
    });

    it("should expose pagination part", () => {
      const pagination = queryShadow(datagrid, "[part='pagination']");
      expect(pagination).not.toBeNull();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty data", () => {
      datagrid.setColumns(sampleColumns);
      datagrid.setData([]);
      const rows = queryShadow(datagrid, "tbody tr", true);
      expect(rows.length).toBe(0);
    });

    it("should handle null values", () => {
      datagrid.setColumns(sampleColumns);
      datagrid.setData([{ id: 1, name: null, email: undefined, age: 0 }]);
      const cells = queryShadow(datagrid, "tbody tr:first-child td", true);
      expect(cells.length).toBe(4);
    });

    it("should handle sorting with null values", () => {
      datagrid.setColumns(sampleColumns);
      datagrid.setData([
        { id: 1, name: "Alice", email: "alice@example.com", age: 30 },
        { id: 2, name: null, email: "bob@example.com", age: 25 },
        { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 },
      ]);

      const nameHeader = queryShadow(datagrid, "thead th:nth-child(2)") as HTMLElement;
      nameHeader?.click();

      const rows = queryShadow(datagrid, "tbody tr", true);
      expect(rows.length).toBe(3);
    });

    it("should maintain selection across pages", () => {
      const largeData: DataGridRow[] = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Person ${i + 1}`,
        email: `person${i + 1}@example.com`,
        age: 20 + i,
      }));

      datagrid.setAttribute("selectable", "");
      datagrid.setColumns(sampleColumns);
      datagrid.setData(largeData);

      const firstCheckbox = queryShadow(datagrid, "tbody tr:first-child .datagrid-cell--checkbox input") as HTMLInputElement;
      firstCheckbox?.click();

      const nextBtn = queryShadow(datagrid, ".pagination-button:nth-child(4)") as HTMLButtonElement;
      nextBtn?.click();

      expect(datagrid.getSelectedRows()).toContain(0);
    });
  });
});
