# Textarea (テキストエリア) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/textarea.css`
**ステータス:** ✅ 実装済み

---

## 概要

Textareaコンポーネントは、ユーザーが複数行のテキストを入力できるフォーム要素です。コメント、メッセージ、説明文など、改行を含む長めのテキスト入力に適しています。3つのバリアント（default, filled, outlined）と3つのサイズ（sm, md, lg）をサポートしています。

### 用途

- コメントやレビューの入力
- メッセージやメール本文の作成
- 説明文や備考の記入
- フィードバック、アンケートの収集
- 長文テキストの入力フォーム
- 多段落のコンテンツ編集

---

## バリアント

### 1. Default (デフォルト - アウトライン)

標準的なアウトラインスタイルです。最も一般的に使用されます。

**特徴:**
- ボーダー: 1px solid (--color-gray-300)
- 背景: 白色 (--color-white)
- ホバー時: ボーダーが濃いグレーに変更
- フォーカス時: プライマリカラーのボーダー + シャドウ効果

**使用場面:**
- 一般的なフォーム入力
- コメント欄
- メッセージ作成フォーム

```html
<div class="ha-textarea" variant="default" size="md">
  <div class="textarea-wrapper">
    <textarea placeholder="メッセージを入力してください..."></textarea>
  </div>
</div>
```

### 2. Filled (塗りつぶし)

背景が塗りつぶされたスタイルです。視覚的に区別しやすく、デザイン性が高いです。

**特徴:**
- ボーダー: 1px solid transparent
- 背景: ライトグレー (--color-gray-100)
- ホバー時: 背景は変わらない
- フォーカス時: 背景が白に、ボーダーが表示

**使用場面:**
- 検索バー内の入力
- コメント入力欄
- 背景が明るいデザインでの使用

```html
<div class="ha-textarea" variant="filled" size="md">
  <div class="textarea-wrapper">
    <textarea placeholder="コメントを入力..."></textarea>
  </div>
</div>
```

### 3. Outlined (強調アウトライン)

2pxの太いボーダーで強調されたスタイルです。重要な入力フィールドを目立たせます。

**特徴:**
- ボーダー: 2px solid (--color-gray-300)
- 背景: 白色 (--color-white)
- フォーカス時: ボーダーがプライマリカラーに変更

**使用場面:**
- 重要な入力フィールド
- 単独で目立たせたい入力
- フォームの主要な入力エリア

```html
<div class="ha-textarea" variant="outlined" size="md">
  <div class="textarea-wrapper">
    <textarea placeholder="詳細を入力..."></textarea>
  </div>
</div>
```

---

## サイズ

### Small (sm)

コンパクトなフォームで使用する小さいテキストエリアです。

**仕様:**
- フォントサイズ: 0.875rem (14px)
- パディング: 0.5rem 0.75rem
- 最小高さ: 80px (約2-3行)
- ボーダー半径: 0.375rem

**使用場面:**
- 短いコメント入力
- コンパクトなフォーム
- クイック入力フィールド

```html
<div class="ha-textarea" size="sm">
  <div class="textarea-wrapper">
    <textarea placeholder="簡潔に入力..."></textarea>
  </div>
</div>
```

### Medium (md) - デフォルト

標準サイズのテキストエリアです。最も一般的に使用されます。

**仕様:**
- フォントサイズ: 1rem (16px)
- パディング: 0.625rem 0.875rem
- 最小高さ: 100px (約3-4行)
- ボーダー半径: 0.375rem

**使用場面:**
- 通常のコメント入力
- メッセージフォーム
- フィードバック入力

```html
<div class="ha-textarea" size="md">
  <div class="textarea-wrapper">
    <textarea placeholder="メッセージを入力..."></textarea>
  </div>
</div>
```

### Large (lg)

長文入力に適した大きなテキストエリアです。

