# Alert（アラート）

> 重要なメッセージや通知を表示するためのアラートコンポーネント

**タグ**: `<ha-alert>`

**カテゴリ**: フィードバック

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
| `variant` | `'info' | 'success' | 'warning' | 'danger'` | `'info'` |  | アラートの種類 |
| `title` | `string` | `undefined` |  | アラートのタイトル |
| `closable` | `boolean` | `false` |  | 閉じるボタンを表示 |
| `icon` | `boolean` | `true` |  | アイコンを表示 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-close` | `{}` | アラートが閉じられたときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-alert');
element.addEventListener('ha-close', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | アラートのコンテンツ |
| `icon` | カスタムアイコン |

## 使用例

### 基本的な使い方

異なるアラートバリアント

```html
<ha-alert variant="info">これは情報メッセージです</ha-alert>
<ha-alert variant="success">操作が正常に完了しました</ha-alert>
<ha-alert variant="warning">注意してください</ha-alert>
<ha-alert variant="danger">エラーが発生しました</ha-alert>
```

---

### タイトル付き

タイトル付きアラート

```html
<ha-alert variant="warning" title="警告">
  この操作は取り消せません。
</ha-alert>
```

---

### 閉じるボタン付き

閉じるボタン付きアラート

```html
<ha-alert variant="info" closable>
  このアラートは閉じることができます。
</ha-alert>
```

## アクセシビリティ

### ARIAロール

- `alert`
- `status`

### キーボードサポート

| キー | 動作 |
|-----|--------|
| `Escape` | アラートを閉じる（閉じるボタンがある場合） |

### ARIA属性

- `aria-live`
- `aria-atomic`
- `aria-label`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-alert-info-background`
- `--component-alert-info-border`
- `--component-alert-info-text`

### スペーシング

- `--spacing-md`

### タイポグラフィ

- `--text-body-default-fontSize`
- `--font-weight-medium`

### その他

- `--border-radius-md`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
