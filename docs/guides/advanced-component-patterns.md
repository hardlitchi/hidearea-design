# Advanced Component Patterns

Hidearea Design Systemで実装されている高度なコンポーネントパターンの完全ガイド。実装済みのパターンを理解し、独自のコンポーネント開発に活用できます。

## 目次

- [概要](#概要)
- [コンポーネント構成パターン](#コンポーネント構成パターン)
- [状態管理パターン](#状態管理パターン)
- [フォームパターン](#フォームパターン)
- [イベント処理パターン](#イベント処理パターン)
- [スロット・テンプレートパターン](#スロットテンプレートパターン)
- [アクセシビリティパターン](#アクセシビリティパターン)
- [パフォーマンスパターン](#パフォーマンスパターン)

## 概要

このガイドでは、Hidearea Design Systemで実装されている実践的なパターンを解説します。すべてのパターンは本番環境で使用されているコンポーネントから抽出したものです。

### パターンの分類

1. **構成パターン**: コンポーネントの組み合わせ方
2. **状態管理**: 状態の保持と更新方法
3. **フォーム**: フォームとバリデーション
4. **イベント**: カスタムイベントとハンドリング
5. **スロット**: コンテンツ投影とテンプレート
6. **アクセシビリティ**: ARIA、キーボード、フォーカス管理
7. **パフォーマンス**: メモリリークの防止と最適化

## コンポーネント構成パターン

### パターン1: 親子通信（Parent-Child Communication）

親コンポーネントが子コンポーネントを管理し、状態を同期するパターン。

#### 実装例: Accordion

**親コンポーネント (`HaAccordion`)**

```typescript
export class HaAccordion extends HTMLElement {
  private allowMultiple = false;

  connectedCallback() {
    // 子要素からのイベントをリッスン
    this.addEventListener('accordion-toggle', this.handleToggle);
  }

  private handleToggle = (e: Event) => {
    const customEvent = e as CustomEvent;
    const item = e.target as HaAccordionItem;

    // 単一モードの場合、他の項目を閉じる
    if (!this.allowMultiple && customEvent.detail.expanded) {
      this.getAllItems().forEach(otherItem => {
        if (otherItem !== item && otherItem.expanded) {
          otherItem.expanded = false;
        }
      });
    }
  };

  private getAllItems(): HaAccordionItem[] {
    // スロット内の子要素を取得
    const slot = this.shadowRoot?.querySelector('slot');
    return slot?.assignedElements() as HaAccordionItem[] || [];
  }
}
```

**子コンポーネント (`HaAccordionItem`)**

```typescript
export class HaAccordionItem extends HTMLElement {
  set expanded(value: boolean) {
    if (value) {
      this.setAttribute('expanded', '');
      // 親に通知
      this.dispatchEvent(new CustomEvent('accordion-toggle', {
        detail: { expanded: true },
        bubbles: true,
        composed: true  // Shadow DOM境界を超える
      }));
    } else {
      this.removeAttribute('expanded');
    }
  }

  get expanded(): boolean {
    return this.hasAttribute('expanded');
  }
}
```

**使用例**

```html
<ha-accordion allow-multiple="false">
  <ha-accordion-item>
    <span slot="header">Item 1</span>
    <div>Content 1</div>
  </ha-accordion-item>
  <ha-accordion-item>
    <span slot="header">Item 2</span>
    <div>Content 2</div>
  </ha-accordion-item>
</ha-accordion>
```

#### ポイント

- `composed: true` でShadow DOM境界を超えてイベントをバブリング
- 親は `addEventListener` で子のイベントをキャッチ
- スロットの `assignedElements()` で子要素にアクセス

### パターン2: プロパティ伝播（Property Propagation）

親が子に一括でプロパティを設定するパターン。

#### 実装例: Avatar Group

```typescript
export class HaAvatarGroup extends HTMLElement {
  private _size: 'sm' | 'md' | 'lg' = 'md';

  set size(value: 'sm' | 'md' | 'lg') {
    this._size = value;
    this.propagateSize();
  }

  connectedCallback() {
    // スロット変更時にサイズを伝播
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', () => {
      this.propagateSize();
      this.handleOverflow();
    });
  }

  private propagateSize() {
    const avatars = this.getAvatars();
    avatars.forEach(avatar => {
      avatar.size = this._size;
    });
  }

  private getAvatars(): HaAvatar[] {
    const slot = this.shadowRoot?.querySelector('slot');
    return slot?.assignedElements().filter(
      el => el.tagName === 'HA-AVATAR'
    ) as HaAvatar[] || [];
  }

  private handleOverflow() {
    const avatars = this.getAvatars();
    const max = this.max || avatars.length;

    avatars.forEach((avatar, index) => {
      avatar.style.display = index < max ? '' : 'none';
    });

    // オーバーフロー表示
    const remaining = avatars.length - max;
    if (remaining > 0) {
      this.showOverflow(remaining);
    }
  }
}
```

**使用例**

```html
<ha-avatar-group size="lg" max="3">
  <ha-avatar name="Alice" src="/alice.jpg"></ha-avatar>
  <ha-avatar name="Bob" src="/bob.jpg"></ha-avatar>
  <ha-avatar name="Charlie" src="/charlie.jpg"></ha-avatar>
  <ha-avatar name="David" src="/david.jpg"></ha-avatar>
  <!-- +1 と表示される -->
</ha-avatar-group>
```

### パターン3: フォームコンテナ（Form Container）

任意のフォームコントロールをラップして、統一されたスタイルを提供するパターン。

#### 実装例: Form Group

```typescript
export class HaFormGroup extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .form-group { display: flex; flex-direction: column; gap: var(--spacing-2); }
        .label { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); }
        .helper-text { font-size: var(--font-size-xs); color: var(--text-body-muted-color); }
        .error-text { font-size: var(--font-size-xs); color: var(--color-error-500); }
        .helper-text[hidden], .error-text[hidden] { display: none; }
      </style>
      <div class="form-group" part="form-group">
        <div class="label" part="label">
          <slot name="label">${this.getAttribute('label') || ''}</slot>
        </div>
        <div class="control" part="control">
          <slot></slot> <!-- フォームコントロール -->
        </div>
        <div class="helper-text" part="helper-text" ?hidden="${this.hasAttribute('error')}">
          <slot name="helper-text">${this.getAttribute('helper-text') || ''}</slot>
        </div>
        <div class="error-text" part="error-text" ?hidden="${!this.hasAttribute('error')}">
          <slot name="error-text">${this.getAttribute('error-text') || ''}</slot>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['label', 'helper-text', 'error-text', 'error'];
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }
}
```

**使用例**

```html
<ha-form-group
  label="Email Address"
  helper-text="We'll never share your email"
  error-text="Please enter a valid email">
  <ha-input
    type="email"
    name="email"
    required
    error></ha-input>
</ha-form-group>
```

## 状態管理パターン

### パターン4: 属性ベース状態管理（Attribute-Based State）

Web Componentsの標準的な状態管理パターン。

```typescript
export class HaCheckbox extends HTMLElement {
  // 監視する属性
  static get observedAttributes() {
    return ['checked', 'disabled', 'indeterminate', 'required', 'name', 'value'];
  }

  // Getter/Setterで属性とプロパティを同期
  get checked(): boolean {
    return this.hasAttribute('checked');
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  // 属性変更時の処理
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return; // 重複更新を防ぐ

    switch (name) {
      case 'checked':
        this.updateCheckboxState();
        this.dispatchChangeEvent();
        break;
      case 'disabled':
        this.updateDisabledState();
        break;
      // ... 他の属性
    }
  }

  private updateCheckboxState() {
    const input = this.shadowRoot?.querySelector('input');
    if (input) {
      input.checked = this.checked;
      // ARIAも更新
      input.setAttribute('aria-checked', String(this.checked));
    }
  }
}
```

### パターン5: プライベート状態（Private UI State）

UIインタラクションに関する一時的な状態を管理。

```typescript
export class HaTooltip extends HTMLElement {
  // プライベート状態（属性として公開しない）
  private _isVisible = false;
  private _showTimeout: number | null = null;
  private _hideTimeout: number | null = null;
  private _tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  show() {
    // 既存のタイマーをクリア
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }

    // 遅延表示
    this._showTimeout = window.setTimeout(() => {
      this._isVisible = true;
      this.tooltipContent.classList.add('visible');

      // カスタムイベント発火
      this.dispatchEvent(new CustomEvent('show', {
        detail: { id: this._tooltipId },
        bubbles: true,
        composed: true
      }));
    }, this.delay);
  }

  hide() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }

    this._hideTimeout = window.setTimeout(() => {
      this._isVisible = false;
      this.tooltipContent.classList.remove('visible');

      this.dispatchEvent(new CustomEvent('hide', {
        detail: { id: this._tooltipId },
        bubbles: true,
        composed: true
      }));
    }, 100);
  }

  disconnectedCallback() {
    // メモリリーク防止
    if (this._showTimeout) clearTimeout(this._showTimeout);
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
  }
}
```

### パターン6: 複雑な状態管理（Complex State）

複数のデータ項目を管理するパターン。

```typescript
interface FileUploadFile {
  id: string;
  file: File;
  preview?: string;
  error?: string;
  uploading?: boolean;
}

export class HaFileUpload extends HTMLElement {
  private files: FileUploadFile[] = [];
  private _dragCounter = 0; // ネストされたドラッグイベント対策

  private async handleFiles(fileList: FileList) {
    const newFiles = Array.from(fileList);

    for (const file of newFiles) {
      // バリデーション
      const error = this.validateFile(file);

      const fileData: FileUploadFile = {
        id: this.generateId(),
        file,
        error
      };

      // 画像の場合はプレビュー生成
      if (file.type.startsWith('image/')) {
        fileData.preview = await this.generatePreview(file);
      }

      this.files.push(fileData);
    }

    this.render();
    this.dispatchChangeEvent();
  }

  private validateFile(file: File): string | undefined {
    // サイズチェック
    if (this.maxSize && file.size > this.maxSize) {
      return `File size exceeds ${this.formatFileSize(this.maxSize)}`;
    }

    // 数チェック
    if (this.maxFiles && this.files.length >= this.maxFiles) {
      return `Maximum ${this.maxFiles} files allowed`;
    }

    // タイプチェック
    if (this.accept) {
      const acceptedTypes = this.accept.split(',').map(t => t.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.replace('/*', '/'));
        }
        return file.type === type || file.name.endsWith(type);
      });

      if (!isAccepted) {
        return 'File type not accepted';
      }
    }
  }

  private removeFile(id: string) {
    const index = this.files.findIndex(f => f.id === id);
    if (index > -1) {
      // プレビューURLを解放（メモリリーク防止）
      if (this.files[index].preview) {
        URL.revokeObjectURL(this.files[index].preview!);
      }
      this.files.splice(index, 1);
      this.render();
      this.dispatchChangeEvent();
    }
  }
}
```

## フォームパターン

### パターン7: ネイティブフォーム統合（Native Form Integration）

Web ComponentsをネイティブHTMLフォームと統合するパターン。

```typescript
export class HaInput extends HTMLElement {
  private input!: HTMLInputElement;

  connectedCallback() {
    this.render();
    this.setupFormIntegration();
  }

  private render() {
    this.shadowRoot!.innerHTML = `
      <div class="input-wrapper">
        <slot name="prefix"></slot>
        <input
          type="${this.type}"
          name="${this.name}"
          value="${this.value}"
          ?required="${this.required}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          placeholder="${this.placeholder}"
          maxlength="${this.maxlength}"
          minlength="${this.minlength}"
          pattern="${this.pattern}"
          part="input"
        />
        <slot name="suffix"></slot>
      </div>
    `;

    this.input = this.shadowRoot!.querySelector('input')!;
  }

  private setupFormIntegration() {
    // ネイティブイベントをバブリング
    this.input.addEventListener('input', (e) => {
      this.value = this.input.value;

      // カスタムイベントを発火
      this.dispatchEvent(new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
    });

    this.input.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
    });
  }

  // フォームバリデーションAPI
  checkValidity(): boolean {
    return this.input.checkValidity();
  }

  reportValidity(): boolean {
    return this.input.reportValidity();
  }

  setCustomValidity(message: string): void {
    this.input.setCustomValidity(message);
  }

  get validity(): ValidityState {
    return this.input.validity;
  }

  get validationMessage(): string {
    return this.input.validationMessage;
  }
}
```

**使用例**

```html
<form id="myForm">
  <ha-input
    name="username"
    required
    minlength="3"
    maxlength="20"
    pattern="[a-zA-Z0-9]+"
  ></ha-input>

  <ha-input
    name="email"
    type="email"
    required
  ></ha-input>

  <button type="submit">Submit</button>
</form>

<script>
  const form = document.getElementById('myForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('ha-input');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.reportValidity();
        isValid = false;
      }
    });

    if (isValid) {
      // フォーム送信
      const formData = new FormData(form);
      console.log(Object.fromEntries(formData));
    }
  });
</script>
```

### パターン8: カスタムバリデーション（Custom Validation）

独自のバリデーションロジックを実装するパターン。

```typescript
export class HaPasswordInput extends HTMLElement {
  private input!: HTMLInputElement;

  validatePassword(): boolean {
    const value = this.value;
    const requirements = {
      minLength: value.length >= 8,
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[!@#$%^&*]/.test(value)
    };

    const isValid = Object.values(requirements).every(Boolean);

    if (!isValid) {
      const messages = [];
      if (!requirements.minLength) messages.push('at least 8 characters');
      if (!requirements.hasUpperCase) messages.push('an uppercase letter');
      if (!requirements.hasLowerCase) messages.push('a lowercase letter');
      if (!requirements.hasNumber) messages.push('a number');
      if (!requirements.hasSpecial) messages.push('a special character');

      this.setCustomValidity(`Password must contain ${messages.join(', ')}`);
    } else {
      this.setCustomValidity('');
    }

    // バリデーション状態を視覚的に表示
    this.updateRequirements(requirements);

    return isValid;
  }

  private updateRequirements(requirements: Record<string, boolean>) {
    const indicators = this.shadowRoot!.querySelectorAll('.requirement');
    indicators.forEach((indicator, index) => {
      const key = Object.keys(requirements)[index];
      indicator.classList.toggle('met', requirements[key]);
    });
  }
}
```

## イベント処理パターン

### パターン9: カスタムイベントの発行（Custom Event Dispatching）

コンポーネント間通信のためのイベントパターン。

```typescript
export class HaTabs extends HTMLElement {
  set active(value: string) {
    const oldValue = this._active;
    this._active = value;

    // tab-changeイベントを発火
    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: {
        value,        // 新しいタブ
        oldValue,     // 前のタブ
        timestamp: Date.now()
      },
      bubbles: true,      // 親要素に伝播
      composed: true,     // Shadow DOM境界を超える
      cancelable: false   // preventDefault()不可
    }));

    this.updateTabs();
  }

  private updateTabs() {
    const tabs = this.getAllTabs();
    const panels = this.getAllPanels();

    tabs.forEach((tab, index) => {
      const isActive = tab.value === this._active;
      tab.active = isActive;

      // 対応するパネルも更新
      if (panels[index]) {
        panels[index].active = isActive;
      }
    });
  }
}
```

**使用例**

```html
<ha-tabs active="tab1" id="myTabs">
  <ha-tab-item value="tab1">Tab 1</ha-tab-item>
  <ha-tab-item value="tab2">Tab 2</ha-tab-item>
</ha-tabs>

<ha-tab-panel value="tab1">Panel 1</ha-tab-panel>
<ha-tab-panel value="tab2">Panel 2</ha-tab-panel>

<script>
  const tabs = document.getElementById('myTabs');

  tabs.addEventListener('tab-change', (e) => {
    console.log('Tab changed:', e.detail.value);
    console.log('Previous tab:', e.detail.oldValue);

    // アナリティクス送信など
    trackEvent('tab_change', {
      tab: e.detail.value,
      timestamp: e.detail.timestamp
    });
  });
</script>
```

### パターン10: イベントハンドラ管理（Event Handler Management）

メモリリークを防ぐイベントハンドラの適切な管理。

```typescript
export class HaTooltip extends HTMLElement {
  private trigger!: HTMLElement;
  private content!: HTMLElement;

  // バインドされたハンドラを保持
  private boundHandlers = {
    show: this.show.bind(this),
    hide: this.hide.bind(this),
    handleClick: this.handleClick.bind(this),
    handleKeydown: this.handleKeydown.bind(this)
  };

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.detachEventListeners();

    // タイマーのクリア
    if (this._showTimeout) clearTimeout(this._showTimeout);
    if (this._hideTimeout) clearTimeout(this._hideTimeout);
  }

  private attachEventListeners() {
    if (this.trigger === 'hover') {
      this.addEventListener('mouseenter', this.boundHandlers.show);
      this.addEventListener('mouseleave', this.boundHandlers.hide);
      this.addEventListener('focus', this.boundHandlers.show);
      this.addEventListener('blur', this.boundHandlers.hide);
    } else if (this.trigger === 'click') {
      this.addEventListener('click', this.boundHandlers.handleClick);
      document.addEventListener('keydown', this.boundHandlers.handleKeydown);
    }
  }

  private detachEventListeners() {
    // すべてのイベントリスナーを削除
    this.removeEventListener('mouseenter', this.boundHandlers.show);
    this.removeEventListener('mouseleave', this.boundHandlers.hide);
    this.removeEventListener('focus', this.boundHandlers.show);
    this.removeEventListener('blur', this.boundHandlers.hide);
    this.removeEventListener('click', this.boundHandlers.handleClick);
    document.removeEventListener('keydown', this.boundHandlers.handleKeydown);
  }

  private handleKeydown(e: KeyboardEvent) {
    // Escapeで閉じる
    if (e.key === 'Escape' && this._isVisible) {
      this.hide();
      e.preventDefault();
    }
  }
}
```

## スロット・テンプレートパターン

### パターン11: 名前付きスロット（Named Slots）

柔軟なコンテンツ投影のためのパターン。

```typescript
export class HaCard extends HTMLElement {
  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        .card {
          display: flex;
          flex-direction: column;
          background: var(--component-card-background-default);
          border-radius: var(--component-card-border-radius);
          overflow: hidden;
        }

        .media { flex-shrink: 0; }
        .header { padding: var(--spacing-4); border-bottom: 1px solid var(--surface-base-border); }
        .body { padding: var(--spacing-4); flex: 1; }
        .footer { padding: var(--spacing-4); border-top: 1px solid var(--surface-base-border); }

        /* スロットが空の場合は非表示 */
        .media:not(:has(*)) { display: none; }
        .header:not(:has(*)) { display: none; }
        .footer:not(:has(*)) { display: none; }
      </style>

      <div class="card" part="card">
        <div class="media" part="media">
          <slot name="media"></slot>
        </div>
        <div class="header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="body" part="body">
          <slot></slot> <!-- デフォルトスロット -->
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}
```

**使用例**

```html
<!-- フルカスタマイズ -->
<ha-card>
  <img slot="media" src="/hero.jpg" alt="Hero">
  <h3 slot="header">Card Title</h3>
  <p>Card content goes here.</p>
  <div slot="footer">
    <ha-button variant="primary">Action</ha-button>
    <ha-button variant="ghost">Cancel</ha-button>
  </div>
</ha-card>

<!-- シンプル版 -->
<ha-card>
  <h3 slot="header">Simple Card</h3>
  <p>Just header and content.</p>
</ha-card>
```

### パターン12: スロットフォールバック（Slot Fallback）

スロットが空の場合に属性値を使用するパターン。

```typescript
export class HaFormGroup extends HTMLElement {
  private render() {
    const labelSlot = document.createElement('slot');
    labelSlot.name = 'label';

    // スロット変更を監視
    labelSlot.addEventListener('slotchange', () => {
      this.updateLabelFallback();
    });

    this.labelContainer.appendChild(labelSlot);
    this.updateLabelFallback();
  }

  private updateLabelFallback() {
    const labelSlot = this.shadowRoot!.querySelector('slot[name="label"]') as HTMLSlotElement;
    const hasSlotContent = labelSlot.assignedNodes().length > 0;

    if (!hasSlotContent) {
      // スロットが空の場合、属性値を使用
      const labelText = this.getAttribute('label');
      if (labelText) {
        const textNode = document.createTextNode(labelText);
        this.labelContainer.insertBefore(textNode, labelSlot);
      }
    } else {
      // スロットに内容がある場合、フォールバックテキストを削除
      const textNodes = Array.from(this.labelContainer.childNodes).filter(
        node => node.nodeType === Node.TEXT_NODE
      );
      textNodes.forEach(node => node.remove());
    }
  }
}
```

**使用例**

```html
<!-- 属性でラベル指定 -->
<ha-form-group label="Email Address">
  <ha-input type="email"></ha-input>
</ha-form-group>

<!-- スロットでカスタムラベル -->
<ha-form-group>
  <span slot="label">
    Email Address <span class="required">*</span>
  </span>
  <ha-input type="email"></ha-input>
</ha-form-group>
```

### パターン13: 動的スロット（Dynamic Slots）

条件に応じてスロットを動的に作成・削除するパターン。

```typescript
export class HaModal extends HTMLElement {
  private renderContent() {
    if (!this.open) {
      // 閉じている場合はクリア
      this.shadowRoot!.innerHTML = '';
      return;
    }

    this.shadowRoot!.innerHTML = `
      <style>/* スタイル */</style>

      <div class="modal-overlay" part="overlay">
        <div class="modal" role="dialog" aria-modal="true" part="modal">
          ${this.hasHeaderSlot ? `
            <div class="modal-header" part="header">
              <slot name="header"></slot>
              <button class="close-button" aria-label="Close">✕</button>
            </div>
          ` : ''}

          <div class="modal-body" part="body">
            <slot></slot>
          </div>

          ${this.hasFooterSlot ? `
            <div class="modal-footer" part="footer">
              <slot name="footer"></slot>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private get hasHeaderSlot(): boolean {
    return this.querySelector('[slot="header"]') !== null;
  }

  private get hasFooterSlot(): boolean {
    return this.querySelector('[slot="footer"]') !== null;
  }
}
```

## アクセシビリティパターン

これらのパターンは [Accessibility Guide](./accessibility-guide.md) で詳しく解説されています。ここでは実装例を示します。

### パターン14: フォーカストラップ（Focus Trap）

モーダル内でフォーカスを閉じ込めるパターン。

```typescript
export class HaModal extends HTMLElement {
  private previousActiveElement: HTMLElement | null = null;

  open() {
    this._open = true;
    this.render();

    // 現在のフォーカスを保存
    this.saveFocus();

    // フォーカストラップを有効化
    requestAnimationFrame(() => {
      this.trapFocus();
      this.attachKeyboardListeners();
    });
  }

  close() {
    this._open = false;
    this.detachKeyboardListeners();

    // フォーカスを復元
    this.restoreFocus();

    this.render();
  }

  private saveFocus() {
    this.previousActiveElement = document.activeElement as HTMLElement;
  }

  private restoreFocus() {
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }

  private trapFocus() {
    const focusableElements = this.getFocusableElements();

    if (focusableElements.length > 0) {
      // 最初のフォーカス可能な要素にフォーカス
      focusableElements[0].focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const selectors = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(
      this.shadowRoot!.querySelectorAll(selectors)
    ) as HTMLElement[];
  }

  private handleTabKey(e: KeyboardEvent) {
    const focusable = this.getFocusableElements();
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (e.shiftKey) {
      // Shift + Tab: 後方
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      // Tab: 前方
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }

  private attachKeyboardListeners() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  private detachKeyboardListeners() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.dismissible) {
      this.close();
      e.preventDefault();
    } else if (e.key === 'Tab') {
      this.handleTabKey(e);
    }
  };
}
```

### パターン15: キーボードナビゲーション（Keyboard Navigation）

矢印キーでの移動を実装するパターン。

```typescript
export class HaTabs extends HTMLElement {
  connectedCallback() {
    this.addEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (e: KeyboardEvent) => {
    const tabs = this.getAllTabs();
    const currentIndex = tabs.findIndex(tab => tab === document.activeElement);

    if (currentIndex === -1) return;

    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        // 前のタブへ
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
          newIndex = tabs.length - 1; // 最後にループ
        }
        e.preventDefault();
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        // 次のタブへ
        newIndex = currentIndex + 1;
        if (newIndex >= tabs.length) {
          newIndex = 0; // 最初にループ
        }
        e.preventDefault();
        break;

      case 'Home':
        // 最初のタブへ
        newIndex = 0;
        e.preventDefault();
        break;

      case 'End':
        // 最後のタブへ
        newIndex = tabs.length - 1;
        e.preventDefault();
        break;

      default:
        return;
    }

    // フォーカスを移動
    tabs[newIndex].focus();

    // オプション: 自動でタブを切り替える
    if (this.activateOnFocus) {
      this.active = tabs[newIndex].value;
    }
  };

  private getAllTabs(): HaTabItem[] {
    const slot = this.shadowRoot?.querySelector('slot');
    return slot?.assignedElements().filter(
      el => el.tagName === 'HA-TAB-ITEM'
    ) as HaTabItem[] || [];
  }
}
```

### パターン16: ARIAの動的更新（Dynamic ARIA）

状態に応じてARIA属性を更新するパターン。

```typescript
export class HaAccordionItem extends HTMLElement {
  set expanded(value: boolean) {
    this._expanded = value;

    if (value) {
      this.setAttribute('expanded', '');
    } else {
      this.removeAttribute('expanded');
    }

    this.updateAria();
    this.updateVisibility();
  }

  private updateAria() {
    const button = this.shadowRoot!.querySelector('button');
    const content = this.shadowRoot!.querySelector('.content');

    if (button && content) {
      // aria-expanded を更新
      button.setAttribute('aria-expanded', String(this._expanded));

      // aria-controls で関連付け
      const contentId = this.generateId();
      button.setAttribute('aria-controls', contentId);
      content.id = contentId;

      // コンテンツのaria-hidden
      content.setAttribute('aria-hidden', String(!this._expanded));
    }
  }

  private generateId(): string {
    return `accordion-content-${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

## パフォーマンスパターン

### パターン17: メモリリーク防止（Memory Leak Prevention）

リソースを適切にクリーンアップするパターン。

```typescript
export class HaFileUpload extends HTMLElement {
  private files: FileUploadFile[] = [];
  private objectUrls: string[] = [];

  private async generatePreview(file: File): Promise<string> {
    const url = URL.createObjectURL(file);
    this.objectUrls.push(url);
    return url;
  }

  private removeFile(id: string) {
    const index = this.files.findIndex(f => f.id === id);
    if (index > -1) {
      const file = this.files[index];

      // Object URLを解放
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
        const urlIndex = this.objectUrls.indexOf(file.preview);
        if (urlIndex > -1) {
          this.objectUrls.splice(urlIndex, 1);
        }
      }

      this.files.splice(index, 1);
      this.render();
    }
  }

  disconnectedCallback() {
    // すべてのObject URLを解放
    this.objectUrls.forEach(url => {
      URL.revokeObjectURL(url);
    });
    this.objectUrls = [];
    this.files = [];
  }
}
```

### パターン18: 効率的なDOM更新（Efficient DOM Updates）

不要な再レンダリングを避けるパターン。

```typescript
export class HaProgress extends HTMLElement {
  private bar!: HTMLElement;
  private label!: HTMLElement;

  static get observedAttributes() {
    return ['value', 'max', 'label'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return; // 変更がない場合はスキップ

    switch (name) {
      case 'value':
      case 'max':
        // プログレスバーのみ更新（フルレンダリングしない）
        this.updateProgress();
        break;
      case 'label':
        // ラベルのみ更新
        this.updateLabel();
        break;
    }
  }

  private updateProgress() {
    if (!this.bar) return;

    const percent = (this.value / this.max) * 100;
    this.bar.style.width = `${percent}%`;
    this.bar.setAttribute('aria-valuenow', String(this.value));
    this.bar.setAttribute('aria-valuemax', String(this.max));
  }

  private updateLabel() {
    if (!this.label) return;

    this.label.textContent = this.getAttribute('label') || '';
  }
}
```

### パターン19: 遅延初期化（Lazy Initialization）

必要になるまで重い処理を遅延するパターン。

```typescript
export class HaDataGrid extends HTMLElement {
  private _initialized = false;
  private _intersectionObserver?: IntersectionObserver;

  connectedCallback() {
    // Intersection Observerで可視性を監視
    this.setupLazyInit();
  }

  private setupLazyInit() {
    this._intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this._initialized) {
          this.initialize();
          this._initialized = true;
          // 初期化後は監視不要
          this._intersectionObserver?.disconnect();
        }
      });
    });

    this._intersectionObserver.observe(this);
  }

  private initialize() {
    // 重い初期化処理
    this.loadData();
    this.setupVirtualScrolling();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this._intersectionObserver?.disconnect();
  }
}
```

## まとめ

これらのパターンは、Hidearea Design Systemの本番コンポーネントから抽出した実証済みのパターンです：

### 主要なパターン

1. **コンポーネント構成**
   - 親子通信（Accordion, Tabs）
   - プロパティ伝播（Avatar Group）
   - フォームコンテナ（Form Group）

2. **状態管理**
   - 属性ベース状態
   - プライベートUI状態
   - 複雑な状態管理（File Upload）

3. **フォーム**
   - ネイティブフォーム統合
   - カスタムバリデーション

4. **イベント**
   - カスタムイベント発行
   - イベントハンドラ管理

5. **スロット**
   - 名前付きスロット
   - スロットフォールバック
   - 動的スロット

6. **アクセシビリティ**
   - フォーカストラップ
   - キーボードナビゲーション
   - 動的ARIA更新

7. **パフォーマンス**
   - メモリリーク防止
   - 効率的DOM更新
   - 遅延初期化

### 次のステップ

- [Accessibility Guide](./accessibility-guide.md) - アクセシビリティの詳細
- [Performance Optimization](./performance-optimization.md) - パフォーマンス最適化
- [Component Documentation](../components/) - 各コンポーネントのAPI

これらのパターンを組み合わせることで、堅牢で保守性の高いWeb Componentsを構築できます。
