# Tabs（タブ）

> コンテンツを異なるビューに整理するためのタブコンポーネント

**Tag**: `<ha-tabs>`

**Category**: Navigation

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
| `value` | `string` | `undefined` |  | アクティブなタブの値 |
| `variant` | `'default' | 'pills' | 'underline'` | `'default'` |  | タブのスタイルバリアント |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ value: string }` | アクティブなタブが変更されたときに発火 |

### Usage

```javascript
const element = document.querySelector('ha-tabs');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | タブとパネル要素 |

## 使用例

### 基本的な使い方

シンプルなタブ

```html
<ha-tabs>
  <ha-tab value="profile">プロフィール</ha-tab>
  <ha-tab value="settings">設定</ha-tab>
  <ha-tab value="notifications">通知</ha-tab>

  <ha-tab-panel value="profile">プロフィールコンテンツ</ha-tab-panel>
  <ha-tab-panel value="settings">設定コンテンツ</ha-tab-panel>
  <ha-tab-panel value="notifications">通知コンテンツ</ha-tab-panel>
</ha-tabs>
```

---

### ピルスタイルバリアント

ピルスタイルのタブ

```html
<ha-tabs variant="pills">
  <ha-tab value="overview">概要</ha-tab>
  <ha-tab value="analytics">分析</ha-tab>
</ha-tabs>
```

## アクセシビリティ

### ARIA Roles

- `tablist`
- `tab`
- `tabpanel`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | タブ間を移動 |
| `Home` | 最初のタブ |
| `End` | 最後のタブ |

### ARIA Attributes

- `aria-selected`
- `aria-controls`
- `aria-labelledby`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### Colors

- `--component-tabs-border`
- `--component-tabs-active`
- `--component-tabs-text`

### Spacing

- `--spacing-md`

### Typography

- `--text-body-default-fontSize`
- `--font-weight-medium`

### Other

- `--border-radius-md`

---

**関連ドキュメント**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
