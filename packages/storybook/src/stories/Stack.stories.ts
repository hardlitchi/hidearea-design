import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { expect, fn, userEvent, within } from "@storybook/test";
import { html } from "lit";
import "@hidearea-design/core";

interface StackArgs {
  direction: "vertical" | "horizontal";
  gap: string;
  align: "start" | "center" | "end" | "stretch" | null;
  justify:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | null;
  wrap: boolean;
}

const meta: Meta<StackArgs> = {
  title: "Layout/Stack",
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
      description: "Stack direction",
    },
    gap: {
      control: { type: "select" },
      options: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      description: "Gap size (0-12, maps to spacing tokens)",
    },
    align: {
      control: { type: "select" },
      options: [null, "start", "center", "end", "stretch"],
      description: "Align items",
    },
    justify: {
      control: { type: "select" },
      options: [
        null,
        "start",
        "center",
        "end",
        "space-between",
        "space-around",
        "space-evenly",
      ],
      description: "Justify content",
    },
    wrap: {
      control: { type: "boolean" },
      description: "Whether to wrap items",
    },
  },
};

export default meta;
type Story = StoryObj<StackArgs>;

const stackItem = (index: number) => html`
  <div
    style="
    background: var(--color-primary-100, #e0e7ff);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    text-align: center;
    color: var(--color-primary-900, #312e81);
  "
  >
    Item ${index}
  </div>
`;

export const Default: Story = {
  args: {
    direction: "vertical",
    gap: "4",
    align: null,
    justify: null,
    wrap: false,
  },
  render: (args) => html`
    <ha-stack
      id="test-stack"
      direction="${args.direction}"
      gap="${args.gap}"
      ${args.align ? `align="${args.align}"` : ""}
      ${args.justify ? `justify="${args.justify}"` : ""}
      ?wrap="${args.wrap}"
    >
      ${Array.from({ length: 4 }, (_, i) => stackItem(i + 1))}
    </ha-stack>
  `,
  play: async ({ canvasElement, step }) => {
    await step("Stack should be present", async () => {
      const stack = canvasElement.querySelector("#test-stack");
      await expect(stack).toBeTruthy();
    });
    await step("Stack should have correct direction", async () => {
      const stack = canvasElement.querySelector("#test-stack");
      await expect(stack?.getAttribute("direction")).toBe("vertical");
    });
    await step("Stack should have correct gap", async () => {
      const stack = canvasElement.querySelector("#test-stack");
      await expect(stack?.getAttribute("gap")).toBe("4");
    });
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    direction: "vertical",
  },
  render: Default.render,
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    direction: "horizontal",
  },
  render: Default.render,
};

export const SmallGap: Story = {
  args: {
    ...Default.args,
    gap: "2",
  },
  render: Default.render,
};

export const LargeGap: Story = {
  args: {
    ...Default.args,
    gap: "8",
  },
  render: Default.render,
};

export const NoGap: Story = {
  args: {
    ...Default.args,
    gap: "0",
  },
  render: Default.render,
};

export const AlignCenter: Story = {
  args: {
    ...Default.args,
    align: "center",
  },
  render: Default.render,
};

export const AlignEnd: Story = {
  args: {
    ...Default.args,
    align: "end",
  },
  render: Default.render,
};

export const JustifyCenter: Story = {
  args: {
    ...Default.args,
    justify: "center",
  },
  render: Default.render,
};

export const JustifySpaceBetween: Story = {
  args: {
    ...Default.args,
    justify: "space-between",
  },
  render: Default.render,
};

export const JustifySpaceAround: Story = {
  args: {
    ...Default.args,
    justify: "space-around",
  },
  render: Default.render,
};

export const JustifySpaceEvenly: Story = {
  args: {
    ...Default.args,
    justify: "space-evenly",
  },
  render: Default.render,
};

export const WithWrap: Story = {
  args: {
    ...Default.args,
    direction: "horizontal",
    wrap: true,
  },
  render: (args) => html`
    <ha-stack
      direction="${args.direction}"
      gap="${args.gap}"
      ?wrap="${args.wrap}"
    >
      ${Array.from({ length: 12 }, (_, i) => stackItem(i + 1))}
    </ha-stack>
  `,
};

export const HorizontalCentered: Story = {
  args: {
    ...Default.args,
    direction: "horizontal",
    align: "center",
    justify: "center",
  },
  render: Default.render,
};

export const VerticalCentered: Story = {
  args: {
    ...Default.args,
    direction: "vertical",
    align: "center",
  },
  render: Default.render,
};

