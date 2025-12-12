# Component Usage Examples

**Hidearea Design System Tokens**
**最終更新:** 2025-12-10

---

## 概要

このディレクトリには、Hidearea Design System Tokensの実践的な使用例が含まれています。実装済みの29コンポーネント全てのデモ、テーマ切り替え機能、フレームワーク統合例を提供します。

---

## Examples

### 1. Basic Components (`/basic`)

全コンポーネントの基本的な使用例

**含まれるコンポーネント (29):**

**Forms (7):**
- ✅ Button (4バリアント: primary, secondary, ghost, danger)
- ✅ Input (通常/エラー/成功/無効)
- ✅ Checkbox (3サイズ: small, default, large)
- ✅ Radio (3サイズ: small, default, large)
- ✅ Select (ドロップダウン選択)
- ✅ Textarea (3サイズ: small, default, large)
- ✅ Switch (3サイズ: small, default, large)

**Feedback (6):**
- ✅ Badge (4種類: success, error, warning, info)
- ✅ Alert (4種類: success, error, warning, info)
- ✅ Toast (4種類: success, error, warning, info)
- ✅ Progress (5色 + 3サイズ + circle型)
- ✅ Skeleton (7種類: text, heading, avatar, button, card, list, table)
- ✅ Spinner (4サイズ + 7色)

**Data Display (5):**
- ✅ Card (通常/ホバー/選択)
- ✅ Table (ソート可能、ホバー行)
- ✅ List (3密度: compact, default, comfortable)
- ✅ Avatar (6サイズ + 6色 + 3形状 + ステータスインジケーター)
- ✅ Chip (3サイズ + 6色 + アイコン + 削除可能)

**Overlays (6):**
- ✅ Modal (オーバーレイ、アニメーション)
- ✅ Tooltip (4方向配置、自動調整)
- ✅ Dialog (5種類: confirmation, warning, destructive, info, success)
- ✅ Drawer (4位置: left, right, top, bottom)
- ✅ Popover (3サイズ + arrow)
- ✅ Dropdown (デフォルト + search)

**Navigation (5):**
- ✅ Navigation (active状態、hover)
- ✅ Tabs (3種類: line, enclosed, soft + 3サイズ)
- ✅ Breadcrumb (4種セパレーター + 3サイズ + クリックイベント)
- ✅ Pagination (3種類: default, simple, rounded)
- ✅ Menu (3サイズ: compact, default, comfortable)

**ファイル:**
- `index.html` - メインデモページ
- `components.css` - トークンを使用したコンポーネントスタイル
- `styles.css` - デモページのレイアウトスタイル
- `script.js` - テーマ切り替えとモーダル制御

**CSS構成:**
```
build/css/variables.css  → デザイントークン(CSS変数)
examples/basic/components.css → トークンを使用したコンポーネントスタイル
examples/basic/styles.css → レイアウトのみのカスタムスタイル
```

**実行方法:**
```bash
# ビルド済みのCSS変数ファイルが必要
cd packages/tokens
pnpm build

# ブラウザで開く
open examples/basic/index.html
```

### 2. Theme Switching (`/theming`)

動的テーマ切り替え機能のデモ

**機能:**
- ライト/ダークテーマ切り替え
- システム設定への自動追従
- ローカルストレージでの保存
- リアルタイムトークン値表示
- カラーパレットプレビュー

**ファイル:**
- `index.html` - テーマデモページ
- `styles.css` - デモページのスタイル(トークンを使用)
- `script.js` - テーマ管理ロジック

**CSS構成:**
```
build/css/variables.css  → デザイントークン(CSS変数)
examples/theming/styles.css → トークンを使用したデモスタイル
```

**実行方法:**
```bash
# ブラウザで開く
open examples/theming/index.html
```

### 3. Unified CSS (`/unified`)

統合CSS（`build/css/html/all.css`）を使用したサンプル

**特徴:**
- 1ファイルで全38コンポーネント対応
- `.ha-*` プレフィックス付きクラス
- プロトタイピングに最適
- ファイルサイズ: 約149KB

**ファイル:**
- `index.html` - 統合CSSデモページ
- `README.md` - 統合CSSの詳細説明

**使用方法:**
```html
<link rel="stylesheet" href="../../build/css/variables.css">
<link rel="stylesheet" href="../../build/css/html/all.css">

<div class="ha-button"><button>クリック</button></div>
<div class="ha-card"><h3>タイトル</h3></div>
```

**実行方法:**
```bash
open examples/unified/index.html
```

### 4. Integration (`/integration`)

各種フレームワークとの統合例（準備中）

**計画中の例:**
- React - Hooks を使ったテーマ管理
- Vue - Composition API での実装
- Vanilla JS - プレーンJavaScript実装

---

## 使い方

### ローカル開発サーバーで実行

```bash
# packages/tokensディレクトリで
# 簡易HTTPサーバーを起動
python3 -m http.server 8000

# ブラウザで開く
# http://localhost:8000/examples/basic/
# http://localhost:8000/examples/theming/
```

### トークンのビルド

examplesを実行する前に、トークンをビルドする必要があります：

```bash
cd packages/tokens
pnpm install
pnpm build
```

これにより、`build/css/variables.css` が生成されます。

---

## 主要機能の実装例

### テーマ切り替え

```javascript
// テーマを設定
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// ライトテーマに切り替え
setTheme('light');

// ダークテーマに切り替え
setTheme('dark');
```

### システム設定の検出

```javascript
// システムのカラースキーム設定を検出
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDark.matches) {
  setTheme('dark');
} else {
  setTheme('light');
}

// システム設定の変更を監視
prefersDark.addEventListener('change', (e) => {
  setTheme(e.matches ? 'dark' : 'light');
});
```

