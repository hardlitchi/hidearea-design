import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Progress',
  tagName: 'ha-progress',
  description: 'Progress bar component for showing completion status',
  category: 'Feedback',
  props: [
    { name: 'value', type: 'number', default: '0', required: false, description: 'Current value' },
    { name: 'max', type: 'number', default: '100', required: false, description: 'Maximum value' },
    { name: 'variant', type: "'default' | 'striped' | 'animated'", default: "'default'", required: false, description: 'Progress bar variant' },
    { name: 'color', type: "'primary' | 'success' | 'warning' | 'error' | 'info'", default: "'primary'", required: false, description: 'Progress bar color' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Progress bar size' },
    { name: 'show-label', type: 'boolean', default: 'false', required: false, description: 'Show progress label and percentage' },
  ],
  events: [],
  slots: [
    { name: 'label', description: 'Custom label content' },
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
      code: `<ha-progress value="75" show-label></ha-progress>`,
    },
    {
      title: 'Striped Variant',
      description: 'Progress with striped variant',
      code: `<ha-progress value="50" variant="striped"></ha-progress>`,
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
