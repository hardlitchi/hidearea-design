import type { Meta, StoryObj } from "@storybook/html";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface SpinnerArgs {
  size: "xs" | "sm" | "md" | "lg" | "xl";
  color: "primary" | "success" | "warning" | "error" | "info" | "neutral";
  variant: "circular" | "dots" | "pulse";
  speed: string;
}

const meta: Meta<SpinnerArgs> = {
  title: "Feedback/Spinner",
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the spinner",
    },
    color: {
      control: "select",
      options: ["primary", "success", "warning", "error", "info", "neutral"],
      description: "Color variant",
    },
    variant: {
      control: "select",
      options: ["circular", "dots", "pulse"],
      description: "Spinner style",
    },
    speed: {
      control: "text",
      description: 'Animation speed (e.g., "0.8s", "1s", "1.5s")',
    },
  },
};

export default meta;
type Story = StoryObj<SpinnerArgs>;

const createSpinner = (args: SpinnerArgs, id?: string) => {
  const spinner = document.createElement("ha-spinner");
  if (id) {
    spinner.id = id;
  }
  spinner.setAttribute("size", args.size);
  spinner.setAttribute("color", args.color);
  spinner.setAttribute("variant", args.variant);
  if (args.speed) {
    spinner.setAttribute("speed", args.speed);
  }
  return spinner;
};

export const Default: Story = {
  args: {
    size: "md",
    color: "primary",
    variant: "circular",
    speed: "0.8s",
  },
  render: (args) => createSpinner(args, "test-spinner"),
  play: async ({ canvasElement, step }) => {
    await step("Spinner should be present", async () => {
      const spinner = canvasElement.querySelector("#test-spinner");
      await expect(spinner).toBeTruthy();
    });

    await step("Spinner should have correct size", async () => {
      const spinner = canvasElement.querySelector("#test-spinner");
      await expect(spinner?.getAttribute("size")).toBe("md");
    });

    await step("Spinner should have correct color", async () => {
      const spinner = canvasElement.querySelector("#test-spinner");
      await expect(spinner?.getAttribute("color")).toBe("primary");
    });

    await step("Spinner should have correct variant", async () => {
      const spinner = canvasElement.querySelector("#test-spinner");
      await expect(spinner?.getAttribute("variant")).toBe("circular");
    });
  },
};

export const Sizes: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "2rem";

    const sizes: Array<"xs" | "sm" | "md" | "lg" | "xl"> = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
    ];
    sizes.forEach((size) => {
      const wrapper = document.createElement("div");
      wrapper.style.textAlign = "center";

      const spinner = document.createElement("ha-spinner");
      spinner.setAttribute("size", size);
      spinner.setAttribute("color", "primary");

      const label = document.createElement("div");
      label.textContent = size;
      label.style.marginTop = "0.5rem";
      label.style.fontSize = "0.875rem";
      label.style.color = "#6b7280";

      wrapper.appendChild(spinner);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });

    return container;
  },
};

export const Colors: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "2rem";

    const colors: Array<
      "primary" | "success" | "warning" | "error" | "info" | "neutral"
    > = ["primary", "success", "warning", "error", "info", "neutral"];
    colors.forEach((color) => {
      const wrapper = document.createElement("div");
      wrapper.style.textAlign = "center";

      const spinner = document.createElement("ha-spinner");
      spinner.setAttribute("size", "md");
      spinner.setAttribute("color", color);

      const label = document.createElement("div");
      label.textContent = color;
      label.style.marginTop = "0.5rem";
      label.style.fontSize = "0.875rem";
      label.style.color = "#6b7280";

      wrapper.appendChild(spinner);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });

    return container;
  },
};

export const Variants: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "3rem";

    const variants: Array<"circular" | "dots" | "pulse"> = [
      "circular",
      "dots",
      "pulse",
    ];
    variants.forEach((variant) => {
      const wrapper = document.createElement("div");
      wrapper.style.textAlign = "center";

      const spinner = document.createElement("ha-spinner");
      spinner.setAttribute("size", "lg");
      spinner.setAttribute("color", "primary");
      spinner.setAttribute("variant", variant);

      const label = document.createElement("div");
      label.textContent = variant;
      label.style.marginTop = "0.5rem";
      label.style.fontSize = "0.875rem";
      label.style.color = "#6b7280";

      wrapper.appendChild(spinner);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });

    return container;
  },
};

