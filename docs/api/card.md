# Card（カード）

> 関連するコンテンツをグループ化するためのコンテナコンポーネント

**タグ**: `<ha-card>`

**カテゴリ**: レイアウト

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
| `variant` | `'filled' | 'outlined' | 'elevated'` | `'filled'` |  | カードのスタイルバリアント |
| `padding` | `'none' | 'small' | 'medium' | 'large'` | `'medium'` |  | 内部の余白 |
| `hoverable` | `boolean` | `false` |  | ホバー効果を追加 |

## イベント

このコンポーネントはカスタムイベントを発火しません。

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | カードのコンテンツ |
| `header` | カードのヘッダーコンテンツ |
| `footer` | カードのフッターコンテンツ |

## 使用例

### 基本的なカード

コンテンツを含むシンプルなカード

```html
<ha-card>
  <div slot="header">
    <h3>カードタイトル</h3>
  </div>
  <p>カードのコンテンツをここに記述</p>
  <div slot="footer">
    <ha-button variant="primary">アクション</ha-button>
  </div>
</ha-card>
```

## アクセシビリティ

### ARIAロール

- `article`
- `region`

### キーボードサポート

標準的なキーボードナビゲーション

### ARIA属性

- `aria-labelledby`
- `aria-describedby`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-card-background`
- `--component-card-border`

### スペーシング

- `--spacing-md`
- `--spacing-lg`

### その他

- `--border-radius-lg`
- `--surface-raised-elevation`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
