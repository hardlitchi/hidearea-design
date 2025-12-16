# Radio (ラジオボタン) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/radio.css`
**ステータス:** ✅ 実装済み (Web Component)

---

## 概要

ラジオボタンコンポーネントは、ユーザーが複数の選択肢から1つだけを選択できるようにするフォーム要素です。グループ内で相互排他的な選択を提供します。

### 用途

- アンケートの単一選択回答
- 配送方法の選択
- 支払い方法の選択
- 設定オプションの選択
- 互いに排他的な選択肢の提示

---

## サイズバリアント

### 1. Small (sm)

コンパクトな場所で使用する小さいラジオボタンです。

**サイズ:** 16px
**インジケーター:** 8px (内側の円)

**使用場面:**
- 密集したフォーム
- テーブルの行選択
- サイドバーのオプション
- コンパクトなリスト

**属性値:** `size="sm"`

```html
<input type="radio" class="ha-radio" size="sm" name="option" value="1">
```

### 2. Medium (md) - デフォルト

標準サイズのラジオボタンです。最も一般的に使用されます。

**サイズ:** 20px
**インジケーター:** 10px

**使用場面:**
- 通常のフォーム
- 設定画面
- チェックアウトフロー
- ほとんどのユースケース

**属性値:** `size="md"` または 属性なし (デフォルト)

```html
<input type="radio" class="ha-radio" size="md" name="option" value="1">
<input type="radio" class="ha-radio" name="option" value="1">
```

### 3. Large (lg)

視認性を高めたい場合に使用する大きなラジオボタンです。

**サイズ:** 24px
**インジケーター:** 12px

**使用場面:**
- 重要な選択項目
- モバイルUI
- タッチターゲットを大きくしたい場合
- アクセシビリティの強化が必要な場合

**属性値:** `size="lg"`

```html
<input type="radio" class="ha-radio" size="lg" name="option" value="1">
```

---

## 状態

### Default (未選択)

ラジオボタンの初期状態。未選択を示します。

**視覚的特性:**
- グレーのボーダー (neutral-400)
- 白い背景
- 内側に円なし

### Checked (チェック済み)

選択されている状態。内側に色付きの円（ドット）が表示されます。

**視覚的特性:**
- プライマリ色のボーダー (primary-600)
- 白い背景
- 内側に色付きの円

**属性:** `checked`

```html
<input type="radio" class="ha-radio" name="option" value="1" checked>
```

### Hover (ホバー)

マウスカーソルがラジオボタン上にある状態。視覚的なフィードバックを提供します。

**視覚的特性:**
- ボーダー色が濃くなる (primary-500)
- ホバー時のハイライト

### Focus (フォーカス)

キーボードフォーカスがある状態。フォーカスリングが表示されます。

**視覚的特性:**
- 2px のアウトラインリング
- 2px のオフセット
- プライマリ色のリング

```html
<input type="radio" class="ha-radio" name="option" value="1" tabindex="0">
```

### Disabled (無効)

操作できない状態を示します。

**視覚的特性:**
- opacity: 0.6
- cursor: not-allowed
- グレーのボーダー (neutral-300)
- グレーの背景 (neutral-100)

**属性:** `disabled`

```html
<input type="radio" class="ha-radio" name="option" value="1" disabled>
```

### Checked + Disabled (チェック済み + 無効)

選択済みで無効な状態。既に選択されているため変更できません。

**視覚的特性:**
- グレーのボーダー
- グレーの背景
- グレーのインジケーター (neutral-400)

```html
<input type="radio" class="ha-radio" name="option" value="1" checked disabled>
```

### Error (エラー)

バリデーションエラーがある状態。

**視覚的特性:**
- ダンジャー色のボーダー (danger-600)
- エラーメッセージと共に表示

**属性:** `error`

```html
<input type="radio" class="ha-radio" name="option" value="1" error>
```

### Error + Checked (エラー + チェック済み)

エラー状態で選択されている場合。

