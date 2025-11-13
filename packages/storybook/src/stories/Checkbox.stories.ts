import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@hidearea-design/core';

interface CheckboxArgs {
  size: 'sm' | 'md' | 'lg';
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  required: boolean;
  error: boolean;
  label: string;
  description: string;
}

const meta: Meta<CheckboxArgs> = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Checked state',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Indeterminate state',
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
    label: {
      control: { type: 'text' },
      description: 'Checkbox label',
    },
    description: {
      control: { type: 'text' },
      description: 'Checkbox description',
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {
  args: {
    size: 'md',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    error: false,
    label: 'Accept terms and conditions',
    description: '',
  },
  render: (args) => html`
    <ha-checkbox
      size="${args.size}"
      ?checked="${args.checked}"
      ?indeterminate="${args.indeterminate}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      label="${args.label}"
      description="${args.description}"
      @change="${(e: CustomEvent) => console.log('Change:', e.detail.checked)}"
    >
    </ha-checkbox>
  `,
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
  render: Default.render,
};

export const Indeterminate: Story = {
  args: {
    ...Default.args,
    indeterminate: true,
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
    description: 'You must accept the terms and conditions',
  },
  render: Default.render,
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    description: 'By checking this box, you agree to our terms of service and privacy policy.',
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
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-checkbox size="sm" label="Small checkbox"></ha-checkbox>
      <ha-checkbox size="md" label="Medium checkbox"></ha-checkbox>
      <ha-checkbox size="lg" label="Large checkbox"></ha-checkbox>
    </div>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-checkbox label="Unchecked"></ha-checkbox>
      <ha-checkbox checked label="Checked"></ha-checkbox>
      <ha-checkbox indeterminate label="Indeterminate"></ha-checkbox>
      <ha-checkbox disabled label="Disabled"></ha-checkbox>
      <ha-checkbox checked disabled label="Checked & Disabled"></ha-checkbox>
      <ha-checkbox error label="Error state"></ha-checkbox>
    </div>
  `,
};

export const WithSlots: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <ha-checkbox>
        I agree to the <a href="#" style="color: #3b82f6;">terms and conditions</a>
      </ha-checkbox>

      <ha-checkbox>
        Subscribe to newsletter
        <span slot="description">
          Get updates about new products and special offers
        </span>
      </ha-checkbox>

      <ha-checkbox error>
        Required field
        <span slot="description" style="color: #ef4444;">
          This field is required to continue
        </span>
      </ha-checkbox>
    </div>
  `,
};

export const CheckboxGroup: Story = {
  render: () => html`
    <form style="max-width: 400px;">
      <fieldset style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem;">
        <legend style="font-weight: 600; padding: 0 0.5rem;">Select your interests</legend>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <ha-checkbox name="interests" value="design" label="Design"></ha-checkbox>
          <ha-checkbox name="interests" value="development" label="Development"></ha-checkbox>
          <ha-checkbox name="interests" value="marketing" label="Marketing"></ha-checkbox>
          <ha-checkbox name="interests" value="sales" label="Sales"></ha-checkbox>
        </div>
      </fieldset>
    </form>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Sign Up</h3>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
        <ha-input
          type="email"
          placeholder="Enter your email"
          required
          full-width
        ></ha-input>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Password</label>
        <ha-input
          type="password"
          placeholder="Enter password"
          required
          full-width
        ></ha-input>
      </div>

      <div>
        <ha-checkbox required>
          I agree to the terms and conditions *
          <span slot="description">
            Please read our terms before continuing
          </span>
        </ha-checkbox>
      </div>

      <div>
        <ha-checkbox>
          Subscribe to newsletter
          <span slot="description">
            Receive updates and special offers
          </span>
        </ha-checkbox>
      </div>

      <div>
        <ha-button type="submit" full-width>Create Account</ha-button>
      </div>
    </form>
  `,
};

export const IndeterminateExample: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      <ha-checkbox
        id="parent"
        indeterminate
        @change="${(e: CustomEvent) => {
          const parent = e.target as any;
          const children = document.querySelectorAll('.child-checkbox') as any;
          children.forEach((child: any) => {
            child.checked = parent.checked;
          });
          parent.indeterminate = false;
        }}"
      >
        Select all
      </ha-checkbox>

      <div style="margin-left: 1.5rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <ha-checkbox
          class="child-checkbox"
          label="Option 1"
          checked
          @change="${updateParent}"
        ></ha-checkbox>
        <ha-checkbox
          class="child-checkbox"
          label="Option 2"
          @change="${updateParent}"
        ></ha-checkbox>
        <ha-checkbox
          class="child-checkbox"
          label="Option 3"
          @change="${updateParent}"
        ></ha-checkbox>
      </div>
    </div>

    <script>
      function updateParent() {
        const children = Array.from(document.querySelectorAll('.child-checkbox'));
        const parent = document.querySelector('#parent');
        const checkedCount = children.filter(child => child.checked).length;

        if (checkedCount === 0) {
          parent.checked = false;
          parent.indeterminate = false;
        } else if (checkedCount === children.length) {
          parent.checked = true;
          parent.indeterminate = false;
        } else {
          parent.checked = false;
          parent.indeterminate = true;
        }
      }
    </script>
  `,
};