**仕様:**
- フォントサイズ: 1.125rem (18px)
- パディング: 0.75rem 1rem
- 最小高さ: 120px (約5-6行)
- ボーダー半径: 0.5rem

**使用場面:**
- 詳細な説明入力
- 長文のメッセージ作成
- レポート、エッセイ作成
- ブログ記事の執筆

```html
<div class="ha-textarea" size="lg">
  <div class="textarea-wrapper">
    <textarea placeholder="詳細な説明を入力..."></textarea>
  </div>
</div>
```

---

## 使用方法

### Pattern 1: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/textarea.css">
</head>
<body>
  <!-- デフォルトバリアント -->
  <div class="ha-textarea" variant="default" size="md">
    <div class="textarea-wrapper">
      <textarea placeholder="メッセージを入力してください..."></textarea>
    </div>
  </div>

  <!-- Filledバリアント -->
  <div class="ha-textarea" variant="filled" size="md">
    <div class="textarea-wrapper">
      <textarea placeholder="コメントを入力..."></textarea>
    </div>
  </div>

  <!-- Outlinedバリアント -->
  <div class="ha-textarea" variant="outlined" size="lg">
    <div class="textarea-wrapper">
      <textarea placeholder="詳細説明..."></textarea>
    </div>
  </div>

  <!-- フルWidth -->
  <div class="ha-textarea" variant="default" full-width>
    <div class="textarea-wrapper">
      <textarea placeholder="フルワイド入力..."></textarea>
    </div>
  </div>
</body>
</html>
```

### Pattern 2: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-textarea variant="default" size="md">
  <textarea placeholder="メッセージを入力..."></textarea>
</ha-textarea>

<ha-textarea variant="filled" size="sm">
  <textarea placeholder="簡潔に入力..."></textarea>
</ha-textarea>

<ha-textarea variant="outlined" disabled>
  <textarea>編集不可のテキスト</textarea>
</ha-textarea>
```

### Pattern 3: React

```jsx
import React, { useState } from 'react';

function Textarea({
  variant = 'default',
  size = 'md',
  placeholder,
  disabled = false,
  readOnly = false,
  error = false,
  resize = 'vertical',
  maxLength,
  onChange,
  ...props
}) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div
      className="ha-textarea"
      data-variant={variant}
      data-size={size}
      data-error={error}
      data-resize={resize}
    >
      <div className="textarea-wrapper">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          style={{ resize }}
          {...props}
        />
      </div>
    </div>
  );
}

// 使用例
<Textarea
  variant="default"
  size="md"
  placeholder="メッセージを入力..."
  maxLength={500}
/>
```

### Pattern 4: 統合CSS

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/all.css">
</head>
<body>
  <!-- 全コンポーネントが利用可能 -->
  <div class="ha-textarea" variant="default" size="md">
    <div class="textarea-wrapper">
      <textarea placeholder="メッセージ..."></textarea>
    </div>
  </div>
</body>
</html>
```

---

## 状態

### Default (デフォルト)

通常の入力可能な状態です。ボーダーが表示され、入力フォーカスが可能です。

```html
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea placeholder="通常の状態..."></textarea>
  </div>
</div>
```

### Hover (ホバー)

マウスカーソルがテキストエリア上にある状態です。Default/Outlinedバリアントではボーダーが濃くなります。

```html
<!-- ホバー状態は自動的に適用されます -->
<div class="ha-textarea" variant="default">
  <div class="textarea-wrapper">
    <textarea placeholder="ホバーするとボーダーが濃くなります..."></textarea>
  </div>
</div>
```

### Focus (フォーカス)

キーボードフォーカスがある状態です。フォーカスリングが表示され、ボーダーがプライマリカラーに変わります。

```html
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea placeholder="フォーカスするとフォーカスリングが表示..."></textarea>
  </div>
