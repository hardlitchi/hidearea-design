import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Toast',
  tagName: 'ha-toast',
  description: 'Toast notification component for temporary messages',
  category: 'Feedback',
  props: [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", required: false, description: 'Toast type' },
    { name: 'message', type: 'string', required: false, description: 'Toast message' },
    { name: 'duration', type: 'number', default: '0', required: false, description: 'Auto-close duration in ms (0 = no auto-close)' },
    { name: 'closable', type: 'boolean', default: 'false', required: false, description: 'Show close button' },
    { name: 'show-progress', type: 'boolean', default: 'false', required: false, description: 'Show progress bar' },
  ],
  events: [
    { name: 'toast-close', detail: '{}', description: 'Emitted when toast is closed' },
  ],
  slots: [
    { name: 'default', description: 'Toast message content' },
    { name: 'icon', description: 'Custom icon' },
    { name: 'action', description: 'Action button' },
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
  htmlConverter: {
    patterns: ['<div role="status" aria-live', '<div class="toast"', '<aside class="notification"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const className = attributes.class || '';
      let variant = 'info';

      if (className.includes('success')) variant = 'success';
      else if (className.includes('warning')) variant = 'warning';
      else if (className.includes('error') || className.includes('danger')) variant = 'error';

      const duration = attributes['data-duration'] || '5000';

      return `<ha-toast variant="${variant}" duration="${duration}">\n  ${content.trim()}\n</ha-toast>`;
    },
  },
};
