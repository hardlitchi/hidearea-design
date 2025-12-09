import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Progress',
  tagName: 'ha-progress',
  description: 'Progress bar component for showing completion status',
  category: 'Feedback',
  props: [
    { name: 'value', type: 'number', default: '0', required: false, description: 'Current value (0-100)' },
    { name: 'max', type: 'number', default: '100', required: false, description: 'Maximum value' },
    { name: 'variant', type: "'default' | 'success' | 'warning' | 'danger'", default: "'default'", required: false, description: 'Progress bar color variant' },
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", required: false, description: 'Progress bar size' },
    { name: 'showValue', type: 'boolean', default: 'false', required: false, description: 'Show percentage text' },
    { name: 'indeterminate', type: 'boolean', default: 'false', required: false, description: 'Indeterminate loading state' },
  ],
  events: [
    { name: 'ha-complete', detail: '{}', description: 'Emitted when progress reaches 100%' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple progress bar',
      code: `<ha-progress value="60"></ha-progress>`,
    },
    {
      title: 'With Value Display',
      description: 'Progress bar showing percentage',
      code: `<ha-progress value="75" show-value></ha-progress>`,
    },
    {
      title: 'Indeterminate',
      description: 'Indeterminate progress',
      code: `<ha-progress indeterminate></ha-progress>`,
    },
  ],
  accessibility: {
    roles: ['progressbar'],
    keyboardSupport: [],
    ariaAttributes: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax', 'aria-label'],
  },
  tokens: {
    colors: ['component-progress-background', 'component-progress-fill'],
    spacing: [],
    typography: ['text-body-small-fontSize'],
    other: ['border-radius-full'],
  },
  htmlConverter: {
    patterns: ['<progress', '<div role="progressbar"', '<div class="progress"'],
    convert: (_match: string, attributes: Record<string, string>, _content: string) => {
      const value = attributes.value || attributes['aria-valuenow'] || '0';
      const max = attributes.max || attributes['aria-valuemax'] || '100';
      const label = attributes['aria-label'] || '';

      return `<ha-progress value="${value}" max="${max}" label="${label}"></ha-progress>`;
    },
  },
};
