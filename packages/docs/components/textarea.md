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

Textareaコンポーネントは、WCAG 2.1 AAに準拠し、フォーム入力のアクセシビリティ要件を満たしています。

### ARIAサポート

Textareaコンポーネントは自動的にARIA属性を適用します：

| ARIA属性 | 要素 | 説明 |
|---------|------|------|
| `role="textbox"` | textarea要素 | テキスト入力フィールドであることを示す |
| `aria-multiline="true"` | textarea要素 | 複数行入力をサポートすることを示す |
| `aria-label` | textarea要素 | フィールドのラベル（labelがない場合） |
| `aria-labelledby` | textarea要素 | 関連するlabel要素のIDを参照 |
| `aria-describedby` | textarea要素 | ヘルパーテキストやエラーメッセージのIDを参照 |
| `aria-required="true"` | textarea要素 | `required`属性が設定されている場合 |
| `aria-invalid="true"` | textarea要素 | `error`属性が設定されている場合 |
| `aria-disabled="true"` | textarea要素 | `disabled`属性が設定されている場合 |
| `aria-readonly="true"` | textarea要素 | `readonly`属性が設定されている場合 |

### キーボードナビゲーション

| キー | 動作 |
|-----|------|
| `Tab` | 次のフォーカス可能要素へ移動 |
| `Shift + Tab` | 前のフォーカス可能要素へ移動 |
| `Enter` | 改行を挿入 |
| `Ctrl/Cmd + A` | 全テキストを選択 |
| `Ctrl/Cmd + C` | 選択テキストをコピー |
| `Ctrl/Cmd + V` | テキストを貼り付け |
| `Ctrl/Cmd + X` | 選択テキストを切り取り |
| `Ctrl/Cmd + Z` | 元に戻す（Undo） |
| `Ctrl/Cmd + Y` | やり直す（Redo） |
| `Arrow Keys` | カーソルを移動 |
| `Home` | 行の先頭に移動 |
| `End` | 行の末尾に移動 |
| `Ctrl/Cmd + Home` | テキストの先頭に移動 |
| `Ctrl/Cmd + End` | テキストの末尾に移動 |

### スクリーンリーダーの対応

Textareaコンポーネントは主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます。

#### 読み上げ例

**通常の状態**:
```
「お問い合わせ内容、編集、テキストエリア、複数行、空白」
（"Inquiry content, edit text, text area, multi-line, blank"）
```

**必須フィールド**:
```
「お問い合わせ内容、必須、編集、テキストエリア、複数行」
（"Inquiry content, required, edit text, text area, multi-line"）
```

**エラー状態**:
```
「お問い合わせ内容、無効な入力、編集、テキストエリア、複数行、最低10文字以上入力してください」
（"Inquiry content, invalid entry, edit text, text area, multi-line, Please enter at least 10 characters"）
```

**読み取り専用**:
```
「お問い合わせ内容、読み取り専用、テキストエリア、複数行、こちらは変更できません」
（"Inquiry content, read-only, text area, multi-line, This cannot be changed"）
```

**無効状態**:
```
「お問い合わせ内容、使用不可、テキストエリア、複数行」
（"Inquiry content, unavailable, text area, multi-line"）
```

**文字数制限付き**:
```
「コメント、編集、テキストエリア、複数行、最大200文字、50文字入力済み」
（"Comment, edit text, text area, multi-line, 200 character limit, 50 characters entered"）
```

**ヘルパーテキスト付き**:
```
「お問い合わせ内容、編集、テキストエリア、複数行、詳しい内容をご記入ください」
（"Inquiry content, edit text, text area, multi-line, Please provide detailed information"）
```

#### ライブリージョン

エラーメッセージや文字数制限の通知はライブリージョンで通知されます：

```html
<!-- FormGroupが自動的に生成するライブリージョン -->
<div role="alert" aria-live="assertive" aria-atomic="true">
  最低10文字以上入力してください
</div>

<div role="status" aria-live="polite" aria-atomic="true">
  残り20文字
</div>
```

### フォーカス管理

```css
/* フォーカスインジケーター */
ha-textarea:focus-within {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: 2px;
}

/* ハイコントラストモード対応 */
@media (prefers-contrast: high) {
  ha-textarea:focus-within {
    outline-width: 3px;
  }
}

/* 強制カラーモード対応 */
@media (forced-colors: active) {
  ha-textarea:focus-within {
    outline-color: Highlight;
  }
}
```

### フォームラベルの関連付け

