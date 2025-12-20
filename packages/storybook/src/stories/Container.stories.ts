import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface ContainerArgs {
  maxWidth: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  centered: boolean;
  padding: "none" | "sm" | "md" | "lg";
}

const meta: Meta<ContainerArgs> = {
  title: "Layout/Container",
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
      description: "Maximum width of the container",
    },
    centered: {
      control: { type: "boolean" },
      description: "Center the container horizontally",
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
      description: "Padding size",
    },
  },
};

export default meta;
type Story = StoryObj<ContainerArgs>;

const demoContent = html`
  <div
    style="background: var(--color-primary-100, #e0e7ff); padding: 2rem; border-radius: 0.5rem; text-align: center;"
  >
    <h2 style="margin: 0 0 1rem 0; color: var(--color-primary-900, #312e81);">
      Container Content
    </h2>
    <p style="margin: 0; color: var(--color-primary-700, #4338ca);">
      This container adjusts its maximum width and padding based on the provided
      attributes.
    </p>
  </div>
`;

export const Default: Story = {
  args: {
    maxWidth: "lg",
    centered: true,
    padding: "md",
  },
  render: (args) => html`
    <ha-container
      id="test-container"
      max-width="${args.maxWidth}"
      ?centered="${args.centered}"
      padding="${args.padding}"
    >
      ${demoContent}
    </ha-container>
  `,
  play: async ({ canvasElement, step }) => {
    await step("Container should be present", async () => {
      const container = canvasElement.querySelector("#test-container");
      await expect(container).toBeTruthy();
    });

    await step("Container should have correct max-width", async () => {
      const container = canvasElement.querySelector("#test-container");
      await expect(container?.getAttribute("max-width")).toBe("lg");
    });

    await step("Container should have correct padding", async () => {
      const container = canvasElement.querySelector("#test-container");
      await expect(container?.getAttribute("padding")).toBe("md");
    });

    await step("Container should be centered", async () => {
      const container = canvasElement.querySelector("#test-container");
      await expect(container?.hasAttribute("centered")).toBe(true);
    });
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    maxWidth: "sm",
  },
  render: Default.render,
};

export const Medium: Story = {
  args: {
    ...Default.args,
    maxWidth: "md",
  },
  render: Default.render,
};

export const Large: Story = {
  args: {
    ...Default.args,
    maxWidth: "lg",
  },
  render: Default.render,
};

export const ExtraLarge: Story = {
  args: {
    ...Default.args,
    maxWidth: "xl",
  },
  render: Default.render,
};

export const DoubleExtraLarge: Story = {
  args: {
    ...Default.args,
    maxWidth: "2xl",
  },
  render: Default.render,
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    maxWidth: "full",
  },
  render: Default.render,
};

export const NotCentered: Story = {
  args: {
    ...Default.args,
    centered: false,
  },
  render: Default.render,
};

export const NoPadding: Story = {
  args: {
    ...Default.args,
    padding: "none",
  },
  render: Default.render,
};

export const SmallPadding: Story = {
  args: {
    ...Default.args,
    padding: "sm",
  },
  render: Default.render,
};

export const LargePadding: Story = {
  args: {
    ...Default.args,
    padding: "lg",
  },
  render: Default.render,
};

export const AllMaxWidths: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Small (sm)</h3>
        <ha-container max-width="sm" centered>
          <div
            style="background: var(--color-primary-100, #e0e7ff); padding: 1rem; text-align: center; border-radius: 0.5rem;"
          >
            Max width: sm
          </div>
        </ha-container>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Medium (md)</h3>
        <ha-container max-width="md" centered>
          <div
            style="background: var(--color-primary-100, #e0e7ff); padding: 1rem; text-align: center; border-radius: 0.5rem;"
          >
            Max width: md
          </div>
        </ha-container>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Large (lg)</h3>
        <ha-container max-width="lg" centered>
          <div
            style="background: var(--color-primary-100, #e0e7ff); padding: 1rem; text-align: center; border-radius: 0.5rem;"
          >
            Max width: lg
          </div>
        </ha-container>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Extra Large (xl)</h3>
        <ha-container max-width="xl" centered>
          <div
            style="background: var(--color-primary-100, #e0e7ff); padding: 1rem; text-align: center; border-radius: 0.5rem;"
          >
            Max width: xl
          </div>
        </ha-container>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Double Extra Large (2xl)</h3>
        <ha-container max-width="2xl" centered>
          <div
            style="background: var(--color-primary-100, #e0e7ff); padding: 1rem; text-align: center; border-radius: 0.5rem;"
          >
            Max width: 2xl
          </div>
        </ha-container>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Full Width</h3>
        <ha-container max-width="full" centered>
          <div
            style="background: var(--color-primary-100, #e0e7ff); padding: 1rem; text-align: center; border-radius: 0.5rem;"
          >
            Max width: full
          </div>
        </ha-container>
      </div>
    </div>
  `,
};

export const NestedContent: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => html`
    <ha-container
      max-width="${args.maxWidth}"
      ?centered="${args.centered}"
      padding="${args.padding}"
    >
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div
          style="background: var(--color-primary-100, #e0e7ff); padding: 1.5rem; border-radius: 0.5rem;"
        >
          <h2
            style="margin: 0 0 0.5rem 0; color: var(--color-primary-900, #312e81);"
          >
            Welcome
          </h2>
          <p style="margin: 0; color: var(--color-primary-700, #4338ca);">
            This is a container with nested content demonstrating how it manages
            various types of content.
          </p>
        </div>
        <div
          style="background: var(--color-success-100, #d1fae5); padding: 1.5rem; border-radius: 0.5rem;"
        >
          <h3
            style="margin: 0 0 0.5rem 0; color: var(--color-success-900, #064e3b);"
          >
            Features
          </h3>
          <ul
            style="margin: 0; padding-left: 1.5rem; color: var(--color-success-700, #047857);"
          >
            <li>Responsive max-width options</li>
            <li>Customizable padding</li>
            <li>Optional centering</li>
          </ul>
        </div>
      </div>
    </ha-container>
  `,
};
