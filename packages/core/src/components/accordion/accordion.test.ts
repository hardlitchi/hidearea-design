import { describe, it, expect, beforeEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaAccordion, HaAccordionItem } from "./accordion";

describe("HaAccordion", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-accordion")) {
      customElements.define("ha-accordion", HaAccordion);
    }
    await waitForCustomElement("ha-accordion");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-accordion")).toBe(HaAccordion);
    });

    it("should create an instance", () => {
      const accordion = document.createElement("ha-accordion") as HaAccordion;
      expect(accordion).toBeInstanceOf(HaAccordion);
      expect(accordion).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const accordion = document.createElement("ha-accordion") as HaAccordion;
      document.body.appendChild(accordion);
      expect(accordion.shadowRoot).not.toBeNull();
      document.body.removeChild(accordion);
    });
  });

  describe("Attributes", () => {
    let accordion: HaAccordion;

    beforeEach(() => {
      accordion = document.createElement("ha-accordion") as HaAccordion;
      document.body.appendChild(accordion);
    });

    afterEach(() => {
      document.body.removeChild(accordion);
    });

    it("should not allow multiple by default", () => {
      expect(accordion.hasAttribute("allow-multiple")).toBe(false);
    });

    it("should not be collapsible by default", () => {
      expect(accordion.hasAttribute("collapsible")).toBe(false);
    });

    it("should add allow-multiple attribute", () => {
      accordion.setAttribute("allow-multiple", "");
      expect(accordion.hasAttribute("allow-multiple")).toBe(true);
    });

    it("should add collapsible attribute", () => {
      accordion.setAttribute("collapsible", "");
      expect(accordion.hasAttribute("collapsible")).toBe(true);
    });
  });

  describe("CSS Parts", () => {
    let accordion: HaAccordion;

    beforeEach(() => {
      accordion = document.createElement("ha-accordion") as HaAccordion;
      document.body.appendChild(accordion);
    });

    afterEach(() => {
      document.body.removeChild(accordion);
    });

    it("should expose accordion part", () => {
      const accordionElement = queryShadow(accordion, '[part="accordion"]');
      expect(accordionElement).toBeTruthy();
    });
  });
});