```html
<!-- ✓ Good: ha-form-group でラベルを提供 -->
<ha-form-group label="コメント" helper-text="詳細をご記入ください">
  <ha-textarea name="comment" rows="5"></ha-textarea>
</ha-form-group>

<!-- ✓ Good: aria-label で明示的にラベル -->
<ha-textarea aria-label="フィードバック" rows="5"></ha-textarea>

<!-- ✓ Good: aria-labelledby で外部ラベルと関連付け -->
<label id="description-label">説明</label>
<ha-textarea aria-labelledby="description-label" rows="5"></ha-textarea>

<!-- ✗ Bad: ラベルなし（プレースホルダーだけでは不十分） -->
<ha-textarea placeholder="コメントを入力" rows="5"></ha-textarea>
```

### エラー状態のアクセシビリティ

エラーメッセージは適切に関連付けられます：

```html
<ha-form-group
  label="お問い合わせ内容"
  helper-text="最低10文字以上入力してください"
  error
  required
>
  <ha-textarea
    name="inquiry"
    rows="5"
    error
    required
    aria-invalid="true"
    aria-describedby="inquiry-error"
  ></ha-textarea>
</ha-form-group>
```

**スクリーンリーダー読み上げ**:
```
「お問い合わせ内容、必須、無効な入力、編集、テキストエリア、複数行、最低10文字以上入力してください」
（"Inquiry content, required, invalid entry, edit text, text area, multi-line, Please enter at least 10 characters"）
```

## スタイルのカスタマイズ

### デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

```css
/* Textarea は Input トークンを共有 */
var(--component-input-background-default)
var(--component-input-background-disabled)
var(--component-input-background-readonly)
var(--component-input-text-default)
var(--component-input-text-placeholder)
var(--component-input-border-default)
var(--component-input-border-hover)
var(--component-input-border-focus)
var(--component-input-border-error)

/* サイズ */
var(--component-input-height-sm)
var(--component-input-height-md)
var(--component-input-height-lg)

/* スペーシング */
var(--spacing-sm)
var(--spacing-md)
var(--spacing-lg)

/* その他 */
var(--border-radius-md)
var(--state-focus-ring-color)
var(--state-focus-ring-width)
var(--state-focus-ring-offset)
var(--state-disabled-opacity)
```

### カスタムCSS変数

Shadow DOM外部からカスタマイズ可能なCSS変数：

```css
ha-textarea {
  /* パディング */
  --textarea-padding: 12px 16px;
  --textarea-padding-sm: 8px 12px;
  --textarea-padding-lg: 16px 20px;

  /* フォント */
  --textarea-font-size: 14px;
  --textarea-font-family: inherit;
  --textarea-line-height: 1.5;

  /* カラー */
  --textarea-background-color: var(--color-white);
  --textarea-text-color: var(--color-gray-900);
  --textarea-placeholder-color: var(--color-gray-400);
  --textarea-border-color: var(--color-gray-300);

  /* ボーダー */
  --textarea-border-width: 1px;
  --textarea-border-radius: 6px;

  /* フォーカス */
  --textarea-focus-border-color: var(--color-primary-500);
  --textarea-focus-ring-color: var(--color-primary-300);
  --textarea-focus-ring-width: 2px;
  --textarea-focus-ring-offset: 2px;

  /* エラー */
  --textarea-error-border-color: var(--color-error-500);

  /* リサイズハンドル */
  --textarea-resize-handle-color: var(--color-gray-400);
}
```

### Shadow DOMパーツ

`::part()` を使用してShadow DOM内部のスタイルをカスタマイズ：

```css
/* Textareaフィールド本体 */
ha-textarea::part(textarea) {
  padding: 16px;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 8px;
}

/* フォーカス状態 */
ha-textarea:focus-within::part(textarea) {
  border-color: var(--color-primary-600);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

/* エラー状態 */
ha-textarea[error]::part(textarea) {
  border-color: var(--color-error-500);
  background-color: var(--color-error-50);
}

/* 読み取り専用 */
ha-textarea[readonly]::part(textarea) {
  background-color: var(--color-gray-100);
  cursor: default;
}
```

## ベストプラクティス

### Do's ✓

- **適切な行数を設定**: 予想される入力量に応じた `rows` 属性を設定（コメント:3-5行、詳細:8-10行）
- **文字数制限を明示**: `maxlength` を設定し、文字数カウンターを表示
- **リサイズ制御を適切に**: ユーザーエクスペリエンスに応じて `resize` 属性を設定
- **FormGroupと組み合わせ**: ラベル、ヘルパーテキスト、エラーメッセージを明確に表示
- **必須項目を明示**: `required` 属性とラベルで必須であることを示す

