# @hidearea-design/tokens

Hidearea Design Systemのデザイントークンパッケージ

## 概要

このパッケージは、Hidearea Design Systemの視覚的デザイン言語を定義するデザイントークンを提供します。**ベーストークン**（基礎的な値）と**セマンティックトークン**（文脈固有の値）の両方が含まれています。

## インストール

```bash
npm install @hidearea-design/tokens
```

## 使用方法

### JavaScript/TypeScript

```javascript
// デザイントークンをインポート
import { colors, spacing, typography } from '@hidearea-design/tokens';

console.log(colors.primary[500]); // #3B82F6
console.log(spacing.md); // 16px
console.log(typography.fontSize.base); // 16px

// コンポーネントスタイル（CSS-in-JS）をインポート
import buttonStyles from '@hidearea-design/tokens/styles/button';
import inputStyles from '@hidearea-design/tokens/styles/input';

console.log(buttonStyles); // コンポーネントスタイルオブジェクト
```

### CSS

**4つのビルドパターンが利用可能です:**

#### Pattern 1: WebComponents（`:host`セレクタ）

```css
/* WebComponents用 - Shadow DOM対応 */
@import '@hidearea-design/tokens/css/components/layout/button.css';
/* :host セレクタを使用 */
```

#### Pattern 2: Plain HTML（クラスセレクタ）

```css
/* シンプルなHTML用 - examples/basic向け */
@import '@hidearea-design/tokens/css/html/layout/button.css';
/* .ha-button クラスを使用 */

/* または全コンポーネントを一括インポート */
@import '@hidearea-design/tokens/css/html/all.css';
```

```html
<!-- 使用例 -->
<div class="ha-button">クリック</div>
```

#### Pattern 3: React/Vue（JavaScriptインポート）

```javascript
// WebComponents版
import { buttonStyles } from '@hidearea-design/tokens/styles/button';

// HTML版（クラスセレクタ）
import { buttonHtmlStyles } from '@hidearea-design/tokens/styles/button';

// 全てインポート
import * as styles from '@hidearea-design/tokens/styles';
```

#### Pattern 4: 統合CSS（全コンポーネント1ファイル）

```css
/* WebComponents版（147KB） */
@import '@hidearea-design/tokens/css/all.css';

/* HTML版（149KB） */
@import '@hidearea-design/tokens/css/html/all.css';
```

#### デザイントークンの使用

```css
.my-element {
  /* ベーストークン */
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  font-size: var(--font-size-base);

  /* セマンティックトークン */
  background: var(--component-button-primary-background-default);
  border: 1px solid var(--component-button-primary-border-default);
}

.my-element:hover {
  background: var(--component-button-primary-background-hover);
}
```

## 利用可能なトークン

- **カラー**: プライマリ、セカンダリ、ニュートラル、セマンティックカラー
- **タイポグラフィ**: フォントサイズ、ウェイト、行高
- **スペーシング**: 一貫したスペーシングスケール
- **ボーダー**: ボーダー幅、角丸
- **シャドウ**: 奥行きを表現するボックスシャドウ
- **ブレークポイント**: レスポンシブデザインブレークポイント
- **Z-Index**: レイヤリングスケール
- **アニメーション**: タイミング関数と期間

## トークンカテゴリ

### ベーストークン

コアとなる視覚言語を定義する基礎デザイントークン：

- **カラー**: プライマリ、セカンダリ、ニュートラル、セマンティックカラー（青、グレー、赤など）
- **タイポグラフィ**: フォントファミリー、サイズ、ウェイト、行高
- **スペーシング**: 一貫したスペーシングスケール（0-96）
- **ボーダー**: ボーダー幅、角丸
- **シャドウ**: 奥行きを表現するボックスシャドウ
- **ブレークポイント**: レスポンシブデザインブレークポイント
- **アニメーション**: タイミング関数と期間

### セマンティックトークン

デザイン意図を特定のユースケースにマッピングする文脈固有のトークン：

- **コンポーネントトークン**: Button、Input、Card、Badge、Alert、Table、Navigation、Modal、Tooltipなど
- **状態トークン**: Focus、Hover、Disabled、Loading、Success、Warning、Error
- **サーフェストークン**: Base、Raised、Overlay、Sunken、Interactive
- **テキストトークン**: 見出し（h1-h6）、本文、キャプション、ラベル、ヘルパー、コード、リンク
- **レイアウトトークン**: Container、Section、Grid、Stack、Inline
- **インタラクショントークン**: トランジション、アニメーション、カーソル

詳細は[セマンティックトークンガイド](./docs/セマンティックトークンガイド.md)を参照してください。

## テーマサポート

トークンはライトテーマとダークテーマに自動的に対応します：

