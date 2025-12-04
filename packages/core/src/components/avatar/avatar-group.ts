import { avatarGroupStyles } from "./avatar-group.styles";

export class HaAvatarGroup extends HTMLElement {
  private containerElement: HTMLDivElement;
  private maxIndicatorElement: HTMLDivElement | null = null;
  private slotElement: HTMLSlotElement;

  static get observedAttributes() {
    return ["max", "size", "layout"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Styles
    const style = document.createElement("style");
    style.textContent = avatarGroupStyles;
    shadow.appendChild(style);

    // Container
    this.containerElement = document.createElement("div");
    this.containerElement.className = "container";
    this.containerElement.setAttribute("part", "container");

    // Slot
    this.slotElement = document.createElement("slot");
    this.containerElement.appendChild(this.slotElement);

    shadow.appendChild(this.containerElement);

    // Listen to slot changes
    this.slotElement.addEventListener("slotchange", () => {
      this.handleSlotChange();
    });
  }

  connectedCallback() {
    this.handleSlotChange();
    this.propagateSizeToChildren();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      if (name === "max") {
        this.handleSlotChange();
      } else if (name === "size") {
        this.propagateSizeToChildren();
      }
    }
  }

  private handleSlotChange() {
    const max = parseInt(this.getAttribute("max") || "0");

    if (max <= 0) {
      // No max limit, remove indicator if present
      if (this.maxIndicatorElement) {
        this.maxIndicatorElement.remove();
        this.maxIndicatorElement = null;
      }
      // Show all avatars
      this.showAllAvatars();
      return;
    }

    const avatars = this.getSlottedAvatars();
    const totalCount = avatars.length;

    if (totalCount <= max) {
      // Show all avatars
      if (this.maxIndicatorElement) {
        this.maxIndicatorElement.remove();
        this.maxIndicatorElement = null;
      }
      this.showAllAvatars();
    } else {
      // Show max avatars and hide the rest
      const remainingCount = totalCount - max;

      avatars.forEach((avatar, index) => {
        if (index < max) {
          (avatar as HTMLElement).style.display = "";
        } else {
          (avatar as HTMLElement).style.display = "none";
        }
      });

      // Show or update max indicator
      if (!this.maxIndicatorElement) {
        this.maxIndicatorElement = document.createElement("div");
        this.maxIndicatorElement.className = "max-indicator";
        this.maxIndicatorElement.setAttribute("part", "max-indicator");
        this.containerElement.appendChild(this.maxIndicatorElement);
      }

      this.maxIndicatorElement.textContent = `+${remainingCount}`;
    }
  }

  private showAllAvatars() {
    const avatars = this.getSlottedAvatars();
    avatars.forEach((avatar) => {
      (avatar as HTMLElement).style.display = "";
    });
  }

  private getSlottedAvatars(): Element[] {
    const assignedElements = this.slotElement.assignedElements();
    return assignedElements.filter(
      (el) => el.tagName.toLowerCase() === "ha-avatar"
    );
  }

  private propagateSizeToChildren() {
    const size = this.getAttribute("size");
    if (!size) return;

    const avatars = this.getSlottedAvatars();
    avatars.forEach((avatar) => {
      avatar.setAttribute("size", size);
    });
  }
}

customElements.define("ha-avatar-group", HaAvatarGroup);
