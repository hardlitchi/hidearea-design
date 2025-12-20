import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface DrawerArgs {
  placement: "left" | "right" | "top" | "bottom";
  size: "sm" | "md" | "lg";
  overlay: boolean;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
}

const meta: Meta<DrawerArgs> = {
  title: "Overlays/Drawer",
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"],
      description: "Drawer placement",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Drawer size",
    },
    overlay: {
      control: { type: "boolean" },
      description: "Show backdrop overlay",
    },
    closeOnBackdrop: {
      control: { type: "boolean" },
      description: "Close on backdrop click",
    },
    closeOnEscape: {
      control: { type: "boolean" },
      description: "Close on Escape key",
    },
  },
  args: {
    placement: "right",
    size: "md",
    overlay: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
};

export default meta;
type Story = StoryObj<DrawerArgs>;

/**
 * Default drawer from the right
 */
export const Default: Story = {
  render: (args) => html`
    <button
      id="open-drawer-btn"
      @click="${(e: Event) => {
        const drawer = document.querySelector("#drawer-default") as any;
        drawer?.setAttribute("open", "");
      }}"
    >
      Open Drawer
    </button>
    <ha-drawer
      id="drawer-default"
      placement="${args.placement}"
      size="${args.size}"
      ?overlay="${args.overlay}"
      ?close-on-backdrop="${args.closeOnBackdrop}"
      ?close-on-escape="${args.closeOnEscape}"
    >
      <div slot="header">Drawer Title</div>
      <div>
        <p>This is the drawer content.</p>
        <p>You can put any content here.</p>
      </div>
      <div slot="footer">
        <ha-button
          id="close-drawer-btn"
          size="sm"
          variant="outline"
          @click="${() => {
            const drawer = document.querySelector("#drawer-default") as any;
            drawer?.removeAttribute("open");
          }}"
        >
          Close
        </ha-button>
      </div>
    </ha-drawer>
  `,
  play: async ({ canvasElement, step }) => {
    await step("Open button should be present", async () => {
      const button = canvasElement.querySelector("#open-drawer-btn");
      await expect(button).toBeTruthy();
    });

    await step("Drawer should not be visible initially", async () => {
      const drawer = canvasElement.querySelector("#drawer-default");
      await expect(drawer?.hasAttribute("open")).toBe(false);
    });

    await step("Drawer should have correct attributes", async () => {
      const drawer = canvasElement.querySelector("#drawer-default");
      await expect(drawer?.getAttribute("placement")).toBe("right");
      await expect(drawer?.getAttribute("size")).toBe("md");
    });

    await step("Clicking button should open drawer", async () => {
      const button = canvasElement.querySelector("#open-drawer-btn") as HTMLButtonElement;
      await userEvent.click(button);
      await new Promise(resolve => setTimeout(resolve, 200));

      const drawer = canvasElement.querySelector("#drawer-default");
      await expect(drawer?.hasAttribute("open")).toBe(true);
    });

    await step("Close button should close drawer", async () => {
      const closeBtn = canvasElement.querySelector("#close-drawer-btn") as HTMLElement;
      await userEvent.click(closeBtn);
      await new Promise(resolve => setTimeout(resolve, 200));

      const drawer = canvasElement.querySelector("#drawer-default");
      await expect(drawer?.hasAttribute("open")).toBe(false);
    });
  },
};

/**
 * Drawer placements (left, right, top, bottom)
 */
