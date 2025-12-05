import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HaTabs } from "./tabs";
import { HaTabItem } from "./tab-item";
import { HaTabPanel } from "./tab-panel";

describe("HaTabs", () => {
  let tabs: HaTabs;

  beforeEach(() => {
    tabs = document.createElement("ha-tabs") as HaTabs;
    document.body.appendChild(tabs);
  });

  afterEach(() => {
    document.body.removeChild(tabs);
  });

  describe("Component Registration", () => {
    it("should be defined", () => {
      expect(customElements.get("ha-tabs")).toBeDefined();
    });

    it("should create an instance", () => {
      expect(tabs).toBeInstanceOf(HaTabs);
    });

    it("should have shadow root", () => {
      expect(tabs.shadowRoot).toBeTruthy();
    });
  });

  describe("Default Attributes", () => {
    it("should have default variant", () => {
      expect(tabs.variant).toBe("default");
    });

    it("should have default size", () => {
      expect(tabs.size).toBe("md");
    });

    it("should have default align", () => {
      expect(tabs.align).toBe("start");
    });
  });

  describe("Variant", () => {
    it("should support default variant", () => {
      tabs.variant = "default";
      expect(tabs.variant).toBe("default");
    });

    it("should support outlined variant", () => {
      tabs.variant = "outlined";
      expect(tabs.variant).toBe("outlined");
    });

    it("should support pills variant", () => {
      tabs.variant = "pills";
      expect(tabs.variant).toBe("pills");
    });
  });

  describe("Size", () => {
    it("should support sm size", () => {
      tabs.size = "sm";
      expect(tabs.size).toBe("sm");
    });

    it("should support md size", () => {
      tabs.size = "md";
      expect(tabs.size).toBe("md");
    });

    it("should support lg size", () => {
      tabs.size = "lg";
      expect(tabs.size).toBe("lg");
    });
  });

  describe("Alignment", () => {
    it("should support start alignment", () => {
      tabs.align = "start";
      expect(tabs.align).toBe("start");
    });

    it("should support center alignment", () => {
      tabs.align = "center";
      expect(tabs.align).toBe("center");
    });

    it("should support end alignment", () => {
      tabs.align = "end";
      expect(tabs.align).toBe("end");
    });
  });

  describe("Value", () => {
    it("should set active tab value", () => {
      tabs.value = "tab1";
      expect(tabs.value).toBe("tab1");
    });
  });

  describe("ARIA", () => {
    it("should have role tablist", () => {
      const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
      expect(tablist).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    it("should expose container part", () => {
      const container = tabs.shadowRoot?.querySelector('[part="container"]');
      expect(container).toBeTruthy();
    });

    it("should expose list part", () => {
      const list = tabs.shadowRoot?.querySelector('[part="list"]');
      expect(list).toBeTruthy();
    });
  });
});

describe("HaTabItem", () => {
  let tabItem: HaTabItem;

  beforeEach(() => {
    tabItem = document.createElement("ha-tab-item") as HaTabItem;
    document.body.appendChild(tabItem);
  });

  afterEach(() => {
    document.body.removeChild(tabItem);
  });

  describe("Component Registration", () => {
    it("should be defined", () => {
      expect(customElements.get("ha-tab-item")).toBeDefined();
    });

    it("should create an instance", () => {
      expect(tabItem).toBeInstanceOf(HaTabItem);
    });
  });

  describe("Value", () => {
    it("should set value attribute", () => {
      tabItem.value = "tab1";
      expect(tabItem.value).toBe("tab1");
    });
  });

  describe("Active State", () => {
    it("should be inactive by default", () => {
      expect(tabItem.active).toBe(false);
    });

    it("should set active state", () => {
      tabItem.active = true;
      expect(tabItem.active).toBe(true);
    });
  });

  describe("Disabled State", () => {
    it("should not be disabled by default", () => {
      expect(tabItem.disabled).toBe(false);
    });

    it("should set disabled state", () => {
      tabItem.disabled = true;
      expect(tabItem.disabled).toBe(true);
    });
  });

  describe("ARIA", () => {
    it("should have role tab", () => {
      const button = tabItem.shadowRoot?.querySelector('[role="tab"]');
      expect(button).toBeTruthy();
    });
  });
});

describe("HaTabPanel", () => {
  let tabPanel: HaTabPanel;

  beforeEach(() => {
    tabPanel = document.createElement("ha-tab-panel") as HaTabPanel;
    document.body.appendChild(tabPanel);
  });

  afterEach(() => {
    document.body.removeChild(tabPanel);
  });

  describe("Component Registration", () => {
    it("should be defined", () => {
      expect(customElements.get("ha-tab-panel")).toBeDefined();
    });

    it("should create an instance", () => {
      expect(tabPanel).toBeInstanceOf(HaTabPanel);
    });
  });

  describe("Value", () => {
    it("should set value attribute", () => {
      tabPanel.value = "tab1";
      expect(tabPanel.value).toBe("tab1");
    });
  });

  describe("Active State", () => {
    it("should be inactive by default", () => {
      expect(tabPanel.active).toBe(false);
    });

    it("should set active state", () => {
      tabPanel.active = true;
      expect(tabPanel.active).toBe(true);
    });
  });

  describe("ARIA", () => {
    it("should have role tabpanel", () => {
      const panel = tabPanel.shadowRoot?.querySelector('[role="tabpanel"]');
      expect(panel).toBeTruthy();
    });
  });
});

describe("Tabs Interaction", () => {
  let tabs: HaTabs;
  let item1: HaTabItem;
  let item2: HaTabItem;
  let panel1: HaTabPanel;
  let panel2: HaTabPanel;

  beforeEach(async () => {
    document.body.innerHTML = `
      <ha-tabs value="tab1">
        <ha-tab-item value="tab1">Tab 1</ha-tab-item>
        <ha-tab-item value="tab2">Tab 2</ha-tab-item>
      </ha-tabs>
      <ha-tab-panel value="tab1">Panel 1</ha-tab-panel>
      <ha-tab-panel value="tab2">Panel 2</ha-tab-panel>
    `;
    tabs = document.querySelector("ha-tabs") as HaTabs;
    item1 = document.querySelector('ha-tab-item[value="tab1"]') as HaTabItem;
    item2 = document.querySelector('ha-tab-item[value="tab2"]') as HaTabItem;
    panel1 = document.querySelector('ha-tab-panel[value="tab1"]') as HaTabPanel;
    panel2 = document.querySelector('ha-tab-panel[value="tab2"]') as HaTabPanel;
    
    (tabs as any).updatePanels();
    await new Promise(resolve => setTimeout(resolve, 10));
  });
  
  it("should activate the correct tab and panel based on value", () => {
    expect(item1.active).toBe(true);
    expect(panel1.active).toBe(true);
    expect(item2.active).toBe(false);
    expect(panel2.active).toBe(false);
  });
  
  it("should switch tab and panel on click", async () => {
    const changeHandler = vi.fn();
    tabs.addEventListener("tab-change", changeHandler);

    const item2Button = item2.shadowRoot?.querySelector('button');
    (item2Button as HTMLElement)?.click();
    
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(tabs.value).toBe("tab2");
    expect(item1.active).toBe(false);
    expect(panel1.active).toBe(false);
    expect(item2.active).toBe(true);
    expect(panel2.active).toBe(true);
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler.mock.calls[0][0].detail.value).toBe("tab2");
  });
  
  it("should switch tab on ArrowRight keydown", async () => {
    item1.focus();
    tabs.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(tabs.value).toBe("tab2");
    expect(document.activeElement).toBe(item2);
  });
  
  it("should switch tab on ArrowLeft keydown", async () => {
    tabs.value = "tab2";
    await new Promise(resolve => setTimeout(resolve, 10));
    item2.focus();
    tabs.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(tabs.value).toBe("tab1");
    expect(document.activeElement).toBe(item1);
  });
  
  it("should select first tab on Home key", async () => {
    tabs.value = "tab2";
    await new Promise(resolve => setTimeout(resolve, 10));
    item2.focus();
    tabs.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(tabs.value).toBe("tab1");
    expect(document.activeElement).toBe(item1);
  });
  
  it("should select last tab on End key", async () => {
    item1.focus();
    tabs.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
    
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(tabs.value).toBe("tab2");
    expect(document.activeElement).toBe(item2);
  });

  it("should activate first enabled tab if no value is set", async () => {
      document.body.innerHTML = `
        <ha-tabs>
            <ha-tab-item value="tab1" disabled>Tab 1</ha-tab-item>
            <ha-tab-item value="tab2">Tab 2</ha-tab-item>
        </ha-tabs>
      `;
      const newTabs = document.querySelector("ha-tabs") as HaTabs;
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(newTabs.value).toBe("tab2");
  });
});