```html
<!-- ライトテーマ（デフォルト） -->
<body data-theme="light">
  <button class="button-primary">クリック</button>
</body>

<!-- ダークテーマ -->
<body data-theme="dark">
  <button class="button-primary">クリック</button>
</body>
```

セマンティックトークンを使用するコンポーネントは、自動的に外観が更新されます。

## 実装済みコンポーネント（全29コンポーネント）

### Forms（7コンポーネント）
- **Button** - ボタン（4バリアント: primary, secondary, ghost, danger）
- **Input** - テキスト入力（7状態: default, hover, focus, error, success, disabled, readonly）
- **Checkbox** - チェックボックス（3サイズ: small, default, large）
- **Radio** - ラジオボタン（3サイズ）
- **Select** - セレクトボックス（7状態）
- **Textarea** - テキストエリア（7状態）
- **Switch** - スイッチトグル（インタラクティブAPI付き）

### Feedback（6コンポーネント）
- **Badge** - バッジ（6バリアント: primary, success, error, warning, info, neutral）
- **Alert** - アラート（4バリアント: success, error, warning, info）
- **Toast** - トースト通知（4バリアント）
- **Progress** - プログレスバー（3バリアント）
- **Skeleton** - スケルトンローディング（3種類）
- **Spinner** - スピナー（3サイズ）

### Overlays（6コンポーネント）
- **Modal** - モーダル（3サイズ）
- **Tooltip** - ツールチップ（4方向、複数行対応、自動配置調整）
- **Dialog** - ダイアログ（3種類）
- **Drawer** - ドロワー（4方向）
- **Popover** - ポップオーバー（4方向）
- **Dropdown** - ドロップダウン（複数バリアント）

### Data Display（5コンポーネント）
- **Card** - カード（3状態: default, hover, selected）
- **Table** - テーブル（ソート可能、選択可能、レスポンシブ）
- **List** - リスト（3密度、インタラクティブ状態）
- **Avatar** - アバター（6サイズ、6カラー、3形状、ステータスインジケーター）
- **Chip** - チップ（3サイズ、6カラー、削除可能）

### Navigation（5コンポーネント）
- **Navigation** - ナビゲーション（3状態: default, active, hover）
- **Tabs** - タブ（3バリアント）
- **Breadcrumb** - パンくずリスト（クリックイベント、キーボードナビゲーション）
- **Pagination** - ページネーション（複数サイズ）
- **Menu** - メニュー（階層構造サポート）

## 開発

### ビルド

```bash
npm run build
```

### 自動デプロイメント

デザイントークンはmainブランチへのマージ時に自動デプロイされます：

```bash
# 変更をローカルで検出
npm run changes

# JSON/Markdown出力
npm run changes:json
npm run changes:markdown
```

詳細は[デプロイメントガイド](./docs/デプロイメントガイド.md)を参照してください。

### Figmaトークン同期

FigmaとStyle Dictionary間でデザイントークンを同期：

```bash
# Figma APIから同期（Enterpriseアカウント）
npm run figma:sync

# Figma Variables JSONエクスポートからインポート
npm run figma:import path/to/figma-export.json

# トークン構造の検証
npm run figma:validate
```

詳細は[Figma連携ガイド](./docs/Figma連携ガイド.md)を参照してください。

### パフォーマンス監視

このパッケージには、最適なバンドルサイズを保証する包括的なパフォーマンス監視が含まれています。

```bash
# バンドルサイズを測定
npm run perf:bundle

# パフォーマンスレポートを生成
npm run perf:report

# 両方を実行
npm run perf
```

詳細は[パフォーマンス監視ガイド](./docs/パフォーマンス監視ガイド.md)を参照してください。

## パフォーマンスバジェット

現在のバンドルサイズ（セマンティックトークン含む）：

| ファイル | 現在（Gzip圧縮後） | バジェット | 使用率 | ステータス |
|---------|-------------------|-----------|--------|-----------|
| `js/index.js` | 5.11 KB | 15 KB | 34.0% | ✓ OK |
| `css/variables.css` | 5.22 KB | 20 KB | 26.1% | ✓ OK |
| `scss/variables.scss` | N/A | 20 KB | N/A | ✓ OK |

**パフォーマンススコア**: 161/100（🟢 優秀）

## デモページ

実際の動作を確認できます：
https://example.tokens.design.sb.hidearea.net/examples/basic/index.html

## ドキュメント

詳細なドキュメントは[docs/](./docs/)ディレクトリを参照してください：

