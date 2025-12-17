import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface AlertArgs {
  variant: "info" | "success" | "warning" | "error";
  styleVariant: "filled" | "outlined" | "soft";
  title: string;
  message: string;
  closable: boolean;
  showIcon: boolean;
}

const meta: Meta<AlertArgs> = {
  title: "Feedback/Alert",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
      description: "Alert variant",
    },
    styleVariant: {
      control: { type: "select" },
      options: ["filled", "outlined", "soft"],
      description: "Alert style variant",
    },
    title: {
      control: { type: "text" },
      description: "Alert title",
    },
    message: {
      control: { type: "text" },
      description: "Alert message",
    },
    closable: {
      control: { type: "boolean" },
      description: "Show close button",
    },
    showIcon: {
      control: { type: "boolean" },
      description: "Show icon",
    },
  },
  args: {
    variant: "info",
    styleVariant: "soft",
    title: "",
    message: "This is an alert message",
    closable: false,
    showIcon: true,
  },
  render: (args) => html`
    <ha-alert
      variant="${args.variant}"
      style-variant="${args.styleVariant}"
      title="${args.title}"
      ?closable="${args.closable}"
      ?show-icon="${args.showIcon}"
    >
      ${args.message}
    </ha-alert>
  `,
};

export default meta;
type Story = StoryObj<AlertArgs>;

/**
 * Default alert with info variant
 */
export const Default: Story = {};

/**
 * Info variant alerts in different styles
 */
export const InfoVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert variant="info" style-variant="filled" show-icon>
        This is a filled info alert
      </ha-alert>
      <ha-alert variant="info" style-variant="outlined" show-icon>
        This is an outlined info alert
      </ha-alert>
      <ha-alert variant="info" style-variant="soft" show-icon>
        This is a soft info alert
      </ha-alert>
    </div>
  `,
};

/**
 * Success variant alerts in different styles
 */
export const SuccessVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert variant="success" style-variant="filled" show-icon>
        This is a filled success alert
      </ha-alert>
      <ha-alert variant="success" style-variant="outlined" show-icon>
        This is an outlined success alert
      </ha-alert>
      <ha-alert variant="success" style-variant="soft" show-icon>
        This is a soft success alert
      </ha-alert>
    </div>
  `,
};

/**
 * Warning variant alerts in different styles
 */
export const WarningVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert variant="warning" style-variant="filled" show-icon>
        This is a filled warning alert
      </ha-alert>
      <ha-alert variant="warning" style-variant="outlined" show-icon>
        This is an outlined warning alert
      </ha-alert>
      <ha-alert variant="warning" style-variant="soft" show-icon>
        This is a soft warning alert
      </ha-alert>
    </div>
  `,
};

/**
 * Error variant alerts in different styles
 */
export const ErrorVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert variant="error" style-variant="filled" show-icon>
        This is a filled error alert
      </ha-alert>
      <ha-alert variant="error" style-variant="outlined" show-icon>
        This is an outlined error alert
      </ha-alert>
      <ha-alert variant="error" style-variant="soft" show-icon>
        This is a soft error alert
      </ha-alert>
    </div>
  `,
};

/**
 * All variants in soft style
 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert variant="info" style-variant="soft" show-icon>
        Info: This is an informational message
      </ha-alert>
      <ha-alert variant="success" style-variant="soft" show-icon>
        Success: Your action was completed successfully
      </ha-alert>
      <ha-alert variant="warning" style-variant="soft" show-icon>
        Warning: Please review this information carefully
      </ha-alert>
      <ha-alert variant="error" style-variant="soft" show-icon>
        Error: Something went wrong
      </ha-alert>
    </div>
  `,
};

/**
 * Alert with title
 */
export const WithTitle: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert
        variant="info"
        style-variant="soft"
        title="Information"
        show-icon
      >
        This alert has a title and a longer message that provides more details.
      </ha-alert>
      <ha-alert
        variant="success"
        style-variant="soft"
        title="Success!"
        show-icon
      >
        Your profile has been updated successfully.
      </ha-alert>
      <ha-alert
        variant="warning"
        style-variant="soft"
        title="Warning"
        show-icon
      >
        Your session will expire in 5 minutes.
      </ha-alert>
      <ha-alert variant="error" style-variant="soft" title="Error" show-icon>
        Failed to save changes. Please try again.
      </ha-alert>
    </div>
  `,
};

/**
 * Alert without icon
 */
export const WithoutIcon: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert variant="info" style-variant="soft" show-icon="false">
        This is an alert without an icon
      </ha-alert>
      <ha-alert
        variant="success"
        style-variant="soft"
        title="Success"
        show-icon="false"
      >
        Your action was completed successfully
      </ha-alert>
    </div>
  `,
};

