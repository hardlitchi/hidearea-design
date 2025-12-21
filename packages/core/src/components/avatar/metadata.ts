import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Avatar',
  tagName: 'ha-avatar',
  description: 'User avatar component for displaying profile pictures or initials',
  category: 'Data Display',
  props: [
    { name: 'src', type: 'string', required: false, description: 'Image source URL' },
    { name: 'alt', type: 'string', required: false, description: 'Alternative text for image' },
    { name: 'initials', type: 'string', required: false, description: 'Text initials to display' },
    { name: 'size', type: 'string', default: "'md'", required: false, description: 'Avatar size' },
    { name: 'variant', type: 'string', required: false, description: 'Avatar variant' },
    { name: 'shape', type: "'circle' | 'square'", default: "'circle'", required: false, description: 'Avatar shape' },
    { name: 'color', type: 'string', required: false, description: 'Avatar color' },
    { name: 'status', type: "'online' | 'offline' | 'busy' | 'away'", required: false, description: 'Status indicator' },
    { name: 'interactive', type: 'boolean', default: 'false', required: false, description: 'Make avatar interactive' },
  ],
  events: [],
  slots: [
    { name: 'default', description: 'Custom avatar content (e.g., icon)' },
  ],
  examples: [
    {
      title: 'With Image',
      description: 'Avatar with image source',
      code: `<ha-avatar src="/user.jpg" alt="John Doe"></ha-avatar>`,
    },
    {
      title: 'With Initials',
      description: 'Avatar with text initials',
      code: `<ha-avatar initials="JD"></ha-avatar>`,
    },
    {
      title: 'Different Sizes',
      description: 'Various avatar sizes',
      code: `<ha-avatar size="sm" initials="S"></ha-avatar>
<ha-avatar size="md" initials="M"></ha-avatar>
<ha-avatar size="lg" initials="L"></ha-avatar>`,
    },
  ],
  accessibility: {
    roles: ['img'],
    keyboardSupport: [],
    ariaAttributes: ['aria-label'],
  },
  tokens: {
    colors: ['component-avatar-background', 'component-avatar-text'],
    spacing: [],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-full'],
  },
  htmlConverter: {
    patterns: ['<img class="avatar"', '<div class="avatar"'],
    convert: (_match: string, attributes: Record<string, string>, _content: string) => {
      const src = attributes.src || '';
      const alt = attributes.alt || '';
      return `<ha-avatar src="${src}" alt="${alt}"></ha-avatar>`;
    },
  },
};