```html
<!-- Good ✓: 適切な設定 -->
<ha-form-group
  label="お問い合わせ内容"
  helper-text="詳しい内容をご記入ください（最大500文字）"
  required
>
  <ha-textarea
    name="inquiry"
    rows="8"
    maxlength="500"
    resize="vertical"
    required
    full-width
    placeholder="お困りの点をお聞かせください"
  ></ha-textarea>
</ha-form-group>
```

### Don'ts ✗

- **過度に小さい/大きい行数**: 1行は避ける（input使用）、20行以上も避ける（スクロールが多い）
- **リサイズ制限なし**: モバイルでは `resize="none"` または `resize="vertical"` を推奨
- **ラベルなし**: 必ずラベルまたは `aria-label` を提供
- **全幅を固定**: レスポンシブデザインでは `full-width` を活用

```html
<!-- Bad ✗: 1行のTextarea -->
<ha-textarea rows="1"></ha-textarea>
<!-- 代わりに ha-input を使用 -->

<!-- Bad ✗: リサイズ制限なしでレイアウト崩壊の可能性 -->
<ha-textarea resize="both"></ha-textarea>
<!-- モバイルでは resize="vertical" または "none" -->

<!-- Bad ✗: ラベルなし -->
<ha-textarea placeholder="コメント"></ha-textarea>
<!-- プレースホルダーだけでは不十分 -->
```

## よくある質問

### Textareaの高さを自動調整するには？

JavaScriptを使用してコンテンツに応じた高さの自動調整が可能です。

```tsx
import { Textarea } from '@hidearea-design/react';
import { useRef, useEffect } from 'react';

function AutoExpandTextarea({ value, onChange }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 高さをリセットしてからスクロール高さを設定
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      resize="none"
      rows={3}
      fullWidth
    />
  );
}
```

**Vue版:**
```vue
<template>
  <HaTextarea
    ref="textareaRef"
    v-model="message"
    :resize="'none'"
    :rows="3"
    full-width
    @input="autoExpand"
  />
</template>

<script setup>
import { ref } from 'vue';
import { Textarea as HaTextarea } from '@hidearea-design/vue';

const message = ref('');
const textareaRef = ref(null);

const autoExpand = () => {
  const textarea = textareaRef.value?.$el.querySelector('textarea');
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
};
</script>
```

### 文字数カウンターを実装するには？

React Hook FormやVueのリアクティブシステムを活用します。

```tsx
import { Textarea, FormGroup } from '@hidearea-design/react';
import { useState } from 'react';

function CharacterCounter() {
  const [text, setText] = useState('');
  const maxLength = 200;
  const remaining = maxLength - text.length;
  const isNearLimit = remaining < 20;

  return (
    <FormGroup
      label="コメント"
      helperText={
        <span style={{ color: isNearLimit ? 'var(--color-warning-600)' : undefined }}>
          {text.length} / {maxLength} 文字
          {isNearLimit && ` (残り${remaining}文字)`}
        </span>
      }
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        rows={5}
        fullWidth
      />
    </FormGroup>
  );
}
```

### フォーム送信前にバリデーションするには？

HTML5のネイティブバリデーションとカスタムバリデーションを組み合わせます。

```tsx
import { Textarea, FormGroup, Button } from '@hidearea-design/react';
import { useState } from 'react';

function ValidatedForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const minLength = 10;
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // カスタムバリデーション
    if (message.length < minLength) {
      setError(`最低${minLength}文字以上入力してください`);
      return;
    }

    if (message.length > maxLength) {
      setError(`最大${maxLength}文字までです`);
      return;
    }

    setError('');
    // 送信処理
    console.log('送信:', message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="お問い合わせ内容"
        helperText={error || `${message.length} / ${maxLength} 文字`}
        error={!!error}
        required
      >
        <Textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setError('');
          }}
          minLength={minLength}
          maxLength={maxLength}
          error={!!error}
          rows={8}
          required
          fullWidth
        />
      </FormGroup>
      <Button type="submit" variant="primary">送信</Button>
    </form>
  );
}
```

### プレースホルダーに複数行のテキストを表示できますか？

HTMLのTextareaのプレースホルダーは単一行のみですが、CSSの`::before`疑似要素を使った回避策があります。ただし、アクセシビリティの観点から推奨されません。代わりに、ヘルパーテキストを活用してください。

```html
<!-- Good ✓: ヘルパーテキストで詳細を提供 -->
<ha-form-group
  label="テンプレート"
  helper-text="以下の形式で入力してください:
    件名: [件名]
    内容: [詳細な内容]
    期限: [日付]"
>
  <ha-textarea rows="10" full-width></ha-textarea>
</ha-form-group>

<!-- Bad ✗: 長いプレースホルダー -->
<ha-textarea
  placeholder="件名: [件名]
内容: [詳細な内容]
期限: [日付]"
  rows="10"
></ha-textarea>
```

