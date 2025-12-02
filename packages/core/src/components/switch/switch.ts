import { switchStyles } from "./switch.styles";

/**
 * Switch component (Toggle)
 *
 * @element ha-switch
 *
 * @attr {string} size - Switch size: sm, md, lg
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} required - Required state
 * @attr {boolean} error - Error state
 * @attr {string} name - Switch name
 * @attr {string} value - Switch value
 * @attr {string} label - Switch label
 * @attr {string} description - Switch description
 *
 * @slot - Default slot for label content (alternative to label attribute)
 * @slot description - Slot for description content
 *
 * @fires change - Emitted when switch state changes
 * @fires input - Emitted when switch state changes
 *
 * @part switch-container - The switch container
 * @part switch-track - The switch track (background)
 * @part switch-thumb - The switch thumb (circle)
 * @part label - The label element
 * @part description - The description element
 */
export class HaSwitch extends HTMLElement {
  private input: HTMLInputElement;
  private switchTrack: HTMLDivElement;
  private switchThumb: HTMLDivElement;

  static get observedAttributes() {
    return [
      "size",
      "checked",
      "disabled",
      "required",
      "error",
      "name",
      "value",
      "label",
      "description",
    ];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = switchStyles;

    // Create container
    const container = document.createElement("div");
    container.className = "switch-container";
    container.setAttribute("part", "switch-container");

    // Create hidden input
    this.input = document.createElement("input");
    this.input.type = "checkbox";
    this.input.setAttribute("part", "input");
    this.input.setAttribute("role", "switch");

    // Create switch track
    this.switchTrack = document.createElement("div");
    this.switchTrack.className = "switch-track";
    this.switchTrack.setAttribute("part", "switch-track");

    // Create switch thumb
    this.switchThumb = document.createElement("div");
    this.switchThumb.className = "switch-thumb";
    this.switchThumb.setAttribute("part", "switch-thumb");
    this.switchTrack.appendChild(this.switchThumb);

    container.appendChild(this.input);
    container.appendChild(this.switchTrack);

    // Create label wrapper
    const labelWrapper = document.createElement("div");
    labelWrapper.className = "label-wrapper";

    // Create label
    const label = document.createElement("span");
    label.className = "label";
    label.setAttribute("part", "label");

    // Create default slot for label
    const labelSlot = document.createElement("slot");
    label.appendChild(labelSlot);

    labelWrapper.appendChild(label);

    // Create description
    const description = document.createElement("span");
    description.className = "description";
    description.setAttribute("part", "description");

    // Create description slot
    const descriptionSlot = document.createElement("slot");
    descriptionSlot.name = "description";
    description.appendChild(descriptionSlot);

    labelWrapper.appendChild(description);

    // Append to container
    container.appendChild(labelWrapper);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(container);

    // Handle click on container
    container.addEventListener("click", (e) => {
      if (!this.disabled) {
        e.preventDefault();
        this.checked = !this.checked;
      }
    });

    // Handle input change
    this.input.addEventListener("change", () => {
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true,
          detail: {
            checked: this.input.checked,
            value: this.value,
          },
        }),
      );

      this.dispatchEvent(
        new CustomEvent("input", {
          bubbles: true,
          composed: true,
          detail: {
            checked: this.input.checked,
            value: this.value,
          },
        }),
      );
    });
  }

  connectedCallback() {
    // Set default size if not present
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "md");
    }

    this.updateInputAttributes();
    this.updateLabelContent();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "checked") {
      this.input.checked = this.hasAttribute("checked");
    }

    this.updateInputAttributes();
    this.updateLabelContent();
  }

  private updateInputAttributes() {
    // Update name
    if (this.name) {
      this.input.name = this.name;
    }

    // Update value
    if (this.value) {
      this.input.value = this.value;
    }

    // Update disabled state
    this.input.disabled = this.disabled;

    // Update required state
    this.input.required = this.required;

    // Update checked state
    this.input.checked = this.checked;

    // Update ARIA attributes
    this.input.setAttribute("aria-disabled", this.disabled.toString());
    this.input.setAttribute("aria-required", this.required.toString());
    this.input.setAttribute("aria-invalid", this.error.toString());
    this.input.setAttribute("aria-checked", this.checked.toString());
  }

  private updateLabelContent() {
    const labelSlot = this.shadowRoot?.querySelector(
      "slot:not([name])",
    ) as HTMLSlotElement;
    const descriptionSlot = this.shadowRoot?.querySelector(
      'slot[name="description"]',
    ) as HTMLSlotElement;

    // Update label if attribute is set and slot is empty
    if (this.label && labelSlot && labelSlot.assignedNodes().length === 0) {
      const labelElement = labelSlot.parentElement;
      if (labelElement) {
        // Remove existing text nodes
        Array.from(labelElement.childNodes).forEach((node) => {
          if (node !== labelSlot && node.nodeType === Node.TEXT_NODE) {
            node.remove();
          }
        });
        // Add new text
        labelElement.insertBefore(
          document.createTextNode(this.label),
          labelSlot,
        );
      }
    }

    // Update description if attribute is set and slot is empty
    if (
      this.description &&
      descriptionSlot &&
      descriptionSlot.assignedNodes().length === 0
    ) {
      const descriptionElement = descriptionSlot.parentElement;
      if (descriptionElement) {
        // Remove existing text nodes
        Array.from(descriptionElement.childNodes).forEach((node) => {
          if (node !== descriptionSlot && node.nodeType === Node.TEXT_NODE) {
            node.remove();
          }
        });
        // Add new text
        descriptionElement.insertBefore(
          document.createTextNode(this.description),
          descriptionSlot,
        );
      }
    }
  }

  // Public API
  get size(): string {
    return this.getAttribute("size") || "md";
  }

  set size(value: string) {
    this.setAttribute("size", value);
  }

  get checked(): boolean {
    return this.hasAttribute("checked");
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute("checked", "");
      this.input.checked = true;
    } else {
      this.removeAttribute("checked");
      this.input.checked = false;
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

  get value(): string | null {
    return this.getAttribute("value");
  }

  set value(value: string | null) {
    if (value) {
      this.setAttribute("value", value);
    } else {
      this.removeAttribute("value");
    }
  }

  get label(): string | null {
    return this.getAttribute("label");
  }

  set label(value: string | null) {
    if (value) {
      this.setAttribute("label", value);
    } else {
      this.removeAttribute("label");
    }
  }

  get description(): string | null {
    return this.getAttribute("description");
  }

  set description(value: string | null) {
    if (value) {
      this.setAttribute("description", value);
    } else {
      this.removeAttribute("description");
    }
  }

  // Validation API
  checkValidity(): boolean {
    return this.input.checkValidity();
  }

  reportValidity(): boolean {
    return this.input.reportValidity();
  }

  setCustomValidity(message: string): void {
    this.input.setCustomValidity(message);
  }

  // Focus management
  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }
}

// Register custom element
if (!customElements.get("ha-switch")) {
  customElements.define("ha-switch", HaSwitch);
}
