import React, { forwardRef, useRef, useEffect, ReactNode } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-dropdown': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          placement?: string;
          trigger?: string;
          open?: boolean;
        },
        HTMLElement
      >;
      'ha-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          size?: string;
        },
        HTMLElement
      >;
      'ha-menu-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          disabled?: boolean;
          danger?: boolean;
        },
        HTMLElement
      >;
      'ha-menu-divider': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface HaDropdownElement extends HTMLElement {
  placement: string;
  triggerMode: string;
  open: boolean;
  showDropdown: () => void;
  hideDropdown: () => void;
  toggleDropdown: () => void;
}

interface HaMenuElement extends HTMLElement {
  size: string;
}

interface HaMenuItemElement extends HTMLElement {
  value: string;
  disabled: boolean;
  danger: boolean;
}

export interface DropdownProps {
  placement?: string;
  trigger?: string;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}

export interface MenuProps {
  size?: string;
  onItemClick?: (value: string) => void;
  className?: string;
  children?: ReactNode;
}

export interface MenuItemProps {
  value?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

export interface MenuDividerProps {
  className?: string;
}

export const Dropdown = forwardRef<HTMLElement, DropdownProps>(
  ({ placement, trigger, open, onOpen, onClose, className, children, ...props }, _ref) => {
    const elementRef = useRef<HaDropdownElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleOpen = () => {
        onOpen?.();
      };

      const handleClose = () => {
        onClose?.();
      };

      element.addEventListener('open', handleOpen);
      element.addEventListener('close', handleClose);

      return () => {
        element.removeEventListener('open', handleOpen);
        element.removeEventListener('close', handleClose);
      };
    }, [onOpen, onClose]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (placement) element.placement = placement;
      if (trigger) element.triggerMode = trigger;
      if (typeof open === 'boolean') element.open = open;
    }, [placement, trigger, open]);

    return (
      <ha-dropdown ref={elementRef} className={className} {...props}>
        {children}
      </ha-dropdown>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export const Menu = forwardRef<HTMLElement, MenuProps>(
  ({ size, onItemClick, className, children, ...props }, _ref) => {
    const elementRef = useRef<HaMenuElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onItemClick) return;

      const handleItemClick = (e: Event) => {
        const customEvent = e as CustomEvent;
        onItemClick(customEvent.detail.value);
      };

      element.addEventListener('item-click', handleItemClick);

      return () => {
        element.removeEventListener('item-click', handleItemClick);
      };
    }, [onItemClick]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (size) element.size = size;
    }, [size]);

    return (
      <ha-menu ref={elementRef} className={className} {...props}>
        {children}
      </ha-menu>
    );
  }
);

Menu.displayName = 'Menu';

export const MenuItem = forwardRef<HTMLElement, MenuItemProps>(
  ({ value, disabled, danger, onClick, className, children, ...props }, _ref) => {
    const elementRef = useRef<HaMenuItemElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onClick) return;

      const handleClick = () => {
        onClick();
      };

      element.addEventListener('item-click', handleClick);

      return () => {
        element.removeEventListener('item-click', handleClick);
      };
    }, [onClick]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (value) element.value = value;
      if (typeof disabled === 'boolean') element.disabled = disabled;
      if (typeof danger === 'boolean') element.danger = danger;
    }, [value, disabled, danger]);

    return (
      <ha-menu-item ref={elementRef} className={className} {...props}>
        {children}
      </ha-menu-item>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export const MenuDivider = forwardRef<HTMLElement, MenuDividerProps>(
  ({ className, ...props }, _ref) => {
    return <ha-menu-divider className={className} {...props} />;
  }
);

MenuDivider.displayName = 'MenuDivider';
