import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HaInput from "./Input.vue";

describe("HaInput", () => {
  it("should render input", () => {
    const wrapper = mount(HaInput);
    const input = wrapper.element as any;
    expect(input).toBeTruthy();
    expect(input.tagName.toLowerCase()).toBe("ha-input");
  });

  it("should set variant prop", () => {
    const wrapper = mount(HaInput, {
      props: {
        variant: "filled",
      },
    });
    const input = wrapper.element as any;
    expect(input.variant).toBe("filled");
  });

  it("should set size prop", () => {
    const wrapper = mount(HaInput, {
      props: {
        size: "lg",
      },
    });
    const input = wrapper.element as any;
    expect(input.size).toBe("lg");
  });

  it("should set type prop", () => {
    const wrapper = mount(HaInput, {
      props: {
        type: "email",
      },
    });
    const input = wrapper.element as any;
    expect(input.type).toBe("email");
  });

  it("should set modelValue prop", () => {
    const wrapper = mount(HaInput, {
      props: {
        modelValue: "test value",
      },
    });
    const input = wrapper.element as any;
    expect(input.value).toBe("test value");
  });

  it("should set placeholder prop", () => {
    const wrapper = mount(HaInput, {
      props: {
        placeholder: "Enter text",
      },
    });
    const input = wrapper.element as any;
    expect(input.placeholder).toBe("Enter text");
  });

  it("should set disabled prop", () => {
    const wrapper = mount(HaInput, {
      props: {
        disabled: true,
      },
    });
    const input = wrapper.element as any;
    expect(input.disabled).toBe(true);
  });

  it("should set readonly prop", () => {
    const wrapper = mount(HaInput, {
      props: {
        readonly: true,
      },
    });
    const input = wrapper.element as any;
    expect(input.readonly).toBe(true);
  });

  it("should set required prop", () => {
    const wrapper = mount(HaInput, {
      props: {
        required: true,
      },
    });
    const input = wrapper.element as any;
    expect(input.required).toBe(true);
  });

  it("should set error prop", () => {
    const wrapper = mount(HaInput, {
      props: {
        error: true,
      },
    });
    const input = wrapper.element as any;
    expect(input.error).toBe(true);
  });

  it("should update modelValue when input changes", async () => {
    const wrapper = mount(HaInput, {
      props: {
        modelValue: "",
        "onUpdate:modelValue": (value: string) =>
          wrapper.setProps({ modelValue: value }),
      },
    });

    const input = wrapper.element as any;
    input.value = "new value";
    input.dispatchEvent(
      new CustomEvent("input", { detail: { value: "new value" } }),
    );

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });
});
