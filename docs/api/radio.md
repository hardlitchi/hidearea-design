# Radio（ラジオボタン）

> グループから単一のオプションを選択するためのラジオボタン

**タグ**: `<ha-radio>`

**カテゴリ**: Form Controls

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
| `checked` | `boolean` | `false` |  | ラジオボタンが選択されているかどうか |
| `value` | `string` | `undefined` | ✅ | ラジオボタンの値 |
| `name` | `string` | `undefined` | ✅ | ラジオボタンをグループ化するためのname属性 |
| `disabled` | `boolean` | `false` |  | ラジオボタンを無効化 |
| `required` | `boolean` | `false` |  | ラジオボタンを必須にする |
| `label` | `string` | `undefined` |  | ラジオボタンのラベル |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ value: string }` | ラジオボタンが選択されたときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-radio');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | ラジオボタンのラベルコンテンツ |

## 使用例

### 基本的な使用方法

ラジオボタングループ

```html
<ha-radio name="size" value="small" label="小"></ha-radio>
<ha-radio name="size" value="medium" label="中" checked></ha-radio>
<ha-radio name="size" value="large" label="大"></ha-radio>
```

---

### 無効状態

無効化されたラジオボタン

```html
<ha-radio name="option" value="disabled" label="無効なオプション" disabled></ha-radio>
```

## アクセシビリティ

### ARIA ロール

- `radio`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `矢印キー` | グループ内のラジオボタン間を移動 |
| `Space` | ラジオボタンを選択 |

### ARIA 属性

- `aria-checked`
- `aria-disabled`
- `aria-required`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-radio-background`
- `--component-radio-border`
- `--component-radio-dot`

### スペーシング

- `--spacing-sm`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-full`
- `--interaction-transition-fast-duration`

---

**関連ドキュメント**:
- [移行ガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント例](../guides/examples.md)
