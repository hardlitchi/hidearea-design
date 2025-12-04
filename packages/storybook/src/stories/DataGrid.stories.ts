import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@hidearea-design/core";
import type { DataGridColumn, DataGridRow } from "@hidearea-design/core";

const meta: Meta = {
  title: "Data Display/DataGrid",
  tags: ["autodocs"],
  argTypes: {
    striped: { control: "boolean" },
    bordered: { control: "boolean" },
    hoverable: { control: "boolean" },
    selectable: { control: "boolean"},
    pageSize: { control: "number" },
  },
};

export default meta;
type Story = StoryObj;

// Sample data
const sampleColumns: DataGridColumn[] = [
  { key: "id", label: "ID", sortable: true, width: "80px" },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: false },
  { key: "role", label: "Role", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

const sampleData: DataGridRow[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Active" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor", status: "Inactive" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active" },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", role: "User", status: "Active" },
];

const largeData: DataGridRow[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  email: `person${i + 1}@example.com`,
  role: ["Admin", "User", "Editor"][i % 3],
  status: ["Active", "Inactive"][i % 2],
}));

export const Default: Story = {
  render: () => {
    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid") as any;
      if (grid) {
        grid.setColumns(sampleColumns);
        grid.setData(sampleData);
      }
    }, 0);

    return html`<ha-datagrid></ha-datagrid>`;
  },
};

export const Striped: Story = {
  render: () => {
    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid[striped]") as any;
      if (grid) {
        grid.setColumns(sampleColumns);
        grid.setData(sampleData);
      }
    }, 0);

    return html`<ha-datagrid striped></ha-datagrid>`;
  },
};

export const Bordered: Story = {
  render: () => {
    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid[bordered]") as any;
      if (grid) {
        grid.setColumns(sampleColumns);
        grid.setData(sampleData);
      }
    }, 0);

    return html`<ha-datagrid bordered></ha-datagrid>`;
  },
};

export const Hoverable: Story = {
  render: () => {
    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid[hoverable]") as any;
      if (grid) {
        grid.setColumns(sampleColumns);
        grid.setData(sampleData);
      }
    }, 0);

    return html`<ha-datagrid hoverable></ha-datagrid>`;
  },
};

export const Selectable: Story = {
  render: () => {
    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid[selectable]") as any;
      if (grid) {
        grid.setColumns(sampleColumns);
        grid.setData(sampleData);

        grid.addEventListener("selection-change", (e: CustomEvent) => {
          console.log("Selected rows:", e.detail.selectedRows);
        });
      }
    }, 0);

    return html`
      <ha-datagrid selectable></ha-datagrid>
      <p style="margin-top: 1rem; color: #666; font-size: 14px;">
        Select rows using checkboxes. Check console for selected row indices.
      </p>
    `;
  },
};

export const Sortable: Story = {
  render: () => {
    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid.sortable-demo") as any;
      if (grid) {
        grid.setColumns(sampleColumns);
        grid.setData(sampleData);

        grid.addEventListener("sort-change", (e: CustomEvent) => {
          console.log("Sort changed:", e.detail);
        });
      }
    }, 0);

    return html`
      <ha-datagrid class="sortable-demo" hoverable></ha-datagrid>
      <p style="margin-top: 1rem; color: #666; font-size: 14px;">
        Click column headers to sort. Click again to reverse, and once more to clear sorting.
      </p>
    `;
  },
};

export const WithPagination: Story = {
  render: () => {
    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid.pagination-demo") as any;
      if (grid) {
        grid.setColumns(sampleColumns);
        grid.setData(largeData);

        grid.addEventListener("page-change", (e: CustomEvent) => {
          console.log("Page changed:", e.detail);
        });
      }
    }, 0);

    return html`
      <ha-datagrid class="pagination-demo" hoverable></ha-datagrid>
      <p style="margin-top: 1rem; color: #666; font-size: 14px;">
        50 rows with pagination (10 rows per page). Check console for page change events.
      </p>
    `;
  },
};

export const CustomPageSize: Story = {
  render: () => {
    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid[page-size='5']") as any;
      if (grid) {
        grid.setColumns(sampleColumns);
        grid.setData(largeData.slice(0, 20));
      }
    }, 0);

    return html`
      <ha-datagrid page-size="5" hoverable></ha-datagrid>
      <p style="margin-top: 1rem; color: #666; font-size: 14px;">
        20 rows with 5 rows per page.
      </p>
    `;
  },
};

export const AllFeatures: Story = {
  render: () => {
    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid.all-features") as any;
      if (grid) {
        grid.setColumns(sampleColumns);
        grid.setData(largeData);

        grid.addEventListener("sort-change", (e: CustomEvent) => {
          console.log("Sort:", e.detail);
        });

        grid.addEventListener("selection-change", (e: CustomEvent) => {
          console.log("Selection:", e.detail.selectedRows);
        });

        grid.addEventListener("page-change", (e: CustomEvent) => {
          console.log("Page:", e.detail);
        });
      }
    }, 0);

    return html`
      <ha-datagrid class="all-features" striped bordered hoverable selectable></ha-datagrid>
      <p style="margin-top: 1rem; color: #666; font-size: 14px;">
        All features enabled: striped, bordered, hoverable, selectable, sortable, and paginated.
      </p>
    `;
  },
};

