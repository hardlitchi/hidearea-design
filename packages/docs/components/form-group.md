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

FormGroupコンポーネントは、WCAG 2.1 AAに準拠し、フォームのアクセシビリティ要件を満たしています。

### ARIAサポート

FormGroupコンポーネントは自動的にARIA属性を適用します：

| ARIA属性 | 要素 | 説明 |
|---------|------|------|
| `for` | label要素 | フォームフィールドのIDを参照（自動生成） |
| `id` | フォームフィールド | ラベルとの関連付け用ID（自動生成） |
| `aria-describedby` | フォームフィールド | ヘルパーテキストやエラーメッセージのIDを参照 |
| `aria-required="true"` | フォームフィールド | `required`属性が設定されている場合 |
| `aria-invalid="true"` | フォームフィールド | エラーがある場合 |
| `role="alert"` | エラーメッセージ | エラーメッセージコンテナ |
| `aria-live="polite"` | ヘルパーテキスト | ヘルパーテキストコンテナ |

### スクリーンリーダーの対応

FormGroupコンポーネントは主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます。

#### 読み上げ例

**通常の状態**:
```
「メールアドレス、編集、テキストフィールド、登録時のメールアドレスを入力してください」
（"Email address, edit text, text field, Enter the email address you registered with"）
```

**必須フィールド**:
```
「メールアドレス、必須、編集、テキストフィールド」
（"Email address, required, edit text, text field"）
```

**エラー状態**:
```
「メールアドレス、必須、無効な入力、編集、テキストフィールド、有効なメールアドレスを入力してください」
（"Email address, required, invalid entry, edit text, text field, Please enter a valid email address"）
```

**チェックボックスグループ**:
```
「興味のある分野、グループ」
「デザイン、チェックボックス、オフ」
「開発、チェックボックス、オフ」
（"Areas of interest, group"）
（"Design, checkbox, not checked"）
（"Development, checkbox, not checked"）
```

### ライブリージョン

エラーメッセージはライブリージョンで自動的に通知されます：

```html
<!-- FormGroupが自動的に生成 -->
<div role="alert" aria-live="assertive" aria-atomic="true" class="error-message">
  有効なメールアドレスを入力してください
</div>

<div role="status" aria-live="polite" aria-atomic="true" class="helper-text">
  登録時のメールアドレスを入力してください
</div>
```

### フォーカス管理

```html
<!-- ラベルとフィールドの自動関連付け -->
<ha-form-group label="メールアドレス">
  <!-- 自動的にIDが生成され、labelのfor属性と関連付けられる -->
  <ha-input type="email" id="auto-generated-id"></ha-input>
</ha-form-group>
```

### ベストプラクティス

```html
<!-- ✓ Good: 完全な情報 -->
<ha-form-group
  label="パスワード"
  helper-text="8文字以上の英数字を含む"
  error={error}
  required
>
  <ha-input
    type="password"
    minlength="8"
    required
    error={!!error}
    aria-invalid={!!error}
  />
</ha-form-group>

<!-- ✗ Bad: ラベルなし -->
<ha-input type="email" placeholder="メールアドレス" />
<!-- プレースホルダーだけでは不十分 -->

<!-- ✗ Bad: エラーメッセージが関連付けられていない -->
<div>
  <label>メールアドレス</label>
  <ha-input type="email" error />
  <span style="color: red;">エラーです</span>
</div>
<!-- ha-form-group を使用してください -->
```

## スタイルのカスタマイズ

### デザイントークン

FormGroupコンポーネントで使用されるセマンティックトークン：

```css
ha-form-group {
  /* スペーシング */
  --form-group-gap: var(--spacing-2);
  --form-group-label-margin: var(--spacing-1);
  --form-group-helper-margin: var(--spacing-1);

  /* タイポグラフィ */
  --form-group-label-font-size: var(--font-size-sm);
  --form-group-label-font-weight: var(--font-weight-medium);
  --form-group-label-color: var(--color-text-primary);
  --form-group-helper-font-size: var(--font-size-xs);
  --form-group-helper-color: var(--color-text-secondary);
  --form-group-error-font-size: var(--font-size-xs);
  --form-group-error-color: var(--color-danger-500);

  /* 必須マーク */
  --form-group-required-color: var(--color-danger-500);
}
```

### CSS変数の基本的なカスタマイズ

```css
ha-form-group {
  /* スペーシング */
  --form-group-gap: 8px;

  /* ラベル */
  --form-group-label-font-size: 14px;
  --form-group-label-font-weight: 500;
  --form-group-label-color: var(--color-gray-900);

  /* ヘルパーテキスト */
  --form-group-helper-font-size: 12px;
  --form-group-helper-color: var(--color-gray-600);

  /* エラーメッセージ */
  --form-group-error-color: var(--color-error-500);
  --form-group-error-font-size: 12px;
}
```

### Shadow DOMパーツ

