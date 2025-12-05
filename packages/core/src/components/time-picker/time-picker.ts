import { styles } from "./time-picker.styles";

export type TimePickerFormat = "12" | "24";
export type TimePickerPeriod = "AM" | "PM";

export interface TimePickerDate {
  hour: number;
  minute: number;
  second?: number;
  period?: TimePickerPeriod;
}

/**
 * TimePicker component
 *
 * A time selection component with support for 12-hour and 24-hour formats.
 *
 * @element ha-time-picker
 *
 * @fires {CustomEvent} time-select - Fired when a time is selected
 * @fires {CustomEvent} time-clear - Fired when the time is cleared
 * @fires {CustomEvent} picker-open - Fired when the picker opens
 * @fires {CustomEvent} picker-close - Fired when the picker closes
 *
 * @cssprop --ha-time-picker-width - Width of the component
 * @cssprop --ha-time-picker-input-height - Height of the input
 * @cssprop --ha-time-picker-panel-width - Width of the picker panel
 * @cssprop --ha-time-picker-panel-max-height - Maximum height of the picker panel
 *
 * @csspart container - Main container
 * @csspart input-wrapper - Input wrapper
 * @csspart input - Time input field
 * @csspart icon - Clock icon
 * @csspart toggle - Dropdown toggle
 * @csspart label - Label element
 * @csspart helper-text - Helper text
 * @csspart error-text - Error message
 * @csspart panel - Picker panel
 * @csspart column-header - Column header
 * @csspart column - Time column
 * @csspart item - Time item
 * @csspart item-selected - Selected time item
 * @csspart item-disabled - Disabled time item
 * @csspart period-toggle - AM/PM toggle
 * @csspart actions - Action buttons container
 * @csspart now-button - Now button
 * @csspart clear-button - Clear button
 */
export class HaTimePicker extends HTMLElement {
  private _hour: number = 0;
  private _minute: number = 0;
  private _second: number = 0;
  private _period: TimePickerPeriod = "AM";
  private _isOpen = false;
  private _shadowRoot: ShadowRoot;
  private _hasValue = false; // Track if a value has been set

  // Attribute properties
  public format: TimePickerFormat = "24";
  public showSeconds = false;
  public hourStep = 1;
  public minuteStep = 1;
  public secondStep = 1;
  public minTime: string | null = null;
  public maxTime: string | null = null;
  public disabledHours: number[] = [];
  public disabledMinutes: number[] = [];
  public inline = false;
  public placeholder = "";
  public disabled = false;
  public required = false;
  public error = false;
  public readonly = false;
  public showNowButton = false;
  public showClearButton = false;

  static get observedAttributes() {
    return [
      "value",
      "format",
      "show-seconds",
      "hour-step",
      "minute-step",
      "second-step",
      "min-time",
      "max-time",
      "disabled-hours",
      "disabled-minutes",
      "inline",
      "placeholder",
      "label",
      "helper-text",
      "error-text",
      "disabled",
      "required",
      "error",
      "readonly",
      "show-now-button",
      "show-clear-button",
    ];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    if (this.inline) {
      this._isOpen = true;
      this.render();
    }
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ) {
    switch (name) {
      case "value":
        if (newValue) {
          this.parseValue(newValue);
          this._hasValue = true;
        } else {
          this._hasValue = false;
        }
        break;
      case "format":
        this.format = (newValue as TimePickerFormat) || "24";
        break;
      case "show-seconds":
        this.showSeconds = newValue !== null;
        break;
      case "hour-step": {
        const newHourStep = parseInt(newValue || "", 10);
        this.hourStep = isNaN(newHourStep) ? 1 : newHourStep;
        break;
      }
      case "minute-step": {
        const newMinuteStep = parseInt(newValue || "", 10);
        this.minuteStep = isNaN(newMinuteStep) ? 1 : newMinuteStep;
        break;
      }
      case "second-step": {
        const newSecondStep = parseInt(newValue || "", 10);
        this.secondStep = isNaN(newSecondStep) ? 1 : newSecondStep;
        break;
      }
      case "min-time":
        this.minTime = newValue;
        break;
      case "max-time":
        this.maxTime = newValue;
        break;
      case "disabled-hours":
        this.disabledHours = newValue
          ? newValue.split(",").map((h) => parseInt(h.trim(), 10))
          : [];
        break;
      case "disabled-minutes":
        this.disabledMinutes = newValue
          ? newValue.split(",").map((m) => parseInt(m.trim(), 10))
          : [];
        break;
      case "inline":
        this.inline = newValue !== null;
        if (this.inline) {
          this._isOpen = true;
        }
        break;
      case "placeholder":
        this.placeholder = newValue || "";
        break;
      case "disabled":
        this.disabled = newValue !== null;
        break;
      case "required":
        this.required = newValue !== null;
        break;
      case "error":
        this.error = newValue !== null;
        break;
      case "readonly":
        this.readonly = newValue !== null;
        break;
      case "show-now-button":
        this.showNowButton = newValue !== null;
        break;
      case "show-clear-button":
        this.showClearButton = newValue !== null;
        break;
    }
    this.render();
  }