### 技術ガイド
- **[使用方法ガイド](./docs/使用方法ガイド.md)** - 基本的な使用方法
- **[アーキテクチャガイド](./docs/アーキテクチャガイド.md)** - システムアーキテクチャ
- **[セマンティックトークンガイド](./docs/セマンティックトークンガイド.md)** - セマンティックトークン詳細
- **[パフォーマンス監視ガイド](./docs/パフォーマンス監視ガイド.md)** - パフォーマンス計測
- **[デプロイメントガイド](./docs/デプロイメントガイド.md)** - 自動デプロイメント
- **[Figma連携ガイド](./docs/Figma連携ガイド.md)** - Figma同期方法

### コンポーネントドキュメント
- **[コンポーネント一覧](./docs/components/README.md)** - 全29コンポーネントのドキュメント

## ベストプラクティス

### 1. セマンティックトークンを優先

保守性とテーマサポートのため、コンポーネントスタイルではセマンティックトークンを使用：

```css
/* 良い ✓ */
.button {
  background: var(--component-button-primary-background-default);
}

/* 避ける ✗ */
.button {
  background: var(--color-blue-500);
}
```

### 2. テーマ対応トークンを使用

セマンティックトークンは自動的にテーマに適応し、コードの重複を削減：

```css
/* ライト/ダークテーマで自動的に動作 */
.card {
  background: var(--component-card-background-default);
  border: 1px solid var(--component-card-border-default);
}
```

### 3. トークンを階層化

ベース → セマンティック → コンポーネント固有の階層を構築：

```css
/* ベーストークン */
--color-blue-500: #3B82F6;

/* セマンティックトークンがベースを参照 */
--component-button-primary-background-default: var(--color-primary-500);

/* コンポーネントがセマンティックを使用 */
.button-primary {
  background: var(--component-button-primary-background-default);
}
```

## 使用例

### Buttonコンポーネント

```css
.button {
  /* レイアウト */
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);

  /* タイポグラフィ */
  font-size: var(--text-body-default-fontSize);
  font-weight: var(--font-weight-medium);

  /* インタラクション */
  transition: all var(--interaction-transition-fast-duration);
  cursor: var(--interaction-cursor-pointer);
}

.button--primary {
  background: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
  border: 1px solid var(--component-button-primary-border-default);
}

.button--primary:hover {
  background: var(--component-button-primary-background-hover);
}

.button--primary:focus-visible {
  outline: var(--state-focus-ring-width) solid var(--state-focus-ring-color);
  outline-offset: var(--state-focus-ring-offset);
}

.button--primary:disabled {
  background: var(--component-button-primary-background-disabled);
  opacity: var(--state-disabled-opacity);
  cursor: var(--state-disabled-cursor);
}
```

### Cardコンポーネント

```css
.card {
  background: var(--component-card-background-default);
  border: 1px solid var(--component-card-border-default);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--surface-raised-elevation);
  transition: all var(--interaction-transition-normal-duration);
}

.card:hover {
  background: var(--component-card-background-hover);
  border-color: var(--component-card-border-hover);
  box-shadow: var(--state-hover-elevation-medium);
}

.card--selected {
  background: var(--component-card-background-selected);
  border-color: var(--component-card-border-selected);
}
```

## ビルドパターン

このパッケージは4つの異なるビルドパターンを提供し、様々なユースケースに対応しています:

### Pattern 1: WebComponents (Shadow DOM)

**用途**: Web Components、Shadow DOM を使用するカスタム要素

**特徴**:
- `:host` セレクタを使用
- Shadow DOM のカプセル化に対応
- スコープ化されたスタイル

**ファイル**: `build/css/components/**/*.css`

```css
/* 例: button.css */
:host {
  display: inline-block;
}

button {
  padding: var(--spacing-2-5);
}
```

### Pattern 2: Plain HTML (Class Selectors)

**用途**: シンプルなHTML、静的サイト、examples/basic/

**特徴**:
- `.ha-*` プレフィックス付きクラスセレクタ
- `:host` は `.ha-component-name` に変換
- 直接HTMLから参照可能

**ファイル**: `build/css/html/**/*.css`

```css
/* 例: button.css */
.ha-button {
  display: inline-block;
}

button {
  padding: var(--spacing-2-5);
}
```

```html
<div class="ha-button">
  <button>クリック</button>
</div>
```

### Pattern 3: React/Vue/TypeScript (JavaScript Exports)

**用途**: React、Vue、その他のJavaScriptフレームワーク

**特徴**:
- CSSをJavaScript文字列としてエクスポート
- WebComponents版とHTML版の両方を提供
- TypeScript型定義付き

**ファイル**: `build/js/styles/*.js`, `*.d.ts`

```typescript
import { buttonStyles, buttonHtmlStyles } from '@hidearea-design/tokens/styles/button';

// WebComponents版を使用
const styleElement = document.createElement('style');
styleElement.textContent = buttonStyles;

// HTML版を使用（クラスセレクタ）
const htmlStyleElement = document.createElement('style');
htmlStyleElement.textContent = buttonHtmlStyles;
```