</div>
```

### Disabled (無効)

操作できない状態です。視覚的に無効であることが明確に表示されます。

**特徴:**
- 背景: ライトグレー (--color-gray-50)
- 不透明度: 60%
- リサイズ: 不可
- カーソル: not-allowed

```html
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea disabled placeholder="編集できません..."></textarea>
  </div>
</div>
```

### Read-Only (読み取り専用)

テキストは表示されますが編集できない状態です。コピー可能ですが、変更はできません。

```html
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea readonly>このテキストは読み取り専用です</textarea>
  </div>
</div>
```

### Error (エラー)

バリデーションエラーがある状態です。ボーダーが赤色に変わります。

```html
<div class="ha-textarea" error>
  <div class="textarea-wrapper">
    <textarea
      aria-invalid="true"
      aria-describedby="error-msg"
      placeholder="エラー状態..."
    ></textarea>
  </div>
</div>
<span id="error-msg" class="error-message">入力内容にエラーがあります</span>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `default` \| `filled` \| `outlined` | `default` | テキストエリアのスタイルバリアント |
| `size` | `sm` \| `md` \| `lg` | `md` | テキストエリアのサイズ |
| `error` | `boolean` | `false` | エラー状態を表示 |
| `full-width` | `boolean` | `false` | 幅100%に拡張 |
| `resize` | `none` \| `vertical` \| `horizontal` \| `both` | `vertical` | リサイズ方向の制御 |
| `disabled` | `boolean` | `false` | 無効化 |
| `readonly` | `boolean` | `false` | 読み取り専用 |
| `maxlength` | `number` | - | 最大入力文字数 |
| `placeholder` | `string` | - | プレースホルダーテキスト |
| `rows` | `number` | - | 表示行数 |
| `cols` | `number` | - | 表示列数 |

---

## HTMLクラスの使用方法

`.ha-textarea`クラスを使用して、Plain HTMLでテキストエリアをスタイリングできます：

```html
<!-- 基本的な使用 -->
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea></textarea>
  </div>
</div>

<!-- 属性で制御 -->
<div class="ha-textarea" variant="filled" size="lg" full-width>
  <div class="textarea-wrapper">
    <textarea></textarea>
  </div>
</div>

<!-- エラー状態 -->
<div class="ha-textarea" error>
  <div class="textarea-wrapper">
    <textarea aria-invalid="true"></textarea>
  </div>
</div>

<!-- リサイズオプション -->
<div class="ha-textarea" resize="none">
  <div class="textarea-wrapper">
    <textarea></textarea>
  </div>
</div>
```

---

## デザイントークン

Textareaコンポーネントは以下のCSS変数（デザイントークン）を使用しています：

### 色関連

| トークン | 値 | 説明 |
|---------|-----|------|
| `--theme-light-primary-default` | #3b82f6 | フォーカス時のボーダーカラー |
| `--theme-light-primary-subtle` | rgba(59, 130, 246, 0.1) | フォーカスリング背景 |
| `--color-white` | #ffffff | デフォルト背景色 |
| `--color-gray-50` | #f9fafb | 無効時の背景色 |
| `--color-gray-100` | #f3f4f6 | Filled背景色 |
| `--color-gray-300` | #d1d5db | デフォルトボーダー色 |
| `--color-gray-400` | #9ca3af | ホバーボーダー色 |
| `--color-gray-900` | #111827 | テキスト色 |
| `--color-red-500` | #ef4444 | エラーボーダー色 |

### スペーシング

| トークン | 値 | 説明 |
|---------|-----|------|
| `--spacing-2` | 0.5rem | Small パディング (縦) |
| `--spacing-2-5` | 0.625rem | Medium パディング (縦) |
| `--spacing-3` | 0.75rem | Large パディング (縦) |
| `--spacing-3-5` | 0.875rem | Medium パディング (横) |
| `--spacing-4` | 1rem | Large パディング (横) |

### ボーダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `--border-width-1` | 1px | Default/Filledボーダー幅 |
| `--border-width-2` | 2px | Outlinedボーダー幅 |
| `--border-radius-md` | 0.375rem | Small/Mediumの角丸 |
| `--border-radius-lg` | 0.5rem | Largeの角丸 |

### アニメーション

| トークン | 値 | 説明 |
|---------|-----|------|
| `--animation-duration-base` | 200ms | トランジション時間 |
| `--animation-easing-ease` | ease | トランジション イージング |

### フォント

| トークン | 値 | 説明 |
|---------|-----|------|
| `--font-family-sans` | -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif | フォントファミリー |
| `--font-weight-regular` | 400 | フォントウェイト |
| `--font-line-height-normal` | 1.5 | 行の高さ |
| `--font-size-sm` | 0.875rem | Small フォントサイズ |
| `--font-size-base` | 1rem | Medium フォントサイズ |
| `--font-size-lg` | 1.125rem | Large フォントサイズ |

---

## 高度な機能

### Character Count (文字数カウンター)

maxlength属性を使用して文字数を制限し、JavaScriptで現在の文字数を表示できます：

```html
<div class="textarea-container">
  <div class="ha-textarea">
    <div class="textarea-wrapper">
      <textarea id="comment" maxlength="500" placeholder="コメントを入力..."></textarea>
    </div>
  </div>
  <div class="character-count">
    <span id="count">0</span> / 500
  </div>
</div>

<script>
const textarea = document.getElementById('comment');
const count = document.getElementById('count');

textarea.addEventListener('input', () => {
  count.textContent = textarea.value.length;
  // 90%以上で警告
  if (textarea.value.length > 450) {
    count.style.color = '#f59e0b'; // warning
  } else if (textarea.value.length >= 500) {
    count.style.color = '#ef4444'; // error
  } else {
    count.style.color = '#6b7280'; // default
  }
});
</script>

<style>
.textarea-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.character-count {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: right;
}
</style>
```

### Auto-Resize (自動リサイズ)

テキスト量に応じて自動的に高さが調整されるテキストエリア：

```html
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea
      id="auto-resize"
      placeholder="テキストを入力するとサイズが自動調整..."
      style="resize: none; overflow: hidden;"
    ></textarea>
  </div>
</div>

<script>
const textarea = document.getElementById('auto-resize');

function autoResize() {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

textarea.addEventListener('input', autoResize);
textarea.addEventListener('change', autoResize);

// 初期化
autoResize();
</script>
```

### React Hook Example

```jsx
import { useCallback, useRef, useEffect } from 'react';

export function AutoResizeTextarea({ value, onChange, ...props }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="ha-textarea">
      <div className="textarea-wrapper">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ resize: 'none', overflow: 'hidden' }}
          {...props}
        />
      </div>
    </div>
  );
}
```

---

## アクセシビリティ

### ARIA属性

```html
<!-- エラー状態のテキストエリア -->
<label for="feedback">フィードバック <span aria-label="required">*</span></label>
<div class="ha-textarea" error>
  <div class="textarea-wrapper">
    <textarea
      id="feedback"
      aria-invalid="true"
      aria-describedby="feedback-error"
      aria-required="true"
      placeholder="フィードバックを入力..."
    ></textarea>
  </div>
</div>
<span id="feedback-error" role="alert" style="color: #ef4444;">
  フィードバックは必須です
</span>

<!-- 文字数制限のあるテキストエリア -->
<label for="comment">コメント</label>
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea
      id="comment"
      maxlength="500"
      aria-describedby="comment-info"
      placeholder="コメントを入力..."
    ></textarea>
  </div>
</div>
<span id="comment-info" aria-live="polite" aria-atomic="true">
  <span id="count">0</span> / 500 文字
</span>
```

### キーボード操作

- **Tab**: テキストエリアにフォーカス
- **Shift + Tab**: 前の要素にフォーカス
- **Enter**: 改行を挿入
- **Ctrl/Cmd + A**: 全テキスト選択
- **Ctrl/Cmd + C/X/V**: コピー/切り取り/貼り付け

