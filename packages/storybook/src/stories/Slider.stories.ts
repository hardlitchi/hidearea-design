import type { Meta, StoryObj } from "@storybook/html";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface SliderArgs {
  min: number;
  max: number;
  step: number;
  value: number;
  range: boolean;
  rangeStart: number;
  rangeEnd: number;
  orientation: "horizontal" | "vertical";
  disabled: boolean;
  readonly: boolean;
  showMarks: boolean;
  showTooltip: boolean;
  marks: string;
}

const meta: Meta<SliderArgs> = {
  title: "Forms/Slider",
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Minimum value",
    },
    max: {
      control: { type: "number" },
      description: "Maximum value",
    },
    step: {
      control: { type: "number" },
      description: "Step increment",
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current value (single mode)",
    },
    range: {
      control: "boolean",
      description: "Enable range mode",
    },
    rangeStart: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Range start value",
    },
    rangeEnd: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Range end value",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Slider orientation",
    },
    disabled: {
      control: "boolean",
      description: "Disable the slider",
    },
    readonly: {
      control: "boolean",
      description: "Make the slider readonly",
    },
    showMarks: {
      control: "boolean",
      description: "Show marks on the slider",
    },
    showTooltip: {
      control: "boolean",
      description: "Show tooltip with value",
    },
    marks: {
      control: "text",
      description: "Comma-separated mark values",
    },
  },
};

export default meta;
type Story = StoryObj<SliderArgs>;

const createSlider = (args: SliderArgs, id?: string) => {
  const slider = document.createElement("ha-slider");
  if (id) {
    slider.id = id;
  }
  slider.setAttribute("min", args.min.toString());
  slider.setAttribute("max", args.max.toString());
  slider.setAttribute("step", args.step.toString());

  if (args.range) {
    slider.setAttribute("range", "");
    slider.setAttribute("range-start", args.rangeStart.toString());
    slider.setAttribute("range-end", args.rangeEnd.toString());
  } else {
    slider.setAttribute("value", args.value.toString());
  }

  slider.setAttribute("orientation", args.orientation);

  if (args.disabled) {
    slider.setAttribute("disabled", "");
  }
  if (args.readonly) {
    slider.setAttribute("readonly", "");
  }
  if (args.showMarks) {
    slider.setAttribute("show-marks", "");
  }
  if (args.showTooltip) {
    slider.setAttribute("show-tooltip", "");
  }
  if (args.marks) {
    slider.setAttribute("marks", args.marks);
  }

  slider.addEventListener("ha-slider-change", fn());

  return slider;
};

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    range: false,
    rangeStart: 25,
    rangeEnd: 75,
    orientation: "horizontal",
    disabled: false,
    readonly: false,
    showMarks: false,
    showTooltip: false,
    marks: "",
  },
  render: (args) => createSlider(args, "test-slider"),
  play: async ({ canvasElement, step }) => {
    await step("Slider should be present", async () => {
      const slider = canvasElement.querySelector("#test-slider");
      await expect(slider).toBeTruthy();
    });

    await step("Slider should have correct attributes", async () => {
      const slider = canvasElement.querySelector("#test-slider");
      await expect(slider?.getAttribute("min")).toBe("0");
      await expect(slider?.getAttribute("max")).toBe("100");
      await expect(slider?.getAttribute("value")).toBe("50");
      await expect(slider?.getAttribute("orientation")).toBe("horizontal");
    });

    await step("Slider should not be disabled", async () => {
      const slider = canvasElement.querySelector("#test-slider");
      await expect(slider?.hasAttribute("disabled")).toBe(false);
    });

    await step("Slider should have correct initial value", async () => {
      const slider = canvasElement.querySelector("#test-slider") as any;
      await expect(slider?.value).toBe(50);
    });
  },
};

export const Range: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    range: true,
    rangeStart: 25,
    rangeEnd: 75,
    orientation: "horizontal",
    disabled: false,
    readonly: false,
    showMarks: false,
    showTooltip: false,
    marks: "",
  },
  render: (args) => createSlider(args, "range-slider"),
  play: async ({ canvasElement, step }) => {
    await step("Range slider should be present", async () => {
      const slider = canvasElement.querySelector("#range-slider");
      await expect(slider).toBeTruthy();
    });

    await step("Range slider should have range attribute", async () => {
      const slider = canvasElement.querySelector("#range-slider");
      await expect(slider?.hasAttribute("range")).toBe(true);
    });

    await step("Range slider should have correct range values", async () => {
      const slider = canvasElement.querySelector("#range-slider");
      await expect(slider?.getAttribute("range-start")).toBe("25");
      await expect(slider?.getAttribute("range-end")).toBe("75");
    });

    await step("Range slider should have correct initial range", async () => {
      const slider = canvasElement.querySelector("#range-slider") as any;
      await expect(slider?.rangeStart).toBe(25);
      await expect(slider?.rangeEnd).toBe(75);
    });
  },
};

