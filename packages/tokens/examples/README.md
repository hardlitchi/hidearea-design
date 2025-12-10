# Component Usage Examples

**Hidearea Design System Tokens**
**最終更新:** 2025-12-10

---

## 概要

このディレクトリには、Hidearea Design System Tokensの実践的な使用例が含まれています。実装済みの9コンポーネント全てのデモ、テーマ切り替え機能、フレームワーク統合例を提供します。

---

## Examples

### 1. Basic Components (`/basic`)

全コンポーネントの基本的な使用例

**含まれるコンポーネント:**
- ✅ Button (4バリアント)
- ✅ Input (通常/エラー/無効)
- ✅ Badge (4種類)
- ✅ Alert (4種類)
- ✅ Card (通常/ホバー/選択)
- ✅ Table
- ✅ Modal
- ✅ Tooltip
- ✅ Navigation

**ファイル:**
- `index.html` - メインデモページ
- `styles.css` - 全コンポーネントのスタイル
- `script.js` - テーマ切り替えとモーダル制御

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
- `script.js` - テーマ管理ロジック

**実行方法:**
```bash
# ブラウザで開く
open examples/theming/index.html
```

### 3. Integration (`/integration`)

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

## コンポーネント一覧

### Forms

| コンポーネント | バリアント | 状態 | デモ |
|--------------|----------|------|------|
| Button | primary, secondary, ghost, danger | default, hover, active, disabled | ✅ basic |
| Input | default | default, hover, focus, disabled, error | ✅ basic |

### Feedback

| コンポーネント | バリアント | デモ |
|--------------|----------|------|
| Badge | success, error, warning, info | ✅ basic |
| Alert | success, error, warning, info | ✅ basic |

### Data Display

| コンポーネント | 機能 | デモ |
|--------------|-----|------|
| Card | hover, selected状態 | ✅ basic |
| Table | hover行 | ✅ basic |

### Overlays

| コンポーネント | 機能 | デモ |
|--------------|-----|------|
| Modal | オーバーレイ、アニメーション | ✅ basic |
| Tooltip | ホバー表示 | ✅ basic |

### Navigation

| コンポーネント | 機能 | デモ |
|--------------|-----|------|
| Navigation | active状態、hover | ✅ basic |

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
