import { drawerStyles } from "./drawer.styles";

/**
 * Drawer component
 *
 * @element ha-drawer
 *
 * @attr {boolean} open - Drawer open state
 * @attr {string} placement - Drawer placement: left, right, top, bottom
 * @attr {string} size - Drawer size: sm (256px), md (320px), lg (400px)
 * @attr {boolean} overlay - Show backdrop overlay
 * @attr {boolean} close-on-backdrop - Close drawer when backdrop is clicked
 * @attr {boolean} close-on-escape - Close drawer when Escape key is pressed
 *
 * @slot - Drawer content
 * @slot header - Drawer header content
 * @slot footer - Drawer footer content
 *
 * @fires drawer-open - Emitted when drawer is opened
 * @fires drawer-close - Emitted when drawer is closed
 * @fires backdrop-click - Emitted when backdrop is clicked
 *
 * @cssprop --ha-drawer-width - Drawer width (for left/right placement)
 * @cssprop --ha-drawer-height - Drawer height (for top/bottom placement)
 * @cssprop --ha-drawer-bg - Drawer background color
 *
 * @csspart drawer - The drawer container
 * @csspart backdrop - The backdrop overlay
 * @csspart header - The header container
 * @csspart body - The body container
 * @csspart footer - The footer container
 * @csspart close - The close button
 */
export class HaDrawer extends HTMLElement {
  private backdropElement: HTMLDivElement;
  private drawerElement: HTMLDivElement;
  private headerContainer: HTMLDivElement;
  private headerSlot: HTMLSlotElement;
  private closeButton: HTMLButtonElement;
  private bodyContainer: HTMLDivElement;
  private bodySlot: HTMLSlotElement;
  private footerContainer: HTMLDivElement;
  private footerSlot: HTMLSlotElement;

  static get observedAttributes() {
    return [
      "open",
      "placement",
      "size",
      "overlay",
      "close-on-backdrop",
      "close-on-escape",
    ];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = drawerStyles;

    // Create backdrop
    this.backdropElement = document.createElement("div");
    this.backdropElement.className = "drawer-backdrop";
    this.backdropElement.setAttribute("part", "backdrop");

    // Create drawer container
    this.drawerElement = document.createElement("div");
    this.drawerElement.className = "drawer";
    this.drawerElement.setAttribute("part", "drawer");
    this.drawerElement.setAttribute("role", "dialog");
    this.drawerElement.setAttribute("aria-modal", "true");

    // Create header container
    this.headerContainer = document.createElement("div");
    this.headerContainer.className = "drawer__header";
    this.headerContainer.setAttribute("part", "header");

    this.headerSlot = document.createElement("slot");
    this.headerSlot.name = "header";
    this.headerContainer.appendChild(this.headerSlot);

    // Create close button
    this.closeButton = document.createElement("button");
    this.closeButton.className = "drawer__close";
    this.closeButton.setAttribute("part", "close");
    this.closeButton.setAttribute("type", "button");
    this.closeButton.setAttribute("aria-label", "Close");
    this.closeButton.textContent = "✕";
    this.headerContainer.appendChild(this.closeButton);

    // Create body container
    this.bodyContainer = document.createElement("div");
    this.bodyContainer.className = "drawer__body";
    this.bodyContainer.setAttribute("part", "body");

    this.bodySlot = document.createElement("slot");
    this.bodyContainer.appendChild(this.bodySlot);

    // Create footer container
    this.footerContainer = document.createElement("div");
    this.footerContainer.className = "drawer__footer";
    this.footerContainer.setAttribute("part", "footer");

    this.footerSlot = document.createElement("slot");
    this.footerSlot.name = "footer";
    this.footerContainer.appendChild(this.footerSlot);

    // Append to drawer
    this.drawerElement.appendChild(this.headerContainer);
    this.drawerElement.appendChild(this.bodyContainer);
    this.drawerElement.appendChild(this.footerContainer);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.backdropElement);
    shadow.appendChild(this.drawerElement);

    // Handle close button click
    this.closeButton.addEventListener("click", () => {
      this.close();
    });

    // Handle backdrop click
    this.backdropElement.addEventListener("click", () => {
      if (this.hasAttribute("close-on-backdrop")) {
        this.dispatchEvent(
          new CustomEvent("backdrop-click", {
            bubbles: true,
            composed: true,
          })
        );
        this.close();
      }
    });

    // Handle keyboard events
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  connectedCallback() {
    this.updateState();
    this.updatePlacement();
    this.updateSize();
    this.updateOverlay();

    document.addEventListener("keydown", this.handleKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this.handleKeydown);
    this.unlockScroll();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      if (name === "open") {
        this.updateState();
      } else if (name === "placement") {
        this.updatePlacement();
      } else if (name === "size") {
        this.updateSize();
      } else if (name === "overlay") {
        this.updateOverlay();
      }
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    if (
      e.key === "Escape" &&
      this.hasAttribute("open") &&
      this.hasAttribute("close-on-escape")
    ) {
      e.preventDefault();
      this.close();
    }
  }

  private updateState() {
    const isOpen = this.hasAttribute("open");

    if (isOpen) {
      this.drawerElement.classList.add("drawer--open");
      this.backdropElement.classList.add("drawer-backdrop--show");
      this.lockScroll();
      this.dispatchEvent(
        new CustomEvent("drawer-open", {
          bubbles: true,
          composed: true,
        })
      );
    } else {
      this.drawerElement.classList.remove("drawer--open");
      this.backdropElement.classList.remove("drawer-backdrop--show");
      this.unlockScroll();
    }
  }

  private updatePlacement() {
    const placement = this.getAttribute("placement") || "right";

    // Remove all placement classes
    this.drawerElement.className = this.drawerElement.className
      .split(" ")
      .filter((cls) => !cls.startsWith("drawer--placement-"))
      .join(" ");

    // Add new placement class
    this.drawerElement.classList.add(`drawer--placement-${placement}`);
  }

  private updateSize() {
    const size = this.getAttribute("size") || "md";

    // Remove all size classes
    this.drawerElement.className = this.drawerElement.className
      .split(" ")
      .filter((cls) => !cls.startsWith("drawer--size-"))
      .join(" ");

    // Add new size class
    this.drawerElement.classList.add(`drawer--size-${size}`);
  }

  private updateOverlay() {
    const hasOverlay = this.hasAttribute("overlay");

    if (hasOverlay) {
      this.backdropElement.style.display = "block";
    } else {
      this.backdropElement.style.display = "none";
    }
  }

  private lockScroll() {
    if (this.hasAttribute("open")) {
      document.body.style.overflow = "hidden";
    }
  }

  private unlockScroll() {
    document.body.style.overflow = "";
  }

  open() {
    if (!this.hasAttribute("open")) {
      this.setAttribute("open", "");
    }
  }

  close() {
    if (this.hasAttribute("open")) {
      this.removeAttribute("open");
      this.dispatchEvent(
        new CustomEvent("drawer-close", {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  toggle() {
    if (this.hasAttribute("open")) {
      this.close();
    } else {
      this.open();
    }
  }
}

// Register the custom element
if (!customElements.get("ha-drawer")) {
  customElements.define("ha-drawer", HaDrawer);
}
