import { tooltipStyles } from "@hidearea-design/tokens/styles";

/**
 * Tooltip component
 *
 * @element ha-tooltip
 *
 * @attr {string} content - Tooltip content text
 * @attr {string} placement - Tooltip placement: top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end
 * @attr {string} trigger - Trigger type: hover, focus, click
 * @attr {string} variant - Tooltip variant: default, dark, light
 * @attr {string} size - Tooltip size: sm, md, lg
 * @attr {boolean} show-arrow - Show arrow indicator
 * @attr {number} delay - Show delay in milliseconds
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Trigger element (default slot)
 * @slot content - Custom tooltip content
 *
 * @fires show - Emitted when tooltip is shown
 * @fires hide - Emitted when tooltip is hidden
 */
export class HaTooltip extends HTMLElement {
  private trigger: HTMLElement;
  private tooltipContent: HTMLElement;
  private arrow: HTMLElement | null = null;
  private showTimeout: number | null = null;
  private hideTimeout: number | null = null;
  private isVisible = false;
  private tooltipId: string;

  static get observedAttributes() {
    return [
      "content",
      "placement",
      "trigger",
      "variant",
      "size",
      "show-arrow",
      "delay",
      "disabled",
    ];
  }

  constructor() {
    super();

    // Generate unique ID for ARIA
    this.tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

    // Attach shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = tooltipStyles;

    // Create trigger wrapper
    this.trigger = document.createElement("div");
    this.trigger.className = "tooltip-trigger";
    this.trigger.setAttribute("part", "trigger");

    // Create trigger slot
    const triggerSlot = document.createElement("slot");
    this.trigger.appendChild(triggerSlot);

    // Create tooltip content
    this.tooltipContent = document.createElement("div");
    this.tooltipContent.className = "tooltip-content";
    this.tooltipContent.setAttribute("part", "content");
    this.tooltipContent.setAttribute("role", "tooltip");
    this.tooltipContent.id = this.tooltipId;

    // Create content slot
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    contentSlot.addEventListener("slotchange", () => {
      this.updateContent();
    });
    this.tooltipContent.appendChild(contentSlot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.trigger);
    shadow.appendChild(this.tooltipContent);

    // Bind event handlers
    this.handleTriggerMouseEnter = this.handleTriggerMouseEnter.bind(this);
    this.handleTriggerMouseLeave = this.handleTriggerMouseLeave.bind(this);
    this.handleTriggerFocus = this.handleTriggerFocus.bind(this);
    this.handleTriggerBlur = this.handleTriggerBlur.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleWindowScroll = this.handleWindowScroll.bind(this);
  }

