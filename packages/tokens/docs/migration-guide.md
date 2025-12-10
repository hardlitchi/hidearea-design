# 移行ガイド

**対象:** Hidearea Design System Tokens v1.x → v2.x
**最終更新:** 2025-12-10

---

## 概要

このガイドは、旧トークンシステムから新しい二層変数アーキテクチャへの移行をサポートします。Phase 3-4で実装された新構造により、テーマ切り替え、コンポーネントの一貫性、メンテナンス性が大幅に向上しました。

### 主な変更点

1. **二層変数アーキテクチャの導入**
   - コンポーネントトークン → セマンティックトークン → テーマトークン
   - 動的テーマ切り替え対応

2. **コンポーネントトークンの再構成**
   - 機能別カテゴリ構造（forms, feedback, overlays, data-display, navigation）
   - 一貫した命名規則

3. **ファイル形式の統一**
   - 全てYAML形式に統一
   - 包括的なコメント追加

---

## 破壊的変更

### ⚠️ 重要な破壊的変更

以下の変更は既存コードに影響を与える可能性があります：

#### 1. トークン参照形式の変更

**変更前（v1.x）:**
```css
/* 直接色値を参照 */
.button {
  background-color: var(--color-blue-500);
  color: var(--color-white);
}
```

**変更後（v2.x）:**
```css
/* コンポーネントトークン経由で参照 */
.button {
  background-color: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
}

/* またはセマンティックトークン */
.button {
  background-color: var(--primary-default);
  color: var(--foreground-inverse);
}
```

#### 2. CSS変数の命名規則変更

**変更前:**
```css
--color-blue-500
--spacing-md
--font-size-base
```

**変更後:**
```css
/* Base tokens */
--color-blue-500

/* Semantic tokens */
--primary-default
--spacing-4
--font-size-base

/* Component tokens */
--component-button-primary-background-default
```

#### 3. テーマ切り替え方法の変更

**変更前（v1.x）:**
```javascript
// テーマ切り替え: 全CSS変数を手動で上書き
document.documentElement.style.setProperty('--color-primary', '#60a5fa');
document.documentElement.style.setProperty('--color-background', '#1a1a1a');
// ... 多数の変数を個別に設定
```

**変更後（v2.x）:**
```javascript
// テーマ切り替え: data-theme属性のみ
document.documentElement.setAttribute('data-theme', 'dark');
// すべてのコンポーネントが自動的に切り替わる
```

---

## 移行手順

### ステップ1: トークンパッケージの更新

```bash
# 最新版にアップデート
pnpm install @hidearea/design-tokens@latest

# またはnpm
npm install @hidearea/design-tokens@latest
```

### ステップ2: CSS変数のインポート確認

**変更前:**
```css
/* 旧インポート */
@import '@hidearea/design-tokens/dist/tokens.css';
```

**変更後:**
```css
/* 新インポート */
@import '@hidearea/design-tokens/dist/css/variables.css';
```

### ステップ3: トークン参照の移行

#### パターン1: コンポーネントトークンへの移行

最も推奨されるアプローチです。

**移行前:**
```css
.custom-button {
  padding: var(--spacing-md);
  background-color: var(--color-blue-500);
  color: var(--color-white);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
}

.custom-button:hover {
  background-color: var(--color-blue-600);
}
```

**移行後:**
```css
.custom-button {
  padding: var(--component-button-padding-vertical)
           var(--component-button-padding-horizontal);
  background-color: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
  border-radius: var(--component-button-border-radius-default);
  font-size: var(--component-button-font-size-default);
}

.custom-button:hover {
  background-color: var(--component-button-primary-background-hover);
}
```

**メリット:**
- テーマ切り替えが自動的に動作
- コンポーネント間の一貫性
- メンテナンスが容易

#### パターン2: セマンティックトークンへの移行

カスタムコンポーネントに適しています。

**移行前:**
```css
.hero-section {
  background-color: var(--color-gray-900);
  color: var(--color-gray-100);
  padding: var(--spacing-lg);
}
```

**移行後:**
```css
.hero-section {
  background-color: var(--background-primary);
  color: var(--foreground-primary);
  padding: var(--spacing-8);
}
```

