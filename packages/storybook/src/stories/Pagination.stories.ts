import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";

interface PaginationArgs {
  current: number;
  total: number;
  pageSize: number;
  variant: "default" | "rounded" | "simple";
  size: "sm" | "md" | "lg";
  showQuickJumper: boolean;
}

const meta: Meta<PaginationArgs> = {
  title: "Components/Pagination",
  tags: ["autodocs"],
  argTypes: {
    current: {
      control: { type: "number" },
      description: "Current page number (1-indexed)",
    },
    total: {
      control: { type: "number" },
      description: "Total number of items",
    },
    pageSize: {
      control: { type: "number" },
      description: "Number of items per page",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "rounded", "simple"],
      description: "Pagination variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Pagination size",
    },
    showQuickJumper: {
      control: { type: "boolean" },
      description: "Show quick jumper input",
    },
  },
  args: {
    current: 1,
    total: 100,
    pageSize: 10,
    variant: "default",
    size: "md",
    showQuickJumper: false,
  },
  render: (args) => html`
    <ha-pagination
      current="${args.current}"
      total="${args.total}"
      page-size="${args.pageSize}"
      variant="${args.variant}"
      size="${args.size}"
      ?show-quick-jumper="${args.showQuickJumper}"
      @page-change="${(e: CustomEvent) => {
        console.log("Page changed to:", e.detail.page);
      }}"
    ></ha-pagination>
  `,
};

export default meta;
type Story = StoryObj<PaginationArgs>;

/**
 * Default pagination
 */
export const Default: Story = {};

/**
 * All variants
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Default</h4>
        <ha-pagination
          current="5"
          total="100"
          page-size="10"
          variant="default"
        ></ha-pagination>
      </div>

      <div>
        <h4>Rounded</h4>
        <ha-pagination
          current="5"
          total="100"
          page-size="10"
          variant="rounded"
        ></ha-pagination>
      </div>

      <div>
        <h4>Simple</h4>
        <ha-pagination
          current="5"
          total="100"
          page-size="10"
          variant="simple"
        ></ha-pagination>
      </div>
    </div>
  `,
};

/**
 * All sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Small</h4>
        <ha-pagination
          current="5"
          total="100"
          page-size="10"
          size="sm"
        ></ha-pagination>
      </div>

      <div>
        <h4>Medium</h4>
        <ha-pagination
          current="5"
          total="100"
          page-size="10"
          size="md"
        ></ha-pagination>
      </div>

      <div>
        <h4>Large</h4>
        <ha-pagination
          current="5"
          total="100"
          page-size="10"
          size="lg"
        ></ha-pagination>
      </div>
    </div>
  `,
};

/**
 * With quick jumper
 */
export const WithQuickJumper: Story = {
  args: {
    showQuickJumper: true,
  },
};

/**
 * Large page count
 */
export const LargePageCount: Story = {
  args: {
    current: 50,
    total: 1000,
    pageSize: 10,
  },
};

/**
 * Small page count
 */
export const SmallPageCount: Story = {
  args: {
    current: 2,
    total: 30,
    pageSize: 10,
  },
};

/**
 * First page
 */
export const FirstPage: Story = {
  args: {
    current: 1,
    total: 100,
    pageSize: 10,
  },
};

/**
 * Last page
 */
export const LastPage: Story = {
  args: {
    current: 10,
    total: 100,
    pageSize: 10,
  },
};

/**
 * Custom page size
 */
export const CustomPageSize: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>5 items per page</h4>
        <ha-pagination
          current="1"
          total="100"
          page-size="5"
        ></ha-pagination>
      </div>

      <div>
        <h4>20 items per page</h4>
        <ha-pagination
          current="1"
          total="100"
          page-size="20"
        ></ha-pagination>
      </div>

      <div>
        <h4>50 items per page</h4>
        <ha-pagination
          current="1"
          total="100"
          page-size="50"
        ></ha-pagination>
      </div>
    </div>
  `,
};

/**
 * Interactive example
 */
export const Interactive: Story = {
  render: () => {
    let currentPage = 1;
    const updatePagination = () => {
      const pagination = document.querySelector("#interactive-pagination") as any;
      if (pagination) {
        pagination.setAttribute("current", currentPage.toString());
      }
      const display = document.querySelector("#current-page-display");
      if (display) {
        display.textContent = `Current Page: ${currentPage}`;
      }
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div id="current-page-display" style="font-weight: bold;">
          Current Page: 1
        </div>
        <ha-pagination
          id="interactive-pagination"
          current="1"
          total="100"
          page-size="10"
          variant="default"
          @page-change="${(e: CustomEvent) => {
            currentPage = e.detail.page;
            updatePagination();
          }}"
        ></ha-pagination>
      </div>
    `;
  },
};
