import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Input',
  tagName: 'ha-input',
  description: 'Text input field with validation and various types',
  category: 'Form Controls',
  props: [
    { name: 'type', type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'", default: "'text'", required: false, description: 'Input type' },
    { name: 'value', type: 'string', default: "''", required: false, description: 'Input value' },
    { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the input' },
    { name: 'readonly', type: 'boolean', default: 'false', required: false, description: 'Makes input read-only' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes input required' },
    { name: 'error', type: 'boolean', default: 'false', required: false, description: 'Shows error state' },
    { name: 'label', type: 'string', required: false, description: 'Input label' },
    { name: 'description', type: 'string', required: false, description: 'Help text' },
    { name: 'errorMessage', type: 'string', required: false, description: 'Error message to display' },
  ],
  events: [
    { name: 'ha-input', detail: '{ value: string }', description: 'Emitted on input' },
    { name: 'ha-change', detail: '{ value: string }', description: 'Emitted on change (blur)' },
    { name: 'ha-focus', detail: '{}', description: 'Emitted on focus' },
    { name: 'ha-blur', detail: '{}', description: 'Emitted on blur' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple text input',
      code: `<ha-input label="Name" placeholder="Enter your name"></ha-input>`,
    },
    {
      title: 'With Error',
      description: 'Input with error state',
      code: `<ha-input label="Email" type="email" error error-message="Please enter a valid email"></ha-input>`,
    },
    {
      title: 'Disabled',
      description: 'Disabled input',
      code: `<ha-input label="Username" value="johndoe" disabled></ha-input>`,
    },
  ],
  accessibility: {
    roles: ['textbox'],
    keyboardSupport: ['Tab - Move focus', 'Type - Enter text'],
    ariaAttributes: ['aria-label', 'aria-required', 'aria-invalid', 'aria-describedby'],
  },
  tokens: {
    colors: ['component-input-background', 'component-input-border', 'component-input-text', 'state-error-border'],
    spacing: ['spacing-sm', 'spacing-md'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md', 'interaction-transition-fast-duration'],
  },
};
