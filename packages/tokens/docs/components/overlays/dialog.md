# Dialog (ダイアログ) コンポーネント

**カテゴリ:** Overlays
**ファイル:** `src/css/components/overlays/dialog.css`
**ステータス:** ✅ 実装済み

---

## 概要

ダイアログコンポーネントは、ユーザーの確認や決定が必要な場面で表示される特化したモーダルです。確認、警告、破壊的アクション、情報、成功など、目的に応じた5つのバリアントを提供します。

### 用途

- 破壊的アクション(削除、リセットなど)の確認
- 重要な決定の確認
- 警告メッセージの表示
- 操作完了の通知
- エラーや問題の報告

### 特徴

- 目的別の5つのバリアント（確認、警告、破壊的、情報、成功）
- アイコンで視覚的に意図を明示
- 明確なアクションボタン配置
- キーボードショートカット対応

---

## バリアント

### 1. Confirmation (確認)

ユーザーの決定や同意を求める標準的なダイアログ。

**使用場面:**
- フォーム送信の確認
- 設定変更の確認
- 次のステップへの進行確認

**アイコン色:**
- 背景: `{primary.subtle}`
- 色: `{primary.default}`

### 2. Warning (警告)

注意が必要な操作や潜在的なリスクを伝えるダイアログ。

**使用場面:**
- データ損失の可能性がある操作
- システムへの影響が大きい変更
- 元に戻せない操作の警告

**アイコン色:**
- 背景: `{warning.subtle}`
- 色: `{warning.default}`

### 3. Destructive (破壊的)

データ削除など、取り返しのつかない操作を行う前の確認。

**使用場面:**
- ファイルやデータの削除
- アカウントの削除
- 重要な設定のリセット

**アイコン色:**
- 背景: `{error.subtle}`
- 色: `{error.default}`

### 4. Info (情報)

ユーザーに情報を提供するダイアログ。

**使用場面:**
- 機能の説明
- ヘルプ情報の表示
- 追加情報の提供

**アイコン色:**
- 背景: `{info.subtle}`
- 色: `{info.default}`

### 5. Success (成功)

操作の成功を通知するダイアログ。

**使用場面:**
- 処理完了の通知
- 保存成功の確認
- タスク完了の表示

**アイコン色:**
- 背景: `{success.subtle}`
- 色: `{success.default}`

---

## トークン一覧

### サイズ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.width.small` | `320px` | 小サイズ - シンプルな確認 |
| `component.dialog.width.default` | `480px` | デフォルトサイズ - 標準的なダイアログ |
| `component.dialog.width.large` | `640px` | 大サイズ - 詳細な説明が必要な場合 |
| `component.dialog.maxWidth` | `90vw` | 最大幅 - 画面幅の90% |
| `component.dialog.maxHeight` | `90vh` | 最大高さ - 画面高さの90% |
| `component.dialog.minHeight` | `160px` | 最小高さ |

### スペーシング

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.padding` | `{spacing.6}` | 内部パディング (24px) |
| `component.dialog.gap` | `{spacing.4}` | 要素間の間隔 (16px) |

### 背景とオーバーレイ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.background.default` | `{background.primary}` | ダイアログ背景色 |
| `component.dialog.background.overlay` | `rgba(0, 0, 0, 0.5)` | 背景オーバーレイ - 半透明黒 |

### ボーダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.border.width` | `{border.width.0}` | ボーダー幅 (なし) |
| `component.dialog.border.radius` | `{border.radius.lg}` | 角丸 (8px) |
| `component.dialog.border.color` | `{border.default}` | ボーダー色 |

### シャドウとZ-index

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.shadow` | `{shadow.2xl}` | 大きな影で浮き上がり効果 |
| `component.dialog.zIndex.overlay` | `1000` | オーバーレイのz-index |
| `component.dialog.zIndex.content` | `1001` | ダイアログコンテンツのz-index |

### アイコン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.icon.size` | `{spacing.12}` | アイコンサイズ (48px) |

