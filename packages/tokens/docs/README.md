# Documentation Index

**@hidearea-design/tokens ドキュメント**

このディレクトリには、Hidearea Design System Tokensの包括的なドキュメントが含まれています。

---

## 📚 ガイド

### 基本ガイド

- **[使用方法ガイド](./使用方法ガイド.md)** - トークンの基本的な使い方、インストール、設定
- **[アーキテクチャガイド](./アーキテクチャガイド.md)** - 二層変数システムの詳細設計と実装
- **[移行ガイド](./migration-guide.md)** - v1.x → v2.x への移行手順

### 技術ガイド

- **[セマンティックトークンガイド](./セマンティックトークンガイド.md)** - セマンティックトークンの詳細仕様と使用方法
- **[パフォーマンス監視ガイド](./パフォーマンス監視ガイド.md)** - パフォーマンス計測とバジェット管理
- **[デプロイメントガイド](./デプロイメントガイド.md)** - 自動デプロイメントシステムとCI/CD
- **[Figma連携ガイド](./Figma連携ガイド.md)** - Figmaとの同期方法

---

## 🎨 コンポーネントリファレンス

全38コンポーネントの詳細ドキュメント:

### Forms (10)
- **[Checkbox](./components/forms/checkbox.md)** - チェックボックス (3サイズ)
- **Date Picker** - 日付選択 📝 ドキュメント準備中
- **File Upload** - ファイルアップロード 📝 ドキュメント準備中
- **Form Group** - フォームグループ 📝 ドキュメント準備中
- **[Input](./components/forms/input.md)** - テキスト入力 (3バリアント × 3サイズ)
- **[Radio](./components/forms/radio.md)** - ラジオボタン (3サイズ)
- **[Select](./components/forms/select.md)** - セレクトボックス (3バリアント)
- **[Switch](./components/forms/switch.md)** - トグルスイッチ (3サイズ)
- **[Textarea](./components/forms/textarea.md)** - テキストエリア (3バリアント × 3サイズ)
- **Time Picker** - 時刻選択 📝 ドキュメント準備中

### Feedback (6)
- **[Alert](./components/feedback/alert.md)** - アラート (4種類)
- **[Progress](./components/feedback/progress.md)** - プログレスバー (5色 + 3サイズ)
- **[Skeleton](./components/feedback/skeleton.md)** - スケルトンローダー (7種類)
- **[Spinner](./components/feedback/spinner.md)** - スピナー (4サイズ + 7色)
- **[Toast](./components/feedback/toast.md)** - トースト通知 (4種類)
- **Toast Container** - トーストコンテナ 📝 ドキュメント準備中

### Data Display (11)
- **Accordion** - アコーディオン 📝 ドキュメント準備中
- **[Avatar](./components/data-display/avatar.md)** - アバター (6サイズ + 6色 + 3形状)
- **Avatar Group** - アバターグループ 📝 ドキュメント準備中
- **[Badge](./components/feedback/badge.md)** - バッジ (6種類)
- **[Card](./components/data-display/card.md)** - カード (3状態)
- **[Chip](./components/data-display/chip.md)** - チップ (3サイズ + 6色)
- **Datagrid** - データグリッド 📝 ドキュメント準備中
- **List Container** - リストコンテナ 📝 ドキュメント準備中
- **List Divider** - リスト区切り 📝 ドキュメント準備中
- **List Item** - リストアイテム 📝 ドキュメント準備中
- **[Table](./components/data-display/table.md)** - テーブル (ソート・選択対応)

### Layout (4)
- **[Button](./components/forms/button.md)** - ボタン (5バリアント)
- **Container** - コンテナ 📝 ドキュメント準備中
- **Grid** - グリッドレイアウト 📝 ドキュメント準備中
- **Stack** - スタックレイアウト 📝 ドキュメント準備中

### Overlays (3)
- **[Drawer](./components/overlays/drawer.md)** - ドロワー (4位置)
- **[Modal](./components/overlays/modal.md)** - モーダル
- **[Tooltip](./components/overlays/tooltip.md)** - ツールチップ (4方向)

### Navigation (4)
- **[Breadcrumb](./components/navigation/breadcrumb.md)** - パンくずリスト (4種セパレーター)
- **[Menu](./components/navigation/menu.md)** - メニュー (3サイズ)
- **[Pagination](./components/navigation/pagination.md)** - ページネーション (3種類)
- **[Tabs](./components/navigation/tabs.md)** - タブ (3種類 + 3サイズ)

詳細は [コンポーネント一覧](./components/README.md) を参照してください。

---

## 📦 Examples（使用例）

- **[examples/README.md](../examples/README.md)** - 38コンポーネントの実践的な使用例
- **[examples/basic/](../examples/basic/)** - 個別コンポーネントデモ（カスタムCSS使用）
- **[examples/unified/](../examples/unified/)** - 統合CSSデモ（全コンポーネント1ファイル）

---

## 📖 ドキュメント構成

```
packages/tokens/
├── README.md                              # パッケージ概要
│
├── docs/                                  # 📚 ドキュメントディレクトリ
│   ├── README.md                          # ドキュメントインデックス（このファイル）
│   │
│   ├── 使用方法ガイド.md                    # 基本的な使い方
│   ├── アーキテクチャガイド.md               # 二層変数システム設計
│   ├── migration-guide.md                 # v1.x → v2.x 移行ガイド
│   │
│   ├── セマンティックトークンガイド.md       # セマンティックトークン詳細
│   ├── パフォーマンス監視ガイド.md          # パフォーマンス計測とバジェット
│   ├── デプロイメントガイド.md              # 自動デプロイメント
│   ├── Figma連携ガイド.md                  # Figma同期方法
│   │
│   └── components/                        # コンポーネント別ドキュメント
│       ├── README.md                      # コンポーネント一覧
│       ├── button.md
│       ├── input.md
│       ├── badge.md
│       ├── alert.md
│       ├── card.md
│       ├── table.md
│       ├── navigation.md
│       └── ... (全29ファイル)
│
└── examples/                              # 使用例
    ├── README.md
    ├── basic/                             # 全29コンポーネントデモ
    └── theming/                           # テーマ切り替えデモ
```

---

## 🚀 クイックスタート

1. **インストール**
   ```bash
   npm install @hidearea-design/tokens
   ```

2. **基本的な使い方**
   ```javascript
   import '@hidearea-design/tokens/css';
   ```

3. **詳細は [使用方法ガイド](./使用方法ガイド.md) を参照**

---

## 🤝 貢献

ドキュメントの改善や追加は歓迎です。Pull Requestをお待ちしています。

---

**最終更新:** 2025-12-12
