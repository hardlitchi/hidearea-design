import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Breadcrumb',
  tagName: 'ha-breadcrumb',
  description: 'Breadcrumb navigation component for showing current location',
  category: 'Navigation',
  props: [
    { name: 'separator', type: 'string', default: "'/'", required: false, description: 'Separator between items' },
  ],
  events: [],
  slots: [
    { name: 'default', description: 'Breadcrumb items' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple breadcrumb',
      code: `<ha-breadcrumb>
  <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">Products</ha-breadcrumb-item>
  <ha-breadcrumb-item>Details</ha-breadcrumb-item>
</ha-breadcrumb>`,
    },
    {
      title: 'Custom Separator',
      description: 'Breadcrumb with custom separator',
      code: `<ha-breadcrumb separator=">">
  <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
  <ha-breadcrumb-item>Current</ha-breadcrumb-item>
</ha-breadcrumb>`,
    },
  ],
  accessibility: {
    roles: ['navigation', 'list', 'listitem'],
    keyboardSupport: ['Tab - Navigate links'],
    ariaAttributes: ['aria-label', 'aria-current'],
  },
  tokens: {
    colors: ['component-breadcrumb-text', 'component-breadcrumb-separator'],
    spacing: ['spacing-sm'],
    typography: ['text-body-default-fontSize'],
    other: [],
  },
  htmlConverter: {
    patterns: ['<nav aria-label="breadcrumb"', '<nav class="breadcrumb"', '<ol class="breadcrumb"'],
    convert: (_match: string, _attributes: Record<string, string>, content: string) => {
      return `<ha-breadcrumb>\n  ${content.trim()}\n</ha-breadcrumb>`;
    },
  },
};
