export const datePickerStyles = `
  :host {
    display: inline-block;
    position: relative;
    width: var(--ha-datepicker-width, 280px);
    font-family: var(--ha-font-family, system-ui, -apple-system, sans-serif);

    /* Base */
    --ha-datepicker-bg: var(--ha-color-white, #ffffff);
    --ha-datepicker-border-color: var(--ha-color-gray-300, #d1d5db);
    --ha-datepicker-border-radius: var(--ha-radius-md, 0.375rem);
    --ha-datepicker-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

    /* Input */
    --ha-datepicker-input-padding: 0.5rem 0.75rem;
    --ha-datepicker-input-font-size: var(--ha-font-size-base, 1rem);
    --ha-datepicker-input-height: 40px;

    /* Calendar */
    --ha-datepicker-calendar-padding: 1rem;
    --ha-datepicker-calendar-gap: 0.25rem;

    /* Header */
    --ha-datepicker-header-height: 40px;
    --ha-datepicker-header-font-weight: 600;

    /* Day cells */
    --ha-datepicker-day-size: 36px;
    --ha-datepicker-day-font-size: 0.875rem;
    --ha-datepicker-day-hover-bg: var(--ha-color-gray-100, #f3f4f6);
    --ha-datepicker-day-selected-bg: var(--ha-color-primary-500, #3b82f6);
    --ha-datepicker-day-selected-color: var(--ha-color-white, #ffffff);
    --ha-datepicker-day-today-border-color: var(--ha-color-primary-500, #3b82f6);
    --ha-datepicker-day-disabled-opacity: 0.4;
    --ha-datepicker-day-outside-opacity: 0.5;

    /* Range */
    --ha-datepicker-range-bg: var(--ha-color-primary-100, #dbeafe);
    --ha-datepicker-range-color: var(--ha-color-primary-900, #1e3a8a);
  }

  :host([inline]) {
    width: auto;
  }

  .date-picker {
    position: relative;
    width: 100%;
  }

  /* Input Field */
  .date-picker__input-wrapper {
    position: relative;
    width: 100%;
  }

  .date-picker__input {
    width: 100%;
    height: var(--ha-datepicker-input-height);
    padding: var(--ha-datepicker-input-padding);
    font-size: var(--ha-datepicker-input-font-size);
    font-family: inherit;
    color: var(--ha-color-gray-900, #111827);
    background-color: var(--ha-datepicker-bg);
    border: 1px solid var(--ha-datepicker-border-color);
    border-radius: var(--ha-datepicker-border-radius);
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .date-picker__input:hover:not(:disabled) {
    border-color: var(--ha-color-primary-400, #60a5fa);
  }

  .date-picker__input:focus {
    border-color: var(--ha-color-primary-500, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .date-picker__input:disabled {
    background-color: var(--ha-color-gray-100, #f3f4f6);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .date-picker__input::placeholder {
    color: var(--ha-color-gray-400, #9ca3af);
  }

  .date-picker--error .date-picker__input {
    border-color: var(--ha-color-danger-500, #ef4444);
  }

  .date-picker--error .date-picker__input:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .date-picker__icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: var(--ha-color-gray-400, #9ca3af);
    pointer-events: none;
  }

  /* Calendar Popup */
  .date-picker__calendar {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    z-index: 1000;
    min-width: 280px;
    background-color: var(--ha-datepicker-bg);
    border: 1px solid var(--ha-datepicker-border-color);
    border-radius: var(--ha-datepicker-border-radius);
    box-shadow: var(--ha-datepicker-shadow);
    padding: var(--ha-datepicker-calendar-padding);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s ease;
  }

  .date-picker__calendar--open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .date-picker--inline .date-picker__calendar {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
  }

  /* Calendar Header */
  .date-picker__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--ha-datepicker-header-height);
    margin-bottom: 0.75rem;
  }

  .date-picker__nav-button {
    width: 32px;
    height: 32px;
    padding: 0;
    background: none;
    border: none;
    border-radius: var(--ha-radius-sm, 0.25rem);
    color: var(--ha-color-gray-600, #4b5563);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .date-picker__nav-button:hover {
    background-color: var(--ha-datepicker-day-hover-bg);
  }

  .date-picker__nav-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .date-picker__month-year {
    flex: 1;
    text-align: center;
    font-size: var(--ha-datepicker-input-font-size);
    font-weight: var(--ha-datepicker-header-font-weight);
    color: var(--ha-color-gray-900, #111827);
  }

  /* Weekdays */
  .date-picker__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--ha-datepicker-calendar-gap);
    margin-bottom: 0.5rem;
  }

  .date-picker__weekday {
    width: var(--ha-datepicker-day-size);
    height: var(--ha-datepicker-day-size);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ha-color-gray-500, #6b7280);
    text-transform: uppercase;
  }

  /* Days Grid */
  .date-picker__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--ha-datepicker-calendar-gap);
  }

  .date-picker__day {
    width: var(--ha-datepicker-day-size);
    height: var(--ha-datepicker-day-size);
    padding: 0;
    background: none;
    border: 2px solid transparent;
    border-radius: var(--ha-radius-sm, 0.25rem);
    color: var(--ha-color-gray-900, #111827);
    font-size: var(--ha-datepicker-day-font-size);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }

  .date-picker__day:hover:not(:disabled) {
    background-color: var(--ha-datepicker-day-hover-bg);
  }

  .date-picker__day:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--ha-color-primary-400, #60a5fa);
  }

  .date-picker__day--today {
    border-color: var(--ha-datepicker-day-today-border-color);
  }

  .date-picker__day--selected {
    background-color: var(--ha-datepicker-day-selected-bg);
    color: var(--ha-datepicker-day-selected-color);
    font-weight: 600;
  }

  .date-picker__day--selected:hover {
    background-color: var(--ha-color-primary-600, #2563eb);
  }

  .date-picker__day--in-range {
    background-color: var(--ha-datepicker-range-bg);
    color: var(--ha-datepicker-range-color);
    border-radius: 0;
  }

  .date-picker__day--range-start {
    border-top-left-radius: var(--ha-radius-sm, 0.25rem);
    border-bottom-left-radius: var(--ha-radius-sm, 0.25rem);
  }

  .date-picker__day--range-end {
    border-top-right-radius: var(--ha-radius-sm, 0.25rem);
    border-bottom-right-radius: var(--ha-radius-sm, 0.25rem);
  }

  .date-picker__day--outside {
    opacity: var(--ha-datepicker-day-outside-opacity);
  }

  .date-picker__day--disabled {
    opacity: var(--ha-datepicker-day-disabled-opacity);
    cursor: not-allowed;
  }

  .date-picker__day:disabled {
    cursor: not-allowed;
  }

  /* Footer */
  .date-picker__footer {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--ha-datepicker-border-color);
  }

  .date-picker__footer-button {
    flex: 1;
    padding: 0.5rem 1rem;
    background-color: var(--ha-color-gray-100, #f3f4f6);
    border: none;
    border-radius: var(--ha-radius-sm, 0.25rem);
    color: var(--ha-color-gray-700, #374151);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .date-picker__footer-button:hover {
    background-color: var(--ha-color-gray-200, #e5e7eb);
  }

  .date-picker__footer-button--primary {
    background-color: var(--ha-color-primary-500, #3b82f6);
    color: var(--ha-color-white, #ffffff);
  }

  .date-picker__footer-button--primary:hover {
    background-color: var(--ha-color-primary-600, #2563eb);
  }

  /* Label & Helper Text */
  .date-picker__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ha-color-gray-700, #374151);
  }

  .date-picker__helper-text {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--ha-color-gray-500, #6b7280);
  }

  .date-picker__error-text {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--ha-color-danger-500, #ef4444);
  }

  .date-picker--error .date-picker__error-text {
    display: block;
  }

  /* Hidden state */
  .date-picker__helper-text:empty,
  .date-picker__error-text:empty {
    display: none;
  }
`;