#### 確認ダイアログ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.icon.confirmation.background` | `{primary.subtle}` | 確認アイコン背景 |
| `component.dialog.icon.confirmation.color` | `{primary.default}` | 確認アイコン色 |

#### 警告ダイアログ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.icon.warning.background` | `{warning.subtle}` | 警告アイコン背景 |
| `component.dialog.icon.warning.color` | `{warning.default}` | 警告アイコン色 |

#### 破壊的ダイアログ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.icon.destructive.background` | `{error.subtle}` | 破壊的アイコン背景 |
| `component.dialog.icon.destructive.color` | `{error.default}` | 破壊的アイコン色 |

#### 情報ダイアログ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.icon.info.background` | `{info.subtle}` | 情報アイコン背景 |
| `component.dialog.icon.info.color` | `{info.default}` | 情報アイコン色 |

#### 成功ダイアログ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.icon.success.background` | `{success.subtle}` | 成功アイコン背景 |
| `component.dialog.icon.success.color` | `{success.default}` | 成功アイコン色 |

### タイトル

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.title.fontSize` | `{font.size.lg}` | タイトル文字サイズ (18px) |
| `component.dialog.title.fontWeight` | `{font.weight.semibold}` | タイトル太さ (600) |
| `component.dialog.title.lineHeight` | `{font.lineHeight.tight}` | 行高 |
| `component.dialog.title.color` | `{foreground.primary}` | タイトル色 |
| `component.dialog.title.marginBottom` | `{spacing.2}` | タイトル下マージン (8px) |

### 説明文

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.description.fontSize` | `{font.size.sm}` | 説明文字サイズ (14px) |
| `component.dialog.description.fontWeight` | `{font.weight.normal}` | 説明文太さ (400) |
| `component.dialog.description.lineHeight` | `{font.lineHeight.relaxed}` | 行高 |
| `component.dialog.description.color` | `{foreground.secondary}` | 説明文色 |

### フッター

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.footer.gap` | `{spacing.3}` | ボタン間の間隔 (12px) |
| `component.dialog.footer.marginTop` | `{spacing.6}` | フッター上マージン (24px) |
| `component.dialog.footer.justifyContent` | `flex-end` | ボタンを右寄せ |

### 閉じるボタン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.closeButton.size` | `{spacing.8}` | 閉じるボタンサイズ (32px) |
| `component.dialog.closeButton.position.top` | `{spacing.4}` | 上からの位置 (16px) |
| `component.dialog.closeButton.position.right` | `{spacing.4}` | 右からの位置 (16px) |
| `component.dialog.closeButton.background.default` | `transparent` | デフォルト背景 |
| `component.dialog.closeButton.background.hover` | `{background.secondary}` | ホバー時背景 |
| `component.dialog.closeButton.color.default` | `{foreground.tertiary}` | デフォルト色 |
| `component.dialog.closeButton.color.hover` | `{foreground.primary}` | ホバー時色 |
| `component.dialog.closeButton.borderRadius` | `{border.radius.md}` | 角丸 (6px) |

### アニメーション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dialog.animation.duration` | `{animation.duration.base}` | アニメーション時間 (0.2s) |
| `component.dialog.animation.timing` | `{animation.easing.easeOut}` | イージング |
| `component.dialog.transition.duration` | `{animation.duration.fast}` | トランジション時間 (0.15s) |
| `component.dialog.transition.timing` | `{animation.easing.ease}` | イージング |
| `component.dialog.transition.properties` | `background-color, color, opacity, transform` | トランジション対象 |

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

#### CSSファイルの読み込み

```html
<link rel="stylesheet" href="@hidearea-design/tokens/build/css/html/overlays/dialog.css">
```

#### 基本的な構造

Dialog コンポーネントは `.ha-dialog` をルート要素とし、`variant` と `size` 属性で外観を制御します。

