import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import React from 'react';

describe('Checkbox', () => {
  it('should render checkbox', () => {
    render(<Checkbox />);
    const checkbox = document.querySelector('ha-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should set size prop', () => {
    render(<Checkbox size="lg" />);
    const checkbox = document.querySelector('ha-checkbox') as any;
    expect(checkbox.size).toBe('lg');
  });

  it('should set checked prop', () => {
    render(<Checkbox checked />);
    const checkbox = document.querySelector('ha-checkbox') as any;
    expect(checkbox.checked).toBe(true);
  });

  it('should set indeterminate prop', () => {
    render(<Checkbox indeterminate />);
    const checkbox = document.querySelector('ha-checkbox') as any;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('should set disabled prop', () => {
    render(<Checkbox disabled />);
    const checkbox = document.querySelector('ha-checkbox') as any;
    expect(checkbox.disabled).toBe(true);
  });

  it('should set required prop', () => {
    render(<Checkbox required />);
    const checkbox = document.querySelector('ha-checkbox') as any;
    expect(checkbox.required).toBe(true);
  });

  it('should set error prop', () => {
    render(<Checkbox error />);
    const checkbox = document.querySelector('ha-checkbox') as any;
    expect(checkbox.error).toBe(true);
  });

  it('should set name prop', () => {
    render(<Checkbox name="terms" />);
    const checkbox = document.querySelector('ha-checkbox') as any;
    expect(checkbox.name).toBe('terms');
  });

  it('should set value prop', () => {
    render(<Checkbox value="yes" />);
    const checkbox = document.querySelector('ha-checkbox') as any;
    expect(checkbox.value).toBe('yes');
  });

  it('should render children as label', () => {
    render(<Checkbox>Accept terms</Checkbox>);
    const checkbox = document.querySelector('ha-checkbox');
    expect(checkbox).toHaveTextContent('Accept terms');
  });

  it('should handle change events', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    const checkbox = document.querySelector('ha-checkbox') as HTMLElement;
    checkbox.dispatchEvent(new CustomEvent('change', { detail: { checked: true } }));
    expect(handleChange).toHaveBeenCalled();
  });

  it('should expose focus method via ref', () => {
    const ref = React.createRef<any>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.focus).toBe('function');
  });

  it('should expose blur method via ref', () => {
    const ref = React.createRef<any>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.blur).toBe('function');
  });

  it('should expose validation methods via ref', () => {
    const ref = React.createRef<any>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.checkValidity).toBe('function');
    expect(typeof ref.current.reportValidity).toBe('function');
    expect(typeof ref.current.setCustomValidity).toBe('function');
  });

  it('should update props when they change', () => {
    const { rerender } = render(<Checkbox checked={false} />);
    const checkbox = document.querySelector('ha-checkbox') as any;
    expect(checkbox.checked).toBe(false);

    rerender(<Checkbox checked={true} />);
    expect(checkbox.checked).toBe(true);
  });
});
