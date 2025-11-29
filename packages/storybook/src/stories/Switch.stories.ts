import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@hidearea-design/core';

interface SwitchArgs {
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

const meta: Meta<SwitchArgs> = {
  title: 'Forms/Switch',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
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
      description: 'Switch name',
    },
    value: {
      control: { type: 'text' },
      description: 'Switch value',
    },
    label: {
      control: { type: 'text' },
      description: 'Switch label',
    },
    description: {
      control: { type: 'text' },
      description: 'Switch description',
    },
  },
};

export default meta;
type Story = StoryObj<SwitchArgs>;

export const Default: Story = {
  args: {
    size: 'md',
    checked: false,
    disabled: false,
    required: false,
    error: false,
    name: 'example',
    value: 'on',
    label: 'Enable feature',
    description: '',
  },
  render: (args) => html`
    <ha-switch
      size="${args.size}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      name="${args.name}"
      value="${args.value}"
      label="${args.label}"
      description="${args.description}"
    ></ha-switch>
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
    label: 'Enable notifications',
    description: 'Receive email notifications about updates and changes',
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
        <ha-switch size="sm" label="Small switch"></ha-switch>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Medium</h4>
        <ha-switch size="md" label="Medium switch"></ha-switch>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Large</h4>
        <ha-switch size="lg" label="Large switch"></ha-switch>
      </div>
    </div>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Normal (Off)</h4>
        <ha-switch label="Normal switch"></ha-switch>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Checked (On)</h4>
        <ha-switch label="Checked switch" checked></ha-switch>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Disabled (Off)</h4>
        <ha-switch label="Disabled switch" disabled></ha-switch>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Disabled (On)</h4>
        <ha-switch label="Disabled checked switch" disabled checked></ha-switch>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem 0;">Error</h4>
        <ha-switch label="Error switch" error></ha-switch>
      </div>
    </div>
  `,
};

export const WithSlots: Story = {
  render: () => html`
    <ha-switch name="custom" value="on">
      <strong>Bold label</strong> with <em>italic text</em>
      <div slot="description">
        Custom description with <strong>HTML content</strong>
      </div>
    </ha-switch>
  `,
};

export const SettingsList: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
      <h4 style="margin: 0;">Notification Settings</h4>
      <ha-switch
        name="email-notifications"
        label="Email Notifications"
        description="Receive email updates about your account"
        checked
      ></ha-switch>
      <ha-switch
        name="push-notifications"
        label="Push Notifications"
        description="Get push notifications on your device"
        checked
      ></ha-switch>
      <ha-switch
        name="sms-notifications"
        label="SMS Notifications"
        description="Receive text messages for important alerts"
      ></ha-switch>
      <ha-switch
        name="newsletter"
        label="Newsletter"
        description="Subscribe to our monthly newsletter"
      ></ha-switch>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="max-width: 600px;">
      <ha-stack direction="vertical" gap="6">
        <h3 style="margin: 0;">Account Preferences</h3>

        <ha-form-group label="Privacy Settings">
          <ha-stack direction="vertical" gap="4">
            <ha-switch
              name="profile-public"
              label="Public Profile"
              description="Allow others to view your profile"
              checked
            ></ha-switch>
            <ha-switch
              name="show-email"
              label="Show Email Address"
              description="Display your email on your public profile"
            ></ha-switch>
            <ha-switch
              name="show-activity"
              label="Show Activity"
              description="Let others see your recent activity"
              checked
            ></ha-switch>
          </ha-stack>
        </ha-form-group>

        <ha-form-group label="Communication Preferences">
          <ha-stack direction="vertical" gap="4">
            <ha-switch
              name="marketing-emails"
              label="Marketing Emails"
              description="Receive promotional emails and offers"
            ></ha-switch>
            <ha-switch
              name="product-updates"
              label="Product Updates"
              description="Get notified about new features"
              checked
            ></ha-switch>
            <ha-switch
              name="community-digest"
              label="Community Digest"
              description="Weekly summary of community activity"
              checked
            ></ha-switch>
          </ha-stack>
        </ha-form-group>

        <ha-stack direction="horizontal" gap="3" justify="end">
          <ha-button variant="outline">Cancel</ha-button>
          <ha-button variant="primary">Save Preferences</ha-button>
        </ha-stack>
      </ha-stack>
    </form>
  `,
};

export const DarkModeToggle: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--color-neutral-50, #f9fafb); border-radius: 0.5rem;">
      <ha-stack direction="horizontal" gap="4" justify="space-between" align="center">
        <div>
          <h4 style="margin: 0 0 0.25rem 0;">Dark Mode</h4>
          <p style="margin: 0; font-size: 0.875rem; color: var(--color-neutral-600, #4b5563);">
            Enable dark theme across the application
          </p>
        </div>
        <ha-switch name="dark-mode" size="lg"></ha-switch>
      </ha-stack>
    </div>
  `,
};

