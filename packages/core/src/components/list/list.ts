import { listStyles, listItemStyles, listDividerStyles } from "./list.styles";

/**
 * List component
 *
 * @element ha-list
 *
 * @attr {string} density - List density: compact, default, comfortable
 * @attr {boolean} divided - Show dividers between items
 *
 * @slot - List items (ha-list-item elements)
 *
 * @csspart list - The list container
 */
export class HaList extends HTMLElement {
  private listElement: HTMLDivElement;
  private contentSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["density", "divided"];
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
    if (this.hasAttribute("divided")) {
      this.listElement.classList.add("list--divided");
    }

    // Handle density via CSS custom properties
    const density = this.getAttribute("density") || "default";
    const densityVar = `--component-list-item-padding-vertical-${density}`;
    this.style.setProperty("--list-item-padding-vertical", `var(${densityVar})`);
  }
}

/**
 * List Item component
 *
 * @element ha-list-item
 *
 * @attr {boolean} disabled - Disable the item
 * @attr {boolean} selected - Mark item as selected
 * @attr {boolean} interactive - Make item interactive (clickable)
 *
 * @slot - Item content
 * @slot prefix - Content before the main content (icon, avatar, etc.)
 * @slot suffix - Content after the main content (badge, icon, etc.)
 *
 * @fires list-item-click - Emitted when item is clicked
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
    return ["disabled", "selected", "interactive"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = listItemStyles;

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
    // Attributes are handled via :host([attr]) selectors in CSS
    // Set tabindex for keyboard navigation if interactive
    if (this.hasAttribute("interactive") && !this.hasAttribute("disabled")) {
      this.setAttribute("tabindex", "0");
    } else {
      this.removeAttribute("tabindex");
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
    style.textContent = listDividerStyles;

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
