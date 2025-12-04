import { describe, it, expect, beforeEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaList, HaListItem, HaListDivider } from "./list";

describe("HaList", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-list")) {
      customElements.define("ha-list", HaList);
    }
    await waitForCustomElement("ha-list");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-list")).toBe(HaList);
    });

    it("should create an instance", () => {
      const list = document.createElement("ha-list") as HaList;
      expect(list).toBeInstanceOf(HaList);
      expect(list).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const list = document.createElement("ha-list") as HaList;
      document.body.appendChild(list);
      expect(list.shadowRoot).not.toBeNull();
      document.body.removeChild(list);
    });
  });

  describe("Attributes", () => {
    let list: HaList;

    beforeEach(() => {
      list = document.createElement("ha-list") as HaList;
      document.body.appendChild(list);
    });

    afterEach(() => {
      document.body.removeChild(list);
    });

    it("should not be bordered by default", () => {
      expect(list.hasAttribute("bordered")).toBe(false);
    });

    it("should not be hoverable by default", () => {
      expect(list.hasAttribute("hoverable")).toBe(false);
    });

    it("should not be divided by default", () => {
      expect(list.hasAttribute("divided")).toBe(false);
    });

    it("should add bordered attribute", () => {
      list.setAttribute("bordered", "");
      expect(list.hasAttribute("bordered")).toBe(true);
    });

    it("should add hoverable attribute", () => {
      list.setAttribute("hoverable", "");
      expect(list.hasAttribute("hoverable")).toBe(true);
    });

    it("should add divided attribute", () => {
      list.setAttribute("divided", "");
      expect(list.hasAttribute("divided")).toBe(true);
    });
  });

  describe("CSS Classes", () => {
    let list: HaList;

    beforeEach(() => {
      list = document.createElement("ha-list") as HaList;
      document.body.appendChild(list);
    });

    afterEach(() => {
      document.body.removeChild(list);
    });

    it("should apply bordered class when bordered attribute is set", () => {
      list.setAttribute("bordered", "");
      const listElement = queryShadow(list, ".list");
      expect(listElement?.classList.contains("list--bordered")).toBe(true);
    });

    it("should apply hoverable class when hoverable attribute is set", () => {
      list.setAttribute("hoverable", "");
      const listElement = queryShadow(list, ".list");
      expect(listElement?.classList.contains("list--hoverable")).toBe(true);
    });

    it("should apply divided class when divided attribute is set", () => {
      list.setAttribute("divided", "");
      const listElement = queryShadow(list, ".list");
      expect(listElement?.classList.contains("list--divided")).toBe(true);
    });
  });

  describe("CSS Parts", () => {
    let list: HaList;

    beforeEach(() => {
      list = document.createElement("ha-list") as HaList;
      document.body.appendChild(list);
    });

    afterEach(() => {
      document.body.removeChild(list);
    });

    it("should expose list part", () => {
      const listElement = queryShadow(list, '[part="list"]');
      expect(listElement).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    let list: HaList;

    beforeEach(() => {
      list = document.createElement("ha-list") as HaList;
      document.body.appendChild(list);
    });

    afterEach(() => {
      document.body.removeChild(list);
    });

    it("should have list role", () => {
      const listElement = queryShadow(list, ".list");
      expect(listElement?.getAttribute("role")).toBe("list");
    });
  });
});

