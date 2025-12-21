# Modal（モーダル）

> オーバーレイでコンテンツを表示するモーダルダイアログコンポーネント

**タグ**: `<ha-modal>`

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
| `open` | `boolean` | `false` |  | モーダルが開いているかどうか |
| `size` | `'small' | 'medium' | 'large' | 'fullscreen'` | `'medium'` |  | モーダルのサイズ |
| `title` | `string` | `undefined` |  | モーダルのタイトル |
| `closeOnOverlay` | `boolean` | `true` |  | オーバーレイクリックで閉じる |
| `closeOnEscape` | `boolean` | `true` |  | Escapeキー押下で閉じる |
| `closable` | `boolean` | `true` |  | 閉じるボタンを表示 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-open` | `{}` | モーダルが開いたときに発火 |
| `ha-close` | `{}` | モーダルが閉じたときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-modal');
element.addEventListener('ha-open', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | モーダルコンテンツ |
| `header` | カスタムヘッダーコンテンツ |
| `footer` | モーダルフッター（通常はボタン） |

## 使用例

### 基本的な使用方法

シンプルなモーダル

```html
<ha-modal title="アクションの確認" open>
  続行してもよろしいですか？
  <div slot="footer">
    <ha-button variant="outline">キャンセル</ha-button>
    <ha-button variant="primary">確認</ha-button>
  </div>
</ha-modal>
```

---

### 大きいモーダル

大きいサイズのモーダル

```html
<ha-modal title="詳細" size="large" open>
  <p>モーダルのコンテンツがここに入ります...</p>
</ha-modal>
```

## アクセシビリティ

### ARIA ロール

- `dialog`
- `alertdialog`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `Escape` | モーダルを閉じる |
| `Tab` | フォーカス可能な要素を移動 |

### ARIA 属性

- `aria-modal`
- `aria-labelledby`
- `aria-describedby`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-modal-background`
- `--component-modal-overlay`

### スペーシング

- `--spacing-lg`
- `--spacing-xl`

### タイポグラフィ

- `--text-heading-h3-fontSize`
- `--font-weight-bold`

### その他

- `--border-radius-lg`
- `--surface-overlay-elevation`

---

**関連ドキュメント**:
- [移行ガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント例](../guides/examples.md)
