import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Toast',
  tagName: 'ha-toast',
  description: 'Toast notification component for temporary messages',
  category: 'Feedback',
  props: [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", required: false, description: 'Toast type' },
    { name: 'duration', type: 'number', default: '3000', required: false, description: 'Auto-dismiss duration in ms (0 = no auto-dismiss)' },
    { name: 'position', type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", default: "'top-right'", required: false, description: 'Toast position' },
    { name: 'closable', type: 'boolean', default: 'true', required: false, description: 'Show close button' },
  ],
  events: [
    { name: 'ha-close', detail: '{}', description: 'Emitted when toast is closed' },
  ],
  slots: [
    { name: 'default', description: 'Toast content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Show toast notification',
      code: `<ha-toast variant="success">
  Changes saved successfully!
</ha-toast>`,
    },
    {
      title: 'Custom Duration',
      description: 'Toast with custom duration',
      code: `<ha-toast variant="info" duration="5000">
  This message will stay for 5 seconds.
</ha-toast>`,
    },
  ],
  accessibility: {
    roles: ['status', 'alert'],
    keyboardSupport: ['Escape - Close toast'],
    ariaAttributes: ['aria-live', 'aria-atomic'],
  },
  tokens: {
    colors: ['component-toast-background', 'component-toast-text'],
    spacing: ['spacing-md'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md', 'surface-overlay-elevation'],
  },
};
