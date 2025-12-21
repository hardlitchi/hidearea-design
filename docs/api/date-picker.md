# DatePicker（日付ピッカー）

> 日付を選択するための日付ピッカーコンポーネント

**タグ**: `<ha-date-picker>`

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
| `value` | `string | Date` | `undefined` |  | 選択された日付の値 |
| `min` | `string | Date` | `undefined` |  | 選択可能な最小日付 |
| `max` | `string | Date` | `undefined` |  | 選択可能な最大日付 |
| `disabled` | `boolean` | `false` |  | 日付ピッカーを無効化 |
| `placeholder` | `string` | `undefined` |  | プレースホルダーテキスト |
| `format` | `string` | `'YYYY-MM-DD'` |  | 日付のフォーマット |
| `label` | `string` | `undefined` |  | 日付ピッカーのラベル |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ value: Date }` | 日付が変更されたときに発火 |

### 使い方

```javascript
const element = document.querySelector('ha-date-picker');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### 基本的な使い方

シンプルな日付ピッカー

```html
<ha-date-picker label="日付を選択" placeholder="日付を選んでください"></ha-date-picker>
```

---

### 最小値/最大値付き

日付範囲付き日付ピッカー

```html
<ha-date-picker
  label="予約日"
  min="2024-01-01"
  max="2024-12-31"
></ha-date-picker>
```

## アクセシビリティ

### ARIA ロール

- `button`
- `dialog`
- `grid`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `矢印キー` | 日付を移動 |
| `Enter` | 日付を選択 |
| `Escape` | ピッカーを閉じる |

### ARIA 属性

- `aria-label`
- `aria-expanded`
- `aria-selected`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します:

### 色

- `--component-date-picker-background`
- `--component-date-picker-selected`
- `--component-date-picker-text`

### 間隔

- `--spacing-sm`
- `--spacing-md`

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
