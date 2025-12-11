import { skeletonStyles } from "@hidearea-design/tokens/styles";

/**
 * Skeleton component
 *
 * @element ha-skeleton
 *
 * @attr {string} variant - Visual variant: text, circular, rectangular (default: text)
 * @attr {string} animation - Animation type: pulse, wave, none (default: pulse)
 * @attr {string} width - Width of the skeleton
 * @attr {string} height - Height of the skeleton
 *
 * @cssprop --skeleton-bg - Background color
 * @cssprop --skeleton-border-radius - Border radius
 * @cssprop --skeleton-wave-color - Wave animation color
 *
 * @csspart skeleton - The skeleton element
 */
export class HaSkeleton extends HTMLElement {
  private skeletonElement: HTMLDivElement;

  static get observedAttributes() {
    return ["variant", "animation", "width", "height"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = skeletonStyles;

    // Create skeleton element
    this.skeletonElement = document.createElement("div");
    this.skeletonElement.className = "skeleton";
    this.skeletonElement.setAttribute("part", "skeleton");
    this.skeletonElement.setAttribute("aria-busy", "true");
    this.skeletonElement.setAttribute("aria-live", "polite");

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.skeletonElement);
  }

  connectedCallback() {
    this.updateVariant();
    this.updateAnimation();
    this.updateDimensions();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      if (name === "variant") {
        this.updateVariant();
      } else if (name === "animation") {
        this.updateAnimation();
      } else if (name === "width" || name === "height") {
        this.updateDimensions();
      }
    }
  }

  private updateVariant() {
    const variant = this.getAttribute("variant") || "text";

    // Remove all variant classes
    this.skeletonElement.classList.remove(
      "skeleton--text",
      "skeleton--circular",
      "skeleton--rectangular"
    );

    // Add current variant class
    if (variant === "circular") {
      this.skeletonElement.classList.add("skeleton--circular");
    } else if (variant === "rectangular") {
      this.skeletonElement.classList.add("skeleton--rectangular");
    } else {
      this.skeletonElement.classList.add("skeleton--text");
    }
  }

  private updateAnimation() {
    const animation = this.getAttribute("animation") || "pulse";

    // Remove all animation classes
    this.skeletonElement.classList.remove("skeleton--pulse", "skeleton--wave");

    // Add current animation class
    if (animation === "wave") {
      this.skeletonElement.classList.add("skeleton--wave");
    } else if (animation === "pulse") {
      this.skeletonElement.classList.add("skeleton--pulse");
    }
    // animation === "none" means no class
  }

  private updateDimensions() {
    const width = this.getAttribute("width");
    const height = this.getAttribute("height");

    if (width) {
      this.skeletonElement.style.width = width;
    } else {
      this.skeletonElement.style.width = "";
    }

    if (height) {
      this.skeletonElement.style.height = height;
    } else {
      this.skeletonElement.style.height = "";
    }
  }
}

// Register the custom element
if (!customElements.get("ha-skeleton")) {
  customElements.define("ha-skeleton", HaSkeleton);
}
