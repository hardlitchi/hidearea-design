import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface CardArgs {
  variant: "default" | "outlined" | "elevated";
  padding: "none" | "sm" | "md" | "lg";
  hoverable: boolean;
  clickable: boolean;
}

const meta: Meta<CardArgs> = {
  title: "Components/Card",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outlined", "elevated"],
      description: "Card variant",
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
      description: "Card padding",
    },
    hoverable: {
      control: { type: "boolean" },
      description: "Enable hover effect",
    },
    clickable: {
      control: { type: "boolean" },
      description: "Enable clickable state",
    },
  },
  args: {
    variant: "default",
    padding: "md",
    hoverable: false,
    clickable: false,
  },
  render: (args) => html`
    <ha-card
      variant="${args.variant}"
      padding="${args.padding}"
      ?hoverable="${args.hoverable}"
      ?clickable="${args.clickable}"
    >
      <h3 slot="header">Card Title</h3>
      <p>This is the card content. It can contain any HTML elements.</p>
      <div slot="footer">
        <ha-button size="sm" variant="outline">Cancel</ha-button>
        <ha-button size="sm" variant="primary">Confirm</ha-button>
      </div>
    </ha-card>
  `,
};

export default meta;
type Story = StoryObj<CardArgs>;

/**
 * Default card with medium padding
 */
export const Default: Story = {};

/**
 * All card variants
 */
export const AllVariants: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;"
    >
      <ha-card variant="default">
        <h3 slot="header">Default</h3>
        <p>Default variant with border.</p>
      </ha-card>
      <ha-card variant="outlined">
        <h3 slot="header">Outlined</h3>
        <p>Outlined variant with thicker border.</p>
      </ha-card>
      <ha-card variant="elevated">
        <h3 slot="header">Elevated</h3>
        <p>Elevated variant with shadow.</p>
      </ha-card>
    </div>
  `,
};

/**
 * Different padding sizes
 */
export const PaddingSizes: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;"
    >
      <ha-card padding="sm">
        <h3 slot="header">Small Padding</h3>
        <p>Card with small padding.</p>
      </ha-card>
      <ha-card padding="md">
        <h3 slot="header">Medium Padding</h3>
        <p>Card with medium padding (default).</p>
      </ha-card>
      <ha-card padding="lg">
        <h3 slot="header">Large Padding</h3>
        <p>Card with large padding.</p>
      </ha-card>
      <ha-card padding="none">
        <h3 slot="header" style="padding: 1rem;">No Padding</h3>
        <p style="padding: 0 1rem 1rem 1rem;">
          Card with no padding. You need to add padding manually.
        </p>
      </ha-card>
    </div>
  `,
};

/**
 * Hoverable cards
 */
export const Hoverable: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;"
    >
      <ha-card variant="default" hoverable>
        <h3 slot="header">Hoverable Default</h3>
        <p>Hover over me to see the effect.</p>
      </ha-card>
      <ha-card variant="outlined" hoverable>
        <h3 slot="header">Hoverable Outlined</h3>
        <p>Hover over me to see the effect.</p>
      </ha-card>
      <ha-card variant="elevated" hoverable>
        <h3 slot="header">Hoverable Elevated</h3>
        <p>Hover over me to see the effect.</p>
      </ha-card>
    </div>
  `,
};

/**
 * Clickable cards
 */
export const Clickable: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;"
    >
      <ha-card
        variant="default"
        clickable
        hoverable
        @card-click="${() => alert("Card clicked!")}"
      >
        <h3 slot="header">Clickable Card</h3>
        <p>Click me to trigger an event.</p>
      </ha-card>
      <ha-card
        variant="outlined"
        clickable
        hoverable
        @card-click="${() => alert("Outlined card clicked!")}"
      >
        <h3 slot="header">Clickable Outlined</h3>
        <p>Click me to trigger an event.</p>
      </ha-card>
      <ha-card
        variant="elevated"
        clickable
        hoverable
        @card-click="${() => alert("Elevated card clicked!")}"
      >
        <h3 slot="header">Clickable Elevated</h3>
        <p>Click me to trigger an event.</p>
      </ha-card>
    </div>
  `,
};

/**
 * Card with media
 */
