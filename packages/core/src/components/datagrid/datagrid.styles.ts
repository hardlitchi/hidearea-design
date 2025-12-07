export const datagridStyles = `
  :host {
    display: block;
    width: 100%;
  }

  .datagrid {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--datagrid-bg, var(--color-neutral-50, #ffffff));
    color: var(--datagrid-color, var(--foreground-primary));
    font-size: var(--font-size-sm);
  }

  /* Header */
  .datagrid thead {
    background-color: var(--datagrid-header-bg, var(--foreground-inverse));
    font-weight: var(--font-weight-semibold);
  }

  .datagrid-cell {
    padding: var(--datagrid-cell-padding, var(--spacing-3));
    text-align: left;
    border-bottom: 1px solid var(--datagrid-border-color, var(--color-neutral-200, #e5e7eb));
  }

  .datagrid-header-cell {
    user-select: none;
  }

  .datagrid-header-cell--sortable {
    cursor: pointer;
    transition: background-color 150ms ease;
  }

  .datagrid-header-cell--sortable:hover {
    background-color: var(--datagrid-header-hover-bg, var(--color-neutral-200, #e5e7eb));
  }

  .sort-icon {
    margin-left: var(--spacing-1);
    color: var(--color-neutral-500, #6b7280);
    font-size: var(--font-size-xs);
  }

  /* Body */
  .datagrid-row {
    transition: background-color 150ms ease;
  }

  .datagrid--hoverable .datagrid-row:hover {
    background-color: var(--datagrid-row-hover-bg, var(--color-neutral-50, #f9fafb));
  }

  .datagrid-row--selected {
    background-color: var(--datagrid-selected-bg, var(--primary-default));
  }

  .datagrid--hoverable .datagrid-row--selected:hover {
    background-color: var(--datagrid-selected-hover-bg, var(--primary-default));
  }

  /* Striped */
  .datagrid--striped tbody tr:nth-child(even) {
    background-color: var(--datagrid-stripe-bg, var(--color-neutral-50, #f9fafb));
  }

  /* Bordered */
  .datagrid--bordered {
    border: 1px solid var(--datagrid-border-color, var(--color-neutral-200, #e5e7eb));
  }

  .datagrid--bordered .datagrid-cell {
    border-right: 1px solid var(--datagrid-border-color, var(--color-neutral-200, #e5e7eb));
  }

  .datagrid--bordered .datagrid-cell:last-child {
    border-right: none;
  }

  /* Checkbox column */
  .datagrid-cell--checkbox {
    width: 40px;
    text-align: center;
    padding: var(--spacing-2);
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
    padding: var(--spacing-3) var(--spacing-4);
    border-top: 1px solid var(--datagrid-border-color, var(--color-neutral-200, #e5e7eb));
    background-color: var(--datagrid-bg, var(--color-neutral-50, #ffffff));
    font-size: var(--font-size-sm);
  }

  .pagination-info {
    color: var(--color-neutral-600, #4b5563);
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
  }

  .pagination-page {
    color: var(--color-neutral-600, #4b5563);
    padding: 0 var(--spacing-2);
  }

  .pagination-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 var(--spacing-2);
    border: 1px solid var(--datagrid-border-color, var(--color-neutral-200, #e5e7eb));
    border-radius: var(--border-radius-md);
    background-color: var(--color-neutral-50, #ffffff);
    color: var(--color-neutral-700, #374151);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all 150ms ease;
  }

  .pagination-button:hover:not(:disabled) {
    background-color: var(--foreground-inverse);
    border-color: var(--color-neutral-300, #d1d5db);
  }

  .pagination-button:active:not(:disabled) {
    background-color: var(--color-neutral-200, #e5e7eb);
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Empty state */
  .datagrid-empty {
    padding: var(--spacing-8);
    text-align: center;
    color: var(--color-neutral-500, #6b7280);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .datagrid-cell {
      padding: var(--spacing-2);
    }

    .pagination-info {
      display: none;
    }

    .pagination-page {
      font-size: var(--font-size-xs);
    }
  }
`;
