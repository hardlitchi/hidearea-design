# FormGroup（フォームグループ）

> ラベルと説明を含むフォームフィールドを整理するためのフォームグループコンポーネント

**タグ**: `<ha-form-group>`

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
| `label` | `string` | `undefined` |  | フォームグループラベル |
| `description` | `string` | `undefined` |  | ヘルプテキスト |
| `error` | `boolean` | `false` |  | エラー状態を表示 |
| `errorMessage` | `string` | `undefined` |  | 表示するエラーメッセージ |
| `required` | `boolean` | `false` |  | 必須インジケータを表示 |

## イベント

このコンポーネントはカスタムイベントを発行しません。

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | フォームフィールドのコンテンツ |
| `label` | カスタムラベルコンテンツ |
| `description` | カスタム説明コンテンツ |

## 使用例

### 基本的な使い方

入力フィールドを持つフォームグループ

```html
<ha-form-group label="メールアドレス" description="メールアドレスは共有されません" required>
  <ha-input type="email" placeholder="email@example.com"></ha-input>
</ha-form-group>
```

---

### エラー状態

エラー状態を表示するフォームグループ

```html
<ha-form-group label="ユーザー名" error error-message="このユーザー名は既に使用されています">
  <ha-input value="john"></ha-input>
</ha-form-group>
```

## アクセシビリティ

### ARIA ロール

特定のロールは定義されていません。

### キーボードサポート

標準的なキーボードナビゲーション。

### ARIA 属性

- `aria-describedby`
- `aria-invalid`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します:

### カラー

- `--component-form-group-label`
- `--component-form-group-description`
- `--state-error-text`

### スペーシング

- `--spacing-xs`
- `--spacing-sm`

### タイポグラフィ

- `--text-body-default-fontSize`
- `--text-body-small-fontSize`
- `--font-weight-medium`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
