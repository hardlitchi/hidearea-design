# Checkbox (チェックボックス) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/checkbox.css`
**ステータス:** ✅ 実装済み

---

## 概要

チェックボックスコンポーネントは、ユーザーが複数の選択肢から0個以上のオプションを選択できるフォーム要素です。ラジオボタンとは異なり、チェックボックスは独立した選択が可能で、未選択、選択済み、不確定（部分的に選択）の3つの状態をサポートしています。

### 用途

- 利用規約やプライバシーポリシーへの同意
- 複数選択フィルター
- タスクの完了マーク
- オプション機能の有効化/無効化
- リストの一括操作（すべて選択/すべて解除パターン）
- データ収集への同意

---

## サイズ

### Small (sm)

コンパクトな表示領域に適した小さめのチェックボックスです。

**サイズ仕様:**
- ボックス: 16px × 16px
- アイコン: 12px × 12px
- ラベルフォントサイズ: 0.875rem

**使用場面:**
- テーブル内に埋め込む場合
- 密集したフォームレイアウト
- サイドバー設定
- コンパクトなリスト

```html
<div class="ha-checkbox" size="sm">
  <div class="checkbox-container">
    <input type="checkbox" id="small-check">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="small-check">小さいチェックボックス</label>
</div>
```

### Medium (md) - デフォルト

ほとんどのインターフェースで使用される標準サイズのチェックボックスです。

**サイズ仕様:**
- ボックス: 20px × 20px
- アイコン: 14px × 14px
- ラベルフォントサイズ: 1rem

**使用場面:**
- 標準的なフォーム
- 設定画面
- リスト選択
- 通常のフォームやダイアログ

```html
<div class="ha-checkbox" size="md">
  <div class="checkbox-container">
    <input type="checkbox" id="medium-check">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="medium-check">通常サイズのチェックボックス</label>
</div>
```

### Large (lg)

視認性とアクセシビリティを重視した大きめのチェックボックスです。

**サイズ仕様:**
- ボックス: 24px × 24px
- アイコン: 16px × 16px
- ラベルフォントサイズ: 1.125rem

**使用場面:**
- 重要な同意項目
- モバイルインターフェース
- アクセシビリティ要件がある場合
- 大きなタッチターゲットが必要な場合

```html
<div class="ha-checkbox" size="lg">
  <div class="checkbox-container">
    <input type="checkbox" id="large-check">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="large-check">大きいチェックボックス</label>
</div>
```

---

## 状態

### 未選択 (デフォルト)

選択されていないチェックボックスのデフォルト状態です。枠線のみが表示され、チェックマークは表示されません。

```html
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="unchecked">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="unchecked">未選択の状態</label>
</div>
```

**視覚的プロパティ:**
- ボーダーカラー: `--border-default`
- 背景色: `--background-primary`
- カーソル: pointer

### 選択済み

選択されている状態で、チェックマークアイコンが表示されます。

```html
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="checked" checked>
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="checked">選択済みの状態</label>
</div>
```

**視覚的プロパティ:**
- 背景色: `--primary-default`
- ボーダーカラー: `--primary-default`
- アイコンカラー: `--foreground-inverse`
- アイコン表示: あり

### ホバー

未選択のチェックボックスにマウスカーソルを重ねた状態です。

```html
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="hover">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="hover">マウスを重ねてください</label>
</div>
```

**視覚的プロパティ:**
- ボーダーカラー: `--border-strong`
- スムーズトランジション: 200ms

### 選択済み + ホバー

選択されているチェックボックスにマウスカーソルを重ねた状態です。

**視覚的プロパティ:**
- 背景色: `--primary-hover`
- ボーダーカラー: `--primary-hover`
- アイコン: 表示されたまま

### フォーカス

キーボードフォーカス状態で、明確なフォーカスリングが表示されます。

```html
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="focus" tabindex="0">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="focus">キーボードフォーカス状態</label>
</div>
```

**視覚的プロパティ:**
- アウトライン: 2px solid `--primary-default`
- アウトラインオフセット: 2px
- WCAG 2.1 AAコントラスト基準を満たす

### 無効化

利用できないオプションを示す非インタラクティブ状態です。

```html
<div class="ha-checkbox" disabled>
  <div class="checkbox-container">
    <input type="checkbox" id="disabled" disabled>
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="disabled">無効化された状態</label>
</div>
```

