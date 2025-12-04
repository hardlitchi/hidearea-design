import { describe, it, expect, beforeEach } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaTable } from "./table";

describe("HaTable", () => {
  beforeEach(async () => {
    if (!customElements.get("ha-table")) {
      customElements.define("ha-table", HaTable);
    }
    await waitForCustomElement("ha-table");
  });

  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      expect(customElements.get("ha-table")).toBe(HaTable);
    });

    it("should create an instance", () => {
      const table = document.createElement("ha-table") as HaTable;
      expect(table).toBeInstanceOf(HaTable);
      expect(table).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      const table = document.createElement("ha-table") as HaTable;
      document.body.appendChild(table);
      expect(table.shadowRoot).not.toBeNull();
      document.body.removeChild(table);
    });
  });

  describe("Attributes", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should not be striped by default", () => {
      expect(table.hasAttribute("striped")).toBe(false);
    });

    it("should not be bordered by default", () => {
      expect(table.hasAttribute("bordered")).toBe(false);
    });

    it("should not be hoverable by default", () => {
      expect(table.hasAttribute("hoverable")).toBe(false);
    });

    it("should not be compact by default", () => {
      expect(table.hasAttribute("compact")).toBe(false);
    });

    it("should not be full-width by default", () => {
      expect(table.hasAttribute("full-width")).toBe(false);
    });

    it("should add striped attribute", () => {
      table.setAttribute("striped", "");
      expect(table.hasAttribute("striped")).toBe(true);
    });

    it("should add bordered attribute", () => {
      table.setAttribute("bordered", "");
      expect(table.hasAttribute("bordered")).toBe(true);
    });

    it("should add hoverable attribute", () => {
      table.setAttribute("hoverable", "");
      expect(table.hasAttribute("hoverable")).toBe(true);
    });

    it("should add compact attribute", () => {
      table.setAttribute("compact", "");
      expect(table.hasAttribute("compact")).toBe(true);
    });

    it("should add full-width attribute", () => {
      table.setAttribute("full-width", "");
      expect(table.hasAttribute("full-width")).toBe(true);
    });
  });

  describe("CSS Classes", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should apply striped class when striped attribute is set", () => {
      table.setAttribute("striped", "");
      const tableElement = queryShadow(table, ".table");
      expect(tableElement?.classList.contains("table--striped")).toBe(true);
    });

    it("should apply bordered class when bordered attribute is set", () => {
      table.setAttribute("bordered", "");
      const tableElement = queryShadow(table, ".table");
      expect(tableElement?.classList.contains("table--bordered")).toBe(true);
    });

    it("should apply hoverable class when hoverable attribute is set", () => {
      table.setAttribute("hoverable", "");
      const tableElement = queryShadow(table, ".table");
      expect(tableElement?.classList.contains("table--hoverable")).toBe(true);
    });

    it("should apply compact class when compact attribute is set", () => {
      table.setAttribute("compact", "");
      const tableElement = queryShadow(table, ".table");
      expect(tableElement?.classList.contains("table--compact")).toBe(true);
    });

    it("should apply full-width class when full-width attribute is set", () => {
      table.setAttribute("full-width", "");
      const tableElement = queryShadow(table, ".table");
      expect(tableElement?.classList.contains("table--full-width")).toBe(true);
    });

    it("should apply multiple classes", () => {
      table.setAttribute("striped", "");
      table.setAttribute("bordered", "");
      table.setAttribute("hoverable", "");
      const tableElement = queryShadow(table, ".table");
      expect(tableElement?.classList.contains("table--striped")).toBe(true);
      expect(tableElement?.classList.contains("table--bordered")).toBe(true);
      expect(tableElement?.classList.contains("table--hoverable")).toBe(true);
    });
  });

  describe("Slots", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should render default slot for table content", () => {
      const thead = document.createElement("thead");
      thead.innerHTML = "<tr><th>Header</th></tr>";
      table.appendChild(thead);

      const slot = queryShadow(table, "slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should expose wrapper part", () => {
      const wrapper = queryShadow(table, '[part="wrapper"]');
      expect(wrapper).toBeTruthy();
    });

    it("should expose table part", () => {
      const tableElement = queryShadow(table, '[part="table"]');
      expect(tableElement).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should render as a table element", () => {
      const tableElement = queryShadow(table, "table");
      expect(tableElement?.tagName.toLowerCase()).toBe("table");
    });
  });
});
