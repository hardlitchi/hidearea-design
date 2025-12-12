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

## 使用方法

このコンポーネントは4つの実装パターンをサポートしています。

### Pattern 1: Web Components (推奨)

Web Componentsを使用した最もシンプルな実装方法です。

```html
<!-- 基本的な使用 -->
<ha-badge variant="primary">New</ha-badge>
<ha-badge variant="success">完了</ha-badge>
<ha-badge variant="warning">保留中</ha-badge>
<ha-badge variant="error">エラー</ha-badge>

<!-- サイズの指定 -->
<ha-badge variant="info" size="sm">小</ha-badge>
<ha-badge variant="info" size="md">中</ha-badge>
<ha-badge variant="info" size="lg">大</ha-badge>

<!-- スタイルの指定 -->
<ha-badge variant="primary" style-type="standard">Standard</ha-badge>
<ha-badge variant="primary" style-type="outlined">Outlined</ha-badge>
<ha-badge variant="primary" style-type="soft">Soft</ha-badge>

<!-- 形状の指定 -->
<ha-badge variant="info" pill>Pill Shape</ha-badge>
<ha-badge variant="success" dot></ha-badge>

<!-- アイコン付き -->
<ha-badge variant="success">
  <svg slot="icon" width="16" height="16" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
  </svg>
  完了
</ha-badge>
```

### Pattern 2: Plain HTML (推奨)

CSSクラスを使用した標準的なHTML実装です。デザイントークンにより一貫したスタイリングが可能です。

#### 必要なファイル

```html
<!-- デザイントークン -->
<link rel="stylesheet" href="path/to/css/variables.css">
<!-- Badgeコンポーネントスタイル -->
<link rel="stylesheet" href="path/to/css/html/data-display/badge.css">
```

#### 基本的な使用

```html
<!-- 基本構造 -->
<div class="ha-badge">
  <span class="badge badge--md badge--primary badge--standard">
    New
  </span>
</div>

<!-- インライン使用 -->
<span class="badge badge--md badge--success badge--standard">完了</span>
<span class="badge badge--md badge--warning badge--standard">保留中</span>
<span class="badge badge--md badge--error badge--standard">エラー</span>
<span class="badge badge--md badge--info badge--standard">お知らせ</span>
```

#### サイズバリエーション

```html
<!-- Small -->
<span class="badge badge--sm badge--primary badge--standard">Small</span>

<!-- Medium (デフォルト) -->
<span class="badge badge--md badge--primary badge--standard">Medium</span>

<!-- Large -->
<span class="badge badge--lg badge--primary badge--standard">Large</span>
```

#### カラーバリエーション

```html
<!-- Primary -->
<span class="badge badge--md badge--primary badge--standard">Primary</span>

<!-- Secondary -->
<span class="badge badge--md badge--secondary badge--standard">Secondary</span>

<!-- Success -->
<span class="badge badge--md badge--success badge--standard">Success</span>

<!-- Warning -->
<span class="badge badge--md badge--warning badge--standard">Warning</span>

<!-- Error -->
<span class="badge badge--md badge--error badge--standard">Error</span>

<!-- Info -->
<span class="badge badge--md badge--info badge--standard">Info</span>
```

#### スタイルバリエーション

```html
<!-- Standard (デフォルト) -->
<span class="badge badge--md badge--primary badge--standard">Standard</span>

<!-- Outlined -->
<span class="badge badge--md badge--primary badge--outlined">Outlined</span>

<!-- Soft -->
<span class="badge badge--md badge--primary badge--soft">Soft</span>
```

#### 形状バリエーション

```html
<!-- Pill Shape -->
<span class="badge badge--md badge--primary badge--standard badge--pill">
  Pill Badge
</span>

<!-- Dot (ステータスインジケーター) -->
<span class="badge badge--md badge--success badge--standard badge--dot"></span>
<span class="badge badge--md badge--error badge--standard badge--dot"></span>
<span class="badge badge--md badge--warning badge--standard badge--dot"></span>
```

#### アイコン付きバッジ

```html
<!-- アイコン + テキスト -->
<span class="badge badge--md badge--success badge--standard">
  <span class="badge__icon">
    <svg width="14" height="14" viewBox="0 0 16 16">
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
    </svg>
  </span>
  <span class="badge__content">完了</span>
</span>

<!-- アイコンのみ -->
<span class="badge badge--md badge--info badge--standard">
  <span class="badge__icon">
    <svg width="14" height="14" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
      <circle cx="8" cy="4.5" r="1"/>
    </svg>
  </span>
</span>
```

#### 通知カウントバッジ

```html
<!-- ボタンに通知バッジ -->
<button class="button" style="position: relative;">
  メッセージ
  <span class="badge badge--sm badge--error badge--standard badge--pill"
        style="position: absolute; top: -4px; right: -4px;">
    3
  </span>
</button>

<!-- アイコンに通知ドット -->
<div style="position: relative; display: inline-block;">
  <svg width="24" height="24" viewBox="0 0 16 16">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
  </svg>
  <span class="badge badge--sm badge--error badge--standard badge--dot"
        style="position: absolute; top: 0; right: 0;"></span>
</div>
```

#### 実用例

