import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Textarea',
  tagName: 'ha-textarea',
  description: 'Multi-line text input component',
  category: 'Form Controls',
  props: [
    { name: 'variant', type: "'default' | 'filled' | 'outlined'", default: "'default'", required: false, description: 'Textarea variant' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Textarea size' },
    { name: 'value', type: 'string', default: "''", required: false, description: 'Textarea value' },
    { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
    { name: 'name', type: 'string', required: false, description: 'Textarea name' },
    { name: 'autocomplete', type: 'string', required: false, description: 'Autocomplete attribute' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the textarea' },
    { name: 'readonly', type: 'boolean', default: 'false', required: false, description: 'Makes textarea read-only' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes textarea required' },
    { name: 'error', type: 'boolean', default: 'false', required: false, description: 'Shows error state' },
    { name: 'full-width', type: 'boolean', default: 'false', required: false, description: 'Full width textarea' },
    { name: 'rows', type: 'number', default: '3', required: false, description: 'Number of visible rows' },
    { name: 'cols', type: 'number', required: false, description: 'Visible width of the text control' },
    { name: 'maxlength', type: 'number', required: false, description: 'Maximum character length' },
    { name: 'minlength', type: 'number', required: false, description: 'Minimum character length' },
    { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", required: false, description: 'Resize behavior' },
  ],
  events: [
    { name: 'input', detail: '{ value: string }', description: 'Emitted when textarea value changes' },
    { name: 'change', detail: '{ value: string }', description: 'Emitted when textarea loses focus' },
    { name: 'focus', detail: '{}', description: 'Emitted when textarea gains focus' },
    { name: 'blur', detail: '{}', description: 'Emitted when textarea loses focus' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple textarea',
      code: `<ha-textarea label="Comments" placeholder="Enter your comments..."></ha-textarea>`,
    },
    {
      title: 'With Character Limit',
      description: 'Textarea with maxlength',
      code: `<ha-textarea label="Bio" maxlength="200" rows="5"></ha-textarea>`,
    },
  ],
  accessibility: {
    roles: ['textbox'],
    keyboardSupport: ['Standard textarea keyboard shortcuts', 'Tab - Move focus'],
    ariaAttributes: ['aria-label', 'aria-required', 'aria-invalid', 'aria-describedby'],
  },
  tokens: {
    colors: ['component-textarea-background', 'component-textarea-border', 'component-textarea-text'],
    spacing: ['spacing-sm', 'spacing-md'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md', 'interaction-transition-fast-duration'],
  },
  htmlConverter: {
    patterns: ['<textarea'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const placeholder = attributes.placeholder ? ` placeholder="${attributes.placeholder}"` : '';
      const disabled = attributes.disabled !== undefined ? ' disabled' : '';
      const required = attributes.required !== undefined ? ' required' : '';
      const readonly = attributes.readonly !== undefined ? ' readonly' : '';
      const rows = attributes.rows ? ` rows="${attributes.rows}"` : '';
      const maxlength = attributes.maxlength ? ` maxlength="${attributes.maxlength}"` : '';
      const name = attributes.name ? ` name="${attributes.name}"` : '';

      return `<ha-textarea${placeholder}${disabled}${required}${readonly}${rows}${maxlength}${name}>${content}</ha-textarea>`;
    },
  },
};