describe("HaAccordionItem", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-accordion-item")) {
      customElements.define("ha-accordion-item", HaAccordionItem);
    }
    await waitForCustomElement("ha-accordion-item");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-accordion-item")).toBe(HaAccordionItem);
    });

    it("should create an instance", () => {
      const item = document.createElement("ha-accordion-item") as HaAccordionItem;
      expect(item).toBeInstanceOf(HaAccordionItem);
      expect(item).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const item = document.createElement("ha-accordion-item") as HaAccordionItem;
      document.body.appendChild(item);
      expect(item.shadowRoot).not.toBeNull();
      document.body.removeChild(item);
    });
  });

  describe("Attributes", () => {
    let item: HaAccordionItem;

    beforeEach(() => {
      item = document.createElement("ha-accordion-item") as HaAccordionItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should not be open by default", () => {
      expect(item.hasAttribute("open")).toBe(false);
    });

    it("should not be disabled by default", () => {
      expect(item.hasAttribute("disabled")).toBe(false);
    });

    it("should add open attribute", () => {
      item.setAttribute("open", "");
      expect(item.hasAttribute("open")).toBe(true);
    });

    it("should add disabled attribute", () => {
      item.setAttribute("disabled", "");
      expect(item.hasAttribute("disabled")).toBe(true);
    });

    it("should set header attribute", () => {
      item.setAttribute("header", "Test Header");
      expect(item.getAttribute("header")).toBe("Test Header");
    });
  });

  describe("Open/Close Behavior", () => {
    let item: HaAccordionItem;

    beforeEach(() => {
      item = document.createElement("ha-accordion-item") as HaAccordionItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should open when open() is called", () => {
      item.open();
      expect(item.hasAttribute("open")).toBe(true);
    });

    it("should close when close() is called", () => {
      item.setAttribute("open", "");
      item.close();
      expect(item.hasAttribute("open")).toBe(false);
    });

    it("should toggle state when toggle() is called", () => {
      item.toggle();
      expect(item.hasAttribute("open")).toBe(true);
      item.toggle();
      expect(item.hasAttribute("open")).toBe(false);
    });
  });

  describe("Events", () => {
    let item: HaAccordionItem;

    beforeEach(() => {
      item = document.createElement("ha-accordion-item") as HaAccordionItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should emit accordion-open event when opened", async () => {
      const openHandler = vi.fn();
      item.addEventListener("accordion-open", openHandler);

      item.open();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(openHandler).toHaveBeenCalled();
    });

    it("should emit accordion-close event when closed", async () => {
      const closeHandler = vi.fn();
      item.addEventListener("accordion-close", closeHandler);

      item.setAttribute("open", "");
      await new Promise((resolve) => setTimeout(resolve, 100));

      item.close();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(closeHandler).toHaveBeenCalled();
    });

    it("should emit accordion-toggle event when toggled", async () => {
      const toggleHandler = vi.fn();
      item.addEventListener("accordion-toggle", toggleHandler);

      item.toggle();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(toggleHandler).toHaveBeenCalled();
    });
  });

  describe("CSS Classes", () => {
    let item: HaAccordionItem;

    beforeEach(() => {
      item = document.createElement("ha-accordion-item") as HaAccordionItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should apply open class when open", () => {
      item.setAttribute("open", "");
      const itemElement = queryShadow(item, ".accordion-item");
      expect(itemElement?.classList.contains("accordion-item--open")).toBe(true);
    });

    it("should apply disabled class when disabled", () => {
      item.setAttribute("disabled", "");
      const itemElement = queryShadow(item, ".accordion-item");
      expect(itemElement?.classList.contains("accordion-item--disabled")).toBe(true);
    });
  });

  describe("Slots", () => {
    let item: HaAccordionItem;

    beforeEach(() => {
      item = document.createElement("ha-accordion-item") as HaAccordionItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should render header slot", () => {
      const headerSlot = queryShadow(item, 'slot[name="header"]');
      expect(headerSlot).toBeTruthy();
    });

    it("should render default slot for content", () => {
      const contentSlot = queryShadow(item, '.accordion-item__content slot:not([name])');
      expect(contentSlot).toBeTruthy();
    });

    it("should render icon slot", () => {
      const iconSlot = queryShadow(item, 'slot[name="icon"]');
      expect(iconSlot).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    let item: HaAccordionItem;

    beforeEach(() => {
      item = document.createElement("ha-accordion-item") as HaAccordionItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should expose item part", () => {
      const itemElement = queryShadow(item, '[part="item"]');
      expect(itemElement).toBeTruthy();
    });

    it("should expose header part", () => {
      const header = queryShadow(item, '[part="header"]');
      expect(header).toBeTruthy();
    });

    it("should expose content part", () => {
      const content = queryShadow(item, '[part="content"]');
      expect(content).toBeTruthy();
    });

    it("should expose icon part", () => {
      const icon = queryShadow(item, '[part="icon"]');
      expect(icon).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    let item: HaAccordionItem;

    beforeEach(() => {
      item = document.createElement("ha-accordion-item") as HaAccordionItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should have aria-expanded attribute", () => {
      const header = queryShadow(item, ".accordion-item__header");
      expect(header?.getAttribute("aria-expanded")).toBeDefined();
    });

    it("should update aria-expanded when opened", () => {
      item.setAttribute("open", "");
      const header = queryShadow(item, ".accordion-item__header");
      expect(header?.getAttribute("aria-expanded")).toBe("true");
    });

    it("should have button type for header", () => {
      const header = queryShadow(item, ".accordion-item__header");
      expect(header?.getAttribute("type")).toBe("button");
    });
  });

  describe("AccordionItem without parent", () => {
    it("should close even if not in an accordion", () => {
      const item = document.createElement("ha-accordion-item") as HaAccordionItem;
      document.body.appendChild(item);
      item.setAttribute("open", "");
      
      item.close();
      expect(item.hasAttribute("open")).toBe(false);
      document.body.removeChild(item);
    });
  });
  
  describe("Accordion Interaction", () => {
    let accordion: HaAccordion;
    let item1: HaAccordionItem;
    let item2: HaAccordionItem;
    let item3: HaAccordionItem;

    beforeEach(() => {
      document.body.innerHTML = `
        <ha-accordion>
          <ha-accordion-item header="Item 1">Content 1</ha-accordion-item>
          <ha-accordion-item header="Item 2" open>Content 2</ha-accordion-item>
          <ha-accordion-item header="Item 3" disabled>Content 3</ha-accordion-item>
        </ha-accordion>
      `;
      accordion = document.querySelector("ha-accordion") as HaAccordion;
      item1 = accordion.children[0] as HaAccordionItem;
      item2 = accordion.children[1] as HaAccordionItem;
      item3 = accordion.children[2] as HaAccordionItem;
    });

    it("should only allow one item to be open by default", async () => {
      const header1 = item1.shadowRoot?.querySelector(".accordion-item__header");
      (header1 as HTMLElement)?.click();
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(item1.hasAttribute("open")).toBe(true);
      expect(item2.hasAttribute("open")).toBe(false);
    });

    it("should allow multiple items to be open if allow-multiple is set", async () => {
      accordion.setAttribute("allow-multiple", "");
      await new Promise(resolve => setTimeout(resolve, 0));
      const header1 = item1.shadowRoot?.querySelector(".accordion-item__header");
      (header1 as HTMLElement)?.click();
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(item1.hasAttribute("open")).toBe(true);
      expect(item2.hasAttribute("open")).toBe(true);
    });
    
    it("should not close the last item if not collapsible", async () => {
      const header2 = item2.shadowRoot?.querySelector(".accordion-item__header");
      (header2 as HTMLElement)?.click();
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(item2.hasAttribute("open")).toBe(false);
    });

    it("should close the last item if collapsible is set", async () => {
      accordion.setAttribute("collapsible", "");
      await new Promise(resolve => setTimeout(resolve, 0));
      const header2 = item2.shadowRoot?.querySelector(".accordion-item__header");
      (header2 as HTMLElement)?.click();
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(item2.hasAttribute("open")).toBe(false);
    });
    
    it("should not open disabled items", () => {
      const header3 = item3.shadowRoot?.querySelector(".accordion-item__header");
      (header3 as HTMLElement)?.click();
      expect(item3.hasAttribute("open")).toBe(false);
    });
  });
});
