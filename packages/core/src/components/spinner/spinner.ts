import { spinnerStyles } from "@hidearea-design/tokens/styles";

export class HaSpinner extends HTMLElement {
  private spinnerElement!: HTMLDivElement;

  static get observedAttributes() {
    return ["size", "color", "variant", "speed"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get size(): "xs" | "sm" | "md" | "lg" | "xl" {
    const value = this.getAttribute("size");
    return (value as "xs" | "sm" | "md" | "lg" | "xl") || "md";
  }

  set size(val: "xs" | "sm" | "md" | "lg" | "xl") {
    this.setAttribute("size", val);
  }

  get color():
    | "primary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral" {
    const value = this.getAttribute("color");
    return (
      (value as
        | "primary"
        | "success"
        | "warning"
        | "error"
        | "info"
        | "neutral") || "primary"
    );
  }

  set color(
    val: "primary" | "success" | "warning" | "error" | "info" | "neutral",
  ) {
    this.setAttribute("color", val);
  }

  get variant(): "circular" | "dots" | "pulse" {
    const value = this.getAttribute("variant");
    return (value as "circular" | "dots" | "pulse") || "circular";
  }

  set variant(val: "circular" | "dots" | "pulse") {
    this.setAttribute("variant", val);
  }

  get speed(): string {
    return this.getAttribute("speed") || "0.8s";
  }

  set speed(val: string) {
    this.setAttribute("speed", val);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string, _newValue: string) {
    if (name === "size" || name === "color" || name === "variant") {
      this.updateSpinnerClasses();
    } else if (name === "speed") {
      this.updateSpeed();
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    const variant = this.variant;
    let spinnerHTML = "";

    if (variant === "dots") {
      spinnerHTML = `
        <div class="spinner__dot"></div>
        <div class="spinner__dot"></div>
        <div class="spinner__dot"></div>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>${spinnerStyles}</style>
      <div class="spinner" part="spinner" role="status" aria-live="polite" aria-label="Loading">
        ${spinnerHTML}
      </div>
    `;

    this.spinnerElement = this.shadowRoot.querySelector(".spinner")!;
    this.updateSpinnerClasses();
    this.updateSpeed();
  }

  private updateSpinnerClasses() {
    if (!this.spinnerElement) return;

    const size = this.size;
    const color = this.color;
    const variant = this.variant;

    this.spinnerElement.className = `spinner spinner--${size} spinner--${color} spinner--${variant}`;
  }

  private updateSpeed() {
    if (!this.spinnerElement) return;

    this.spinnerElement.style.setProperty("--spinner-speed", this.speed);
  }
}

// Register the custom element
if (!customElements.get("ha-spinner")) {
  customElements.define("ha-spinner", HaSpinner);
}
