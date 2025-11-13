import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HaCheckbox from './Checkbox.vue';

describe('HaCheckbox', () => {
  it('should render checkbox', () => {
    const wrapper = mount(HaCheckbox);
    const checkbox = wrapper.element.querySelector('ha-checkbox');
    expect(checkbox).toBeTruthy();
  });

  it('should set size prop', () => {
    const wrapper = mount(HaCheckbox, {
      props: {
        size: 'lg',
      },
    });
    const checkbox = wrapper.element.querySelector('ha-checkbox') as any;
    expect(checkbox.size).toBe('lg');
  });

  it('should set modelValue prop (checked)', () => {
    const wrapper = mount(HaCheckbox, {
      props: {
        modelValue: true,
      },
    });
    const checkbox = wrapper.element.querySelector('ha-checkbox') as any;
    expect(checkbox.checked).toBe(true);
  });

  it('should set indeterminate prop', () => {
    const wrapper = mount(HaCheckbox, {
      props: {
        indeterminate: true,
      },
    });
    const checkbox = wrapper.element.querySelector('ha-checkbox') as any;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('should set disabled prop', () => {
    const wrapper = mount(HaCheckbox, {
      props: {
        disabled: true,
      },
    });
    const checkbox = wrapper.element.querySelector('ha-checkbox') as any;
    expect(checkbox.disabled).toBe(true);
  });

  it('should set required prop', () => {
    const wrapper = mount(HaCheckbox, {
      props: {
        required: true,
      },
    });
    const checkbox = wrapper.element.querySelector('ha-checkbox') as any;
    expect(checkbox.required).toBe(true);
  });

  it('should set error prop', () => {
    const wrapper = mount(HaCheckbox, {
      props: {
        error: true,
      },
    });
    const checkbox = wrapper.element.querySelector('ha-checkbox') as any;
    expect(checkbox.error).toBe(true);
  });

  it('should set name prop', () => {
    const wrapper = mount(HaCheckbox, {
      props: {
        name: 'terms',
      },
    });
    const checkbox = wrapper.element.querySelector('ha-checkbox') as any;
    expect(checkbox.name).toBe('terms');
  });

  it('should set value prop', () => {
    const wrapper = mount(HaCheckbox, {
      props: {
        value: 'yes',
      },
    });
    const checkbox = wrapper.element.querySelector('ha-checkbox') as any;
    expect(checkbox.value).toBe('yes');
  });

  it('should render slot content as label', () => {
    const wrapper = mount(HaCheckbox, {
      slots: {
        default: 'Accept terms',
      },
    });
    const checkbox = wrapper.element.querySelector('ha-checkbox');
    expect(checkbox?.textContent).toContain('Accept terms');
  });

  it('should update modelValue when checkbox changes', async () => {
    const wrapper = mount(HaCheckbox, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
      },
    });

    const checkbox = wrapper.element.querySelector('ha-checkbox') as any;
    checkbox.checked = true;
    checkbox.dispatchEvent(new CustomEvent('change', { detail: { checked: true } }));

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });
});