export const Speeds: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "2rem";

    const speeds = [
      { value: "0.4s", label: "Fast (0.4s)" },
      { value: "0.8s", label: "Normal (0.8s)" },
      { value: "1.5s", label: "Slow (1.5s)" },
    ];
    speeds.forEach((speed) => {
      const wrapper = document.createElement("div");
      wrapper.style.textAlign = "center";

      const spinner = document.createElement("ha-spinner");
      spinner.setAttribute("size", "lg");
      spinner.setAttribute("color", "primary");
      spinner.setAttribute("speed", speed.value);

      const label = document.createElement("div");
      label.textContent = speed.label;
      label.style.marginTop = "0.5rem";
      label.style.fontSize = "0.875rem";
      label.style.color = "#6b7280";

      wrapper.appendChild(spinner);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });

    return container;
  },
};

export const LoadingButton: Story = {
  render: () => {
    const button = document.createElement("button");
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.gap = "0.5rem";
    button.style.padding = "0.5rem 1rem";
    button.style.backgroundColor = "#3b82f6";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "0.375rem";
    button.style.fontSize = "0.875rem";
    button.style.fontWeight = "500";
    button.style.cursor = "pointer";

    const spinner = document.createElement("ha-spinner");
    spinner.setAttribute("size", "sm");
    spinner.setAttribute("color", "neutral");
    spinner.style.color = "white";

    const text = document.createElement("span");
    text.textContent = "Loading...";

    button.appendChild(spinner);
    button.appendChild(text);

    return button;
  },
};

export const CenteredSpinner: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.height = "200px";
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "0.5rem";
    container.style.backgroundColor = "#f9fafb";

    const spinner = document.createElement("ha-spinner");
    spinner.setAttribute("size", "xl");
    spinner.setAttribute("color", "primary");

    container.appendChild(spinner);

    return container;
  },
};

export const WithText: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.gap = "1rem";
    container.style.padding = "2rem";
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "0.5rem";

    const spinner = document.createElement("ha-spinner");
    spinner.setAttribute("size", "lg");
    spinner.setAttribute("color", "primary");
    spinner.setAttribute("variant", "dots");

    const text = document.createElement("div");
    text.textContent = "Loading data...";
    text.style.fontSize = "0.875rem";
    text.style.color = "#6b7280";

    container.appendChild(spinner);
    container.appendChild(text);

    return container;
  },
};

export const InlineSpinner: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "0.5rem";
    container.style.fontSize = "0.875rem";

    const spinner = document.createElement("ha-spinner");
    spinner.setAttribute("size", "xs");
    spinner.setAttribute("color", "primary");

    const text = document.createElement("span");
    text.textContent = "Processing your request...";

    container.appendChild(spinner);
    container.appendChild(text);

    return container;
  },
};

export const AllVariantsShowcase: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(3, 1fr)";
    container.style.gap = "2rem";
    container.style.padding = "2rem";

    const variants: Array<"circular" | "dots" | "pulse"> = [
      "circular",
      "dots",
      "pulse",
    ];
    const colors: Array<"primary" | "success" | "error"> = [
      "primary",
      "success",
      "error",
    ];

    variants.forEach((variant) => {
      colors.forEach((color) => {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "0.5rem";
        wrapper.style.padding = "1.5rem";
        wrapper.style.border = "1px solid #e5e7eb";
        wrapper.style.borderRadius = "0.5rem";

        const spinner = document.createElement("ha-spinner");
        spinner.setAttribute("size", "lg");
        spinner.setAttribute("color", color);
        spinner.setAttribute("variant", variant);

        const label = document.createElement("div");
        label.textContent = `${variant} - ${color}`;
        label.style.fontSize = "0.75rem";
        label.style.color = "#6b7280";
        label.style.textAlign = "center";

        wrapper.appendChild(spinner);
        wrapper.appendChild(label);
        container.appendChild(wrapper);
      });
    });

    return container;
  },
};