**視覚的プロパティ:**
- 不透明度: 0.6
- カーソル: not-allowed
- ラベルカラー: `--foreground-secondary`

### 選択済み + 無効化

選択されているが操作できないチェックボックスです。

```html
<div class="ha-checkbox" disabled>
  <div class="checkbox-container">
    <input type="checkbox" id="checked-disabled" checked disabled>
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="checked-disabled">選択済みだが無効</label>
</div>
```

### 不確定 (Indeterminate)

部分的に選択された状態で、通常は親子関係のチェックボックスで一部の子要素のみが選択されている場合に使用します。

```html
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="indeterminate">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="indeterminate">すべて選択</label>
</div>

<script>
  document.getElementById('indeterminate').indeterminate = true;
</script>
```

**視覚的プロパティ:**
- 背景色: `--primary-default`
- ボーダーカラー: `--primary-default`
- アイコン表示: あり（ダッシュ/マイナスマーク）

### エラー

バリデーションエラーを示す状態です。無効な選択を表します。

```html
<div class="ha-checkbox" error>
  <div class="checkbox-container">
    <input type="checkbox" id="error" aria-invalid="true" aria-describedby="error-msg">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="error">必須項目</label>
  <span id="error-msg" class="description">この項目は必須です</span>
</div>
```

**視覚的プロパティ:**
- ボーダーカラー: `--error-default`
- フォーカスアウトライン: `--error-default`
- 説明テキストカラー: `--error-default`

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-checkbox size="md">
  <input type="checkbox" id="basic">
  <label for="basic">利用規約に同意する</label>
</ha-checkbox>

<ha-checkbox size="sm">
  <input type="checkbox" id="small">
  <label for="small">ニュースレターを受け取る</label>
</ha-checkbox>

<ha-checkbox error>
  <input type="checkbox" id="required">
  <label for="required">必須項目</label>
</ha-checkbox>

<ha-checkbox disabled>
  <input type="checkbox" id="disabled" disabled>
  <label for="disabled">無効な選択肢</label>
</ha-checkbox>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/checkbox.css">
</head>
<body>
  <!-- 基本的なチェックボックス -->
  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="basic">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="basic">利用規約に同意する</label>
  </div>

  <!-- 説明付きチェックボックス -->
  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="with-desc">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="with-desc">ニュースレターを購読する</label>
    <span class="description">週に1回、最新情報をお届けします</span>
  </div>

  <!-- エラー状態のチェックボックス -->
  <div class="ha-checkbox" size="md" error>
    <div class="checkbox-container">
      <input type="checkbox" id="error-check" aria-invalid="true" aria-describedby="error-message">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="error-check">利用規約に同意する</label>
    <span id="error-message" class="description">続行するには同意が必要です</span>
  </div>

  <!-- 無効化されたチェックボックス -->
  <div class="ha-checkbox" size="md" disabled>
    <div class="checkbox-container">
      <input type="checkbox" id="disabled-check" disabled>
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="disabled-check">利用できないオプション</label>
  </div>

  <!-- チェックボックスグループ -->
  <fieldset>
    <legend>興味のあるトピックを選択してください</legend>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="tech" name="topics" value="technology">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="tech">テクノロジー</label>
    </div>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="design" name="topics" value="design">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="design">デザイン</label>
    </div>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="business" name="topics" value="business">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="business">ビジネス</label>
    </div>
  </fieldset>
</body>
</html>
```

### Pattern 3: React/TypeScript

```typescript
import React, { useState } from 'react';
import '@hidearea-design/tokens/css/html/forms/checkbox.css';

