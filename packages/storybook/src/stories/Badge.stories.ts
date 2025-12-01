import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@hidearea-design/core';

interface BadgeArgs {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  styleVariant: 'filled' | 'outlined' | 'soft';
  size: 'sm' | 'md' | 'lg';
  pill: boolean;
  dot: boolean;
  removable: boolean;
  label: string;
}

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Badge variant',
    },
    styleVariant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'soft'],
      description: 'Badge style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    pill: {
      control: { type: 'boolean' },
      description: 'Pill-shaped badge',
    },
    dot: {
      control: { type: 'boolean' },
      description: 'Dot-only badge',
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Show remove button',
    },
    label: {
      control: { type: 'text' },
      description: 'Badge label',
    },
  },
  args: {
    variant: 'primary',
    styleVariant: 'filled',
    size: 'md',
    pill: false,
    dot: false,
    removable: false,
    label: 'Badge',
  },
  render: (args) => html`
    <ha-badge
      variant="${args.variant}"
      style-variant="${args.styleVariant}"
      size="${args.size}"
      ?pill="${args.pill}"
      ?dot="${args.dot}"
      ?removable="${args.removable}"
    >
      ${args.label}
    </ha-badge>
  `,
};

export default meta;
type Story = StoryObj<BadgeArgs>;

/**
 * Default badge with primary variant
 */
export const Default: Story = {};

/**
 * All color variants in filled style
 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary">Primary</ha-badge>
      <ha-badge variant="secondary">Secondary</ha-badge>
      <ha-badge variant="success">Success</ha-badge>
      <ha-badge variant="warning">Warning</ha-badge>
      <ha-badge variant="error">Error</ha-badge>
      <ha-badge variant="info">Info</ha-badge>
    </div>
  `,
};

/**
 * Filled style variants
 */
export const FilledVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary" style-variant="filled">Primary</ha-badge>
      <ha-badge variant="secondary" style-variant="filled">Secondary</ha-badge>
      <ha-badge variant="success" style-variant="filled">Success</ha-badge>
      <ha-badge variant="warning" style-variant="filled">Warning</ha-badge>
      <ha-badge variant="error" style-variant="filled">Error</ha-badge>
      <ha-badge variant="info" style-variant="filled">Info</ha-badge>
    </div>
  `,
};

/**
 * Outlined style variants
 */
export const OutlinedVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary" style-variant="outlined">Primary</ha-badge>
      <ha-badge variant="secondary" style-variant="outlined">Secondary</ha-badge>
      <ha-badge variant="success" style-variant="outlined">Success</ha-badge>
      <ha-badge variant="warning" style-variant="outlined">Warning</ha-badge>
      <ha-badge variant="error" style-variant="outlined">Error</ha-badge>
      <ha-badge variant="info" style-variant="outlined">Info</ha-badge>
    </div>
  `,
};

/**
 * Soft style variants
 */
export const SoftVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary" style-variant="soft">Primary</ha-badge>
      <ha-badge variant="secondary" style-variant="soft">Secondary</ha-badge>
      <ha-badge variant="success" style-variant="soft">Success</ha-badge>
      <ha-badge variant="warning" style-variant="soft">Warning</ha-badge>
      <ha-badge variant="error" style-variant="soft">Error</ha-badge>
      <ha-badge variant="info" style-variant="soft">Info</ha-badge>
    </div>
  `,
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary" size="sm">Small</ha-badge>
      <ha-badge variant="primary" size="md">Medium</ha-badge>
      <ha-badge variant="primary" size="lg">Large</ha-badge>
    </div>
  `,
};

/**
 * Pill-shaped badges
 */
export const PillShaped: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary" pill>Primary</ha-badge>
      <ha-badge variant="secondary" pill>Secondary</ha-badge>
      <ha-badge variant="success" pill>Success</ha-badge>
      <ha-badge variant="warning" pill>Warning</ha-badge>
      <ha-badge variant="error" pill>Error</ha-badge>
      <ha-badge variant="info" pill>Info</ha-badge>
    </div>
  `,
};

/**
 * Pill badges in different sizes
 */
export const PillSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary" pill size="sm">Small Pill</ha-badge>
      <ha-badge variant="primary" pill size="md">Medium Pill</ha-badge>
      <ha-badge variant="primary" pill size="lg">Large Pill</ha-badge>
    </div>
  `,
};

/**
 * Dot badges (status indicators)
 */
export const DotBadges: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary" dot></ha-badge>
      <ha-badge variant="secondary" dot></ha-badge>
      <ha-badge variant="success" dot></ha-badge>
      <ha-badge variant="warning" dot></ha-badge>
      <ha-badge variant="error" dot></ha-badge>
      <ha-badge variant="info" dot></ha-badge>
    </div>
  `,
};

/**
 * Dot badges with text
 */
export const DotWithText: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-badge variant="success" dot></ha-badge>
        <span>Online</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-badge variant="warning" dot></ha-badge>
        <span>Away</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-badge variant="error" dot></ha-badge>
        <span>Busy</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-badge variant="secondary" dot></ha-badge>
        <span>Offline</span>
      </div>
    </div>
  `,
};

