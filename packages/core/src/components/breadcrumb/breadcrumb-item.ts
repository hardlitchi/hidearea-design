import { breadcrumbItemStyles } from "./breadcrumb.styles";

/**
 * Breadcrumb item component
 *
 * @element ha-breadcrumb-item
 *
 * @attr {string} href - Link URL
 * @attr {boolean} current - Current page indicator
 * @attr {string} separator - Separator type: slash, chevron, arrow, dot
 *
 * @slot - Item label content
 * @slot icon - Icon slot
 * @slot separator - Custom separator content
 *
 * @fires item-click - Emitted when item is clicked
 */
export class HaBreadcrumbItem extends HTMLElement {
  private itemElement: HTMLElement;
  private separatorElement: HTMLSpanElement;

  static get observedAttributes() {
    return ["href", "current", "separator"];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = breadcrumbItemStyles;

    // Create item element (will be either <a> or <span>)
    this.itemElement = document.createElement("span");
    this.itemElement.className = "breadcrumb-item";
    this.itemElement.setAttribute("part", "item");

    // Create icon slot
    const iconSlot = document.createElement("slot");
    iconSlot.name = "icon";

    // Create default slot
    const defaultSlot = document.createElement("slot");

    // Append slots to item
    this.itemElement.appendChild(iconSlot);
    this.itemElement.appendChild(defaultSlot);

    // Create separator
    this.separatorElement = document.createElement("span");
    this.separatorElement.className = "separator";
    this.separatorElement.setAttribute("part", "separator");
    this.separatorElement.setAttribute("aria-hidden", "true");

    // Create separator slot
    const separatorSlot = document.createElement("slot");
    separatorSlot.name = "separator";
    this.separatorElement.appendChild(separatorSlot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.itemElement);
    shadow.appendChild(this.separatorElement);

    // Handle click
    this.itemElement.addEventListener("click", (e) => {
      if (!this.current) {
        this.dispatchEvent(
          new CustomEvent("item-click", {
            bubbles: true,
            composed: true,
            detail: { href: this.href },
          }),
        );

        // If no href, prevent default
        if (!this.href) {
          e.preventDefault();
        }
      }
    });
  }

  connectedCallback() {
    // Set default separator
    if (!this.hasAttribute("separator")) {
      this.setAttribute("separator", "slash");
    }

    this.updateItem();
    this.updateSeparator();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (_name === "separator") {
      this.updateSeparator();
    } else {
      this.updateItem();
    }
  }

  private updateItem() {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    // Determine if we need an <a> or <span>
    const needsLink = this.href && !this.current;

    // If element type needs to change
    if (
      (needsLink && this.itemElement.tagName !== "A") ||
      (!needsLink && this.itemElement.tagName !== "SPAN")
    ) {
      const newElement = needsLink
        ? document.createElement("a")
        : document.createElement("span");

      newElement.className = this.itemElement.className;
      newElement.setAttribute("part", "item");

      // Move children
      while (this.itemElement.firstChild) {
        newElement.appendChild(this.itemElement.firstChild);
      }

      // Replace element
      shadow.replaceChild(newElement, this.itemElement);
      this.itemElement = newElement;

      // Re-attach click listener
      this.itemElement.addEventListener("click", (e) => {
        if (!this.current) {
          this.dispatchEvent(
            new CustomEvent("item-click", {
              bubbles: true,
              composed: true,
              detail: { href: this.href },
            }),
          );

          if (!this.href) {
            e.preventDefault();
          }
        }
      });
    }

    // Update href
    if (needsLink) {
      (this.itemElement as HTMLAnchorElement).href = this.href;
    }

    // Update classes
    const classes = ["breadcrumb-item"];
    if (this.current) {
      classes.push("current");
    }
    this.itemElement.className = classes.join(" ");

    // Update ARIA
    this.itemElement.setAttribute(
      "aria-current",
      this.current ? "page" : "false",
    );
  }

  private updateSeparator() {
    const separatorSlot = this.separatorElement.querySelector(
      'slot[name="separator"]',
    ) as HTMLSlotElement;
    const hasCustomSeparator =
      separatorSlot && separatorSlot.assignedElements().length > 0;

    if (!hasCustomSeparator) {
      this.separatorElement.className = `separator separator-${this.separator}`;
    } else {
      this.separatorElement.className = "separator";
    }
  }

  // Public API
  get href(): string {
    return this.getAttribute("href") || "";
  }

  set href(value: string) {
    if (value) {
      this.setAttribute("href", value);
    } else {
      this.removeAttribute("href");
    }
  }

  get current(): boolean {
    return this.hasAttribute("current");
  }

  set current(value: boolean) {
    if (value) {
      this.setAttribute("current", "");
    } else {
      this.removeAttribute("current");
    }
  }

  get separator(): string {
    return this.getAttribute("separator") || "slash";
  }

  set separator(value: string) {
    this.setAttribute("separator", value);
  }
}

// Register custom element
if (!customElements.get("ha-breadcrumb-item")) {
  customElements.define("ha-breadcrumb-item", HaBreadcrumbItem);
}
