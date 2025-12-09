import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Alert',
  tagName: 'ha-alert',
  description: 'Alert component for displaying important messages and notifications',
  category: 'Feedback',
  props: [
    { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", required: false, description: 'Alert type' },
    { name: 'title', type: 'string', required: false, description: 'Alert title' },
    { name: 'closable', type: 'boolean', default: 'false', required: false, description: 'Show close button' },
    { name: 'icon', type: 'boolean', default: 'true', required: false, description: 'Show icon' },
  ],
  events: [
    { name: 'ha-close', detail: '{}', description: 'Emitted when alert is closed' },
  ],
  slots: [
    { name: 'default', description: 'Alert content' },
    { name: 'icon', description: 'Custom icon' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Different alert variants',
      code: `<ha-alert variant="info">This is an informational message</ha-alert>
<ha-alert variant="success">Operation completed successfully</ha-alert>
<ha-alert variant="warning">Please be careful</ha-alert>
<ha-alert variant="danger">An error occurred</ha-alert>`,
    },
    {
      title: 'With Title',
      description: 'Alert with title',
      code: `<ha-alert variant="warning" title="Warning">
  This action cannot be undone.
</ha-alert>`,
    },
    {
      title: 'Closable Alert',
      description: 'Alert with close button',
      code: `<ha-alert variant="info" closable>
  This alert can be dismissed.
</ha-alert>`,
    },
  ],
  accessibility: {
    roles: ['alert', 'status'],
    keyboardSupport: ['Escape - Close alert (if closable)'],
    ariaAttributes: ['aria-live', 'aria-atomic', 'aria-label'],
  },
  tokens: {
    colors: ['component-alert-info-background', 'component-alert-info-border', 'component-alert-info-text'],
    spacing: ['spacing-md'],
    typography: ['text-body-default-fontSize', 'font-weight-medium'],
    other: ['border-radius-md'],
  },
  htmlConverter: {
    patterns: ['<div role="alert"', '<div class="alert"', '<aside role="alert"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const className = attributes.class || '';
      let variant = 'info';

      if (className.includes('success')) variant = 'success';
      else if (className.includes('warning')) variant = 'warning';
      else if (className.includes('error') || className.includes('danger')) variant = 'error';

      const closable = className.includes('closable') || className.includes('dismissible') ? ' closable' : '';

      return `<ha-alert variant="${variant}"${closable}>\n  ${content.trim()}\n</ha-alert>`;
    },
  },
};
