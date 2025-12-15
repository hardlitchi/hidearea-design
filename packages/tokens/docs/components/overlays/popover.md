# Popover (ポップオーバー) コンポーネント

**カテゴリ:** Overlays
**ファイル:** `src/css/components/overlays/popover.css`
**ステータス:** ✅ 実装済み

---

## 概要

ポップオーバーコンポーネントは、トリガー要素に対してインタラクティブな吹き出しを表示するUIです。ツールチップよりも複雑な内容を表示でき、クリックやフォーカスで開き、インタラクティブな要素を含めることができます。

### 用途

- 詳細情報の表示
- フォームやアクションの表示
- 追加オプションの提供
- ヘルプコンテンツ
- 確認プロンプト
- 設定パネル

### 特徴

- 矢印付きの吹き出しデザイン
- 3つのサイズバリアント（small、default、large）
- 4方向の配置（上、下、左、右）
- インタラクティブな要素を含められる
- 自動位置調整
- クリックまたはフォーカスで開閉

---

## サイズバリアント

### Small (240px)

**用途:** 簡単な説明、短いヘルプテキスト

```html
<div class="popover popover-small">
  <p>簡単な説明文</p>
</div>
```

### Default (320px)

**用途:** 標準的な内容、小さなフォーム

```html
<div class="popover popover-default">
  <h3>タイトル</h3>
  <p>標準的な内容がここに入ります。</p>
</div>
```

### Large (480px)

**用途:** 詳細な内容、複雑なフォーム

```html
<div class="popover popover-large">
  <form>
    <!-- フォーム要素 -->
  </form>
</div>
```

---

## トークン一覧

### サイズ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.width.small` | `240px` | 小サイズ - 簡単な説明 |
| `component.popover.width.default` | `320px` | デフォルトサイズ - 標準的な内容 |
| `component.popover.width.large` | `480px` | 大サイズ - 詳細な内容やフォーム |
| `component.popover.maxWidth` | `90vw` | 画面幅の90%まで |
| `component.popover.minWidth` | `200px` | 最小幅 |
| `component.popover.maxHeight` | `480px` | 最大高さ |

### スペーシング

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.padding` | `{spacing.4}` | 内部パディング (16px) |
| `component.popover.gap` | `{spacing.3}` | 要素間の間隔 (12px) |

### 背景

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.background.default` | `{background.primary}` | ポップオーバー背景色 |

### ボーダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.border.width` | `{border.width.1}` | ボーダー幅 (1px) |
| `component.popover.border.radius` | `{border.radius.md}` | 角丸 (6px) |
| `component.popover.border.color` | `{border.default}` | ボーダー色 |

### シャドウとZ-index

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.shadow` | `{shadow.lg}` | 大きめの影 |
| `component.popover.zIndex` | `1100` | ポップオーバーのz-index（モーダルより上） |

### 矢印（Arrow）

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.arrow.size` | `{spacing.2}` | 矢印サイズ (8px) |
| `component.popover.arrow.background` | `{background.primary}` | 矢印背景色 |
| `component.popover.arrow.border.width` | `{border.width.1}` | 矢印ボーダー幅 (1px) |
| `component.popover.arrow.border.color` | `{border.default}` | 矢印ボーダー色 |
| `component.popover.arrow.offset` | `{spacing.3}` | 矢印のオフセット (12px) |

### ヘッダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.header.padding` | `{spacing.4}` | ヘッダーパディング (16px) |
| `component.popover.header.borderBottom` | `1px solid {border.default}` | ヘッダー下ボーダー |

#### タイトル

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.header.title.fontSize` | `{font.size.base}` | タイトル文字サイズ (16px) |
| `component.popover.header.title.fontWeight` | `{font.weight.semibold}` | タイトル太さ (600) |
| `component.popover.header.title.lineHeight` | `{font.lineHeight.tight}` | 行高 |
| `component.popover.header.title.color` | `{foreground.primary}` | タイトル色 |

### ボディ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.body.padding` | `{spacing.4}` | ボディパディング (16px) |
| `component.popover.body.fontSize` | `{font.size.sm}` | ボディ文字サイズ (14px) |
| `component.popover.body.lineHeight` | `{font.lineHeight.relaxed}` | 行高 |
| `component.popover.body.color` | `{foreground.secondary}` | ボディ色 |
| `component.popover.body.maxHeight` | `320px` | ボディ最大高さ |
| `component.popover.body.overflow` | `auto` | スクロール可能 |

