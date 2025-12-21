# Drawer（ドロワー）

> サイドパネルコンテンツ用のドロワーコンポーネント

**タグ**: `<ha-drawer>`

**カテゴリー**: Overlay

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
| `open` | `boolean` | `false` |  | ドロワーが開いているかどうか |
| `position` | `'left' | 'right' | 'top' | 'bottom'` | `'right'` |  | ドロワーの位置 |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | ドロワーのサイズ |
| `title` | `string` | `undefined` |  | ドロワーのタイトル |
| `closeOnOverlay` | `boolean` | `true` |  | オーバーレイクリック時に閉じる |
| `closeOnEscape` | `boolean` | `true` |  | Escape キー押下時に閉じる |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-open` | `{}` | ドロワーが開いたときに発火 |
| `ha-close` | `{}` | ドロワーが閉じたときに発火 |

### 使い方

```javascript
const element = document.querySelector('ha-drawer');
element.addEventListener('ha-open', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | ドロワーのコンテンツ |
| `header` | カスタムヘッダーコンテンツ |
| `footer` | ドロワーのフッター |

## 使用例

### 基本的な使い方

シンプルなドロワー

```html
<ha-drawer title="設定" open>
  <p>ドロワーのコンテンツがここに入ります</p>
</ha-drawer>
```

---

### 左側配置

左側から表示されるドロワー

```html
<ha-drawer position="left" title="メニュー" open>
  <ha-menu>
    <ha-menu-item>ホーム</ha-menu-item>
    <ha-menu-item>概要</ha-menu-item>
  </ha-menu>
</ha-drawer>
```

## アクセシビリティ

### ARIA ロール

- `dialog`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `Escape` | ドロワーを閉じる |
| `Tab` | フォーカス可能な要素を移動 |

### ARIA 属性

- `aria-modal`
- `aria-labelledby`
- `aria-describedby`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します:

### 色

- `--component-drawer-background`
- `--component-drawer-overlay`

### 間隔

- `--spacing-lg`

### タイポグラフィ

- `--text-heading-h3-fontSize`
- `--font-weight-bold`

### その他

- `--surface-overlay-elevation`

---

**関連ドキュメント**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
