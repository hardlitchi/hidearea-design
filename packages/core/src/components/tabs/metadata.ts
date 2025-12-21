import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Tabs',
  tagName: 'ha-tabs',
  description: 'Tabs component for organizing content into different views',
  category: 'Navigation',
  props: [
    { name: 'value', type: 'string', required: false, description: 'Currently active tab value' },
    { name: 'variant', type: "'default' | 'outlined' | 'pills'", default: "'default'", required: false, description: 'Tab style variant' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", required: false, description: 'Tab size' },
    { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", required: false, description: 'Tab alignment' },
  ],
  events: [
    { name: 'tab-change', detail: '{ value: string, oldValue: string }', description: 'Emitted when active tab changes' },
  ],
  slots: [
    { name: 'default', description: 'Tab and panel elements' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple tabs',
      code: `<ha-tabs>
  <ha-tab value="profile">Profile</ha-tab>
  <ha-tab value="settings">Settings</ha-tab>
  <ha-tab value="notifications">Notifications</ha-tab>

  <ha-tab-panel value="profile">Profile content</ha-tab-panel>
  <ha-tab-panel value="settings">Settings content</ha-tab-panel>
  <ha-tab-panel value="notifications">Notifications content</ha-tab-panel>
</ha-tabs>`,
    },
    {
      title: 'Pills Variant',
      description: 'Tabs with pills style',
      code: `<ha-tabs variant="pills">
  <ha-tab value="overview">Overview</ha-tab>
  <ha-tab value="analytics">Analytics</ha-tab>
</ha-tabs>`,
    },
  ],
  accessibility: {
    roles: ['tablist', 'tab', 'tabpanel'],
    keyboardSupport: ['Arrow keys - Navigate between tabs', 'Home - First tab', 'End - Last tab'],
    ariaAttributes: ['aria-selected', 'aria-controls', 'aria-labelledby'],
  },
  tokens: {
    colors: ['component-tabs-border', 'component-tabs-active', 'component-tabs-text'],
    spacing: ['spacing-md'],
    typography: ['text-body-default-fontSize', 'font-weight-medium'],
    other: ['border-radius-md'],
  },
  htmlConverter: {
    patterns: ['<div role="tablist"', '<nav role="tablist"', '<div class="tabs"'],
    convert: (_match: string, _attributes: Record<string, string>, content: string) => {
      return `<ha-tabs>\n  ${content.trim()}\n</ha-tabs>`;
    },
  },
};
