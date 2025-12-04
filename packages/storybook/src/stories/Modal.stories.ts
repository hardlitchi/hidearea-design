import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface ModalArgs {
  open: boolean;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  variant: "default" | "centered" | "fullscreen";
  closable: boolean;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
  headerContent: string;
  bodyContent: string;
  footerContent: string;
}

const meta: Meta<ModalArgs> = {
  title: "Components/Modal",
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "Open state of the modal",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Modal size",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "centered", "fullscreen"],
      description: "Modal variant",
    },
    closable: {
      control: { type: "boolean" },
      description: "Show close button",
    },
    closeOnBackdrop: {
      control: { type: "boolean" },
      description: "Close when clicking backdrop",
    },
    closeOnEscape: {
      control: { type: "boolean" },
      description: "Close when pressing Escape",
    },
    headerContent: {
      control: { type: "text" },
      description: "Header content",
    },
    bodyContent: {
      control: { type: "text" },
      description: "Body content",
    },
    footerContent: {
      control: { type: "text" },
      description: "Footer content",
    },
  },
  args: {
    open: false,
    size: "md",
    variant: "default",
    closable: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    headerContent: "Modal Title",
    bodyContent: "This is the modal body content. You can put any content here.",
    footerContent: "",
  },
  render: (args) => html`
    <button
      @click="${(e: Event) => {
        const modal = (e.target as HTMLElement).nextElementSibling as any;
        modal?.setAttribute("open", "");
      }}"
    >
      Open Modal
    </button>
    <ha-modal
      ?open="${args.open}"
      size="${args.size}"
      variant="${args.variant}"
      ?closable="${args.closable}"
      ?close-on-backdrop="${args.closeOnBackdrop}"
      ?close-on-escape="${args.closeOnEscape}"
    >
      ${args.headerContent
        ? html`<div slot="header">${args.headerContent}</div>`
        : ""}
      <div>${args.bodyContent}</div>
      ${args.footerContent
        ? html`<div slot="footer">${args.footerContent}</div>`
        : ""}
    </ha-modal>
  `,
};

export default meta;
type Story = StoryObj<ModalArgs>;

/**
 * Default modal with medium size
 */
export const Default: Story = {};

/**
 * All available sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <button
        @click="${(e: Event) => {
          const modal = document.querySelector("#modal-xs") as any;
          modal?.setAttribute("open", "");
        }}"
      >
        Open Extra Small Modal
      </button>
      <button
        @click="${(e: Event) => {
          const modal = document.querySelector("#modal-sm") as any;
          modal?.setAttribute("open", "");
        }}"
      >
        Open Small Modal
      </button>
      <button
        @click="${(e: Event) => {
          const modal = document.querySelector("#modal-md") as any;
          modal?.setAttribute("open", "");
        }}"
      >
        Open Medium Modal
      </button>
      <button
        @click="${(e: Event) => {
          const modal = document.querySelector("#modal-lg") as any;
          modal?.setAttribute("open", "");
        }}"
      >
        Open Large Modal
      </button>
      <button
        @click="${(e: Event) => {
          const modal = document.querySelector("#modal-xl") as any;
          modal?.setAttribute("open", "");
        }}"
      >
        Open Extra Large Modal
      </button>

      <ha-modal id="modal-xs" size="xs" closable close-on-backdrop close-on-escape>
        <div slot="header">Extra Small Modal</div>
        <div>This is an extra small modal.</div>
      </ha-modal>

      <ha-modal id="modal-sm" size="sm" closable close-on-backdrop close-on-escape>
        <div slot="header">Small Modal</div>
        <div>This is a small modal.</div>
      </ha-modal>

      <ha-modal id="modal-md" size="md" closable close-on-backdrop close-on-escape>
        <div slot="header">Medium Modal</div>
        <div>This is a medium modal.</div>
      </ha-modal>

      <ha-modal id="modal-lg" size="lg" closable close-on-backdrop close-on-escape>
        <div slot="header">Large Modal</div>
        <div>This is a large modal with more content space.</div>
      </ha-modal>

      <ha-modal id="modal-xl" size="xl" closable close-on-backdrop close-on-escape>
        <div slot="header">Extra Large Modal</div>
        <div>This is an extra large modal with even more content space.</div>
      </ha-modal>
    </div>
  `,
};

/**
 * Different variants
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <button
        @click="${(e: Event) => {
          const modal = document.querySelector("#modal-default") as any;
          modal?.setAttribute("open", "");
        }}"
      >
        Open Default Modal
      </button>
      <button
        @click="${(e: Event) => {
          const modal = document.querySelector("#modal-centered") as any;
          modal?.setAttribute("open", "");
        }}"
      >
        Open Centered Modal
      </button>
      <button
        @click="${(e: Event) => {
          const modal = document.querySelector("#modal-fullscreen") as any;
          modal?.setAttribute("open", "");
        }}"
      >
        Open Fullscreen Modal
      </button>

      <ha-modal
        id="modal-default"
        variant="default"
        closable
        close-on-backdrop
        close-on-escape
      >
        <div slot="header">Default Modal</div>
        <div>This modal appears at the top of the viewport.</div>
      </ha-modal>

      <ha-modal
        id="modal-centered"
        variant="centered"
        closable
        close-on-backdrop
        close-on-escape
      >
        <div slot="header">Centered Modal</div>
        <div>This modal is centered in the viewport.</div>
      </ha-modal>

      <ha-modal
        id="modal-fullscreen"
        variant="fullscreen"
        closable
        close-on-backdrop
        close-on-escape
      >
        <div slot="header">Fullscreen Modal</div>
        <div>This modal takes up the entire viewport.</div>
      </ha-modal>
    </div>
  `,
};

/**
 * Modal with header, body, and footer
 */
