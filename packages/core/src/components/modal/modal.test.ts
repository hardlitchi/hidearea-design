import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaModal } from "./modal";

describe("HaModal", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-modal")) {
      customElements.define("ha-modal", HaModal);
    }
    await waitForCustomElement("ha-modal");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-modal")).toBe(HaModal);
    });

    it("should create an instance", () => {
      const modal = document.createElement("ha-modal") as HaModal;
      expect(modal).toBeInstanceOf(HaModal);
      expect(modal).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const modal = document.createElement("ha-modal") as HaModal;
      document.body.appendChild(modal);
      expect(modal.shadowRoot).not.toBeNull();
      document.body.removeChild(modal);
    });
  });

  describe("Attributes and Properties", () => {
    let modal: HaModal;

    beforeEach(() => {
      modal = document.createElement("ha-modal") as HaModal;
      document.body.appendChild(modal);
    });

    afterEach(() => {
      document.body.removeChild(modal);
    });

    it("should not be open by default", () => {
      expect(modal.hasAttribute("open")).toBe(false);
    });

    it("should set open attribute", () => {
      modal.setAttribute("open", "");
      expect(modal.hasAttribute("open")).toBe(true);
    });

    it("should set size attribute", () => {
      modal.setAttribute("size", "lg");
      expect(modal.getAttribute("size")).toBe("lg");
    });

    it("should set variant attribute", () => {
      modal.setAttribute("variant", "centered");
      expect(modal.getAttribute("variant")).toBe("centered");
    });

    it("should set closable attribute", () => {
      modal.setAttribute("closable", "");
      expect(modal.hasAttribute("closable")).toBe(true);
    });

    it("should set close-on-backdrop attribute", () => {
      modal.setAttribute("close-on-backdrop", "");
      expect(modal.hasAttribute("close-on-backdrop")).toBe(true);
    });

    it("should set close-on-escape attribute", () => {
      modal.setAttribute("close-on-escape", "");
      expect(modal.hasAttribute("close-on-escape")).toBe(true);
    });
  });

  describe("Variants", () => {
    let modal: HaModal;

    beforeEach(() => {
      modal = document.createElement("ha-modal") as HaModal;
      document.body.appendChild(modal);
    });

    afterEach(() => {
      document.body.removeChild(modal);
    });

    it("should render default variant", () => {
      modal.setAttribute("open", "");
      modal.setAttribute("variant", "default");
      const dialog = queryShadow(modal, ".dialog");
      expect(dialog).toBeTruthy();
    });

    it("should render centered variant", () => {
      modal.setAttribute("open", "");
      modal.setAttribute("variant", "centered");
      expect(modal.getAttribute("variant")).toBe("centered");
    });

    it("should render fullscreen variant", () => {
      modal.setAttribute("open", "");
      modal.setAttribute("variant", "fullscreen");
      expect(modal.getAttribute("variant")).toBe("fullscreen");
    });
  });

  describe("Sizes", () => {
    let modal: HaModal;

    beforeEach(() => {
      modal = document.createElement("ha-modal") as HaModal;
      document.body.appendChild(modal);
    });

    afterEach(() => {
      document.body.removeChild(modal);
    });

    const sizes = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`should render ${size} size`, () => {
        modal.setAttribute("open", "");
        modal.setAttribute("size", size);
        expect(modal.getAttribute("size")).toBe(size);
      });
    });
  });

  describe("Open/Close Behavior", () => {
    let modal: HaModal;

    beforeEach(() => {
      modal = document.createElement("ha-modal") as HaModal;
      document.body.appendChild(modal);
    });

    afterEach(() => {
      document.body.removeChild(modal);
    });

    it("should emit modal-open event when opened", async () => {
      const openHandler = vi.fn();
      modal.addEventListener("modal-open", openHandler);

      modal.setAttribute("open", "");
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(openHandler).toHaveBeenCalled();
    });

    it("should emit modal-close event when closed", async () => {
      modal.setAttribute("open", "");
      await new Promise((resolve) => setTimeout(resolve, 100));

      const closeHandler = vi.fn();
      modal.addEventListener("modal-close", closeHandler);

      modal.removeAttribute("open");
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(closeHandler).toHaveBeenCalled();
    });

    it("should close when close button is clicked", async () => {
      modal.setAttribute("open", "");
      modal.setAttribute("closable", "");
      await new Promise((resolve) => setTimeout(resolve, 100));

      const closeButton = queryShadow(modal, '[part="close"]') as HTMLButtonElement;
      expect(closeButton).toBeTruthy();

      const closeHandler = vi.fn();
      modal.addEventListener("modal-close", closeHandler);

      closeButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(closeHandler).toHaveBeenCalled();
    });
  });

  describe("Keyboard Handling", () => {
    let modal: HaModal;

    beforeEach(() => {
      modal = document.createElement("ha-modal") as HaModal;
      document.body.appendChild(modal);
    });

    afterEach(() => {
      document.body.removeChild(modal);
    });

    it("should close on Escape key when close-on-escape is set", async () => {
      modal.setAttribute("open", "");
      modal.setAttribute("close-on-escape", "");
      await new Promise((resolve) => setTimeout(resolve, 100));

      const closeHandler = vi.fn();
      modal.addEventListener("modal-close", closeHandler);

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(closeHandler).toHaveBeenCalled();
    });

    it("should not close on Escape key when close-on-escape is not set", async () => {
      modal.setAttribute("open", "");
      await new Promise((resolve) => setTimeout(resolve, 100));

      const closeHandler = vi.fn();
      modal.addEventListener("modal-close", closeHandler);

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(closeHandler).not.toHaveBeenCalled();
    });
  });

  describe("Slots", () => {
    let modal: HaModal;

    beforeEach(() => {
      modal = document.createElement("ha-modal") as HaModal;
      modal.setAttribute("open", ""); // Modal must be open to render slots
      document.body.appendChild(modal);
    });

    afterEach(() => {
      document.body.removeChild(modal);
    });

    it("should render header slot", () => {
      const headerContent = document.createElement("div");
      headerContent.setAttribute("slot", "header");
      headerContent.textContent = "Modal Header";
      modal.appendChild(headerContent);

      const headerSlot = queryShadow(modal, 'slot[name="header"]');
      expect(headerSlot).toBeTruthy();
    });

    it("should render default slot for body", () => {
      const bodyContent = document.createElement("p");
      bodyContent.textContent = "Modal Body";
      modal.appendChild(bodyContent);

      const defaultSlot = queryShadow(modal, "slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });

    it("should render footer slot", () => {
      const footerContent = document.createElement("div");
      footerContent.setAttribute("slot", "footer");
      footerContent.textContent = "Modal Footer";
      modal.appendChild(footerContent);

      const footerSlot = queryShadow(modal, 'slot[name="footer"]');
      expect(footerSlot).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    let modal: HaModal;

    beforeEach(() => {
      modal = document.createElement("ha-modal") as HaModal;
      modal.setAttribute("open", "");
      document.body.appendChild(modal);
    });

    afterEach(() => {
      document.body.removeChild(modal);
    });

    it("should expose overlay part", () => {
      const overlay = queryShadow(modal, '[part="overlay"]');
      expect(overlay).toBeTruthy();
    });

    it("should expose dialog part", () => {
      const dialog = queryShadow(modal, '[part="dialog"]');
      expect(dialog).toBeTruthy();
    });

    it("should expose header part", () => {
      const header = queryShadow(modal, '[part="header"]');
      expect(header).toBeTruthy();
    });

    it("should expose body part", () => {
      const body = queryShadow(modal, '[part="body"]');
      expect(body).toBeTruthy();
    });

    it("should expose footer part", () => {
      const footer = queryShadow(modal, '[part="footer"]');
      expect(footer).toBeTruthy();
    });

    it("should expose close part when closable", () => {
      modal.setAttribute("closable", "");
      const close = queryShadow(modal, '[part="close"]');
      expect(close).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    let modal: HaModal;

    beforeEach(() => {
      modal = document.createElement("ha-modal") as HaModal;
      modal.setAttribute("open", "");
      document.body.appendChild(modal);
    });

    afterEach(() => {
      document.body.removeChild(modal);
    });

    it("should have role=dialog", () => {
      const dialog = queryShadow(modal, '[part="dialog"]');
      expect(dialog?.getAttribute("role")).toBe("dialog");
    });

    it("should have aria-modal=true", () => {
      const dialog = queryShadow(modal, '[part="dialog"]');
      expect(dialog?.getAttribute("aria-modal")).toBe("true");
    });

    it("should have accessible close button", () => {
      modal.setAttribute("closable", "");
      const closeButton = queryShadow(modal, '[part="close"]') as HTMLButtonElement;
      expect(closeButton?.getAttribute("aria-label")).toBeTruthy();
    });
  });
});
