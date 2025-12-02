# FormGroup

フォームフィールドのラッパーコンポーネント。ラベル、ヘルパーテキスト、エラーメッセージを表示します。

## 基本的な使い方

```html
<ha-form-group label="メールアドレス">
  <ha-input type="email"></ha-input>
</ha-form-group>
```

## ラベル

```html
<ha-form-group label="ユーザー名">
  <ha-input></ha-input>
</ha-form-group>
```

## 必須マーク

```html
<ha-form-group label="パスワード" required>
  <ha-input type="password" required></ha-input>
</ha-form-group>
```

## ヘルパーテキスト

```html
<ha-form-group
  label="メールアドレス"
  helper-text="登録時のメールアドレスを入力してください"
>
  <ha-input type="email"></ha-input>
</ha-form-group>
```

## エラーメッセージ

```html
<ha-form-group
  label="パスワード"
  error="8文字以上で入力してください"
>
  <ha-input type="password" error></ha-input>
</ha-form-group>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `label` | `string` | `''` | ラベルテキスト |
| `helper-text` | `string` | `''` | ヘルパーテキスト |
| `error` | `string` | `''` | エラーメッセージ |
| `required` | `boolean` | `false` | 必須マークを表示 |

## React

```tsx
import { FormGroup, Input } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validate = (value: string) => {
    if (!value.includes('@')) {
      setError('有効なメールアドレスを入力してください');
    } else {
      setError('');
    }
  };

  return (
    <FormGroup
      label="メールアドレス"
      helperText="登録時のメールアドレスを入力してください"
      error={error}
      required
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => validate(e.target.value)}
        error={!!error}
      />
    </FormGroup>
  );
}
```

## Vue

```vue
<template>
  <HaFormGroup
    label="メールアドレス"
    helper-text="登録時のメールアドレスを入力してください"
    :error="error"
    required
  >
    <HaInput
      v-model="email"
      type="email"
      :error="!!error"
      @blur="validate"
    />
  </HaFormGroup>
</template>

<script setup>
import { ref } from 'vue';
import { FormGroup as HaFormGroup, Input as HaInput } from '@hidearea-design/vue';

const email = ref('');
const error = ref('');

const validate = () => {
  if (!email.value.includes('@')) {
    error.value = '有効なメールアドレスを入力してください';
  } else {
    error.value = '';
  }
};
</script>
```

## 使用例

### ログインフォーム

```html
<form>
  <ha-form-group label="メールアドレス" required>
    <ha-input type="email" name="email" required full-width></ha-input>
  </ha-form-group>

  <ha-form-group
    label="パスワード"
    helper-text="8文字以上で入力してください"
    required
  >
    <ha-input type="password" name="password" minlength="8" required full-width></ha-input>
  </ha-form-group>

  <ha-button type="submit" variant="primary" full-width>ログイン</ha-button>
</form>
```

### 複数フィールド

```html
<ha-form-group label="お名前" required>
  <div style="display: flex; gap: 8px;">
    <ha-input placeholder="姓" required></ha-input>
    <ha-input placeholder="名" required></ha-input>
  </div>
</ha-form-group>
```

### Select との組み合わせ

```html
<ha-form-group label="国" required>
  <ha-select required>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
    <option value="uk">イギリス</option>
  </ha-select>
</ha-form-group>
```

### Checkbox との組み合わせ

```html
<ha-form-group label="興味のある分野">
  <ha-checkbox name="interests" value="design">デザイン</ha-checkbox>
  <ha-checkbox name="interests" value="development">開発</ha-checkbox>
  <ha-checkbox name="interests" value="marketing">マーケティング</ha-checkbox>
</ha-form-group>
```

## アクセシビリティ

- ラベルとフォームフィールドが自動的に関連付けられます（`for` 属性と `id` 属性）
- エラーメッセージは `aria-describedby` で関連付けられます
- 必須フィールドには `aria-required="true"` が設定されます

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-form-group {
  --form-group-gap: 8px;
  --form-group-label-font-size: 14px;
  --form-group-label-font-weight: 500;
  --form-group-helper-font-size: 12px;
  --form-group-error-color: var(--color-error-500);
}
```
