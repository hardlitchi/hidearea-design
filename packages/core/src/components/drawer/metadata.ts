import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Drawer',
  tagName: 'ha-drawer',
  description: 'Drawer component for side panel content',
  category: 'Overlay',
  props: [
    { name: 'open', type: 'boolean', default: 'false', required: false, description: 'Whether drawer is open' },
    { name: 'position', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", required: false, description: 'Drawer position' },
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", required: false, description: 'Drawer size' },
    { name: 'title', type: 'string', required: false, description: 'Drawer title' },
    { name: 'closeOnOverlay', type: 'boolean', default: 'true', required: false, description: 'Close when clicking overlay' },
    { name: 'closeOnEscape', type: 'boolean', default: 'true', required: false, description: 'Close when pressing Escape' },
  ],
  events: [
    { name: 'ha-open', detail: '{}', description: 'Emitted when drawer opens' },
    { name: 'ha-close', detail: '{}', description: 'Emitted when drawer closes' },
  ],
  slots: [
    { name: 'default', description: 'Drawer content' },
    { name: 'header', description: 'Custom header content' },
    { name: 'footer', description: 'Drawer footer' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple drawer',
      code: `<ha-drawer title="Settings" open>
  <p>Drawer content goes here</p>
</ha-drawer>`,
    },
    {
      title: 'Left Position',
      description: 'Drawer from left side',
      code: `<ha-drawer position="left" title="Menu" open>
  <ha-menu>
    <ha-menu-item>Home</ha-menu-item>
    <ha-menu-item>About</ha-menu-item>
  </ha-menu>
</ha-drawer>`,
    },
  ],
  accessibility: {
    roles: ['dialog'],
    keyboardSupport: ['Escape - Close drawer', 'Tab - Navigate focusable elements'],
    ariaAttributes: ['aria-modal', 'aria-labelledby', 'aria-describedby'],
  },
  tokens: {
    colors: ['component-drawer-background', 'component-drawer-overlay'],
    spacing: ['spacing-lg'],
    typography: ['text-heading-h3-fontSize', 'font-weight-bold'],
    other: ['surface-overlay-elevation'],
  },
};
