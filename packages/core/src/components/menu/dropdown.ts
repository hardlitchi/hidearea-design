import { dropdownStyles } from "./menu.styles";

/**
 * Dropdown component
 *
 * @element ha-dropdown
 *
 * @attr {string} placement - Dropdown placement: top, bottom, left, right, top-start, top-end, bottom-start, bottom-end
 * @attr {string} trigger - Trigger type: click, hover
 * @attr {boolean} open - Open state
 *
 * @slot trigger - Trigger element
 * @slot - Dropdown content (ha-menu)
 *
 * @fires open - Emitted when dropdown opens
 * @fires close - Emitted when dropdown closes
 */
export class HaDropdown extends HTMLElement {
  private triggerSlot: HTMLDivElement;
  private menuContainer: HTMLDivElement;

  static get observedAttributes() {
    return ["placement", "trigger", "open"];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = dropdownStyles;

    // Create trigger
    this.triggerSlot = document.createElement("div");
    this.triggerSlot.className = "trigger";
    this.triggerSlot.setAttribute("part", "trigger");

    const triggerSlotElement = document.createElement("slot");
    triggerSlotElement.name = "trigger";
    this.triggerSlot.appendChild(triggerSlotElement);

    // Create menu container
    this.menuContainer = document.createElement("div");
    this.menuContainer.className = "menu-container";
    this.menuContainer.setAttribute("part", "menu-container");

    const menuSlot = document.createElement("slot");
    this.menuContainer.appendChild(menuSlot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.triggerSlot);
    shadow.appendChild(this.menuContainer);

    // Handle trigger click
    this.triggerSlot.addEventListener("click", () => {
      if (this.triggerMode === "click") {
        this.toggle();
      }
    });

    // Handle trigger hover
    this.triggerSlot.addEventListener("mouseenter", () => {
      if (this.triggerMode === "hover") {
        this.show();
      }
    });

    this.addEventListener("mouseleave", () => {
      if (this.triggerMode === "hover") {
        this.hide();
      }
    });

    // Handle document click to close
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    // Handle escape key
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  connectedCallback() {
    if (!this.hasAttribute("placement")) {
      this.setAttribute("placement", "bottom-start");
    }
    if (!this.hasAttribute("trigger")) {
      this.setAttribute("trigger", "click");
    }

    if (this.open) {
      this.show();
    }
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "open") {
      if (this.open) {
        this.menuContainer.classList.add("open");
        this.updatePosition();
        setTimeout(() => {
          document.addEventListener("click", this.handleDocumentClick);
          document.addEventListener("keydown", this.handleEscapeKey);
        }, 0);
        this.dispatchEvent(new CustomEvent("open", { bubbles: true, composed: true }));
      } else {
        this.menuContainer.classList.remove("open");
        this.removeEventListeners();
        this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
      }
    }
  }

  private show() {
    if (this.open) return;
    this.setAttribute("open", "");
  }

  private hide() {
    if (!this.open) return;
    this.removeAttribute("open");
  }

  private toggle() {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  private updatePosition() {
    const triggerRect = this.triggerSlot.getBoundingClientRect();
    const menuRect = this.menuContainer.getBoundingClientRect();
    const placement = this.placement;
    const offset = 4;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = triggerRect.top - menuRect.height - offset;
        left = triggerRect.left + (triggerRect.width - menuRect.width) / 2;
        break;
      case "top-start":
        top = triggerRect.top - menuRect.height - offset;
        left = triggerRect.left;
        break;
      case "top-end":
        top = triggerRect.top - menuRect.height - offset;
        left = triggerRect.right - menuRect.width;
        break;
      case "bottom":
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - menuRect.width) / 2;
        break;
      case "bottom-start":
        top = triggerRect.bottom + offset;
        left = triggerRect.left;
        break;
      case "bottom-end":
        top = triggerRect.bottom + offset;
        left = triggerRect.right - menuRect.width;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - menuRect.height) / 2;
        left = triggerRect.left - menuRect.width - offset;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - menuRect.height) / 2;
        left = triggerRect.right + offset;
        break;
    }

    // Keep within viewport
    const margin = 8;
    if (left < margin) left = margin;
    if (left + menuRect.width > window.innerWidth - margin) {
      left = window.innerWidth - menuRect.width - margin;
    }
    if (top < margin) top = margin;
    if (top + menuRect.height > window.innerHeight - margin) {
      top = window.innerHeight - menuRect.height - margin;
    }

    this.menuContainer.style.top = `${top}px`;
    this.menuContainer.style.left = `${left}px`;
  }

  private handleDocumentClick(e: Event) {
    if (!this.contains(e.target as Node)) {
      this.hide();
    }
  }

  private handleEscapeKey(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this.hide();
    }
  }

  private removeEventListeners() {
    document.removeEventListener("click", this.handleDocumentClick);
    document.removeEventListener("keydown", this.handleEscapeKey);
  }

  // Public API
  get placement(): string {
    return this.getAttribute("placement") || "bottom-start";
  }

  set placement(value: string) {
    this.setAttribute("placement", value);
  }

  get triggerMode(): string {
    return this.getAttribute("trigger") || "click";
  }

  set triggerMode(value: string) {
    this.setAttribute("trigger", value);
  }

  get open(): boolean {
    return this.hasAttribute("open");
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }

  showDropdown() {
    this.show();
  }

  hideDropdown() {
    this.hide();
  }

  toggleDropdown() {
    this.toggle();
  }
}

// Register custom element
if (!customElements.get("ha-dropdown")) {
  customElements.define("ha-dropdown", HaDropdown);
}
