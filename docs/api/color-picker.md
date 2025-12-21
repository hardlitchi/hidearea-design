# ColorPicker（カラーピッカー）

> 色を選択するためのカラーピッカーコンポーネント

**タグ**: `<ha-color-picker>`

**カテゴリー**: Form Controls

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
| `value` | `string` | `'#000000'` |  | 選択された色の値（hex、rgb、hsl） |
| `format` | `'hex' | 'rgb' | 'hsl'` | `'hex'` |  | 色のフォーマット |
| `disabled` | `boolean` | `false` |  | カラーピッカーを無効化 |
| `swatches` | `string[]` | `undefined` |  | 定義済みカラースウォッチ |
| `label` | `string` | `undefined` |  | カラーピッカーのラベル |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ value: string }` | 色が変更されたときに発火 |

### 使い方

```javascript
const element = document.querySelector('ha-color-picker');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### 基本的な使い方

シンプルなカラーピッカー

```html
<ha-color-picker label="色を選択" value="#3498db"></ha-color-picker>
```

---

### スウォッチ付き

定義済みスウォッチ付きカラーピッカー

```html
<ha-color-picker
  :swatches="['#e74c3c', '#3498db', '#2ecc71', '#f39c12']"
></ha-color-picker>
```

## アクセシビリティ

### ARIA ロール

- `button`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `Enter/Space` | カラーピッカーを開く |
| `矢印キー` | 色を調整 |

### ARIA 属性

- `aria-label`
- `aria-valuetext`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します:

### 色

- `--component-color-picker-background`
- `--component-color-picker-border`

### 間隔

- `--spacing-sm`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-md`
- `--surface-overlay-elevation`

---

**関連ドキュメント**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
