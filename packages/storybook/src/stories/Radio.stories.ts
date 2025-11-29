import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@hidearea-design/core';

interface RadioArgs {
  size: 'sm' | 'md' | 'lg';
  checked: boolean;
  disabled: boolean;
  required: boolean;
  error: boolean;
  name: string;
  value: string;
  label: string;
  description: string;
}

const meta: Meta<RadioArgs> = {
  title: 'Forms/Radio',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Radio size',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Checked state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required state',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state',
    },
    name: {
      control: { type: 'text' },
      description: 'Radio group name',
    },
    value: {
      control: { type: 'text' },
      description: 'Radio value',
    },
    label: {
      control: { type: 'text' },
      description: 'Radio label',
    },
    description: {
      control: { type: 'text' },
      description: 'Radio description',
    },
  },
};

export default meta;
type Story = StoryObj<RadioArgs>;

export const Default: Story = {
  args: {
    size: 'md',
    checked: false,
    disabled: false,
    required: false,
    error: false,
    name: 'example',
    value: 'option1',
    label: 'Option 1',
    description: '',
  },
  render: (args) => html`
    <ha-radio
      size="${args.size}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      name="${args.name}"
      value="${args.value}"
      label="${args.label}"
      description="${args.description}"
    ></ha-radio>
  `,
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: Default.render,
};

export const DisabledChecked: Story = {
  args: {
    ...Default.args,
    checked: true,
    disabled: true,
  },
  render: Default.render,
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
  render: Default.render,
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
  },
  render: Default.render,
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    label: 'Email notifications',
    description: 'Receive email notifications about important updates',
  },
  render: Default.render,
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
  render: Default.render,
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
  render: Default.render,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Small</h4>
        <ha-radio size="sm" name="size-demo-sm" value="small" label="Small radio"></ha-radio>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Medium</h4>
        <ha-radio size="md" name="size-demo-md" value="medium" label="Medium radio"></ha-radio>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
        <ha-radio size="lg" name="size-demo-lg" value="large" label="Large radio"></ha-radio>
      </div>
    </div>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Normal</h4>
        <ha-radio name="states-normal" value="normal" label="Normal radio"></ha-radio>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Checked</h4>
        <ha-radio name="states-checked" value="checked" label="Checked radio" checked></ha-radio>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Disabled</h4>
        <ha-radio name="states-disabled" value="disabled" label="Disabled radio" disabled></ha-radio>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Disabled Checked</h4>
        <ha-radio name="states-disabled-checked" value="disabled-checked" label="Disabled checked radio" disabled checked></ha-radio>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Error</h4>
        <ha-radio name="states-error" value="error" label="Error radio" error></ha-radio>
      </div>
    </div>
  `,
};

export const WithSlots: Story = {
  render: () => html`
    <ha-radio name="slot-demo" value="custom">
      <strong>Bold label</strong> with <em>italic text</em> and <a href="#">link</a>
      <div slot="description">
        Custom description with <strong>HTML content</strong>
      </div>
    </ha-radio>
  `,
};

export const RadioGroup: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <h4 style="margin: 0;">Select your preferred contact method</h4>
      <ha-radio name="contact-method" value="email" label="Email" checked></ha-radio>
      <ha-radio name="contact-method" value="phone" label="Phone"></ha-radio>
      <ha-radio name="contact-method" value="sms" label="SMS"></ha-radio>
      <ha-radio name="contact-method" value="mail" label="Postal Mail"></ha-radio>
    </div>
  `,
};

