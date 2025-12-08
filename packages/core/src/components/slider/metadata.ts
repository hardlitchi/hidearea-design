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
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the slider' },
    { name: 'label', type: 'string', required: false, description: 'Slider label' },
    { name: 'showValue', type: 'boolean', default: 'true', required: false, description: 'Show current value' },
  ],
  events: [
    { name: 'ha-change', detail: '{ value: number }', description: 'Emitted when value changes' },
    { name: 'ha-input', detail: '{ value: number }', description: 'Emitted during dragging' },
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
};
