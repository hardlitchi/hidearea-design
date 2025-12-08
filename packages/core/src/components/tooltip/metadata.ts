import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Tooltip',
  tagName: 'ha-tooltip',
  description: 'Tooltip component for displaying contextual information on hover',
  category: 'Overlay',
  props: [
    { name: 'content', type: 'string', required: true, description: 'Tooltip content' },
    { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", required: false, description: 'Tooltip placement' },
    { name: 'trigger', type: "'hover' | 'focus' | 'click'", default: "'hover'", required: false, description: 'Trigger behavior' },
    { name: 'delay', type: 'number', default: '0', required: false, description: 'Show delay in milliseconds' },
  ],
  events: [
    { name: 'ha-show', detail: '{}', description: 'Emitted when tooltip shows' },
    { name: 'ha-hide', detail: '{}', description: 'Emitted when tooltip hides' },
  ],
  slots: [
    { name: 'default', description: 'Element that triggers tooltip' },
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
};
