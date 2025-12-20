import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface AccordionArgs {
  allowMultiple: boolean;
  collapsible: boolean;
}

const meta: Meta<AccordionArgs> = {
  title: "Other/Accordion",
  tags: ["autodocs"],
  argTypes: {
    allowMultiple: {
      control: { type: "boolean" },
      description: "Allow multiple items to be open simultaneously",
    },
    collapsible: {
      control: { type: "boolean" },
      description: "Allow all items to be collapsed",
    },
  },
  args: {
    allowMultiple: false,
    collapsible: false,
  },
  render: (args) => html`
    <ha-accordion
      id="test-accordion"
      ?allow-multiple="${args.allowMultiple}"
      ?collapsible="${args.collapsible}"
    >
      <ha-accordion-item id="item-1" header="What is a Web Component?" open>
        <p>
          Web Components are a set of web platform APIs that allow you to
          create new custom, reusable, encapsulated HTML tags to use in web
          pages and web apps.
        </p>
      </ha-accordion-item>
      <ha-accordion-item id="item-2" header="How do I use this component?">
        <p>
          Simply include the component in your HTML and use the custom element
          tag. You can customize it using attributes and slots.
        </p>
      </ha-accordion-item>
      <ha-accordion-item id="item-3" header="What browsers are supported?">
        <p>
          All modern browsers support Web Components, including Chrome, Firefox,
          Safari, and Edge.
        </p>
      </ha-accordion-item>
    </ha-accordion>
  `,
};

export default meta;
type Story = StoryObj<AccordionArgs>;

/**
 * Default accordion with single item open
 */
export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    await step("Accordion should be present", async () => {
      const accordion = canvasElement.querySelector("#test-accordion");
      await expect(accordion).toBeTruthy();
    });

    await step("First item should be open initially", async () => {
      const item1 = canvasElement.querySelector("#item-1");
      await expect(item1?.hasAttribute("open")).toBe(true);
    });

    await step("Other items should be closed", async () => {
      const item2 = canvasElement.querySelector("#item-2");
      const item3 = canvasElement.querySelector("#item-3");
      await expect(item2?.hasAttribute("open")).toBe(false);
      await expect(item3?.hasAttribute("open")).toBe(false);
    });

    await step("Clicking second item should open it and close first", async () => {
      const item2 = canvasElement.querySelector("#item-2") as HTMLElement;
      const header2 = item2.shadowRoot?.querySelector("button") as HTMLElement;

      await userEvent.click(header2);
      await new Promise(resolve => setTimeout(resolve, 200));

      await expect(item2?.hasAttribute("open")).toBe(true);

      // First item should now be closed (single mode)
      const item1 = canvasElement.querySelector("#item-1");
      await expect(item1?.hasAttribute("open")).toBe(false);
    });

    await step("Clicking third item should work", async () => {
      const item3 = canvasElement.querySelector("#item-3") as HTMLElement;
      const header3 = item3.shadowRoot?.querySelector("button") as HTMLElement;

      await userEvent.click(header3);
      await new Promise(resolve => setTimeout(resolve, 200));

      await expect(item3?.hasAttribute("open")).toBe(true);
    });
  },
};

/**
 * Accordion allowing multiple items to be open
 */
export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
  },
  play: async ({ canvasElement, step }) => {
    await step("Accordion should have allow-multiple attribute", async () => {
      const accordion = canvasElement.querySelector("#test-accordion");
      await expect(accordion?.hasAttribute("allow-multiple")).toBe(true);
    });

    await step("Multiple items can be open simultaneously", async () => {
      const item2 = canvasElement.querySelector("#item-2") as HTMLElement;
      const header2 = item2.shadowRoot?.querySelector("button") as HTMLElement;

      await userEvent.click(header2);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Both item 1 and item 2 should be open
      const item1 = canvasElement.querySelector("#item-1");
      await expect(item1?.hasAttribute("open")).toBe(true);
      await expect(item2?.hasAttribute("open")).toBe(true);
    });

    await step("Opening third item keeps others open", async () => {
      const item3 = canvasElement.querySelector("#item-3") as HTMLElement;
      const header3 = item3.shadowRoot?.querySelector("button") as HTMLElement;

      await userEvent.click(header3);
      await new Promise(resolve => setTimeout(resolve, 200));

      // All three items should be open
      const item1 = canvasElement.querySelector("#item-1");
      const item2 = canvasElement.querySelector("#item-2");
      await expect(item1?.hasAttribute("open")).toBe(true);
      await expect(item2?.hasAttribute("open")).toBe(true);
      await expect(item3?.hasAttribute("open")).toBe(true);
    });
  },
};

/**
 * Accordion allowing all items to be collapsed
 */
export const Collapsible: Story = {
  args: {
    collapsible: true,
  },
};

/**
 * FAQ accordion example
 */
