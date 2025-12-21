# Progress（プログレス）

> 完了状態を表示するプログレスバーコンポーネント

**タグ**: `<ha-progress>`

**カテゴリ**: Feedback

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
| `value` | `number` | `0` |  | 現在の値（0-100） |
| `max` | `number` | `100` |  | 最大値 |
| `variant` | `'default' | 'success' | 'warning' | 'danger'` | `'default'` |  | プログレスバーの色バリアント |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | プログレスバーのサイズ |
| `showValue` | `boolean` | `false` |  | パーセンテージテキストを表示 |
| `indeterminate` | `boolean` | `false` |  | 不確定な読み込み状態 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-complete` | `{}` | プログレスが100%に達したときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-progress');
element.addEventListener('ha-complete', (event) => {
  console.log(event.detail);
});
```

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### 基本的な使用方法

シンプルなプログレスバー

```html
<ha-progress value="60"></ha-progress>
```

---

### 値を表示

パーセンテージを表示するプログレスバー

```html
<ha-progress value="75" show-value></ha-progress>
```

---

### 不確定

不確定なプログレス

```html
<ha-progress indeterminate></ha-progress>
```

## アクセシビリティ

### ARIA ロール

- `progressbar`

### キーボードサポート

標準的なキーボードナビゲーション。

### ARIA 属性

- `aria-valuenow`
- `aria-valuemin`
- `aria-valuemax`
- `aria-label`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-progress-background`
- `--component-progress-fill`

### タイポグラフィ

- `--text-body-small-fontSize`

### その他

- `--border-radius-full`

---

**関連ドキュメント**:
- [移行ガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント例](../guides/examples.md)
