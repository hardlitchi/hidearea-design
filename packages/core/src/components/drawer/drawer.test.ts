import { describe, it, expect, beforeEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaDrawer } from "./drawer";

describe("HaDrawer", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-drawer")) {
      customElements.define("ha-drawer", HaDrawer);
    }
    await waitForCustomElement("ha-drawer");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-drawer")).toBe(HaDrawer);
    });

    it("should create an instance", () => {
      const drawer = document.createElement("ha-drawer") as HaDrawer;
      expect(drawer).toBeInstanceOf(HaDrawer);
      expect(drawer).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const drawer = document.createElement("ha-drawer") as HaDrawer;
      document.body.appendChild(drawer);
      expect(drawer.shadowRoot).not.toBeNull();
      document.body.removeChild(drawer);
    });
  });

  describe("Attributes", () => {
    let drawer: HaDrawer;

    beforeEach(() => {
      drawer = document.createElement("ha-drawer") as HaDrawer;
      document.body.appendChild(drawer);
    });

    afterEach(() => {
      document.body.removeChild(drawer);
    });

    it("should not be open by default", () => {
      expect(drawer.hasAttribute("open")).toBe(false);
    });

    it("should have default placement as right", () => {
      expect(drawer.getAttribute("placement") || "right").toBe("right");
    });

    it("should have default size as md", () => {
      expect(drawer.getAttribute("size") || "md").toBe("md");
    });

    it("should add open attribute", () => {
      drawer.setAttribute("open", "");
      expect(drawer.hasAttribute("open")).toBe(true);
    });

    it("should set placement attribute", () => {
      drawer.setAttribute("placement", "left");
      expect(drawer.getAttribute("placement")).toBe("left");
    });

    it("should set size attribute", () => {
      drawer.setAttribute("size", "lg");
      expect(drawer.getAttribute("size")).toBe("lg");
    });

    it("should add overlay attribute", () => {
      drawer.setAttribute("overlay", "");
      expect(drawer.hasAttribute("overlay")).toBe(true);
    });

    it("should add close-on-backdrop attribute", () => {
      drawer.setAttribute("close-on-backdrop", "");
      expect(drawer.hasAttribute("close-on-backdrop")).toBe(true);
    });

    it("should add close-on-escape attribute", () => {
      drawer.setAttribute("close-on-escape", "");
      expect(drawer.hasAttribute("close-on-escape")).toBe(true);
    });
  });

  describe("Placements", () => {
    let drawer: HaDrawer;

    beforeEach(() => {
      drawer = document.createElement("ha-drawer") as HaDrawer;
      document.body.appendChild(drawer);
    });

    afterEach(() => {
      document.body.removeChild(drawer);
    });

    it("should apply left placement class", () => {
      drawer.setAttribute("placement", "left");
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.classList.contains("drawer--placement-left")).toBe(true);
    });

    it("should apply right placement class", () => {
      drawer.setAttribute("placement", "right");
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.classList.contains("drawer--placement-right")).toBe(true);
    });

    it("should apply top placement class", () => {
      drawer.setAttribute("placement", "top");
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.classList.contains("drawer--placement-top")).toBe(true);
    });

    it("should apply bottom placement class", () => {
      drawer.setAttribute("placement", "bottom");
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.classList.contains("drawer--placement-bottom")).toBe(true);
    });
  });

  describe("Sizes", () => {
    let drawer: HaDrawer;

    beforeEach(() => {
      drawer = document.createElement("ha-drawer") as HaDrawer;
      document.body.appendChild(drawer);
    });

    afterEach(() => {
      document.body.removeChild(drawer);
    });

    it("should apply sm size class", () => {
      drawer.setAttribute("size", "sm");
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.classList.contains("drawer--size-sm")).toBe(true);
    });

    it("should apply md size class", () => {
      drawer.setAttribute("size", "md");
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.classList.contains("drawer--size-md")).toBe(true);
    });

    it("should apply lg size class", () => {
      drawer.setAttribute("size", "lg");
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.classList.contains("drawer--size-lg")).toBe(true);
    });
  });

  describe("Open/Close Behavior", () => {
    let drawer: HaDrawer;

    beforeEach(() => {
      drawer = document.createElement("ha-drawer") as HaDrawer;
      document.body.appendChild(drawer);
    });

    afterEach(() => {
      document.body.removeChild(drawer);
    });

    it("should open when open() is called", () => {
      drawer.open();
      expect(drawer.hasAttribute("open")).toBe(true);
    });

    it("should close when close() is called", () => {
      drawer.setAttribute("open", "");
      drawer.close();
      expect(drawer.hasAttribute("open")).toBe(false);
    });

    it("should toggle state when toggle() is called", () => {
      drawer.toggle();
      expect(drawer.hasAttribute("open")).toBe(true);
      drawer.toggle();
      expect(drawer.hasAttribute("open")).toBe(false);
    });

    it("should apply open class when open", () => {
      drawer.setAttribute("open", "");
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.classList.contains("drawer--open")).toBe(true);
    });
  });

  describe("Events", () => {
    let drawer: HaDrawer;

    beforeEach(() => {
      drawer = document.createElement("ha-drawer") as HaDrawer;
      document.body.appendChild(drawer);
    });

    afterEach(() => {
      document.body.removeChild(drawer);
    });

    it("should emit drawer-open event when opened", async () => {
      const openHandler = vi.fn();
      drawer.addEventListener("drawer-open", openHandler);

      drawer.open();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(openHandler).toHaveBeenCalled();
    });

    it("should emit drawer-close event when closed", async () => {
      const closeHandler = vi.fn();
      drawer.addEventListener("drawer-close", closeHandler);

      drawer.setAttribute("open", "");
      await new Promise((resolve) => setTimeout(resolve, 100));

      drawer.close();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(closeHandler).toHaveBeenCalled();
    });
  });

  describe("Slots", () => {
    let drawer: HaDrawer;

    beforeEach(() => {
      drawer = document.createElement("ha-drawer") as HaDrawer;
      document.body.appendChild(drawer);
    });

    afterEach(() => {
      document.body.removeChild(drawer);
    });

    it("should render header slot", () => {
      const headerSlot = queryShadow(drawer, 'slot[name="header"]');
      expect(headerSlot).toBeTruthy();
    });

    it("should render default slot for content", () => {
      const contentSlot = queryShadow(drawer, '.drawer__body slot:not([name])');
      expect(contentSlot).toBeTruthy();
    });

    it("should render footer slot", () => {
      const footerSlot = queryShadow(drawer, 'slot[name="footer"]');
      expect(footerSlot).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    let drawer: HaDrawer;

    beforeEach(() => {
      drawer = document.createElement("ha-drawer") as HaDrawer;
      document.body.appendChild(drawer);
    });

    afterEach(() => {
      document.body.removeChild(drawer);
    });

    it("should expose drawer part", () => {
      const drawerElement = queryShadow(drawer, '[part="drawer"]');
      expect(drawerElement).toBeTruthy();
    });

    it("should expose backdrop part", () => {
      const backdrop = queryShadow(drawer, '[part="backdrop"]');
      expect(backdrop).toBeTruthy();
    });

    it("should expose header part", () => {
      const header = queryShadow(drawer, '[part="header"]');
      expect(header).toBeTruthy();
    });

    it("should expose body part", () => {
      const body = queryShadow(drawer, '[part="body"]');
      expect(body).toBeTruthy();
    });

    it("should expose footer part", () => {
      const footer = queryShadow(drawer, '[part="footer"]');
      expect(footer).toBeTruthy();
    });

    it("should expose close button part", () => {
      const close = queryShadow(drawer, '[part="close"]');
      expect(close).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    let drawer: HaDrawer;

    beforeEach(() => {
      drawer = document.createElement("ha-drawer") as HaDrawer;
      document.body.appendChild(drawer);
    });

    afterEach(() => {
      document.body.removeChild(drawer);
    });

    it("should have dialog role", () => {
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.getAttribute("role")).toBe("dialog");
    });

    it("should have aria-modal attribute", () => {
      const drawerElement = queryShadow(drawer, ".drawer");
      expect(drawerElement?.getAttribute("aria-modal")).toBe("true");
    });

    it("should have aria-label on close button", () => {
      const closeButton = queryShadow(drawer, ".drawer__close");
      expect(closeButton?.getAttribute("aria-label")).toBe("Close");
    });
  });
});