export const FAQ: Story = {
  render: () => html`
    <ha-accordion>
      <ha-accordion-item header="How do I reset my password?" open>
        <p>
          To reset your password, click on the "Forgot Password" link on the
          login page. Enter your email address and we'll send you a reset link.
        </p>
      </ha-accordion-item>
      <ha-accordion-item header="How do I update my profile?">
        <p>
          Navigate to Settings > Profile and click the "Edit" button. Make your
          changes and click "Save" to update your profile information.
        </p>
      </ha-accordion-item>
      <ha-accordion-item header="What payment methods do you accept?">
        <p>
          We accept all major credit cards (Visa, MasterCard, American Express),
          PayPal, and bank transfers for enterprise accounts.
        </p>
      </ha-accordion-item>
      <ha-accordion-item header="How do I cancel my subscription?">
        <p>
          Go to Settings > Billing and click "Cancel Subscription". Your access
          will continue until the end of your current billing period.
        </p>
      </ha-accordion-item>
      <ha-accordion-item header="Do you offer refunds?">
        <p>
          We offer a 30-day money-back guarantee for all new subscriptions. If
          you're not satisfied, contact our support team for a full refund.
        </p>
      </ha-accordion-item>
    </ha-accordion>
  `,
};

/**
 * Settings accordion example
 */
export const Settings: Story = {
  render: () => html`
    <ha-accordion allow-multiple>
      <ha-accordion-item header="General Settings" open>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <ha-form-group label="Site Name">
            <ha-input value="My Website" full-width></ha-input>
          </ha-form-group>
          <ha-form-group label="Language">
            <ha-select full-width>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </ha-select>
          </ha-form-group>
        </div>
      </ha-accordion-item>
      <ha-accordion-item header="Notification Settings">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <ha-switch label="Email Notifications" checked></ha-switch>
          <ha-switch label="Push Notifications" checked></ha-switch>
          <ha-switch label="SMS Notifications"></ha-switch>
        </div>
      </ha-accordion-item>
      <ha-accordion-item header="Privacy Settings">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <ha-switch label="Profile Visible" checked></ha-switch>
          <ha-switch label="Show Activity Status" checked></ha-switch>
          <ha-switch label="Allow Tagging"></ha-switch>
        </div>
      </ha-accordion-item>
    </ha-accordion>
  `,
};

/**
 * Accordion with custom header slots
 */
export const CustomHeaders: Story = {
  render: () => html`
    <ha-accordion>
      <ha-accordion-item open>
        <div slot="header" style="display: flex; align-items: center; gap: 0.5rem;">
          <ha-badge variant="primary" size="sm">New</ha-badge>
          <span>Latest Features</span>
        </div>
        <p>Check out our latest features and improvements.</p>
      </ha-accordion-item>
      <ha-accordion-item>
        <div slot="header" style="display: flex; align-items: center; gap: 0.5rem;">
          <ha-badge variant="warning" size="sm">Important</ha-badge>
          <span>Security Updates</span>
        </div>
        <p>Important security updates for your account.</p>
      </ha-accordion-item>
      <ha-accordion-item>
        <div slot="header" style="display: flex; align-items: center; gap: 0.5rem;">
          <ha-badge variant="info" size="sm">Info</ha-badge>
          <span>Documentation</span>
        </div>
        <p>Learn how to use our platform effectively.</p>
      </ha-accordion-item>
    </ha-accordion>
  `,
};

/**
 * Accordion with disabled items
 */
export const WithDisabled: Story = {
  render: () => html`
    <ha-accordion>
      <ha-accordion-item header="Available Section" open>
        <p>This section is available and can be opened.</p>
      </ha-accordion-item>
      <ha-accordion-item header="Disabled Section" disabled>
        <p>This section is disabled and cannot be opened.</p>
      </ha-accordion-item>
      <ha-accordion-item header="Another Available Section">
        <p>This section is also available.</p>
      </ha-accordion-item>
    </ha-accordion>
  `,
};

/**
 * Nested accordion example
 */
export const Nested: Story = {
  render: () => html`
    <ha-accordion>
      <ha-accordion-item header="Category 1" open>
        <ha-accordion allow-multiple>
          <ha-accordion-item header="Subcategory 1.1" open>
            <p>Content for subcategory 1.1</p>
          </ha-accordion-item>
          <ha-accordion-item header="Subcategory 1.2">
            <p>Content for subcategory 1.2</p>
          </ha-accordion-item>
        </ha-accordion>
      </ha-accordion-item>
      <ha-accordion-item header="Category 2">
        <ha-accordion allow-multiple>
          <ha-accordion-item header="Subcategory 2.1">
            <p>Content for subcategory 2.1</p>
          </ha-accordion-item>
          <ha-accordion-item header="Subcategory 2.2">
            <p>Content for subcategory 2.2</p>
          </ha-accordion-item>
        </ha-accordion>
      </ha-accordion-item>
    </ha-accordion>
  `,
};