export const WithMarks: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    range: false,
    rangeStart: 25,
    rangeEnd: 75,
    orientation: "horizontal",
    disabled: false,
    readonly: false,
    showMarks: true,
    showTooltip: false,
    marks: "0,25,50,75,100",
  },
  render: (args) => createSlider(args, "marks-slider"),
  play: async ({ canvasElement, step }) => {
    await step("Slider with marks should be present", async () => {
      const slider = canvasElement.querySelector("#marks-slider");
      await expect(slider).toBeTruthy();
    });

    await step("Slider should have show-marks attribute", async () => {
      const slider = canvasElement.querySelector("#marks-slider");
      await expect(slider?.hasAttribute("show-marks")).toBe(true);
    });

    await step("Slider should have marks attribute with correct values", async () => {
      const slider = canvasElement.querySelector("#marks-slider");
      await expect(slider?.getAttribute("marks")).toBe("0,25,50,75,100");
    });
  },
};

export const WithTooltip: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    range: false,
    rangeStart: 25,
    rangeEnd: 75,
    orientation: "horizontal",
    disabled: false,
    readonly: false,
    showMarks: false,
    showTooltip: true,
    marks: "",
  },
  render: (args) => createSlider(args),
};

export const Vertical: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "3rem";
    container.style.height = "300px";
    container.style.alignItems = "center";

    const slider1 = document.createElement("ha-slider");
    slider1.setAttribute("orientation", "vertical");
    slider1.setAttribute("value", "30");

    const slider2 = document.createElement("ha-slider");
    slider2.setAttribute("orientation", "vertical");
    slider2.setAttribute("value", "60");
    slider2.setAttribute("show-tooltip", "");

    const slider3 = document.createElement("ha-slider");
    slider3.setAttribute("orientation", "vertical");
    slider3.setAttribute("range", "");
    slider3.setAttribute("range-start", "20");
    slider3.setAttribute("range-end", "80");

    container.appendChild(slider1);
    container.appendChild(slider2);
    container.appendChild(slider3);

    return container;
  },
};

export const Steps: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "2rem";

    const steps = [
      { step: 1, value: 50, label: "Step: 1 (default)" },
      { step: 5, value: 50, label: "Step: 5" },
      { step: 10, value: 50, label: "Step: 10" },
      { step: 25, value: 50, label: "Step: 25" },
    ];

    steps.forEach(({ step, value, label }) => {
      const wrapper = document.createElement("div");

      const labelDiv = document.createElement("div");
      labelDiv.textContent = label;
      labelDiv.style.marginBottom = "0.5rem";
      labelDiv.style.fontWeight = "600";

      const slider = document.createElement("ha-slider");
      slider.setAttribute("step", step.toString());
      slider.setAttribute("value", value.toString());
      slider.setAttribute("show-tooltip", "");

      wrapper.appendChild(labelDiv);
      wrapper.appendChild(slider);
      container.appendChild(wrapper);
    });

    return container;
  },
};

export const Disabled: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "2rem";

    const slider1 = document.createElement("ha-slider");
    slider1.setAttribute("value", "40");
    slider1.setAttribute("disabled", "");

    const slider2 = document.createElement("ha-slider");
    slider2.setAttribute("range", "");
    slider2.setAttribute("range-start", "30");
    slider2.setAttribute("range-end", "70");
    slider2.setAttribute("disabled", "");

    container.appendChild(slider1);
    container.appendChild(slider2);

    return container;
  },
};

export const Readonly: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "2rem";

    const slider1 = document.createElement("ha-slider");
    slider1.setAttribute("value", "60");
    slider1.setAttribute("readonly", "");

    const slider2 = document.createElement("ha-slider");
    slider2.setAttribute("range", "");
    slider2.setAttribute("range-start", "20");
    slider2.setAttribute("range-end", "80");
    slider2.setAttribute("readonly", "");

    container.appendChild(slider1);
    container.appendChild(slider2);

    return container;
  },
};

