type DateSelectDetail =
  | { value: Date | null }
  | { startDate: Date | null; endDate: Date | null }
  | { dates: Date[] };

import { datePickerStyles } from "./date-picker.styles";

export type DatePickerMode = "single" | "range" | "multiple";

export interface DatePickerDate {
  year: number;
  month: number; // 0-11
  day: number;
  date: Date;
}

export class HaDatePicker extends HTMLElement {
  private _value: Date | null = null;
  private _startDate: Date | null = null;
  private _endDate: Date | null = null;
  private _selectedDates: Date[] = [];
  private _currentYear: number;
  private _currentMonth: number;
  private _isOpen = false;
  private _tempStartDate: Date | null = null; // For range selection

  private inputElement!: HTMLInputElement;
  private calendarElement!: HTMLDivElement;
  private daysContainer!: HTMLDivElement;
  private monthYearElement!: HTMLDivElement;

  static get observedAttributes() {
    return [
      "mode",
      "value",
      "min-date",
      "max-date",
      "disabled",
      "required",
      "error",
      "readonly",
      "inline",
      "show-week-numbers",
      "show-today-button",
      "show-clear-button",
      "first-day-of-week",
      "locale",
      "format",
      "placeholder",
      "label",
      "helper-text",
      "error-text",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const today = new Date();
    this._currentYear = today.getFullYear();
    this._currentMonth = today.getMonth();
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    if (this.inline) {
      this._isOpen = true;
      this.updateCalendarVisibility();
    }
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Getters & Setters
  get mode(): DatePickerMode {
    return (this.getAttribute("mode") as DatePickerMode) || "single";
  }

  set mode(value: DatePickerMode) {
    this.setAttribute("mode", value);
  }

  get value(): string {
    return this.getAttribute("value") || "";
  }

  set value(value: string) {
    this.setAttribute("value", value);
  }

  get minDate(): Date | null {
    const value = this.getAttribute("min-date");
    return value ? new Date(value) : null;
  }

  set minDate(value: Date | null) {
    if (value) {
      this.setAttribute("min-date", value.toISOString());
    } else {
      this.removeAttribute("min-date");
    }
  }

  get maxDate(): Date | null {
    const value = this.getAttribute("max-date");
    return value ? new Date(value) : null;
  }

  set maxDate(value: Date | null) {
    if (value) {
      this.setAttribute("max-date", value.toISOString());
    } else {
      this.removeAttribute("max-date");
    }
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get required(): boolean {
    return this.hasAttribute("required");
  }

  set required(value: boolean) {
    if (value) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
  }

  get error(): boolean {
    return this.hasAttribute("error");
  }

  set error(value: boolean) {
    if (value) {
      this.setAttribute("error", "");
    } else {
      this.removeAttribute("error");
    }
  }

  get readonly(): boolean {
    return this.hasAttribute("readonly");
  }

  set readonly(value: boolean) {
    if (value) {
      this.setAttribute("readonly", "");
    } else {
      this.removeAttribute("readonly");
    }
  }

  get inline(): boolean {
    return this.hasAttribute("inline");
  }

  set inline(value: boolean) {
    if (value) {
      this.setAttribute("inline", "");
    } else {
      this.removeAttribute("inline");
    }
  }

  get showWeekNumbers(): boolean {
    return this.hasAttribute("show-week-numbers");
  }

  set showWeekNumbers(value: boolean) {
    if (value) {
      this.setAttribute("show-week-numbers", "");
    } else {
      this.removeAttribute("show-week-numbers");
    }
  }

  get showTodayButton(): boolean {
    return this.hasAttribute("show-today-button");
  }

  set showTodayButton(value: boolean) {
    if (value) {
      this.setAttribute("show-today-button", "");
    } else {
      this.removeAttribute("show-today-button");
    }
  }

  get showClearButton(): boolean {
    return this.hasAttribute("show-clear-button");
  }

  set showClearButton(value: boolean) {
    if (value) {
      this.setAttribute("show-clear-button", "");
    } else {
      this.removeAttribute("show-clear-button");
    }
  }

  get firstDayOfWeek(): 0 | 1 {
    const value = this.getAttribute("first-day-of-week");
    return value === "1" ? 1 : 0;
  }

  set firstDayOfWeek(value: 0 | 1) {
    this.setAttribute("first-day-of-week", String(value));
  }

  get locale(): string {
    return this.getAttribute("locale") || "en";
  }

  set locale(value: string) {
    this.setAttribute("locale", value);
  }

  get format(): string {
    return this.getAttribute("format") || "YYYY-MM-DD";
  }

  set format(value: string) {
    this.setAttribute("format", value);
  }

  get placeholder(): string {
    return this.getAttribute("placeholder") || "Select date";
  }

  set placeholder(value: string) {
    this.setAttribute("placeholder", value);
  }

  // Public API
  getValue(): Date | null {
    return this._value;
  }

  setValue(value: Date | string): void {
    const date = typeof value === "string" ? new Date(value) : value;
    if (isNaN(date.getTime())) {
      console.warn("Invalid date provided to setValue");
      return;
    }
    this._value = date;
    this._currentYear = date.getFullYear();
    this._currentMonth = date.getMonth();
    this.updateInput();
    this.renderCalendar();
    this.dispatchDateSelect();
  }

  clear(): void {
    this._value = null;
    this._startDate = null;
    this._endDate = null;
    this._selectedDates = [];
    this._tempStartDate = null;
    this.updateInput();
    this.renderCalendar();
    this.dispatchDateClear();
  }

  open(): void {
    if (this.disabled || this.readonly || this.inline) return;
    this._isOpen = true;
    this.updateCalendarVisibility();
    this.dispatchCalendarOpen();
  }

  close(): void {
    if (this.inline) return;
    this._isOpen = false;
    this.updateCalendarVisibility();
    this.dispatchCalendarClose();
  }

  toggle(): void {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  goToToday(): void {
    const today = new Date();
    this._currentYear = today.getFullYear();
    this._currentMonth = today.getMonth();
    this.renderCalendar();
  }

  goToMonth(year: number, month: number): void {
    this._currentYear = year;
    this._currentMonth = month;
    this.renderCalendar();
    this.dispatchMonthChange();
  }

  nextMonth(): void {
    if (this._currentMonth === 11) {
      this._currentMonth = 0;
      this._currentYear++;
    } else {
      this._currentMonth++;
    }
    this.renderCalendar();
    this.dispatchMonthChange();
  }

  previousMonth(): void {
    if (this._currentMonth === 0) {
      this._currentMonth = 11;
      this._currentYear--;
    } else {
      this._currentMonth--;
    }
    this.renderCalendar();
    this.dispatchMonthChange();
  }

  validate(): boolean {
    if (this.required) {
      if (this.mode === "single" && !this._value) {
        return false;
      }
      if (this.mode === "range" && (!this._startDate || !this._endDate)) {
        return false;
      }
      if (this.mode === "multiple" && this._selectedDates.length === 0) {
        return false;
      }
    }
    return true;
  }

  isDateDisabled(date: Date): boolean {
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  // Helper methods
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Simple format support
    return this.format
      .replace("YYYY", String(year))
      .replace("MM", month)
      .replace("DD", day);
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private isInRange(date: Date): boolean {
    if (this.mode !== "range" || !this._startDate || !this._endDate) {
      return false;
    }
    return date >= this._startDate && date <= this._endDate;
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getFirstDayOfMonth(year: number, month: number): number {
    const day = new Date(year, month, 1).getDay();
    // Adjust for firstDayOfWeek
    return this.firstDayOfWeek === 1 ? (day === 0 ? 6 : day - 1) : day;
  }

  private getMonthName(month: number): string {
    const date = new Date(2000, month, 1);
    return date.toLocaleDateString(this.locale, { month: "long" });
  }

  private getWeekdayNames(): string[] {
    const names: string[] = [];
    const baseDate = new Date(2000, 0, 2 + this.firstDayOfWeek); // Sunday or Monday

    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      names.push(date.toLocaleDateString(this.locale, { weekday: "short" }));
    }

    return names;
  }

  // Event handlers
  private handleInputClick = () => {
    this.toggle();
  };

  private handleInputFocus = () => {
    if (!this.readonly && !this.disabled) {
      this.open();
    }
  };

  private handlePreviousMonth = () => {
    this.previousMonth();
  };

  private handleNextMonth = () => {
    this.nextMonth();
  };

  private handleDayClick = (date: Date) => {
    if (this.isDateDisabled(date)) return;

    if (this.mode === "single") {
      this._value = date;
      this.updateInput();
      this.renderCalendar();
      this.dispatchDateSelect();
      if (!this.inline) {
        this.close();
      }
    } else if (this.mode === "range") {
      if (!this._tempStartDate || (this._tempStartDate && this._endDate)) {
        // Start new range
        this._tempStartDate = date;
        this._startDate = date;
        this._endDate = null;
      } else {
        // Complete range
        if (date < this._tempStartDate) {
          this._startDate = date;
          this._endDate = this._tempStartDate;
        } else {
          this._startDate = this._tempStartDate;
          this._endDate = date;
        }
        this._tempStartDate = null;
        this.updateInput();
        this.dispatchDateSelect();
        if (!this.inline) {
          this.close();
        }
      }
      this.renderCalendar();
    } else if (this.mode === "multiple") {
      const index = this._selectedDates.findIndex((d) => this.isSameDay(d, date));
      if (index !== -1) {
        this._selectedDates.splice(index, 1);
      } else {
        this._selectedDates.push(date);
      }
      this.updateInput();
      this.renderCalendar();
      this.dispatchDateSelect();
    }
  };

  private handleTodayClick = () => {
    this.goToToday();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.handleDayClick(today);
  };

  private handleClearClick = () => {
    this.clear();
  };

  private handleClickOutside = (e: MouseEvent) => {
    if (!this._isOpen || this.inline) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.close();
    }
  };

  private attachEventListeners() {
    document.addEventListener("click", this.handleClickOutside);
  }

  private detachEventListeners() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  // Event dispatchers
  private dispatchDateSelect() {
    let detail: DateSelectDetail;

    if (this.mode === "single") {
      detail = { value: this._value };
    } else if (this.mode === "range") {
      detail = { startDate: this._startDate, endDate: this._endDate };
    } else {
      detail = { dates: [...this._selectedDates] };
    }

    this.dispatchEvent(
      new CustomEvent("date-select", {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchDateClear() {
    this.dispatchEvent(
      new CustomEvent("date-clear", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchMonthChange() {
    this.dispatchEvent(
      new CustomEvent("month-change", {
        detail: {
          year: this._currentYear,
          month: this._currentMonth,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchCalendarOpen() {
    this.dispatchEvent(
      new CustomEvent("calendar-open", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private dispatchCalendarClose() {
    this.dispatchEvent(
      new CustomEvent("calendar-close", {
        bubbles: true,
        composed: true,
      })
    );
  }

  // Rendering
  private updateInput() {
    if (!this.inputElement) return;

    let displayValue = "";

    if (this.mode === "single" && this._value) {
      displayValue = this.formatDate(this._value);
    } else if (this.mode === "range" && this._startDate) {
      displayValue = this.formatDate(this._startDate);
      if (this._endDate) {
        displayValue += ` - ${this.formatDate(this._endDate)}`;
      }
    } else if (this.mode === "multiple" && this._selectedDates.length > 0) {
      displayValue = `${this._selectedDates.length} dates selected`;
    }

    this.inputElement.value = displayValue;
  }

  private updateCalendarVisibility() {
    if (!this.calendarElement) return;

    if (this._isOpen || this.inline) {
      this.calendarElement.classList.add("date-picker__calendar--open");
    } else {
      this.calendarElement.classList.remove("date-picker__calendar--open");
    }
  }

  private renderCalendar() {
    if (!this.daysContainer || !this.monthYearElement) return;

    // Update month/year display
    this.monthYearElement.textContent = `${this.getMonthName(
      this._currentMonth
    )} ${this._currentYear}`;

    // Generate calendar days
    const daysInMonth = this.getDaysInMonth(this._currentYear, this._currentMonth);
    const firstDay = this.getFirstDayOfMonth(this._currentYear, this._currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.daysContainer.innerHTML = "";

    // Previous month days
    const prevMonthDays = this.getDaysInMonth(
      this._currentMonth === 0 ? this._currentYear - 1 : this._currentYear,
      this._currentMonth === 0 ? 11 : this._currentMonth - 1
    );

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(
        this._currentMonth === 0 ? this._currentYear - 1 : this._currentYear,
        this._currentMonth === 0 ? 11 : this._currentMonth - 1,
        day
      );
      this.daysContainer.appendChild(this.createDayButton(date, true));
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this._currentYear, this._currentMonth, day);
      this.daysContainer.appendChild(this.createDayButton(date, false));
    }

    // Next month days
    const remainingCells = 42 - this.daysContainer.children.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(
        this._currentMonth === 11 ? this._currentYear + 1 : this._currentYear,
        this._currentMonth === 11 ? 0 : this._currentMonth + 1,
        day
      );
      this.daysContainer.appendChild(this.createDayButton(date, true));
    }
  }

  private createDayButton(date: Date, isOutside: boolean): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = "date-picker__day";
    button.textContent = String(date.getDate());
    button.setAttribute("type", "button");
    button.setAttribute("part", "day");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isOutside) {
      button.classList.add("date-picker__day--outside");
    }

    if (this.isSameDay(date, today)) {
      button.classList.add("date-picker__day--today");
      button.setAttribute("part", "day day--today");
    }

    if (this.mode === "single" && this._value && this.isSameDay(date, this._value)) {
      button.classList.add("date-picker__day--selected");
      button.setAttribute("part", "day day--selected");
      button.setAttribute("aria-selected", "true");
    }

    if (this.mode === "range") {
      if (this._startDate && this.isSameDay(date, this._startDate)) {
        button.classList.add("date-picker__day--selected", "date-picker__day--range-start");
        button.setAttribute("aria-selected", "true");
      }
      if (this._endDate && this.isSameDay(date, this._endDate)) {
        button.classList.add("date-picker__day--selected", "date-picker__day--range-end");
        button.setAttribute("aria-selected", "true");
      }
      if (this.isInRange(date)) {
        button.classList.add("date-picker__day--in-range");
      }
    }

    if (this.mode === "multiple") {
      const isSelected = this._selectedDates.some((d) => this.isSameDay(d, date));
      if (isSelected) {
        button.classList.add("date-picker__day--selected");
        button.setAttribute("aria-selected", "true");
      }
    }

    const isDisabled = this.isDateDisabled(date);
    if (isDisabled) {
      button.classList.add("date-picker__day--disabled");
      button.disabled = true;
      button.setAttribute("part", "day day--disabled");
    }

    button.addEventListener("click", () => this.handleDayClick(date));

    return button;
  }

  render() {
    if (!this.shadowRoot) return;

    const label = this.getAttribute("label") || "";
    const helperText = this.getAttribute("helper-text") || "";
    const errorText = this.getAttribute("error-text") || "";

    const containerClasses = [
      "date-picker",
      this.error ? "date-picker--error" : "",
      this.inline ? "date-picker--inline" : "",
    ]
      .filter(Boolean)
      .join(" ");

    this.shadowRoot.innerHTML = `
      <style>${datePickerStyles}</style>
      <div class="${containerClasses}" part="container">
        ${label ? `<label class="date-picker__label" part="label">${label}</label>` : ""}

        ${
          !this.inline
            ? `
          <div class="date-picker__input-wrapper" part="input-wrapper">
            <input
              type="text"
              class="date-picker__input"
              part="input"
              placeholder="${this.placeholder}"
              ?disabled="${this.disabled}"
              ?readonly="${this.readonly || true}"
              ?required="${this.required}"
            />
            <svg class="date-picker__icon" part="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
          </div>
        `
            : ""
        }

        <div class="date-picker__calendar ${this.inline ? "date-picker__calendar--open" : ""}" part="calendar">
          <div class="date-picker__header" part="header">
            <button
              type="button"
              class="date-picker__nav-button"
              part="nav-button"
              aria-label="Previous month"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>

            <div class="date-picker__month-year" part="month-year-select"></div>

            <button
              type="button"
              class="date-picker__nav-button"
              part="nav-button"
              aria-label="Next month"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div class="date-picker__weekdays" part="weekdays">
            ${this.getWeekdayNames()
              .map(
                (name) =>
                  `<div class="date-picker__weekday" part="weekday">${name.substring(0, 2)}</div>`
              )
              .join("")}
          </div>

          <div class="date-picker__days" part="days"></div>

          ${
            this.showTodayButton || this.showClearButton
              ? `
            <div class="date-picker__footer" part="footer">
              ${
                this.showTodayButton
                  ? `<button type="button" class="date-picker__footer-button" part="today-button">Today</button>`
                  : ""
              }
              ${
                this.showClearButton
                  ? `<button type="button" class="date-picker__footer-button" part="clear-button">Clear</button>`
                  : ""
              }
            </div>
          `
              : ""
          }
        </div>

        ${helperText && !this.error ? `<span class="date-picker__helper-text" part="helper-text">${helperText}</span>` : ""}
        ${this.error && errorText ? `<span class="date-picker__error-text" part="error-text">${errorText}</span>` : ""}
      </div>
    `;

    // Get element references
    if (!this.inline) {
      this.inputElement = this.shadowRoot.querySelector(
        ".date-picker__input"
      ) as HTMLInputElement;
      this.inputElement?.addEventListener("click", this.handleInputClick);
      this.inputElement?.addEventListener("focus", this.handleInputFocus);
    }

    this.calendarElement = this.shadowRoot.querySelector(
      ".date-picker__calendar"
    ) as HTMLDivElement;
    this.daysContainer = this.shadowRoot.querySelector(
      ".date-picker__days"
    ) as HTMLDivElement;
    this.monthYearElement = this.shadowRoot.querySelector(
      ".date-picker__month-year"
    ) as HTMLDivElement;

    const prevButton = this.shadowRoot.querySelector(
      ".date-picker__nav-button:first-of-type"
    ) as HTMLButtonElement;
    const nextButton = this.shadowRoot.querySelector(
      ".date-picker__nav-button:last-of-type"
    ) as HTMLButtonElement;

    prevButton?.addEventListener("click", this.handlePreviousMonth);
    nextButton?.addEventListener("click", this.handleNextMonth);

    if (this.showTodayButton) {
      const todayButton = this.shadowRoot.querySelector(
        '[part="today-button"]'
      ) as HTMLButtonElement;
      todayButton?.addEventListener("click", this.handleTodayClick);
    }

    if (this.showClearButton) {
      const clearButton = this.shadowRoot.querySelector(
        '[part="clear-button"]'
      ) as HTMLButtonElement;
      clearButton?.addEventListener("click", this.handleClearClick);
    }

    this.renderCalendar();
    this.updateInput();
  }
}

customElements.define("ha-date-picker", HaDatePicker);
