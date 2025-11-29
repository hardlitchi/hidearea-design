import { stackStyles } from './stack.styles';

/**
 * Stack component - manages vertical or horizontal spacing between children
 *
 * @element ha-stack
 *
 * @attr {string} direction - Stack direction: vertical, horizontal
 * @attr {string} gap - Gap size: 0-12 (maps to spacing tokens)
 * @attr {string} align - Align items: start, center, end, stretch
 * @attr {string} justify - Justify content: start, center, end, space-between, space-around, space-evenly
 * @attr {boolean} wrap - Whether to wrap items
 *
 * @slot - Stack items
 */
export class HaStack extends HTMLElement {
  private stack: HTMLDivElement;

  static get observedAttributes() {
    return ['direction', 'gap', 'align', 'justify', 'wrap'];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create styles
    const style = document.createElement('style');
    style.textContent = stackStyles;

    // Create stack element
    this.stack = document.createElement('div');
    this.stack.setAttribute('part', 'stack');

    // Create slot for content
    const slot = document.createElement('slot');
    this.stack.appendChild(slot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.stack);
  }

  connectedCallback() {
    // Set default attributes if not present
    if (!this.hasAttribute('direction')) {
      this.setAttribute('direction', 'vertical');
    }
    if (!this.hasAttribute('gap')) {
      this.setAttribute('gap', '4');
    }
    this.updateStackStyles();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateStackStyles();
  }

  private updateStackStyles() {
    const gap = this.getAttribute('gap') || '4';

    // Set gap using CSS variable
    this.stack.style.gap = `var(--spacing-${gap}, ${this.getSpacingValue(gap)})`;
  }

  private getSpacingValue(key: string): string {
    const spacingMap: Record<string, string> = {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
    };
    return spacingMap[key] || '1rem';
  }

  // Public API
  get direction(): string {
    return this.getAttribute('direction') || 'vertical';
  }

  set direction(value: string) {
    this.setAttribute('direction', value);
  }

  get gap(): string {
    return this.getAttribute('gap') || '4';
  }

  set gap(value: string) {
    this.setAttribute('gap', value);
  }

  get align(): string | null {
    return this.getAttribute('align');
  }

  set align(value: string | null) {
    if (value) {
      this.setAttribute('align', value);
    } else {
      this.removeAttribute('align');
    }
  }

  get justify(): string | null {
    return this.getAttribute('justify');
  }

  set justify(value: string | null) {
    if (value) {
      this.setAttribute('justify', value);
    } else {
      this.removeAttribute('justify');
    }
  }

  get wrap(): boolean {
    return this.hasAttribute('wrap');
  }

  set wrap(value: boolean) {
    if (value) {
      this.setAttribute('wrap', '');
    } else {
      this.removeAttribute('wrap');
    }
  }
}

// Register custom element
if (!customElements.get('ha-stack')) {
  customElements.define('ha-stack', HaStack);
}
