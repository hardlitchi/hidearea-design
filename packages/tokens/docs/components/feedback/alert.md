# Alert (アラート) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/components/feedback/alert.yaml`
**ステータス:** ✅ 実装済み (Phase 3)

---

## 概要

Alertコンポーネントは、ユーザーに重要な情報、警告、エラー、成功メッセージを伝えるためのフィードバック要素です。4つのバリアント（success, warning, error, info）をサポートし、視覚的に目立つデザインで注意を引きます。

### 用途

- 成功メッセージの表示
- 警告の通知
- エラーメッセージの表示
- 情報の提供
- システムステータスの通知

---

## バリアント

### 1. Success (成功)

操作が正常に完了したことを伝えます。

**使用場面:**
- フォーム送信成功
- データ保存完了
- 処理完了通知
- 設定変更の確認

**トークンプレフィックス:** `component.alert.success.*`

### 2. Warning (警告)

注意が必要な状況を伝えます。

**使用場面:**
- 重要な変更前の確認
- 潜在的な問題の警告
- 期限切れ間近の通知
- 制限事項の案内

**トークンプレフィックス:** `component.alert.warning.*`

### 3. Error (エラー)

エラーや問題が発生したことを伝えます。

**使用場面:**
- フォームバリデーションエラー
- システムエラー
- 処理失敗の通知
- アクセス拒否メッセージ

**トークンプレフィックス:** `component.alert.error.*`

### 4. Info (情報)

一般的な情報や補足説明を提供します。

**使用場面:**
- ヒントやTips
- お知らせ
- 補足情報
- システムメンテナンス通知

**トークンプレフィックス:** `component.alert.info.*`

---

## トークン一覧

### Success アラート

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.alert.success.background` | `{success.subtle}` | 成功アラートの背景色 |
| `component.alert.success.text` | `{foreground.primary}` | 成功アラートのテキスト色 |
| `component.alert.success.border` | `{success.default}` | 成功アラートのボーダー色 |
| `component.alert.success.icon` | `{success.active}` | 成功アラートのアイコン色 |

### Warning アラート

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.alert.warning.background` | `{warning.subtle}` | 警告アラートの背景色 |
| `component.alert.warning.text` | `{foreground.primary}` | 警告アラートのテキスト色 |
| `component.alert.warning.border` | `{warning.default}` | 警告アラートのボーダー色 |
| `component.alert.warning.icon` | `{warning.active}` | 警告アラートのアイコン色 |

### Error アラート

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.alert.error.background` | `{error.subtle}` | エラーアラートの背景色 |
| `component.alert.error.text` | `{foreground.primary}` | エラーアラートのテキスト色 |
| `component.alert.error.border` | `{error.default}` | エラーアラートのボーダー色 |
| `component.alert.error.icon` | `{error.active}` | エラーアラートのアイコン色 |

### Info アラート

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.alert.info.background` | `{info.subtle}` | 情報アラートの背景色 |
| `component.alert.info.text` | `{foreground.primary}` | 情報アラートのテキスト色 |
| `component.alert.info.border` | `{info.default}` | 情報アラートのボーダー色 |
| `component.alert.info.icon` | `{info.active}` | 情報アラートのアイコン色 |

---

## 使用例

### HTML/CSS

