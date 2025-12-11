import { breadcrumbStyles } from "@hidearea-design/tokens/styles";

/**
 * Breadcrumb component
 *
 * @element ha-breadcrumb
 *
 * @attr {string} separator - Default separator for all items: slash, chevron, arrow, dot
 * @attr {string} size - Breadcrumb size: sm, md, lg
 *
 * @slot - Breadcrumb items (ha-breadcrumb-item elements)
 */
export class HaBreadcrumb extends HTMLElement {
  private nav: HTMLElement;
  private list: HTMLOListElement;
  private itemsSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["separator", "size"];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = breadcrumbStyles;

    // Create nav
    this.nav = document.createElement("nav");
    this.nav.setAttribute("part", "nav");
    this.nav.setAttribute("aria-label", "breadcrumb");

    // Create ordered list
    this.list = document.createElement("ol");
    this.list.className = "breadcrumb";
    this.list.setAttribute("part", "list");

    // Create slot for items
    this.itemsSlot = document.createElement("slot");
    this.list.appendChild(this.itemsSlot); // slot を直接 ol の子にする

    // Append to nav
    this.nav.appendChild(this.list);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.nav);

    // Listen for slotchange to update items
    this.itemsSlot.addEventListener("slotchange", () => {
      this.updateItems();
    });
  }

  connectedCallback() {
    // Set default attributes
    if (!this.hasAttribute("separator")) {
      this.setAttribute("separator", "slash");
    }
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "md");
    }

    this.updateClasses();
    this.updateItems();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (_name === "separator") {
      this.updateItems();
    } else {
      this.updateClasses();
    }
  }

  private updateClasses() {
    this.list.className = `breadcrumb size-${this.size}`;
  }

  private updateItems() {
    const items = this.getItems();

    items.forEach((item, index) => {
      // Set separator on all items
      // 親から明示的に設定されたseparatorを常に適用
      const breadcrumbItem = item as HTMLElement & { separator: string };
      breadcrumbItem.separator = this.separator;

      // Update ARIA
      if (index === items.length - 1) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  }

  private getItems(): Element[] {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return [];

    const elements = slot.assignedElements();
    return elements.filter((el) => el.tagName === "HA-BREADCRUMB-ITEM");
  }

  // Public API
  get separator(): string {
    return this.getAttribute("separator") || "slash";
  }

  set separator(value: string) {
    this.setAttribute("separator", value);
  }

  get size(): string {
    return this.getAttribute("size") || "md";
  }

  set size(value: string) {
    this.setAttribute("size", value);
  }
}

// Register custom element
if (!customElements.get("ha-breadcrumb")) {
  customElements.define("ha-breadcrumb", HaBreadcrumb);
}
