# Checkbox（チェックボックス）

> 1つまたは複数のオプションを選択するためのチェックボックス入力

**タグ**: `<ha-checkbox>`

**カテゴリ**: フォームコントロール

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
| `checked` | `boolean` | `false` |  | チェック状態かどうか |
| `value` | `string` | `undefined` |  | チェックボックスの値 |
| `disabled` | `boolean` | `false` |  | チェックボックスを無効化 |
| `indeterminate` | `boolean` | `false` |  | 不確定状態を表示 |
| `required` | `boolean` | `false` |  | 必須にする |
| `label` | `string` | `undefined` |  | チェックボックスのラベル |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ checked: boolean, value: string }` | チェック状態が変更されたときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-checkbox');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | チェックボックスのラベルコンテンツ |

## 使用例

### 基本的な使い方

シンプルなチェックボックス

```html
<ha-checkbox label="利用規約に同意する"></ha-checkbox>
```

---

### チェック済み状態

事前にチェックされたチェックボックス

```html
<ha-checkbox label="ニュースレターを購読" checked></ha-checkbox>
```

---

### 不確定状態

不確定状態のチェックボックス

```html
<ha-checkbox label="すべて選択" indeterminate></ha-checkbox>
```

## アクセシビリティ

### ARIAロール

- `checkbox`

### キーボードサポート

| キー | 動作 |
|-----|--------|
| `Space` | チェックを切り替え |

### ARIA属性

- `aria-checked`
- `aria-disabled`
- `aria-required`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-checkbox-background`
- `--component-checkbox-border`
- `--component-checkbox-check`

### スペーシング

- `--spacing-sm`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-sm`
- `--interaction-transition-fast-duration`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