**視覚的特性:**
- ダンジャー色のボーダー
- ダンジャー色のインジケーター (danger-600)

```html
<input type="radio" class="ha-radio" name="option" value="1" error checked>
```

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- 基本的なラジオボタン -->
<ha-radio size="md">
  <input type="radio" id="option1" name="choice" value="option1">
  <label for="option1">オプション 1</label>
</ha-radio>

<!-- ラジオボタングループ -->
<ha-radio size="md">
  <input type="radio" id="standard" name="shipping" value="standard" checked>
  <label for="standard">通常配送</label>
</ha-radio>

<ha-radio size="md">
  <input type="radio" id="express" name="shipping" value="express">
  <label for="express">速達配送</label>
</ha-radio>

<!-- サイズバリアント -->
<ha-radio size="sm">
  <input type="radio" id="small" name="size" value="sm">
  <label for="small">小サイズ</label>
</ha-radio>

<ha-radio size="lg">
  <input type="radio" id="large" name="size" value="lg">
  <label for="large">大サイズ</label>
</ha-radio>

<!-- 状態の例 -->
<ha-radio disabled>
  <input type="radio" id="disabled" name="example" disabled>
  <label for="disabled">無効な選択肢</label>
</ha-radio>

<ha-radio error>
  <input type="radio" id="error" name="example">
  <label for="error">エラー状態</label>
</ha-radio>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/radio.css">
</head>
<body>
  <!-- 基本的なラジオボタン -->
  <div class="ha-radio" size="md">
    <div class="radio-container">
      <input type="radio" id="basic-radio" name="basic" value="yes">
      <div class="radio-circle">
        <div class="radio-dot"></div>
      </div>
      <label for="basic-radio">はい</label>
    </div>
  </div>

  <!-- ラジオボタングループ（相互排他的な選択） -->
  <fieldset>
    <legend>配送方法を選択してください</legend>

    <div class="ha-radio" size="md" checked>
      <div class="radio-container">
        <input type="radio" id="standard-shipping" name="shipping" value="standard" checked>
        <div class="radio-circle">
          <div class="radio-dot"></div>
        </div>
        <label for="standard-shipping">通常配送（3-5日）</label>
      </div>
    </div>

    <div class="ha-radio" size="md">
      <div class="radio-container">
        <input type="radio" id="express-shipping" name="shipping" value="express">
        <div class="radio-circle">
          <div class="radio-dot"></div>
        </div>
        <label for="express-shipping">速達配送（1-2日）</label>
      </div>
    </div>

    <div class="ha-radio" size="md">
      <div class="radio-container">
        <input type="radio" id="overnight-shipping" name="shipping" value="overnight">
        <div class="radio-circle">
          <div class="radio-dot"></div>
        </div>
        <label for="overnight-shipping">翌日配送</label>
      </div>
    </div>
  </fieldset>

  <!-- 異なるサイズの例 -->
  <h4>Small (sm)</h4>
  <div class="ha-radio" size="sm">
    <div class="radio-container">
      <input type="radio" id="small-radio" name="size-demo" value="sm">
      <div class="radio-circle">
        <div class="radio-dot"></div>
      </div>
      <label for="small-radio">小サイズのラジオボタン</label>
    </div>
  </div>

  <h4>Medium (md) - デフォルト</h4>
  <div class="ha-radio" size="md">
    <div class="radio-container">
      <input type="radio" id="medium-radio" name="size-demo" value="md" checked>
      <div class="radio-circle">
        <div class="radio-dot"></div>
      </div>
      <label for="medium-radio">中サイズのラジオボタン</label>
    </div>
  </div>

  <h4>Large (lg)</h4>
  <div class="ha-radio" size="lg">
    <div class="radio-container">
      <input type="radio" id="large-radio" name="size-demo" value="lg">
      <div class="radio-circle">
        <div class="radio-dot"></div>
      </div>
      <label for="large-radio">大サイズのラジオボタン</label>
    </div>
  </div>

  <!-- エラー状態のラジオボタン -->
  <div class="ha-radio" size="md" error>
    <div class="radio-container">
      <input type="radio" id="error-radio" name="required" value="yes" error>
      <div class="radio-circle">
        <div class="radio-dot"></div>
      </div>
      <label for="error-radio">必須選択項目</label>
    </div>
  </div>

  <!-- 無効化されたラジオボタン -->
  <div class="ha-radio" size="md" disabled>
    <div class="radio-container">
      <input type="radio" id="disabled-radio" name="example" value="disabled" disabled>
      <div class="radio-circle">
        <div class="radio-dot"></div>
      </div>
      <label for="disabled-radio">選択できないオプション</label>
    </div>
  </div>

  <script>
    // ラジオボタンの選択状態を管理
    document.querySelectorAll('.ha-radio input[type="radio"]').forEach(input => {
      input.addEventListener('change', function() {
        const name = this.name;
        const radioGroup = document.querySelectorAll(`.ha-radio input[name="${name}"]`);

        // 同じグループ内の全てのラジオボタンをリセット
        radioGroup.forEach(radio => {
          const radioElement = radio.closest('.ha-radio');
          if (radio.checked) {
            radioElement.setAttribute('checked', '');
          } else {
            radioElement.removeAttribute('checked');
          }
        });

        console.log(`選択されました: ${this.value}`);
      });
    });
  </script>
