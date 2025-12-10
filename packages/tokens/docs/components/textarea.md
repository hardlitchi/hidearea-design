# Textarea (テキストエリア) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/components/forms/textarea.yaml`
**ステータス:** ✅ 実装済み (Phase 4)

---

## 概要

テキストエリアコンポーネントは、ユーザーが複数行のテキストを入力できるフォーム要素です。長文やコメント、説明文など、改行を含む入力に適しています。

### 用途

- コメントやレビューの入力
- メッセージの作成
- 説明文や備考の記入
- フィードバックの収集
- 長文の入力フォーム

---

## サイズバリアント

### 1. Small (小)

コンパクトなフォームで使用する小さいテキストエリアです。

**最小高さ:** 48px (3rem) - 約2行
**使用場面:**
- 短いコメント入力
- コンパクトなフォーム
- クイック入力フィールド

**トークン:** `component.textarea.minHeight.small`

### 2. Default (デフォルト)

標準サイズのテキストエリアです。最も一般的に使用されます。

**最小高さ:** 80px (5rem) - 約3行
**使用場面:**
- 通常のコメント入力
- メッセージフォーム
- フィードバック入力

**トークン:** `component.textarea.minHeight.default`

### 3. Large (大)

長文入力に適した大きなテキストエリアです。

**最小高さ:** 128px (8rem) - 約5行
**使用場面:**
- 詳細な説明入力
- 長文のメッセージ
- レポート作成

**トークン:** `component.textarea.minHeight.large`

---

## 状態

### Default (デフォルト)
通常の入力可能な状態です。

### Hover (ホバー)
マウスカーソルがテキストエリア上にある状態です。

### Focus (フォーカス)
キーボードフォーカスがある状態で、フォーカスリングが表示されます。

### Disabled (無効)
操作できない状態で、視覚的に無効であることを示します。

### Readonly (読み取り専用)
テキストは表示されますが編集できない状態です。

### Error (エラー)
バリデーションエラーがある状態です。

### Success (成功)
バリデーションが成功した状態です。

---

## トークン一覧

### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.background.default` | `{background.primary}` | デフォルト背景色 |
| `component.textarea.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.textarea.background.disabled` | `{background.tertiary}` | 無効時の背景色 |
| `component.textarea.background.readonly` | `{background.secondary}` | 読み取り専用の背景色 |

### Text (テキスト色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.text.default` | `{foreground.primary}` | デフォルトのテキスト色 |
| `component.textarea.text.placeholder` | `{foreground.tertiary}` | プレースホルダーの色 |
| `component.textarea.text.disabled` | `{foreground.tertiary}` | 無効時のテキスト色 |

### Border (ボーダー色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.border.default` | `{border.default}` | デフォルトのボーダー色 |
| `component.textarea.border.hover` | `{border.strong}` | ホバー時のボーダー色 |
| `component.textarea.border.focus` | `{primary.default}` | フォーカス時のボーダー色 |
| `component.textarea.border.error` | `{error.default}` | エラー時のボーダー色 |
| `component.textarea.border.success` | `{success.default}` | 成功時のボーダー色 |
| `component.textarea.border.disabled` | `{border.subtle}` | 無効時のボーダー色 |

### Border Width & Radius (ボーダー幅・角丸)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.borderWidth.default` | `{border.width.1}` | デフォルトのボーダー幅 |
| `component.textarea.borderRadius.default` | `{border.radius.md}` | テキストエリアの角丸 |

### Focus Ring (フォーカスリング)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.focusRing.width` | `3px` | フォーカスリングの幅 |
| `component.textarea.focusRing.offset` | `2px` | フォーカスリングのオフセット |
| `component.textarea.focusRing.color.default` | `{primary.subtle}` | フォーカスリングのデフォルト色 |
| `component.textarea.focusRing.color.error` | `{error.subtle}` | エラー時のフォーカスリング色 |

### Padding (パディング)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.padding.vertical` | `{spacing.3}` | 縦方向のパディング |
| `component.textarea.padding.horizontal` | `{spacing.3}` | 横方向のパディング |

### Font (フォント)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.font.size` | `{font.size.base}` | フォントサイズ |
| `component.textarea.font.family` | `{font.family.sans}` | フォントファミリー |
| `component.textarea.font.lineHeight` | `{font.lineHeight.normal}` | 行の高さ |

### Size (サイズ)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.minHeight.default` | `5rem` | デフォルトの最小高さ (80px、約3行) |
| `component.textarea.minHeight.small` | `3rem` | 小サイズの最小高さ (48px、約2行) |
| `component.textarea.minHeight.large` | `8rem` | 大サイズの最小高さ (128px、約5行) |

