import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Input',
  tagName: 'ha-input',
  description: 'Text input field with validation and various types',
  category: 'Form Controls',
  props: [
    { name: 'variant', type: "'default' | 'filled' | 'outlined'", default: "'default'", required: false, description: 'Input variant' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Input size' },
    { name: 'type', type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'", default: "'text'", required: false, description: 'Input type' },
    { name: 'value', type: 'string', default: "''", required: false, description: 'Input value' },
    { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
    { name: 'name', type: 'string', required: false, description: 'Input name' },
    { name: 'autocomplete', type: 'string', required: false, description: 'Autocomplete attribute' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the input' },
    { name: 'readonly', type: 'boolean', default: 'false', required: false, description: 'Makes input read-only' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes input required' },
    { name: 'error', type: 'boolean', default: 'false', required: false, description: 'Shows error state' },
    { name: 'full-width', type: 'boolean', default: 'false', required: false, description: 'Full width input' },
    { name: 'maxlength', type: 'number', required: false, description: 'Maximum character length' },
    { name: 'minlength', type: 'number', required: false, description: 'Minimum character length' },
    { name: 'pattern', type: 'string', required: false, description: 'Validation pattern' },
    { name: 'min', type: 'number', required: false, description: 'Minimum value (for number type)' },
    { name: 'max', type: 'number', required: false, description: 'Maximum value (for number type)' },
    { name: 'step', type: 'number', required: false, description: 'Step value (for number type)' },
  ],
  events: [
    { name: 'input', detail: '{ value: string }', description: 'Emitted when input value changes' },
    { name: 'change', detail: '{ value: string }', description: 'Emitted when input loses focus after value change' },
    { name: 'focus', detail: '{}', description: 'Emitted when input gains focus' },
    { name: 'blur', detail: '{}', description: 'Emitted when input loses focus' },
  ],
  slots: [
    { name: 'prefix', description: 'Content before input' },
    { name: 'suffix', description: 'Content after input' },
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
  htmlConverter: {
    patterns: ['<input'],
    convert: (_match: string, attributes: Record<string, string>, _content: string) => {
      // Extract relevant attributes
      const type = attributes.type && attributes.type !== 'button' && attributes.type !== 'submit'
        ? ` type="${attributes.type}"`
        : '';
      const placeholder = attributes.placeholder ? ` placeholder="${attributes.placeholder}"` : '';
      const value = attributes.value ? ` value="${attributes.value}"` : '';
      const disabled = attributes.disabled !== undefined ? ' disabled' : '';
      const required = attributes.required !== undefined ? ' required' : '';
      const readonly = attributes.readonly !== undefined ? ' readonly' : '';
      const name = attributes.name ? ` name="${attributes.name}"` : '';

      return `<ha-input${type}${placeholder}${value}${disabled}${required}${readonly}${name}></ha-input>`;
    },
  },
};