export const AllDirections: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Vertical Stack</h3>
        <ha-stack direction="vertical" gap="4">
          ${Array.from({ length: 4 }, (_, i) => stackItem(i + 1))}
        </ha-stack>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Horizontal Stack</h3>
        <ha-stack direction="horizontal" gap="4">
          ${Array.from({ length: 4 }, (_, i) => stackItem(i + 1))}
        </ha-stack>
      </div>
    </div>
  `,
};

export const FormLayout: Story = {
  render: () => html`
    <ha-stack direction="vertical" gap="4" style="max-width: 400px;">
      <div
        style="
        background: white;
        padding: 1.5rem;
        border: 1px solid var(--color-neutral-200, #e5e7eb);
        border-radius: 0.5rem;
      "
      >
        <h3 style="margin: 0 0 0.5rem 0;">Name</h3>
        <input
          type="text"
          placeholder="Enter your name"
          style="
            width: 100%;
            padding: 0.5rem;
            border: 1px solid var(--color-neutral-300, #d1d5db);
            border-radius: 0.25rem;
          "
        />
      </div>
      <div
        style="
        background: white;
        padding: 1.5rem;
        border: 1px solid var(--color-neutral-200, #e5e7eb);
        border-radius: 0.5rem;
      "
      >
        <h3 style="margin: 0 0 0.5rem 0;">Email</h3>
        <input
          type="email"
          placeholder="Enter your email"
          style="
            width: 100%;
            padding: 0.5rem;
            border: 1px solid var(--color-neutral-300, #d1d5db);
            border-radius: 0.25rem;
          "
        />
      </div>
      <div
        style="
        background: white;
        padding: 1.5rem;
        border: 1px solid var(--color-neutral-200, #e5e7eb);
        border-radius: 0.5rem;
      "
      >
        <h3 style="margin: 0 0 0.5rem 0;">Message</h3>
        <textarea
          placeholder="Enter your message"
          rows="4"
          style="
            width: 100%;
            padding: 0.5rem;
            border: 1px solid var(--color-neutral-300, #d1d5db);
            border-radius: 0.25rem;
          "
        ></textarea>
      </div>
      <ha-stack direction="horizontal" gap="3" justify="end">
        <ha-button variant="outline">Cancel</ha-button>
        <ha-button variant="primary">Submit</ha-button>
      </ha-stack>
    </ha-stack>
  `,
};

export const ButtonGroup: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Horizontal Button Group</h3>
        <ha-stack direction="horizontal" gap="3">
          <ha-button variant="primary">Save</ha-button>
          <ha-button variant="secondary">Cancel</ha-button>
          <ha-button variant="outline">Reset</ha-button>
        </ha-stack>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Vertical Button Group</h3>
        <ha-stack direction="vertical" gap="2" style="max-width: 200px;">
          <ha-button variant="primary" full-width>Dashboard</ha-button>
          <ha-button variant="secondary" full-width>Settings</ha-button>
          <ha-button variant="outline" full-width>Profile</ha-button>
          <ha-button variant="ghost" full-width>Logout</ha-button>
        </ha-stack>
      </div>
    </div>
  `,
};

export const CardStack: Story = {
  render: () => html`
    <ha-stack direction="vertical" gap="6" style="max-width: 600px;">
      ${Array.from(
        { length: 4 },
        (_, i) => html`
          <div
            style="
          background: white;
          border: 1px solid var(--color-neutral-200, #e5e7eb);
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        "
          >
            <div
              style="
            background: linear-gradient(135deg, var(--color-primary-500, #6366f1) 0%, var(--color-primary-600, #4f46e5) 100%);
            height: 120px;
          "
            ></div>
            <div style="padding: 1.5rem;">
              <ha-stack direction="vertical" gap="2">
                <h3
                  style="margin: 0; color: var(--color-neutral-900, #111827);"
                >
                  Card Title ${i + 1}
                </h3>
                <p
                  style="margin: 0; color: var(--color-neutral-600, #4b5563); font-size: 0.875rem;"
                >
                  This card demonstrates vertical stacking of content with
                  consistent spacing between elements.
                </p>
                <ha-stack
                  direction="horizontal"
                  gap="2"
                  style="margin-top: 0.5rem;"
                >
                  <ha-button size="sm" variant="primary">Action</ha-button>
                  <ha-button size="sm" variant="outline">Details</ha-button>
                </ha-stack>
              </ha-stack>
            </div>
          </div>
        `,
      )}
    </ha-stack>
  `,
};

export const NestedStacks: Story = {
  render: () => html`
    <ha-stack direction="vertical" gap="6" style="max-width: 800px;">
      <div
        style="
        background: white;
        border: 1px solid var(--color-neutral-200, #e5e7eb);
        border-radius: 0.5rem;
        padding: 1.5rem;
      "
      >
        <ha-stack direction="vertical" gap="4">
          <h2 style="margin: 0; color: var(--color-neutral-900, #111827);">
            Nested Stacks Example
          </h2>
          <ha-stack direction="horizontal" gap="4">
            <div
              style="flex: 1; background: var(--color-primary-100, #e0e7ff); padding: 1rem; border-radius: 0.5rem;"
            >
              <ha-stack direction="vertical" gap="2">
                <h4
                  style="margin: 0; color: var(--color-primary-900, #312e81);"
                >
                  Column 1
                </h4>
                <p
                  style="margin: 0; font-size: 0.875rem; color: var(--color-primary-700, #4338ca);"
                >
                  Nested vertical stack
                </p>
              </ha-stack>
            </div>
            <div
              style="flex: 1; background: var(--color-success-100, #d1fae5); padding: 1rem; border-radius: 0.5rem;"
            >
              <ha-stack direction="vertical" gap="2">
                <h4
                  style="margin: 0; color: var(--color-success-900, #064e3b);"
                >
                  Column 2
                </h4>
                <p
                  style="margin: 0; font-size: 0.875rem; color: var(--color-success-700, #047857);"
                >
                  Nested vertical stack
                </p>
              </ha-stack>
            </div>
            <div
              style="flex: 1; background: var(--color-warning-100, #fef3c7); padding: 1rem; border-radius: 0.5rem;"
            >
              <ha-stack direction="vertical" gap="2">
                <h4
                  style="margin: 0; color: var(--color-warning-900, #78350f);"
                >
                  Column 3
                </h4>
                <p
                  style="margin: 0; font-size: 0.875rem; color: var(--color-warning-700, #b45309);"
                >
                  Nested vertical stack
                </p>
              </ha-stack>
            </div>
          </ha-stack>
        </ha-stack>
      </div>
    </ha-stack>
  `,
};
