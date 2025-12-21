# Toast（トースト）

> 一時的なメッセージを表示するトースト通知コンポーネント

**タグ**: `<ha-toast>`

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
| `variant` | `'info' | 'success' | 'warning' | 'danger'` | `'info'` |  | トーストのタイプ |
| `duration` | `number` | `3000` |  | 自動非表示までの時間（ミリ秒、0=自動非表示なし） |
| `position` | `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'` | `'top-right'` |  | トーストの表示位置 |
| `closable` | `boolean` | `true` |  | 閉じるボタンを表示 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-close` | `{}` | トーストが閉じられたときに発行 |

### 使用方法

```javascript
const element = document.querySelector('ha-toast');
element.addEventListener('ha-close', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | トーストのコンテンツ |

## 使用例

### 基本的な使い方

トースト通知を表示

```html
<ha-toast variant="success">
  変更が正常に保存されました！
</ha-toast>
```

---

### カスタム表示時間

カスタム表示時間を持つトースト

```html
<ha-toast variant="info" duration="5000">
  このメッセージは5秒間表示されます。
</ha-toast>
```

## アクセシビリティ

### ARIAロール

- `status`
- `alert`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `Escape` | トーストを閉じる |

### ARIA属性

- `aria-live`
- `aria-atomic`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-toast-background`
- `--component-toast-text`

### スペーシング

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
