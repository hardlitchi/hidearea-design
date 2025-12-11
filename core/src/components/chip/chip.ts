import { chipStyles } from "@hidearea-design/tokens/styles";

/**
 * Chip component
 *
 * @element ha-chip
 *
 * @attr {string} size - Chip size: small, medium, large
 * @attr {string} color - Chip color: default, primary, success, warning, error, info
 * @attr {boolean} deletable - Show delete button
 * @attr {boolean} interactive - Make chip interactive (clickable)
 * @attr {boolean} disabled - Disable the chip
 *
 * @slot - Chip text content
 * @slot icon - Leading icon
 *
 * @fires chip-click - Emitted when chip is clicked
 * @fires chip-delete - Emitted when delete button is clicked
 *
 * @csspart chip - The chip container
 * @csspart icon - The icon container
 * @csspart text - The text container
 * @csspart close - The close button
 */
export class HaChip extends HTMLElement {
  private chipElement: HTMLDivElement;
  private iconSlot: HTMLSlotElement | null = null;
  private textContainer: HTMLSpanElement;
  private closeButton: HTMLButtonElement | null = null;

  static get observedAttributes() {
    return ["size", "color", "deletable", "interactive", "disabled"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = chipStyles;

    // Create chip container
    this.chipElement = document.createElement("div");
    this.chipElement.className = "chip";
    this.chipElement.setAttribute("part", "chip");

    // Create icon slot
    this.iconSlot = document.createElement("slot");
    this.iconSlot.name = "icon";
    this.iconSlot.className = "chip__icon";
    this.iconSlot.setAttribute("part", "icon");
    this.chipElement.appendChild(this.iconSlot);

    // Create text container
    this.textContainer = document.createElement("span");
    this.textContainer.className = "chip__text";
    this.textContainer.setAttribute("part", "text");

    const textSlot = document.createElement("slot");
    this.textContainer.appendChild(textSlot);
    this.chipElement.appendChild(this.textContainer);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.chipElement);

    // Handle click events
    this.chipElement.addEventListener("click", (e) => {
      if (this.hasAttribute("interactive") && !this.hasAttribute("disabled")) {
        this.dispatchEvent(
          new CustomEvent("chip-click", {
            bubbles: true,
            composed: true,
            detail: { originalEvent: e },
          })
        );
      }
    });
  }

  connectedCallback() {
    this.updateAttributes();
    this.updateDeleteButton();

    // Set tabindex for keyboard navigation if interactive
    if (this.hasAttribute("interactive") && !this.hasAttribute("disabled")) {
      this.setAttribute("tabindex", "0");
    }
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    this.updateAttributes();

    if (_name === "deletable") {
      this.updateDeleteButton();
    }

    if (_name === "interactive" || _name === "disabled") {
      if (this.hasAttribute("interactive") && !this.hasAttribute("disabled")) {
        this.setAttribute("tabindex", "0");
      } else {
        this.removeAttribute("tabindex");
      }
    }
  }

  private updateAttributes() {
    // Attributes are handled via :host([attr]) selectors in CSS
    // No class manipulation needed
  }

  private updateDeleteButton() {
    if (this.hasAttribute("deletable") && !this.closeButton) {
      // Create delete button
      this.closeButton = document.createElement("button");
      this.closeButton.className = "chip__close";
      this.closeButton.setAttribute("part", "close");
      this.closeButton.setAttribute("aria-label", "削除");
      this.closeButton.innerHTML = "×";

      this.closeButton.addEventListener("click", (e) => {
        e.stopPropagation();

        if (!this.hasAttribute("disabled")) {
          const deleteEvent = new CustomEvent("chip-delete", {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: { chip: this },
          });

          if (this.dispatchEvent(deleteEvent)) {
            // If event not prevented, remove chip with animation
            this.style.opacity = "0";
            this.style.transform = "scale(0.8)";
            this.style.transition = "opacity 200ms ease, transform 200ms ease";

            setTimeout(() => {
              this.remove();
            }, 200);
          }
        }
      });

      this.chipElement.appendChild(this.closeButton);
    } else if (!this.hasAttribute("deletable") && this.closeButton) {
      // Remove delete button
      this.closeButton.remove();
      this.closeButton = null;
    }
  }

  // Public API
  get size(): string {
    return this.getAttribute("size") || "medium";
  }

  set size(value: string) {
    this.setAttribute("size", value);
  }

  get color(): string {
    return this.getAttribute("color") || "default";
  }

  set color(value: string) {
    this.setAttribute("color", value);
  }

  get deletable(): boolean {
    return this.hasAttribute("deletable");
  }

  set deletable(value: boolean) {
    if (value) {
      this.setAttribute("deletable", "");
    } else {
      this.removeAttribute("deletable");
    }
  }

  get interactive(): boolean {
    return this.hasAttribute("interactive");
  }

  set interactive(value: boolean) {
    if (value) {
      this.setAttribute("interactive", "");
    } else {
      this.removeAttribute("interactive");
    }
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
}

// Register custom element
if (!customElements.get("ha-chip")) {
  customElements.define("ha-chip", HaChip);
}
