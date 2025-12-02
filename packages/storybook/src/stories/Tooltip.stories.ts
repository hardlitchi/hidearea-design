import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@hidearea-design/core';

const meta: Meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content text',
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Tooltip placement',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus', 'click'],
      description: 'Trigger type',
    },
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light'],
      description: 'Tooltip variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tooltip size',
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow indicator',
    },
    delay: {
      control: 'number',
      description: 'Show delay in milliseconds',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    trigger: 'hover',
    variant: 'default',
    size: 'md',
    showArrow: true,
    delay: 200,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 100px; text-align: center;">
      <ha-tooltip
        content="${args.content}"
        placement="${args.placement}"
        trigger="${args.trigger}"
        variant="${args.variant}"
        size="${args.size}"
        ?show-arrow="${args.showArrow}"
        delay="${args.delay}"
        ?disabled="${args.disabled}"
      >
        <button style="padding: 8px 16px; cursor: pointer;">
          Hover me
        </button>
      </ha-tooltip>
    </div>
  `,
};

export const Placements: Story = {
  render: () => html`
    <div style="padding: 150px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; text-align: center;">
      <ha-tooltip content="Top start" placement="top-start" show-arrow>
        <button style="padding: 8px 16px;">Top Start</button>
      </ha-tooltip>
      <ha-tooltip content="Top" placement="top" show-arrow>
        <button style="padding: 8px 16px;">Top</button>
      </ha-tooltip>
      <ha-tooltip content="Top end" placement="top-end" show-arrow>
        <button style="padding: 8px 16px;">Top End</button>
      </ha-tooltip>

      <ha-tooltip content="Left start" placement="left-start" show-arrow>
        <button style="padding: 8px 16px;">Left Start</button>
      </ha-tooltip>
      <div></div>
      <ha-tooltip content="Right start" placement="right-start" show-arrow>
        <button style="padding: 8px 16px;">Right Start</button>
      </ha-tooltip>

      <ha-tooltip content="Left" placement="left" show-arrow>
        <button style="padding: 8px 16px;">Left</button>
      </ha-tooltip>
      <div></div>
      <ha-tooltip content="Right" placement="right" show-arrow>
        <button style="padding: 8px 16px;">Right</button>
      </ha-tooltip>

      <ha-tooltip content="Left end" placement="left-end" show-arrow>
        <button style="padding: 8px 16px;">Left End</button>
      </ha-tooltip>
      <div></div>
      <ha-tooltip content="Right end" placement="right-end" show-arrow>
        <button style="padding: 8px 16px;">Right End</button>
      </ha-tooltip>

      <ha-tooltip content="Bottom start" placement="bottom-start" show-arrow>
        <button style="padding: 8px 16px;">Bottom Start</button>
      </ha-tooltip>
      <ha-tooltip content="Bottom" placement="bottom" show-arrow>
        <button style="padding: 8px 16px;">Bottom</button>
      </ha-tooltip>
      <ha-tooltip content="Bottom end" placement="bottom-end" show-arrow>
        <button style="padding: 8px 16px;">Bottom End</button>
      </ha-tooltip>
    </div>
  `,
};

export const Triggers: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
      <ha-tooltip content="Appears on hover" trigger="hover" show-arrow>
        <button style="padding: 8px 16px;">Hover</button>
      </ha-tooltip>
      <ha-tooltip content="Appears on focus" trigger="focus" show-arrow>
        <button style="padding: 8px 16px;">Focus</button>
      </ha-tooltip>
      <ha-tooltip content="Appears on click" trigger="click" show-arrow>
        <button style="padding: 8px 16px;">Click</button>
      </ha-tooltip>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
      <ha-tooltip content="Default variant" variant="default" show-arrow>
        <button style="padding: 8px 16px;">Default</button>
      </ha-tooltip>
      <ha-tooltip content="Dark variant" variant="dark" show-arrow>
        <button style="padding: 8px 16px;">Dark</button>
      </ha-tooltip>
      <ha-tooltip content="Light variant" variant="light" show-arrow>
        <button style="padding: 8px 16px;">Light</button>
      </ha-tooltip>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
      <ha-tooltip content="Small tooltip" size="sm" show-arrow>
        <button style="padding: 8px 16px;">Small</button>
      </ha-tooltip>
      <ha-tooltip content="Medium tooltip" size="md" show-arrow>
        <button style="padding: 8px 16px;">Medium</button>
      </ha-tooltip>
      <ha-tooltip content="Large tooltip with more content to demonstrate the larger size" size="lg" show-arrow>
        <button style="padding: 8px 16px;">Large</button>
      </ha-tooltip>
    </div>
  `,
};

export const WithArrow: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
      <ha-tooltip content="With arrow" show-arrow>
        <button style="padding: 8px 16px;">With Arrow</button>
      </ha-tooltip>
      <ha-tooltip content="Without arrow">
        <button style="padding: 8px 16px;">Without Arrow</button>
      </ha-tooltip>
    </div>
  `,
};

export const Delay: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
      <ha-tooltip content="No delay" delay="0" show-arrow>
        <button style="padding: 8px 16px;">No Delay</button>
      </ha-tooltip>
      <ha-tooltip content="200ms delay" delay="200" show-arrow>
        <button style="padding: 8px 16px;">200ms</button>
      </ha-tooltip>
      <ha-tooltip content="500ms delay" delay="500" show-arrow>
        <button style="padding: 8px 16px;">500ms</button>
      </ha-tooltip>
      <ha-tooltip content="1000ms delay" delay="1000" show-arrow>
        <button style="padding: 8px 16px;">1000ms</button>
      </ha-tooltip>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
      <ha-tooltip content="This tooltip works" show-arrow>
        <button style="padding: 8px 16px;">Enabled</button>
      </ha-tooltip>
      <ha-tooltip content="This tooltip is disabled" disabled show-arrow>
        <button style="padding: 8px 16px;">Disabled</button>
      </ha-tooltip>
    </div>
  `,
};

export const LongContent: Story = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <ha-tooltip
        content="This is a very long tooltip content that will wrap to multiple lines. It demonstrates how the tooltip handles longer text content and maintains readability."
        show-arrow
      >
        <button style="padding: 8px 16px;">Long Content</button>
      </ha-tooltip>
    </div>
  `,
};

export const CustomSlotContent: Story = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <ha-tooltip show-arrow>
        <button style="padding: 8px 16px;">Custom Content</button>
        <div slot="content">
          <strong>Custom HTML Content</strong>
          <p style="margin: 4px 0;">This tooltip uses the content slot.</p>
          <p style="margin: 4px 0;">You can put <em>any HTML</em> here!</p>
        </div>
      </ha-tooltip>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
      <ha-tooltip content="Information" show-arrow>
        <button style="padding: 8px; cursor: help; border: none; background: var(--ha-color-primary-500); color: white; border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;">
          i
        </button>
      </ha-tooltip>
      <ha-tooltip content="Help" show-arrow>
        <button style="padding: 8px; cursor: help; border: none; background: var(--ha-color-success-500); color: white; border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;">
          ?
        </button>
      </ha-tooltip>
      <ha-tooltip content="Warning" variant="dark" show-arrow>
        <button style="padding: 8px; cursor: help; border: none; background: var(--ha-color-warning-500); color: white; border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;">
          !
        </button>
      </ha-tooltip>
    </div>
  `,
};
