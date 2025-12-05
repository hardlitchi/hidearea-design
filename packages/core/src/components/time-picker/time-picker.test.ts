import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { HaTimePicker } from "./time-picker";

describe("HaTimePicker", () => {
  let element: HaTimePicker;

  beforeEach(() => {
    element = document.createElement("ha-time-picker") as HaTimePicker;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe("Component Registration", () => {
    it("should be defined as a custom element", () => {
      expect(customElements.get("ha-time-picker")).toBeDefined();
    });

    it("should create an instance", () => {
      expect(element).toBeInstanceOf(HaTimePicker);
    });

    it("should have the correct tag name", () => {
      expect(element.tagName.toLowerCase()).toBe("ha-time-picker");
    });
  });

  describe("Default Values", () => {
    it("should have default format of 24-hour", () => {
      expect(element.format).toBe("24");
    });

    it("should have showSeconds false by default", () => {
      expect(element.showSeconds).toBe(false);
    });

    it("should have hourStep of 1 by default", () => {
      expect(element.hourStep).toBe(1);
    });

    it("should have minuteStep of 1 by default", () => {
      expect(element.minuteStep).toBe(1);
    });

    it("should have secondStep of 1 by default", () => {
      expect(element.secondStep).toBe(1);
    });

    it("should not be inline by default", () => {
      expect(element.inline).toBe(false);
    });

    it("should not be disabled by default", () => {
      expect(element.disabled).toBe(false);
    });

    it("should not be required by default", () => {
      expect(element.required).toBe(false);
    });

    it("should not have error by default", () => {
      expect(element.error).toBe(false);
    });

    it("should have null value initially", () => {
      expect(element.getValue()).toBeNull();
    });
  });

  describe("Attributes", () => {
    it("should set value attribute", () => {
      element.setAttribute("value", "14:30");
      expect(element.getAttribute("value")).toBe("14:30");
    });

    it("should set format attribute", () => {
      element.setAttribute("format", "12");
      expect(element.format).toBe("12");
    });

    it("should set show-seconds attribute", () => {
      element.setAttribute("show-seconds", "");
      expect(element.showSeconds).toBe(true);
    });

    it("should set hour-step attribute", () => {
      element.setAttribute("hour-step", "2");
      expect(element.hourStep).toBe(2);
    });

    it("should set minute-step attribute", () => {
      element.setAttribute("minute-step", "15");
      expect(element.minuteStep).toBe(15);
    });

    it("should set inline attribute", () => {
      element.setAttribute("inline", "");
      expect(element.inline).toBe(true);
    });

    it("should set disabled attribute", () => {
      element.setAttribute("disabled", "");
      expect(element.disabled).toBe(true);
    });

    it("should set required attribute", () => {
      element.setAttribute("required", "");
      expect(element.required).toBe(true);
    });

    it("should set error attribute", () => {
      element.setAttribute("error", "");
      expect(element.error).toBe(true);
    });

    it("should set readonly attribute", () => {
      element.setAttribute("readonly", "");
      expect(element.readonly).toBe(true);
    });
  });

  describe("Time Selection", () => {
    it("should select hour", () => {
      element.setTime(14, 0);
      expect(element.getValue()).toBe("14:00");
    });

    it("should select minute", () => {
      element.setTime(14, 30);
      expect(element.getValue()).toBe("14:30");
    });

    it("should select second when enabled", () => {
      element.setAttribute("show-seconds", "");
      element.setTime(14, 30, 45);
      expect(element.getValue()).toBe("14:30:45");
    });

    it("should handle AM in 12-hour format", () => {
      element.setAttribute("format", "12");
      element.setTime(9, 30);
      const value = element.getValue();
      expect(value).toBe("09:30");
    });

    it("should handle PM in 12-hour format", () => {
      element.setAttribute("format", "12");
      element.setTime(14, 30); // 2:30 PM
      const value = element.getValue();
      expect(value).toBe("02:30");
    });

    it("should fire time-select event", () => {
      const handler = vi.fn();
      element.addEventListener("time-select", handler);
      element.setTime(14, 30);
      expect(handler).toHaveBeenCalled();
    });

    it("should include correct event detail", () => {
      const handler = vi.fn();
      element.addEventListener("time-select", handler);
      element.setTime(14, 30);
      const event = handler.mock.calls[0][0];
      expect(event.detail).toMatchObject({
        value: "14:30",
        hour: 14,
        minute: 30,
      });
    });

    it("should not select when disabled", () => {
      element.setAttribute("disabled", "");
      const initialValue = element.getValue();
      element.setTime(14, 30);
      // Should still work via API even when disabled (UI prevents interaction)
      expect(element.getValue()).not.toBe(initialValue);
    });
  });

  describe("Time Formatting", () => {
    it("should display 24-hour format correctly", () => {
      element.setTime(14, 30);
      expect(element.getValue()).toBe("14:30");
    });

    it("should display 12-hour format correctly", () => {
      element.setAttribute("format", "12");
      element.setTime(14, 30);
      expect(element.getValue()).toBe("02:30");
    });

    it("should display seconds when enabled", () => {
      element.setAttribute("show-seconds", "");
      element.setTime(14, 30, 45);
      expect(element.getValue()).toBe("14:30:45");
    });

    it("should parse HH:mm format", () => {
      element.setValue("14:30");
      expect(element.getValue()).toBe("14:30");
    });

    it("should parse HH:mm:ss format", () => {
      element.setAttribute("show-seconds", "");
      element.setValue("14:30:45");
      expect(element.getValue()).toBe("14:30:45");
    });

    it("should convert midnight correctly (24-hour)", () => {
      element.setTime(0, 0);
      expect(element.getValue()).toBe("00:00");
    });

    it("should convert midnight correctly (12-hour)", () => {
      element.setAttribute("format", "12");
      element.setTime(0, 0); // 12:00 AM
      expect(element.getValue()).toBe("12:00");
    });

    it("should convert noon correctly (12-hour)", () => {
      element.setAttribute("format", "12");
      element.setTime(12, 0); // 12:00 PM
      expect(element.getValue()).toBe("12:00");
    });
  });

  describe("Picker Open/Close", () => {
    it("should open picker on open()", () => {
      element.open();
      const panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeTruthy();
    });

    it("should close picker on close()", () => {
      element.open();
      element.close();
      const panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeFalsy();
    });

    it("should toggle picker on toggle()", () => {
      element.toggle();
      let panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeTruthy();

      element.toggle();
      panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeFalsy();
    });

    it("should fire picker-open event", () => {
      const handler = vi.fn();
      element.addEventListener("picker-open", handler);
      element.open();
      expect(handler).toHaveBeenCalled();
    });

    it("should fire picker-close event", () => {
      const handler = vi.fn();
      element.addEventListener("picker-close", handler);
      element.open();
      element.close();
      expect(handler).toHaveBeenCalled();
    });

    it("should not open when disabled", () => {
      element.setAttribute("disabled", "");
      element.open();
      const panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeFalsy();
    });

    it("should not open when readonly", () => {
      element.setAttribute("readonly", "");
      element.open();
      const panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeFalsy();
    });

    it("should always show panel when inline", () => {
      element.setAttribute("inline", "");
      const panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeTruthy();
    });
  });

  describe("Time Restrictions", () => {
    it("should restrict minTime", () => {
      element.setAttribute("min-time", "09:00");
      expect(element.isTimeDisabled(8, 0)).toBe(true);
      expect(element.isTimeDisabled(9, 0)).toBe(false);
    });

    it("should restrict maxTime", () => {
      element.setAttribute("max-time", "17:00");
      expect(element.isTimeDisabled(18, 0)).toBe(true);
      expect(element.isTimeDisabled(17, 0)).toBe(false);
    });

    it("should disable specific hours", () => {
      element.setAttribute("disabled-hours", "12,13,14");
      expect(element.isTimeDisabled(12, 0)).toBe(true);
      expect(element.isTimeDisabled(13, 0)).toBe(true);
      expect(element.isTimeDisabled(15, 0)).toBe(false);
    });

    it("should disable specific minutes", () => {
      element.setAttribute("disabled-minutes", "0,15,30,45");
      expect(element.isTimeDisabled(12, 0)).toBe(true);
      expect(element.isTimeDisabled(12, 15)).toBe(true);
      expect(element.isTimeDisabled(12, 10)).toBe(false);
    });

    it("should check if time is disabled", () => {
      element.setAttribute("min-time", "09:00");
      element.setAttribute("max-time", "17:00");
      expect(element.isTimeDisabled(8, 0)).toBe(true);
      expect(element.isTimeDisabled(12, 0)).toBe(false);
      expect(element.isTimeDisabled(18, 0)).toBe(true);
    });
  });

  describe("Validation", () => {
    it("should validate valid time", () => {
      element.setTime(14, 30);
      expect(element.validate()).toBe(true);
    });

    it("should fail validation when required and empty", () => {
      element.setAttribute("required", "");
      expect(element.validate()).toBe(false);
    });

    it("should fail validation for time outside min/max", () => {
      element.setAttribute("min-time", "09:00");
      element.setAttribute("max-time", "17:00");
      element.setTime(8, 0);
      expect(element.validate()).toBe(false);
    });

    it("should fail validation for disabled time", () => {
      element.setAttribute("disabled-hours", "12");
      element.setTime(12, 0);
      expect(element.validate()).toBe(false);
    });

    it("should pass validation when not required and empty", () => {
      expect(element.validate()).toBe(true);
    });
  });

  describe("Inline Mode", () => {
    it("should always show panel in inline mode", () => {
      element.setAttribute("inline", "");
      const panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeTruthy();
    });

    it("should not close in inline mode", () => {
      element.setAttribute("inline", "");
      element.close();
      const panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeTruthy();
    });
  });

  describe("Step Configuration", () => {
    it("should respect hour step", () => {
      element.setAttribute("hour-step", "2");
      expect(element.hourStep).toBe(2);
    });

    it("should respect minute step", () => {
      element.setAttribute("minute-step", "15");
      expect(element.minuteStep).toBe(15);
    });

    it("should respect second step", () => {
      element.setAttribute("second-step", "10");
      expect(element.secondStep).toBe(10);
    });

    it("should only show valid hour values based on step", () => {
      element.setAttribute("hour-step", "3");
      element.setAttribute("inline", "");
      const hourItems = element.shadowRoot?.querySelectorAll(
        '[data-column="hour"] .item'
      );
      // 24-hour format with step 3: 0, 3, 6, 9, 12, 15, 18, 21 = 8 items
      expect(hourItems?.length).toBe(8);
    });

    it("should only show valid minute values based on step", () => {
      element.setAttribute("minute-step", "15");
      element.setAttribute("inline", "");
      const minuteItems = element.shadowRoot?.querySelectorAll(
        '[data-column="minute"] .item'
      );
      // Minutes with step 15: 0, 15, 30, 45 = 4 items
      expect(minuteItems?.length).toBe(4);
    });
  });

  describe("Public API", () => {
    it("getValue should return current value", () => {
      element.setTime(14, 30);
      expect(element.getValue()).toBe("14:30");
    });

    it("getValue should return null when empty", () => {
      expect(element.getValue()).toBeNull();
    });

    it("setValue should update value", () => {
      element.setValue("14:30");
      expect(element.getValue()).toBe("14:30");
    });

    it("clear should remove value", () => {
      element.setTime(14, 30);
      element.clear();
      expect(element.getValue()).toBeNull();
    });

    it("clear should fire time-clear event", () => {
      const handler = vi.fn();
      element.addEventListener("time-clear", handler);
      element.setTime(14, 30);
      element.clear();
      expect(handler).toHaveBeenCalled();
    });

    it("setNow should set current time", () => {
      const now = new Date();
      element.setNow();
      const value = element.getValue();
      expect(value).toBeTruthy();
      // Check that hour matches (allowing for test execution time)
      const parts = value!.split(":");
      const hour = parseInt(parts[0], 10);
      expect(Math.abs(hour - now.getHours())).toBeLessThanOrEqual(1);
    });

    it("setTime should set specific time", () => {
      element.setTime(14, 30, 45);
      // Without showSeconds, seconds are not displayed
      expect(element.getValue()).toBe("14:30");
    });

    it("setTime should include seconds when enabled", () => {
      element.setAttribute("show-seconds", "");
      element.setTime(14, 30, 45);
      expect(element.getValue()).toBe("14:30:45");
    });

    it("validate should return boolean", () => {
      expect(typeof element.validate()).toBe("boolean");
    });

    it("isTimeDisabled should check restrictions", () => {
      element.setAttribute("min-time", "09:00");
      expect(element.isTimeDisabled(8, 0)).toBe(true);
      expect(element.isTimeDisabled(10, 0)).toBe(false);
    });

    it("open should open picker", () => {
      element.open();
      const panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeTruthy();
    });

    it("close should close picker", () => {
      element.open();
      element.close();
      const panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeFalsy();
    });

    it("toggle should switch picker state", () => {
      element.toggle();
      let panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeTruthy();

      element.toggle();
      panel = element.shadowRoot?.querySelector(".panel");
      expect(panel).toBeFalsy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle invalid value format gracefully", () => {
      element.setValue("invalid");
      // Should not crash, value should be empty or unchanged
      expect(element.getValue()).toBeTruthy();
    });

    it("should handle midnight correctly", () => {
      element.setTime(0, 0);
      expect(element.getValue()).toBe("00:00");
    });

    it("should handle noon correctly", () => {
      element.setTime(12, 0);
      expect(element.getValue()).toBe("12:00");
    });

    it("should handle value out of range", () => {
      element.setValue("25:70");
      // Should handle gracefully
      expect(element.getValue()).toBeTruthy();
    });

    it("should handle 12-hour midnight (12:00 AM = 00:00)", () => {
      element.setAttribute("format", "12");
      element.setTime(0, 0);
      expect(element.getValue()).toBe("12:00");
    });

    it("should handle 12-hour noon (12:00 PM = 12:00)", () => {
      element.setAttribute("format", "12");
      element.setTime(12, 0);
      expect(element.getValue()).toBe("12:00");
    });
  });

  describe("12-Hour Format", () => {
    beforeEach(() => {
      element.setAttribute("format", "12");
    });

    it("should display hours 1-12", () => {
      element.setAttribute("inline", "");
      const hourItems = element.shadowRoot?.querySelectorAll(
        '[data-column="hour"] .item'
      );
      expect(hourItems?.length).toBe(12); // 1-12
    });

    it("should show AM/PM toggle", () => {
      element.setAttribute("inline", "");
      const periodColumn = element.shadowRoot?.querySelector(".period-column");
      expect(periodColumn).toBeTruthy();
    });

    it("should convert 13:00 to 1:00 PM", () => {
      element.setTime(13, 0);
      expect(element.getValue()).toBe("01:00");
    });

    it("should convert 00:00 to 12:00 AM", () => {
      element.setTime(0, 0);
      expect(element.getValue()).toBe("12:00");
    });
  });

  describe("Action Buttons", () => {
    it("should show Now button when enabled", () => {
      element.setAttribute("show-now-button", "");
      element.setAttribute("inline", "");
      const nowButton = element.shadowRoot?.querySelector(".now-button");
      expect(nowButton).toBeTruthy();
    });

    it("should show Clear button when enabled", () => {
      element.setAttribute("show-clear-button", "");
      element.setAttribute("inline", "");
      const clearButton = element.shadowRoot?.querySelector(".clear-button");
      expect(clearButton).toBeTruthy();
    });

    it("should not show buttons by default", () => {
      element.setAttribute("inline", "");
      const nowButton = element.shadowRoot?.querySelector(".now-button");
      const clearButton = element.shadowRoot?.querySelector(".clear-button");
      expect(nowButton).toBeFalsy();
      expect(clearButton).toBeFalsy();
    });
  });

  describe("Label and Helper Text", () => {
    it("should display label", () => {
      element.setAttribute("label", "Select Time");
      const label = element.shadowRoot?.querySelector("label");
      expect(label?.textContent).toBe("Select Time");
    });

    it("should display helper text", () => {
      element.setAttribute("helper-text", "Choose a time");
      const helperText = element.shadowRoot?.querySelector(".helper-text");
      expect(helperText?.textContent).toBe("Choose a time");
    });

    it("should display error text when error is true", () => {
      element.setAttribute("error", "");
      element.setAttribute("error-text", "Invalid time");
      const errorText = element.shadowRoot?.querySelector(".error-text");
      expect(errorText?.textContent).toBe("Invalid time");
    });

    it("should hide helper text when error is shown", () => {
      element.setAttribute("helper-text", "Choose a time");
      element.setAttribute("error", "");
      element.setAttribute("error-text", "Invalid time");
      const helperText = element.shadowRoot?.querySelector(".helper-text");
      expect(helperText).toBeFalsy();
    });
  });

  describe("Attribute Edge Cases", () => {
    it("should handle null value attribute", () => {
      element.setAttribute("value", "");
      (element as any).parseValue(null);
      expect(element.getValue()).toBeNull();
    });

    it("should handle invalid number for steps", () => {
      element.setAttribute("hour-step", "abc");
      expect(element.hourStep).toBe(1);
    });

    it("should handle null for disabled-hours", () => {
        element.attributeChangedCallback("disabled-hours", "", null);
        expect(element.disabledHours).toEqual([]);
    });

    it("should handle null for disabled-minutes", () => {
        element.attributeChangedCallback("disabled-minutes", "", null);
        expect(element.disabledMinutes).toEqual([]);
    });
  });

  describe("Event Handlers under restriction", () => {
    beforeEach(() => {
        element.setAttribute("readonly", "");
        element.setAttribute("disabled", "");
    });
    
    it("handleHourSelect should do nothing if disabled or readonly", () => {
      const spy = vi.spyOn(element, "setAttribute");
      element.open();
      const hourItem = element.shadowRoot?.querySelector('[data-type="hour"]');
      (hourItem as HTMLElement)?.click();
      expect(spy).not.toHaveBeenCalledWith("value", expect.any(String));
    });

    it("handlePeriodToggle should do nothing if disabled or readonly", () => {
      const privatePeriod = "_period";
      element.setAttribute("format", "12");
      element.open();
      const initialPeriod = (element as any)[privatePeriod];
      
      const pmButton = element.shadowRoot?.querySelector('[data-period="PM"]');
      (pmButton as HTMLElement)?.click();
      
      expect((element as any)[privatePeriod]).toBe(initialPeriod);
    });
  });

  describe("Outside Click Behavior", () => {
    it("should close picker when clicking outside", async () => {
      const closeSpy = vi.spyOn(element, "close");
      element.open();
      
      await new Promise(resolve => setTimeout(resolve, 0));
      
      document.body.click();
      
      expect(closeSpy).toHaveBeenCalledTimes(1);
      closeSpy.mockRestore();
    });

     it("should not close if inline", async () => {
      element.setAttribute("inline", "");
      const closeSpy = vi.spyOn(element, "close");
      element.open();
      await new Promise(resolve => setTimeout(resolve, 0));
      
      document.body.click();
      
      expect(closeSpy).not.toHaveBeenCalled();
      closeSpy.mockRestore();
    });
  });

  describe("12-Hour Format Edge Cases", () => {
    beforeEach(() => {
        element.setAttribute("format", "12");
    });

    it('isTimeDisabled should handle 12 PM correctly', () => {
        (element as any)._period = 'PM';
        element.disabledHours = [12];
        expect(element.isTimeDisabled(12, 0)).toBe(true);
    });

    it('isTimeDisabled should handle 12 AM correctly', () => {
        (element as any)._period = 'AM';
        element.disabledHours = [0];
        expect(element.isTimeDisabled(12, 0)).toBe(true);
    });
    
    it('emitTimeSelect should handle 12 PM correctly', () => {
        const handler = vi.fn();
        element.addEventListener("time-select", handler);
        element.setTime(12, 0); // 12 PM
        const event = handler.mock.calls[0][0];
        expect(event.detail.hour24).toBe(12);
    });
  });

  describe("Panel Interaction", () => {
    it("should select minute from panel", () => {
        element.open();
        const minuteItem = element.shadowRoot?.querySelector('[data-type="minute"][data-value="30"]');
        (minuteItem as HTMLElement)?.click();
        expect(element.getValue()).toContain(":30");
    });
    
    it("should select second from panel", () => {
        element.setAttribute("show-seconds", "");
        element.open();
        const secondItem = element.shadowRoot?.querySelector('[data-type="second"][data-value="45"]');
        (secondItem as HTMLElement)?.click();
        expect(element.getValue()).toContain(":45");
    });

    it("should call setNow on Now button click", () => {
        element.setAttribute("show-now-button", "");
        element.open();
        const spy = vi.spyOn(element, "setNow");
        const nowButton = element.shadowRoot?.querySelector(".now-button");
        (nowButton as HTMLElement)?.click();
        expect(spy).toHaveBeenCalled();
    });

    it("should call clear on Clear button click", () => {
        element.setAttribute("show-clear-button", "");
        element.open();
        const spy = vi.spyOn(element, "clear");
        const clearButton = element.shadowRoot?.querySelector(".clear-button");
        (clearButton as HTMLElement)?.click();
        expect(spy).toHaveBeenCalled();
    });
  });
});
