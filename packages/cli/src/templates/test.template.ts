export const testTemplate = (PascalName: string, kebabName: string) => `import { describe, it, expect, beforeEach } from "vitest";
import type { Ha${PascalName} } from "./${kebabName}";
import "./${kebabName}";

describe("Ha${PascalName}", () => {
  let element: Ha${PascalName};

  beforeEach(() => {
    element = document.createElement("ha-${kebabName}") as Ha${PascalName};
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe("Component Registration", () => {
    it("should be defined", () => {
      expect(customElements.get("ha-${kebabName}")).toBeDefined();
    });

    it("should create element with shadow root", () => {
      expect(element.shadowRoot).not.toBeNull();
    });
  });

  describe("Attributes", () => {
    it("should handle variant attribute", () => {
      element.variant = "primary";
      expect(element.getAttribute("variant")).toBe("primary");
      expect(element.variant).toBe("primary");
    });

    it("should handle disabled attribute", () => {
      element.disabled = true;
      expect(element.hasAttribute("disabled")).toBe(true);
      expect(element.disabled).toBe(true);

      element.disabled = false;
      expect(element.hasAttribute("disabled")).toBe(false);
      expect(element.disabled).toBe(false);
    });

    it("should update aria-disabled when disabled changes", () => {
      element.disabled = true;
      const container = element.shadowRoot?.querySelector(".container");
      expect(container?.getAttribute("aria-disabled")).toBe("true");
    });
  });

  describe("Rendering", () => {
    it("should render with default slot", () => {
      element.textContent = "Test content";
      const slot = element.shadowRoot?.querySelector("slot");
      expect(slot).not.toBeNull();
    });

    it("should apply variant class", () => {
      element.variant = "primary";
      const container = element.shadowRoot?.querySelector(".container");
      expect(container?.getAttribute("data-variant")).toBe("primary");
    });

    it("should apply disabled class", () => {
      element.disabled = true;
      const container = element.shadowRoot?.querySelector(".container");
      expect(container?.classList.contains("disabled")).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-disabled attribute", () => {
      element.disabled = false;
      const container = element.shadowRoot?.querySelector(".container");
      expect(container?.getAttribute("aria-disabled")).toBe("false");

      element.disabled = true;
      expect(container?.getAttribute("aria-disabled")).toBe("true");
    });
  });
});
`;
