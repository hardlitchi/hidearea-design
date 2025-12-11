import { badgeStyles } from "@hidearea-design/tokens/styles";

/**
 * Badge component
 *
 * @element ha-badge
 *
 * @attr {string} variant - Badge variant: primary, secondary, success, warning, error, info
 * @attr {string} style-variant - Badge style: filled, outlined, soft
 * @attr {string} size - Badge size: sm, md, lg
 * @attr {boolean} pill - Pill-shaped badge
 * @attr {boolean} dot - Dot-only badge (no content)
 * @attr {boolean} removable - Show remove button
 *
 * @slot - Badge content
 * @slot icon - Custom icon
 *
 * @fires badge-remove - Emitted when remove button is clicked
 *
 * @cssprop --ha-badge-padding - Badge padding
 * @cssprop --ha-badge-font-size - Badge font size
 *
 * @csspart badge - The badge container
 * @csspart icon - The icon container
 * @csspart content - The content container
 * @csspart remove - The remove button
 */
export class HaBadge extends HTMLElement {
  private badgeElement: HTMLDivElement;
  private iconSlot: HTMLSlotElement;
  private contentSlot: HTMLSlotElement;
  private removeButton: HTMLButtonElement;

  static get observedAttributes() {
    return ["variant", "style-variant", "size", "pill", "dot", "removable"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = badgeStyles;

    // Create badge container
    this.badgeElement = document.createElement("div");
    this.badgeElement.className = "badge";
    this.badgeElement.setAttribute("part", "badge");

    // Create icon container
    const iconContainer = document.createElement("span");
    iconContainer.className = "badge__icon";
    iconContainer.setAttribute("part", "icon");

    this.iconSlot = document.createElement("slot");
    this.iconSlot.name = "icon";
    iconContainer.appendChild(this.iconSlot);

    // Create content container
    const contentContainer = document.createElement("span");
    contentContainer.className = "badge__content";
    contentContainer.setAttribute("part", "content");

    this.contentSlot = document.createElement("slot");
    contentContainer.appendChild(this.contentSlot);

    // Create remove button
    this.removeButton = document.createElement("button");
    this.removeButton.className = "badge__remove";
    this.removeButton.setAttribute("part", "remove");
    this.removeButton.setAttribute("type", "button");
    this.removeButton.setAttribute("aria-label", "Remove");
    this.removeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    `;

    this.removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.handleRemove();
    });

    // Append elements
    this.badgeElement.appendChild(iconContainer);
    this.badgeElement.appendChild(contentContainer);
    this.badgeElement.appendChild(this.removeButton);

    shadow.appendChild(style);
    shadow.appendChild(this.badgeElement);

    // Handle icon slot
    this.iconSlot.addEventListener("slotchange", () => {
      const iconContainer = this.iconSlot.parentElement;
      if (this.iconSlot.assignedElements().length === 0) {
        iconContainer!.style.display = "none";
      } else {
        iconContainer!.style.display = "flex";
      }
    });
  }

  connectedCallback() {
    // Set default attributes
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "primary");
    }
    if (!this.hasAttribute("style-variant")) {
      this.setAttribute("style-variant", "filled");
    }
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "md");
    }

    this.updateBadgeClasses();
    this.updateRemoveButton();
    this.updateIconVisibility();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "variant":
      case "style-variant":
      case "size":
      case "pill":
      case "dot":
        this.updateBadgeClasses();
        break;
      case "removable":
        this.updateRemoveButton();
        break;
    }
  }

  private updateBadgeClasses() {
    const variant = this.variant;
    const styleVariant = this.styleVariant;
    const size = this.size;
    const pill = this.pill;
    const dot = this.dot;

    let className = `badge badge--${size} badge--${variant}`;

    if (styleVariant !== "filled") {
      className += ` badge--${styleVariant}`;
    }

    if (pill) {
      className += " badge--pill";
    }

    if (dot) {
      className += " badge--dot";
    }

    this.badgeElement.className = className;
  }

  private updateRemoveButton() {
    this.removeButton.style.display = this.removable ? "flex" : "none";
  }

  private updateIconVisibility() {
    const iconContainer = this.iconSlot.parentElement;
    if (this.iconSlot.assignedElements().length === 0) {
      iconContainer!.style.display = "none";
    }
  }

  private handleRemove() {
    this.dispatchEvent(
      new CustomEvent("badge-remove", {
        bubbles: true,
        composed: true,
      }),
    );

    // Default behavior: remove element
    this.remove();
  }

  // Public API
  get variant(): string {
    return this.getAttribute("variant") || "primary";
  }

  set variant(value: string) {
    this.setAttribute("variant", value);
  }

  get styleVariant(): string {
    return this.getAttribute("style-variant") || "filled";
  }

  set styleVariant(value: string) {
    this.setAttribute("style-variant", value);
  }

  get size(): string {
    return this.getAttribute("size") || "md";
  }

  set size(value: string) {
    this.setAttribute("size", value);
  }

  get pill(): boolean {
    return this.hasAttribute("pill");
  }

  set pill(value: boolean) {
    if (value) {
      this.setAttribute("pill", "");
    } else {
      this.removeAttribute("pill");
    }
  }

  get dot(): boolean {
    return this.hasAttribute("dot");
  }

  set dot(value: boolean) {
    if (value) {
      this.setAttribute("dot", "");
    } else {
      this.removeAttribute("dot");
    }
  }

  get removable(): boolean {
    return this.hasAttribute("removable");
  }

  set removable(value: boolean) {
    if (value) {
      this.setAttribute("removable", "");
    } else {
      this.removeAttribute("removable");
    }
  }

  /**
   * Remove the badge
   */
  remove() {
    super.remove();
  }
}

// Register custom element
customElements.define("ha-badge", HaBadge);
