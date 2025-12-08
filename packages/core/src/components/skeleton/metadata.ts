import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Skeleton',
  tagName: 'ha-skeleton',
  description: 'Skeleton loader component for displaying placeholder content during loading',
  category: 'Feedback',
  props: [
    { name: 'variant', type: "'text' | 'circular' | 'rectangular'", default: "'text'", required: false, description: 'Skeleton shape' },
    { name: 'width', type: 'string | number', required: false, description: 'Skeleton width' },
    { name: 'height', type: 'string | number', required: false, description: 'Skeleton height' },
    { name: 'animated', type: 'boolean', default: 'true', required: false, description: 'Animated pulse effect' },
  ],
  events: [],
  examples: [
    {
      title: 'Text Skeleton',
      description: 'Loading skeleton for text',
      code: `<ha-skeleton variant="text"></ha-skeleton>
<ha-skeleton variant="text" width="80%"></ha-skeleton>
<ha-skeleton variant="text" width="60%"></ha-skeleton>`,
    },
    {
      title: 'Circular Skeleton',
      description: 'Loading skeleton for avatars',
      code: `<ha-skeleton variant="circular" width="48px" height="48px"></ha-skeleton>`,
    },
    {
      title: 'Rectangular Skeleton',
      description: 'Loading skeleton for images/cards',
      code: `<ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>`,
    },
  ],
  accessibility: {
    roles: ['status'],
    keyboardSupport: [],
    ariaAttributes: ['aria-busy', 'aria-live'],
  },
  tokens: {
    colors: ['component-skeleton-background', 'component-skeleton-highlight'],
    spacing: [],
    typography: [],
    other: ['border-radius-md', 'interaction-transition-fast-duration'],
  },
};