### Resize Handle (リサイズハンドル)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.resize.indicator.color` | `{foreground.tertiary}` | リサイズハンドルの色 |
| `component.textarea.resize.indicator.size` | `0.75rem` | リサイズハンドルのサイズ (12px) |

### Counter (文字数カウンター)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.counter.fontSize` | `{font.size.xs}` | 文字数カウンターのフォントサイズ |
| `component.textarea.counter.color.default` | `{foreground.secondary}` | カウンターのデフォルト色 |
| `component.textarea.counter.color.warning` | `{warning.default}` | 制限に近づいた時の色 |
| `component.textarea.counter.color.error` | `{error.default}` | 制限を超えた時の色 |
| `component.textarea.counter.spacing` | `{spacing.1}` | カウンターとテキストエリアの間隔 |

### Label (ラベル)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.label.fontSize` | `{font.size.sm}` | ラベルのフォントサイズ |
| `component.textarea.label.fontWeight` | `{font.weight.medium}` | ラベルのフォントウェイト |
| `component.textarea.label.color.default` | `{foreground.primary}` | ラベルのデフォルト色 |
| `component.textarea.label.color.disabled` | `{foreground.tertiary}` | 無効時のラベル色 |
| `component.textarea.label.spacing` | `{spacing.2}` | ラベルとテキストエリアの間隔 |

### Helper Text (ヘルパーテキスト)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.helper.fontSize` | `{font.size.sm}` | ヘルパーテキストのフォントサイズ |
| `component.textarea.helper.color.default` | `{foreground.secondary}` | ヘルパーテキストのデフォルト色 |
| `component.textarea.helper.color.error` | `{error.default}` | エラー時のヘルパーテキスト色 |
| `component.textarea.helper.color.success` | `{success.default}` | 成功時のヘルパーテキスト色 |
| `component.textarea.helper.spacing` | `{spacing.2}` | テキストエリアとヘルパーテキストの間隔 |

### Transition (トランジション)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.textarea.transition.duration` | `{animation.duration.fast}` | トランジションの時間 |
| `component.textarea.transition.timing` | `{animation.easing.ease}` | トランジションのイージング |
| `component.textarea.transition.properties` | `background-color, border-color, box-shadow` | トランジション対象のプロパティ |

---

## 使用例

### HTML

```html
<!-- 基本的なテキストエリア -->
<div class="textarea-group">
  <label class="textarea-label" for="message">メッセージ</label>
  <textarea
    class="textarea"
    id="message"
    placeholder="メッセージを入力してください..."
    rows="4"
  ></textarea>
  <span class="textarea-helper">最大500文字まで入力できます</span>
</div>

<!-- 小サイズ -->
<div class="textarea-group">
  <label class="textarea-label" for="quick-note">クイックメモ</label>
  <textarea
    class="textarea textarea-small"
    id="quick-note"
    placeholder="短いメモを入力..."
  ></textarea>
</div>

<!-- 大サイズ -->
<div class="textarea-group">
  <label class="textarea-label" for="description">詳細説明</label>
  <textarea
    class="textarea textarea-large"
    id="description"
    placeholder="詳細を入力してください..."
  ></textarea>
</div>

<!-- 文字数カウンター付き -->
<div class="textarea-group">
  <label class="textarea-label" for="comment">コメント</label>
  <textarea
    class="textarea"
    id="comment"
    maxlength="500"
    placeholder="コメントを入力..."
  ></textarea>
  <div class="textarea-footer">
    <span class="textarea-helper">感想をお聞かせください</span>
    <span class="textarea-counter">0 / 500</span>
  </div>
</div>

<!-- エラー状態 -->
<div class="textarea-group">
  <label class="textarea-label" for="feedback">フィードバック</label>
  <textarea
    class="textarea textarea-error"
    id="feedback"
    placeholder="フィードバックを入力..."
  ></textarea>
  <span class="textarea-helper textarea-helper-error">
    フィードバックは必須です
  </span>
</div>

<!-- 無効状態 -->
<div class="textarea-group">
  <label class="textarea-label" for="disabled-text">無効なフィールド</label>
  <textarea
    class="textarea"
    id="disabled-text"
    disabled
  >編集できません</textarea>
  <span class="textarea-helper">現在編集できません</span>
</div>
```

### CSS

