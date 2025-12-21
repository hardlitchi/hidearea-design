import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Grid',
  tagName: 'ha-grid',
  description: 'Grid layout component for creating responsive grid layouts',
  category: 'Layout',
  props: [
    { name: 'columns', type: 'string', default: "'12'", required: false, description: 'Number of columns (1-12, auto-fit, auto-fill)' },
    { name: 'gap', type: 'string', default: "'4'", required: false, description: 'Gap between grid items (0-12 spacing tokens)' },
    { name: 'row-gap', type: 'string', required: false, description: 'Row gap (0-12 spacing tokens)' },
    { name: 'column-gap', type: 'string', required: false, description: 'Column gap (0-12 spacing tokens)' },
    { name: 'align-items', type: "'start' | 'center' | 'end' | 'stretch'", required: false, description: 'Align items' },
    { name: 'justify-items', type: "'start' | 'center' | 'end' | 'stretch'", required: false, description: 'Justify items' },
  ],
  events: [],
  slots: [
    { name: 'default', description: 'Grid items' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple grid layout',
      code: `<ha-grid columns="3" gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-grid>`,
    },
    {
      title: 'Responsive Grid',
      description: 'Grid with responsive columns',
      code: `<ha-grid :columns="{ sm: 1, md: 2, lg: 4 }">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</ha-grid>`,
    },
  ],
  accessibility: {
    roles: [],
    keyboardSupport: [],
    ariaAttributes: [],
  },
  tokens: {
    colors: [],
    spacing: ['spacing-xs', 'spacing-sm', 'spacing-md', 'spacing-lg', 'spacing-xl'],
    typography: [],
    other: [],
  },
  htmlConverter: {
    patterns: ['<div class="grid"', '<div class="row"', '<section class="grid"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const className = attributes.class || '';
      let columns = '';
      const match = className.match(/(?:grid|cols?)-(\d+)/);
      if (match) columns = ` columns="${match[1]}"`;

      return `<ha-grid${columns}>\n  ${content.trim()}\n</ha-grid>`;
    },
  },
};
