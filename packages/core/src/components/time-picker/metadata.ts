import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'TimePicker',
  tagName: 'ha-time-picker',
  description: 'Time picker component for selecting time values',
  category: 'Form Controls',
  props: [
    { name: 'value', type: 'string', required: false, description: 'Selected time value (HH:mm format)' },
    { name: 'format', type: "'12h' | '24h'", default: "'24h'", required: false, description: 'Time format' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the time picker' },
    { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
    { name: 'label', type: 'string', required: false, description: 'Time picker label' },
    { name: 'step', type: 'number', default: '1', required: false, description: 'Minute step increment' },
  ],
  events: [
    { name: 'ha-change', detail: '{ value: string }', description: 'Emitted when time changes' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple time picker',
      code: `<ha-time-picker label="Select time" placeholder="HH:mm"></ha-time-picker>`,
    },
    {
      title: '12-hour Format',
      description: 'Time picker with AM/PM',
      code: `<ha-time-picker label="Appointment time" format="12h"></ha-time-picker>`,
    },
    {
      title: 'With Step',
      description: 'Time picker with 15-minute intervals',
      code: `<ha-time-picker label="Meeting time" :step="15"></ha-time-picker>`,
    },
  ],
  accessibility: {
    roles: ['button', 'listbox'],
    keyboardSupport: ['Arrow keys - Adjust time', 'Enter - Confirm selection', 'Escape - Close picker'],
    ariaAttributes: ['aria-label', 'aria-expanded', 'aria-activedescendant'],
  },
  tokens: {
    colors: ['component-time-picker-background', 'component-time-picker-selected', 'component-time-picker-text'],
    spacing: ['spacing-sm', 'spacing-md'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md', 'surface-overlay-elevation'],
  },
};
