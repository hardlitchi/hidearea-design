import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaContainer } from "./container";

describe("HaContainer", () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get("ha-container")) {
      customElements.define("ha-container", HaContainer);
    }
    await waitForCustomElement("ha-container");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-container")).toBe(HaContainer);
    });

    it("should create an instance", () => {
      const container = document.createElement("ha-container") as HaContainer;
      expect(container).toBeInstanceOf(HaContainer);
      expect(container).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const container = document.createElement("ha-container") as HaContainer;
      document.body.appendChild(container);
      expect(container.shadowRoot).not.toBeNull();
      document.body.removeChild(container);
    });
  });

  describe("Attributes and Properties", () => {
    let container: HaContainer;

    beforeEach(() => {
      container = document.createElement("ha-container") as HaContainer;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should have default max-width as lg", () => {
      expect(container.maxWidth).toBe("lg");
    });

    it("should have default padding as md", () => {
      expect(container.padding).toBe("md");
    });

    it("should update maxWidth property", () => {
      container.maxWidth = "xl";
      expect(container.maxWidth).toBe("xl");
      expect(container.getAttribute("max-width")).toBe("xl");
    });

    it("should update maxWidth attribute", () => {
      container.setAttribute("max-width", "sm");
      expect(container.maxWidth).toBe("sm");
    });

    it("should update padding property", () => {
      container.padding = "lg";
      expect(container.padding).toBe("lg");
      expect(container.getAttribute("padding")).toBe("lg");
    });

    it("should update padding attribute", () => {
      container.setAttribute("padding", "sm");
      expect(container.padding).toBe("sm");
    });

    it("should update centered property", () => {
      container.centered = true;
      expect(container.centered).toBe(true);
      expect(container.hasAttribute("centered")).toBe(true);
    });

    it("should update centered attribute", () => {
      container.setAttribute("centered", "");
      expect(container.centered).toBe(true);
    });

    it("should remove centered attribute when set to false", () => {
      container.centered = true;
      container.centered = false;
      expect(container.centered).toBe(false);
      expect(container.hasAttribute("centered")).toBe(false);
    });
  });

  describe("Max Width Variants", () => {
    let container: HaContainer;

    beforeEach(() => {
      container = document.createElement("ha-container") as HaContainer;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should support sm max-width", () => {
      container.maxWidth = "sm";
      expect(container.getAttribute("max-width")).toBe("sm");
    });

    it("should support md max-width", () => {
      container.maxWidth = "md";
      expect(container.getAttribute("max-width")).toBe("md");
    });

    it("should support lg max-width", () => {
      container.maxWidth = "lg";
      expect(container.getAttribute("max-width")).toBe("lg");
    });

    it("should support xl max-width", () => {
      container.maxWidth = "xl";
      expect(container.getAttribute("max-width")).toBe("xl");
    });

    it("should support 2xl max-width", () => {
      container.maxWidth = "2xl";
      expect(container.getAttribute("max-width")).toBe("2xl");
    });

    it("should support full max-width", () => {
      container.maxWidth = "full";
      expect(container.getAttribute("max-width")).toBe("full");
    });
  });

  describe("Padding Variants", () => {
    let container: HaContainer;

    beforeEach(() => {
      container = document.createElement("ha-container") as HaContainer;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should support none padding", () => {
      container.padding = "none";
      expect(container.getAttribute("padding")).toBe("none");
    });

    it("should support sm padding", () => {
      container.padding = "sm";
      expect(container.getAttribute("padding")).toBe("sm");
    });

    it("should support md padding", () => {
      container.padding = "md";
      expect(container.getAttribute("padding")).toBe("md");
    });

    it("should support lg padding", () => {
      container.padding = "lg";
      expect(container.getAttribute("padding")).toBe("lg");
    });
  });

  describe("Shadow DOM Structure", () => {
    let container: HaContainer;

    beforeEach(() => {
      container = document.createElement("ha-container") as HaContainer;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should have a container div with part attribute", () => {
      const containerDiv = queryShadow(
        container,
        '[part="container"]',
      ) as HTMLDivElement;
      expect(containerDiv).toBeTruthy();
      expect(containerDiv.tagName).toBe("DIV");
    });

    it("should have a slot element", () => {
      const slot = queryShadow(container, "slot");
      expect(slot).toBeTruthy();
    });

    it("should render slotted content", () => {
      const content = document.createElement("p");
      content.textContent = "Test content";
      container.appendChild(content);

      // Wait for slot assignment
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(container.textContent).toContain("Test content");
          resolve(undefined);
        }, 0);
      });
    });
  });

  describe("Accessibility", () => {
    let container: HaContainer;

    beforeEach(() => {
      container = document.createElement("ha-container") as HaContainer;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should be accessible as a generic container", () => {
      // Container should not have specific ARIA roles
      // It's a layout component
      expect(container.getAttribute("role")).toBeNull();
    });
  });

  describe("Branch Coverage - Default Value Handling", () => {
    it("should not override existing max-width attribute on connection", () => {
      const container = document.createElement("ha-container") as HaContainer;
      container.setAttribute("max-width", "sm");
      document.body.appendChild(container);

      expect(container.getAttribute("max-width")).toBe("sm");

      document.body.removeChild(container);
    });

    it("should not override existing padding attribute on connection", () => {
      const container = document.createElement("ha-container") as HaContainer;
      container.setAttribute("padding", "lg");
      document.body.appendChild(container);

      expect(container.getAttribute("padding")).toBe("lg");

      document.body.removeChild(container);
    });

    it("should return default value when max-width attribute is null", () => {
      const container = document.createElement("ha-container") as HaContainer;
      // Remove the attribute to trigger the || 'lg' branch
      container.removeAttribute("max-width");
      expect(container.maxWidth).toBe("lg");
    });

    it("should return default value when padding attribute is null", () => {
      const container = document.createElement("ha-container") as HaContainer;
      // Remove the attribute to trigger the || 'md' branch
      container.removeAttribute("padding");
      expect(container.padding).toBe("md");
    });

    it("should handle attributeChangedCallback with same old and new values", () => {
      const container = document.createElement("ha-container") as HaContainer;
      document.body.appendChild(container);

      // Set attribute twice to same value
      container.setAttribute("max-width", "xl");
      container.setAttribute("max-width", "xl");

      expect(container.getAttribute("max-width")).toBe("xl");

      document.body.removeChild(container);
    });
  });
});