export const Placements: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <ha-button
        id="open-left-btn"
        @click="${() => {
          const drawer = document.querySelector("#drawer-left") as any;
          drawer?.setAttribute("open", "");
        }}"
      >
        Open Left
      </ha-button>
      <ha-button
        id="open-right-btn"
        @click="${() => {
          const drawer = document.querySelector("#drawer-right") as any;
          drawer?.setAttribute("open", "");
        }}"
      >
        Open Right
      </ha-button>
      <ha-button
        id="open-top-btn"
        @click="${() => {
          const drawer = document.querySelector("#drawer-top") as any;
          drawer?.setAttribute("open", "");
        }}"
      >
        Open Top
      </ha-button>
      <ha-button
        id="open-bottom-btn"
        @click="${() => {
          const drawer = document.querySelector("#drawer-bottom") as any;
          drawer?.setAttribute("open", "");
        }}"
      >
        Open Bottom
      </ha-button>
    </div>

    <ha-drawer id="drawer-left" placement="left" overlay close-on-backdrop close-on-escape>
      <div slot="header">Left Drawer</div>
      <p>This drawer slides in from the left.</p>
    </ha-drawer>

    <ha-drawer id="drawer-right" placement="right" overlay close-on-backdrop close-on-escape>
      <div slot="header">Right Drawer</div>
      <p>This drawer slides in from the right.</p>
    </ha-drawer>

    <ha-drawer id="drawer-top" placement="top" overlay close-on-backdrop close-on-escape>
      <div slot="header">Top Drawer</div>
      <p>This drawer slides in from the top.</p>
    </ha-drawer>

    <ha-drawer id="drawer-bottom" placement="bottom" overlay close-on-backdrop close-on-escape>
      <div slot="header">Bottom Drawer</div>
      <p>This drawer slides in from the bottom.</p>
    </ha-drawer>
  `,
  play: async ({ canvasElement, step }) => {
    await step("All placement drawers should have correct placement attributes", async () => {
      const leftDrawer = canvasElement.querySelector("#drawer-left");
      const rightDrawer = canvasElement.querySelector("#drawer-right");
      const topDrawer = canvasElement.querySelector("#drawer-top");
      const bottomDrawer = canvasElement.querySelector("#drawer-bottom");

      await expect(leftDrawer?.getAttribute("placement")).toBe("left");
      await expect(rightDrawer?.getAttribute("placement")).toBe("right");
      await expect(topDrawer?.getAttribute("placement")).toBe("top");
      await expect(bottomDrawer?.getAttribute("placement")).toBe("bottom");
    });

    await step("Opening left drawer should work", async () => {
      const button = canvasElement.querySelector("#open-left-btn") as HTMLElement;
      await userEvent.click(button);
      await new Promise(resolve => setTimeout(resolve, 200));

      const drawer = canvasElement.querySelector("#drawer-left");
      await expect(drawer?.hasAttribute("open")).toBe(true);
    });
  },
};

/**
 * Drawer sizes (sm, md, lg)
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <ha-button
        @click="${() => {
          const drawer = document.querySelector("#drawer-sm") as any;
          drawer?.setAttribute("open", "");
        }}"
      >
        Small
      </ha-button>
      <ha-button
        @click="${() => {
          const drawer = document.querySelector("#drawer-md") as any;
          drawer?.setAttribute("open", "");
        }}"
      >
        Medium
      </ha-button>
      <ha-button
        @click="${() => {
          const drawer = document.querySelector("#drawer-lg") as any;
          drawer?.setAttribute("open", "");
        }}"
      >
        Large
      </ha-button>
    </div>

    <ha-drawer id="drawer-sm" size="sm" overlay close-on-backdrop close-on-escape>
      <div slot="header">Small Drawer</div>
      <p>This is a small drawer (256px wide).</p>
    </ha-drawer>

    <ha-drawer id="drawer-md" size="md" overlay close-on-backdrop close-on-escape>
      <div slot="header">Medium Drawer</div>
      <p>This is a medium drawer (320px wide).</p>
    </ha-drawer>

    <ha-drawer id="drawer-lg" size="lg" overlay close-on-backdrop close-on-escape>
      <div slot="header">Large Drawer</div>
      <p>This is a large drawer (400px wide).</p>
    </ha-drawer>
  `,
};

/**
 * Navigation drawer example
 */