interface CheckboxProps {
  id: string;
  label: string;
  description?: string;
  error?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

function Checkbox({
  id,
  label,
  description,
  error = false,
  errorMessage,
  size = 'md',
  disabled = false,
  checked = false,
  onChange,
}: CheckboxProps) {
  return (
    <div
      className="ha-checkbox"
      {...(size && { size })}
      {...(error && { error: '' })}
      {...(disabled && { disabled: '' })}
    >
      <div className="checkbox-container">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          aria-describedby={error ? `${id}-error` : description ? `${id}-desc` : undefined}
          aria-invalid={error}
        />
        <div className="checkbox-box">
          <svg className="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 4L6 11L3 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <label className="label" htmlFor={id}>{label}</label>
      {(description || error) && (
        <span
          id={error ? `${id}-error` : `${id}-desc`}
          className="description"
        >
          {error ? errorMessage : description}
        </span>
      )}
    </div>
  );
}

// 使用例
function SubscriptionForm() {
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) {
      setTermsError(true);
      return;
    }
    // フォーム送信処理
  };

  return (
    <form onSubmit={handleSubmit}>
      <Checkbox
        id="newsletter"
        label="ニュースレターを購読する"
        description="週に1回、最新情報をお届けします"
        checked={newsletter}
        onChange={setNewsletter}
      />

      <Checkbox
        id="terms"
        label="利用規約に同意する"
        checked={terms}
        onChange={(checked) => {
          setTerms(checked);
          if (checked) setTermsError(false);
        }}
        error={termsError}
        errorMessage="続行するには同意が必要です"
      />

      <button type="submit">登録する</button>
    </form>
  );
}

export { Checkbox, SubscriptionForm };
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
  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="example">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="example">チェックボックス</label>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 型 | デフォルト | 説明 |
|------|-----|-----------|------|
| `size` | `sm` \| `md` \| `lg` | `md` | チェックボックスのサイズバリアント |
| `error` | boolean | `false` | エラー状態を示す |
| `disabled` | boolean | `false` | チェックボックスを無効化する |
| `checked` | boolean | `false` | 初期選択状態 |
| `indeterminate` | boolean | `false` | 部分的に選択された状態（JavaScriptのみ） |
| `name` | string | — | input要素のname属性 |
| `value` | string | `on` | input要素のvalue属性 |
| `aria-label` | string | — | 視覚的ラベルが非表示の場合のアクセシブルラベル |
| `aria-describedby` | string | — | 説明要素のID |
| `aria-invalid` | boolean | — | 無効な状態を示す |

---

## CSSカスタムプロパティ

チェックボックスコンポーネントは以下のデザイントークンを使用しています:

### レイアウト
- `--spacing-2` - チェックボックスとラベル間のギャップ (0.5rem)
- `--spacing-1` - 説明テキストのマージン (0.25rem)

### ボーダー
- `--border-width-2` - ボーダー幅 (2px)
- `--border-radius-base` - ボーダー半径 (0.25rem)
- `--border-default` - デフォルトボーダーカラー
- `--border-strong` - ホバー時のボーダーカラー

### 背景
- `--background-primary` - デフォルト背景色

### カラー
- `--primary-default` - 選択時/選択済み時のカラー
- `--primary-hover` - ホバー状態のカラー
- `--error-default` - エラー状態のカラー
- `--foreground-primary` - ラベルテキストカラー
- `--foreground-secondary` - 説明テキストカラー
- `--foreground-inverse` - チェックマークのカラー

### タイポグラフィ
- `--font-family-sans` - ラベルのフォントファミリー
- `--font-size-sm` - 小サイズのテキスト (0.875rem)
- `--font-size-base` - 基本テキスト (1rem)
- `--font-size-lg` - 大サイズのテキスト (1.125rem)
- `--font-weight-regular` - ラベルのフォントウェイト (400)
- `--font-line-height-normal` - 行の高さ (1.5)

### アニメーション
- `--animation-duration-base` - トランジション時間 (200ms)
- `--animation-easing-ease` - イージング関数

---

## アクセシビリティ

### キーボード操作

- **Tab**: チェックボックスにフォーカスを移動
- **Shift + Tab**: 前の要素にフォーカスを移動
- **Space**: チェックボックスの状態を切り替え（フォーカス時）
- **矢印キー**: グループ内で移動（適切なARIAロールを使用時）

### ARIA属性

```html
<!-- エラーメッセージ付き -->
<div class="ha-checkbox" error>
  <div class="checkbox-container">
    <input
      type="checkbox"
      id="terms"
      aria-invalid="true"
      aria-describedby="error-msg"
    >
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="terms">利用規約に同意する</label>
  <span id="error-msg" class="description">これは必須項目です</span>
</div>

<!-- fieldsetグループ内 -->
<fieldset>
  <legend>オプションを選択</legend>
  <div class="ha-checkbox">
    <div class="checkbox-container">
      <input type="checkbox" id="opt1" name="options">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="opt1">オプション1</label>
  </div>
  <div class="ha-checkbox">
    <div class="checkbox-container">
      <input type="checkbox" id="opt2" name="options">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="opt2">オプション2</label>
  </div>
</fieldset>

<!-- aria-labelを使用したアイコンのみのチェックボックス -->
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input
      type="checkbox"
      id="favorite"
      aria-label="お気に入りに追加"
    >
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</div>
```

