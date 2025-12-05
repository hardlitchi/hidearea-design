import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HaButton from "./Button.vue";

describe("HaButton", () => {
  it("should render button with slot content", () => {
    const wrapper = mount(HaButton, {
      slots: {
        default: "Click me",
      },
    });
    const button = wrapper.element as any;
    expect(button).toBeTruthy();
    expect(button.tagName.toLowerCase()).toBe("ha-button");
    expect(button.textContent).toContain("Click me");
  });

  it("should set variant prop", () => {
    const wrapper = mount(HaButton, {
      props: {
        variant: "secondary",
      },
    });
    const button = wrapper.element as any;
    expect(button.variant).toBe("secondary");
  });

  it("should set size prop", () => {
    const wrapper = mount(HaButton, {
      props: {
        size: "lg",
      },
    });
    const button = wrapper.element as any;
    expect(button.size).toBe("lg");
  });

  it("should set disabled prop", () => {
    const wrapper = mount(HaButton, {
      props: {
        disabled: true,
      },
    });
    const button = wrapper.element as any;
    expect(button.disabled).toBe(true);
  });

  it("should set loading prop", () => {
    const wrapper = mount(HaButton, {
      props: {
        loading: true,
      },
    });
    const button = wrapper.element as any;
    expect(button.loading).toBe(true);
  });

  it("should set fullWidth prop", () => {
    const wrapper = mount(HaButton, {
      props: {
        fullWidth: true,
      },
    });
    const button = wrapper.element as any;
    expect(button.fullWidth).toBe(true);
  });

  it("should set type prop", () => {
    const wrapper = mount(HaButton, {
      props: {
        type: "submit",
      },
    });
    const button = wrapper.element as any;
    expect(button.getAttribute("type")).toBe("submit");
  });

  it("should apply default props", () => {
    const wrapper = mount(HaButton);
    const button = wrapper.element as any;
    expect(button.variant).toBe("primary");
    expect(button.size).toBe("md");
    expect(button.disabled).toBe(false);
    expect(button.loading).toBe(false);
    expect(button.fullWidth).toBe(false);
  });

  it("should update props when they change", async () => {
    const wrapper = mount(HaButton, {
      props: {
        variant: "primary",
      },
    });
    const button = wrapper.element as any;
    expect(button.variant).toBe("primary");

    await wrapper.setProps({ variant: "secondary" });
    expect(button.variant).toBe("secondary");
  });
});
