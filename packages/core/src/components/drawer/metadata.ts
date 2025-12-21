import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Drawer',
  tagName: 'ha-drawer',
  description: 'Drawer component for side panel content',
  category: 'Overlay',
  props: [
    { name: 'open', type: 'boolean', default: 'false', required: false, description: 'Whether drawer is open' },
    { name: 'placement', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", required: false, description: 'Drawer placement' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Drawer size' },
    { name: 'overlay', type: 'boolean', default: 'true', required: false, description: 'Show backdrop overlay' },
    { name: 'close-on-backdrop', type: 'boolean', default: 'true', required: false, description: 'Close when clicking backdrop' },
    { name: 'close-on-escape', type: 'boolean', default: 'true', required: false, description: 'Close when pressing Escape' },
  ],
  events: [
    { name: 'drawer-open', detail: '{}', description: 'Emitted when drawer opens' },
    { name: 'drawer-close', detail: '{}', description: 'Emitted when drawer closes' },
    { name: 'backdrop-click', detail: '{}', description: 'Emitted when backdrop is clicked' },
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
      code: `<ha-drawer open>
  <p>Drawer content goes here</p>
</ha-drawer>`,
    },
    {
      title: 'Left Position',
      description: 'Drawer from left side',
      code: `<ha-drawer placement="left" open>
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
  htmlConverter: {
    patterns: ['<aside role="dialog"', '<aside class="drawer"', '<div class="sidebar"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const className = attributes.class || '';
      let position = 'right';

      if (className.includes('left')) position = 'left';
      else if (className.includes('top')) position = 'top';
      else if (className.includes('bottom')) position = 'bottom';

      const open = attributes.open !== undefined || attributes['aria-hidden'] === 'false' ? ' open' : '';

      return `<ha-drawer position="${position}"${open}>\n  ${content.trim()}\n</ha-drawer>`;
    },
  },
};
