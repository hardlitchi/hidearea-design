import { selectStyles } from "./select.styles";

/**
 * Select component
 *
 * @element ha-select
 *
 * @attr {string} variant - Select variant: default, filled, outlined
 * @attr {string} size - Select size: sm, md, lg
 * @attr {string} value - Selected value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} required - Required state
 * @attr {boolean} error - Error state
 * @attr {boolean} full-width - Full width select
 * @attr {string} name - Select name
 *
 * @slot - Option elements
 *
 * @fires change - Emitted when selected value changes
 * @fires focus - Emitted when select gains focus
 * @fires blur - Emitted when select loses focus
 */
export class HaSelect extends HTMLElement {
  private select: HTMLSelectElement;
  private wrapper: HTMLDivElement;

  static get observedAttributes() {
    return [
      "variant",
      "size",
      "value",
      "placeholder",
      "disabled",
      "required",
      "error",
      "full-width",
      "name",
    ];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = selectStyles;

    // Create wrapper
    this.wrapper = document.createElement("div");
    this.wrapper.className = "select-wrapper";
    this.wrapper.setAttribute("part", "select-wrapper");

    // Create select element
    this.select = document.createElement("select");
    this.select.setAttribute("part", "select");

    // Create slot for options
    const slot = document.createElement("slot");
    this.select.appendChild(slot);

    // Arrow icon
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.innerHTML = `
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    // Append elements
    this.wrapper.appendChild(this.select);
    this.wrapper.appendChild(arrow);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.wrapper);

    // Handle change events
    this.select.addEventListener("change", () => {
      this.setAttribute("value", this.select.value);
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true,
          detail: { value: this.select.value },
        }),
      );
    });

    // Handle focus events
    this.select.addEventListener("focus", (e) => {
      this.dispatchEvent(
        new CustomEvent("focus", {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        }),
      );
    });

    // Handle blur events
    this.select.addEventListener("blur", (e) => {
      this.dispatchEvent(
        new CustomEvent("blur", {
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
      this.setAttribute("variant", "default");
    }
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "md");
    }

    this.updateSelectAttributes();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "value") {
      this.select.value = newValue || "";
    }

    this.updateSelectAttributes();
  }

  private updateSelectAttributes() {
    // Update name
    const name = this.getAttribute("name");
    if (name) {
      this.select.name = name;
    }

    // Update disabled state
    const disabled = this.hasAttribute("disabled");
    this.select.disabled = disabled;

    // Update required state
    const required = this.hasAttribute("required");
    this.select.required = required;

    // Update value
    const value = this.getAttribute("value");
    if (value) {
      this.select.value = value;
    }
  }

  // Public API
  get variant(): string {
    return this.getAttribute("variant") || "default";
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

  get value(): string {
    return this.select.value;
  }

  set value(value: string) {
    this.setAttribute("value", value);
    this.select.value = value;
  }

  get placeholder(): string | null {
    return this.getAttribute("placeholder");
  }

  set placeholder(value: string | null) {
    if (value) {
      this.setAttribute("placeholder", value);
    } else {
      this.removeAttribute("placeholder");
    }
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

  get required(): boolean {
    return this.hasAttribute("required");
  }

  set required(value: boolean) {
    if (value) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
  }

  get error(): boolean {
    return this.hasAttribute("error");
  }

  set error(value: boolean) {
    if (value) {
      this.setAttribute("error", "");
    } else {
      this.removeAttribute("error");
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

  get name(): string | null {
    return this.getAttribute("name");
  }

  set name(value: string | null) {
    if (value) {
      this.setAttribute("name", value);
    } else {
      this.removeAttribute("name");
    }
  }

  // Focus management
  focus() {
    this.select.focus();
  }

  blur() {
    this.select.blur();
  }
}

// Register custom element
if (!customElements.get("ha-select")) {
  customElements.define("ha-select", HaSelect);
}