### コンポーネントのスタイリング

```css
/* ボタンのスタイル */
.btn-primary {
  background-color: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
  border-color: var(--component-button-primary-border-default);
}

.btn-primary:hover {
  background-color: var(--component-button-primary-background-hover);
  border-color: var(--component-button-primary-border-hover);
}
```

---

## コンポーネント一覧 (29)

### Forms (7)

| コンポーネント | バリアント | 状態 | デモ |
|--------------|----------|------|------|
| Button | primary, secondary, ghost, danger | default, hover, active, disabled | ✅ basic |
| Input | default | default, hover, focus, disabled, error, success | ✅ basic |
| Checkbox | small, default, large | checked, unchecked, indeterminate | ✅ basic |
| Radio | small, default, large | selected, unselected | ✅ basic |
| Select | default | default, hover, focus, disabled | ✅ basic |
| Textarea | small, default, large | default, hover, focus, disabled | ✅ basic |
| Switch | small, default, large | on, off | ✅ basic |

### Feedback (6)

| コンポーネント | バリアント | デモ |
|--------------|----------|------|
| Badge | success, error, warning, info | ✅ basic |
| Alert | success, error, warning, info | ✅ basic |
| Toast | success, error, warning, info | ✅ basic |
| Progress | primary, success, error, warning, info | ✅ basic |
| Skeleton | text, heading, avatar, button, card, list, table | ✅ basic |
| Spinner | 4サイズ + 7色 | ✅ basic |

### Data Display (5)

| コンポーネント | 機能 | デモ |
|--------------|-----|------|
| Card | hover, selected状態 | ✅ basic |
| Table | hover行、ソート | ✅ basic |
| List | compact, default, comfortable密度 | ✅ basic |
| Avatar | 6サイズ + 6色 + ステータス | ✅ basic |
| Chip | 3サイズ + 6色 + 削除可能 | ✅ basic |

### Overlays (6)

| コンポーネント | 機能 | デモ |
|--------------|-----|------|
| Modal | オーバーレイ、アニメーション | ✅ basic |
| Tooltip | 4方向配置、自動調整 | ✅ basic |
| Dialog | 5種類 (confirmation, warning, destructive, info, success) | ✅ basic |
| Drawer | 4位置 (left, right, top, bottom) | ✅ basic |
| Popover | 3サイズ + arrow | ✅ basic |
| Dropdown | search機能付き | ✅ basic |

### Navigation (5)

| コンポーネント | 機能 | デモ |
|--------------|-----|------|
| Navigation | active状態、hover | ✅ basic |
| Tabs | line, enclosed, soft + 3サイズ | ✅ basic |
| Breadcrumb | 4種セパレーター + クリックイベント | ✅ basic |
| Pagination | default, simple, rounded | ✅ basic |
| Menu | 3サイズ (compact, default, comfortable) | ✅ basic |

---

## ブラウザサポート

### 必須機能
- CSS Custom Properties (CSS Variables)
- `data-*` 属性
- `:focus-visible` 疑似クラス
- `prefers-color-scheme` メディアクエリ

### 対応ブラウザ
- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

### フォールバック

古いブラウザ向けにフォールバック値を提供：

```css
.element {
  /* フォールバック値 */
  background-color: #3b82f6;
  /* CSS変数（対応ブラウザのみ） */
  background-color: var(--primary-default, #3b82f6);
}
```

---

## パフォーマンス

### バンドルサイズ

```
build/css/variables.css: 100 KB raw / 20 KB gzip
examples/basic/styles.css: 15 KB raw / 4 KB gzip
examples/basic/script.js: 2 KB raw / 1 KB gzip
```

### 最適化のヒント

1. **使用するトークンのみをインポート**
   ```javascript
   // 必要なトークンのみ
   import { button, input } from '@hidearea-design/tokens';
   ```

2. **CSS変数のスコープを最小化**
   ```css
   /* グローバルに定義 */
   :root {
     --custom-color: var(--primary-default);
   }
   ```

3. **トランジションを制御**
   ```css
   /* ユーザーが減らされたモーションを好む場合
   @media (prefers-reduced-motion: reduce) {
     * {
       transition: none !important;
     }
   }
   ```

---

## トラブルシューティング

### Q: トークンが適用されない

**確認事項:**
1. `variables.css` が正しく読み込まれているか
2. `data-theme` 属性が `<html>` に設定されているか
3. ブラウザの開発者ツールで CSS変数の値を確認

```javascript
// CSS変数の値を確認
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-default');
console.log('Primary color:', primary);
```

### Q: テーマが切り替わらない

**確認事項:**
1. JavaScript が正しく実行されているか（コンソールエラーを確認）
2. `data-theme` 属性が正しく設定されているか
3. ブラウザのキャッシュをクリア

### Q: モーダルが表示されない

**確認事項:**
1. `z-index` が適切に設定されているか
2. `display: none` が上書きされていないか
3. JavaScriptのイベントリスナーが正しく登録されているか

---

## 次のステップ

### さらに学ぶ

- [アーキテクチャガイド](../docs/アーキテクチャガイド.md) - 二層変数システムの詳細
- [使用方法ガイド](../docs/使用方法ガイド.md) - 基本的な使い方
- [コンポーネントリファレンス](../docs/components/) - 各コンポーネントの詳細

### 貢献する

新しい使用例を追加したい場合：

1. 適切なディレクトリに配置（`basic/`, `theming/`, `integration/`）
2. README を更新
3. Pull Request を作成

---

## ライセンス

このプロジェクトのライセンスに従います。

---

## フィードバック

問題や改善提案は、[GitHub Issues](https://github.com/hardlitchi/hidearea-design/issues)で報告してください。
