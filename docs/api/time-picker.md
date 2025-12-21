# TimePicker（タイムピッカー）

> 時刻値を選択するためのタイムピッカーコンポーネント

**タグ**: `<ha-time-picker>`

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
| `value` | `string` | `undefined` |  | 選択された時刻値（HH:mm形式） |
| `format` | `'12h' | '24h'` | `'24h'` |  | 時刻フォーマット |
| `disabled` | `boolean` | `false` |  | タイムピッカーを無効化 |
| `placeholder` | `string` | `undefined` |  | プレースホルダーテキスト |
| `label` | `string` | `undefined` |  | タイムピッカーのラベル |
| `step` | `number` | `1` |  | 分の刻み幅 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ value: string }` | 時刻が変更されたときに発行 |

### 使用方法

```javascript
const element = document.querySelector('ha-time-picker');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### 基本的な使い方

シンプルなタイムピッカー

```html
<ha-time-picker label="時刻を選択" placeholder="HH:mm"></ha-time-picker>
```

---

### 12時間形式

AM/PM付きタイムピッカー

```html
<ha-time-picker label="予約時刻" format="12h"></ha-time-picker>
```

---

### 刻み幅の指定

15分間隔のタイムピッカー

```html
<ha-time-picker label="会議時刻" :step="15"></ha-time-picker>
```

## アクセシビリティ

### ARIAロール

- `button`
- `listbox`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `矢印キー` | 時刻を調整 |
| `Enter` | 選択を確定 |
| `Escape` | ピッカーを閉じる |

### ARIA属性

- `aria-label`
- `aria-expanded`
- `aria-activedescendant`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-time-picker-background`
- `--component-time-picker-selected`
- `--component-time-picker-text`

### スペーシング

- `--spacing-sm`
- `--spacing-md`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-md`
- `--surface-overlay-elevation`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネントの使用例](../guides/examples.md)
