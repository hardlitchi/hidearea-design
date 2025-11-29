import { containerStyles } from './container.styles';

/**
 * Container component
 *
 * @element ha-container
 *
 * @attr {string} max-width - Maximum width: sm, md, lg, xl, 2xl, full
 * @attr {boolean} centered - Center the container horizontally
 * @attr {string} padding - Padding size: none, sm, md, lg
 *
 * @slot - Container content
 */
export class HaContainer extends HTMLElement {
  private container: HTMLDivElement;

  static get observedAttributes() {
    return ['max-width', 'centered', 'padding'];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create styles
    const style = document.createElement('style');
    style.textContent = containerStyles;

    // Create container element
    this.container = document.createElement('div');
    this.container.setAttribute('part', 'container');

    // Create slot for content
    const slot = document.createElement('slot');
    this.container.appendChild(slot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.container);
  }

  connectedCallback() {
    // Set default attributes if not present
    if (!this.hasAttribute('max-width')) {
      this.setAttribute('max-width', 'lg');
    }
    if (!this.hasAttribute('padding')) {
      this.setAttribute('padding', 'md');
    }
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    // Attributes are handled via CSS attribute selectors
  }

  // Public API
  get maxWidth(): string {
    return this.getAttribute('max-width') || 'lg';
  }

  set maxWidth(value: string) {
    this.setAttribute('max-width', value);
  }

  get centered(): boolean {
    return this.hasAttribute('centered');
  }

  set centered(value: boolean) {
    if (value) {
      this.setAttribute('centered', '');
    } else {
      this.removeAttribute('centered');
    }
  }

  get padding(): string {
    return this.getAttribute('padding') || 'md';
  }

  set padding(value: string) {
    this.setAttribute('padding', value);
  }
}

// Register custom element
if (!customElements.get('ha-container')) {
  customElements.define('ha-container', HaContainer);
}
