import { buttonStyles } from "@hidearea-design/tokens/styles";

/**
 * Button component
 *
 * @element ha-button
 *
 * @attr {string} variant - Button variant: primary, secondary, outline, ghost, danger
 * @attr {string} size - Button size: sm, md, lg
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} loading - Loading state
 * @attr {boolean} full-width - Full width button
 * @attr {string} type - Button type: button, submit, reset
 * @attr {boolean} pressed - Pressed state for toggle buttons
 * @attr {boolean} expanded - Expanded state for buttons controlling expandable content
 * @attr {string} aria-label - Accessible label for icon-only buttons
 * @attr {string} aria-controls - ID of element controlled by this button
 * @attr {string} haspopup - Type of popup: menu, listbox, tree, grid, dialog, true, false
 *
 * @slot - Button content
 * @slot icon-left - Icon displayed before button content
 * @slot icon-right - Icon displayed after button content
 *
 * @fires click - Emitted when button is clicked
 */
export class HaButton extends HTMLElement {
  private button: HTMLButtonElement;
  private iconLeftSlot: HTMLSlotElement;
  private iconRightSlot: HTMLSlotElement;

  static get observedAttributes() {
    return [
      "variant",
      "size",
      "disabled",
      "loading",
      "full-width",
      "type",
      "pressed",
      "expanded",
      "aria-label",
      "aria-controls",
      "haspopup",
    ];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = buttonStyles;

    // Create button element
    this.button = document.createElement("button");
    this.button.setAttribute("part", "button");

    // Create icon slots
    this.iconLeftSlot = document.createElement("slot");
    this.iconLeftSlot.name = "icon-left";
    this.iconLeftSlot.setAttribute("part", "icon-left");

    this.iconRightSlot = document.createElement("slot");
    this.iconRightSlot.name = "icon-right";
    this.iconRightSlot.setAttribute("part", "icon-right");

    // Create default slot for content
    const slot = document.createElement("slot");
    slot.setAttribute("part", "content");

    // Append slots to button
    this.button.appendChild(this.iconLeftSlot);
    this.button.appendChild(slot);
    this.button.appendChild(this.iconRightSlot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.button);

    // Handle click events
    this.button.addEventListener("click", (e) => {
      if (this.disabled || this.loading) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Toggle pressed state if this is a toggle button
      if (this.hasAttribute("pressed")) {
        this.pressed = !this.pressed;
      }

      // Emit custom event
      this.dispatchEvent(
        new CustomEvent("click", {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        }),
      );
    });
  }

  connectedCallback() {
    // Set default attributes if not present
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "primary");
    }
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "md");
    }
    if (!this.hasAttribute("type")) {
      this.button.type = "button";
    }

    this.updateButtonAttributes();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateButtonAttributes();
  }

  private updateButtonAttributes() {
    // Update button type
    const type = this.getAttribute("type") || "button";
    this.button.type = type as "button" | "submit" | "reset";

    // Update disabled state
    const disabled = this.hasAttribute("disabled");
    this.button.disabled = disabled;

    // Update aria-disabled (for consistency with disabled attribute)
    if (disabled) {
      this.button.setAttribute("aria-disabled", "true");
    } else {
      this.button.removeAttribute("aria-disabled");
    }

    // Update aria-busy for loading state
    const loading = this.hasAttribute("loading");
    if (loading) {
      this.button.setAttribute("aria-busy", "true");
    } else {
      this.button.removeAttribute("aria-busy");
    }

    // Update aria-pressed for toggle buttons
    if (this.hasAttribute("pressed")) {
      this.button.setAttribute("aria-pressed", String(this.pressed));
    } else {
      this.button.removeAttribute("aria-pressed");
    }

    // Update aria-expanded for expandable content
    if (this.hasAttribute("expanded")) {
      this.button.setAttribute("aria-expanded", String(this.expanded));
    } else {
      this.button.removeAttribute("aria-expanded");
    }

    // Update aria-label (for icon-only buttons)
    const ariaLabel = this.getAttribute("aria-label");
    if (ariaLabel) {
      this.button.setAttribute("aria-label", ariaLabel);
    } else {
      this.button.removeAttribute("aria-label");
    }

    // Update aria-controls
    const ariaControls = this.getAttribute("aria-controls");
    if (ariaControls) {
      this.button.setAttribute("aria-controls", ariaControls);
    } else {
      this.button.removeAttribute("aria-controls");
    }

    // Update aria-haspopup
    const haspopup = this.getAttribute("haspopup");
    if (haspopup) {
      this.button.setAttribute("aria-haspopup", haspopup);
    } else {
      this.button.removeAttribute("aria-haspopup");
    }
  }

  // Public API
  get variant(): string {
    return this.getAttribute("variant") || "primary";
  }

  set variant(value: string) {
    this.setAttribute("variant", value);
  }

  get size(): string {
    return this.getAttribute("size") || "md";
  }

  set size(value: string) {
    this.setAttribute("size", value);
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

  get loading(): boolean {
    return this.hasAttribute("loading");
  }

  set loading(value: boolean) {
    if (value) {
      this.setAttribute("loading", "");
    } else {
      this.removeAttribute("loading");
    }
  }

  get fullWidth(): boolean {
    return this.hasAttribute("full-width");
  }

  set fullWidth(value: boolean) {
    if (value) {
      this.setAttribute("full-width", "");
    } else {
      this.removeAttribute("full-width");
    }
  }

  get pressed(): boolean {
    const value = this.getAttribute("pressed");
    return value === "true" || value === "";
  }

  set pressed(value: boolean) {
    this.setAttribute("pressed", String(value));
  }

  get expanded(): boolean {
    return this.hasAttribute("expanded");
  }

  set expanded(value: boolean) {
    if (value) {
      this.setAttribute("expanded", "");
    } else {
      this.removeAttribute("expanded");
    }
  }

  // Focus management
  focus() {
    this.button.focus();
  }

  blur() {
    this.button.blur();
  }
}

// Register custom element
if (!customElements.get("ha-button")) {
  customElements.define("ha-button", HaButton);
}
