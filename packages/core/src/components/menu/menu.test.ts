import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/dom";
import "./dropdown";
import "./menu";
import "./menu-item";
import "./menu-divider";

describe("HaDropdown", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should register custom element", () => {
    expect(customElements.get("ha-dropdown")).toBeDefined();
  });

  it("should render with default attributes", () => {
    const dropdown = document.createElement("ha-dropdown");
    document.body.appendChild(dropdown);

    expect(dropdown.placement).toBe("bottom-start");
    expect(dropdown.triggerMode).toBe("click");
    expect(dropdown.open).toBe(false);
  });

  it("should render with custom placement", () => {
    const dropdown = document.createElement("ha-dropdown");
    dropdown.placement = "top-end";
    document.body.appendChild(dropdown);

    expect(dropdown.placement).toBe("top-end");
  });

  it("should render with hover trigger", () => {
    const dropdown = document.createElement("ha-dropdown");
    dropdown.triggerMode = "hover";
    document.body.appendChild(dropdown);

    expect(dropdown.triggerMode).toBe("hover");
  });

  it("should toggle open state", () => {
    const dropdown = document.createElement("ha-dropdown");
    document.body.appendChild(dropdown);

    expect(dropdown.open).toBe(false);

    dropdown.open = true;
    expect(dropdown.open).toBe(true);

    dropdown.open = false;
    expect(dropdown.open).toBe(false);
  });

  it("should have public API methods", () => {
    const dropdown = document.createElement("ha-dropdown");
    document.body.appendChild(dropdown);

    expect(typeof dropdown.showDropdown).toBe("function");
    expect(typeof dropdown.hideDropdown).toBe("function");
    expect(typeof dropdown.toggleDropdown).toBe("function");
  });

  it("should have trigger and menu-container parts", () => {
    const dropdown = document.createElement("ha-dropdown");
    document.body.appendChild(dropdown);

    const shadow = dropdown.shadowRoot!;
    const trigger = shadow.querySelector('[part="trigger"]');
    const menuContainer = shadow.querySelector('[part="menu-container"]');

    expect(trigger).not.toBeNull();
    expect(menuContainer).not.toBeNull();
  });

  it("should have named slots", () => {
    const dropdown = document.createElement("ha-dropdown");
    document.body.appendChild(dropdown);

    const shadow = dropdown.shadowRoot!;
    const triggerSlot = shadow.querySelector('slot[name="trigger"]');
    const defaultSlot = shadow.querySelector(
      ".menu-container slot:not([name])",
    );

    expect(triggerSlot).not.toBeNull();
    expect(defaultSlot).not.toBeNull();
  });

  it("should expose CSS parts for styling", () => {
    const dropdown = document.createElement("ha-dropdown");
    document.body.appendChild(dropdown);

    const shadow = dropdown.shadowRoot!;
    const trigger = shadow.querySelector('[part="trigger"]');
    const menuContainer = shadow.querySelector('[part="menu-container"]');

    expect(trigger?.getAttribute("part")).toBe("trigger");
    expect(menuContainer?.getAttribute("part")).toBe("menu-container");
  });
});

describe("HaMenu", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should register custom element", () => {
    expect(customElements.get("ha-menu")).toBeDefined();
  });

  it("should render with default attributes", () => {
    const menu = document.createElement("ha-menu");
    document.body.appendChild(menu);

    expect(menu.size).toBe("md");
  });

  it("should render with custom size", () => {
    const menu = document.createElement("ha-menu");
    menu.size = "lg";
    document.body.appendChild(menu);

    expect(menu.size).toBe("lg");
  });

  it("should have menu part", () => {
    const menu = document.createElement("ha-menu");
    document.body.appendChild(menu);

    const shadow = menu.shadowRoot!;
    const menuElement = shadow.querySelector('[part="menu"]');

    expect(menuElement).not.toBeNull();
  });

  it("should have default slot", () => {
    const menu = document.createElement("ha-menu");
    document.body.appendChild(menu);

    const shadow = menu.shadowRoot!;
    const slot = shadow.querySelector("slot");

    expect(slot).not.toBeNull();
  });

  it("should have role menu", () => {
    const menu = document.createElement("ha-menu");
    document.body.appendChild(menu);

    const shadow = menu.shadowRoot!;
    const menuElement = shadow.querySelector(".menu");

    expect(menuElement?.getAttribute("role")).toBe("menu");
  });
});