export const CustomRange: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "2rem";

    const examples = [
      { min: 0, max: 10, value: 5, label: "Range: 0-10" },
      { min: -50, max: 50, value: 0, label: "Range: -50 to 50" },
      { min: 100, max: 1000, value: 500, label: "Range: 100-1000" },
    ];

    examples.forEach(({ min, max, value, label }) => {
      const wrapper = document.createElement("div");

      const labelDiv = document.createElement("div");
      labelDiv.textContent = label;
      labelDiv.style.marginBottom = "0.5rem";
      labelDiv.style.fontWeight = "600";

      const slider = document.createElement("ha-slider");
      slider.setAttribute("min", min.toString());
      slider.setAttribute("max", max.toString());
      slider.setAttribute("value", value.toString());
      slider.setAttribute("show-tooltip", "");

      wrapper.appendChild(labelDiv);
      wrapper.appendChild(slider);
      container.appendChild(wrapper);
    });

    return container;
  },
};

export const VolumeControl: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.padding = "1.5rem";
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "0.5rem";
    container.style.maxWidth = "300px";

    const title = document.createElement("h3");
    title.textContent = "Volume";
    title.style.margin = "0 0 1rem 0";

    const slider = document.createElement("ha-slider");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "100");
    slider.setAttribute("value", "70");
    slider.setAttribute("show-tooltip", "");
    slider.setAttribute("marks", "0,25,50,75,100");
    slider.setAttribute("show-marks", "");

    const valueDisplay = document.createElement("div");
    valueDisplay.textContent = "70%";
    valueDisplay.style.marginTop = "0.5rem";
    valueDisplay.style.textAlign = "center";
    valueDisplay.style.fontWeight = "600";

    slider.addEventListener("slider-change", (e: Event) => {
      const detail = (e as CustomEvent).detail;
      valueDisplay.textContent = `${detail.value}%`;
    });

    container.appendChild(title);
    container.appendChild(slider);
    container.appendChild(valueDisplay);

    return container;
  },
};

export const PriceRange: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.padding = "1.5rem";
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "0.5rem";
    container.style.maxWidth = "400px";

    const title = document.createElement("h3");
    title.textContent = "Price Range";
    title.style.margin = "0 0 1rem 0";

    const slider = document.createElement("ha-slider");
    slider.setAttribute("range", "");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "1000");
    slider.setAttribute("step", "10");
    slider.setAttribute("range-start", "200");
    slider.setAttribute("range-end", "800");
    slider.setAttribute("show-marks", "");
    slider.setAttribute("marks", "0,250,500,750,1000");

    const valueDisplay = document.createElement("div");
    valueDisplay.textContent = "$200 - $800";
    valueDisplay.style.marginTop = "1rem";
    valueDisplay.style.textAlign = "center";
    valueDisplay.style.fontWeight = "600";
    valueDisplay.style.fontSize = "1.125rem";

    slider.addEventListener("slider-change", (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.value && typeof detail.value === "object") {
        valueDisplay.textContent = `$${detail.value.start} - $${detail.value.end}`;
      }
    });

    container.appendChild(title);
    container.appendChild(slider);
    container.appendChild(valueDisplay);

    return container;
  },
};

export const Interactive: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "2rem";

    const slider1Container = document.createElement("div");
    const label1 = document.createElement("div");
    label1.textContent = "Single Value Slider";
    label1.style.marginBottom = "0.5rem";
    label1.style.fontWeight = "600";

    const slider1 = document.createElement("ha-slider");
    slider1.setAttribute("value", "50");
    slider1.setAttribute("show-tooltip", "");

    const output1 = document.createElement("div");
    output1.textContent = "Value: 50";
    output1.style.marginTop = "0.5rem";
    output1.style.color = "#6b7280";

    slider1.addEventListener("slider-change", (e: Event) => {
      const detail = (e as CustomEvent).detail;
      output1.textContent = `Value: ${detail.value}`;
    });

    slider1Container.appendChild(label1);
    slider1Container.appendChild(slider1);
    slider1Container.appendChild(output1);

    const slider2Container = document.createElement("div");
    const label2 = document.createElement("div");
    label2.textContent = "Range Slider";
    label2.style.marginBottom = "0.5rem";
    label2.style.fontWeight = "600";

    const slider2 = document.createElement("ha-slider");
    slider2.setAttribute("range", "");
    slider2.setAttribute("range-start", "25");
    slider2.setAttribute("range-end", "75");
    slider2.setAttribute("show-tooltip", "");

    const output2 = document.createElement("div");
    output2.textContent = "Range: 25 - 75";
    output2.style.marginTop = "0.5rem";
    output2.style.color = "#6b7280";

    slider2.addEventListener("slider-change", (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.value && typeof detail.value === "object") {
        output2.textContent = `Range: ${detail.value.start} - ${detail.value.end}`;
      }
    });

    slider2Container.appendChild(label2);
    slider2Container.appendChild(slider2);
    slider2Container.appendChild(output2);

    container.appendChild(slider1Container);
    container.appendChild(slider2Container);

    return container;
  },
};
