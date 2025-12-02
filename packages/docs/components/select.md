# Select

ドロップダウン選択フィールド。optgroup をサポートします。

## 基本的な使い方

```html
<ha-select>
  <option value="">選択してください</option>
  <option value="1">オプション1</option>
  <option value="2">オプション2</option>
  <option value="3">オプション3</option>
</ha-select>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-select size="sm">
  <option>Small</option>
</ha-select>

<ha-select size="md">
  <option>Medium</option>
</ha-select>

<ha-select size="lg">
  <option>Large</option>
</ha-select>
```

## 状態

### Disabled

```html
<ha-select disabled>
  <option>選択できません</option>
</ha-select>
```

### Required

```html
<ha-select required>
  <option value="">選択してください</option>
  <option value="1">オプション1</option>
</ha-select>
```

### Error

```html
<ha-select error>
  <option value="">選択してください</option>
  <option value="1">オプション1</option>
</ha-select>
```

## フルワイド

```html
<ha-select full-width>
  <option>フルワイド</option>
</ha-select>
```

## optgroup

```html
<ha-select>
  <option value="">選択してください</option>
  <optgroup label="フルーツ">
    <option value="apple">りんご</option>
    <option value="banana">バナナ</option>
    <option value="orange">オレンジ</option>
  </optgroup>
  <optgroup label="野菜">
    <option value="carrot">にんじん</option>
    <option value="potato">じゃがいも</option>
    <option value="tomato">トマト</option>
  </optgroup>
</ha-select>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `value` | `string` | `''` | 選択値 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `required` | `boolean` | `false` | 必須項目 |
| `error` | `boolean` | `false` | エラー状態 |
| `full-width` | `boolean` | `false` | フルワイド表示 |
| `name` | `string` | `''` | フォーム名 |
| `multiple` | `boolean` | `false` | 複数選択 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `change` | 選択が変更された時 | `CustomEvent<string>` |
| `focus` | フォーカスされた時 | `FocusEvent` |
| `blur` | フォーカスが外れた時 | `FocusEvent` |

## React

```tsx
import { Select } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [country, setCountry] = useState('');

  return (
    <Select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      fullWidth
    >
      <option value="">選択してください</option>
      <option value="jp">日本</option>
      <option value="us">アメリカ</option>
      <option value="uk">イギリス</option>
    </Select>
  );
}
```

## Vue

```vue
<template>
  <HaSelect v-model="country" full-width>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
    <option value="uk">イギリス</option>
  </HaSelect>
</template>

<script setup>
import { ref } from 'vue';
import { Select as HaSelect } from '@hidearea-design/vue';

const country = ref('');
</script>
```

## 使用例

### FormGroup と組み合わせる

```html
<ha-form-group label="国" required>
  <ha-select name="country" required full-width>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
    <option value="uk">イギリス</option>
  </ha-select>
</ha-form-group>
```

### カテゴリ別選択

```html
<ha-form-group label="商品カテゴリ">
  <ha-select full-width>
    <option value="">選択してください</option>
    <optgroup label="電化製品">
      <option value="pc">パソコン</option>
      <option value="smartphone">スマートフォン</option>
      <option value="tablet">タブレット</option>
    </optgroup>
    <optgroup label="家具">
      <option value="desk">デスク</option>
      <option value="chair">チェア</option>
      <option value="shelf">シェルフ</option>
    </optgroup>
  </ha-select>
</ha-form-group>
```

### 複数選択

```html
<ha-select multiple size="5" full-width>
  <option value="design">デザイン</option>
  <option value="development">開発</option>
  <option value="marketing">マーケティング</option>
  <option value="sales">営業</option>
  <option value="support">サポート</option>
</ha-select>
```

## アクセシビリティ

- `disabled` 属性が設定されている場合、`aria-disabled="true"` が自動的に設定されます
- `required` 属性が設定されている場合、`aria-required="true"` が自動的に設定されます
- `error` 属性が設定されている場合、`aria-invalid="true"` が自動的に設定されます
- キーボード操作に対応しています（矢印キー、Enter キー）

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-select {
  --select-padding: 10px 12px;
  --select-border-radius: 6px;
  --select-font-size: 14px;
  --select-border-color: var(--color-gray-300);
  --select-focus-border-color: var(--color-primary-500);
}
```
