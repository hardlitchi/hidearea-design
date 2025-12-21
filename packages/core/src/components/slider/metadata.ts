import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Slider',
  tagName: 'ha-slider',
  description: 'Slider component for selecting numeric values from a range',
  category: 'Form Controls',
  props: [
    { name: 'value', type: 'number', default: '0', required: false, description: 'Current value' },
    { name: 'min', type: 'number', default: '0', required: false, description: 'Minimum value' },
    { name: 'max', type: 'number', default: '100', required: false, description: 'Maximum value' },
    { name: 'step', type: 'number', default: '1', required: false, description: 'Step increment' },
    { name: 'range', type: 'boolean', default: 'false', required: false, description: 'Enable range selection mode' },
    { name: 'range-start', type: 'number', required: false, description: 'Start value for range mode' },
    { name: 'range-end', type: 'number', required: false, description: 'End value for range mode' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", required: false, description: 'Slider orientation' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the slider' },
    { name: 'readonly', type: 'boolean', default: 'false', required: false, description: 'Makes slider read-only' },
    { name: 'show-marks', type: 'boolean', default: 'false', required: false, description: 'Show step marks' },
    { name: 'show-tooltip', type: 'boolean', default: 'false', required: false, description: 'Show value tooltip on drag' },
    { name: 'marks', type: 'string', required: false, description: 'Comma-separated list of mark values' },
    { name: 'label', type: 'string', required: false, description: 'Slider label' },
  ],
  events: [
    { name: 'slider-change', detail: '{ value: number | { start: number, end: number } }', description: 'Emitted when value changes' },
    { name: 'slider-input', detail: '{ value: number | { start: number, end: number } }', description: 'Emitted during dragging' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple slider',
      code: `<ha-slider label="Volume" value="50"></ha-slider>`,
    },
    {
      title: 'Custom Range',
      description: 'Slider with custom min/max',
      code: `<ha-slider label="Temperature" min="-20" max="40" value="20"></ha-slider>`,
    },
    {
      title: 'With Step',
      description: 'Slider with step increment',
      code: `<ha-slider label="Rating" min="0" max="5" step="0.5" value="3.5"></ha-slider>`,
    },
  ],
  accessibility: {
    roles: ['slider'],
    keyboardSupport: ['Arrow keys - Adjust value', 'Home - Set to minimum', 'End - Set to maximum', 'Page Up/Down - Large increment/decrement'],
    ariaAttributes: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax', 'aria-disabled'],
  },
  tokens: {
    colors: ['component-slider-track', 'component-slider-fill', 'component-slider-thumb'],
    spacing: ['spacing-sm'],
    typography: ['text-body-small-fontSize'],
    other: ['border-radius-full'],
  },
  htmlConverter: {
    patterns: ['<input type="range"', '<div class="slider"', '<div role="slider"'],
    convert: (_match: string, attributes: Record<string, string>, _content: string) => {
      const value = attributes.value || '0';
      const min = attributes.min ? ` min="${attributes.min}"` : '';
      const max = attributes.max ? ` max="${attributes.max}"` : '';
      const step = attributes.step ? ` step="${attributes.step}"` : '';
      const disabled = attributes.disabled !== undefined ? ' disabled' : '';

      // Detect show-value from class names or data attributes
      const className = attributes.class || '';
      const showValue = attributes['data-show-value'] || '';
      let showValueAttr = '';
      if (showValue === 'false' || className.includes('no-value') || className.includes('hide-value')) {
        showValueAttr = ' show-value="false"';
      }

      let label = '';
      if (attributes['aria-label']) {
        label = ` label="${attributes['aria-label']}"`;
      } else if (attributes.id) {
        label = ` label="Slider"`;
      }

      const valueAttr = ` value="${value}"`;

      return `<ha-slider${label}${valueAttr}${min}${max}${step}${disabled}${showValueAttr}></ha-slider>`;
    },
  },
};
