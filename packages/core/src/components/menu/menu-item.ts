import { menuItemStyles } from "./menu.styles";

/**
 * Menu item component
 *
 * @element ha-menu-item
 *
 * @attr {string} value - Unique identifier for the item
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} danger - Danger/destructive action styling
 * @attr {string} size - Item size: sm, md, lg
 *
 * @slot - Item label content
 * @slot icon - Icon slot
 *
 * @fires item-click - Emitted when item is clicked
 */
export class HaMenuItem extends HTMLElement {
  private button: HTMLButtonElement;

  static get observedAttributes() {
    return ["value", "disabled", "danger", "size"];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = menuItemStyles;

    // Create button
    this.button = document.createElement("button");
    this.button.className = "menu-item";
    this.button.setAttribute("part", "button");
    this.button.setAttribute("role", "menuitem");
    this.button.setAttribute("type", "button");

    // Create icon slot
    const iconSlot = document.createElement("span");
    iconSlot.className = "icon-slot";
    const iconSlotElement = document.createElement("slot");
    iconSlotElement.name = "icon";
    iconSlot.appendChild(iconSlotElement);

    // Create content
    const content = document.createElement("span");
    content.className = "content";
    const defaultSlot = document.createElement("slot");
    content.appendChild(defaultSlot);

    // Append to button
    this.button.appendChild(iconSlot);
    this.button.appendChild(content);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.button);

    // Handle click
    this.button.addEventListener("click", () => {
      if (!this.disabled) {
        this.dispatchEvent(
          new CustomEvent("item-click", {
            bubbles: true,
            composed: true,
            detail: { value: this.value },
          }),
        );
      }
    });
  }

  connectedCallback() {
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "md");
    }
    this.updateButton();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateButton();
  }

  private updateButton() {
    const classes = ["menu-item"];

    if (this.danger) {
      classes.push("danger");
    }

    this.button.className = classes.join(" ");
    this.button.disabled = this.disabled;
    this.button.setAttribute("aria-disabled", this.disabled.toString());
  }

  // Public API
  get value(): string {
    return this.getAttribute("value") || "";
  }

  set value(value: string) {
    this.setAttribute("value", value);
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get danger(): boolean {
    return this.hasAttribute("danger");
  }

  set danger(value: boolean) {
    if (value) {
      this.setAttribute("danger", "");
    } else {
      this.removeAttribute("danger");
    }
  }

  get size(): string {
    return this.getAttribute("size") || "md";
  }

  set size(value: string) {
    this.setAttribute("size", value);
  }

  focus() {
    this.button.focus();
  }
}

// Register custom element
if (!customElements.get("ha-menu-item")) {
  customElements.define("ha-menu-item", HaMenuItem);
}
