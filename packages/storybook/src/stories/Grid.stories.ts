import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '@hidearea-design/core';

interface GridArgs {
  columns: string;
  gap: string;
  rowGap: string;
  columnGap: string;
  alignItems: 'start' | 'center' | 'end' | 'stretch' | null;
  justifyItems: 'start' | 'center' | 'end' | 'stretch' | null;
}

const meta: Meta<GridArgs> = {
  title: 'Layout/Grid',
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: { type: 'text' },
      description: 'Number of columns: 1-12 or auto-fit, auto-fill',
    },
    gap: {
      control: { type: 'select' },
      options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      description: 'Gap size (0-12, maps to spacing tokens)',
    },
    rowGap: {
      control: { type: 'select' },
      options: ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      description: 'Row gap size (0-12, maps to spacing tokens)',
    },
    columnGap: {
      control: { type: 'select' },
      options: ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      description: 'Column gap size (0-12, maps to spacing tokens)',
    },
    alignItems: {
      control: { type: 'select' },
      options: [null, 'start', 'center', 'end', 'stretch'],
      description: 'Align items',
    },
    justifyItems: {
      control: { type: 'select' },
      options: [null, 'start', 'center', 'end', 'stretch'],
      description: 'Justify items',
    },
  },
};

export default meta;
type Story = StoryObj<GridArgs>;

const gridItem = (index: number) => html`
  <div style="
    background: var(--color-primary-100, #e0e7ff);
    padding: 1.5rem;
    border-radius: 0.5rem;
    text-align: center;
    color: var(--color-primary-900, #312e81);
  ">
    Item ${index}
  </div>
`;

export const Default: Story = {
  args: {
    columns: '3',
    gap: '4',
    rowGap: '',
    columnGap: '',
    alignItems: null,
    justifyItems: null,
  },
  render: (args) => html`
    <ha-grid
      columns="${args.columns}"
      gap="${args.gap}"
      ${args.rowGap ? `row-gap="${args.rowGap}"` : ''}
      ${args.columnGap ? `column-gap="${args.columnGap}"` : ''}
      ${args.alignItems ? `align-items="${args.alignItems}"` : ''}
      ${args.justifyItems ? `justify-items="${args.justifyItems}"` : ''}
    >
      ${Array.from({ length: 6 }, (_, i) => gridItem(i + 1))}
    </ha-grid>
  `,
};

export const TwoColumns: Story = {
  args: {
    ...Default.args,
    columns: '2',
  },
  render: Default.render,
};

export const FourColumns: Story = {
  args: {
    ...Default.args,
    columns: '4',
  },
  render: Default.render,
};

export const SixColumns: Story = {
  args: {
    ...Default.args,
    columns: '6',
  },
  render: Default.render,
};

export const AutoFit: Story = {
  args: {
    ...Default.args,
    columns: 'auto-fit',
  },
  render: Default.render,
};

export const AutoFill: Story = {
  args: {
    ...Default.args,
    columns: 'auto-fill',
  },
  render: Default.render,
};

export const SmallGap: Story = {
  args: {
    ...Default.args,
    gap: '2',
  },
  render: Default.render,
};

export const LargeGap: Story = {
  args: {
    ...Default.args,
    gap: '8',
  },
  render: Default.render,
};

export const NoGap: Story = {
  args: {
    ...Default.args,
    gap: '0',
  },
  render: Default.render,
};

export const CustomRowColumnGap: Story = {
  args: {
    ...Default.args,
    gap: '4',
    rowGap: '8',
    columnGap: '2',
  },
  render: Default.render,
};

export const AlignItemsCenter: Story = {
  args: {
    ...Default.args,
    alignItems: 'center',
  },
  render: (args) => html`
    <ha-grid
      columns="${args.columns}"
      gap="${args.gap}"
      align-items="${args.alignItems}"
      style="min-height: 300px; background: var(--color-neutral-100, #f3f4f6); border-radius: 0.5rem; padding: 1rem;"
    >
      ${Array.from({ length: 6 }, (_, i) => gridItem(i + 1))}
    </ha-grid>
  `,
};

