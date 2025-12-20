import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface TimePickerArgs {
  value: string;
  format: "12" | "24";
  showSeconds: boolean;
  hourStep: number;
  minuteStep: number;
  secondStep: number;
  minTime: string;
  maxTime: string;
  disabledHours: string;
  disabledMinutes: string;
  inline: boolean;
  placeholder: string;
  label: string;
  helperText: string;
  disabled: boolean;
  required: boolean;
  error: boolean;
  readonly: boolean;
  errorText: string;
  showNowButton: boolean;
  showClearButton: boolean;
}

const meta: Meta<TimePickerArgs> = {
  title: "Other/TimePicker",
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "text" },
      description: "Time value (HH:mm or HH:mm:ss)",
    },
    format: {
      control: { type: "select" },
      options: ["12", "24"],
      description: "Time format",
    },
    showSeconds: {
      control: { type: "boolean" },
      description: "Show seconds picker",
    },
    hourStep: {
      control: { type: "number" },
      description: "Hour increment step",
    },
    minuteStep: {
      control: { type: "number" },
      description: "Minute increment step",
    },
    secondStep: {
      control: { type: "number" },
      description: "Second increment step",
    },
    minTime: {
      control: { type: "text" },
      description: "Minimum selectable time",
    },
    maxTime: {
      control: { type: "text" },
      description: "Maximum selectable time",
    },
    disabledHours: {
      control: { type: "text" },
      description: "Disabled hours (comma-separated)",
    },
    disabledMinutes: {
      control: { type: "text" },
      description: "Disabled minutes (comma-separated)",
    },
    inline: {
      control: { type: "boolean" },
      description: "Display inline",
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
    errorText: {
      control: { type: "text" },
      description: "Error message",
    },
    showNowButton: {
      control: { type: "boolean" },
      description: "Show Now button",
    },
    showClearButton: {
      control: { type: "boolean" },
      description: "Show Clear button",
    },
  },
};

export default meta;
type Story = StoryObj<TimePickerArgs>;

export const Default: Story = {
  args: {
    value: "",
    format: "24",
    showSeconds: false,
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
    minTime: "",
    maxTime: "",
    disabledHours: "",
    disabledMinutes: "",
    inline: false,
    placeholder: "Select time",
    label: "",
    helperText: "",
    disabled: false,
    required: false,
    error: false,
    readonly: false,
    errorText: "",
    showNowButton: false,
    showClearButton: false,
  },
  render: (args) => html`
    <ha-time-picker
      value="${args.value}"
      format="${args.format}"
      ?show-seconds="${args.showSeconds}"
      hour-step="${args.hourStep}"
      minute-step="${args.minuteStep}"
      second-step="${args.secondStep}"
      min-time="${args.minTime}"
      max-time="${args.maxTime}"
      disabled-hours="${args.disabledHours}"
      disabled-minutes="${args.disabledMinutes}"
      ?inline="${args.inline}"
      placeholder="${args.placeholder}"
      label="${args.label}"
      helper-text="${args.helperText}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?readonly="${args.readonly}"
      error-text="${args.errorText}"
      ?show-now-button="${args.showNowButton}"
      ?show-clear-button="${args.showClearButton}"
    ></ha-time-picker>
  `,
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: "Select Time",
    helperText: "Choose a time from the picker",
  },
  render: Default.render,
};

export const Format12Hour: Story = {
  args: {
    ...Default.args,
    format: "12",
    label: "12-Hour Format",
    helperText: "Time in 12-hour format with AM/PM",
  },
  render: Default.render,
};

export const WithSeconds: Story = {
  args: {
    ...Default.args,
    showSeconds: true,
    label: "Time with Seconds",
    helperText: "Select hours, minutes, and seconds",
  },
  render: Default.render,
};

export const MinuteStep15: Story = {
  args: {
    ...Default.args,
    minuteStep: 15,
    label: "15-Minute Intervals",
    helperText: "Minutes in 15-minute increments",
  },
  render: Default.render,
};

export const WithTimeRestrictions: Story = {
  args: {
    ...Default.args,
    minTime: "09:00",
    maxTime: "17:00",
    label: "Business Hours",
    helperText: "Only 9 AM to 5 PM available",
  },
  render: Default.render,
};

export const DisabledLunchHours: Story = {
  args: {
    ...Default.args,
    disabledHours: "12,13",
    label: "Skip Lunch Hours",
    helperText: "12 PM and 1 PM are disabled",
  },
  render: Default.render,
};

export const WithNowButton: Story = {
  args: {
    ...Default.args,
    showNowButton: true,
    label: "Select Time",
    helperText: "Use the Now button to select current time",
  },
  render: Default.render,
};

export const WithClearButton: Story = {
  args: {
    ...Default.args,
    showClearButton: true,
    showNowButton: true,
    label: "Select Time",
    helperText: "Use the Clear button to reset selection",
  },
  render: Default.render,
};

export const Inline: Story = {
  args: {
    ...Default.args,
    inline: true,
    showNowButton: true,
    showClearButton: true,
  },
  render: Default.render,
};

export const Inline12Hour: Story = {
  args: {
    ...Default.args,
    format: "12",
    inline: true,
    showNowButton: true,
    showClearButton: true,
    label: "12-Hour Inline Picker",
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: "14:30",
    label: "Disabled Time Picker",
  },
  render: Default.render,
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
    label: "Required Time Picker",
    helperText: "This field is required",
  },
  render: Default.render,
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    errorText: "Please select a valid time",
    label: "Time Picker with Error",
  },
  render: Default.render,
};

export const Readonly: Story = {
  args: {
    ...Default.args,
    readonly: true,
    value: "14:30",
    label: "Readonly Time Picker",
  },
  render: Default.render,
};

export const WithEvents: Story = {
  args: {
    ...Default.args,
    showNowButton: true,
    showClearButton: true,
    label: "Time Picker with Events",
    helperText: "Check the Actions panel for events",
  },
  render: (args) => html`
    <ha-time-picker
      format="${args.format}"
      ?show-now-button="${args.showNowButton}"
      ?show-clear-button="${args.showClearButton}"
      label="${args.label}"
      helper-text="${args.helperText}"
      @time-select="${(e: CustomEvent) => {
        console.log("Time selected:", e.detail);
      }}"
      @time-clear="${() => {
        console.log("Time cleared");
      }}"
      @picker-open="${() => {
        console.log("Picker opened");
      }}"
      @picker-close="${() => {
        console.log("Picker closed");
      }}"
    ></ha-time-picker>
  `,
};

export const AppointmentScheduler: Story = {
  args: {
    ...Default.args,
    format: "12",
    minuteStep: 30,
    minTime: "08:00",
    maxTime: "18:00",
    disabledHours: "12",
    showNowButton: true,
    showClearButton: true,
    label: "Appointment Time",
    helperText: "Available in 30-minute slots, 8 AM - 6 PM (lunch hour excluded)",
  },
  render: Default.render,
};

export const MeetingPlanner: Story = {
  args: {
    ...Default.args,
    format: "24",
    minuteStep: 15,
    minTime: "09:00",
    maxTime: "17:00",
    showNowButton: true,
    label: "Meeting Start Time",
    helperText: "Select start time for the meeting (9 AM - 5 PM)",
  },
  render: Default.render,
};