export const RadioGroupWithDescriptions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
      <h4 style="margin: 0;">Choose a subscription plan</h4>
      <ha-radio
        name="plan"
        value="free"
        label="Free Plan"
        description="Perfect for getting started. Includes basic features."
        checked
      ></ha-radio>
      <ha-radio
        name="plan"
        value="pro"
        label="Pro Plan - $19/month"
        description="For professionals. Includes all features and priority support."
      ></ha-radio>
      <ha-radio
        name="plan"
        value="enterprise"
        label="Enterprise Plan - $99/month"
        description="For large teams. Includes custom integrations and dedicated support."
      ></ha-radio>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="max-width: 500px;">
      <ha-stack direction="vertical" gap="6">
        <h3 style="margin: 0;">Order Form</h3>

        <ha-form-group label="Shipping Method" required>
          <ha-stack direction="vertical" gap="3">
            <ha-radio
              name="shipping"
              value="standard"
              label="Standard Shipping - Free"
              description="Delivery in 5-7 business days"
              checked
            ></ha-radio>
            <ha-radio
              name="shipping"
              value="express"
              label="Express Shipping - $15"
              description="Delivery in 2-3 business days"
            ></ha-radio>
            <ha-radio
              name="shipping"
              value="overnight"
              label="Overnight Shipping - $30"
              description="Delivery next business day"
            ></ha-radio>
          </ha-stack>
        </ha-form-group>

        <ha-form-group label="Payment Method" required>
          <ha-stack direction="vertical" gap="3">
            <ha-radio
              name="payment"
              value="credit"
              label="Credit Card"
              checked
            ></ha-radio>
            <ha-radio
              name="payment"
              value="paypal"
              label="PayPal"
            ></ha-radio>
            <ha-radio
              name="payment"
              value="bank"
              label="Bank Transfer"
            ></ha-radio>
          </ha-stack>
        </ha-form-group>

        <ha-stack direction="horizontal" gap="3" justify="end">
          <ha-button variant="outline">Cancel</ha-button>
          <ha-button variant="primary" type="submit">Continue to Payment</ha-button>
        </ha-stack>
      </ha-stack>
    </form>
  `,
};

export const HorizontalGroup: Story = {
  render: () => html`
    <div>
      <h4 style="margin: 0 0 1rem 0;">Select size</h4>
      <ha-stack direction="horizontal" gap="4">
        <ha-radio name="size" value="s" label="S"></ha-radio>
        <ha-radio name="size" value="m" label="M" checked></ha-radio>
        <ha-radio name="size" value="l" label="L"></ha-radio>
        <ha-radio name="size" value="xl" label="XL"></ha-radio>
      </ha-stack>
    </div>
  `,
};

export const WithFormGroupError: Story = {
  render: () => html`
    <ha-form-group
      label="Select an option"
      error-text="Please select one of the options"
      required
      error
    >
      <ha-stack direction="vertical" gap="2">
        <ha-radio name="error-demo" value="option1" label="Option 1" error></ha-radio>
        <ha-radio name="error-demo" value="option2" label="Option 2" error></ha-radio>
        <ha-radio name="error-demo" value="option3" label="Option 3" error></ha-radio>
      </ha-stack>
    </ha-form-group>
  `,
};

export const SettingsExample: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <ha-stack direction="vertical" gap="6">
        <h3 style="margin: 0;">Privacy Settings</h3>

        <ha-form-group label="Profile Visibility">
          <ha-stack direction="vertical" gap="3">
            <ha-radio
              name="visibility"
              value="public"
              label="Public"
              description="Anyone can see your profile"
              checked
            ></ha-radio>
            <ha-radio
              name="visibility"
              value="friends"
              label="Friends Only"
              description="Only your friends can see your profile"
            ></ha-radio>
            <ha-radio
              name="visibility"
              value="private"
              label="Private"
              description="Only you can see your profile"
            ></ha-radio>
          </ha-stack>
        </ha-form-group>

        <ha-form-group label="Email Notifications">
          <ha-stack direction="vertical" gap="3">
            <ha-radio
              name="notifications"
              value="all"
              label="All Notifications"
              description="Receive all email notifications"
              checked
            ></ha-radio>
            <ha-radio
              name="notifications"
              value="important"
              label="Important Only"
              description="Only receive important notifications"
            ></ha-radio>
            <ha-radio
              name="notifications"
              value="none"
              label="None"
              description="Do not send any email notifications"
            ></ha-radio>
          </ha-stack>
        </ha-form-group>

        <ha-stack direction="horizontal" gap="3" justify="end">
          <ha-button variant="outline">Cancel</ha-button>
          <ha-button variant="primary">Save Settings</ha-button>
        </ha-stack>
      </ha-stack>
    </div>
  `,
};
