import { describe, it, expect, beforeEach } from "vitest";
import { HaSkeleton } from "./skeleton";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";

describe("HaSkeleton", () => {
  let skeleton: HaSkeleton;

  beforeEach(async () => {
    skeleton = document.createElement("ha-skeleton") as HaSkeleton;
    document.body.appendChild(skeleton);
    await waitForCustomElement("ha-skeleton");
  });

  afterEach(() => {
    document.body.removeChild(skeleton);
  });

  describe("Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-skeleton")).toBeDefined();
    });

    it("should create shadow root", () => {
      expect(skeleton.shadowRoot).toBeTruthy();
    });
  });

  describe("Variants", () => {
    it("should default to text variant", () => {
      const skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--text")).toBe(true);
    });

    it("should apply circular variant", async () => {
      skeleton.setAttribute("variant", "circular");
      await new Promise((resolve) => setTimeout(resolve, 50));

      const skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--circular")).toBe(true);
      expect(skeletonEl?.classList.contains("skeleton--text")).toBe(false);
    });

    it("should apply rectangular variant", async () => {
      skeleton.setAttribute("variant", "rectangular");
      await new Promise((resolve) => setTimeout(resolve, 50));

      const skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--rectangular")).toBe(
        true
      );
      expect(skeletonEl?.classList.contains("skeleton--text")).toBe(false);
    });

    it("should switch between variants", async () => {
      skeleton.setAttribute("variant", "circular");
      await new Promise((resolve) => setTimeout(resolve, 50));

      let skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--circular")).toBe(true);

      skeleton.setAttribute("variant", "rectangular");
      await new Promise((resolve) => setTimeout(resolve, 50));

      skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--rectangular")).toBe(
        true
      );
      expect(skeletonEl?.classList.contains("skeleton--circular")).toBe(false);
    });
  });

  describe("Animations", () => {
    it("should default to pulse animation", () => {
      const skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--pulse")).toBe(true);
    });

    it("should apply wave animation", async () => {
      skeleton.setAttribute("animation", "wave");
      await new Promise((resolve) => setTimeout(resolve, 50));

      const skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--wave")).toBe(true);
      expect(skeletonEl?.classList.contains("skeleton--pulse")).toBe(false);
    });

    it("should support no animation", async () => {
      skeleton.setAttribute("animation", "none");
      await new Promise((resolve) => setTimeout(resolve, 50));

      const skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--pulse")).toBe(false);
      expect(skeletonEl?.classList.contains("skeleton--wave")).toBe(false);
    });

    it("should switch between animations", async () => {
      skeleton.setAttribute("animation", "wave");
      await new Promise((resolve) => setTimeout(resolve, 50));

      let skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--wave")).toBe(true);

      skeleton.setAttribute("animation", "pulse");
      await new Promise((resolve) => setTimeout(resolve, 50));

      skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.classList.contains("skeleton--pulse")).toBe(true);
      expect(skeletonEl?.classList.contains("skeleton--wave")).toBe(false);
    });
  });

  describe("Dimensions", () => {
    it("should apply width attribute", async () => {
      skeleton.setAttribute("width", "200px");
      await new Promise((resolve) => setTimeout(resolve, 50));

      const skeletonEl = queryShadow(skeleton, ".skeleton") as HTMLElement;
      expect(skeletonEl?.style.width).toBe("200px");
    });

    it("should apply height attribute", async () => {
      skeleton.setAttribute("height", "100px");
      await new Promise((resolve) => setTimeout(resolve, 50));

      const skeletonEl = queryShadow(skeleton, ".skeleton") as HTMLElement;
      expect(skeletonEl?.style.height).toBe("100px");
    });

    it("should apply both width and height", async () => {
      skeleton.setAttribute("width", "200px");
      skeleton.setAttribute("height", "100px");
      await new Promise((resolve) => setTimeout(resolve, 50));

      const skeletonEl = queryShadow(skeleton, ".skeleton") as HTMLElement;
      expect(skeletonEl?.style.width).toBe("200px");
      expect(skeletonEl?.style.height).toBe("100px");
    });

    it("should update dimensions when attributes change", async () => {
      skeleton.setAttribute("width", "200px");
      await new Promise((resolve) => setTimeout(resolve, 50));

      let skeletonEl = queryShadow(skeleton, ".skeleton") as HTMLElement;
      expect(skeletonEl?.style.width).toBe("200px");

      skeleton.setAttribute("width", "300px");
      await new Promise((resolve) => setTimeout(resolve, 50));

      skeletonEl = queryShadow(skeleton, ".skeleton") as HTMLElement;
      expect(skeletonEl?.style.width).toBe("300px");
    });

    it("should support percentage values", async () => {
      skeleton.setAttribute("width", "100%");
      await new Promise((resolve) => setTimeout(resolve, 50));

      const skeletonEl = queryShadow(skeleton, ".skeleton") as HTMLElement;
      expect(skeletonEl?.style.width).toBe("100%");
    });
  });

  describe("CSS Parts", () => {
    it("should expose skeleton part", () => {
      const skeletonEl = queryShadow(skeleton, '[part="skeleton"]');
      expect(skeletonEl).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-busy attribute", () => {
      const skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.getAttribute("aria-busy")).toBe("true");
    });

    it("should have aria-live attribute", () => {
      const skeletonEl = queryShadow(skeleton, ".skeleton");
      expect(skeletonEl?.getAttribute("aria-live")).toBe("polite");
    });
  });

  describe("ObservedAttributes", () => {
    it("should observe variant attribute", () => {
      expect(HaSkeleton.observedAttributes).toContain("variant");
    });

    it("should observe animation attribute", () => {
      expect(HaSkeleton.observedAttributes).toContain("animation");
    });

    it("should observe width attribute", () => {
      expect(HaSkeleton.observedAttributes).toContain("width");
    });

    it("should observe height attribute", () => {
      expect(HaSkeleton.observedAttributes).toContain("height");
    });
  });

  describe("Multiple Instances", () => {
    it("should support multiple skeleton elements", async () => {
      const skeleton2 = document.createElement("ha-skeleton") as HaSkeleton;
      const skeleton3 = document.createElement("ha-skeleton") as HaSkeleton;

      skeleton.setAttribute("variant", "text");
      skeleton2.setAttribute("variant", "circular");
      skeleton3.setAttribute("variant", "rectangular");

      document.body.appendChild(skeleton2);
      document.body.appendChild(skeleton3);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const skeletonEl1 = queryShadow(skeleton, ".skeleton");
      const skeletonEl2 = queryShadow(skeleton2, ".skeleton");
      const skeletonEl3 = queryShadow(skeleton3, ".skeleton");

      expect(skeletonEl1?.classList.contains("skeleton--text")).toBe(true);
      expect(skeletonEl2?.classList.contains("skeleton--circular")).toBe(true);
      expect(skeletonEl3?.classList.contains("skeleton--rectangular")).toBe(
        true
      );

      document.body.removeChild(skeleton2);
      document.body.removeChild(skeleton3);
    });
  });
});
