# 概要

Hidearea Designは、Web Componentsをベースにした、フレームワーク非依存のモダンなUIコンポーネントライブラリです。

## 特徴

### 🎨 デザイントークン駆動

Style Dictionaryを使用した一貫性のあるデザインシステム。カラー、タイポグラフィ、スペーシング、シャドウなど、すべてのデザイン要素がトークンとして管理されています。

### ⚡️ Web Components

標準的なWeb Components（Custom Elements + Shadow DOM）を使用。フレームワークに依存せず、どの環境でも動作します。

### 🔧 TypeScript完全対応

全コンポーネントがTypeScriptで実装され、完全な型定義を提供します。

### 📱 レスポンシブデザイン

すべてのコンポーネントがモバイルからデスクトップまで、あらゆるデバイスサイズに対応しています。

### ♿️ アクセシビリティ

ARIA属性、キーボード操作、スクリーンリーダー対応など、アクセシビリティを重視した設計です。

### 🧪 高品質

811のユニットテストで品質を保証。テストカバレッジは Lines 87.76%, Functions 90.53%を達成しています。

## プロジェクト統計

| 項目 | 数値 |
|------|------|
| コンポーネント数 | 21個 |
| ユニットテスト | 811個（全て成功） |
| Storybookストーリー | 203個 |
| Reactラッパー | 21/21（100%） |
| Vueラッパー | 21/21（100%） |
| Lines カバレッジ | 87.76% |
| Branches カバレッジ | 70.14% |
| Functions カバレッジ | 90.53% |

## コンポーネントカテゴリ

### Phase 1: 基本フォームコンポーネント（3個）
- Button
- Input
- Checkbox

### Phase 2: レイアウトコンポーネント（3個）
- Container
- Grid
- Stack

### Phase 3: 追加フォームコンポーネント（5個）
- FormGroup
- Select
- Radio
- Textarea
- Switch

### Phase 4: フィードバック・表示コンポーネント（5個）
- Alert
- Badge
- Card
- Progress
- Spinner

### Phase 5: ナビゲーションコンポーネント（4個）✨ NEW
- Tooltip
- Tabs
- Breadcrumb
- Menu/Dropdown

## 技術スタック

### コア技術
- **Web Components**: Custom Elements + Shadow DOM
- **TypeScript**: 型安全な実装
- **Vite**: 高速なビルドツール
- **Vitest**: テストフレームワーク

### デザインシステム
- **Style Dictionary**: デザイントークン管理
- **CSS Custom Properties**: テーマ対応

### ドキュメント
- **Storybook 10**: インタラクティブコンポーネントカタログ
- **VitePress**: ドキュメントサイト

### モノレポ管理
- **Turborepo**: 効率的なビルドパイプライン
- **pnpm workspaces**: パッケージ管理

## ブラウザサポート

モダンブラウザをサポートしています：

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ライセンス

MIT License

## コントリビューション

プロジェクトへの貢献を歓迎します。詳細は[GitHub リポジトリ](https://github.com/hardlitchi/hidearea-design)をご覧ください。
