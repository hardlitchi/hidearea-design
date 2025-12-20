import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface CheckboxArgs {
  size: "sm" | "md" | "lg";
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  required: boolean;
  error: boolean;
  label: string;
  description: string;
}

const meta: Meta<CheckboxArgs> = {
  title: "Forms/Checkbox",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Checkbox size",
    },
    checked: {
      control: { type: "boolean" },
      description: "Checked state",
    },
    indeterminate: {
      control: { type: "boolean" },
      description: "Indeterminate state",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state",
    },
    required: {
      control: { type: "boolean" },
      description: "Required state",
    },
    error: {
      control: { type: "boolean" },
      description: "Error state",
    },
    label: {
      control: { type: "text" },
      description: "Checkbox label",
    },
    description: {
      control: { type: "text" },
      description: "Checkbox description",
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {
  args: {
    size: "md",
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    error: false,
    label: "Accept terms and conditions",
    description: "",
  },
  render: (args, { updateArgs }) => {
    const checkboxRef: Ref<any> = createRef();

    // Update properties when args change
    setTimeout(() => {
      if (checkboxRef.value) {
        checkboxRef.value.checked = args.checked;
        checkboxRef.value.indeterminate = args.indeterminate;
      }
    }, 0);

    return html`
      <ha-checkbox
        id="test-checkbox"
        ${ref(checkboxRef)}
        size="${args.size}"
        ?disabled="${args.disabled}"
        ?required="${args.required}"
        ?error="${args.error}"
        label="${args.label}"
        description="${args.description}"
        @change="${fn()}"
      >
      </ha-checkbox>
    `;
  },
  play: async ({ canvasElement, step }) => {
    await step("Checkbox should be present", async () => {
      const checkbox = canvasElement.querySelector("#test-checkbox");
      await expect(checkbox).toBeTruthy();
    });

    await step("Checkbox should have correct size", async () => {
      const checkbox = canvasElement.querySelector("#test-checkbox");
      await expect(checkbox?.getAttribute("size")).toBe("md");
    });

    await step("Checkbox should have correct label", async () => {
      const checkbox = canvasElement.querySelector("#test-checkbox");
      await expect(checkbox?.getAttribute("label")).toBe("Accept terms and conditions");
    });

    await step("Checkbox should not be disabled", async () => {
      const checkbox = canvasElement.querySelector("#test-checkbox");
      await expect(checkbox?.hasAttribute("disabled")).toBe(false);
    });
  },
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
    description: "You must accept the terms and conditions",
  },
  render: Default.render,
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    description:
      "By checking this box, you agree to our terms of service and privacy policy.",
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
      <ha-checkbox id="unchecked-cb" label="Unchecked"></ha-checkbox>
      <ha-checkbox id="checked-cb" checked label="Checked"></ha-checkbox>
      <ha-checkbox id="indeterminate-cb" indeterminate label="Indeterminate"></ha-checkbox>
      <ha-checkbox id="disabled-cb" disabled label="Disabled"></ha-checkbox>
      <ha-checkbox id="checked-disabled-cb" checked disabled label="Checked & Disabled"></ha-checkbox>
      <ha-checkbox id="error-cb" error label="Error state"></ha-checkbox>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    await step("Unchecked checkbox should not be checked", async () => {
      const checkbox = canvasElement.querySelector("#unchecked-cb") as any;
      await expect(checkbox?.checked).toBe(false);
      await expect(checkbox?.hasAttribute("disabled")).toBe(false);
    });

    await step("Checked checkbox should be checked", async () => {
      const checkbox = canvasElement.querySelector("#checked-cb") as any;
      await expect(checkbox?.checked).toBe(true);
    });

    await step("Indeterminate checkbox should have indeterminate state", async () => {
      const checkbox = canvasElement.querySelector("#indeterminate-cb") as any;
      await expect(checkbox?.indeterminate).toBe(true);
    });

    await step("Disabled checkbox should be disabled", async () => {
      const checkbox = canvasElement.querySelector("#disabled-cb");
      await expect(checkbox?.hasAttribute("disabled")).toBe(true);
    });

    await step("Checked disabled checkbox should be both checked and disabled", async () => {
      const checkbox = canvasElement.querySelector("#checked-disabled-cb") as any;
      await expect(checkbox?.checked).toBe(true);
      await expect(checkbox?.hasAttribute("disabled")).toBe(true);
    });

    await step("Error checkbox should have error attribute", async () => {
      const checkbox = canvasElement.querySelector("#error-cb");
      await expect(checkbox?.hasAttribute("error")).toBe(true);
    });

    await step("Error checkbox should still be functional", async () => {
      const checkbox = canvasElement.querySelector("#error-cb") as HTMLElement;
      const nativeInput = checkbox.querySelector("input[type='checkbox']") as HTMLInputElement;

      await userEvent.click(checkbox);
      await new Promise(resolve => setTimeout(resolve, 100));

      await expect(nativeInput?.checked).toBe(true);
    });
  },
};