**メリット:**
- テーマ切り替え対応
- セマンティックな意味を持つ
- Base tokenより抽象度が高い

#### パターン3: Base tokenの直接参照（非推奨）

特殊なケースのみ使用してください。

```css
.special-case {
  /* テーマに依存しない固定値が必要な場合のみ */
  color: var(--color-blue-500);
}
```

### ステップ4: テーマ切り替えの実装

**HTML構造:**
```html
<!DOCTYPE html>
<html lang="ja" data-theme="light">
<head>
  <link rel="stylesheet" href="path/to/variables.css">
</head>
<body>
  <!-- コンテンツ -->
</body>
</html>
```

**JavaScript実装:**
```javascript
// シンプルなテーマ切り替え
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);

  // 選択状態を保存（オプション）
  localStorage.setItem('theme', newTheme);
}

// ページロード時にテーマを復元
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
});
```

**React実装:**
```tsx
import { useEffect, useState } from 'react';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // 保存されたテーマを復元
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### ステップ5: コンポーネントの移行

既存のFormsカテゴリーコンポーネントの移行例：

#### Button の移行

**移行前:**
```html
<button class="btn btn-primary">Click me</button>

<style>
.btn {
  padding: 0.5rem 1rem;
  background-color: var(--color-blue-500);
  color: white;
  border: none;
  border-radius: 0.375rem;
}

.btn:hover {
  background-color: var(--color-blue-600);
}
</style>
```

**移行後:**
```html
<button class="button button-primary">Click me</button>

<style>
.button {
  padding: var(--component-button-padding-vertical)
           var(--component-button-padding-horizontal);
  font-size: var(--component-button-font-size-default);
  border-radius: var(--component-button-border-radius-default);
  transition: var(--component-button-transition-properties)
              var(--component-button-transition-duration)
              var(--component-button-transition-timing);
}

.button-primary {
  background-color: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
  border: var(--component-button-primary-border-width-default) solid
          var(--component-button-primary-border-default);
}

.button-primary:hover {
  background-color: var(--component-button-primary-background-hover);
  border-color: var(--component-button-primary-border-hover);
}

.button-primary:focus {
  outline: none;
  box-shadow: 0 0 0 var(--component-button-primary-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-button-primary-focus-ring-width) +
                var(--component-button-primary-focus-ring-offset))
                var(--component-button-primary-focus-ring-color);
}
</style>
```

#### Input の移行

**移行前:**
```html
<input type="text" class="input" placeholder="Enter text">

<style>
.input {
  padding: 0.5rem 0.75rem;
  background-color: white;
  border: 1px solid var(--color-gray-300);
  border-radius: 0.375rem;
}

.input:focus {
  border-color: var(--color-blue-500);
  outline: none;
}
</style>
```

**移行後:**
```html
<div class="input-group">
  <label class="input-label" for="username">Username</label>
  <input type="text" class="input" id="username" placeholder="Enter username">
  <span class="input-helper">Choose a unique username</span>
</div>

<style>
/* 完全な実装は docs/components/input.md を参照 */
.input {
  padding: var(--component-input-padding-vertical)
           var(--component-input-padding-horizontal);
  background-color: var(--component-input-background-default);
  border: var(--component-input-border-width-default) solid
          var(--component-input-border-default);
  border-radius: var(--component-input-border-radius-default);
}

