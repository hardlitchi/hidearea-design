import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Table',
  tagName: 'ha-table',
  description: 'Data table component for displaying structured data',
  category: 'Data Display',
  props: [
    { name: 'data', type: 'Array<Record<string, any>>', required: true, description: 'Table data' },
    { name: 'columns', type: 'Array<Column>', required: true, description: 'Column definitions' },
    { name: 'sortable', type: 'boolean', default: 'false', required: false, description: 'Enable column sorting' },
    { name: 'selectable', type: 'boolean', default: 'false', required: false, description: 'Enable row selection' },
    { name: 'striped', type: 'boolean', default: 'false', required: false, description: 'Striped rows' },
    { name: 'hoverable', type: 'boolean', default: 'false', required: false, description: 'Hover effect on rows' },
    { name: 'bordered', type: 'boolean', default: 'false', required: false, description: 'Show borders' },
  ],
  events: [
    { name: 'ha-sort', detail: '{ column: string, direction: "asc" | "desc" }', description: 'Emitted when column is sorted' },
    { name: 'ha-select', detail: '{ selectedRows: Array<any> }', description: 'Emitted when rows are selected' },
    { name: 'ha-row-click', detail: '{ row: any, index: number }', description: 'Emitted when row is clicked' },
  ],
  slots: [
    { name: 'default', description: 'Custom cell content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple data table',
      code: `<ha-table
  :data="users"
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ]"
></ha-table>`,
    },
    {
      title: 'Sortable Table',
      description: 'Table with sortable columns',
      code: `<ha-table
  :data="products"
  :columns="columns"
  sortable
  hoverable
></ha-table>`,
    },
  ],
  accessibility: {
    roles: ['table', 'rowgroup', 'row', 'columnheader', 'cell'],
    keyboardSupport: ['Arrow keys - Navigate cells', 'Tab - Move to next focusable element'],
    ariaAttributes: ['aria-sort', 'aria-selected', 'aria-label'],
  },
  tokens: {
    colors: ['component-table-header-background', 'component-table-border', 'component-table-row-hover'],
    spacing: ['spacing-sm', 'spacing-md'],
    typography: ['text-body-default-fontSize', 'font-weight-medium'],
    other: ['border-radius-md'],
  },
};
