import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Select',
  tagName: 'ha-select',
  description: 'Dropdown select component for choosing from a list of options',
  category: 'Form Controls',
  props: [
    { name: 'value', type: 'string | string[]', required: false, description: 'Selected value(s)' },
    { name: 'multiple', type: 'boolean', default: 'false', required: false, description: 'Allow multiple selections' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the select' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes select required' },
    { name: 'placeholder', type: 'string', required: false, description: 'Placeholder text' },
    { name: 'label', type: 'string', required: false, description: 'Select label' },
    { name: 'error', type: 'boolean', default: 'false', required: false, description: 'Shows error state' },
    { name: 'errorMessage', type: 'string', required: false, description: 'Error message to display' },
  ],
  events: [
    { name: 'ha-change', detail: '{ value: string | string[] }', description: 'Emitted when selection changes' },
    { name: 'ha-open', detail: '{}', description: 'Emitted when dropdown opens' },
    { name: 'ha-close', detail: '{}', description: 'Emitted when dropdown closes' },
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
};