export const WithFooter: Story = {
  render: () => html`
    <button
      @click="${(e: Event) => {
        const modal = document.querySelector("#modal-footer") as any;
        modal?.setAttribute("open", "");
      }}"
    >
      Open Modal
    </button>
    <ha-modal id="modal-footer" closable close-on-backdrop close-on-escape>
      <div slot="header">Confirm Action</div>
      <div>
        <p>Are you sure you want to proceed with this action?</p>
        <p>This action cannot be undone.</p>
      </div>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button
          @click="${(e: Event) => {
            const modal = document.querySelector("#modal-footer") as any;
            modal?.removeAttribute("open");
          }}"
        >
          Cancel
        </button>
        <button
          style="background: var(--color-primary-600); color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;"
          @click="${(e: Event) => {
            const modal = document.querySelector("#modal-footer") as any;
            modal?.removeAttribute("open");
          }}"
        >
          Confirm
        </button>
      </div>
    </ha-modal>
  `,
};

/**
 * Modal without close button
 */
export const NotClosable: Story = {
  args: {
    closable: false,
    footerContent: "You must click a button to close this modal",
  },
  render: (args) => html`
    <button
      @click="${(e: Event) => {
        const modal = document.querySelector("#modal-not-closable") as any;
        modal?.setAttribute("open", "");
      }}"
    >
      Open Modal
    </button>
    <ha-modal
      id="modal-not-closable"
      ?closable="${args.closable}"
      close-on-backdrop="false"
      close-on-escape="false"
    >
      <div slot="header">Cannot Close with X</div>
      <div>This modal doesn't have a close button and won't close on backdrop or escape.</div>
      <div slot="footer">
        <button
          @click="${(e: Event) => {
            const modal = document.querySelector("#modal-not-closable") as any;
            modal?.removeAttribute("open");
          }}"
        >
          Close Modal
        </button>
      </div>
    </ha-modal>
  `,
};

/**
 * Modal with form
 */
export const WithForm: Story = {
  render: () => html`
    <button
      @click="${(e: Event) => {
        const modal = document.querySelector("#modal-form") as any;
        modal?.setAttribute("open", "");
      }}"
    >
      Open Form Modal
    </button>
    <ha-modal id="modal-form" size="md" closable close-on-backdrop close-on-escape>
      <div slot="header">User Information</div>
      <div>
        <form style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label for="name" style="display: block; margin-bottom: 0.25rem;">Name</label>
            <input type="text" id="name" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.25rem;" />
          </div>
          <div>
            <label for="email" style="display: block; margin-bottom: 0.25rem;">Email</label>
            <input type="email" id="email" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.25rem;" />
          </div>
          <div>
            <label for="message" style="display: block; margin-bottom: 0.25rem;">Message</label>
            <textarea id="message" rows="4" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.25rem;"></textarea>
          </div>
        </form>
      </div>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button
          @click="${(e: Event) => {
            const modal = document.querySelector("#modal-form") as any;
            modal?.removeAttribute("open");
          }}"
        >
          Cancel
        </button>
        <button
          style="background: var(--color-primary-600); color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;"
          @click="${(e: Event) => {
            const modal = document.querySelector("#modal-form") as any;
            modal?.removeAttribute("open");
            alert("Form submitted!");
          }}"
        >
          Submit
        </button>
      </div>
    </ha-modal>
  `,
};

/**
 * Long content modal with scrolling
 */
export const LongContent: Story = {
  render: () => html`
    <button
      @click="${(e: Event) => {
        const modal = document.querySelector("#modal-long") as any;
        modal?.setAttribute("open", "");
      }}"
    >
      Open Long Content Modal
    </button>
    <ha-modal id="modal-long" size="md" closable close-on-backdrop close-on-escape>
      <div slot="header">Terms and Conditions</div>
      <div>
        <h3>1. Introduction</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        <h3>2. User Agreement</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

        <h3>3. Privacy Policy</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

        <h3>4. Data Collection</h3>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <h3>5. Cookie Policy</h3>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>

        <h3>6. Terms of Service</h3>
        <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

        <h3>7. Liability</h3>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</p>

        <h3>8. Final Provisions</h3>
        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
      </div>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button
          @click="${(e: Event) => {
            const modal = document.querySelector("#modal-long") as any;
            modal?.removeAttribute("open");
          }}"
        >
          Decline
        </button>
        <button
          style="background: var(--color-primary-600); color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;"
          @click="${(e: Event) => {
            const modal = document.querySelector("#modal-long") as any;
            modal?.removeAttribute("open");
          }}"
        >
          Accept
        </button>
      </div>
    </ha-modal>
  `,
};
