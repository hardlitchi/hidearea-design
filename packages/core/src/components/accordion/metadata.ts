import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Accordion',
  tagName: 'ha-accordion',
  description: 'Accordion component for collapsible content sections',
  category: 'Data Display',
  props: [
    { name: 'multiple', type: 'boolean', default: 'false', required: false, description: 'Allow multiple panels to be open' },
    { name: 'collapsible', type: 'boolean', default: 'true', required: false, description: 'Allow panels to be collapsed' },
  ],
  events: [
    { name: 'ha-change', detail: '{ openPanels: string[] }', description: 'Emitted when panels are opened/closed' },
  ],
  slots: [
    { name: 'default', description: 'Accordion panels' },
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
      code: `<ha-accordion multiple>
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
};