.input:focus {
  border-color: var(--component-input-border-focus);
  box-shadow: 0 0 0 var(--component-input-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-input-focus-ring-width) +
                var(--component-input-focus-ring-offset))
                var(--component-input-focus-ring-color-default);
}
</style>
```

---

## トークンマッピング表

### 色トークンのマッピング

| 旧トークン (v1.x) | 新トークン (v2.x) | 用途 |
|------------------|-------------------|------|
| `--color-blue-500` | `--primary-default` | プライマリーカラー |
| `--color-red-500` | `--error-default` | エラー状態 |
| `--color-green-500` | `--success-default` | 成功状態 |
| `--color-yellow-500` | `--warning-default` | 警告状態 |
| `--color-gray-900` | `--background-primary` | 主背景 |
| `--color-gray-100` | `--background-secondary` | 副背景 |
| `--color-white` | `--foreground-inverse` | 反転テキスト |
| `--color-gray-700` | `--foreground-primary` | 主テキスト |
| `--color-gray-500` | `--foreground-secondary` | 副テキスト |
| `--color-gray-300` | `--border-default` | デフォルトボーダー |

### スペーシングトークンのマッピング

| 旧トークン | 新トークン | 値 |
|-----------|-----------|-----|
| `--spacing-xs` | `--spacing-1` | 0.25rem (4px) |
| `--spacing-sm` | `--spacing-2` | 0.5rem (8px) |
| `--spacing-md` | `--spacing-4` | 1rem (16px) |
| `--spacing-lg` | `--spacing-6` | 1.5rem (24px) |
| `--spacing-xl` | `--spacing-8` | 2rem (32px) |

### タイポグラフィトークンのマッピング

| 旧トークン | 新トークン | 値 |
|-----------|-----------|-----|
| `--font-size-sm` | `--font-size-sm` | 0.875rem (14px) |
| `--font-size-base` | `--font-size-base` | 1rem (16px) |
| `--font-size-lg` | `--font-size-lg` | 1.125rem (18px) |
| `--font-size-xl` | `--font-size-xl` | 1.25rem (20px) |

---

## 移行チェックリスト

### 必須タスク

- [ ] パッケージを最新版に更新
- [ ] CSS変数のインポートパスを確認
- [ ] 全てのコンポーネントのトークン参照を更新
- [ ] テーマ切り替え機能を実装
- [ ] ライト/ダークテーマで表示確認

### 推奨タスク

- [ ] コンポーネントドキュメントを確認（`docs/components/`）
- [ ] アクセシビリティガイドラインに準拠（WCAG 2.1）
- [ ] パフォーマンス測定を実行（`pnpm measure:size`）
- [ ] ビルドサイズが予算内か確認
- [ ] TypeScript型定義を更新（使用している場合）

### オプションタスク

- [ ] カスタムテーマの作成
- [ ] Storybook統合
- [ ] コンポーネントライブラリの構築
- [ ] デザインシステムのドキュメント整備

---

## トラブルシューティング

### 問題: テーマが切り替わらない

**原因:** `data-theme` 属性が正しく設定されていない

**解決策:**
```javascript
// HTML要素に data-theme 属性があるか確認
console.log(document.documentElement.getAttribute('data-theme'));

// 正しく設定
document.documentElement.setAttribute('data-theme', 'dark');
```

### 問題: 一部のコンポーネントでトークンが適用されない

**原因:** CSS変数の参照が旧形式のまま

**解決策:**
```css
/* ❌ 旧形式 */
.button {
  background: var(--color-blue-500);
}

/* ✅ 新形式 */
.button {
  background: var(--component-button-primary-background-default);
}
```

### 問題: ビルドエラーが発生する

**原因:** トークンファイルの形式が古い、または存在しないトークンを参照

**解決策:**
1. `node_modules` を削除して再インストール
2. トークン参照を最新のドキュメントで確認
3. `pnpm build:tokens` でビルドエラーを確認

### 問題: カスタムテーマが動作しない

**原因:** テーマトークンの優先順位が正しくない

**解決策:**
```css
/* カスタムテーマは data-theme の後に定義 */
[data-theme="light"] {
  --primary-default: #3b82f6;
}

[data-theme="custom"] {
  --primary-default: #8b5cf6; /* カスタムプライマリーカラー */
}
```

---

## さらなる情報

- [アーキテクチャガイド](./アーキテクチャガイド.md) - 二層変数システムの詳細
- [使用方法ガイド](./使用方法ガイド.md) - トークンの使い方
- [コンポーネントリファレンス](./components/README.md) - 各コンポーネントの詳細
- [リファクタリング計画](../notes/リファクタリング計画.md) - 実装の背景

---

## サポート

質問や問題が発生した場合：

1. **ドキュメントを確認**: `docs/` ディレクトリ内の関連ドキュメント
2. **サンプルコードを参照**: `examples/basic/` の実装例
3. **Issueを作成**: GitHub Issuesで問題を報告

---

**移行ガイド v2.0**
**最終更新: 2025-12-10**
