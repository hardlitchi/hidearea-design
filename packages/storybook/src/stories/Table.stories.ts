import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface TableArgs {
  striped: boolean;
  bordered: boolean;
  hoverable: boolean;
  compact: boolean;
  fullWidth: boolean;
}

const meta: Meta<TableArgs> = {
  title: "Data Display/Table",
  tags: ["autodocs"],
  argTypes: {
    striped: {
      control: { type: "boolean" },
      description: "Enable striped rows",
    },
    bordered: {
      control: { type: "boolean" },
      description: "Enable borders",
    },
    hoverable: {
      control: { type: "boolean" },
      description: "Enable row hover effect",
    },
    compact: {
      control: { type: "boolean" },
      description: "Enable compact mode",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Enable full width table",
    },
  },
  args: {
    striped: false,
    bordered: false,
    hoverable: false,
    compact: false,
    fullWidth: true,
  },
  render: (args) => html`
    <ha-table
      ?striped="${args.striped}"
      ?bordered="${args.bordered}"
      ?hoverable="${args.hoverable}"
      ?compact="${args.compact}"
      ?full-width="${args.fullWidth}"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td>Admin</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>jane@example.com</td>
          <td>Editor</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>Bob Johnson</td>
          <td>bob@example.com</td>
          <td>Viewer</td>
          <td>Inactive</td>
        </tr>
      </tbody>
    </ha-table>
  `,
};

export default meta;
type Story = StoryObj<TableArgs>;

/**
 * Default table with full width
 */
export const Default: Story = {};

/**
 * Striped table with alternating row colors
 */
export const Striped: Story = {
  args: {
    striped: true,
  },
};

/**
 * Bordered table with borders around cells
 */
export const Bordered: Story = {
  args: {
    bordered: true,
  },
};

/**
 * Hoverable table with row hover effect
 */
export const Hoverable: Story = {
  args: {
    hoverable: true,
  },
};

/**
 * Compact table with reduced padding
 */
export const Compact: Story = {
  args: {
    compact: true,
  },
};

/**
 * Table with all features enabled
 */
export const AllFeatures: Story = {
  args: {
    striped: true,
    bordered: true,
    hoverable: true,
  },
};

/**
 * User management table example
 */
export const UserManagement: Story = {
  render: () => html`
    <ha-table striped bordered hoverable full-width>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Joined Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Alice Johnson</td>
          <td>alice@company.com</td>
          <td>Engineering</td>
          <td>2023-01-15</td>
          <td>
            <ha-button size="sm" variant="outline">Edit</ha-button>
            <ha-button size="sm" variant="danger">Delete</ha-button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Bob Williams</td>
          <td>bob@company.com</td>
          <td>Design</td>
          <td>2023-02-20</td>
          <td>
            <ha-button size="sm" variant="outline">Edit</ha-button>
            <ha-button size="sm" variant="danger">Delete</ha-button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Carol Martinez</td>
          <td>carol@company.com</td>
          <td>Marketing</td>
          <td>2023-03-10</td>
          <td>
            <ha-button size="sm" variant="outline">Edit</ha-button>
            <ha-button size="sm" variant="danger">Delete</ha-button>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>David Lee</td>
          <td>david@company.com</td>
          <td>Sales</td>
          <td>2023-04-05</td>
          <td>
            <ha-button size="sm" variant="outline">Edit</ha-button>
            <ha-button size="sm" variant="danger">Delete</ha-button>
          </td>
        </tr>
      </tbody>
    </ha-table>
  `,
};

/**
 * Product catalog table example
 */
export const ProductCatalog: Story = {
  render: () => html`
    <ha-table bordered hoverable full-width>
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Laptop Pro 15</td>
          <td>Electronics</td>
          <td>$1,299.99</td>
          <td>45</td>
          <td><ha-badge variant="success">In Stock</ha-badge></td>
        </tr>
        <tr>
          <td>Wireless Mouse</td>
          <td>Accessories</td>
          <td>$29.99</td>
          <td>120</td>
          <td><ha-badge variant="success">In Stock</ha-badge></td>
        </tr>
        <tr>
          <td>USB-C Cable</td>
          <td>Accessories</td>
          <td>$12.99</td>
          <td>5</td>
          <td><ha-badge variant="warning">Low Stock</ha-badge></td>
        </tr>
        <tr>
          <td>Monitor 27"</td>
          <td>Electronics</td>
          <td>$399.99</td>
          <td>0</td>
          <td><ha-badge variant="error">Out of Stock</ha-badge></td>
        </tr>
      </tbody>
    </ha-table>
  `,
};
