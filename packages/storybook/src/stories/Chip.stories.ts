import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface ChipArgs {
  size: "small" | "medium" | "large";
  color: "default" | "primary" | "success" | "warning" | "error" | "info";
  deletable: boolean;
  interactive: boolean;
  disabled: boolean;
  label: string;
}

const meta: Meta<ChipArgs> = {
  title: "Data Display/Chip",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Chip size",
    },
    color: {
      control: { type: "select" },
      options: ["default", "primary", "success", "warning", "error", "info"],
      description: "Chip color variant",
    },
    deletable: {
      control: { type: "boolean" },
      description: "Show delete button",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Make chip interactive (clickable)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the chip",
    },
    label: {
      control: { type: "text" },
      description: "Chip label",
    },
  },
  args: {
    size: "medium",
    color: "default",
    deletable: false,
    interactive: false,
    disabled: false,
    label: "Chip",
  },
  render: (args) => html`
    <ha-chip
      size="${args.size}"
      color="${args.color}"
      ?deletable="${args.deletable}"
      ?interactive="${args.interactive}"
      ?disabled="${args.disabled}"
    >
      ${args.label}
    </ha-chip>
  `,
};

export default meta;
type Story = StoryObj<ChipArgs>;

/**
 * Default chip with default color
 */
export const Default: Story = {};

/**
 * All color variants
 */
export const AllColors: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-chip color="default">Default</ha-chip>
      <ha-chip color="primary">Primary</ha-chip>
      <ha-chip color="success">Success</ha-chip>
      <ha-chip color="warning">Warning</ha-chip>
      <ha-chip color="error">Error</ha-chip>
      <ha-chip color="info">Info</ha-chip>
    </div>
  `,
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-chip color="primary" size="small">Small</ha-chip>
      <ha-chip color="primary" size="medium">Medium</ha-chip>
      <ha-chip color="primary" size="large">Large</ha-chip>
    </div>
  `,
};

/**
 * Deletable chips with close button
 */
export const Deletable: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-chip color="default" deletable>Default</ha-chip>
      <ha-chip color="primary" deletable>Primary</ha-chip>
      <ha-chip color="success" deletable>Success</ha-chip>
      <ha-chip color="warning" deletable>Warning</ha-chip>
      <ha-chip color="error" deletable>Error</ha-chip>
      <ha-chip color="info" deletable>Info</ha-chip>
    </div>
  `,
};

/**
 * Interactive chips (clickable)
 */
export const Interactive: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-chip
        color="primary"
        interactive
        @chip-click="${(e: CustomEvent) =>
          console.log("Chip clicked:", e.detail)}"
      >
        Click me
      </ha-chip>
      <ha-chip
        color="success"
        interactive
        @chip-click="${(e: CustomEvent) =>
          console.log("Chip clicked:", e.detail)}"
      >
        Interactive
      </ha-chip>
      <ha-chip
        color="info"
        interactive
        @chip-click="${(e: CustomEvent) =>
          console.log("Chip clicked:", e.detail)}"
      >
        Clickable
      </ha-chip>
    </div>
  `,
};

/**
 * Disabled chips
 */
export const Disabled: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-chip color="default" disabled>Default</ha-chip>
      <ha-chip color="primary" disabled>Primary</ha-chip>
      <ha-chip color="success" disabled>Success</ha-chip>
      <ha-chip color="primary" disabled deletable>Deletable disabled</ha-chip>
      <ha-chip color="info" disabled interactive>Interactive disabled</ha-chip>
    </div>
  `,
};

/**
 * Chips with icons
 */
export const WithIcons: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-chip color="success">
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          style="width: 16px; height: 16px;"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd"
          />
        </svg>
        Verified
      </ha-chip>
      <ha-chip color="warning">
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          style="width: 16px; height: 16px;"
        >
          <path
            fill-rule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
        Warning
      </ha-chip>
      <ha-chip color="info">
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          style="width: 16px; height: 16px;"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
            clip-rule="evenodd"
          />
        </svg>
        Info
      </ha-chip>
      <ha-chip color="primary" deletable>
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          style="width: 16px; height: 16px;"
        >
          <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
        </svg>
        User
      </ha-chip>
    </div>
  `,
};

/**
 * Tag-like usage (for categorization)
 */
export const Tags: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-chip color="primary" deletable>React</ha-chip>
      <ha-chip color="primary" deletable>Vue</ha-chip>
      <ha-chip color="primary" deletable>TypeScript</ha-chip>
      <ha-chip color="primary" deletable>Web Components</ha-chip>
      <ha-chip color="primary" deletable>Vite</ha-chip>
      <ha-chip color="primary" deletable>Storybook</ha-chip>
    </div>
  `,
};

/**
 * Status chips
 */
export const Status: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-chip color="success">
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            style="width: 16px; height: 16px;"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
          Active
        </ha-chip>
        <span>System is running</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-chip color="warning">
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            style="width: 16px; height: 16px;"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
              clip-rule="evenodd"
            />
          </svg>
          Pending
        </ha-chip>
        <span>Waiting for approval</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-chip color="error">
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            style="width: 16px; height: 16px;"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>
          Failed
        </ha-chip>
        <span>Operation failed</span>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ha-chip color="info">Draft</ha-chip>
        <span>Not published yet</span>
      </div>
    </div>
  `,
};

/**
 * Combined features
 */
export const Combined: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;"
    >
      <ha-chip color="primary" size="small" deletable>Small deletable</ha-chip>
      <ha-chip color="success" size="medium" interactive>
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          style="width: 16px; height: 16px;"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd"
          />
        </svg>
        Interactive with icon
      </ha-chip>
      <ha-chip color="warning" size="large" deletable>
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          style="width: 16px; height: 16px;"
        >
          <path
            fill-rule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
        Large with icon and delete
      </ha-chip>
    </div>
  `,
};
