import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Spinner',
  tagName: 'ha-spinner',
  description: 'Loading spinner component for indicating progress',
  category: 'Feedback',
  props: [
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", required: false, description: 'Spinner size' },
    { name: 'color', type: "'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'", default: "'primary'", required: false, description: 'Spinner color' },
    { name: 'variant', type: "'circular' | 'dots' | 'pulse'", default: "'circular'", required: false, description: 'Spinner variant' },
    { name: 'speed', type: 'string', default: "'0.8s'", required: false, description: 'Animation speed' },
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
      code: `<ha-spinner size="sm"></ha-spinner>
<ha-spinner size="md"></ha-spinner>
<ha-spinner size="lg"></ha-spinner>`,
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
  htmlConverter: {
    patterns: ['<div role="status" aria-busy', '<div class="spinner"', '<div class="loading"'],
    convert: (_match: string, attributes: Record<string, string>, _content: string) => {
      const className = attributes.class || '';
      let size = 'medium';

      if (className.includes('small') || className.includes('sm')) size = 'sm';
      else if (className.includes('large') || className.includes('lg')) size = 'lg';

      const label = attributes['aria-label'] || 'Loading...';

      return `<ha-spinner size="${size}" label="${label}"></ha-spinner>`;
    },
  },
};
