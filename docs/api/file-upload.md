# FileUpload（ファイルアップロード）

> ファイルを選択してアップロードするためのファイルアップロードコンポーネント

**タグ**: `<ha-file-upload>`

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
| `accept` | `string` | `undefined` |  | 受け入れるファイルタイプ（例: "image/*"） |
| `multiple` | `boolean` | `false` |  | 複数ファイルの選択を許可 |
| `maxSize` | `number` | `undefined` |  | 最大ファイルサイズ（バイト単位） |
| `maxFiles` | `number` | `undefined` |  | 最大ファイル数 |
| `disabled` | `boolean` | `false` |  | ファイルアップロードを無効化 |
| `dragDrop` | `boolean` | `true` |  | ドラッグアンドドロップを有効化 |
| `label` | `string` | `undefined` |  | アップロードラベル |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ files: FileList }` | ファイルが選択されたときに発行される |
| `ha-error` | `{ error: string }` | バリデーションが失敗したときに発行される |

### 使い方

```javascript
const element = document.querySelector('ha-file-upload');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | カスタムアップロードエリアのコンテンツ |

## 使用例

### 基本的な使い方

シンプルなファイルアップロード

```html
<ha-file-upload label="ファイルをアップロード" accept="image/*"></ha-file-upload>
```

---

### 複数ファイル

ドラッグアンドドロップで複数ファイルをアップロード

```html
<ha-file-upload
  label="画像をアップロード"
  multiple
  :max-files="5"
  accept="image/*"
  drag-drop
></ha-file-upload>
```

## アクセシビリティ

### ARIA ロール

- `button`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `Enter/Space` | ファイルダイアログを開く |

### ARIA 属性

- `aria-label`
- `aria-describedby`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します:

### カラー

- `--component-file-upload-background`
- `--component-file-upload-border`
- `--component-file-upload-hover`

### スペーシング

- `--spacing-md`
- `--spacing-lg`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-md`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
