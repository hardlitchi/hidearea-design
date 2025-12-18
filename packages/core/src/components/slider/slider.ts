import { sliderStyles } from "@hidearea-design/tokens/styles";

/**
 * Slider Component
 *
 * A customizable slider component for selecting single values or ranges.
 *
 * @element ha-slider
 *
 * @fires slider-change - Fired when the slider value changes
 * @fires slider-input - Fired during slider dragging (real-time updates)
 *
 * @cssprop --slider-track-height - Height of the slider track
 * @cssprop --slider-track-color - Color of the slider track
 * @cssprop --slider-fill-color - Color of the filled portion
 * @cssprop --slider-thumb-size - Size of the slider thumb
 * @cssprop --slider-thumb-color - Color of the slider thumb
 *
 * @csspart track - The slider track
 * @csspart fill - The filled portion of the track
 * @csspart thumb - The draggable thumb
 * @csspart marks - The marks container
 * @csspart mark - Individual mark
 * @csspart tooltip - The value tooltip
 */
export class HaSlider extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  private _value: number = 0;
  private _rangeStart: number = 0;
  private _rangeEnd: number = 100;
  private _isDragging: boolean = false;
  private _activeThumb: 'single' | 'start' | 'end' | null = null;

  static get observedAttributes() {
    return [
      'min',
      'max',
      'step',
      'value',
      'range',
      'range-start',
      'range-end',
      'orientation',
      'disabled',
      'readonly',
      'show-marks',
      'show-tooltip',
      'label',
      'marks',
    ];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  // Properties
  get min(): number {
    return parseFloat(this.getAttribute('min') || '0');
  }

  set min(value: number) {
    this.setAttribute('min', String(value));
  }

  get max(): number {
    return parseFloat(this.getAttribute('max') || '100');
  }

  set max(value: number) {
    this.setAttribute('max', String(value));
  }

  get step(): number {
    return parseFloat(this.getAttribute('step') || '1');
  }

  set step(value: number) {
    this.setAttribute('step', String(value));
  }

  get value(): number {
    return this._value;
  }

  set value(val: number) {
    const clampedValue = this.clampValue(val);
    if (this._value !== clampedValue) {
      this._value = clampedValue;
      this.setAttribute('value', String(clampedValue));
      this.render();
    }
  }

  get range(): boolean {
    return this.hasAttribute('range');
  }

  set range(value: boolean) {
    if (value) {
      this.setAttribute('range', '');
    } else {
      this.removeAttribute('range');
    }
  }

  get rangeStart(): number {
    return this._rangeStart;
  }

  set rangeStart(val: number) {
    const clampedValue = this.clampValue(val);
    if (this._rangeStart !== clampedValue) {
      this._rangeStart = clampedValue;
      if (this._rangeStart > this._rangeEnd) {
        this._rangeStart = this._rangeEnd;
      }
      this.setAttribute('range-start', String(this._rangeStart));
      this.render();
    }
  }

  get rangeEnd(): number {
    return this._rangeEnd;
  }

  set rangeEnd(val: number) {
    const clampedValue = this.clampValue(val);
    if (this._rangeEnd !== clampedValue) {
      this._rangeEnd = clampedValue;
      if (this._rangeEnd < this._rangeStart) {
        this._rangeEnd = this._rangeStart;
      }
      this.setAttribute('range-end', String(this._rangeEnd));
      this.render();
    }
  }

  get orientation(): 'horizontal' | 'vertical' {
    return (this.getAttribute('orientation') as 'horizontal' | 'vertical') || 'horizontal';
  }

  set orientation(value: 'horizontal' | 'vertical') {
    this.setAttribute('orientation', value);
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

  get showMarks(): boolean {
    return this.hasAttribute('show-marks');
  }

  set showMarks(value: boolean) {
    if (value) {
      this.setAttribute('show-marks', '');
    } else {
      this.removeAttribute('show-marks');
    }
  }

  get showTooltip(): boolean {
    return this.hasAttribute('show-tooltip');
  }

  set showTooltip(value: boolean) {
    if (value) {
      this.setAttribute('show-tooltip', '');
    } else {
      this.removeAttribute('show-tooltip');
    }
  }

  get marks(): number[] {
    const marksAttr = this.getAttribute('marks');
    if (!marksAttr) return [];
    return marksAttr.split(',').map(m => parseFloat(m.trim())).filter(m => !isNaN(m));
  }

  set marks(value: number[]) {
    this.setAttribute('marks', value.join(','));
  }

  // Lifecycle
  connectedCallback() {
    this.render();
    this.attachEventListeners();

    // Set ARIA attributes
    this.setAttribute('role', 'slider');
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.setAttribute('aria-valuemin', String(this.min));
    this.setAttribute('aria-valuemax', String(this.max));
    this.updateAriaValue();
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'value':
        if (newValue !== null) {
          this._value = this.clampValue(parseFloat(newValue));
        }
        break;
      case 'range-start':
        if (newValue !== null) {
          this._rangeStart = this.clampValue(parseFloat(newValue));
        }
        break;
      case 'range-end':
        if (newValue !== null) {
          this._rangeEnd = this.clampValue(parseFloat(newValue));
        }
        break;
      case 'disabled':
        this.setAttribute('tabindex', newValue !== null ? '-1' : '0');
        break;
    }

    this.render();
    this.updateAriaValue();
  }

  // Public Methods
  public getValue(): number | { start: number; end: number } {
    if (this.range) {
      return { start: this._rangeStart, end: this._rangeEnd };
    }
    return this._value;
  }

  public setValue(value: number | { start: number; end: number }): void {
    if (typeof value === 'number') {
      this.value = value;
    } else {
      this.rangeStart = value.start;
      this.rangeEnd = value.end;
    }
  }

  public reset(): void {
    if (this.range) {
      this.rangeStart = this.min;
      this.rangeEnd = this.max;
    } else {
      this.value = this.min;
    }
  }

  // Private Methods
  private clampValue(value: number): number {
    let clamped = Math.max(this.min, Math.min(this.max, value));
    // Snap to step
    const steps = Math.round((clamped - this.min) / this.step);
    clamped = this.min + steps * this.step;
    return clamped;
  }

  private valueToPercent(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private percentToValue(percent: number): number {
    return this.min + (percent / 100) * (this.max - this.min);
  }

  private updateAriaValue(): void {
    if (this.range) {
      this.setAttribute('aria-valuetext', `${this._rangeStart} to ${this._rangeEnd}`);
    } else {
      this.setAttribute('aria-valuenow', String(this._value));
    }
  }

  private handlePointerDown = (e: PointerEvent): void => {
    if (this.disabled || this.readonly) return;

    const track = this._shadowRoot.querySelector('.slider__track') as HTMLElement;
    if (!track) return;

    this._isDragging = true;
    track.setPointerCapture(e.pointerId);

    // Determine which thumb to move
    if (this.range) {
      const rect = track.getBoundingClientRect();
      const percent = this.orientation === 'horizontal'
        ? ((e.clientX - rect.left) / rect.width) * 100
        : ((rect.bottom - e.clientY) / rect.height) * 100;

      const value = this.percentToValue(percent);
      const distToStart = Math.abs(value - this._rangeStart);
      const distToEnd = Math.abs(value - this._rangeEnd);

      this._activeThumb = distToStart < distToEnd ? 'start' : 'end';
    } else {
      this._activeThumb = 'single';
    }

    this.handlePointerMove(e);
  };

  private handlePointerMove = (e: PointerEvent): void => {
    if (!this._isDragging || this.disabled || this.readonly) return;

    const track = this._shadowRoot.querySelector('.slider__track') as HTMLElement;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    let percent: number;

    if (this.orientation === 'horizontal') {
      percent = ((e.clientX - rect.left) / rect.width) * 100;
    } else {
      percent = ((rect.bottom - e.clientY) / rect.height) * 100;
    }

    percent = Math.max(0, Math.min(100, percent));
    const value = this.clampValue(this.percentToValue(percent));

    if (this.range) {
      if (this._activeThumb === 'start') {
        this.rangeStart = value;
      } else if (this._activeThumb === 'end') {
        this.rangeEnd = value;
      }
    } else {
      this.value = value;
    }

    this.dispatchInputEvent();
  };

  private handlePointerUp = (): void => {
    if (this._isDragging) {
      this._isDragging = false;
      this._activeThumb = null;
      this.dispatchChangeEvent();
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled || this.readonly) return;

    let handled = false;
    const stepSize = e.shiftKey ? this.step * 10 : this.step;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        if (this.range) {
          this.rangeEnd = this.clampValue(this._rangeEnd - stepSize);
        } else {
          this.value = this.clampValue(this._value - stepSize);
        }
        handled = true;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        if (this.range) {
          this.rangeEnd = this.clampValue(this._rangeEnd + stepSize);
        } else {
          this.value = this.clampValue(this._value + stepSize);
        }
        handled = true;
        break;
      case 'Home':
        if (this.range) {
          this.rangeStart = this.min;
        } else {
          this.value = this.min;
        }
        handled = true;
        break;
      case 'End':
        if (this.range) {
          this.rangeEnd = this.max;
        } else {
          this.value = this.max;
        }
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      this.dispatchChangeEvent();
    }
  };

  private attachEventListeners(): void {
    // Only attach host-level listeners here (keydown)
    // Track listeners are attached in render() after innerHTML
    this.addEventListener('keydown', this.handleKeyDown as EventListener);
  }

  private detachEventListeners(): void {
    // Track listeners are automatically removed when innerHTML destroys elements
    // Only need to remove host-level listeners
    this.removeEventListener('keydown', this.handleKeyDown as EventListener);
  }

  private dispatchChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent('slider-change', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.getValue(),
        },
      })
    );
  }

  private dispatchInputEvent(): void {
    this.dispatchEvent(
      new CustomEvent('slider-input', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.getValue(),
        },
      })
    );
  }

  private render(): void {
    const label = this.getAttribute('label') || '';

    let fillStyle = '';
    let thumbsHtml = '';

    if (this.range) {
      const startPercent = this.valueToPercent(this._rangeStart);
      const endPercent = this.valueToPercent(this._rangeEnd);

      if (this.orientation === 'horizontal') {
        fillStyle = `left: ${startPercent}%; width: ${endPercent - startPercent}%`;
      } else {
        fillStyle = `bottom: ${startPercent}%; height: ${endPercent - startPercent}%`;
      }

      thumbsHtml = `
        <div class="slider__thumb slider__thumb--start"
             part="thumb"
             style="${this.orientation === 'horizontal' ? `left: ${startPercent}%` : `bottom: ${startPercent}%`}"
             ${this.showTooltip ? `data-value="${this._rangeStart}"` : ''}>
          ${this.showTooltip ? `<div class="slider__tooltip" part="tooltip">${this._rangeStart}</div>` : ''}
        </div>
        <div class="slider__thumb slider__thumb--end"
             part="thumb"
             style="${this.orientation === 'horizontal' ? `left: ${endPercent}%` : `bottom: ${endPercent}%`}"
             ${this.showTooltip ? `data-value="${this._rangeEnd}"` : ''}>
          ${this.showTooltip ? `<div class="slider__tooltip" part="tooltip">${this._rangeEnd}</div>` : ''}
        </div>
      `;
    } else {
      const valuePercent = this.valueToPercent(this._value);

      if (this.orientation === 'horizontal') {
        fillStyle = `width: ${valuePercent}%`;
      } else {
        fillStyle = `height: ${valuePercent}%`;
      }

      thumbsHtml = `
        <div class="slider__thumb"
             part="thumb"
             style="${this.orientation === 'horizontal' ? `left: ${valuePercent}%` : `bottom: ${valuePercent}%`}"
             ${this.showTooltip ? `data-value="${this._value}"` : ''}>
          ${this.showTooltip ? `<div class="slider__tooltip" part="tooltip">${this._value}</div>` : ''}
        </div>
      `;
    }

    let marksHtml = '';
    if (this.showMarks) {
      const markValues = this.marks.length > 0 ? this.marks : this.generateDefaultMarks();
      marksHtml = `
        <div class="slider__marks" part="marks">
          ${markValues
            .map((mark) => {
              const percent = this.valueToPercent(mark);
              return `
                <div class="slider__mark"
                     part="mark"
                     style="${this.orientation === 'horizontal' ? `left: ${percent}%` : `bottom: ${percent}%`}"
                     data-value="${mark}">
                </div>
              `;
            })
            .join('')}
        </div>
      `;
    }

    this._shadowRoot.innerHTML = `
      <style>
        ${sliderStyles}
      </style>

      <div class="slider" part="slider">
        ${label ? `<label class="slider__label">${label}</label>` : ''}
        <div class="slider__track" part="track">
          <div class="slider__fill" part="fill" style="${fillStyle}"></div>
          ${thumbsHtml}
          ${marksHtml}
        </div>
      </div>
    `;

    // Re-attach event listeners after render
    const track = this._shadowRoot.querySelector('.slider__track');
    if (track) {
      track.addEventListener('pointerdown', this.handlePointerDown as EventListener);
      track.addEventListener('pointermove', this.handlePointerMove as EventListener);
      track.addEventListener('pointerup', this.handlePointerUp as EventListener);
      track.addEventListener('pointercancel', this.handlePointerUp as EventListener);
    }
  }

  private generateDefaultMarks(): number[] {
    const marks: number[] = [];
    const range = this.max - this.min;
    const stepCount = Math.min(10, Math.floor(range / this.step));
    const markStep = range / stepCount;

    for (let i = 0; i <= stepCount; i++) {
      marks.push(this.min + i * markStep);
    }

    return marks;
  }
}

// Register the custom element
if (!customElements.get('ha-slider')) {
  customElements.define('ha-slider', HaSlider);
}
