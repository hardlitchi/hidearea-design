import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Menu',
  tagName: 'ha-menu',
  description: 'Menu component for displaying lists of actions or options',
  category: 'Navigation',
  props: [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Menu size' },
  ],
  events: [],
  slots: [
    { name: 'default', description: 'Menu items and dividers' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple menu',
      code: `<ha-menu>
  <ha-menu-item>Edit</ha-menu-item>
  <ha-menu-item>Duplicate</ha-menu-item>
  <ha-menu-item>Delete</ha-menu-item>
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
  htmlConverter: {
    patterns: ['<nav role="menu"', '<ul role="menu"', '<div class="menu"'],
    convert: (_match: string, _attributes: Record<string, string>, content: string) => {
      return `<ha-menu>\n  ${content.trim()}\n</ha-menu>`;
    },
  },
};