```html
<div class="ha-dialog" variant="confirmation" open>
  <div class="overlay">
    <div class="container">
      <div class="dialog">
        <div class="dialog-header">
          <div class="dialog-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div class="dialog-content">
            <h2 class="dialog-title">変更を保存しますか?</h2>
            <p class="dialog-description">保存しない場合、変更内容は失われます。</p>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="button button-secondary">キャンセル</button>
          <button class="button button-primary">保存</button>
        </div>
        <button class="close-button" aria-label="閉じる">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

#### バリアント

5つのバリアントが用意されています。

**Confirmation（確認）**

```html
<div class="ha-dialog" variant="confirmation" open>
  <div class="overlay">
    <div class="container">
      <div class="dialog">
        <div class="dialog-header">
          <div class="dialog-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4m0-4h.01"/>
            </svg>
          </div>
          <div class="dialog-content">
            <h2 class="dialog-title">変更を保存しますか?</h2>
            <p class="dialog-description">保存しない場合、変更内容は失われます。</p>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="button button-secondary">保存しない</button>
          <button class="button button-primary">保存</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Warning（警告）**

```html
<div class="ha-dialog" variant="warning" open>
  <div class="overlay">
    <div class="container">
      <div class="dialog">
        <div class="dialog-header">
          <div class="dialog-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div class="dialog-content">
            <h2 class="dialog-title">古いブラウザを使用しています</h2>
            <p class="dialog-description">セキュリティのため、最新のブラウザへのアップグレードを推奨します。</p>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="button button-secondary">後で</button>
          <button class="button button-warning">今すぐアップグレード</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Destructive（破壊的アクション）**

```html
<div class="ha-dialog" variant="destructive" open>
  <div class="overlay">
    <div class="container">
      <div class="dialog">
        <div class="dialog-header">
          <div class="dialog-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </div>
          <div class="dialog-content">
            <h2 class="dialog-title">ファイルを削除しますか?</h2>
            <p class="dialog-description">この操作は取り消せません。本当にこのファイルを削除してもよろしいですか?</p>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="button button-secondary">キャンセル</button>
          <button class="button button-danger">削除</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Info（情報）**

```html
<div class="ha-dialog" variant="info" open>
  <div class="overlay">
    <div class="container">
      <div class="dialog">
        <div class="dialog-header">
          <div class="dialog-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4m0-4h.01"/>
            </svg>
          </div>
          <div class="dialog-content">
            <h2 class="dialog-title">メンテナンスのお知らせ</h2>
            <p class="dialog-description">2024年1月15日 2:00〜4:00の間、システムメンテナンスを実施します。</p>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="button button-primary">了解</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Success（成功）**

```html
<div class="ha-dialog" variant="success" open>
  <div class="overlay">
    <div class="container">
      <div class="dialog">
        <div class="dialog-header">
          <div class="dialog-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div class="dialog-content">
            <h2 class="dialog-title">保存完了</h2>
            <p class="dialog-description">変更が正常に保存されました。</p>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="button button-primary">OK</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### サイズバリアント

3つのサイズが用意されています。

**Small（320px）**

```html
<div class="ha-dialog" variant="confirmation" size="sm" open>
  <div class="overlay">
    <div class="container">
      <div class="dialog">
        <div class="dialog-header">
          <div class="dialog-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4m0-4h.01"/>
            </svg>
          </div>
          <div class="dialog-content">
            <h2 class="dialog-title">続行しますか?</h2>
            <p class="dialog-description">この操作を実行します。</p>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="button button-secondary">いいえ</button>
          <button class="button button-primary">はい</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Medium（480px - デフォルト）**

```html
<div class="ha-dialog" variant="confirmation" size="md" open>
  <!-- または size 属性を省略 -->
  <div class="overlay">
    <div class="container">
      <div class="dialog">
        <!-- コンテンツ -->
      </div>
    </div>
  </div>
