export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  name?: string;
  autocomplete?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface CheckboxProps {
  size?: 'sm' | 'md' | 'lg';
  modelValue?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
}

export interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface GridProps {
  columns?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}

export interface StackProps {
  direction?: 'vertical' | 'horizontal';
  gap?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap?: boolean;
}
