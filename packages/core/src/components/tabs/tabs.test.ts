import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { HaTabs } from './tabs';
import { HaTabItem } from './tab-item';
import { HaTabPanel } from './tab-panel';

describe('HaTabs', () => {
  let tabs: HaTabs;

  beforeEach(() => {
    tabs = document.createElement('ha-tabs') as HaTabs;
    document.body.appendChild(tabs);
  });

  afterEach(() => {
    document.body.removeChild(tabs);
  });

  describe('Component Registration', () => {
    it('should be defined', () => {
      expect(customElements.get('ha-tabs')).toBeDefined();
    });

    it('should create an instance', () => {
      expect(tabs).toBeInstanceOf(HaTabs);
    });

    it('should have shadow root', () => {
      expect(tabs.shadowRoot).toBeTruthy();
    });
  });

  describe('Default Attributes', () => {
    it('should have default variant', () => {
      expect(tabs.variant).toBe('default');
    });

    it('should have default size', () => {
      expect(tabs.size).toBe('md');
    });

    it('should have default align', () => {
      expect(tabs.align).toBe('start');
    });
  });

  describe('Variant', () => {
    it('should support default variant', () => {
      tabs.variant = 'default';
      expect(tabs.variant).toBe('default');
    });

    it('should support outlined variant', () => {
      tabs.variant = 'outlined';
      expect(tabs.variant).toBe('outlined');
    });

    it('should support pills variant', () => {
      tabs.variant = 'pills';
      expect(tabs.variant).toBe('pills');
    });
  });

  describe('Size', () => {
    it('should support sm size', () => {
      tabs.size = 'sm';
      expect(tabs.size).toBe('sm');
    });

    it('should support md size', () => {
      tabs.size = 'md';
      expect(tabs.size).toBe('md');
    });

    it('should support lg size', () => {
      tabs.size = 'lg';
      expect(tabs.size).toBe('lg');
    });
  });

  describe('Alignment', () => {
    it('should support start alignment', () => {
      tabs.align = 'start';
      expect(tabs.align).toBe('start');
    });

    it('should support center alignment', () => {
      tabs.align = 'center';
      expect(tabs.align).toBe('center');
    });

    it('should support end alignment', () => {
      tabs.align = 'end';
      expect(tabs.align).toBe('end');
    });
  });

  describe('Value', () => {
    it('should set active tab value', () => {
      tabs.value = 'tab1';
      expect(tabs.value).toBe('tab1');
    });
  });


  describe('ARIA', () => {
    it('should have role tablist', () => {
      const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
      expect(tablist).toBeTruthy();
    });
  });

  describe('CSS Parts', () => {
    it('should expose container part', () => {
      const container = tabs.shadowRoot?.querySelector('[part="container"]');
      expect(container).toBeTruthy();
    });

    it('should expose list part', () => {
      const list = tabs.shadowRoot?.querySelector('[part="list"]');
      expect(list).toBeTruthy();
    });
  });
});

describe('HaTabItem', () => {
  let tabItem: HaTabItem;

  beforeEach(() => {
    tabItem = document.createElement('ha-tab-item') as HaTabItem;
    document.body.appendChild(tabItem);
  });

  afterEach(() => {
    document.body.removeChild(tabItem);
  });

  describe('Component Registration', () => {
    it('should be defined', () => {
      expect(customElements.get('ha-tab-item')).toBeDefined();
    });

    it('should create an instance', () => {
      expect(tabItem).toBeInstanceOf(HaTabItem);
    });
  });

  describe('Value', () => {
    it('should set value attribute', () => {
      tabItem.value = 'tab1';
      expect(tabItem.value).toBe('tab1');
    });
  });

  describe('Active State', () => {
    it('should be inactive by default', () => {
      expect(tabItem.active).toBe(false);
    });

    it('should set active state', () => {
      tabItem.active = true;
      expect(tabItem.active).toBe(true);
    });
  });

  describe('Disabled State', () => {
    it('should not be disabled by default', () => {
      expect(tabItem.disabled).toBe(false);
    });

    it('should set disabled state', () => {
      tabItem.disabled = true;
      expect(tabItem.disabled).toBe(true);
    });
  });

  describe('ARIA', () => {
    it('should have role tab', () => {
      const button = tabItem.shadowRoot?.querySelector('[role="tab"]');
      expect(button).toBeTruthy();
    });
  });
});

describe('HaTabPanel', () => {
  let tabPanel: HaTabPanel;

  beforeEach(() => {
    tabPanel = document.createElement('ha-tab-panel') as HaTabPanel;
    document.body.appendChild(tabPanel);
  });

  afterEach(() => {
    document.body.removeChild(tabPanel);
  });

  describe('Component Registration', () => {
    it('should be defined', () => {
      expect(customElements.get('ha-tab-panel')).toBeDefined();
    });

    it('should create an instance', () => {
      expect(tabPanel).toBeInstanceOf(HaTabPanel);
    });
  });

  describe('Value', () => {
    it('should set value attribute', () => {
      tabPanel.value = 'tab1';
      expect(tabPanel.value).toBe('tab1');
    });
  });

  describe('Active State', () => {
    it('should be inactive by default', () => {
      expect(tabPanel.active).toBe(false);
    });

    it('should set active state', () => {
      tabPanel.active = true;
      expect(tabPanel.active).toBe(true);
    });
  });

  describe('ARIA', () => {
    it('should have role tabpanel', () => {
      const panel = tabPanel.shadowRoot?.querySelector('[role="tabpanel"]');
      expect(panel).toBeTruthy();
    });
  });
});
