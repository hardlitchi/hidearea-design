import { paginationStyles } from "@hidearea-design/tokens/styles";

/**
 * Pagination component
 *
 * @element ha-pagination
 *
 * @attr {number} total - Total number of items
 * @attr {number} page - Current page number (1-indexed)
 * @attr {number} page-size - Number of items per page
 * @attr {string} size - Size: sm, md, lg
 * @attr {string} variant - Variant: default, simple, compact
 * @attr {boolean} show-info - Show info text
 *
 * @fires page-change - Emitted when page changes
 *
 * @csspart container - The pagination container
 * @csspart button - Pagination button
 * @csspart page - Page number button
 * @csspart prev - Previous button
 * @csspart next - Next button
 * @csspart first - First page button
 * @csspart last - Last page button
 * @csspart ellipsis - Ellipsis indicator
 * @csspart info - Info text
 */
export class HaPagination extends HTMLElement {
  private containerElement: HTMLDivElement;

  static get observedAttributes() {
    return ["total", "page", "page-size", "size", "variant", "show-info"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = paginationStyles;

    // Create container
    this.containerElement = document.createElement("div");
    this.containerElement.className = "container";
    this.containerElement.setAttribute("part", "container");
    this.containerElement.setAttribute("role", "navigation");
    this.containerElement.setAttribute("aria-label", "Pagination");

    shadow.appendChild(style);
    shadow.appendChild(this.containerElement);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.render();
  }

  private get totalPages(): number {
    const total = parseInt(this.getAttribute("total") || "0");
    const pageSize = parseInt(this.getAttribute("page-size") || "10");
    return Math.ceil(total / pageSize);
  }

  private get currentPage(): number {
    return parseInt(this.getAttribute("page") || "1");
  }

  private get startItem(): number {
    const pageSize = parseInt(this.getAttribute("page-size") || "10");
    return (this.currentPage - 1) * pageSize + 1;
  }

  private get endItem(): number {
    const total = parseInt(this.getAttribute("total") || "0");
    const pageSize = parseInt(this.getAttribute("page-size") || "10");
    return Math.min(this.currentPage * pageSize, total);
  }

  private handlePageChange(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.setAttribute("page", page.toString());
    this.emit("page-change", { page });
  }

  private emit(eventName: string, detail?: unknown) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private getPageNumbers(): (number | "ellipsis")[] {
    const pages: (number | "ellipsis")[] = [];
    const totalPages = this.totalPages;
    const current = this.currentPage;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < totalPages - 2) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  }

  private render() {
    const variant = this.getAttribute("variant") || "default";
    const showInfo = this.hasAttribute("show-info");
    const pages = this.getPageNumbers();
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const total = parseInt(this.getAttribute("total") || "0");

    this.containerElement.innerHTML = "";

    // First button
    if (variant !== "simple") {
      const firstButton = this.createButton("««", "first", currentPage === 1);
      firstButton.addEventListener("click", () => this.handlePageChange(1));
      this.containerElement.appendChild(firstButton);
    }

    // Previous button
    const prevButton = this.createButton("‹", "prev", currentPage === 1);
    prevButton.addEventListener("click", () => this.handlePageChange(currentPage - 1));
    this.containerElement.appendChild(prevButton);

    // Page numbers
    if (variant !== "simple") {
      pages.forEach((pageNum) => {
        if (pageNum === "ellipsis") {
          const ellipsis = document.createElement("span");
          ellipsis.className = "ellipsis";
          ellipsis.setAttribute("part", "ellipsis");
          ellipsis.textContent = "...";
          this.containerElement.appendChild(ellipsis);
        } else {
          const pageButton = this.createButton(
            pageNum.toString(),
            "page",
            false,
            pageNum === currentPage
          );
          pageButton.addEventListener("click", () => this.handlePageChange(pageNum));
          if (pageNum === currentPage) {
            pageButton.setAttribute("aria-current", "page");
          }
          this.containerElement.appendChild(pageButton);
        }
      });
    }

    // Simple variant info
    if (variant === "simple") {
      const info = document.createElement("span");
      info.className = "info";
      info.setAttribute("part", "info");
      info.textContent = `${currentPage} / ${totalPages}`;
      this.containerElement.appendChild(info);
    }

    // Next button
    const nextButton = this.createButton("›", "next", currentPage === totalPages);
    nextButton.addEventListener("click", () => this.handlePageChange(currentPage + 1));
    this.containerElement.appendChild(nextButton);

    // Last button
    if (variant !== "simple") {
      const lastButton = this.createButton("»»", "last", currentPage === totalPages);
      lastButton.addEventListener("click", () => this.handlePageChange(totalPages));
      this.containerElement.appendChild(lastButton);
    }

    // Info text
    if (showInfo && variant !== "simple") {
      const info = document.createElement("span");
      info.className = "info";
      info.setAttribute("part", "info");
      info.textContent = `${this.startItem}-${this.endItem} of ${total}`;
      this.containerElement.appendChild(info);
    }
  }

  private createButton(
    text: string,
    partName: string,
    disabled: boolean,
    active = false
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = `button ${partName}${active ? " active" : ""}`;
    button.setAttribute("part", `button ${partName}`);
    button.textContent = text;
    button.disabled = disabled;

    const ariaLabels: Record<string, string> = {
      first: "First page",
      prev: "Previous page",
      next: "Next page",
      last: "Last page",
    };

    if (ariaLabels[partName]) {
      button.setAttribute("aria-label", ariaLabels[partName]);
    } else if (partName === "page") {
      button.setAttribute("aria-label", `Page ${text}`);
    }

    return button;
  }
}

// Register the custom element
customElements.define("ha-pagination", HaPagination);
