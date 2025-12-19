import { tableStyles } from "@hidearea-design/tokens/styles";

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
    this.applyTableStyles();
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

  private applyTableStyles() {
    // Apply styles to slotted Light DOM elements
    // This is needed because ::slotted() doesn't penetrate nested structures
    const applyStyles = () => {
      // Find the table element in Light DOM
      const table = this.querySelector("table");
      if (!table) return;

      // Apply table base styles
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.style.borderSpacing = "0";

      const thead = table.querySelector("thead");
      const tbody = table.querySelector("tbody");
      const ths = table.querySelectorAll("th");
      const tds = table.querySelectorAll("td");
      const trs = table.querySelectorAll("tr");

      // Apply inline styles via CSS custom properties
      if (thead) {
        thead.style.backgroundColor = "var(--component-table-header-background)";
      }

      ths.forEach((th) => {
        th.style.padding = "var(--component-table-padding-default)";
        th.style.textAlign = "left";
        th.style.verticalAlign = "middle";
        th.style.fontWeight = "var(--font-weight-semibold)";

        if (this.hasAttribute("bordered")) {
          th.style.border = "1px solid var(--component-table-border-color)";
        }
        if (this.hasAttribute("compact")) {
          th.style.padding = "var(--component-table-padding-compact)";
        }
      });

      tds.forEach((td) => {
        td.style.padding = "var(--component-table-padding-default)";
        td.style.textAlign = "left";
        td.style.verticalAlign = "middle";

        if (this.hasAttribute("bordered")) {
          td.style.border = "1px solid var(--component-table-border-color)";
        }
        if (this.hasAttribute("compact")) {
          td.style.padding = "var(--component-table-padding-compact)";
        }
      });

      // Striped rows
      if (this.hasAttribute("striped") && tbody) {
        const rows = tbody.querySelectorAll("tr");
        rows.forEach((row, index) => {
          if (index % 2 === 1) {
            (row as HTMLElement).style.backgroundColor = "var(--component-table-striped-background)";
          }
        });
      }

      // Hoverable rows
      if (this.hasAttribute("hoverable")) {
        trs.forEach((tr) => {
          tr.addEventListener("mouseenter", () => {
            (tr as HTMLElement).style.backgroundColor = "var(--component-table-row-hover-background)";
            (tr as HTMLElement).style.cursor = "pointer";
          });
          tr.addEventListener("mouseleave", () => {
            // Only reset if not a striped even row
            const isStriped = this.hasAttribute("striped");
            const isEvenRow = Array.from(tr.parentElement?.children || []).indexOf(tr) % 2 === 1;
            if (!isStriped || !isEvenRow) {
              (tr as HTMLElement).style.backgroundColor = "";
            } else {
              (tr as HTMLElement).style.backgroundColor = "var(--component-table-striped-background)";
            }
            (tr as HTMLElement).style.cursor = "";
          });
        });
      }
    };

    // Apply styles immediately
    applyStyles();

    // Also apply when slot content changes
    this.contentSlot.addEventListener("slotchange", applyStyles);
  }
}

// Register the custom element
if (!customElements.get("ha-table")) {
  customElements.define("ha-table", HaTable);
}
