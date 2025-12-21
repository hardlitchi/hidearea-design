import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Radio',
  tagName: 'ha-radio',
  description: 'Radio button for selecting a single option from a group',
  category: 'Form Controls',
  props: [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Radio size' },
    { name: 'checked', type: 'boolean', default: 'false', required: false, description: 'Whether the radio is selected' },
    { name: 'value', type: 'string', required: false, description: 'Value of the radio button' },
    { name: 'name', type: 'string', required: false, description: 'Name attribute for grouping radios' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the radio button' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes radio required' },
    { name: 'error', type: 'boolean', default: 'false', required: false, description: 'Error state' },
    { name: 'label', type: 'string', required: false, description: 'Radio label' },
    { name: 'description', type: 'string', required: false, description: 'Radio description' },
  ],
  events: [
    { name: 'change', detail: '{ checked: boolean, value: string }', description: 'Emitted when radio state changes' },
    { name: 'input', detail: '{ checked: boolean, value: string }', description: 'Emitted when radio state changes' },
  ],
  slots: [
    { name: 'default', description: 'Radio label content (alternative to label attribute)' },
    { name: 'description', description: 'Slot for description content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Radio button group',
      code: `<ha-radio name="size" value="small" label="Small"></ha-radio>
<ha-radio name="size" value="medium" label="Medium" checked></ha-radio>
<ha-radio name="size" value="large" label="Large"></ha-radio>`,
    },
    {
      title: 'Disabled State',
      description: 'Disabled radio button',
      code: `<ha-radio name="option" value="disabled" label="Disabled option" disabled></ha-radio>`,
    },
  ],
  accessibility: {
    roles: ['radio'],
    keyboardSupport: ['Arrow keys - Navigate between radio buttons in group', 'Space - Select radio button'],
    ariaAttributes: ['aria-checked', 'aria-disabled', 'aria-required'],
  },
  tokens: {
    colors: ['component-radio-background', 'component-radio-border', 'component-radio-dot'],
    spacing: ['spacing-sm'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-full', 'interaction-transition-fast-duration'],
  },
  htmlConverter: {
    patterns: ['<input type="radio"'],
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
      } else if (attributes.value) {
        label = attributes.value.charAt(0).toUpperCase() + attributes.value.slice(1);
      }

      return `<ha-radio${name}${value}${checked}${disabled}${required}>${label}</ha-radio>`;
    },
  },
};
