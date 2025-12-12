# Badge (バッジ) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/components/feedback/badge.yaml`
**ステータス:** ✅ 実装済み (Phase 3)

---

## 概要

Badgeコンポーネントは、ステータス、分類、数値などを視覚的に示す小さなラベルです。6つのバリアント（primary, success, warning, error, info, neutral）をサポートし、コンテンツの状態や重要度を一目で伝えます。

### 用途

- ステータス表示（新着、処理中、完了など）
- 通知カウント
- カテゴリラベル
- タグ表示
- 優先度インジケーター

---

## バリアント

### 1. Primary (プライマリ)

主要なステータスや情報に使用します。

**使用場面:**
- デフォルトのステータス
- 一般的なラベル
- 強調したい情報

**トークンプレフィックス:** `component.badge.primary.*`

### 2. Success (成功)

成功や完了状態を示します。

**使用場面:**
- 処理完了
- 承認済み
- アクティブ状態
- 成功ステータス

**トークンプレフィックス:** `component.badge.success.*`

### 3. Warning (警告)

注意が必要な状態を示します。

**使用場面:**
- 警告メッセージ
- 期限が近い
- 要確認項目
- 一時的な問題

**トークンプレフィックス:** `component.badge.warning.*`

### 4. Error (エラー)

エラーや重大な問題を示します。

**使用場面:**
- エラー状態
- 失敗した処理
- 拒否された項目
- 緊急の問題

**トークンプレフィックス:** `component.badge.error.*`

### 5. Info (情報)

中立的な情報を示します。

**使用場面:**
- 情報メッセージ
- ヒント
- 補足情報
- お知らせ

**トークンプレフィックス:** `component.badge.info.*`

### 6. Neutral (ニュートラル)

中立的なステータスや分類に使用します。

**使用場面:**
- デフォルト値
- 未分類
- 一般的なタグ
- カテゴリ名

**トークンプレフィックス:** `component.badge.neutral.*`

---

## トークン一覧

### Primary バッジ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.badge.primary.background` | `{primary.subtle}` | プライマリバッジの背景色 |
| `component.badge.primary.text` | `{primary.active}` | プライマリバッジのテキスト色 |

### Success バッジ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.badge.success.background` | `{success.subtle}` | 成功バッジの背景色 |
| `component.badge.success.text` | `{success.active}` | 成功バッジのテキスト色 |

### Warning バッジ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.badge.warning.background` | `{warning.subtle}` | 警告バッジの背景色 |
| `component.badge.warning.text` | `{warning.active}` | 警告バッジのテキスト色 |

### Error バッジ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.badge.error.background` | `{error.subtle}` | エラーバッジの背景色 |
| `component.badge.error.text` | `{error.active}` | エラーバッジのテキスト色 |

### Info バッジ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.badge.info.background` | `{info.subtle}` | 情報バッジの背景色 |
| `component.badge.info.text` | `{info.active}` | 情報バッジのテキスト色 |

### Neutral バッジ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.badge.neutral.background` | `{background.tertiary}` | ニュートラルバッジの背景色 |
| `component.badge.neutral.text` | `{foreground.secondary}` | ニュートラルバッジのテキスト色 |

---

## 使用例

### HTML/CSS

```html
<!-- Primary バッジ -->
<span
  class="badge badge--primary"
  style="
    background: var(--component-badge-primary-background);
    color: var(--component-badge-primary-text);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  "
>
  New
</span>

<!-- Success バッジ -->
<span
  class="badge badge--success"
  style="
    background: var(--component-badge-success-background);
    color: var(--component-badge-success-text);
  "
>
  完了
</span>

<!-- Warning バッジ -->
<span
  class="badge badge--warning"
  style="
    background: var(--component-badge-warning-background);
    color: var(--component-badge-warning-text);
  "
>
  要確認
</span>

<!-- Error バッジ -->
<span
  class="badge badge--error"
  style="
    background: var(--component-badge-error-background);
    color: var(--component-badge-error-text);
  "
>
  エラー
</span>

<!-- Info バッジ -->
<span
  class="badge badge--info"
  style="
    background: var(--component-badge-info-background);
    color: var(--component-badge-info-text);
  "
>
  お知らせ
</span>

<!-- 通知カウント -->
<button class="button" style="position: relative;">
  メッセージ
  <span
    class="badge badge--error"
    style="
      position: absolute;
      top: -8px;
      right: -8px;
      min-width: 20px;
      height: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    3
  </span>
</button>
```

### CSS Classes

