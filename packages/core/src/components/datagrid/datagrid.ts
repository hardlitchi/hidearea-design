import { datagridStyles } from "./datagrid.styles";

export interface DataGridColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface DataGridRow {
  [key: string]: unknown;
}

type SortDirection = "asc" | "desc" | null;

/**
 * DataGrid component - Advanced data table with sorting, pagination, and selection
 *
 * @element ha-datagrid
 *
 * @attr {boolean} striped - Enable striped rows
 * @attr {boolean} bordered - Enable borders
 * @attr {boolean} hoverable - Enable row hover effect
 * @attr {boolean} selectable - Enable row selection
 * @attr {number} page-size - Number of rows per page (default: 10)
 * @attr {number} current-page - Current page number (default: 1)
 *
 * @fires sort-change - Fired when sort changes
 * @fires selection-change - Fired when selection changes
 * @fires page-change - Fired when page changes
 *
 * @cssprop --ha-datagrid-border-color - DataGrid border color
 * @cssprop --ha-datagrid-header-bg - DataGrid header background
 * @cssprop --ha-datagrid-row-hover-bg - DataGrid row hover background
 * @cssprop --ha-datagrid-selected-bg - DataGrid selected row background
 *
 * @csspart table - The table element
 * @csspart header - The table header
 * @csspart body - The table body
 * @csspart row - Table row
 * @csspart cell - Table cell
 * @csspart pagination - Pagination controls
 */
export class HaDataGrid extends HTMLElement {
  private tableElement: HTMLTableElement;
  private theadElement: HTMLTableSectionElement;
  private tbodyElement: HTMLTableSectionElement;
  private paginationElement: HTMLDivElement;

  private _columns: DataGridColumn[] = [];
  private _data: DataGridRow[] = [];
  private _sortKey: string | null = null;
  private _sortDirection: SortDirection = null;
  private _selectedRows: Set<number> = new Set();
  private _pageSize: number = 10;
  private _currentPage: number = 1;

  static get observedAttributes() {
    return ["striped", "bordered", "hoverable", "selectable", "page-size", "current-page"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = datagridStyles;

    // Create table
    this.tableElement = document.createElement("table");
    this.tableElement.className = "datagrid";
    this.tableElement.setAttribute("part", "table");

    // Create thead
    this.theadElement = document.createElement("thead");
    this.theadElement.setAttribute("part", "header");
    this.tableElement.appendChild(this.theadElement);

    // Create tbody
    this.tbodyElement = document.createElement("tbody");
    this.tbodyElement.setAttribute("part", "body");
    this.tableElement.appendChild(this.tbodyElement);

    // Create pagination
    this.paginationElement = document.createElement("div");
    this.paginationElement.className = "datagrid-pagination";
    this.paginationElement.setAttribute("part", "pagination");

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.tableElement);
    shadow.appendChild(this.paginationElement);
  }

