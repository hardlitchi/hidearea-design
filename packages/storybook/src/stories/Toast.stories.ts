import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface ToastArgs {
  variant: "info" | "success" | "warning" | "error";
  message: string;
  closable: boolean;
  duration: number;
  showProgress: boolean;
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

const meta: Meta<ToastArgs> = {
  title: "Components/Toast",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
      description: "Toast variant",
    },
    message: {
      control: { type: "text" },
      description: "Toast message",
    },
    closable: {
      control: { type: "boolean" },
      description: "Show close button",
    },
    duration: {
      control: { type: "number" },
      description: "Auto-close duration in milliseconds (0 to disable)",
    },
    showProgress: {
      control: { type: "boolean" },
      description: "Show progress bar",
    },
    position: {
      control: { type: "select" },
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "Toast container position",
    },
  },
  args: {
    variant: "info",
    message: "This is a toast notification",
    closable: true,
    duration: 5000,
    showProgress: false,
    position: "top-right",
  },
};

export default meta;
type Story = StoryObj<ToastArgs>;

/**
 * Default toast with info variant
 */
export const Default: Story = {
  render: (args) => html`
    <button
      @click="${() => {
        const container =
          document.querySelector("ha-toast-container") ||
          (() => {
            const c = document.createElement("ha-toast-container");
            c.setAttribute("position", args.position);
            document.body.appendChild(c);
            return c;
          })();

        const toast = document.createElement("ha-toast");
        toast.setAttribute("variant", args.variant);
        toast.setAttribute("message", args.message);
        if (args.closable) toast.setAttribute("closable", "");
        toast.setAttribute("duration", args.duration.toString());
        if (args.showProgress) toast.setAttribute("show-progress", "");

        container.appendChild(toast);
      }}"
    >
      Show Toast
    </button>
  `,
};

/**
 * All variants
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <button
        @click="${() => {
          const container =
            document.querySelector("ha-toast-container") ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "top-right");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "info");
          toast.setAttribute("message", "This is an info toast");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Show Info Toast
      </button>

      <button
        @click="${() => {
          const container =
            document.querySelector("ha-toast-container") ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "top-right");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "success");
          toast.setAttribute("message", "Operation completed successfully!");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Show Success Toast
      </button>

      <button
        @click="${() => {
          const container =
            document.querySelector("ha-toast-container") ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "top-right");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "warning");
          toast.setAttribute("message", "Warning: Please check your input");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Show Warning Toast
      </button>

      <button
        @click="${() => {
          const container =
            document.querySelector("ha-toast-container") ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "top-right");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "error");
          toast.setAttribute("message", "Error: Something went wrong");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Show Error Toast
      </button>
    </div>
  `,
};

/**
 * With progress bar
 */
export const WithProgress: Story = {
  render: () => html`
    <button
      @click="${() => {
        const container =
          document.querySelector("ha-toast-container") ||
          (() => {
            const c = document.createElement("ha-toast-container");
            c.setAttribute("position", "top-right");
            document.body.appendChild(c);
            return c;
          })();

        const toast = document.createElement("ha-toast");
        toast.setAttribute("variant", "info");
        toast.setAttribute("message", "This toast has a progress bar");
        toast.setAttribute("closable", "");
        toast.setAttribute("duration", "5000");
        toast.setAttribute("show-progress", "");

        container.appendChild(toast);
      }}"
    >
      Show Toast with Progress
    </button>
  `,
};

/**
 * Different positions
 */
export const Positions: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      <button
        @click="${() => {
          const container =
            document.querySelector('[position="top-left"]') ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "top-left");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "info");
          toast.setAttribute("message", "Top Left");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Top Left
      </button>

      <button
        @click="${() => {
          const container =
            document.querySelector('[position="top-center"]') ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "top-center");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "success");
          toast.setAttribute("message", "Top Center");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Top Center
      </button>

      <button
        @click="${() => {
          const container =
            document.querySelector('[position="top-right"]') ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "top-right");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "warning");
          toast.setAttribute("message", "Top Right");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Top Right
      </button>

      <button
        @click="${() => {
          const container =
            document.querySelector('[position="bottom-left"]') ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "bottom-left");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "error");
          toast.setAttribute("message", "Bottom Left");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Bottom Left
      </button>

      <button
        @click="${() => {
          const container =
            document.querySelector('[position="bottom-center"]') ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "bottom-center");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "info");
          toast.setAttribute("message", "Bottom Center");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Bottom Center
      </button>

      <button
        @click="${() => {
          const container =
            document.querySelector('[position="bottom-right"]') ||
            (() => {
              const c = document.createElement("ha-toast-container");
              c.setAttribute("position", "bottom-right");
              document.body.appendChild(c);
              return c;
            })();

          const toast = document.createElement("ha-toast");
          toast.setAttribute("variant", "success");
          toast.setAttribute("message", "Bottom Right");
          toast.setAttribute("closable", "");
          container.appendChild(toast);
        }}"
      >
        Bottom Right
      </button>
    </div>
  `,
};

/**
 * Without auto-close
 */
export const NoAutoClose: Story = {
  render: () => html`
    <button
      @click="${() => {
        const container =
          document.querySelector("ha-toast-container") ||
          (() => {
            const c = document.createElement("ha-toast-container");
            c.setAttribute("position", "top-right");
            document.body.appendChild(c);
            return c;
          })();

        const toast = document.createElement("ha-toast");
        toast.setAttribute("variant", "info");
        toast.setAttribute("message", "This toast won't auto-close");
        toast.setAttribute("closable", "");
        toast.setAttribute("duration", "0");

        container.appendChild(toast);
      }}"
    >
      Show Persistent Toast
    </button>
  `,
};

/**
 * Multiple toasts
 */
export const Multiple: Story = {
  render: () => html`
    <button
      @click="${() => {
        const container =
          document.querySelector("ha-toast-container") ||
          (() => {
            const c = document.createElement("ha-toast-container");
            c.setAttribute("position", "top-right");
            document.body.appendChild(c);
            return c;
          })();

        const variants = ["info", "success", "warning", "error"];
        const messages = [
          "First notification",
          "Second notification",
          "Third notification",
          "Fourth notification",
        ];

        variants.forEach((variant, index) => {
          setTimeout(() => {
            const toast = document.createElement("ha-toast");
            toast.setAttribute("variant", variant);
            toast.setAttribute("message", messages[index]);
            toast.setAttribute("closable", "");
            toast.setAttribute("show-progress", "");
            container.appendChild(toast);
          }, index * 500);
        });
      }}"
    >
      Show Multiple Toasts
    </button>
  `,
};
