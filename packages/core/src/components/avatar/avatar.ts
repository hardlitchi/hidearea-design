import { avatarStyles } from "./avatar.styles";

export class HaAvatar extends HTMLElement {
  private containerElement: HTMLDivElement;
  private imgElement: HTMLImageElement | null = null;
  private initialsElement: HTMLDivElement | null = null;
  private statusElement: HTMLDivElement | null = null;

  static get observedAttributes() {
    return ["src", "alt", "size", "variant", "shape", "color", "initials", "status", "interactive"];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Styles
    const style = document.createElement("style");
    style.textContent = avatarStyles;
    shadow.appendChild(style);

    // Container
    this.containerElement = document.createElement("div");
    this.containerElement.className = "container";
    this.containerElement.setAttribute("part", "container");
    shadow.appendChild(this.containerElement);

    // Render initial content
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private render() {
    // Clear container
    this.containerElement.innerHTML = "";
    this.imgElement = null;
    this.initialsElement = null;
    this.statusElement = null;

    const src = this.getAttribute("src");
    const alt = this.getAttribute("alt") || "";
    const initials = this.getAttribute("initials");
    const status = this.getAttribute("status");

    // Priority: image > initials > icon slot
    if (src) {
      this.renderImage(src, alt);
    } else if (initials) {
      this.renderInitials(initials);
    } else if (alt) {
      // Generate initials from alt text
      const generatedInitials = this.generateInitials(alt);
      this.renderInitials(generatedInitials);
    } else {
      // Fallback to slot
      this.renderSlot();
    }

    // Add status indicator
    if (status) {
      this.renderStatus();
    }
  }

  private renderImage(src: string, alt: string) {
    this.imgElement = document.createElement("img");
    this.imgElement.src = src;
    this.imgElement.alt = alt;
    this.imgElement.className = "image";
    this.imgElement.setAttribute("part", "image");

    // Handle image load error
    this.imgElement.addEventListener("error", () => {
      this.handleImageError();
    });

    this.containerElement.appendChild(this.imgElement);
  }

  private handleImageError() {
    // Fallback to initials when image fails to load
    const alt = this.getAttribute("alt") || "";
    const initials = this.getAttribute("initials");

    this.containerElement.innerHTML = "";
    this.imgElement = null;

    if (initials) {
      this.renderInitials(initials);
    } else if (alt) {
      const generatedInitials = this.generateInitials(alt);
      this.renderInitials(generatedInitials);
    } else {
      this.renderSlot();
    }

    // Re-add status if present
    const status = this.getAttribute("status");
    if (status) {
      this.renderStatus();
    }
  }

  private renderInitials(initials: string) {
    this.initialsElement = document.createElement("div");
    this.initialsElement.className = "initials";
    this.initialsElement.setAttribute("part", "initials");
    this.initialsElement.textContent = initials.toUpperCase();
    this.containerElement.appendChild(this.initialsElement);
  }

  private renderSlot() {
    const slotElement = document.createElement("slot");
    slotElement.className = "icon";
    this.containerElement.appendChild(slotElement);
  }

  private renderStatus() {
    this.statusElement = document.createElement("div");
    this.statusElement.className = "status";
    this.statusElement.setAttribute("part", "status");
    this.containerElement.appendChild(this.statusElement);
  }

  private generateInitials(name: string): string {
    if (!name) return "";

    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2);
    }

    // Take first letter of first two words
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
}

customElements.define("ha-avatar", HaAvatar);