`::part()` セレクタを使用してコンポーネント内部のスタイルをカスタマイズできます：

| パーツ名 | 対象要素 | 説明 |
|---------|---------|------|
| `label` | ラベル要素 | フォームフィールドのラベル |
| `helper` | ヘルパーテキスト | 補足説明テキスト |
| `error` | エラーメッセージ | エラー表示テキスト |
| `required` | 必須マーク | 「*」マーク |

**使用例**:

```css
/* ラベルのカスタマイズ */
ha-form-group::part(label) {
  font-weight: 600;
  text-transform: uppercase;
}

/* ヘルパーテキストのカスタマイズ */
ha-form-group::part(helper) {
  font-style: italic;
}

/* エラーメッセージのカスタマイズ */
ha-form-group::part(error) {
  font-weight: 500;
  background-color: var(--color-error-50);
  padding: 4px 8px;
  border-radius: 4px;
}

/* 必須マークのカスタマイズ */
ha-form-group::part(required) {
  color: var(--color-error-600);
  font-size: 16px;
}
```

### ダークモード対応

```css
@media (prefers-color-scheme: dark) {
  ha-form-group {
    --form-group-label-color: var(--color-gray-100);
    --form-group-helper-color: var(--color-gray-400);
    --form-group-error-color: var(--color-error-400);
  }
}
```

## ベストプラクティス

### ✓ 推奨される使い方

**1. 明確なラベルを提供**
```html
<!-- ✓ Good: 明確なラベル -->
<ha-form-group label="メールアドレス" required>
  <ha-input type="email" required full-width></ha-input>
</ha-form-group>
```
理由: ユーザーがフィールドの目的を理解しやすくなります。

**2. ヘルパーテキストで追加情報を提供**
```html
<!-- ✓ Good: ヘルパーテキストで説明 -->
<ha-form-group
  label="パスワード"
  helper-text="8文字以上の英数字を含む必要があります"
  required
>
  <ha-input type="password" minlength="8" required full-width></ha-input>
</ha-form-group>
```
理由: ユーザーが正しい入力形式を理解できます。

**3. エラーメッセージは具体的に**
```html
<!-- ✓ Good: 具体的なエラーメッセージ -->
<ha-form-group
  label="メールアドレス"
  error="有効なメールアドレスを入力してください（例: user@example.com）"
>
  <ha-input type="email" error full-width></ha-input>
</ha-form-group>
```
理由: ユーザーが問題を理解し、修正しやすくなります。

**4. 関連するフィールドをグループ化**
```html
<!-- ✓ Good: 関連フィールドのグループ化 -->
<ha-form-group label="お名前" required>
  <ha-stack direction="horizontal" gap="2">
    <ha-input placeholder="姓" required></ha-input>
    <ha-input placeholder="名" required></ha-input>
  </ha-stack>
</ha-form-group>
```
理由: フォームの構造が明確になります。

### ✗ 避けるべき使い方

**1. ラベルなしのフィールド**
```html
<!-- ✗ Bad: ラベルなし -->
<ha-input placeholder="メールアドレス" />
```
代替案: 必ず `ha-form-group` でラベルを提供してください。

**2. プレースホルダーのみでの説明**
```html
<!-- ✗ Bad: プレースホルダーだけ -->
<ha-form-group label="パスワード">
  <ha-input type="password" placeholder="8文字以上" />
</ha-form-group>
```
代替案: ヘルパーテキストで詳細な説明を提供してください。

**3. 曖昧なエラーメッセージ**
```html
<!-- ✗ Bad: 曖昧なエラー -->
<ha-form-group label="メールアドレス" error="エラー">
  <ha-input type="email" error />
</ha-form-group>
```
代替案: 具体的な問題と解決方法を示してください。

## FAQ（よくある質問）

### Q1: 複数のフィールドを1つのFormGroupに含めることはできますか？

**A**: はい、可能です。関連するフィールドをグループ化できます。

```html
<ha-form-group label="お名前" required>
  <ha-stack direction="horizontal" gap="2">
    <ha-input name="firstName" placeholder="姓" required full-width></ha-input>
    <ha-input name="lastName" placeholder="名" required full-width></ha-input>
  </ha-stack>
</ha-form-group>

<ha-form-group label="住所" required>
  <ha-stack direction="vertical" gap="2">
    <ha-input name="zipCode" placeholder="郵便番号" required full-width></ha-input>
    <ha-input name="address1" placeholder="住所1" required full-width></ha-input>
    <ha-input name="address2" placeholder="住所2" full-width></ha-input>
  </ha-stack>
</ha-form-group>
```

### Q2: エラーメッセージを動的に表示するには？

**A**: ReactやVueの状態管理を使用します。

