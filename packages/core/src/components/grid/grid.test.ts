import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { waitForCustomElement, queryShadow } from '../../../vitest.setup';
import { HaGrid } from './grid';

describe('HaGrid', () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get('ha-grid')) {
      customElements.define('ha-grid', HaGrid);
    }
    await waitForCustomElement('ha-grid');
  });

  describe('Component Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ha-grid')).toBe(HaGrid);
    });

    it('should create an instance', () => {
      const grid = document.createElement('ha-grid') as HaGrid;
      expect(grid).toBeInstanceOf(HaGrid);
      expect(grid).toBeInstanceOf(HTMLElement);
    });

    it('should render with shadow DOM', () => {
      const grid = document.createElement('ha-grid') as HaGrid;
      document.body.appendChild(grid);
      expect(grid.shadowRoot).not.toBeNull();
      document.body.removeChild(grid);
    });
  });

  describe('Attributes and Properties', () => {
    let grid: HaGrid;

    beforeEach(() => {
      grid = document.createElement('ha-grid') as HaGrid;
      document.body.appendChild(grid);
    });

    afterEach(() => {
      document.body.removeChild(grid);
    });

    it('should have default columns as 12', () => {
      expect(grid.columns).toBe('12');
    });

    it('should have default gap as 4', () => {
      expect(grid.gap).toBe('4');
    });

    it('should update columns property', () => {
      grid.columns = '6';
      expect(grid.columns).toBe('6');
      expect(grid.getAttribute('columns')).toBe('6');
    });

    it('should update columns attribute', () => {
      grid.setAttribute('columns', '3');
      expect(grid.columns).toBe('3');
    });

    it('should update gap property', () => {
      grid.gap = '8';
      expect(grid.gap).toBe('8');
      expect(grid.getAttribute('gap')).toBe('8');
    });

    it('should update gap attribute', () => {
      grid.setAttribute('gap', '2');
      expect(grid.gap).toBe('2');
    });

    it('should update rowGap property', () => {
      grid.rowGap = '6';
      expect(grid.rowGap).toBe('6');
      expect(grid.getAttribute('row-gap')).toBe('6');
    });

    it('should update rowGap attribute', () => {
      grid.setAttribute('row-gap', '4');
      expect(grid.rowGap).toBe('4');
    });

    it('should remove rowGap when set to null', () => {
      grid.rowGap = '6';
      grid.rowGap = null;
      expect(grid.rowGap).toBeNull();
      expect(grid.hasAttribute('row-gap')).toBe(false);
    });

    it('should update columnGap property', () => {
      grid.columnGap = '6';
      expect(grid.columnGap).toBe('6');
      expect(grid.getAttribute('column-gap')).toBe('6');
    });

    it('should update columnGap attribute', () => {
      grid.setAttribute('column-gap', '4');
      expect(grid.columnGap).toBe('4');
    });

    it('should remove columnGap when set to null', () => {
      grid.columnGap = '6';
      grid.columnGap = null;
      expect(grid.columnGap).toBeNull();
      expect(grid.hasAttribute('column-gap')).toBe(false);
    });

    it('should update alignItems property', () => {
      grid.alignItems = 'center';
      expect(grid.alignItems).toBe('center');
      expect(grid.getAttribute('align-items')).toBe('center');
    });

    it('should update alignItems attribute', () => {
      grid.setAttribute('align-items', 'start');
      expect(grid.alignItems).toBe('start');
    });

    it('should remove alignItems when set to null', () => {
      grid.alignItems = 'center';
      grid.alignItems = null;
      expect(grid.alignItems).toBeNull();
      expect(grid.hasAttribute('align-items')).toBe(false);
    });

    it('should update justifyItems property', () => {
      grid.justifyItems = 'center';
      expect(grid.justifyItems).toBe('center');
      expect(grid.getAttribute('justify-items')).toBe('center');
    });

    it('should update justifyItems attribute', () => {
      grid.setAttribute('justify-items', 'start');
      expect(grid.justifyItems).toBe('start');
    });

    it('should remove justifyItems when set to null', () => {
      grid.justifyItems = 'center';
      grid.justifyItems = null;
      expect(grid.justifyItems).toBeNull();
      expect(grid.hasAttribute('justify-items')).toBe(false);
    });
  });

  describe('Column Variants', () => {
    let grid: HaGrid;

    beforeEach(() => {
      grid = document.createElement('ha-grid') as HaGrid;
      document.body.appendChild(grid);
    });

    afterEach(() => {
      document.body.removeChild(grid);
    });

    it('should support numeric column values', () => {
      for (let i = 1; i <= 12; i++) {
        grid.columns = String(i);
        expect(grid.getAttribute('columns')).toBe(String(i));
      }
    });

    it('should support auto-fit columns', () => {
      grid.columns = 'auto-fit';
      expect(grid.getAttribute('columns')).toBe('auto-fit');
    });

    it('should support auto-fill columns', () => {
      grid.columns = 'auto-fill';
      expect(grid.getAttribute('columns')).toBe('auto-fill');
    });
  });

  describe('Alignment Variants', () => {
    let grid: HaGrid;

    beforeEach(() => {
      grid = document.createElement('ha-grid') as HaGrid;
      document.body.appendChild(grid);
    });

    afterEach(() => {
      document.body.removeChild(grid);
    });

    it('should support align-items values', () => {
      const values = ['start', 'center', 'end', 'stretch'];
      values.forEach((value) => {
        grid.alignItems = value;
        expect(grid.getAttribute('align-items')).toBe(value);
      });
    });

    it('should support justify-items values', () => {
      const values = ['start', 'center', 'end', 'stretch'];
      values.forEach((value) => {
        grid.justifyItems = value;
        expect(grid.getAttribute('justify-items')).toBe(value);
      });
    });
  });

  describe('Shadow DOM Structure', () => {
    let grid: HaGrid;

    beforeEach(() => {
      grid = document.createElement('ha-grid') as HaGrid;
      document.body.appendChild(grid);
    });

    afterEach(() => {
      document.body.removeChild(grid);
    });

    it('should have a grid div with part attribute', () => {
      const gridDiv = queryShadow(grid, '[part="grid"]') as HTMLDivElement;
      expect(gridDiv).toBeTruthy();
      expect(gridDiv.tagName).toBe('DIV');
    });

    it('should have a slot element', () => {
      const slot = queryShadow(grid, 'slot');
      expect(slot).toBeTruthy();
    });

    it('should render slotted content', () => {
      const content = document.createElement('div');
      content.textContent = 'Grid item';
      grid.appendChild(content);

      // Wait for slot assignment
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(grid.textContent).toContain('Grid item');
          resolve(undefined);
        }, 0);
      });
    });

    it('should apply display grid to grid element', () => {
      const gridDiv = queryShadow(grid, '[part="grid"]') as HTMLDivElement;
      const computedStyle = window.getComputedStyle(gridDiv);
      expect(computedStyle.display).toBe('grid');
    });
  });

  describe('Grid Styles', () => {
    let grid: HaGrid;

    beforeEach(() => {
      grid = document.createElement('ha-grid') as HaGrid;
      document.body.appendChild(grid);
    });

    afterEach(() => {
      document.body.removeChild(grid);
    });

    it('should apply grid-template-columns based on columns attribute', () => {
      grid.columns = '3';
      const gridDiv = queryShadow(grid, '[part="grid"]') as HTMLDivElement;
      expect(gridDiv.style.gridTemplateColumns).toBe(
        'repeat(3, minmax(0, 1fr))'
      );
    });

    it('should apply gap based on gap attribute', () => {
      grid.gap = '8';
      const gridDiv = queryShadow(grid, '[part="grid"]') as HTMLDivElement;
      expect(gridDiv.style.gap).toContain('spacing-8');
    });

    it('should apply row-gap when specified', () => {
      grid.rowGap = '6';
      const gridDiv = queryShadow(grid, '[part="grid"]') as HTMLDivElement;
      expect(gridDiv.style.rowGap).toContain('spacing-6');
    });

    it('should apply column-gap when specified', () => {
      grid.columnGap = '6';
      const gridDiv = queryShadow(grid, '[part="grid"]') as HTMLDivElement;
      expect(gridDiv.style.columnGap).toContain('spacing-6');
    });
  });

  describe('Accessibility', () => {
    let grid: HaGrid;

    beforeEach(() => {
      grid = document.createElement('ha-grid') as HaGrid;
      document.body.appendChild(grid);
    });

    afterEach(() => {
      document.body.removeChild(grid);
    });

    it('should be accessible as a generic layout container', () => {
      // Grid should not have specific ARIA roles
      // It's a layout component
      expect(grid.getAttribute('role')).toBeNull();
    });
  });
});
