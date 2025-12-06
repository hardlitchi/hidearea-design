/**
 * Accessibility Utilities
 * Helper functions for implementing WCAG 2.1 AA compliant components
 */

/**
 * Focus Trap
 * Traps keyboard focus within a container element (useful for modals, drawers)
 */
export class FocusTrap {
  private container: HTMLElement;
  private firstFocusableElement: HTMLElement | null = null;
  private lastFocusableElement: HTMLElement | null = null;
  private previousActiveElement: HTMLElement | null = null;
  private boundHandleKeyDown: (e: KeyboardEvent) => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Get all focusable elements within the container
   */
  private getFocusableElements(): HTMLElement[] {
    const selectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])',
    ].join(',');

    const elements = Array.from(
      this.container.querySelectorAll<HTMLElement>(selectors)
    );

    return elements.filter((el) => {
      return (
        el.offsetParent !== null &&
        !el.hasAttribute('aria-hidden') &&
        el.getAttribute('tabindex') !== '-1'
      );
    });
  }

  /**
   * Handle Tab key navigation to trap focus
   */
  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    this.firstFocusableElement = focusableElements[0];
    this.lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusableElement) {
        this.lastFocusableElement?.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusableElement) {
        this.firstFocusableElement?.focus();
        e.preventDefault();
      }
    }
  }

  /**
   * Activate the focus trap
   */
  activate(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    const focusableElements = this.getFocusableElements();

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    this.container.addEventListener('keydown', this.boundHandleKeyDown);
  }

  /**
   * Deactivate the focus trap and restore previous focus
   */
  deactivate(): void {
    this.container.removeEventListener('keydown', this.boundHandleKeyDown);

    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }
}

/**
 * Keyboard Navigation Helper
 * Manages keyboard navigation for list-based components (select, menu, listbox)
 */
export class KeyboardNavigationManager {
  private items: HTMLElement[];
  private currentIndex: number = -1;
  private orientation: 'horizontal' | 'vertical';
  private loop: boolean;
  private onSelect?: (item: HTMLElement, index: number) => void;

  constructor(
    items: HTMLElement[],
    options: {
      orientation?: 'horizontal' | 'vertical';
      loop?: boolean;
      initialIndex?: number;
      onSelect?: (item: HTMLElement, index: number) => void;
    } = {}
  ) {
    this.items = items;
    this.orientation = options.orientation || 'vertical';
    this.loop = options.loop !== undefined ? options.loop : true;
    this.currentIndex = options.initialIndex || -1;
    this.onSelect = options.onSelect;
  }

  /**
   * Handle keyboard events
   */
  handleKeyDown(e: KeyboardEvent): boolean {
    const { key } = e;
    let handled = false;

    switch (key) {
      case 'ArrowDown':
        if (this.orientation === 'vertical') {
          this.next();
          handled = true;
        }
        break;

      case 'ArrowUp':
        if (this.orientation === 'vertical') {
          this.previous();
          handled = true;
        }
        break;

      case 'ArrowRight':
        if (this.orientation === 'horizontal') {
          this.next();
          handled = true;
        }
        break;

      case 'ArrowLeft':
        if (this.orientation === 'horizontal') {
          this.previous();
          handled = true;
        }
        break;

      case 'Home':
        this.first();
        handled = true;
        break;

      case 'End':
        this.last();
        handled = true;
        break;

      case 'Enter':
      case ' ':
        if (this.currentIndex >= 0 && this.currentIndex < this.items.length) {
          this.select(this.currentIndex);
          handled = true;
        }
        break;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }

    return handled;
  }

  /**
   * Navigate to next item
   */
  next(): void {
    if (this.items.length === 0) return;

    let nextIndex = this.currentIndex + 1;

    if (nextIndex >= this.items.length) {
      nextIndex = this.loop ? 0 : this.items.length - 1;
    }

    this.setActiveIndex(nextIndex);
  }

  /**
   * Navigate to previous item
   */
  previous(): void {
    if (this.items.length === 0) return;

    let prevIndex = this.currentIndex - 1;

    if (prevIndex < 0) {
      prevIndex = this.loop ? this.items.length - 1 : 0;
    }

    this.setActiveIndex(prevIndex);
  }

  /**
   * Navigate to first item
   */
  first(): void {
    if (this.items.length > 0) {
      this.setActiveIndex(0);
    }
  }

  /**
   * Navigate to last item
   */
  last(): void {
    if (this.items.length > 0) {
      this.setActiveIndex(this.items.length - 1);
    }
  }

