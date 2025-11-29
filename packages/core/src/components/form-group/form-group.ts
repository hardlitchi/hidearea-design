import { formGroupStyles } from './form-group.styles';

/**
 * FormGroup component - wraps form controls with label and helper text
 *
 * @element ha-form-group
 *
 * @attr {string} label - Label text
 * @attr {string} helper-text - Helper text shown below the input
 * @attr {string} error-text - Error text shown when error is true
 * @attr {boolean} required - Whether the field is required
 * @attr {boolean} error - Error state
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Form control (input, select, textarea, etc.)
 * @slot label - Custom label content
 * @slot helper-text - Custom helper text content
 * @slot error-text - Custom error text content
 */
export class HaFormGroup extends HTMLElement {
  private labelElement: HTMLLabelElement;
  private helperTextElement: HTMLDivElement;
  private errorTextElement: HTMLDivElement;
  private slotContainer: HTMLDivElement;

  static get observedAttributes() {
    return ['label', 'helper-text', 'error-text', 'required', 'error', 'disabled'];
  }

  constructor() {
    super();

    // Attach shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Create styles
    const style = document.createElement('style');
    style.textContent = formGroupStyles;

    // Create label
    this.labelElement = document.createElement('label');
    this.labelElement.setAttribute('part', 'label');
    this.labelElement.className = 'label';

    // Label slot or text
    const labelSlot = document.createElement('slot');
    labelSlot.name = 'label';
    this.labelElement.appendChild(labelSlot);

    // Required indicator
    const requiredIndicator = document.createElement('span');
    requiredIndicator.className = 'required-indicator';
    requiredIndicator.textContent = '*';
    this.labelElement.appendChild(requiredIndicator);

    // Slot container for form control
    this.slotContainer = document.createElement('div');
    this.slotContainer.className = 'slot-container';
    this.slotContainer.setAttribute('part', 'slot-container');

    const defaultSlot = document.createElement('slot');
    this.slotContainer.appendChild(defaultSlot);

    // Helper text
    this.helperTextElement = document.createElement('div');
    this.helperTextElement.setAttribute('part', 'helper-text');
    this.helperTextElement.className = 'helper-text';

    const helperSlot = document.createElement('slot');
    helperSlot.name = 'helper-text';
    this.helperTextElement.appendChild(helperSlot);

    // Error text
    this.errorTextElement = document.createElement('div');
    this.errorTextElement.setAttribute('part', 'error-text');
    this.errorTextElement.className = 'error-text';

    const errorSlot = document.createElement('slot');
    errorSlot.name = 'error-text';
    this.errorTextElement.appendChild(errorSlot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.labelElement);
    shadow.appendChild(this.slotContainer);
    shadow.appendChild(this.helperTextElement);
    shadow.appendChild(this.errorTextElement);
  }

  connectedCallback() {
    this.updateContent();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateContent();
  }

  private updateContent() {
    // Update label
    const label = this.getAttribute('label');
    const labelSlot = this.labelElement.querySelector('slot[name="label"]') as HTMLSlotElement | null;
    if (label && labelSlot) {
      // Check if slot has content
      const hasSlotContent = labelSlot.assignedNodes().length > 0;
      if (!hasSlotContent) {
        const textNode = document.createTextNode(label);
        labelSlot.before(textNode);
      }
    }

    // Update helper text
    const helperText = this.getAttribute('helper-text');
    const helperSlot = this.helperTextElement.querySelector('slot[name="helper-text"]') as HTMLSlotElement | null;
    if (helperText && helperSlot) {
      const hasSlotContent = helperSlot.assignedNodes().length > 0;
      if (!hasSlotContent) {
        const textNode = document.createTextNode(helperText);
        helperSlot.before(textNode);
      }
    }

    // Update error text
    const errorText = this.getAttribute('error-text');
    const errorSlot = this.errorTextElement.querySelector('slot[name="error-text"]') as HTMLSlotElement | null;
    if (errorText && errorSlot) {
      const hasSlotContent = errorSlot.assignedNodes().length > 0;
      if (!hasSlotContent) {
        const textNode = document.createTextNode(errorText);
        errorSlot.before(textNode);
      }
    }

    // Show/hide helper and error text based on state
    const hasError = this.hasAttribute('error');
    this.helperTextElement.style.display = hasError ? 'none' :
      (helperText || helperSlot?.assignedNodes().length) ? 'block' : 'none';
    this.errorTextElement.style.display = hasError &&
      (errorText || errorSlot?.assignedNodes().length) ? 'block' : 'none';
  }

  // Public API
  get label(): string | null {
    return this.getAttribute('label');
  }

  set label(value: string | null) {
    if (value) {
      this.setAttribute('label', value);
    } else {
      this.removeAttribute('label');
    }
  }

  get helperText(): string | null {
    return this.getAttribute('helper-text');
  }

  set helperText(value: string | null) {
    if (value) {
      this.setAttribute('helper-text', value);
    } else {
      this.removeAttribute('helper-text');
    }
  }

  get errorText(): string | null {
    return this.getAttribute('error-text');
  }

  set errorText(value: string | null) {
    if (value) {
      this.setAttribute('error-text', value);
    } else {
      this.removeAttribute('error-text');
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
}

// Register custom element
if (!customElements.get('ha-form-group')) {
  customElements.define('ha-form-group', HaFormGroup);
}
