import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Chip',
  tagName: 'ha-chip',
  description: 'Compact element representing an input, attribute, or action',
  category: 'Data Display',
  props: [
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", required: false, description: 'Chip size' },
    { name: 'color', type: "'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'", default: "'default'", required: false, description: 'Chip color variant' },
    { name: 'deletable', type: 'boolean', default: 'false', required: false, description: 'Show delete button' },
    { name: 'interactive', type: 'boolean', default: 'false', required: false, description: 'Make chip interactive (clickable)' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disable the chip' },
  ],
  events: [
    { name: 'chip-click', detail: '{ originalEvent: MouseEvent }', description: 'Emitted when chip is clicked (if interactive)' },
    { name: 'chip-delete', detail: '{ chip: HaChip }', description: 'Emitted when delete button is clicked' },
  ],
  slots: [
    { name: 'default', description: 'Chip text content' },
    { name: 'icon', description: 'Leading icon' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple chips',
      code: `<ha-chip>Default</ha-chip>
<ha-chip color="primary">Primary</ha-chip>
<ha-chip color="success">Success</ha-chip>`,
    },
    {
      title: 'Interactive Chip',
      description: 'Clickable chips',
      code: `<ha-chip interactive>Click me</ha-chip>`,
    },
    {
      title: 'Deletable Chip',
      description: 'Chips with delete button',
      code: `<ha-chip deletable>Remove me</ha-chip>`,
    },
    {
      title: 'Chip with Icon',
      description: 'Chips with leading icon',
      code: `<ha-chip>
  <svg slot="icon" width="16" height="16">...</svg>
  With Icon
</ha-chip>`,
    },
  ],
  accessibility: {
    roles: ['button'],
    keyboardSupport: ['Enter', 'Space'],
    ariaAttributes: ['aria-label', 'aria-disabled'],
  },
  tokens: {
    colors: ['component-chip-default-background', 'component-chip-primary-background'],
    spacing: ['spacing-xs', 'spacing-sm', 'spacing-md'],
    typography: ['text-body-small-fontSize', 'font-weight-medium'],
    other: ['radius-full', 'component-chip-interactive-transition-properties'],
  },
  htmlConverter: {
    patterns: ['<span class="chip"', '<span class="tag"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const className = attributes.class || '';
      let color = 'default';

      if (className.includes('primary')) color = 'primary';
      else if (className.includes('success')) color = 'success';
      else if (className.includes('warning')) color = 'warning';
      else if (className.includes('error') || className.includes('danger')) color = 'error';
      else if (className.includes('info')) color = 'info';

      const deletable = className.includes('deletable') || className.includes('removable') ? ' deletable' : '';
      const interactive = className.includes('clickable') || className.includes('interactive') ? ' interactive' : '';

      return `<ha-chip color="${color}"${deletable}${interactive}>${content}</ha-chip>`;
    },
  },
};
