import { accordionStyles } from "./accordion.styles";

/**
 * Accordion component
 *
 * @element ha-accordion
 *
 * @attr {boolean} allow-multiple - Allow multiple items to be open simultaneously
 * @attr {boolean} collapsible - Allow all items to be collapsed
 *
 * @slot - Accordion items (ha-accordion-item elements)
 *
 * @cssprop --ha-accordion-border-color - Accordion border color
 *
 * @csspart accordion - The accordion container
 */
export class HaAccordion extends HTMLElement {
  private accordionElement: HTMLDivElement;
  private contentSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["allow-multiple", "collapsible"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = accordionStyles;

    // Create accordion container
    this.accordionElement = document.createElement("div");
    this.accordionElement.className = "accordion";
    this.accordionElement.setAttribute("part", "accordion");

    // Create slot for accordion items
    this.contentSlot = document.createElement("slot");
    this.accordionElement.appendChild(this.contentSlot);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.accordionElement);

    // Handle slot changes to manage accordion items
    this.contentSlot.addEventListener("slotchange", () => {
      this.updateItems();
    });
    // 親でバブリングしてくる 'accordion-toggle' を捕まえる
    this.addEventListener("accordion-toggle", this.handleItemToggle.bind(this) as EventListener);
  }

  // アイテムがトグルされたときの処理
  private handleItemToggle(e: CustomEvent) {
    // 開いたときのみ、他のアイテムを閉じる処理が必要（allow-multipleがfalseの場合）
    if (e.detail.open && !this.allowMultiple) {
      const items = this.getItems();
      const toggledItem = e.target as HTMLElement;

      items.forEach((item) => {
        if (item !== toggledItem && item.hasAttribute("open")) {
          item.removeAttribute("open");
        }
      });
    }
  }

  private getItems(): HaAccordionItem[] {
    // slot経由で投影されている要素を取得する方が確実な場合もありますが、
    // ここでは簡易的に querySelectorAll を使用
    return Array.from(this.querySelectorAll("ha-accordion-item")) as HaAccordionItem[];
  }

  connectedCallback() {
    this.updateItems();
  }

  private updateItems() {
    const items = this.querySelectorAll("ha-accordion-item");
    const allowMultiple = this.hasAttribute("allow-multiple");

    items.forEach((item) => {
      // Set accordion reference on item
      (item as any).__accordion = this;

      // Handle item toggle
      item.addEventListener("accordion-toggle", ((e: CustomEvent) => {
        if (!allowMultiple && e.detail.open) {
          // Close other items
          items.forEach((otherItem) => {
            if (otherItem !== item && otherItem.hasAttribute("open")) {
              otherItem.removeAttribute("open");
            }
          });
        }
      }) as EventListener);
    });
  }

  get allowMultiple(): boolean {
    return this.hasAttribute("allow-multiple");
  }

  get collapsible(): boolean {
    // デフォルトは false (明示的に書かれない限り false 扱い) だが
    // StorybookやHTML標準のboolean属性の扱いに合わせる
    return this.hasAttribute("collapsible");
  }
}

/**
 * Accordion Item component
 *
 * @element ha-accordion-item
 *
 * @attr {boolean} open - Item open state
 * @attr {boolean} disabled - Disable the item
 * @attr {string} header - Header text
 *
 * @slot - Item content
 * @slot header - Header content (overrides header attribute)
 * @slot icon - Custom expand/collapse icon
 *
 * @fires accordion-toggle - Emitted when item is toggled
 * @fires accordion-open - Emitted when item is opened
 * @fires accordion-close - Emitted when item is closed
 *
 * @cssprop --ha-accordion-item-padding - Item padding
 *
 * @csspart item - The accordion item container
 * @csspart header - The header container
 * @csspart content - The content container
 * @csspart icon - The expand/collapse icon
 */
export class HaAccordionItem extends HTMLElement {
  private itemElement: HTMLDivElement;
  private headerElement: HTMLButtonElement;
  private headerSlot: HTMLSlotElement;
  private iconElement: HTMLSpanElement;
  private iconSlot: HTMLSlotElement;
  private contentElement: HTMLDivElement;
  private contentSlot: HTMLSlotElement;