```css
/* テキストエリアグループ */
.textarea-group {
  display: flex;
  flex-direction: column;
  gap: var(--component-textarea-label-spacing);
}

/* ラベル */
.textarea-label {
  font-size: var(--component-textarea-label-font-size);
  font-weight: var(--component-textarea-label-font-weight);
  color: var(--component-textarea-label-color-default);
}

.textarea-group:has(.textarea:disabled) .textarea-label {
  color: var(--component-textarea-label-color-disabled);
}

/* テキストエリア本体 */
.textarea {
  width: 100%;
  padding: var(--component-textarea-padding-vertical)
           var(--component-textarea-padding-horizontal);
  font-size: var(--component-textarea-font-size);
  font-family: var(--component-textarea-font-family);
  line-height: var(--component-textarea-font-line-height);
  color: var(--component-textarea-text-default);
  background-color: var(--component-textarea-background-default);
  border: var(--component-textarea-border-width-default) solid
          var(--component-textarea-border-default);
  border-radius: var(--component-textarea-border-radius-default);
  resize: vertical;
  min-height: var(--component-textarea-min-height-default);
  transition: var(--component-textarea-transition-properties)
              var(--component-textarea-transition-duration)
              var(--component-textarea-transition-timing);
}

.textarea::placeholder {
  color: var(--component-textarea-text-placeholder);
}

.textarea:hover:not(:disabled):not(:focus) {
  background-color: var(--component-textarea-background-hover);
  border-color: var(--component-textarea-border-hover);
}

.textarea:focus {
  outline: none;
  border-color: var(--component-textarea-border-focus);
  box-shadow: 0 0 0 var(--component-textarea-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-textarea-focus-ring-width) +
                var(--component-textarea-focus-ring-offset))
                var(--component-textarea-focus-ring-color-default);
}

/* 無効状態 */
.textarea:disabled {
  background-color: var(--component-textarea-background-disabled);
  border-color: var(--component-textarea-border-disabled);
  color: var(--component-textarea-text-disabled);
  cursor: not-allowed;
  resize: none;
}

/* 読み取り専用 */
.textarea:read-only {
  background-color: var(--component-textarea-background-readonly);
  cursor: default;
}

/* エラー状態 */
.textarea-error {
  border-color: var(--component-textarea-border-error);
}

.textarea-error:focus {
  box-shadow: 0 0 0 var(--component-textarea-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-textarea-focus-ring-width) +
                var(--component-textarea-focus-ring-offset))
                var(--component-textarea-focus-ring-color-error);
}

/* 成功状態 */
.textarea-success {
  border-color: var(--component-textarea-border-success);
}

/* サイズバリアント */
.textarea-small {
  min-height: var(--component-textarea-min-height-small);
}

.textarea-large {
  min-height: var(--component-textarea-min-height-large);
}

/* ヘルパーテキスト */
.textarea-helper {
  font-size: var(--component-textarea-helper-font-size);
  color: var(--component-textarea-helper-color-default);
}

.textarea-helper-error {
  color: var(--component-textarea-helper-color-error);
}

.textarea-helper-success {
  color: var(--component-textarea-helper-color-success);
}

/* 文字数カウンター */
.textarea-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.textarea-counter {
  font-size: var(--component-textarea-counter-font-size);
  color: var(--component-textarea-counter-color-default);
}

.textarea-counter.warning {
  color: var(--component-textarea-counter-color-warning);
}

.textarea-counter.error {
  color: var(--component-textarea-counter-color-error);
}
```

### React

```tsx
import React, { useState, useCallback } from 'react';

type TextareaSize = 'small' | 'default' | 'large';
type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  helper?: string;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  size?: TextareaSize;
  resize?: TextareaResize;
  placeholder?: string;
  name?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  showCounter?: boolean;
}

export function Textarea({
  value,
  onChange,
  label,
  helper,
  error = false,
  success = false,
  disabled = false,
  readonly = false,
  size = 'default',
  resize = 'vertical',
  placeholder,
  name,
  required = false,
  maxLength,
  rows,
  showCounter = false,
}: TextareaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const sizeClass = size !== 'default' ? `textarea-${size}` : '';
  const errorClass = error ? 'textarea-error' : '';
  const successClass = success ? 'textarea-success' : '';

  const helperClass = error
    ? 'textarea-helper-error'
    : success
    ? 'textarea-helper-success'
    : '';

  const getCounterClass = useCallback(() => {
    if (!maxLength) return '';
    const percentage = (value.length / maxLength) * 100;
    if (percentage >= 100) return 'error';
    if (percentage >= 90) return 'warning';
    return '';
  }, [value.length, maxLength]);

  return (
    <div className="textarea-group">
      <label className="textarea-label" htmlFor={name}>
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        className={`textarea ${sizeClass} ${errorClass} ${successClass}`.trim()}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readonly}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        aria-invalid={error}
        aria-describedby={helper ? `${name}-helper` : undefined}
        style={{ resize }}
      />
      {(helper || showCounter) && (
        <div className="textarea-footer">
          {helper && (
            <span id={`${name}-helper`} className={`textarea-helper ${helperClass}`}>
              {helper}
            </span>
          )}
          {showCounter && maxLength && (
            <span className={`textarea-counter ${getCounterClass()}`}>
              {value.length} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// 使用例
const [message, setMessage] = useState('');
const [comment, setComment] = useState('');

<Textarea
  label="メッセージ"
  value={message}
  onChange={setMessage}
  placeholder="メッセージを入力してください..."
  helper="最大500文字まで入力できます"
  maxLength={500}
  showCounter
  required
/>

<Textarea
  label="コメント"
  value={comment}
  onChange={setComment}
  size="small"
  error={!comment && submitted}
  helper={!comment && submitted ? 'コメントは必須です' : undefined}
/>
```