export const FeatureToggles: Story = {
  render: () => html`
    <div style="max-width: 700px;">
      <ha-stack direction="vertical" gap="5">
        <h3 style="margin: 0;">Feature Toggles</h3>

        <div style="
          padding: 1.5rem;
          background: white;
          border: 1px solid var(--color-neutral-200, #e5e7eb);
          border-radius: 0.5rem;
        ">
          <ha-stack direction="horizontal" gap="4" justify="space-between" align="center">
            <div>
              <h4 style="margin: 0 0 0.5rem 0;">Auto-save</h4>
              <p style="margin: 0; font-size: 0.875rem; color: var(--color-neutral-600, #4b5563);">
                Automatically save your work every 30 seconds
              </p>
            </div>
            <ha-switch name="auto-save" checked></ha-switch>
          </ha-stack>
        </div>

        <div style="
          padding: 1.5rem;
          background: white;
          border: 1px solid var(--color-neutral-200, #e5e7eb);
          border-radius: 0.5rem;
        ">
          <ha-stack direction="horizontal" gap="4" justify="space-between" align="center">
            <div>
              <h4 style="margin: 0 0 0.5rem 0;">Spell Check</h4>
              <p style="margin: 0; font-size: 0.875rem; color: var(--color-neutral-600, #4b5563);">
                Enable real-time spell checking
              </p>
            </div>
            <ha-switch name="spell-check" checked></ha-switch>
          </ha-stack>
        </div>

        <div style="
          padding: 1.5rem;
          background: white;
          border: 1px solid var(--color-neutral-200, #e5e7eb);
          border-radius: 0.5rem;
        ">
          <ha-stack direction="horizontal" gap="4" justify="space-between" align="center">
            <div>
              <h4 style="margin: 0 0 0.5rem 0;">Smart Suggestions</h4>
              <p style="margin: 0; font-size: 0.875rem; color: var(--color-neutral-600, #4b5563);">
                Get AI-powered suggestions while typing
              </p>
            </div>
            <ha-switch name="suggestions"></ha-switch>
          </ha-stack>
        </div>

        <div style="
          padding: 1.5rem;
          background: white;
          border: 1px solid var(--color-neutral-200, #e5e7eb);
          border-radius: 0.5rem;
        ">
          <ha-stack direction="horizontal" gap="4" justify="space-between" align="center">
            <div>
              <h4 style="margin: 0 0 0.5rem 0;">Keyboard Shortcuts</h4>
              <p style="margin: 0; font-size: 0.875rem; color: var(--color-neutral-600, #4b5563);">
                Enable keyboard shortcuts for faster navigation
              </p>
            </div>
            <ha-switch name="shortcuts" checked></ha-switch>
          </ha-stack>
        </div>
      </ha-stack>
    </div>
  `,
};

export const WithFormGroupError: Story = {
  render: () => html`
    <ha-form-group
      label="Terms and Conditions"
      error-text="You must accept the terms to continue"
      required
      error
    >
      <ha-switch
        name="accept-terms"
        label="I accept the terms and conditions"
        description="Please read our terms before accepting"
        error
      ></ha-switch>
    </ha-form-group>
  `,
};

export const CompactList: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <ha-stack direction="vertical" gap="3">
        <ha-switch size="sm" label="Wi-Fi" checked></ha-switch>
        <ha-switch size="sm" label="Bluetooth"></ha-switch>
        <ha-switch size="sm" label="Location Services" checked></ha-switch>
        <ha-switch size="sm" label="Airplane Mode"></ha-switch>
        <ha-switch size="sm" label="Do Not Disturb"></ha-switch>
      </ha-stack>
    </div>
  `,
};
