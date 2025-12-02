import { tabPanelStyles } from "./tabs.styles";

/**
 * Tab panel component
 *
 * @element ha-tab-panel
 *
 * @attr {string} value - Unique identifier matching the tab
 * @attr {boolean} active - Active state
 *
 * @slot - Panel content
 */
export class HaTabPanel extends HTMLElement {
  static get observedAttributes() {
    return ["value", "active"];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = tabPanelStyles;

    // Create panel wrapper
    const panel = document.createElement("div");
    panel.className = "tab-panel";
    panel.setAttribute("part", "panel");
    panel.setAttribute("role", "tabpanel");

    // Create slot
    const slot = document.createElement("slot");
    panel.appendChild(slot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(panel);
  }

  connectedCallback() {
    this.updatePanel();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updatePanel();
  }

  private updatePanel() {
    const panel = this.shadowRoot?.querySelector(".tab-panel");
    if (!panel) return;

    // Set ARIA attributes
    if (this.value) {
      panel.id = `panel-${this.value}`;
      panel.setAttribute("aria-labelledby", `tab-${this.value}`);
    }
    panel.setAttribute("aria-hidden", (!this.active).toString());
  }

  // Public API
  get value(): string {
    return this.getAttribute("value") || "";
  }

  set value(value: string) {
    this.setAttribute("value", value);
  }

  get active(): boolean {
    return this.hasAttribute("active");
  }

  set active(value: boolean) {
    if (value) {
      this.setAttribute("active", "");
    } else {
      this.removeAttribute("active");
    }
  }
}

// Register custom element
if (!customElements.get("ha-tab-panel")) {
  customElements.define("ha-tab-panel", HaTabPanel);
}
