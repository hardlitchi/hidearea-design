import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@hidearea-design/core";
import { expect, fn, userEvent, within } from "@storybook/test";

interface AvatarArgs {
  src: string;
  alt: string;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant: "circle" | "square" | "rounded";
  initials: string;
  status: "online" | "offline" | "away" | "busy" | "";
}

const meta: Meta<AvatarArgs> = {
  title: "Data Display/Avatar",
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: { type: "text" },
      description: "Image source URL",
    },
    alt: {
      control: { type: "text" },
      description: "Alt text for the image",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Avatar size",
    },
    variant: {
      control: { type: "select" },
      options: ["circle", "square", "rounded"],
      description: "Avatar variant",
    },
    initials: {
      control: { type: "text" },
      description: "Initials to display",
    },
    status: {
      control: { type: "select" },
      options: ["", "online", "offline", "away", "busy"],
      description: "Status indicator",
    },
  },
  args: {
    src: "",
    alt: "John Doe",
    size: "md",
    variant: "circle",
    initials: "",
    status: "",
  },
  render: (args) => html`
    <ha-avatar
      src="${args.src || undefined}"
      alt="${args.alt}"
      size="${args.size}"
      variant="${args.variant}"
      initials="${args.initials || undefined}"
      status="${args.status || undefined}"
    ></ha-avatar>
  `,
};

export default meta;
type Story = StoryObj<AvatarArgs>;

/**
 * Default avatar with initials
 */
export const Default: Story = {
  render: (args) => html`
    <ha-avatar
      id="test-avatar"
      src="${args.src || undefined}"
      alt="${args.alt}"
      size="${args.size}"
      variant="${args.variant}"
      initials="${args.initials || undefined}"
      status="${args.status || undefined}"
    ></ha-avatar>
  `,
  play: async ({ canvasElement, step }) => {
    await step("Avatar should be present", async () => {
      const avatar = canvasElement.querySelector("#test-avatar");
      await expect(avatar).toBeTruthy();
    });

    await step("Avatar should have correct size", async () => {
      const avatar = canvasElement.querySelector("#test-avatar");
      await expect(avatar?.getAttribute("size")).toBe("md");
    });

    await step("Avatar should have correct variant", async () => {
      const avatar = canvasElement.querySelector("#test-avatar");
      await expect(avatar?.getAttribute("variant")).toBe("circle");
    });
  },
};

/**
 * With image
 */
export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User Avatar",
  },
};

/**
 * All sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      <ha-avatar size="xs" alt="Extra Small" initials="XS"></ha-avatar>
      <ha-avatar size="sm" alt="Small" initials="SM"></ha-avatar>
      <ha-avatar size="md" alt="Medium" initials="MD"></ha-avatar>
      <ha-avatar size="lg" alt="Large" initials="LG"></ha-avatar>
      <ha-avatar size="xl" alt="Extra Large" initials="XL"></ha-avatar>
      <ha-avatar size="2xl" alt="2X Large" initials="2X"></ha-avatar>
    </div>
  `,
};

/**
 * All variants
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 2rem;">
      <div style="text-align: center;">
        <ha-avatar variant="circle" alt="Circle" initials="CI"></ha-avatar>
        <div style="margin-top: 0.5rem;">Circle</div>
      </div>
      <div style="text-align: center;">
        <ha-avatar variant="square" alt="Square" initials="SQ"></ha-avatar>
        <div style="margin-top: 0.5rem;">Square</div>
      </div>
      <div style="text-align: center;">
        <ha-avatar variant="rounded" alt="Rounded" initials="RD"></ha-avatar>
        <div style="margin-top: 0.5rem;">Rounded</div>
      </div>
    </div>
  `,
};

/**
 * With status indicators
 */
export const WithStatus: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 2rem;">
      <div style="text-align: center;">
        <ha-avatar
          alt="Online User"
          initials="ON"
          status="online"
          size="lg"
        ></ha-avatar>
        <div style="margin-top: 0.5rem;">Online</div>
      </div>
      <div style="text-align: center;">
        <ha-avatar
          alt="Offline User"
          initials="OF"
          status="offline"
          size="lg"
        ></ha-avatar>
        <div style="margin-top: 0.5rem;">Offline</div>
      </div>
      <div style="text-align: center;">
        <ha-avatar
          alt="Away User"
          initials="AW"
          status="away"
          size="lg"
        ></ha-avatar>
        <div style="margin-top: 0.5rem;">Away</div>
      </div>
      <div style="text-align: center;">
        <ha-avatar
          alt="Busy User"
          initials="BS"
          status="busy"
          size="lg"
        ></ha-avatar>
        <div style="margin-top: 0.5rem;">Busy</div>
      </div>
    </div>
  `,
};

/**
 * With custom initials
 */
export const WithInitials: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      <ha-avatar alt="Alice Brown" initials="AB"></ha-avatar>
      <ha-avatar alt="Bob Smith" initials="BS"></ha-avatar>
      <ha-avatar alt="Carol Johnson" initials="CJ"></ha-avatar>
      <ha-avatar alt="David Lee" initials="DL"></ha-avatar>
    </div>
  `,
};

/**
 * Generated initials from alt text
 */
