import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface DatePickerArgs {
  mode: "single" | "range" | "multiple";
  value: string;
  format: string;
  minDate: string;
  maxDate: string;
  disabledDates: string[];
  disabledDaysOfWeek: number[];
  locale: string;
  firstDayOfWeek: 0 | 1;
  inline: boolean;
  showWeekNumbers: boolean;
  showTodayButton: boolean;
  showClearButton: boolean;
  disabled: boolean;
  required: boolean;
  error: boolean;
  readonly: boolean;
  placeholder: string;
  label: string;
  helperText: string;
  errorText: string;
}

const meta: Meta<DatePickerArgs> = {
  title: "Components/DatePicker",
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["single", "range", "multiple"],
      description: "Selection mode",
    },
    value: {
      control: { type: "text" },
      description: "Selected date value",
    },
    format: {
      control: { type: "text" },
      description: "Date format",
    },
    minDate: {
      control: { type: "text" },
      description: "Minimum selectable date",
    },
    maxDate: {
      control: { type: "text" },
      description: "Maximum selectable date",
    },
    locale: {
      control: { type: "text" },
      description: "Locale for date formatting",
    },
    firstDayOfWeek: {
      control: { type: "select" },
      options: [0, 1],
      description: "First day of week (0=Sunday, 1=Monday)",
    },
    inline: {
      control: { type: "boolean" },
      description: "Display inline",
    },
    showWeekNumbers: {
      control: { type: "boolean" },
      description: "Show week numbers",
    },
    showTodayButton: {
      control: { type: "boolean" },
      description: "Show today button",
    },
    showClearButton: {
      control: { type: "boolean" },
      description: "Show clear button",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state",
    },
    required: {
      control: { type: "boolean" },
      description: "Required state",
    },
    error: {
      control: { type: "boolean" },
      description: "Error state",
    },
    readonly: {
      control: { type: "boolean" },
      description: "Readonly state",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    label: {
      control: { type: "text" },
      description: "Label text",
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text",
    },
    errorText: {
      control: { type: "text" },
      description: "Error message",
    },
    disabledDates: {
      control: { type: "array" },
      description: "Dates to disable",
    },
    disabledDaysOfWeek: {
      control: { type: "array" },
      description: "Days of week to disable (0=Sunday, 6=Saturday)",
    },
  },
};

export default meta;
type Story = StoryObj<DatePickerArgs>;

export const Default: Story = {
  args: {
    mode: "single",
    value: "",
    format: "YYYY-MM-DD",
    minDate: "",
    maxDate: "",
    locale: "en",
    firstDayOfWeek: 0,
    inline: false,
    showWeekNumbers: false,
    showTodayButton: false,
    showClearButton: false,
    disabled: false,
    required: false,
    error: false,
    readonly: false,
    placeholder: "Select date",
    label: "",
    helperText: "",
    errorText: "",
    disabledDates: [],
    disabledDaysOfWeek: [],
  },
  render: (args) => html`
    <ha-date-picker
      mode="${args.mode}"
      value="${args.value}"
      format="${args.format}"
      min-date="${args.minDate}"
      max-date="${args.maxDate}"
      locale="${args.locale}"
      first-day-of-week="${args.firstDayOfWeek}"
      ?inline="${args.inline}"
      ?show-week-numbers="${args.showWeekNumbers}"
      ?show-today-button="${args.showTodayButton}"
      ?show-clear-button="${args.showClearButton}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?readonly="${args.readonly}"
      placeholder="${args.placeholder}"
      label="${args.label}"
      helper-text="${args.helperText}"
      error-text="${args.errorText}"
      .disabledDates="${args.disabledDates}"
      .disabledDaysOfWeek="${args.disabledDaysOfWeek}"
    ></ha-date-picker>
  `,
};

export const WithDisabledDates: Story = {
  args: {
    ...Default.args,
    label: "Disabled Specific Dates",
    disabledDates: [
      new Date(2025, 0, 10), // Jan 10, 2025
      new Date(2025, 0, 15), // Jan 15, 2025
      new Date(2025, 0, 20), // Jan 20, 2025
    ],
    value: "2025-01-01",
  },
  render: Default.render,
};

