import { modalStyles } from "@hidearea-design/tokens/styles";

/**
 * Modal/Dialog component
 *
 * @element ha-modal
 *
 * @attr {boolean} open - Open state
 * @attr {string} size - Modal size: sm, md, lg, xl, full
 * @attr {string} variant - Modal variant: default, centered, fullscreen
 * @attr {boolean} closable - Show close button
 * @attr {boolean} close-on-backdrop - Close when clicking backdrop
 * @attr {boolean} close-on-escape - Close when pressing Escape
 *
 * @slot - Modal body content
 * @slot header - Modal header content
 * @slot footer - Modal footer content
 *
 * @fires modal-open - Emitted when modal opens
 * @fires modal-close - Emitted when modal closes
 * @fires backdrop-click - Emitted when backdrop is clicked
 *
 * @csspart overlay - The overlay/backdrop element
 * @csspart container - The modal container
 * @csspart dialog - The modal dialog
 * @csspart header - The header section
 * @csspart body - The body section
 * @csspart footer - The footer section
 * @csspart close - The close button
 */
export class HaModal extends HTMLElement {
  private overlayElement: HTMLDivElement | null = null;
  private dialogElement: HTMLDivElement | null = null;
  private closeButton: HTMLButtonElement;
  private previousActiveElement: HTMLElement | null = null;
  private handleKeyDownBound: (e: KeyboardEvent) => void;

  static get observedAttributes() {
    return ["open", "size", "variant", "closable", "close-on-backdrop", "close-on-escape"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = modalStyles;

    // Bind event handler
    this.handleKeyDownBound = this.handleKeyDown.bind(this);

    // Create close button
    this.closeButton = document.createElement("button");
    this.closeButton.className = "close-button";
    this.closeButton.setAttribute("part", "close");
    this.closeButton.setAttribute("aria-label", "Close");
    this.closeButton.textContent = "×";
    this.closeButton.addEventListener("click", () => this.close());

    shadow.appendChild(style);
  }

  connectedCallback() {
    this.render();
    document.addEventListener("keydown", this.handleKeyDownBound);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.handleKeyDownBound);
    this.restoreFocus();
    this.unlockScroll();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "open") {
      if (this.hasAttribute("open")) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }

    this.render();
  }

  private handleOpen() {
    this.saveFocus();
    this.lockScroll();
    this.trapFocus();
    this.emit("modal-open");
  }

  private handleClose() {
    this.restoreFocus();
    this.unlockScroll();
    this.emit("modal-close");
  }

  private saveFocus() {
    this.previousActiveElement = document.activeElement as HTMLElement;
  }

  private restoreFocus() {
    if (this.previousActiveElement && typeof this.previousActiveElement.focus === "function") {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }

  private lockScroll() {
    document.body.style.overflow = "hidden";
  }

  private unlockScroll() {
    document.body.style.overflow = "";
  }

  private trapFocus() {
    requestAnimationFrame(() => {
      const focusable = this.shadowRoot?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusable?.[0] as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    });
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.hasAttribute("open")) return;

    if (event.key === "Escape" && this.hasAttribute("close-on-escape")) {
      event.preventDefault();
      this.close();
    }

    if (event.key === "Tab") {
      this.handleTabKey(event);
    }
  }

  private handleTabKey(event: KeyboardEvent) {
    const focusable = Array.from(
      this.shadowRoot?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) || []
    ) as HTMLElement[];

    if (focusable.length === 0) return;

    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (this.shadowRoot?.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (this.shadowRoot?.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  private handleBackdropClick(event: MouseEvent) {
    if (event.target === this.overlayElement && this.hasAttribute("close-on-backdrop")) {
      this.emit("backdrop-click");
      this.close();
    }
  }

  public close() {
    this.removeAttribute("open");
  }

  public show() {
    this.setAttribute("open", "");
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

  private render() {
    if (!this.shadowRoot) return;

    const isOpen = this.hasAttribute("open");
    const isClosable = this.hasAttribute("closable");

    // Clear previous content
    const style = this.shadowRoot.querySelector("style");
    this.shadowRoot.innerHTML = "";
    if (style) {
      this.shadowRoot.appendChild(style);
    }

    if (!isOpen) return;

    // Create overlay
    this.overlayElement = document.createElement("div");
    this.overlayElement.className = "overlay";
    this.overlayElement.setAttribute("part", "overlay");
    this.overlayElement.addEventListener("click", (e) => this.handleBackdropClick(e));

    // Create container
    const container = document.createElement("div");
    container.className = "container";
    container.setAttribute("part", "container");

    // Create dialog
    this.dialogElement = document.createElement("div");
    this.dialogElement.className = "dialog";
    this.dialogElement.setAttribute("part", "dialog");
    this.dialogElement.setAttribute("role", "dialog");
    this.dialogElement.setAttribute("aria-modal", "true");
    this.dialogElement.addEventListener("click", (e) => e.stopPropagation());

    // Create header
    const header = document.createElement("div");
    header.className = "header";
    header.setAttribute("part", "header");

    const headerContent = document.createElement("div");
    headerContent.className = "header-content";

    const headerSlot = document.createElement("slot");
    headerSlot.name = "header";
    headerContent.appendChild(headerSlot);

    header.appendChild(headerContent);

    if (isClosable) {
      header.appendChild(this.closeButton);
    }

    // Create body
    const body = document.createElement("div");
    body.className = "body";
    body.setAttribute("part", "body");

    const bodySlot = document.createElement("slot");
    body.appendChild(bodySlot);

    // Create footer
    const footer = document.createElement("div");
    footer.className = "footer";
    footer.setAttribute("part", "footer");

    const footerSlot = document.createElement("slot");
    footerSlot.name = "footer";
    footer.appendChild(footerSlot);

    // Assemble
    this.dialogElement.appendChild(header);
    this.dialogElement.appendChild(body);
    this.dialogElement.appendChild(footer);

    container.appendChild(this.dialogElement);
    this.overlayElement.appendChild(container);

    this.shadowRoot.appendChild(this.overlayElement);
  }
}

// Register the custom element
customElements.define("ha-modal", HaModal);
