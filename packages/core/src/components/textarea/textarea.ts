import { textareaStyles } from './textarea.styles';

/**
 * Textarea component
 *
 * @element ha-textarea
 *
 * @attr {string} variant - Textarea variant: default, filled, outlined
 * @attr {string} size - Textarea size: sm, md, lg
 * @attr {string} value - Textarea value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} readonly - Readonly state
 * @attr {boolean} required - Required state
 * @attr {boolean} error - Error state
 * @attr {boolean} full-width - Full width textarea
 * @attr {string} name - Textarea name
 * @attr {string} autocomplete - Autocomplete attribute
 * @attr {number} maxlength - Maximum length
 * @attr {number} minlength - Minimum length
 * @attr {number} rows - Number of visible text rows
 * @attr {number} cols - Visible width of the text control
 * @attr {string} resize - Resize behavior: none, both, horizontal, vertical
 *
 * @fires input - Emitted when textarea value changes
 * @fires change - Emitted when textarea loses focus
 * @fires focus - Emitted when textarea gains focus
 * @fires blur - Emitted when textarea loses focus
 */
export class HaTextarea extends HTMLElement {
  private textarea: HTMLTextAreaElement;
  private wrapper: HTMLDivElement;

  static get observedAttributes() {
    return [
      'variant',
      'size',
      'value',
      'placeholder',
      'disabled',
      'readonly',
      'required',
      'error',
      'full-width',
      'name',
      'autocomplete',
      'maxlength',
      'minlength',
      'rows',
      'cols',
      'resize',
    ];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create styles
    const style = document.createElement('style');
    style.textContent = textareaStyles;

    // Create wrapper
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'textarea-wrapper';
    this.wrapper.setAttribute('part', 'textarea-wrapper');

    // Create textarea element
    this.textarea = document.createElement('textarea');
    this.textarea.setAttribute('part', 'textarea');

    // Append elements
    this.wrapper.appendChild(this.textarea);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.wrapper);

    // Handle input events
    this.textarea.addEventListener('input', (e) => {
      this.setAttribute('value', this.textarea.value);
      this.dispatchEvent(
        new CustomEvent('input', {
          bubbles: true,
          composed: true,
          detail: {
            value: this.textarea.value,
            originalEvent: e,
          },
        })
      );
    });

    // Handle change events
    this.textarea.addEventListener('change', (e) => {
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: {
            value: this.textarea.value,
            originalEvent: e,
          },
        })
      );
    });

    // Handle focus events
    this.textarea.addEventListener('focus', (e) => {
      this.dispatchEvent(
        new CustomEvent('focus', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        })
      );
    });

    // Handle blur events
    this.textarea.addEventListener('blur', (e) => {
      this.dispatchEvent(
        new CustomEvent('blur', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: e },
        })
      );
    });
  }

  connectedCallback() {
    // Set default attributes if not present
    if (!this.hasAttribute('variant')) {
      this.setAttribute('variant', 'default');
    }
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', 'md');
    }
    if (!this.hasAttribute('resize')) {
      this.setAttribute('resize', 'vertical');
    }

    this.updateTextareaAttributes();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === 'value') {
      if (this.textarea.value !== newValue) {
        this.textarea.value = newValue || '';
      }
    }

    this.updateTextareaAttributes();
  }

  private updateTextareaAttributes() {
    // Update placeholder
    const placeholder = this.getAttribute('placeholder');
    if (placeholder) {
      this.textarea.placeholder = placeholder;
    } else {
      this.textarea.removeAttribute('placeholder');
    }

    // Update name
    const name = this.getAttribute('name');
    if (name) {
      this.textarea.name = name;
    }

    // Update autocomplete
    const autocomplete = this.getAttribute('autocomplete');
    if (autocomplete) {
      this.textarea.setAttribute('autocomplete', autocomplete);
    }

    // Update maxlength
    const maxlength = this.getAttribute('maxlength');
    if (maxlength) {
      this.textarea.maxLength = parseInt(maxlength, 10);
    }

    // Update minlength
    const minlength = this.getAttribute('minlength');
    if (minlength) {
      this.textarea.minLength = parseInt(minlength, 10);
    }

    // Update rows
    const rows = this.getAttribute('rows');
    if (rows) {
      this.textarea.rows = parseInt(rows, 10);
    }

    // Update cols
    const cols = this.getAttribute('cols');
    if (cols) {
      this.textarea.cols = parseInt(cols, 10);
    }

    // Update disabled state
    const disabled = this.hasAttribute('disabled');
    this.textarea.disabled = disabled;

    // Update readonly state
    const readonly = this.hasAttribute('readonly');
    this.textarea.readOnly = readonly;

    // Update required state
    const required = this.hasAttribute('required');
    this.textarea.required = required;

    // Update value
    const value = this.getAttribute('value');
    if (value !== null && this.textarea.value !== value) {
      this.textarea.value = value;
    }

    // Update ARIA attributes
    this.textarea.setAttribute('aria-disabled', disabled.toString());
    this.textarea.setAttribute('aria-readonly', readonly.toString());
    this.textarea.setAttribute('aria-required', required.toString());
    this.textarea.setAttribute('aria-invalid', this.hasAttribute('error').toString());
  }

  // Public API
  get variant(): string {
    return this.getAttribute('variant') || 'default';
  }

  set variant(value: string) {
    this.setAttribute('variant', value);
  }

  get size(): string {
    return this.getAttribute('size') || 'md';
  }

  set size(value: string) {
    this.setAttribute('size', value);
  }

  get value(): string {
    return this.textarea.value;
  }

  set value(value: string) {
    this.setAttribute('value', value);
    this.textarea.value = value;
  }

  get placeholder(): string | null {
    return this.getAttribute('placeholder');
  }

  set placeholder(value: string | null) {
    if (value) {
      this.setAttribute('placeholder', value);
    } else {
      this.removeAttribute('placeholder');
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

  get readonly(): boolean {
    return this.hasAttribute('readonly');
  }

  set readonly(value: boolean) {
    if (value) {
      this.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
    }
  }

  get required(): boolean {
    return this.hasAttribute('required');
  }

  set required(value: boolean) {
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get error(): boolean {
    return this.hasAttribute('error');
  }

  set error(value: boolean) {
    if (value) {
      this.setAttribute('error', '');
    } else {
      this.removeAttribute('error');
    }
  }

  get fullWidth(): boolean {
    return this.hasAttribute('full-width');
  }

  set fullWidth(value: boolean) {
    if (value) {
      this.setAttribute('full-width', '');
    } else {
      this.removeAttribute('full-width');
    }
  }

  get name(): string | null {
    return this.getAttribute('name');
  }

  set name(value: string | null) {
    if (value) {
      this.setAttribute('name', value);
    } else {
      this.removeAttribute('name');
    }
  }

  get resize(): string {
    return this.getAttribute('resize') || 'vertical';
  }

  set resize(value: string) {
    this.setAttribute('resize', value);
  }

  // Validation API
  checkValidity(): boolean {
    return this.textarea.checkValidity();
  }

  reportValidity(): boolean {
    return this.textarea.reportValidity();
  }

  setCustomValidity(message: string): void {
    this.textarea.setCustomValidity(message);
  }

  // Selection API
  select(): void {
    this.textarea.select();
  }

  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none'): void {
    this.textarea.setSelectionRange(start, end, direction);
  }

  // Focus management
  focus() {
    this.textarea.focus();
  }

  blur() {
    this.textarea.blur();
  }
}

// Register custom element
if (!customElements.get('ha-textarea')) {
  customElements.define('ha-textarea', HaTextarea);
}
