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

### ARIAサポート

- **role**: `textbox` （自動設定）
- **aria-disabled**: `disabled` 属性が設定されている場合、自動的に `true` に設定
- **aria-required**: `required` 属性が設定されている場合、自動的に `true` に設定
- **aria-invalid**: `error` 属性が設定されている場合、自動的に `true` に設定
- **aria-readonly**: `readonly` 属性が設定されている場合、自動的に `true` に設定
- **aria-label**: ラベルがない場合は `placeholder` から自動生成（推奨: Form Groupを使用）

### キーボード操作

| キー | アクション |
|------|----------|
| `Tab` | フォーカス移動 |
| `Shift + Tab` | 逆方向にフォーカス移動 |
| `Enter` | フォーム送信（type="search"の場合は検索実行） |
| `Esc` | 入力クリア（type="search"の場合） |
| `Arrow Up/Down` | 数値の増減（type="number"の場合） |

### スクリーンリーダー

- 入力フィールドの目的とロール（"テキストボックス"）が読み上げられます
- `required` 状態の場合、"必須" として通知されます
- `error` 状態の場合、"無効な入力" として通知されます
- `readonly` 状態の場合、"読み取り専用" として通知されます
- Form Group と組み合わせることで、ラベル、ヘルパーテキスト、エラーメッセージが適切に関連付けられます

### フォームラベルとの関連付け

```html
<!-- Good ✓: Form Groupを使用 -->
<ha-form-group label="メールアドレス">
  <ha-input type="email"></ha-input>
</ha-form-group>

<!-- Good ✓: HTMLラベルを使用 -->
<label for="email-input">メールアドレス</label>
<ha-input id="email-input" type="email"></ha-input>

<!-- Avoid ✗: ラベルなし -->
<ha-input type="email" placeholder="メールアドレス"></ha-input>
```

## スタイルのカスタマイズ

### デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

```css
/* Input */
var(--component-input-background-default)
var(--component-input-background-disabled)
var(--component-input-background-readonly)
var(--component-input-text-default)
var(--component-input-text-placeholder)
var(--component-input-border-default)
var(--component-input-border-hover)
var(--component-input-border-focus)
var(--component-input-border-error)
var(--component-input-border-success)

/* 共通トークン */
var(--spacing-sm)              /* Padding（小） */
var(--spacing-md)              /* Padding（中） */
var(--spacing-lg)              /* Padding（大） */
var(--border-radius-md)        /* 角丸 */
var(--text-body-default-fontSize)  /* フォントサイズ */
var(--interaction-transition-fast-duration)  /* トランジション */
var(--state-focus-ring-color)  /* フォーカスリング */
var(--state-focus-ring-width)  /* フォーカスリング幅 */
```

### カスタムCSS変数

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

### スタイルの上書き

Shadow DOMのパーツを使用してスタイルを上書き：

```css
ha-input::part(input) {
  font-family: 'Your Custom Font', monospace;
  letter-spacing: 0.02em;
}

ha-input::part(input):focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

### パスワード強度表示

```html
<ha-form-group label="パスワード" helper-text="8文字以上、大文字・小文字・数字を含む">
  <ha-input
    type="password"
    minlength="8"
    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
    required
  ></ha-input>
</ha-form-group>
```

## ベストプラクティス

### Do's ✓

- **適切な input type を使用**: `email`, `tel`, `url` など、用途に応じた type を設定してネイティブバリデーションを活用
- **ラベルを必ず設定**: アクセシビリティのため、Form Group またはHTMLの `<label>` を使用
- **placeholder は補助的に**: メインの説明はラベルに、補足情報は helper-text に
- **バリデーションは即座に**: `error` 属性とエラーメッセージでユーザーにフィードバック
- **適切な autocomplete**: `autocomplete="email"` など、ブラウザの自動入力を活用
- **required は視覚的に明示**: Form Group の `required` 属性で視覚的に表示

### Don'ts ✗

- **placeholder のみでラベル代用**: スクリーンリーダーやフォーカス時に情報が失われる
- **過度な maxlength**: ユーザビリティを損なうような短すぎる文字数制限は避ける
- **曖昧なエラーメッセージ**: "無効な入力" ではなく "8文字以上で入力してください" など具体的に
- **disabled の濫用**: 可能な限りエラーメッセージで誘導し、disabled は最小限に
- **type="text" の多用**: 適切な input type を使用しないとモバイルでのキーボード最適化が失われる

## よくある質問

### v-model や value binding が動作しない？

Input コンポーネントは Web Components ベースのため、フレームワークごとに適切なバインディング方法があります：

```tsx
// React: onChange イベントを使用
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// Vue: v-model が自動的に動作
<HaInput v-model="email" />
```

### フォーム送信時に値が取得できない？

`name` 属性を設定することで、ネイティブフォームとして機能します：

```html
<form @submit="handleSubmit">
  <ha-input name="email" type="email"></ha-input>
  <ha-button type="submit">送信</ha-button>
