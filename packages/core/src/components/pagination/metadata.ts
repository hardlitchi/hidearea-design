import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Pagination',
  tagName: 'ha-pagination',
  description: 'Pagination component for navigating through pages of content',
  category: 'Navigation',
  props: [
    { name: 'total', type: 'number', default: '0', required: false, description: 'Total number of items' },
    { name: 'page', type: 'number', default: '1', required: false, description: 'Current page number (1-indexed)' },
    { name: 'page-size', type: 'number', default: '10', required: false, description: 'Number of items per page' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Pagination size' },
    { name: 'variant', type: "'default' | 'simple' | 'compact'", default: "'default'", required: false, description: 'Pagination variant' },
    { name: 'show-info', type: 'boolean', default: 'false', required: false, description: 'Show info text' },
  ],
  events: [
    { name: 'page-change', detail: '{ page: number }', description: 'Emitted when page changes' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple pagination',
      code: `<ha-pagination total="100" page="1" page-size="10"></ha-pagination>`,
    },
    {
      title: 'Simple Variant',
      description: 'Simple pagination variant',
      code: `<ha-pagination total="100" page="5" variant="simple"></ha-pagination>`,
    },
  ],
  accessibility: {
    roles: ['navigation'],
    keyboardSupport: ['Arrow keys - Navigate pages', 'Enter - Select page'],
    ariaAttributes: ['aria-label', 'aria-current'],
  },
  tokens: {
    colors: ['component-pagination-background', 'component-pagination-active', 'component-pagination-text'],
    spacing: ['spacing-sm'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md'],
  },
  htmlConverter: {
    patterns: ['<nav aria-label="pagination"', '<nav class="pagination"', '<ul class="pagination"'],
    convert: (_match: string, attributes: Record<string, string>, _content: string) => {
      const total = attributes['data-total'] || attributes['aria-label']?.match(/\d+/)?.[0] || '10';
      return `<ha-pagination total="${total}"></ha-pagination>`;
    },
  },
};
