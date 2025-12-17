import type { Meta, StoryObj } from "@storybook/html";
import "@hidearea-design/core";

interface ProgressArgs {
  value: number;
  max: number;
  variant: "default" | "striped" | "animated";
  color: "primary" | "success" | "warning" | "error" | "info";
  size: "sm" | "md" | "lg";
  showLabel: boolean;
  label?: string;
}

const meta: Meta<ProgressArgs> = {
  title: "Feedback/Progress",
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value",
    },
    max: {
      control: { type: "number" },
      description: "Maximum value",
    },
    variant: {
      control: "select",
      options: ["default", "striped", "animated"],
      description: "Progress bar style",
    },
    color: {
      control: "select",
      options: ["primary", "success", "warning", "error", "info"],
      description: "Color variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the progress bar",
    },
    showLabel: {
      control: "boolean",
      description: "Show percentage label",
    },
    label: {
      control: "text",
      description: "Custom label text",
    },
  },
};

export default meta;
type Story = StoryObj<ProgressArgs>;

const createProgress = (args: ProgressArgs) => {
  const progress = document.createElement("ha-progress");
  progress.setAttribute("value", args.value.toString());
  progress.setAttribute("max", args.max.toString());
  progress.setAttribute("variant", args.variant);
  progress.setAttribute("color", args.color);
  progress.setAttribute("size", args.size);
  if (args.showLabel) {
    progress.setAttribute("show-label", "");
  }
  if (args.label) {
    const labelSpan = document.createElement("span");
    labelSpan.setAttribute("slot", "label");
    labelSpan.textContent = args.label;
    progress.appendChild(labelSpan);
  }
  return progress;
};

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    variant: "default",
    color: "primary",
    size: "md",
    showLabel: false,
  },
  render: (args) => createProgress(args),
};

export const WithLabel: Story = {
  args: {
    value: 75,
    max: 100,
    variant: "default",
    color: "primary",
    size: "md",
    showLabel: true,
    label: "Uploading file...",
  },
  render: (args) => createProgress(args),
};

export const Sizes: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "1.5rem";

    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
    sizes.forEach((size) => {
      const wrapper = document.createElement("div");
      const label = document.createElement("div");
      label.textContent = `Size: ${size}`;
      label.style.marginBottom = "0.5rem";
      label.style.fontWeight = "600";

      const progress = document.createElement("ha-progress");
      progress.setAttribute("value", "65");
      progress.setAttribute("size", size);
      progress.setAttribute("color", "primary");

      wrapper.appendChild(label);
      wrapper.appendChild(progress);
      container.appendChild(wrapper);
    });

    return container;
  },
};

export const Colors: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "1.5rem";

    const colors: Array<"primary" | "success" | "warning" | "error" | "info"> =
      ["primary", "success", "warning", "error", "info"];
    colors.forEach((color) => {
      const wrapper = document.createElement("div");
      const label = document.createElement("div");
      label.textContent = `Color: ${color}`;
      label.style.marginBottom = "0.5rem";
      label.style.fontWeight = "600";

      const progress = document.createElement("ha-progress");
      progress.setAttribute("value", "70");
      progress.setAttribute("color", color);

      wrapper.appendChild(label);
      wrapper.appendChild(progress);
      container.appendChild(wrapper);
    });

    return container;
  },
};

export const Variants: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "1.5rem";

    const variants: Array<"default" | "striped" | "animated"> = [
      "default",
      "striped",
      "animated",
    ];
    variants.forEach((variant) => {
      const wrapper = document.createElement("div");
      const label = document.createElement("div");
      label.textContent = `Variant: ${variant}`;
      label.style.marginBottom = "0.5rem";
      label.style.fontWeight = "600";

      const progress = document.createElement("ha-progress");
      progress.setAttribute("value", "75");
      progress.setAttribute("variant", variant);
      progress.setAttribute("color", "primary");

      wrapper.appendChild(label);
      wrapper.appendChild(progress);
      container.appendChild(wrapper);
    });

    return container;
  },
};

export const ProgressSteps: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "1rem";

    const steps = [
      { value: 0, label: "Not started" },
      { value: 25, label: "In progress" },
      { value: 50, label: "Half way" },
      { value: 75, label: "Almost there" },
      { value: 100, label: "Complete" },
    ];

    steps.forEach((step) => {
      const progress = document.createElement("ha-progress");
      progress.setAttribute("value", step.value.toString());
      progress.setAttribute("show-label", "");
      progress.setAttribute(
        "color",
        step.value === 100 ? "success" : "primary",
      );

      const labelSpan = document.createElement("span");
      labelSpan.setAttribute("slot", "label");
      labelSpan.textContent = step.label;
      progress.appendChild(labelSpan);

      container.appendChild(progress);
    });

    return container;
  },
};

export const FileUpload: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.padding = "1.5rem";
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "0.5rem";

    const title = document.createElement("h3");
    title.textContent = "File Upload Progress";
    title.style.margin = "0 0 1rem 0";

    const progress = document.createElement("ha-progress");
    progress.setAttribute("value", "45");
    progress.setAttribute("variant", "animated");
    progress.setAttribute("color", "info");
    progress.setAttribute("show-label", "");
    progress.setAttribute("size", "lg");

    const labelSpan = document.createElement("span");
    labelSpan.setAttribute("slot", "label");
    labelSpan.textContent = "document.pdf";
    progress.appendChild(labelSpan);

    const info = document.createElement("div");
    info.textContent = "4.5 MB / 10 MB";
    info.style.marginTop = "0.5rem";
    info.style.fontSize = "0.875rem";
    info.style.color = "#6b7280";

    container.appendChild(title);
    container.appendChild(progress);
    container.appendChild(info);

    return container;
  },
};

export const MultipleProgress: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "1.5rem";

    const tasks = [
      {
        label: "Installing dependencies",
        value: 100,
        color: "success" as const,
      },
      { label: "Building application", value: 80, color: "primary" as const },
      { label: "Running tests", value: 45, color: "warning" as const },
      { label: "Deploying to production", value: 0, color: "primary" as const },
    ];

    tasks.forEach((task) => {
      const progress = document.createElement("ha-progress");
      progress.setAttribute("value", task.value.toString());
      progress.setAttribute("color", task.color);
      progress.setAttribute("show-label", "");
      progress.setAttribute(
        "variant",
        task.value > 0 && task.value < 100 ? "animated" : "default",
      );

      const labelSpan = document.createElement("span");
      labelSpan.setAttribute("slot", "label");
      labelSpan.textContent = task.label;
      progress.appendChild(labelSpan);

      container.appendChild(progress);
    });

    return container;
  },
};

export const AnimatedDemo: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "1rem";

    const progress = document.createElement("ha-progress");
    progress.setAttribute("value", "0");
    progress.setAttribute("variant", "animated");
    progress.setAttribute("color", "primary");
    progress.setAttribute("show-label", "");

    const labelSpan = document.createElement("span");
    labelSpan.setAttribute("slot", "label");
    labelSpan.textContent = "Processing...";
    progress.appendChild(labelSpan);

    container.appendChild(progress);

    // Simulate progress
    let value = 0;
    const interval = setInterval(() => {
      value += 1;
      if (value > 100) {
        clearInterval(interval);
        labelSpan.textContent = "Complete!";
        progress.setAttribute("color", "success");
        progress.setAttribute("variant", "default");
      } else {
        progress.setAttribute("value", value.toString());
      }
    }, 50);

    return container;
  },
};
