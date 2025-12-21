import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Modal',
  tagName: 'ha-modal',
  description: 'Modal dialog component for displaying content in an overlay',
  category: 'Feedback',
  props: [
    { name: 'open', type: 'boolean', default: 'false', required: false, description: 'Whether modal is open' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", required: false, description: 'Modal size' },
    { name: 'variant', type: "'default' | 'centered' | 'fullscreen'", default: "'default'", required: false, description: 'Modal variant' },
    { name: 'closable', type: 'boolean', default: 'true', required: false, description: 'Show close button' },
    { name: 'close-on-backdrop', type: 'boolean', default: 'true', required: false, description: 'Close when clicking backdrop' },
    { name: 'close-on-escape', type: 'boolean', default: 'true', required: false, description: 'Close when pressing Escape' },
  ],
  events: [
    { name: 'modal-open', detail: '{}', description: 'Emitted when modal opens' },
    { name: 'modal-close', detail: '{}', description: 'Emitted when modal closes' },
    { name: 'backdrop-click', detail: '{}', description: 'Emitted when backdrop is clicked' },
  ],
  slots: [
    { name: 'default', description: 'Modal content' },
    { name: 'header', description: 'Custom header content' },
    { name: 'footer', description: 'Modal footer (usually buttons)' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple modal',
      code: `<ha-modal title="Confirm Action" open>
  Are you sure you want to continue?
  <div slot="footer">
    <ha-button variant="outline">Cancel</ha-button>
    <ha-button variant="primary">Confirm</ha-button>
  </div>
</ha-modal>`,
    },
    {
      title: 'Large Modal',
      description: 'Modal with large size',
      code: `<ha-modal title="Details" size="large" open>
  <p>Modal content goes here...</p>
</ha-modal>`,
    },
  ],
  accessibility: {
    roles: ['dialog', 'alertdialog'],
    keyboardSupport: ['Escape - Close modal', 'Tab - Navigate focusable elements'],
    ariaAttributes: ['aria-modal', 'aria-labelledby', 'aria-describedby'],
  },
  tokens: {
    colors: ['component-modal-background', 'component-modal-overlay'],
    spacing: ['spacing-lg', 'spacing-xl'],
    typography: ['text-heading-h3-fontSize', 'font-weight-bold'],
    other: ['border-radius-lg', 'surface-overlay-elevation'],
  },
  htmlConverter: {
    patterns: ['<div role="dialog"', '<dialog', '<div class="modal"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const open = attributes.open !== undefined ? ' open' : '';
      const ariaLabel = attributes['aria-label'] || attributes['aria-labelledby'] || '';

      return `<ha-modal${open} label="${ariaLabel}">\n  ${content.trim()}\n</ha-modal>`;
    },
  },
};
