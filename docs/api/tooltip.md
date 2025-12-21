# Tooltip（ツールチップ）

> ホバー時にコンテキスト情報を表示するツールチップコンポーネント

**タグ**: `<ha-tooltip>`

**カテゴリ**: オーバーレイ

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
| `content` | `string` | `undefined` | ✅ | ツールチップのコンテンツ |
| `placement` | `'top' | 'bottom' | 'left' | 'right'` | `'top'` |  | ツールチップの配置 |
| `trigger` | `'hover' | 'focus' | 'click'` | `'hover'` |  | トリガー動作 |
| `delay` | `number` | `0` |  | 表示遅延時間（ミリ秒） |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-show` | `{}` | ツールチップが表示されたときに発行 |
| `ha-hide` | `{}` | ツールチップが非表示になったときに発行 |

### 使用方法

```javascript
const element = document.querySelector('ha-tooltip');
element.addEventListener('ha-show', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | ツールチップをトリガーする要素 |

## 使用例

### 基本的な使い方

シンプルなツールチップ

```html
<ha-tooltip content="これはツールチップです">
  <ha-button>ホバーしてください</ha-button>
</ha-tooltip>
```

---

### 異なる配置

ツールチップの位置指定

```html
<ha-tooltip content="上部のツールチップ" placement="top">
  <ha-button>上部</ha-button>
</ha-tooltip>
<ha-tooltip content="下部のツールチップ" placement="bottom">
  <ha-button>下部</ha-button>
</ha-tooltip>
```

## アクセシビリティ

### ARIAロール

- `tooltip`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `Escape` | ツールチップを非表示 |

### ARIA属性

- `aria-describedby`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-tooltip-background`
- `--component-tooltip-text`

### スペーシング

- `--spacing-xs`
- `--spacing-sm`

### タイポグラフィ

- `--text-body-small-fontSize`

### その他

- `--border-radius-sm`
- `--surface-overlay-elevation`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネントの使用例](../guides/examples.md)
