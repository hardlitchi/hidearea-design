import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Menu',
  tagName: 'ha-menu',
  description: 'Menu component for displaying lists of actions or options',
  category: 'Navigation',
  props: [
    { name: 'open', type: 'boolean', default: 'false', required: false, description: 'Whether menu is open' },
  ],
  events: [
    { name: 'ha-select', detail: '{ value: string }', description: 'Emitted when menu item is selected' },
    { name: 'ha-open', detail: '{}', description: 'Emitted when menu opens' },
    { name: 'ha-close', detail: '{}', description: 'Emitted when menu closes' },
  ],
  slots: [
    { name: 'default', description: 'Menu items' },
    { name: 'trigger', description: 'Element that triggers the menu' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple dropdown menu',
      code: `<ha-menu>
  <ha-button slot="trigger">Actions</ha-button>
  <ha-menu-item value="edit">Edit</ha-menu-item>
  <ha-menu-item value="duplicate">Duplicate</ha-menu-item>
  <ha-menu-item value="delete">Delete</ha-menu-item>
</ha-menu>`,
    },
  ],
  accessibility: {
    roles: ['menu', 'menuitem'],
    keyboardSupport: ['Arrow keys - Navigate items', 'Enter/Space - Select item', 'Escape - Close menu'],
    ariaAttributes: ['aria-haspopup', 'aria-expanded', 'aria-activedescendant'],
  },
  tokens: {
    colors: ['component-menu-background', 'component-menu-item-hover'],
    spacing: ['spacing-sm'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md', 'surface-overlay-elevation'],
  },
};