---

## アクセシビリティ

### キーボード操作

- **Tab**: テキストエリアにフォーカス
- **Enter**: 改行を挿入
- **Shift + Tab**: 前の要素にフォーカス
- **Ctrl/Cmd + A**: 全選択
- **Ctrl/Cmd + C/V/X**: コピー/貼り付け/切り取り

### ARIA属性

```html
<!-- エラー状態のテキストエリア -->
<div class="textarea-group">
  <label class="textarea-label" for="feedback">
    フィードバック <span aria-label="required">*</span>
  </label>
  <textarea
    id="feedback"
    class="textarea textarea-error"
    aria-invalid="true"
    aria-describedby="feedback-error"
    aria-required="true"
  ></textarea>
  <span id="feedback-error" class="textarea-helper textarea-helper-error">
    フィードバックは必須です
  </span>
</div>

<!-- 文字数制限のあるテキストエリア -->
<div class="textarea-group">
  <label for="comment">コメント</label>
  <textarea
    id="comment"
    class="textarea"
    maxlength="500"
    aria-describedby="comment-counter"
  ></textarea>
  <span id="comment-counter" class="textarea-counter" aria-live="polite">
    0 / 500
  </span>
</div>
```

### フォーカススタイル

フォーカスリングは WCAG 2.1 のアクセシビリティガイドラインに準拠しています：
- 3px の幅
- 2px のオフセット
- 十分なコントラスト比

---

## ベストプラクティス

### ✅ 推奨

1. **明確なラベル**
   - 何を入力するのか明確に記述
   - 必須項目には視覚的な表示を追加

2. **適切なサイズ**
   - 予想される入力量に応じたサイズを選択
   - `rows` 属性で初期の高さを調整

3. **文字数制限**
   - `maxLength` で制限を設定
   - カウンターで残り文字数を表示

4. **リサイズ制御**
   - デフォルトは `resize: vertical` を推奨
   - レイアウトが崩れる場合は `resize: none`

5. **プレースホルダー**
   - 入力例や形式のヒントを提供
   - ラベルの代わりにしない

### ❌ 非推奨

1. **単行テキストに使用**
   - 1行の入力には `<input>` を使用

2. **自動リサイズなし**
   - 長文入力で自動的に高さが調整されない
   - JavaScript で実装が必要な場合あり

3. **ラベルなし**
   - 必ずラベルテキストを提供

4. **小さすぎる初期サイズ**
   - 少なくとも2-3行は表示できるサイズに

---

## 高度な機能

### オートリサイズ

テキスト量に応じて自動的に高さを調整する実装例：

```tsx
import { useEffect, useRef } from 'react';

export function AutoResizeTextarea({ value, onChange, ...props }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{ resize: 'none', overflow: 'hidden' }}
      {...props}
    />
  );
}
```

### マークダウンエディタ

リッチテキスト編集が必要な場合は、専用のエディタライブラリの使用を検討してください：

- SimpleMDE
- CodeMirror
- Monaco Editor
- Quill

---

## テーマ対応

全てのテキストエリアトークンはテーマに対応しています。`data-theme` 属性の変更で自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <textarea class="textarea" placeholder="メッセージ..."></textarea>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <textarea class="textarea" placeholder="メッセージ..."></textarea>
</html>
```

---

## 関連コンポーネント

- [Input](./input.md) - 単行テキスト入力
- [Select](./select.md) - ドロップダウン選択
- [Checkbox](./checkbox.md) - 複数選択
- [Button](./button.md) - フォーム送信

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)
