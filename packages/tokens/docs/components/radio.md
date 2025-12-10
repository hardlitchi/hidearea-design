# Radio (ラジオボタン) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/components/forms/radio.yaml`
**ステータス:** ✅ 実装済み (Phase 4)

---

## 概要

ラジオボタンコンポーネントは、ユーザーが複数の選択肢から1つだけを選択できるようにするフォーム要素です。グループ内で相互排他的な選択を提供します。

### 用途

- アンケートの単一選択回答
- 配送方法の選択
- 支払い方法の選択
- 設定オプションの選択

---

## サイズバリアント

### 1. Small (小)

コンパクトな場所で使用する小さいラジオボタンです。

**サイズ:** 16px (1rem)
**インジケーター:** 6px (0.375rem)
**使用場面:**
- 密集したフォーム
- サイドバーの選択項目
- コンパクトなリスト

**トークン:** `component.radio.size.small`

### 2. Default (デフォルト)

標準サイズのラジオボタンです。最も一般的に使用されます。

**サイズ:** 20px (1.25rem)
**インジケーター:** 8px (0.5rem)
**使用場面:**
- 通常のフォーム
- 設定画面
- チェックアウトフロー

**トークン:** `component.radio.size.default`

### 3. Large (大)

視認性を高めたい場合に使用する大きなラジオボタンです。

**サイズ:** 24px (1.5rem)
**インジケーター:** 10px (0.625rem)
**使用場面:**
- 重要な選択項目
- モバイルUI
- タッチターゲットを大きくしたい場合

**トークン:** `component.radio.size.large`

---

## 状態

### Default (デフォルト)
未選択の通常状態です。

### Selected (選択済み)
選択されている状態で、内側に円形のインジケーターが表示されます。

### Hover (ホバー)
マウスカーソルがラジオボタン上にある状態です。

### Focus (フォーカス)
キーボードフォーカスがある状態で、フォーカスリングが表示されます。

### Disabled (無効)
操作できない状態で、視覚的に無効であることを示します。

### Selected + Disabled (選択済み + 無効)
選択済みで無効な状態です。

### Error (エラー)
バリデーションエラーがある状態です。

---

## トークン一覧

### Size (サイズ)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.radio.size.default` | `1.25rem` | デフォルトサイズ (20px) |
| `component.radio.size.small` | `1rem` | 小サイズ (16px) |
| `component.radio.size.large` | `1.5rem` | 大サイズ (24px) |

### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.radio.background.default` | `{background.primary}` | デフォルト状態の背景色 |
| `component.radio.background.selected` | `{background.primary}` | 選択時も背景は同じ |
| `component.radio.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.radio.background.disabled` | `{background.tertiary}` | 無効時の背景色 |

### Border (ボーダー色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.radio.border.default` | `{border.default}` | デフォルトのボーダー色 |
| `component.radio.border.hover` | `{border.strong}` | ホバー時のボーダー色 |
| `component.radio.border.selected` | `{primary.default}` | 選択時のボーダー色 |
| `component.radio.border.focus` | `{primary.default}` | フォーカス時のボーダー色 |
| `component.radio.border.disabled` | `{border.subtle}` | 無効時のボーダー色 |
| `component.radio.border.error` | `{error.default}` | エラー時のボーダー色 |

### Indicator (インジケーター - 内側の円)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.radio.indicator.default` | `{primary.default}` | インジケーターの色 |
| `component.radio.indicator.disabled` | `{border.default}` | 無効時のインジケーター色 |
| `component.radio.indicator.size.default` | `0.5rem` | インジケーターサイズ (8px) |
| `component.radio.indicator.size.small` | `0.375rem` | 小サイズのインジケーター (6px) |
| `component.radio.indicator.size.large` | `0.625rem` | 大サイズのインジケーター (10px) |

### Focus Ring (フォーカスリング)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.radio.focusRing.width` | `3px` | フォーカスリングの幅 |
| `component.radio.focusRing.offset` | `2px` | フォーカスリングのオフセット |
| `component.radio.focusRing.color.default` | `{primary.subtle}` | フォーカスリングの色 |
| `component.radio.focusRing.color.error` | `{error.subtle}` | エラー時のフォーカスリング色 |

