import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Input } from './Input';
import React from 'react';

describe('Input', () => {
  it('should render input', () => {
    render(<Input />);
    const input = document.querySelector('ha-input');
    expect(input).toBeInTheDocument();
  });

  it('should set variant prop', () => {
    render(<Input variant="filled" />);
    const input = document.querySelector('ha-input') as any;
    expect(input.variant).toBe('filled');
  });

  it('should set size prop', () => {
    render(<Input size="lg" />);
    const input = document.querySelector('ha-input') as any;
    expect(input.size).toBe('lg');
  });

  it('should set type prop', () => {
    render(<Input type="email" />);
    const input = document.querySelector('ha-input') as any;
    expect(input.type).toBe('email');
  });

  it('should set value prop', () => {
    render(<Input value="test value" />);
    const input = document.querySelector('ha-input') as any;
    expect(input.value).toBe('test value');
  });

  it('should set placeholder prop', () => {
    render(<Input placeholder="Enter text" />);
    const input = document.querySelector('ha-input') as any;
    expect(input.placeholder).toBe('Enter text');
  });

  it('should set disabled prop', () => {
    render(<Input disabled />);
    const input = document.querySelector('ha-input') as any;
    expect(input.disabled).toBe(true);
  });

  it('should set readonly prop', () => {
    render(<Input readonly />);
    const input = document.querySelector('ha-input') as any;
    expect(input.readonly).toBe(true);
  });

  it('should set required prop', () => {
    render(<Input required />);
    const input = document.querySelector('ha-input') as any;
    expect(input.required).toBe(true);
  });

  it('should set error prop', () => {
    render(<Input error />);
    const input = document.querySelector('ha-input') as any;
    expect(input.error).toBe(true);
  });

  it('should handle input events', () => {
    const handleInput = vi.fn();
    render(<Input onInput={handleInput} />);
    const input = document.querySelector('ha-input') as HTMLElement;
    input.dispatchEvent(new CustomEvent('input', { detail: { value: 'test' } }));
    expect(handleInput).toHaveBeenCalled();
  });

  it('should expose focus method via ref', () => {
    const ref = React.createRef<any>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.focus).toBe('function');
  });

  it('should expose blur method via ref', () => {
    const ref = React.createRef<any>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.blur).toBe('function');
  });

  it('should expose select method via ref', () => {
    const ref = React.createRef<any>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.select).toBe('function');
  });

  it('should expose validation methods via ref', () => {
    const ref = React.createRef<any>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.checkValidity).toBe('function');
    expect(typeof ref.current.reportValidity).toBe('function');
    expect(typeof ref.current.setCustomValidity).toBe('function');
  });

  it('should update props when they change', () => {
    const { rerender } = render(<Input value="initial" />);
    const input = document.querySelector('ha-input') as any;
    expect(input.value).toBe('initial');

    rerender(<Input value="updated" />);
    expect(input.value).toBe('updated');
  });
});
