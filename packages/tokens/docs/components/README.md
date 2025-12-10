# コンポーネントリファレンス

**Hidearea Design System Tokens**
**最終更新:** 2025-12-10

---

## 概要

このディレクトリには、実装済みの全コンポーネントのデザイントークンリファレンスが含まれています。各コンポーネントのトークン一覧、使用例、バリアント、状態などを詳しく説明しています。

---

## 実装済みコンポーネント (22)

### Forms (フォーム) ✅ 完成 7/7

ユーザー入力を受け付けるコンポーネント

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Button** | 4 (primary, secondary, ghost, danger) | ✅ 実装済み | [button.md](./button.md) |
| **Input** | 1 (default) + 状態 (error, success) | ✅ 実装済み | [input.md](./input.md) |
| **Checkbox** | 3サイズ (small, default, large) | ✅ 実装済み | [checkbox.md](./checkbox.md) |
| **Radio** | 3サイズ (small, default, large) | ✅ 実装済み | [radio.md](./radio.md) |
| **Select** | 1 (default) + 状態 | ✅ 実装済み | [select.md](./select.md) |
| **Textarea** | 3サイズ (small, default, large) | ✅ 実装済み | [textarea.md](./textarea.md) |
| **Switch** | 3サイズ (small, default, large) | ✅ 実装済み | [switch.md](./switch.md) |

### Feedback (フィードバック) ✅ 完成 6/6

ユーザーへの通知や状態表示

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Badge** | 4 (success, error, warning, info) | ✅ 実装済み | [badge.md](./badge.md) |
| **Alert** | 4 (success, error, warning, info) | ✅ 実装済み | [alert.md](./alert.md) |
| **Toast** | 4 (success, error, warning, info) | ✅ 実装済み | [toast.md](./toast.md) |
| **Progress** | 5色 + 3サイズ + circle型 | ✅ 実装済み | [progress.md](./progress.md) |
| **Skeleton** | 7種類 (text, heading, avatar, etc) | ✅ 実装済み | [skeleton.md](./skeleton.md) |
| **Spinner** | 4サイズ + 7色 | ✅ 実装済み | [spinner.md](./spinner.md) |

### Overlays (オーバーレイ)

画面上に重なって表示される要素

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Modal** | 1 (default) | ✅ 実装済み | [modal.md](./modal.md) |
| **Tooltip** | 1 (default) | ✅ 実装済み | [tooltip.md](./tooltip.md) |

### Data Display (データ表示)

データを表示するコンポーネント

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Card** | 1 (default) + 状態 | ✅ 実装済み | [card.md](./card.md) |
| **Table** | 1 (default) | ✅ 実装済み | [table.md](./table.md) |

### Navigation (ナビゲーション) ✅ 完成 5/5

ページ間やセクション間の移動

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Navigation** | 1 (default) | ✅ 実装済み | [navigation.md](./navigation.md) |
| **Tabs** | 3 (line, enclosed, soft) + 3サイズ | ✅ 実装済み | [tabs.md](./tabs.md) |
| **Breadcrumb** | 4種セパレーター + 3サイズ | ✅ 実装済み | [breadcrumb.md](./breadcrumb.md) |
| **Pagination** | 3 (default, simple, rounded) | ✅ 実装済み | [pagination.md](./pagination.md) |
| **Menu** | 3サイズ (compact, default, comfortable) | ✅ 実装済み | [menu.md](./menu.md) |

---

## 今後追加予定のコンポーネント

### Overlays (優先度: 中)
- Dialog
- Drawer
- Popover
- Dropdown

### Data Display
- List
- Avatar
- Chip

---

## トークン命名パターン

全てのコンポーネントトークンは、以下の命名パターンに従います：

```
component.{component-name}.{variant?}.{property}.{state?}
```

### 例

```
component.button.primary.background.default
component.button.primary.background.hover
component.button.primary.text.default
component.input.border.error
component.badge.success.background
```

---

## 共通プロパティ

全てのコンポーネントで共通して使用されるプロパティ：

### 色関連
- `background` - 背景色
- `text` - テキスト色
- `border` - ボーダー色

### 状態
- `default` - デフォルト状態
- `hover` - ホバー時
- `focus` - フォーカス時
- `active` - アクティブ時
- `disabled` - 無効時

### フィードバック状態
- `success` - 成功
- `error` - エラー
- `warning` - 警告
- `info` - 情報

---

## 使い方

各コンポーネントのドキュメントには、以下の情報が含まれています：

1. **概要** - コンポーネントの説明と用途
2. **トークン一覧** - 利用可能な全トークン
3. **バリアント** - 利用可能なバリエーション
4. **状態** - インタラクション状態
5. **使用例** - HTML/CSSの実装例
6. **アクセシビリティ** - アクセシビリティのベストプラクティス

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md) - トークンシステムの構造
- [使用方法ガイド](../使用方法ガイド.md) - 基本的な使い方
- [移行ガイド](../移行ガイド.md) - 既存プロジェクトへの導入

---

**フィードバック**

ドキュメントの改善提案や質問は、[GitHub Issues](https://github.com/hardlitchi/hidearea-design/issues)でお願いします。
