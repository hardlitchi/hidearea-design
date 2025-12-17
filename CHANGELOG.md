# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 🎨 **デザイントークンシステム** - セマンティックトークンによる包括的なデザインシステム
- 🧩 **37個のWebコンポーネント** - モダンなWeb標準に基づくコンポーネントライブラリ
- 🌓 **ライト・ダークモードのフル対応** - theme-switcherコンポーネントとテーマシステム
- 📚 **完全なドキュメントサイト** - VitePressベースのドキュメント（GitHub Pages対応）
- 📖 **Storybook統合** - 全37コンポーネントのインタラクティブなカタログ
- 🎯 **サンプルアプリケーション** - 3つの実用的なサンプル（Component Showcase、Login Form、Dashboard）
- ♿ **アクセシビリティ対応** - ARIA属性、キーボードナビゲーション、スクリーンリーダーサポート
- 🔧 **MCPサーバー** - Claude Code統合によるコンポーネント検索・利用支援

### Components

#### Form Controls
- Button - 5種のvariant、3種のサイズ、ローディング状態対応
- Input - テキスト入力、バリデーション、エラー表示
- Textarea - 複数行テキスト入力
- Checkbox - チェックボックス入力
- Radio - ラジオボタン入力
- Switch - トグルスイッチ
- Select - ドロップダウン選択
- Slider - 数値スライダー
- ColorPicker - カラー選択
- DatePicker - 日付選択
- TimePicker - 時刻選択
- FileUpload - ファイルアップロード
- FormGroup - フォームグループコンテナ

#### Data Display
- Avatar - ユーザーアバター表示
- Badge - バッジ・ラベル表示
- Chip - タグ・チップ表示
- Card - カードコンテナ
- Table - データテーブル
- DataGrid - 高度なデータグリッド
- List - リスト表示
- Accordion - アコーディオン

#### Feedback
- Alert - アラート・通知メッセージ
- Progress - プログレスバー
- Spinner - ローディングスピナー
- Skeleton - スケルトンローディング
- Toast - トースト通知

#### Navigation
- Breadcrumb - パンくずリスト
- Tabs - タブナビゲーション
- Pagination - ページネーション
- Menu - メニューナビゲーション

#### Layout
- Container - コンテナレイアウト
- Stack - スタックレイアウト
- Grid - グリッドレイアウト

#### Overlay
- Modal - モーダルダイアログ
- Drawer - サイドドロワー
- Tooltip - ツールチップ

#### Utility
- ThemeSwitcher - テーマ切り替え（toggle、dropdown、segmented variant）

### Infrastructure

- 📦 **Monorepo構成** - pnpm workspaces + Turbopackによる効率的な開発環境
- 🔨 **ビルドシステム** - Viteベースの高速ビルド
- 🧪 **テストフレームワーク** - Vitest + happy-dom、カバレッジ80%以上
- 📝 **TypeScript完全対応** - 型定義ファイル完備
- 🎨 **スタイルシステム** - CSSカスタムプロパティ + Shadow DOM対応
- 🔄 **CI/CD** - GitHub Actions（ビルド、テスト、デプロイ）

### Documentation

- ✅ 各コンポーネントのAPI仕様
- ✅ 使用例とコードサンプル
- ✅ アクセシビリティガイドライン
- ✅ デザイントークンリファレンス
- ✅ テーマカスタマイズガイド

## Release Planning

### v0.1.0 (Initial Public Release) - 予定

初回公開リリース。基本的な機能セットを含む。

**含まれる機能:**
- 37個の本番対応Webコンポーネント
- 包括的なデザイントークンシステム
- ライト・ダークモードのフル対応
- ドキュメントサイトとStorybook
- TypeScript型定義
- npmパッケージとして公開

**リリース前の準備:**
- [ ] 全コンポーネントのテストカバレッジ80%以上を確保
- [ ] アクセシビリティ監査の実施
- [ ] ドキュメントの最終レビュー
- [ ] Breaking changes のレビュー
- [ ] パフォーマンステスト
- [ ] ブラウザ互換性テスト

### 今後の予定

#### v0.2.0
- React ラッパーコンポーネントの改善
- Vue ラッパーコンポーネントの改善
- より多くのサンプルアプリケーション

#### v0.3.0
- 追加コンポーネント（Calendar、TreeView など）
- アニメーションシステムの強化
- より高度なフォームバリデーション

#### v1.0.0 (Stable Release)
- API の安定化
- 本番環境での十分な実績
- 完全な後方互換性保証

---

## Contributing

変更履歴の作成には [Changesets](https://github.com/changesets/changesets) を使用しています。

新機能や修正を追加する場合は、以下のコマンドでchangesetを作成してください:

```bash
pnpm changeset
```

## Links

- [Homepage](https://github.com/hardlitchi/hidearea-design)
- [Documentation](https://hardlitchi.github.io/hidearea-design/)
- [NPM Packages](https://www.npmjs.com/org/hidearea-design)
- [Issues](https://github.com/hardlitchi/hidearea-design/issues)
