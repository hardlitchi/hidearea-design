import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaFormGroup } from "./form-group";

describe("HaFormGroup", () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get("ha-form-group")) {
      customElements.define("ha-form-group", HaFormGroup);
    }
    await waitForCustomElement("ha-form-group");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-form-group")).toBe(HaFormGroup);
    });

    it("should create an instance", () => {
      const formGroup = document.createElement("ha-form-group") as HaFormGroup;
      expect(formGroup).toBeInstanceOf(HaFormGroup);
      expect(formGroup).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const formGroup = document.createElement("ha-form-group") as HaFormGroup;
      document.body.appendChild(formGroup);
      expect(formGroup.shadowRoot).not.toBeNull();
      document.body.removeChild(formGroup);
    });
  });

  describe("Attributes and Properties", () => {
    let formGroup: HaFormGroup;

    beforeEach(() => {
      formGroup = document.createElement("ha-form-group") as HaFormGroup;
      document.body.appendChild(formGroup);
    });

    afterEach(() => {
      document.body.removeChild(formGroup);
    });

    it("should update label property", () => {
      formGroup.label = "Username";
      expect(formGroup.label).toBe("Username");
      expect(formGroup.getAttribute("label")).toBe("Username");
    });

    it("should update label attribute", () => {
      formGroup.setAttribute("label", "Email");
      expect(formGroup.label).toBe("Email");
    });

    it("should remove label when set to null", () => {
      formGroup.label = "Test";
      formGroup.label = null;
      expect(formGroup.label).toBeNull();
      expect(formGroup.hasAttribute("label")).toBe(false);
    });

    it("should update helperText property", () => {
      formGroup.helperText = "Enter your username";
      expect(formGroup.helperText).toBe("Enter your username");
      expect(formGroup.getAttribute("helper-text")).toBe("Enter your username");
    });

    it("should update helperText attribute", () => {
      formGroup.setAttribute("helper-text", "Must be unique");
      expect(formGroup.helperText).toBe("Must be unique");
    });

    it("should remove helperText when set to null", () => {
      formGroup.helperText = "Test";
      formGroup.helperText = null;
      expect(formGroup.helperText).toBeNull();
      expect(formGroup.hasAttribute("helper-text")).toBe(false);
    });

    it("should update errorText property", () => {
      formGroup.errorText = "This field is required";
      expect(formGroup.errorText).toBe("This field is required");
      expect(formGroup.getAttribute("error-text")).toBe(
        "This field is required",
      );
    });

    it("should update errorText attribute", () => {
      formGroup.setAttribute("error-text", "Invalid email");
      expect(formGroup.errorText).toBe("Invalid email");
    });

    it("should remove errorText when set to null", () => {
      formGroup.errorText = "Test";
      formGroup.errorText = null;
      expect(formGroup.errorText).toBeNull();
      expect(formGroup.hasAttribute("error-text")).toBe(false);
    });

    it("should update required property", () => {
      formGroup.required = true;
      expect(formGroup.required).toBe(true);
      expect(formGroup.hasAttribute("required")).toBe(true);
    });

    it("should update required attribute", () => {
      formGroup.setAttribute("required", "");
      expect(formGroup.required).toBe(true);
    });

    it("should remove required when set to false", () => {
      formGroup.required = true;
      formGroup.required = false;
      expect(formGroup.required).toBe(false);
      expect(formGroup.hasAttribute("required")).toBe(false);
    });

    it("should update error property", () => {
      formGroup.error = true;
      expect(formGroup.error).toBe(true);
      expect(formGroup.hasAttribute("error")).toBe(true);
    });

    it("should update error attribute", () => {
      formGroup.setAttribute("error", "");
      expect(formGroup.error).toBe(true);
    });

    it("should remove error when set to false", () => {
      formGroup.error = true;
      formGroup.error = false;
      expect(formGroup.error).toBe(false);
      expect(formGroup.hasAttribute("error")).toBe(false);
    });

    it("should update disabled property", () => {
      formGroup.disabled = true;
      expect(formGroup.disabled).toBe(true);
      expect(formGroup.hasAttribute("disabled")).toBe(true);
    });

    it("should update disabled attribute", () => {
      formGroup.setAttribute("disabled", "");
      expect(formGroup.disabled).toBe(true);
    });

    it("should remove disabled when set to false", () => {
      formGroup.disabled = true;
      formGroup.disabled = false;
      expect(formGroup.disabled).toBe(false);
      expect(formGroup.hasAttribute("disabled")).toBe(false);
    });
  });

  describe("Shadow DOM Structure", () => {
    let formGroup: HaFormGroup;

    beforeEach(() => {
      formGroup = document.createElement("ha-form-group") as HaFormGroup;
      document.body.appendChild(formGroup);
    });

    afterEach(() => {
      document.body.removeChild(formGroup);
    });

    it("should have a label element with part attribute", () => {
      const label = queryShadow(
        formGroup,
        '[part="label"]',
      ) as HTMLLabelElement;
      expect(label).toBeTruthy();
      expect(label.tagName).toBe("LABEL");
    });

    it("should have a slot-container with part attribute", () => {
      const container = queryShadow(
        formGroup,
        '[part="slot-container"]',
      ) as HTMLDivElement;
      expect(container).toBeTruthy();
      expect(container.tagName).toBe("DIV");
    });

    it("should have a helper-text element with part attribute", () => {
      const helperText = queryShadow(
        formGroup,
        '[part="helper-text"]',
      ) as HTMLDivElement;
      expect(helperText).toBeTruthy();
      expect(helperText.tagName).toBe("DIV");
    });

    it("should have an error-text element with part attribute", () => {
      const errorText = queryShadow(
        formGroup,
        '[part="error-text"]',
      ) as HTMLDivElement;
      expect(errorText).toBeTruthy();
      expect(errorText.tagName).toBe("DIV");
    });

    it("should have a default slot element", () => {
      const slot = queryShadow(formGroup, "slot:not([name])");
      expect(slot).toBeTruthy();
    });

    it("should have a label slot element", () => {
      const slot = queryShadow(formGroup, 'slot[name="label"]');
      expect(slot).toBeTruthy();
    });

    it("should have a helper-text slot element", () => {
      const slot = queryShadow(formGroup, 'slot[name="helper-text"]');
      expect(slot).toBeTruthy();
    });

    it("should have an error-text slot element", () => {
      const slot = queryShadow(formGroup, 'slot[name="error-text"]');
      expect(slot).toBeTruthy();
    });

    it("should render slotted content", () => {
      const input = document.createElement("input");
      input.type = "text";
      formGroup.appendChild(input);

      // Wait for slot assignment
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(formGroup.contains(input)).toBe(true);
          resolve(undefined);
        }, 0);
      });
    });
  });

  describe("Label Display", () => {
    let formGroup: HaFormGroup;

    beforeEach(() => {
      formGroup = document.createElement("ha-form-group") as HaFormGroup;
      document.body.appendChild(formGroup);
    });

    afterEach(() => {
      document.body.removeChild(formGroup);
    });

    it("should display label text when label attribute is set", () => {
      formGroup.label = "Username";
      const label = queryShadow(
        formGroup,
        '[part="label"]',
      ) as HTMLLabelElement;
      expect(label.textContent).toContain("Username");
    });

    it("should show required indicator when required is true", () => {
      formGroup.required = true;
      const indicator = queryShadow(
        formGroup,
        ".required-indicator",
      ) as HTMLSpanElement;
      expect(indicator).toBeTruthy();
      expect(indicator.textContent).toBe("*");
    });
  });

  describe("Helper and Error Text", () => {
    let formGroup: HaFormGroup;

    beforeEach(() => {
      formGroup = document.createElement("ha-form-group") as HaFormGroup;
      document.body.appendChild(formGroup);
    });

    afterEach(() => {
      document.body.removeChild(formGroup);
    });

    it("should display helper text when helper-text attribute is set", () => {
      formGroup.helperText = "Enter your username";
      const helperText = queryShadow(
        formGroup,
        '[part="helper-text"]',
      ) as HTMLDivElement;
      expect(helperText.textContent).toContain("Enter your username");
    });

    it("should display error text when error-text attribute is set and error is true", () => {
      formGroup.errorText = "This field is required";
      formGroup.error = true;
      const errorText = queryShadow(
        formGroup,
        '[part="error-text"]',
      ) as HTMLDivElement;
      expect(errorText.textContent).toContain("This field is required");
    });

    it("should hide helper text when error is true", () => {
      formGroup.helperText = "Helper text";
      formGroup.errorText = "Error text";
      formGroup.error = true;

      const helperText = queryShadow(
        formGroup,
        '[part="helper-text"]',
      ) as HTMLDivElement;
      const errorText = queryShadow(
        formGroup,
        '[part="error-text"]',
      ) as HTMLDivElement;

      expect(helperText.style.display).toBe("none");
      expect(errorText.style.display).toBe("block");
    });
  });

  describe("Accessibility", () => {
    let formGroup: HaFormGroup;

    beforeEach(() => {
      formGroup = document.createElement("ha-form-group") as HaFormGroup;
      document.body.appendChild(formGroup);
    });

    afterEach(() => {
      document.body.removeChild(formGroup);
    });

    it("should use label element for accessibility", () => {
      const label = queryShadow(formGroup, "label");
      expect(label).toBeTruthy();
    });
  });
});
