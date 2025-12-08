import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Pagination',
  tagName: 'ha-pagination',
  description: 'Pagination component for navigating through pages of content',
  category: 'Navigation',
  props: [
    { name: 'currentPage', type: 'number', default: '1', required: false, description: 'Current active page' },
    { name: 'totalPages', type: 'number', required: true, description: 'Total number of pages' },
    { name: 'siblingCount', type: 'number', default: '1', required: false, description: 'Number of siblings shown on each side' },
    { name: 'showFirstLast', type: 'boolean', default: 'true', required: false, description: 'Show first/last page buttons' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disable pagination' },
  ],
  events: [
    { name: 'ha-change', detail: '{ page: number }', description: 'Emitted when page changes' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple pagination',
      code: `<ha-pagination :current-page="1" :total-pages="10"></ha-pagination>`,
    },
    {
      title: 'Without First/Last',
      description: 'Pagination without first/last buttons',
      code: `<ha-pagination :current-page="5" :total-pages="20" :show-first-last="false"></ha-pagination>`,
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
};
