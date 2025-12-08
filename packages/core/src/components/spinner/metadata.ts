import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Spinner',
  tagName: 'ha-spinner',
  description: 'Loading spinner component for indicating progress',
  category: 'Feedback',
  props: [
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", required: false, description: 'Spinner size' },
    { name: 'color', type: 'string', required: false, description: 'Spinner color' },
  ],
  events: [],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple spinner',
      code: `<ha-spinner></ha-spinner>`,
    },
    {
      title: 'Different Sizes',
      description: 'Various spinner sizes',
      code: `<ha-spinner size="small"></ha-spinner>
<ha-spinner size="medium"></ha-spinner>
<ha-spinner size="large"></ha-spinner>`,
    },
  ],
  accessibility: {
    roles: ['status'],
    keyboardSupport: [],
    ariaAttributes: ['aria-label', 'aria-live'],
  },
  tokens: {
    colors: ['component-spinner-color'],
    spacing: [],
    typography: [],
    other: ['interaction-transition-fast-duration'],
  },
};