export const JustifyItemsCenter: Story = {
  args: {
    ...Default.args,
    justifyItems: 'center',
  },
  render: (args) => html`
    <ha-grid
      columns="${args.columns}"
      gap="${args.gap}"
      justify-items="${args.justifyItems}"
    >
      ${Array.from({ length: 6 }, (_, i) => gridItem(i + 1))}
    </ha-grid>
  `,
};

export const ResponsiveLayout: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">3 Columns Grid</h3>
        <ha-grid columns="3" gap="4">
          ${Array.from({ length: 6 }, (_, i) => gridItem(i + 1))}
        </ha-grid>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">4 Columns Grid</h3>
        <ha-grid columns="4" gap="4">
          ${Array.from({ length: 8 }, (_, i) => gridItem(i + 1))}
        </ha-grid>
      </div>
      <div>
        <h3 style="margin-bottom: 1rem;">Auto Fit Grid</h3>
        <ha-grid columns="auto-fit" gap="4">
          ${Array.from({ length: 12 }, (_, i) => gridItem(i + 1))}
        </ha-grid>
      </div>
    </div>
  `,
};

export const CardLayout: Story = {
  render: () => html`
    <ha-grid columns="3" gap="6">
      ${Array.from({ length: 6 }, (_, i) => html`
        <div style="
          background: white;
          border: 1px solid var(--color-neutral-200, #e5e7eb);
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        ">
          <div style="
            background: var(--color-primary-500, #6366f1);
            height: 120px;
          "></div>
          <div style="padding: 1.5rem;">
            <h3 style="margin: 0 0 0.5rem 0; color: var(--color-neutral-900, #111827);">
              Card ${i + 1}
            </h3>
            <p style="margin: 0; color: var(--color-neutral-600, #4b5563); font-size: 0.875rem;">
              This is a card component in a grid layout demonstrating real-world usage.
            </p>
          </div>
        </div>
      `)}
    </ha-grid>
  `,
};

export const DashboardLayout: Story = {
  render: () => html`
    <ha-grid columns="12" gap="4">
      <div style="grid-column: span 12; background: var(--color-primary-100, #e0e7ff); padding: 2rem; border-radius: 0.5rem; text-align: center;">
        <h2 style="margin: 0; color: var(--color-primary-900, #312e81);">Dashboard Header</h2>
      </div>
      <div style="grid-column: span 8; background: var(--color-neutral-100, #f3f4f6); padding: 1.5rem; border-radius: 0.5rem;">
        <h3 style="margin: 0 0 1rem 0;">Main Content (8 columns)</h3>
        <p style="margin: 0; color: var(--color-neutral-600, #4b5563);">
          This area spans 8 columns in a 12-column grid system.
        </p>
      </div>
      <div style="grid-column: span 4; background: var(--color-neutral-100, #f3f4f6); padding: 1.5rem; border-radius: 0.5rem;">
        <h3 style="margin: 0 0 1rem 0;">Sidebar (4 columns)</h3>
        <p style="margin: 0; color: var(--color-neutral-600, #4b5563);">
          This sidebar spans 4 columns.
        </p>
      </div>
      <div style="grid-column: span 4; background: var(--color-success-100, #d1fae5); padding: 1.5rem; border-radius: 0.5rem;">
        <h4 style="margin: 0; color: var(--color-success-900, #064e3b);">Widget 1</h4>
      </div>
      <div style="grid-column: span 4; background: var(--color-warning-100, #fef3c7); padding: 1.5rem; border-radius: 0.5rem;">
        <h4 style="margin: 0; color: var(--color-warning-900, #78350f);">Widget 2</h4>
      </div>
      <div style="grid-column: span 4; background: var(--color-danger-100, #fee2e2); padding: 1.5rem; border-radius: 0.5rem;">
        <h4 style="margin: 0; color: var(--color-danger-900, #7f1d1d);">Widget 3</h4>
      </div>
    </ha-grid>
  `,
};