### フォーカスインジケーター

コンポーネントは明確なフォーカスインジケーターを提供します:
- 2px solidアウトライン、2pxオフセット
- `--primary-default`カラーを使用
- エラー状態では`--error-default`に変更
- WCAG 2.1 AA準拠のコントラスト比

### スクリーンリーダー対応

```html
<!-- 説明的なラベル -->
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="subscribe">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="subscribe">ニュースレターを購読する</label>
</div>

<!-- 追加の説明付き -->
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="subscribe" aria-describedby="subscribe-help">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="subscribe">ニュースレターを購読する</label>
  <span id="subscribe-help" class="description">週に1回メールをお送りします</span>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **常にラベルを提供する**
   - 明示的な`<label>`要素またはインラインラベルを使用
   - title属性のみに頼らない

2. **関連するチェックボックスをグループ化する**
   - チェックボックスグループには`<fieldset>`と`<legend>`を使用
   - コンテキストと構造を提供

3. **説明的なラベルを使用する**
   - チェックボックスを選択することの意味を明確にする
   - 「オプション1」のような汎用的なラベルは避ける

4. **役立つ説明を提供する**
   - 複雑な選択肢には説明テキストを追加
   - エラーメッセージには`.description`クラスを使用

5. **適切なサイズを選択する**
   - モバイルデバイスでは大サイズ(lg)を使用
   - 密集したテーブルでは小サイズ(sm)のみ使用
   - ほとんどのフォームではデフォルト(md)を使用

6. **親子関係を実装する**
   - 親チェックボックスには不確定状態を使用
   - 親が変更されたときに子を自動選択/解除

```html
<!-- 良い例: 説明的なラベルとグループ化 -->
<fieldset>
  <legend>通知設定</legend>

  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="email-notif" name="notifications">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="email-notif">メール通知を受け取る</label>
    <span class="description">重要な更新情報をメールでお知らせします</span>
  </div>

  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="sms-notif" name="notifications">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="sms-notif">SMS通知を受け取る</label>
    <span class="description">緊急のアラートをSMSでお知らせします</span>
  </div>
</fieldset>
```

### ❌ 非推奨

1. **複数選択にラジオボタンを使用する**
   - 複数の項目にはチェックボックスを使用し、ラジオボタンは使用しない
   - ラジオボタンは単一選択のみ

2. **ラベルを省略する**
   - ラベルなしのチェックボックスは絶対に作らない
   - 常に適切な`<label>`要素またはそれに相当するものを使用

3. **ユーザーの意図なしに事前選択する**
   - チェックボックスの自動チェックは避ける（特に同意系）
   - ユーザーに明示的な選択をさせる

4. **非常に長いラベル**
   - ラベルと説明に分割する
   - 行の長さは80文字以下にする

5. **説明なしで無効化する**
   - 無効化する場合は、その理由を説明に記載
   - 警告付きで有効にすることを検討

6. **ナビゲーションにチェックボックスを使用する**
   - ページ遷移のトリガーには絶対に使用しない
   - 代わりにボタンまたはリンクを使用

```html
<!-- 悪い例: ラベルなし、説明なし -->
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="bad-example">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</div>

<!-- 悪い例: 事前選択された同意チェックボックス -->
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="pre-checked" checked>
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="pre-checked">マーケティングメールを受け取る（事前選択済み）</label>
</div>

<!-- 悪い例: 非常に長いラベル -->
<div class="ha-checkbox">
  <div class="checkbox-container">
    <input type="checkbox" id="long-label">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="long-label">利用規約、プライバシーポリシー、クッキーポリシー、およびその他すべてのポリシーとガイドラインに同意し、それらに従うことに同意します</label>
</div>
```

---

## バリエーション

### すべて選択パターン

複数のアイテムを一括で選択/解除するパターンです。

```html
<div class="ha-checkbox" size="md">
  <div class="checkbox-container">
    <input
      type="checkbox"
      id="select-all"
      aria-label="すべてのアイテムを選択"
    >
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="select-all">すべて選択</label>
</div>

