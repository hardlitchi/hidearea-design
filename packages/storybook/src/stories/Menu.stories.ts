import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@hidearea-design/core";

const meta: Meta = {
  title: "Components/Menu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <ha-dropdown placement="bottom-start">
      <button slot="trigger" style="padding: 8px 16px; cursor: pointer;">
        Open Menu
      </button>
      <ha-menu>
        <ha-menu-item value="new">New File</ha-menu-item>
        <ha-menu-item value="open">Open</ha-menu-item>
        <ha-menu-item value="save">Save</ha-menu-item>
        <ha-menu-divider></ha-menu-divider>
        <ha-menu-item value="exit">Exit</ha-menu-item>
      </ha-menu>
    </ha-dropdown>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <ha-dropdown placement="bottom-start">
      <button slot="trigger" style="padding: 8px 16px; cursor: pointer;">
        Actions
      </button>
      <ha-menu>
        <ha-menu-item value="edit">
          <span slot="icon">✏️</span>
          Edit
        </ha-menu-item>
        <ha-menu-item value="copy">
          <span slot="icon">📋</span>
          Copy
        </ha-menu-item>
        <ha-menu-item value="share">
          <span slot="icon">🔗</span>
          Share
        </ha-menu-item>
        <ha-menu-divider></ha-menu-divider>
        <ha-menu-item value="delete" danger>
          <span slot="icon">🗑️</span>
          Delete
        </ha-menu-item>
      </ha-menu>
    </ha-dropdown>
  `,
};

export const Placements: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 100px; padding: 100px; text-align: center;"
    >
      <ha-dropdown placement="top-start">
        <button slot="trigger" style="padding: 8px 16px;">Top Start</button>
        <ha-menu>
          <ha-menu-item value="1">Item 1</ha-menu-item>
          <ha-menu-item value="2">Item 2</ha-menu-item>
          <ha-menu-item value="3">Item 3</ha-menu-item>
        </ha-menu>
      </ha-dropdown>

      <ha-dropdown placement="top">
        <button slot="trigger" style="padding: 8px 16px;">Top</button>
        <ha-menu>
          <ha-menu-item value="1">Item 1</ha-menu-item>
          <ha-menu-item value="2">Item 2</ha-menu-item>
          <ha-menu-item value="3">Item 3</ha-menu-item>
        </ha-menu>
      </ha-dropdown>

      <ha-dropdown placement="top-end">
        <button slot="trigger" style="padding: 8px 16px;">Top End</button>
        <ha-menu>
          <ha-menu-item value="1">Item 1</ha-menu-item>
          <ha-menu-item value="2">Item 2</ha-menu-item>
          <ha-menu-item value="3">Item 3</ha-menu-item>
        </ha-menu>
      </ha-dropdown>

      <ha-dropdown placement="bottom-start">
        <button slot="trigger" style="padding: 8px 16px;">Bottom Start</button>
        <ha-menu>
          <ha-menu-item value="1">Item 1</ha-menu-item>
          <ha-menu-item value="2">Item 2</ha-menu-item>
          <ha-menu-item value="3">Item 3</ha-menu-item>
        </ha-menu>
      </ha-dropdown>

      <ha-dropdown placement="bottom">
        <button slot="trigger" style="padding: 8px 16px;">Bottom</button>
        <ha-menu>
          <ha-menu-item value="1">Item 1</ha-menu-item>
          <ha-menu-item value="2">Item 2</ha-menu-item>
          <ha-menu-item value="3">Item 3</ha-menu-item>
        </ha-menu>
      </ha-dropdown>

      <ha-dropdown placement="bottom-end">
        <button slot="trigger" style="padding: 8px 16px;">Bottom End</button>
        <ha-menu>
          <ha-menu-item value="1">Item 1</ha-menu-item>
          <ha-menu-item value="2">Item 2</ha-menu-item>
          <ha-menu-item value="3">Item 3</ha-menu-item>
        </ha-menu>
      </ha-dropdown>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px;">
      <ha-dropdown>
        <button slot="trigger" style="padding: 8px 16px;">Small</button>
        <ha-menu size="sm">
          <ha-menu-item value="1">Small Item 1</ha-menu-item>
          <ha-menu-item value="2">Small Item 2</ha-menu-item>
          <ha-menu-item value="3">Small Item 3</ha-menu-item>
        </ha-menu>
      </ha-dropdown>

      <ha-dropdown>
        <button slot="trigger" style="padding: 8px 16px;">Medium</button>
        <ha-menu size="md">
          <ha-menu-item value="1">Medium Item 1</ha-menu-item>
          <ha-menu-item value="2">Medium Item 2</ha-menu-item>
          <ha-menu-item value="3">Medium Item 3</ha-menu-item>
        </ha-menu>
      </ha-dropdown>

      <ha-dropdown>
        <button slot="trigger" style="padding: 8px 16px;">Large</button>
        <ha-menu size="lg">
          <ha-menu-item value="1">Large Item 1</ha-menu-item>
          <ha-menu-item value="2">Large Item 2</ha-menu-item>
          <ha-menu-item value="3">Large Item 3</ha-menu-item>
        </ha-menu>
      </ha-dropdown>
    </div>
  `,
};

export const WithDisabled: Story = {
  render: () => html`
    <ha-dropdown>
      <button slot="trigger" style="padding: 8px 16px;">
        Menu with Disabled
      </button>
      <ha-menu>
        <ha-menu-item value="1">Enabled Item</ha-menu-item>
        <ha-menu-item value="2" disabled>Disabled Item</ha-menu-item>
        <ha-menu-item value="3">Another Enabled</ha-menu-item>
        <ha-menu-divider></ha-menu-divider>
        <ha-menu-item value="4" disabled>Also Disabled</ha-menu-item>
      </ha-menu>
    </ha-dropdown>
  `,
};

export const HoverTrigger: Story = {
  render: () => html`
    <ha-dropdown trigger="hover">
      <button slot="trigger" style="padding: 8px 16px;">Hover Me</button>
      <ha-menu>
        <ha-menu-item value="1">Item 1</ha-menu-item>
        <ha-menu-item value="2">Item 2</ha-menu-item>
        <ha-menu-item value="3">Item 3</ha-menu-item>
      </ha-menu>
    </ha-dropdown>
  `,
};
