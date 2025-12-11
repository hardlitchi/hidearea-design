export const storyTemplate = (PascalName: string, kebabName: string) => `import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface ${PascalName}Args {
  variant: string;
  disabled: boolean;
  content: string;
}

const meta: Meta<${PascalName}Args> = {
  title: "Components/${PascalName}",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary"],
      description: "Component variant",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state",
    },
    content: {
      control: { type: "text" },
      description: "Content",
    },
  },
};

export default meta;
type Story = StoryObj<${PascalName}Args>;

export const Default: Story = {
  args: {
    variant: "default",
    disabled: false,
    content: "Default ${PascalName}",
  },
  render: (args) => html\`
    <ha-${kebabName}
      variant=\${args.variant}
      ?\${args.disabled ? "disabled" : ""}
    >
      \${args.content}
    </ha-${kebabName}>
  \`,
};

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: "primary",
    content: "Primary ${PascalName}",
  },
  render: Default.render,
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: "secondary",
    content: "Secondary ${PascalName}",
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    content: "Disabled ${PascalName}",
  },
  render: Default.render,
};
`;
