# Badge（バッジ）

> ステータス、カウント、カテゴリを表示する小さなラベル

**タグ**: `<ha-badge>`

**カテゴリ**: データ表示

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
| `variant` | `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'` | `'primary'` |  | バッジのカラーバリアント |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | バッジのサイズ |
| `dot` | `boolean` | `false` |  | ドットインジケーターとして表示 |
| `pill` | `boolean` | `false` |  | ピル形状のバッジ |

## イベント

このコンポーネントはカスタムイベントを発火しません。

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | バッジのコンテンツ |

## 使用例

### 基本的な使い方

シンプルなバッジ

```html
<ha-badge>デフォルト</ha-badge>
<ha-badge variant="success">成功</ha-badge>
<ha-badge variant="warning">警告</ha-badge>
```

---

### ピル形状バッジ

ピル形状のバッジ

```html
<ha-badge pill>99+</ha-badge>
```

---

### ドットインジケーター

通知用のドットバッジ

```html
<ha-badge dot variant="danger"></ha-badge>
```

## アクセシビリティ

### ARIAロール

- `status`

### キーボードサポート

標準的なキーボードナビゲーション

### ARIA属性

- `aria-label`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-badge-primary-background`
- `--component-badge-primary-text`

### スペーシング

- `--spacing-xs`
- `--spacing-sm`

### タイポグラフィ

- `--text-body-small-fontSize`
- `--font-weight-medium`

### その他

- `--border-radius-sm`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
