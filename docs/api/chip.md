# Chip（チップ）

> 入力、属性、アクションを表すコンパクトな要素

**タグ**: `<ha-chip>`

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
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | チップのサイズ |
| `color` | `'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'` | `'default'` |  | チップのカラーバリアント |
| `deletable` | `boolean` | `false` |  | 削除ボタンを表示 |
| `interactive` | `boolean` | `false` |  | インタラクティブ（クリック可能）にする |
| `disabled` | `boolean` | `false` |  | チップを無効化 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `chip-click` | `{ originalEvent: MouseEvent }` | チップがクリックされたときに発火（interactiveの場合） |
| `chip-delete` | `{ chip: HaChip }` | 削除ボタンがクリックされたときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-chip');
element.addEventListener('chip-click', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | チップのテキストコンテンツ |
| `icon` | 先頭アイコン |

## 使用例

### 基本的な使い方

シンプルなチップ

```html
<ha-chip>デフォルト</ha-chip>
<ha-chip color="primary">プライマリ</ha-chip>
<ha-chip color="success">成功</ha-chip>
```

---

### インタラクティブチップ

クリック可能なチップ

```html
<ha-chip interactive>クリックしてください</ha-chip>
```

---

### 削除可能なチップ

削除ボタン付きチップ

```html
<ha-chip deletable>削除可能</ha-chip>
```

---

### アイコン付きチップ

先頭アイコン付きチップ

```html
<ha-chip>
  <svg slot="icon" width="16" height="16">...</svg>
  アイコン付き
</ha-chip>
```

## アクセシビリティ

### ARIAロール

- `button`

### キーボードサポート

| キー | 動作 |
|-----|--------|
| `Enter` | チップをアクティブ化 |
| `Space` | チップをアクティブ化 |

### ARIA属性

- `aria-label`
- `aria-disabled`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-chip-default-background`
- `--component-chip-primary-background`

### スペーシング

- `--spacing-xs`
- `--spacing-sm`
- `--spacing-md`

### タイポグラフィ

- `--text-body-small-fontSize`
- `--font-weight-medium`

### その他

- `--radius-full`
- `--component-chip-interactive-transition-properties`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
