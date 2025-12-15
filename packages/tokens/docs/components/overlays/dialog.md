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

## 使用例

### HTML

```html
<!-- 破壊的アクションダイアログ -->
<div class="dialog-overlay" role="presentation">
  <div
    class="dialog dialog-destructive"
    role="alertdialog"
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    <button class="dialog-close" aria-label="閉じる">
      ×
    </button>

    <div class="dialog-icon">
      <svg><!-- 警告アイコン --></svg>
    </div>

    <div class="dialog-content">
      <h2 id="dialog-title" class="dialog-title">
        ファイルを削除しますか?
      </h2>

      <p id="dialog-description" class="dialog-description">
        この操作は取り消せません。本当にこのファイルを削除してもよろしいですか?
      </p>
    </div>

    <div class="dialog-footer">
      <button class="button button-secondary" type="button">
        キャンセル
      </button>
      <button class="button button-danger" type="button">
        削除
      </button>
    </div>
  </div>
</div>

<!-- 確認ダイアログ -->
<div class="dialog-overlay">
  <div class="dialog dialog-confirmation" role="dialog">
    <div class="dialog-icon">
      <svg><!-- 確認アイコン --></svg>
    </div>

    <div class="dialog-content">
      <h2 class="dialog-title">変更を保存しますか?</h2>
      <p class="dialog-description">
        保存しない場合、変更内容は失われます。
      </p>
    </div>

    <div class="dialog-footer">
      <button class="button button-secondary">保存しない</button>
      <button class="button button-primary">保存</button>
    </div>
  </div>
</div>

<!-- 成功ダイアログ -->
<div class="dialog-overlay">
  <div class="dialog dialog-success" role="dialog">
    <div class="dialog-icon">
      <svg><!-- チェックマークアイコン --></svg>
    </div>

    <div class="dialog-content">
      <h2 class="dialog-title">保存完了</h2>
      <p class="dialog-description">
        変更が正常に保存されました。
      </p>
    </div>

    <div class="dialog-footer">
      <button class="button button-primary">OK</button>
    </div>
  </div>
</div>
```

### CSS

```css
/* オーバーレイ */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--component-dialog-background-overlay);
  z-index: var(--component-dialog-z-index-overlay);
  padding: 1rem;
  animation: fade-in var(--component-dialog-animation-duration)
             var(--component-dialog-animation-timing);
}

/* ダイアログコンテナ */
.dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--component-dialog-gap);
  width: 100%;
  max-width: var(--component-dialog-width-default);
  max-height: var(--component-dialog-max-height);
  padding: var(--component-dialog-padding);
  background-color: var(--component-dialog-background-default);
  border-radius: var(--component-dialog-border-radius);
  box-shadow: var(--component-dialog-shadow);
  z-index: var(--component-dialog-z-index-content);
  animation: scale-in var(--component-dialog-animation-duration)
             var(--component-dialog-animation-timing);
}

/* アイコン */
.dialog-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--component-dialog-icon-size);
  height: var(--component-dialog-icon-size);
  border-radius: 50%;
}

.dialog-confirmation .dialog-icon {
  background-color: var(--component-dialog-icon-confirmation-background);
  color: var(--component-dialog-icon-confirmation-color);
}

.dialog-warning .dialog-icon {
  background-color: var(--component-dialog-icon-warning-background);
  color: var(--component-dialog-icon-warning-color);
}

.dialog-destructive .dialog-icon {
  background-color: var(--component-dialog-icon-destructive-background);
  color: var(--component-dialog-icon-destructive-color);
}

.dialog-info .dialog-icon {
  background-color: var(--component-dialog-icon-info-background);
  color: var(--component-dialog-icon-info-color);
}

.dialog-success .dialog-icon {
  background-color: var(--component-dialog-icon-success-background);
  color: var(--component-dialog-icon-success-color);
}

.dialog-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

/* コンテンツ */
.dialog-content {
  text-align: center;
  width: 100%;
}

.dialog-title {
  margin: 0 0 var(--component-dialog-title-margin-bottom);
  font-size: var(--component-dialog-title-font-size);
  font-weight: var(--component-dialog-title-font-weight);
  line-height: var(--component-dialog-title-line-height);
  color: var(--component-dialog-title-color);
}

.dialog-description {
  margin: 0;
  font-size: var(--component-dialog-description-font-size);
  font-weight: var(--component-dialog-description-font-weight);
  line-height: var(--component-dialog-description-line-height);
  color: var(--component-dialog-description-color);
}

/* フッター */
.dialog-footer {
  display: flex;
  gap: var(--component-dialog-footer-gap);
  justify-content: var(--component-dialog-footer-justify-content);
  width: 100%;
  margin-top: var(--component-dialog-footer-margin-top);
}

/* 閉じるボタン */
.dialog-close {
  position: absolute;
  top: var(--component-dialog-close-button-position-top);
  right: var(--component-dialog-close-button-position-right);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--component-dialog-close-button-size);
  height: var(--component-dialog-close-button-size);
  padding: 0;
  background: var(--component-dialog-close-button-background-default);
  border: none;
  border-radius: var(--component-dialog-close-button-border-radius);
  color: var(--component-dialog-close-button-color-default);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: var(--component-dialog-transition-properties)
              var(--component-dialog-transition-duration)
              var(--component-dialog-transition-timing);
}

.dialog-close:hover {
  background: var(--component-dialog-close-button-background-hover);
  color: var(--component-dialog-close-button-color-hover);
}

/* アニメーション */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* サイズバリアント */
.dialog-small {
  max-width: var(--component-dialog-width-small);
}

.dialog-large {
  max-width: var(--component-dialog-width-large);
}
```

### React

```tsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type DialogType = 'confirmation' | 'warning' | 'destructive' | 'info' | 'success';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: DialogType;
  title: string;
  description: string;
  actions: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }[];
  showCloseButton?: boolean;
}

function Dialog({
  isOpen,
  onClose,
  type,
  title,
  description,
  actions,
  showCloseButton = true,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // bodyのスクロールを無効化
      document.body.style.overflow = 'hidden';

      // Escキーで閉じる
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleEscape);

      // フォーカスを移動
      dialogRef.current?.focus();

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'confirmation':
        return '?';
      case 'warning':
        return '⚠';
      case 'destructive':
        return '🗑';
      case 'info':
        return 'ℹ';
      case 'success':
        return '✓';
    }
  };

  return createPortal(
    <div
      className="dialog-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={`dialog dialog-${type}`}
        role={type === 'destructive' || type === 'warning' ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        tabIndex={-1}
      >
        {showCloseButton && (
          <button className="dialog-close" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        )}

        <div className="dialog-icon">{getIcon()}</div>

        <div className="dialog-content">
          <h2 id="dialog-title" className="dialog-title">
            {title}
          </h2>
          <p id="dialog-description" className="dialog-description">
            {description}
          </p>
        </div>

        <div className="dialog-footer">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`button button-${action.variant || 'secondary'}`}
              onClick={() => {
                action.onClick();
                onClose();
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

// 使用例
function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // 削除処理
    console.log('削除しました');
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>削除</button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type="destructive"
        title="ファイルを削除しますか?"
        description="この操作は取り消せません。本当にこのファイルを削除してもよろしいですか?"
        actions={[
          {
            label: 'キャンセル',
            onClick: () => {},
            variant: 'secondary',
          },
          {
            label: '削除',
            onClick: handleDelete,
            variant: 'danger',
          },
        ]}
      />
    </>
  );
}
```

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