### Label (ラベル)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.radio.label.fontSize` | `{font.size.base}` | ラベルのフォントサイズ |
| `component.radio.label.fontWeight` | `{font.weight.normal}` | ラベルのフォントウェイト |
| `component.radio.label.color.default` | `{foreground.primary}` | ラベルの色 |
| `component.radio.label.color.disabled` | `{foreground.tertiary}` | 無効時のラベル色 |
| `component.radio.label.spacing` | `{spacing.2}` | ラジオボタンとラベルの間隔 |

### Helper Text (ヘルパーテキスト)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.radio.helper.fontSize` | `{font.size.sm}` | ヘルパーテキストのフォントサイズ |
| `component.radio.helper.color.default` | `{foreground.secondary}` | ヘルパーテキストの色 |
| `component.radio.helper.color.error` | `{error.default}` | エラー時のヘルパーテキスト色 |
| `component.radio.helper.spacing` | `{spacing.2}` | ラベルとヘルパーテキストの間隔 |

### Group (グループスペーシング)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.radio.group.spacing` | `{spacing.3}` | ラジオボタングループ内の要素間隔 |

---

## 使用例

### HTML

```html
<!-- 基本的なラジオボタングループ -->
<div class="radio-group">
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="shipping" class="radio" value="standard" checked>
      <span class="radio-text">通常配送（3-5日）</span>
    </label>
  </div>
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="shipping" class="radio" value="express">
      <span class="radio-text">速達配送（1-2日）</span>
    </label>
  </div>
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="shipping" class="radio" value="overnight">
      <span class="radio-text">翌日配送</span>
    </label>
  </div>
  <span class="radio-helper">配送方法を選択してください</span>
</div>

<!-- 小サイズ -->
<div class="radio-group">
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="size" class="radio radio-small" value="s" checked>
      <span class="radio-text">Small</span>
    </label>
  </div>
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="size" class="radio radio-small" value="m">
      <span class="radio-text">Medium</span>
    </label>
  </div>
</div>

<!-- 大サイズ -->
<div class="radio-group">
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="plan" class="radio radio-large" value="basic" checked>
      <span class="radio-text">ベーシックプラン</span>
    </label>
  </div>
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="plan" class="radio radio-large" value="pro">
      <span class="radio-text">プロプラン</span>
    </label>
  </div>
</div>

<!-- エラー状態 -->
<div class="radio-group">
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="payment" class="radio radio-error" value="card">
      <span class="radio-text">クレジットカード</span>
    </label>
  </div>
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="payment" class="radio radio-error" value="bank">
      <span class="radio-text">銀行振込</span>
    </label>
  </div>
  <span class="radio-helper radio-helper-error">支払い方法を選択してください</span>
</div>

<!-- 無効状態 -->
<div class="radio-group">
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="disabled" class="radio" value="1" disabled>
      <span class="radio-text">利用不可</span>
    </label>
  </div>
  <div class="radio-item">
    <label class="radio-label">
      <input type="radio" name="disabled" class="radio" value="2" checked disabled>
      <span class="radio-text">選択済み（変更不可）</span>
    </label>
  </div>
</div>
```

### CSS