```css
/* ベーススタイル */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;
}

/* Primary */
.badge--primary {
  background: var(--component-badge-primary-background);
  color: var(--component-badge-primary-text);
}

/* Success */
.badge--success {
  background: var(--component-badge-success-background);
  color: var(--component-badge-success-text);
}

/* Warning */
.badge--warning {
  background: var(--component-badge-warning-background);
  color: var(--component-badge-warning-text);
}

/* Error */
.badge--error {
  background: var(--component-badge-error-background);
  color: var(--component-badge-error-text);
}

/* Info */
.badge--info {
  background: var(--component-badge-info-background);
  color: var(--component-badge-info-text);
}

/* Neutral */
.badge--neutral {
  background: var(--component-badge-neutral-background);
  color: var(--component-badge-neutral-text);
}

/* 通知バッジ（数値） */
.badge--notification {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  font-size: 11px;
}

/* ドットバッジ */
.badge--dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 50%;
}
```

### React

```tsx
import React from 'react';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className = '',
}) => {
  return (
    <span
      className={`badge badge--${variant} ${className}`}
      style={{
        background: `var(--component-badge-${variant}-background)`,
        color: `var(--component-badge-${variant}-text)`,
      }}
    >
      {children}
    </span>
  );
};

// 使用例
export default function Example() {
  return (
    <div>
      <Badge variant="primary">New</Badge>
      <Badge variant="success">完了</Badge>
      <Badge variant="warning">保留中</Badge>
      <Badge variant="error">エラー</Badge>
      <Badge variant="info">情報</Badge>
      <Badge variant="neutral">タグ</Badge>
    </div>
  );
}
```

---

## アクセシビリティ

### セマンティックHTML

バッジが重要な情報を伝える場合、適切なARIA属性を使用します。

```html
<!-- 装飾的なバッジ（スクリーンリーダーで無視） -->
<span class="badge badge--success" aria-hidden="true">新着</span>

<!-- 重要な情報を伝えるバッジ -->
<span class="badge badge--error" role="status" aria-live="polite">
  エラー
</span>

<!-- 通知カウント -->
<button aria-label="メッセージ 3件の未読">
  メッセージ
  <span class="badge badge--error" aria-hidden="true">3</span>
</button>
```

### カラーコントラスト

- バッジのテキストと背景のコントラスト比は WCAG AA基準（4.5:1以上）を満たす
- カラーだけに頼らず、アイコンやテキストでも情報を伝える

---

## ベストプラクティス

### 1. 適切なバリアント選択

```html
<!-- Good: 意味に合ったバリアント -->
<span class="badge badge--success">承認済み</span>
<span class="badge badge--error">拒否</span>

<!-- Bad: 誤解を招くバリアント -->
<span class="badge badge--success">エラー</span>
<span class="badge badge--error">成功</span>
```

### 2. 簡潔なテキスト

```html
<!-- Good: 短く明確 -->
<span class="badge badge--info">新着</span>
<span class="badge badge--warning">要確認</span>

<!-- Bad: 長すぎる -->
<span class="badge badge--info">これは新しいメッセージです</span>
```

### 3. 過度な使用を避ける

```html
<!-- Good: 必要な情報のみ -->
<li>
  <span>重要なお知らせ</span>
  <span class="badge badge--error">重要</span>
</li>

<!-- Bad: バッジだらけ -->
<li>
  <span class="badge badge--primary">新着</span>
  <span class="badge badge--info">お知らせ</span>
  <span class="badge badge--success">確認済み</span>
  <span class="badge badge--warning">期限あり</span>
</li>
```

### 4. 通知カウントの適切な配置

```html
<!-- Good: 視覚的に関連付け -->
<button style="position: relative;">
  <span>通知</span>
  <span class="badge badge--error" style="position: absolute; top: -8px; right: -8px;">
    5
  </span>
</button>

<!-- Bad: 関連性が不明確 -->
<button>通知</button>
<span class="badge badge--error">5</span>
```

---

## 関連コンポーネント

- **[Alert](./alert.md)** - より詳細なフィードバックメッセージ
- **[Toast](./toast.md)** - 一時的な通知
- **[Chip](./chip.md)** - インタラクティブなタグ要素

---

## デザインガイドライン

### サイズとスペーシング

- **標準サイズ:** 高さ 20px、パディング 2px 8px
- **通知バッジ:** 最小幅 20px、高さ 20px、円形
- **ドットバッジ:** 8px × 8px、円形
- **フォントサイズ:** 12px
- **フォントウェイト:** 500 (Medium)
- **ボーダー半径:** 12px（標準）、50%（円形）

### 配置

- テキストやアイコンの右側に配置
- ボタンやアイコンの右上に通知バッジを配置
- リスト項目内では右端に配置

### カラーシステム

- 背景色: `{variant}.subtle`（薄い色）
- テキスト色: `{variant}.active`（濃い色）
- 十分なコントラストを確保

---

**最終更新:** 2025-12-12
**バージョン:** 1.0.0
