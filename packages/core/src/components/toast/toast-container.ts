import { toastContainerStyles } from "./toast-container.styles";

/**
 * Toast Container - Manages toast positioning and stacking
 *
 * @element ha-toast-container
 *
 * @attr {string} position - Position: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
 *
 * @slot - Toast elements
 *
 * @csspart container - The container element
 */
export class HaToastContainer extends HTMLElement {
  static get observedAttributes() {
    return ["position"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = toastContainerStyles;

    // Create container
    const container = document.createElement("div");
    container.className = "container";
    container.setAttribute("part", "container");

    const slot = document.createElement("slot");
    container.appendChild(slot);

    shadow.appendChild(style);
    shadow.appendChild(container);
  }
}

// Register the custom element
customElements.define("ha-toast-container", HaToastContainer);
