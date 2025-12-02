# Checkbox

チェックボックスコンポーネント。indeterminate（不確定）状態をサポートします。

## 基本的な使い方

```html
<ha-checkbox>利用規約に同意する</ha-checkbox>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-checkbox size="sm">Small</ha-checkbox>
<ha-checkbox size="md">Medium</ha-checkbox>
<ha-checkbox size="lg">Large</ha-checkbox>
```

## 状態

### Checked

```html
<ha-checkbox checked>チェック済み</ha-checkbox>
```

### Disabled

```html
<ha-checkbox disabled>無効状態</ha-checkbox>
<ha-checkbox checked disabled>チェック済み（無効）</ha-checkbox>
```

### Indeterminate

```html
<ha-checkbox indeterminate>不確定状態</ha-checkbox>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `checked` | `boolean` | `false` | チェック状態 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `indeterminate` | `boolean` | `false` | 不確定状態 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `value` | `string` | `''` | フォーム値 |
| `name` | `string` | `''` | フォーム名 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `change` | チェック状態が変更された時 | `CustomEvent<boolean>` |

## React

```tsx
import { Checkbox } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      利用規約に同意する
    </Checkbox>
  );
}
```

## Vue

```vue
<template>
  <HaCheckbox v-model="accepted">
    利用規約に同意する
  </HaCheckbox>
</template>

<script setup>
import { ref } from 'vue';
import { Checkbox as HaCheckbox } from '@hidearea-design/vue';

const accepted = ref(false);
</script>
```

## 使用例

### フォームでの使用

```html
<ha-form-group>
  <ha-checkbox name="newsletter" value="yes">
    ニュースレターを受け取る
  </ha-checkbox>
  <ha-checkbox name="terms" value="yes" required>
    利用規約に同意する
  </ha-checkbox>
</ha-form-group>
```

### チェックボックスグループ

```html
<ha-form-group label="興味のある分野">
  <ha-checkbox name="interests" value="design">デザイン</ha-checkbox>
  <ha-checkbox name="interests" value="development">開発</ha-checkbox>
  <ha-checkbox name="interests" value="marketing">マーケティング</ha-checkbox>
</ha-form-group>
```

### 全選択機能

```tsx
import { Checkbox } from '@hidearea-design/react';
import { useState } from 'react';

function CheckboxGroup() {
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: false },
    { id: 3, label: 'Item 3', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked);

  const handleSelectAll = () => {
    setItems(items.map(item => ({ ...item, checked: !allChecked })));
  };

  const handleItemChange = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onChange={handleSelectAll}
      >
        全て選択
      </Checkbox>
      {items.map(item => (
        <Checkbox
          key={item.id}
          checked={item.checked}
          onChange={() => handleItemChange(item.id)}
        >
          {item.label}
        </Checkbox>
      ))}
    </div>
  );
}
```

## アクセシビリティ

- `role="checkbox"` が自動的に設定されます
- `aria-checked` 属性で状態が管理されます
- indeterminate 状態では `aria-checked="mixed"` が設定されます
- `disabled` 属性が設定されている場合、`aria-disabled="true"` が自動的に設定されます
- キーボード操作に対応しています（Space キー）

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-checkbox {
  --checkbox-size: 20px;
  --checkbox-border-radius: 4px;
  --checkbox-border-color: var(--color-gray-300);
  --checkbox-checked-bg: var(--color-primary-500);
}
```
