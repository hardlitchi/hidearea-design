import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@hidearea-design/core';

interface ButtonArgs {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  type: 'button' | 'submit' | 'reset';
  label: string;
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Button variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width button',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Button type',
    },
    label: {
      control: { type: 'text' },
      description: 'Button label',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    label: 'Button',
  },
  render: (args) => html`
    <ha-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?full-width="${args.fullWidth}"
      type="${args.type}"
      @click="${() => console.log('Button clicked')}"
    >
      ${args.label}
    </ha-button>
  `,
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
  render: Primary.render,
};

export const Outline: Story = {
  args: {
    ...Primary.args,
    variant: 'outline',
  },
  render: Primary.render,
};

export const Ghost: Story = {
  args: {
    ...Primary.args,
    variant: 'ghost',
  },
  render: Primary.render,
};

export const Danger: Story = {
  args: {
    ...Primary.args,
    variant: 'danger',
  },
  render: Primary.render,
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'sm',
  },
  render: Primary.render,
};

export const Large: Story = {
  args: {
    ...Primary.args,
    size: 'lg',
  },
  render: Primary.render,
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
  render: Primary.render,
};

export const Loading: Story = {
  args: {
    ...Primary.args,
    loading: true,
  },
  render: Primary.render,
};

export const FullWidth: Story = {
  args: {
    ...Primary.args,
    fullWidth: true,
  },
  render: Primary.render,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <ha-button variant="primary">Primary</ha-button>
        <ha-button variant="secondary">Secondary</ha-button>
        <ha-button variant="outline">Outline</ha-button>
        <ha-button variant="ghost">Ghost</ha-button>
        <ha-button variant="danger">Danger</ha-button>
      </div>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <ha-button size="sm">Small</ha-button>
      <ha-button size="md">Medium</ha-button>
      <ha-button size="lg">Large</ha-button>
    </div>
  `,
};
