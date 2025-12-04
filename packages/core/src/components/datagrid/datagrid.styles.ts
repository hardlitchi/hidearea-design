export const datagridStyles = `
  :host {
    display: block;
    width: 100%;
  }

  .datagrid {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--ha-datagrid-bg, var(--ha-color-neutral-50, #ffffff));
    color: var(--ha-datagrid-color, var(--ha-color-neutral-900, #1f2937));
    font-size: var(--ha-font-size-sm, 0.875rem);
  }

  /* Header */
  .datagrid thead {
    background-color: var(--ha-datagrid-header-bg, var(--ha-color-neutral-100, #f3f4f6));
    font-weight: var(--ha-font-weight-semibold, 600);
  }

  .datagrid-cell {
    padding: var(--ha-datagrid-cell-padding, var(--ha-spacing-3, 0.75rem));
    text-align: left;
    border-bottom: 1px solid var(--ha-datagrid-border-color, var(--ha-color-neutral-200, #e5e7eb));
  }

  .datagrid-header-cell {
    user-select: none;
  }

  .datagrid-header-cell--sortable {
    cursor: pointer;
    transition: background-color 150ms ease;
  }

  .datagrid-header-cell--sortable:hover {
    background-color: var(--ha-datagrid-header-hover-bg, var(--ha-color-neutral-200, #e5e7eb));
  }

  .sort-icon {
    margin-left: var(--ha-spacing-1, 0.25rem);
    color: var(--ha-color-neutral-500, #6b7280);
    font-size: var(--ha-font-size-xs, 0.75rem);
  }

  /* Body */
  .datagrid-row {
    transition: background-color 150ms ease;
  }

  .datagrid--hoverable .datagrid-row:hover {
    background-color: var(--ha-datagrid-row-hover-bg, var(--ha-color-neutral-50, #f9fafb));
  }

  .datagrid-row--selected {
    background-color: var(--ha-datagrid-selected-bg, var(--ha-color-primary-50, #eff6ff));
  }

  .datagrid--hoverable .datagrid-row--selected:hover {
    background-color: var(--ha-datagrid-selected-hover-bg, var(--ha-color-primary-100, #dbeafe));
  }

  /* Striped */
  .datagrid--striped tbody tr:nth-child(even) {
    background-color: var(--ha-datagrid-stripe-bg, var(--ha-color-neutral-50, #f9fafb));
  }

  /* Bordered */
  .datagrid--bordered {
    border: 1px solid var(--ha-datagrid-border-color, var(--ha-color-neutral-200, #e5e7eb));
  }

  .datagrid--bordered .datagrid-cell {
    border-right: 1px solid var(--ha-datagrid-border-color, var(--ha-color-neutral-200, #e5e7eb));
  }

  .datagrid--bordered .datagrid-cell:last-child {
    border-right: none;
  }

  /* Checkbox column */
  .datagrid-cell--checkbox {
    width: 40px;
    text-align: center;
    padding: var(--ha-spacing-2, 0.5rem);
  }

  .datagrid-cell--checkbox input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }

  /* Pagination */
  .datagrid-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--ha-spacing-3, 0.75rem) var(--ha-spacing-4, 1rem);
    border-top: 1px solid var(--ha-datagrid-border-color, var(--ha-color-neutral-200, #e5e7eb));
    background-color: var(--ha-datagrid-bg, var(--ha-color-neutral-50, #ffffff));
    font-size: var(--ha-font-size-sm, 0.875rem);
  }

  .pagination-info {
    color: var(--ha-color-neutral-600, #4b5563);
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: var(--ha-spacing-2, 0.5rem);
  }

  .pagination-page {
    color: var(--ha-color-neutral-600, #4b5563);
    padding: 0 var(--ha-spacing-2, 0.5rem);
  }

  .pagination-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--ha-spacing-2, 0.5rem);
    border: 1px solid var(--ha-datagrid-border-color, var(--ha-color-neutral-200, #e5e7eb));
    border-radius: var(--ha-border-radius-base, 0.25rem);
    background-color: var(--ha-color-neutral-50, #ffffff);
    color: var(--ha-color-neutral-700, #374151);
    font-size: var(--ha-font-size-sm, 0.875rem);
    font-weight: var(--ha-font-weight-medium, 500);
    cursor: pointer;
    transition: all 150ms ease;
  }

  .pagination-button:hover:not(:disabled) {
    background-color: var(--ha-color-neutral-100, #f3f4f6);
    border-color: var(--ha-color-neutral-300, #d1d5db);
  }

  .pagination-button:active:not(:disabled) {
    background-color: var(--ha-color-neutral-200, #e5e7eb);
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Empty state */
  .datagrid-empty {
    padding: var(--ha-spacing-8, 2rem);
    text-align: center;
    color: var(--ha-color-neutral-500, #6b7280);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .datagrid-cell {
      padding: var(--ha-spacing-2, 0.5rem);
    }

    .pagination-info {
      display: none;
    }

    .pagination-page {
      font-size: var(--ha-font-size-xs, 0.75rem);
    }
  }
`;
