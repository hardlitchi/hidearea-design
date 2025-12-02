# Textarea

複数行テキスト入力フィールド。resize 制御をサポートします。

## 基本的な使い方

```html
<ha-textarea placeholder="メッセージを入力"></ha-textarea>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-textarea size="sm" placeholder="Small"></ha-textarea>
<ha-textarea size="md" placeholder="Medium"></ha-textarea>
<ha-textarea size="lg" placeholder="Large"></ha-textarea>
```

## 行数

```html
<ha-textarea rows="3" placeholder="3行"></ha-textarea>
<ha-textarea rows="5" placeholder="5行"></ha-textarea>
<ha-textarea rows="10" placeholder="10行"></ha-textarea>
```

## リサイズ制御

```html
<!-- リサイズ可能（デフォルト） -->
<ha-textarea resize="both" placeholder="両方向にリサイズ可能"></ha-textarea>

<!-- 垂直方向のみ -->
<ha-textarea resize="vertical" placeholder="垂直方向のみリサイズ可能"></ha-textarea>

<!-- 水平方向のみ -->
<ha-textarea resize="horizontal" placeholder="水平方向のみリサイズ可能"></ha-textarea>

<!-- リサイズ不可 -->
<ha-textarea resize="none" placeholder="リサイズ不可"></ha-textarea>
```

## 状態

### Disabled

```html
<ha-textarea disabled placeholder="無効状態"></ha-textarea>
```

### Readonly

```html
<ha-textarea readonly value="読み取り専用"></ha-textarea>
```

### Required

```html
<ha-textarea required placeholder="必須項目"></ha-textarea>
```

### Error

```html
<ha-textarea error placeholder="エラー状態"></ha-textarea>
```

## フルワイド

```html
<ha-textarea full-width placeholder="フルワイド"></ha-textarea>
```

## 文字数制限

```html
<ha-textarea maxlength="200" placeholder="最大200文字"></ha-textarea>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `value` | `string` | `''` | 入力値 |
| `placeholder` | `string` | `''` | プレースホルダー |
| `rows` | `number` | `3` | 表示行数 |
| `resize` | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | `'vertical'` | リサイズ制御 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `readonly` | `boolean` | `false` | 読み取り専用 |
| `required` | `boolean` | `false` | 必須項目 |
| `error` | `boolean` | `false` | エラー状態 |
| `full-width` | `boolean` | `false` | フルワイド表示 |
| `name` | `string` | `''` | フォーム名 |
| `maxlength` | `number` | - | 最大文字数 |
| `minlength` | `number` | - | 最小文字数 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `input` | 入力値が変更された時 | `CustomEvent<string>` |
| `change` | 入力が確定した時 | `CustomEvent<string>` |
| `focus` | フォーカスされた時 | `FocusEvent` |
| `blur` | フォーカスが外れた時 | `FocusEvent` |

## React

```tsx
import { Textarea } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  return (
    <Textarea
      rows={5}
      placeholder="メッセージを入力"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      fullWidth
    />
  );
}
```

## Vue

```vue
<template>
  <HaTextarea
    v-model="message"
    :rows="5"
    placeholder="メッセージを入力"
    full-width
  />
</template>

<script setup>
import { ref } from 'vue';
import { Textarea as HaTextarea } from '@hidearea-design/vue';

const message = ref('');
</script>
```

## 使用例

### FormGroup と組み合わせる

```html
<ha-form-group
  label="お問い合わせ内容"
  helper-text="詳しい内容をご記入ください"
  required
>
  <ha-textarea
    rows="8"
    placeholder="お問い合わせ内容を入力"
    required
    full-width
  ></ha-textarea>
</ha-form-group>
```

### 文字数カウンター

```tsx
import { Textarea, FormGroup } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const maxLength = 200;

  return (
    <FormGroup
      label="メッセージ"
      helperText={`${message.length} / ${maxLength} 文字`}
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={maxLength}
        rows={5}
        fullWidth
      />
    </FormGroup>
  );
}
```

### 自動拡張

```tsx
import { Textarea } from '@hidearea-design/react';
import { useEffect, useRef } from 'react';

function AutoExpandTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoExpand = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <Textarea
      ref={textareaRef}
      onInput={autoExpand}
      resize="none"
      placeholder="自動拡張するテキストエリア"
      fullWidth
    />
  );
}
```

### お問い合わせフォーム

```html
<form>
  <ha-form-group label="お名前" required>
    <ha-input name="name" required full-width></ha-input>
  </ha-form-group>

  <ha-form-group label="メールアドレス" required>
    <ha-input type="email" name="email" required full-width></ha-input>
  </ha-form-group>

  <ha-form-group label="件名" required>
    <ha-input name="subject" required full-width></ha-input>
  </ha-form-group>

  <ha-form-group
    label="お問い合わせ内容"
    helper-text="詳しい内容をご記入ください（最大1000文字）"
    required
  >
    <ha-textarea
      name="message"
      rows="10"
      maxlength="1000"
      required
      full-width
    ></ha-textarea>
  </ha-form-group>

  <ha-button type="submit" variant="primary" full-width>送信</ha-button>
</form>
```

## アクセシビリティ

- `disabled` 属性が設定されている場合、`aria-disabled="true"` が自動的に設定されます
- `required` 属性が設定されている場合、`aria-required="true"` が自動的に設定されます
- `error` 属性が設定されている場合、`aria-invalid="true"` が自動的に設定されます
- ラベルとの関連付けは FormGroup を使用することで自動的に行われます

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-textarea {
  --textarea-padding: 12px 16px;
  --textarea-border-radius: 6px;
  --textarea-font-size: 14px;
  --textarea-line-height: 1.5;
  --textarea-border-color: var(--color-gray-300);
  --textarea-focus-border-color: var(--color-primary-500);
}
```
