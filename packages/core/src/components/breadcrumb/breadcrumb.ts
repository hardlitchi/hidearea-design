import { breadcrumbStyles } from './breadcrumb.styles';

/**
 * Breadcrumb component
 *
 * @element ha-breadcrumb
 *
 * @attr {string} separator - Default separator for all items: slash, chevron, arrow, dot
 * @attr {string} size - Breadcrumb size: sm, md, lg
 *
 * @slot - Breadcrumb items (ha-breadcrumb-item elements)
 */
export class HaBreadcrumb extends HTMLElement {
  private nav: HTMLElement;
  private list: HTMLOListElement;
  private itemsSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ['separator', 'size'];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create styles
    const style = document.createElement('style');
    style.textContent = breadcrumbStyles;

    // Create nav
    this.nav = document.createElement('nav');
    this.nav.setAttribute('part', 'nav');
    this.nav.setAttribute('aria-label', 'breadcrumb');

    // Create ordered list
    this.list = document.createElement('ol');
    this.list.className = 'breadcrumb';
    this.list.setAttribute('part', 'list');

    // Create slot for items
    this.itemsSlot = document.createElement('slot');
    this.list.appendChild(this.itemsSlot);

    // Append to nav
    this.nav.appendChild(this.list);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.nav);

    // Listen for slotchange to update items
    this.itemsSlot.addEventListener('slotchange', () => {
      this.updateItems();
    });
  }

  connectedCallback() {
    // Set default attributes
    if (!this.hasAttribute('separator')) {
      this.setAttribute('separator', 'slash');
    }
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', 'md');
    }

    this.updateClasses();
    this.updateItems();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (_name === 'separator') {
      this.updateItems();
    } else {
      this.updateClasses();
    }
  }

  private updateClasses() {
    this.list.className = `breadcrumb size-${this.size}`;
  }

  private updateItems() {
    const items = this.getItems();

    items.forEach((item, index) => {
      // Set separator on all items except last
      if (!item.hasAttribute('separator')) {
        item.separator = this.separator;
      }

      // Wrap in <li> if not already wrapped
      if (item.parentElement?.tagName !== 'LI') {
        const li = document.createElement('li');
        li.setAttribute('part', 'list-item');

        // Insert li before the item
        item.parentElement?.insertBefore(li, item);

        // Move item into li
        li.appendChild(item);
      }

      // Update ARIA
      const li = item.parentElement as HTMLLIElement;
      if (li) {
        if (index === items.length - 1) {
          li.setAttribute('aria-current', 'page');
        } else {
          li.removeAttribute('aria-current');
        }
      }
    });
  }

  private getItems(): any[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];

    const elements = slot.assignedElements();
    return elements.filter((el) => el.tagName === 'HA-BREADCRUMB-ITEM');
  }

  // Public API
  get separator(): string {
    return this.getAttribute('separator') || 'slash';
  }

  set separator(value: string) {
    this.setAttribute('separator', value);
  }

  get size(): string {
    return this.getAttribute('size') || 'md';
  }

  set size(value: string) {
    this.setAttribute('size', value);
  }
}

// Register custom element
if (!customElements.get('ha-breadcrumb')) {
  customElements.define('ha-breadcrumb', HaBreadcrumb);
}