```html
<!-- Success アラート -->
<div
  class="alert alert--success"
  role="alert"
  style="
    background: var(--component-alert-success-background);
    color: var(--component-alert-success-text);
    border: 1px solid var(--component-alert-success-border);
    border-left: 4px solid var(--component-alert-success-border);
    padding: 12px 16px;
    border-radius: 4px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  "
>
  <svg style="color: var(--component-alert-success-icon); width: 20px; height: 20px; flex-shrink: 0;">
    <!-- Success icon -->
  </svg>
  <div>
    <strong>成功しました</strong>
    <p>データが正常に保存されました。</p>
  </div>
</div>

<!-- Warning アラート -->
<div
  class="alert alert--warning"
  role="alert"
  style="
    background: var(--component-alert-warning-background);
    color: var(--component-alert-warning-text);
    border: 1px solid var(--component-alert-warning-border);
    border-left: 4px solid var(--component-alert-warning-border);
  "
>
  <svg style="color: var(--component-alert-warning-icon);">
    <!-- Warning icon -->
  </svg>
  <div>
    <strong>注意</strong>
    <p>この操作は元に戻せません。</p>
  </div>
</div>

<!-- Error アラート -->
<div
  class="alert alert--error"
  role="alert"
  style="
    background: var(--component-alert-error-background);
    color: var(--component-alert-error-text);
    border: 1px solid var(--component-alert-error-border);
    border-left: 4px solid var(--component-alert-error-border);
  "
>
  <svg style="color: var(--component-alert-error-icon);">
    <!-- Error icon -->
  </svg>
  <div>
    <strong>エラー</strong>
    <p>データの保存に失敗しました。もう一度お試しください。</p>
  </div>
</div>

<!-- Info アラート -->
<div
  class="alert alert--info"
  role="alert"
  style="
    background: var(--component-alert-info-background);
    color: var(--component-alert-info-text);
    border: 1px solid var(--component-alert-info-border);
    border-left: 4px solid var(--component-alert-info-border);
  "
>
  <svg style="color: var(--component-alert-info-icon);">
    <!-- Info icon -->
  </svg>
  <div>
    <strong>お知らせ</strong>
    <p>システムメンテナンスは2025年12月15日に実施されます。</p>
  </div>
</div>

<!-- 閉じるボタン付きアラート -->
<div class="alert alert--success" role="alert">
  <svg style="color: var(--component-alert-success-icon);">
    <!-- Icon -->
  </svg>
  <div style="flex: 1;">
    <strong>完了</strong>
    <p>ファイルのアップロードが完了しました。</p>
  </div>
  <button
    class="alert__close"
    aria-label="閉じる"
    style="
      background: transparent;
      border: none;
      padding: 4px;
      cursor: pointer;
      color: var(--component-alert-success-text);
      opacity: 0.7;
    "
  >
    ×
  </button>
</div>
```

### CSS Classes

```css
/* ベーススタイル */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid;
  border-left-width: 4px;
  font-size: 14px;
  line-height: 1.5;
}

.alert strong {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

.alert p {
  margin: 0;
}

.alert svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Success */
.alert--success {
  background: var(--component-alert-success-background);
  color: var(--component-alert-success-text);
  border-color: var(--component-alert-success-border);
}

.alert--success svg {
  color: var(--component-alert-success-icon);
}

/* Warning */
.alert--warning {
  background: var(--component-alert-warning-background);
  color: var(--component-alert-warning-text);
  border-color: var(--component-alert-warning-border);
}

.alert--warning svg {
  color: var(--component-alert-warning-icon);
}

/* Error */
.alert--error {
  background: var(--component-alert-error-background);
  color: var(--component-alert-error-text);
  border-color: var(--component-alert-error-border);
}

.alert--error svg {
  color: var(--component-alert-error-icon);
}

/* Info */
.alert--info {
  background: var(--component-alert-info-background);
  color: var(--component-alert-info-text);
  border-color: var(--component-alert-info-border);
}

.alert--info svg {
  color: var(--component-alert-info-icon);
}

/* 閉じるボタン */
.alert__close {
  background: transparent;
  border: none;
  padding: 4px;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.alert__close:hover {
  opacity: 1;
}

/* コンパクトバージョン */
.alert--compact {
  padding: 8px 12px;
  font-size: 13px;
}

.alert--compact svg {
  width: 16px;
  height: 16px;
}
```

### React

```tsx
import React, { useState } from 'react';

type AlertVariant = 'success' | 'warning' | 'error' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  dismissible = false,
  onDismiss,
  icon,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const defaultIcons = {
    success: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
      </svg>
    ),
    warning: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" />
      </svg>
    ),
    error: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
      </svg>
    ),
  };

  return (
    <div
      className={`alert alert--${variant}`}
      role="alert"
      style={{
        background: `var(--component-alert-${variant}-background)`,
        color: `var(--component-alert-${variant}-text)`,
        borderColor: `var(--component-alert-${variant}-border)`,
      }}
    >
      <div
        className="alert__icon"
        style={{ color: `var(--component-alert-${variant}-icon)` }}
      >
        {icon || defaultIcons[variant]}
      </div>
      <div className="alert__content" style={{ flex: 1 }}>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      {dismissible && (
        <button
          className="alert__close"
          onClick={handleDismiss}
          aria-label="閉じる"
          style={{ color: `var(--component-alert-${variant}-text)` }}
        >
          ×
        </button>
      )}
    </div>
  );
};

// 使用例
export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        variant="success"
        title="成功しました"
        message="データが正常に保存されました。"
        dismissible
      />
      <Alert
        variant="warning"
        title="注意"
        message="この操作は元に戻せません。"
      />
      <Alert
        variant="error"
        title="エラー"
        message="データの保存に失敗しました。もう一度お試しください。"
        dismissible
      />
      <Alert
        variant="info"
        title="お知らせ"
        message="システムメンテナンスは2025年12月15日に実施されます。"
      />
    </div>
  );
}
```