<div class="ha-checkbox" size="md">
  <div class="checkbox-container">
    <input type="checkbox" class="item-checkbox" id="item1">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="item1">アイテム1</label>
</div>

<div class="ha-checkbox" size="md">
  <div class="checkbox-container">
    <input type="checkbox" class="item-checkbox" id="item2">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="item2">アイテム2</label>
</div>

<div class="ha-checkbox" size="md">
  <div class="checkbox-container">
    <input type="checkbox" class="item-checkbox" id="item3">
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="item3">アイテム3</label>
</div>

<script>
const selectAll = document.getElementById('select-all');
const items = document.querySelectorAll('.item-checkbox');

// すべて選択チェックボックスのクリックイベント
selectAll.addEventListener('change', () => {
  items.forEach(item => {
    item.checked = selectAll.checked;
  });
  updateSelectAllIcon();
});

// 個別アイテムのクリックイベント
items.forEach(item => {
  item.addEventListener('change', () => {
    const allChecked = Array.from(items).every(i => i.checked);
    const someChecked = Array.from(items).some(i => i.checked);

    selectAll.indeterminate = !allChecked && someChecked;
    selectAll.checked = allChecked;
    updateSelectAllIcon();
  });
});

// アイコンを更新する関数
function updateSelectAllIcon() {
  const iconPath = selectAll.parentElement.querySelector('.checkbox-icon path');
  if (selectAll.indeterminate) {
    // 不確定状態: ダッシュアイコン
    iconPath.setAttribute('d', 'M4 8h8');
  } else {
    // 通常状態: チェックマークアイコン
    iconPath.setAttribute('d', 'M13 4L6 11L3 8');
  }
}

// 初期状態を設定
updateSelectAllIcon();
</script>
```

### 親子関係のチェックボックス

階層構造を持つチェックボックスのパターンです。

```html
<fieldset>
  <legend>権限設定</legend>

  <!-- 親チェックボックス -->
  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="all-permissions">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="all-permissions">すべての権限を選択</label>
  </div>

  <!-- 子チェックボックス -->
  <fieldset style="margin-left: 2rem; border: none; padding: 0;">
    <legend class="sr-only">個別の権限</legend>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="perm-read" name="permissions" value="read">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="perm-read">読み取り</label>
    </div>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="perm-write" name="permissions" value="write">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="perm-write">書き込み</label>
    </div>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="perm-delete" name="permissions" value="delete">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="perm-delete">削除</label>
    </div>
  </fieldset>
</fieldset>

<script>
const parent = document.getElementById('all-permissions');
const children = document.querySelectorAll('input[name="permissions"]');

function updateParentState() {
  const allChecked = Array.from(children).every(child => child.checked);
  const someChecked = Array.from(children).some(child => child.checked);

  parent.checked = allChecked;
  parent.indeterminate = !allChecked && someChecked;

  // アイコンを更新
  const iconPath = parent.parentElement.querySelector('.checkbox-icon path');
  if (parent.indeterminate) {
    iconPath.setAttribute('d', 'M4 8h8');
  } else {
    iconPath.setAttribute('d', 'M13 4L6 11L3 8');
  }
}

parent.addEventListener('change', (e) => {
  children.forEach(child => {
    child.checked = e.target.checked;
  });
  updateParentState();
});

children.forEach(child => {
  child.addEventListener('change', updateParentState);
});

// 初期状態を設定
updateParentState();
</script>
```

### 条件付きチェックボックス

他のチェックボックスやフォーム要素を条件的に有効化/無効化するパターンです。

```html
<div class="ha-checkbox" size="md">
  <div class="checkbox-container">
    <input
      type="checkbox"
      id="enable-options"
      aria-controls="conditional-group"
    >
    <div class="checkbox-box">
      <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
        <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <label class="label" for="enable-options">詳細オプションを有効化</label>
</div>

<fieldset id="conditional-group" disabled style="margin-left: 2rem; border: none; padding: 1rem 0;">
  <legend class="sr-only">詳細オプション</legend>

  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="option-a">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="option-a">オプションA</label>
  </div>

  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="option-b">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="option-b">オプションB</label>
  </div>

  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="option-c">
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="option-c">オプションC</label>
  </div>