  connectedCallback() {
    this.updateTable();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      if (name === "page-size") {
        this._pageSize = parseInt(newValue || "10", 10);
        this._currentPage = 1; // Reset to first page
        this.updateTable();
      } else if (name === "current-page") {
        this._currentPage = parseInt(newValue || "1", 10);
        this.updateTable();
      } else {
        this.updateTableClasses();
      }
    }
  }

  // Public API
  setColumns(columns: DataGridColumn[]) {
    this._columns = columns;
    this.updateTable();
  }

  setData(data: DataGridRow[]) {
    this._data = data;
    this._currentPage = 1; // Reset to first page
    this.updateTable();
  }

  getSelectedRows(): number[] {
    return Array.from(this._selectedRows);
  }

  clearSelection() {
    this._selectedRows.clear();
    this.updateTable();
    this.dispatchSelectionChange();
  }

  // Private methods
  private updateTableClasses() {
    this.tableElement.className = "datagrid";

    if (this.hasAttribute("striped")) {
      this.tableElement.classList.add("datagrid--striped");
    }

    if (this.hasAttribute("bordered")) {
      this.tableElement.classList.add("datagrid--bordered");
    }

    if (this.hasAttribute("hoverable")) {
      this.tableElement.classList.add("datagrid--hoverable");
    }

    if (this.hasAttribute("selectable")) {
      this.tableElement.classList.add("datagrid--selectable");
    }
  }

  private updateTable() {
    this.updateTableClasses();
    this.renderHeader();
    this.renderBody();
    this.renderPagination();
  }

  private renderHeader() {
    this.theadElement.innerHTML = "";
    const tr = document.createElement("tr");

    // Selection column
    if (this.hasAttribute("selectable")) {
      const th = document.createElement("th");
      th.className = "datagrid-cell datagrid-cell--checkbox";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", (e) => {
        this.handleSelectAll((e.target as HTMLInputElement).checked);
      });
      th.appendChild(checkbox);
      tr.appendChild(th);
    }

    // Data columns
    this._columns.forEach((column) => {
      const th = document.createElement("th");
      th.className = "datagrid-cell datagrid-header-cell";
      th.setAttribute("part", "cell");

      if (column.width) {
        th.style.width = column.width;
      }

      if (column.sortable) {
        th.classList.add("datagrid-header-cell--sortable");
        th.addEventListener("click", () => this.handleSort(column.key));

        const label = document.createElement("span");
        label.textContent = column.label;

        const icon = document.createElement("span");
        icon.className = "sort-icon";
        if (this._sortKey === column.key) {
          icon.textContent = this._sortDirection === "asc" ? " ↑" : " ↓";
        } else {
          icon.textContent = " ⇅";
        }

        th.appendChild(label);
        th.appendChild(icon);
      } else {
        th.textContent = column.label;
      }

      tr.appendChild(th);
    });

    this.theadElement.appendChild(tr);
  }

  private renderBody() {
    this.tbodyElement.innerHTML = "";

    const sortedData = this.getSortedData();
    const paginatedData = this.getPaginatedData(sortedData);

    paginatedData.forEach((row, index) => {
      const globalIndex = (this._currentPage - 1) * this._pageSize + index;
      const tr = document.createElement("tr");
      tr.className = "datagrid-row";
      tr.setAttribute("part", "row");

      if (this._selectedRows.has(globalIndex)) {
        tr.classList.add("datagrid-row--selected");
      }

      // Selection column
      if (this.hasAttribute("selectable")) {
        const td = document.createElement("td");
        td.className = "datagrid-cell datagrid-cell--checkbox";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this._selectedRows.has(globalIndex);
        checkbox.addEventListener("change", (e) => {
          this.handleRowSelect(globalIndex, (e.target as HTMLInputElement).checked);
        });
        td.appendChild(checkbox);
        tr.appendChild(td);
      }

      // Data columns
      this._columns.forEach((column) => {
        const td = document.createElement("td");
        td.className = "datagrid-cell";
        td.setAttribute("part", "cell");

        const value = row[column.key];
        if (value !== null && value !== undefined) {
          td.textContent = String(value);
        }

        tr.appendChild(td);
      });

      this.tbodyElement.appendChild(tr);
    });
  }

  private renderPagination() {
    this.paginationElement.innerHTML = "";

    if (this._data.length <= this._pageSize) {
      this.paginationElement.style.display = "none";
      return;
    }

    this.paginationElement.style.display = "flex";

    const totalPages = Math.ceil(this._data.length / this._pageSize);
    const start = (this._currentPage - 1) * this._pageSize + 1;
    const end = Math.min(this._currentPage * this._pageSize, this._data.length);

    // Info
    const info = document.createElement("span");
    info.className = "pagination-info";
    info.textContent = `${start}-${end} of ${this._data.length}`;
    this.paginationElement.appendChild(info);

    // Controls
    const controls = document.createElement("div");
    controls.className = "pagination-controls";

    // First button
    const firstBtn = this.createPaginationButton("«", 1, this._currentPage === 1);
    controls.appendChild(firstBtn);

    // Previous button
    const prevBtn = this.createPaginationButton("‹", this._currentPage - 1, this._currentPage === 1);
    controls.appendChild(prevBtn);

    // Page info
    const pageInfo = document.createElement("span");
    pageInfo.className = "pagination-page";
    pageInfo.textContent = `Page ${this._currentPage} of ${totalPages}`;
    controls.appendChild(pageInfo);

    // Next button
    const nextBtn = this.createPaginationButton("›", this._currentPage + 1, this._currentPage === totalPages);
    controls.appendChild(nextBtn);

    // Last button
    const lastBtn = this.createPaginationButton("»", totalPages, this._currentPage === totalPages);
    controls.appendChild(lastBtn);

    this.paginationElement.appendChild(controls);
  }

  private createPaginationButton(label: string, page: number, disabled: boolean): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.className = "pagination-button";
    btn.textContent = label;
    btn.disabled = disabled;
    btn.addEventListener("click", () => this.goToPage(page));
    return btn;
  }

  private getSortedData(): DataGridRow[] {
    if (!this._sortKey || !this._sortDirection) {
      return [...this._data];
    }

    return [...this._data].sort((a, b) => {
      const aVal = a[this._sortKey!];
      const bVal = b[this._sortKey!];

      if (aVal === bVal) return 0;

      let comparison = 0;
      if (aVal === null || aVal === undefined) {
        comparison = 1;
      } else if (bVal === null || bVal === undefined) {
        comparison = -1;
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return this._sortDirection === "asc" ? comparison : -comparison;
    });
  }

  private getPaginatedData(data: DataGridRow[]): DataGridRow[] {
    const start = (this._currentPage - 1) * this._pageSize;
    const end = start + this._pageSize;
    return data.slice(start, end);
  }

  private handleSort(key: string) {
    if (this._sortKey === key) {
      // Toggle direction
      if (this._sortDirection === "asc") {
        this._sortDirection = "desc";
      } else if (this._sortDirection === "desc") {
        this._sortDirection = null;
        this._sortKey = null;
      }
    } else {
      this._sortKey = key;
      this._sortDirection = "asc";
    }

    this.updateTable();
    this.dispatchSortChange();
  }

  private handleSelectAll(checked: boolean) {
    if (checked) {
      // Select all rows
      for (let i = 0; i < this._data.length; i++) {
        this._selectedRows.add(i);
      }
    } else {
      // Deselect all rows
      this._selectedRows.clear();
    }

    this.updateTable();
    this.dispatchSelectionChange();
  }

  private handleRowSelect(index: number, checked: boolean) {
    if (checked) {
      this._selectedRows.add(index);
    } else {
      this._selectedRows.delete(index);
    }

    this.updateTable();
    this.dispatchSelectionChange();
  }

  private goToPage(page: number) {
    const totalPages = Math.ceil(this._data.length / this._pageSize);
    if (page < 1 || page > totalPages) return;

    this._currentPage = page;
    this.setAttribute("current-page", String(page));
    this.updateTable();
    this.dispatchPageChange();
  }

  private dispatchSortChange() {
    this.dispatchEvent(
      new CustomEvent("sort-change", {
        detail: {
          sortKey: this._sortKey,
          sortDirection: this._sortDirection,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchSelectionChange() {
    this.dispatchEvent(
      new CustomEvent("selection-change", {
        detail: {
          selectedRows: this.getSelectedRows(),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchPageChange() {
    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: {
          currentPage: this._currentPage,
          pageSize: this._pageSize,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

// Register the custom element
if (!customElements.get("ha-datagrid")) {
  customElements.define("ha-datagrid", HaDataGrid);
}