</body>
</html>
```

**重要なポイント:**

1. **HTML構造:** ラジオボタンには必ず `.ha-radio` > `.radio-container` > `input`, `.radio-circle` (内部に `.radio-dot`)、`label` の構造が必要です。
2. **CSSファイル参照:**
   - `css/variables.css` - デザイントークンの定義
   - `css/html/forms/radio.css` - Radio コンポーネントのスタイル
3. **相互排他性:** 同じ `name` 属性を持つラジオボタンは自動的に相互排他的になります。1つ選択すると、同じグループの他のラジオボタンは自動的に解除されます。
4. **name属性の重要性:** グループ化には必ず同じ `name` 属性を設定してください。
5. **checked属性:** デフォルトで選択状態にしたい場合は、HTMLの `input` 要素と親要素の両方に `checked` 属性を設定します。

### Pattern 3: React/TypeScript

```typescript
import React, { useState } from 'react';
import '@hidearea-design/tokens/css/html/forms/radio.css';

interface RadioProps {
  id: string;
  name: string;
  value: string;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange?: (value: string) => void;
}

function Radio({
  id,
  name,
  value,
  label,
  size = 'md',
  checked = false,
  disabled = false,
  error = false,
  onChange,
}: RadioProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && e.target.checked) {
      onChange(e.target.value);
    }
  };

  return (
    <div
      className="ha-radio"
      {...(size && { size })}
      {...(checked && { checked: '' })}
      {...(disabled && { disabled: '' })}
      {...(error && { error: '' })}
    >
      <div className="radio-container">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <div className="radio-circle">
          <div className="radio-dot"></div>
        </div>
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
}

