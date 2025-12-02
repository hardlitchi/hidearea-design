import { tabsStyles } from "./tabs.styles";

/**
 * Tabs component
 *
 * @element ha-tabs
 *
 * @attr {string} value - Currently active tab value
 * @attr {string} variant - Tab variant: default, outlined, pills
 * @attr {string} size - Tab size: sm, md, lg
 * @attr {string} align - Tab alignment: start, center, end
 *
 * @slot - Tab items (ha-tab-item elements)
 *
 * @fires tab-change - Emitted when active tab changes
 */
export class HaTabs extends HTMLElement {
  private tabsList: HTMLDivElement;
  private tabsSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["value", "variant", "size", "align"];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = tabsStyles;

    // Create container
    const container = document.createElement("div");
    container.className = "tabs-container";
    container.setAttribute("part", "container");

    // Create tabs list
    this.tabsList = document.createElement("div");
    this.tabsList.className = "tabs-list";
    this.tabsList.setAttribute("part", "list");
    this.tabsList.setAttribute("role", "tablist");

    // Create slot for tab items
    this.tabsSlot = document.createElement("slot");
    this.tabsList.appendChild(this.tabsSlot);

    // Append to container
    container.appendChild(this.tabsList);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(container);

    // Listen for slotchange to set up tab items
    this.tabsSlot.addEventListener("slotchange", () => {
      this.setupTabs();
    });

    // Handle keyboard navigation
    this.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  connectedCallback() {
    // Set default attributes
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "default");
    }
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "md");
    }
    if (!this.hasAttribute("align")) {
      this.setAttribute("align", "start");
    }

    this.updateClasses();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "value") {
      this.updateActiveTabs();
    } else {
      this.updateClasses();
    }
  }

  private updateClasses() {
    const classes = [
      "tabs-list",
      `variant-${this.variant}`,
      `align-${this.align}`,
    ];

    this.tabsList.className = classes.join(" ");
  }

  private setupTabs() {
    const tabs = this.getTabItems();

    // Set size and variant on all tabs
    tabs.forEach((tab) => {
      tab.size = this.size;
      tab.variant = this.variant;

      // Add click listener
      tab.addEventListener("tab-click", ((e: CustomEvent) => {
        this.selectTab(e.detail.value);
      }) as EventListener);
    });

    // If no active tab is set, activate the first non-disabled tab
    if (!this.value && tabs.length > 0) {
      const firstEnabledTab = tabs.find((tab) => !tab.disabled);
      if (firstEnabledTab) {
        this.value = firstEnabledTab.value;
      }
    }

    this.updateActiveTabs();
  }

  private getTabItems(): Array<
    HTMLElement & {
      value: string;
      disabled: boolean;
      active: boolean;
      size: string;
      variant: string;
    }
  > {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return [];

    const elements = slot.assignedElements();
    return elements.filter((el) => el.tagName === "HA-TAB-ITEM") as Array<
      HTMLElement & {
        value: string;
        disabled: boolean;
        active: boolean;
        size: string;
        variant: string;
      }
    >;
  }

  private updateActiveTabs() {
    const tabs = this.getTabItems();

    tabs.forEach((tab) => {
      tab.active = tab.value === this.value;
    });

    // Update associated panels
    this.updatePanels();
  }

  private updatePanels() {
    // Find all tab panels in the document
    const panels = document.querySelectorAll("ha-tab-panel");
    panels.forEach((panel) => {
      const tabPanel = panel as HTMLElement & {
        value: string;
        active: boolean;
      };
      tabPanel.active = tabPanel.value === this.value;
    });
  }

  private selectTab(value: string) {
    if (value === this.value) return;

    const oldValue = this.value;
    this.value = value;

    this.dispatchEvent(
      new CustomEvent("tab-change", {
        bubbles: true,
        composed: true,
        detail: {
          value,
          oldValue,
        },
      }),
    );
  }

  private handleKeydown(e: KeyboardEvent) {
    const tabs = this.getTabItems().filter((tab) => !tab.disabled);
    const currentIndex = tabs.findIndex((tab) => tab.value === this.value);

    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    if (tabs[newIndex]) {
      this.selectTab(tabs[newIndex].value);
      tabs[newIndex].focus();
    }
  }

  // Public API
  get value(): string {
    return this.getAttribute("value") || "";
  }

  set value(value: string) {
    this.setAttribute("value", value);
  }

  get variant(): string {
    return this.getAttribute("variant") || "default";
  }

  set variant(value: string) {
    this.setAttribute("variant", value);
  }

  get size(): string {
    return this.getAttribute("size") || "md";
  }

  set size(value: string) {
    this.setAttribute("size", value);
  }

  get align(): string {
    return this.getAttribute("align") || "start";
  }

  set align(value: string) {
    this.setAttribute("align", value);
  }
}

// Register custom element
if (!customElements.get("ha-tabs")) {
  customElements.define("ha-tabs", HaTabs);
}