  /**
   * Select current item
   */
  select(index: number): void {
    if (index >= 0 && index < this.items.length) {
      const item = this.items[index];
      if (this.onSelect) {
        this.onSelect(item, index);
      }
    }
  }

  /**
   * Set active index and focus
   */
  setActiveIndex(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.currentIndex = index;
      const item = this.items[index];

      // Update aria-activedescendant if needed
      this.updateActiveDescendant(item);

      // Focus the item or scroll it into view
      if (item.hasAttribute('tabindex')) {
        item.focus();
      } else {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  /**
   * Update aria-activedescendant attribute
   */
  private updateActiveDescendant(item: HTMLElement): void {
    const container = item.parentElement;
    if (!container) return;

    const itemId = item.id || this.ensureId(item);
    container.setAttribute('aria-activedescendant', itemId);
  }

  /**
   * Ensure element has an ID
   */
  private ensureId(element: HTMLElement): string {
    if (!element.id) {
      element.id = `item-${Math.random().toString(36).substr(2, 9)}`;
    }
    return element.id;
  }

  /**
   * Update items
   */
  updateItems(items: HTMLElement[]): void {
    this.items = items;
    if (this.currentIndex >= items.length) {
      this.currentIndex = items.length - 1;
    }
  }

  /**
   * Get current index
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }
}

/**
 * Typeahead Helper
 * For quick character-based navigation in lists
 */
export class TypeaheadManager {
  private items: HTMLElement[];
  private searchString: string = '';
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;
  private timeoutDuration: number = 500;
  private onMatch?: (item: HTMLElement, index: number) => void;

  constructor(
    items: HTMLElement[],
    options: {
      timeoutDuration?: number;
      onMatch?: (item: HTMLElement, index: number) => void;
    } = {}
  ) {
    this.items = items;
    this.timeoutDuration = options.timeoutDuration || 500;
    this.onMatch = options.onMatch;
  }

  /**
   * Handle character input
   */
  handleKeyPress(key: string): void {
    // Clear existing timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Add character to search string
    this.searchString += key.toLowerCase();

    // Find matching item
    const matchIndex = this.findMatch();
    if (matchIndex >= 0) {
      const item = this.items[matchIndex];
      if (this.onMatch) {
        this.onMatch(item, matchIndex);
      }
    }

    // Reset search string after timeout
    this.searchTimeout = setTimeout(() => {
      this.searchString = '';
    }, this.timeoutDuration);
  }

  /**
   * Find first matching item
   */
  private findMatch(): number {
    return this.items.findIndex((item) => {
      const text = this.getItemText(item).toLowerCase();
      return text.startsWith(this.searchString);
    });
  }

  /**
   * Get text content from item
   */
  private getItemText(item: HTMLElement): string {
    return (
      item.getAttribute('aria-label') ||
      item.textContent?.trim() ||
      ''
    );
  }

  /**
   * Update items
   */
  updateItems(items: HTMLElement[]): void {
    this.items = items;
  }

  /**
   * Clear search string
   */
  clear(): void {
    this.searchString = '';
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
  }
}

/**
 * ARIA Attribute Helpers
 */

/**
 * Set multiple ARIA attributes at once
 */
export function setAriaAttributes(
  element: HTMLElement,
  attributes: Record<string, string | number | boolean | null>
): void {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null) {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, String(value));
    }
  });
}

/**
 * Generate unique ID for ARIA relationships
 */
let idCounter = 0;
export function generateId(prefix: string = 'ha'): string {
  return `${prefix}-${++idCounter}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Announce message to screen readers using live region
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.textContent = message;

  document.body.appendChild(liveRegion);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(liveRegion);
  }, 1000);
}

/**
 * Check if element is visible
 */
export function isElementVisible(element: HTMLElement): boolean {
  return !!(
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length
  );
}

/**
 * Get accessible name for an element
 */
export function getAccessibleName(element: HTMLElement): string {
  // Check aria-label
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  // Check aria-labelledby
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const labelElement = document.getElementById(labelledBy);
    if (labelElement) return labelElement.textContent?.trim() || '';
  }

  // Check associated label
  if (element instanceof HTMLInputElement) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) return label.textContent?.trim() || '';
  }

  // Fallback to text content
  return element.textContent?.trim() || '';
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Watch for reduced motion preference changes
 */
export function onReducedMotionChange(
  callback: (prefersReduced: boolean) => void
): () => void {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };

  mediaQuery.addEventListener('change', handler);

  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handler);
  };
}
