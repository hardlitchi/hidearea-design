import { alertStyles } from "./alert.styles";

/**
 * Alert component
 *
 * @element ha-alert
 *
 * @attr {string} variant - Alert variant: info, success, warning, error
 * @attr {string} style-variant - Alert style: filled, outlined, soft
 * @attr {string} title - Alert title
 * @attr {boolean} closable - Show close button
 * @attr {boolean} show-icon - Show icon
 *
 * @slot - Alert message content
 * @slot title - Custom title content
 * @slot icon - Custom icon
 * @slot actions - Action buttons
 *
 * @fires alert-close - Emitted when alert is closed
 *
 * @cssprop --ha-alert-padding - Alert padding
 * @cssprop --ha-alert-gap - Gap between icon and content
 *
 * @csspart alert - The alert container
 * @csspart icon - The icon container
 * @csspart content - The content container
 * @csspart title - The title element
 * @csspart message - The message element
 * @csspart close - The close button
 * @csspart actions - The actions container
 */
export class HaAlert extends HTMLElement {
  private alertElement: HTMLDivElement;
  private iconSlot: HTMLSlotElement;
  private titleSlot: HTMLSlotElement;
  private messageSlot: HTMLSlotElement;
  private actionsSlot: HTMLSlotElement;
  private closeButton: HTMLButtonElement;

  static get observedAttributes() {
    return ["variant", "style-variant", "title", "closable", "show-icon"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = alertStyles;

    // Create alert container
    this.alertElement = document.createElement("div");
    this.alertElement.className = "alert";
    this.alertElement.setAttribute("part", "alert");
    this.alertElement.setAttribute("role", "alert");

    // Create icon container
    const iconContainer = document.createElement("div");
    iconContainer.className = "alert__icon";
    iconContainer.setAttribute("part", "icon");

    this.iconSlot = document.createElement("slot");
    this.iconSlot.name = "icon";
    iconContainer.appendChild(this.iconSlot);

    // Create content container
    const contentContainer = document.createElement("div");
    contentContainer.className = "alert__content";
    contentContainer.setAttribute("part", "content");

    // Create title
    const titleContainer = document.createElement("div");
    titleContainer.className = "alert__title";
    titleContainer.setAttribute("part", "title");

    this.titleSlot = document.createElement("slot");
    this.titleSlot.name = "title";
    titleContainer.appendChild(this.titleSlot);

    // Create message
    const messageContainer = document.createElement("div");
    messageContainer.className = "alert__message";
    messageContainer.setAttribute("part", "message");

    this.messageSlot = document.createElement("slot");
    messageContainer.appendChild(this.messageSlot);

    // Create actions
    const actionsContainer = document.createElement("div");
    actionsContainer.className = "alert__actions";
    actionsContainer.setAttribute("part", "actions");

    this.actionsSlot = document.createElement("slot");
    this.actionsSlot.name = "actions";
    actionsContainer.appendChild(this.actionsSlot);

    contentContainer.appendChild(titleContainer);
    contentContainer.appendChild(messageContainer);
    contentContainer.appendChild(actionsContainer);

    // Create close button
    this.closeButton = document.createElement("button");
    this.closeButton.className = "alert__close";
    this.closeButton.setAttribute("part", "close");
    this.closeButton.setAttribute("type", "button");
    this.closeButton.setAttribute("aria-label", "Close alert");
    this.closeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    `;

    this.closeButton.addEventListener("click", () => {
      this.handleClose();
    });

    // Append elements
    this.alertElement.appendChild(iconContainer);
    this.alertElement.appendChild(contentContainer);
    this.alertElement.appendChild(this.closeButton);

    shadow.appendChild(style);
    shadow.appendChild(this.alertElement);

    // Set default icon based on variant
    this.iconSlot.addEventListener("slotchange", () => {
      if (this.iconSlot.assignedElements().length === 0 && this.showIcon) {
        this.setDefaultIcon();
      }
    });

    // Handle title slot
    this.titleSlot.addEventListener("slotchange", () => {
      const titleContainer = this.titleSlot.parentElement;
      if (this.titleSlot.assignedElements().length === 0 && !this.title) {
        titleContainer!.style.display = "none";
      } else {
        titleContainer!.style.display = "block";
      }
    });
  }

  connectedCallback() {
    // Set default attributes
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "info");
    }
    if (!this.hasAttribute("style-variant")) {
      this.setAttribute("style-variant", "soft");
    }

    this.updateAlertClasses();
    this.updateIcon();
    this.updateTitle();
    this.updateCloseButton();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "variant":
      case "style-variant":
        this.updateAlertClasses();
        if (name === "variant") {
          this.updateIcon();
        }
        break;
      case "title":
        this.updateTitle();
        break;
      case "closable":
        this.updateCloseButton();
        break;
      case "show-icon":
        this.updateIcon();
        break;
    }
  }

  private updateAlertClasses() {
    const variant = this.variant;
    const styleVariant = this.styleVariant;

    this.alertElement.className = `alert alert--${styleVariant} alert--${variant}`;
  }

  private updateIcon() {
    const iconContainer = this.iconSlot.parentElement;

    if (!iconContainer) return;

    if (this.showIcon) {
      iconContainer.style.display = "flex";
      if (this.iconSlot.assignedElements().length === 0) {
        this.setDefaultIcon();
      }
    } else {
      iconContainer.style.display = "none";
    }
  }

  private setDefaultIcon() {
    // Remove existing default icon if any
    const existingIcon = this.querySelector('[slot="icon"][data-default]');
    if (existingIcon) {
      existingIcon.remove();
    }

    const iconSvg = document.createElement("span");
    iconSvg.setAttribute("slot", "icon");
    iconSvg.setAttribute("data-default", "true");

    const icons = {
      info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
      </svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
      </svg>`,
      warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>`,
      error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>`,
    };

    iconSvg.innerHTML = icons[this.variant as keyof typeof icons] || icons.info;
    this.appendChild(iconSvg);
  }

