import type { Meta, StoryObj } from "@storybook/html";
import "@hidearea-design/core";

interface ColorPickerArgs {
  value: string;
  format: "hex" | "rgb" | "hsl";
  showAlpha: boolean;
  showInput: boolean;
  showSwatches: boolean;
  swatches: string;
  disabled: boolean;
  readonly: boolean;
}

const meta: Meta<ColorPickerArgs> = {
  title: "Other/ColorPicker",
  argTypes: {
    value: {
      control: "color",
      description: "Current color value",
    },
    format: {
      control: "select",
      options: ["hex", "rgb", "hsl"],
      description: "Color output format",
    },
    showAlpha: {
      control: "boolean",
      description: "Show alpha/transparency slider",
    },
    showInput: {
      control: "boolean",
      description: "Show color input field",
    },
    showSwatches: {
      control: "boolean",
      description: "Show color swatches",
    },
    swatches: {
      control: "text",
      description: "Comma-separated list of swatch colors",
    },
    disabled: {
      control: "boolean",
      description: "Disable the color picker",
    },
    readonly: {
      control: "boolean",
      description: "Make the color picker readonly",
    },
  },
};

export default meta;
type Story = StoryObj<ColorPickerArgs>;

const createColorPicker = (args: ColorPickerArgs) => {
  const picker = document.createElement("ha-color-picker");
  picker.setAttribute("value", args.value);
  picker.setAttribute("format", args.format);

  if (args.showAlpha) {
    picker.setAttribute("show-alpha", "");
  }
  if (args.showInput) {
    picker.setAttribute("show-input", "");
  }
  if (args.showSwatches) {
    picker.setAttribute("show-swatches", "");
  }
  if (args.swatches) {
    picker.setAttribute("swatches", args.swatches);
  }
  if (args.disabled) {
    picker.setAttribute("disabled", "");
  }
  if (args.readonly) {
    picker.setAttribute("readonly", "");
  }

  return picker;
};

export const Default: Story = {
  args: {
    value: "#3b82f6",
    format: "hex",
    showAlpha: false,
    showInput: false,
    showSwatches: false,
    swatches: "",
    disabled: false,
    readonly: false,
  },
  render: (args) => createColorPicker(args),
};

export const WithInput: Story = {
  args: {
    value: "#10b981",
    format: "hex",
    showAlpha: false,
    showInput: true,
    showSwatches: false,
    swatches: "",
    disabled: false,
    readonly: false,
  },
  render: (args) => createColorPicker(args),
};

export const WithAlpha: Story = {
  args: {
    value: "#f59e0b",
    format: "hex",
    showAlpha: true,
    showInput: true,
    showSwatches: false,
    swatches: "",
    disabled: false,
    readonly: false,
  },
  render: (args) => createColorPicker(args),
};

export const WithSwatches: Story = {
  args: {
    value: "#ef4444",
    format: "hex",
    showAlpha: false,
    showInput: true,
    showSwatches: true,
    swatches:
      "#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6,#ec4899,#f43f5e,#14b8a6,#06b6d4,#6366f1",
    disabled: false,
    readonly: false,
  },
  render: (args) => createColorPicker(args),
};

export const RGBFormat: Story = {
  args: {
    value: "rgb(59, 130, 246)",
    format: "rgb",
    showAlpha: false,
    showInput: true,
    showSwatches: false,
    swatches: "",
    disabled: false,
    readonly: false,
  },
  render: (args) => createColorPicker(args),
};

export const HSLFormat: Story = {
  args: {
    value: "hsl(217, 91%, 60%)",
    format: "hsl",
    showAlpha: false,
    showInput: true,
    showSwatches: false,
    swatches: "",
    disabled: false,
    readonly: false,
  },
  render: (args) => createColorPicker(args),
};

export const Disabled: Story = {
  args: {
    value: "#3b82f6",
    format: "hex",
    showAlpha: true,
    showInput: true,
    showSwatches: true,
    swatches: "#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6",
    disabled: true,
    readonly: false,
  },
  render: (args) => createColorPicker(args),
};

export const Readonly: Story = {
  args: {
    value: "#3b82f6",
    format: "hex",
    showAlpha: true,
    showInput: true,
    showSwatches: true,
    swatches: "#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6",
    disabled: false,
    readonly: true,
  },
  render: (args) => createColorPicker(args),
};