describe("HaMenuItem", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should register custom element", () => {
    expect(customElements.get("ha-menu-item")).toBeDefined();
  });

  it("should render with default attributes", () => {
    const item = document.createElement("ha-menu-item");
    document.body.appendChild(item);

    expect(item.disabled).toBe(false);
    expect(item.danger).toBe(false);
  });

  it("should render with disabled state", () => {
    const item = document.createElement("ha-menu-item");
    item.disabled = true;
    document.body.appendChild(item);

    expect(item.disabled).toBe(true);
  });

  it("should render with danger state", () => {
    const item = document.createElement("ha-menu-item");
    item.danger = true;
    document.body.appendChild(item);

    expect(item.danger).toBe(true);
  });

  it("should have button part", () => {
    const item = document.createElement("ha-menu-item");
    document.body.appendChild(item);

    const shadow = item.shadowRoot!;
    const button = shadow.querySelector('[part="button"]');

    expect(button).not.toBeNull();
  });

  it("should have icon and content slots", () => {
    const item = document.createElement("ha-menu-item");
    document.body.appendChild(item);

    const shadow = item.shadowRoot!;
    const iconSlot = shadow.querySelector('slot[name="icon"]');
    const contentSlot = shadow.querySelector("slot:not([name])");

    expect(iconSlot).not.toBeNull();
    expect(contentSlot).not.toBeNull();
  });

  it("should have role menuitem", () => {
    const item = document.createElement("ha-menu-item");
    document.body.appendChild(item);

    const shadow = item.shadowRoot!;
    const menuItem = shadow.querySelector(".menu-item");

    expect(menuItem?.getAttribute("role")).toBe("menuitem");
  });

  it("should set aria-disabled when disabled", () => {
    const item = document.createElement("ha-menu-item");
    item.disabled = true;
    document.body.appendChild(item);

    const shadow = item.shadowRoot!;
    const menuItem = shadow.querySelector(".menu-item");

    expect(menuItem?.getAttribute("aria-disabled")).toBe("true");
  });

  it("should be a button element", () => {
    const item = document.createElement("ha-menu-item");
    document.body.appendChild(item);

    const shadow = item.shadowRoot!;
    const button = shadow.querySelector(".menu-item") as HTMLButtonElement;

    expect(button?.tagName).toBe("BUTTON");
    expect(button?.type).toBe("button");
  });

  it("should not emit click event when disabled", () => {
    const item = document.createElement("ha-menu-item");
    item.disabled = true;
    document.body.appendChild(item);

    const clickHandler = vi.fn();
    item.addEventListener("item-click", clickHandler);

    const shadow = item.shadowRoot!;
    const menuItem = shadow.querySelector(".menu-item") as HTMLElement;
    menuItem.click();

    expect(clickHandler).not.toHaveBeenCalled();
  });
});

describe("HaMenuDivider", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should register custom element", () => {
    expect(customElements.get("ha-menu-divider")).toBeDefined();
  });

  it("should have divider part", () => {
    const divider = document.createElement("ha-menu-divider");
    document.body.appendChild(divider);

    const shadow = divider.shadowRoot!;
    const dividerElement = shadow.querySelector('[part="divider"]');

    expect(dividerElement).not.toBeNull();
  });

  it("should have role separator", () => {
    const divider = document.createElement("ha-menu-divider");
    document.body.appendChild(divider);

    const shadow = divider.shadowRoot!;
    const dividerElement = shadow.querySelector(".divider");

    expect(dividerElement?.getAttribute("role")).toBe("separator");
  });
});