### Pattern 4: Unified CSS (All-in-One)

**用途**: プロトタイピング、デモページ、一括インポート

**特徴**:
- 全38コンポーネントを1ファイルに統合
- WebComponents版とHTML版の両方
- ファイルサイズ: 約147-149KB

**ファイル**:
- `build/css/all.css` (WebComponents版)
- `build/css/html/all.css` (HTML版)

```html
<!-- WebComponents版 -->
<link rel="stylesheet" href="node_modules/@hidearea-design/tokens/css/all.css">

<!-- HTML版 -->
<link rel="stylesheet" href="node_modules/@hidearea-design/tokens/css/html/all.css">
```

## トークン構造

```
tokens/
├── src/
│   ├── base/              # ベーストークン（YAML）
│   │   ├── colors.yaml
│   │   ├── typography.yaml
│   │   ├── spacing.yaml
│   │   └── ...
│   ├── semantic/          # セマンティックトークン（JSON）
│   │   ├── components.json
│   │   ├── states.json
│   │   ├── surfaces.json
│   │   ├── typography.json
│   │   ├── layout.json
│   │   ├── interactions.json
│   │   └── aliases.json
│   ├── themes/            # テーマオーバーライド
│   │   ├── light/
│   │   │   ├── colors.json
│   │   │   └── semantic.json
│   │   └── dark/
│   │       ├── colors.json
│   │       └── semantic.json
│   └── css/components/    # コンポーネントスタイル（カテゴリ別に整理）
│       ├── forms/         # フォームコンポーネント (10)
│       │   ├── button.css
│       │   ├── input.css
│       │   ├── checkbox.css
│       │   ├── radio.css
│       │   ├── select.css
│       │   ├── textarea.css
│       │   ├── switch.css
│       │   ├── form-group.css
│       │   ├── file-upload.css
│       │   ├── date-picker.css
│       │   └── time-picker.css
│       ├── data-display/  # データ表示コンポーネント (11)
│       │   ├── card.css
│       │   ├── table.css
│       │   ├── list-container.css
│       │   ├── list-item.css
│       │   ├── list-divider.css
│       │   ├── avatar.css
│       │   ├── avatar-group.css
│       │   ├── badge.css
│       │   ├── chip.css
│       │   ├── accordion.css
│       │   └── datagrid.css
│       ├── navigation/    # ナビゲーションコンポーネント (4)
│       │   ├── breadcrumb.css
│       │   ├── menu.css
│       │   ├── pagination.css
│       │   └── tabs.css
│       ├── overlays/      # オーバーレイコンポーネント (3)
│       │   ├── modal.css
│       │   ├── drawer.css
│       │   └── tooltip.css
│       ├── feedback/      # フィードバックコンポーネント (6)
│       │   ├── alert.css
│       │   ├── toast.css
│       │   ├── toast-container.css
│       │   ├── progress.css
│       │   ├── skeleton.css
│       │   └── spinner.css
│       └── layout/        # レイアウトコンポーネント (4)
│           ├── button.css
│           ├── container.css
│           ├── grid.css
│           └── stack.css
├── build/                 # 生成された出力（4パターン）
│   ├── css/
│   │   ├── variables.css  # デザイントークン
│   │   ├── all.css        # 統合CSS（WebComponents版）
│   │   ├── components/    # Pattern 1: WebComponents（:host）
│   │   │   ├── forms/
│   │   │   ├── data-display/
│   │   │   ├── navigation/
│   │   │   ├── overlays/
│   │   │   ├── feedback/
│   │   │   └── layout/
│   │   └── html/          # Pattern 2: Plain HTML
│   │       ├── all.css    # 統合CSS（HTML版）
│   │       ├── forms/
│   │       ├── data-display/
│   │       ├── navigation/
│   │       ├── overlays/
│   │       ├── feedback/
│   │       └── layout/
│   ├── js/
│   │   ├── index.js
│   │   └── styles/        # Pattern 3: React/Vue
│   │       ├── button.js  # buttonStyles, buttonHtmlStyles
│   │       ├── input.js
│   │       └── ...
│   └── ts/
└── .performance/          # パフォーマンスレポート
```

## コントリビュート

新しいトークンを追加する際は：

1. ベーストークンかセマンティックトークンかを決定
2. 既存の命名規則に従う
3. 必要に応じてテーマバリアント（ライト/ダーク）を追加
4. ドキュメントを更新
5. ビルドとパフォーマンスチェックを実行

```bash
npm run build
npm run perf
```

## ライセンス

MIT
