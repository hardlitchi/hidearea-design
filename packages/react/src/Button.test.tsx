import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import React from "react";

describe("Button", () => {
  it("should render button with children", () => {
    render(<Button>Click me</Button>);
    const button = document.querySelector("ha-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("should set variant prop", () => {
    render(<Button variant="secondary">Button</Button>);
    const button = document.querySelector("ha-button") as any;
    expect(button.variant).toBe("secondary");
  });

  it("should set size prop", () => {
    render(<Button size="lg">Button</Button>);
    const button = document.querySelector("ha-button") as any;
    expect(button.size).toBe("lg");
  });

  it("should set disabled prop", () => {
    render(<Button disabled>Button</Button>);
    const button = document.querySelector("ha-button") as any;
    expect(button.disabled).toBe(true);
  });

  it("should set loading prop", () => {
    render(<Button loading>Button</Button>);
    const button = document.querySelector("ha-button") as any;
    expect(button.loading).toBe(true);
  });

  it("should set fullWidth prop", () => {
    render(<Button fullWidth>Button</Button>);
    const button = document.querySelector("ha-button") as any;
    expect(button.fullWidth).toBe(true);
  });

  it("should set type attribute", () => {
    render(<Button type="submit">Button</Button>);
    const button = document.querySelector("ha-button") as any;
    expect(button.getAttribute("type")).toBe("submit");
  });

  it("should apply default props", () => {
    render(<Button>Button</Button>);
    const button = document.querySelector("ha-button") as any;
    expect(button.variant).toBe("primary");
    expect(button.size).toBe("md");
    expect(button.disabled).toBe(false);
    expect(button.loading).toBe(false);
    expect(button.fullWidth).toBe(false);
  });

  it("should forward custom props to web component", () => {
    render(<Button data-testid="my-button">Button</Button>);
    const button = document.querySelector("ha-button");
    expect(button).toHaveAttribute("data-testid", "my-button");
  });

  it("should handle click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Button</Button>);
    const button = document.querySelector("ha-button") as HTMLElement;
    button.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it("should expose focus method via ref", () => {
    const ref = React.createRef<any>();
    render(<Button ref={ref}>Button</Button>);
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.focus).toBe("function");
  });

  it("should expose blur method via ref", () => {
    const ref = React.createRef<any>();
    render(<Button ref={ref}>Button</Button>);
    expect(ref.current).toBeDefined();
    expect(typeof ref.current.blur).toBe("function");
  });

  it("should update props when they change", () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    const button = document.querySelector("ha-button") as any;
    expect(button.variant).toBe("primary");

    rerender(<Button variant="secondary">Button</Button>);
    expect(button.variant).toBe("secondary");
  });

  it("should render multiple variants", () => {
    const variants: Array<
      "primary" | "secondary" | "outline" | "ghost" | "danger"
    > = ["primary", "secondary", "outline", "ghost", "danger"];

    variants.forEach((variant) => {
      const { unmount } = render(<Button variant={variant}>Button</Button>);
      const button = document.querySelector("ha-button") as any;
      expect(button.variant).toBe(variant);
      unmount();
    });
  });

  it("should render multiple sizes", () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    sizes.forEach((size) => {
      const { unmount } = render(<Button size={size}>Button</Button>);
      const button = document.querySelector("ha-button") as any;
      expect(button.size).toBe(size);
      unmount();
    });
  });

  it("should render with different button types", () => {
    const types: Array<"button" | "submit" | "reset"> = [
      "button",
      "submit",
      "reset",
    ];

    types.forEach((type) => {
      const { unmount } = render(<Button type={type}>Button</Button>);
      const button = document.querySelector("ha-button") as any;
      expect(button.getAttribute("type")).toBe(type);
      unmount();
    });
  });
});
