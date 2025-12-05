import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HaColorPicker } from "./color-picker";

describe("HaColorPicker", () => {
  let element: HaColorPicker;

  beforeEach(() => {
    element = document.createElement("ha-color-picker") as HaColorPicker;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe("Component Registration", () => {
    it("should register as custom element", () => {
      expect(customElements.get("ha-color-picker")).toBeDefined();
    });

    it("should create element instance", () => {
      expect(element).toBeInstanceOf(HaColorPicker);
    });

    it("should render with shadow DOM", () => {
      expect(element.shadowRoot).toBeTruthy();
    });
  });

  describe("Default Values", () => {
    it("should have default color (black)", () => {
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
      expect(color.a).toBe(1);
    });

    it("should have default format (hex)", () => {
      expect(element.format).toBe("hex");
    });

    it("should not show alpha by default", () => {
      expect(element.showAlpha).toBe(false);
    });

    it("should not show input by default", () => {
      expect(element.showInput).toBe(false);
    });

    it("should not show swatches by default", () => {
      expect(element.showSwatches).toBe(false);
    });

    it("should not be disabled by default", () => {
      expect(element.disabled).toBe(false);
    });

    it("should not be readonly by default", () => {
      expect(element.readonly).toBe(false);
    });
  });

  describe("Attributes", () => {
    it("should set value attribute", () => {
      element.setAttribute("value", "#ff0000");
      expect(element.value).toContain("ff0000");
    });

    it("should set format attribute", () => {
      element.setAttribute("format", "rgb");
      expect(element.format).toBe("rgb");
    });

    it("should set show-alpha attribute", () => {
      element.setAttribute("show-alpha", "");
      expect(element.showAlpha).toBe(true);
    });

    it("should set show-input attribute", () => {
      element.setAttribute("show-input", "");
      expect(element.showInput).toBe(true);
    });

    it("should set show-swatches attribute", () => {
      element.setAttribute("show-swatches", "");
      expect(element.showSwatches).toBe(true);
    });

    it("should set disabled attribute", () => {
      element.setAttribute("disabled", "");
      expect(element.disabled).toBe(true);
    });

    it("should set readonly attribute", () => {
      element.setAttribute("readonly", "");
      expect(element.readonly).toBe(true);
    });

    it("should set swatches attribute", () => {
      element.setAttribute("swatches", "#ff0000,#00ff00,#0000ff");
      expect(element.swatches).toEqual(["#ff0000", "#00ff00", "#0000ff"]);
    });
  });

  describe("Properties", () => {
    it("should set value property", () => {
      element.value = "#ff0000";
      expect(element.value).toContain("ff0000");
    });

    it("should set format property", () => {
      element.format = "hsl";
      expect(element.format).toBe("hsl");
    });

    it("should set showAlpha property", () => {
      element.showAlpha = true;
      expect(element.showAlpha).toBe(true);
      expect(element.hasAttribute("show-alpha")).toBe(true);
    });

    it("should set showInput property", () => {
      element.showInput = true;
      expect(element.showInput).toBe(true);
      expect(element.hasAttribute("show-input")).toBe(true);
    });

    it("should set showSwatches property", () => {
      element.showSwatches = true;
      expect(element.showSwatches).toBe(true);
      expect(element.hasAttribute("show-swatches")).toBe(true);
    });

    it("should set disabled property", () => {
      element.disabled = true;
      expect(element.disabled).toBe(true);
      expect(element.hasAttribute("disabled")).toBe(true);
    });

    it("should set readonly property", () => {
      element.readonly = true;
      expect(element.readonly).toBe(true);
      expect(element.hasAttribute("readonly")).toBe(true);
    });

    it("should set swatches property", () => {
      element.swatches = ["#ff0000", "#00ff00", "#0000ff"];
      expect(element.swatches).toEqual(["#ff0000", "#00ff00", "#0000ff"]);
    });
  });

  describe("Color Parsing - HEX", () => {
    it("should parse 3-digit hex color", () => {
      element.value = "#f00";
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
    });

    it("should parse 6-digit hex color", () => {
      element.value = "#ff0000";
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
    });

    it("should parse 4-digit hex color with alpha", () => {
      element.value = "#f008";
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
      expect(color.a).toBeCloseTo(0.53, 1);
    });

    it("should parse 8-digit hex color with alpha", () => {
      element.value = "#ff000080";
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
      expect(color.a).toBeCloseTo(0.5, 1);
    });

    it("should parse blue hex color", () => {
      element.value = "#0000ff";
      const color = element.getColor();
      expect(color.h).toBe(240);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
    });

    it("should parse green hex color", () => {
      element.value = "#00ff00";
      const color = element.getColor();
      expect(color.h).toBe(120);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
    });
  });

  describe("Color Parsing - RGB", () => {
    it("should parse rgb color", () => {
      element.value = "rgb(255, 0, 0)";
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
    });

    it("should parse rgba color", () => {
      element.value = "rgba(255, 0, 0, 0.5)";
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
      expect(color.a).toBe(0.5);
    });

    it("should parse rgb color with spaces", () => {
      element.value = "rgb(255,  0,  0)";
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
    });
  });

  describe("Color Parsing - HSL", () => {
    it("should parse hsl color", () => {
      element.value = "hsl(0, 100%, 50%)";
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
    });

    it("should parse hsla color", () => {
      element.value = "hsla(0, 100%, 50%, 0.5)";
      const color = element.getColor();
      expect(color.h).toBe(0);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
      expect(color.a).toBe(0.5);
    });

    it("should parse hsl color with different hue", () => {
      element.value = "hsl(120, 100%, 50%)";
      const color = element.getColor();
      expect(color.h).toBe(120);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
    });
  });

  describe("Color Output - HEX", () => {
    it("should output hex format by default", () => {
      element.setColor(0, 100, 50);
      expect(element.value).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it("should output hex color correctly", () => {
      element.format = "hex";
      element.setColor(0, 100, 50);
      expect(element.value.toLowerCase()).toBe("#ff0000");
    });

    it("should output hex color with alpha when enabled", () => {
      element.format = "hex";
      element.showAlpha = true;
      element.setColor(0, 100, 50, 0.5);
      expect(element.value.toLowerCase()).toBe("#ff000080");
    });

    it("should output blue hex color", () => {
      element.format = "hex";
      element.setColor(240, 100, 50);
      expect(element.value.toLowerCase()).toBe("#0000ff");
    });
  });

  describe("Color Output - RGB", () => {
    it("should output rgb format", () => {
      element.format = "rgb";
      element.setColor(0, 100, 50);
      expect(element.value).toBe("rgb(255, 0, 0)");
    });

    it("should output rgba format when alpha enabled", () => {
      element.format = "rgb";
      element.showAlpha = true;
      element.setColor(0, 100, 50, 0.5);
      expect(element.value).toBe("rgba(255, 0, 0, 0.50)");
    });

    it("should output rgb format for blue", () => {
      element.format = "rgb";
      element.setColor(240, 100, 50);
      expect(element.value).toBe("rgb(0, 0, 255)");
    });
  });

  describe("Color Output - HSL", () => {
    it("should output hsl format", () => {
      element.format = "hsl";
      element.setColor(0, 100, 50);
      expect(element.value).toBe("hsl(0, 100%, 50%)");
    });

    it("should output hsla format when alpha enabled", () => {
      element.format = "hsl";
      element.showAlpha = true;
      element.setColor(0, 100, 50, 0.5);
      expect(element.value).toBe("hsla(0, 100%, 50%, 0.50)");
    });

    it("should output hsl format for blue", () => {
      element.format = "hsl";
      element.setColor(240, 100, 50);
      expect(element.value).toBe("hsl(240, 100%, 50%)");
    });
  });

  describe("Public Methods", () => {
    it("should get value via getValue()", () => {
      element.setColor(0, 100, 50);
      const value = element.getValue();
      expect(value).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it("should set value via setValue()", () => {
      element.setValue("#00ff00");
      const color = element.getColor();
      expect(color.h).toBe(120);
      expect(color.s).toBe(100);
      expect(color.l).toBe(50);
    });

    it("should get color via getColor()", () => {
      element.setColor(180, 80, 60);
      const color = element.getColor();
      expect(color.h).toBe(180);
      expect(color.s).toBe(80);
      expect(color.l).toBe(60);
      expect(color.a).toBe(1);
    });

    it("should set color via setColor()", () => {
      element.setColor(90, 70, 40, 0.8);
      const color = element.getColor();
      expect(color.h).toBe(90);
      expect(color.s).toBe(70);
      expect(color.l).toBe(40);
      expect(color.a).toBe(0.8);
    });
  });

  describe("Events", () => {
    it("should emit color-change event when setColor is called", () => {
      return new Promise<void>((resolve) => {
        element.addEventListener("color-change", ((e: CustomEvent) => {
          expect(e.detail.h).toBe(120);
          expect(e.detail.s).toBe(100);
          expect(e.detail.l).toBe(50);
          resolve();
        }) as EventListener);

        element.setColor(120, 100, 50);
      });
    });

    it("should include value in color-change event", () => {
      return new Promise<void>((resolve) => {
        element.format = "hex";
        element.addEventListener("color-change", ((e: CustomEvent) => {
          expect(e.detail.value).toContain("00ff00");
          resolve();
        }) as EventListener);

        element.setColor(120, 100, 50);
      });
    });

    it("should include alpha in color-change event", () => {
      return new Promise<void>((resolve) => {
        element.addEventListener("color-change", ((e: CustomEvent) => {
          expect(e.detail.a).toBe(0.5);
          resolve();
        }) as EventListener);

        element.setColor(0, 100, 50, 0.5);
      });
    });
  });

  describe("Shadow DOM", () => {
    it("should have container part", () => {
      const container = element.shadowRoot?.querySelector('[part="container"]');
      expect(container).toBeTruthy();
    });

    it("should have palette part", () => {
      const palette = element.shadowRoot?.querySelector('[part="palette"]');
      expect(palette).toBeTruthy();
    });

    it("should have hue-slider part", () => {
      const hueSlider = element.shadowRoot?.querySelector(
        '[part="hue-slider"]',
      );
      expect(hueSlider).toBeTruthy();
    });

    it("should have palette-cursor part", () => {
      const cursor = element.shadowRoot?.querySelector(
        '[part="palette-cursor"]',
      );
      expect(cursor).toBeTruthy();
    });

    it("should have hue-cursor part", () => {
      const cursor = element.shadowRoot?.querySelector('[part="hue-cursor"]');
      expect(cursor).toBeTruthy();
    });
  });

  describe("Conditional Rendering", () => {
    it("should show alpha slider when show-alpha is set", () => {
      element.showAlpha = true;
      const alphaSlider = element.shadowRoot?.querySelector(
        '[part="alpha-slider"]',
      );
      expect(alphaSlider).toBeTruthy();
    });

    it("should not show alpha slider by default", () => {
      const alphaSlider = element.shadowRoot?.querySelector(
        '[part="alpha-slider"]',
      );
      expect(alphaSlider).toBeFalsy();
    });

    it("should show input when show-input is set", () => {
      element.showInput = true;
      const input = element.shadowRoot?.querySelector('[part="input"]');
      expect(input).toBeTruthy();
    });

    it("should not show input by default", () => {
      const input = element.shadowRoot?.querySelector('[part="input"]');
      expect(input).toBeFalsy();
    });

    it("should show preview when show-input is set", () => {
      element.showInput = true;
      const preview = element.shadowRoot?.querySelector('[part="preview"]');
      expect(preview).toBeTruthy();
    });

    it("should show swatches when show-swatches is set", () => {
      element.showSwatches = true;
      element.swatches = ["#ff0000", "#00ff00"];
      const swatches = element.shadowRoot?.querySelector('[part="swatches"]');
      expect(swatches).toBeTruthy();
    });

    it("should not show swatches by default", () => {
      const swatches = element.shadowRoot?.querySelector('[part="swatches"]');
      expect(swatches).toBeFalsy();
    });

    it("should render correct number of swatches", () => {
      element.showSwatches = true;
      element.swatches = ["#ff0000", "#00ff00", "#0000ff"];
      const swatches = element.shadowRoot?.querySelectorAll('[part="swatch"]');
      expect(swatches?.length).toBe(3);
    });
  });

  describe("Disabled State", () => {
    it("should apply disabled attribute to host", () => {
      element.disabled = true;
      expect(element.hasAttribute("disabled")).toBe(true);
    });

    it("should disable input when disabled", () => {
      element.showInput = true;
      element.disabled = true;
      const input = element.shadowRoot?.querySelector(
        "input",
      ) as HTMLInputElement;
      expect(input?.disabled).toBe(true);
    });
  });

  describe("Readonly State", () => {
    it("should apply readonly attribute to host", () => {
      element.readonly = true;
      expect(element.hasAttribute("readonly")).toBe(true);
    });

    it("should make input readonly when readonly", () => {
      element.showInput = true;
      element.readonly = true;
      const input = element.shadowRoot?.querySelector(
        "input",
      ) as HTMLInputElement;
      expect(input?.readOnly).toBe(true);
    });
  });

  describe("Color Conversion", () => {
    it("should convert red to different formats", () => {
      element.setColor(0, 100, 50);

      element.format = "hex";
      expect(element.value.toLowerCase()).toBe("#ff0000");

      element.format = "rgb";
      expect(element.value).toBe("rgb(255, 0, 0)");

      element.format = "hsl";
      expect(element.value).toBe("hsl(0, 100%, 50%)");
    });

    it("should convert green to different formats", () => {
      element.setColor(120, 100, 50);

      element.format = "hex";
      expect(element.value.toLowerCase()).toBe("#00ff00");

      element.format = "rgb";
      expect(element.value).toBe("rgb(0, 255, 0)");

      element.format = "hsl";
      expect(element.value).toBe("hsl(120, 100%, 50%)");
    });

    it("should convert blue to different formats", () => {
      element.setColor(240, 100, 50);

      element.format = "hex";
      expect(element.value.toLowerCase()).toBe("#0000ff");

      element.format = "rgb";
      expect(element.value).toBe("rgb(0, 0, 255)");

      element.format = "hsl";
      expect(element.value).toBe("hsl(240, 100%, 50%)");
    });
  });

  describe("Value Clamping", () => {
    it("should clamp hue to 0-360", () => {
      element.setColor(400, 100, 50);
      const color = element.getColor();
      expect(color.h).toBe(360);
    });

    it("should clamp saturation to 0-100", () => {
      element.setColor(0, 150, 50);
      const color = element.getColor();
      expect(color.s).toBe(100);
    });

    it("should clamp lightness to 0-100", () => {
      element.setColor(0, 100, 150);
      const color = element.getColor();
      expect(color.l).toBe(100);
    });

    it("should clamp alpha to 0-1", () => {
      element.setColor(0, 100, 50, 1.5);
      const color = element.getColor();
      expect(color.a).toBe(1);
    });

    it("should clamp negative hue to 0", () => {
      element.setColor(-10, 100, 50);
      const color = element.getColor();
      expect(color.h).toBe(0);
    });
  });
});
