import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { expect, fn, userEvent, within } from "@storybook/test";
import { html } from "lit";
import "@hidearea-design/core";

interface ListArgs {
  bordered: boolean;
  hoverable: boolean;
  divided: boolean;
}

const meta: Meta<ListArgs> = {
  title: "Data Display/List",
  tags: ["autodocs"],
  argTypes: {
    bordered: {
      control: { type: "boolean" },
      description: "Enable borders around list",
    },
    hoverable: {
      control: { type: "boolean" },
      description: "Enable hover effect on items",
    },
    divided: {
      control: { type: "boolean" },
      description: "Show dividers between items",
    },
  },
  args: {
    bordered: false,
    hoverable: false,
    divided: false,
  },
  render: (args) => html`
    <ha-list
      ?bordered="${args.bordered}"
      ?hoverable="${args.hoverable}"
      ?divided="${args.divided}"
    >
      <ha-list-item>First item</ha-list-item>
      <ha-list-item>Second item</ha-list-item>
      <ha-list-item>Third item</ha-list-item>
      <ha-list-item>Fourth item</ha-list-item>
    </ha-list>
  `,
};

export default meta;
type Story = StoryObj<ListArgs>;

/**
 * Default list
 */
export const Default: Story = {
  render: (args) => html`
    <ha-list
      id="test-list"
      ?bordered="${args.bordered}"
      ?hoverable="${args.hoverable}"
      ?divided="${args.divided}"
    >
      <ha-list-item>First item</ha-list-item>
      <ha-list-item>Second item</ha-list-item>
      <ha-list-item>Third item</ha-list-item>
      <ha-list-item>Fourth item</ha-list-item>
    </ha-list>
  `,
  play: async ({ canvasElement, step }) => {
    await step("List should be present", async () => {
      const list = canvasElement.querySelector("#test-list");
      await expect(list).toBeTruthy();
    });
    await step("List should have correct number of items", async () => {
      const items = canvasElement.querySelectorAll("ha-list-item");
      await expect(items.length).toBe(4);
    });
  },
};

/**
 * Bordered list with border around it
 */
export const Bordered: Story = {
  args: {
    bordered: true,
  },
};

/**
 * Hoverable list with hover effects
 */
export const Hoverable: Story = {
  args: {
    hoverable: true,
  },
};

/**
 * Divided list with dividers between items
 */
export const Divided: Story = {
  args: {
    divided: true,
  },
};

/**
 * List with prefix and suffix slots
 */
export const WithPrefixSuffix: Story = {
  render: () => html`
    <ha-list bordered divided hoverable>
      <ha-list-item>
        <span slot="prefix">📧</span>
        <span>Messages</span>
        <ha-badge slot="suffix" variant="primary" size="sm">5</ha-badge>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">🔔</span>
        <span>Notifications</span>
        <ha-badge slot="suffix" variant="warning" size="sm">12</ha-badge>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">⭐</span>
        <span>Favorites</span>
        <ha-badge slot="suffix" variant="info" size="sm">3</ha-badge>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">📝</span>
        <span>Tasks</span>
        <ha-badge slot="suffix" variant="success" size="sm">8</ha-badge>
      </ha-list-item>
    </ha-list>
  `,
};

/**
 * List with active and disabled states
 */
export const States: Story = {
  render: () => html`
    <ha-list bordered divided hoverable>
      <ha-list-item active>Active item</ha-list-item>
      <ha-list-item>Normal item</ha-list-item>
      <ha-list-item disabled>Disabled item</ha-list-item>
      <ha-list-item>Another normal item</ha-list-item>
    </ha-list>
  `,
};

/**
 * User list example
 */
export const UserList: Story = {
  render: () => html`
    <ha-list bordered divided hoverable>
      <ha-list-item>
        <ha-avatar slot="prefix" initials="JD" size="md"></ha-avatar>
        <div>
          <div style="font-weight: 600;">John Doe</div>
          <div style="font-size: 0.875rem; color: #666;">john@example.com</div>
        </div>
        <ha-badge slot="suffix" variant="success" size="sm" dot></ha-badge>
      </ha-list-item>
      <ha-list-item>
        <ha-avatar slot="prefix" initials="JS" size="md"></ha-avatar>
        <div>
          <div style="font-weight: 600;">Jane Smith</div>
          <div style="font-size: 0.875rem; color: #666;">jane@example.com</div>
        </div>
        <ha-badge slot="suffix" variant="warning" size="sm" dot></ha-badge>
      </ha-list-item>
      <ha-list-item>
        <ha-avatar slot="prefix" initials="BJ" size="md"></ha-avatar>
        <div>
          <div style="font-weight: 600;">Bob Johnson</div>
          <div style="font-size: 0.875rem; color: #666;">bob@example.com</div>
        </div>
        <ha-badge slot="suffix" variant="error" size="sm" dot></ha-badge>
      </ha-list-item>
    </ha-list>
  `,
};

