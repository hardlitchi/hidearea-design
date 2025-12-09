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
  htmlConverter: {
    patterns: ['<table class="datagrid"', '<div class="data-grid"', '<div class="grid"', '<div role="grid"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      // Detect features from class names and data attributes
      const className = attributes.class || '';

      const sortable = attributes['data-sortable'] !== undefined || className.includes('sortable') ? ' sortable' : '';
      const filterable = attributes['data-filterable'] !== undefined || className.includes('filterable') ? ' filterable' : '';
      const paginate = attributes['data-paginate'] !== undefined || className.includes('paginate') || className.includes('pagination') ? ' paginate' : '';
      const selectable = attributes['data-selectable'] !== undefined || className.includes('selectable') ? ' selectable' : '';

      // Extract page size
      const pageSize = attributes['data-page-size'] || attributes.pagesize || '';
      const pageSizeAttr = pageSize ? ` page-size="${pageSize}"` : '';

      // Extract columns and data from data attributes
      const columns = attributes['data-columns'] || '';
      const columnsAttr = columns ? ` columns='${columns}'` : '';

      const data = attributes['data-source'] || attributes['data-items'] || '';
      const dataAttr = data ? ` data='${data}'` : '';

      // Preserve table structure as slot content if it's a table element
      const innerContent = content.trim() ? `\n  ${content.trim()}\n` : '';

      return `<ha-datagrid${dataAttr}${columnsAttr}${sortable}${filterable}${paginate}${selectable}${pageSizeAttr}>${innerContent}</ha-datagrid>`;
    },
  },
};
