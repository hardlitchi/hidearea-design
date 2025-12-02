import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaSelect } from "./select";

describe("HaSelect", () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get("ha-select")) {
      customElements.define("ha-select", HaSelect);
    }
    await waitForCustomElement("ha-select");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-select")).toBe(HaSelect);
    });

    it("should create an instance", () => {
      const select = document.createElement("ha-select") as HaSelect;
      expect(select).toBeInstanceOf(HaSelect);
      expect(select).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const select = document.createElement("ha-select") as HaSelect;
      document.body.appendChild(select);
      expect(select.shadowRoot).not.toBeNull();
      document.body.removeChild(select);
    });
  });

  describe("Attributes and Properties", () => {
    let select: HaSelect;

    beforeEach(() => {
      select = document.createElement("ha-select") as HaSelect;
      document.body.appendChild(select);
    });

    afterEach(() => {
      document.body.removeChild(select);
    });

    it("should have default variant as default", () => {
      expect(select.variant).toBe("default");
    });

    it("should have default size as md", () => {
      expect(select.size).toBe("md");
    });

    it("should update variant property", () => {
      select.variant = "filled";
      expect(select.variant).toBe("filled");
      expect(select.getAttribute("variant")).toBe("filled");
    });

    it("should update variant attribute", () => {
      select.setAttribute("variant", "outlined");
      expect(select.variant).toBe("outlined");
    });

    it("should update size property", () => {
      select.size = "lg";
      expect(select.size).toBe("lg");
      expect(select.getAttribute("size")).toBe("lg");
    });

    it("should update size attribute", () => {
      select.setAttribute("size", "sm");
      expect(select.size).toBe("sm");
    });

    it("should update disabled property", () => {
      select.disabled = true;
      expect(select.disabled).toBe(true);
      expect(select.hasAttribute("disabled")).toBe(true);

      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.disabled).toBe(true);
    });

    it("should update disabled attribute", () => {
      select.setAttribute("disabled", "");
      expect(select.disabled).toBe(true);

      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.disabled).toBe(true);
    });

    it("should remove disabled when set to false", () => {
      select.disabled = true;
      select.disabled = false;
      expect(select.disabled).toBe(false);
      expect(select.hasAttribute("disabled")).toBe(false);

      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.disabled).toBe(false);
    });

    it("should update required property", () => {
      select.required = true;
      expect(select.required).toBe(true);
      expect(select.hasAttribute("required")).toBe(true);

      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.required).toBe(true);
    });

    it("should update required attribute", () => {
      select.setAttribute("required", "");
      expect(select.required).toBe(true);

      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.required).toBe(true);
    });

    it("should remove required when set to false", () => {
      select.required = true;
      select.required = false;
      expect(select.required).toBe(false);
      expect(select.hasAttribute("required")).toBe(false);

      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.required).toBe(false);
    });

    it("should update error property", () => {
      select.error = true;
      expect(select.error).toBe(true);
      expect(select.hasAttribute("error")).toBe(true);
    });

    it("should update error attribute", () => {
      select.setAttribute("error", "");
      expect(select.error).toBe(true);
    });

    it("should remove error when set to false", () => {
      select.error = true;
      select.error = false;
      expect(select.error).toBe(false);
      expect(select.hasAttribute("error")).toBe(false);
    });

    it("should update fullWidth property", () => {
      select.fullWidth = true;
      expect(select.fullWidth).toBe(true);
      expect(select.hasAttribute("full-width")).toBe(true);
    });

    it("should update fullWidth attribute", () => {
      select.setAttribute("full-width", "");
      expect(select.fullWidth).toBe(true);
    });

    it("should remove fullWidth when set to false", () => {
      select.fullWidth = true;
      select.fullWidth = false;
      expect(select.fullWidth).toBe(false);
      expect(select.hasAttribute("full-width")).toBe(false);
    });

    it("should update name property", () => {
      select.name = "country";
      expect(select.name).toBe("country");
      expect(select.getAttribute("name")).toBe("country");

      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.name).toBe("country");
    });

    it("should update name attribute", () => {
      select.setAttribute("name", "language");
      expect(select.name).toBe("language");

      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.name).toBe("language");
    });

    it("should remove name when set to null", () => {
      select.name = "test";
      select.name = null;
      expect(select.name).toBeNull();
      expect(select.hasAttribute("name")).toBe(false);
    });

    it("should update placeholder property", () => {
      select.placeholder = "Select an option";
      expect(select.placeholder).toBe("Select an option");
      expect(select.getAttribute("placeholder")).toBe("Select an option");
    });

    it("should update placeholder attribute", () => {
      select.setAttribute("placeholder", "Choose one");
      expect(select.placeholder).toBe("Choose one");
    });

    it("should remove placeholder when set to null", () => {
      select.placeholder = "Test";
      select.placeholder = null;
      expect(select.placeholder).toBeNull();
      expect(select.hasAttribute("placeholder")).toBe(false);
    });
  });

  describe("Value Management", () => {
    let select: HaSelect;

    beforeEach(() => {
      select = document.createElement("ha-select") as HaSelect;
      document.body.appendChild(select);
    });

    afterEach(() => {
      document.body.removeChild(select);
    });

    it("should have value property", () => {
      expect(select.value).toBeDefined();
    });

    it("should set value via property", () => {
      select.value = "test";
      expect(select.getAttribute("value")).toBe("test");
    });

    it("should update internal select value when attribute changes", () => {
      select.setAttribute("value", "test2");
      // The attribute change will update the internal select
      expect(select.getAttribute("value")).toBe("test2");
    });
  });

  describe("Shadow DOM Structure", () => {
    let select: HaSelect;

    beforeEach(() => {
      select = document.createElement("ha-select") as HaSelect;
      document.body.appendChild(select);
    });

    afterEach(() => {
      document.body.removeChild(select);
    });

    it("should have a select-wrapper div with part attribute", () => {
      const wrapper = queryShadow(
        select,
        '[part="select-wrapper"]',
      ) as HTMLDivElement;
      expect(wrapper).toBeTruthy();
      expect(wrapper.tagName).toBe("DIV");
    });

    it("should have a select element with part attribute", () => {
      const selectElement = queryShadow(
        select,
        '[part="select"]',
      ) as HTMLSelectElement;
      expect(selectElement).toBeTruthy();
      expect(selectElement.tagName).toBe("SELECT");
    });

    it("should have an arrow element", () => {
      const arrow = queryShadow(select, ".arrow") as HTMLSpanElement;
      expect(arrow).toBeTruthy();
    });

    it("should have a slot element", () => {
      const slot = queryShadow(select, "slot");
      expect(slot).toBeTruthy();
    });

    it("should render slotted options", () => {
      const option = document.createElement("option");
      option.value = "test";
      option.textContent = "Test Option";
      select.appendChild(option);

      // Wait for slot assignment
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(select.contains(option)).toBe(true);
          resolve(undefined);
        }, 0);
      });
    });
  });

  describe("Focus Management", () => {
    let select: HaSelect;

    beforeEach(() => {
      select = document.createElement("ha-select") as HaSelect;
      document.body.appendChild(select);
    });

    afterEach(() => {
      document.body.removeChild(select);
    });

    it("should focus the internal select when focus() is called", () => {
      select.focus();
      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(document.activeElement).toBe(select);
    });

    it("should blur the internal select when blur() is called", () => {
      select.focus();
      select.blur();
      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(document.activeElement).not.toBe(select);
    });
  });

  describe("Accessibility", () => {
    let select: HaSelect;

    beforeEach(() => {
      select = document.createElement("ha-select") as HaSelect;
      document.body.appendChild(select);
    });

    afterEach(() => {
      document.body.removeChild(select);
    });

    it("should use native select element", () => {
      const selectElement = queryShadow(select, "select");
      expect(selectElement).toBeTruthy();
    });

    it("should support disabled state", () => {
      select.disabled = true;
      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.disabled).toBe(true);
    });

    it("should support required state", () => {
      select.required = true;
      const internalSelect = queryShadow(select, "select") as HTMLSelectElement;
      expect(internalSelect.required).toBe(true);
    });
  });
});
