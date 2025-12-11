import { gridStyles } from "@hidearea-design/tokens/styles";

/**
 * Grid component
 *
 * @element ha-grid
 *
 * @attr {string} columns - Number of columns: 1-12 or auto-fit, auto-fill
 * @attr {string} gap - Gap size: 0-12 (maps to spacing tokens)
 * @attr {string} row-gap - Row gap size: 0-12 (maps to spacing tokens)
 * @attr {string} column-gap - Column gap size: 0-12 (maps to spacing tokens)
 * @attr {string} align-items - Align items: start, center, end, stretch
 * @attr {string} justify-items - Justify items: start, center, end, stretch
 *
 * @slot - Grid items
 */
export class HaGrid extends HTMLElement {
  private grid: HTMLDivElement;

  static get observedAttributes() {
    return [
      "columns",
      "gap",
      "row-gap",
      "column-gap",
      "align-items",
      "justify-items",
    ];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = gridStyles;

    // Create grid element
    this.grid = document.createElement("div");
    this.grid.setAttribute("part", "grid");

    // Create slot for content
    const slot = document.createElement("slot");
    this.grid.appendChild(slot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.grid);
  }

  connectedCallback() {
    // Set default attributes if not present
    if (!this.hasAttribute("columns")) {
      this.setAttribute("columns", "12");
    }
    if (!this.hasAttribute("gap")) {
      this.setAttribute("gap", "4");
    }
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateGridStyles();
  }

  private updateGridStyles() {
    const columns = this.getAttribute("columns") || "12";
    const gap = this.getAttribute("gap");
    const rowGap = this.getAttribute("row-gap");
    const columnGap = this.getAttribute("column-gap");

    // Handle columns
    if (columns === "auto-fit" || columns === "auto-fill") {
      this.grid.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    } else {
      this.grid.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
    }

    // Handle gap
    if (gap) {
      this.grid.style.gap = `var(--spacing-${gap}, ${this.getSpacingValue(gap)})`;
    }

    // Handle row-gap
    if (rowGap) {
      this.grid.style.rowGap = `var(--spacing-${rowGap}, ${this.getSpacingValue(
        rowGap,
      )})`;
    }

    // Handle column-gap
    if (columnGap) {
      this.grid.style.columnGap = `var(--spacing-${columnGap}, ${this.getSpacingValue(
        columnGap,
      )})`;
    }
  }

  private getSpacingValue(key: string): string {
    const spacingMap: Record<string, string> = {
      "0": "0",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
      "9": "2.25rem",
      "10": "2.5rem",
      "11": "2.75rem",
      "12": "3rem",
    };
    return spacingMap[key] || "1rem";
  }

  // Public API
  get columns(): string {
    return this.getAttribute("columns") || "12";
  }

  set columns(value: string) {
    this.setAttribute("columns", value);
  }

  get gap(): string {
    return this.getAttribute("gap") || "4";
  }

  set gap(value: string) {
    this.setAttribute("gap", value);
  }

  get rowGap(): string | null {
    return this.getAttribute("row-gap");
  }

  set rowGap(value: string | null) {
    if (value) {
      this.setAttribute("row-gap", value);
    } else {
      this.removeAttribute("row-gap");
    }
  }

  get columnGap(): string | null {
    return this.getAttribute("column-gap");
  }

  set columnGap(value: string | null) {
    if (value) {
      this.setAttribute("column-gap", value);
    } else {
      this.removeAttribute("column-gap");
    }
  }

  get alignItems(): string | null {
    return this.getAttribute("align-items");
  }

  set alignItems(value: string | null) {
    if (value) {
      this.setAttribute("align-items", value);
    } else {
      this.removeAttribute("align-items");
    }
  }

  get justifyItems(): string | null {
    return this.getAttribute("justify-items");
  }

  set justifyItems(value: string | null) {
    if (value) {
      this.setAttribute("justify-items", value);
    } else {
      this.removeAttribute("justify-items");
    }
  }
}

// Register custom element
if (!customElements.get("ha-grid")) {
  customElements.define("ha-grid", HaGrid);
}
