import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Tooltip',
  tagName: 'ha-tooltip',
  description: 'Tooltip component for displaying contextual information on hover',
  category: 'Overlay',
  props: [
    { name: 'content', type: 'string', required: false, description: 'Tooltip content text' },
    { name: 'placement', type: "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'", default: "'top'", required: false, description: 'Tooltip placement' },
    { name: 'trigger', type: "'hover' | 'focus' | 'click'", default: "'hover'", required: false, description: 'Trigger behavior' },
    { name: 'variant', type: "'default' | 'dark' | 'light'", default: "'default'", required: false, description: 'Tooltip variant' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Tooltip size' },
    { name: 'show-arrow', type: 'boolean', default: 'false', required: false, description: 'Show arrow indicator' },
    { name: 'delay', type: 'number', default: '200', required: false, description: 'Show delay in milliseconds' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disabled state' },
  ],
  events: [
    { name: 'show', detail: '{}', description: 'Emitted when tooltip is shown' },
    { name: 'hide', detail: '{}', description: 'Emitted when tooltip is hidden' },
  ],
  slots: [
    { name: 'default', description: 'Trigger element (default slot)' },
    { name: 'content', description: 'Custom tooltip content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple tooltip',
      code: `<ha-tooltip content="This is a tooltip">
  <ha-button>Hover me</ha-button>
</ha-tooltip>`,
    },
    {
      title: 'Different Placements',
      description: 'Tooltip positioning',
      code: `<ha-tooltip content="Top tooltip" placement="top">
  <ha-button>Top</ha-button>
</ha-tooltip>
<ha-tooltip content="Bottom tooltip" placement="bottom">
  <ha-button>Bottom</ha-button>
</ha-tooltip>`,
    },
  ],
  accessibility: {
    roles: ['tooltip'],
    keyboardSupport: ['Escape - Hide tooltip'],
    ariaAttributes: ['aria-describedby'],
  },
  tokens: {
    colors: ['component-tooltip-background', 'component-tooltip-text'],
    spacing: ['spacing-xs', 'spacing-sm'],
    typography: ['text-body-small-fontSize'],
    other: ['border-radius-sm', 'surface-overlay-elevation'],
  },
  htmlConverter: {
    patterns: ['<div role="tooltip"', '<span role="tooltip"', '<div class="tooltip"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const className = attributes.class || '';
      let position = 'top';

      if (className.includes('bottom')) position = 'bottom';
      else if (className.includes('left')) position = 'left';
      else if (className.includes('right')) position = 'right';

      return `<ha-tooltip position="${position}">${content}</ha-tooltip>`;
    },
  },
};