```css
/* ラジオボタングループ */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--component-radio-helper-spacing);
}

/* ラジオボタン項目 */
.radio-item {
  display: flex;
  flex-direction: column;
  gap: var(--component-radio-group-spacing);
}

/* ラベル */
.radio-label {
  display: inline-flex;
  align-items: center;
  gap: var(--component-radio-label-spacing);
  cursor: pointer;
  font-size: var(--component-radio-label-font-size);
  font-weight: var(--component-radio-label-font-weight);
  color: var(--component-radio-label-color-default);
  user-select: none;
}

.radio-label:has(.radio:disabled) {
  color: var(--component-radio-label-color-disabled);
  cursor: not-allowed;
}

/* ラジオボタン本体 */
.radio {
  appearance: none;
  width: var(--component-radio-size-default);
  height: var(--component-radio-size-default);
  background-color: var(--component-radio-background-default);
  border: var(--component-radio-border-width-default) solid var(--component-radio-border-default);
  border-radius: var(--component-radio-border-radius-default); /* 円形 */
  cursor: pointer;
  position: relative;
  transition: var(--component-radio-transition-properties)
              var(--component-radio-transition-duration)
              var(--component-radio-transition-timing);
}

.radio:hover:not(:disabled) {
  background-color: var(--component-radio-background-hover);
  border-color: var(--component-radio-border-hover);
}

.radio:focus {
  outline: none;
  border-color: var(--component-radio-border-focus);
  box-shadow: 0 0 0 var(--component-radio-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-radio-focus-ring-width) + var(--component-radio-focus-ring-offset))
                var(--component-radio-focus-ring-color-default);
}

.radio:checked {
  background-color: var(--component-radio-background-selected);
  border-color: var(--component-radio-border-selected);
}

/* インジケーター（内側の円） */
.radio:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: var(--component-radio-indicator-size-default);
  height: var(--component-radio-indicator-size-default);
  background-color: var(--component-radio-indicator-default);
  border-radius: 50%;
}

/* 無効状態 */
.radio:disabled {
  background-color: var(--component-radio-background-disabled);
  border-color: var(--component-radio-border-disabled);
  cursor: not-allowed;
}

.radio:checked:disabled::after {
  background-color: var(--component-radio-indicator-disabled);
}

/* エラー状態 */
.radio-error {
  border-color: var(--component-radio-border-error);
}

.radio-error:focus {
  box-shadow: 0 0 0 var(--component-radio-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-radio-focus-ring-width) + var(--component-radio-focus-ring-offset))
                var(--component-radio-focus-ring-color-error);
}

/* サイズバリアント */
.radio-small {
  width: var(--component-radio-size-small);
  height: var(--component-radio-size-small);
}

.radio-small:checked::after {
  width: var(--component-radio-indicator-size-small);
  height: var(--component-radio-indicator-size-small);
}

.radio-large {
  width: var(--component-radio-size-large);
  height: var(--component-radio-size-large);
}

.radio-large:checked::after {
  width: var(--component-radio-indicator-size-large);
  height: var(--component-radio-indicator-size-large);
}

/* ヘルパーテキスト */
.radio-helper {
  font-size: var(--component-radio-helper-font-size);
  color: var(--component-radio-helper-color-default);
  margin-left: calc(var(--component-radio-size-default) + var(--component-radio-label-spacing));
}

.radio-helper-error {
  color: var(--component-radio-helper-color-error);
}
```

### React

```tsx
import React from 'react';

type RadioSize = 'small' | 'default' | 'large';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  helper?: string;
  error?: boolean;
  size?: RadioSize;
  disabled?: boolean;
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  helper,
  error = false,
  size = 'default',
  disabled = false,
}: RadioGroupProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const sizeClass = size !== 'default' ? `radio-${size}` : '';
  const errorClass = error ? 'radio-error' : '';

  return (
    <div className="radio-group">
      {options.map((option) => (
        <div key={option.value} className="radio-item">
          <label className="radio-label">
            <input
              type="radio"
              className={`radio ${sizeClass} ${errorClass}`.trim()}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              disabled={disabled || option.disabled}
            />
            <span className="radio-text">{option.label}</span>
          </label>
        </div>
      ))}
      {helper && (
        <span className={`radio-helper ${error ? 'radio-helper-error' : ''}`}>
          {helper}
        </span>
      )}
    </div>
  );
}

// 使用例
<RadioGroup
  name="shipping"
  value={shippingMethod}
  onChange={setShippingMethod}
  options={[
    { value: 'standard', label: '通常配送（3-5日）' },
    { value: 'express', label: '速達配送（1-2日）' },
    { value: 'overnight', label: '翌日配送', disabled: true },
  ]}
  error={!shippingMethod && submitted}
  helper={
    !shippingMethod && submitted
      ? '配送方法を選択してください'
      : '配送方法を選択してください'
  }
/>
```

---

## アクセシビリティ

### キーボード操作