### フッター

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.footer.padding` | `{spacing.4}` | フッターパディング (16px) |
| `component.popover.footer.borderTop` | `1px solid {border.default}` | フッター上ボーダー |
| `component.popover.footer.gap` | `{spacing.2}` | ボタン間の間隔 (8px) |
| `component.popover.footer.justifyContent` | `flex-end` | ボタンを右寄せ |

### 閉じるボタン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.closeButton.size` | `{spacing.6}` | 閉じるボタンサイズ (24px) |
| `component.popover.closeButton.position.top` | `{spacing.2}` | 上からの位置 (8px) |
| `component.popover.closeButton.position.right` | `{spacing.2}` | 右からの位置 (8px) |
| `component.popover.closeButton.background.default` | `transparent` | デフォルト背景 - 透明 |
| `component.popover.closeButton.background.hover` | `{background.secondary}` | ホバー時背景 |
| `component.popover.closeButton.color.default` | `{foreground.tertiary}` | デフォルト色 |
| `component.popover.closeButton.color.hover` | `{foreground.primary}` | ホバー時色 |
| `component.popover.closeButton.borderRadius` | `{border.radius.sm}` | 角丸 (4px) |

### オフセット

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.offset.default` | `{spacing.2}` | デフォルトオフセット (8px) |
| `component.popover.offset.withArrow` | `{spacing.3}` | 矢印付きオフセット (12px) |

### アニメーション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.animation.duration` | `{animation.duration.fast}` | アニメーション時間 (0.15s) |
| `component.popover.animation.timing` | `{animation.easing.easeOut}` | イージング |
| `component.popover.animation.enter.top` | `transform: translateY(-8px); opacity: 0` | 上から出現 |
| `component.popover.animation.enter.bottom` | `transform: translateY(8px); opacity: 0` | 下から出現 |
| `component.popover.animation.enter.left` | `transform: translateX(-8px); opacity: 0` | 左から出現 |
| `component.popover.animation.enter.right` | `transform: translateX(8px); opacity: 0` | 右から出現 |

### トランジション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.transition.duration` | `{animation.duration.fast}` | トランジション時間 (0.15s) |
| `component.popover.transition.timing` | `{animation.easing.ease}` | イージング |
| `component.popover.transition.properties` | `background-color, color, border-color, opacity, transform` | トランジション対象 |

### インタラクティブ設定

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.interactive.cursor` | `auto` | ポインターカーソル |
| `component.popover.interactive.focusRing.width` | `2px` | フォーカスリング幅 |
| `component.popover.interactive.focusRing.offset` | `2px` | フォーカスリングオフセット |
| `component.popover.interactive.focusRing.color` | `{primary.default}` | フォーカスリング色 |

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

#### CSSファイルの読み込み

```html
<link rel="stylesheet" href="@hidearea-design/tokens/build/css/html/overlays/popover.css">
```

#### 基本的な構造

Popover コンポーネントは `.ha-popover` をルート要素とし、`open` 属性で表示・非表示を制御します。

```html
<div class="ha-popover" open placement="bottom">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-header">
      <h3 class="popover-title">ポップオーバーのタイトル</h3>
      <button class="popover-close" aria-label="閉じる">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
    </div>
    <div class="popover-body">
      ここにポップオーバーのコンテンツを配置します。
    </div>
  </div>
</div>
```

#### 配置バリアント

Popover は12の配置方向をサポートしています。

**Top（上）**

```html
<div class="ha-popover" open placement="top">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">上に表示されます</div>
  </div>
</div>
```

**Top Start（上左）**

```html
<div class="ha-popover" open placement="top-start">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">上左に表示されます</div>
  </div>
</div>
```

**Top End（上右）**

```html
<div class="ha-popover" open placement="top-end">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">上右に表示されます</div>
  </div>
</div>
```

**Bottom（下）**

```html
<div class="ha-popover" open placement="bottom">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">下に表示されます</div>
  </div>
</div>
```

**Bottom Start（下左）**

```html
<div class="ha-popover" open placement="bottom-start">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">下左に表示されます</div>
  </div>