export const UserManagement: Story = {
  render: () => {
    const columns: DataGridColumn[] = [
      { key: "id", label: "ID", sortable: true, width: "60px" },
      { key: "name", label: "Full Name", sortable: true },
      { key: "email", label: "Email Address", sortable: true },
      { key: "department", label: "Department", sortable: true },
      { key: "joinDate", label: "Join Date", sortable: true },
      { key: "status", label: "Status", sortable: true, width: "100px" },
    ];

    const data: DataGridRow[] = [
      { id: 1, name: "Alice Johnson", email: "alice.j@company.com", department: "Engineering", joinDate: "2022-01-15", status: "Active" },
      { id: 2, name: "Bob Smith", email: "bob.s@company.com", department: "Marketing", joinDate: "2021-06-20", status: "Active" },
      { id: 3, name: "Charlie Brown", email: "charlie.b@company.com", department: "Sales", joinDate: "2023-03-10", status: "Active" },
      { id: 4, name: "Diana Prince", email: "diana.p@company.com", department: "Engineering", joinDate: "2020-11-05", status: "On Leave" },
      { id: 5, name: "Eve Wilson", email: "eve.w@company.com", department: "HR", joinDate: "2022-09-01", status: "Active" },
      { id: 6, name: "Frank Miller", email: "frank.m@company.com", department: "Engineering", joinDate: "2023-01-20", status: "Active" },
      { id: 7, name: "Grace Lee", email: "grace.l@company.com", department: "Design", joinDate: "2021-08-15", status: "Active" },
      { id: 8, name: "Henry Ford", email: "henry.f@company.com", department: "Operations", joinDate: "2022-04-30", status: "Inactive" },
    ];

    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid.user-management") as any;
      if (grid) {
        grid.setColumns(columns);
        grid.setData(data);
      }
    }, 0);

    return html`
      <div>
        <h3 style="margin-bottom: 1rem;">User Management Dashboard</h3>
        <ha-datagrid class="user-management" striped hoverable selectable></ha-datagrid>
      </div>
    `;
  },
};

export const ProductInventory: Story = {
  render: () => {
    const columns: DataGridColumn[] = [
      { key: "sku", label: "SKU", sortable: true, width: "100px" },
      { key: "name", label: "Product Name", sortable: true },
      { key: "category", label: "Category", sortable: true },
      { key: "price", label: "Price", sortable: true, width: "100px" },
      { key: "stock", label: "Stock", sortable: true, width: "80px" },
      { key: "supplier", label: "Supplier", sortable: true },
    ];

    const data: DataGridRow[] = [
      { sku: "PRD-001", name: "Wireless Mouse", category: "Electronics", price: "$29.99", stock: 150, supplier: "TechCorp" },
      { sku: "PRD-002", name: "USB-C Cable", category: "Accessories", price: "$12.99", stock: 500, supplier: "CableMax" },
      { sku: "PRD-003", name: "Laptop Stand", category: "Office", price: "$49.99", stock: 75, supplier: "ErgoSupply" },
      { sku: "PRD-004", name: "Mechanical Keyboard", category: "Electronics", price: "$89.99", stock: 45, supplier: "TechCorp" },
      { sku: "PRD-005", name: "Monitor 27\"", category: "Electronics", price: "$299.99", stock: 20, supplier: "DisplayPro" },
      { sku: "PRD-006", name: "Desk Lamp", category: "Office", price: "$34.99", stock: 120, supplier: "LightWorks" },
      { sku: "PRD-007", name: "Webcam HD", category: "Electronics", price: "$79.99", stock: 60, supplier: "TechCorp" },
      { sku: "PRD-008", name: "Office Chair", category: "Furniture", price: "$249.99", stock: 15, supplier: "ErgoSupply" },
      { sku: "PRD-009", name: "Notebook Set", category: "Stationery", price: "$14.99", stock: 200, supplier: "PaperPlus" },
      { sku: "PRD-010", name: "Pen Pack", category: "Stationery", price: "$8.99", stock: 350, supplier: "PaperPlus" },
    ];

    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid.product-inventory") as any;
      if (grid) {
        grid.setColumns(columns);
        grid.setData(data);
      }
    }, 0);

    return html`
      <div>
        <h3 style="margin-bottom: 1rem;">Product Inventory</h3>
        <ha-datagrid class="product-inventory" bordered hoverable page-size="10"></ha-datagrid>
      </div>
    `;
  },
};

export const SalesReport: Story = {
  render: () => {
    const columns: DataGridColumn[] = [
      { key: "date", label: "Date", sortable: true, width: "120px" },
      { key: "orderId", label: "Order ID", sortable: true, width: "100px" },
      { key: "customer", label: "Customer", sortable: true },
      { key: "amount", label: "Amount", sortable: true, width: "100px" },
      { key: "status", label: "Status", sortable: true, width: "100px" },
      { key: "payment", label: "Payment", sortable: true, width: "120px" },
    ];

    const data: DataGridRow[] = Array.from({ length: 30 }, (_, i) => {
      const statuses = ["Completed", "Pending", "Shipped", "Cancelled"];
      const payments = ["Credit Card", "PayPal", "Bank Transfer"];
      const date = new Date(2024, 0, i + 1).toISOString().split('T')[0];

      return {
        date,
        orderId: `ORD-${1000 + i}`,
        customer: `Customer ${i + 1}`,
        amount: `$${(Math.random() * 500 + 50).toFixed(2)}`,
        status: statuses[i % statuses.length],
        payment: payments[i % payments.length],
      };
    });

    setTimeout(() => {
      const grid = document.querySelector("ha-datagrid.sales-report") as any;
      if (grid) {
        grid.setColumns(columns);
        grid.setData(data);
      }
    }, 0);

    return html`
      <div>
        <h3 style="margin-bottom: 1rem;">Sales Report - January 2024</h3>
        <ha-datagrid class="sales-report" striped bordered hoverable page-size="15"></ha-datagrid>
      </div>
    `;
  },
};
