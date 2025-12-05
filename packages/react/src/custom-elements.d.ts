import React from 'react';

declare global {
  namespace JSX {

    interface HaDatePickerCustomElement extends React.HTMLAttributes<HTMLElement>, React.ClassAttributes<HTMLElement> {
      mode?: 'single' | 'range' | 'multiple';
      value?: string | Date;
      format?: string;
      'min-date'?: string | Date;
      'max-date'?: string | Date;
      disabledDates?: (string | Date)[];
      disabledDaysOfWeek?: number[];
      locale?: string;
      'first-day-of-week'?: 0 | 1;
      inline?: boolean;
      'show-week-numbers'?: boolean;
      'show-today-button'?: boolean;
      'show-clear-button'?: boolean;
      disabled?: boolean;
      required?: boolean;
      error?: boolean;
      readonly?: boolean;
      placeholder?: string;
      label?: string;
      'helper-text'?: string;
      'error-text'?: string;
    }

    interface HaTimePickerCustomElement extends React.HTMLAttributes<HTMLElement>, React.ClassAttributes<HTMLElement> {
      value?: string;
      format?: '12' | '24';
      showSeconds?: boolean;
      hourStep?: number;
      minuteStep?: number;
      secondStep?: number;
      'min-time'?: string;
      'max-time'?: string;
      disabledHours?: number[];
      disabledMinutes?: number[];
      inline?: boolean;
      placeholder?: string;
      label?: string;
      'helper-text'?: string;
      disabled?: boolean;
      required?: boolean;
      error?: boolean;
      readonly?: boolean;
      'error-text'?: string;
      'show-now-button'?: boolean;
      'show-clear-button'?: boolean;
    }

    interface IntrinsicElements {
      'ha-accordion': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-alert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-avatar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-breadcrumb': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      'ha-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-checkbox': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      'ha-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-datagrid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-date-picker': HaDatePickerCustomElement;
      'ha-drawer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-file-upload': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-form-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-input': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      'ha-list': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-modal': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-pagination': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-progress': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-radio': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      'ha-select': React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
      'ha-skeleton': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-spinner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-stack': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-tabs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-textarea': React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
      'ha-time-picker': HaTimePickerCustomElement;
      'ha-toast': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-tooltip': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
