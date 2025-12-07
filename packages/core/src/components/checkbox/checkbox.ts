import { checkboxStyles } from "./checkbox.styles";

/**
 * Checkbox component
 *
 * @element ha-checkbox
 *
 * @attr {string} size - Checkbox size: sm, md, lg
 * @attr {boolean} checked - Checked state
 * @attr {boolean} indeterminate - Indeterminate state
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} required - Required state
 * @attr {boolean} error - Error state
 * @attr {string} name - Checkbox name
 * @attr {string} value - Checkbox value
 * @attr {string} label - Checkbox label
 * @attr {string} description - Checkbox description
 *
 * @slot - Default slot for label content (alternative to label attribute)
 * @slot description - Slot for description content
 *
 * @fires change - Emitted when checkbox state changes
 * @fires input - Emitted when checkbox state changes
 *
 * @part checkbox-container - The checkbox container
 * @part checkbox-box - The checkbox visual box
 * @part checkbox-icon - The checkbox icon (checkmark or dash)
 * @part label - The label element
 * @part description - The description element
 */
export class HaCheckbox extends HTMLElement {
  private input: HTMLInputElement;
  private checkboxBox: HTMLDivElement;
  private checkIcon: SVGElement;

  static get observedAttributes() {
    return [
      "size",
      "checked",
      "indeterminate",
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
    style.textContent = checkboxStyles;

    // Create container
    const container = document.createElement("div");
    container.className = "checkbox-container";
    container.setAttribute("part", "checkbox-container");

    // Create hidden input
    this.input = document.createElement("input");
    this.input.type = "checkbox";
    this.input.setAttribute("part", "input");

    // Create visual checkbox box
    this.checkboxBox = document.createElement("div");
    this.checkboxBox.className = "checkbox-box";
    this.checkboxBox.setAttribute("part", "checkbox-box");

    // Create check icon (SVG)
    this.checkIcon = this.createCheckIcon();
    this.checkboxBox.appendChild(this.checkIcon);

    container.appendChild(this.input);
    container.appendChild(this.checkboxBox);

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

    // Create slot for description
    const descriptionSlot = document.createElement("slot");
    descriptionSlot.name = "description";
    description.appendChild(descriptionSlot);

    labelWrapper.appendChild(description);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(container);
    shadow.appendChild(labelWrapper);

    // Handle click on host
    this.addEventListener("click", this.handleClick.bind(this));

    // Handle keyboard events
    this.addEventListener("keydown", this.handleKeydown.bind(this));

    // Handle input change
    this.input.addEventListener("change", (e) => {
      this.checked = this.input.checked;

      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true,
          detail: {
            checked: this.input.checked,
            originalEvent: e,
          },
        }),
      );

      this.dispatchEvent(
        new CustomEvent("input", {
          bubbles: true,
          composed: true,
          detail: {
            checked: this.input.checked,
            originalEvent: e,
          },
        }),
      );
    });
  }

  private createCheckIcon(): SVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "checkbox-icon");
    svg.setAttribute("part", "checkbox-icon");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z",
    );

    svg.appendChild(path);
    return svg;
  }

  private createIndeterminateIcon(): SVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "checkbox-icon");
    svg.setAttribute("part", "checkbox-icon");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M4 8a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1z");

    svg.appendChild(path);
    return svg;
  }

  private handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    // If click is on the input itself, let it handle naturally
    if (e.target === this.input) {
      return;
    }

    // Toggle the checkbox
    e.preventDefault();
    this.input.click();
  }

  private handleKeydown(e: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    // Space key toggles the checkbox
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      this.input.click();
    }
  }

  connectedCallback() {
    // Set default attributes if not present
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "md");
    }

    this.updateCheckboxAttributes();
    this.updateLabelContent();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateCheckboxAttributes();
    this.updateLabelContent();
  }

  private updateCheckboxAttributes() {
    // Update checked state
    const checked = this.hasAttribute("checked");
    this.input.checked = checked;

    // Update indeterminate state
    const indeterminate = this.hasAttribute("indeterminate");
    this.input.indeterminate = indeterminate;

    // Update icon based on state
    if (indeterminate) {
      const newIcon = this.createIndeterminateIcon();
      this.checkboxBox.replaceChild(newIcon, this.checkIcon);
      this.checkIcon = newIcon;
    } else if (
      this.checkIcon.querySelector("path")?.getAttribute("d")?.includes("H5")
    ) {
      // Replace with check icon if currently showing indeterminate
      const newIcon = this.createCheckIcon();
      this.checkboxBox.replaceChild(newIcon, this.checkIcon);
      this.checkIcon = newIcon;
    }

    // Update disabled state
    const disabled = this.hasAttribute("disabled");
    this.input.disabled = disabled;
    this.input.setAttribute("aria-disabled", String(disabled));

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

    // Update name
    const name = this.getAttribute("name");
    if (name !== null) {
      this.input.name = name;
    } else {
      this.input.removeAttribute("name");
    }

    // Update value
    const value = this.getAttribute("value");
    if (value !== null) {
      this.input.value = value;
    } else {
      this.input.value = "on"; // Default checkbox value
    }
  }

  private updateLabelContent() {
    const label = this.getAttribute("label");
    const labelElement = this.shadowRoot?.querySelector(".label");
    const descriptionAttr = this.getAttribute("description");
    const descriptionElement = this.shadowRoot?.querySelector(".description");

    // Update label text if label attribute is set
    if (label && labelElement) {
      const slot = labelElement.querySelector("slot") as HTMLSlotElement | null;
      if (slot && !slot.assignedNodes().length) {
        // Only set text if slot is empty
        const textNode = document.createTextNode(label);
        labelElement.insertBefore(textNode, slot);
      }
    }

    // Update description text if description attribute is set
    if (descriptionAttr && descriptionElement) {
      const slot = descriptionElement.querySelector(
        'slot[name="description"]',
      ) as HTMLSlotElement | null;
      if (slot && !slot.assignedNodes().length) {
        const textNode = document.createTextNode(descriptionAttr);
        descriptionElement.insertBefore(textNode, slot);
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
    } else {
      this.removeAttribute("checked");
    }
  }

  get indeterminate(): boolean {
    return this.hasAttribute("indeterminate");
  }

  set indeterminate(value: boolean) {
    if (value) {
      this.setAttribute("indeterminate", "");
    } else {
      this.removeAttribute("indeterminate");
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

  get name(): string {
    return this.getAttribute("name") || "";
  }

  set name(value: string) {
    this.setAttribute("name", value);
  }

  get value(): string {
    return this.getAttribute("value") || "on";
  }

  set value(value: string) {
    this.setAttribute("value", value);
  }

  // Focus management
  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
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
if (!customElements.get("ha-checkbox")) {
  customElements.define("ha-checkbox", HaCheckbox);
}