</div>
```

**Bottom End（下右）**

```html
<div class="ha-popover" open placement="bottom-end">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">下右に表示されます</div>
  </div>
</div>
```

**Left（左）**

```html
<div class="ha-popover" open placement="left">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">左に表示されます</div>
  </div>
</div>
```

**Right（右）**

```html
<div class="ha-popover" open placement="right">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">右に表示されます</div>
  </div>
</div>
```

#### サイズバリアント

3つのサイズが用意されています。

**Small（240px）**

```html
<div class="ha-popover" open placement="bottom" size="sm">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">Small サイズのポップオーバー</div>
  </div>
</div>
```

**Medium（320px - デフォルト）**

```html
<div class="ha-popover" open placement="bottom" size="md">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">Medium サイズのポップオーバー</div>
  </div>
</div>
```

**Large（480px）**

```html
<div class="ha-popover" open placement="bottom" size="lg">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-body">Large サイズのポップオーバー</div>
  </div>
</div>
```

#### ヘッダーとフッター付き

```html
<div class="ha-popover" open placement="bottom">
  <div class="popover-content">
    <div class="popover-arrow"></div>
    <div class="popover-header">
      <h3 class="popover-title">アカウント設定</h3>
      <button class="popover-close" aria-label="閉じる">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
    </div>
    <div class="popover-body">
      プロフィール情報を更新しますか?
    </div>
    <div class="popover-footer">
      <button class="button button-secondary">キャンセル</button>
      <button class="button button-primary">更新</button>
    </div>
  </div>
</div>
```

#### JavaScript による制御

Popover の開閉と位置制御を実装するコントローラークラス:

```javascript
class PopoverController {
  constructor(popoverElement, triggerElement) {
    this.popover = popoverElement;
    this.trigger = triggerElement;
    this.content = popoverElement.querySelector('.popover-content');
    this.closeButton = popoverElement.querySelector('.popover-close');

    this.init();
  }

  init() {
    // トリガーボタンのクリックイベント
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // 閉じるボタンのイベント
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => {
        this.close();
      });
    }

    // 外部クリックで閉じる
    document.addEventListener('click', (e) => {
      if (this.isOpen() &&
          !this.popover.contains(e.target) &&
          !this.trigger.contains(e.target)) {
        this.close();
      }
    });

    // Escキーで閉じる
    this.handleEscape = (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
        this.trigger.focus();
      }
    };

    document.addEventListener('keydown', this.handleEscape);
  }

  open() {
    this.popover.setAttribute('open', '');
    this.trigger.setAttribute('aria-expanded', 'true');
    this.updatePosition();
  }

  close() {
    this.popover.removeAttribute('open');
    this.trigger.setAttribute('aria-expanded', 'false');
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  isOpen() {
    return this.popover.hasAttribute('open');
  }

  updatePosition() {
    const placement = this.popover.getAttribute('placement') || 'bottom';
    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverRect = this.content.getBoundingClientRect();

    let top, left;

    // 配置方向に応じた位置計算
    switch (placement) {
      case 'top':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'top-start':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left;
        break;
      case 'top-end':
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.right - popoverRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + 8;
        left = triggerRect.left;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + 8;
        left = triggerRect.right - popoverRect.width;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left - popoverRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + 8;
        break;
      default:
        top = triggerRect.bottom + 8;
        left = triggerRect.left;
    }

    // ビューポート内に収まるように調整
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = 8;
    if (left + popoverRect.width > viewportWidth) {
      left = viewportWidth - popoverRect.width - 8;
    }

    if (top < 0) top = 8;
    if (top + popoverRect.height > viewportHeight) {
      top = viewportHeight - popoverRect.height - 8;
    }

    this.content.style.position = 'fixed';
    this.content.style.top = `${top}px`;
    this.content.style.left = `${left}px`;
  }

  destroy() {
    document.removeEventListener('keydown', this.handleEscape);
  }
}

// 使用例
const popover = document.querySelector('.ha-popover');
const trigger = document.querySelector('#popover-trigger');
const controller = new PopoverController(popover, trigger);
```

#### アクセシビリティ

Popover は ARIA 属性を適切に設定する必要があります:

**必須の ARIA 属性**

```html
<!-- トリガーボタン -->
<button
  id="popover-trigger"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="popover-content">
  詳細を表示
