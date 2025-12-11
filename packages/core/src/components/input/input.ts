import { inputStyles } from "@hidearea-design/tokens/styles";

/**
 * Input component
 *
 * @element ha-input
 *
 * @attr {string} variant - Input variant: default, filled, outlined
 * @attr {string} size - Input size: sm, md, lg
 * @attr {string} type - Input type: text, password, email, number, tel, url, search
 * @attr {string} value - Input value
 * @attr {string} placeholder - Input placeholder
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} readonly - Readonly state
 * @attr {boolean} required - Required state
 * @attr {boolean} error - Error state
 * @attr {boolean} full-width - Full width input
 * @attr {string} name - Input name
 * @attr {string} autocomplete - Autocomplete attribute
 * @attr {number} maxlength - Maximum length
 * @attr {number} minlength - Minimum length
 * @attr {string} pattern - Validation pattern
 * @attr {number} min - Minimum value (for number type)
 * @attr {number} max - Maximum value (for number type)
 * @attr {number} step - Step value (for number type)
 *
 * @slot prefix - Content before input
 * @slot suffix - Content after input
 *
 * @fires input - Emitted when input value changes
 * @fires change - Emitted when input loses focus after value change
 * @fires focus - Emitted when input gains focus
 * @fires blur - Emitted when input loses focus
 *
 * @part input-wrapper - The input wrapper container
 * @part input - The native input element
 * @part prefix - The prefix slot container
 * @part suffix - The suffix slot container
 */
export class HaInput extends HTMLElement {
  private input: HTMLInputElement;
  private wrapper: HTMLDivElement;

