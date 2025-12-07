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
    const track = this._shadowRoot.querySelector('.slider__track');
    if (track) {
      track.addEventListener('pointerdown', this.handlePointerDown as EventListener);
      track.addEventListener('pointermove', this.handlePointerMove as EventListener);
      track.addEventListener('pointerup', this.handlePointerUp as EventListener);
      track.addEventListener('pointercancel', this.handlePointerUp as EventListener);
    }
    this.addEventListener('keydown', this.handleKeyDown as EventListener);
  }

  private detachEventListeners(): void {
    const track = this._shadowRoot.querySelector('.slider__track');
    if (track) {
      track.removeEventListener('pointerdown', this.handlePointerDown as EventListener);
      track.removeEventListener('pointermove', this.handlePointerMove as EventListener);
      track.removeEventListener('pointerup', this.handlePointerUp as EventListener);
      track.removeEventListener('pointercancel', this.handlePointerUp as EventListener);
    }
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
        :host {
          display: inline-block;
          width: 100%;
          --slider-track-height: 6px;
          --slider-track-color: var(--color-neutral-3, #e5e7eb);
          --slider-fill-color: var(--primary-default);
          --slider-thumb-size: 18px;
          --slider-thumb-color: var(--primary-default);
        }

        :host([orientation="vertical"]) {
          width: auto;
          height: 200px;
        }

        :host([disabled]) {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .slider {
          position: relative;
          padding: 12px 0;
        }

        :host([orientation="vertical"]) .slider {
          padding: 0 12px;
          height: 100%;
        }

        .slider__label {
          display: block;
          margin-bottom: 8px;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--foreground-primary);
        }

        .slider__track {
          position: relative;
          width: 100%;
          height: var(--slider-track-height);
          background-color: var(--slider-track-color);
          border-radius: 999px;
          cursor: pointer;
          touch-action: none;
        }

        :host([orientation="vertical"]) .slider__track {
          width: var(--slider-track-height);
          height: 100%;
        }

        :host([disabled]) .slider__track,
        :host([readonly]) .slider__track {
          cursor: not-allowed;
        }

        .slider__fill {
          position: absolute;
          background-color: var(--slider-fill-color);
          border-radius: 999px;
          height: 100%;
          transition: width 0.1s ease, height 0.1s ease;
        }

        :host([orientation="vertical"]) .slider__fill {
          width: 100%;
          bottom: 0;
        }

        .slider__thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: var(--slider-thumb-size);
          height: var(--slider-thumb-size);
          background-color: var(--slider-thumb-color);
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          cursor: grab;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }

        :host([orientation="vertical"]) .slider__thumb {
          left: 50%;
          top: auto;
          transform: translate(-50%, 50%);
        }

        .slider__thumb:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        :host([orientation="vertical"]) .slider__thumb:hover {
          transform: translate(-50%, 50%) scale(1.1);
        }

        .slider__thumb:active {
          cursor: grabbing;
        }

        :host([disabled]) .slider__thumb,
        :host([readonly]) .slider__thumb {
          cursor: not-allowed;
        }

        .slider__tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 8px;
          background-color: var(--foreground-primary);
          color: white;
          font-size: var(--font-size-xs);
          border-radius: 4px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        :host([orientation="vertical"]) .slider__tooltip {
          bottom: auto;
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }

        .slider__thumb:hover .slider__tooltip,
        .slider__thumb:active .slider__tooltip {
          opacity: 1;
        }

        :host([show-tooltip]) .slider__tooltip {
          opacity: 1;
        }

        .slider__marks {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: var(--slider-track-height);
          transform: translateY(-50%);
          pointer-events: none;
        }

        :host([orientation="vertical"]) .slider__marks {
          top: 0;
          bottom: 0;
          left: 50%;
          right: auto;
          width: var(--slider-track-height);
          height: 100%;
          transform: translateX(-50%);
        }

        .slider__mark {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 2px;
          height: calc(var(--slider-track-height) + 4px);
          background-color: var(--color-neutral-5, #9ca3af);
        }

        :host([orientation="vertical"]) .slider__mark {
          left: 50%;
          top: auto;
          transform: translate(-50%, 50%);
          width: calc(var(--slider-track-height) + 4px);
          height: 2px;
        }
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