export const Navigation: Story = {
  render: () => html`
    <ha-button
      @click="${() => {
        const drawer = document.querySelector("#drawer-nav") as any;
        drawer?.setAttribute("open", "");
      }}"
    >
      Open Navigation
    </ha-button>

    <ha-drawer id="drawer-nav" placement="left" overlay close-on-backdrop close-on-escape>
      <div slot="header">
        <h2 style="margin: 0;">Navigation</h2>
      </div>
      <ha-list>
        <ha-list-item>
          <span slot="prefix">🏠</span>
          <span>Home</span>
        </ha-list-item>
        <ha-list-item>
          <span slot="prefix">📊</span>
          <span>Dashboard</span>
        </ha-list-item>
        <ha-list-item>
          <span slot="prefix">⚙️</span>
          <span>Settings</span>
        </ha-list-item>
        <ha-list-divider></ha-list-divider>
        <ha-list-item>
          <span slot="prefix">👤</span>
          <span>Profile</span>
        </ha-list-item>
        <ha-list-item>
          <span slot="prefix">🚪</span>
          <span>Logout</span>
        </ha-list-item>
      </ha-list>
    </ha-drawer>
  `,
};

/**
 * Filter drawer example
 */
export const Filters: Story = {
  render: () => html`
    <ha-button
      @click="${() => {
        const drawer = document.querySelector("#drawer-filters") as any;
        drawer?.setAttribute("open", "");
      }}"
    >
      Open Filters
    </ha-button>

    <ha-drawer id="drawer-filters" placement="right" overlay close-on-backdrop close-on-escape>
      <div slot="header">
        <h2 style="margin: 0;">Filters</h2>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <ha-form-group label="Category">
          <ha-select full-width>
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </ha-select>
        </ha-form-group>
        <ha-form-group label="Price Range">
          <ha-input type="number" placeholder="Min" full-width></ha-input>
          <ha-input type="number" placeholder="Max" full-width></ha-input>
        </ha-form-group>
        <ha-form-group label="Condition">
          <ha-checkbox label="New"></ha-checkbox>
          <ha-checkbox label="Used"></ha-checkbox>
          <ha-checkbox label="Refurbished"></ha-checkbox>
        </ha-form-group>
      </div>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <ha-button
          size="sm"
          variant="outline"
          @click="${() => {
            const drawer = document.querySelector("#drawer-filters") as any;
            drawer?.removeAttribute("open");
          }}"
        >
          Cancel
        </ha-button>
        <ha-button size="sm" variant="primary">Apply Filters</ha-button>
      </div>
    </ha-drawer>
  `,
};

/**
 * Shopping cart drawer example
 */
export const ShoppingCart: Story = {
  render: () => html`
    <ha-button
      @click="${() => {
        const drawer = document.querySelector("#drawer-cart") as any;
        drawer?.setAttribute("open", "");
      }}"
    >
      Open Cart (3 items)
    </ha-button>

    <ha-drawer id="drawer-cart" placement="right" overlay close-on-backdrop close-on-escape>
      <div slot="header">
        <h2 style="margin: 0;">Shopping Cart</h2>
      </div>
      <ha-list divided>
        <ha-list-item>
          <div>
            <strong>Laptop Pro 15</strong>
            <div style="font-size: 0.875rem; color: #666;">Qty: 1 × $1,299.99</div>
          </div>
          <ha-button slot="suffix" size="sm" variant="ghost">Remove</ha-button>
        </ha-list-item>
        <ha-list-item>
          <div>
            <strong>Wireless Mouse</strong>
            <div style="font-size: 0.875rem; color: #666;">Qty: 2 × $29.99</div>
          </div>
          <ha-button slot="suffix" size="sm" variant="ghost">Remove</ha-button>
        </ha-list-item>
        <ha-list-item>
          <div>
            <strong>USB-C Cable</strong>
            <div style="font-size: 0.875rem; color: #666;">Qty: 3 × $12.99</div>
          </div>
          <ha-button slot="suffix" size="sm" variant="ghost">Remove</ha-button>
        </ha-list-item>
      </ha-list>
      <div slot="footer">
        <div style="margin-bottom: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>Subtotal:</span>
            <strong>$1,398.94</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Tax:</span>
            <strong>$139.89</strong>
          </div>
          <hr style="margin: 0.5rem 0;" />
          <div style="display: flex; justify-content: space-between; font-size: 1.125rem;">
            <strong>Total:</strong>
            <strong>$1,538.83</strong>
          </div>
        </div>
        <ha-button variant="primary" full-width>Proceed to Checkout</ha-button>
      </div>
    </ha-drawer>
  `,
};