  // Public API Methods

  /**
   * Get the current time value
   */
  getValue(): string | null {
    if (!this._hasValue) {
      return null;
    }
    return this.formatValue();
  }

  /**
   * Set the time value
   */
  setValue(value: string): void {
    this.parseValue(value);
    this._hasValue = true;
    this.setAttribute("value", value);
    this.render();
  }

  /**
   * Clear the time value
   */
  clear(): void {
    this._hour = 0;
    this._minute = 0;
    this._second = 0;
    this._period = "AM";
    this._hasValue = false;
    this.removeAttribute("value");
    this.dispatchEvent(
      new CustomEvent("time-clear", {
        bubbles: true,
        composed: true,
      })
    );
    this.render();
  }

  /**
   * Open the time picker
   */
  open(): void {
    if (this.disabled || this.readonly || this.inline) return;
    this._isOpen = true;
    this.render();
    this.scrollToSelected();
    this.dispatchEvent(
      new CustomEvent("picker-open", {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Close the time picker
   */
  close(): void {
    if (this.inline) return;
    this._isOpen = false;
    this.render();
    this.dispatchEvent(
      new CustomEvent("picker-close", {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Toggle the time picker
   */
  toggle(): void {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Set the time to now
   */
  setNow(): void {
    const now = new Date();
    this.setTime(now.getHours(), now.getMinutes(), now.getSeconds());
  }

  /**
   * Set a specific time
   */
  setTime(hour: number, minute: number, second = 0): void {
    if (this.format === "12") {
      if (hour === 0) {
        this._hour = 12;
        this._period = "AM";
      } else if (hour === 12) {
        this._hour = 12;
        this._period = "PM";
      } else if (hour > 12) {
        this._hour = hour - 12;
        this._period = "PM";
      } else {
        this._hour = hour;
        this._period = "AM";
      }
    } else {
      this._hour = hour;
    }
    this._minute = minute;
    this._second = second;
    this._hasValue = true;

    this.setAttribute("value", this.formatValue());
    this.emitTimeSelect();
    this.render();
  }

  /**
   * Validate the current time
   */
  validate(): boolean {
    if (this.required && !this.getValue()) {
      return false;
    }

    const value = this.getValue();
    if (!value) return true;

    if (this.isTimeDisabled(this._hour, this._minute, this._second)) {
      return false;
    }

    return true;
  }

  /**
   * Check if a specific hour value is disabled in the hour column
   */
  private isHourDisabled(hourValue: number): boolean {
    // Convert to 24-hour format based on current period
    let hour24 = hourValue;
    if (this.format === "12") {
      if (this._period === "PM" && hourValue !== 12) {
        hour24 = hourValue + 12;
      } else if (this._period === "AM" && hourValue === 12) {
        hour24 = 0;
      }
    }

    // Check disabledHours
    if (this.disabledHours.includes(hour24)) {
      return true;
    }

    // Check minTime/maxTime (assume minute 0 for hour-only check)
    if (this.minTime || this.maxTime) {
      // For maxTime, check if this hour could have any valid minutes
      if (this.maxTime) {
        const maxHour = parseInt(this.maxTime.split(":")[0], 10);
        if (hour24 > maxHour) {
          return true;
        }
      }

      // For minTime, check if this hour could have any valid minutes
      if (this.minTime) {
        const minHour = parseInt(this.minTime.split(":")[0], 10);
        if (hour24 < minHour) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Check if a specific minute value is disabled in the minute column
   */
  private isMinuteDisabled(minuteValue: number): boolean {
    // Check disabledMinutes
    if (this.disabledMinutes.includes(minuteValue)) {
      return true;
    }

    // Check minTime/maxTime with current hour selection
    if (this.minTime || this.maxTime) {
      let hour24 = this._hour;
      if (this.format === "12") {
        if (this._period === "PM" && this._hour !== 12) {
          hour24 = this._hour + 12;
        } else if (this._period === "AM" && this._hour === 12) {
          hour24 = 0;
        }
      }

      const timeStr = `${String(hour24).padStart(2, "0")}:${String(minuteValue).padStart(2, "0")}`;

      if (this.minTime && timeStr < this.minTime) {
        return true;
      }
      if (this.maxTime && timeStr > this.maxTime) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if a specific second value is disabled in the second column
   */
  private isSecondDisabled(secondValue: number): boolean {
    // Check minTime/maxTime with current hour and minute selection
    if (this.minTime || this.maxTime) {
      let hour24 = this._hour;
      if (this.format === "12") {
        if (this._period === "PM" && this._hour !== 12) {
          hour24 = this._hour + 12;
        } else if (this._period === "AM" && this._hour === 12) {
          hour24 = 0;
        }
      }

      const timeStr = `${String(hour24).padStart(2, "0")}:${String(this._minute).padStart(2, "0")}:${String(secondValue).padStart(2, "0")}`;

      if (this.minTime && timeStr < this.minTime) {
        return true;
      }
      if (this.maxTime && timeStr > this.maxTime) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if a time is disabled
   */
  isTimeDisabled(hour: number, minute: number, second = 0): boolean {
    // Convert to 24-hour format for comparison
    let hour24 = hour;
    if (this.format === "12") {
      if (this._period === "PM" && hour !== 12) {
        hour24 = hour + 12;
      } else if (this._period === "AM" && hour === 12) {
        hour24 = 0;
      }
    }

    // Check disabled hours
    if (this.disabledHours.includes(hour24)) {
      return true;
    }

    // Check disabled minutes
    if (this.disabledMinutes.includes(minute)) {
      return true;
    }

    // Check min/max time
    if (this.minTime || this.maxTime) {
      const timeStr = this.showSeconds
        ? `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
        : `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

      if (this.minTime && timeStr < this.minTime) {
        return true;
      }
      if (this.maxTime && timeStr > this.maxTime) {
        return true;
      }
    }

    return false;
  }

  // Private Methods

  private parseValue(value: string): void {
    if (!value) return;

    const parts = value.split(":");
    if (parts.length < 2) return;

    const hour = parseInt(parts[0], 10);
    const minute = parseInt(parts[1], 10);
    const second = parts[2] ? parseInt(parts[2], 10) : 0;

    if (this.format === "12") {
      if (hour === 0) {
        this._hour = 12;
        this._period = "AM";
      } else if (hour === 12) {
        this._hour = 12;
        this._period = "PM";
      } else if (hour > 12) {
        this._hour = hour - 12;
        this._period = "PM";
      } else {
        this._hour = hour;
        this._period = "AM";
      }
    } else {
      this._hour = hour;
    }

    this._minute = minute;
    this._second = second;
  }

  private formatValue(): string {
    let hour24 = this._hour;
    if (this.format === "12") {
      if (this._period === "PM" && this._hour !== 12) {
        hour24 = this._hour + 12;
      } else if (this._period === "AM" && this._hour === 12) {
        hour24 = 0;
      }
    }

    const hourStr = String(hour24).padStart(2, "0");
    const minuteStr = String(this._minute).padStart(2, "0");

    if (this.showSeconds) {
      const secondStr = String(this._second).padStart(2, "0");
      return `${hourStr}:${minuteStr}:${secondStr}`;
    }

    return `${hourStr}:${minuteStr}`;
  }

  private getDisplayValue(): string {
    const value24 = this.getValue();
    if (!value24) return this.placeholder;

    if (this.format === "12") {
      const parts = value24.split(":");
      let hour = parseInt(parts[0], 10);
      const minute = parts[1];

      let period = "AM";
      if (hour === 0) {
        hour = 12;
      } else if (hour === 12) {
        period = "PM";
      } else if (hour > 12) {
        hour = hour - 12;
        period = "PM";
      }

      const hourStr = String(hour);
      const minuteStr = String(minute).padStart(2, "0");

      if (this.showSeconds && parts[2]) {
        const secondStr = String(parts[2]).padStart(2, "0");
        return `${hourStr}:${minuteStr}:${secondStr} ${period}`;
      }

      return `${hourStr}:${minuteStr} ${period}`;
    }

    return value24;
  }

  private emitTimeSelect(): void {
    let hour24 = this._hour;
    if (this.format === "12") {
      if (this._period === "PM" && this._hour !== 12) {
        hour24 = this._hour + 12;
      } else if (this._period === "AM" && this._hour === 12) {
        hour24 = 0;
      }
    }

    this.dispatchEvent(
      new CustomEvent("time-select", {
        bubbles: true,
        composed: true,
        detail: {
          value: this.formatValue(),
          hour: this._hour,
          minute: this._minute,
          second: this.showSeconds ? this._second : undefined,
          period: this.format === "12" ? this._period : undefined,
          hour24: hour24,
        },
      })
    );
  }

  private getHourOptions(): number[] {
    const options: number[] = [];
    const max = this.format === "12" ? 12 : 23;
    const min = this.format === "12" ? 1 : 0;

    for (let i = min; i <= max; i += this.hourStep) {
      options.push(i);
    }

    return options;
  }

  private getMinuteOptions(): number[] {
    const options: number[] = [];
    for (let i = 0; i <= 59; i += this.minuteStep) {
      options.push(i);
    }
    return options;
  }

  private getSecondOptions(): number[] {
    const options: number[] = [];
    for (let i = 0; i <= 59; i += this.secondStep) {
      options.push(i);
    }
    return options;
  }

  private handleHourSelect(hour: number): void {
    if (this.disabled || this.readonly) return;

    // Phase 3: Validate before accepting selection
    if (this.isHourDisabled(hour)) {
      return;
    }

    this._hour = hour;
    this._hasValue = true;
    this.setAttribute("value", this.formatValue());
    this.emitTimeSelect();
    this.render();
  }

  private handleMinuteSelect(minute: number): void {
    if (this.disabled || this.readonly) return;

    // Phase 3: Validate before accepting selection
    if (this.isMinuteDisabled(minute)) {
      return;
    }

    this._minute = minute;
    this._hasValue = true;
    this.setAttribute("value", this.formatValue());
    this.emitTimeSelect();
    this.render();
  }

  private handleSecondSelect(second: number): void {
    if (this.disabled || this.readonly) return;

    // Phase 3: Validate before accepting selection
    if (this.isSecondDisabled(second)) {
      return;
    }

    this._second = second;
    this._hasValue = true;
    this.setAttribute("value", this.formatValue());
    this.emitTimeSelect();
    this.render();
  }

  private handlePeriodToggle(period: TimePickerPeriod): void {
    if (this.disabled || this.readonly) return;

    // Phase 3: Validate before accepting period change
    // Temporarily set the period to check if the time would be valid
    const oldPeriod = this._period;
    this._period = period;

    // Check if the current hour would be disabled with the new period
    if (this.isHourDisabled(this._hour)) {
      // Revert to old period and don't allow the change
      this._period = oldPeriod;
      return;
    }

    // Check if the current minute would be disabled with the new period
    if (this.isMinuteDisabled(this._minute)) {
      // Revert to old period and don't allow the change
      this._period = oldPeriod;
      return;
    }

    // Check if the current second would be disabled with the new period (if showing seconds)
    if (this.showSeconds && this.isSecondDisabled(this._second)) {
      // Revert to old period and don't allow the change
      this._period = oldPeriod;
      return;
    }

    this._hasValue = true;
    this.setAttribute("value", this.formatValue());
    this.emitTimeSelect();
    this.render();
  }

  private handleNowClick(): void {
    if (this.disabled || this.readonly) return;
    this.setNow();
  }

  private handleClearClick(): void {
    if (this.disabled || this.readonly) return;
    this.clear();
  }

  private handleInputClick(): void {
    if (!this.inline) {
      this.toggle();
    }
  }

  private handleDocumentClick = (e: Event): void => {
    if (this.inline) return;
    const target = e.target as Node;
    if (!this.contains(target) && !this._shadowRoot.contains(target)) {
      this.close();
    }
  };

  private scrollToSelected(): void {
    // Wait for render
    setTimeout(() => {
      const hourColumn = this._shadowRoot.querySelector(
        '[data-column="hour"]'
      ) as HTMLElement;
      const minuteColumn = this._shadowRoot.querySelector(
        '[data-column="minute"]'
      ) as HTMLElement;
      const secondColumn = this._shadowRoot.querySelector(
        '[data-column="second"]'
      ) as HTMLElement;

      if (hourColumn) {
        const selectedHour = hourColumn.querySelector(
          ".item.selected"
        ) as HTMLElement;
        if (selectedHour) {
          hourColumn.scrollTop =
            selectedHour.offsetTop -
            hourColumn.offsetHeight / 2 +
            selectedHour.offsetHeight / 2;
        }
      }

      if (minuteColumn) {
        const selectedMinute = minuteColumn.querySelector(
          ".item.selected"
        ) as HTMLElement;
        if (selectedMinute) {
          minuteColumn.scrollTop =
            selectedMinute.offsetTop -
            minuteColumn.offsetHeight / 2 +
            selectedMinute.offsetHeight / 2;
        }
      }

      if (secondColumn) {
        const selectedSecond = secondColumn.querySelector(
          ".item.selected"
        ) as HTMLElement;
        if (selectedSecond) {
          secondColumn.scrollTop =
            selectedSecond.offsetTop -
            secondColumn.offsetHeight / 2 +
            selectedSecond.offsetHeight / 2;
        }
      }
    }, 0);
  }

  private attachEventListeners(): void {
    document.addEventListener("click", this.handleDocumentClick);
  }

  private detachEventListeners(): void {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  private render(): void {
    const label = this.getAttribute("label");
    const helperText = this.getAttribute("helper-text");
    const errorText = this.getAttribute("error-text");

    const containerClasses = ["container"];
    if (this.disabled) containerClasses.push("disabled");
    if (this.error) containerClasses.push("error");
    if (this.readonly) containerClasses.push("readonly");
    if (this.inline) containerClasses.push("inline");

    this._shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="${containerClasses.join(" ")}" part="container">
        ${label ? `<label part="label">${label}</label>` : ""}

        ${
          !this.inline
            ? `
          <div class="input-wrapper" part="input-wrapper">
            <span class="icon" part="icon">🕐</span>
            <input
              type="text"
              class="input"
              part="input"
              value="${this.getDisplayValue()}"
              placeholder="${this.placeholder}"
              ?disabled="${this.disabled}"
              ?readonly="${this.readonly}"
              readonly
            />
            <span class="toggle" part="toggle">▼</span>
          </div>
        `
            : ""
        }

        ${this._isOpen ? this.renderPanel() : ""}

        ${
          helperText && !this.error
            ? `<div class="helper-text" part="helper-text">${helperText}</div>`
            : ""
        }
        ${
          errorText && this.error
            ? `<div class="error-text" part="error-text">${errorText}</div>`
            : ""
        }
      </div>
    `;

    // Attach event listeners after render
    if (!this.inline) {
      const inputWrapper = this._shadowRoot.querySelector(".input-wrapper");
      if (inputWrapper) {
        inputWrapper.addEventListener("click", () => this.handleInputClick());
      }
    }

    if (this._isOpen) {
      this.attachPanelEventListeners();
      this.scrollToSelected();
    }
  }

  private renderPanel(): string {
    const hourOptions = this.getHourOptions();
    const minuteOptions = this.getMinuteOptions();
    const secondOptions = this.getSecondOptions();

    return `
      <div class="panel" part="panel">
        <div class="columns">
          ${this.renderColumn("hour", "Hour", hourOptions, this._hour)}
          ${this.renderColumn("minute", "Min", minuteOptions, this._minute)}
          ${this.showSeconds ? this.renderColumn("second", "Sec", secondOptions, this._second) : ""}
          ${this.format === "12" ? this.renderPeriodColumn() : ""}
        </div>

        ${this.showNowButton || this.showClearButton ? this.renderActions() : ""}
      </div>
    `;
  }

  private renderColumn(
    type: string,
    header: string,
    options: number[],
    selected: number
  ): string {
    return `
      <div class="column" part="column" data-column="${type}">
        <div class="column-header" part="column-header">${header}</div>
        <div class="column-items">
          ${options
            .map((value) => {
              const isSelected = value === selected;
              let isDisabled = false;

              if (type === "hour") {
                isDisabled = this.isHourDisabled(value);
              } else if (type === "minute") {
                isDisabled = this.isMinuteDisabled(value);
              } else if (type === "second") {
                isDisabled = this.isSecondDisabled(value);
              }

              const classes = ["item"];
              if (isSelected) classes.push("selected");
              if (isDisabled) classes.push("disabled");

              return `
              <div
                class="${classes.join(" ")}"
                part="${isSelected ? "item-selected" : isDisabled ? "item-disabled" : "item"}"
                data-type="${type}"
                data-value="${value}"
              >
                ${String(value).padStart(2, "0")}
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  private renderPeriodColumn(): string {
    return `
      <div class="column period-column" part="column">
        <div class="column-header" part="column-header">Period</div>
        <div class="period-toggle" part="period-toggle">
          <button
            class="period-button ${this._period === "AM" ? "active" : ""}"
            data-period="AM"
          >
            AM
          </button>
          <button
            class="period-button ${this._period === "PM" ? "active" : ""}"
            data-period="PM"
          >
            PM
          </button>
        </div>
      </div>
    `;
  }

  private renderActions(): string {
    return `
      <div class="actions" part="actions">
        ${
          this.showNowButton
            ? `<button class="now-button" part="now-button">Now</button>`
            : ""
        }
        ${
          this.showClearButton
            ? `<button class="clear-button" part="clear-button">Clear</button>`
            : ""
        }
      </div>
    `;
  }

  private attachPanelEventListeners(): void {
    // Item clicks
    const items = this._shadowRoot.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const type = item.getAttribute("data-type");
        const value = parseInt(item.getAttribute("data-value") || "0", 10);
        const disabled = item.classList.contains("disabled");

        if (disabled) return;

        switch (type) {
          case "hour": {
            this.handleHourSelect(value);
            break;
          }
          case "minute": {
            this.handleMinuteSelect(value);
            break;
          }
          case "second": {
            this.handleSecondSelect(value);
            break;
          }
        }
      });
    });

    // Period toggle
    const periodButtons = this._shadowRoot.querySelectorAll(".period-button");
    periodButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const period = button.getAttribute("data-period") as TimePickerPeriod;
        this.handlePeriodToggle(period);
      });
    });

    // Action buttons
    const nowButton = this._shadowRoot.querySelector(".now-button");
    if (nowButton) {
      nowButton.addEventListener("click", () => this.handleNowClick());
    }

    const clearButton = this._shadowRoot.querySelector(".clear-button");
    if (clearButton) {
      clearButton.addEventListener("click", () => this.handleClearClick());
    }
  }
}

customElements.define("ha-time-picker", HaTimePicker);
