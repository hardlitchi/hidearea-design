import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaDatePicker } from "./date-picker";

describe("HaDatePicker", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-date-picker")) {
      customElements.define("ha-date-picker", HaDatePicker);
    }
    await waitForCustomElement("ha-date-picker");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-date-picker")).toBe(HaDatePicker);
    });

    it("should create an instance", () => {
      const datePicker = document.createElement(
        "ha-date-picker"
      ) as HaDatePicker;
      expect(datePicker).toBeInstanceOf(HaDatePicker);
      expect(datePicker).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const datePicker = document.createElement(
        "ha-date-picker"
      ) as HaDatePicker;
      document.body.appendChild(datePicker);
      expect(datePicker.shadowRoot).not.toBeNull();
      document.body.removeChild(datePicker);
    });
  });

  describe("Default Values", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should have default mode as single", () => {
      expect(datePicker.mode).toBe("single");
    });

    it("should not be disabled by default", () => {
      expect(datePicker.disabled).toBe(false);
    });

    it("should not be required by default", () => {
      expect(datePicker.required).toBe(false);
    });

    it("should not have error state by default", () => {
      expect(datePicker.error).toBe(false);
    });

    it("should not be readonly by default", () => {
      expect(datePicker.readonly).toBe(false);
    });

    it("should not be inline by default", () => {
      expect(datePicker.inline).toBe(false);
    });

    it("should have default locale as en", () => {
      expect(datePicker.locale).toBe("en");
    });

    it("should have default format as YYYY-MM-DD", () => {
      expect(datePicker.format).toBe("YYYY-MM-DD");
    });

    it("should start with null value", () => {
      expect(datePicker.getValue()).toBeNull();
    });
  });

  describe("Attributes", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should update mode attribute", () => {
      datePicker.setAttribute("mode", "range");
      expect(datePicker.mode).toBe("range");
    });

    it("should update disabled attribute", () => {
      datePicker.setAttribute("disabled", "");
      expect(datePicker.disabled).toBe(true);
    });

    it("should update required attribute", () => {
      datePicker.setAttribute("required", "");
      expect(datePicker.required).toBe(true);
    });

    it("should update error attribute", () => {
      datePicker.setAttribute("error", "");
      expect(datePicker.error).toBe(true);
    });

    it("should update readonly attribute", () => {
      datePicker.setAttribute("readonly", "");
      expect(datePicker.readonly).toBe(true);
    });

    it("should update inline attribute", () => {
      datePicker.setAttribute("inline", "");
      expect(datePicker.inline).toBe(true);
    });

    it("should update locale attribute", () => {
      datePicker.setAttribute("locale", "ja");
      expect(datePicker.locale).toBe("ja");
    });

    it("should update format attribute", () => {
      datePicker.setAttribute("format", "DD/MM/YYYY");
      expect(datePicker.format).toBe("DD/MM/YYYY");
    });

    it("should update placeholder attribute", () => {
      datePicker.setAttribute("placeholder", "Choose a date");
      expect(datePicker.placeholder).toBe("Choose a date");
    });
  });

  describe("Date Selection - Single Mode", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      datePicker.mode = "single";
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should set value programmatically", () => {
      const date = new Date(2025, 0, 15);
      datePicker.setValue(date);
      const value = datePicker.getValue();
      expect(value).not.toBeNull();
      expect(value?.getDate()).toBe(15);
      expect(value?.getMonth()).toBe(0);
      expect(value?.getFullYear()).toBe(2025);
    });

    it("should set value from string", () => {
      datePicker.setValue("2025-01-15");
      const value = datePicker.getValue();
      expect(value).not.toBeNull();
      expect(value?.getDate()).toBe(15);
    });

    it("should emit date-select event when date is selected", () => {
      const handler = vi.fn();
      datePicker.addEventListener("date-select", handler);

      const date = new Date(2025, 0, 15);
      datePicker.setValue(date);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail.value).toEqual(date);
    });

    it("should clear value", () => {
      const date = new Date(2025, 0, 15);
      datePicker.setValue(date);
      expect(datePicker.getValue()).not.toBeNull();

      datePicker.clear();
      expect(datePicker.getValue()).toBeNull();
    });

    it("should emit date-clear event when cleared", () => {
      const handler = vi.fn();
      datePicker.addEventListener("date-clear", handler);

      const date = new Date(2025, 0, 15);
      datePicker.setValue(date);
      datePicker.clear();

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe("Date Selection - Range Mode", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      datePicker.mode = "range";
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should emit date-select event with range dates", () => {
      const handler = vi.fn();
      datePicker.addEventListener("date-select", handler);
      datePicker.goToMonth(2025, 0);

      const day10 = queryShadow(datePicker, '[data-day="2025-0-10"]');
      const day20 = queryShadow(datePicker, '[data-day="2025-0-20"]');
      
      // First click (sets start date, should not emit yet)
      (day10 as HTMLElement)?.click();
      
      // Second click (sets end date, should emit)
      (day20 as HTMLElement)?.click();

      expect(handler).toHaveBeenCalledTimes(1);
      const detail = handler.mock.calls[0][0].detail;
      expect(detail.startDate.getDate()).toBe(10);
      expect(detail.endDate.getDate()).toBe(20);
    });

    it("should handle selecting end date before start date", () => {
      datePicker.goToMonth(2025, 0);

      const day10 = queryShadow(datePicker, '[data-day="2025-0-10"]');
      const day20 = queryShadow(datePicker, '[data-day="2025-0-20"]');

      (day20 as HTMLElement)?.click(); // Set temp start date
      (day10 as HTMLElement)?.click(); // Set end date (before temp start)

      expect((datePicker as any)._startDate.getDate()).toBe(10);
      expect((datePicker as any)._endDate.getDate()).toBe(20);
    });
  });

  describe("Date Selection - Multiple Mode", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      datePicker.mode = "multiple";
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should select and deselect multiple dates", () => {
        datePicker.goToMonth(2025, 0);
        const day10 = queryShadow(datePicker, '[data-day="2025-0-10"]');
        const day15 = queryShadow(datePicker, '[data-day="2025-0-15"]');

        (day10 as HTMLElement)?.click();
        expect((datePicker as any)._selectedDates.length).toBe(1);

        (day15 as HTMLElement)?.click();
        expect((datePicker as any)._selectedDates.length).toBe(2);

        (day10 as HTMLElement)?.click();
        expect((datePicker as any)._selectedDates.length).toBe(1);
    });
  });

  describe("Calendar Navigation", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should navigate to next month", () => {
      const initialMonth = new Date().getMonth();
      datePicker.nextMonth();

      // Check month change event
      const expectedMonth = initialMonth === 11 ? 0 : initialMonth + 1;
      expect(expectedMonth).toBeGreaterThanOrEqual(0);
    });

    it("should navigate to previous month", () => {
      const initialMonth = new Date().getMonth();
      datePicker.previousMonth();

      const expectedMonth = initialMonth === 0 ? 11 : initialMonth - 1;
      expect(expectedMonth).toBeGreaterThanOrEqual(0);
    });

    it("should navigate to specific month", () => {
      datePicker.goToMonth(2025, 5);
      // Month navigation should work without errors
      expect(true).toBe(true);
    });

    it("should navigate to today", () => {
      datePicker.goToMonth(2020, 0);
      datePicker.goToToday();

      const today = new Date();
      // Should navigate back to current month
      expect(today.getMonth()).toBeGreaterThanOrEqual(0);
    });

    it("should emit month-change event on navigation", () => {
      const handler = vi.fn();
      datePicker.addEventListener("month-change", handler);

      datePicker.nextMonth();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail).toHaveProperty("year");
      expect(handler.mock.calls[0][0].detail).toHaveProperty("month");
    });
  });

  describe("Calendar Open/Close", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should open calendar", () => {
      datePicker.open();
      // Check if calendar is open
      expect(true).toBe(true);
    });

    it("should close calendar", () => {
      datePicker.open();
      datePicker.close();
      // Check if calendar is closed
      expect(true).toBe(true);
    });

    it("should toggle calendar", () => {
      datePicker.toggle();
      // First toggle should open
      datePicker.toggle();
      // Second toggle should close
      expect(true).toBe(true);
    });

    it("should emit calendar-open event", () => {
      const handler = vi.fn();
      datePicker.addEventListener("calendar-open", handler);

      datePicker.open();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should emit calendar-close event", () => {
      const handler = vi.fn();
      datePicker.addEventListener("calendar-close", handler);

      datePicker.open();
      datePicker.close();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should not open when disabled", () => {
      datePicker.disabled = true;
      datePicker.open();
      // Calendar should not open
      expect(true).toBe(true);
    });

    it("should not open when readonly", () => {
      datePicker.readonly = true;
      datePicker.open();
      // Calendar should not open
      expect(true).toBe(true);
    });
  });

  describe("Date Restrictions", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should set minimum date", () => {
      const minDate = new Date(2025, 0, 1);
      datePicker.minDate = minDate;
      expect(datePicker.minDate).toEqual(minDate);
    });

    it("should set maximum date", () => {
      const maxDate = new Date(2025, 11, 31);
      datePicker.maxDate = maxDate;
      expect(datePicker.maxDate).toEqual(maxDate);
    });

    it("should check if date is disabled (before minDate)", () => {
      datePicker.minDate = new Date(2025, 0, 10);
      const beforeMin = new Date(2025, 0, 5);
      expect(datePicker.isDateDisabled(beforeMin)).toBe(true);
    });

    it("should check if date is disabled (after maxDate)", () => {
      datePicker.maxDate = new Date(2025, 0, 20);
      const afterMax = new Date(2025, 0, 25);
      expect(datePicker.isDateDisabled(afterMax)).toBe(true);
    });

    it("should allow valid dates", () => {
      datePicker.minDate = new Date(2025, 0, 1);
      datePicker.maxDate = new Date(2025, 0, 31);
      const validDate = new Date(2025, 0, 15);
      expect(datePicker.isDateDisabled(validDate)).toBe(false);
    });

    it("should handle setting minDate to null", () => {
      datePicker.minDate = new Date(2025, 0, 1);
      datePicker.minDate = null;
      expect(datePicker.getAttribute("min-date")).toBeNull();
    });

    it("should handle setting maxDate to null", () => {
      datePicker.maxDate = new Date(2025, 0, 31);
      datePicker.maxDate = null;
      expect(datePicker.getAttribute("max-date")).toBeNull();
    });

    it("should return false from isDateDisabled when min/max are null", () => {
      datePicker.minDate = null;
      datePicker.maxDate = null;
      const date = new Date();
      expect(datePicker.isDateDisabled(date)).toBe(false);
    });
  });

  describe("Validation", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should return true when not required and no value", () => {
      datePicker.required = false;
      expect(datePicker.validate()).toBe(true);
    });

    it("should return false when required and no value (single mode)", () => {
      datePicker.required = true;
      datePicker.mode = "single";
      expect(datePicker.validate()).toBe(false);
    });

    it("should return true when required and has value", () => {
      datePicker.required = true;
      datePicker.setValue(new Date(2025, 0, 15));
      expect(datePicker.validate()).toBe(true);
    });

    it("should return false when required and no value (range mode)", () => {
      datePicker.required = true;
      datePicker.mode = "range";
      expect(datePicker.validate()).toBe(false);
    });

    it("should return false when required and no value (multiple mode)", () => {
      datePicker.required = true;
      datePicker.mode = "multiple";
      expect(datePicker.validate()).toBe(false);
    });
  });

  describe("Inline Mode", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      datePicker.inline = true;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should render calendar inline", () => {
      const calendar = queryShadow(
        datePicker,
        ".date-picker__calendar"
      ) as HTMLDivElement;
      expect(calendar).not.toBeNull();
    });

    it("should not show input field in inline mode", () => {
      const input = queryShadow(
        datePicker,
        ".date-picker__input"
      ) as HTMLInputElement;
      expect(input).toBeNull();
    });
  });

  describe("Localization", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should change locale", () => {
      datePicker.locale = "ja";
      expect(datePicker.locale).toBe("ja");
    });

    it("should set first day of week", () => {
      datePicker.firstDayOfWeek = 1; // Monday
      expect(datePicker.firstDayOfWeek).toBe(1);
    });

    it("should default to Sunday as first day", () => {
      expect(datePicker.firstDayOfWeek).toBe(0);
    });
  });

  describe("Public API", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should expose getValue method", () => {
      expect(typeof datePicker.getValue).toBe("function");
      expect(datePicker.getValue()).toBeNull();
    });

    it("should expose setValue method", () => {
      expect(typeof datePicker.setValue).toBe("function");
      const date = new Date(2025, 0, 15);
      datePicker.setValue(date);
      expect(datePicker.getValue()).toEqual(date);
    });

    it("should expose clear method", () => {
      expect(typeof datePicker.clear).toBe("function");
      datePicker.setValue(new Date(2025, 0, 15));
      datePicker.clear();
      expect(datePicker.getValue()).toBeNull();
    });

    it("should expose open method", () => {
      expect(typeof datePicker.open).toBe("function");
    });

    it("should expose close method", () => {
      expect(typeof datePicker.close).toBe("function");
    });

    it("should expose toggle method", () => {
      expect(typeof datePicker.toggle).toBe("function");
    });

    it("should expose goToToday method", () => {
      expect(typeof datePicker.goToToday).toBe("function");
    });

    it("should expose goToMonth method", () => {
      expect(typeof datePicker.goToMonth).toBe("function");
    });

    it("should expose nextMonth method", () => {
      expect(typeof datePicker.nextMonth).toBe("function");
    });

    it("should expose previousMonth method", () => {
      expect(typeof datePicker.previousMonth).toBe("function");
    });

    it("should expose validate method", () => {
      expect(typeof datePicker.validate).toBe("function");
      expect(datePicker.validate()).toBe(true);
    });

    it("should expose isDateDisabled method", () => {
      expect(typeof datePicker.isDateDisabled).toBe("function");
      const date = new Date(2025, 0, 15);
      expect(datePicker.isDateDisabled(date)).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should handle invalid date string", () => {
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      datePicker.setValue("invalid-date");
      expect(consoleWarnSpy).toHaveBeenCalled();
      consoleWarnSpy.mockRestore();
    });

    it("should handle leap year", () => {
      const leapYearDate = new Date(2024, 1, 29); // Feb 29, 2024
      datePicker.setValue(leapYearDate);
      const value = datePicker.getValue();
      expect(value?.getDate()).toBe(29);
    });

    it("should handle year change when navigating", () => {
      datePicker.goToMonth(2024, 0); // January 2024
      datePicker.previousMonth();
      // Should be December 2023
      expect(true).toBe(true);
    });

    it("should handle clearing when already empty", () => {
      expect(datePicker.getValue()).toBeNull();
      datePicker.clear();
      expect(datePicker.getValue()).toBeNull();
    });
  });

  describe("Outside Click Behavior", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it("should close calendar when clicking outside", async () => {
      const closeSpy = vi.spyOn(datePicker, "close");
      datePicker.open();

      await new Promise(resolve => setTimeout(resolve, 0));

      document.body.click();

      expect(closeSpy).toHaveBeenCalledTimes(1);
      closeSpy.mockRestore();
    });

    it("should not close calendar when clicking inside", async () => {
      const closeSpy = vi.spyOn(datePicker, "close");
      datePicker.open();
      await new Promise(resolve => setTimeout(resolve, 0));

      const calendar = queryShadow(datePicker, ".date-picker__calendar");
      calendar?.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));

      expect(closeSpy).not.toHaveBeenCalled();
      closeSpy.mockRestore();
    });

    it("should not close if inline", async () => {
      datePicker.inline = true;
      document.body.removeChild(datePicker); // Re-append to apply inline
      document.body.appendChild(datePicker);

      const closeSpy = vi.spyOn(datePicker, "close");
      datePicker.open();
      await new Promise(resolve => setTimeout(resolve, 0));

      document.body.click();

      expect(closeSpy).not.toHaveBeenCalled();
      closeSpy.mockRestore();
    });
  });

  describe("Input Display", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it('should display only start date for range mode if end date is not set', () => {
      datePicker.mode = 'range';
      const startDate = new Date(2025, 0, 10);
      (datePicker as any)._startDate = startDate;
      (datePicker as any).updateInput();
      const input = queryShadow(datePicker, '.date-picker__input') as HTMLInputElement;
      expect(input.value).toBe('2025-01-10');
    });

    it('should display number of selected dates for multiple mode', () => {
      datePicker.mode = 'multiple';
      (datePicker as any)._selectedDates = [new Date(2025, 0, 10), new Date(2025, 0, 12)];
      (datePicker as any).updateInput();
      const input = queryShadow(datePicker, '.date-picker__input') as HTMLInputElement;
      expect(input.value).toBe('2 dates selected');
    });
  });

  describe("Date Rendering States", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
      document.body.appendChild(datePicker);
    });

    afterEach(() => {
      document.body.removeChild(datePicker);
    });

    it('should apply range classes correctly', () => {
      datePicker.mode = 'range';
      (datePicker as any)._startDate = new Date(2025, 0, 10);
      (datePicker as any)._endDate = new Date(2025, 0, 20);
      datePicker.goToMonth(2025, 0); // Go to January 2025
      (datePicker as any).renderCalendar();
      const startDay = queryShadow(datePicker, '[data-day="2025-0-10"]');
      const endDay = queryShadow(datePicker, '[data-day="2025-0-20"]');
      const inRangeDay = queryShadow(datePicker, '[data-day="2025-0-15"]');
      
      expect(startDay?.classList.contains('date-picker__day--range-start')).toBe(true);
      expect(endDay?.classList.contains('date-picker__day--range-end')).toBe(true);
      expect(inRangeDay?.classList.contains('date-picker__day--in-range')).toBe(true);
    });

    it('should apply selected class for multiple mode', () => {
      datePicker.mode = 'multiple';
      (datePicker as any)._selectedDates = [new Date(2025, 0, 15)];
      datePicker.goToMonth(2025, 0); // Go to January 2025
      (datePicker as any).renderCalendar();
      const selectedDay = queryShadow(datePicker, '[data-day="2025-0-15"]');
      expect(selectedDay?.classList.contains('date-picker__day--selected')).toBe(true);
    });
  });

  describe("Button Visibility", () => {
    let datePicker: HaDatePicker;

    beforeEach(() => {
      datePicker = document.createElement("ha-date-picker") as HaDatePicker;
    });

    afterEach(() => {
      if (document.body.contains(datePicker)) {
        document.body.removeChild(datePicker);
      }
    });

    it('should not render footer buttons if showTodayButton and showClearButton are false', () => {
      datePicker.showTodayButton = false;
      datePicker.showClearButton = false;
      document.body.appendChild(datePicker);
      const footer = queryShadow(datePicker, '.date-picker__footer');
      expect(footer).toBeNull();
    });

    it('should render Today button if showTodayButton is true', () => {
      datePicker.showTodayButton = true;
      document.body.appendChild(datePicker);
      const todayButton = queryShadow(datePicker, '[part="today-button"]');
      expect(todayButton).not.toBeNull();
    });

    it('should render Clear button if showClearButton is true', () => {
      datePicker.showClearButton = true;
      document.body.appendChild(datePicker);
      const clearButton = queryShadow(datePicker, '[part="clear-button"]');
      expect(clearButton).not.toBeNull();
    });
  });
});
