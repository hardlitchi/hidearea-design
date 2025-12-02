import { describe, it, expect, beforeEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaInput } from "./input";

describe("HaInput", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-input")) {
      customElements.define("ha-input", HaInput);
    }
    await waitForCustomElement("ha-input");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-input")).toBe(HaInput);
    });

    it("should create an instance", () => {
      const input = document.createElement("ha-input") as HaInput;
      expect(input).toBeInstanceOf(HaInput);
      expect(input).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
      expect(input.shadowRoot).not.toBeNull();
      document.body.removeChild(input);
    });
  });

  describe("Default Values", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should have default variant as default", () => {
      expect(input.variant).toBe("default");
    });

    it("should have default size as md", () => {
      expect(input.size).toBe("md");
    });

    it("should have default type as text", () => {
      expect(input.type).toBe("text");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.type).toBe("text");
    });

    it("should have empty value by default", () => {
      expect(input.value).toBe("");
    });
  });

  describe("Attributes and Properties", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should update variant property", () => {
      input.variant = "filled";
      expect(input.variant).toBe("filled");
      expect(input.getAttribute("variant")).toBe("filled");
    });

    it("should update size property", () => {
      input.size = "lg";
      expect(input.size).toBe("lg");
      expect(input.getAttribute("size")).toBe("lg");
    });

    it("should update type property", () => {
      input.type = "email";
      expect(input.type).toBe("email");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.type).toBe("email");
    });

    it("should update value property", () => {
      input.value = "test value";
      expect(input.value).toBe("test value");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.value).toBe("test value");
    });

    it("should update placeholder property", () => {
      input.placeholder = "Enter text";
      expect(input.placeholder).toBe("Enter text");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.placeholder).toBe("Enter text");
    });

    it("should update disabled property", () => {
      input.disabled = true;
      expect(input.disabled).toBe(true);
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.disabled).toBe(true);
    });

    it("should update readonly property", () => {
      input.readonly = true;
      expect(input.readonly).toBe(true);
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.readOnly).toBe(true);
    });

    it("should update required property", () => {
      input.required = true;
      expect(input.required).toBe(true);
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.required).toBe(true);
    });

    it("should update error property", () => {
      input.error = true;
      expect(input.error).toBe(true);
      expect(input.hasAttribute("error")).toBe(true);
    });

    it("should update fullWidth property", () => {
      input.fullWidth = true;
      expect(input.fullWidth).toBe(true);
      expect(input.hasAttribute("full-width")).toBe(true);
    });

    it("should update name property", () => {
      input.name = "username";
      expect(input.name).toBe("username");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.name).toBe("username");
    });
  });

  describe("Input Types", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    const types = [
      "text",
      "password",
      "email",
      "number",
      "tel",
      "url",
      "search",
    ] as const;

    types.forEach((type) => {
      it(`should support ${type} type`, () => {
        input.type = type;
        const internalInput = queryShadow(input, "input") as HTMLInputElement;
        expect(internalInput.type).toBe(type);
      });
    });
  });

  describe("Variants", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    const variants = ["default", "filled", "outlined"] as const;

    variants.forEach((variant) => {
      it(`should set ${variant} variant attribute`, () => {
        input.variant = variant;
        expect(input.getAttribute("variant")).toBe(variant);
      });
    });
  });

  describe("Sizes", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      it(`should set ${size} size attribute`, () => {
        input.size = size;
        expect(input.getAttribute("size")).toBe(size);
      });
    });
  });

  describe("Slots", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should render prefix slot", () => {
      const prefixSlot = queryShadow(input, 'slot[name="prefix"]');
      expect(prefixSlot).not.toBeNull();
    });

    it("should render suffix slot", () => {
      const suffixSlot = queryShadow(input, 'slot[name="suffix"]');
      expect(suffixSlot).not.toBeNull();
    });
  });

  describe("Events", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should emit input event when value changes", async () => {
      const inputHandler = vi.fn();
      input.addEventListener("input", inputHandler);

      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      internalInput.value = "test";
      internalInput.dispatchEvent(new Event("input", { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(inputHandler).toHaveBeenCalled();
    });

    it("should emit change event when input loses focus after value change", async () => {
      const changeHandler = vi.fn();
      input.addEventListener("change", changeHandler);

      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      internalInput.value = "test";
      internalInput.dispatchEvent(new Event("change", { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(changeHandler).toHaveBeenCalled();
    });

    it("should emit focus event when input gains focus", async () => {
      const focusHandler = vi.fn();
      input.addEventListener("focus", focusHandler);

      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      internalInput.dispatchEvent(new Event("focus"));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(focusHandler).toHaveBeenCalled();
    });

    it("should emit blur event when input loses focus", async () => {
      const blurHandler = vi.fn();
      input.addEventListener("blur", blurHandler);

      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      internalInput.dispatchEvent(new Event("blur"));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(blurHandler).toHaveBeenCalled();
    });

    it("should include value in input event detail", async () => {
      let eventValue: string | undefined;
      input.addEventListener("input", (e) => {
        const customEvent = e as CustomEvent<{ value: string }>;
        eventValue = customEvent.detail.value;
      });

      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      internalInput.value = "test value";
      internalInput.dispatchEvent(new Event("input", { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(eventValue).toBe("test value");
    });
  });

  describe("Disabled State", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should disable internal input when disabled", () => {
      input.disabled = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.disabled).toBe(true);
    });

    it("should set aria-disabled when disabled", () => {
      input.disabled = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-disabled")).toBe("true");
    });
  });

  describe("Readonly State", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should make internal input readonly", () => {
      input.readonly = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.readOnly).toBe(true);
    });

    it("should set aria-readonly when readonly", () => {
      input.readonly = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-readonly")).toBe("true");
    });

    it("should not have aria-readonly when not readonly", () => {
      input.readonly = false;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.hasAttribute("aria-readonly")).toBe(false);
    });
  });

  describe("Required State", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should mark internal input as required", () => {
      input.required = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.required).toBe(true);
    });

    it("should set aria-required when required", () => {
      input.required = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-required")).toBe("true");
    });

    it("should not have aria-required when not required", () => {
      input.required = false;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.hasAttribute("aria-required")).toBe(false);
    });
  });

  describe("Error State", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should set aria-invalid when error", () => {
      input.error = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-invalid")).toBe("true");
    });

    it("should not have aria-invalid when not error", () => {
      input.error = false;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.hasAttribute("aria-invalid")).toBe(false);
    });
  });

  describe("Validation Attributes", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should set maxlength attribute", () => {
      input.setAttribute("maxlength", "10");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.maxLength).toBe(10);
    });

    it("should set minlength attribute", () => {
      input.setAttribute("minlength", "3");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.minLength).toBe(3);
    });

    it("should set pattern attribute", () => {
      input.setAttribute("pattern", "[0-9]+");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.pattern).toBe("[0-9]+");
    });

    it("should set min attribute for number type", () => {
      input.type = "number";
      input.setAttribute("min", "0");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.min).toBe("0");
    });

    it("should set max attribute for number type", () => {
      input.type = "number";
      input.setAttribute("max", "100");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.max).toBe("100");
    });

    it("should set step attribute for number type", () => {
      input.type = "number";
      input.setAttribute("step", "5");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.step).toBe("5");
    });
  });

  describe("Focus Management", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should expose focus method", () => {
      expect(typeof input.focus).toBe("function");
    });

    it("should expose blur method", () => {
      expect(typeof input.blur).toBe("function");
    });

    it("should focus internal input when focus is called", () => {
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      const focusSpy = vi.spyOn(internalInput, "focus");

      input.focus();

      expect(focusSpy).toHaveBeenCalled();
    });

    it("should blur internal input when blur is called", () => {
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      const blurSpy = vi.spyOn(internalInput, "blur");

      input.blur();

      expect(blurSpy).toHaveBeenCalled();
    });
  });

  describe("Selection Methods", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
      input.value = "test value";
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should expose select method", () => {
      expect(typeof input.select).toBe("function");
    });

    it("should expose setSelectionRange method", () => {
      expect(typeof input.setSelectionRange).toBe("function");
    });

    it("should select all text when select is called", () => {
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      const selectSpy = vi.spyOn(internalInput, "select");

      input.select();

      expect(selectSpy).toHaveBeenCalled();
    });

    it("should set selection range when setSelectionRange is called", () => {
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      const setSelectionRangeSpy = vi.spyOn(internalInput, "setSelectionRange");

      input.setSelectionRange(0, 4);

      expect(setSelectionRangeSpy).toHaveBeenCalledWith(0, 4, undefined);
    });
  });

  describe("Validation", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should expose checkValidity method", () => {
      expect(typeof input.checkValidity).toBe("function");
    });

    it("should expose reportValidity method", () => {
      expect(typeof input.reportValidity).toBe("function");
    });

    it("should expose setCustomValidity method", () => {
      expect(typeof input.setCustomValidity).toBe("function");
    });

    it("should return true for valid input", () => {
      input.value = "valid";
      expect(input.checkValidity()).toBe(true);
    });

    it("should return false for invalid required input", () => {
      input.required = true;
      input.value = "";
      expect(input.checkValidity()).toBe(false);
    });

    it("should return false for input with custom validation message", () => {
      input.setCustomValidity("Custom error");
      expect(input.checkValidity()).toBe(false);
    });

    it("should clear custom validity when empty string is passed", () => {
      input.setCustomValidity("Error");
      expect(input.checkValidity()).toBe(false);

      input.setCustomValidity("");
      expect(input.checkValidity()).toBe(true);
    });
  });

  describe("Accessibility", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should have input role implicitly", () => {
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.tagName.toLowerCase()).toBe("input");
    });

    it("should be keyboard accessible", () => {
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it("should have aria-disabled when disabled", () => {
      input.disabled = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-disabled")).toBe("true");
    });

    it("should have aria-readonly when readonly", () => {
      input.readonly = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-readonly")).toBe("true");
    });

    it("should have aria-required when required", () => {
      input.required = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-required")).toBe("true");
    });

    it("should have aria-invalid when error", () => {
      input.error = true;
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-invalid")).toBe("true");
    });
  });

  describe("Autocomplete", () => {
    let input: HaInput;

    beforeEach(() => {
      input = document.createElement("ha-input") as HaInput;
      document.body.appendChild(input);
    });

    afterEach(() => {
      document.body.removeChild(input);
    });

    it("should set autocomplete attribute", () => {
      input.setAttribute("autocomplete", "email");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("autocomplete")).toBe("email");
    });

    it("should remove autocomplete attribute when not set", () => {
      input.setAttribute("autocomplete", "email");
      input.removeAttribute("autocomplete");
      const internalInput = queryShadow(input, "input") as HTMLInputElement;
      expect(internalInput.hasAttribute("autocomplete")).toBe(false);
    });
  });
});
