import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Badge',
  tagName: 'ha-badge',
  description: 'Small label for displaying status, counts, or categories',
  category: 'Data Display',
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", required: false, description: 'Badge color variant' },
    { name: 'style-variant', type: "'filled' | 'outlined' | 'soft'", default: "'filled'", required: false, description: 'Badge style variant' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Badge size' },
    { name: 'dot', type: 'boolean', default: 'false', required: false, description: 'Show as dot indicator' },
    { name: 'pill', type: 'boolean', default: 'false', required: false, description: 'Pill-shaped badge' },
    { name: 'removable', type: 'boolean', default: 'false', required: false, description: 'Show remove button' },
  ],
  events: [
    { name: 'badge-remove', detail: '{}', description: 'Emitted when remove button is clicked' },
  ],
  slots: [
    { name: 'default', description: 'Badge content' },
    { name: 'icon', description: 'Custom icon' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple badges',
      code: `<ha-badge>Default</ha-badge>
<ha-badge variant="success">Success</ha-badge>
<ha-badge variant="warning">Warning</ha-badge>`,
    },
    {
      title: 'Pill Badge',
      description: 'Pill-shaped badges',
      code: `<ha-badge pill>99+</ha-badge>`,
    },
    {
      title: 'Dot Indicator',
      description: 'Dot badge for notifications',
      code: `<ha-badge dot variant="danger"></ha-badge>`,
    },
  ],
  accessibility: {
    roles: ['status'],
    keyboardSupport: [],
    ariaAttributes: ['aria-label'],
  },
  tokens: {
    colors: ['component-badge-primary-background', 'component-badge-primary-text'],
    spacing: ['spacing-xs', 'spacing-sm'],
    typography: ['text-body-small-fontSize', 'font-weight-medium'],
    other: ['border-radius-sm'],
  },
  htmlConverter: {
    patterns: ['<span class="badge"', '<span role="status"', '<small class="badge"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const className = attributes.class || '';
      let variant = 'primary';

      if (className.includes('success')) variant = 'success';
      else if (className.includes('warning')) variant = 'warning';
      else if (className.includes('error') || className.includes('danger')) variant = 'error';
      else if (className.includes('secondary')) variant = 'secondary';

      const dot = !content.trim() || className.includes('dot') ? ' dot' : '';

      return `<ha-badge variant="${variant}"${dot}>${content}</ha-badge>`;
    },
  },
};