---

## アクセシビリティ

### ARIA属性

- `role="alert"`: 重要な情報であることを示す（スクリーンリーダーが即座に読み上げる）
- `aria-live="polite"`: 動的に表示されるアラートの場合
- `aria-atomic="true"`: アラート全体を読み上げる

### 例

```html
<!-- 静的なアラート -->
<div class="alert alert--error" role="alert">
  <strong>エラー</strong>
  <p>入力内容に誤りがあります。</p>
</div>

<!-- 動的に表示されるアラート -->
<div
  class="alert alert--success"
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  <strong>保存しました</strong>
  <p>変更が正常に保存されました。</p>
</div>

<!-- 閉じるボタン付き -->
<div class="alert alert--info" role="alert">
  <strong>情報</strong>
  <p>新しい機能が追加されました。</p>
  <button aria-label="アラートを閉じる">×</button>
</div>
```

### キーボード操作

- 閉じるボタンがある場合、`Tab`キーでフォーカス可能
- `Enter`または`Space`キーで閉じる

---

## ベストプラクティス

### 1. 適切なバリアント選択

```html
<!-- Good: 状況に合ったバリアント -->
<div class="alert alert--success">保存に成功しました</div>
<div class="alert alert--error">エラーが発生しました</div>

<!-- Bad: 誤解を招くバリアント -->
<div class="alert alert--success">エラーが発生しました</div>
<div class="alert alert--error">成功しました</div>
```

### 2. 明確なメッセージ

```html
<!-- Good: 具体的で行動可能 -->
<div class="alert alert--error">
  <strong>メールアドレスが無効です</strong>
  <p>有効なメールアドレス形式で入力してください（例: user@example.com）</p>
</div>

<!-- Bad: 曖昧で不明確 -->
<div class="alert alert--error">
  <strong>エラー</strong>
  <p>入力が正しくありません</p>
</div>
```

### 3. アイコンの使用

```html
<!-- Good: アイコンとテキストの併用 -->
<div class="alert alert--warning">
  <svg><!-- Warning icon --></svg>
  <div>
    <strong>警告</strong>
    <p>この操作は元に戻せません</p>
  </div>
</div>

<!-- Bad: アイコンのみ（テキストなし） -->
<div class="alert alert--warning">
  <svg><!-- Icon only --></svg>
</div>
```

### 4. 適切な配置

```html
<!-- Good: フォームの上部に配置 -->
<form>
  <div class="alert alert--error" role="alert">
    入力エラーがあります。以下を確認してください。
  </div>
  <!-- フォームフィールド -->
</form>

<!-- Good: ページ上部に配置 -->
<div class="page-alerts">
  <div class="alert alert--success">
    設定が保存されました
  </div>
</div>
```

---

## 関連コンポーネント

- **[Badge](./badge.md)** - 小さなステータス表示
- **[Toast](./toast.md)** - 一時的な通知メッセージ
- **[Modal](./modal.md)** - 重要な確認ダイアログ
- **[Banner](./banner.md)** - ページ全体の通知バナー

---

## デザインガイドライン

### サイズとスペーシング

- **パディング:** 12px 16px（上下 左右）
- **アイコンサイズ:** 20px × 20px
- **アイコンとテキストの間隔:** 12px
- **ボーダー幅:** 1px（左側は4px）
- **ボーダー半径:** 4px

### レイアウト

- アイコンは左側に配置
- タイトルは太字で表示
- メッセージは通常の太さ
- 閉じるボタンは右側に配置

### カラーシステム

- 背景色: `{variant}.subtle`（薄い色）
- テキスト色: `{foreground.primary}`（読みやすい）
- ボーダー色: `{variant}.default`（はっきり）
- アイコン色: `{variant}.active`（強調）

### アニメーション

- フェードイン: 200ms ease-in
- フェードアウト: 200ms ease-out
- スライドイン（トップから）: 300ms ease-out

---

**最終更新:** 2025-12-12
**バージョン:** 1.0.0
