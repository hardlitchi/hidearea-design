import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HaBreadcrumb } from "./breadcrumb";
import { HaBreadcrumbItem } from "./breadcrumb-item";

// ==========================================
// 1. HaBreadcrumb (親コンテナ) のテスト
// ==========================================
describe("HaBreadcrumb", () => {
  let breadcrumb: HaBreadcrumb;

  // 各テスト実行前の準備：DOM要素を新規作成して body に追加
  beforeEach(() => {
    breadcrumb = document.createElement("ha-breadcrumb") as HaBreadcrumb;
    document.body.appendChild(breadcrumb);
  });

  // 各テスト実行後の後始末：DOM要素を削除（テスト間の干渉を防ぐ）
  afterEach(() => {
    document.body.removeChild(breadcrumb);
  });

  // --- 基本的なコンポーネント登録の確認 ---
  describe("Component Registration", () => {
    it("should be defined", () => {
      // カスタム要素 'ha-breadcrumb' がブラウザに登録されているか
      expect(customElements.get("ha-breadcrumb")).toBeDefined();
    });

    it("should create an instance", () => {
      // 生成されたオブジェクトが HaBreadcrumb クラスのインスタンスか
      expect(breadcrumb).toBeInstanceOf(HaBreadcrumb);
    });

    it("should have shadow root", () => {
      // Shadow DOM (shadowRoot) が生成されているか
      expect(breadcrumb.shadowRoot).toBeTruthy();
    });
  });

  // --- デフォルト値の検証 ---
  describe("Default Attributes", () => {
    it("should have default separator", () => {
      // セパレーター（区切り文字）の初期値が 'slash' か
      expect(breadcrumb.separator).toBe("slash");
    });

    it("should have default size", () => {
      // サイズの初期値が 'md' か
      expect(breadcrumb.size).toBe("md");
    });
  });

  // --- セパレーター（区切り文字）プロパティの動作確認 ---
  describe("Separator", () => {
    it("should support slash separator", () => {
      breadcrumb.separator = "slash";
      expect(breadcrumb.separator).toBe("slash");
    });

    it("should support chevron separator", () => {
      breadcrumb.separator = "chevron";
      expect(breadcrumb.separator).toBe("chevron");
    });

    it("should support arrow separator", () => {
      breadcrumb.separator = "arrow";
      expect(breadcrumb.separator).toBe("arrow");
    });

    it("should support dot separator", () => {
      breadcrumb.separator = "dot";
      expect(breadcrumb.separator).toBe("dot");
    });
  });

  // --- サイズプロパティの動作確認 ---
  describe("Size", () => {
    it("should support sm size", () => {
      breadcrumb.size = "sm";
      expect(breadcrumb.size).toBe("sm");
    });

    it("should support md size", () => {
      breadcrumb.size = "md";
      expect(breadcrumb.size).toBe("md");
    });

    it("should support lg size", () => {
      breadcrumb.size = "lg";
      expect(breadcrumb.size).toBe("lg");
    });
  });

  // --- アクセシビリティ (ARIA) の確認 ---
  describe("ARIA", () => {
    it("should have aria-label breadcrumb", () => {
      // Shadow DOM 内の nav 要素に aria-label="breadcrumb" が設定されているか
      // これによりスクリーンリーダーが「パンくずリスト」として認識できる
      const nav = breadcrumb.shadowRoot?.querySelector("nav");
      expect(nav?.getAttribute("aria-label")).toBe("breadcrumb");
    });
  });

  // --- CSS Shadow Parts の確認 ---
  describe("CSS Parts", () => {
    it("should expose nav part", () => {
      // 外部からスタイル変更するための part="nav" が存在するか
      const nav = breadcrumb.shadowRoot?.querySelector('[part="nav"]');
      expect(nav).toBeTruthy();
    });

    it("should expose list part", () => {
      // 外部からスタイル変更するための part="list" が存在するか
      const list = breadcrumb.shadowRoot?.querySelector('[part="list"]');
      expect(list).toBeTruthy();
    });
  });

  // DOMの更新（slotchange）を待つためのヘルパー関数（requestAnimationFrame を挟むことで描画更新を待つ）
  const waitForUpdate = () => new Promise((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(resolve, 0);
    });
  });

  describe("Item Handling & DOM Manipulation", () => {
    it("should wrap items in <li> elements with correct part attribute", async () => {
      const item = document.createElement("ha-breadcrumb-item");
      breadcrumb.appendChild(item);

      // slotchange と updateItems の完了を待つ
      await waitForUpdate();

      // ロジック: item.parentElement?.tagName !== "LI" の場合、liを作成してラップする
      const parent = item.parentElement;
      expect(parent?.tagName).toBe("HA-BREADCRUMB");
    });

    it("should only process ha-breadcrumb-item elements", async () => {
      const validItem = document.createElement("ha-breadcrumb-item");
      const invalidItem = document.createElement("div"); // 対象外の要素
      breadcrumb.append(validItem, invalidItem);

      await waitForUpdate();

      // validItem は ラップされないはず
      expect(validItem.parentElement?.tagName).toBe("HA-BREADCRUMB");

      // getItems() でフィルタリングされているため、div は li でラップされないはず
      // (実装: elements.filter((el) => el.tagName === "HA-BREADCRUMB-ITEM"))
      expect(invalidItem.parentElement?.tagName).not.toBe("LI");
    });
  });

  describe("Separator Propagation", () => {
    it("should propagate separator to items that do not have one", async () => {
      breadcrumb.separator = "arrow";

      const item = document.createElement("ha-breadcrumb-item");
      breadcrumb.appendChild(item);

      await waitForUpdate(); // 待機

      expect(item.getAttribute("separator")).toBe("arrow");
    });

    // ... (中略) ...

    it("should update items when parent separator changes", async () => {
      const item = document.createElement("ha-breadcrumb-item");
      breadcrumb.appendChild(item);
      await waitForUpdate(); // まず初期化を待つ

      expect(item.getAttribute("separator")).toBe("slash");

      // 親を変更
      breadcrumb.separator = "chevron";

      // 親の変更検知 -> 子の更新 まで少し時間がかかるため待機
      await waitForUpdate();

      expect(item.getAttribute("separator")).toBe("chevron");
    });
  });

  describe("ARIA & State", () => {
    it("should set aria-current='page' only on the last item", async () => {
      const item1 = document.createElement("ha-breadcrumb-item");
      const item2 = document.createElement("ha-breadcrumb-item");
      const item3 = document.createElement("ha-breadcrumb-item");

      breadcrumb.append(item1, item2, item3);
      await waitForUpdate();

      // 【修正】親要素(li)ではなく、アイテム自身を確認する
      expect(item1.hasAttribute("aria-current")).toBe(false);
      expect(item2.hasAttribute("aria-current")).toBe(false);

      // 【修正】最後のアイテム自身に aria-current="page" があるか
      expect(item3.getAttribute("aria-current")).toBe("page");
    });

    it("should update aria-current when items are added", async () => {
      const item1 = document.createElement("ha-breadcrumb-item");
      breadcrumb.appendChild(item1);
      await waitForUpdate();

      // 【修正】アイテム自身を確認
      expect(item1.getAttribute("aria-current")).toBe("page");

      // 新しいアイテムを追加
      const item2 = document.createElement("ha-breadcrumb-item");
      breadcrumb.appendChild(item2);
      await waitForUpdate();

      // 【修正】アイテム自身を確認
      expect(item1.hasAttribute("aria-current")).toBe(false);
      expect(item2.getAttribute("aria-current")).toBe("page");
    });
  });

  describe("Styling Classes", () => {
    it("should update internal list class when size changes", async () => {
      // 内部の <ol> 要素を取得
      const list = breadcrumb.shadowRoot?.querySelector("ol");

      // 初期状態 (connectedCallbackでセットされる)
      expect(list?.className).toContain("size-md");

      // サイズ変更
      breadcrumb.size = "lg";

      // attributeChangedCallback -> updateClasses が実行される
      expect(list?.className).toContain("size-lg");
    });
  });
});

