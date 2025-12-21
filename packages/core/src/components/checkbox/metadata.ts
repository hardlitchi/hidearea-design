import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Checkbox',
  tagName: 'ha-checkbox',
  description: 'Checkbox input for selecting one or multiple options',
  category: 'Form Controls',
  props: [
    { name: 'checked', type: 'boolean', default: 'false', required: false, description: 'Whether the checkbox is checked' },
    { name: 'value', type: 'string', required: false, description: 'Value of the checkbox' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the checkbox' },
    { name: 'indeterminate', type: 'boolean', default: 'false', required: false, description: 'Shows indeterminate state' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes checkbox required' },
    { name: 'label', type: 'string', required: false, description: 'Checkbox label' },
  ],
  events: [
    { name: 'ha-change', detail: '{ checked: boolean, value: string }', description: 'Emitted when checkbox state changes' },
  ],
  slots: [
    { name: 'default', description: 'Checkbox label content (alternative to label attribute)' },
    { name: 'description', description: 'Slot for description content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple checkbox',
      code: `<ha-checkbox label="Accept terms and conditions"></ha-checkbox>`,
    },
    {
      title: 'Checked State',
      description: 'Pre-checked checkbox',
      code: `<ha-checkbox label="Subscribe to newsletter" checked></ha-checkbox>`,
    },
    {
      title: 'Indeterminate State',
      description: 'Checkbox in indeterminate state',
      code: `<ha-checkbox label="Select all" indeterminate></ha-checkbox>`,
    },
  ],
  accessibility: {
    roles: ['checkbox'],
    keyboardSupport: ['Space - Toggle checkbox'],
    ariaAttributes: ['aria-checked', 'aria-disabled', 'aria-required'],
  },
  tokens: {
    colors: ['component-checkbox-background', 'component-checkbox-border', 'component-checkbox-check'],
    spacing: ['spacing-sm'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-sm', 'interaction-transition-fast-duration'],
  },
  htmlConverter: {
    patterns: ['<input type="checkbox"'],
    convert: (_match: string, attributes: Record<string, string>, _content: string) => {
      const checked = attributes.checked !== undefined ? ' checked' : '';
      const disabled = attributes.disabled !== undefined ? ' disabled' : '';
      const required = attributes.required !== undefined ? ' required' : '';
      const value = attributes.value ? ` value="${attributes.value}"` : '';
      const name = attributes.name ? ` name="${attributes.name}"` : '';

      // Extract label from associated label element or use placeholder
      let label = '';
      if (attributes['aria-label']) {
        label = attributes['aria-label'];
      } else if (attributes.id) {
        label = `Label for ${attributes.id}`;
      }

      return `<ha-checkbox${checked}${disabled}${required}${value}${name}>${label}</ha-checkbox>`;
    },
  },
};
