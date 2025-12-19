# Theme Switcher

> テーマ切り替えコンポーネント。ライト/ダーク/自動モードの切り替えを提供します。

**Tag**: `<ha-theme-switcher>`

**Category**: Utility

## Table of Contents

- [Props](#props)
- [Events](#events)
- [Slots](#slots)
- [Examples](#examples)
- [Accessibility](#accessibility)
- [Design Tokens](#design-tokens)

---

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'toggle' | 'dropdown' | 'segmented'` | `'toggle'` |  | コンポーネントの表示スタイル |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` |  | コンポーネントのサイズ |
| `show-label` | `boolean` | `false` |  | ラベルを表示するかどうか |
| `show-auto` | `boolean` | `false` |  | 自動モードを表示するかどうか |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-theme-change` | `{ theme: 'light' | 'dark' | 'auto', effective: 'light' | 'dark' }` | テーマが変更されたときに発火 |

### Usage

```javascript
const element = document.querySelector('ha-theme-switcher');
element.addEventListener('ha-theme-change', (event) => {
  console.log(event.detail);
});
```

## Slots

This component has no slots.

## Examples

### 基本的な使い方

デフォルトのトグルボタンスタイル

```html
<ha-theme-switcher></ha-theme-switcher>
```

---

### ドロップダウンスタイル

ドロップダウンメニューでテーマを選択

```html
<ha-theme-switcher variant="dropdown" show-label></ha-theme-switcher>
```

---

### セグメント付きコントロール

自動モードオプション付きのセグメント化されたコントロール

```html
<ha-theme-switcher variant="segmented" show-auto></ha-theme-switcher>
```

## Accessibility

### ARIA Roles

- `button`
- `group`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Enter` | テーマを切り替え |
| `Space` | テーマを切り替え |
| `Arrow Keys` | セグメント間を移動（segmentedバリアントの場合） |

### ARIA Attributes

- `aria-label`
- `aria-pressed`
- `aria-expanded`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-button-primary-background-default`
- `--component-button-primary-text-default`
- `--background-primary`
- `--foreground-primary`

### Spacing

- `--spacing-sm`
- `--spacing-md`
- `--spacing-lg`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-md`
- `--interaction-transition-fast-duration`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
