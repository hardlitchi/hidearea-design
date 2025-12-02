import { menuStyles } from './menu.styles';

/**
 * Menu component
 *
 * @element ha-menu
 *
 * @attr {string} size - Menu size: sm, md, lg
 *
 * @slot - Menu items and dividers
 */
export class HaMenu extends HTMLElement {
  private menu: HTMLDivElement;

  static get observedAttributes() {
    return ['size'];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create styles
    const style = document.createElement('style');
    style.textContent = menuStyles;

    // Create menu
    this.menu = document.createElement('div');
    this.menu.className = 'menu';
    this.menu.setAttribute('part', 'menu');
    this.menu.setAttribute('role', 'menu');

    // Create slot
    const slot = document.createElement('slot');
    this.menu.appendChild(slot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.menu);

    // Handle keyboard navigation
    this.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  connectedCallback() {
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', 'md');
    }
    this.updateClasses();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateClasses();
  }

  private updateClasses() {
    this.menu.className = `menu size-${this.size}`;
  }

  private getMenuItems(): Element[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];

    const elements = slot.assignedElements();
    return elements.filter((el) => {
      const menuItem = el as HTMLElement & { disabled?: boolean };
      return el.tagName === 'HA-MENU-ITEM' && !menuItem.disabled;
    });
  }

  private handleKeydown(e: KeyboardEvent) {
    const items = this.getMenuItems();
    if (items.length === 0) return;

    const currentIndex = items.findIndex((item) => item === document.activeElement || item.shadowRoot?.activeElement);

    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    if (items[newIndex]) {
      items[newIndex].focus();
    }
  }

  // Public API
  get size(): string {
    return this.getAttribute('size') || 'md';
  }

  set size(value: string) {
    this.setAttribute('size', value);
  }
}

// Register custom element
if (!customElements.get('ha-menu')) {
  customElements.define('ha-menu', HaMenu);
}
