# hidearea-design

[![CI](https://github.com/hardlitchi/hidearea-design/actions/workflows/ci.yml/badge.svg)](https://github.com/hardlitchi/hidearea-design/actions/workflows/ci.yml)
[![Storybook](https://github.com/hardlitchi/hidearea-design/actions/workflows/storybook.yml/badge.svg)](https://github.com/hardlitchi/hidearea-design/actions/workflows/storybook.yml)
[![codecov](https://codecov.io/gh/hardlitchi/hidearea-design/branch/main/graph/badge.svg)](https://codecov.io/gh/hardlitchi/hidearea-design)

Web Componentベースのマルチフレームワーク対応デザインシステム

トークンベースのアーキテクチャにより、スタイルとロジックを完全に分離。React、Vue、Vanilla JSなど、あらゆるフレームワークで一貫したデザインを実現します。

## ✨ 特徴

- 🎨 **トークンベースの設計** - デザイントークンとコンポーネントスタイルを完全分離
- 🔧 **フレームワーク非依存** - Web Components標準による完全な互換性
- 🎯 **TypeScript完全対応** - 型安全な開発体験
- ♿ **アクセシビリティ** - WCAG AA準拠の設計
- 🌗 **テーマサポート** - ライト/ダークモードの組み込みサポート
- 📦 **38+コンポーネント** - 実用的なUIコンポーネント群

## パッケージ

- **[@hidearea-design/core](./packages/core)** - Web Components本体（38+ コンポーネント）
- **[@hidearea-design/react](./packages/react)** - Reactラッパー
- **[@hidearea-design/vue](./packages/vue)** - Vue 3ラッパー
- **[@hidearea-design/tokens](./packages/tokens)** - デザイントークン & コンポーネントスタイル

## 🚀 クイックスタート

### Vanilla JavaScript

```bash
npm install @hidearea-design/core @hidearea-design/tokens
```

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import '@hidearea-design/tokens/css';
      // Per-component import for optimal bundle size
      import { HaButton } from '@hidearea-design/core/button';
    </script>
  </head>
  <body>
    <ha-button variant="primary">Click me</ha-button>
  </body>
</html>
```

### React

```bash
npm install @hidearea-design/react @hidearea-design/tokens
```

```tsx
import '@hidearea-design/tokens/css';
import { Button } from '@hidearea-design/react';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

### Vue 3

```bash
npm install @hidearea-design/vue @hidearea-design/tokens
```

```vue
<script setup>
import '@hidearea-design/tokens/css';
import { HaButton } from '@hidearea-design/vue';
</script>

<template>
  <HaButton variant="primary">Click me</HaButton>
</template>
```

## 📦 利用可能なコンポーネント

### フォーム
Button, Input, Checkbox, Radio, Select, Switch, Textarea, Slider

### データ表示
Avatar, Avatar Group, Badge, Card, Chip, List, Table, Datagrid

### フィードバック
Alert, Progress, Spinner, Skeleton, Toast, Tooltip

### ナビゲーション
Breadcrumb, Menu, Pagination, Tabs

### レイアウト
Container, Grid, Stack

### オーバーレイ
Modal, Drawer

### その他
Accordion, Form Group, File Upload, Date Picker, Time Picker, Color Picker

詳細は [コンポーネントドキュメント](./docs/components/) を参照してください。

## 開発環境

- Node.js: v22.21.0以上
- パッケージマネージャー: pnpm 10.22.0

## セットアップ（開発者向け）

```bash
# 依存関係のインストール
pnpm install

# すべてのパッケージをビルド
pnpm build

# 開発モード
pnpm dev

# テスト実行
pnpm test
```

## スクリプト

- `pnpm dev` - 開発モードで起動
- `pnpm build` - すべてのパッケージをビルド
- `pnpm test` - テストを実行
- `pnpm lint` - Lintを実行
- `pnpm format` - コードフォーマット
- `pnpm clean` - ビルド成果物とnode_modulesを削除

## モノレポ構成

このプロジェクトは、Turborepo + pnpm workspacesを使用したモノレポ構成です。

```
hidearea-design/
├── packages/
│   ├── core/         # Web Components
│   ├── react/        # Reactラッパー
│   ├── vue/          # Vue 3ラッパー
│   ├── tokens/       # デザイントークン
│   ├── docs/         # VitePressドキュメント
│   └── storybook/    # Storybookカタログ
└── notes/            # プロジェクトメモ
```

## ライセンス

MIT

## 📖 ドキュメント

### Getting Started

- **[インストールガイド](./docs/getting-started/installation.md)** - パッケージのインストール方法と基本セットアップ
- **[使い方ガイド](./docs/getting-started/usage-guide.md)** - デザインシステムの基本的な使い方
- **[クイックスタート](#-クイックスタート)** - Vanilla JS、React、Vueでの使用方法

### 🎨 サンプル

実用的なサンプルで学ぶ hidearea-design:

- **[Component Showcase](./example/component-showcase/)** - 全コンポーネントのデモ
- **[Login Form](./example/login-form/)** - ログインフォームの実装例
- **[Dashboard](./example/dashboard/)** - ダッシュボードUIの実装例

[すべてのサンプルを見る →](./example/README.md)

### Components

- **[Button](./docs/components/button.md)** - ボタンコンポーネントのAPI とサンプル
- **[Input](./docs/components/input.md)** - インプットコンポーネントのAPI とサンプル
- **[Checkbox](./docs/components/checkbox.md)** - チェックボックスコンポーネントのAPI とサンプル
- **[全コンポーネント一覧](./docs/components/)** - 38+ コンポーネントのドキュメント

### Guides

#### 使用ガイド
- **[使用例](./docs/guides/examples.md)** - ログインフォーム、検索、設定パネルなどの実装例
- **[Per-component Imports](./docs/guides/per-component-imports.md)** - 個別コンポーネントインポートによるバンドルサイズ最適化
- **[CSS最適化](./docs/guides/css-optimization.md)** - CSSバンドルサイズの最適化戦略

#### テーマ・デザイントークン
- **[Theme System Guide](./docs/guides/theme-system.md)** - テーマシステムの総合ガイド（ライト・ダークモード、カスタマイズ）
- **[Design Tokens Usage](./docs/guides/design-tokens-usage.md)** - デザイントークンの使い方と命名規則
- **[Theme Customization Recipes](./docs/guides/theme-customization-recipes.md)** - 実践的なテーマカスタマイズレシピ集
- **[Theme Migration Guide](./docs/guides/theme-migration-guide.md)** - テーマシステムのバージョン移行ガイド

#### パフォーマンス
- **[Performance Analysis](./docs/guides/performance-analysis.md)** - パフォーマンス分析レポート
- **[Performance Optimization](./docs/guides/performance-optimization.md)** - パフォーマンス最適化ガイド
- **[Performance Testing](./docs/guides/performance-testing.md)** - 自動パフォーマンステストガイド

#### 開発ガイド
- **[コントリビューティング](./CONTRIBUTING.md)** ([日本語](./CONTRIBUTING.ja.md)) - プロジェクトへの貢献方法

### Changelog

プロジェクトの変更履歴は以下で確認できます：

- **[GitHubリリース](https://github.com/hardlitchi/hidearea-design/releases)** - すべてのリリースの詳細
- **パッケージごとのCHANGELOG**:
  - [@hidearea-design/core](./packages/core/CHANGELOG.md)
  - [@hidearea-design/tokens](./packages/tokens/CHANGELOG.md)
  - [@hidearea-design/react](./packages/react/CHANGELOG.md)
  - [@hidearea-design/vue](./packages/vue/CHANGELOG.md)
  - [@hidearea-design/mcp-server](./packages/mcp-server/CHANGELOG.md)

変更履歴は [Changesets](https://github.com/changesets/changesets) により自動生成されています。

### 開発ロードマップ

プロジェクトの今後の計画（詳細は [プロジェクトステータス](./docs/guides/project-status-2025-12-19-updated.md) 参照）:

**短期（1-2週間）**:
1. ✅ テストカバレッジ改善（完了）
2. ✅ ビルド警告修正（完了）
3. ✅ ドキュメント強化（完了）
4. ✅ コンポーネントAPI ドキュメント（完了）
5. ✅ デザイントークンドキュメント（完了）
6. ✅ パフォーマンス最適化分析（完了）
   - バンドルサイズ分析: Core 64 KB (gzip), React 16 KB, Vue 11 KB
   - ツリーシェイキング検証: Named exports で対応済み
   - パフォーマンスベンチマーク作成: ブラウザベースのベンチマークツール
   - [詳細レポート](./docs/guides/performance-analysis.md) | [最適化ガイド](./docs/guides/performance-optimization.md)
7. ✅ Per-component imports の実装（完了）
   - ✅ 43個のエクスポートエントリを追加（全コンポーネント + utils）
   - ✅ `sideEffects: false` を設定（ツリーシェイキング最適化）
   - ✅ 使用ガイド作成: [Per-component imports ガイド](./docs/guides/per-component-imports.md)
   - **実測効果**: Button 5.86 KB (メインバンドルの 1.4%), Input 9.10 KB (2.2%)
   - **使用例**: `import { HaButton } from '@hidearea-design/core/button';`

**中期（1-2ヶ月）**:
- ✅ CSS 最適化戦略の策定（完了）
  - ✅ Per-component CSS imports を推奨（PurgeCSSの代替）
  - ✅ Web Components に最適化されたアプローチ
  - ✅ 使用ガイド作成: [CSS最適化ガイド](./docs/guides/css-optimization.md)
  - **実測効果**: 基本フォーム 87% 削減（188 KB → 25 KB）
  - **デモ**: [CSS Optimization Demo](./example/css-optimization-demo/)
- ✅ パフォーマンステスト自動化（完了）
  - ✅ バンドルサイズ回帰テスト
  - ✅ レンダリングパフォーマンステスト
  - ✅ メモリ使用量テスト
  - ✅ GitHub Actions CI/CD統合
  - ✅ パフォーマンス予算チェッカー
  - ✅ パフォーマンスダッシュボード
  - [テストガイド](./docs/guides/performance-testing.md)
- ✅ テーマシステムドキュメント（完了）
  - ✅ テーマシステム総合ガイド: [Theme System Guide](./docs/guides/theme-system.md)
  - ✅ デザイントークン使用ガイド: [Design Tokens Usage](./docs/guides/design-tokens-usage.md)
  - ✅ テーマカスタマイズレシピ: [Theme Customization Recipes](./docs/guides/theme-customization-recipes.md)
  - ✅ 移行ガイド: [Theme Migration Guide](./docs/guides/theme-migration-guide.md)
- 高度なコンポーネントパターン
- Storybook 機能強化（ビジュアルリグレッション、インタラクションテスト）

**長期（3ヶ月以上）**:
- SSRサポート（Next.js、Nuxt）
- 追加フレームワークラッパー（Angular、Svelte、Solid.js）
- インタラクティブプレイグラウンド

### プロジェクトメモ

開発プロセスの詳細は [./notes/](./notes/) を参照してください。

- [確認事項](./notes/00_確認事項.md)
- [質問への回答と推奨事項](./notes/01_質問への回答と推奨事項.md)
- [最終確認事項](./notes/02_最終確認事項.md)
- [プロジェクト設定](./notes/03_プロジェクト設定.md)