**React**:
```tsx
import { FormGroup, Input, Button } from '@hidearea-design/react';
import { useState } from 'react';

function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) {
      setError('メールアドレスを入力してください');
    } else if (!value.includes('@')) {
      setError('有効なメールアドレスを入力してください');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateEmail(email);
    if (!error && email) {
      console.log('送信:', email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          onBlur={(e) => validateEmail(e.target.value)}
          error={!!error}
          fullWidth
        />
      </FormGroup>
      <Button type="submit" variant="primary">送信</Button>
    </form>
  );
}
```

**Vue**:
```vue
<template>
  <form @submit.prevent="handleSubmit">
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
        @blur="validateEmail"
        full-width
      />
    </HaFormGroup>
    <HaButton type="submit" variant="primary">送信</HaButton>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { FormGroup as HaFormGroup, Input as HaInput, Button as HaButton } from '@hidearea-design/vue';

const email = ref('');
const error = ref('');

const validateEmail = () => {
  if (!email.value) {
    error.value = 'メールアドレスを入力してください';
  } else if (!email.value.includes('@')) {
    error.value = '有効なメールアドレスを入力してください';
  } else {
    error.value = '';
  }
};

const handleSubmit = () => {
  validateEmail();
  if (!error.value && email.value) {
    console.log('送信:', email.value);
  }
};
</script>
```

### Q3: カスタムバリデーションライブラリとの統合方法は？

**A**: React Hook FormやVeeValidateなどのライブラリと簡単に統合できます。

**React Hook Form**:
```tsx
import { useForm } from 'react-hook-form';
import { FormGroup, Input, Button } from '@hidearea-design/react';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        label="メールアドレス"
        error={errors.email?.message}
        required
      >
        <Input
          type="email"
          {...register('email', {
            required: 'メールアドレスを入力してください',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '有効なメールアドレスを入力してください',
            },
          })}
          error={!!errors.email}
          fullWidth
        />
      </FormGroup>
      <Button type="submit" variant="primary">送信</Button>
    </form>
  );
}
```

### Q4: FormGroupなしでフォームフィールドを使用できますか？

**A**: 可能ですが、アクセシビリティの観点から推奨されません。

```html
<!-- ✗ 推奨されない: FormGroupなし -->
<ha-input type="email" />

<!-- ✓ 推奨: FormGroupを使用 -->
<ha-form-group label="メールアドレス">
  <ha-input type="email" />
</ha-form-group>

<!-- または、少なくともaria-labelを提供 -->
<ha-input type="email" aria-label="メールアドレス" />
```

## 関連コンポーネント

- [Input](/components/input) - 単一行テキスト入力
- [Textarea](/components/textarea) - 複数行テキスト入力
- [Select](/components/select) - ドロップダウン選択
- [Checkbox](/components/checkbox) - チェックボックス
- [Radio](/components/radio) - ラジオボタン
- [Switch](/components/switch) - トグルスイッチ
- [Button](/components/button) - フォーム送信ボタン

## APIリファレンス

```typescript
interface FormGroupProps {
  /**
   * ラベルテキスト
   */
  label?: string;

  /**
   * ヘルパーテキスト（補足説明）
   */
  helperText?: string;

  /**
   * エラーメッセージ
   */
  error?: string;

  /**
   * 必須フィールドマークを表示
   * @default false
   */
  required?: boolean;

  /**
   * フォームフィールドID（自動生成も可能）
   */
  for?: string;
}
```

## トラブルシューティング

### 問題1: ラベルがフォームフィールドと関連付けられない

**問題**: ラベルをクリックしてもフォームフィールドにフォーカスされない

**原因**: フォームフィールドに `id` 属性がない、または `for` 属性が一致していない

**解決策**:
```html
<!-- FormGroupが自動的にIDを生成して関連付ける -->
<ha-form-group label="メールアドレス">
  <ha-input type="email"></ha-input>
</ha-form-group>

<!-- または、手動でIDを指定 -->
<ha-form-group label="メールアドレス" for="email-input">
  <ha-input id="email-input" type="email"></ha-input>
</ha-form-group>
```

### 問題2: エラーメッセージがスクリーンリーダーで読み上げられない

**問題**: エラーが発生してもスクリーンリーダーが通知しない

**原因**: `aria-describedby` が正しく設定されていない、またはライブリージョンがない

**解決策**:
```html
<!-- FormGroupが自動的にaria-describedbyを設定 -->
<ha-form-group
  label="メールアドレス"
  error="有効なメールアドレスを入力してください"
>
  <ha-input type="email" error></ha-input>
</ha-form-group>
```

### 問題3: 複数フィールドで必須マークが表示されない

**問題**: 複数のフィールドを含む FormGroup で必須マークが表示されない

**解決策**:
```html
<!-- 各フィールドに個別にrequiredを設定 -->
<ha-form-group label="お名前" required>
  <ha-stack direction="horizontal" gap="2">
    <ha-input placeholder="姓" required></ha-input>
    <ha-input placeholder="名" required></ha-input>
  </ha-stack>
</ha-form-group>
```
