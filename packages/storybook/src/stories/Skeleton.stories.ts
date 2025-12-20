import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

const meta: Meta = {
  title: "Feedback/Skeleton",
  component: "ha-skeleton",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "circular", "rectangular"],
      description: "Visual variant of the skeleton",
    },
    animation: {
      control: { type: "select" },
      options: ["pulse", "wave", "none"],
      description: "Animation type",
    },
    width: {
      control: "text",
      description: "Width of the skeleton (CSS value)",
    },
    height: {
      control: "text",
      description: "Height of the skeleton (CSS value)",
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <ha-skeleton id="test-skeleton"></ha-skeleton>
  `,
  play: async ({ canvasElement, step }) => {
    await step("Skeleton should be present", async () => {
      const skeleton = canvasElement.querySelector("#test-skeleton");
      await expect(skeleton).toBeTruthy();
    });
  },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4>Text (Default)</h4>
        <ha-skeleton variant="text"></ha-skeleton>
        <ha-skeleton variant="text"></ha-skeleton>
        <ha-skeleton variant="text" width="60%"></ha-skeleton>
      </div>

      <div>
        <h4>Circular</h4>
        <ha-skeleton variant="circular" width="40px" height="40px"></ha-skeleton>
      </div>

      <div>
        <h4>Rectangular</h4>
        <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
      </div>
    </div>
  `,
};

export const Animations: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4>Pulse (Default)</h4>
        <ha-skeleton animation="pulse" width="100%" height="40px"></ha-skeleton>
      </div>

      <div>
        <h4>Wave</h4>
        <ha-skeleton animation="wave" width="100%" height="40px"></ha-skeleton>
      </div>

      <div>
        <h4>None</h4>
        <ha-skeleton animation="none" width="100%" height="40px"></ha-skeleton>
      </div>
    </div>
  `,
};

export const UserProfile: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
      <ha-skeleton variant="circular" width="64px" height="64px"></ha-skeleton>
      <div style="flex: 1;">
        <ha-skeleton variant="text" width="40%" height="24px" style="margin-bottom: 0.5rem;"></ha-skeleton>
        <ha-skeleton variant="text" width="60%" height="16px" style="margin-bottom: 0.5rem;"></ha-skeleton>
        <ha-skeleton variant="text" width="80%" height="14px"></ha-skeleton>
      </div>
    </div>
  `,
};

export const ArticleCard: Story = {
  render: () => html`
    <div style="max-width: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
      <div style="padding: 1rem;">
        <ha-skeleton variant="text" width="60%" height="24px" style="margin-bottom: 0.5rem;"></ha-skeleton>
        <ha-skeleton variant="text" width="100%" height="16px" style="margin-bottom: 0.5rem;"></ha-skeleton>
        <ha-skeleton variant="text" width="100%" height="16px" style="margin-bottom: 0.5rem;"></ha-skeleton>
        <ha-skeleton variant="text" width="40%" height="16px"></ha-skeleton>
      </div>
    </div>
  `,
};

export const TableLoading: Story = {
  render: () => html`
    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;">
      ${[1, 2, 3, 4, 5].map(
        () => html`
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem; align-items: center;">
            <ha-skeleton variant="circular" width="32px" height="32px"></ha-skeleton>
            <ha-skeleton variant="text" width="20%" height="16px"></ha-skeleton>
            <ha-skeleton variant="text" width="30%" height="16px"></ha-skeleton>
            <ha-skeleton variant="text" width="15%" height="16px"></ha-skeleton>
            <ha-skeleton variant="rectangular" width="80px" height="32px"></ha-skeleton>
          </div>
        `
      )}
    </div>
  `,
};

export const ListLoading: Story = {
  render: () => html`
    <div style="max-width: 400px;">
      ${[1, 2, 3, 4].map(
        () => html`
          <div style="display: flex; gap: 1rem; padding: 1rem; border-bottom: 1px solid #e5e7eb; align-items: center;">
            <ha-skeleton variant="circular" width="48px" height="48px"></ha-skeleton>
            <div style="flex: 1;">
              <ha-skeleton variant="text" width="70%" height="16px" style="margin-bottom: 0.5rem;"></ha-skeleton>
              <ha-skeleton variant="text" width="40%" height="14px"></ha-skeleton>
            </div>
            <ha-skeleton variant="rectangular" width="24px" height="24px"></ha-skeleton>
          </div>
        `
      )}
    </div>
  `,
};

export const Dashboard: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      ${[1, 2, 3].map(
        () => html`
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;">
            <ha-skeleton variant="text" width="50%" height="20px" style="margin-bottom: 0.5rem;"></ha-skeleton>
            <ha-skeleton variant="text" width="80%" height="32px" style="margin-bottom: 1rem;"></ha-skeleton>
            <ha-skeleton variant="rectangular" width="100%" height="100px"></ha-skeleton>
          </div>
        `
      )}
    </div>
  `,
};

export const CustomDimensions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ha-skeleton width="200px" height="20px"></ha-skeleton>
      <ha-skeleton width="50%" height="30px"></ha-skeleton>
      <ha-skeleton width="100%" height="100px"></ha-skeleton>
      <ha-skeleton variant="circular" width="80px" height="80px"></ha-skeleton>
    </div>
  `,
};

export const WithRealContent: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <!-- Loading State -->
      <div>
        <h3 style="margin-top: 0;">Loading</h3>
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;">
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <ha-skeleton variant="circular" width="48px" height="48px"></ha-skeleton>
            <div style="flex: 1;">
              <ha-skeleton variant="text" width="60%" height="20px" style="margin-bottom: 0.5rem;"></ha-skeleton>
              <ha-skeleton variant="text" width="40%" height="16px"></ha-skeleton>
            </div>
          </div>
          <ha-skeleton variant="rectangular" width="100%" height="150px" style="margin-bottom: 1rem;"></ha-skeleton>
          <ha-skeleton variant="text" width="100%" height="16px" style="margin-bottom: 0.5rem;"></ha-skeleton>
          <ha-skeleton variant="text" width="100%" height="16px" style="margin-bottom: 0.5rem;"></ha-skeleton>
          <ha-skeleton variant="text" width="70%" height="16px"></ha-skeleton>
        </div>
      </div>

      <!-- Loaded State -->
      <div>
        <h3 style="margin-top: 0;">Loaded</h3>
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem;">
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <img src="https://via.placeholder.com/48" style="border-radius: 50%; width: 48px; height: 48px;" />
            <div style="flex: 1;">
              <div style="font-weight: 600; margin-bottom: 0.25rem;">John Doe</div>
              <div style="color: #6b7280; font-size: 14px;">@johndoe</div>
            </div>
          </div>
          <img src="https://via.placeholder.com/400x150" style="width: 100%; border-radius: 4px; margin-bottom: 1rem;" />
          <p style="line-height: 1.5; color: #374151; margin: 0;">
            This is an example of how the skeleton loader represents content while data is loading.
            Once loaded, the actual content replaces the skeleton seamlessly.
          </p>
        </div>
      </div>
    </div>
  `,
};
