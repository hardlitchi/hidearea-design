import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Card',
  tagName: 'ha-card',
  description: 'Container component for grouping related content',
  category: 'Layout',
  props: [
    { name: 'variant', type: "'filled' | 'outlined' | 'elevated'", default: "'filled'", required: false, description: 'Card style variant' },
    { name: 'padding', type: "'none' | 'small' | 'medium' | 'large'", default: "'medium'", required: false, description: 'Internal padding' },
    { name: 'hoverable', type: 'boolean', default: 'false', required: false, description: 'Adds hover effect' },
  ],
  events: [],
  slots: [
    { name: 'default', description: 'Card content' },
    { name: 'header', description: 'Card header content' },
    { name: 'footer', description: 'Card footer content' },
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
};
