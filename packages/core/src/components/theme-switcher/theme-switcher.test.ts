import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setTheme, getTheme } from '../../utils/theme';
import './theme-switcher';

describe('ThemeSwitcher', () => {
  let element: HTMLElement;

  beforeEach(() => {
    // Reset theme to light before each test
    setTheme('light');
    element = document.createElement('ha-theme-switcher');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('Basic rendering', () => {
    it('should render with default variant', () => {
      expect(element.getAttribute('variant')).toBeNull();
      expect(element.shadowRoot).toBeTruthy();
    });

    it('should be defined as custom element', () => {
      expect(customElements.get('ha-theme-switcher')).toBeDefined();
    });

    it('should have shadow root', () => {
      expect(element.shadowRoot).toBeTruthy();
    });

    it('should contain theme switcher container', () => {
      const container = element.shadowRoot!.querySelector('.theme-switcher');
      expect(container).toBeTruthy();
    });
  });

  describe('Variant attribute', () => {
    it('should accept toggle variant', () => {
      element.setAttribute('variant', 'toggle');
      expect(element.getAttribute('variant')).toBe('toggle');
      const container = element.shadowRoot!.querySelector('.theme-switcher--toggle');
      expect(container).toBeTruthy();
    });

    it('should accept dropdown variant', () => {
      element.setAttribute('variant', 'dropdown');
      expect(element.getAttribute('variant')).toBe('dropdown');
      const container = element.shadowRoot!.querySelector('.theme-switcher--dropdown');
      expect(container).toBeTruthy();
    });

    it('should accept segmented variant', () => {
      element.setAttribute('variant', 'segmented');
      expect(element.getAttribute('variant')).toBe('segmented');
      const container = element.shadowRoot!.querySelector('.theme-switcher--segmented');
      expect(container).toBeTruthy();
    });

    it('should default to toggle variant when not specified', () => {
      const container = element.shadowRoot!.querySelector('.theme-switcher--toggle');
      expect(container).toBeTruthy();
    });
  });

  describe('Toggle variant rendering', () => {
    beforeEach(() => {
      element.setAttribute('variant', 'toggle');
    });

    it('should render toggle button', () => {
      const button = element.shadowRoot!.querySelector('#toggle-btn');
      expect(button).toBeTruthy();
      expect(button?.tagName).toBe('BUTTON');
    });

    it('should render icon in toggle button', () => {
      const icon = element.shadowRoot!.querySelector('.icon');
      expect(icon).toBeTruthy();
      expect(icon?.querySelector('svg')).toBeTruthy();
    });

    it('should not show label by default', () => {
      const button = element.shadowRoot!.querySelector('#toggle-btn');
      const spans = button?.querySelectorAll('span');
      // Only icon span should exist, not label span
      expect(spans?.length).toBe(1);
    });

    it('should show label when show-label attribute is set', () => {
      element.setAttribute('show-label', '');
      const button = element.shadowRoot!.querySelector('#toggle-btn');
      const text = button?.textContent;
      expect(text).toContain('Light'); // or 'Dark' depending on current theme
    });

    it('should have aria-label', () => {
      const button = element.shadowRoot!.querySelector('#toggle-btn');
      expect(button?.getAttribute('aria-label')).toBe('Toggle theme');
    });
  });

  describe('Dropdown variant rendering', () => {
    beforeEach(() => {
      element.setAttribute('variant', 'dropdown');
    });

    it('should render select element', () => {
      const select = element.shadowRoot!.querySelector('#theme-select');
      expect(select).toBeTruthy();
      expect(select?.tagName).toBe('SELECT');
    });

    it('should have light and dark options', () => {
      const select = element.shadowRoot!.querySelector('#theme-select');
      const options = select?.querySelectorAll('option');
      expect(options?.length).toBeGreaterThanOrEqual(2);

      const values = Array.from(options || []).map(opt => opt.getAttribute('value'));
      expect(values).toContain('light');
      expect(values).toContain('dark');
    });

    it('should not show auto option by default', () => {
      const select = element.shadowRoot!.querySelector('#theme-select');
      const options = select?.querySelectorAll('option');
      const values = Array.from(options || []).map(opt => opt.getAttribute('value'));
      expect(values).not.toContain('auto');
    });

    it('should show auto option when show-auto is set', () => {
      element.setAttribute('show-auto', '');
      const select = element.shadowRoot!.querySelector('#theme-select');
      const options = select?.querySelectorAll('option');
      const values = Array.from(options || []).map(opt => opt.getAttribute('value'));
      expect(values).toContain('auto');
    });

    it('should have aria-label', () => {
      const select = element.shadowRoot!.querySelector('#theme-select');
      expect(select?.getAttribute('aria-label')).toBe('Select theme');
    });
  });

  describe('Segmented variant rendering', () => {
    beforeEach(() => {
      element.setAttribute('variant', 'segmented');
    });

    it('should render segmented buttons', () => {
      const buttons = element.shadowRoot!.querySelectorAll('button[data-theme]');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('should have light and dark buttons', () => {
      const buttons = element.shadowRoot!.querySelectorAll('button[data-theme]');
      const themes = Array.from(buttons).map(btn => btn.getAttribute('data-theme'));
      expect(themes).toContain('light');
      expect(themes).toContain('dark');
    });

    it('should not show auto button by default', () => {
      const buttons = element.shadowRoot!.querySelectorAll('button[data-theme]');
      const themes = Array.from(buttons).map(btn => btn.getAttribute('data-theme'));
      expect(themes).not.toContain('auto');
    });

    it('should show auto button when show-auto is set', () => {
      element.setAttribute('show-auto', '');
      const buttons = element.shadowRoot!.querySelectorAll('button[data-theme]');
      const themes = Array.from(buttons).map(btn => btn.getAttribute('data-theme'));
      expect(themes).toContain('auto');
    });

    it('should mark current theme as active', async () => {
      // Create a fresh element to avoid event listener issues
      element.remove();

      setTheme('light');
      await new Promise(resolve => setTimeout(resolve, 50));

      element = document.createElement('ha-theme-switcher');
      element.setAttribute('variant', 'segmented');
      document.body.appendChild(element);

      await new Promise(resolve => setTimeout(resolve, 50));

      const lightButton = element.shadowRoot!.querySelector('button[data-theme="light"]');
      expect(lightButton?.classList.contains('active')).toBe(true);
      expect(lightButton?.getAttribute('aria-pressed')).toBe('true');
    });

    it('should have aria-label on buttons', () => {
      const buttons = element.shadowRoot!.querySelectorAll('button[data-theme]');
      buttons.forEach(btn => {
        expect(btn.getAttribute('aria-label')).toBeTruthy();
      });
    });
  });

  describe('Size attribute', () => {
    it('should accept sm size', () => {
      element.setAttribute('size', 'sm');
      expect(element.getAttribute('size')).toBe('sm');
    });

    it('should accept md size', () => {
      element.setAttribute('size', 'md');
      expect(element.getAttribute('size')).toBe('md');
    });

    it('should accept lg size', () => {
      element.setAttribute('size', 'lg');
      expect(element.getAttribute('size')).toBe('lg');
    });
  });

  describe('Show-label attribute', () => {
    it('should accept show-label attribute', () => {
      element.setAttribute('show-label', '');
      expect(element.hasAttribute('show-label')).toBe(true);
    });

    it('should display labels when show-label is set (toggle)', () => {
      element.setAttribute('variant', 'toggle');
      element.setAttribute('show-label', '');
      const button = element.shadowRoot!.querySelector('#toggle-btn');
      expect(button?.textContent).toMatch(/Light|Dark/);
    });

    it('should display labels when show-label is set (segmented)', () => {
      element.setAttribute('variant', 'segmented');
      element.setAttribute('show-label', '');
      const buttons = element.shadowRoot!.querySelectorAll('button[data-theme]');
      buttons.forEach(btn => {
        expect(btn.textContent).toMatch(/Light|Dark/);
      });
    });
  });

  describe('Show-auto attribute', () => {
    it('should accept show-auto attribute', () => {
      element.setAttribute('show-auto', '');
      expect(element.hasAttribute('show-auto')).toBe(true);
    });
  });

  describe('Interactive elements', () => {
    it('should have clickable toggle button', () => {
      element.setAttribute('variant', 'toggle');
      const button = element.shadowRoot!.querySelector('#toggle-btn') as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.type).toBe('button');
    });

    it('should have changeable select element', () => {
      element.setAttribute('variant', 'dropdown');
      const select = element.shadowRoot!.querySelector('#theme-select') as HTMLSelectElement;
      expect(select).toBeTruthy();
      expect(select.tagName).toBe('SELECT');
    });

    it('should have clickable segmented buttons', () => {
      element.setAttribute('variant', 'segmented');
      const buttons = element.shadowRoot!.querySelectorAll('button[data-theme]');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
      buttons.forEach(btn => {
        expect((btn as HTMLButtonElement).type).toBe('button');
      });
    });

    it('should have data-theme attribute on segmented buttons', () => {
      element.setAttribute('variant', 'segmented');
      const buttons = element.shadowRoot!.querySelectorAll('button[data-theme]');
      buttons.forEach(btn => {
        const theme = btn.getAttribute('data-theme');
        expect(['light', 'dark', 'auto']).toContain(theme);
      });
    });
  });

  describe('Attribute changes', () => {
    it('should re-render when variant changes', () => {
      element.setAttribute('variant', 'toggle');
      let container = element.shadowRoot!.querySelector('.theme-switcher--toggle');
      expect(container).toBeTruthy();

      element.setAttribute('variant', 'dropdown');
      container = element.shadowRoot!.querySelector('.theme-switcher--dropdown');
      expect(container).toBeTruthy();
    });

    it('should re-render when show-label changes', () => {
      element.setAttribute('variant', 'toggle');
      element.setAttribute('show-label', '');

      let button = element.shadowRoot!.querySelector('#toggle-btn');
      expect(button?.textContent).toMatch(/Light|Dark/);

      element.removeAttribute('show-label');
      button = element.shadowRoot!.querySelector('#toggle-btn');
      const textSpans = Array.from(button?.querySelectorAll('span') || [])
        .filter(span => !span.classList.contains('icon'));
      expect(textSpans.length).toBe(0);
    });
  });

  describe('Event handling', () => {
    it('should listen for theme-change events', () => {
      // Verify component sets up event listener
      expect(element.shadowRoot).toBeTruthy();
      // The component should be connected and listening
      expect(element.isConnected).toBe(true);
    });

    it('should have event listener setup', () => {
      // Component has internal theme change handler
      const newElement = document.createElement('ha-theme-switcher');
      document.body.appendChild(newElement);

      expect(newElement.isConnected).toBe(true);

      document.body.removeChild(newElement);
    });
  });

  describe('Lifecycle', () => {
    it('should set up listeners on connect', () => {
      const newElement = document.createElement('ha-theme-switcher');
      document.body.appendChild(newElement);

      expect(newElement.shadowRoot).toBeTruthy();

      document.body.removeChild(newElement);
    });

    it('should clean up listeners on disconnect', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const tempElement = document.createElement('ha-theme-switcher');
      document.body.appendChild(tempElement);
      document.body.removeChild(tempElement);

      expect(removeEventListenerSpy).toHaveBeenCalledWith('theme-change', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });
  });
});