```html
<!-- リストアイテムのステータス -->
<ul class="list">
  <li class="list-item">
    <span>プロジェクトA</span>
    <span class="badge badge--sm badge--success badge--standard">進行中</span>
  </li>
  <li class="list-item">
    <span>プロジェクトB</span>
    <span class="badge badge--sm badge--warning badge--standard">保留</span>
  </li>
  <li class="list-item">
    <span>プロジェクトC</span>
    <span class="badge badge--sm badge--error badge--standard">停止</span>
  </li>
</ul>

<!-- タグとして使用 -->
<div class="tags">
  <span class="badge badge--sm badge--secondary badge--outlined badge--pill">React</span>
  <span class="badge badge--sm badge--secondary badge--outlined badge--pill">TypeScript</span>
  <span class="badge badge--sm badge--secondary badge--outlined badge--pill">CSS</span>
</div>

<!-- ステータスインジケーター -->
<div style="display: flex; align-items: center; gap: 8px;">
  <span class="badge badge--md badge--success badge--standard badge--dot"></span>
  <span>オンライン</span>
</div>
```

### Pattern 3: Tailwind CSS

Tailwind CSSのユーティリティクラスとデザイントークンを組み合わせた実装です。

```html
<!-- 基本的なバッジ -->
<span class="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium
             bg-[var(--primary-default)] text-white">
  New
</span>

<!-- Success バッジ -->
<span class="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium
             bg-[var(--success-default)] text-white">
  完了
</span>

<!-- Outlined バッジ -->
<span class="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium
             bg-transparent text-[var(--primary-default)] border border-[var(--primary-default)]">
  Outlined
</span>

<!-- Pill バッジ -->
<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
             bg-[var(--info-default)] text-white">
  Pill Badge
</span>

<!-- Dot バッジ -->
<span class="w-2 h-2 rounded-full bg-[var(--success-default)]"></span>

<!-- アイコン付き -->
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium
             bg-[var(--success-default)] text-white">
  <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
  </svg>
  完了
</span>
```

### Pattern 4: CSS-in-JS / Styled Components

React とstyled-componentsを使用した実装例です。

```tsx
import styled from 'styled-components';

const StyledBadge = styled.span<{
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  styleType?: 'standard' | 'outlined' | 'soft';
  pill?: boolean;
  dot?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  border: 1px solid transparent;
  white-space: nowrap;
  vertical-align: middle;
  transition: all var(--animation-duration-base) ease;

  /* Size */
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: 0.125rem 0.5rem;
          font-size: var(--font-size-xs);
          border-radius: var(--border-radius-sm);
          min-height: 1.25rem;
        `;
      case 'lg':
        return `
          padding: 0.375rem 0.75rem;
          font-size: var(--font-size-base);
          border-radius: var(--border-radius-md);
          min-height: 1.75rem;
        `;
      default:
        return `
          padding: 0.25rem 0.625rem;
          font-size: var(--font-size-sm);
          border-radius: var(--border-radius-md);
          min-height: 1.5rem;
        `;
    }
  }}

  /* Pill shape */
  ${({ pill, size = 'md' }) =>
    pill &&
    (size === 'sm'
      ? 'border-radius: 0.625rem;'
      : size === 'lg'
      ? 'border-radius: 0.875rem;'
      : 'border-radius: 0.75rem;')}

  /* Dot shape */
  ${({ dot, size = 'md' }) =>
    dot &&
    `
      padding: 0;
      min-height: 0;
      border-radius: 50%;
      ${
        size === 'sm'
          ? 'width: 0.375rem; height: 0.375rem;'
          : size === 'lg'
          ? 'width: 0.625rem; height: 0.625rem;'
          : 'width: 0.5rem; height: 0.5rem;'
      }
    `}

  /* Color variants */
  ${({ variant = 'primary', styleType = 'standard' }) => {
    const colors = {
      primary: 'var(--primary-default)',
      secondary: 'var(--color-neutral-500)',
      success: 'var(--success-default)',
      warning: 'var(--warning-default)',
      error: 'var(--error-default)',
      info: 'var(--info-default)',
    };

    const color = colors[variant];

    if (styleType === 'outlined') {
      return `
        background-color: transparent;
        color: ${color};
        border-color: ${color};
      `;
    }

    if (styleType === 'soft') {
      return `
        background-color: ${color};
        color: ${color};
        border-color: ${color};
        opacity: 0.15;
      `;
    }

    return `
      background-color: ${color};
      color: white;
      border-color: ${color};
    `;
  }}
`;

const BadgeIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 0.875rem;
    height: 0.875rem;
    fill: currentColor;
  }
`;

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  styleType?: 'standard' | 'outlined' | 'soft';
  pill?: boolean;
  dot?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  styleType = 'standard',
  pill = false,
  dot = false,
  icon,
  children,
}) => {
  return (
    <StyledBadge
      variant={variant}
      size={size}
      styleType={styleType}
      pill={pill}
      dot={dot}
    >
      {icon && <BadgeIcon>{icon}</BadgeIcon>}
      {!dot && children}
    </StyledBadge>
  );
};

// 使用例
export default function Example() {
  return (
    <div>
      <Badge variant="primary">New</Badge>
      <Badge variant="success" size="sm">完了</Badge>
      <Badge variant="warning" styleType="outlined">保留中</Badge>
      <Badge variant="error" pill>エラー</Badge>
      <Badge variant="info" dot />
      <Badge variant="success" icon={
        <svg viewBox="0 0 16 16">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>
      }>
        完了
      </Badge>
    </div>
  );
}
```

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
