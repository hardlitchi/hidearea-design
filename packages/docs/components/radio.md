# Radio

ラジオボタンコンポーネント。自動グループ化機能をサポートします。

## 基本的な使い方

```html
<ha-radio name="plan" value="free">無料プラン</ha-radio>
<ha-radio name="plan" value="pro">プロプラン</ha-radio>
<ha-radio name="plan" value="enterprise">エンタープライズプラン</ha-radio>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-radio name="size" value="sm" size="sm">Small</ha-radio>
<ha-radio name="size" value="md" size="md">Medium</ha-radio>
<ha-radio name="size" value="lg" size="lg">Large</ha-radio>
```

## 状態

### Checked

```html
<ha-radio name="option" value="1" checked>選択済み</ha-radio>
<ha-radio name="option" value="2">未選択</ha-radio>
```

### Disabled

```html
<ha-radio disabled>無効状態</ha-radio>
<ha-radio checked disabled>選択済み（無効）</ha-radio>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `checked` | `boolean` | `false` | 選択状態 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `value` | `string` | `''` | フォーム値 |
| `name` | `string` | `''` | フォーム名（グループ化に使用） |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `change` | 選択状態が変更された時 | `CustomEvent<string>` |

## React

```tsx
import { Radio } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [plan, setPlan] = useState('free');

  return (
    <div>
      <Radio
        name="plan"
        value="free"
        checked={plan === 'free'}
        onChange={(e) => setPlan(e.target.value)}
      >
        無料プラン
      </Radio>
      <Radio
        name="plan"
        value="pro"
        checked={plan === 'pro'}
        onChange={(e) => setPlan(e.target.value)}
      >
        プロプラン
      </Radio>
      <Radio
        name="plan"
        value="enterprise"
        checked={plan === 'enterprise'}
        onChange={(e) => setPlan(e.target.value)}
      >
        エンタープライズプラン
      </Radio>
    </div>
  );
}
```

## Vue

```vue
<template>
  <div>
    <HaRadio v-model="plan" value="free">無料プラン</HaRadio>
    <HaRadio v-model="plan" value="pro">プロプラン</HaRadio>
    <HaRadio v-model="plan" value="enterprise">エンタープライズプラン</HaRadio>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Radio as HaRadio } from '@hidearea-design/vue';

const plan = ref('free');
</script>
```

## 使用例

### FormGroup と組み合わせる

```html
<ha-form-group label="プランを選択" required>
  <ha-radio name="plan" value="free" checked>無料プラン</ha-radio>
  <ha-radio name="plan" value="pro">プロプラン</ha-radio>
  <ha-radio name="plan" value="enterprise">エンタープライズプラン</ha-radio>
</ha-form-group>
```

### 説明付きオプション

```html
<ha-form-group label="配送方法">
  <div>
    <ha-radio name="shipping" value="standard">
      <div>
        <strong>標準配送</strong>
        <div style="font-size: 12px; color: var(--color-gray-600);">
          3-5営業日 / 無料
        </div>
      </div>
    </ha-radio>
  </div>

  <div>
    <ha-radio name="shipping" value="express">
      <div>
        <strong>速達配送</strong>
        <div style="font-size: 12px; color: var(--color-gray-600);">
          1-2営業日 / 500円
        </div>
      </div>
    </ha-radio>
  </div>
</ha-form-group>
```

### 水平レイアウト

```html
<ha-form-group label="性別">
  <div style="display: flex; gap: 16px;">
    <ha-radio name="gender" value="male">男性</ha-radio>
    <ha-radio name="gender" value="female">女性</ha-radio>
    <ha-radio name="gender" value="other">その他</ha-radio>
  </div>
</ha-form-group>
```

### 動的オプション

```tsx
import { Radio, FormGroup } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [selectedSize, setSelectedSize] = useState('m');

  const sizes = [
    { value: 's', label: 'S', stock: 5 },
    { value: 'm', label: 'M', stock: 10 },
    { value: 'l', label: 'L', stock: 0 },
    { value: 'xl', label: 'XL', stock: 3 },
  ];

  return (
    <FormGroup label="サイズを選択">
      {sizes.map((size) => (
        <Radio
          key={size.value}
          name="size"
          value={size.value}
          checked={selectedSize === size.value}
          disabled={size.stock === 0}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {size.label} {size.stock === 0 && '(在庫なし)'}
        </Radio>
      ))}
    </FormGroup>
  );
}
```

## アクセシビリティ

- `role="radio"` が自動的に設定されます
- `aria-checked` 属性で状態が管理されます
- `disabled` 属性が設定されている場合、`aria-disabled="true"` が自動的に設定されます
- 同じ `name` 属性を持つラジオボタンは自動的にグループ化されます
- キーボード操作に対応しています（矢印キー、Space キー）

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-radio {
  --radio-size: 20px;
  --radio-border-color: var(--color-gray-300);
  --radio-checked-bg: var(--color-primary-500);
  --radio-gap: 8px;
}
```
