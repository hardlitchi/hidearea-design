# Menu（メニュー）

> アクションやオプションのリストを表示するメニューコンポーネント

**タグ**: `<ha-menu>`

**カテゴリ**: Navigation

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
| `open` | `boolean` | `false` |  | メニューが開いているかどうか |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-select` | `{ value: string }` | メニュー項目が選択されたときに発火 |
| `ha-open` | `{}` | メニューが開いたときに発火 |
| `ha-close` | `{}` | メニューが閉じたときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-menu');
element.addEventListener('ha-select', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | メニュー項目 |
| `trigger` | メニューをトリガーする要素 |

## 使用例

### 基本的な使用方法

シンプルなドロップダウンメニュー

```html
<ha-menu>
  <ha-button slot="trigger">アクション</ha-button>
  <ha-menu-item value="edit">編集</ha-menu-item>
  <ha-menu-item value="duplicate">複製</ha-menu-item>
  <ha-menu-item value="delete">削除</ha-menu-item>
</ha-menu>
```

## アクセシビリティ

### ARIA ロール

- `menu`
- `menuitem`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `矢印キー` | 項目を移動 |
| `Enter/Space` | 項目を選択 |
| `Escape` | メニューを閉じる |

### ARIA 属性

- `aria-haspopup`
- `aria-expanded`
- `aria-activedescendant`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-menu-background`
- `--component-menu-item-hover`

### スペーシング

- `--spacing-sm`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-md`
- `--surface-overlay-elevation`

---

**関連ドキュメント**:
- [移行ガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント例](../guides/examples.md)