  static get observedAttributes() {
    return [
      "variant",
      "size",
      "type",
      "value",
      "placeholder",
      "disabled",
      "readonly",
      "required",
      "error",
      "full-width",
      "name",
      "autocomplete",
      "maxlength",
      "minlength",
      "pattern",
      "min",
      "max",
      "step",
    ];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = inputStyles;

    // Create wrapper
    this.wrapper = document.createElement("div");
    this.wrapper.className = "input-wrapper";
    this.wrapper.setAttribute("part", "input-wrapper");

    // Create prefix slot
    const prefixSlot = document.createElement("slot");
    prefixSlot.name = "prefix";
    prefixSlot.className = "prefix";
    prefixSlot.setAttribute("part", "prefix");

    // Create input element
    this.input = document.createElement("input");
    this.input.setAttribute("part", "input");

    // Create suffix slot
    const suffixSlot = document.createElement("slot");
    suffixSlot.name = "suffix";
    suffixSlot.className = "suffix";
    suffixSlot.setAttribute("part", "suffix");

    // Append elements
    this.wrapper.appendChild(prefixSlot);
    this.wrapper.appendChild(this.input);
    this.wrapper.appendChild(suffixSlot);

    shadow.appendChild(style);
    shadow.appendChild(this.wrapper);

    // Handle input events
    this.input.addEventListener("input", (e) => {
      const inputEvent = e as InputEvent;
      this.dispatchEvent(
        new CustomEvent("input", {
          bubbles: true,
          composed: true,
          detail: {
            value: this.input.value,
            originalEvent: inputEvent,
          },
        }),
      );
    });

    this.input.addEventListener("change", (e) => {
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true,
          detail: {
            value: this.input.value,
            originalEvent: e,
          },
        }),
      );
    });

    this.input.addEventListener("focus", (e) => {
      this.dispatchEvent(
        new CustomEvent("focus", {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        }),
      );
    });

    this.input.addEventListener("blur", (e) => {
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
    if (!this.hasAttribute("type")) {
      this.input.type = "text";
    }

    this.updateInputAttributes();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateInputAttributes();
  }

  private updateInputAttributes() {
    // Update input type
    const type = this.getAttribute("type") || "text";
    this.input.type = type;

    // Update value
    const value = this.getAttribute("value");
    if (value !== null) {
      this.input.value = value;
    }

    // Update placeholder
    const placeholder = this.getAttribute("placeholder");
    if (placeholder !== null) {
      this.input.placeholder = placeholder;
    } else {
      this.input.removeAttribute("placeholder");
    }

    // Update name
    const name = this.getAttribute("name");
    if (name !== null) {
      this.input.name = name;
    } else {
      this.input.removeAttribute("name");
    }

    // Update autocomplete
    const autocomplete = this.getAttribute("autocomplete");
    if (autocomplete !== null) {
      this.input.setAttribute("autocomplete", autocomplete);
    } else {
      this.input.removeAttribute("autocomplete");
    }

    // Update disabled state
    const disabled = this.hasAttribute("disabled");
    this.input.disabled = disabled;
    this.input.setAttribute("aria-disabled", String(disabled));

    // Update readonly state
    const readonly = this.hasAttribute("readonly");
    this.input.readOnly = readonly;
    if (readonly) {
      this.input.setAttribute("aria-readonly", "true");
    } else {
      this.input.removeAttribute("aria-readonly");
    }

    // Update required state
    const required = this.hasAttribute("required");
    this.input.required = required;
    if (required) {
      this.input.setAttribute("aria-required", "true");
    } else {
      this.input.removeAttribute("aria-required");
    }

    // Update error state
    const error = this.hasAttribute("error");
    if (error) {
      this.input.setAttribute("aria-invalid", "true");
    } else {
      this.input.removeAttribute("aria-invalid");
    }

    // Update maxlength
    const maxlength = this.getAttribute("maxlength");
    if (maxlength !== null) {
      this.input.maxLength = parseInt(maxlength, 10);
    } else {
      this.input.removeAttribute("maxlength");
    }

    // Update minlength
    const minlength = this.getAttribute("minlength");
    if (minlength !== null) {
      this.input.minLength = parseInt(minlength, 10);
    } else {
      this.input.removeAttribute("minlength");
    }

    // Update pattern
    const pattern = this.getAttribute("pattern");
    if (pattern !== null) {
      this.input.pattern = pattern;
    } else {
      this.input.removeAttribute("pattern");
    }

    // Update min (for number type)
    const min = this.getAttribute("min");
    if (min !== null) {
      this.input.min = min;
    } else {
      this.input.removeAttribute("min");
    }

    // Update max (for number type)
    const max = this.getAttribute("max");
    if (max !== null) {
      this.input.max = max;
    } else {
      this.input.removeAttribute("max");
    }

    // Update step (for number type)
    const step = this.getAttribute("step");
    if (step !== null) {
      this.input.step = step;
    } else {
      this.input.removeAttribute("step");
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

  get type(): string {
    return this.getAttribute("type") || "text";
  }

  set type(value: string) {
    this.setAttribute("type", value);
  }

  get value(): string {
    return this.input.value;
  }

  set value(value: string) {
    this.input.value = value;
    this.setAttribute("value", value);
  }

  get placeholder(): string {
    return this.getAttribute("placeholder") || "";
  }

  set placeholder(value: string) {
    this.setAttribute("placeholder", value);
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

  get readonly(): boolean {
    return this.hasAttribute("readonly");
  }

  set readonly(value: boolean) {
    if (value) {
      this.setAttribute("readonly", "");
    } else {
      this.removeAttribute("readonly");
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

  get name(): string {
    return this.getAttribute("name") || "";
  }

  set name(value: string) {
    this.setAttribute("name", value);
  }

  // Focus management
  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  // Selection methods
  select() {
    this.input.select();
  }

  setSelectionRange(
    start: number,
    end: number,
    direction?: "forward" | "backward" | "none",
  ) {
    this.input.setSelectionRange(start, end, direction);
  }

  // Validation
  checkValidity(): boolean {
    return this.input.checkValidity();
  }

  reportValidity(): boolean {
    return this.input.reportValidity();
  }

  setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
  }
}

// Register custom element
if (!customElements.get("ha-input")) {
  customElements.define("ha-input", HaInput);
}
