import { accordionStyles } from "./accordion.styles";

/**
 * Accordion component
 *
 * @element ha-accordion
 *
 * @attr {boolean} allow-multiple - Allow multiple items to be open simultaneously
 * @attr {boolean} collapsible - Allow all items to be collapsed
 *
 * @slot - Accordion items (ha-accordion-item elements)
 *
 * @cssprop --ha-accordion-border-color - Accordion border color
 *
 * @csspart accordion - The accordion container
 */
export class HaAccordion extends HTMLElement {
  private accordionElement: HTMLDivElement;
  private contentSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["allow-multiple", "collapsible"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = accordionStyles;

    // Create accordion container
    this.accordionElement = document.createElement("div");
    this.accordionElement.className = "accordion";
    this.accordionElement.setAttribute("part", "accordion");

    // Create slot for accordion items
    this.contentSlot = document.createElement("slot");
    this.accordionElement.appendChild(this.contentSlot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.accordionElement);

    // Handle slot changes to manage accordion items
    this.contentSlot.addEventListener("slotchange", () => {
      this.updateItems();
    });
  }

  connectedCallback() {
    this.updateItems();
  }

  private updateItems() {
    const items = this.querySelectorAll("ha-accordion-item");
    const allowMultiple = this.hasAttribute("allow-multiple");

    items.forEach((item) => {
      // Set accordion reference on item
      (item as any).__accordion = this;

      // Handle item toggle
      item.addEventListener("accordion-toggle", ((e: CustomEvent) => {
        if (!allowMultiple && e.detail.open) {
          // Close other items
          items.forEach((otherItem) => {
            if (otherItem !== item && otherItem.hasAttribute("open")) {
              otherItem.removeAttribute("open");
            }
          });
        }
      }) as EventListener);
    });
  }

  get allowMultiple(): boolean {
    return this.hasAttribute("allow-multiple");
  }

  get collapsible(): boolean {
    return this.hasAttribute("collapsible");
  }
}

/**
 * Accordion Item component
 *
 * @element ha-accordion-item
 *
 * @attr {boolean} open - Item open state
 * @attr {boolean} disabled - Disable the item
 * @attr {string} header - Header text
 *
 * @slot - Item content
 * @slot header - Header content (overrides header attribute)
 * @slot icon - Custom expand/collapse icon
 *
 * @fires accordion-toggle - Emitted when item is toggled
 * @fires accordion-open - Emitted when item is opened
 * @fires accordion-close - Emitted when item is closed
 *
 * @cssprop --ha-accordion-item-padding - Item padding
 *
 * @csspart item - The accordion item container
 * @csspart header - The header container
 * @csspart content - The content container
 * @csspart icon - The expand/collapse icon
 */
export class HaAccordionItem extends HTMLElement {
  private itemElement: HTMLDivElement;
  private headerElement: HTMLButtonElement;
  private headerSlot: HTMLSlotElement;
  private iconElement: HTMLSpanElement;
  private iconSlot: HTMLSlotElement;
  private contentElement: HTMLDivElement;
  private contentSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["open", "disabled", "header"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = accordionStyles;

    // Create item container
    this.itemElement = document.createElement("div");
    this.itemElement.className = "accordion-item";
    this.itemElement.setAttribute("part", "item");

    // Create header button
    this.headerElement = document.createElement("button");
    this.headerElement.className = "accordion-item__header";
    this.headerElement.setAttribute("part", "header");
    this.headerElement.type = "button";
    this.headerElement.setAttribute("aria-expanded", "false");

    // Create header slot
    this.headerSlot = document.createElement("slot");
    this.headerSlot.name = "header";
    this.headerElement.appendChild(this.headerSlot);

    // Create icon container
    this.iconElement = document.createElement("span");
    this.iconElement.className = "accordion-item__icon";
    this.iconElement.setAttribute("part", "icon");
    this.iconElement.setAttribute("aria-hidden", "true");

    this.iconSlot = document.createElement("slot");
    this.iconSlot.name = "icon";
    this.iconElement.appendChild(this.iconSlot);

    // Default icon (chevron down)
    const defaultIcon = document.createTextNode("▼");
    this.iconSlot.addEventListener("slotchange", () => {
      const nodes = this.iconSlot.assignedNodes();
      if (nodes.length === 0) {
        this.iconElement.appendChild(defaultIcon);
      } else {
        if (this.iconElement.contains(defaultIcon)) {
          this.iconElement.removeChild(defaultIcon);
        }
      }
    });
    this.iconElement.appendChild(defaultIcon);

    this.headerElement.appendChild(this.iconElement);

    // Create content container
    this.contentElement = document.createElement("div");
    this.contentElement.className = "accordion-item__content";
    this.contentElement.setAttribute("part", "content");
    this.contentElement.setAttribute("role", "region");

    this.contentSlot = document.createElement("slot");
    this.contentElement.appendChild(this.contentSlot);

    // Append to item
    this.itemElement.appendChild(this.headerElement);
    this.itemElement.appendChild(this.contentElement);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.itemElement);

    // Handle click events
    this.headerElement.addEventListener("click", () => {
      if (!this.hasAttribute("disabled")) {
        this.toggle();
      }
    });

    // Handle header slot change to update text
    this.headerSlot.addEventListener("slotchange", () => {
      this.updateHeaderText();
    });
  }

  connectedCallback() {
    this.updateState();
    this.updateHeaderText();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      if (name === "open") {
        this.updateState();
      } else if (name === "disabled") {
        this.updateDisabled();
      } else if (name === "header") {
        this.updateHeaderText();
      }
    }
  }

  private updateState() {
    const isOpen = this.hasAttribute("open");
    this.headerElement.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      this.itemElement.classList.add("accordion-item--open");
      this.contentElement.style.maxHeight = `${this.contentElement.scrollHeight}px`;
    } else {
      this.itemElement.classList.remove("accordion-item--open");
      this.contentElement.style.maxHeight = "0";
    }
  }

  private updateDisabled() {
    const isDisabled = this.hasAttribute("disabled");
    this.headerElement.disabled = isDisabled;

    if (isDisabled) {
      this.itemElement.classList.add("accordion-item--disabled");
    } else {
      this.itemElement.classList.remove("accordion-item--disabled");
    }
  }

  private updateHeaderText() {
    // Check if header slot has content
    const headerNodes = this.headerSlot.assignedNodes();
    if (headerNodes.length === 0 && this.hasAttribute("header")) {
      // Use header attribute
      const headerText = document.createElement("span");
      headerText.textContent = this.getAttribute("header") || "";
      this.headerSlot.appendChild(headerText);
    }
  }

  toggle() {
    if (this.hasAttribute("open")) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.hasAttribute("open")) {
      this.setAttribute("open", "");
      this.dispatchEvent(
        new CustomEvent("accordion-toggle", {
          detail: { open: true },
          bubbles: true,
          composed: true,
        })
      );
      this.dispatchEvent(
        new CustomEvent("accordion-open", {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  close() {
    if (this.hasAttribute("open")) {
      this.removeAttribute("open");
      this.dispatchEvent(
        new CustomEvent("accordion-toggle", {
          detail: { open: false },
          bubbles: true,
          composed: true,
        })
      );
      this.dispatchEvent(
        new CustomEvent("accordion-close", {
          bubbles: true,
          composed: true,
        })
      );
    }
  }
}

// Register the custom elements
if (!customElements.get("ha-accordion")) {
  customElements.define("ha-accordion", HaAccordion);
}

if (!customElements.get("ha-accordion-item")) {
  customElements.define("ha-accordion-item", HaAccordionItem);
}
