# Select（セレクト）

> オプションのリストから選択するためのドロップダウンセレクトコンポーネント

**タグ**: `<ha-select>`

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
| `value` | `string | string[]` | `undefined` |  | 選択された値 |
| `multiple` | `boolean` | `false` |  | 複数選択を許可 |
| `disabled` | `boolean` | `false` |  | セレクトを無効化 |
| `required` | `boolean` | `false` |  | セレクトを必須にする |
| `placeholder` | `string` | `undefined` |  | プレースホルダーテキスト |
| `label` | `string` | `undefined` |  | セレクトのラベル |
| `error` | `boolean` | `false` |  | エラー状態を表示 |
| `errorMessage` | `string` | `undefined` |  | 表示するエラーメッセージ |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ value: string | string[] }` | 選択が変更されたときに発火 |
| `ha-open` | `{}` | ドロップダウンが開いたときに発火 |
| `ha-close` | `{}` | ドロップダウンが閉じたときに発火 |

### 使い方

```javascript
const element = document.querySelector('ha-select');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | オプション要素 |

## 使用例

### 基本的な使い方

シンプルなセレクトドロップダウン

```html
<ha-select label="国を選択" placeholder="選択してください...">
  <option value="us">アメリカ合衆国</option>
  <option value="uk">イギリス</option>
  <option value="jp">日本</option>
</ha-select>
```

---

### 複数選択

複数の値を選択できるセレクト

```html
<ha-select label="言語を選択" multiple>
  <option value="en">英語</option>
  <option value="es">スペイン語</option>
  <option value="fr">フランス語</option>
</ha-select>
```

## アクセシビリティ

### ARIAロール

- `combobox`
- `listbox`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `矢印キー` | オプションをナビゲート |
| `Enter/Space` | オプションを選択 |
| `Escape` | ドロップダウンを閉じる |

### ARIA属性

- `aria-expanded`
- `aria-haspopup`
- `aria-activedescendant`
- `aria-required`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-select-background`
- `--component-select-border`
- `--component-select-text`

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
- [コンポーネント使用例](../guides/examples.md)
