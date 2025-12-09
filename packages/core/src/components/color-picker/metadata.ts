import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'ColorPicker',
  tagName: 'ha-color-picker',
  description: 'Color picker component for selecting colors',
  category: 'Form Controls',
  props: [
    { name: 'value', type: 'string', default: "'#000000'", required: false, description: 'Selected color value (hex, rgb, hsl)' },
    { name: 'format', type: "'hex' | 'rgb' | 'hsl'", default: "'hex'", required: false, description: 'Color format' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the color picker' },
    { name: 'swatches', type: 'string[]', required: false, description: 'Predefined color swatches' },
    { name: 'label', type: 'string', required: false, description: 'Color picker label' },
  ],
  events: [
    { name: 'ha-change', detail: '{ value: string }', description: 'Emitted when color changes' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple color picker',
      code: `<ha-color-picker label="Choose color" value="#3498db"></ha-color-picker>`,
    },
    {
      title: 'With Swatches',
      description: 'Color picker with predefined swatches',
      code: `<ha-color-picker
  :swatches="['#e74c3c', '#3498db', '#2ecc71', '#f39c12']"
></ha-color-picker>`,
    },
  ],
  accessibility: {
    roles: ['button'],
    keyboardSupport: ['Enter/Space - Open color picker', 'Arrow keys - Adjust color'],
    ariaAttributes: ['aria-label', 'aria-valuetext'],
  },
  tokens: {
    colors: ['component-color-picker-background', 'component-color-picker-border'],
    spacing: ['spacing-sm'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md', 'surface-overlay-elevation'],
  },
  htmlConverter: {
    patterns: ['<input type="color"', '<div class="color-picker"', '<div class="colorpicker"'],
    convert: (_match: string, attributes: Record<string, string>, _content: string) => {
      const value = attributes.value || '';
      const disabled = attributes.disabled !== undefined ? ' disabled' : '';

      // Detect format from data attributes or class names
      const className = attributes.class || '';
      let format = attributes['data-format'] || attributes.format || '';
      if (!format) {
        if (className.includes('rgb')) {
          format = 'rgb';
        } else if (className.includes('hsl')) {
          format = 'hsl';
        } else {
          format = 'hex';
        }
      }
      const formatAttr = format ? ` format="${format}"` : '';

      // Extract swatches from data-swatches attribute
      const swatches = attributes['data-swatches'] || '';
      const swatchesAttr = swatches ? ` swatches='${swatches}'` : '';

      let label = '';
      if (attributes['aria-label']) {
        label = ` label="${attributes['aria-label']}"`;
      } else if (attributes.id) {
        label = ` label="Choose color"`;
      }

      const valueAttr = value ? ` value="${value}"` : '';

      return `<ha-color-picker${label}${valueAttr}${formatAttr}${disabled}${swatchesAttr}></ha-color-picker>`;
    },
  },
};
