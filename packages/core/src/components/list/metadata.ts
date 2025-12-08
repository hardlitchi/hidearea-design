import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'List',
  tagName: 'ha-list',
  description: 'List component for displaying a collection of items',
  category: 'Data Display',
  props: [
    { name: 'variant', type: "'default' | 'bordered' | 'divided'", default: "'default'", required: false, description: 'List style variant' },
    { name: 'hoverable', type: 'boolean', default: 'false', required: false, description: 'Add hover effect' },
    { name: 'clickable', type: 'boolean', default: 'false', required: false, description: 'Make items clickable' },
  ],
  events: [
    { name: 'ha-item-click', detail: '{ item: any, index: number }', description: 'Emitted when item is clicked' },
  ],
  slots: [
    { name: 'default', description: 'List items' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple list',
      code: `<ha-list>
  <ha-list-item>Item 1</ha-list-item>
  <ha-list-item>Item 2</ha-list-item>
  <ha-list-item>Item 3</ha-list-item>
</ha-list>`,
    },
    {
      title: 'Divided List',
      description: 'List with dividers',
      code: `<ha-list variant="divided" hoverable>
  <ha-list-item>
    <h4>Title</h4>
    <p>Description text</p>
  </ha-list-item>
  <ha-list-item>
    <h4>Another Title</h4>
    <p>More description</p>
  </ha-list-item>
</ha-list>`,
    },
  ],
  accessibility: {
    roles: ['list', 'listitem'],
    keyboardSupport: ['Arrow keys - Navigate items', 'Enter - Select item (if clickable)'],
    ariaAttributes: ['aria-label'],
  },
  tokens: {
    colors: ['component-list-item-background', 'component-list-item-hover', 'component-list-border'],
    spacing: ['spacing-sm', 'spacing-md'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md'],
  },
};
