/**
 * Button Component Metadata
 * Used by MCP server for AI-powered assistance
 */

import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Button',
  tagName: 'ha-button',
  description: 'A customizable button component with multiple variants and sizes',
  category: 'Form Controls',
  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
      default: "'primary'",
      required: false,
      description: 'Visual style variant',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      required: false,
      description: 'Button size',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'Disables the button',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'Shows loading state',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'Makes button full width',
    },
  ],
  events: [
    {
      name: 'ha-click',
      detail: '{ originalEvent: MouseEvent }',
      description: 'Emitted when button is clicked',
    },
  ],
  slots: [
    {
      name: 'default',
      description: 'Button content',
    },
    {
      name: 'prefix',
      description: 'Content before button text (e.g., icon)',
    },
    {
      name: 'suffix',
      description: 'Content after button text',
    },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple button with text',
      code: `<ha-button>Click me</ha-button>`,
    },
    {
      title: 'With Variant',
      description: 'Different button styles',
      code: `<ha-button variant="primary">Primary</ha-button>
<ha-button variant="secondary">Secondary</ha-button>
<ha-button variant="outline">Outline</ha-button>`,
    },
    {
      title: 'With Icon',
      description: 'Button with icon prefix',
      code: `<ha-button>
  <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z"/>
  </svg>
  Star
</ha-button>`,
    },
    {
      title: 'Loading State',
      description: 'Button with loading indicator',
      code: `<ha-button loading>Loading...</ha-button>`,
    },
    {
      title: 'Disabled State',
      description: 'Disabled button',
      code: `<ha-button disabled>Disabled</ha-button>`,
    },
  ],
  accessibility: {
    roles: ['button'],
    keyboardSupport: ['Enter - Activates button', 'Space - Activates button'],
    ariaAttributes: ['aria-disabled', 'aria-pressed (for toggle buttons)', 'aria-label'],
  },
  tokens: {
    colors: [
      'component-button-primary-background-default',
      'component-button-primary-text-default',
      'component-button-primary-border-default',
    ],
    spacing: ['spacing-sm', 'spacing-md', 'spacing-lg'],
    typography: ['text-body-default-fontSize', 'font-weight-medium'],
    other: ['border-radius-md', 'interaction-transition-fast-duration'],
  },
};