/**
 * Closable alerts
 */
export const Closable: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert variant="info" style-variant="soft" closable show-icon>
        This alert can be closed
      </ha-alert>
      <ha-alert
        variant="success"
        style-variant="soft"
        title="Success"
        closable
        show-icon
      >
        Your profile has been updated successfully
      </ha-alert>
      <ha-alert variant="warning" style-variant="outlined" closable show-icon>
        This is a closable warning alert
      </ha-alert>
      <ha-alert variant="error" style-variant="filled" closable show-icon>
        This is a closable error alert
      </ha-alert>
    </div>
  `,
};

/**
 * Alert with custom title slot
 */
export const CustomTitleSlot: Story = {
  render: () => html`
    <ha-alert variant="info" style-variant="soft" show-icon>
      <strong slot="title">Custom Title with <em>HTML</em></strong>
      This alert uses a custom title slot with HTML formatting.
    </ha-alert>
  `,
};

/**
 * Alert with custom icon
 */
export const CustomIcon: Story = {
  render: () => html`
    <ha-alert variant="info" style-variant="soft">
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        style="width: 20px; height: 20px;"
      >
        <path
          d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"
        />
      </svg>
      This alert uses a custom icon (sun)
    </ha-alert>
  `,
};

/**
 * Alert with action buttons
 */
export const WithActions: Story = {
  render: () => html`
    <ha-alert
      variant="info"
      style-variant="soft"
      title="Update Available"
      show-icon
    >
      A new version of the application is available.
      <div slot="actions">
        <ha-button size="sm" variant="outline">Dismiss</ha-button>
        <ha-button size="sm" variant="primary">Update Now</ha-button>
      </div>
    </ha-alert>
  `,
};

/**
 * Complex alert example
 */
export const ComplexExample: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert
        variant="success"
        style-variant="soft"
        title="Payment Successful"
        closable
        show-icon
      >
        Your payment of $99.99 has been processed successfully. A confirmation
        email has been sent to your registered email address.
        <div slot="actions">
          <ha-button size="sm" variant="outline">View Receipt</ha-button>
        </div>
      </ha-alert>

      <ha-alert
        variant="warning"
        style-variant="outlined"
        title="Action Required"
        closable
        show-icon
      >
        Your account will be suspended in 3 days due to unpaid invoices. Please
        update your payment method.
        <div slot="actions">
          <ha-button size="sm" variant="outline">Remind Me Later</ha-button>
          <ha-button size="sm" variant="primary">Update Payment</ha-button>
        </div>
      </ha-alert>

      <ha-alert
        variant="error"
        style-variant="filled"
        title="Connection Error"
        closable
        show-icon
      >
        Unable to connect to the server. Please check your internet connection
        and try again.
        <div slot="actions">
          <ha-button size="sm" variant="ghost">Retry</ha-button>
        </div>
      </ha-alert>
    </div>
  `,
};

/**
 * All style variants comparison
 */
export const StyleVariantsComparison: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;"
    >
      <div>
        <h3 style="margin-top: 0;">Filled</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <ha-alert variant="info" style-variant="filled" show-icon
            >Info</ha-alert
          >
          <ha-alert variant="success" style-variant="filled" show-icon
            >Success</ha-alert
          >
          <ha-alert variant="warning" style-variant="filled" show-icon
            >Warning</ha-alert
          >
          <ha-alert variant="error" style-variant="filled" show-icon
            >Error</ha-alert
          >
        </div>
      </div>
      <div>
        <h3 style="margin-top: 0;">Outlined</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <ha-alert variant="info" style-variant="outlined" show-icon
            >Info</ha-alert
          >
          <ha-alert variant="success" style-variant="outlined" show-icon
            >Success</ha-alert
          >
          <ha-alert variant="warning" style-variant="outlined" show-icon
            >Warning</ha-alert
          >
          <ha-alert variant="error" style-variant="outlined" show-icon
            >Error</ha-alert
          >
        </div>
      </div>
      <div>
        <h3 style="margin-top: 0;">Soft</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <ha-alert variant="info" style-variant="soft" show-icon
            >Info</ha-alert
          >
          <ha-alert variant="success" style-variant="soft" show-icon
            >Success</ha-alert
          >
          <ha-alert variant="warning" style-variant="soft" show-icon
            >Warning</ha-alert
          >
          <ha-alert variant="error" style-variant="soft" show-icon
            >Error</ha-alert
          >
        </div>
      </div>
    </div>
  `,
};

/**
 * Info variant alerts in different styles
 */
export const Test: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-alert variant="info" style-variant="filled" show-icon>
        Test alert
      </ha-alert>
    </div>
  `,
};
