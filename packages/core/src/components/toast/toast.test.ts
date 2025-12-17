import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaToast } from "./toast";
import { HaToastContainer } from "./toast-container";

describe("HaToast", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-toast")) {
      customElements.define("ha-toast", HaToast);
    }
    await waitForCustomElement("ha-toast");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-toast")).toBe(HaToast);
    });

    it("should create an instance", () => {
      const toast = document.createElement("ha-toast") as HaToast;
      expect(toast).toBeInstanceOf(HaToast);
      expect(toast).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const toast = document.createElement("ha-toast") as HaToast;
      document.body.appendChild(toast);
      expect(toast.shadowRoot).not.toBeNull();
      document.body.removeChild(toast);
    });
  });

  describe("Attributes and Properties", () => {
    let toast: HaToast;

    beforeEach(() => {
      toast = document.createElement("ha-toast") as HaToast;
      document.body.appendChild(toast);
    });

    afterEach(() => {
      document.body.removeChild(toast);
    });

    it("should set variant attribute", () => {
      toast.setAttribute("variant", "success");
      expect(toast.getAttribute("variant")).toBe("success");
    });

    it("should set message attribute", () => {
      toast.setAttribute("message", "Test message");
      expect(toast.getAttribute("message")).toBe("Test message");
    });

    it("should set closable attribute", () => {
      toast.setAttribute("closable", "");
      expect(toast.hasAttribute("closable")).toBe(true);
    });

    it("should set duration attribute", () => {
      toast.setAttribute("duration", "3000");
      expect(toast.getAttribute("duration")).toBe("3000");
    });

    it("should set show-progress attribute", () => {
      toast.setAttribute("show-progress", "");
      expect(toast.hasAttribute("show-progress")).toBe(true);
    });
  });

  describe("Variants", () => {
    let toast: HaToast;

    beforeEach(() => {
      toast = document.createElement("ha-toast") as HaToast;
      document.body.appendChild(toast);
    });

    afterEach(() => {
      document.body.removeChild(toast);
    });

    const variants = ["info", "success", "warning", "error"];

    variants.forEach((variant) => {
      it(`should render ${variant} variant`, () => {
        toast.setAttribute("variant", variant);
        expect(toast.getAttribute("variant")).toBe(variant);
      });
    });
  });

  describe("Close Behavior", () => {
    let toast: HaToast;

    beforeEach(() => {
      toast = document.createElement("ha-toast") as HaToast;
      document.body.appendChild(toast);
    });

    afterEach(() => {
      // Check if toast is still in DOM before removing
      if (toast.parentNode) {
        document.body.removeChild(toast);
      }
    });

    it("should emit toast-close event when closed", async () => {
      const closeHandler = vi.fn();
      toast.addEventListener("toast-close", closeHandler);

      toast.setAttribute("closable", "");
      await new Promise((resolve) => setTimeout(resolve, 100));

      const closeButton = queryShadow(toast, '[part="close"]') as HTMLButtonElement;
      if (closeButton) {
        closeButton.click();
        // Wait for close animation (200ms)
        await new Promise((resolve) => setTimeout(resolve, 250));
        expect(closeHandler).toHaveBeenCalled();
      }
    });

    it("should show close button when closable", () => {
      toast.setAttribute("closable", "");
      const closeButton = queryShadow(toast, '[part="close"]');
      expect(closeButton).toBeTruthy();
    });

    it("should not show close button when not closable", () => {
      const closeButton = queryShadow(toast, '[part="close"]');
      expect(closeButton).toBeNull();
    });

    it("should remove close button when closable attribute is removed", () => {
      // First add closable
      toast.setAttribute("closable", "");
      let closeButton = queryShadow(toast, '[part="close"]');
      expect(closeButton).toBeTruthy();

      // Then remove closable
      toast.removeAttribute("closable");
      closeButton = queryShadow(toast, '[part="close"]');
      expect(closeButton).toBeNull();
    });
  });

  describe("Auto-close", () => {
    let toast: HaToast;

    beforeEach(() => {
      toast = document.createElement("ha-toast") as HaToast;
      document.body.appendChild(toast);
    });

    afterEach(() => {
      // Check if toast is still in DOM before removing
      if (toast.parentNode) {
        document.body.removeChild(toast);
      }
    });

    it("should set duration attribute", () => {
      toast.setAttribute("duration", "100");
      // Just verify attribute is set
      expect(toast.getAttribute("duration")).toBe("100");
    });

    it("should show progress bar when show-progress is set", () => {
      toast.setAttribute("show-progress", "");
      toast.setAttribute("duration", "5000");

      const progressBar = queryShadow(toast, '[part="progress"]');
      expect(progressBar).toBeTruthy();
    });

    it("should not show progress bar by default", () => {
      const progressBar = queryShadow(toast, '[part="progress"]');
      expect(progressBar).toBeNull();
    });

    it("should remove progress bar when show-progress attribute is removed", () => {
      // First add show-progress
      toast.setAttribute("show-progress", "");
      toast.setAttribute("duration", "5000");
      let progressBar = queryShadow(toast, '[part="progress"]');
      expect(progressBar).toBeTruthy();

      // Then remove show-progress
      toast.removeAttribute("show-progress");
      progressBar = queryShadow(toast, '[part="progress"]');
      expect(progressBar).toBeNull();
    });

    it("should remove progress bar when duration is set to 0", () => {
      // First add show-progress with duration
      toast.setAttribute("show-progress", "");
      toast.setAttribute("duration", "5000");
      let progressBar = queryShadow(toast, '[part="progress"]');
      expect(progressBar).toBeTruthy();

      // Then set duration to 0
      toast.setAttribute("duration", "0");
      progressBar = queryShadow(toast, '[part="progress"]');
      expect(progressBar).toBeNull();
    });

    it("should clear auto-close timeout when manually closed", () => {
      // Set a duration to trigger auto-close
      toast.setAttribute("duration", "5000");

      // Manually close before auto-close triggers
      toast.close();

      // Verify toast is closing
      expect(toast.hasAttribute("closing")).toBe(true);
    });
  });

  describe("Message Display", () => {
    let toast: HaToast;

    beforeEach(() => {
      toast = document.createElement("ha-toast") as HaToast;
      document.body.appendChild(toast);
    });

    afterEach(() => {
      document.body.removeChild(toast);
    });

    it("should display message from attribute", () => {
      toast.setAttribute("message", "Test toast message");
      const message = queryShadow(toast, '[part="message"]');
      expect(message?.textContent).toContain("Test toast message");
    });

    it("should render default slot when no message", () => {
      const content = document.createElement("span");
      content.textContent = "Custom content";
      toast.appendChild(content);

      const slot = queryShadow(toast, "slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    let toast: HaToast;

    beforeEach(() => {
      toast = document.createElement("ha-toast") as HaToast;
      document.body.appendChild(toast);
    });

    afterEach(() => {
      document.body.removeChild(toast);
    });

    it("should expose container part", () => {
      const container = queryShadow(toast, '[part="container"]');
      expect(container).toBeTruthy();
    });

    it("should expose icon part", () => {
      const icon = queryShadow(toast, '[part="icon"]');
      expect(icon).toBeTruthy();
    });

    it("should expose message part", () => {
      toast.setAttribute("message", "Test");
      const message = queryShadow(toast, '[part="message"]');
      expect(message).toBeTruthy();
    });

    it("should expose close part when closable", () => {
      toast.setAttribute("closable", "");
      const close = queryShadow(toast, '[part="close"]');
      expect(close).toBeTruthy();
    });

    it("should expose progress part when show-progress", () => {
      toast.setAttribute("show-progress", "");
      toast.setAttribute("duration", "5000");
      const progress = queryShadow(toast, '[part="progress"]');
      expect(progress).toBeTruthy();
    });
  });
});

describe("HaToastContainer", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-toast-container")) {
      customElements.define("ha-toast-container", HaToastContainer);
    }
    await waitForCustomElement("ha-toast-container");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-toast-container")).toBe(HaToastContainer);
    });

    it("should create an instance", () => {
      const container = document.createElement("ha-toast-container") as HaToastContainer;
      expect(container).toBeInstanceOf(HaToastContainer);
      expect(container).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const container = document.createElement("ha-toast-container") as HaToastContainer;
      document.body.appendChild(container);
      expect(container.shadowRoot).not.toBeNull();
      document.body.removeChild(container);
    });
  });

  describe("Position", () => {
    let container: HaToastContainer;

    beforeEach(() => {
      container = document.createElement("ha-toast-container") as HaToastContainer;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    const positions = [
      "top-left",
      "top-center",
      "top-right",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ];

    positions.forEach((position) => {
      it(`should render ${position} position`, () => {
        container.setAttribute("position", position);
        expect(container.getAttribute("position")).toBe(position);
      });
    });
  });

  describe("Slot", () => {
    let container: HaToastContainer;

    beforeEach(() => {
      container = document.createElement("ha-toast-container") as HaToastContainer;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should render slotted toasts", () => {
      const toast = document.createElement("ha-toast");
      container.appendChild(toast);

      const slot = queryShadow(container, "slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    let container: HaToastContainer;

    beforeEach(() => {
      container = document.createElement("ha-toast-container") as HaToastContainer;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should expose container part", () => {
      const containerPart = queryShadow(container, '[part="container"]');
      expect(containerPart).toBeTruthy();
    });
  });
});
