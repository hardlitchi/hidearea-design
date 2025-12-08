import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'DatePicker',
  tagName: 'ha-date-picker',
  description: 'Date picker component for selecting dates',
  category: 'Form Controls',
  props: [
    { name: 'value', type: 'string | Date', required: false, description: 'Selected date value' },
    { name: 'min', type: 'string | Date', required: false, description: 'Minimum selectable date' },
    { name: 'max', type: 'string | Date', required: false, description: 'Maximum selectable date' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the date picker' },
    { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
    { name: 'format', type: 'string', default: "'YYYY-MM-DD'", required: false, description: 'Date format' },
    { name: 'label', type: 'string', required: false, description: 'Date picker label' },
  ],
  events: [
    { name: 'ha-change', detail: '{ value: Date }', description: 'Emitted when date changes' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple date picker',
      code: `<ha-date-picker label="Select date" placeholder="Choose a date"></ha-date-picker>`,
    },
    {
      title: 'With Min/Max',
      description: 'Date picker with date range',
      code: `<ha-date-picker
  label="Appointment date"
  min="2024-01-01"
  max="2024-12-31"
></ha-date-picker>`,
    },
  ],
  accessibility: {
    roles: ['button', 'dialog', 'grid'],
    keyboardSupport: ['Arrow keys - Navigate dates', 'Enter - Select date', 'Escape - Close picker'],
    ariaAttributes: ['aria-label', 'aria-expanded', 'aria-selected'],
  },
  tokens: {
    colors: ['component-date-picker-background', 'component-date-picker-selected', 'component-date-picker-text'],
    spacing: ['spacing-sm', 'spacing-md'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md', 'surface-overlay-elevation'],
  },
};
