import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Accordion',
  tagName: 'ha-accordion',
  description: 'Accordion component for collapsible content sections',
  category: 'Data Display',
  props: [
    { name: 'allow-multiple', type: 'boolean', default: 'false', required: false, description: 'Allow multiple items to be open simultaneously' },
    { name: 'collapsible', type: 'boolean', default: 'false', required: false, description: 'Allow all items to be collapsed' },
  ],
  events: [
    { name: 'accordion-toggle', detail: '{ open: boolean }', description: 'Emitted when item is toggled' },
    { name: 'accordion-open', detail: '{}', description: 'Emitted when item is opened' },
    { name: 'accordion-close', detail: '{}', description: 'Emitted when item is closed' },
  ],
  slots: [
    { name: 'default', description: 'Accordion items (ha-accordion-item elements)' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple accordion',
      code: `<ha-accordion>
  <ha-accordion-panel value="panel1" title="Section 1">
    <p>Content for section 1</p>
  </ha-accordion-panel>
  <ha-accordion-panel value="panel2" title="Section 2">
    <p>Content for section 2</p>
  </ha-accordion-panel>
</ha-accordion>`,
    },
    {
      title: 'Multiple Open',
      description: 'Allow multiple panels open',
      code: `<ha-accordion allow-multiple>
  <ha-accordion-panel value="a" title="Panel A">Content A</ha-accordion-panel>
  <ha-accordion-panel value="b" title="Panel B">Content B</ha-accordion-panel>
</ha-accordion>`,
    },
  ],
  accessibility: {
    roles: ['region'],
    keyboardSupport: ['Enter/Space - Toggle panel', 'Arrow keys - Navigate panels'],
    ariaAttributes: ['aria-expanded', 'aria-controls', 'aria-labelledby'],
  },
  tokens: {
    colors: ['component-accordion-header-background', 'component-accordion-border'],
    spacing: ['spacing-md'],
    typography: ['text-body-default-fontSize', 'font-weight-medium'],
    other: ['border-radius-md'],
  },
  htmlConverter: {
    patterns: ['<details', '<div class="accordion"'],
    convert: (_match: string, attributes: Record<string, string>, content: string) => {
      const open = attributes.open !== undefined ? ' open' : '';
      return `<ha-accordion${open}>\n  ${content.trim()}\n</ha-accordion>`;
    },
  },
};
