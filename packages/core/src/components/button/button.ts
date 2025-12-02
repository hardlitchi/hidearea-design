import { buttonStyles } from "./button.styles";

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
 *
 * @slot - Button content
 *
 * @fires click - Emitted when button is clicked
 */
export class HaButton extends HTMLElement {
  private button: HTMLButtonElement;

  static get observedAttributes() {
    return ["variant", "size", "disabled", "loading", "full-width", "type"];
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

    // Create slot for content
    const slot = document.createElement("slot");
    this.button.appendChild(slot);

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

    // Update aria-disabled
    this.button.setAttribute("aria-disabled", String(disabled));

    // Update aria-busy for loading state
    const loading = this.hasAttribute("loading");
    this.button.setAttribute("aria-busy", String(loading));
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
