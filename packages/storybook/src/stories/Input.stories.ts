import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

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
  onInput?: (e: CustomEvent) => void;
  onChange?: (e: CustomEvent) => void;
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
    onInput: fn(),
    onChange: fn(),
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
      @input="${args.onInput}"
      @change="${args.onChange}"
    >
    </ha-input>
  `,
  play: async ({ canvasElement, args, step }) => {
    await step("Input should be present in the document", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have correct variant", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.getAttribute("variant")).toBe("default");
    });

    await step("Input should accept text input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "Test input");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: "filled",
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Input should be present in the document", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have filled variant", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.getAttribute("variant")).toBe("filled");
    });

    await step("Input should accept text input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "Test");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: "outlined",
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Input should be present in the document", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have outlined variant", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.getAttribute("variant")).toBe("outlined");
    });

    await step("Input should accept text input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "Test");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Input should be present in the document", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have small size", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.getAttribute("size")).toBe("sm");
    });

    await step("Input should accept text input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "Test");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Input should be present in the document", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have large size", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.getAttribute("size")).toBe("lg");
    });

    await step("Input should accept text input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "Test");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    value: "Disabled input",
    disabled: true,
  },
  render: Default.render,
  play: async ({ canvasElement, step }) => {
    await step("Disabled input should be present", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have disabled attribute", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.hasAttribute("disabled")).toBe(true);
    });

    await step("Input element should be disabled", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement?.disabled).toBe(true);
    });
  },
};

export const Readonly: Story = {
  args: {
    ...Default.args,
    value: "Readonly input",
    readonly: true,
  },
  render: Default.render,
  play: async ({ canvasElement, step }) => {
    await step("Readonly input should be present", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have readonly attribute", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.hasAttribute("readonly")).toBe(true);
    });

    await step("Input element should be readonly", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement?.readOnly).toBe(true);
    });
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    placeholder: "Required field",
    required: true,
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Required input should be present", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have required attribute", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.hasAttribute("required")).toBe(true);
    });

    await step("Input should accept text input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "Required value");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    value: "Invalid input",
    error: true,
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Error input should be present", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have error attribute", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.hasAttribute("error")).toBe(true);
    });

    await step("Input should still accept text input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.clear(inputElement!);
      await userEvent.type(inputElement!, "Corrected");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("FullWidth input should be present", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have full-width attribute", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input?.hasAttribute("full-width")).toBe(true);
    });

    await step("Input should accept text input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "Full width test");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
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
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Password input should be present", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have password type", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement?.type).toBe("password");
    });

    await step("Input should accept password input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "SecretPassword123");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
};

export const Email: Story = {
  args: {
    ...Default.args,
    type: "email",
    placeholder: "Enter email",
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Email input should be present", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have email type", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement?.type).toBe("email");
    });

    await step("Input should accept email input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "user@example.com");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
};

export const Number: Story = {
  args: {
    ...Default.args,
    type: "number",
    placeholder: "Enter number",
    onInput: fn(),
    onChange: fn(),
  },
  render: Default.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Number input should be present", async () => {
      const input = canvasElement.querySelector("ha-input");
      await expect(input).toBeTruthy();
    });

    await step("Input should have number type", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement?.type).toBe("number");
    });

    await step("Input should accept number input", async () => {
      const input = canvasElement.querySelector("ha-input");
      const inputElement = input?.shadowRoot?.querySelector("input");
      await expect(inputElement).toBeTruthy();

      await userEvent.type(inputElement!, "12345");
      await expect(args.onInput).toHaveBeenCalled();
    });
  },
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