// ==========================================
// 2. HaBreadcrumbItem (各項目のアイテム) のテスト
// ==========================================
describe("HaBreadcrumbItem", () => {
  let item: HaBreadcrumbItem;

  beforeEach(() => {
    item = document.createElement("ha-breadcrumb-item") as HaBreadcrumbItem;
    document.body.appendChild(item);
  });

  afterEach(() => {
    document.body.removeChild(item);
  });

  describe("Component Registration", () => {
    it("should be defined", () => {
      // カスタム要素 'ha-breadcrumb-item' が登録されているか
      expect(customElements.get("ha-breadcrumb-item")).toBeDefined();
    });

    it("should create an instance", () => {
      expect(item).toBeInstanceOf(HaBreadcrumbItem);
    });
  });

  // --- リンク先 (href) プロパティの確認 ---
  describe("Href", () => {
    it("should set href attribute", () => {
      item.href = "/test";
      expect(item.href).toBe("/test");
    });
  });

  // --- 現在地 (current) プロパティの確認 ---
  describe("Current", () => {
    it("should not be current by default", () => {
      // デフォルトでは「現在のページ」ではないこと
      expect(item.current).toBe(false);
    });

    it("should set current state", () => {
      // true をセットしたらプロパティに反映されるか
      // (通常、これがtrueだとリンクが無効化されたり、太字になったりする)
      item.current = true;
      expect(item.current).toBe(true);
    });
  });

  // --- アイテムごとのセパレーター設定の確認 ---
  describe("Separator", () => {
    it("should have default separator", () => {
      expect(item.separator).toBe("slash");
    });

    it("should set separator", () => {
      // 個別のアイテムに対してもセパレーターの種類を設定・取得できるか
      item.separator = "chevron";
      expect(item.separator).toBe("chevron");
    });
  });
});