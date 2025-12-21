# Pagination（ページネーション）

> コンテンツのページ間を移動するためのページネーションコンポーネント

**タグ**: `<ha-pagination>`

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
| `currentPage` | `number` | `1` |  | 現在アクティブなページ |
| `totalPages` | `number` | `undefined` | ✅ | 総ページ数 |
| `siblingCount` | `number` | `1` |  | 各側に表示される兄弟ページの数 |
| `showFirstLast` | `boolean` | `true` |  | 最初/最後のページボタンを表示 |
| `disabled` | `boolean` | `false` |  | ページネーションを無効化 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ page: number }` | ページが変更されたときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-pagination');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### 基本的な使用方法

シンプルなページネーション

```html
<ha-pagination :current-page="1" :total-pages="10"></ha-pagination>
```

---

### 最初/最後のボタンなし

最初/最後のページボタンを表示しないページネーション

```html
<ha-pagination :current-page="5" :total-pages="20" :show-first-last="false"></ha-pagination>
```

## アクセシビリティ

### ARIA ロール

- `navigation`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `矢印キー` | ページを移動 |
| `Enter` | ページを選択 |

### ARIA 属性

- `aria-label`
- `aria-current`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-pagination-background`
- `--component-pagination-active`
- `--component-pagination-text`

### スペーシング

- `--spacing-sm`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-md`

---

**関連ドキュメント**:
- [移行ガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント例](../guides/examples.md)
