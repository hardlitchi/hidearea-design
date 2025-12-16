import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface ThemeSwitcherArgs {
  variant: "toggle" | "dropdown" | "segmented";
  size: "sm" | "md" | "lg";
  showLabel: boolean;
  showAuto: boolean;
}

const meta: Meta<ThemeSwitcherArgs> = {
  title: "Components/ThemeSwitcher",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["toggle", "dropdown", "segmented"],
      description: "Component display style",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Component size",
    },
    showLabel: {
      control: { type: "boolean" },
      description: "Show label text",
    },
    showAuto: {
      control: { type: "boolean" },
      description: "Show auto mode option",
    },
  },
  args: {
    variant: "toggle",
    size: "md",
    showLabel: false,
    showAuto: false,
  },
  render: (args) => html`
    <ha-theme-switcher
      variant="${args.variant}"
      size="${args.size}"
      ?show-label="${args.showLabel}"
      ?show-auto="${args.showAuto}"
    ></ha-theme-switcher>
  `,
};

export default meta;
type Story = StoryObj<ThemeSwitcherArgs>;

/**
 * Default toggle button style
 */
export const Default: Story = {};

/**
 * Toggle variant (default)
 */
export const Toggle: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-theme-switcher variant="toggle"></ha-theme-switcher>
      <ha-theme-switcher variant="toggle" show-label></ha-theme-switcher>
    </div>
  `,
};

/**
 * Dropdown variant
 */
export const Dropdown: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-theme-switcher variant="dropdown"></ha-theme-switcher>
      <ha-theme-switcher variant="dropdown" show-label></ha-theme-switcher>
    </div>
  `,
};

/**
 * Segmented variant
 */
export const Segmented: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-theme-switcher variant="segmented"></ha-theme-switcher>
      <ha-theme-switcher variant="segmented" show-auto></ha-theme-switcher>
    </div>
  `,
};

/**
 * Different sizes (toggle variant)
 */
export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-theme-switcher variant="toggle" size="sm"></ha-theme-switcher>
      <ha-theme-switcher variant="toggle" size="md"></ha-theme-switcher>
      <ha-theme-switcher variant="toggle" size="lg"></ha-theme-switcher>
    </div>
  `,
};

/**
 * Different sizes (dropdown variant)
 */
export const DropdownSizes: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-theme-switcher
        variant="dropdown"
        size="sm"
        show-label
      ></ha-theme-switcher>
      <ha-theme-switcher
        variant="dropdown"
        size="md"
        show-label
      ></ha-theme-switcher>
      <ha-theme-switcher
        variant="dropdown"
        size="lg"
        show-label
      ></ha-theme-switcher>
    </div>
  `,
};

/**
 * Different sizes (segmented variant)
 */
export const SegmentedSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-theme-switcher
        variant="segmented"
        size="sm"
        show-auto
      ></ha-theme-switcher>
      <ha-theme-switcher
        variant="segmented"
        size="md"
        show-auto
      ></ha-theme-switcher>
      <ha-theme-switcher
        variant="segmented"
        size="lg"
        show-auto
      ></ha-theme-switcher>
    </div>
  `,
};

/**
 * With labels
 */
export const WithLabels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-theme-switcher variant="toggle" show-label></ha-theme-switcher>
      <ha-theme-switcher variant="dropdown" show-label></ha-theme-switcher>
    </div>
  `,
};

/**
 * With auto mode option
 */
export const WithAutoMode: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-theme-switcher variant="dropdown" show-auto></ha-theme-switcher>
      <ha-theme-switcher variant="segmented" show-auto></ha-theme-switcher>
    </div>
  `,
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;"
    >
      <div>
        <h3 style="margin-top: 0; margin-bottom: 1rem; font-size: 14px;">
          Toggle
        </h3>
        <ha-theme-switcher variant="toggle" show-label></ha-theme-switcher>
      </div>
      <div>
        <h3 style="margin-top: 0; margin-bottom: 1rem; font-size: 14px;">
          Dropdown
        </h3>
        <ha-theme-switcher variant="dropdown" show-label></ha-theme-switcher>
      </div>
      <div>
        <h3 style="margin-top: 0; margin-bottom: 1rem; font-size: 14px;">
          Segmented
        </h3>
        <ha-theme-switcher variant="segmented"></ha-theme-switcher>
      </div>
    </div>
  `,
};

/**
 * In navigation bar
 */
export const InNavigation: Story = {
  render: () => html`
    <div
      style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--background-secondary); border-radius: 8px;"
    >
      <div style="font-weight: 600; font-size: 18px;">My Application</div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <a href="#" style="text-decoration: none; color: inherit;">Home</a>
        <a href="#" style="text-decoration: none; color: inherit;">About</a>
        <a href="#" style="text-decoration: none; color: inherit;">Contact</a>
        <ha-theme-switcher variant="toggle"></ha-theme-switcher>
      </div>
    </div>
  `,
};

/**
 * In settings panel
 */
export const InSettings: Story = {
  render: () => html`
    <div
      style="padding: 1.5rem; background: var(--background-secondary); border-radius: 8px; max-width: 400px;"
    >
      <h3 style="margin-top: 0; margin-bottom: 1rem;">Settings</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div
          style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--background-primary); border-radius: 6px;"
        >
          <div>
            <div style="font-weight: 500;">Theme</div>
            <div
              style="font-size: 0.875rem; color: var(--foreground-secondary); margin-top: 0.25rem;"
            >
              Choose your preferred theme
            </div>
          </div>
          <ha-theme-switcher variant="dropdown"></ha-theme-switcher>
        </div>
        <div
          style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--background-primary); border-radius: 6px;"
        >
          <div>
            <div style="font-weight: 500;">Advanced</div>
            <div
              style="font-size: 0.875rem; color: var(--foreground-secondary); margin-top: 0.25rem;"
            >
              Include system preference option
            </div>
          </div>
          <ha-theme-switcher variant="segmented" show-auto></ha-theme-switcher>
        </div>
      </div>
    </div>
  `,
};

/**
 * Event handling example
 */
export const WithEventHandling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-theme-switcher
        variant="segmented"
        show-auto
        @ha-theme-change="${(e: CustomEvent) => {
          const detail = e.detail;
          console.log("Theme changed:", detail);
          // Display in UI
          const output = document.getElementById("theme-output");
          if (output) {
            output.textContent = `Theme: ${detail.theme}, Effective: ${detail.effective}`;
          }
        }}"
      ></ha-theme-switcher>
      <div
        id="theme-output"
        style="padding: 1rem; background: var(--background-secondary); border-radius: 6px; font-family: monospace; font-size: 0.875rem;"
      >
        Theme change events will appear here
      </div>
    </div>
  `,
};

/**
 * Compact mode for mobile
 */
export const CompactMode: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-theme-switcher variant="toggle" size="sm"></ha-theme-switcher>
      <ha-theme-switcher variant="dropdown" size="sm"></ha-theme-switcher>
    </div>
  `,
};
