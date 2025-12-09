import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'FormGroup',
  tagName: 'ha-form-group',
  description: 'Form group component for organizing form fields with labels and descriptions',
  category: 'Form Controls',
  props: [
    { name: 'label', type: 'string', required: false, description: 'Form group label' },
    { name: 'description', type: 'string', required: false, description: 'Helper text' },
    { name: 'error', type: 'boolean', default: 'false', required: false, description: 'Shows error state' },
    { name: 'errorMessage', type: 'string', required: false, description: 'Error message to display' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Shows required indicator' },
  ],
  events: [],
  slots: [
    { name: 'default', description: 'Form field content' },
    { name: 'label', description: 'Custom label content' },
    { name: 'description', description: 'Custom description content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Form group with input',
      code: `<ha-form-group label="Email" description="We'll never share your email" required>
  <ha-input type="email" placeholder="email@example.com"></ha-input>
</ha-form-group>`,
    },
    {
      title: 'With Error',
      description: 'Form group showing error state',
      code: `<ha-form-group label="Username" error error-message="Username is already taken">
  <ha-input value="john"></ha-input>
</ha-form-group>`,
    },
  ],
  accessibility: {
    roles: [],
    keyboardSupport: [],
    ariaAttributes: ['aria-describedby', 'aria-invalid'],
  },
  tokens: {
    colors: ['component-form-group-label', 'component-form-group-description', 'state-error-text'],
    spacing: ['spacing-xs', 'spacing-sm'],
    typography: ['text-body-default-fontSize', 'text-body-small-fontSize', 'font-weight-medium'],
    other: [],
  },
  htmlConverter: {
    patterns: ['<div class="form-group"', '<fieldset', '<div class="field"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const label = attributes['aria-label'] || attributes.legend || '';
      const required = attributes.required !== undefined || content.includes('required') ? ' required' : '';

      return `<ha-form-group label="${label}"${required}>\n  ${content.trim()}\n</ha-form-group>`;
    },
  },
};
