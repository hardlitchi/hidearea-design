import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@hidearea-design/core";

const meta: Meta = {
  title: "Navigation/Breadcrumb",
  tags: ["autodocs"],
  argTypes: {
    separator: {
      control: "select",
      options: ["slash", "chevron", "arrow", "dot"],
      description: "Separator type",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Breadcrumb size",
    },
  },
  args: {
    separator: "slash",
    size: "md",
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ha-breadcrumb separator="${args.separator}" size="${args.size}">
      <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/products">Products</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/products/electronics"
        >Electronics</ha-breadcrumb-item
      >
      <ha-breadcrumb-item current>Laptop</ha-breadcrumb-item>
    </ha-breadcrumb>
  `,
};

export const Separators: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3 style="margin-bottom: 8px;">Slash (Default)</h3>
        <ha-breadcrumb separator="slash">
          <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
          <ha-breadcrumb-item href="/products">Products</ha-breadcrumb-item>
          <ha-breadcrumb-item current>Detail</ha-breadcrumb-item>
        </ha-breadcrumb>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Chevron</h3>
        <ha-breadcrumb separator="chevron">
          <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
          <ha-breadcrumb-item href="/products">Products</ha-breadcrumb-item>
          <ha-breadcrumb-item current>Detail</ha-breadcrumb-item>
        </ha-breadcrumb>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Arrow</h3>
        <ha-breadcrumb separator="arrow">
          <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
          <ha-breadcrumb-item href="/products">Products</ha-breadcrumb-item>
          <ha-breadcrumb-item current>Detail</ha-breadcrumb-item>
        </ha-breadcrumb>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Dot</h3>
        <ha-breadcrumb separator="dot">
          <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
          <ha-breadcrumb-item href="/products">Products</ha-breadcrumb-item>
          <ha-breadcrumb-item current>Detail</ha-breadcrumb-item>
        </ha-breadcrumb>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3 style="margin-bottom: 8px;">Small</h3>
        <ha-breadcrumb size="sm">
          <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
          <ha-breadcrumb-item href="/docs">Documentation</ha-breadcrumb-item>
          <ha-breadcrumb-item current>Components</ha-breadcrumb-item>
        </ha-breadcrumb>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Medium (Default)</h3>
        <ha-breadcrumb size="md">
          <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
          <ha-breadcrumb-item href="/docs">Documentation</ha-breadcrumb-item>
          <ha-breadcrumb-item current>Components</ha-breadcrumb-item>
        </ha-breadcrumb>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Large</h3>
        <ha-breadcrumb size="lg">
          <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
          <ha-breadcrumb-item href="/docs">Documentation</ha-breadcrumb-item>
          <ha-breadcrumb-item current>Components</ha-breadcrumb-item>
        </ha-breadcrumb>
      </div>
    </div>
  `,
};

export const LongPath: Story = {
  render: () => html`
    <ha-breadcrumb>
      <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/company">Company</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/company/departments"
        >Departments</ha-breadcrumb-item
      >
      <ha-breadcrumb-item href="/company/departments/engineering"
        >Engineering</ha-breadcrumb-item
      >
      <ha-breadcrumb-item href="/company/departments/engineering/teams"
        >Teams</ha-breadcrumb-item
      >
      <ha-breadcrumb-item href="/company/departments/engineering/teams/frontend"
        >Frontend</ha-breadcrumb-item
      >
      <ha-breadcrumb-item current>Members</ha-breadcrumb-item>
    </ha-breadcrumb>
  `,
};

export const WithoutLinks: Story = {
  render: () => html`
    <ha-breadcrumb>
      <ha-breadcrumb-item>Step 1</ha-breadcrumb-item>
      <ha-breadcrumb-item>Step 2</ha-breadcrumb-item>
      <ha-breadcrumb-item current>Step 3</ha-breadcrumb-item>
    </ha-breadcrumb>
  `,
};
