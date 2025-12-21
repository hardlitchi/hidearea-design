import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Card',
  tagName: 'ha-card',
  description: 'Container component for grouping related content',
  category: 'Layout',
  props: [
    { name: 'variant', type: "'default' | 'outlined' | 'elevated'", default: "'default'", required: false, description: 'Card style variant' },
    { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Internal padding' },
    { name: 'hoverable', type: 'boolean', default: 'false', required: false, description: 'Adds hover effect' },
    { name: 'clickable', type: 'boolean', default: 'false', required: false, description: 'Enable clickable state' },
  ],
  events: [
    { name: 'card-click', detail: '{ originalEvent: MouseEvent }', description: 'Emitted when card is clicked (if clickable)' },
  ],
  slots: [
    { name: 'default', description: 'Card body content' },
    { name: 'header', description: 'Card header content' },
    { name: 'footer', description: 'Card footer content' },
    { name: 'media', description: 'Media content (images, videos)' },
  ],
  examples: [
    {
      title: 'Basic Card',
      description: 'Simple card with content',
      code: `<ha-card>
  <div slot="header">
    <h3>Card Title</h3>
  </div>
  <p>Card content goes here</p>
  <div slot="footer">
    <ha-button variant="primary">Action</ha-button>
  </div>
</ha-card>`,
    },
  ],
  accessibility: {
    roles: ['article', 'region'],
    keyboardSupport: [],
    ariaAttributes: ['aria-labelledby', 'aria-describedby'],
  },
  tokens: {
    colors: ['component-card-background', 'component-card-border'],
    spacing: ['spacing-md', 'spacing-lg'],
    typography: [],
    other: ['border-radius-lg', 'surface-raised-elevation'],
  },
  htmlConverter: {
    patterns: ['<div class="card"', '<div class=".*card.*"', '<article class="card"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      // Determine variant from class names
      const className = attributes.class || '';
      let variant = '';

      if (className.includes('outlined')) variant = ' variant="outlined"';
      else if (className.includes('elevated')) variant = ' variant="elevated"';

      // Check for hoverable class
      const hoverable = className.includes('hoverable') || className.includes('hover') ? ' hoverable' : '';

      return `<ha-card${variant}${hoverable}>${content}</ha-card>`;
    },
  },
};