</fieldset>

<script>
document.getElementById('enable-options').addEventListener('change', (e) => {
  const group = document.getElementById('conditional-group');
  group.disabled = !e.target.checked;

  // 視覚的なフィードバックを追加
  const checkboxes = group.querySelectorAll('.ha-checkbox');
  checkboxes.forEach(cb => {
    if (e.target.checked) {
      cb.removeAttribute('disabled');
    } else {
      cb.setAttribute('disabled', '');
    }
  });
});
</script>
```

### フォームバリデーション付きチェックボックス

リアルタイムバリデーションを実装したパターンです。

```html
<form id="signup-form">
  <div class="ha-checkbox" id="terms-group" size="md">
    <div class="checkbox-container">
      <input
        type="checkbox"
        id="terms"
        required
        aria-describedby="terms-error"
      >
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="terms">利用規約に同意する</label>
    <span id="terms-error" class="description" style="display: none;">
      続行するには同意が必要です
    </span>
  </div>

  <div class="ha-checkbox" id="privacy-group" size="md">
    <div class="checkbox-container">
      <input
        type="checkbox"
        id="privacy"
        required
        aria-describedby="privacy-error"
      >
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="privacy">プライバシーポリシーに同意する</label>
    <span id="privacy-error" class="description" style="display: none;">
      続行するには同意が必要です
    </span>
  </div>

  <button type="submit">登録する</button>
</form>

<script>
const form = document.getElementById('signup-form');
const termsCheckbox = document.getElementById('terms');
const termsError = document.getElementById('terms-error');
const termsGroup = document.getElementById('terms-group');
const privacyCheckbox = document.getElementById('privacy');
const privacyError = document.getElementById('privacy-error');
const privacyGroup = document.getElementById('privacy-group');

function validateCheckbox(checkbox, errorElement, groupElement) {
  if (!checkbox.checked) {
    errorElement.style.display = 'block';
    groupElement.setAttribute('error', '');
    checkbox.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    errorElement.style.display = 'none';
    groupElement.removeAttribute('error');
    checkbox.removeAttribute('aria-invalid');
    return true;
  }
}

form.addEventListener('submit', (e) => {
  const termsValid = validateCheckbox(termsCheckbox, termsError, termsGroup);
  const privacyValid = validateCheckbox(privacyCheckbox, privacyError, privacyGroup);

  if (!termsValid || !privacyValid) {
    e.preventDefault();
    // 最初のエラーにフォーカス
    if (!termsValid) {
      termsCheckbox.focus();
    } else if (!privacyValid) {
      privacyCheckbox.focus();
    }
  }
});

// リアルタイムバリデーション
termsCheckbox.addEventListener('change', () => {
  validateCheckbox(termsCheckbox, termsError, termsGroup);
});

privacyCheckbox.addEventListener('change', () => {
  validateCheckbox(privacyCheckbox, privacyError, privacyGroup);
});
</script>
```

---

## テーマサポート

すべてのチェックボックストークンは`data-theme`属性を使用したテーマ切り替えをサポートしています:

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="light-theme" checked>
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="light-theme">ライトモードのチェックボックス</label>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-checkbox" size="md">
    <div class="checkbox-container">
      <input type="checkbox" id="dark-theme" checked>
      <div class="checkbox-box">
        <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <label class="label" for="dark-theme">ダークモードのチェックボックス</label>
  </div>
</html>

<!-- テーマ切り替え例 -->
<script>
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
}
</script>
```

---

## 統合例

### フルフィーチャー登録フォーム

