# Input（入力フィールド）

> バリデーションと様々なタイプをサポートするテキスト入力フィールド

**タグ**: `<ha-input>`

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
| `type` | `'text' | 'email' | 'password' | 'number' | 'tel' | 'url'` | `'text'` |  | 入力タイプ |
| `value` | `string` | `''` |  | 入力値 |
| `placeholder` | `string` | `undefined` |  | プレースホルダーテキスト |
| `disabled` | `boolean` | `false` |  | 入力フィールドを無効化 |
| `readonly` | `boolean` | `false` |  | 入力フィールドを読み取り専用にする |
| `required` | `boolean` | `false` |  | 入力フィールドを必須にする |
| `error` | `boolean` | `false` |  | エラー状態を表示 |
| `label` | `string` | `undefined` |  | 入力ラベル |
| `description` | `string` | `undefined` |  | ヘルプテキスト |
| `errorMessage` | `string` | `undefined` |  | 表示するエラーメッセージ |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-input` | `{ value: string }` | 入力時に発行される |
| `ha-change` | `{ value: string }` | 変更時（ブラー）に発行される |
| `ha-focus` | `{}` | フォーカス時に発行される |
| `ha-blur` | `{}` | ブラー時に発行される |

### 使い方

```javascript
const element = document.querySelector('ha-input');
element.addEventListener('ha-input', (event) => {
  console.log(event.detail);
});
```

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### 基本的な使い方

シンプルなテキスト入力

```html
<ha-input label="名前" placeholder="お名前を入力してください"></ha-input>
```

---

### エラー状態

エラー状態の入力フィールド

```html
<ha-input label="メールアドレス" type="email" error error-message="有効なメールアドレスを入力してください"></ha-input>
```

---

### 無効化

無効化された入力フィールド

```html
<ha-input label="ユーザー名" value="johndoe" disabled></ha-input>
```

## アクセシビリティ

### ARIA ロール

- `textbox`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `Tab` | フォーカスを移動 |
| `Type` | テキストを入力 |

### ARIA 属性

- `aria-label`
- `aria-required`
- `aria-invalid`
- `aria-describedby`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します:

### カラー

- `--component-input-background`
- `--component-input-border`
- `--component-input-text`
- `--state-error-border`

### スペーシング

- `--spacing-sm`
- `--spacing-md`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-md`
- `--interaction-transition-fast-duration`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
