import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@hidearea-design/core";

const meta: Meta = {
  title: "Components/Tabs",
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Currently active tab value",
    },
    variant: {
      control: "select",
      options: ["default", "outlined", "pills"],
      description: "Tab variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tab size",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Tab alignment",
    },
  },
  args: {
    value: "tab1",
    variant: "default",
    size: "md",
    align: "start",
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div>
      <ha-tabs
        value="${args.value}"
        variant="${args.variant}"
        size="${args.size}"
        align="${args.align}"
      >
        <ha-tab-item value="tab1">Tab 1</ha-tab-item>
        <ha-tab-item value="tab2">Tab 2</ha-tab-item>
        <ha-tab-item value="tab3">Tab 3</ha-tab-item>
      </ha-tabs>

      <div style="margin-top: 16px;">
        <ha-tab-panel value="tab1" active>
          <p>Content for Tab 1</p>
          <p>This is the first tab panel with some content.</p>
        </ha-tab-panel>
        <ha-tab-panel value="tab2">
          <p>Content for Tab 2</p>
          <p>This is the second tab panel with different content.</p>
        </ha-tab-panel>
        <ha-tab-panel value="tab3">
          <p>Content for Tab 3</p>
          <p>This is the third tab panel with more content.</p>
        </ha-tab-panel>
      </div>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin-bottom: 8px;">Default</h3>
        <ha-tabs value="tab1" variant="default">
          <ha-tab-item value="tab1">Home</ha-tab-item>
          <ha-tab-item value="tab2">Profile</ha-tab-item>
          <ha-tab-item value="tab3">Settings</ha-tab-item>
        </ha-tabs>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Outlined</h3>
        <ha-tabs value="tab1" variant="outlined">
          <ha-tab-item value="tab1">Home</ha-tab-item>
          <ha-tab-item value="tab2">Profile</ha-tab-item>
          <ha-tab-item value="tab3">Settings</ha-tab-item>
        </ha-tabs>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Pills</h3>
        <ha-tabs value="tab1" variant="pills">
          <ha-tab-item value="tab1">Home</ha-tab-item>
          <ha-tab-item value="tab2">Profile</ha-tab-item>
          <ha-tab-item value="tab3">Settings</ha-tab-item>
        </ha-tabs>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin-bottom: 8px;">Small</h3>
        <ha-tabs value="tab1" size="sm">
          <ha-tab-item value="tab1">Home</ha-tab-item>
          <ha-tab-item value="tab2">Profile</ha-tab-item>
          <ha-tab-item value="tab3">Settings</ha-tab-item>
        </ha-tabs>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Medium (Default)</h3>
        <ha-tabs value="tab1" size="md">
          <ha-tab-item value="tab1">Home</ha-tab-item>
          <ha-tab-item value="tab2">Profile</ha-tab-item>
          <ha-tab-item value="tab3">Settings</ha-tab-item>
        </ha-tabs>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Large</h3>
        <ha-tabs value="tab1" size="lg">
          <ha-tab-item value="tab1">Home</ha-tab-item>
          <ha-tab-item value="tab2">Profile</ha-tab-item>
          <ha-tab-item value="tab3">Settings</ha-tab-item>
        </ha-tabs>
      </div>
    </div>
  `,
};

export const Alignment: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3 style="margin-bottom: 8px;">Start (Default)</h3>
        <ha-tabs value="tab1" align="start">
          <ha-tab-item value="tab1">Home</ha-tab-item>
          <ha-tab-item value="tab2">Profile</ha-tab-item>
          <ha-tab-item value="tab3">Settings</ha-tab-item>
        </ha-tabs>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">Center</h3>
        <ha-tabs value="tab1" align="center">
          <ha-tab-item value="tab1">Home</ha-tab-item>
          <ha-tab-item value="tab2">Profile</ha-tab-item>
          <ha-tab-item value="tab3">Settings</ha-tab-item>
        </ha-tabs>
      </div>

      <div>
        <h3 style="margin-bottom: 8px;">End</h3>
        <ha-tabs value="tab1" align="end">
          <ha-tab-item value="tab1">Home</ha-tab-item>
          <ha-tab-item value="tab2">Profile</ha-tab-item>
          <ha-tab-item value="tab3">Settings</ha-tab-item>
        </ha-tabs>
      </div>
    </div>
  `,
};

