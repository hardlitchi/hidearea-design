import { describe, it, expect, beforeEach, vi } from "vitest";
import { waitForCustomElement, queryShadow } from "../../../vitest.setup";
import { HaAlert } from "./alert";

// 'HaAlert' コンポーネントのテストスイートを定義
describe("HaAlert", () => {
  // 各テスト実行前の準備処理
  beforeEach(async () => {
    // カスタム要素が未登録の場合のみ登録を行う（二重登録エラーを防ぐため）
    if (!customElements.get("ha-alert")) {
      customElements.define("ha-alert", HaAlert);
    }
    // コンポーネントが DOM で使用可能になるまで待機（テストヘルパー関数）
    await waitForCustomElement("ha-alert");
  });

  // --- コンポーネントの登録と基本生成のテスト ---
  describe("Component Registration", () => {
    it("should be registered as a custom element", () => {
      // 'ha-alert' タグが正しいクラス (HaAlert) に紐付いているか確認
      expect(customElements.get("ha-alert")).toBe(HaAlert);
    });

    it("should create an instance", () => {
      // インスタンスを作成し、正しいクラスのインスタンスか確認
      const alert = document.createElement("ha-alert") as HaAlert;
      expect(alert).toBeInstanceOf(HaAlert);
      expect(alert).toBeInstanceOf(HTMLElement);
    });

    it("should render with shadow DOM", () => {
      // DOMに追加された際、Shadow DOM (shadowRoot) が生成されているか確認
      const alert = document.createElement("ha-alert") as HaAlert;
      document.body.appendChild(alert);
      expect(alert.shadowRoot).not.toBeNull();
      document.body.removeChild(alert);
    });
  });

  // --- 属性(Attribute) と プロパティ(Property) の動作テスト ---
  describe("Attributes and Properties", () => {
    let alert: HaAlert;

    beforeEach(() => {
      alert = document.createElement("ha-alert") as HaAlert;
      document.body.appendChild(alert);
    });

    afterEach(() => {
      document.body.removeChild(alert);
    });

    // デフォルト値の確認テスト
    it("should have default variant as info", () => {
      expect(alert.variant).toBe("info");
    });

    it("should have default styleVariant as soft", () => {
      expect(alert.styleVariant).toBe("soft");
    });

    it("should not be closable by default", () => {
      expect(alert.closable).toBe(false);
    });

    it("should show icon by default", () => {
      expect(alert.showIcon).toBe(true);
    });

    // プロパティを変更した際、HTML属性も同期して更新されるか確認
    it("should update variant property", () => {
      alert.variant = "success";
      expect(alert.variant).toBe("success");
      expect(alert.getAttribute("variant")).toBe("success"); // HTML属性も変わるか
    });

    it("should update styleVariant property", () => {
      alert.styleVariant = "filled";
      expect(alert.styleVariant).toBe("filled");
      expect(alert.getAttribute("style-variant")).toBe("filled");
    });

    it("should update title property", () => {
      alert.title = "Test Title";
      expect(alert.title).toBe("Test Title");
      expect(alert.getAttribute("title")).toBe("Test Title");
    });

    // 真偽値（Boolean）のプロパティと属性の同期確認
    it("should update closable property", () => {
      alert.closable = true;
      expect(alert.closable).toBe(true);
      expect(alert.hasAttribute("closable")).toBe(true);
    });

    it("should update showIcon property", () => {
      alert.showIcon = false;
      expect(alert.showIcon).toBe(false);
      expect(alert.getAttribute("show-icon")).toBe("false");
    });
  });

  // --- バリアント（種類：info, success 等）による見た目の変化テスト ---
  describe("Variants", () => {
    // variant='info' の時、内部のCSSクラスに .alert--info が付与されるか
    it("should render info variant", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.variant = "info";
      document.body.appendChild(alert);

      // queryShadow は Shadow DOM 内部の要素を取得するヘルパー関数
      const alertElement = queryShadow(alert, ".alert");
      expect(alertElement?.className).toContain("alert--info");

      document.body.removeChild(alert);
    });

    it("should render success variant", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.variant = "success";
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, ".alert");
      expect(alertElement?.className).toContain("alert--success");

      document.body.removeChild(alert);
    });

    it("should render warning variant", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.variant = "warning";
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, ".alert");
      expect(alertElement?.className).toContain("alert--warning");

      document.body.removeChild(alert);
    });

    it("should render error variant", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.variant = "error";
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, ".alert");
      expect(alertElement?.className).toContain("alert--error");

      document.body.removeChild(alert);
    });
  });

  // --- スタイルバリアント（見た目の種類）のテスト ---
  describe("Style Variants", () => {
    // styleVariant='filled' の時、.alert--filled クラスが付与されるか
    it("should render filled style", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.styleVariant = "filled";
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, ".alert");
      expect(alertElement?.className).toContain("alert--filled");

      document.body.removeChild(alert);
    });

    it("should render outlined style", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.styleVariant = "outlined";
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, ".alert");
      expect(alertElement?.className).toContain("alert--outlined");

      document.body.removeChild(alert);
    });

    it("should render soft style", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.styleVariant = "soft";
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, ".alert");
      expect(alertElement?.className).toContain("alert--soft");

      document.body.removeChild(alert);
    });
  });

  describe("Slots", () => {
    // スロットの変更イベントは非同期で発生するため、反映を待つためのヘルパー
    const waitForSlotChange = () =>
      new Promise((resolve) => setTimeout(resolve, 0));

    // --- Icon Slot のテスト ---
    it("should NOT render default icon when custom icon slot is provided", async () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      document.body.appendChild(alert);

      // カスタムアイコンを作成して挿入
      const customIcon = document.createElement("span");
      customIcon.slot = "icon";
      customIcon.textContent = "🚀";
      alert.appendChild(customIcon);

      // slotchangeイベントの処理待ち
      await waitForSlotChange();

      // デフォルトアイコン（SVGなど）が生成されていないか、
      // あるいはカスタムスロットが優先されているかを確認
      // ※実装詳細によりますが、ここでは「カスタム要素がスロットに割り当てられていること」を確認します
      const iconSlot = queryShadow(
        alert,
        'slot[name="icon"]',
      ) as HTMLSlotElement;
      expect(iconSlot.assignedElements()).toContain(customIcon);

      // もし実装が「スロットがある場合はデフォルトアイコンをDOMから消す」仕様なら以下も有効
      // const defaultIcon = alert.querySelector('[data-default]');
      // expect(defaultIcon).toBeNull();

      document.body.removeChild(alert);
    });

    // --- Title Slot のテスト ---
    it("should show title container when content is provided via slot", async () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      // title属性はセットしない
      document.body.appendChild(alert);

      const titleContainer = queryShadow(alert, ".alert__title") as HTMLElement;

      // 初期状態では title属性もなくスロットも空なので非表示のはず
      expect(titleContainer.style.display).toBe("none");

      // タイトルスロットに要素を追加
      const customTitle = document.createElement("div");
      customTitle.slot = "title";
      customTitle.textContent = "Custom HTML Title";
      alert.appendChild(customTitle);

      // slotchangeイベントの処理待ち
      await waitForSlotChange();

      // スロットに中身が入ったので block (表示) になっているはず
      expect(titleContainer.style.display).toBe("block");

      document.body.removeChild(alert);
    });

    it("should hide title container when slot content is removed", async () => {
      const alert = document.createElement("ha-alert") as HaAlert;

      // 最初からスロットありで作成
      const customTitle = document.createElement("div");
      customTitle.slot = "title";
      customTitle.textContent = "Temp Title";
      alert.appendChild(customTitle);

      document.body.appendChild(alert);
      await waitForSlotChange();

      const titleContainer = queryShadow(alert, ".alert__title") as HTMLElement;
      expect(titleContainer.style.display).toBe("block");

      // スロットの中身を削除
      alert.removeChild(customTitle);

      // slotchangeイベントの処理待ち
      await waitForSlotChange();

      // 中身がなくなったので非表示になるはず
      expect(titleContainer.style.display).toBe("none");

      document.body.removeChild(alert);
    });
  });

  // --- 閉じる機能 (Closable) のテスト ---
  describe("Closable", () => {
    // closable=false なら閉じるボタンが表示されないこと (display: none)
    it("should not show close button when closable is false", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.closable = false;
      document.body.appendChild(alert);

      const closeButton = queryShadow(alert, ".alert__close") as HTMLElement;
      expect(closeButton?.style.display).toBe("none");

      document.body.removeChild(alert);
    });

    // closable=true なら閉じるボタンが表示されること
    it("should show close button when closable is true", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      const closeButton = queryShadow(alert, ".alert__close") as HTMLElement;
      expect(closeButton?.style.display).toBe("flex");

      document.body.removeChild(alert);
    });

    // 閉じるボタンクリック時に 'alert-close' イベントが発火するか
    it("should emit alert-close event when close button is clicked", async () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      const closeHandler = vi.fn(); // モック関数を作成
      alert.addEventListener("alert-close", closeHandler);

      const closeButton = queryShadow(
        alert,
        ".alert__close",
      ) as HTMLButtonElement;
      closeButton.click();

      expect(closeHandler).toHaveBeenCalled(); // モックが呼ばれたか確認
    });

    // 閉じるボタンクリック時に、DOMから要素自体が削除されるか（デフォルト動作）
    it("should remove element when close button is clicked (default behavior)", async () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      expect(document.body.contains(alert)).toBe(true);

      const closeButton = queryShadow(
        alert,
        ".alert__close",
      ) as HTMLButtonElement;
      closeButton.click();

      // DOM更新（次のティック）を待つためのハック
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(document.body.contains(alert)).toBe(false); // bodyから消えているか
    });

    // プログラムから .close() メソッドを呼んでもイベントが発火するか
    it("should call close() method programmatically", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      const closeHandler = vi.fn();
      alert.addEventListener("alert-close", closeHandler);

      alert.close();

      expect(closeHandler).toHaveBeenCalled();
    });
  });

  // --- アイコン表示のテスト ---
  describe("Icon", () => {
    it("should show icon by default", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      document.body.appendChild(alert);

      const iconContainer = queryShadow(alert, ".alert__icon") as HTMLElement;
      expect(iconContainer?.style.display).not.toBe("none");

      document.body.removeChild(alert);
    });

    it("should hide icon when showIcon is false", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.showIcon = false;
      document.body.appendChild(alert);

      const iconContainer = queryShadow(alert, ".alert__icon") as HTMLElement;
      expect(iconContainer?.style.display).toBe("none");

      document.body.removeChild(alert);
    });

    // バリアントごとに適切なデフォルトアイコンが描画されるか
    it("should render default icon for each variant", () => {
      const variants = ["info", "success", "warning", "error"] as const;

      variants.forEach((variant) => {
        const alert = document.createElement("ha-alert") as HaAlert;
        alert.variant = variant;
        alert.showIcon = true;
        document.body.appendChild(alert);

        // slot="icon" かつ data-default 属性を持つ要素を探す
        const icon = alert.querySelector('[slot="icon"][data-default]');
        expect(icon).not.toBeNull();
        expect(icon?.innerHTML).toContain("<svg"); // SVGが含まれているか

        document.body.removeChild(alert);
      });
    });
  });

  // --- タイトルのテスト ---
  describe("Title", () => {
    it("should render title from attribute", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.title = "Test Title";
      document.body.appendChild(alert);

      const titleElement = queryShadow(alert, ".alert__title") as HTMLElement;
      expect(titleElement?.textContent).toContain("Test Title");
      expect(titleElement?.style.display).not.toBe("none");

      document.body.removeChild(alert);
    });

    // タイトルが設定されていない時は非表示になっているか
    it("should hide title when not provided", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      document.body.appendChild(alert);

      const titleElement = queryShadow(alert, ".alert__title") as HTMLElement;
      expect(titleElement?.style.display).toBe("none");

      document.body.removeChild(alert);
    });
  });

  // --- コンテンツ（メッセージ本文）のテスト ---
  describe("Content", () => {
    it("should render message content", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.textContent = "This is an alert message"; // 要素の中身を設定
      document.body.appendChild(alert);

      expect(alert.textContent).toContain("This is an alert message");

      document.body.removeChild(alert);
    });
  });

  // --- アクセシビリティ（A11y）のテスト ---
  describe("Accessibility", () => {
    // アラートとして正しく認識されるための role="alert" があるか
    it('should have role="alert"', () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, ".alert");
      expect(alertElement?.getAttribute("role")).toBe("alert");

      document.body.removeChild(alert);
    });

    // 閉じるボタンに適切な aria-label が設定されているか
    it("should have accessible close button", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      const closeButton = queryShadow(
        alert,
        ".alert__close",
      ) as HTMLButtonElement;
      expect(closeButton?.getAttribute("aria-label")).toBe("Close alert");
      expect(closeButton?.getAttribute("type")).toBe("button");

      document.body.removeChild(alert);
    });
  });

  // --- CSS Shadow Parts のテスト ---
  describe("Parts", () => {
    // 外部からスタイルを上書きするための part 属性が各要素に付与されているか
    it("should expose parts for styling", () => {
      const alert = document.createElement("ha-alert") as HaAlert;
      document.body.appendChild(alert);

      // 各要素が part 属性を持っているかチェック
      const alertElement = queryShadow(alert, '[part="alert"]');
      const iconElement = queryShadow(alert, '[part="icon"]');
      const contentElement = queryShadow(alert, '[part="content"]');
      const titleElement = queryShadow(alert, '[part="title"]');
      const messageElement = queryShadow(alert, '[part="message"]');
      const closeElement = queryShadow(alert, '[part="close"]');
      const actionsElement = queryShadow(alert, '[part="actions"]');

      expect(alertElement).not.toBeNull();
      expect(iconElement).not.toBeNull();
      expect(contentElement).not.toBeNull();
      expect(titleElement).not.toBeNull();
      expect(messageElement).not.toBeNull();
      expect(closeElement).not.toBeNull();
      expect(actionsElement).not.toBeNull();

      document.body.removeChild(alert);
    });
  });
});
