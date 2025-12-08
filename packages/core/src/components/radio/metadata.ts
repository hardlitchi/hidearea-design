import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Radio',
  tagName: 'ha-radio',
  description: 'Radio button for selecting a single option from a group',
  category: 'Form Controls',
  props: [
    { name: 'checked', type: 'boolean', default: 'false', required: false, description: 'Whether the radio is selected' },
    { name: 'value', type: 'string', required: true, description: 'Value of the radio button' },
    { name: 'name', type: 'string', required: true, description: 'Name attribute for grouping radios' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the radio button' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes radio required' },
    { name: 'label', type: 'string', required: false, description: 'Radio label' },
  ],
  events: [
    { name: 'ha-change', detail: '{ value: string }', description: 'Emitted when radio is selected' },
  ],
  slots: [
    { name: 'default', description: 'Radio label content' },
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
};
