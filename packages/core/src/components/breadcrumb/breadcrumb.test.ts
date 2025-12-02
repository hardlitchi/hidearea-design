import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HaBreadcrumb } from "./breadcrumb";
import { HaBreadcrumbItem } from "./breadcrumb-item";

describe("HaBreadcrumb", () => {
  let breadcrumb: HaBreadcrumb;

  beforeEach(() => {
    breadcrumb = document.createElement("ha-breadcrumb") as HaBreadcrumb;
    document.body.appendChild(breadcrumb);
  });

  afterEach(() => {
    document.body.removeChild(breadcrumb);
  });

  describe("Component Registration", () => {
    it("should be defined", () => {
      expect(customElements.get("ha-breadcrumb")).toBeDefined();
    });

    it("should create an instance", () => {
      expect(breadcrumb).toBeInstanceOf(HaBreadcrumb);
    });

    it("should have shadow root", () => {
      expect(breadcrumb.shadowRoot).toBeTruthy();
    });
  });

  describe("Default Attributes", () => {
    it("should have default separator", () => {
      expect(breadcrumb.separator).toBe("slash");
    });

    it("should have default size", () => {
      expect(breadcrumb.size).toBe("md");
    });
  });

  describe("Separator", () => {
    it("should support slash separator", () => {
      breadcrumb.separator = "slash";
      expect(breadcrumb.separator).toBe("slash");
    });

    it("should support chevron separator", () => {
      breadcrumb.separator = "chevron";
      expect(breadcrumb.separator).toBe("chevron");
    });

    it("should support arrow separator", () => {
      breadcrumb.separator = "arrow";
      expect(breadcrumb.separator).toBe("arrow");
    });

    it("should support dot separator", () => {
      breadcrumb.separator = "dot";
      expect(breadcrumb.separator).toBe("dot");
    });
  });

  describe("Size", () => {
    it("should support sm size", () => {
      breadcrumb.size = "sm";
      expect(breadcrumb.size).toBe("sm");
    });

    it("should support md size", () => {
      breadcrumb.size = "md";
      expect(breadcrumb.size).toBe("md");
    });

    it("should support lg size", () => {
      breadcrumb.size = "lg";
      expect(breadcrumb.size).toBe("lg");
    });
  });

  describe("ARIA", () => {
    it("should have aria-label breadcrumb", () => {
      const nav = breadcrumb.shadowRoot?.querySelector("nav");
      expect(nav?.getAttribute("aria-label")).toBe("breadcrumb");
    });
  });

  describe("CSS Parts", () => {
    it("should expose nav part", () => {
      const nav = breadcrumb.shadowRoot?.querySelector('[part="nav"]');
      expect(nav).toBeTruthy();
    });

    it("should expose list part", () => {
      const list = breadcrumb.shadowRoot?.querySelector('[part="list"]');
      expect(list).toBeTruthy();
    });
  });
});

describe("HaBreadcrumbItem", () => {
  let item: HaBreadcrumbItem;

  beforeEach(() => {
    item = document.createElement("ha-breadcrumb-item") as HaBreadcrumbItem;
    document.body.appendChild(item);
  });

  afterEach(() => {
    document.body.removeChild(item);
  });

  describe("Component Registration", () => {
    it("should be defined", () => {
      expect(customElements.get("ha-breadcrumb-item")).toBeDefined();
    });

    it("should create an instance", () => {
      expect(item).toBeInstanceOf(HaBreadcrumbItem);
    });
  });

  describe("Href", () => {
    it("should set href attribute", () => {
      item.href = "/test";
      expect(item.href).toBe("/test");
    });
  });

  describe("Current", () => {
    it("should not be current by default", () => {
      expect(item.current).toBe(false);
    });

    it("should set current state", () => {
      item.current = true;
      expect(item.current).toBe(true);
    });
  });

  describe("Separator", () => {
    it("should have default separator", () => {
      expect(item.separator).toBe("slash");
    });

    it("should set separator", () => {
      item.separator = "chevron";
      expect(item.separator).toBe("chevron");
    });
  });
});
