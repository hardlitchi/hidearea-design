import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Container',
  tagName: 'ha-container',
  description: 'Container component for centering and constraining content width',
  category: 'Layout',
  props: [
    { name: 'max-width', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'", default: "'lg'", required: false, description: 'Maximum container width' },
    { name: 'centered', type: 'boolean', default: 'false', required: false, description: 'Center the container horizontally' },
    { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Padding size' },
  ],
  events: [],
  slots: [
    { name: 'default', description: 'Container content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Centered container',
      code: `<ha-container>
  <p>Content is centered and constrained to max-width</p>
</ha-container>`,
    },
    {
      title: 'Different Sizes',
      description: 'Various container sizes',
      code: `<ha-container max-width="sm">Small container</ha-container>
<ha-container max-width="lg">Large container</ha-container>
<ha-container max-width="full">Full width container</ha-container>`,
    },
  ],
  accessibility: {
    roles: [],
    keyboardSupport: [],
    ariaAttributes: [],
  },
  tokens: {
    colors: [],
    spacing: ['spacing-md', 'spacing-lg'],
    typography: [],
    other: [],
  },
  htmlConverter: {
    patterns: ['<div class="container"', '<main class="container"', '<section class="container"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const className = attributes.class || '';
      let maxWidth = '';

      if (className.includes('fluid')) maxWidth = ' max-width="none"';
      else if (className.includes('narrow')) maxWidth = ' max-width="narrow"';

      return `<ha-container${maxWidth}>\n  ${content.trim()}\n</ha-container>`;
    },
  },
};