</div>
```

**Large（640px）**

```html
<div class="ha-dialog" variant="info" size="lg" open>
  <div class="overlay">
    <div class="container">
      <div class="dialog">
        <div class="dialog-header">
          <div class="dialog-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4m0-4h.01"/>
            </svg>
          </div>
          <div class="dialog-content">
            <h2 class="dialog-title">利用規約の更新</h2>
            <p class="dialog-description">利用規約が更新されました。以下の内容をご確認ください。</p>
          </div>
        </div>
        <div class="dialog-body">
          <!-- 長いコンテンツ -->
          <p>更新内容の詳細...</p>
        </div>
        <div class="dialog-footer">
          <button class="button button-primary">同意する</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### JavaScript による制御

Dialog の開閉とアクセシビリティ機能を実装するコントローラークラス:

```javascript
class DialogController {
  constructor(dialogElement) {
    this.dialog = dialogElement;
    this.overlay = dialogElement.querySelector('.overlay');
    this.closeButton = dialogElement.querySelector('.close-button');
    this.focusableElements = null;
    this.previousActiveElement = null;

    this.init();
  }

  init() {
    // 閉じるボタンのイベント
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }

    // オーバーレイクリックで閉じる
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Escキーで閉じる
    this.handleEscape = (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    };

    // Tab キーのフォーカストラップ
    this.handleTab = (e) => {
      if (e.key === 'Tab' && this.isOpen()) {
        this.trapFocus(e);
      }
    };
  }

  open() {
    // 現在のフォーカス要素を保存
    this.previousActiveElement = document.activeElement;

    // ダイアログを表示
    this.dialog.setAttribute('open', '');

    // body のスクロールを無効化
    document.body.style.overflow = 'hidden';

    // フォーカス可能な要素を取得
    this.updateFocusableElements();

    // 最初のフォーカス可能要素にフォーカス
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }

    // キーボードイベントを追加
    document.addEventListener('keydown', this.handleEscape);
    document.addEventListener('keydown', this.handleTab);
  }

  close() {
    // ダイアログを非表示
    this.dialog.removeAttribute('open');

    // body のスクロールを復元
    document.body.style.overflow = '';

    // フォーカスを元の要素に戻す
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }

    // キーボードイベントを削除
    document.removeEventListener('keydown', this.handleEscape);
    document.removeEventListener('keydown', this.handleTab);
  }

  isOpen() {
    return this.dialog.hasAttribute('open');
  }

  updateFocusableElements() {
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    this.focusableElements = Array.from(
      this.dialog.querySelectorAll(focusableSelectors.join(','))
    );
  }

  trapFocus(e) {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
}

// 使用例
const dialog = document.querySelector('.ha-dialog');
const controller = new DialogController(dialog);

// ダイアログを開く
document.querySelector('#open-button').addEventListener('click', () => {
  controller.open();
});

// ダイアログ内のアクションボタン
dialog.querySelectorAll('.dialog-footer button').forEach(button => {
  button.addEventListener('click', () => {
    // アクションを実行
    console.log('Button clicked:', button.textContent);
    controller.close();
  });
});
```

#### アクセシビリティ

Dialog は ARIA 属性を適切に設定する必要があります:

**必須の ARIA 属性**