</button>

<!-- ポップオーバー -->
<div class="ha-popover">
  <div
    id="popover-content"
    class="popover-content"
    role="dialog"
    aria-labelledby="popover-title">

    <div class="popover-arrow" aria-hidden="true"></div>

    <div class="popover-header">
      <h3 id="popover-title" class="popover-title">
        タイトル
      </h3>
      <button class="popover-close" aria-label="ポップオーバーを閉じる">
        <svg aria-hidden="true" width="20" height="20">×</svg>
      </button>
    </div>

    <div class="popover-body">
      コンテンツ
    </div>
  </div>
</div>
```

**キーボード操作**

- `Esc`: ポップオーバーを閉じる
- `Tab`: フォーカス可能要素間を移動

**スクリーンリーダー対応**

- `role="dialog"` でダイアログであることを明示
- `aria-haspopup="dialog"` でポップオーバーの存在を示す
- `aria-expanded` でポップオーバーの開閉状態を示す
- `aria-labelledby` でタイトル要素を関連付け
- 矢印には `aria-hidden="true"` を設定（装飾的要素のため）
- 閉じるボタンには `aria-label` で明確なラベルを提供

---
## アクセシビリティ

### ARIA属性

- `role="dialog"`: ポップオーバーの役割を設定
- `aria-labelledby`: タイトルとポップオーバーを関連付け
- `aria-describedby`: トリガー要素とポップオーバーを関連付け
- `aria-expanded`: トリガーの展開状態を示す

### キーボード操作

実装すべきキーボードショートカット:

- **Click / Enter / Space**: ポップオーバーを開く
- **Esc**: ポップオーバーを閉じる
- **Tab**: ポップオーバー内の要素間を移動

### スクリーンリーダー対応

1. **適切な関連付け**
   - トリガーとポップオーバーをARIA属性で関連付け
   - タイトルを`aria-labelledby`で設定

2. **フォーカス管理**
   - ポップオーバーを開いたときにフォーカスを移動
   - 閉じたときにトリガーにフォーカスを戻す

```javascript
// ポップオーバーを開く
function openPopover() {
  popover.hidden = false;
  popover.querySelector('button, [href], input')?.focus();
}

// ポップオーバーを閉じる
function closePopover() {
  popover.hidden = true;
  trigger.focus();
}
```

---

## ベストプラクティス

### ポップオーバーの使用

1. **ツールチップとの使い分け**
   - ツールチップ: 1-2行の簡単な説明
   - ポップオーバー: 複雑な内容、インタラクティブ要素

2. **適切な配置**
   - デフォルトは下方向
   - 自動位置調整を実装
   - 画面外に出ないように

3. **閉じる方法**
   - 外側クリック
   - Escキー
   - 閉じるボタン
   - アクション完了後

### UXの向上

1. **自動位置調整**

```javascript
function autoPosition(trigger, popover) {
  const positions = ['bottom', 'top', 'right', 'left'];

  for (const pos of positions) {
    const coords = calculatePosition(trigger, popover, pos);
    if (isInViewport(coords, popover)) {
      return pos;
    }
  }

  return 'bottom'; // フォールバック
}
```

2. **アニメーション**
   - スムーズな表示/非表示
   - 位置に応じた方向からの出現

3. **レスポンシブ対応**

```css
@media (max-width: 640px) {
  .popover {
    max-width: calc(100vw - 32px);
    left: 16px !important;
    right: 16px !important;
    width: auto;
  }
}
```

### パフォーマンス

1. **遅延レンダリング**
   - ポップオーバーが開かれるまでコンテンツをレンダリングしない

2. **位置計算の最適化**
   - requestAnimationFrameを使用
   - スクロールイベントはデバウンス

3. **メモリ管理**
   - 使用後はイベントリスナーをクリーンアップ

---

## 関連コンポーネント

- **Tooltip**: より簡単な説明用（インタラクティブでない）
- **Dropdown**: 選択肢のリスト表示
- **Modal**: 全画面オーバーレイ
- **Dialog**: 確認や警告用

---

**最終更新:** 2025-12-11
**Phase 4 Option D で実装**
