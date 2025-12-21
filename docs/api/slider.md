# Slider（スライダー）

> 範囲から数値を選択するためのスライダーコンポーネント

**タグ**: `<ha-slider>`

**カテゴリー**: フォームコントロール

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
| `value` | `number` | `0` |  | 現在の値 |
| `min` | `number` | `0` |  | 最小値 |
| `max` | `number` | `100` |  | 最大値 |
| `step` | `number` | `1` |  | ステップ増分 |
| `disabled` | `boolean` | `false` |  | スライダーを無効化 |
| `label` | `string` | `undefined` |  | スライダーのラベル |
| `showValue` | `boolean` | `true` |  | 現在の値を表示 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ value: number }` | 値が変更されたときに発火 |
| `ha-input` | `{ value: number }` | ドラッグ中に発火 |

### 使い方

```javascript
const element = document.querySelector('ha-slider');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### 基本的な使い方

シンプルなスライダー

```html
<ha-slider label="音量" value="50"></ha-slider>
```

---

### カスタム範囲

カスタムの最小/最大値を持つスライダー

```html
<ha-slider label="温度" min="-20" max="40" value="20"></ha-slider>
```

---

### ステップ指定

ステップ増分を持つスライダー

```html
<ha-slider label="評価" min="0" max="5" step="0.5" value="3.5"></ha-slider>
```

## アクセシビリティ

### ARIAロール

- `slider`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `矢印キー` | 値を調整 |
| `Home` | 最小値に設定 |
| `End` | 最大値に設定 |
| `Page Up/Down` | 大幅に増減 |

### ARIA属性

- `aria-valuenow`
- `aria-valuemin`
- `aria-valuemax`
- `aria-disabled`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-slider-track`
- `--component-slider-fill`
- `--component-slider-thumb`

### スペーシング

- `--spacing-sm`

### タイポグラフィ

- `--text-body-small-fontSize`

### その他

- `--border-radius-full`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