/**
 * Removable badges
 */
export const Removable: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary" removable>Primary</ha-badge>
      <ha-badge variant="secondary" removable>Secondary</ha-badge>
      <ha-badge variant="success" removable>Success</ha-badge>
      <ha-badge variant="warning" removable>Warning</ha-badge>
      <ha-badge variant="error" removable>Error</ha-badge>
      <ha-badge variant="info" removable>Info</ha-badge>
    </div>
  `,
};

/**
 * Badges with icons
 */
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="success">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
        Verified
      </ha-badge>
      <ha-badge variant="warning">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
        Warning
      </ha-badge>
      <ha-badge variant="info">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
        </svg>
        Info
      </ha-badge>
    </div>
  `,
};

/**
 * Number badges (notification counts)
 */
export const NumberBadges: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="error" pill size="sm">3</ha-badge>
      <ha-badge variant="error" pill size="md">12</ha-badge>
      <ha-badge variant="error" pill size="lg">99+</ha-badge>
      <ha-badge variant="primary" pill>New</ha-badge>
      <ha-badge variant="success" pill>Sale</ha-badge>
    </div>
  `,
};

/**
 * Usage with other components
 */
export const WithButton: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <ha-button variant="primary">
        Notifications
        <ha-badge variant="error" pill size="sm" style="margin-left: 0.5rem;">5</ha-badge>
      </ha-button>
      <ha-button variant="outline">
        Messages
        <ha-badge variant="success" pill size="sm" style="margin-left: 0.5rem;">12</ha-badge>
      </ha-button>
      <ha-button variant="ghost">
        Alerts
        <ha-badge variant="warning" pill size="sm" style="margin-left: 0.5rem;">3</ha-badge>
      </ha-button>
    </div>
  `,
};

/**
 * Tag-like usage (removable pills)
 */
export const Tags: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
      <ha-badge variant="primary" style-variant="soft" pill removable>React</ha-badge>
      <ha-badge variant="primary" style-variant="soft" pill removable>Vue</ha-badge>
      <ha-badge variant="primary" style-variant="soft" pill removable>TypeScript</ha-badge>
      <ha-badge variant="primary" style-variant="soft" pill removable>Web Components</ha-badge>
      <ha-badge variant="primary" style-variant="soft" pill removable>Vite</ha-badge>
    </div>
  `,
};

/**
 * Status badges
 */
export const StatusBadges: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-badge variant="success" style-variant="soft" pill>Active</ha-badge>
        <span>System is running normally</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-badge variant="warning" style-variant="soft" pill>Pending</ha-badge>
        <span>Waiting for approval</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-badge variant="error" style-variant="soft" pill>Failed</ha-badge>
        <span>Operation failed</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-badge variant="info" style-variant="soft" pill>Draft</ha-badge>
        <span>Not published yet</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-badge variant="secondary" style-variant="soft" pill>Archived</ha-badge>
        <span>Moved to archive</span>
      </div>
    </div>
  `,
};

/**
 * All style variants comparison
 */
export const StyleVariantsComparison: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
      <div>
        <h3 style="margin-top: 0; margin-bottom: 1rem;">Filled</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <ha-badge variant="primary" style-variant="filled">Primary</ha-badge>
          <ha-badge variant="secondary" style-variant="filled">Secondary</ha-badge>
          <ha-badge variant="success" style-variant="filled">Success</ha-badge>
          <ha-badge variant="warning" style-variant="filled">Warning</ha-badge>
          <ha-badge variant="error" style-variant="filled">Error</ha-badge>
          <ha-badge variant="info" style-variant="filled">Info</ha-badge>
        </div>
      </div>
      <div>
        <h3 style="margin-top: 0; margin-bottom: 1rem;">Outlined</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <ha-badge variant="primary" style-variant="outlined">Primary</ha-badge>
          <ha-badge variant="secondary" style-variant="outlined">Secondary</ha-badge>
          <ha-badge variant="success" style-variant="outlined">Success</ha-badge>
          <ha-badge variant="warning" style-variant="outlined">Warning</ha-badge>
          <ha-badge variant="error" style-variant="outlined">Error</ha-badge>
          <ha-badge variant="info" style-variant="outlined">Info</ha-badge>
        </div>
      </div>
      <div>
        <h3 style="margin-top: 0; margin-bottom: 1rem;">Soft</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <ha-badge variant="primary" style-variant="soft">Primary</ha-badge>
          <ha-badge variant="secondary" style-variant="soft">Secondary</ha-badge>
          <ha-badge variant="success" style-variant="soft">Success</ha-badge>
          <ha-badge variant="warning" style-variant="soft">Warning</ha-badge>
          <ha-badge variant="error" style-variant="soft">Error</ha-badge>
          <ha-badge variant="info" style-variant="soft">Info</ha-badge>
        </div>
      </div>
    </div>
  `,
};