export const WithDisabledDaysOfWeek: Story = {
  args: {
    ...Default.args,
    label: "Disabled Weekends",
    disabledDaysOfWeek: [0, 6], // Sunday and Saturday
    value: "2025-01-01",
  },
  render: Default.render,
};


export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: "Select Date",
    helperText: "Choose a date from the calendar",
  },
  render: Default.render,
};

export const RangeMode: Story = {
  args: {
    ...Default.args,
    mode: "range",
    label: "Select Date Range",
    helperText: "Choose start and end dates",
  },
  render: Default.render,
};

export const MultipleMode: Story = {
  args: {
    ...Default.args,
    mode: "multiple",
    label: "Select Multiple Dates",
    helperText: "Choose multiple dates",
  },
  render: Default.render,
};

export const WithMinMaxDate: Story = {
  args: {
    ...Default.args,
    minDate: "2025-01-01",
    maxDate: "2025-12-31",
    label: "Select Date (2025 only)",
    helperText: "Only dates within 2025 are selectable",
  },
  render: Default.render,
};

export const WithTodayButton: Story = {
  args: {
    ...Default.args,
    showTodayButton: true,
    label: "Select Date",
    helperText: "Use the Today button to quickly select today's date",
  },
  render: Default.render,
};

export const WithClearButton: Story = {
  args: {
    ...Default.args,
    showClearButton: true,
    showTodayButton: true,
    label: "Select Date",
    helperText: "Use the Clear button to reset selection",
  },
  render: Default.render,
};

export const Inline: Story = {
  args: {
    ...Default.args,
    inline: true,
    showTodayButton: true,
    showClearButton: true,
  },
  render: Default.render,
};

export const WithWeekNumbers: Story = {
  args: {
    ...Default.args,
    showWeekNumbers: true,
    inline: true,
    label: "Calendar with Week Numbers",
  },
  render: Default.render,
};

export const MondayFirstDay: Story = {
  args: {
    ...Default.args,
    firstDayOfWeek: 1,
    inline: true,
    label: "Week starts on Monday",
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    label: "Disabled Date Picker",
  },
  render: Default.render,
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
    label: "Required Date Picker",
    helperText: "This field is required",
  },
  render: Default.render,
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    errorText: "Please select a valid date",
    label: "Date Picker with Error",
  },
  render: Default.render,
};

export const Readonly: Story = {
  args: {
    ...Default.args,
    readonly: true,
    value: "2025-01-15",
    label: "Readonly Date Picker",
  },
  render: Default.render,
};

export const DifferentLocale: Story = {
  args: {
    ...Default.args,
    locale: "ja",
    inline: true,
    label: "Japanese Locale",
    helperText: "Calendar with Japanese locale",
  },
  render: Default.render,
};

export const WithEvents: Story = {
  args: {
    ...Default.args,
    showTodayButton: true,
    showClearButton: true,
    label: "Date Picker with Events",
    helperText: "Check the Actions panel for events",
  },
  render: (args) => html`
    <ha-date-picker
      mode="${args.mode}"
      value="${args.value}"
      format="${args.format}"
      ?show-today-button="${args.showTodayButton}"
      ?show-clear-button="${args.showClearButton}"
      label="${args.label}"
      helper-text="${args.helperText}"
      @date-select="${(e: CustomEvent) => {
        console.log("Date selected:", e.detail);
      }}"
      @date-clear="${() => {
        console.log("Date cleared");
      }}"
      @month-change="${(e: CustomEvent) => {
        console.log("Month changed:", e.detail);
      }}"
      @calendar-open="${() => {
        console.log("Calendar opened");
      }}"
      @calendar-close="${() => {
        console.log("Calendar closed");
      }}"
      .disabledDates="${args.disabledDates}"
      .disabledDaysOfWeek="${args.disabledDaysOfWeek}"
    ></ha-date-picker>
  `,
};
