import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface FormGroupArgs {
  label: string;
  helperText: string;
  errorText: string;
  required: boolean;
  error: boolean;
  disabled: boolean;
}

const meta: Meta<FormGroupArgs> = {
  title: "Forms/FormGroup",
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Label text for the form control",
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text shown below the input",
    },
    errorText: {
      control: { type: "text" },
      description: "Error text shown when error is true",
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the field is required",
    },
    error: {
      control: { type: "boolean" },
      description: "Error state",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state",
    },
  },
};

export default meta;
type Story = StoryObj<FormGroupArgs>;

export const Default: Story = {
  args: {
    label: "Email Address",
    helperText: "We will never share your email with anyone else.",
    errorText: "",
    required: false,
    error: false,
    disabled: false,
  },
  render: (args) => html`
    <ha-form-group
      label="${args.label}"
      helper-text="${args.helperText}"
      error-text="${args.errorText}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?disabled="${args.disabled}"
    >
      <ha-input
        type="email"
        placeholder="Enter your email"
        ?disabled="${args.disabled}"
        ?error="${args.error}"
      ></ha-input>
    </ha-form-group>
  `,
};

export const Required: Story = {
  args: {
    ...Default.args,
    label: "Username",
    helperText: "Choose a unique username",
    required: true,
  },
  render: Default.render,
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: "Password",
    helperText: "Must be at least 8 characters",
    errorText: "Password is too short",
    error: true,
  },
  render: (args) => html`
    <ha-form-group
      label="${args.label}"
      helper-text="${args.helperText}"
      error-text="${args.errorText}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?disabled="${args.disabled}"
    >
      <ha-input
        type="password"
        placeholder="Enter your password"
        ?disabled="${args.disabled}"
        ?error="${args.error}"
      ></ha-input>
    </ha-form-group>
  `,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: "Disabled Field",
    helperText: "This field is currently disabled",
    disabled: true,
  },
  render: Default.render,
};

export const WithCheckbox: Story = {
  args: {
    label: "Terms and Conditions",
    helperText: "You must agree to the terms to continue",
    errorText: "",
    required: true,
    error: false,
    disabled: false,
  },
  render: (args) => html`
    <ha-form-group
      label="${args.label}"
      helper-text="${args.helperText}"
      error-text="${args.errorText}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?disabled="${args.disabled}"
    >
      <ha-checkbox ?disabled="${args.disabled}">
        I agree to the terms and conditions
      </ha-checkbox>
    </ha-form-group>
  `,
};

export const WithSelect: Story = {
  args: {
    label: "Country",
    helperText: "Select your country of residence",
    errorText: "Please select a country",
    required: true,
    error: false,
    disabled: false,
  },
  render: (args) => html`
    <ha-form-group
      label="${args.label}"
      helper-text="${args.helperText}"
      error-text="${args.errorText}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?disabled="${args.disabled}"
    >
      <ha-select
        placeholder="Choose a country"
        ?disabled="${args.disabled}"
        ?error="${args.error}"
        full-width
      >
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
        <option value="jp">Japan</option>
      </ha-select>
    </ha-form-group>
  `,
};

export const MultipleFields: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;"
    >
      <ha-form-group
        label="Full Name"
        helper-text="Enter your first and last name"
        required
      >
        <ha-input type="text" placeholder="John Doe"></ha-input>
      </ha-form-group>

      <ha-form-group
        label="Email"
        helper-text="We'll send a confirmation email"
        required
      >
        <ha-input type="email" placeholder="john@example.com"></ha-input>
      </ha-form-group>

      <ha-form-group label="Phone Number" helper-text="Include country code">
        <ha-input type="tel" placeholder="+1 (555) 123-4567"></ha-input>
      </ha-form-group>

      <ha-form-group label="Country" required>
        <ha-select full-width>
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </ha-select>
      </ha-form-group>

      <ha-form-group label="Subscribe to newsletter">
        <ha-checkbox> Yes, I want to receive updates </ha-checkbox>
      </ha-form-group>
    </div>
  `,
};

export const FormValidation: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;"
    >
      <h3 style="margin: 0 0 1rem 0;">Registration Form</h3>

      <ha-form-group
        label="Username"
        helper-text="At least 3 characters"
        required
      >
        <ha-input type="text" placeholder="username"></ha-input>
      </ha-form-group>

      <ha-form-group
        label="Email"
        error-text="Please enter a valid email address"
        required
        error
      >
        <ha-input type="email" placeholder="email@example.com" error></ha-input>
      </ha-form-group>

      <ha-form-group
        label="Password"
        helper-text="Must be at least 8 characters"
        required
      >
        <ha-input type="password" placeholder="Enter password"></ha-input>
      </ha-form-group>

      <ha-form-group
        label="Confirm Password"
        error-text="Passwords do not match"
        required
        error
      >
        <ha-input
          type="password"
          placeholder="Confirm password"
          error
        ></ha-input>
      </ha-form-group>

      <ha-form-group
        label="Terms"
        error-text="You must accept the terms and conditions"
        required
        error
      >
        <ha-checkbox error> I accept the terms and conditions </ha-checkbox>
      </ha-form-group>

      <div style="margin-top: 1rem;">
        <ha-button variant="primary" full-width> Register </ha-button>
      </div>
    </div>
  `,
};

export const CustomLabelSlot: Story = {
  render: () => html`
    <ha-form-group helper-text="Use the slot for custom label content" required>
      <span slot="label">
        <strong style="color: var(--color-primary-600, #4f46e5);">
          Custom Label with Icon
        </strong>
        <span style="margin-left: 0.5rem;">📧</span>
      </span>
      <ha-input type="email" placeholder="Enter your email"></ha-input>
    </ha-form-group>
  `,
};

export const CustomHelperTextSlot: Story = {
  render: () => html`
    <ha-form-group label="Password" required>
      <div
        slot="helper-text"
        style="color: var(--color-neutral-600, #4b5563); font-size: 0.75rem;"
      >
        Password must contain:
        <ul style="margin: 0.25rem 0 0 1rem; padding: 0;">
          <li>At least 8 characters</li>
          <li>One uppercase letter</li>
          <li>One number</li>
        </ul>
      </div>
      <ha-input type="password" placeholder="Enter password"></ha-input>
    </ha-form-group>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;"
    >
      <div>
        <h4 style="margin: 0 0 1rem 0;">Normal State</h4>
        <ha-form-group
          label="Normal Field"
          helper-text="This is a normal input field"
        >
          <ha-input placeholder="Enter text"></ha-input>
        </ha-form-group>
      </div>

      <div>
        <h4 style="margin: 0 0 1rem 0;">Required State</h4>
        <ha-form-group
          label="Required Field"
          helper-text="This field is required"
          required
        >
          <ha-input placeholder="Enter text"></ha-input>
        </ha-form-group>
      </div>

      <div>
        <h4 style="margin: 0 0 1rem 0;">Error State</h4>
        <ha-form-group
          label="Field with Error"
          error-text="This field has an error"
          error
        >
          <ha-input placeholder="Enter text" error></ha-input>
        </ha-form-group>
      </div>

      <div>
        <h4 style="margin: 0 0 1rem 0;">Disabled State</h4>
        <ha-form-group
          label="Disabled Field"
          helper-text="This field is disabled"
          disabled
        >
          <ha-input placeholder="Enter text" disabled></ha-input>
        </ha-form-group>
      </div>
    </div>
  `,
};