describe("HaListItem", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-list-item")) {
      customElements.define("ha-list-item", HaListItem);
    }
    await waitForCustomElement("ha-list-item");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-list-item")).toBe(HaListItem);
    });

    it("should create an instance", () => {
      const item = document.createElement("ha-list-item") as HaListItem;
      expect(item).toBeInstanceOf(HaListItem);
      expect(item).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const item = document.createElement("ha-list-item") as HaListItem;
      document.body.appendChild(item);
      expect(item.shadowRoot).not.toBeNull();
      document.body.removeChild(item);
    });
  });

  describe("Attributes", () => {
    let item: HaListItem;

    beforeEach(() => {
      item = document.createElement("ha-list-item") as HaListItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should not be disabled by default", () => {
      expect(item.hasAttribute("disabled")).toBe(false);
    });

    it("should not be active by default", () => {
      expect(item.hasAttribute("active")).toBe(false);
    });

    it("should add disabled attribute", () => {
      item.setAttribute("disabled", "");
      expect(item.hasAttribute("disabled")).toBe(true);
    });

    it("should add active attribute", () => {
      item.setAttribute("active", "");
      expect(item.hasAttribute("active")).toBe(true);
    });
  });

  describe("CSS Classes", () => {
    let item: HaListItem;

    beforeEach(() => {
      item = document.createElement("ha-list-item") as HaListItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should apply disabled class when disabled", () => {
      item.setAttribute("disabled", "");
      const itemElement = queryShadow(item, ".list-item");
      expect(itemElement?.classList.contains("list-item--disabled")).toBe(true);
    });

    it("should apply active class when active", () => {
      item.setAttribute("active", "");
      const itemElement = queryShadow(item, ".list-item");
      expect(itemElement?.classList.contains("list-item--active")).toBe(true);
    });
  });

  describe("Events", () => {
    let item: HaListItem;

    beforeEach(() => {
      item = document.createElement("ha-list-item") as HaListItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should emit list-item-click event when clicked", async () => {
      const clickHandler = vi.fn();
      item.addEventListener("list-item-click", clickHandler);

      const itemElement = queryShadow(item, ".list-item") as HTMLElement;
      itemElement?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(clickHandler).toHaveBeenCalled();
    });

    it("should not emit click event when disabled", async () => {
      const clickHandler = vi.fn();
      item.addEventListener("list-item-click", clickHandler);
      item.setAttribute("disabled", "");

      const itemElement = queryShadow(item, ".list-item") as HTMLElement;
      itemElement?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  describe("Slots", () => {
    let item: HaListItem;

    beforeEach(() => {
      item = document.createElement("ha-list-item") as HaListItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should render prefix slot", () => {
      const prefixSlot = queryShadow(item, 'slot[name="prefix"]');
      expect(prefixSlot).toBeTruthy();
    });

    it("should render default slot for content", () => {
      const contentSlot = queryShadow(item, '.list-item__content slot:not([name])');
      expect(contentSlot).toBeTruthy();
    });

    it("should render suffix slot", () => {
      const suffixSlot = queryShadow(item, 'slot[name="suffix"]');
      expect(suffixSlot).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    let item: HaListItem;

    beforeEach(() => {
      item = document.createElement("ha-list-item") as HaListItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should expose item part", () => {
      const itemElement = queryShadow(item, '[part="item"]');
      expect(itemElement).toBeTruthy();
    });

    it("should expose prefix part", () => {
      const prefix = queryShadow(item, '[part="prefix"]');
      expect(prefix).toBeTruthy();
    });

    it("should expose content part", () => {
      const content = queryShadow(item, '[part="content"]');
      expect(content).toBeTruthy();
    });

    it("should expose suffix part", () => {
      const suffix = queryShadow(item, '[part="suffix"]');
      expect(suffix).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    let item: HaListItem;

    beforeEach(() => {
      item = document.createElement("ha-list-item") as HaListItem;
      document.body.appendChild(item);
    });

    afterEach(() => {
      document.body.removeChild(item);
    });

    it("should have listitem role", () => {
      const itemElement = queryShadow(item, ".list-item");
      expect(itemElement?.getAttribute("role")).toBe("listitem");
    });
  });
});

describe("HaListDivider", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-list-divider")) {
      customElements.define("ha-list-divider", HaListDivider);
    }
    await waitForCustomElement("ha-list-divider");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-list-divider")).toBe(HaListDivider);
    });

    it("should create an instance", () => {
      const divider = document.createElement("ha-list-divider") as HaListDivider;
      expect(divider).toBeInstanceOf(HaListDivider);
      expect(divider).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const divider = document.createElement("ha-list-divider") as HaListDivider;
      document.body.appendChild(divider);
      expect(divider.shadowRoot).not.toBeNull();
      document.body.removeChild(divider);
    });
  });

  describe("CSS Parts", () => {
    let divider: HaListDivider;

    beforeEach(() => {
      divider = document.createElement("ha-list-divider") as HaListDivider;
      document.body.appendChild(divider);
    });

    afterEach(() => {
      document.body.removeChild(divider);
    });

    it("should expose divider part", () => {
      const dividerElement = queryShadow(divider, '[part="divider"]');
      expect(dividerElement).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    let divider: HaListDivider;

    beforeEach(() => {
      divider = document.createElement("ha-list-divider") as HaListDivider;
      document.body.appendChild(divider);
    });

    afterEach(() => {
      document.body.removeChild(divider);
    });

    it("should have separator role", () => {
      const dividerElement = queryShadow(divider, ".list-divider");
      expect(dividerElement?.getAttribute("role")).toBe("separator");
    });
  });
});
