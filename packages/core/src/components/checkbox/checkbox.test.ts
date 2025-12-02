import { describe, it, expect, beforeEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaCheckbox } from "./checkbox";

describe("HaCheckbox", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-checkbox")) {
      customElements.define("ha-checkbox", HaCheckbox);
    }
    await waitForCustomElement("ha-checkbox");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-checkbox")).toBe(HaCheckbox);
    });

    it("should create an instance", () => {
      const checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      expect(checkbox).toBeInstanceOf(HaCheckbox);
      expect(checkbox).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
      expect(checkbox.shadowRoot).not.toBeNull();
      document.body.removeChild(checkbox);
    });
  });

  describe("Default Values", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should have default size as md", () => {
      expect(checkbox.size).toBe("md");
    });

    it("should not be checked by default", () => {
      expect(checkbox.checked).toBe(false);
    });

    it("should not be indeterminate by default", () => {
      expect(checkbox.indeterminate).toBe(false);
    });

    it("should not be disabled by default", () => {
      expect(checkbox.disabled).toBe(false);
    });

    it('should have default value as "on"', () => {
      expect(checkbox.value).toBe("on");
    });
  });

  describe("Attributes and Properties", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should update size property", () => {
      checkbox.size = "lg";
      expect(checkbox.size).toBe("lg");
      expect(checkbox.getAttribute("size")).toBe("lg");
    });

    it("should update checked property", () => {
      checkbox.checked = true;
      expect(checkbox.checked).toBe(true);
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.checked).toBe(true);
    });

    it("should update indeterminate property", () => {
      checkbox.indeterminate = true;
      expect(checkbox.indeterminate).toBe(true);
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.indeterminate).toBe(true);
    });

    it("should update disabled property", () => {
      checkbox.disabled = true;
      expect(checkbox.disabled).toBe(true);
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.disabled).toBe(true);
    });

    it("should update required property", () => {
      checkbox.required = true;
      expect(checkbox.required).toBe(true);
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.required).toBe(true);
    });

    it("should update error property", () => {
      checkbox.error = true;
      expect(checkbox.error).toBe(true);
      expect(checkbox.hasAttribute("error")).toBe(true);
    });

    it("should update name property", () => {
      checkbox.name = "agree";
      expect(checkbox.name).toBe("agree");
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.name).toBe("agree");
    });

    it("should update value property", () => {
      checkbox.value = "yes";
      expect(checkbox.value).toBe("yes");
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.value).toBe("yes");
    });

    it("should set label attribute", () => {
      checkbox.setAttribute("label", "Accept terms");
      expect(checkbox.getAttribute("label")).toBe("Accept terms");
    });

    it("should set description attribute", () => {
      checkbox.setAttribute("description", "You must accept to continue");
      expect(checkbox.getAttribute("description")).toBe(
        "You must accept to continue",
      );
    });
  });

  describe("Sizes", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      it(`should set ${size} size attribute`, () => {
        checkbox.size = size;
        expect(checkbox.getAttribute("size")).toBe(size);
      });
    });
  });

  describe("Rendering", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should render internal input element", () => {
      const internalInput = queryShadow(checkbox, 'input[type="checkbox"]');
      expect(internalInput).not.toBeNull();
    });

    it("should render checkbox box", () => {
      const checkboxBox = queryShadow(checkbox, ".checkbox-box");
      expect(checkboxBox).not.toBeNull();
    });

    it("should render checkbox icon", () => {
      const icon = queryShadow(checkbox, ".checkbox-icon");
      expect(icon).not.toBeNull();
    });

    it("should render label element", () => {
      const label = queryShadow(checkbox, ".label");
      expect(label).not.toBeNull();
    });

    it("should render description element", () => {
      const description = queryShadow(checkbox, ".description");
      expect(description).not.toBeNull();
    });

    it("should render default slot for label", () => {
      const labelSlot = queryShadow(checkbox, ".label slot");
      expect(labelSlot).not.toBeNull();
    });

    it("should render description slot", () => {
      const descriptionSlot = queryShadow(checkbox, 'slot[name="description"]');
      expect(descriptionSlot).not.toBeNull();
    });
  });

  describe("Checked State", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should check internal input when checked", () => {
      checkbox.checked = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.checked).toBe(true);
    });

    it("should uncheck internal input when unchecked", () => {
      checkbox.checked = true;
      checkbox.checked = false;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.checked).toBe(false);
    });

    it("should sync checked property when internal input changes", async () => {
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;

      internalInput.checked = true;
      internalInput.dispatchEvent(new Event("change", { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(checkbox.checked).toBe(true);
    });
  });

  describe("Indeterminate State", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should set indeterminate state on internal input", () => {
      checkbox.indeterminate = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.indeterminate).toBe(true);
    });

    it("should render indeterminate icon when indeterminate", () => {
      checkbox.indeterminate = true;
      const icon = queryShadow(checkbox, ".checkbox-icon");
      expect(icon).not.toBeNull();
    });

    it("should switch from check icon to indeterminate icon", () => {
      checkbox.checked = true;
      checkbox.indeterminate = true;

      const icon = queryShadow(checkbox, ".checkbox-icon");
      expect(icon).not.toBeNull();
    });

    it("should switch from indeterminate icon to check icon", () => {
      checkbox.indeterminate = true;
      checkbox.indeterminate = false;
      checkbox.checked = true;

      const icon = queryShadow(checkbox, ".checkbox-icon");
      expect(icon).not.toBeNull();
    });
  });

  describe("Disabled State", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should disable internal input when disabled", () => {
      checkbox.disabled = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.disabled).toBe(true);
    });

    it("should set aria-disabled when disabled", () => {
      checkbox.disabled = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-disabled")).toBe("true");
    });

    it("should not emit change event when disabled and clicked", async () => {
      checkbox.disabled = true;
      const changeHandler = vi.fn();
      checkbox.addEventListener("change", changeHandler);

      checkbox.click();

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(changeHandler).not.toHaveBeenCalled();
    });
  });

  describe("Required State", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should mark internal input as required", () => {
      checkbox.required = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.required).toBe(true);
    });

    it("should set aria-required when required", () => {
      checkbox.required = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-required")).toBe("true");
    });

    it("should not have aria-required when not required", () => {
      checkbox.required = false;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.hasAttribute("aria-required")).toBe(false);
    });
  });

  describe("Error State", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should set aria-invalid when error", () => {
      checkbox.error = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-invalid")).toBe("true");
    });

    it("should not have aria-invalid when not error", () => {
      checkbox.error = false;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.hasAttribute("aria-invalid")).toBe(false);
    });
  });

  describe("Events", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should emit change event when checked state changes", async () => {
      const changeHandler = vi.fn();
      checkbox.addEventListener("change", changeHandler);

      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      internalInput.click();

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(changeHandler).toHaveBeenCalled();
    });

    it("should emit input event when checked state changes", async () => {
      const inputHandler = vi.fn();
      checkbox.addEventListener("input", inputHandler);

      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      internalInput.click();

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(inputHandler).toHaveBeenCalled();
    });

    it("should include checked state in event detail", async () => {
      let eventChecked: boolean | undefined;
      checkbox.addEventListener("change", (e) => {
        const customEvent = e as CustomEvent<{ checked: boolean }>;
        eventChecked = customEvent.detail.checked;
      });

      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      internalInput.click();

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(eventChecked).toBe(true);
    });

    it("should toggle checkbox when host element is clicked", async () => {
      expect(checkbox.checked).toBe(false);

      checkbox.click();

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(checkbox.checked).toBe(true);
    });

    it("should toggle checkbox twice when clicked twice", async () => {
      checkbox.click();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(checkbox.checked).toBe(true);

      checkbox.click();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(checkbox.checked).toBe(false);
    });
  });

  describe("Focus Management", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should expose focus method", () => {
      expect(typeof checkbox.focus).toBe("function");
    });

    it("should expose blur method", () => {
      expect(typeof checkbox.blur).toBe("function");
    });

    it("should focus internal input when focus is called", () => {
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      const focusSpy = vi.spyOn(internalInput, "focus");

      checkbox.focus();

      expect(focusSpy).toHaveBeenCalled();
    });

    it("should blur internal input when blur is called", () => {
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      const blurSpy = vi.spyOn(internalInput, "blur");

      checkbox.blur();

      expect(blurSpy).toHaveBeenCalled();
    });
  });

  describe("Validation", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should expose checkValidity method", () => {
      expect(typeof checkbox.checkValidity).toBe("function");
    });

    it("should expose reportValidity method", () => {
      expect(typeof checkbox.reportValidity).toBe("function");
    });

    it("should expose setCustomValidity method", () => {
      expect(typeof checkbox.setCustomValidity).toBe("function");
    });

    it("should return true for valid checkbox", () => {
      checkbox.checked = true;
      expect(checkbox.checkValidity()).toBe(true);
    });

    it("should return false for invalid required checkbox", () => {
      checkbox.required = true;
      checkbox.checked = false;
      expect(checkbox.checkValidity()).toBe(false);
    });

    it("should return false for checkbox with custom validation message", () => {
      checkbox.setCustomValidity("Custom error");
      expect(checkbox.checkValidity()).toBe(false);
    });

    it("should clear custom validity when empty string is passed", () => {
      checkbox.setCustomValidity("Error");
      expect(checkbox.checkValidity()).toBe(false);

      checkbox.setCustomValidity("");
      expect(checkbox.checkValidity()).toBe(true);
    });
  });

  describe("Accessibility", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should have checkbox role implicitly", () => {
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.type).toBe("checkbox");
    });

    it("should be keyboard accessible", () => {
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it("should have aria-disabled when disabled", () => {
      checkbox.disabled = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-disabled")).toBe("true");
    });

    it("should have aria-required when required", () => {
      checkbox.required = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-required")).toBe("true");
    });

    it("should have aria-invalid when error", () => {
      checkbox.error = true;
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.getAttribute("aria-invalid")).toBe("true");
    });

    it("should have aria-hidden on icon", () => {
      const icon = queryShadow(checkbox, ".checkbox-icon") as SVGElement;
      expect(icon.getAttribute("aria-hidden")).toBe("true");
    });
  });

  describe("Label and Description", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should display label from attribute", () => {
      checkbox.setAttribute("label", "Accept terms");
      const label = queryShadow(checkbox, ".label");
      expect(label?.textContent).toContain("Accept terms");
    });

    it("should display description from attribute", () => {
      checkbox.setAttribute("description", "You must accept");
      const description = queryShadow(checkbox, ".description");
      expect(description?.textContent).toContain("You must accept");
    });

    it("should support slotted label content", () => {
      const labelText = document.createElement("span");
      labelText.textContent = "Slotted label";
      checkbox.appendChild(labelText);

      const slot = queryShadow(checkbox, ".label slot") as HTMLSlotElement;
      expect(slot).not.toBeNull();
    });

    it("should support slotted description content", () => {
      const descText = document.createElement("span");
      descText.slot = "description";
      descText.textContent = "Slotted description";
      checkbox.appendChild(descText);

      const slot = queryShadow(
        checkbox,
        'slot[name="description"]',
      ) as HTMLSlotElement;
      expect(slot).not.toBeNull();
    });
  });

  describe("Name and Value", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should set name on internal input", () => {
      checkbox.name = "terms";
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.name).toBe("terms");
    });

    it("should set value on internal input", () => {
      checkbox.value = "agreed";
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.value).toBe("agreed");
    });

    it('should have default value "on" when not set', () => {
      const internalInput = queryShadow(checkbox, "input") as HTMLInputElement;
      expect(internalInput.value).toBe("on");
    });
  });

  describe("Parts", () => {
    let checkbox: HaCheckbox;

    beforeEach(() => {
      checkbox = document.createElement("ha-checkbox") as HaCheckbox;
      document.body.appendChild(checkbox);
    });

    afterEach(() => {
      document.body.removeChild(checkbox);
    });

    it("should expose checkbox-container part", () => {
      const container = queryShadow(checkbox, '[part="checkbox-container"]');
      expect(container).not.toBeNull();
    });

    it("should expose checkbox-box part", () => {
      const box = queryShadow(checkbox, '[part="checkbox-box"]');
      expect(box).not.toBeNull();
    });

    it("should expose checkbox-icon part", () => {
      const icon = queryShadow(checkbox, '[part="checkbox-icon"]');
      expect(icon).not.toBeNull();
    });

    it("should expose label part", () => {
      const label = queryShadow(checkbox, '[part="label"]');
      expect(label).not.toBeNull();
    });

    it("should expose description part", () => {
      const description = queryShadow(checkbox, '[part="description"]');
      expect(description).not.toBeNull();
    });
  });
});
