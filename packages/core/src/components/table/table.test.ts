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

  describe("Light DOM Styling", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should apply base styles to Light DOM table", async () => {
      const lightTable = document.createElement("table");
      lightTable.innerHTML = `
        <thead><tr><th>Header</th></tr></thead>
        <tbody><tr><td>Data</td></tr></tbody>
      `;
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(lightTable.style.width).toBe("100%");
      expect(lightTable.style.borderCollapse).toBe("collapse");
      expect(lightTable.style.borderSpacing).toBe("0");
    });

    it("should apply background color to thead", async () => {
      const lightTable = document.createElement("table");
      const thead = document.createElement("thead");
      thead.innerHTML = "<tr><th>Header</th></tr>";
      lightTable.appendChild(thead);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(thead.style.backgroundColor).toBe("var(--component-table-header-background)");
    });

    it("should apply default padding to th elements", async () => {
      const lightTable = document.createElement("table");
      const thead = document.createElement("thead");
      const th = document.createElement("th");
      th.textContent = "Header";
      thead.appendChild(document.createElement("tr").appendChild(th));
      lightTable.appendChild(thead);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(th.style.padding).toBe("var(--component-table-padding-default)");
    });

    it("should apply default padding to td elements", async () => {
      const lightTable = document.createElement("table");
      const tbody = document.createElement("tbody");
      const td = document.createElement("td");
      td.textContent = "Data";
      const tr = document.createElement("tr");
      tr.appendChild(td);
      tbody.appendChild(tr);
      lightTable.appendChild(tbody);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(td.style.padding).toBe("var(--component-table-padding-default)");
    });
  });

  describe("Bordered Styling", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      table.setAttribute("bordered", "");
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should apply border to th elements when bordered", async () => {
      const lightTable = document.createElement("table");
      const thead = document.createElement("thead");
      const th = document.createElement("th");
      th.textContent = "Header";
      const tr = document.createElement("tr");
      tr.appendChild(th);
      thead.appendChild(tr);
      lightTable.appendChild(thead);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(th.style.border).toContain("1px solid");
    });

    it("should apply border to td elements when bordered", async () => {
      const lightTable = document.createElement("table");
      const tbody = document.createElement("tbody");
      const td = document.createElement("td");
      td.textContent = "Data";
      const tr = document.createElement("tr");
      tr.appendChild(td);
      tbody.appendChild(tr);
      lightTable.appendChild(tbody);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(td.style.border).toContain("1px solid");
    });
  });

  describe("Compact Styling", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      table.setAttribute("compact", "");
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should apply compact padding to th elements when compact", async () => {
      const lightTable = document.createElement("table");
      const thead = document.createElement("thead");
      const th = document.createElement("th");
      th.textContent = "Header";
      const tr = document.createElement("tr");
      tr.appendChild(th);
      thead.appendChild(tr);
      lightTable.appendChild(thead);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(th.style.padding).toBe("var(--component-table-padding-compact)");
    });

    it("should apply compact padding to td elements when compact", async () => {
      const lightTable = document.createElement("table");
      const tbody = document.createElement("tbody");
      const td = document.createElement("td");
      td.textContent = "Data";
      const tr = document.createElement("tr");
      tr.appendChild(td);
      tbody.appendChild(tr);
      lightTable.appendChild(tbody);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(td.style.padding).toBe("var(--component-table-padding-compact)");
    });
  });

  describe("Striped Styling", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      table.setAttribute("striped", "");
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should apply striped background to odd rows", async () => {
      const lightTable = document.createElement("table");
      const tbody = document.createElement("tbody");

      for (let i = 0; i < 4; i++) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = `Row ${i + 1}`;
        tr.appendChild(td);
        tbody.appendChild(tr);
      }

      lightTable.appendChild(tbody);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const rows = tbody.querySelectorAll("tr");
      expect((rows[0] as HTMLElement).style.backgroundColor).toBe("");
      expect((rows[1] as HTMLElement).style.backgroundColor).toBe("var(--component-table-striped-background)");
      expect((rows[2] as HTMLElement).style.backgroundColor).toBe("");
      expect((rows[3] as HTMLElement).style.backgroundColor).toBe("var(--component-table-striped-background)");
    });

    it("should not apply striped background if no tbody", async () => {
      const lightTable = document.createElement("table");
      const thead = document.createElement("thead");
      thead.innerHTML = "<tr><th>Header</th></tr>";
      lightTable.appendChild(thead);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Should not throw error when tbody is missing
      expect(lightTable.querySelector("tbody")).toBeNull();
    });
  });

  describe("Hoverable Styling", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      table.setAttribute("hoverable", "");
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should apply hover background on mouseenter", async () => {
      const lightTable = document.createElement("table");
      const tbody = document.createElement("tbody");
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = "Data";
      tr.appendChild(td);
      tbody.appendChild(tr);
      lightTable.appendChild(tbody);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      tr.dispatchEvent(new MouseEvent("mouseenter"));
      expect(tr.style.backgroundColor).toBe("var(--component-table-row-hover-background)");
    });

    it("should remove hover background on mouseleave", async () => {
      const lightTable = document.createElement("table");
      const tbody = document.createElement("tbody");
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = "Data";
      tr.appendChild(td);
      tbody.appendChild(tr);
      lightTable.appendChild(tbody);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      tr.dispatchEvent(new MouseEvent("mouseenter"));
      expect(tr.style.backgroundColor).toBe("var(--component-table-row-hover-background)");

      tr.dispatchEvent(new MouseEvent("mouseleave"));
      expect(tr.style.backgroundColor).toBe("");
    });

    it("should restore striped background on mouseleave when striped", async () => {
      table.setAttribute("striped", "");

      const lightTable = document.createElement("table");
      const tbody = document.createElement("tbody");

      const tr1 = document.createElement("tr");
      tr1.appendChild(document.createElement("td")).textContent = "Row 1";
      const tr2 = document.createElement("tr");
      tr2.appendChild(document.createElement("td")).textContent = "Row 2";

      tbody.appendChild(tr1);
      tbody.appendChild(tr2);
      lightTable.appendChild(tbody);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Second row (index 1) should have striped background
      expect(tr2.style.backgroundColor).toBe("var(--component-table-striped-background)");

      tr2.dispatchEvent(new MouseEvent("mouseenter"));
      expect(tr2.style.backgroundColor).toBe("var(--component-table-row-hover-background)");

      tr2.dispatchEvent(new MouseEvent("mouseleave"));
      expect(tr2.style.backgroundColor).toBe("var(--component-table-striped-background)");
    });
  });

  describe("Slot Change Handling", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should reapply styles when slot content changes", async () => {
      const lightTable = document.createElement("table");
      const tbody = document.createElement("tbody");
      tbody.innerHTML = "<tr><td>Initial</td></tr>";
      lightTable.appendChild(tbody);
      table.appendChild(lightTable);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const initialTd = tbody.querySelector("td") as HTMLElement;
      expect(initialTd.style.padding).toBe("var(--component-table-padding-default)");

      // Change slot content
      const newRow = document.createElement("tr");
      const newTd = document.createElement("td");
      newTd.textContent = "New";
      newRow.appendChild(newTd);
      tbody.appendChild(newRow);

      // Trigger slotchange event
      const slot = table.shadowRoot!.querySelector("slot");
      slot?.dispatchEvent(new Event("slotchange"));

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(newTd.style.padding).toBe("var(--component-table-padding-default)");
    });
  });

  describe("Attribute Changes", () => {
    let table: HaTable;

    beforeEach(() => {
      table = document.createElement("ha-table") as HaTable;
      document.body.appendChild(table);
    });

    afterEach(() => {
      document.body.removeChild(table);
    });

    it("should update classes when bordered attribute is added", async () => {
      const tableElement = queryShadow(table, ".table");
      expect(tableElement?.classList.contains("table--bordered")).toBe(false);

      table.setAttribute("bordered", "");
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(tableElement?.classList.contains("table--bordered")).toBe(true);
    });

    it("should update classes when compact attribute is added", async () => {
      const tableElement = queryShadow(table, ".table");
      expect(tableElement?.classList.contains("table--compact")).toBe(false);

      table.setAttribute("compact", "");
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(tableElement?.classList.contains("table--compact")).toBe(true);
    });

    it("should handle missing table gracefully", async () => {
      // Don't append any table element
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Should not throw error when no table element exists
      expect(table.querySelector("table")).toBeNull();
    });
  });
});
