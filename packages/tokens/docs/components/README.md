# コンポーネントリファレンス

**Hidearea Design System Tokens**
**最終更新:** 2025-12-10

---

## 概要

このディレクトリには、実装済みの全コンポーネントのデザイントークンリファレンスが含まれています。各コンポーネントのトークン一覧、使用例、バリアント、状態などを詳しく説明しています。

---

## 実装済みコンポーネント (29)

### Forms (フォーム) ✅ 完成 7/7

ユーザー入力を受け付けるコンポーネント

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Button** | 4 (primary, secondary, ghost, danger) | ✅ 実装済み | [forms/button.md](./forms/button.md) |
| **Input** | 1 (default) + 状態 (error, success) | ✅ 実装済み | [forms/input.md](./forms/input.md) |
| **Checkbox** | 3サイズ (small, default, large) | ✅ 実装済み | [forms/checkbox.md](./forms/checkbox.md) |
| **Radio** | 3サイズ (small, default, large) | ✅ 実装済み | [forms/radio.md](./forms/radio.md) |
| **Select** | 1 (default) + 状態 | ✅ 実装済み | [forms/select.md](./forms/select.md) |
| **Textarea** | 3サイズ (small, default, large) | ✅ 実装済み | [forms/textarea.md](./forms/textarea.md) |
| **Switch** | 3サイズ (small, default, large) | ✅ 実装済み | [forms/switch.md](./forms/switch.md) |

### Feedback (フィードバック) ✅ 完成 6/6

ユーザーへの通知や状態表示

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Badge** | 6 (primary, success, error, warning, info, neutral) | ✅ 実装済み | [data-display/badge.md](../data-display/badge.md) |
| **Alert** | 4 (success, error, warning, info) | ✅ 実装済み | [feedback/alert.md](./feedback/alert.md) |
| **Toast** | 4 (success, error, warning, info) | ✅ 実装済み | [feedback/toast.md](./feedback/toast.md) |
| **Progress** | 5色 + 3サイズ + circle型 | ✅ 実装済み | [feedback/progress.md](./feedback/progress.md) |
| **Skeleton** | 7種類 (text, heading, avatar, etc) | ✅ 実装済み | [feedback/skeleton.md](./feedback/skeleton.md) |
| **Spinner** | 4サイズ + 7色 | ✅ 実装済み | [feedback/spinner.md](./feedback/spinner.md) |

### Overlays (オーバーレイ) ✅ 完成 6/6

画面上に重なって表示される要素

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Modal** | 1 (default) | ✅ 実装済み | [overlays/modal.md](./overlays/modal.md) |
| **Tooltip** | 1 (default) | ✅ 実装済み | [overlays/tooltip.md](./overlays/tooltip.md) |
| **Dialog** | 5 (confirmation, warning, destructive, info, success) | ✅ 実装済み | [overlays/dialog.md](./overlays/dialog.md) |
| **Drawer** | 4位置 (left, right, top, bottom) | ✅ 実装済み | [overlays/drawer.md](./overlays/drawer.md) |
| **Popover** | 3サイズ + arrow | ✅ 実装済み | [overlays/popover.md](./overlays/popover.md) |
| **Dropdown** | 1 (default) + search | ✅ 実装済み | [overlays/dropdown.md](./overlays/dropdown.md) |

### Data Display (データ表示) ✅ 完成 5/5

データを表示するコンポーネント

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Card** | 1 (default) + 状態 | ✅ 実装済み | [data-display/card.md](./data-display/card.md) |
| **Table** | 1 (default) | ✅ 実装済み | [data-display/table.md](./data-display/table.md) |
| **List** | 3密度 (compact, default, comfortable) | ✅ 実装済み | [data-display/list.md](./data-display/list.md) |
| **Avatar** | 6サイズ + 6色 + 3形状 + ステータス | ✅ 実装済み | [data-display/avatar.md](./data-display/avatar.md) |
| **Chip** | 3サイズ + 6色 + アイコン対応 | ✅ 実装済み | [data-display/chip.md](./data-display/chip.md) |

### Navigation (ナビゲーション) ✅ 完成 5/5

ページ間やセクション間の移動

| コンポーネント | バリアント数 | ステータス | ドキュメント |
|--------------|------------|----------|------------|
| **Navigation** | 1 (default) | ✅ 実装済み | [navigation/navigation.md](./navigation/navigation.md) |
| **Tabs** | 3 (line, enclosed, soft) + 3サイズ | ✅ 実装済み | [navigation/tabs.md](./navigation/tabs.md) |
| **Breadcrumb** | 4種セパレーター + 3サイズ | ✅ 実装済み | [navigation/breadcrumb.md](./navigation/breadcrumb.md) |
| **Pagination** | 3 (default, simple, rounded) | ✅ 実装済み | [navigation/pagination.md](./navigation/pagination.md) |
| **Menu** | 3サイズ (compact, default, comfortable) | ✅ 実装済み | [navigation/menu.md](./navigation/menu.md) |

---

## コンポーネント実装完了状況

全29コンポーネントが実装完了しました！

- **Forms**: 7/7 ✅
- **Feedback**: 6/6 ✅
- **Overlays**: 6/6 ✅
- **Data Display**: 5/5 ✅
- **Navigation**: 5/5 ✅

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