  static get observedAttributes() {
    return ["open", "disabled", "header"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    // Create styles
    const style = document.createElement("style");
    style.textContent = accordionStyles;

    // Create item container
    this.itemElement = document.createElement("div");
    this.itemElement.className = "accordion-item";
    this.itemElement.setAttribute("part", "item");

    // Create header button
    // --- Header ---
    this.headerElement = document.createElement("button");
    this.headerElement.className = "accordion-item__header";
    this.headerElement.setAttribute("part", "header");
    this.headerElement.type = "button";
    this.headerElement.setAttribute("aria-expanded", "false");

    // Create header slot
    // Headerのテキスト処理
    // slotの中にデフォルト値を入れるだけで、属性がない場合のフォールバックになる
    // 属性の変更監視でここを書き換えるアプローチに変更
    const headerSlot = document.createElement("slot");
    headerSlot.name = "header";
    // デフォルト用のコンテナ
    const defaultHeaderSpan = document.createElement("span");
    defaultHeaderSpan.id = "default-header-text";
    headerSlot.appendChild(defaultHeaderSpan);
    this.headerElement.appendChild(headerSlot);

    // Create icon container
    // --- Icon ---
    const iconElement = document.createElement("span");
    iconElement.className = "accordion-item__icon";
    iconElement.setAttribute("part", "icon");
    iconElement.setAttribute("aria-hidden", "true");

    // Iconのフォールバック処理
    // JSによる監視を削除し、Slotのデフォルトコンテンツ機能を使用
    const iconSlot = document.createElement("slot");
    iconSlot.name = "icon";
    iconSlot.textContent = "▼"; // デフォルトアイコン
    iconElement.appendChild(iconSlot);

    this.headerElement.appendChild(iconElement);

    // Create content container
    // --- Content ---
    this.contentElement = document.createElement("div");
    this.contentElement.className = "accordion-item__content";
    this.contentElement.setAttribute("part", "content");
    this.contentElement.setAttribute("role", "region");

    const contentSlot = document.createElement("slot");
    this.contentElement.appendChild(contentSlot);

    // Append to item
    this.itemElement.appendChild(this.headerElement);
    this.itemElement.appendChild(this.contentElement);

    // Append to shadow root
    shadow.appendChild(style);
    shadow.appendChild(this.itemElement);

    // Handle click events
    this.headerElement.addEventListener("click", () => {
      if (!this.hasAttribute("disabled")) {
        this.toggle();
      }
    });
  }

  connectedCallback() {
    // header属性の初期値を反映
    this.updateHeaderText();
    // 初期状態の反映（アニメーションなしで即座に設定）
    this.updateState();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      if (name === "open") {
        this.updateState(true); // 属性変更時はアニメーションあり
      } else if (name === "disabled") {
        this.updateDisabled();
      } else if (name === "header") {
        this.updateHeaderText();
      }
    }
  }

  private updateState(animate: boolean = true) {
    const isOpen = this.hasAttribute("open");
    this.headerElement.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      this.itemElement.classList.add("accordion-item--open");
      // scrollHeightを取得して高さを設定
      const height = this.contentElement.scrollHeight;
      this.contentElement.style.maxHeight = `${height}px`;
      // アニメーション完了後に auto に戻す処理を入れるとより堅牢だが
      // 簡易実装として、開くときは scrollHeight をセット
    } else {
      this.itemElement.classList.remove("accordion-item--open");
      // 閉じる前に現在の高さをセットしないと transition が効かない場合があるため
      // CSS側で適切に transition: max-height ... が設定されている前提
      this.contentElement.style.maxHeight = "0";
    }
  }

  private updateDisabled() {
    const isDisabled = this.hasAttribute("disabled");
    this.headerElement.disabled = isDisabled;

    if (isDisabled) {
      this.itemElement.classList.add("accordion-item--disabled");
    } else {
      this.itemElement.classList.remove("accordion-item--disabled");
    }
  }

  private updateHeaderText() {
    // Check if header slot has content
    // Shadow DOM内のデフォルト表示用要素を探す
    const defaultSpan = this.shadowRoot?.querySelector("#default-header-text");
    if (defaultSpan) {
      // 属性があればそれをセット、なければ空（スロットが空なら何も表示されない）
      defaultSpan.textContent = this.getAttribute("header") || "";
    }
  }

  toggle() {
    if (this.hasAttribute("open")) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.hasAttribute("open")) {
      this.setAttribute("open", "");
      this.dispatchToggleEvent(true);
      // 'accordion-open' は冗長かもしれないが元の仕様通り残す
      this.dispatchEvent(
        new CustomEvent("accordion-open", {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  close() {
    if (this.hasAttribute("open")) {
      this.removeAttribute("open");
      this.dispatchEvent(
        new CustomEvent("accordion-toggle", {
          detail: { open: false },
          bubbles: true,
          composed: true,
        })
      );
      this.dispatchEvent(
        new CustomEvent("accordion-close", {
          bubbles: true,
          composed: true,
        })
      );
    }
  }
}

// Register the custom elements
if (!customElements.get("ha-accordion")) {
  customElements.define("ha-accordion", HaAccordion);
}

if (!customElements.get("ha-accordion-item")) {
  customElements.define("ha-accordion-item", HaAccordionItem);
}
