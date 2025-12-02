import { cardStyles } from "./card.styles";

/**
 * Card component
 *
 * @element ha-card
 *
 * @attr {string} variant - Card variant: default, outlined, elevated
 * @attr {string} padding - Card padding: none, sm, md, lg
 * @attr {boolean} hoverable - Enable hover effect
 * @attr {boolean} clickable - Enable clickable state
 *
 * @slot - Card body content
 * @slot header - Card header content
 * @slot footer - Card footer content
 * @slot media - Media content (images, videos)
 *
 * @fires card-click - Emitted when card is clicked (if clickable)
 *
 * @cssprop --ha-card-padding - Card padding
 * @cssprop --ha-card-border-radius - Card border radius
 *
 * @csspart card - The card container
 * @csspart media - The media container
 * @csspart header - The header container
 * @csspart body - The body container
 * @csspart footer - The footer container
 */
export class HaCard extends HTMLElement {
  private cardElement: HTMLDivElement;
  private mediaSlot: HTMLSlotElement;
  private headerSlot: HTMLSlotElement;
  private bodySlot: HTMLSlotElement;
  private footerSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["variant", "padding", "hoverable", "clickable"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = cardStyles;

    // Create card container
    this.cardElement = document.createElement("div");
    this.cardElement.className = "card";
    this.cardElement.setAttribute("part", "card");

    // Create media container
    const mediaContainer = document.createElement("div");
    mediaContainer.className = "card__media";
    mediaContainer.setAttribute("part", "media");

    this.mediaSlot = document.createElement("slot");
    this.mediaSlot.name = "media";
    mediaContainer.appendChild(this.mediaSlot);

    // Create header container
    const headerContainer = document.createElement("div");
    headerContainer.className = "card__header";
    headerContainer.setAttribute("part", "header");

    this.headerSlot = document.createElement("slot");
    this.headerSlot.name = "header";
    headerContainer.appendChild(this.headerSlot);

    // Create body container
    const bodyContainer = document.createElement("div");
    bodyContainer.className = "card__body";
    bodyContainer.setAttribute("part", "body");

    this.bodySlot = document.createElement("slot");
    bodyContainer.appendChild(this.bodySlot);

    // Create footer container
    const footerContainer = document.createElement("div");
    footerContainer.className = "card__footer";
    footerContainer.setAttribute("part", "footer");

    this.footerSlot = document.createElement("slot");
    this.footerSlot.name = "footer";
    footerContainer.appendChild(this.footerSlot);

    // Append to card
    this.cardElement.appendChild(mediaContainer);
    this.cardElement.appendChild(headerContainer);
    this.cardElement.appendChild(bodyContainer);
    this.cardElement.appendChild(footerContainer);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.cardElement);

    // Handle click events
    this.cardElement.addEventListener("click", (e) => {
      if (this.clickable) {
        this.dispatchEvent(
          new CustomEvent("card-click", {
            bubbles: true,
            composed: true,
            detail: { originalEvent: e },
          }),
        );
      }
    });
  }

  connectedCallback() {
    // Set default attributes
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "default");
    }
    if (!this.hasAttribute("padding")) {
      this.setAttribute("padding", "md");
    }

    this.updateCardClasses();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "variant":
      case "padding":
      case "hoverable":
      case "clickable":
        this.updateCardClasses();
        break;
    }
  }

  private updateCardClasses() {
    const variant = this.variant;
    const padding = this.padding;
    const hoverable = this.hoverable;
    const clickable = this.clickable;

    let className = `card card--${variant} card--padding-${padding}`;

    if (hoverable) {
      className += " card--hoverable";
    }

    if (clickable) {
      className += " card--clickable";
    }

    this.cardElement.className = className;
  }

  // Public API
  get variant(): string {
    return this.getAttribute("variant") || "default";
  }

  set variant(value: string) {
    this.setAttribute("variant", value);
  }

  get padding(): string {
    return this.getAttribute("padding") || "md";
  }

  set padding(value: string) {
    this.setAttribute("padding", value);
  }

  get hoverable(): boolean {
    return this.hasAttribute("hoverable");
  }

  set hoverable(value: boolean) {
    if (value) {
      this.setAttribute("hoverable", "");
    } else {
      this.removeAttribute("hoverable");
    }
  }

  get clickable(): boolean {
    return this.hasAttribute("clickable");
  }

  set clickable(value: boolean) {
    if (value) {
      this.setAttribute("clickable", "");
    } else {
      this.removeAttribute("clickable");
    }
  }
}

// Register custom element
customElements.define("ha-card", HaCard);