export const MaterialDesignColors: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.padding = "1rem";

    const title = document.createElement("h3");
    title.textContent = "Material Design Color Palette";
    title.style.marginBottom = "1rem";

    const picker = document.createElement("ha-color-picker");
    picker.setAttribute("value", "#2196f3");
    picker.setAttribute("show-input", "");
    picker.setAttribute("show-swatches", "");
    picker.setAttribute(
      "swatches",
      "#f44336,#e91e63,#9c27b0,#673ab7,#3f51b5,#2196f3,#03a9f4,#00bcd4,#009688,#4caf50,#8bc34a,#cddc39,#ffeb3b,#ffc107,#ff9800,#ff5722,#795548,#9e9e9e,#607d8b",
    );

    container.appendChild(title);
    container.appendChild(picker);

    return container;
  },
};

export const TailwindColors: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.padding = "1rem";

    const title = document.createElement("h3");
    title.textContent = "Tailwind CSS Colors";
    title.style.marginBottom = "1rem";

    const picker = document.createElement("ha-color-picker");
    picker.setAttribute("value", "#3b82f6");
    picker.setAttribute("show-input", "");
    picker.setAttribute("show-swatches", "");
    picker.setAttribute(
      "swatches",
      "#f87171,#fb923c,#fbbf24,#facc15,#a3e635,#4ade80,#34d399,#2dd4bf,#22d3ee,#38bdf8,#60a5fa,#818cf8,#a78bfa,#c084fc,#e879f9,#f472b6",
    );

    container.appendChild(title);
    container.appendChild(picker);

    return container;
  },
};

export const BrandColorPicker: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.padding = "1.5rem";
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "0.5rem";
    container.style.maxWidth = "320px";

    const title = document.createElement("h3");
    title.textContent = "Brand Colors";
    title.style.margin = "0 0 1rem 0";
    title.style.fontSize = "1.125rem";
    title.style.fontWeight = "600";

    const description = document.createElement("p");
    description.textContent = "Select your primary brand color";
    description.style.margin = "0 0 1rem 0";
    description.style.fontSize = "0.875rem";
    description.style.color = "#6b7280";

    const picker = document.createElement("ha-color-picker");
    picker.setAttribute("value", "#3b82f6");
    picker.setAttribute("show-alpha", "");
    picker.setAttribute("show-input", "");
    picker.setAttribute("show-swatches", "");
    picker.setAttribute("swatches", "#3b82f6,#10b981,#f59e0b,#ef4444,#8b5cf6");

    const colorInfo = document.createElement("div");
    colorInfo.style.marginTop = "1rem";
    colorInfo.style.padding = "0.75rem";
    colorInfo.style.background = "#f9fafb";
    colorInfo.style.borderRadius = "0.375rem";
    colorInfo.style.fontSize = "0.875rem";

    const updateColorInfo = (value: string) => {
      colorInfo.innerHTML = `
        <div style="margin-bottom: 0.5rem; font-weight: 600;">Current Color:</div>
        <div style="font-family: monospace;">${value}</div>
      `;
    };

    updateColorInfo("#3b82f6");

    picker.addEventListener("color-change", ((e: CustomEvent) => {
      updateColorInfo(e.detail.value);
    }) as EventListener);

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(picker);
    container.appendChild(colorInfo);

    return container;
  },
};

