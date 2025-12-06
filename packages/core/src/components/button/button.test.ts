import { describe, it, expect, beforeEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaButton } from "./button";

describe("HaButton", () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get("ha-button")) {
      customElements.define("ha-button", HaButton);
    }
    await waitForCustomElement("ha-button");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-button")).toBe(HaButton);
    });

    it("should create an instance", () => {
      const button = document.createElement("ha-button") as HaButton;
      expect(button).toBeInstanceOf(HaButton);
      expect(button).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
      expect(button.shadowRoot).not.toBeNull();
      document.body.removeChild(button);
    });
  });

  describe("Attributes and Properties", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    it("should have default variant as primary", () => {
      expect(button.variant).toBe("primary");
    });

    it("should have default size as md", () => {
      expect(button.size).toBe("md");
    });

    it("should set internal button type to button by default", () => {
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.type).toBe("button");
    });

    it("should update variant property", () => {
      button.variant = "secondary";
      expect(button.variant).toBe("secondary");
      expect(button.getAttribute("variant")).toBe("secondary");
    });

    it("should update variant attribute", () => {
      button.setAttribute("variant", "outline");
      expect(button.variant).toBe("outline");
    });

    it("should update size property", () => {
      button.size = "lg";
      expect(button.size).toBe("lg");
      expect(button.getAttribute("size")).toBe("lg");
    });

    it("should update size attribute", () => {
      button.setAttribute("size", "sm");
      expect(button.size).toBe("sm");
    });

    it("should update disabled property", () => {
      button.disabled = true;
      expect(button.disabled).toBe(true);
      expect(button.hasAttribute("disabled")).toBe(true);
    });

    it("should update disabled attribute", () => {
      button.setAttribute("disabled", "");
      expect(button.disabled).toBe(true);
    });

    it("should update loading property", () => {
      button.loading = true;
      expect(button.loading).toBe(true);
      expect(button.hasAttribute("loading")).toBe(true);
    });

    it("should update loading attribute", () => {
      button.setAttribute("loading", "");
      expect(button.loading).toBe(true);
    });

    it("should update fullWidth property", () => {
      button.fullWidth = true;
      expect(button.fullWidth).toBe(true);
      expect(button.hasAttribute("full-width")).toBe(true);
    });

    it("should update fullWidth attribute", () => {
      button.setAttribute("full-width", "");
      expect(button.fullWidth).toBe(true);
    });

    it("should update type attribute and internal button type", () => {
      button.setAttribute("type", "submit");
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.type).toBe("submit");
      expect(button.getAttribute("type")).toBe("submit");
    });
  });

  describe("Rendering", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    it("should render internal button element", () => {
      const internalButton = queryShadow(button, "button");
      expect(internalButton).not.toBeNull();
      expect(internalButton?.tagName.toLowerCase()).toBe("button");
    });

    it("should render slot for content", () => {
      const slot = queryShadow(button, "slot:not([name])");
      expect(slot).not.toBeNull();
    });

    it("should display slotted content", () => {
      button.textContent = "Click me";
      const slot = queryShadow(button, "slot:not([name])") as HTMLSlotElement;
      const assignedNodes = slot.assignedNodes();
      expect(assignedNodes.length).toBeGreaterThan(0);
    });

    it("should set variant attribute on host element", () => {
      button.variant = "secondary";
      expect(button.getAttribute("variant")).toBe("secondary");
    });

    it("should set size attribute on host element", () => {
      button.size = "lg";
      expect(button.getAttribute("size")).toBe("lg");
    });

    it("should set full-width attribute when fullWidth is true", () => {
      button.fullWidth = true;
      expect(button.hasAttribute("full-width")).toBe(true);
    });
  });

  describe("Disabled State", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    it("should set disabled attribute on internal button when disabled", () => {
      button.disabled = true;
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.disabled).toBe(true);
    });

    it("should not emit click event when disabled", async () => {
      button.disabled = true;
      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      internalButton.click();

      // Wait a tick for any async event propagation
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(clickHandler).not.toHaveBeenCalled();
    });

    it("should set aria-disabled when disabled", () => {
      button.disabled = true;
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-disabled")).toBe("true");
    });
  });

  describe("Loading State", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    it("should set loading attribute when loading is true", () => {
      button.loading = true;
      expect(button.hasAttribute("loading")).toBe(true);
    });

    it("should set aria-busy when loading", () => {
      button.loading = true;
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-busy")).toBe("true");
    });

    it("should prevent click events when loading", async () => {
      button.loading = true;
      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      internalButton.click();

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(clickHandler).not.toHaveBeenCalled();
    });

    // This test is removed as it's now covered in the Accessibility section
    // with improved assertion
  });

  describe("Button Types", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    it("should set type attribute on internal button via host attribute", () => {
      button.setAttribute("type", "submit");
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.type).toBe("submit");
    });

    it("should support button type", () => {
      button.setAttribute("type", "button");
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.type).toBe("button");
    });

    it("should support submit type", () => {
      button.setAttribute("type", "submit");
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.type).toBe("submit");
    });

    it("should support reset type", () => {
      button.setAttribute("type", "reset");
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.type).toBe("reset");
    });
  });

  describe("Events", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    it("should emit custom click event when clicked", async () => {
      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      internalButton.click();

      // Wait a tick for event propagation
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(clickHandler).toHaveBeenCalled();
    });

    it("should not prevent default click behavior", async () => {
      let defaultPrevented = false;
      button.addEventListener("click", (e) => {
        defaultPrevented = e.defaultPrevented;
      });

      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      internalButton.click();

      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(defaultPrevented).toBe(false);
    });
  });

  describe("Focus Management", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    it("should expose focus method", () => {
      expect(typeof button.focus).toBe("function");
    });

    it("should expose blur method", () => {
      expect(typeof button.blur).toBe("function");
    });

    it("should focus internal button when focus is called", () => {
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      const focusSpy = vi.spyOn(internalButton, "focus");

      button.focus();

      expect(focusSpy).toHaveBeenCalled();
    });

    it("should blur internal button when blur is called", () => {
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      const blurSpy = vi.spyOn(internalButton, "blur");

      button.blur();

      expect(blurSpy).toHaveBeenCalled();
    });
  });

  describe("Variant Styles", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    const variants = [
      "primary",
      "secondary",
      "outline",
      "ghost",
      "danger",
    ] as const;

    variants.forEach((variant) => {
      it(`should set ${variant} variant attribute`, () => {
        button.variant = variant;
        expect(button.getAttribute("variant")).toBe(variant);
      });
    });
  });

  describe("Size Styles", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      it(`should set ${size} size attribute`, () => {
        button.size = size;
        expect(button.getAttribute("size")).toBe(size);
      });
    });
  });

  describe("Accessibility", () => {
    let button: HaButton;

    beforeEach(() => {
      button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);
    });

    afterEach(() => {
      document.body.removeChild(button);
    });

    it("should have button role implicitly", () => {
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.tagName.toLowerCase()).toBe("button");
    });

    it("should be keyboard accessible", () => {
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it("should set aria-disabled when disabled", () => {
      button.disabled = true;
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-disabled")).toBe("true");
    });

    it("should set aria-busy when loading", () => {
      button.loading = true;
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-busy")).toBe("true");
    });

    it("should remove aria-busy when not loading", () => {
      button.loading = false;
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.hasAttribute("aria-busy")).toBe(false);
    });

    it("should set aria-pressed for toggle buttons", () => {
      button.pressed = true;
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-pressed")).toBe("true");
    });

    it("should toggle aria-pressed on click", async () => {
      // Start with pressed=false by setting the attribute
      button.setAttribute("pressed", "");
      button.pressed = true; // Set to true first

      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-pressed")).toBe("true");

      // Click should toggle to false
      internalButton.click();
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(internalButton.getAttribute("aria-pressed")).toBe("false");

      // Click again should toggle back to true
      internalButton.click();
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(internalButton.getAttribute("aria-pressed")).toBe("true");
    });

    it("should set aria-expanded for expandable content", () => {
      button.expanded = true;
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-expanded")).toBe("true");
    });

    it("should set aria-label for icon-only buttons", () => {
      button.setAttribute("aria-label", "Close dialog");
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-label")).toBe("Close dialog");
    });

    it("should set aria-controls to reference controlled element", () => {
      button.setAttribute("aria-controls", "panel-1");
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-controls")).toBe("panel-1");
    });

    it("should set aria-haspopup for popup triggers", () => {
      button.setAttribute("haspopup", "menu");
      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.getAttribute("aria-haspopup")).toBe("menu");
    });

    it("should support all haspopup values", () => {
      const haspopupValues = ["menu", "listbox", "tree", "grid", "dialog", "true"];

      haspopupValues.forEach((value) => {
        button.setAttribute("haspopup", value);
        const internalButton = queryShadow(button, "button") as HTMLButtonElement;
        expect(internalButton.getAttribute("aria-haspopup")).toBe(value);
      });
    });

    it("should remove aria attributes when attributes are removed", () => {
      button.setAttribute("pressed", "");
      button.setAttribute("expanded", "");
      button.setAttribute("aria-label", "Test");
      button.setAttribute("aria-controls", "panel-1");
      button.setAttribute("haspopup", "menu");

      const internalButton = queryShadow(button, "button") as HTMLButtonElement;
      expect(internalButton.hasAttribute("aria-pressed")).toBe(true);
      expect(internalButton.hasAttribute("aria-expanded")).toBe(true);
      expect(internalButton.hasAttribute("aria-label")).toBe(true);
      expect(internalButton.hasAttribute("aria-controls")).toBe(true);
      expect(internalButton.hasAttribute("aria-haspopup")).toBe(true);

      button.removeAttribute("pressed");
      button.removeAttribute("expanded");
      button.removeAttribute("aria-label");
      button.removeAttribute("aria-controls");
      button.removeAttribute("haspopup");

      expect(internalButton.hasAttribute("aria-pressed")).toBe(false);
      expect(internalButton.hasAttribute("aria-expanded")).toBe(false);
      expect(internalButton.hasAttribute("aria-label")).toBe(false);
      expect(internalButton.hasAttribute("aria-controls")).toBe(false);
      expect(internalButton.hasAttribute("aria-haspopup")).toBe(false);
    });
  });

  describe("Cleanup", () => {
    it("should clean up when disconnected", () => {
      const button = document.createElement("ha-button") as HaButton;
      document.body.appendChild(button);

      // Store reference to shadow root before removal
      const shadowRoot = button.shadowRoot;
      expect(shadowRoot).not.toBeNull();

      document.body.removeChild(button);

      // Component should still have shadow root after disconnect
      expect(button.shadowRoot).toBe(shadowRoot);
    });
  });
});