export const GeneratedInitials: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      <ha-avatar alt="John Doe"></ha-avatar>
      <ha-avatar alt="Jane Smith"></ha-avatar>
      <ha-avatar alt="Bob Johnson"></ha-avatar>
      <ha-avatar alt="Alice Williams"></ha-avatar>
    </div>
  `,
};

/**
 * Avatar group with stack layout
 */
export const GroupStack: Story = {
  render: () => html`
    <ha-avatar-group layout="stack" size="md">
      <ha-avatar
        src="https://i.pravatar.cc/150?img=1"
        alt="User 1"
      ></ha-avatar>
      <ha-avatar
        src="https://i.pravatar.cc/150?img=2"
        alt="User 2"
      ></ha-avatar>
      <ha-avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="User 3"
      ></ha-avatar>
      <ha-avatar
        src="https://i.pravatar.cc/150?img=4"
        alt="User 4"
      ></ha-avatar>
    </ha-avatar-group>
  `,
};

/**
 * Avatar group with grid layout
 */
export const GroupGrid: Story = {
  render: () => html`
    <ha-avatar-group layout="grid" size="md">
      <ha-avatar alt="User 1" initials="U1"></ha-avatar>
      <ha-avatar alt="User 2" initials="U2"></ha-avatar>
      <ha-avatar alt="User 3" initials="U3"></ha-avatar>
      <ha-avatar alt="User 4" initials="U4"></ha-avatar>
      <ha-avatar alt="User 5" initials="U5"></ha-avatar>
      <ha-avatar alt="User 6" initials="U6"></ha-avatar>
    </ha-avatar-group>
  `,
};

/**
 * Avatar group with list layout
 */
export const GroupList: Story = {
  render: () => html`
    <ha-avatar-group layout="list" size="md">
      <ha-avatar alt="User 1" initials="U1"></ha-avatar>
      <ha-avatar alt="User 2" initials="U2"></ha-avatar>
      <ha-avatar alt="User 3" initials="U3"></ha-avatar>
      <ha-avatar alt="User 4" initials="U4"></ha-avatar>
    </ha-avatar-group>
  `,
};

/**
 * Avatar group with max count
 */
export const GroupWithMax: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Max 3 avatars (stack)</h4>
        <ha-avatar-group layout="stack" max="3" size="md">
          <ha-avatar alt="User 1" initials="U1"></ha-avatar>
          <ha-avatar alt="User 2" initials="U2"></ha-avatar>
          <ha-avatar alt="User 3" initials="U3"></ha-avatar>
          <ha-avatar alt="User 4" initials="U4"></ha-avatar>
          <ha-avatar alt="User 5" initials="U5"></ha-avatar>
        </ha-avatar-group>
      </div>

      <div>
        <h4>Max 5 avatars (grid)</h4>
        <ha-avatar-group layout="grid" max="5" size="sm">
          <ha-avatar alt="User 1" initials="U1"></ha-avatar>
          <ha-avatar alt="User 2" initials="U2"></ha-avatar>
          <ha-avatar alt="User 3" initials="U3"></ha-avatar>
          <ha-avatar alt="User 4" initials="U4"></ha-avatar>
          <ha-avatar alt="User 5" initials="U5"></ha-avatar>
          <ha-avatar alt="User 6" initials="U6"></ha-avatar>
          <ha-avatar alt="User 7" initials="U7"></ha-avatar>
          <ha-avatar alt="User 8" initials="U8"></ha-avatar>
        </ha-avatar-group>
      </div>
    </div>
  `,
};

/**
 * Avatar group sizes
 */
export const GroupSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Small</h4>
        <ha-avatar-group layout="stack" size="sm">
          <ha-avatar alt="User 1" initials="U1"></ha-avatar>
          <ha-avatar alt="User 2" initials="U2"></ha-avatar>
          <ha-avatar alt="User 3" initials="U3"></ha-avatar>
        </ha-avatar-group>
      </div>

      <div>
        <h4>Medium</h4>
        <ha-avatar-group layout="stack" size="md">
          <ha-avatar alt="User 1" initials="U1"></ha-avatar>
          <ha-avatar alt="User 2" initials="U2"></ha-avatar>
          <ha-avatar alt="User 3" initials="U3"></ha-avatar>
        </ha-avatar-group>
      </div>

      <div>
        <h4>Large</h4>
        <ha-avatar-group layout="stack" size="lg">
          <ha-avatar alt="User 1" initials="U1"></ha-avatar>
          <ha-avatar alt="User 2" initials="U2"></ha-avatar>
          <ha-avatar alt="User 3" initials="U3"></ha-avatar>
        </ha-avatar-group>
      </div>
    </div>
  `,
};

/**
 * With icon fallback
 */
export const WithIcon: Story = {
  render: () => html`
    <ha-avatar size="lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        />
      </svg>
    </ha-avatar>
  `,
};

/**
 * Real-world example: User list
 */
export const UserList: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${[
        { name: "Alice Johnson", status: "online", img: 1 },
        { name: "Bob Smith", status: "away", img: 2 },
        { name: "Carol Williams", status: "busy", img: 3 },
        { name: "David Brown", status: "offline", img: 4 },
      ].map(
        (user) => html`
          <div style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
            <ha-avatar
              src="https://i.pravatar.cc/150?img=${user.img}"
              alt="${user.name}"
              status="${user.status}"
              size="lg"
            ></ha-avatar>
            <div>
              <div style="font-weight: 600;">${user.name}</div>
              <div style="font-size: 0.875rem; color: #6b7280; text-transform: capitalize;">
                ${user.status}
              </div>
            </div>
          </div>
        `
      )}
    </div>
  `,
};