- **Tab**: ラジオボタングループにフォーカス
- **↑/↓ または ←/→**: グループ内の次/前のラジオボタンを選択
- **Space**: フォーカスされたラジオボタンを選択
- **Shift + Tab**: 前の要素にフォーカス

### ARIA属性

```html
<!-- fieldset を使用したグループ化 -->
<fieldset>
  <legend>配送方法</legend>
  <div class="radio-group">
    <div class="radio-item">
      <label class="radio-label">
        <input
          type="radio"
          name="shipping"
          class="radio"
          value="standard"
          checked
          aria-describedby="shipping-helper"
        >
        <span class="radio-text">通常配送</span>
      </label>
    </div>
    <div class="radio-item">
      <label class="radio-label">
        <input
          type="radio"
          name="shipping"
          class="radio"
          value="express"
        >
        <span class="radio-text">速達配送</span>
      </label>
    </div>
    <span id="shipping-helper" class="radio-helper">
      配送方法を選択してください
    </span>
  </div>
</fieldset>

<!-- エラー状態 -->
<fieldset aria-invalid="true">
  <legend>支払い方法</legend>
  <div class="radio-group">
    <div class="radio-item">
      <label class="radio-label">
        <input
          type="radio"
          name="payment"
          class="radio radio-error"
          value="card"
          aria-describedby="payment-error"
        >
        <span class="radio-text">クレジットカード</span>
      </label>
    </div>
    <span id="payment-error" class="radio-helper radio-helper-error">
      支払い方法を選択してください
    </span>
  </div>
</fieldset>
```

### フォーカススタイル

フォーカスリングは WCAG 2.1 のアクセシビリティガイドラインに準拠しています：
- 3px の幅
- 2px のオフセット
- 十分なコントラスト比

---

## ベストプラクティス

### ✅ 推奨

1. **明確な選択肢**
   - 各オプションは相互排他的に
   - わかりやすいラベル

2. **fieldset でグループ化**
   - 関連するラジオボタンは `<fieldset>` と `<legend>` でグループ化

3. **デフォルト選択**
   - 可能な限り適切なデフォルトを設定
   - 必須フィールドは最初から1つ選択しておく

4. **適切な選択肢の数**
   - 2-5個が理想的
   - それ以上はドロップダウンを検討

5. **説明的なヘルパーテキスト**
   - 必要に応じて選択肢の説明を追加

### ❌ 非推奨

1. **複数選択可能な場合**
   - Checkbox を使用すべき

2. **単一のラジオボタン**
   - Checkbox を使用すべき

3. **多すぎる選択肢**
   - 6個以上の場合は Select を検討

4. **グループ化なし**
   - 関連するラジオボタンは必ずグループ化

5. **ラベルなし**
   - 必ずラベルテキストを提供

---

## バリエーション

### 説明付きラジオボタン

```html
<div class="radio-item">
  <label class="radio-label">
    <input type="radio" name="plan" class="radio" value="pro">
    <div class="radio-content">
      <span class="radio-text">プロプラン</span>
      <span class="radio-description">すべての機能が利用可能</span>
    </div>
  </label>
</div>
```

```css
.radio-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.radio-description {
  font-size: var(--font-size-sm);
  color: var(--foreground-secondary);
}
```

### カード型ラジオボタン

```html
<label class="radio-card">
  <input type="radio" name="plan" class="radio-card-input" value="basic">
  <div class="radio-card-content">
    <h4>ベーシックプラン</h4>
    <p>¥1,000/月</p>
  </div>
</label>
```

---

## テーマ対応

全てのラジオボタントークンはテーマに対応しています。`data-theme` 属性の変更で自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <label class="radio-label">
    <input type="radio" name="option" class="radio" checked>
    <span class="radio-text">オプション</span>
  </label>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <label class="radio-label">
    <input type="radio" name="option" class="radio" checked>
    <span class="radio-text">オプション</span>
  </label>
</html>
```

---

## 関連コンポーネント

- [Checkbox](./checkbox.md) - 複数選択用
- [Switch](./switch.md) - オン/オフ切り替え
- [Select](./select.md) - ドロップダウン選択
- [Button](./button.md) - アクション実行

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)
