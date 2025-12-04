export const tableStyles = `
  :host {
    display: block;
    --ha-table-border-color: var(--ha-color-neutral-3);
    --ha-table-header-bg: var(--ha-color-neutral-1);
    --ha-table-row-hover-bg: var(--ha-color-neutral-1);
    --ha-table-striped-bg: var(--ha-color-neutral-1);
    --ha-table-padding: var(--ha-spacing-3);
    --ha-table-padding-compact: var(--ha-spacing-2);
  }

  .table-wrapper {
    overflow-x: auto;
    border-radius: var(--ha-border-radius-base);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--ha-font-size-base);
    color: var(--ha-color-neutral-9);
  }

  .table--full-width {
    width: 100%;
  }

  /* Table cells */
  .table :slotted(thead) {
    background-color: var(--ha-table-header-bg);
    font-weight: var(--ha-font-weight-semibold);
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
