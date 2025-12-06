/**
 * @element ha-color-picker
 * @fires {CustomEvent} color-change - Fired when the color value changes
 * @fires {CustomEvent} color-input - Fired during color value changes (while dragging)
 *
 * @csspart container - The container element
 * @csspart palette - The color palette area
 * @csspart palette-cursor - The palette cursor element
 * @csspart hue-slider - The hue slider track
 * @csspart hue-cursor - The hue slider cursor
 * @csspart alpha-slider - The alpha slider track
 * @csspart alpha-cursor - The alpha slider cursor
 * @csspart preview - The color preview box
 * @csspart input - The hex input field
 * @csspart swatches - The swatches container
 * @csspart swatch - Individual swatch element
 */
export class HaColorPicker extends HTMLElement {
  private _hue: number = 0;
  private _saturation: number = 100; // HSV saturation (0-100)
  private _value: number = 100; // HSV value/brightness (0-100)
  private _alpha: number = 1;
  private _format: "hex" | "rgb" | "hsl" = "hex";
  private _isDraggingPalette: boolean = false;
  private _isDraggingHue: boolean = false;
  private _isDraggingAlpha: boolean = false;
  private _swatches: string[] = [];

  static get observedAttributes() {
    return [
      "value",
      "format",
      "show-alpha",
      "show-input",
      "show-swatches",
      "swatches",
      "disabled",
      "readonly",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;

    switch (name) {
      case "value":
        if (newValue) {
          this.parseColorValue(newValue);
        }
        this.render();
        break;
      case "format":
        if (newValue === "hex" || newValue === "rgb" || newValue === "hsl") {
          this._format = newValue;
        }
        this.render();
        break;
      case "swatches":
        if (newValue) {
          this._swatches = newValue.split(",").map((s) => s.trim());
        }
        this.render();
        break;
      default:
        this.render();
    }
  }

  get value(): string {
    return this.getColorValue();
  }

  set value(val: string) {
    this.setAttribute("value", val);
  }

  get format(): "hex" | "rgb" | "hsl" {
    return this._format;
  }

  set format(val: "hex" | "rgb" | "hsl") {
    this.setAttribute("format", val);
  }

  get showAlpha(): boolean {
    return this.hasAttribute("show-alpha");
  }

  set showAlpha(val: boolean) {
    if (val) {
      this.setAttribute("show-alpha", "");
    } else {
      this.removeAttribute("show-alpha");
    }
  }

  get showInput(): boolean {
    return this.hasAttribute("show-input");
  }

  set showInput(val: boolean) {
    if (val) {
      this.setAttribute("show-input", "");
    } else {
      this.removeAttribute("show-input");
    }
  }

  get showSwatches(): boolean {
    return this.hasAttribute("show-swatches");
  }

  set showSwatches(val: boolean) {
    if (val) {
      this.setAttribute("show-swatches", "");
    } else {
      this.removeAttribute("show-swatches");
    }
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(val: boolean) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get readonly(): boolean {
    return this.hasAttribute("readonly");
  }

  set readonly(val: boolean) {
    if (val) {
      this.setAttribute("readonly", "");
    } else {
      this.removeAttribute("readonly");
    }
  }

  get swatches(): string[] {
    return this._swatches;
  }

  set swatches(val: string[]) {
    this._swatches = val;
    this.setAttribute("swatches", val.join(","));
  }

  // Public methods
  getValue(): string {
    return this.getColorValue();
  }

  setValue(value: string): void {
    this.value = value;
  }

  getColor(): { h: number; s: number; l: number; a: number } {
    // For backward compatibility, return HSL values
    const rgb = this.hsvToRgb(this._hue, this._saturation, this._value);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    return {
      h: hsl.h,
      s: hsl.s,
      l: hsl.l,
      a: this._alpha,
    };
  }

  setColor(h: number, s: number, l: number, a: number = 1): void {
    // Clamp input values
    h = this.clamp(h, 0, 360);
    s = this.clamp(s, 0, 100);
    l = this.clamp(l, 0, 100);

    // Convert HSL input to HSV for internal storage
    this._hue = h;
    this._alpha = this.clamp(a, 0, 1);

    // Convert HSL to RGB to HSV
    const rgb = this.hslToRgb(h, s, l);
    const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
    this._saturation = hsv.s;
    this._value = hsv.v;

    this.render();
    this.dispatchChangeEvent();
  }

  private parseColorValue(value: string): void {
    value = value.trim();

    // Parse HEX
    if (value.startsWith("#")) {
      const hex = value.substring(1);
      let r = 0,
        g = 0,
        b = 0,
        a = 1;

      if (hex.length === 3 || hex.length === 4) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
        if (hex.length === 4) {
          a = parseInt(hex[3] + hex[3], 16) / 255;
        }
      } else if (hex.length === 6 || hex.length === 8) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        if (hex.length === 8) {
          a = parseInt(hex.substring(6, 8), 16) / 255;
        }
      }

      const hsv = this.rgbToHsv(r, g, b);
      this._hue = hsv.h;
      this._saturation = hsv.s;
      this._value = hsv.v;
      this._alpha = a;
    }
    // Parse RGB/RGBA
    else if (value.startsWith("rgb")) {
      const match = value.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
      );
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        const a = match[4] ? parseFloat(match[4]) : 1;

        const hsv = this.rgbToHsv(r, g, b);
        this._hue = hsv.h;
        this._saturation = hsv.s;
        this._value = hsv.v;
        this._alpha = a;
      }
    }
    // Parse HSL/HSLA (convert to HSV)
    else if (value.startsWith("hsl")) {
      const match = value.match(
        /hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/,
      );
      if (match) {
        const h = parseInt(match[1]);
        const s = parseInt(match[2]);
        const l = parseInt(match[3]);
        const a = match[4] ? parseFloat(match[4]) : 1;

        // Convert HSL to RGB to HSV
        const rgb = this.hslToRgb(h, s, l);
        const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
        this._hue = hsv.h;
        this._saturation = hsv.s;
        this._value = hsv.v;
        this._alpha = a;
      }
    }
  }

  private getColorValue(): string {
    switch (this._format) {
      case "hex":
        return this.toHex();
      case "rgb":
        return this.toRgb();
      case "hsl":
        return this.toHsl();
      default:
        return this.toHex();
    }
  }

  private toHex(): string {
    const rgb = this.hsvToRgb(this._hue, this._saturation, this._value);
    const r = rgb.r.toString(16).padStart(2, "0");
    const g = rgb.g.toString(16).padStart(2, "0");
    const b = rgb.b.toString(16).padStart(2, "0");

    if (this.showAlpha && this._alpha < 1) {
      const a = Math.round(this._alpha * 255)
        .toString(16)
        .padStart(2, "0");
      return `#${r}${g}${b}${a}`;
    }

    return `#${r}${g}${b}`;
  }

  private toRgb(): string {
    const rgb = this.hsvToRgb(this._hue, this._saturation, this._value);

    if (this.showAlpha && this._alpha < 1) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this._alpha.toFixed(2)})`;
    }

    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  private toHsl(): string {
    // Convert HSV to RGB to HSL for output
    const rgb = this.hsvToRgb(this._hue, this._saturation, this._value);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

    if (this.showAlpha && this._alpha < 1) {
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${this._alpha.toFixed(2)})`;
    }

    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  // HSL to RGB conversion (for parsing HSL input)
  private hslToRgb(
    h: number,
    s: number,
    l: number,
  ): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  // RGB to HSV conversion
  private rgbToHsv(
    r: number,
    g: number,
    b: number,
  ): { h: number; s: number; v: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  }

  // HSV to RGB conversion
  private hsvToRgb(
    h: number,
    s: number,
    v: number,
  ): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    v /= 100;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0, g = 0, b = 0;

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  // RGB to HSL conversion (for HSL format output)
  private rgbToHsl(
    r: number,
    g: number,
    b: number,
  ): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  private handlePalettePointerDown = (e: PointerEvent): void => {
    if (this.disabled || this.readonly) return;

    this._isDraggingPalette = true;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    this.updatePaletteFromPointer(e);
  };

  private handlePalettePointerMove = (e: PointerEvent): void => {
    if (!this._isDraggingPalette) return;
    this.updatePaletteFromPointer(e);
  };

  private handlePalettePointerUp = (e: PointerEvent): void => {
    if (!this._isDraggingPalette) return;

    this._isDraggingPalette = false;
    const target = e.currentTarget as HTMLElement;
    target.releasePointerCapture(e.pointerId);

    this.dispatchChangeEvent();
  };

  private updatePaletteFromPointer(e: PointerEvent): void {
    const palette = e.currentTarget as HTMLElement;
    const rect = palette.getBoundingClientRect();

    // Prevent NaN by checking for valid dimensions
    if (rect.width === 0 || rect.height === 0) return;

    const x = this.clamp(e.clientX - rect.left, 0, rect.width);
    const y = this.clamp(e.clientY - rect.top, 0, rect.height);

    // HSV palette: X = saturation (0-100), Y = value (100-0, inverted)
    this._saturation = (x / rect.width) * 100;
    this._value = 100 - (y / rect.height) * 100;

    this.render();
    this.dispatchInputEvent();
  }

  private handleHuePointerDown = (e: PointerEvent): void => {
    if (this.disabled || this.readonly) return;

    this._isDraggingHue = true;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    this.updateHueFromPointer(e);
  };

  private handleHuePointerMove = (e: PointerEvent): void => {
    if (!this._isDraggingHue) return;
    this.updateHueFromPointer(e);
  };

  private handleHuePointerUp = (e: PointerEvent): void => {
    if (!this._isDraggingHue) return;

    this._isDraggingHue = false;
    const target = e.currentTarget as HTMLElement;
    target.releasePointerCapture(e.pointerId);

    this.dispatchChangeEvent();
  };

  private updateHueFromPointer(e: PointerEvent): void {
    const slider = e.currentTarget as HTMLElement;
    const rect = slider.getBoundingClientRect();

    // Prevent NaN by checking for valid dimensions
    if (rect.width === 0) return;

    const x = this.clamp(e.clientX - rect.left, 0, rect.width);
    this._hue = (x / rect.width) * 360;

    this.render();
    this.dispatchInputEvent();
  }

  private handleAlphaPointerDown = (e: PointerEvent): void => {
    if (this.disabled || this.readonly) return;

    this._isDraggingAlpha = true;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    this.updateAlphaFromPointer(e);
  };

  private handleAlphaPointerMove = (e: PointerEvent): void => {
    if (!this._isDraggingAlpha) return;
    this.updateAlphaFromPointer(e);
  };

  private handleAlphaPointerUp = (e: PointerEvent): void => {
    if (!this._isDraggingAlpha) return;

    this._isDraggingAlpha = false;
    const target = e.currentTarget as HTMLElement;
    target.releasePointerCapture(e.pointerId);

    this.dispatchChangeEvent();
  };

  private updateAlphaFromPointer(e: PointerEvent): void {
    const slider = e.currentTarget as HTMLElement;
    const rect = slider.getBoundingClientRect();

    // Prevent NaN by checking for valid dimensions
    if (rect.width === 0) return;

    const x = this.clamp(e.clientX - rect.left, 0, rect.width);
    this._alpha = x / rect.width;

    this.render();
    this.dispatchInputEvent();
  }

  private handleInputChange = (e: Event): void => {
    if (this.disabled || this.readonly) return;

    const input = e.target as HTMLInputElement;
    const value = input.value;

    this.parseColorValue(value);
    this.render();
    this.dispatchChangeEvent();
  };

  private handleSwatchClick = (e: Event): void => {
    if (this.disabled || this.readonly) return;

    const swatch = e.currentTarget as HTMLElement;
    const color = swatch.dataset.color;

    if (color) {
      this.parseColorValue(color);
      this.render();
      this.dispatchChangeEvent();
    }
  };

  private dispatchChangeEvent(): void {
    // For backward compatibility, convert to HSL for event details
    const rgb = this.hsvToRgb(this._hue, this._saturation, this._value);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

    this.dispatchEvent(
      new CustomEvent("color-change", {
        detail: {
          value: this.getColorValue(),
          h: hsl.h,
          s: hsl.s,
          l: hsl.l,
          a: this._alpha,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private dispatchInputEvent(): void {
    // For backward compatibility, convert to HSL for event details
    const rgb = this.hsvToRgb(this._hue, this._saturation, this._value);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

    this.dispatchEvent(
      new CustomEvent("color-input", {
        detail: {
          value: this.getColorValue(),
          h: hsl.h,
          s: hsl.s,
          l: hsl.l,
          a: this._alpha,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private attachEventListeners(): void {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    const palette = shadow.querySelector(".palette");
    const hueSlider = shadow.querySelector(".hue-slider");
    const alphaSlider = shadow.querySelector(".alpha-slider");
    const input = shadow.querySelector("input");
    const swatches = shadow.querySelectorAll(".swatch");

    if (palette) {
      palette.addEventListener(
        "pointerdown",
        this.handlePalettePointerDown as EventListener,
      );
      palette.addEventListener(
        "pointermove",
        this.handlePalettePointerMove as EventListener,
      );
      palette.addEventListener(
        "pointerup",
        this.handlePalettePointerUp as EventListener,
      );
      palette.addEventListener(
        "pointercancel",
        this.handlePalettePointerUp as EventListener,
      );
    }

    if (hueSlider) {
      hueSlider.addEventListener(
        "pointerdown",
        this.handleHuePointerDown as EventListener,
      );
      hueSlider.addEventListener(
        "pointermove",
        this.handleHuePointerMove as EventListener,
      );
      hueSlider.addEventListener(
        "pointerup",
        this.handleHuePointerUp as EventListener,
      );
      hueSlider.addEventListener(
        "pointercancel",
        this.handleHuePointerUp as EventListener,
      );
    }

    if (alphaSlider) {
      alphaSlider.addEventListener(
        "pointerdown",
        this.handleAlphaPointerDown as EventListener,
      );
      alphaSlider.addEventListener(
        "pointermove",
        this.handleAlphaPointerMove as EventListener,
      );
      alphaSlider.addEventListener(
        "pointerup",
        this.handleAlphaPointerUp as EventListener,
      );
      alphaSlider.addEventListener(
        "pointercancel",
        this.handleAlphaPointerUp as EventListener,
      );
    }

    if (input) {
      input.addEventListener("change", this.handleInputChange as EventListener);
    }

    swatches.forEach((swatch) => {
      swatch.addEventListener("click", this.handleSwatchClick as EventListener);
    });
  }

  private removeEventListeners(): void {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    const palette = shadow.querySelector(".palette");
    const hueSlider = shadow.querySelector(".hue-slider");
    const alphaSlider = shadow.querySelector(".alpha-slider");
    const input = shadow.querySelector("input");
    const swatches = shadow.querySelectorAll(".swatch");

    if (palette) {
      palette.removeEventListener(
        "pointerdown",
        this.handlePalettePointerDown as EventListener,
      );
      palette.removeEventListener(
        "pointermove",
        this.handlePalettePointerMove as EventListener,
      );
      palette.removeEventListener(
        "pointerup",
        this.handlePalettePointerUp as EventListener,
      );
      palette.removeEventListener(
        "pointercancel",
        this.handlePalettePointerUp as EventListener,
      );
    }

    if (hueSlider) {
      hueSlider.removeEventListener(
        "pointerdown",
        this.handleHuePointerDown as EventListener,
      );
      hueSlider.removeEventListener(
        "pointermove",
        this.handleHuePointerMove as EventListener,
      );
      hueSlider.removeEventListener(
        "pointerup",
        this.handleHuePointerUp as EventListener,
      );
      hueSlider.removeEventListener(
        "pointercancel",
        this.handleHuePointerUp as EventListener,
      );
    }

    if (alphaSlider) {
      alphaSlider.removeEventListener(
        "pointerdown",
        this.handleAlphaPointerDown as EventListener,
      );
      alphaSlider.removeEventListener(
        "pointermove",
        this.handleAlphaPointerMove as EventListener,
      );
      alphaSlider.removeEventListener(
        "pointerup",
        this.handleAlphaPointerUp as EventListener,
      );
      alphaSlider.removeEventListener(
        "pointercancel",
        this.handleAlphaPointerUp as EventListener,
      );
    }

    if (input) {
      input.removeEventListener(
        "change",
        this.handleInputChange as EventListener,
      );
    }

    swatches.forEach((swatch) => {
      swatch.removeEventListener(
        "click",
        this.handleSwatchClick as EventListener,
      );
    });
  }

  private render(): void {
    if (!this.shadowRoot) return;

    // Convert HSV to RGB for display
    const rgb = this.hsvToRgb(this._hue, this._saturation, this._value);
    const currentColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const currentColorWithAlpha = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this._alpha})`;
    const hueColor = `hsl(${this._hue}, 100%, 50%)`;

    // Use percentage for cursor positioning to match actual palette size
    const paletteX = this._saturation; // 0-100%
    const paletteY = 100 - this._value; // 0-100%, inverted (top=bright, bottom=dark)
    const hueX = (this._hue / 360) * 100;
    const alphaX = this._alpha * 100;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: var(--ha-font-family, system-ui, sans-serif);
        }

        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }

        .container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem;
          background: var(--ha-color-picker-bg, #ffffff);
          border: 1px solid var(--ha-color-picker-border, #e5e7eb);
          border-radius: var(--ha-color-picker-radius, 0.5rem);
          width: var(--ha-color-picker-width, 280px);
        }

        .palette {
          position: relative;
          width: 100%;
          height: 200px;
          background: linear-gradient(to right, #fff, ${hueColor}),
                      linear-gradient(to top, #000, transparent);
          background-blend-mode: multiply;
          border-radius: 0.25rem;
          cursor: crosshair;
          touch-action: none;
        }

        .palette-cursor {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3),
                      0 2px 4px rgba(0, 0, 0, 0.2);
          transform: translate(-50%, -50%);
          pointer-events: none;
          left: ${paletteX}%;
          top: ${paletteY}%;
        }

        .hue-slider,
        .alpha-slider {
          position: relative;
          width: 100%;
          height: 12px;
          border-radius: 6px;
          cursor: pointer;
          touch-action: none;
        }

        .hue-slider {
          background: linear-gradient(to right,
            hsl(0, 100%, 50%),
            hsl(60, 100%, 50%),
            hsl(120, 100%, 50%),
            hsl(180, 100%, 50%),
            hsl(240, 100%, 50%),
            hsl(300, 100%, 50%),
            hsl(360, 100%, 50%)
          );
        }

        .alpha-slider {
          background:
            linear-gradient(to right, transparent, ${currentColor}),
            repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 50% / 10px 10px;
        }

        .hue-cursor,
        .alpha-cursor {
          position: absolute;
          width: 16px;
          height: 16px;
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3),
                      0 2px 4px rgba(0, 0, 0, 0.2);
          transform: translateX(-50%);
          top: 50%;
          margin-top: -8px;
          pointer-events: none;
        }

        .hue-cursor {
          left: ${hueX}%;
        }

        .alpha-cursor {
          left: ${alphaX}%;
        }

        .controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .preview {
          width: 40px;
          height: 40px;
          border-radius: 0.25rem;
          border: 1px solid var(--ha-color-picker-border, #e5e7eb);
          background:
            ${currentColorWithAlpha},
            repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 50% / 10px 10px;
          flex-shrink: 0;
        }

        input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid var(--ha-color-picker-border, #e5e7eb);
          border-radius: 0.25rem;
          font-family: inherit;
          font-size: 0.875rem;
          outline: none;
        }

        input:focus {
          border-color: var(--ha-color-picker-focus, #3b82f6);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        input:disabled,
        input:read-only {
          background: var(--ha-color-picker-disabled-bg, #f3f4f6);
          cursor: not-allowed;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(24px, 1fr));
          gap: 0.5rem;
        }

        .swatch {
          width: 24px;
          height: 24px;
          border-radius: 0.25rem;
          border: 1px solid var(--ha-color-picker-border, #e5e7eb);
          cursor: pointer;
          transition: transform 0.1s;
        }

        .swatch:hover {
          transform: scale(1.1);
        }

        .swatch:active {
          transform: scale(0.95);
        }

        :host([readonly]) .palette,
        :host([readonly]) .hue-slider,
        :host([readonly]) .alpha-slider,
        :host([readonly]) .swatch {
          cursor: default;
          pointer-events: none;
        }
      </style>

      <div class="container" part="container">
        <div class="palette" part="palette">
          <div class="palette-cursor" part="palette-cursor"></div>
        </div>

        <div class="hue-slider" part="hue-slider">
          <div class="hue-cursor" part="hue-cursor"></div>
        </div>

        ${
          this.showAlpha
            ? `
          <div class="alpha-slider" part="alpha-slider">
            <div class="alpha-cursor" part="alpha-cursor"></div>
          </div>
        `
            : ""
        }

        ${
          this.showInput
            ? `
          <div class="controls">
            <div class="preview" part="preview"></div>
            <input
              type="text"
              part="input"
              value="${this.getColorValue()}"
              ${this.disabled ? "disabled" : ""}
              ${this.readonly ? "readonly" : ""}
            />
          </div>
        `
            : ""
        }

        ${
          this.showSwatches && this._swatches.length > 0
            ? `
          <div class="swatches" part="swatches">
            ${this._swatches
              .map(
                (color) => `
              <div
                class="swatch"
                part="swatch"
                data-color="${color}"
                style="background: ${color}"
              ></div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    `;

    // Re-attach event listeners after render
    this.attachEventListeners();
  }
}

if (!customElements.get("ha-color-picker")) {
  customElements.define("ha-color-picker", HaColorPicker);
}