/**
 * Settings list example
 */
export const SettingsList: Story = {
  render: () => html`
    <ha-list bordered divided hoverable>
      <ha-list-item>
        <span slot="prefix">🔒</span>
        <div>
          <div style="font-weight: 600;">Privacy & Security</div>
          <div style="font-size: 0.875rem; color: #666;">Manage your privacy settings</div>
        </div>
        <span slot="suffix">→</span>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">🔔</span>
        <div>
          <div style="font-weight: 600;">Notifications</div>
          <div style="font-size: 0.875rem; color: #666;">Configure notification preferences</div>
        </div>
        <span slot="suffix">→</span>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">🎨</span>
        <div>
          <div style="font-weight: 600;">Appearance</div>
          <div style="font-size: 0.875rem; color: #666;">Customize theme and colors</div>
        </div>
        <span slot="suffix">→</span>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">💳</span>
        <div>
          <div style="font-weight: 600;">Billing</div>
          <div style="font-size: 0.875rem; color: #666;">Manage subscription and payment</div>
        </div>
        <span slot="suffix">→</span>
      </ha-list-item>
    </ha-list>
  `,
};

/**
 * Menu list example
 */
export const MenuList: Story = {
  render: () => html`
    <ha-list bordered hoverable>
      <ha-list-item>
        <span slot="prefix">🏠</span>
        <span>Home</span>
        <span slot="suffix">⌘H</span>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">📊</span>
        <span>Dashboard</span>
        <span slot="suffix">⌘D</span>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">📁</span>
        <span>Projects</span>
        <span slot="suffix">⌘P</span>
      </ha-list-item>
      <ha-list-divider></ha-list-divider>
      <ha-list-item>
        <span slot="prefix">⚙️</span>
        <span>Settings</span>
        <span slot="suffix">⌘,</span>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">❓</span>
        <span>Help</span>
        <span slot="suffix">⌘?</span>
      </ha-list-item>
      <ha-list-divider></ha-list-divider>
      <ha-list-item>
        <span slot="prefix">🚪</span>
        <span>Logout</span>
        <span slot="suffix">⌘Q</span>
      </ha-list-item>
    </ha-list>
  `,
};

/**
 * File list example
 */
export const FileList: Story = {
  render: () => html`
    <ha-list bordered divided hoverable>
      <ha-list-item>
        <span slot="prefix">📄</span>
        <div>
          <div style="font-weight: 600;">Document.pdf</div>
          <div style="font-size: 0.875rem; color: #666;">2.4 MB • Modified 2 hours ago</div>
        </div>
        <ha-button slot="suffix" size="sm" variant="ghost">⋮</ha-button>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">📊</span>
        <div>
          <div style="font-weight: 600;">Spreadsheet.xlsx</div>
          <div style="font-size: 0.875rem; color: #666;">1.8 MB • Modified 1 day ago</div>
        </div>
        <ha-button slot="suffix" size="sm" variant="ghost">⋮</ha-button>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">🖼️</span>
        <div>
          <div style="font-weight: 600;">Image.png</div>
          <div style="font-size: 0.875rem; color: #666;">512 KB • Modified 3 days ago</div>
        </div>
        <ha-button slot="suffix" size="sm" variant="ghost">⋮</ha-button>
      </ha-list-item>
      <ha-list-item>
        <span slot="prefix">📁</span>
        <div>
          <div style="font-weight: 600;">Folder</div>
          <div style="font-size: 0.875rem; color: #666;">15 items • Modified 1 week ago</div>
        </div>
        <ha-button slot="suffix" size="sm" variant="ghost">⋮</ha-button>
      </ha-list-item>
    </ha-list>
  `,
};

/**
 * Interactive list with click events
 */
export const Interactive: Story = {
  render: () => html`
    <ha-list bordered divided hoverable>
      <ha-list-item
        @list-item-click="${() => alert('Item 1 clicked')}"
      >
        <span slot="prefix">1</span>
        <span>Click me!</span>
      </ha-list-item>
      <ha-list-item
        @list-item-click="${() => alert('Item 2 clicked')}"
      >
        <span slot="prefix">2</span>
        <span>Click me too!</span>
      </ha-list-item>
      <ha-list-item
        disabled
        @list-item-click="${() => alert('This should not fire')}"
      >
        <span slot="prefix">3</span>
        <span>I'm disabled</span>
      </ha-list-item>
    </ha-list>
  `,
};
