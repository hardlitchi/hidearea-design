import type * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface HaDatePickerCustomElement extends React.HTMLAttributes<HTMLElement> {
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

    interface HaTimePickerCustomElement extends React.HTMLAttributes<HTMLElement> {
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
      'ha-accordion': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-accordion-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-alert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-avatar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-avatar-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-breadcrumb': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-checkbox': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-datagrid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-date-picker': HaDatePickerCustomElement & Record<string, any>;
      'ha-drawer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-dropdown': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-file-upload': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-form-group': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-input': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-list': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-list-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-list-divider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-menu-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-menu-divider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-modal': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-pagination': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-progress': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-radio': React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-select': React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-skeleton': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-spinner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-stack': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-tabs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-textarea': React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-time-picker': HaTimePickerCustomElement & Record<string, any>;
      'ha-toast': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-toast-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
      'ha-tooltip': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>;
    }
  }
}
