import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Select',
  tagName: 'ha-select',
  description: 'Dropdown select component for choosing from a list of options',
  category: 'Form Controls',
  props: [
    { name: 'variant', type: "'default' | 'filled' | 'outlined'", default: "'default'", required: false, description: 'Select variant' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Select size' },
    { name: 'value', type: 'string', required: false, description: 'Selected value' },
    { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
    { name: 'name', type: 'string', required: false, description: 'Select name' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the select' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes select required' },
    { name: 'error', type: 'boolean', default: 'false', required: false, description: 'Shows error state' },
    { name: 'full-width', type: 'boolean', default: 'false', required: false, description: 'Full width select' },
  ],
  events: [
    { name: 'change', detail: '{ value: string }', description: 'Emitted when selection changes' },
    { name: 'focus', detail: '{}', description: 'Emitted when select gains focus' },
    { name: 'blur', detail: '{}', description: 'Emitted when select loses focus' },
  ],
  slots: [
    { name: 'default', description: 'Option elements' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple select dropdown',
      code: `<ha-select label="Choose a country" placeholder="Select...">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="jp">Japan</option>
</ha-select>`,
    },
    {
      title: 'Multiple Selection',
      description: 'Select with multiple values',
      code: `<ha-select label="Choose languages" multiple>
  <option value="en">English</option>
  <option value="es">Spanish</option>
  <option value="fr">French</option>
</ha-select>`,
    },
  ],
  accessibility: {
    roles: ['combobox', 'listbox'],
    keyboardSupport: ['Arrow keys - Navigate options', 'Enter/Space - Select option', 'Escape - Close dropdown'],
    ariaAttributes: ['aria-expanded', 'aria-haspopup', 'aria-activedescendant', 'aria-required'],
  },
  tokens: {
    colors: ['component-select-background', 'component-select-border', 'component-select-text'],
    spacing: ['spacing-sm', 'spacing-md'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md', 'surface-overlay-elevation'],
  },
  htmlConverter: {
    patterns: ['<select'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const multiple = attributes.multiple !== undefined ? ' multiple' : '';
      const disabled = attributes.disabled !== undefined ? ' disabled' : '';
      const required = attributes.required !== undefined ? ' required' : '';
      const name = attributes.name ? ` name="${attributes.name}"` : '';

      // Preserve the option elements from the original select
      return `<ha-select${multiple}${disabled}${required}${name}>\n  ${content.trim()}\n</ha-select>`;
    },
  },
};