</form>
```

### バリデーションメッセージをカスタマイズするには？

Form Group の `error` 属性と `error` プロパティを組み合わせます：

```html
<ha-form-group label="メール" error="有効なメールアドレスを入力してください">
  <ha-input type="email" error></ha-input>
</ha-form-group>
```

JavaScriptでの動的バリデーション：

```tsx
const [emailError, setEmailError] = useState('');

const validateEmail = (email) => {
  if (!email.includes('@')) {
    setEmailError('有効なメールアドレスを入力してください');
    return false;
  }
  setEmailError('');
  return true;
};

<FormGroup label="メール" error={emailError}>
  <Input
    type="email"
    error={!!emailError}
    onBlur={(e) => validateEmail(e.target.value)}
  />
</FormGroup>
```

### type="number" で小数点入力を許可するには？

`step` 属性を使用します：

```html
<!-- 整数のみ（デフォルト） -->
<ha-input type="number"></ha-input>

<!-- 0.01刻みの小数（価格など） -->
<ha-input type="number" step="0.01"></ha-input>

<!-- 任意の小数 -->
<ha-input type="number" step="any"></ha-input>
```

## 関連コンポーネント

- [Form Group](/components/form-group) - ラベル、ヘルパーテキスト、エラーメッセージの統合
- [Textarea](/components/textarea) - 複数行のテキスト入力
- [Select](/components/select) - ドロップダウン選択
- [Checkbox](/components/checkbox) - チェックボックス入力
- [Button](/components/button) - フォーム送信ボタン

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { InputProps } from '@hidearea-design/core';

interface InputProps {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  name?: string;
  autocomplete?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
  minlength?: number;
  maxlength?: number;
}
```

## トラブルシューティング

### 入力値が反映されない

**問題**: 入力しても値が表示されない、または更新されない

**解決策**:
1. `value` 属性を設定している場合、イベントリスナーで更新する必要があります
2. React の場合、`onChange` イベントで `setValue` を呼び出す
3. Vue の場合、`v-model` を使用するか、`@input` イベントで値を更新

```tsx
// React ✓ Good
const [value, setValue] = useState('');
<Input value={value} onChange={(e) => setValue(e.target.value)} />

// React ✗ Bad: onChange がない
<Input value={value} />
```

### フォーカススタイルが表示されない

**問題**: フォーカス時のリングやボーダーが表示されない

**解決策**:
CSS で `outline: none` を設定していないか確認。デフォルトのフォーカススタイルを維持するか、カスタムスタイルを適用：

```css
/* ✓ Good: カスタムフォーカススタイル */
ha-input::part(input):focus {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: 2px;
}

/* ✗ Bad: フォーカス表示を完全に削除 */
ha-input::part(input):focus {
  outline: none;
}
```

### モバイルで適切なキーボードが表示されない

**問題**: モバイルデバイスで数字キーボードやメールキーボードが表示されない

**解決策**:
適切な `type` 属性を設定：

```html
<!-- ✓ Good: 適切な type -->
<ha-input type="email"></ha-input>  <!-- メールキーボード -->
<ha-input type="tel"></ha-input>    <!-- 電話番号キーボード -->
<ha-input type="number"></ha-input> <!-- 数字キーボード -->
<ha-input type="url"></ha-input>    <!-- URL キーボード -->

<!-- ✗ Bad: すべて text -->
<ha-input type="text"></ha-input>
```

### autocomplete が動作しない

**問題**: ブラウザの自動入力が機能しない

**解決策**:
`autocomplete` 属性に標準値を設定し、`name` 属性も必ず設定：

```html
<!-- ✓ Good -->
<ha-input
  name="email"
  type="email"
  autocomplete="email"
></ha-input>

<!-- ✗ Bad: name がない -->
<ha-input
  type="email"
  autocomplete="email"
></ha-input>
```
