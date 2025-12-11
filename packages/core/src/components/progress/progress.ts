import { progressStyles } from "@hidearea-design/tokens/styles";

export class HaProgress extends HTMLElement {
  private progressElement!: HTMLDivElement;
  private barElement!: HTMLDivElement;
  private labelElement!: HTMLDivElement;
  private percentageElement!: HTMLSpanElement;

  static get observedAttributes() {
    return ["value", "max", "variant", "color", "size", "show-label"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get value(): number {
    return parseFloat(this.getAttribute("value") || "0");
  }

  set value(val: number) {
    this.setAttribute("value", val.toString());
  }

  get max(): number {
    return parseFloat(this.getAttribute("max") || "100");
  }

  set max(val: number) {
    this.setAttribute("max", val.toString());
  }

  get variant(): "default" | "striped" | "animated" {
    const value = this.getAttribute("variant");
    return (value as "default" | "striped" | "animated") || "default";
  }

  set variant(val: "default" | "striped" | "animated") {
    this.setAttribute("variant", val);
  }

  get color(): "primary" | "success" | "warning" | "error" | "info" {
    const value = this.getAttribute("color");
    return (
      (value as "primary" | "success" | "warning" | "error" | "info") ||
      "primary"
    );
  }

  set color(val: "primary" | "success" | "warning" | "error" | "info") {
    this.setAttribute("color", val);
  }

  get size(): "sm" | "md" | "lg" {
    const value = this.getAttribute("size");
    return (value as "sm" | "md" | "lg") || "md";
  }

  set size(val: "sm" | "md" | "lg") {
    this.setAttribute("size", val);
  }

  get showLabel(): boolean {
    return this.hasAttribute("show-label");
  }

  set showLabel(val: boolean) {
    if (val) {
      this.setAttribute("show-label", "");
    } else {
      this.removeAttribute("show-label");
    }
  }

  connectedCallback() {
    this.render();
    this.updateProgress();
  }

  attributeChangedCallback(name: string, _oldValue: string, _newValue: string) {
    if (name === "value" || name === "max") {
      this.updateProgress();
    } else if (name === "variant") {
      this.updateBarClasses();
    } else if (name === "color") {
      this.updateBarClasses();
    } else if (name === "size") {
      this.updateProgressClasses();
    } else if (name === "show-label") {
      this.updateLabelVisibility();
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>${progressStyles}</style>
      <div class="progress__label" part="label">
        <slot name="label"></slot>
        <span class="progress__percentage" part="percentage"></span>
      </div>
      <div class="progress" part="progress" role="progressbar" aria-valuemin="0">
        <div class="progress__bar" part="bar"></div>
      </div>
    `;

    this.progressElement = this.shadowRoot.querySelector(".progress")!;
    this.barElement = this.shadowRoot.querySelector(".progress__bar")!;
    this.labelElement = this.shadowRoot.querySelector(".progress__label")!;
    this.percentageElement = this.shadowRoot.querySelector(
      ".progress__percentage",
    )!;

    this.updateProgressClasses();
    this.updateBarClasses();
    this.updateLabelVisibility();
  }

  private updateProgress() {
    if (!this.progressElement || !this.barElement) return;

    const percentage = Math.min(
      100,
      Math.max(0, (this.value / this.max) * 100),
    );

    // Update bar width
    this.barElement.style.width = `${percentage}%`;

    // Update ARIA attributes
    this.progressElement.setAttribute("aria-valuenow", this.value.toString());
    this.progressElement.setAttribute("aria-valuemax", this.max.toString());

    // Update percentage text
    if (this.percentageElement) {
      this.percentageElement.textContent = `${Math.round(percentage)}%`;
    }
  }

  private updateProgressClasses() {
    if (!this.progressElement) return;

    const size = this.size;
    this.progressElement.className = `progress progress--${size}`;
  }

  private updateBarClasses() {
    if (!this.barElement) return;

    const variant = this.variant;
    const color = this.color;

    let className = `progress__bar progress__bar--${color}`;

    if (variant === "striped") {
      className += " progress__bar--striped";
    } else if (variant === "animated") {
      className += " progress__bar--animated";
    }

    this.barElement.className = className;
  }

  private updateLabelVisibility() {
    if (!this.labelElement) return;

    if (this.showLabel) {
      this.labelElement.style.display = "flex";
    } else {
      this.labelElement.style.display = "none";
    }
  }
}

// Register the custom element
if (!customElements.get("ha-progress")) {
  customElements.define("ha-progress", HaProgress);
}
