export const componentTemplate = (name: string, kebabName: string, PascalName: string) => `import { ${kebabName}Styles } from "./${kebabName}.styles";

/**
 * ${PascalName} component
 *
 * @element ha-${kebabName}
 *
 * @attr {string} variant - Component variant
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Default content
 *
 * @fires change - Emitted when value changes
 */
export class Ha${PascalName} extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "disabled"];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = ${kebabName}Styles;

    // Create container
    const container = document.createElement("div");
    container.setAttribute("part", "container");
    container.className = "container";

    // Create default slot
    const slot = document.createElement("slot");
    container.appendChild(slot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(container);
  }

  connectedCallback() {
    this.updateAttributes();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      this.updateAttributes();
    }
  }

  private updateAttributes() {
    const container = this.shadowRoot?.querySelector(".container");
    if (!container) return;

    // Update variant
    const variant = this.getAttribute("variant") || "default";
    container.setAttribute("data-variant", variant);

    // Update disabled state
    const disabled = this.hasAttribute("disabled");
    container.setAttribute("aria-disabled", String(disabled));
    if (disabled) {
      container.classList.add("disabled");
    } else {
      container.classList.remove("disabled");
    }
  }

  // Getters and setters
  get variant(): string {
    return this.getAttribute("variant") || "default";
  }

  set variant(value: string) {
    this.setAttribute("variant", value);
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
}

customElements.define("ha-${kebabName}", Ha${PascalName});
`;
