export const tableStyles = `
  :host {
    display: block;
    --ha-table-border-color: var(--color-neutral-300);
    --ha-table-header-bg: var(--foreground-inverse);
    --ha-table-row-hover-bg: var(--foreground-inverse);
    --ha-table-striped-bg: var(--foreground-inverse);
    --ha-table-padding: var(--spacing-3);
    --ha-table-padding-compact: var(--spacing-2);
  }

  .table-wrapper {
    overflow-x: auto;
    border-radius: var(--border-radius-base);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-base);
    color: var(--foreground-primary);
  }

  .table--full-width {
    width: 100%;
  }

  /* Table cells */
  .table :slotted(thead) {
    background-color: var(--ha-table-header-bg);
    font-weight: var(--font-weight-semibold);
  }

  .table :slotted(th),
  .table :slotted(td) {
    padding: var(--ha-table-padding);
    text-align: left;
    vertical-align: middle;
  }

  /* Compact mode */
  .table--compact :slotted(th),
  .table--compact :slotted(td) {
    padding: var(--ha-table-padding-compact);
  }

  /* Bordered */
  .table--bordered {
    border: 1px solid var(--ha-table-border-color);
  }

  .table--bordered :slotted(th),
  .table--bordered :slotted(td) {
    border: 1px solid var(--ha-table-border-color);
  }

  /* Striped */
  .table--striped :slotted(tbody tr:nth-child(even)) {
    background-color: var(--ha-table-striped-bg);
  }

  /* Hoverable */
  .table--hoverable :slotted(tbody tr:hover) {
    background-color: var(--ha-table-row-hover-bg);
    cursor: pointer;
  }
`;