```html
<form id="registration-form">
  <h2>アカウント登録</h2>

  <!-- 興味のあるトピック -->
  <fieldset>
    <legend>興味のあるトピックを選択してください</legend>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="topic-tech" name="topics" value="technology">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="topic-tech">テクノロジー</label>
    </div>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="topic-design" name="topics" value="design">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="topic-design">デザイン</label>
    </div>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="topic-business" name="topics" value="business">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="topic-business">ビジネス</label>
    </div>
  </fieldset>

  <!-- オプション設定 -->
  <fieldset style="margin-top: 1.5rem;">
    <legend>通知設定</legend>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="newsletter">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="newsletter">ニュースレターを購読する</label>
      <span class="description">週に1回、最新情報をお届けします</span>
    </div>

    <div class="ha-checkbox" size="md">
      <div class="checkbox-container">
        <input type="checkbox" id="promotions">
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="promotions">プロモーション情報を受け取る</label>
      <span class="description">特別オファーや割引情報をお知らせします</span>
    </div>
  </fieldset>

  <!-- 必須同意項目 -->
  <fieldset style="margin-top: 1.5rem;">
    <legend>利用規約への同意（必須）</legend>

    <div class="ha-checkbox" id="terms-group" size="md">
      <div class="checkbox-container">
        <input
          type="checkbox"
          id="terms-agreement"
          required
          aria-describedby="terms-error"
        >
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="terms-agreement">
        <a href="/terms" target="_blank">利用規約</a>に同意する
      </label>
      <span id="terms-error" class="description" style="display: none;">
        続行するには利用規約への同意が必要です
      </span>
    </div>

    <div class="ha-checkbox" id="privacy-group" size="md">
      <div class="checkbox-container">
        <input
          type="checkbox"
          id="privacy-agreement"
          required
          aria-describedby="privacy-error"
        >
        <div class="checkbox-box">
          <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <label class="label" for="privacy-agreement">
        <a href="/privacy" target="_blank">プライバシーポリシー</a>に同意する
      </label>
      <span id="privacy-error" class="description" style="display: none;">
        続行するにはプライバシーポリシーへの同意が必要です
      </span>
    </div>
  </fieldset>

  <button type="submit" style="margin-top: 1.5rem;">登録する</button>
</form>

<script>
const form = document.getElementById('registration-form');

// バリデーション関数
function validateCheckbox(checkbox, errorElement, groupElement) {
  if (!checkbox.checked) {
    errorElement.style.display = 'block';
    groupElement.setAttribute('error', '');
    checkbox.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    errorElement.style.display = 'none';
    groupElement.removeAttribute('error');
    checkbox.removeAttribute('aria-invalid');
    return true;
  }
}

// フォーム送信処理
form.addEventListener('submit', (e) => {
  const termsCheckbox = document.getElementById('terms-agreement');
  const termsError = document.getElementById('terms-error');
  const termsGroup = document.getElementById('terms-group');

  const privacyCheckbox = document.getElementById('privacy-agreement');
  const privacyError = document.getElementById('privacy-error');
  const privacyGroup = document.getElementById('privacy-group');

  const termsValid = validateCheckbox(termsCheckbox, termsError, termsGroup);
  const privacyValid = validateCheckbox(privacyCheckbox, privacyError, privacyGroup);

  if (!termsValid || !privacyValid) {
    e.preventDefault();

    // 最初のエラーにフォーカス
    if (!termsValid) {
      termsCheckbox.focus();
    } else if (!privacyValid) {
      privacyCheckbox.focus();
    }
  }
});

// リアルタイムバリデーション
document.getElementById('terms-agreement').addEventListener('change', (e) => {
  validateCheckbox(
    e.target,
    document.getElementById('terms-error'),
    document.getElementById('terms-group')
  );
});

document.getElementById('privacy-agreement').addEventListener('change', (e) => {
  validateCheckbox(
    e.target,
    document.getElementById('privacy-error'),
    document.getElementById('privacy-group')
  );
});
</script>
```

### React/TypeScript 高度な統合例