export const ThemeGenerator: Story = {
  render: () => {
    // Helper function to convert HSLA to HEX
    const hslaToHex = (h: number, s: number, l: number, a: number): string => {
      const lightness = l / 100;
      const saturation = s / 100;
      const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
      const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = lightness - chroma / 2;

      let r = 0, g = 0, b = 0;

      if (h >= 0 && h < 60) {
        r = chroma; g = x; b = 0;
      } else if (h >= 60 && h < 120) {
        r = x; g = chroma; b = 0;
      } else if (h >= 120 && h < 180) {
        r = 0; g = chroma; b = x;
      } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = chroma;
      } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = chroma;
      } else if (h >= 300 && h < 360) {
        r = chroma; g = 0; b = x;
      }

      const red = Math.round((r + m) * 255);
      const green = Math.round((g + m) * 255);
      const blue = Math.round((b + m) * 255);

      const toHex = (n: number) => n.toString(16).padStart(2, '0');

      if (a < 1) {
        const alpha = Math.round(a * 255);
        return `#${toHex(red)}${toHex(green)}${toHex(blue)}${toHex(alpha)}`;
      }

      return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
    };

    const container = document.createElement("div");
    container.style.padding = "1.5rem";
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "0.5rem";
    container.style.maxWidth = "500px";

    const title = document.createElement("h3");
    title.textContent = "Theme Generator";
    title.style.margin = "0 0 1.5rem 0";

    const picker = document.createElement("ha-color-picker");
    picker.setAttribute("value", "#3b82f6");
    picker.setAttribute("show-input", "");
    picker.setAttribute("show-alpha", "");

    const preview = document.createElement("div");
    preview.style.marginTop = "1.5rem";
    preview.style.display = "flex";
    preview.style.flexDirection = "column";
    preview.style.gap = "0.75rem";

    const createPreviewItem = (label: string, bgColor: string) => {
      const item = document.createElement("div");
      item.style.display = "flex";
      item.style.alignItems = "center";
      item.style.gap = "0.75rem";

      const colorBox = document.createElement("div");
      colorBox.style.width = "40px";
      colorBox.style.height = "40px";
      colorBox.style.borderRadius = "0.25rem";
      colorBox.style.border = "1px solid #e5e7eb";
      colorBox.style.background = bgColor;

      const labelText = document.createElement("span");
      labelText.textContent = label;
      labelText.style.fontSize = "0.875rem";
      labelText.style.fontWeight = "500";
      labelText.style.minWidth = "60px";

      const colorCode = document.createElement("span");
      colorCode.textContent = bgColor;
      colorCode.style.fontSize = "0.75rem";
      colorCode.style.fontFamily = "monospace";
      colorCode.style.color = "#6b7280";
      colorCode.style.marginLeft = "auto";

      item.appendChild(colorBox);
      item.appendChild(labelText);
      item.appendChild(colorCode);

      return { item, colorBox, colorCode };
    };

    const primary = createPreviewItem("Primary", "#3b82f6");
    const light = createPreviewItem("Light", "#93c5fd");
    const dark = createPreviewItem("Dark", "#1e40af");

    preview.appendChild(primary.item);
    preview.appendChild(light.item);
    preview.appendChild(dark.item);

    picker.addEventListener("color-change", ((e: CustomEvent) => {
      const color = e.detail;

      // Primary color
      const primaryH = color.h;
      const primaryS = color.s;
      const primaryL = color.l;
      const primaryA = color.a;
      primary.colorBox.style.background = `hsla(${primaryH}, ${primaryS}%, ${primaryL}%, ${primaryA})`;
      primary.colorCode.textContent = hslaToHex(primaryH, primaryS, primaryL, primaryA).toUpperCase();

      // Light variant
      const lightS = Math.min(primaryS + 20, 100);
      const lightL = Math.min(primaryL + 20, 95);
      light.colorBox.style.background = `hsla(${primaryH}, ${lightS}%, ${lightL}%, ${primaryA})`;
      light.colorCode.textContent = hslaToHex(primaryH, lightS, lightL, primaryA).toUpperCase();

      // Dark variant
      const darkS = Math.max(primaryS - 20, 0);
      const darkL = Math.max(primaryL - 30, 10);
      dark.colorBox.style.background = `hsla(${primaryH}, ${darkS}%, ${darkL}%, ${primaryA})`;
      dark.colorCode.textContent = hslaToHex(primaryH, darkS, darkL, primaryA).toUpperCase();
    }) as EventListener);

    container.appendChild(title);
    container.appendChild(picker);
    container.appendChild(preview);

    return container;
  },
};

export const CompactPicker: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "inline-block";

    const picker = document.createElement("ha-color-picker");
    picker.setAttribute("value", "#ec4899");
    picker.style.setProperty("--ha-color-picker-width", "220px");

    container.appendChild(picker);

    return container;
  },
};

export const FullFeatured: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.padding = "1.5rem";

    const picker = document.createElement("ha-color-picker");
    picker.setAttribute("value", "#3b82f6");
    picker.setAttribute("format", "hex");
    picker.setAttribute("show-alpha", "");
    picker.setAttribute("show-input", "");
    picker.setAttribute("show-swatches", "");
    picker.setAttribute(
      "swatches",
      "#ef4444,#f97316,#f59e0b,#eab308,#84cc16,#22c55e,#10b981,#14b8a6,#06b6d4,#0ea5e9,#3b82f6,#6366f1,#8b5cf6,#a855f7,#d946ef,#ec4899",
    );

    const output = document.createElement("div");
    output.style.marginTop = "1rem";
    output.style.padding = "1rem";
    output.style.background = "#f3f4f6";
    output.style.borderRadius = "0.375rem";
    output.style.fontFamily = "monospace";
    output.style.fontSize = "0.875rem";

    const updateOutput = (detail: any) => {
      output.innerHTML = `
        <div><strong>Format:</strong> ${detail.value}</div>
        <div style="margin-top: 0.5rem;"><strong>HSL:</strong> H:${detail.h}° S:${detail.s}% L:${detail.l}% A:${detail.a.toFixed(2)}</div>
      `;
    };

    updateOutput({ value: "#3b82f6", h: 217, s: 91, l: 60, a: 1 });

    picker.addEventListener("color-change", ((e: CustomEvent) => {
      updateOutput(e.detail);
    }) as EventListener);

    container.appendChild(picker);
    container.appendChild(output);

    return container;
  },
};