  connectedCallback() {
    // Set default attributes
    if (!this.hasAttribute("placement")) {
      this.setAttribute("placement", "top");
    }
    if (!this.hasAttribute("trigger")) {
      this.setAttribute("trigger", "hover");
    }
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "default");
    }
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "md");
    }
    if (!this.hasAttribute("delay")) {
      this.setAttribute("delay", "200");
    }

    this.updateContent();
    this.updateArrow();
    this.updateClasses();
    this.attachEventListeners();

    // Set ARIA attributes
    const triggerElement = this.trigger
      .querySelector("slot")
      ?.assignedElements()[0] as HTMLElement;
    if (triggerElement) {
      triggerElement.setAttribute("aria-describedby", this.tooltipId);
    }
  }

  disconnectedCallback() {
    this.detachEventListeners();
    this.clearTimeouts();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "content":
        this.updateContent();
        break;
      case "placement":
      case "variant":
      case "size":
        this.updateClasses();
        if (this.isVisible) {
          this.updatePosition();
        }
        break;
      case "show-arrow":
        this.updateArrow();
        break;
      case "trigger":
        this.detachEventListeners();
        this.attachEventListeners();
        break;
      case "disabled":
        if (this.disabled) {
          this.hide();
        }
        break;
    }
  }

  private updateContent() {
    const contentSlot = this.tooltipContent.querySelector(
      'slot[name="content"]',
    ) as HTMLSlotElement;
    const hasSlottedContent =
      contentSlot && contentSlot.assignedElements().length > 0;

    if (!hasSlottedContent && this.content) {
      // Use content attribute
      const textNode = document.createTextNode(this.content);
      // Clear existing text nodes
      Array.from(this.tooltipContent.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          this.tooltipContent.removeChild(node);
        }
      });
      this.tooltipContent.insertBefore(textNode, contentSlot);
    }
  }

  private updateArrow() {
    if (this.showArrow) {
      if (!this.arrow) {
        this.arrow = document.createElement("div");
        this.arrow.className = "tooltip-arrow";
        this.arrow.setAttribute("part", "arrow");
        this.tooltipContent.appendChild(this.arrow);
      }
    } else {
      if (this.arrow) {
        this.tooltipContent.removeChild(this.arrow);
        this.arrow = null;
      }
    }
  }

  private updateClasses() {
    const classes = [
      "tooltip-content",
      `variant-${this.variant}`,
      `size-${this.size}`,
    ];

    if (this.isVisible) {
      classes.push("visible");
    }

    this.tooltipContent.className = classes.join(" ");
    this.tooltipContent.setAttribute("data-placement", this.placement);
  }

  private attachEventListeners() {
    switch (this.triggerMode) {
      case "hover":
        this.trigger.addEventListener(
          "mouseenter",
          this.handleTriggerMouseEnter,
        );
        this.trigger.addEventListener(
          "mouseleave",
          this.handleTriggerMouseLeave,
        );
        this.trigger.addEventListener("focus", this.handleTriggerFocus);
        this.trigger.addEventListener("blur", this.handleTriggerBlur);
        break;
      case "focus":
        this.trigger.addEventListener("focus", this.handleTriggerFocus);
        this.trigger.addEventListener("blur", this.handleTriggerBlur);
        break;
      case "click":
        this.trigger.addEventListener("click", this.handleTriggerClick);
        document.addEventListener("keydown", this.handleKeydown);
        break;
    }
  }

  private detachEventListeners() {
    this.trigger.removeEventListener(
      "mouseenter",
      this.handleTriggerMouseEnter,
    );
    this.trigger.removeEventListener(
      "mouseleave",
      this.handleTriggerMouseLeave,
    );
    this.trigger.removeEventListener("focus", this.handleTriggerFocus);
    this.trigger.removeEventListener("blur", this.handleTriggerBlur);
    this.trigger.removeEventListener("click", this.handleTriggerClick);
    document.removeEventListener("click", this.handleDocumentClick);
    document.removeEventListener("keydown", this.handleKeydown);
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleWindowScroll, true);
  }

  private handleTriggerMouseEnter() {
    if (this.disabled) return;
    this.show();
  }

  private handleTriggerMouseLeave() {
    if (this.disabled) return;
    this.hide();
  }

  private handleTriggerFocus() {
    if (this.disabled) return;
    this.show();
  }

  private handleTriggerBlur() {
    if (this.disabled) return;
    this.hide();
  }

  private handleTriggerClick(e: Event) {
    if (this.disabled) return;
    e.stopPropagation();
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
      // Listen for clicks outside to close
      setTimeout(() => {
        document.addEventListener("click", this.handleDocumentClick);
      }, 0);
    }
  }

  private handleDocumentClick(e: Event) {
    if (!this.contains(e.target as Node)) {
      this.hide();
      document.removeEventListener("click", this.handleDocumentClick);
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    if (this.triggerMode === "click" && this.isVisible && e.key === "Escape") {
      e.preventDefault();
      this.hide();
      document.removeEventListener("click", this.handleDocumentClick);
    }
  }

  private handleWindowResize() {
    if (this.isVisible) {
      this.updatePosition();
    }
  }

  private handleWindowScroll() {
    if (this.isVisible) {
      this.updatePosition();
    }
  }

  private clearTimeouts() {
    if (this.showTimeout !== null) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (this.hideTimeout !== null) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private show() {
    if (this.disabled || this.isVisible) return;

    this.clearTimeouts();

    const delay = this.delay;

    this.showTimeout = window.setTimeout(() => {
      this.isVisible = true;
      this.updateClasses();
      this.updatePosition();

      // Add resize and scroll listeners
      window.addEventListener("resize", this.handleWindowResize);
      window.addEventListener("scroll", this.handleWindowScroll, true);

      this.dispatchEvent(
        new CustomEvent("show", {
          bubbles: true,
          composed: true,
        }),
      );
    }, delay);
  }

  private hide() {
    if (!this.isVisible) return;

    this.clearTimeouts();

    this.hideTimeout = window.setTimeout(() => {
      this.isVisible = false;
      this.updateClasses();

      // Remove resize and scroll listeners
      window.removeEventListener("resize", this.handleWindowResize);
      window.removeEventListener("scroll", this.handleWindowScroll, true);

      this.dispatchEvent(
        new CustomEvent("hide", {
          bubbles: true,
          composed: true,
        }),
      );
    }, 0);
  }

  private updatePosition() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const tooltipRect = this.tooltipContent.getBoundingClientRect();
    const placement = this.placement;
    const offset = 8; // Distance from trigger

    let top = 0;
    let left = 0;

    // Calculate position based on placement
    switch (placement) {
      case "top":
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "top-start":
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left;
        break;
      case "top-end":
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.right - tooltipRect.width;
        break;
      case "bottom":
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "bottom-start":
        top = triggerRect.bottom + offset;
        left = triggerRect.left;
        break;
      case "bottom-end":
        top = triggerRect.bottom + offset;
        left = triggerRect.right - tooltipRect.width;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case "left-start":
        top = triggerRect.top;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case "left-end":
        top = triggerRect.bottom - tooltipRect.height;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + offset;
        break;
      case "right-start":
        top = triggerRect.top;
        left = triggerRect.right + offset;
        break;
      case "right-end":
        top = triggerRect.bottom - tooltipRect.height;
        left = triggerRect.right + offset;
        break;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 8;

    // Adjust horizontal position
    if (left < margin) {
      left = margin;
    } else if (left + tooltipRect.width > viewportWidth - margin) {
      left = viewportWidth - tooltipRect.width - margin;
    }

    // Adjust vertical position
    if (top < margin) {
      top = margin;
    } else if (top + tooltipRect.height > viewportHeight - margin) {
      top = viewportHeight - tooltipRect.height - margin;
    }

    this.tooltipContent.style.top = `${top}px`;
    this.tooltipContent.style.left = `${left}px`;
  }

  // Public API
  get content(): string {
    return this.getAttribute("content") || "";
  }

  set content(value: string) {
    this.setAttribute("content", value);
  }

  get placement(): string {
    return this.getAttribute("placement") || "top";
  }

  set placement(value: string) {
    this.setAttribute("placement", value);
  }

  get triggerMode(): string {
    return this.getAttribute("trigger") || "hover";
  }

  set triggerMode(value: string) {
    this.setAttribute("trigger", value);
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

  get showArrow(): boolean {
    return this.hasAttribute("show-arrow");
  }

  set showArrow(value: boolean) {
    if (value) {
      this.setAttribute("show-arrow", "");
    } else {
      this.removeAttribute("show-arrow");
    }
  }

  get delay(): number {
    return parseInt(this.getAttribute("delay") || "200", 10);
  }

  set delay(value: number) {
    this.setAttribute("delay", value.toString());
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  // Public methods
  showTooltip(): void {
    this.show();
  }

  hideTooltip(): void {
    this.hide();
  }

  toggleTooltip(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }
}

// Register custom element
if (!customElements.get("ha-tooltip")) {
  customElements.define("ha-tooltip", HaTooltip);
}