### フォーカススタイル

フォーカス時は自動的にフォーカスリングが表示されます：

```css
.textarea-wrapper:focus-within {
  border-color: var(--theme-light-primary-default, #3b82f6);
  box-shadow: 0 0 0 3px var(--theme-light-primary-subtle, rgba(59, 130, 246, 0.1));
}
```

### maxlength アナウンス

スクリーンリーダーで文字数制限をアナウンスするには、aria-describedbyで補足テキストを関連付けます：

```html
<textarea
  id="message"
  maxlength="200"
  aria-describedby="char-limit"
></textarea>
<span id="char-limit">最大200文字まで入力可能</span>
```

### ラベル関連付け

常にlabel要素を使用してテキストエリアと関連付けてください：

```html
<label for="description">説明文</label>
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea id="description"></textarea>
  </div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **明確で説明的なラベル**
   - 何を入力するのか明確に記述
   - 必須項目には視覚的に「*」を表示

```html
<label for="feedback">フィードバック <span aria-label="required">*</span></label>
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea id="feedback" required></textarea>
  </div>
</div>
```

2. **適切なサイズ選択**
   - 予想される入力量に応じたサイズを選択
   - 短いコメント: Small (sm)
   - 通常のメッセージ: Medium (md)
   - 長文の説明: Large (lg)

```html
<!-- 短いコメント用 -->
<div class="ha-textarea" size="sm">
  <div class="textarea-wrapper">
    <textarea placeholder="簡潔に入力..."></textarea>
  </div>
</div>

<!-- 長文説明用 -->
<div class="ha-textarea" size="lg">
  <div class="textarea-wrapper">
    <textarea placeholder="詳細に入力..."></textarea>
  </div>
</div>
```

3. **文字数制限の実装**
   - `maxLength`属性で制限を設定
   - JavaScriptで残り文字数をリアルタイム表示
   - 90%以上でカラー警告を表示

```html
<div class="textarea-container">
  <div class="ha-textarea">
    <div class="textarea-wrapper">
      <textarea
        maxlength="500"
        placeholder="最大500文字まで入力できます..."
      ></textarea>
    </div>
  </div>
  <div class="char-counter" aria-live="polite">
    <span id="char-count">0</span> / 500
  </div>
</div>
```

4. **リサイズ制御**
   - デフォルトは `resize: vertical`を推奨
   - レイアウトが崩れる場合は `resize: none`
   - 必要に応じて `resize: both`も可能

```html
<!-- 縦方向のみリサイズ可能 -->
<div class="ha-textarea" resize="vertical">
  <div class="textarea-wrapper">
    <textarea></textarea>
  </div>
</div>

<!-- リサイズ不可 -->
<div class="ha-textarea" resize="none">
  <div class="textarea-wrapper">
    <textarea></textarea>
  </div>
</div>
```

5. **ヘルパーテキストの提供**
   - 入力形式や要件を説明
   - 文字制限を記載
   - エラーメッセージは明確に

```html
<div class="textarea-group">
  <label for="bio">プロフィール</label>
  <div class="ha-textarea">
    <div class="textarea-wrapper">
      <textarea
        id="bio"
        placeholder="150字程度で自己紹介を..."
        maxlength="200"
        aria-describedby="bio-helper"
      ></textarea>
    </div>
  </div>
  <small id="bio-helper">200文字以内で入力してください</small>
</div>
```

6. **エラー状態の明確な表示**
   - `error`属性を使用
   - `aria-invalid="true"`を設定
   - `aria-describedby`でエラーメッセージを関連付け

```html
<div class="ha-textarea" error>
  <div class="textarea-wrapper">
    <textarea
      aria-invalid="true"
      aria-describedby="error-message"
    ></textarea>
  </div>
</div>
<span id="error-message" role="alert">
  コメントは必須です
