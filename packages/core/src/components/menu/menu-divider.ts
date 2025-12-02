import { menuDividerStyles } from "./menu.styles";

/**
 * Menu divider component
 *
 * @element ha-menu-divider
 */
export class HaMenuDivider extends HTMLElement {
  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = menuDividerStyles;

    // Create divider
    const divider = document.createElement("div");
    divider.className = "divider";
    divider.setAttribute("part", "divider");
    divider.setAttribute("role", "separator");

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(divider);
  }
}

// Register custom element
if (!customElements.get("ha-menu-divider")) {
  customElements.define("ha-menu-divider", HaMenuDivider);
}
