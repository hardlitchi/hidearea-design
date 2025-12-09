import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Stack',
  tagName: 'ha-stack',
  description: 'Stack layout component for arranging items vertically or horizontally',
  category: 'Layout',
  props: [
    { name: 'direction', type: "'horizontal' | 'vertical'", default: "'vertical'", required: false, description: 'Stack direction' },
    { name: 'gap', type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", required: false, description: 'Gap between items' },
    { name: 'align', type: "'start' | 'center' | 'end' | 'stretch'", default: "'start'", required: false, description: 'Alignment of items' },
    { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around'", default: "'start'", required: false, description: 'Justification of items' },
  ],
  events: [],
  slots: [
    { name: 'default', description: 'Stack items' },
  ],
  examples: [
    {
      title: 'Vertical Stack',
      description: 'Items stacked vertically',
      code: `<ha-stack direction="vertical" gap="md">
  <ha-button>Button 1</ha-button>
  <ha-button>Button 2</ha-button>
  <ha-button>Button 3</ha-button>
</ha-stack>`,
    },
    {
      title: 'Horizontal Stack',
      description: 'Items arranged horizontally',
      code: `<ha-stack direction="horizontal" gap="sm" align="center">
  <ha-avatar></ha-avatar>
  <div>
    <h4>John Doe</h4>
    <p>john@example.com</p>
  </div>
</ha-stack>`,
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
    patterns: ['<div class="stack"', '<div class="flex-col"', '<div class="vstack"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const className = attributes.class || '';
      let direction = '';

      if (className.includes('horizontal') || className.includes('hstack')) direction = ' direction="horizontal"';

      return `<ha-stack${direction}>\n  ${content.trim()}\n</ha-stack>`;
    },
  },
};