export const WithMedia: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;"
    >
      <ha-card variant="elevated">
        <img
          slot="media"
          src="https://via.placeholder.com/400x200/3b82f6/ffffff?text=Image"
          alt="Placeholder"
        />
        <h3 slot="header">Card with Image</h3>
        <p>This card includes an image in the media slot.</p>
        <div slot="footer">
          <ha-button size="sm" variant="primary" full-width
            >View Details</ha-button
          >
        </div>
      </ha-card>
      <ha-card variant="elevated" padding="none">
        <img
          slot="media"
          src="https://via.placeholder.com/400x200/10b981/ffffff?text=No+Padding"
          alt="Placeholder"
        />
        <div style="padding: 1rem;">
          <h3>No Padding Card</h3>
          <p>Image goes edge-to-edge, content has manual padding.</p>
        </div>
      </ha-card>
      <ha-card variant="elevated" hoverable clickable>
        <img
          slot="media"
          src="https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Hover+Me"
          alt="Placeholder"
        />
        <h3 slot="header">Interactive Card</h3>
        <p>Hoverable and clickable card with image.</p>
      </ha-card>
    </div>
  `,
};

/**
 * Card with only header and footer
 */
export const HeaderAndFooter: Story = {
  render: () => html`
    <ha-card variant="outlined">
      <div
        slot="header"
        style="display: flex; align-items: center; justify-content: space-between; width: 100%;"
      >
        <h3 style="margin: 0;">Settings</h3>
        <ha-badge variant="info" size="sm">3</ha-badge>
      </div>
      <div
        slot="footer"
        style="display: flex; justify-content: flex-end; gap: 0.5rem; width: 100%;"
      >
        <ha-button size="sm" variant="outline">Cancel</ha-button>
        <ha-button size="sm" variant="primary">Save</ha-button>
      </div>
    </ha-card>
  `,
};

/**
 * Product card example
 */
export const ProductCard: Story = {
  render: () => html`
    <div style="max-width: 300px;">
      <ha-card variant="elevated" hoverable clickable padding="none">
        <img
          slot="media"
          src="https://via.placeholder.com/400x300/3b82f6/ffffff?text=Product"
          alt="Product"
        />
        <div style="padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem 0;">Product Name</h3>
          <p style="margin: 0 0 1rem 0; color: #666;">
            Short description of the product goes here.
          </p>
          <div
            style="display: flex; align-items: center; justify-content: space-between;"
          >
            <span style="font-size: 1.5rem; font-weight: bold;">$99.99</span>
            <ha-button size="sm" variant="primary">Add to Cart</ha-button>
          </div>
        </div>
      </ha-card>
    </div>
  `,
};

/**
 * Profile card example
 */
export const ProfileCard: Story = {
  render: () => html`
    <div style="max-width: 350px;">
      <ha-card variant="elevated" padding="lg">
        <div style="text-align: center;">
          <div
            style="
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            margin: 0 auto 1rem auto;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            font-weight: bold;
          "
          >
            JD
          </div>
          <h3 style="margin: 0 0 0.25rem 0;">John Doe</h3>
          <p style="margin: 0 0 1rem 0; color: #666;">Software Engineer</p>
          <div
            style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;"
          >
            <ha-badge variant="primary" size="sm" pill>React</ha-badge>
            <ha-badge variant="primary" size="sm" pill>TypeScript</ha-badge>
            <ha-badge variant="primary" size="sm" pill>Vue</ha-badge>
          </div>
          <ha-button variant="primary" full-width>View Profile</ha-button>
        </div>
      </ha-card>
    </div>
  `,
};

/**
 * Stats card example
 */
export const StatsCard: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;"
    >
      <ha-card variant="elevated" hoverable>
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: #3b82f6;">
            1,234
          </div>
          <div style="color: #666; margin-top: 0.5rem;">Total Users</div>
        </div>
      </ha-card>
      <ha-card variant="elevated" hoverable>
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: #10b981;">
            +12.5%
          </div>
          <div style="color: #666; margin-top: 0.5rem;">Growth</div>
        </div>
      </ha-card>
      <ha-card variant="elevated" hoverable>
        <div style="text-align: center;">
          <div style="font-size: 2rem; font-weight: bold; color: #f59e0b;">
            $45.2K
          </div>
          <div style="color: #666; margin-top: 0.5rem;">Revenue</div>
        </div>
      </ha-card>
    </div>
  `,
};

/**
 * Complex dashboard card
 */
export const DashboardCard: Story = {
  render: () => html`
    <ha-card variant="elevated">
      <div
        slot="header"
        style="display: flex; align-items: center; justify-content: space-between; width: 100%;"
      >
        <h3 style="margin: 0;">Recent Activity</h3>
        <ha-badge variant="success" size="sm" pill dot></ha-badge>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div
          style="display: flex; gap: 1rem; padding: 0.75rem; background: #f5f5f5; border-radius: 0.5rem;"
        >
          <div
            style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #3b82f6;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          "
          >
            A
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 500;">New user registered</div>
            <div style="font-size: 0.875rem; color: #666;">2 minutes ago</div>
          </div>
        </div>
        <div
          style="display: flex; gap: 1rem; padding: 0.75rem; background: #f5f5f5; border-radius: 0.5rem;"
        >
          <div
            style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #10b981;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          "
          >
            B
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 500;">Payment received</div>
            <div style="font-size: 0.875rem; color: #666;">15 minutes ago</div>
          </div>
        </div>
        <div
          style="display: flex; gap: 1rem; padding: 0.75rem; background: #f5f5f5; border-radius: 0.5rem;"
        >
          <div
            style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #8b5cf6;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          "
          >
            C
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 500;">New comment posted</div>
            <div style="font-size: 0.875rem; color: #666;">1 hour ago</div>
          </div>
        </div>
      </div>
      <div slot="footer" style="width: 100%;">
        <ha-button variant="outline" size="sm" full-width
          >View All Activity</ha-button
        >
      </div>
    </ha-card>
  `,
};

/**
 * Grid of cards
 */
export const CardGrid: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;"
    >
      <ha-card variant="elevated" hoverable clickable>
        <h3 slot="header">Card 1</h3>
        <p>Content for card 1.</p>
      </ha-card>
      <ha-card variant="elevated" hoverable clickable>
        <h3 slot="header">Card 2</h3>
        <p>Content for card 2.</p>
      </ha-card>
      <ha-card variant="elevated" hoverable clickable>
        <h3 slot="header">Card 3</h3>
        <p>Content for card 3.</p>
      </ha-card>
      <ha-card variant="elevated" hoverable clickable>
        <h3 slot="header">Card 4</h3>
        <p>Content for card 4.</p>
      </ha-card>
      <ha-card variant="elevated" hoverable clickable>
        <h3 slot="header">Card 5</h3>
        <p>Content for card 5.</p>
      </ha-card>
      <ha-card variant="elevated" hoverable clickable>
        <h3 slot="header">Card 6</h3>
        <p>Content for card 6.</p>
      </ha-card>
    </div>
  `,
};
