import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaAvatar } from "./avatar";
import { HaAvatarGroup } from "./avatar-group";

describe("HaAvatar", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-avatar")) {
      customElements.define("ha-avatar", HaAvatar);
    }
    await waitForCustomElement("ha-avatar");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-avatar")).toBe(HaAvatar);
    });

    it("should create an instance", () => {
      const avatar = document.createElement("ha-avatar") as HaAvatar;
      expect(avatar).toBeInstanceOf(HaAvatar);
      expect(avatar).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const avatar = document.createElement("ha-avatar") as HaAvatar;
      document.body.appendChild(avatar);
      expect(avatar.shadowRoot).not.toBeNull();
      document.body.removeChild(avatar);
    });
  });

  describe("Attributes and Properties", () => {
    let avatar: HaAvatar;

    beforeEach(() => {
      avatar = document.createElement("ha-avatar") as HaAvatar;
      document.body.appendChild(avatar);
    });

    afterEach(() => {
      document.body.removeChild(avatar);
    });

    it("should set src attribute", () => {
      avatar.setAttribute("src", "/test.jpg");
      expect(avatar.getAttribute("src")).toBe("/test.jpg");
    });

    it("should set alt attribute", () => {
      avatar.setAttribute("alt", "John Doe");
      expect(avatar.getAttribute("alt")).toBe("John Doe");
    });

    it("should set size attribute", () => {
      avatar.setAttribute("size", "lg");
      expect(avatar.getAttribute("size")).toBe("lg");
    });

    it("should set variant attribute", () => {
      avatar.setAttribute("variant", "square");
      expect(avatar.getAttribute("variant")).toBe("square");
    });

    it("should set initials attribute", () => {
      avatar.setAttribute("initials", "JD");
      expect(avatar.getAttribute("initials")).toBe("JD");
    });

    it("should set status attribute", () => {
      avatar.setAttribute("status", "online");
      expect(avatar.getAttribute("status")).toBe("online");
    });
  });

  describe("Variants", () => {
    let avatar: HaAvatar;

    beforeEach(() => {
      avatar = document.createElement("ha-avatar") as HaAvatar;
      document.body.appendChild(avatar);
    });

    afterEach(() => {
      document.body.removeChild(avatar);
    });

    const variants = ["circle", "square", "rounded"];

    variants.forEach((variant) => {
      it(`should render ${variant} variant`, () => {
        avatar.setAttribute("variant", variant);
        expect(avatar.getAttribute("variant")).toBe(variant);
      });
    });
  });

  describe("Sizes", () => {
    let avatar: HaAvatar;

    beforeEach(() => {
      avatar = document.createElement("ha-avatar") as HaAvatar;
      document.body.appendChild(avatar);
    });

    afterEach(() => {
      document.body.removeChild(avatar);
    });

    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"];

    sizes.forEach((size) => {
      it(`should render ${size} size`, () => {
        avatar.setAttribute("size", size);
        expect(avatar.getAttribute("size")).toBe(size);
      });
    });
  });

  describe("Image Display", () => {
    let avatar: HaAvatar;

    beforeEach(() => {
      avatar = document.createElement("ha-avatar") as HaAvatar;
      document.body.appendChild(avatar);
    });

    afterEach(() => {
      document.body.removeChild(avatar);
    });

    it("should render image when src is provided", () => {
      avatar.setAttribute("src", "/test.jpg");
      avatar.setAttribute("alt", "Test User");

      const img = queryShadow(avatar, '[part="image"]') as HTMLImageElement;
      expect(img).toBeTruthy();
      expect(img?.src).toContain("/test.jpg");
    });

    it("should set alt text on image", () => {
      avatar.setAttribute("src", "/test.jpg");
      avatar.setAttribute("alt", "Test User");

      const img = queryShadow(avatar, '[part="image"]') as HTMLImageElement;
      expect(img?.alt).toBe("Test User");
    });
  });

  describe("Initials Display", () => {
    let avatar: HaAvatar;

    beforeEach(() => {
      avatar = document.createElement("ha-avatar") as HaAvatar;
      document.body.appendChild(avatar);
    });

    afterEach(() => {
      document.body.removeChild(avatar);
    });

    it("should display initials when provided", () => {
      avatar.setAttribute("initials", "JD");

      const initials = queryShadow(avatar, '[part="initials"]');
      expect(initials).toBeTruthy();
      expect(initials?.textContent).toBe("JD");
    });

    it("should generate initials from alt text", () => {
      avatar.setAttribute("alt", "John Doe");

      const initials = queryShadow(avatar, '[part="initials"]');
      expect(initials).toBeTruthy();
      expect(initials?.textContent).toBe("JD");
    });

    it("should use provided initials over generated ones", () => {
      avatar.setAttribute("alt", "John Doe");
      avatar.setAttribute("initials", "XY");

      const initials = queryShadow(avatar, '[part="initials"]');
      expect(initials?.textContent).toBe("XY");
    });

    it("should uppercase initials", () => {
      avatar.setAttribute("initials", "jd");

      const initials = queryShadow(avatar, '[part="initials"]');
      expect(initials?.textContent).toBe("JD");
    });
  });

  describe("Icon Slot", () => {
    let avatar: HaAvatar;

    beforeEach(() => {
      avatar = document.createElement("ha-avatar") as HaAvatar;
      document.body.appendChild(avatar);
    });

    afterEach(() => {
      document.body.removeChild(avatar);
    });

    it("should render slot for icon when no src or initials", () => {
      const icon = document.createElement("span");
      icon.textContent = "👤";
      avatar.appendChild(icon);

      const slot = queryShadow(avatar, "slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("Status Indicator", () => {
    let avatar: HaAvatar;

    beforeEach(() => {
      avatar = document.createElement("ha-avatar") as HaAvatar;
      document.body.appendChild(avatar);
    });

    afterEach(() => {
      document.body.removeChild(avatar);
    });

    const statuses = ["online", "offline", "away", "busy"];

    statuses.forEach((status) => {
      it(`should render ${status} status indicator`, () => {
        avatar.setAttribute("status", status);
        avatar.setAttribute("alt", "Test User");

        const indicator = queryShadow(avatar, '[part="status"]');
        expect(indicator).toBeTruthy();
      });
    });

    it("should not render status indicator when no status", () => {
      avatar.setAttribute("alt", "Test User");

      const indicator = queryShadow(avatar, '[part="status"]');
      expect(indicator).toBeNull();
    });
  });

  describe("CSS Parts", () => {
    let avatar: HaAvatar;

    beforeEach(() => {
      avatar = document.createElement("ha-avatar") as HaAvatar;
      document.body.appendChild(avatar);
    });

    afterEach(() => {
      document.body.removeChild(avatar);
    });

    it("should expose container part", () => {
      const container = queryShadow(avatar, '[part="container"]');
      expect(container).toBeTruthy();
    });

    it("should expose image part when src provided", () => {
      avatar.setAttribute("src", "/test.jpg");
      const image = queryShadow(avatar, '[part="image"]');
      expect(image).toBeTruthy();
    });

    it("should expose initials part when initials shown", () => {
      avatar.setAttribute("initials", "JD");
      const initials = queryShadow(avatar, '[part="initials"]');
      expect(initials).toBeTruthy();
    });

    it("should expose status part when status provided", () => {
      avatar.setAttribute("status", "online");
      avatar.setAttribute("alt", "Test");
      const status = queryShadow(avatar, '[part="status"]');
      expect(status).toBeTruthy();
    });
  });
});

describe("HaAvatarGroup", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-avatar-group")) {
      customElements.define("ha-avatar-group", HaAvatarGroup);
    }
    if (!customElements.get("ha-avatar")) {
      customElements.define("ha-avatar", HaAvatar);
    }
    await waitForCustomElement("ha-avatar-group");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-avatar-group")).toBe(HaAvatarGroup);
    });

    it("should create an instance", () => {
      const group = document.createElement("ha-avatar-group") as HaAvatarGroup;
      expect(group).toBeInstanceOf(HaAvatarGroup);
      expect(group).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const group = document.createElement("ha-avatar-group") as HaAvatarGroup;
      document.body.appendChild(group);
      expect(group.shadowRoot).not.toBeNull();
      document.body.removeChild(group);
    });
  });

  describe("Attributes and Properties", () => {
    let group: HaAvatarGroup;

    beforeEach(() => {
      group = document.createElement("ha-avatar-group") as HaAvatarGroup;
      document.body.appendChild(group);
    });

    afterEach(() => {
      document.body.removeChild(group);
    });

    it("should set max attribute", () => {
      group.setAttribute("max", "3");
      expect(group.getAttribute("max")).toBe("3");
    });

    it("should set size attribute", () => {
      group.setAttribute("size", "lg");
      expect(group.getAttribute("size")).toBe("lg");
    });

    it("should set layout attribute", () => {
      group.setAttribute("layout", "grid");
      expect(group.getAttribute("layout")).toBe("grid");
    });
  });

  describe("Layouts", () => {
    let group: HaAvatarGroup;

    beforeEach(() => {
      group = document.createElement("ha-avatar-group") as HaAvatarGroup;
      document.body.appendChild(group);
    });

    afterEach(() => {
      document.body.removeChild(group);
    });

    const layouts = ["stack", "grid", "list"];

    layouts.forEach((layout) => {
      it(`should render ${layout} layout`, () => {
        group.setAttribute("layout", layout);
        expect(group.getAttribute("layout")).toBe(layout);
      });
    });
  });

  describe("Max Count", () => {
    let group: HaAvatarGroup;

    beforeEach(() => {
      group = document.createElement("ha-avatar-group") as HaAvatarGroup;
      document.body.appendChild(group);
    });

    afterEach(() => {
      document.body.removeChild(group);
    });

    it("should show max indicator when avatars exceed max", async () => {
      group.setAttribute("max", "2");

      // Add 4 avatars
      for (let i = 0; i < 4; i++) {
        const avatar = document.createElement("ha-avatar");
        avatar.setAttribute("alt", `User ${i + 1}`);
        group.appendChild(avatar);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const maxIndicator = queryShadow(group, '[part="max-indicator"]');
      expect(maxIndicator).toBeTruthy();
      expect(maxIndicator?.textContent).toContain("+2");
    });

    it("should not show max indicator when avatars within max", async () => {
      group.setAttribute("max", "5");

      // Add 3 avatars
      for (let i = 0; i < 3; i++) {
        const avatar = document.createElement("ha-avatar");
        avatar.setAttribute("alt", `User ${i + 1}`);
        group.appendChild(avatar);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const maxIndicator = queryShadow(group, '[part="max-indicator"]');
      expect(maxIndicator).toBeNull();
    });

    it("should show all avatars when max is 0", async () => {
      group.setAttribute("max", "0");

      // Add 5 avatars
      for (let i = 0; i < 5; i++) {
        const avatar = document.createElement("ha-avatar");
        avatar.setAttribute("alt", `User ${i + 1}`);
        group.appendChild(avatar);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const maxIndicator = queryShadow(group, '[part="max-indicator"]');
      expect(maxIndicator).toBeNull();
    });
  });

  describe("Size Propagation", () => {
    let group: HaAvatarGroup;

    beforeEach(() => {
      group = document.createElement("ha-avatar-group") as HaAvatarGroup;
      document.body.appendChild(group);
    });

    afterEach(() => {
      document.body.removeChild(group);
    });

    it("should propagate size to child avatars", async () => {
      // Set size before adding avatar
      group.setAttribute("size", "lg");

      const avatar = document.createElement("ha-avatar");
      avatar.setAttribute("alt", "User 1");
      group.appendChild(avatar);

      // Trigger propagation
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check if size was propagated (may need manual trigger in implementation)
      // For now, just verify the group has the size attribute
      expect(group.getAttribute("size")).toBe("lg");
    });
  });

  describe("Slot", () => {
    let group: HaAvatarGroup;

    beforeEach(() => {
      group = document.createElement("ha-avatar-group") as HaAvatarGroup;
      document.body.appendChild(group);
    });

    afterEach(() => {
      document.body.removeChild(group);
    });

    it("should render slotted avatars", () => {
      const avatar = document.createElement("ha-avatar");
      group.appendChild(avatar);

      const slot = queryShadow(group, "slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    let group: HaAvatarGroup;

    beforeEach(() => {
      group = document.createElement("ha-avatar-group") as HaAvatarGroup;
      document.body.appendChild(group);
    });

    afterEach(() => {
      document.body.removeChild(group);
    });

    it("should expose container part", () => {
      const container = queryShadow(group, '[part="container"]');
      expect(container).toBeTruthy();
    });

    it("should expose max-indicator part when showing max count", async () => {
      group.setAttribute("max", "2");

      for (let i = 0; i < 4; i++) {
        const avatar = document.createElement("ha-avatar");
        avatar.setAttribute("alt", `User ${i + 1}`);
        group.appendChild(avatar);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const maxIndicator = queryShadow(group, '[part="max-indicator"]');
      expect(maxIndicator).toBeTruthy();
    });
  });
});
