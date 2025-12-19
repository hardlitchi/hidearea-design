import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { expect, fn, userEvent, within } from "@storybook/test";
import "@hidearea-design/core";

interface ButtonArgs {
  variant: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size: "sm" | "md" | "lg";
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  type: "button" | "submit" | "reset";
  label: string;
  onClick?: () => void;
}

const meta: Meta<ButtonArgs> = {
  title: "Forms/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "danger"],
      description: "Button variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state",
    },
    loading: {
      control: { type: "boolean" },
      description: "Loading state",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Full width button",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "Button type",
    },
    label: {
      control: { type: "text" },
      description: "Button label",
    },
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    fullWidth: false,
    type: "button",
    label: "Button",
    onClick: fn(),
  },
  render: (args) => html`
    <ha-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?full-width="${args.fullWidth}"
      type="${args.type}"
      @click="${args.onClick}"
    >
      ${args.label}
    </ha-button>
  `,
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);

    await step("Button should be present in the document", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have correct variant", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.getAttribute("variant")).toBe(args.variant);
    });

    await step("Button should be clickable", async () => {
      const button = canvasElement.querySelector("ha-button");
      await userEvent.click(button!);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: "secondary",
    onClick: fn(),
  },
  render: Primary.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Button should be present in the document", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have secondary variant", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.getAttribute("variant")).toBe("secondary");
    });

    await step("Button should be clickable", async () => {
      const button = canvasElement.querySelector("ha-button");
      await userEvent.click(button!);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const Outline: Story = {
  args: {
    ...Primary.args,
    variant: "outline",
    onClick: fn(),
  },
  render: Primary.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Button should be present in the document", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have outline variant", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.getAttribute("variant")).toBe("outline");
    });

    await step("Button should be clickable", async () => {
      const button = canvasElement.querySelector("ha-button");
      await userEvent.click(button!);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const Ghost: Story = {
  args: {
    ...Primary.args,
    variant: "ghost",
    onClick: fn(),
  },
  render: Primary.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Button should be present in the document", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have ghost variant", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.getAttribute("variant")).toBe("ghost");
    });

    await step("Button should be clickable", async () => {
      const button = canvasElement.querySelector("ha-button");
      await userEvent.click(button!);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const Danger: Story = {
  args: {
    ...Primary.args,
    variant: "danger",
    onClick: fn(),
  },
  render: Primary.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Button should be present in the document", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have danger variant", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.getAttribute("variant")).toBe("danger");
    });

    await step("Button should be clickable", async () => {
      const button = canvasElement.querySelector("ha-button");
      await userEvent.click(button!);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: "sm",
    onClick: fn(),
  },
  render: Primary.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Button should be present in the document", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have small size", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.getAttribute("size")).toBe("sm");
    });

    await step("Button should be clickable", async () => {
      const button = canvasElement.querySelector("ha-button");
      await userEvent.click(button!);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    size: "lg",
    onClick: fn(),
  },
  render: Primary.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Button should be present in the document", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have large size", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.getAttribute("size")).toBe("lg");
    });

    await step("Button should be clickable", async () => {
      const button = canvasElement.querySelector("ha-button");
      await userEvent.click(button!);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
  render: Primary.render,
  play: async ({ canvasElement, step }) => {
    await step("Disabled button should be present", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have disabled attribute", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.hasAttribute("disabled")).toBe(true);
    });

    await step("Button should have correct variant", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.getAttribute("variant")).toBe("primary");
    });
  },
};

export const Loading: Story = {
  args: {
    ...Primary.args,
    loading: true,
  },
  render: Primary.render,
  play: async ({ canvasElement, step }) => {
    await step("Loading button should be present", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have loading attribute", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.hasAttribute("loading")).toBe(true);
    });

    await step("Button should have correct variant", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.getAttribute("variant")).toBe("primary");
    });
  },
};

export const FullWidth: Story = {
  args: {
    ...Primary.args,
    fullWidth: true,
    onClick: fn(),
  },
  render: Primary.render,
  play: async ({ canvasElement, args, step }) => {
    await step("Button should be present in the document", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button).toBeTruthy();
    });

    await step("Button should have full-width attribute", async () => {
      const button = canvasElement.querySelector("ha-button");
      await expect(button?.hasAttribute("full-width")).toBe(true);
    });

    await step("Button should be clickable", async () => {
      const button = canvasElement.querySelector("ha-button");
      await userEvent.click(button!);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
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
    <div
      style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;"
    >
      <ha-button size="sm">Small</ha-button>
      <ha-button size="md">Medium</ha-button>
      <ha-button size="lg">Large</ha-button>
    </div>
  `,
};
