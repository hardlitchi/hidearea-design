import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaTextarea } from "./textarea";

describe("HaTextarea", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-textarea")) {
      customElements.define("ha-textarea", HaTextarea);
    }
    await waitForCustomElement("ha-textarea");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-textarea")).toBe(HaTextarea);
    });

    it("should create an instance", () => {
      const textarea = document.createElement("ha-textarea") as HaTextarea;
      expect(textarea).toBeInstanceOf(HaTextarea);
      expect(textarea).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
      expect(textarea.shadowRoot).not.toBeNull();
      document.body.removeChild(textarea);
    });
  });

  describe("Default Values", () => {
    let textarea: HaTextarea;

    beforeEach(() => {
      textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
    });

    afterEach(() => {
      document.body.removeChild(textarea);
    });

    it("should have default variant as default", () => {
      expect(textarea.variant).toBe("default");
    });

    it("should have default size as md", () => {
      expect(textarea.size).toBe("md");
    });

    it("should have default resize as vertical", () => {
      expect(textarea.resize).toBe("vertical");
    });

    it("should not be disabled by default", () => {
      expect(textarea.disabled).toBe(false);
    });

    it("should not be readonly by default", () => {
      expect(textarea.readonly).toBe(false);
    });

    it("should have empty value by default", () => {
      expect(textarea.value).toBe("");
    });
  });

  describe("Attributes and Properties", () => {
    let textarea: HaTextarea;

    beforeEach(() => {
      textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
    });

    afterEach(() => {
      document.body.removeChild(textarea);
    });

    it("should update variant property", () => {
      textarea.variant = "filled";
      expect(textarea.variant).toBe("filled");
      expect(textarea.getAttribute("variant")).toBe("filled");
    });

    it("should update size property", () => {
      textarea.size = "lg";
      expect(textarea.size).toBe("lg");
      expect(textarea.getAttribute("size")).toBe("lg");
    });

    it("should update value property", () => {
      textarea.value = "Test value";
      expect(textarea.value).toBe("Test value");
      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      expect(internalTextarea.value).toBe("Test value");
    });

    it("should update placeholder property", () => {
      textarea.placeholder = "Enter text";
      expect(textarea.placeholder).toBe("Enter text");
      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      expect(internalTextarea.placeholder).toBe("Enter text");
    });

    it("should update disabled property", () => {
      textarea.disabled = true;
      expect(textarea.disabled).toBe(true);
      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      expect(internalTextarea.disabled).toBe(true);
    });

    it("should update readonly property", () => {
      textarea.readonly = true;
      expect(textarea.readonly).toBe(true);
      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      expect(internalTextarea.readOnly).toBe(true);
    });

    it("should update required property", () => {
      textarea.required = true;
      expect(textarea.required).toBe(true);
      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      expect(internalTextarea.required).toBe(true);
    });

    it("should update error property", () => {
      textarea.error = true;
      expect(textarea.error).toBe(true);
      expect(textarea.hasAttribute("error")).toBe(true);
    });

    it("should update fullWidth property", () => {
      textarea.fullWidth = true;
      expect(textarea.fullWidth).toBe(true);
      expect(textarea.hasAttribute("full-width")).toBe(true);
    });

    it("should update resize property", () => {
      textarea.resize = "both";
      expect(textarea.resize).toBe("both");
      expect(textarea.getAttribute("resize")).toBe("both");
    });

    it("should update name property", () => {
      textarea.name = "test-name";
      expect(textarea.name).toBe("test-name");
      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      expect(internalTextarea.name).toBe("test-name");
    });

    it("should remove readonly attribute when set to false", () => {
      textarea.readonly = true;
      expect(textarea.hasAttribute("readonly")).toBe(true);
      textarea.readonly = false;
      expect(textarea.hasAttribute("readonly")).toBe(false);
    });

    it("should remove required attribute when set to false", () => {
      textarea.required = true;
      expect(textarea.hasAttribute("required")).toBe(true);
      textarea.required = false;
      expect(textarea.hasAttribute("required")).toBe(false);
    });

    it("should remove error attribute when set to false", () => {
      textarea.error = true;
      expect(textarea.hasAttribute("error")).toBe(true);
      textarea.error = false;
      expect(textarea.hasAttribute("error")).toBe(false);
    });

    it("should remove fullWidth attribute when set to false", () => {
      textarea.fullWidth = true;
      expect(textarea.hasAttribute("full-width")).toBe(true);
      textarea.fullWidth = false;
      expect(textarea.hasAttribute("full-width")).toBe(false);
    });

    it("should remove name attribute when set to null", () => {
      textarea.name = "test-name";
      expect(textarea.hasAttribute("name")).toBe(true);
      textarea.name = null;
      expect(textarea.hasAttribute("name")).toBe(false);
    });

    it("should remove disabled attribute when set to false", () => {
      textarea.disabled = true;
      expect(textarea.hasAttribute("disabled")).toBe(true);
      textarea.disabled = false;
      expect(textarea.hasAttribute("disabled")).toBe(false);
    });
  });

  describe("Events", () => {
    let textarea: HaTextarea;

    beforeEach(() => {
      textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
    });

    afterEach(() => {
      document.body.removeChild(textarea);
    });

    it("should emit input event when value changes", async () => {
      const inputSpy = vi.fn();
      textarea.addEventListener("input", inputSpy);

      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      internalTextarea.value = "New value";
      internalTextarea.dispatchEvent(new Event("input", { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(inputSpy).toHaveBeenCalled();
    });

    it("should emit change event", async () => {
      const changeSpy = vi.fn();
      textarea.addEventListener("change", changeSpy);

      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      internalTextarea.value = "New value";
      internalTextarea.dispatchEvent(new Event("change", { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(changeSpy).toHaveBeenCalled();
    });

    it("should emit focus event", async () => {
      const focusSpy = vi.fn();
      textarea.addEventListener("focus", focusSpy);

      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      internalTextarea.dispatchEvent(new Event("focus", { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(focusSpy).toHaveBeenCalled();
    });

    it("should emit blur event", async () => {
      const blurSpy = vi.fn();
      textarea.addEventListener("blur", blurSpy);

      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      internalTextarea.dispatchEvent(new Event("blur", { bubbles: true }));

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(blurSpy).toHaveBeenCalled();
    });
  });

  describe("Validation API", () => {
    let textarea: HaTextarea;

    beforeEach(() => {
      textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
    });

    afterEach(() => {
      document.body.removeChild(textarea);
    });

    it("should support checkValidity()", () => {
      expect(typeof textarea.checkValidity).toBe("function");
      expect(textarea.checkValidity()).toBe(true);
    });

    it("should support reportValidity()", () => {
      expect(typeof textarea.reportValidity).toBe("function");
      expect(textarea.reportValidity()).toBe(true);
    });

    it("should support setCustomValidity()", () => {
      expect(typeof textarea.setCustomValidity).toBe("function");
      textarea.setCustomValidity("Custom error");
      expect(textarea.checkValidity()).toBe(false);
    });
  });

  describe("Selection API", () => {
    let textarea: HaTextarea;

    beforeEach(() => {
      textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
    });

    afterEach(() => {
      document.body.removeChild(textarea);
    });

    it("should support select()", () => {
      expect(typeof textarea.select).toBe("function");
      textarea.value = "Test value";
      textarea.select();
      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      expect(internalTextarea.selectionStart).toBe(0);
    });

    it("should support setSelectionRange()", () => {
      expect(typeof textarea.setSelectionRange).toBe("function");
      textarea.value = "Test value";
      textarea.setSelectionRange(0, 4);
      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      expect(internalTextarea.selectionStart).toBe(0);
      expect(internalTextarea.selectionEnd).toBe(4);
    });
  });

  describe("Focus Management", () => {
    let textarea: HaTextarea;

    beforeEach(() => {
      textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
    });

    afterEach(() => {
      document.body.removeChild(textarea);
    });

    it("should support focus()", () => {
      expect(typeof textarea.focus).toBe("function");
      textarea.focus();
      expect(document.activeElement).toBe(textarea);
    });

    it("should support blur()", () => {
      expect(typeof textarea.blur).toBe("function");
      textarea.focus();
      textarea.blur();
      expect(document.activeElement).not.toBe(textarea);
    });
  });

  describe("Accessibility", () => {
    let textarea: HaTextarea;

    beforeEach(() => {
      textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
    });

    afterEach(() => {
      document.body.removeChild(textarea);
    });

    it("should set ARIA attributes on internal textarea", () => {
      textarea.disabled = true;
      textarea.readonly = true;
      textarea.required = true;
      textarea.error = true;

      const internalTextarea = queryShadow(
        textarea,
        "textarea",
      ) as HTMLTextAreaElement;
      expect(internalTextarea.getAttribute("aria-disabled")).toBe("true");
      expect(internalTextarea.getAttribute("aria-readonly")).toBe("true");
      expect(internalTextarea.getAttribute("aria-required")).toBe("true");
      expect(internalTextarea.getAttribute("aria-invalid")).toBe("true");
    });
  });

  describe("Variants", () => {
    let textarea: HaTextarea;

    beforeEach(() => {
      textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
    });

    afterEach(() => {
      document.body.removeChild(textarea);
    });

    it("should support default variant", () => {
      textarea.variant = "default";
      expect(textarea.getAttribute("variant")).toBe("default");
    });

    it("should support filled variant", () => {
      textarea.variant = "filled";
      expect(textarea.getAttribute("variant")).toBe("filled");
    });

    it("should support outlined variant", () => {
      textarea.variant = "outlined";
      expect(textarea.getAttribute("variant")).toBe("outlined");
    });
  });

  describe("Sizes", () => {
    let textarea: HaTextarea;

    beforeEach(() => {
      textarea = document.createElement("ha-textarea") as HaTextarea;
      document.body.appendChild(textarea);
    });

    afterEach(() => {
      document.body.removeChild(textarea);
    });

    it("should support small size", () => {
      textarea.size = "sm";
      expect(textarea.getAttribute("size")).toBe("sm");
    });

    it("should support medium size", () => {
      textarea.size = "md";
      expect(textarea.getAttribute("size")).toBe("md");
    });

    it("should support large size", () => {
      textarea.size = "lg";
      expect(textarea.getAttribute("size")).toBe("lg");
    });
  });
});