## 関連コンポーネント

- [Input](/components/input) - 単一行テキスト入力
- [Form Group](/components/form-group) - フォーム要素のグループ化とラベル管理
- [Button](/components/button) - フォーム送信用ボタン
- [Select](/components/select) - ドロップダウン選択

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { TextareaProps } from '@hidearea-design/core';

interface TextareaProps {
  /**
   * 入力値
   */
  value?: string;

  /**
   * プレースホルダーテキスト
   */
  placeholder?: string;

  /**
   * 表示行数
   * @default 3
   */
  rows?: number;

  /**
   * リサイズ制御
   * @default 'vertical'
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';

  /**
   * サイズバリアント
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 無効状態
   * @default false
   */
  disabled?: boolean;

  /**
   * 読み取り専用
   * @default false
   */
  readonly?: boolean;

  /**
   * 必須フィールド
   * @default false
   */
  required?: boolean;

  /**
   * エラー状態
   * @default false
   */
  error?: boolean;

  /**
   * フルワイド表示
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 最大文字数
   */
  maxlength?: number;

  /**
   * 最小文字数
   */
  minlength?: number;

  /**
   * フォームフィールド名
   */
  name?: string;

  /**
   * オートコンプリート設定
   */
  autocomplete?: string;

  /**
   * 入力イベントハンドラ（リアルタイム）
   */
  onInput?: (event: CustomEvent<string>) => void;

  /**
   * 変更イベントハンドラ（入力確定時）
   */
  onChange?: (event: CustomEvent<string>) => void;

  /**
   * フォーカスイベントハンドラ
   */
  onFocus?: (event: FocusEvent) => void;

  /**
   * ブラーイベントハンドラ
   */
  onBlur?: (event: FocusEvent) => void;
}
```

## トラブルシューティング

### Textareaがリサイズできない

**問題**: `resize` 属性を設定してもリサイズハンドルが表示されない

**原因**: CSSで `overflow: hidden` が設定されている、またはブラウザのデフォルトスタイルが上書きされている

**解決策**:
```css
/* リサイズを有効化 */
ha-textarea::part(textarea) {
  overflow: auto; /* hidden から auto へ */
  resize: vertical;
}

/* または、コンポーネントのプロパティで制御 */
<ha-textarea resize="vertical"></ha-textarea>
```

### 自動拡張が動作しない

**問題**: スクロール高さに応じた自動拡張が正しく機能しない

**原因**: `box-sizing`, `padding`, `border` の計算が含まれていない

**解決策**:
```tsx
const autoExpand = () => {
  const textarea = textareaRef.current;
  if (textarea) {
    // 高さをリセット（重要！）
    textarea.style.height = 'auto';

    // box-sizingを考慮した高さを設定
    const computed = window.getComputedStyle(textarea);
    const borderHeight =
      parseInt(computed.borderTopWidth) +
      parseInt(computed.borderBottomWidth);

    textarea.style.height = `${textarea.scrollHeight + borderHeight}px`;
  }
};
```

### フォーム送信時に改行が保持されない

**問題**: フォーム送信後、サーバー側で改行が失われる

**原因**: HTTPフォーム送信時の改行コード変換、またはサーバー側の処理

**解決策**:
```tsx
// クライアント側: FormDataで送信
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('message', message); // 改行は保持される

  await fetch('/api/submit', {
    method: 'POST',
    body: formData,
  });
};

// または、JSONで送信
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }), // 改行は \n として保持
  });
};
```

**サーバー側（例: Node.js）:**
```javascript
// データベース保存時に改行を保持
app.post('/api/submit', (req, res) => {
  const message = req.body.message;

  // 表示時にHTMLエスケープと改行変換
  const displayMessage = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  res.send({ message: displayMessage });
});
```

### モバイルでリサイズハンドルが邪魔

**問題**: モバイルデバイスでリサイズハンドルが誤タップされる

**原因**: タッチデバイスでリサイズ操作が意図しない動作を引き起こす

**解決策**:
```css
/* メディアクエリでモバイルのリサイズを無効化 */
@media (max-width: 768px) {
  ha-textarea {
    --textarea-resize: none;
  }
}

/* または、コンポーネントレベルで制御 */
@media (hover: none) and (pointer: coarse) {
  ha-textarea::part(textarea) {
    resize: none;
  }
}
```

```tsx
// React: 画面サイズに応じた制御
function ResponsiveTextarea() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Textarea
      resize={isMobile ? 'none' : 'vertical'}
      rows={isMobile ? 5 : 8}
      fullWidth
    />
  );
}
```