// ラジオグループコンポーネント
interface RadioGroupProps {
  name: string;
  options: Array<{
    id: string;
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  value?: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
  size = 'md',
  error = false,
}: RadioGroupProps) {
  return (
    <div className="radio-group">
      {options.map((option) => (
        <Radio
          key={option.id}
          id={option.id}
          name={name}
          value={option.value}
          label={option.label}
          size={size}
          checked={value === option.value}
          disabled={option.disabled}
          error={error}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

// 使用例: 配送方法の選択
function ShippingForm() {
  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingOptions = [
    { id: 'standard', value: 'standard', label: '通常配送（3-5日）' },
    { id: 'express', value: 'express', label: '速達配送（1-2日）' },
    { id: 'overnight', value: 'overnight', label: '翌日配送' },
  ];

  return (
    <fieldset>
      <legend>配送方法を選択してください</legend>
      <RadioGroup
        name="shipping"
        options={shippingOptions}
        value={shippingMethod}
        onChange={setShippingMethod}
        size="md"
      />
      <p>選択された配送方法: {shippingMethod}</p>
    </fieldset>
  );
}

// 使用例: プラン選択
function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const planOptions = [
    { id: 'basic', value: 'basic', label: 'ベーシックプラン（¥1,000/月）' },
    { id: 'pro', value: 'pro', label: 'プロプラン（¥3,000/月）' },
    { id: 'enterprise', value: 'enterprise', label: 'エンタープライズ（カスタム価格）' },
  ];

  return (
    <fieldset>
      <legend>プランを選択</legend>
      <RadioGroup
        name="plan"
        options={planOptions}
        value={selectedPlan}
        onChange={setSelectedPlan}
        size="lg"
      />
    </fieldset>
  );
}

export { Radio, RadioGroup, ShippingForm, PlanSelector };
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
  <div class="ha-radio" size="md">
    <div class="radio-container">
      <input type="radio" id="example" name="group" value="option1">
      <div class="radio-circle">
        <div class="radio-dot"></div>
      </div>
      <label for="example">ラベルテキスト</label>
    </div>
  </div>
</body>
</html>
```

---

## ラジオボタングループ

ラジオボタンは通常、グループで使用されます。同じ `name` 属性を持つラジオボタンは自動的に相互排他的な選択を実現します。

### 基本的なグループ構造

```html
<fieldset>
  <legend>配送方法を選択</legend>

  <div class="radio-group">
    <label>
      <input type="radio" class="ha-radio" name="shipping" value="standard" checked>
      <span class="label">通常配送（3-5日）</span>
    </label>

    <label>
      <input type="radio" class="ha-radio" name="shipping" value="express">
      <span class="label">速達配送（1-2日）</span>
    </label>

    <label>
      <input type="radio" class="ha-radio" name="shipping" value="overnight">
      <span class="label">翌日配送</span>
    </label>
  </div>

  <p class="helper-text">配送方法を選択してください</p>
</fieldset>
```

### グループコンテナの推奨スタイル

```css
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3, 0.75rem);
}

.radio-group label {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2, 0.5rem);
  cursor: pointer;
  user-select: none;
}

.helper-text {
  margin-top: var(--spacing-2, 0.5rem);
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-text-secondary, #6b7280);
}
```

---

## HTML 属性テーブル

| 属性 | 値 | 説明 | 例 |
|------|-----|------|-----|
| `class` | `ha-radio` | ラジオボタンのクラス | `class="ha-radio"` |
| `type` | `radio` | HTML input タイプ | `type="radio"` |
| `name` | 文字列 | グループ識別子。同じグループは同じ name を共有 | `name="shipping"` |
| `value` | 文字列 | 選択時の値 | `value="express"` |
| `checked` | boolean | 初期選択状態 | `checked` |
| `disabled` | boolean | 操作不可状態 | `disabled` |
| `size` | `sm` \| `md` \| `lg` | サイズバリアント | `size="lg"` |
| `error` | boolean | エラー状態 | `error` |
| `aria-label` | 文字列 | アクセシブルな名前 | `aria-label="配送方法"` |
| `aria-describedby` | ID | エラーメッセージへの参照 | `aria-describedby="error-msg"` |

---

## デザイントークン

Radio コンポーネントで使用される主要なデザイントークン：

### サイズトークン

| トークン | 値 | 説明 |
|---------|-----|------|
| `size="sm"` width | 16px | 小サイズの幅 |
| `size="md"` width | 20px | 中サイズの幅（デフォルト） |
| `size="lg"` width | 24px | 大サイズの幅 |

### 色トークン

| トークン | 説明 |
|---------|------|
| `--border-default` | デフォルト・無効時のボーダー色 |
| `--background-tertiary` | 無効時の背景色 |
| `--foreground-tertiary` | 無効時のドット色 |
| `--color-primary-600` | #4f46e5 | チェック時のボーダー・ドット色 |
| `--color-primary-500` | #6366f1 | ホバー時のボーダー色 |
| `--color-danger-600` | #dc2626 | エラー時のボーダー・ドット色 |
| `--color-background` | #ffffff | デフォルト背景色 |
| `--color-text-primary` | #1a1a1a | ラベルテキスト色 |
| `--color-text-disabled` | #9ca3af | 無効時のテキスト色 |
| `--color-text-secondary` | #6b7280 | 説明テキスト色 |
| `--color-danger-700` | #b91c1c | エラー時のテキスト色 |

### スペーシングトークン

| トークン | 値 | 説明 |
|---------|-----|------|
| `--spacing-1` | 0.25rem | ラベルと説明の間隔 |
| `--spacing-2` | 0.5rem | ラジオボタンとラベルの間隔 |

---

## 使用例

### 基本的なラジオボタン

```html
<!-- 単純なラジオボタン -->
<label>
  <input type="radio" class="ha-radio" name="choice" value="yes" checked>
  <span>はい</span>
</label>

<label>
  <input type="radio" class="ha-radio" name="choice" value="no">
  <span>いいえ</span>
</label>
```

### 配送方法の選択

```html
<fieldset>
  <legend>配送方法を選択してください</legend>

  <div class="radio-group">
    <label>
      <input type="radio" class="ha-radio" size="md" name="shipping" value="standard" checked>
      <span class="label">通常配送（3-5日）</span>
    </label>

    <label>
      <input type="radio" class="ha-radio" size="md" name="shipping" value="express">
      <span class="label">速達配送（1-2日）</span>
    </label>

    <label>
      <input type="radio" class="ha-radio" size="md" name="shipping" value="overnight">
      <span class="label">翌日配送</span>
    </label>
  </div>

  <p class="helper-text">配送料金は選択方法によって異なります</p>
</fieldset>
```

### すべてのサイズを表示

```html
<div style="display: flex; flex-direction: column; gap: 2rem;">
  <!-- Small -->
  <div>
    <h4>Small (16px)</h4>
    <label>
      <input type="radio" class="ha-radio" size="sm" name="size-demo" value="sm">
      <span>Small オプション</span>
    </label>
  </div>

  <!-- Medium (Default) -->
  <div>
    <h4>Medium (20px)</h4>
    <label>
      <input type="radio" class="ha-radio" size="md" name="size-demo" value="md" checked>
      <span>Medium オプション</span>
    </label>
  </div>

  <!-- Large -->
  <div>
    <h4>Large (24px)</h4>
    <label>
      <input type="radio" class="ha-radio" size="lg" name="size-demo" value="lg">
      <span>Large オプション</span>
    </label>
  </div>
</div>
```

### 状態のデモ

```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
  <!-- デフォルト -->
  <div>
    <h4>デフォルト（未選択）</h4>
    <label>
      <input type="radio" class="ha-radio" name="state-demo" value="default">
      <span>オプション</span>
    </label>
  </div>

  <!-- チェック済み -->
  <div>
    <h4>チェック済み</h4>
    <label>
      <input type="radio" class="ha-radio" name="state-demo" value="checked" checked>
      <span>選択されています</span>
    </label>
  </div>

  <!-- 無効 -->
  <div>
    <h4>無効</h4>
    <label>
      <input type="radio" class="ha-radio" name="state-demo" value="disabled" disabled>
      <span>操作不可</span>
    </label>
  </div>

  <!-- チェック済み + 無効 -->
  <div>
    <h4>チェック済み + 無効</h4>
    <label>
      <input type="radio" class="ha-radio" name="state-demo" value="checked-disabled" checked disabled>
      <span>選択済み（変更不可）</span>
    </label>
  </div>

  <!-- エラー -->
  <div>
    <h4>エラー</h4>
    <label>
      <input type="radio" class="ha-radio" name="state-demo" value="error" error>
      <span>エラー状態</span>
    </label>
  </div>

  <!-- エラー + チェック済み -->
  <div>
    <h4>エラー + チェック済み</h4>
    <label>
      <input type="radio" class="ha-radio" name="state-demo" value="error-checked" error checked>
      <span>エラーで選択中</span>
    </label>
  </div>
</div>
```

### プランの選択

```html
<fieldset>
  <legend>プランを選択</legend>

  <div class="radio-group">
    <label>
      <input type="radio" class="ha-radio" size="lg" name="plan" value="basic" checked>
      <div>
        <div class="label">ベーシックプラン</div>
        <div class="description">¥1,000/月 - 基本機能</div>
      </div>
    </label>

    <label>
      <input type="radio" class="ha-radio" size="lg" name="plan" value="pro">
      <div>
        <div class="label">プロプラン</div>
        <div class="description">¥3,000/月 - 全機能</div>
      </div>
    </label>

    <label>
      <input type="radio" class="ha-radio" size="lg" name="plan" value="enterprise">
      <div>
        <div class="label">エンタープライズ</div>
        <div class="description">カスタム価格 - 専任サポート</div>
      </div>
    </label>
  </div>
</fieldset>

<style>
  .radio-group label {
    gap: var(--spacing-3, 0.75rem);
  }

  .description {
    font-size: var(--font-size-sm, 0.875rem);
    color: var(--color-text-secondary, #6b7280);
  }
</style>
```

### エラー処理

```html
<fieldset aria-invalid="true">
  <legend>支払い方法</legend>

  <div class="radio-group">
    <label>
      <input
        type="radio"
        class="ha-radio"
        name="payment"
        value="card"
        error
        aria-describedby="payment-error"
      >
      <span>クレジットカード</span>
    </label>

    <label>
      <input
        type="radio"
        class="ha-radio"
        name="payment"
        value="bank"
        error
        aria-describedby="payment-error"
      >
      <span>銀行振込</span>
    </label>
  </div>

  <p id="payment-error" class="error-message">
    支払い方法を選択してください
  </p>
</fieldset>

<style>
  .error-message {
    color: var(--color-danger-700, #b91c1c);
    font-size: var(--font-size-sm, 0.875rem);
    margin-top: var(--spacing-2, 0.5rem);
  }
</style>
```

---

## アクセシビリティ

Radio コンポーネントはアクセシビリティ標準に準拠しています。

### キーボード操作

| キー | 動作 | 説明 |
|------|------|------|
| **Tab** | フォーカス移動 | ラジオボタングループにフォーカスを移動 |
| **Shift + Tab** | 前へフォーカス移動 | 前の要素にフォーカスを移動 |
| **↑ / ←** | 前のラジオボタン | グループ内の前のラジオボタンを選択 |
| **↓ / →** | 次のラジオボタン | グループ内の次のラジオボタンを選択 |
| **Space** | 選択/確認 | フォーカスされたラジオボタンを選択 |

### ARIA 属性

**fieldset と legend を使用したグループ化:**

```html
<fieldset>
  <legend>配送方法の選択</legend>

  <div class="radio-group">
    <label>
      <input
        type="radio"
        class="ha-radio"
        name="shipping"
        value="standard"
        aria-describedby="shipping-help"
      >
      <span>通常配送</span>
    </label>

    <label>
      <input
        type="radio"
        class="ha-radio"
        name="shipping"
        value="express"
        aria-describedby="shipping-help"
      >
      <span>速達配送</span>
    </label>
  </div>

  <p id="shipping-help" role="doc-subtitle">
    配送料金は選択方法によって異なります
  </p>
</fieldset>
```

**エラー状態の処理:**

```html
<fieldset aria-invalid="true">
  <legend>必須項目</legend>

  <label>
    <input
      type="radio"
      class="ha-radio"
      name="required"
      value="yes"
      error
      aria-invalid="true"
      aria-describedby="error-msg"
    >
    <span>同意する</span>
  </label>

  <p id="error-msg" role="alert" class="error-message">
    この項目は必須です
  </p>
</fieldset>
```

### フォーカスス タイル

- **フォーカスリング幅:** 2px
- **フォーカスリングオフセット:** 2px
- **リング色:** プライマリカラー (primary-600)
- **コントラスト比:** WCAG AA 以上

フォーカススタイルは CSS で自動適用されます：

```css
input:focus-visible + .radio-circle {
  outline: 2px solid var(--color-primary-600, #4f46e5);
  outline-offset: 2px;
}
```

### セマンティック HTML

常にセマンティックな HTML 構造を使用してください：

```html
<!-- ✅ 推奨: label と input を正しく関連付け -->
<label>
  <input type="radio" class="ha-radio" name="option" value="1">
  <span>オプション 1</span>
</label>

<!-- ✅ 推奨: id と for を使用した明示的な関連付け -->
<input type="radio" id="option-1" class="ha-radio" name="option" value="1">
<label for="option-1">オプション 1</label>

<!-- ❌ 非推奨: label なし -->
<input type="radio" class="ha-radio" name="option" value="1">
```

---

## ベストプラクティス

### ✅ 推奨事項

1. **相互排他的な選択肢**
   - 1つだけ選択可能な場合のみ使用
   - 複数選択はチェックボックスを使用

   ```html
   <!-- ✅ 良い例：相互排他的 -->
   <input type="radio" name="size" value="s">
   <input type="radio" name="size" value="m">
   <input type="radio" name="size" value="l">
   ```

2. **fieldset でグループ化**
   - 関連するラジオボタンは `<fieldset>` と `<legend>` でグループ化
   - アクセシビリティと構造が向上

   ```html
   <!-- ✅ 良い例：fieldset でグループ化 -->
   <fieldset>
     <legend>サイズを選択</legend>
     <label><input type="radio" name="size" value="s"> Small</label>
     <label><input type="radio" name="size" value="m"> Medium</label>
   </fieldset>
   ```

3. **適切なデフォルト値**
   - ほとんどの場合、適切なデフォルト値を設定
   - ユーザーが最初のステップでは既に選択肢が選ばれている状態

   ```html
   <!-- ✅ 良い例：デフォルト選択 -->
   <input type="radio" name="shipping" value="standard" checked>
   <input type="radio" name="shipping" value="express">
   ```

4. **明確で簡潔なラベル**
   - 何を選択するのか一目瞭然
   - 短く、わかりやすいテキスト

   ```html
   <!-- ✅ 良い例：明確なラベル -->
   <label>
     <input type="radio" name="payment" value="card">
     <span>クレジットカード</span>
   </label>

   <!-- ❌ 悪い例：曖昧なラベル -->
   <label>
     <input type="radio" name="payment" value="card">
     <span>オプション 1</span>
   </label>
   ```

5. **サイズの適切な選択**
   - デスクトップ: `size="md"`（デフォルト）
   - モバイル: `size="lg"` でアクセスしやすく
   - 密集したUI: `size="sm"` でコンパクトに

   ```html
   <!-- ✅ 良い例：コンテキストに応じたサイズ -->
   <input type="radio" class="ha-radio" size="lg" name="option" value="1">
   ```

6. **説明とヘルパーテキスト**
   - 複雑な選択肢は説明を追加
   - エラーメッセージは明確に

   ```html
   <!-- ✅ 良い例：説明付き -->
   <label>
     <input type="radio" name="plan" value="pro">
     <div>
       <div>プロプラン</div>
       <div class="description">全機能とプレミアムサポート</div>
     </div>
   </label>
   ```

### ❌ 避けるべき事項

1. **複数選択で使用**
   - 複数選択が必要な場合はチェックボックス（checkbox）を使用

   ```html
   <!-- ❌ 悪い例：複数選択なのにラジオボタン -->
   <input type="radio" name="interests" value="tech">
   <input type="radio" name="interests" value="sports">

   <!-- ✅ 正しい例：チェックボックスを使用 -->
   <input type="checkbox" name="interests" value="tech">
   <input type="checkbox" name="interests" value="sports">
   ```

2. **単一のラジオボタン**
   - ラジオボタンは常にグループで使用
   - 単一の切り替えはチェックボックスまたはスイッチを使用

   ```html
   <!-- ❌ 悪い例：単一のラジオボタン -->
   <input type="radio" name="agree" value="yes">

   <!-- ✅ 正しい例：チェックボックスを使用 -->
   <input type="checkbox" name="agree">
   ```

3. **グループ化なし**
   - 関連するラジオボタンは必ずグループ化
   - 視覚的な関連性を示す

   ```html
   <!-- ❌ 悪い例：グループ化なし -->
   <input type="radio" name="color" value="red">
   <p>何か他の内容</p>
   <input type="radio" name="color" value="blue">

   <!-- ✅ 良い例：グループ化 -->
   <fieldset>
     <legend>色を選択</legend>
     <div class="radio-group">
       <label><input type="radio" name="color" value="red"> 赤</label>
       <label><input type="radio" name="color" value="blue"> 青</label>
     </div>
   </fieldset>
   ```

4. **多すぎる選択肢**
   - 6個以上の選択肢はドロップダウン（select）を検討
   - ラジオボタンは 2-5 個が最適

   ```html
   <!-- ❌ 悪い例：多すぎるラジオボタン -->
   <input type="radio" name="country" value="jp">
   <input type="radio" name="country" value="us">
   <input type="radio" name="country" value="uk">
   <input type="radio" name="country" value="fr">
   <input type="radio" name="country" value="de">
   <input type="radio" name="country" value="it">
   <!-- ... さらに 20 個 ... -->

   <!-- ✅ 正しい例：セレクトボックスを使用 -->
   <select name="country">
     <option value="jp">日本</option>
     <option value="us">アメリカ</option>
     <!-- ... -->
   </select>
   ```

5. **ラベルなし**
   - 必ずラベルテキストを提供
   - スクリーンリーダー利用者の理解度向上

   ```html
   <!-- ❌ 悪い例：ラベルなし -->
   <input type="radio" name="option" value="1">

   <!-- ✅ 良い例：ラベル付き -->
   <label>
     <input type="radio" name="option" value="1">
     <span>オプション 1</span>
   </label>
   ```

---

## CSS クラス構造

Radio コンポーネントは Web Component として実装されており、以下の内部クラス構造を持ちます：

```html
<input
  type="radio"
  class="ha-radio"
  name="example"
  size="md"
/>

<!-- 内部 DOM (Web Component) -->
<!--
<div class="radio-container">
  <input type="radio" /> (hidden)
  <div class="radio-circle">
    <div class="radio-dot"></div>
  </div>
</div>
<div class="label-wrapper">
  <label class="label"></label>
  <div class="description"></div>
</div>
-->
```

### 主要なスタイルクラス

| クラス | 説明 |
|--------|------|
| `.ha-radio` | ラジオボタンのメインクラス |
| `.radio-container` | ラジオボタンと内部要素のコンテナ |
| `.radio-circle` | 外側のサークル（ボーダーと背景） |
| `.radio-dot` | 内側のドット（チェック時のみ表示） |
| `.label-wrapper` | ラベルと説明を保持するラッパー |
| `.label` | ラベルテキスト |
| `.description` | 説明テキスト |

---

## 関連コンポーネント

- **[Checkbox](./checkbox.md)** - 複数選択が必要な場合
- **[Switch](./switch.md)** - オン/オフの単純な切り替え
- **[Select](./select.md)** - 6個以上の選択肢がある場合
- **[Input](./input.md)** - テキスト入力フィールド
- **[Button](./button.md)** - アクション実行ボタン

---

## 関連ドキュメント

- [コンポーネント一覧](./README.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [デザイントークン](../../tokens.md)

---

## ブラウザサポート

Radio コンポーネントは以下のブラウザでサポートされています：

- Chrome/Edge: 最新 2 バージョン
- Firefox: 最新 2 バージョン
- Safari: 最新 2 バージョン
- iOS Safari: 12+
- Android Browser: 5+

標準的な HTML `<input type="radio">` 要素に基づいているため、優れたブラウザ互換性があります。
