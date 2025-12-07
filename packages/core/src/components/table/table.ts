import { tableStyles } from "./table.styles";

/**
 * Table component
 *
 * @element ha-table
 *
 * @attr {boolean} striped - Enable striped rows
 * @attr {boolean} bordered - Enable borders
 * @attr {boolean} hoverable - Enable row hover effect
 * @attr {boolean} compact - Enable compact mode
 * @attr {boolean} full-width - Enable full width table
 *
 * @slot - Table content (thead, tbody, tfoot)
 *
 * @cssprop --table-border-color - Table border color
 * @cssprop --table-header-bg - Table header background
 * @cssprop --table-row-hover-bg - Table row hover background
 *
 * @csspart table - The table element
 * @csspart wrapper - The table wrapper
 */
export class HaTable extends HTMLElement {
  private wrapperElement: HTMLDivElement;
  private tableElement: HTMLTableElement;
  private contentSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["striped", "bordered", "hoverable", "compact", "full-width"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = tableStyles;

    // Create wrapper
    this.wrapperElement = document.createElement("div");
    this.wrapperElement.className = "table-wrapper";
    this.wrapperElement.setAttribute("part", "wrapper");

    // Create table element
    this.tableElement = document.createElement("table");
    this.tableElement.className = "table";
    this.tableElement.setAttribute("part", "table");

    // Create slot for table content
    this.contentSlot = document.createElement("slot");
    this.tableElement.appendChild(this.contentSlot);

    // Append to wrapper
    this.wrapperElement.appendChild(this.tableElement);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.wrapperElement);
  }

  connectedCallback() {
    this.updateClasses();
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      this.updateClasses();
    }
  }

  private updateClasses() {
    // Remove all modifier classes
    this.tableElement.className = "table";

    // Add modifier classes based on attributes
    if (this.hasAttribute("striped")) {
      this.tableElement.classList.add("table--striped");
    }

    if (this.hasAttribute("bordered")) {
      this.tableElement.classList.add("table--bordered");
    }

    if (this.hasAttribute("hoverable")) {
      this.tableElement.classList.add("table--hoverable");
    }

    if (this.hasAttribute("compact")) {
      this.tableElement.classList.add("table--compact");
    }

    if (this.hasAttribute("full-width")) {
      this.tableElement.classList.add("table--full-width");
    }
  }
}

// Register the custom element
if (!customElements.get("ha-table")) {
  customElements.define("ha-table", HaTable);
}
