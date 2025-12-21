# Spinner（スピナー）

> 進行状況を示すための読み込みスピナーコンポーネント

**タグ**: `<ha-spinner>`

**カテゴリー**: フィードバック

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
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | スピナーのサイズ |
| `color` | `string` | `undefined` |  | スピナーの色 |

## イベント

このコンポーネントはカスタムイベントを発火しません。

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### 基本的な使い方

シンプルなスピナー

```html
<ha-spinner></ha-spinner>
```

---

### 異なるサイズ

様々なスピナーのサイズ

```html
<ha-spinner size="small"></ha-spinner>
<ha-spinner size="medium"></ha-spinner>
<ha-spinner size="large"></ha-spinner>
```

## アクセシビリティ

### ARIAロール

- `status`

### キーボードサポート

標準的なキーボードナビゲーション。

### ARIA属性

- `aria-label`
- `aria-live`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-spinner-color`

### その他

- `--interaction-transition-fast-duration`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
