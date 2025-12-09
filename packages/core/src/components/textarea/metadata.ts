import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Textarea',
  tagName: 'ha-textarea',
  description: 'Multi-line text input component',
  category: 'Form Controls',
  props: [
    { name: 'value', type: 'string', default: "''", required: false, description: 'Textarea value' },
    { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the textarea' },
    { name: 'readonly', type: 'boolean', default: 'false', required: false, description: 'Makes textarea read-only' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes textarea required' },
    { name: 'rows', type: 'number', default: '3', required: false, description: 'Number of visible rows' },
    { name: 'maxlength', type: 'number', required: false, description: 'Maximum character length' },
    { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", required: false, description: 'Resize behavior' },
    { name: 'label', type: 'string', required: false, description: 'Textarea label' },
    { name: 'error', type: 'boolean', default: 'false', required: false, description: 'Shows error state' },
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
