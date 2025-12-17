import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface InputArgs {
  variant: "default" | "filled" | "outlined";
  size: "sm" | "md" | "lg";
  type: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  value: string;
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  error: boolean;
  fullWidth: boolean;
  name: string;
}

const meta: Meta<InputArgs> = {
  title: "Forms/Input",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "filled", "outlined"],
      description: "Input variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Input size",
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "tel", "url", "search"],
      description: "Input type",
    },
    value: {
      control: { type: "text" },
      description: "Input value",
    },
    placeholder: {
      control: { type: "text" },
      description: "Input placeholder",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state",
    },
    readonly: {
      control: { type: "boolean" },
      description: "Readonly state",
    },
    required: {
      control: { type: "boolean" },
      description: "Required state",
    },
    error: {
      control: { type: "boolean" },
      description: "Error state",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Full width input",
    },
    name: {
      control: { type: "text" },
      description: "Input name",
    },
  },
};

export default meta;
type Story = StoryObj<InputArgs>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
    type: "text",
    value: "",
    placeholder: "Enter text...",
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    fullWidth: false,
    name: "",
  },
  render: (args) => html`
    <ha-input
      variant="${args.variant}"
      size="${args.size}"
      type="${args.type}"
      value="${args.value}"
      placeholder="${args.placeholder}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?full-width="${args.fullWidth}"
      name="${args.name}"
      @input="${(e: CustomEvent) => console.log("Input:", e.detail.value)}"
      @change="${(e: CustomEvent) => console.log("Change:", e.detail.value)}"
    >
    </ha-input>
  `,
};

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: "filled",
  },
  render: Default.render,
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: "outlined",
  },
  render: Default.render,
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
  },
  render: Default.render,
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    value: "Disabled input",
    disabled: true,
  },
  render: Default.render,
};

export const Readonly: Story = {
  args: {
    ...Default.args,
    value: "Readonly input",
    readonly: true,
  },
  render: Default.render,
};

export const Required: Story = {
  args: {
    ...Default.args,
    placeholder: "Required field",
    required: true,
  },
  render: Default.render,
};

export const Error: Story = {
  args: {
    ...Default.args,
    value: "Invalid input",
    error: true,
  },
  render: Default.render,
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
  },
  render: Default.render,
};

export const WithPrefix: Story = {
  render: () => html`
    <ha-input placeholder="Enter amount">
      <span slot="prefix">$</span>
    </ha-input>
  `,
};

export const WithSuffix: Story = {
  render: () => html`
    <ha-input placeholder="Enter weight">
      <span slot="suffix">kg</span>
    </ha-input>
  `,
};

export const WithBothPrefixAndSuffix: Story = {
  render: () => html`
    <ha-input placeholder="Enter price">
      <span slot="prefix">$</span>
      <span slot="suffix">USD</span>
    </ha-input>
  `,
};

export const Password: Story = {
  args: {
    ...Default.args,
    type: "password",
    placeholder: "Enter password",
  },
  render: Default.render,
};

export const Email: Story = {
  args: {
    ...Default.args,
    type: "email",
    placeholder: "Enter email",
  },
  render: Default.render,
};

export const Number: Story = {
  args: {
    ...Default.args,
    type: "number",
    placeholder: "Enter number",
  },
  render: Default.render,
};

export const AllVariants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
    >
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Default</label
        >
        <ha-input variant="default" placeholder="Default variant"></ha-input>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Filled</label
        >
        <ha-input variant="filled" placeholder="Filled variant"></ha-input>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Outlined</label
        >
        <ha-input variant="outlined" placeholder="Outlined variant"></ha-input>
      </div>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
    >
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Small</label
        >
        <ha-input size="sm" placeholder="Small size"></ha-input>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Medium</label
        >
        <ha-input size="md" placeholder="Medium size"></ha-input>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Large</label
        >
        <ha-input size="lg" placeholder="Large size"></ha-input>
      </div>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;"
    >
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Name *</label
        >
        <ha-input required placeholder="Enter your name" name="name"></ha-input>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Email *</label
        >
        <ha-input
          required
          type="email"
          placeholder="Enter your email"
          name="email"
        ></ha-input>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Password *</label
        >
        <ha-input
          required
          type="password"
          placeholder="Enter password"
          name="password"
        ></ha-input>
      </div>
      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Amount</label
        >
        <ha-input type="number" placeholder="0.00" name="amount">
          <span slot="prefix">$</span>
        </ha-input>
      </div>
      <div>
        <ha-button type="submit">Submit</ha-button>
      </div>
    </form>
  `,
};
