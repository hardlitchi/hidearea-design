export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface InputProps {
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
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
  size?: "sm" | "md" | "lg";
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
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  centered?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export interface GridProps {
  columns?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyItems?: "start" | "center" | "end" | "stretch";
}

export interface StackProps {
  direction?: "vertical" | "horizontal";
  gap?: string;
  align?: "start" | "center" | "end" | "stretch";
  justify?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  wrap?: boolean;
}

export interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  styleVariant?: "filled" | "outlined" | "soft";
  title?: string;
  closable?: boolean;
  showIcon?: boolean;
}

export interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  styleVariant?: "filled" | "outlined" | "soft";
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  dot?: boolean;
  removable?: boolean;
}

export interface CardProps {
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  clickable?: boolean;
}

export interface ProgressProps {
  value?: number;
  max?: number;
  variant?: "default" | "striped" | "animated";
  color?: "primary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "success" | "warning" | "error" | "info" | "neutral";
  variant?: "circular" | "dots" | "pulse";
  speed?: string;
}

export interface FormGroupProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export interface SelectProps {
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  name?: string;
}

export interface RadioProps {
  size?: "sm" | "md" | "lg";
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
}

export interface TextareaProps {
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: boolean;
  rows?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
  name?: string;
  maxlength?: number;
  minlength?: number;
}

export interface SwitchProps {
  size?: "sm" | "md" | "lg";
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
}

export interface TooltipProps {
  content?: string;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  trigger?: "hover" | "focus" | "click";
  variant?: "default" | "dark" | "light";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  delay?: number;
  disabled?: boolean;
}

export interface TabsProps {
  value?: string;
  variant?: "default" | "outlined" | "pills";
  size?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
}

export interface BreadcrumbProps {
  separator?: "slash" | "chevron" | "arrow" | "dot";
  size?: "sm" | "md" | "lg";
}

export interface DropdownProps {
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "right";
  trigger?: "click" | "hover";
  open?: boolean;
  className?: string;
}

export interface MenuProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface MenuItemProps {
  value?: string;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
}

export interface MenuDividerProps {
  className?: string;
}

export interface ModalProps {
  open?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "centered" | "fullscreen";
  closable?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export interface ToastProps {
  variant?: "info" | "success" | "warning" | "error";
  message?: string;
  closable?: boolean;
  duration?: number;
  showProgress?: boolean;
}

export interface ToastContainerProps {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export interface PaginationProps {
  current?: number;
  total: number;
  pageSize?: number;
  variant?: "default" | "rounded" | "simple";
  size?: "sm" | "md" | "lg";
  showQuickJumper?: boolean;
}

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "circle" | "square" | "rounded";
  initials?: string;
  status?: "online" | "offline" | "away" | "busy";
}

export interface AvatarGroupProps {
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  layout?: "stack" | "grid" | "list";
}

export interface TableProps {
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  fullWidth?: boolean;
}

export interface AccordionProps {
  allowMultiple?: boolean;
  collapsible?: boolean;
}

export interface AccordionItemProps {
  open?: boolean;
  disabled?: boolean;
  header?: string;
}

export interface DrawerProps {
  open?: boolean;
  placement?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg";
  overlay?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export interface ListProps {
  bordered?: boolean;
  hoverable?: boolean;
  divided?: boolean;
}

export interface ListItemProps {
  disabled?: boolean;
  active?: boolean;
}

// ListDivider has no props, using empty object type
export type ListDividerProps = Record<string, never>;
