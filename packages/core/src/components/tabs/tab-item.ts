import { tabItemStyles } from './tabs.styles';

/**
 * Tab item component
 *
 * @element ha-tab-item
 *
 * @attr {string} value - Unique identifier for the tab
 * @attr {boolean} active - Active state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} size - Tab size: sm, md, lg
 * @attr {string} variant - Tab variant: default, outlined, pills
 *
 * @slot - Tab label content
 * @slot icon - Icon slot
 *
 * @fires tab-click - Emitted when tab is clicked
 */
export class HaTabItem extends HTMLElement {
  private button: HTMLButtonElement;

  static get observedAttributes() {
    return ['value', 'active', 'disabled', 'size', 'variant'];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create styles
    const style = document.createElement('style');
    style.textContent = tabItemStyles;

    // Create button
    this.button = document.createElement('button');
    this.button.className = 'tab-item';
    this.button.setAttribute('part', 'button');
    this.button.setAttribute('role', 'tab');
    this.button.setAttribute('type', 'button');

    // Create icon slot
    const iconSlot = document.createElement('slot');
    iconSlot.name = 'icon';

    // Create default slot
    const defaultSlot = document.createElement('slot');

    // Append slots to button
    this.button.appendChild(iconSlot);
    this.button.appendChild(defaultSlot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.button);

    // Handle click
    this.button.addEventListener('click', () => {
      if (!this.disabled) {
        this.dispatchEvent(
          new CustomEvent('tab-click', {
            bubbles: true,
            composed: true,
            detail: { value: this.value },
          })
        );
      }
    });
  }

  connectedCallback() {
    // Set default attributes
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', 'md');
    }
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'default');
    }

    this.updateButton();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateButton();
  }

  private updateButton() {
    const classes = ['tab-item'];

    // Add size class
    classes.push(`size-${this.size}`);

    // Add active class
    if (this.active) {
      classes.push('active');
    }

    this.button.className = classes.join(' ');

    // Set disabled
    this.button.disabled = this.disabled;

    // Set ARIA attributes
    this.button.setAttribute('aria-selected', this.active.toString());
    this.button.setAttribute('aria-disabled', this.disabled.toString());
    if (this.value) {
      this.button.id = `tab-${this.value}`;
      this.button.setAttribute('aria-controls', `panel-${this.value}`);
    }
  }

  // Public API
  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(value: string) {
    this.setAttribute('value', value);
  }

  get active(): boolean {
    return this.hasAttribute('active');
  }

  set active(value: boolean) {
    if (value) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get size(): string {
    return this.getAttribute('size') || 'md';
  }

  set size(value: string) {
    this.setAttribute('size', value);
  }

  get variant(): string {
    return this.getAttribute('variant') || 'default';
  }

  set variant(value: string) {
    this.setAttribute('variant', value);
  }

  // Public methods
  focus() {
    this.button.focus();
  }
}

// Register custom element
if (!customElements.get('ha-tab-item')) {
  customElements.define('ha-tab-item', HaTabItem);
}