export const WithSlots: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <ha-checkbox>
        I agree to the
        <a href="#" style="color: #3b82f6;">terms and conditions</a>
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
    <form id="checkbox-group-form" style="max-width: 400px;">
      <fieldset
        style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem;"
      >
        <legend style="font-weight: 600; padding: 0 0.5rem;">
          Select your interests
        </legend>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <ha-checkbox
            id="design-cb"
            name="interests"
            value="design"
            label="Design"
          ></ha-checkbox>
          <ha-checkbox
            id="development-cb"
            name="interests"
            value="development"
            label="Development"
          ></ha-checkbox>
          <ha-checkbox
            id="marketing-cb"
            name="interests"
            value="marketing"
            label="Marketing"
          ></ha-checkbox>
          <ha-checkbox
            id="sales-cb"
            name="interests"
            value="sales"
            label="Sales"
          ></ha-checkbox>
        </div>
      </fieldset>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    await step("All checkboxes should be present", async () => {
      const checkboxes = canvasElement.querySelectorAll("ha-checkbox");
      await expect(checkboxes.length).toBe(4);
    });

    await step("All checkboxes should have same name attribute", async () => {
      const design = canvasElement.querySelector("#design-cb");
      const development = canvasElement.querySelector("#development-cb");

      await expect(design?.getAttribute("name")).toBe("interests");
      await expect(development?.getAttribute("name")).toBe("interests");
    });

    await step("Checking multiple checkboxes should work", async () => {
      const designCb = canvasElement.querySelector("#design-cb") as HTMLElement;
      const devCb = canvasElement.querySelector("#development-cb") as HTMLElement;

      await userEvent.click(designCb);
      await userEvent.click(devCb);
      await new Promise(resolve => setTimeout(resolve, 100));

      const designInput = designCb.querySelector("input[type='checkbox']") as HTMLInputElement;
      const devInput = devCb.querySelector("input[type='checkbox']") as HTMLInputElement;

      await expect(designInput?.checked).toBe(true);
      await expect(devInput?.checked).toBe(true);
    });

    await step("Unchecking a checkbox should work", async () => {
      const designCb = canvasElement.querySelector("#design-cb") as HTMLElement;

      await userEvent.click(designCb);
      await new Promise(resolve => setTimeout(resolve, 100));

      const designInput = designCb.querySelector("input[type='checkbox']") as HTMLInputElement;
      await expect(designInput?.checked).toBe(false);
    });
  },
};

export const FormExample: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;"
    >
      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">
          Sign Up
        </h3>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Email</label
        >
        <ha-input
          type="email"
          placeholder="Enter your email"
          required
          full-width
        ></ha-input>
      </div>

      <div>
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
          >Password</label
        >
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
          <span slot="description"> Receive updates and special offers </span>
        </ha-checkbox>
      </div>

      <div>
        <ha-button type="submit" full-width>Create Account</ha-button>
      </div>
    </form>
  `,
};

export const IndeterminateExample: Story = {
  render: () => {
    // Use a single container to scope queries
    const containerId = "indeterminate-container-" + Math.random().toString(36).substr(2, 9);

    const handleParentChange = (e: Event) => {
      const parent = e.target as any;
      const container = document.getElementById(containerId);
      if (!container) return;

      const children = container.querySelectorAll(".child-checkbox");
      children.forEach((child: any) => {
        child.checked = parent.checked;
      });
      parent.indeterminate = false;
    };

    const handleChildChange = () => {
      const container = document.getElementById(containerId);
      if (!container) return;

      const parent = container.querySelector("#parent-checkbox") as any;
      const children = Array.from(
        container.querySelectorAll(".child-checkbox"),
      ) as any[];

      if (!parent) return;

      const checkedCount = children.filter((child) => child.checked).length;

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
    };

    return html`
      <div id="${containerId}" style="max-width: 400px;">
        <ha-checkbox
          id="parent-checkbox"
          indeterminate
          @change="${handleParentChange}"
        >
          Select all
        </ha-checkbox>

        <div
          style="margin-left: 1.5rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;"
        >
          <ha-checkbox
            class="child-checkbox"
            label="Option 1"
            checked
            @change="${handleChildChange}"
          ></ha-checkbox>
          <ha-checkbox
            class="child-checkbox"
            label="Option 2"
            @change="${handleChildChange}"
          ></ha-checkbox>
          <ha-checkbox
            class="child-checkbox"
            label="Option 3"
            @change="${handleChildChange}"
          ></ha-checkbox>
        </div>
      </div>
    `;
  },
};
