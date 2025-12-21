# List（リスト）

> アイテムのコレクションを表示するためのリストコンポーネント

**タグ**: `<ha-list>`

**カテゴリ**: データ表示

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
| `variant` | `'default' | 'bordered' | 'divided'` | `'default'` |  | リストのスタイルバリアント |
| `hoverable` | `boolean` | `false` |  | ホバー効果を追加 |
| `clickable` | `boolean` | `false` |  | アイテムをクリック可能にする |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-item-click` | `{ item: any, index: number }` | アイテムがクリックされたときに発行される |

### 使い方

```javascript
const element = document.querySelector('ha-list');
element.addEventListener('ha-item-click', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | リストアイテム |

## 使用例

### 基本的な使い方

シンプルなリスト

```html
<ha-list>
  <ha-list-item>アイテム 1</ha-list-item>
  <ha-list-item>アイテム 2</ha-list-item>
  <ha-list-item>アイテム 3</ha-list-item>
</ha-list>
```

---

### 区切り線付きリスト

区切り線のあるリスト

```html
<ha-list variant="divided" hoverable>
  <ha-list-item>
    <h4>タイトル</h4>
    <p>説明テキスト</p>
  </ha-list-item>
  <ha-list-item>
    <h4>別のタイトル</h4>
    <p>さらに説明</p>
  </ha-list-item>
</ha-list>
```

## アクセシビリティ

### ARIA ロール

- `list`
- `listitem`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `矢印キー` | アイテムをナビゲート |
| `Enter` | アイテムを選択（クリック可能な場合） |

### ARIA 属性

- `aria-label`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します:

### カラー

- `--component-list-item-background`
- `--component-list-item-hover`
- `--component-list-border`

### スペーシング

- `--spacing-sm`
- `--spacing-md`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-md`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