</span>
```

### ❌ 非推奨

1. **単行テキストに使用**
   - 1行の入力には `<input type="text">` を使用
   - テキストエリアは複数行入力専用

```html
<!-- 非推奨: 単行入力 -->
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea rows="1"></textarea>
  </div>
</div>

<!-- 推奨: 単行入力 -->
<div class="ha-input">
  <div class="input-wrapper">
    <input type="text">
  </div>
</div>
```

2. **ラベルなし**
   - 必ずラベル要素で関連付け
   - プレースホルダーだけではアクセシビリティに問題

```html
<!-- 非推奨: ラベルなし -->
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea placeholder="メッセージ..."></textarea>
  </div>
</div>

<!-- 推奨: ラベルあり -->
<label for="message">メッセージ</label>
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea id="message" placeholder="メッセージ..."></textarea>
  </div>
</div>
```

3. **プレースホルダーのみで入力要件を説明**
   - プレースホルダーは補助情報のため
   - 形式や制限は別途説明する必要がある

```html
<!-- 非推奨 -->
<textarea placeholder="500文字以内で説明を入力してください..."></textarea>

<!-- 推奨 -->
<label for="description">説明</label>
<div class="ha-textarea">
  <div class="textarea-wrapper">
    <textarea
      id="description"
      maxlength="500"
      placeholder="説明を入力..."
      aria-describedby="description-hint"
    ></textarea>
  </div>
</div>
<small id="description-hint">500文字以内</small>
```

4. **初期サイズが小さすぎる**
   - 最小でも2-3行は表示されるサイズに
   - ユーザーが入力内容を確認できるように

```html
<!-- 非推奨: 小さすぎる -->
<div class="ha-textarea" style="height: 40px;">
  <div class="textarea-wrapper">
    <textarea></textarea>
  </div>
</div>

<!-- 推奨: 適切なサイズ -->
<div class="ha-textarea" size="md">
  <div class="textarea-wrapper">
    <textarea></textarea>
  </div>
</div>
```

5. **テキスト入力にバリデーションなし**
   - フォーム送信時に必ずバリデーション実施
   - エラーは明確に表示
   - aria-invalid属性で支援技術に伝達

```html
<!-- 推奨: バリデーション付き -->
<div id="feedback-form">
  <label for="feedback">フィードバック <span aria-label="required">*</span></label>
  <div class="ha-textarea" id="feedback-wrapper">
    <div class="textarea-wrapper">
      <textarea id="feedback" required></textarea>
    </div>
  </div>
  <span id="feedback-error" role="alert" style="color: #ef4444; display: none;"></span>
</div>

<script>
const form = document.getElementById('feedback-form');
const textarea = document.getElementById('feedback');
const wrapper = document.getElementById('feedback-wrapper');
const error = document.getElementById('feedback-error');

form.addEventListener('submit', (e) => {
  if (!textarea.value.trim()) {
    e.preventDefault();
    wrapper.setAttribute('error', '');
    textarea.setAttribute('aria-invalid', 'true');
    error.textContent = 'フィードバックは必須です';
    error.style.display = 'block';
  }
});
</script>
```

---

## テーマ対応

全てのテキストエリアトークンはテーマに対応しています。`data-theme`属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-textarea" variant="default">
    <div class="textarea-wrapper">
      <textarea placeholder="ライトテーマ..."></textarea>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-textarea" variant="default">
    <div class="textarea-wrapper">
      <textarea placeholder="ダークテーマ..."></textarea>
    </div>
  </div>
</html>
```

---

## 関連コンポーネント

- [Input](./input.md) - 単行テキスト入力フィールド
- [Form Group](./form-group.md) - フォーム要素のグループ化
- [Select](./select.md) - ドロップダウン選択
- [Checkbox](./checkbox.md) - 複数選択
- [Button](../layout/button.md) - フォーム送信ボタン

---

**最終更新:** 2025-12-12