```typescript
import React, { useState, useEffect } from 'react';
import '@hidearea-design/tokens/css/html/forms/checkbox.css';

interface CheckboxProps {
  id: string;
  label: string;
  description?: string;
  error?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  description,
  error = false,
  errorMessage,
  size = 'md',
  disabled = false,
  checked = false,
  indeterminate = false,
  onChange,
  ...ariaProps
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // 不確定状態を設定
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div
      className="ha-checkbox"
      {...(size && { size })}
      {...(error && { error: '' })}
      {...(disabled && { disabled: '' })}
    >
      <div className="checkbox-container">
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          aria-describedby={
            error
              ? `${id}-error`
              : description
                ? `${id}-desc`
                : ariaProps['aria-describedby']
          }
          aria-invalid={error}
          {...ariaProps}
        />
        <div className="checkbox-box">
          <svg className="checkbox-icon" viewBox="0 0 16 16" fill="none">
            {indeterminate ? (
              <path
                d="M4 8h8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M13 4L6 11L3 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
      </div>
      <label className="label" htmlFor={id}>{label}</label>
      {(description || error) && (
        <span
          id={error ? `${id}-error` : `${id}-desc`}
          className="description"
        >
          {error ? errorMessage : description}
        </span>
      )}
    </div>
  );
};

// チェックボックスグループコンポーネント
interface CheckboxGroupProps {
  legend: string;
  options: Array<{
    id: string;
    label: string;
    description?: string;
    value: string;
  }>;
  value: string[];
  onChange: (value: string[]) => void;
  size?: 'sm' | 'md' | 'lg';
  showSelectAll?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  legend,
  options,
  value,
  onChange,
  size = 'md',
  showSelectAll = false,
}) => {
  const allSelected = options.every(opt => value.includes(opt.value));
  const someSelected = options.some(opt => value.includes(opt.value)) && !allSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onChange(options.map(opt => opt.value));
    } else {
      onChange([]);
    }
  };

  const handleOptionChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter(v => v !== optionValue));
    }
  };

  return (
    <fieldset>
      <legend>{legend}</legend>

      {showSelectAll && (
        <Checkbox
          id="select-all"
          label="すべて選択"
          size={size}
          checked={allSelected}
          indeterminate={someSelected}
          onChange={handleSelectAll}
        />
      )}

      {options.map(option => (
        <Checkbox
          key={option.id}
          id={option.id}
          label={option.label}
          description={option.description}
          size={size}
          checked={value.includes(option.value)}
          onChange={(checked) => handleOptionChange(option.value, checked)}
        />
      ))}
    </fieldset>
  );
};

// 使用例
const RegistrationForm: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const topicOptions = [
    { id: 'tech', label: 'テクノロジー', value: 'technology' },
    { id: 'design', label: 'デザイン', value: 'design' },
    { id: 'business', label: 'ビジネス', value: 'business' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};

    if (!terms) newErrors.terms = true;
    if (!privacy) newErrors.privacy = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', { topics, newsletter, terms, privacy });
      // フォーム送信処理
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>アカウント登録</h2>

      <CheckboxGroup
        legend="興味のあるトピックを選択してください"
        options={topicOptions}
        value={topics}
        onChange={setTopics}
        size="md"
        showSelectAll
      />

      <fieldset style={{ marginTop: '1.5rem' }}>
        <legend>通知設定</legend>

        <Checkbox
          id="newsletter"
          label="ニュースレターを購読する"
          description="週に1回、最新情報をお届けします"
          checked={newsletter}
          onChange={setNewsletter}
        />
      </fieldset>

      <fieldset style={{ marginTop: '1.5rem' }}>
        <legend>利用規約への同意（必須）</legend>

        <Checkbox
          id="terms"
          label="利用規約に同意する"
          checked={terms}
          onChange={(checked) => {
            setTerms(checked);
            if (checked) {
              setErrors(prev => ({ ...prev, terms: false }));
            }
          }}
          error={errors.terms}
          errorMessage="続行するには利用規約への同意が必要です"
        />

        <Checkbox
          id="privacy"
          label="プライバシーポリシーに同意する"
          checked={privacy}
          onChange={(checked) => {
            setPrivacy(checked);
            if (checked) {
              setErrors(prev => ({ ...prev, privacy: false }));
            }
          }}
          error={errors.privacy}
          errorMessage="続行するにはプライバシーポリシーへの同意が必要です"
        />
      </fieldset>

      <button type="submit" style={{ marginTop: '1.5rem' }}>
        登録する
      </button>
    </form>
  );
};

export { Checkbox, CheckboxGroup, RegistrationForm };
```

---

## 関連コンポーネント

- [Radio](./radio.md) - 相互排他的な選択肢からの単一選択
- [Switch](./switch.md) - バイナリのオン/オフ切り替え
- [Select](./select.md) - ドロップダウン選択
- [Input](./input.md) - テキスト入力フィールド
- [Form Group](./form-group.md) - フォームコントロールをグループ化

---

## 関連ドキュメント

- [アーキテクチャガイド](../architecture.md)
- [デザイントークン](../tokens.md)
- [コンポーネントリファレンス](./README.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [アクセシビリティガイドライン](../accessibility.md)

---

**最終更新:** 2025-12-12