export const WithDisabled: Story = {
  render: () => html`
    <ha-tabs value="tab1">
      <ha-tab-item value="tab1">Active Tab</ha-tab-item>
      <ha-tab-item value="tab2" disabled>Disabled Tab</ha-tab-item>
      <ha-tab-item value="tab3">Another Tab</ha-tab-item>
    </ha-tabs>

    <div style="margin-top: 16px;">
      <ha-tab-panel value="tab1" active>
        <p>Content for Active Tab</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab2">
        <p>Content for Disabled Tab (not accessible)</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab3">
        <p>Content for Another Tab</p>
      </ha-tab-panel>
    </div>
  `,
};

export const ManyTabs: Story = {
  render: () => html`
    <ha-tabs value="tab1">
      <ha-tab-item value="tab1">Tab 1</ha-tab-item>
      <ha-tab-item value="tab2">Tab 2</ha-tab-item>
      <ha-tab-item value="tab3">Tab 3</ha-tab-item>
      <ha-tab-item value="tab4">Tab 4</ha-tab-item>
      <ha-tab-item value="tab5">Tab 5</ha-tab-item>
      <ha-tab-item value="tab6">Tab 6</ha-tab-item>
      <ha-tab-item value="tab7">Tab 7</ha-tab-item>
      <ha-tab-item value="tab8">Tab 8</ha-tab-item>
      <ha-tab-item value="tab9">Tab 9</ha-tab-item>
      <ha-tab-item value="tab10">Tab 10</ha-tab-item>
    </ha-tabs>

    <div style="margin-top: 16px;">
      <ha-tab-panel value="tab1" active>
        <p>Content for Tab 1</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab2">
        <p>Content for Tab 2</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab3">
        <p>Content for Tab 3</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab4">
        <p>Content for Tab 4</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab5">
        <p>Content for Tab 5</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab6">
        <p>Content for Tab 6</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab7">
        <p>Content for Tab 7</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab8">
        <p>Content for Tab 8</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab9">
        <p>Content for Tab 9</p>
      </ha-tab-panel>
      <ha-tab-panel value="tab10">
        <p>Content for Tab 10</p>
      </ha-tab-panel>
    </div>
  `,
};

export const DynamicContent: Story = {
  render: () => html`
    <ha-tabs value="dashboard">
      <ha-tab-item value="dashboard">Dashboard</ha-tab-item>
      <ha-tab-item value="analytics">Analytics</ha-tab-item>
      <ha-tab-item value="reports">Reports</ha-tab-item>
      <ha-tab-item value="settings">Settings</ha-tab-item>
    </ha-tabs>

    <div style="margin-top: 16px;">
      <ha-tab-panel value="dashboard" active>
        <h3>Dashboard</h3>
        <p>
          Welcome to your dashboard. Here you can see an overview of your data.
        </p>
        <div
          style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 16px;"
        >
          <div
            style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;"
          >
            <strong>Total Users</strong>
            <p style="font-size: 24px; margin: 8px 0;">1,234</p>
          </div>
          <div
            style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;"
          >
            <strong>Active Sessions</strong>
            <p style="font-size: 24px; margin: 8px 0;">567</p>
          </div>
          <div
            style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;"
          >
            <strong>Revenue</strong>
            <p style="font-size: 24px; margin: 8px 0;">$12,345</p>
          </div>
        </div>
      </ha-tab-panel>

      <ha-tab-panel value="analytics">
        <h3>Analytics</h3>
        <p>View detailed analytics and insights about your application.</p>
        <ul style="margin-top: 16px;">
          <li>User engagement metrics</li>
          <li>Conversion rates</li>
          <li>Traffic sources</li>
          <li>Geographic distribution</li>
        </ul>
      </ha-tab-panel>

      <ha-tab-panel value="reports">
        <h3>Reports</h3>
        <p>Generate and download various reports.</p>
        <div style="margin-top: 16px;">
          <button style="padding: 8px 16px; margin-right: 8px;">
            Monthly Report
          </button>
          <button style="padding: 8px 16px; margin-right: 8px;">
            Quarterly Report
          </button>
          <button style="padding: 8px 16px;">Annual Report</button>
        </div>
      </ha-tab-panel>

      <ha-tab-panel value="settings">
        <h3>Settings</h3>
        <p>Configure your application settings.</p>
        <div style="margin-top: 16px;">
          <label style="display: block; margin-bottom: 8px;">
            <input type="checkbox" checked /> Email notifications
          </label>
          <label style="display: block; margin-bottom: 8px;">
            <input type="checkbox" /> SMS notifications
          </label>
          <label style="display: block; margin-bottom: 8px;">
            <input type="checkbox" checked /> Weekly digest
          </label>
        </div>
      </ha-tab-panel>
    </div>
  `,
};
