# Switch（スイッチ）

> バイナリのオン/オフ状態を切り替えるトグルスイッチ

**Tag**: `<ha-switch>`

**Category**: Form Controls

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
| `checked` | `boolean` | `false` |  | スイッチがオンかどうか |
| `disabled` | `boolean` | `false` |  | スイッチを無効化する |
| `required` | `boolean` | `false` |  | スイッチを必須にする |
| `label` | `string` | `undefined` |  | スイッチのラベル |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | スイッチのサイズ |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ checked: boolean }` | スイッチの状態が変更されたときに発火 |

### Usage

```javascript
const element = document.querySelector('ha-switch');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | スイッチのラベルコンテンツ |

## 使用例

### 基本的な使い方

シンプルなスイッチ

```html
<ha-switch label="通知を有効にする"></ha-switch>
```

---

### チェック状態

事前にチェックされたスイッチ

```html
<ha-switch label="ダークモード" checked></ha-switch>
```

---

### 異なるサイズ

スイッチのサイズ

```html
<ha-switch label="小" size="small"></ha-switch>
<ha-switch label="中" size="medium"></ha-switch>
<ha-switch label="大" size="large"></ha-switch>
```

## アクセシビリティ

### ARIA Roles

- `switch`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Space` | スイッチを切り替える |
| `Enter` | スイッチを切り替える |

### ARIA Attributes

- `aria-checked`
- `aria-disabled`
- `aria-required`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### Colors

- `--component-switch-background`
- `--component-switch-handle`
- `--component-switch-checked`

### Spacing

- `--spacing-xs`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-full`
- `--interaction-transition-fast-duration`

---

**関連ドキュメント**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
