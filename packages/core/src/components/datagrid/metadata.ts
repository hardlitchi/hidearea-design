import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'DataGrid',
  tagName: 'ha-datagrid',
  description: 'Advanced data grid component with sorting, filtering, and pagination',
  category: 'Data Display',
  props: [
    { name: 'data', type: 'Array<Record<string, any>>', required: true, description: 'Grid data' },
    { name: 'columns', type: 'Array<Column>', required: true, description: 'Column definitions' },
    { name: 'sortable', type: 'boolean', default: 'true', required: false, description: 'Enable column sorting' },
    { name: 'filterable', type: 'boolean', default: 'false', required: false, description: 'Enable column filtering' },
    { name: 'paginate', type: 'boolean', default: 'false', required: false, description: 'Enable pagination' },
    { name: 'pageSize', type: 'number', default: '10', required: false, description: 'Items per page' },
    { name: 'selectable', type: 'boolean', default: 'false', required: false, description: 'Enable row selection' },
  ],
  events: [
    { name: 'ha-sort', detail: '{ column: string, direction: "asc" | "desc" }', description: 'Emitted when sorted' },
    { name: 'ha-filter', detail: '{ filters: Record<string, any> }', description: 'Emitted when filtered' },
    { name: 'ha-page-change', detail: '{ page: number }', description: 'Emitted when page changes' },
    { name: 'ha-selection-change', detail: '{ selectedRows: Array<any> }', description: 'Emitted when selection changes' },
  ],
  slots: [
    { name: 'default', description: 'Custom cell content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'DataGrid with sorting and pagination',
      code: `<ha-datagrid
  :data="products"
  :columns="columns"
  sortable
  paginate
  :page-size="20"
></ha-datagrid>`,
    },
  ],
  accessibility: {
    roles: ['grid', 'rowgroup', 'row', 'columnheader', 'gridcell'],
    keyboardSupport: ['Arrow keys - Navigate cells', 'Enter - Edit cell', 'Tab - Move focus'],
    ariaAttributes: ['aria-sort', 'aria-rowcount', 'aria-colcount'],
  },
  tokens: {
    colors: ['component-datagrid-header-background', 'component-datagrid-border', 'component-datagrid-row-hover'],
    spacing: ['spacing-sm', 'spacing-md'],
    typography: ['text-body-default-fontSize', 'font-weight-medium'],
    other: ['border-radius-md'],
  },
};