  private updateTitle() {
    const titleContainer = this.titleSlot.parentElement;
    if (!titleContainer) return;

    if (this.title) {
      // Remove existing text node if any
      const existingText = Array.from(titleContainer.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE,
      );
      if (existingText) {
        existingText.remove();
      }

      // Add title as text node
      const textNode = document.createTextNode(this.title);
      titleContainer.insertBefore(textNode, this.titleSlot);
      titleContainer.style.display = "block";
    } else if (this.titleSlot.assignedElements().length === 0) {
      titleContainer.style.display = "none";
    }
  }

  private updateCloseButton() {
    this.closeButton.style.display = this.closable ? "flex" : "none";
  }

  private handleClose() {
    this.dispatchEvent(
      new CustomEvent("alert-close", {
        bubbles: true,
        composed: true,
      }),
    );

    // Default behavior: remove element
    this.remove();
  }

  // Public API
  get variant(): string {
    return this.getAttribute("variant") || "info";
  }

  set variant(value: string) {
    this.setAttribute("variant", value);
  }

  get styleVariant(): string {
    return this.getAttribute("style-variant") || "soft";
  }

  set styleVariant(value: string) {
    this.setAttribute("style-variant", value);
  }

  get title(): string {
    return this.getAttribute("title") || "";
  }

  set title(value: string) {
    if (value) {
      this.setAttribute("title", value);
    } else {
      this.removeAttribute("title");
    }
  }

  get closable(): boolean {
    return this.hasAttribute("closable");
  }

  set closable(value: boolean) {
    if (value) {
      this.setAttribute("closable", "");
    } else {
      this.removeAttribute("closable");
    }
  }

  get showIcon(): boolean {
    return this.hasAttribute("show-icon")
      ? this.getAttribute("show-icon") !== "false"
      : true;
  }

  set showIcon(value: boolean) {
    if (value) {
      this.setAttribute("show-icon", "true");
    } else {
      this.setAttribute("show-icon", "false");
    }
  }

  /**
   * Close the alert
   */
  close() {
    this.handleClose();
  }
}

// Register custom element
customElements.define("ha-alert", HaAlert);
