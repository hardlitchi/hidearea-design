import { listStyles } from "./list.styles";

/**
 * List component
 *
 * @element ha-list
 *
 * @attr {boolean} bordered - Enable borders around list
 * @attr {boolean} hoverable - Enable hover effect on items
 * @attr {boolean} divided - Show dividers between items
 *
 * @slot - List items (ha-list-item elements)
 *
 * @cssprop --ha-list-border-color - List border color
 * @cssprop --ha-list-item-padding - List item padding
 *
 * @csspart list - The list container
 */
export class HaList extends HTMLElement {
  private listElement: HTMLDivElement;
  private contentSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["bordered", "hoverable", "divided"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = listStyles;

    // Create list container
    this.listElement = document.createElement("div");
    this.listElement.className = "list";
    this.listElement.setAttribute("part", "list");
    this.listElement.setAttribute("role", "list");

    // Create slot for list items
    this.contentSlot = document.createElement("slot");
    this.listElement.appendChild(this.contentSlot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.listElement);
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
    this.listElement.className = "list";

    // Add modifier classes based on attributes
    if (this.hasAttribute("bordered")) {
      this.listElement.classList.add("list--bordered");
    }

    if (this.hasAttribute("hoverable")) {
      this.listElement.classList.add("list--hoverable");
    }

    if (this.hasAttribute("divided")) {
      this.listElement.classList.add("list--divided");
    }
  }
}

/**
 * List Item component
 *
 * @element ha-list-item
 *
 * @attr {boolean} disabled - Disable the item
 * @attr {boolean} active - Mark item as active
 *
 * @slot - Item content
 * @slot prefix - Content before the main content (icon, avatar, etc.)
 * @slot suffix - Content after the main content (badge, icon, etc.)
 *
 * @fires list-item-click - Emitted when item is clicked
 *
 * @cssprop --ha-list-item-padding - List item padding
 *
 * @csspart item - The list item container
 * @csspart prefix - The prefix container
 * @csspart content - The content container
 * @csspart suffix - The suffix container
 */
export class HaListItem extends HTMLElement {
  private itemElement: HTMLDivElement;
  private prefixContainer: HTMLDivElement;
  private prefixSlot: HTMLSlotElement;
  private contentContainer: HTMLDivElement;
  private contentSlot: HTMLSlotElement;
  private suffixContainer: HTMLDivElement;
  private suffixSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["disabled", "active"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = listStyles;

    // Create item container
    this.itemElement = document.createElement("div");
    this.itemElement.className = "list-item";
    this.itemElement.setAttribute("part", "item");
    this.itemElement.setAttribute("role", "listitem");

    // Create prefix container
    this.prefixContainer = document.createElement("div");
    this.prefixContainer.className = "list-item__prefix";
    this.prefixContainer.setAttribute("part", "prefix");

    this.prefixSlot = document.createElement("slot");
    this.prefixSlot.name = "prefix";
    this.prefixContainer.appendChild(this.prefixSlot);

    // Create content container
    this.contentContainer = document.createElement("div");
    this.contentContainer.className = "list-item__content";
    this.contentContainer.setAttribute("part", "content");

    this.contentSlot = document.createElement("slot");
    this.contentContainer.appendChild(this.contentSlot);

    // Create suffix container
    this.suffixContainer = document.createElement("div");
    this.suffixContainer.className = "list-item__suffix";
    this.suffixContainer.setAttribute("part", "suffix");

    this.suffixSlot = document.createElement("slot");
    this.suffixSlot.name = "suffix";
    this.suffixContainer.appendChild(this.suffixSlot);

    // Append to item
    this.itemElement.appendChild(this.prefixContainer);
    this.itemElement.appendChild(this.contentContainer);
    this.itemElement.appendChild(this.suffixContainer);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.itemElement);

    // Handle click events
    this.itemElement.addEventListener("click", () => {
      if (!this.hasAttribute("disabled")) {
        this.dispatchEvent(
          new CustomEvent("list-item-click", {
            bubbles: true,
            composed: true,
          })
        );
      }
    });
  }

  connectedCallback() {
    this.updateState();
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      this.updateState();
    }
  }

  private updateState() {
    // Remove all state classes
    this.itemElement.className = "list-item";

    // Add state classes based on attributes
    if (this.hasAttribute("disabled")) {
      this.itemElement.classList.add("list-item--disabled");
    }

    if (this.hasAttribute("active")) {
      this.itemElement.classList.add("list-item--active");
    }
  }
}

/**
 * List Divider component
 *
 * @element ha-list-divider
 *
 * @csspart divider - The divider element
 */
export class HaListDivider extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = listStyles;

    // Create divider
    const divider = document.createElement("div");
    divider.className = "list-divider";
    divider.setAttribute("part", "divider");
    divider.setAttribute("role", "separator");

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(divider);
  }
}

// Register the custom elements
if (!customElements.get("ha-list")) {
  customElements.define("ha-list", HaList);
}

if (!customElements.get("ha-list-item")) {
  customElements.define("ha-list-item", HaListItem);
}

if (!customElements.get("ha-list-divider")) {
  customElements.define("ha-list-divider", HaListDivider);
}
