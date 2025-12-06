import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  FocusTrap,
  KeyboardNavigationManager,
  TypeaheadManager,
  setAriaAttributes,
  generateId,
  announceToScreenReader,
  isElementVisible,
  getAccessibleName,
  prefersReducedMotion,
} from './accessibility';

describe('FocusTrap', () => {
  let container: HTMLElement;
  let focusTrap: FocusTrap;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <button id="btn1">Button 1</button>
      <input id="input1" type="text" />
      <a id="link1" href="#">Link 1</a>
      <button id="btn2">Button 2</button>
    `;
    document.body.appendChild(container);
    focusTrap = new FocusTrap(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should focus first element when activated', () => {
    focusTrap.activate();
    expect(document.activeElement?.id).toBe('btn1');
  });

  it('should trap Tab key within container', () => {
    focusTrap.activate();

    const lastButton = document.getElementById('btn2') as HTMLButtonElement;
    lastButton.focus();

    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
    });
    container.dispatchEvent(tabEvent);

    // Should cycle back to first element
    expect(document.activeElement?.id).toBe('btn1');
  });

  it('should restore focus when deactivated', () => {
    const externalButton = document.createElement('button');
    externalButton.id = 'external';
    document.body.appendChild(externalButton);
    externalButton.focus();

    focusTrap.activate();
    expect(document.activeElement?.id).toBe('btn1');

    focusTrap.deactivate();
    expect(document.activeElement?.id).toBe('external');

    document.body.removeChild(externalButton);
  });
});

describe('KeyboardNavigationManager', () => {
  let items: HTMLElement[];
  let manager: KeyboardNavigationManager;

  beforeEach(() => {
    items = [
      createItem('item1', 'Item 1'),
      createItem('item2', 'Item 2'),
      createItem('item3', 'Item 3'),
    ];
    manager = new KeyboardNavigationManager(items);
  });

  function createItem(id: string, text: string): HTMLElement {
    const item = document.createElement('div');
    item.id = id;
    item.textContent = text;
    item.tabIndex = 0;
    return item;
  }

  it('should navigate to next item on ArrowDown', () => {
    manager.setActiveIndex(0);
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    manager.handleKeyDown(event);
    expect(manager.getCurrentIndex()).toBe(1);
  });

  it('should navigate to previous item on ArrowUp', () => {
    manager.setActiveIndex(2);
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    manager.handleKeyDown(event);
    expect(manager.getCurrentIndex()).toBe(1);
  });

  it('should navigate to first item on Home', () => {
    manager.setActiveIndex(2);
    const event = new KeyboardEvent('keydown', { key: 'Home' });
    manager.handleKeyDown(event);
    expect(manager.getCurrentIndex()).toBe(0);
  });

  it('should navigate to last item on End', () => {
    manager.setActiveIndex(0);
    const event = new KeyboardEvent('keydown', { key: 'End' });
    manager.handleKeyDown(event);
    expect(manager.getCurrentIndex()).toBe(2);
  });

  it('should loop from last to first when loop enabled', () => {
    manager.setActiveIndex(2);
    manager.next();
    expect(manager.getCurrentIndex()).toBe(0);
  });

  it('should not loop when loop disabled', () => {
    manager = new KeyboardNavigationManager(items, { loop: false });
    manager.setActiveIndex(2);
    manager.next();
    expect(manager.getCurrentIndex()).toBe(2);
  });

  it('should call onSelect when Enter pressed', () => {
    const onSelect = vi.fn();
    manager = new KeyboardNavigationManager(items, { onSelect });
    manager.setActiveIndex(1);

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    manager.handleKeyDown(event);

    expect(onSelect).toHaveBeenCalledWith(items[1], 1);
  });
});

describe('TypeaheadManager', () => {
  let items: HTMLElement[];
  let manager: TypeaheadManager;

  beforeEach(() => {
    items = [
      createItem('Apple'),
      createItem('Banana'),
      createItem('Cherry'),
      createItem('Date'),
    ];
    manager = new TypeaheadManager(items);
  });

  function createItem(text: string): HTMLElement {
    const item = document.createElement('div');
    item.textContent = text;
    return item;
  }

  it('should find match for single character', () => {
    const onMatch = vi.fn();
    manager = new TypeaheadManager(items, { onMatch });

    manager.handleKeyPress('b');

    expect(onMatch).toHaveBeenCalledWith(items[1], 1);
  });

  it('should find match for multiple characters', () => {
    const onMatch = vi.fn();
    manager = new TypeaheadManager(items, { onMatch });

    manager.handleKeyPress('c');
    manager.handleKeyPress('h');

    expect(onMatch).toHaveBeenCalledWith(items[2], 2);
  });

  it('should clear search string after timeout', async () => {
    const onMatch = vi.fn();
    manager = new TypeaheadManager(items, {
      onMatch,
      timeoutDuration: 100,
    });

    manager.handleKeyPress('b');
    expect(onMatch).toHaveBeenCalledTimes(1);

    await new Promise((resolve) => setTimeout(resolve, 150));

    manager.handleKeyPress('c');
    expect(onMatch).toHaveBeenCalledWith(items[2], 2);
  });
});

describe('setAriaAttributes', () => {
  it('should set multiple ARIA attributes', () => {
    const element = document.createElement('div');

    setAriaAttributes(element, {
      'aria-label': 'Test Label',
      'aria-expanded': true,
      'aria-level': 2,
    });

    expect(element.getAttribute('aria-label')).toBe('Test Label');
    expect(element.getAttribute('aria-expanded')).toBe('true');
    expect(element.getAttribute('aria-level')).toBe('2');
  });

  it('should remove attribute when value is null', () => {
    const element = document.createElement('div');
    element.setAttribute('aria-label', 'Test');

    setAriaAttributes(element, {
      'aria-label': null,
    });

    expect(element.hasAttribute('aria-label')).toBe(false);
  });
});

describe('generateId', () => {
  it('should generate unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();

    expect(id1).not.toBe(id2);
  });

  it('should use custom prefix', () => {
    const id = generateId('custom');
    expect(id.startsWith('custom-')).toBe(true);
  });
});

describe('announceToScreenReader', () => {
  it('should create live region with message', () => {
    announceToScreenReader('Test message');

    const liveRegion = document.querySelector('[aria-live]');
    expect(liveRegion).toBeTruthy();
    expect(liveRegion?.textContent).toBe('Test message');
  });

  it('should use assertive priority', () => {
    announceToScreenReader('Urgent message', 'assertive');

    const liveRegion = document.querySelector('[aria-live="assertive"]');
    expect(liveRegion).toBeTruthy();
  });

  it('should remove live region after timeout', async () => {
    announceToScreenReader('Test message');

    expect(document.querySelector('[aria-live]')).toBeTruthy();

    await new Promise((resolve) => setTimeout(resolve, 1100));

    expect(document.querySelector('[aria-live]')).toBeFalsy();
  });
});

describe('isElementVisible', () => {
  it('should return true for visible element', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    element.style.height = '100px';
    document.body.appendChild(element);

    expect(isElementVisible(element)).toBe(true);

    document.body.removeChild(element);
  });

  // Note: This test is skipped because JSDOM doesn't accurately calculate
  // offsetWidth/offsetHeight for elements with display:none or visibility:hidden
  it.skip('should return false for hidden element', () => {
    const element = document.createElement('div');
    element.style.display = 'none';
    document.body.appendChild(element);

    expect(isElementVisible(element)).toBe(false);

    document.body.removeChild(element);
  });
});

describe('getAccessibleName', () => {
  it('should return aria-label', () => {
    const element = document.createElement('button');
    element.setAttribute('aria-label', 'Close');

    expect(getAccessibleName(element)).toBe('Close');
  });

  it('should return labelledby text', () => {
    const label = document.createElement('span');
    label.id = 'label1';
    label.textContent = 'Username';
    document.body.appendChild(label);

    const element = document.createElement('input');
    element.setAttribute('aria-labelledby', 'label1');

    expect(getAccessibleName(element)).toBe('Username');

    document.body.removeChild(label);
  });

  it('should return associated label text', () => {
    const label = document.createElement('label');
    label.setAttribute('for', 'input1');
    label.textContent = 'Email';
    document.body.appendChild(label);

    const input = document.createElement('input');
    input.id = 'input1';
    document.body.appendChild(input);

    expect(getAccessibleName(input)).toBe('Email');

    document.body.removeChild(label);
    document.body.removeChild(input);
  });

  it('should fallback to text content', () => {
    const element = document.createElement('button');
    element.textContent = 'Submit';

    expect(getAccessibleName(element)).toBe('Submit');
  });
});

describe('prefersReducedMotion', () => {
  it('should check media query', () => {
    const result = prefersReducedMotion();
    expect(typeof result).toBe('boolean');
  });
});