```html
<div class="ha-dialog" variant="destructive" open>
  <div class="overlay">
    <div class="container">
      <!-- role: destructive/warning は alertdialog、それ以外は dialog -->
      <div class="dialog"
           role="alertdialog"
           aria-modal="true"
           aria-labelledby="dialog-title"
           aria-describedby="dialog-description">

        <div class="dialog-header">
          <div class="dialog-icon">
            <svg aria-hidden="true" width="24" height="24">
              <!-- アイコン -->
            </svg>
          </div>
          <div class="dialog-content">
            <h2 id="dialog-title" class="dialog-title">
              ファイルを削除しますか?
            </h2>
            <p id="dialog-description" class="dialog-description">
              この操作は取り消せません。
            </p>
          </div>
        </div>

        <div class="dialog-footer">
          <button type="button">キャンセル</button>
          <button type="button">削除</button>
        </div>

        <button class="close-button" aria-label="ダイアログを閉じる">
          <svg aria-hidden="true">×</svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

**キーボード操作**

- `Esc`: ダイアログを閉じる
- `Tab`: 次のフォーカス可能要素へ移動（ダイアログ内でループ）
- `Shift + Tab`: 前のフォーカス可能要素へ移動（ダイアログ内でループ）

**スクリーンリーダー対応**

- `role="dialog"` または `role="alertdialog"` でダイアログであることを明示
- `aria-modal="true"` でモーダルダイアログであることを示す
- `aria-labelledby` でタイトル要素を関連付け
- `aria-describedby` で説明要素を関連付け
- アイコンには `aria-hidden="true"` を設定（装飾的要素のため）
- 閉じるボタンには `aria-label` で明確なラベルを提供

---

## アクセシビリティ

### ARIA属性

- `role="dialog"`: 通常のダイアログ
- `role="alertdialog"`: 警告や破壊的アクション用（ユーザーの即座の注意が必要）
- `aria-modal="true"`: モーダルダイアログであることを明示
- `aria-labelledby`: タイトルとダイアログを関連付け
- `aria-describedby`: 説明文とダイアログを関連付け

### キーボード操作

実装すべきキーボードショートカット:

- **Esc**: ダイアログを閉じる（重要な確認の場合は無効化も検討）
- **Tab**: ダイアログ内の要素間を移動
- **Enter**: プライマリアクションを実行（フォーカスがボタンにある場合）

### フォーカス管理

```javascript
// ダイアログを開く
function openDialog() {
  // 現在のフォーカスを保存
  previousActiveElement = document.activeElement;

  // ダイアログにフォーカス
  dialogElement.focus();

  // フォーカストラップを有効化
  trapFocus(dialogElement);
}

// ダイアログを閉じる
function closeDialog() {
  // フォーカスを復元
  previousActiveElement?.focus();
}
```

---

## ベストプラクティス

### ダイアログの使用

1. **適切なタイプの選択**
   - 破壊的: データ削除など取り返しのつかない操作
   - 警告: 注意が必要だが取り消し可能な操作
   - 確認: 通常の確認
   - 情報: 情報提供のみ
   - 成功: 完了通知

2. **明確なタイトルと説明**
   - タイトル: 簡潔で明確（5-7単語）
   - 説明: 具体的な影響を説明（1-2文）

3. **アクションボタン**
   - プライマリアクション: 右側に配置
   - キャンセル: 左側に配置
   - ラベル: 具体的な動詞を使用（「OK」より「保存」「削除」）

### UXの向上

1. **破壊的アクションの確認**
   - ダブルチェック: 入力フィールドでファイル名確認など
   - 遅延: ボタンを数秒間無効化

```tsx
// ファイル名の確認
const [confirmText, setConfirmText] = useState('');
const canDelete = confirmText === fileName;

<input
  value={confirmText}
  onChange={(e) => setConfirmText(e.target.value)}
  placeholder={`"${fileName}" を入力`}
/>

<button disabled={!canDelete}>削除</button>
```

2. **適切なデフォルトアクション**
   - 破壊的: キャンセルにフォーカス
   - 確認: プライマリアクションにフォーカス

3. **タイミング**
   - ユーザーのアクション直後に表示
   - 自動的には表示しない

### エラー処理

```tsx
function Dialog({ onConfirm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await onConfirm();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      // エラーの場合、ダイアログは開いたまま
      return;
    }

    setIsLoading(false);
    // 成功時のみ閉じる
  };

  return (
    <div className="dialog">
      {/* ... */}
      {error && (
        <div className="alert alert-error">{error}</div>
      )}
      <button disabled={isLoading} onClick={handleConfirm}>
        {isLoading ? '処理中...' : '確認'}
      </button>
    </div>
  );
}
```

---

## 関連コンポーネント

- **Modal**: より汎用的なオーバーレイ
- **Toast**: 軽量な通知
- **Alert**: インライン警告

---

**最終更新:** 2025-12-11
**Phase 4 Option D で実装**
