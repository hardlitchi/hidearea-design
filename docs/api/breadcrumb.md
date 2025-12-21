# Breadcrumb（パンくずリスト）

> 現在の位置を表示するパンくずナビゲーションコンポーネント

**タグ**: `<ha-breadcrumb>`

**カテゴリ**: ナビゲーション

## 目次

- [プロパティ](#プロパティ)
- [イベント](#イベント)
- [スロット](#スロット)
- [使用例](#使用例)
- [アクセシビリティ](#アクセシビリティ)
- [デザイントークン](#デザイントークン)

---

## プロパティ

| 名前 | 型 | デフォルト | 必須 | 説明 |
|------|------|---------|----------|-------------|
| `separator` | `string` | `'/'` |  | アイテム間の区切り文字 |

## イベント

このコンポーネントはカスタムイベントを発火しません。

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | パンくずアイテム |

## 使用例

### 基本的な使い方

シンプルなパンくずリスト

```html
<ha-breadcrumb>
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">製品</ha-breadcrumb-item>
  <ha-breadcrumb-item>詳細</ha-breadcrumb-item>
</ha-breadcrumb>
```

---

### カスタム区切り文字

カスタム区切り文字を使用したパンくずリスト

```html
<ha-breadcrumb separator=">">
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item>現在のページ</ha-breadcrumb-item>
</ha-breadcrumb>
```

## アクセシビリティ

### ARIAロール

- `navigation`
- `list`
- `listitem`

### キーボードサポート

| キー | 動作 |
|-----|--------|
| `Tab` | リンク間を移動 |

### ARIA属性

- `aria-label`
- `aria-current`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-breadcrumb-text`
- `--component-breadcrumb-separator`

### スペーシング

- `--spacing-sm`

### タイポグラフィ

- `--text-body-default-fontSize`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
