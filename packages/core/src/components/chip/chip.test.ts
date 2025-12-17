import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { HaChip } from "./chip";
import "@hidearea-design/tokens/styles";

describe("HaChip", () => {
  let element: HaChip;

  beforeEach(() => {
    element = document.createElement("ha-chip") as HaChip;
    document.body.appendChild(element);
  });

  afterEach(() => {
    if (document.body.contains(element)) {
      document.body.removeChild(element);
    }
  });

  describe("Rendering", () => {
    it("should render chip element", () => {
      expect(element).toBeInstanceOf(HaChip);
      expect(element.shadowRoot).not.toBeNull();
    });

    it("should have chip part", () => {
      const chip = element.shadowRoot?.querySelector('[part="chip"]');
      expect(chip).not.toBeNull();
    });

    it("should have icon slot", () => {
      const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
      expect(iconSlot).not.toBeNull();
    });

    it("should have text slot", () => {
      const textSlot = element.shadowRoot?.querySelector("slot:not([name])");
      expect(textSlot).not.toBeNull();
    });

    it("should render text content", () => {
      element.textContent = "Test Chip";
      expect(element.textContent).toBe("Test Chip");
    });
  });

  describe("Size Attribute", () => {
    it("should have default size of medium", () => {
      expect(element.size).toBe("medium");
    });

    it("should set size attribute", () => {
      element.size = "small";
      expect(element.getAttribute("size")).toBe("small");
      expect(element.size).toBe("small");
    });

    it("should handle all size options", () => {
      const sizes = ["small", "medium", "large"];
      sizes.forEach((size) => {
        element.setAttribute("size", size);
        expect(element.size).toBe(size);
      });
    });
  });

  describe("Color Attribute", () => {
    it("should have default color of default", () => {
      expect(element.color).toBe("default");
    });

    it("should set color attribute", () => {
      element.color = "primary";
      expect(element.getAttribute("color")).toBe("primary");
      expect(element.color).toBe("primary");
    });

    it("should handle all color options", () => {
      const colors = [
        "default",
        "primary",
        "success",
        "warning",
        "error",
        "info",
      ];
      colors.forEach((color) => {
        element.setAttribute("color", color);
        expect(element.color).toBe(color);
      });
    });
  });

  describe("Deletable Attribute", () => {
    it("should not be deletable by default", () => {
      expect(element.deletable).toBe(false);
      expect(element.hasAttribute("deletable")).toBe(false);
    });

    it("should set deletable attribute", () => {
      element.deletable = true;
      expect(element.hasAttribute("deletable")).toBe(true);
      expect(element.deletable).toBe(true);
    });

    it("should remove deletable attribute", () => {
      element.setAttribute("deletable", "");
      expect(element.deletable).toBe(true);

      element.deletable = false;
      expect(element.hasAttribute("deletable")).toBe(false);
      expect(element.deletable).toBe(false);
    });

    it("should show close button when deletable", () => {
      element.setAttribute("deletable", "");
      const closeButton = element.shadowRoot?.querySelector('[part="close"]');
      expect(closeButton).not.toBeNull();
    });

    it("should hide close button when not deletable", () => {
      element.setAttribute("deletable", "");
      let closeButton = element.shadowRoot?.querySelector('[part="close"]');
      expect(closeButton).not.toBeNull();

      element.removeAttribute("deletable");
      closeButton = element.shadowRoot?.querySelector('[part="close"]');
      expect(closeButton).toBeNull();
    });

    it("should have aria-label on close button", () => {
      element.setAttribute("deletable", "");
      const closeButton = element.shadowRoot?.querySelector('[part="close"]');
      expect(closeButton?.getAttribute("aria-label")).toBe("削除");
    });
  });

  describe("Interactive Attribute", () => {
    it("should not be interactive by default", () => {
      expect(element.interactive).toBe(false);
      expect(element.hasAttribute("interactive")).toBe(false);
    });

    it("should set interactive attribute", () => {
      element.interactive = true;
      expect(element.hasAttribute("interactive")).toBe(true);
      expect(element.interactive).toBe(true);
    });

    it("should remove interactive attribute", () => {
      element.setAttribute("interactive", "");
      expect(element.interactive).toBe(true);

      element.interactive = false;
      expect(element.hasAttribute("interactive")).toBe(false);
      expect(element.interactive).toBe(false);
    });

    it("should set tabindex when interactive", () => {
      element.setAttribute("interactive", "");
      expect(element.getAttribute("tabindex")).toBe("0");
    });

    it("should remove tabindex when not interactive", () => {
      element.setAttribute("interactive", "");
      expect(element.getAttribute("tabindex")).toBe("0");

      element.removeAttribute("interactive");
      expect(element.hasAttribute("tabindex")).toBe(false);
    });
  });

  describe("Disabled Attribute", () => {
    it("should not be disabled by default", () => {
      expect(element.disabled).toBe(false);
      expect(element.hasAttribute("disabled")).toBe(false);
    });

    it("should set disabled attribute", () => {
      element.disabled = true;
      expect(element.hasAttribute("disabled")).toBe(true);
      expect(element.disabled).toBe(true);
    });

    it("should remove disabled attribute", () => {
      element.setAttribute("disabled", "");
      expect(element.disabled).toBe(true);

      element.disabled = false;
      expect(element.hasAttribute("disabled")).toBe(false);
      expect(element.disabled).toBe(false);
    });

    it("should remove tabindex when disabled", () => {
      element.setAttribute("interactive", "");
      expect(element.getAttribute("tabindex")).toBe("0");

      element.setAttribute("disabled", "");
      expect(element.hasAttribute("tabindex")).toBe(false);
    });

    it("should restore tabindex when enabled again", () => {
      element.setAttribute("interactive", "");
      element.setAttribute("disabled", "");
      expect(element.hasAttribute("tabindex")).toBe(false);

      element.removeAttribute("disabled");
      expect(element.getAttribute("tabindex")).toBe("0");
    });
  });

  describe("Events", () => {
    it("should emit chip-click event when clicked and interactive", () => {
      element.setAttribute("interactive", "");
      const clickHandler = vi.fn();
      element.addEventListener("chip-click", clickHandler);

      const chip = element.shadowRoot?.querySelector('[part="chip"]');
      chip?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(clickHandler).toHaveBeenCalled();
    });

    it("should not emit chip-click event when not interactive", () => {
      const clickHandler = vi.fn();
      element.addEventListener("chip-click", clickHandler);

      const chip = element.shadowRoot?.querySelector('[part="chip"]');
      chip?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(clickHandler).not.toHaveBeenCalled();
    });

    it("should not emit chip-click event when disabled", () => {
      element.setAttribute("interactive", "");
      element.setAttribute("disabled", "");
      const clickHandler = vi.fn();
      element.addEventListener("chip-click", clickHandler);

      const chip = element.shadowRoot?.querySelector('[part="chip"]');
      chip?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      expect(clickHandler).not.toHaveBeenCalled();
    });

    it("should include originalEvent in chip-click detail", () => {
      element.setAttribute("interactive", "");
      let eventDetail: any = null;
      element.addEventListener("chip-click", (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });

      const chip = element.shadowRoot?.querySelector('[part="chip"]');
      const clickEvent = new MouseEvent("click", { bubbles: true });
      chip?.dispatchEvent(clickEvent);

      expect(eventDetail).not.toBeNull();
      expect(eventDetail.originalEvent).toBeDefined();
    });

    it("should emit chip-delete event when delete button clicked", () => {
      element.setAttribute("deletable", "");
      const deleteHandler = vi.fn();
      element.addEventListener("chip-delete", deleteHandler);

      const closeButton = element.shadowRoot?.querySelector(
        '[part="close"]'
      ) as HTMLButtonElement;
      closeButton?.click();

      expect(deleteHandler).toHaveBeenCalled();
    });

    it("should not emit chip-delete event when disabled", () => {
      element.setAttribute("deletable", "");
      element.setAttribute("disabled", "");
      const deleteHandler = vi.fn();
      element.addEventListener("chip-delete", deleteHandler);

      const closeButton = element.shadowRoot?.querySelector(
        '[part="close"]'
      ) as HTMLButtonElement;
      closeButton?.click();

      expect(deleteHandler).not.toHaveBeenCalled();
    });

    it("should stop propagation on delete button click", () => {
      element.setAttribute("deletable", "");
      element.setAttribute("interactive", "");

      const chipClickHandler = vi.fn();
      element.addEventListener("chip-click", chipClickHandler);

      const closeButton = element.shadowRoot?.querySelector(
        '[part="close"]'
      ) as HTMLButtonElement;
      closeButton?.click();

      // chip-click should not be triggered when close button is clicked
      expect(chipClickHandler).not.toHaveBeenCalled();
    });

    it("should include chip reference in chip-delete detail", () => {
      element.setAttribute("deletable", "");
      let eventDetail: any = null;
      element.addEventListener("chip-delete", (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });

      const closeButton = element.shadowRoot?.querySelector(
        '[part="close"]'
      ) as HTMLButtonElement;
      closeButton?.click();

      expect(eventDetail).not.toBeNull();
      expect(eventDetail.chip).toBe(element);
    });

    it("should be cancelable chip-delete event", () => {
      element.setAttribute("deletable", "");
      element.addEventListener("chip-delete", (e: Event) => {
        e.preventDefault();
      });

      const closeButton = element.shadowRoot?.querySelector(
        '[part="close"]'
      ) as HTMLButtonElement;
      closeButton?.click();

      // Chip should still be in document because event was prevented
      expect(document.body.contains(element)).toBe(true);
    });
  });

  describe("Deletion Animation", () => {
    it("should remove chip after animation when delete button clicked", async () => {
      element.setAttribute("deletable", "");

      const closeButton = element.shadowRoot?.querySelector(
        '[part="close"]'
      ) as HTMLButtonElement;
      closeButton?.click();

      // Should still be in document immediately
      expect(document.body.contains(element)).toBe(true);

      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, 250));

      // Should be removed after animation
      expect(document.body.contains(element)).toBe(false);
    });

    it("should set opacity to 0 during deletion", () => {
      element.setAttribute("deletable", "");

      const closeButton = element.shadowRoot?.querySelector(
        '[part="close"]'
      ) as HTMLButtonElement;
      closeButton?.click();

      expect(element.style.opacity).toBe("0");
    });

    it("should set transform scale during deletion", () => {
      element.setAttribute("deletable", "");

      const closeButton = element.shadowRoot?.querySelector(
        '[part="close"]'
      ) as HTMLButtonElement;
      closeButton?.click();

      expect(element.style.transform).toBe("scale(0.8)");
    });

    it("should set transition during deletion", () => {
      element.setAttribute("deletable", "");

      const closeButton = element.shadowRoot?.querySelector(
        '[part="close"]'
      ) as HTMLButtonElement;
      closeButton?.click();

      expect(element.style.transition).toContain("opacity");
      expect(element.style.transition).toContain("transform");
    });
  });

  describe("Attribute Change", () => {
    it("should not trigger update if attribute value unchanged", () => {
      element.setAttribute("size", "medium");
      const initialSize = element.size;

      element.setAttribute("size", "medium");
      expect(element.size).toBe(initialSize);
    });

    it("should update when size attribute changes", () => {
      element.setAttribute("size", "small");
      expect(element.size).toBe("small");

      element.setAttribute("size", "large");
      expect(element.size).toBe("large");
    });

    it("should update when color attribute changes", () => {
      element.setAttribute("color", "primary");
      expect(element.color).toBe("primary");

      element.setAttribute("color", "success");
      expect(element.color).toBe("success");
    });
  });

  describe("CSS Parts", () => {
    it("should expose chip part", () => {
      const chip = element.shadowRoot?.querySelector('[part="chip"]');
      expect(chip).not.toBeNull();
    });

    it("should expose icon part", () => {
      const icon = element.shadowRoot?.querySelector('[part="icon"]');
      expect(icon).not.toBeNull();
    });

    it("should expose text part", () => {
      const text = element.shadowRoot?.querySelector('[part="text"]');
      expect(text).not.toBeNull();
    });

    it("should expose close part when deletable", () => {
      element.setAttribute("deletable", "");
      const close = element.shadowRoot?.querySelector('[part="close"]');
      expect(close).not.toBeNull();
    });
  });

  describe("Slots", () => {
    it("should have icon slot", () => {
      const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
      expect(iconSlot).not.toBeNull();
    });

    it("should accept icon slot content", () => {
      const icon = document.createElement("span");
      icon.slot = "icon";
      icon.textContent = "★";
      element.appendChild(icon);

      const iconSlot = element.shadowRoot?.querySelector(
        'slot[name="icon"]'
      ) as HTMLSlotElement;
      const assignedNodes = iconSlot.assignedNodes();
      expect(assignedNodes.length).toBeGreaterThan(0);
    });

    it("should have default slot for text", () => {
      const textSlot = element.shadowRoot?.querySelector("slot:not([name])");
      expect(textSlot).not.toBeNull();
    });
  });
});
