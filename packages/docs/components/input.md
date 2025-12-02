# Input

テキスト入力フィールド。3つのバリアントと複数の入力タイプをサポートします。

## 基本的な使い方

```html
<ha-input placeholder="メールアドレスを入力"></ha-input>
```

## バリアント

3種類のスタイルバリアントが利用可能です：

### Default

```html
<ha-input variant="default" placeholder="Default"></ha-input>
```

### Filled

```html
<ha-input variant="filled" placeholder="Filled"></ha-input>
```

### Outlined

```html
<ha-input variant="outlined" placeholder="Outlined"></ha-input>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-input size="sm" placeholder="Small"></ha-input>
<ha-input size="md" placeholder="Medium"></ha-input>
<ha-input size="lg" placeholder="Large"></ha-input>
```

## 入力タイプ

HTML標準の入力タイプをサポートします：

```html
<ha-input type="text" placeholder="テキスト"></ha-input>
<ha-input type="email" placeholder="メールアドレス"></ha-input>
<ha-input type="password" placeholder="パスワード"></ha-input>
<ha-input type="number" placeholder="数値"></ha-input>
<ha-input type="tel" placeholder="電話番号"></ha-input>
<ha-input type="url" placeholder="URL"></ha-input>
<ha-input type="search" placeholder="検索"></ha-input>
<ha-input type="date"></ha-input>
<ha-input type="time"></ha-input>
```

## 状態

### Disabled

```html
<ha-input disabled placeholder="無効状態"></ha-input>
```

### Readonly

```html
<ha-input readonly value="読み取り専用"></ha-input>
```

### Required

```html
<ha-input required placeholder="必須項目"></ha-input>
```

### Error

```html
<ha-input error placeholder="エラー状態"></ha-input>
```

## フルワイド

```html
<ha-input full-width placeholder="フルワイド"></ha-input>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `variant` | `'default' \| 'filled' \| 'outlined'` | `'default'` | スタイルバリアント |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `type` | `string` | `'text'` | 入力タイプ |
| `value` | `string` | `''` | 入力値 |
| `placeholder` | `string` | `''` | プレースホルダー |
| `disabled` | `boolean` | `false` | 無効状態 |
| `readonly` | `boolean` | `false` | 読み取り専用 |
| `required` | `boolean` | `false` | 必須項目 |
| `error` | `boolean` | `false` | エラー状態 |
| `full-width` | `boolean` | `false` | フルワイド表示 |
| `name` | `string` | `''` | フォーム名 |
| `autocomplete` | `string` | `''` | オートコンプリート |
| `min` | `string \| number` | - | 最小値 |
| `max` | `string \| number` | - | 最大値 |
| `step` | `string \| number` | - | ステップ |
| `pattern` | `string` | - | 正規表現パターン |
| `minlength` | `number` | - | 最小文字数 |
| `maxlength` | `number` | - | 最大文字数 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `input` | 入力値が変更された時 | `CustomEvent<string>` |
| `change` | 入力が確定した時 | `CustomEvent<string>` |
| `focus` | フォーカスされた時 | `FocusEvent` |
| `blur` | フォーカスが外れた時 | `FocusEvent` |

## React

```tsx
import { Input } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');

  return (
    <Input
      variant="outlined"
      placeholder="メールアドレス"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

## Vue

```vue
<template>
  <HaInput
    v-model="email"
    variant="outlined"
    type="email"
    placeholder="メールアドレス"
  />
</template>

<script setup>
import { ref } from 'vue';
import { Input as HaInput } from '@hidearea-design/vue';

const email = ref('');
</script>
```

## FormGroup と組み合わせる

```html
<ha-form-group label="メールアドレス" helper-text="登録時のメールアドレスを入力してください">
  <ha-input
    type="email"
    placeholder="example@email.com"
    required
  ></ha-input>
</ha-form-group>
```

## バリデーション

```html
<ha-form-group label="パスワード" error="8文字以上で入力してください">
  <ha-input
    type="password"
    minlength="8"
    error
    required
  ></ha-input>
</ha-form-group>
```

## アクセシビリティ

- `disabled` 属性が設定されている場合、`aria-disabled="true"` が自動的に設定されます
- `required` 属性が設定されている場合、`aria-required="true"` が自動的に設定されます
- `error` 属性が設定されている場合、`aria-invalid="true"` が自動的に設定されます
- ラベルとの関連付けは FormGroup を使用することで自動的に行われます

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-input {
  --input-padding: 12px 16px;
  --input-border-radius: 6px;
  --input-font-size: 14px;
  --input-border-color: var(--color-gray-300);
  --input-focus-border-color: var(--color-primary-500);
}
```

## 使用例

### ログインフォーム

```html
<form>
  <ha-form-group label="メールアドレス">
    <ha-input type="email" name="email" required full-width></ha-input>
  </ha-form-group>

  <ha-form-group label="パスワード">
    <ha-input type="password" name="password" required full-width></ha-input>
  </ha-form-group>

  <ha-button type="submit" variant="primary" full-width>ログイン</ha-button>
</form>
```

### 検索フィールド

```html
<ha-input
  type="search"
  placeholder="検索..."
  variant="filled"
  size="lg"
  full-width
></ha-input>
```

### 数値入力

```html
<ha-input
  type="number"
  min="0"
  max="100"
  step="5"
  value="50"
></ha-input>
```
