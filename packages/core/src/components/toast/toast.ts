import { toastStyles } from "./toast.styles";

/**
 * Toast/Notification component
 *
 * @element ha-toast
 *
 * @attr {string} variant - Toast variant: info, success, warning, error
 * @attr {string} message - Toast message
 * @attr {boolean} closable - Show close button
 * @attr {number} duration - Auto close duration in milliseconds (0 = no auto close)
 * @attr {boolean} show-progress - Show progress bar
 *
 * @slot - Toast message content
 * @slot icon - Custom icon
 * @slot action - Action button
 *
 * @fires toast-close - Emitted when toast closes
 *
 * @csspart container - The toast container
 * @csspart icon - The icon section
 * @csspart content - The content section
 * @csspart message - The message text
 * @csspart action - The action section
 * @csspart close - The close button
 * @csspart progress - The progress bar
 */
export class HaToast extends HTMLElement {
  private containerElement: HTMLDivElement;
  private iconElement: HTMLDivElement;
  private messageElement: HTMLDivElement;
  private progressBar: HTMLDivElement | null = null;
  private timeoutId?: number;
  private progressStartTime?: number;

  static get observedAttributes() {
    return ["variant", "message", "closable", "duration", "show-progress"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = toastStyles;

    // Create container
    this.containerElement = document.createElement("div");
    this.containerElement.className = "container";
    this.containerElement.setAttribute("part", "container");
    this.containerElement.setAttribute("role", "alert");

    // Create icon
    this.iconElement = document.createElement("div");
    this.iconElement.className = "icon";
    this.iconElement.setAttribute("part", "icon");

    const iconSlot = document.createElement("slot");
    iconSlot.name = "icon";
    this.iconElement.appendChild(iconSlot);

    // Create content
    const contentElement = document.createElement("div");
    contentElement.className = "content";
    contentElement.setAttribute("part", "content");

    this.messageElement = document.createElement("div");
    this.messageElement.className = "message";
    this.messageElement.setAttribute("part", "message");

    const messageSlot = document.createElement("slot");
    this.messageElement.appendChild(messageSlot);

    contentElement.appendChild(this.messageElement);

    // Create action
    const actionElement = document.createElement("div");
    actionElement.className = "action";
    actionElement.setAttribute("part", "action");

    const actionSlot = document.createElement("slot");
    actionSlot.name = "action";
    actionElement.appendChild(actionSlot);

    // Assemble
    this.containerElement.appendChild(this.iconElement);
    this.containerElement.appendChild(contentElement);
    this.containerElement.appendChild(actionElement);

    shadow.appendChild(style);
    shadow.appendChild(this.containerElement);
  }

  connectedCallback() {
    this.render();

    const duration = parseInt(this.getAttribute("duration") || "0");
    if (duration > 0) {
      this.startAutoClose(duration);
    }
  }

  disconnectedCallback() {
    this.clearAutoClose();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.render();
  }

  private startAutoClose(duration: number) {
    this.progressStartTime = Date.now();
    this.timeoutId = window.setTimeout(() => {
      this.close();
    }, duration);

    if (this.hasAttribute("show-progress") && this.progressBar) {
      this.updateProgress(duration);
    }
  }

  private updateProgress(duration: number) {
    if (!this.progressStartTime || !this.progressBar) return;

    const elapsed = Date.now() - this.progressStartTime;
    const remaining = Math.max(0, duration - elapsed);
    const percentage = ((duration - remaining) / duration) * 100;

    this.progressBar.style.width = `${percentage}%`;

    if (remaining > 0) {
      requestAnimationFrame(() => this.updateProgress(duration));
    }
  }

  private clearAutoClose() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  private handleClose() {
    this.close();
  }

  public close() {
    this.clearAutoClose();
    this.setAttribute("closing", "");

    setTimeout(() => {
      this.emit("toast-close");
      this.remove();
    }, 200);
  }

  private emit(eventName: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private getDefaultIcon(): string {
    const variant = this.getAttribute("variant") || "info";
    const icons: Record<string, string> = {
      info: "ℹ️",
      success: "✓",
      warning: "⚠",
      error: "✕",
    };
    return icons[variant] || icons.info;
  }

  private render() {
    const message = this.getAttribute("message");
    const isClosable = this.hasAttribute("closable");
    const showProgress = this.hasAttribute("show-progress");
    const duration = parseInt(this.getAttribute("duration") || "0");

    // Update message if attribute is set
    if (message) {
      this.messageElement.textContent = message;
    }

    // Update icon with default
    const iconSlot = this.iconElement.querySelector("slot") as HTMLSlotElement;
    if (iconSlot && iconSlot.assignedNodes().length === 0) {
      const defaultIcon = document.createTextNode(this.getDefaultIcon());
      iconSlot.appendChild(defaultIcon);
    }

    // Add/remove close button
    const existingCloseButton = this.containerElement.querySelector(".close-button");
    if (isClosable && !existingCloseButton) {
      const closeButton = document.createElement("button");
      closeButton.className = "close-button";
      closeButton.setAttribute("part", "close");
      closeButton.setAttribute("aria-label", "Close");
      closeButton.textContent = "×";
      closeButton.addEventListener("click", () => this.handleClose());
      this.containerElement.appendChild(closeButton);
    } else if (!isClosable && existingCloseButton) {
      existingCloseButton.remove();
    }

    // Add/remove progress bar
    const existingProgress = this.shadowRoot?.querySelector(".progress");
    if (showProgress && duration > 0 && !existingProgress) {
      const progress = document.createElement("div");
      progress.className = "progress";
      progress.setAttribute("part", "progress");

      this.progressBar = document.createElement("div");
      this.progressBar.className = "progress-bar";
      progress.appendChild(this.progressBar);

      this.shadowRoot?.appendChild(progress);
    } else if ((!showProgress || duration === 0) && existingProgress) {
      existingProgress.remove();
      this.progressBar = null;
    }
  }
}

// Register the custom element
customElements.define("ha-toast", HaToast);
