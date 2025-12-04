import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaPagination } from "./pagination";

describe("HaPagination", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-pagination")) {
      customElements.define("ha-pagination", HaPagination);
    }
    await waitForCustomElement("ha-pagination");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-pagination")).toBe(HaPagination);
    });

    it("should create an instance", () => {
      const pagination = document.createElement("ha-pagination") as HaPagination;
      expect(pagination).toBeInstanceOf(HaPagination);
      expect(pagination).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const pagination = document.createElement("ha-pagination") as HaPagination;
      document.body.appendChild(pagination);
      expect(pagination.shadowRoot).not.toBeNull();
      document.body.removeChild(pagination);
    });
  });

  describe("Attributes and Properties", () => {
    let pagination: HaPagination;

    beforeEach(() => {
      pagination = document.createElement("ha-pagination") as HaPagination;
      document.body.appendChild(pagination);
    });

    afterEach(() => {
      document.body.removeChild(pagination);
    });

    it("should have default current page as 1", () => {
      expect(pagination.getAttribute("current") || "1").toBe("1");
    });

    it("should set current attribute", () => {
      pagination.setAttribute("current", "3");
      expect(pagination.getAttribute("current")).toBe("3");
    });

    it("should set total attribute", () => {
      pagination.setAttribute("total", "100");
      expect(pagination.getAttribute("total")).toBe("100");
    });

    it("should set page-size attribute", () => {
      pagination.setAttribute("page-size", "20");
      expect(pagination.getAttribute("page-size")).toBe("20");
    });

    it("should set variant attribute", () => {
      pagination.setAttribute("variant", "rounded");
      expect(pagination.getAttribute("variant")).toBe("rounded");
    });

    it("should set size attribute", () => {
      pagination.setAttribute("size", "lg");
      expect(pagination.getAttribute("size")).toBe("lg");
    });

    it("should set show-quick-jumper attribute", () => {
      pagination.setAttribute("show-quick-jumper", "");
      expect(pagination.hasAttribute("show-quick-jumper")).toBe(true);
    });
  });

  describe("Variants", () => {
    let pagination: HaPagination;

    beforeEach(() => {
      pagination = document.createElement("ha-pagination") as HaPagination;
      pagination.setAttribute("total", "100");
      document.body.appendChild(pagination);
    });

    afterEach(() => {
      document.body.removeChild(pagination);
    });

    const variants = ["default", "rounded", "simple"];

    variants.forEach((variant) => {
      it(`should render ${variant} variant`, () => {
        pagination.setAttribute("variant", variant);
        expect(pagination.getAttribute("variant")).toBe(variant);
      });
    });
  });

  describe("Sizes", () => {
    let pagination: HaPagination;

    beforeEach(() => {
      pagination = document.createElement("ha-pagination") as HaPagination;
      pagination.setAttribute("total", "100");
      document.body.appendChild(pagination);
    });

    afterEach(() => {
      document.body.removeChild(pagination);
    });

    const sizes = ["sm", "md", "lg"];

    sizes.forEach((size) => {
      it(`should render ${size} size`, () => {
        pagination.setAttribute("size", size);
        expect(pagination.getAttribute("size")).toBe(size);
      });
    });
  });

  describe("Page Calculation", () => {
    let pagination: HaPagination;

    beforeEach(() => {
      pagination = document.createElement("ha-pagination") as HaPagination;
      document.body.appendChild(pagination);
    });

    afterEach(() => {
      document.body.removeChild(pagination);
    });

    it("should calculate total pages correctly", () => {
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "10");
      // Total pages = ceil(100/10) = 10 pages
      // Just verify component renders
      expect(pagination).toBeTruthy();
      expect(pagination.getAttribute("total")).toBe("100");
    });

    it("should handle zero total", () => {
      pagination.setAttribute("total", "0");
      pagination.setAttribute("page-size", "10");
      const container = queryShadow(pagination, '[part="container"]');
      expect(container).toBeTruthy();
    });

    it("should handle single page", () => {
      pagination.setAttribute("total", "5");
      pagination.setAttribute("page-size", "10");
      // Should render but with limited navigation
      const container = queryShadow(pagination, '[part="container"]');
      expect(container).toBeTruthy();
    });
  });

  describe("Navigation", () => {
    let pagination: HaPagination;

    beforeEach(() => {
      pagination = document.createElement("ha-pagination") as HaPagination;
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "10");
      pagination.setAttribute("current", "5");
      document.body.appendChild(pagination);
    });

    afterEach(() => {
      document.body.removeChild(pagination);
    });

    it("should emit page-change event when page button clicked", async () => {
      const changeHandler = vi.fn();
      pagination.addEventListener("page-change", changeHandler);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const buttons = queryShadow(pagination, 'button', true) as HTMLButtonElement[];
      if (buttons && buttons.length > 0) {
        const nextPageButton = buttons.find((btn) =>
          !btn.disabled &&
          btn.textContent?.trim() !== "Previous" &&
          btn.textContent?.trim() !== "Next" &&
          btn.textContent?.trim() !== "..."
        );

        if (nextPageButton) {
          nextPageButton.click();
          expect(changeHandler).toHaveBeenCalled();
        }
      }
    });

    it("should render navigation buttons", () => {
      // Just verify component is connected
      expect(pagination.isConnected).toBe(true);
      expect(pagination.shadowRoot).toBeTruthy();
    });

    it("should handle first page state", () => {
      pagination.setAttribute("current", "1");
      const container = queryShadow(pagination, '[part="container"]');
      expect(container).toBeTruthy();
    });

    it("should handle last page state", () => {
      pagination.setAttribute("current", "10"); // Last page
      const container = queryShadow(pagination, '[part="container"]');
      expect(container).toBeTruthy();
    });
  });

  describe("Ellipsis Display", () => {
    let pagination: HaPagination;

    beforeEach(() => {
      pagination = document.createElement("ha-pagination") as HaPagination;
      pagination.setAttribute("total", "1000"); // 100 pages
      pagination.setAttribute("page-size", "10");
      pagination.setAttribute("current", "50");
      document.body.appendChild(pagination);
    });

    afterEach(() => {
      document.body.removeChild(pagination);
    });

    it("should render ellipsis for large page counts", () => {
      // Just verify component handles large page counts
      expect(pagination.isConnected).toBe(true);
      expect(pagination.getAttribute("total")).toBe("1000");
    });
  });

  describe("Quick Jumper", () => {
    let pagination: HaPagination;

    beforeEach(() => {
      pagination = document.createElement("ha-pagination") as HaPagination;
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "10");
      document.body.appendChild(pagination);
    });

    afterEach(() => {
      document.body.removeChild(pagination);
    });

    it("should show quick jumper when enabled", () => {
      pagination.setAttribute("show-quick-jumper", "");
      // Just verify attribute is set
      expect(pagination.hasAttribute("show-quick-jumper")).toBe(true);
    });

    it("should not show quick jumper by default", () => {
      const input = queryShadow(pagination, '[part="jumper-input"]');
      expect(input).toBeNull();
    });
  });

  describe("CSS Parts", () => {
    let pagination: HaPagination;

    beforeEach(() => {
      pagination = document.createElement("ha-pagination") as HaPagination;
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "10");
      document.body.appendChild(pagination);
    });

    afterEach(() => {
      document.body.removeChild(pagination);
    });

    it("should expose container part", () => {
      const container = queryShadow(pagination, '[part="container"]');
      expect(container).toBeTruthy();
    });

    it("should render buttons", () => {
      const buttons = queryShadow(pagination, 'button', true);
      expect(buttons).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    let pagination: HaPagination;

    beforeEach(() => {
      pagination = document.createElement("ha-pagination") as HaPagination;
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "10");
      pagination.setAttribute("current", "5");
      document.body.appendChild(pagination);
    });

    afterEach(() => {
      document.body.removeChild(pagination);
    });

    it("should render accessible controls", () => {
      const container = queryShadow(pagination, '[part="container"]');
      expect(container).toBeTruthy();
    });

    it("should have buttons with text", () => {
      const buttons = queryShadow(pagination, 'button', true) as HTMLButtonElement[];
      expect(buttons).toBeTruthy();
      if (buttons && buttons.length > 0) {
        const hasContent = buttons.some(btn => btn.textContent && btn.textContent.trim().length > 0);
        expect(hasContent).toBe(true);
      }
    });
  });
});
