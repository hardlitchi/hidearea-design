# Textarea（テキストエリア）

> 複数行テキスト入力コンポーネント

**Tag**: `<ha-textarea>`

**Category**: Form Controls

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
| `value` | `string` | `''` |  | テキストエリアの値 |
| `placeholder` | `string` | `undefined` |  | プレースホルダーテキスト |
| `disabled` | `boolean` | `false` |  | テキストエリアを無効化する |
| `readonly` | `boolean` | `false` |  | テキストエリアを読み取り専用にする |
| `required` | `boolean` | `false` |  | テキストエリアを必須にする |
| `rows` | `number` | `3` |  | 表示される行数 |
| `maxlength` | `number` | `undefined` |  | 最大文字数 |
| `resize` | `'none' | 'vertical' | 'horizontal' | 'both'` | `'vertical'` |  | リサイズ動作 |
| `label` | `string` | `undefined` |  | テキストエリアのラベル |
| `error` | `boolean` | `false` |  | エラー状態を表示 |
| `errorMessage` | `string` | `undefined` |  | 表示するエラーメッセージ |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-input` | `{ value: string }` | 入力時に発火 |
| `ha-change` | `{ value: string }` | 変更時（blur）に発火 |
| `ha-focus` | `{}` | フォーカス時に発火 |
| `ha-blur` | `{}` | ブラー時に発火 |

### Usage

```javascript
const element = document.querySelector('ha-textarea');
element.addEventListener('ha-input', (event) => {
  console.log(event.detail);
});
```

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### 基本的な使い方

シンプルなテキストエリア

```html
<ha-textarea label="コメント" placeholder="コメントを入力してください..."></ha-textarea>
```

---

### 文字数制限付き

最大文字数付きテキストエリア

```html
<ha-textarea label="自己紹介" maxlength="200" rows="5"></ha-textarea>
```

## アクセシビリティ

### ARIA Roles

- `textbox`

### Keyboard Support

| Key | Action |
|-----|--------|
| `標準的なテキストエリアのキーボードショートカット` |  |
| `Tab` | フォーカスを移動 |

### ARIA Attributes

- `aria-label`
- `aria-required`
- `aria-invalid`
- `aria-describedby`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### Colors

- `--component-textarea-background`
- `--component-textarea-border`
- `--component-textarea-text`

### Spacing

- `--spacing-sm`
- `--spacing-md`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-md`
- `--interaction-transition-fast-duration`

---

**関連ドキュメント**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
