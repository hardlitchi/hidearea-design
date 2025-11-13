# hidearea-design

[![CI](https://github.com/hardlitchi/hidearea-design/actions/workflows/ci.yml/badge.svg)](https://github.com/hardlitchi/hidearea-design/actions/workflows/ci.yml)
[![Storybook](https://github.com/hardlitchi/hidearea-design/actions/workflows/storybook.yml/badge.svg)](https://github.com/hardlitchi/hidearea-design/actions/workflows/storybook.yml)
[![codecov](https://codecov.io/gh/hardlitchi/hidearea-design/branch/main/graph/badge.svg)](https://codecov.io/gh/hardlitchi/hidearea-design)

Web Componentベースのマルチフレームワーク対応デザインシステム

## パッケージ

- **[@hidearea-design/core](./packages/core)** - Web Components本体
- **[@hidearea-design/react](./packages/react)** - Reactラッパー
- **[@hidearea-design/vue](./packages/vue)** - Vue 3ラッパー
- **[@hidearea-design/tokens](./packages/tokens)** - デザイントークン

## 開発環境

- Node.js: v22.21.0以上
- パッケージマネージャー: pnpm 10.22.0

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# すべてのパッケージをビルド
pnpm build

# 開発モード
pnpm dev
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

## ドキュメント

詳細なドキュメントは [./notes/](./notes/) を参照してください。

- [確認事項](./notes/00_確認事項.md)
- [質問への回答と推奨事項](./notes/01_質問への回答と推奨事項.md)
- [最終確認事項](./notes/02_最終確認事項.md)
- [プロジェクト設定](./notes/03_プロジェクト設定.md)
