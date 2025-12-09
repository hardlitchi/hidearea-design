import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Switch',
  tagName: 'ha-switch',
  description: 'Toggle switch for binary on/off states',
  category: 'Form Controls',
  props: [
    { name: 'checked', type: 'boolean', default: 'false', required: false, description: 'Whether the switch is on' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the switch' },
    { name: 'required', type: 'boolean', default: 'false', required: false, description: 'Makes switch required' },
    { name: 'label', type: 'string', required: false, description: 'Switch label' },
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", required: false, description: 'Switch size' },
  ],
  events: [
    { name: 'ha-change', detail: '{ checked: boolean }', description: 'Emitted when switch state changes' },
  ],
  slots: [
    { name: 'default', description: 'Switch label content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple switch',
      code: `<ha-switch label="Enable notifications"></ha-switch>`,
    },
    {
      title: 'Checked State',
      description: 'Pre-checked switch',
      code: `<ha-switch label="Dark mode" checked></ha-switch>`,
    },
    {
      title: 'Different Sizes',
      description: 'Switch sizes',
      code: `<ha-switch label="Small" size="small"></ha-switch>
<ha-switch label="Medium" size="medium"></ha-switch>
<ha-switch label="Large" size="large"></ha-switch>`,
    },
  ],
  accessibility: {
    roles: ['switch'],
    keyboardSupport: ['Space - Toggle switch', 'Enter - Toggle switch'],
    ariaAttributes: ['aria-checked', 'aria-disabled', 'aria-required'],
  },
  tokens: {
    colors: ['component-switch-background', 'component-switch-handle', 'component-switch-checked'],
    spacing: ['spacing-xs'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-full', 'interaction-transition-fast-duration'],
  },
  htmlConverter: {
    patterns: ['<input type="checkbox" role="switch"', '<div role="switch"', '<button role="switch"'],
    convert: (_match: string, attributes: Record<string, string>, _content: string) => {
      // Switches are often implemented as checkboxes with role="switch" or custom elements
      const checked = attributes.checked !== undefined || attributes['aria-checked'] === 'true' ? ' checked' : '';
      const disabled = attributes.disabled !== undefined || attributes['aria-disabled'] === 'true' ? ' disabled' : '';
      const required = attributes.required !== undefined ? ' required' : '';

      // Extract label
      let label = '';
      if (attributes['aria-label']) {
        label = attributes['aria-label'];
      } else if (attributes['aria-labelledby']) {
        label = 'Switch';
      }

      return `<ha-switch${checked}${disabled}${required}>${label}</ha-switch>`;
    },
  },
};
