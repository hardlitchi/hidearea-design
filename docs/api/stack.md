# Stack（スタック）

> アイテムを垂直または水平に配置するためのスタックレイアウトコンポーネント

**タグ**: `<ha-stack>`

**カテゴリー**: レイアウト

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
| `direction` | `'horizontal' | 'vertical'` | `'vertical'` |  | スタックの方向 |
| `gap` | `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` | `'md'` |  | アイテム間のギャップ |
| `align` | `'start' | 'center' | 'end' | 'stretch'` | `'start'` |  | アイテムの配置 |
| `justify` | `'start' | 'center' | 'end' | 'between' | 'around'` | `'start'` |  | アイテムの整列 |

## イベント

このコンポーネントはカスタムイベントを発火しません。

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | スタックアイテム |

## 使用例

### 垂直スタック

垂直に積み重ねられたアイテム

```html
<ha-stack direction="vertical" gap="md">
  <ha-button>ボタン 1</ha-button>
  <ha-button>ボタン 2</ha-button>
  <ha-button>ボタン 3</ha-button>
</ha-stack>
```

---

### 水平スタック

水平に配置されたアイテム

```html
<ha-stack direction="horizontal" gap="sm" align="center">
  <ha-avatar></ha-avatar>
  <div>
    <h4>山田太郎</h4>
    <p>yamada@example.com</p>
  </div>
</ha-stack>
```

## アクセシビリティ

### ARIAロール

特定のロールは定義されていません。

### キーボードサポート

標準的なキーボードナビゲーション。

### ARIA属性

特定のARIA属性は不要です。

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### スペーシング

- `--spacing-xs`
- `--spacing-sm`
- `--spacing-md`
- `--spacing-lg`
- `--spacing-xl`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
