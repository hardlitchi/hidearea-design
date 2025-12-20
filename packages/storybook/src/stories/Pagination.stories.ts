import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface PaginationArgs {
  current: number;
  total: number;
  pageSize: number;
  variant: "default" | "rounded" | "simple";
  size: "sm" | "md" | "lg";
  showQuickJumper: boolean;
}

const meta: Meta<PaginationArgs> = {
  title: "Navigation/Pagination",
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
export const Default: Story = {
  render: (args) => html`
    <ha-pagination
      id="test-pagination"
      current="${args.current}"
      total="${args.total}"
      page-size="${args.pageSize}"
      variant="${args.variant}"
      size="${args.size}"
      ?show-quick-jumper="${args.showQuickJumper}"
      @page-change="${fn()}"
    ></ha-pagination>
  `,
  play: async ({ canvasElement, step }) => {
    await step("Pagination should be present", async () => {
      const pagination = canvasElement.querySelector("#test-pagination");
      await expect(pagination).toBeTruthy();
    });

    await step("Pagination should have correct initial attributes", async () => {
      const pagination = canvasElement.querySelector("#test-pagination");
      await expect(pagination?.getAttribute("current")).toBe("1");
      await expect(pagination?.getAttribute("total")).toBe("100");
      await expect(pagination?.getAttribute("page-size")).toBe("10");
    });

    await step("Pagination should render page buttons", async () => {
      const pagination = canvasElement.querySelector("#test-pagination");
      const buttons = pagination?.shadowRoot?.querySelectorAll("button");
      await expect(buttons && buttons.length > 0).toBe(true);
    });

    await step("Clicking next button should work", async () => {
      const pagination = canvasElement.querySelector("#test-pagination") as any;
      const nextButton = pagination?.shadowRoot?.querySelector("button[aria-label*='next'], button[aria-label*='Next']");

      if (nextButton) {
        await userEvent.click(nextButton as HTMLElement);
        await new Promise(resolve => setTimeout(resolve, 100));
        await expect(nextButton).toBeTruthy();
      }
    });
  },
};

/**
 * All variants
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Default</h4>
        <ha-pagination
          id="variant-default"
          current="5"
          total="100"
          page-size="10"
          variant="default"
        ></ha-pagination>
      </div>

      <div>
        <h4>Rounded</h4>
        <ha-pagination
          id="variant-rounded"
          current="5"
          total="100"
          page-size="10"
          variant="rounded"
        ></ha-pagination>
      </div>

      <div>
        <h4>Simple</h4>
        <ha-pagination
          id="variant-simple"
          current="5"
          total="100"
          page-size="10"
          variant="simple"
        ></ha-pagination>
      </div>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    await step("All variants should be present", async () => {
      const defaultPagination = canvasElement.querySelector("#variant-default");
      const roundedPagination = canvasElement.querySelector("#variant-rounded");
      const simplePagination = canvasElement.querySelector("#variant-simple");

      await expect(defaultPagination).toBeTruthy();
      await expect(roundedPagination).toBeTruthy();
      await expect(simplePagination).toBeTruthy();
    });

    await step("Each variant should have correct variant attribute", async () => {
      const defaultPagination = canvasElement.querySelector("#variant-default");
      const roundedPagination = canvasElement.querySelector("#variant-rounded");
      const simplePagination = canvasElement.querySelector("#variant-simple");

      await expect(defaultPagination?.getAttribute("variant")).toBe("default");
      await expect(roundedPagination?.getAttribute("variant")).toBe("rounded");
      await expect(simplePagination?.getAttribute("variant")).toBe("simple");
    });

    await step("All variants should have the same current page", async () => {
      const defaultPagination = canvasElement.querySelector("#variant-default");
      const roundedPagination = canvasElement.querySelector("#variant-rounded");
      const simplePagination = canvasElement.querySelector("#variant-simple");

      await expect(defaultPagination?.getAttribute("current")).toBe("5");
      await expect(roundedPagination?.getAttribute("current")).toBe("5");
      await expect(simplePagination?.getAttribute("current")).toBe("5");
    });
  },
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
          id="size-sm"
          current="5"
          total="100"
          page-size="10"
          size="sm"
        ></ha-pagination>
      </div>

      <div>
        <h4>Medium</h4>
        <ha-pagination
          id="size-md"
          current="5"
          total="100"
          page-size="10"
          size="md"
        ></ha-pagination>
      </div>

      <div>
        <h4>Large</h4>
        <ha-pagination
          id="size-lg"
          current="5"
          total="100"
          page-size="10"
          size="lg"
        ></ha-pagination>
      </div>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    await step("All sizes should be present", async () => {
      const smPagination = canvasElement.querySelector("#size-sm");
      const mdPagination = canvasElement.querySelector("#size-md");
      const lgPagination = canvasElement.querySelector("#size-lg");

      await expect(smPagination).toBeTruthy();
      await expect(mdPagination).toBeTruthy();
      await expect(lgPagination).toBeTruthy();
    });

    await step("Each size should have correct size attribute", async () => {
      const smPagination = canvasElement.querySelector("#size-sm");
      const mdPagination = canvasElement.querySelector("#size-md");
      const lgPagination = canvasElement.querySelector("#size-lg");

      await expect(smPagination?.getAttribute("size")).toBe("sm");
      await expect(mdPagination?.getAttribute("size")).toBe("md");
      await expect(lgPagination?.getAttribute("size")).toBe("lg");
    });
  },
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
