import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Table',
  tagName: 'ha-table',
  description: 'Data table component for displaying structured data',
  category: 'Data Display',
  props: [
    { name: 'striped', type: 'boolean', default: 'false', required: false, description: 'Enable striped rows' },
    { name: 'bordered', type: 'boolean', default: 'false', required: false, description: 'Enable borders' },
    { name: 'hoverable', type: 'boolean', default: 'false', required: false, description: 'Enable row hover effect' },
    { name: 'compact', type: 'boolean', default: 'false', required: false, description: 'Enable compact mode' },
    { name: 'full-width', type: 'boolean', default: 'false', required: false, description: 'Enable full width table' },
  ],
  events: [],
  slots: [
    { name: 'default', description: 'Table content (thead, tbody, tfoot)' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple table',
      code: `<ha-table striped hoverable>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td>Admin</td>
      </tr>
    </tbody>
  </table>
</ha-table>`,
    },
    {
      title: 'Bordered Table',
      description: 'Table with borders',
      code: `<ha-table bordered>
  <table>
    <thead><tr><th>Column</th></tr></thead>
    <tbody><tr><td>Data</td></tr></tbody>
  </table>
</ha-table>`,
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
  htmlConverter: {
    patterns: ['<table'],
    convert: (_match: string, _attributes: Record<string, string>, content: string) => {
      return `<ha-table>\n  ${content.trim()}\n</ha-table>`;
    },
  },
};
