# Checkbox (チェックボックス) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/components/forms/checkbox.yaml`
**ステータス:** ✅ 実装済み (Phase 4)

---

## 概要

チェックボックスコンポーネントは、ユーザーが複数の選択肢から0個以上のオプションを選択できるようにするフォーム要素です。オン/オフの状態を表現し、独立した選択が可能です。

### 用途

- 利用規約への同意
- 複数選択フィルター
- タスク完了のマーク
- オプション機能の有効/無効切り替え

---

## サイズバリアント

### 1. Small (小)

コンパクトな場所で使用する小さいチェックボックスです。

**サイズ:** 16px (1rem)
**使用場面:**
- 密集したテーブル内
- コンパクトなフォーム
- サイドバーの設定項目

**トークン:** `component.checkbox.size.small`

### 2. Default (デフォルト)

標準サイズのチェックボックスです。最も一般的に使用されます。

**サイズ:** 20px (1.25rem)
**使用場面:**
- 通常のフォーム
- 設定画面
- リスト項目の選択

**トークン:** `component.checkbox.size.default`

### 3. Large (大)

視認性を高めたい場合に使用する大きなチェックボックスです。

**サイズ:** 24px (1.5rem)
**使用場面:**
- 重要な同意項目
- モバイルUI
- タッチターゲットを大きくしたい場合

**トークン:** `component.checkbox.size.large`

---

## 状態

### Default (デフォルト)
未選択の通常状態です。

### Checked (チェック済み)
選択されている状態で、チェックマークが表示されます。

### Hover (ホバー)
マウスカーソルがチェックボックス上にある状態です。

### Checked + Hover (チェック済み + ホバー)
選択済みでホバーしている状態です。

### Focus (フォーカス)
キーボードフォーカスがある状態で、フォーカスリングが表示されます。

### Disabled (無効)
操作できない状態で、視覚的に無効であることを示します。

### Checked + Disabled (チェック済み + 無効)
選択済みで無効な状態です。

### Error (エラー)
バリデーションエラーがある状態です。

---

## トークン一覧

### Size (サイズ)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.checkbox.size.default` | `1.25rem` | デフォルトサイズ (20px) |
| `component.checkbox.size.small` | `1rem` | 小サイズ (16px) |
| `component.checkbox.size.large` | `1.5rem` | 大サイズ (24px) |

### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.checkbox.background.default` | `{background.primary}` | デフォルト状態の背景色 |
| `component.checkbox.background.checked` | `{primary.default}` | チェック時の背景色 |
| `component.checkbox.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.checkbox.background.checkedHover` | `{primary.hover}` | チェック済みホバー時 |
| `component.checkbox.background.disabled` | `{background.tertiary}` | 無効時の背景色 |
| `component.checkbox.background.checkedDisabled` | `{border.default}` | チェック済み無効時 |

### Border (ボーダー色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.checkbox.border.default` | `{border.default}` | デフォルトのボーダー色 |
| `component.checkbox.border.hover` | `{border.strong}` | ホバー時のボーダー色 |
| `component.checkbox.border.checked` | `{primary.default}` | チェック時のボーダー色 |
| `component.checkbox.border.focus` | `{primary.default}` | フォーカス時のボーダー色 |
| `component.checkbox.border.disabled` | `{border.subtle}` | 無効時のボーダー色 |
| `component.checkbox.border.error` | `{error.default}` | エラー時のボーダー色 |

### Checkmark (チェックマーク色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.checkbox.checkmark.default` | `{foreground.inverse}` | チェックマークの色 |
| `component.checkbox.checkmark.disabled` | `{foreground.tertiary}` | 無効時のチェックマーク色 |

### Focus Ring (フォーカスリング)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.checkbox.focusRing.width` | `3px` | フォーカスリングの幅 |
| `component.checkbox.focusRing.offset` | `2px` | フォーカスリングのオフセット |
| `component.checkbox.focusRing.color.default` | `{primary.subtle}` | フォーカスリングの色 |
| `component.checkbox.focusRing.color.error` | `{error.subtle}` | エラー時のフォーカスリング色 |

### Label (ラベル)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.checkbox.label.fontSize` | `{font.size.base}` | ラベルのフォントサイズ |
| `component.checkbox.label.fontWeight` | `{font.weight.normal}` | ラベルのフォントウェイト |
| `component.checkbox.label.color.default` | `{foreground.primary}` | ラベルの色 |
| `component.checkbox.label.color.disabled` | `{foreground.tertiary}` | 無効時のラベル色 |
| `component.checkbox.label.spacing` | `{spacing.2}` | チェックボックスとラベルの間隔 |

### Helper Text (ヘルパーテキスト)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.checkbox.helper.fontSize` | `{font.size.sm}` | ヘルパーテキストのフォントサイズ |
| `component.checkbox.helper.color.default` | `{foreground.secondary}` | ヘルパーテキストの色 |
| `component.checkbox.helper.color.error` | `{error.default}` | エラー時のヘルパーテキスト色 |
| `component.checkbox.helper.spacing` | `{spacing.2}` | ラベルとヘルパーテキストの間隔 |

---

## 使用例

### HTML

```html
<!-- 基本的なチェックボックス -->
<div class="checkbox-group">
  <label class="checkbox-label">
    <input type="checkbox" class="checkbox" checked>
    <span class="checkbox-text">利用規約に同意する</span>
  </label>
  <span class="checkbox-helper">必須項目です</span>
</div>

<!-- 小サイズ -->
<label class="checkbox-label">
  <input type="checkbox" class="checkbox checkbox-small">
  <span class="checkbox-text">メール通知を受け取る</span>
</label>

<!-- 大サイズ -->
<label class="checkbox-label">
  <input type="checkbox" class="checkbox checkbox-large" checked>
  <span class="checkbox-text">重要な同意事項</span>
</label>

<!-- エラー状態 -->
<div class="checkbox-group">
  <label class="checkbox-label">
    <input type="checkbox" class="checkbox checkbox-error">
    <span class="checkbox-text">必須項目</span>
  </label>
  <span class="checkbox-helper checkbox-helper-error">この項目は必須です</span>
</div>

<!-- 無効状態 -->
<label class="checkbox-label">
  <input type="checkbox" class="checkbox" disabled>
  <span class="checkbox-text">無効なオプション</span>
</label>
```

### CSS

```css
/* チェックボックスグループ */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--component-checkbox-label-spacing);
}

/* ラベル */
.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: var(--component-checkbox-label-spacing);
  cursor: pointer;
  font-size: var(--component-checkbox-label-font-size);
  font-weight: var(--component-checkbox-label-font-weight);
  color: var(--component-checkbox-label-color-default);
  user-select: none;
}

.checkbox-label:has(.checkbox:disabled) {
  color: var(--component-checkbox-label-color-disabled);
  cursor: not-allowed;
}

/* チェックボックス本体 */
.checkbox {
  appearance: none;
  width: var(--component-checkbox-size-default);
  height: var(--component-checkbox-size-default);
  background-color: var(--component-checkbox-background-default);
  border: var(--component-checkbox-border-width-default) solid var(--component-checkbox-border-default);
  border-radius: var(--component-checkbox-border-radius-default);
  cursor: pointer;
  position: relative;
  transition: var(--component-checkbox-transition-properties)
              var(--component-checkbox-transition-duration)
              var(--component-checkbox-transition-timing);
}

.checkbox:hover:not(:disabled) {
  background-color: var(--component-checkbox-background-hover);
  border-color: var(--component-checkbox-border-hover);
}

.checkbox:focus {
  outline: none;
  border-color: var(--component-checkbox-border-focus);
  box-shadow: 0 0 0 var(--component-checkbox-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-checkbox-focus-ring-width) + var(--component-checkbox-focus-ring-offset))
                var(--component-checkbox-focus-ring-color-default);
}

.checkbox:checked {
  background-color: var(--component-checkbox-background-checked);
  border-color: var(--component-checkbox-border-checked);
}

.checkbox:checked:hover:not(:disabled) {
  background-color: var(--component-checkbox-background-checked-hover);
}

/* チェックマーク */
.checkbox:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40%;
  height: 60%;
  border: solid var(--component-checkbox-checkmark-default);
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -60%) rotate(45deg);
}

/* 無効状態 */
.checkbox:disabled {
  background-color: var(--component-checkbox-background-disabled);
  border-color: var(--component-checkbox-border-disabled);
  cursor: not-allowed;
}

.checkbox:checked:disabled {
  background-color: var(--component-checkbox-background-checked-disabled);
}

.checkbox:checked:disabled::after {
  border-color: var(--component-checkbox-checkmark-disabled);
}

/* エラー状態 */
.checkbox-error {
  border-color: var(--component-checkbox-border-error);
}

.checkbox-error:focus {
  box-shadow: 0 0 0 var(--component-checkbox-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-checkbox-focus-ring-width) + var(--component-checkbox-focus-ring-offset))
                var(--component-checkbox-focus-ring-color-error);
}

/* サイズバリアント */
.checkbox-small {
  width: var(--component-checkbox-size-small);
  height: var(--component-checkbox-size-small);
}

.checkbox-large {
  width: var(--component-checkbox-size-large);
  height: var(--component-checkbox-size-large);
}

/* ヘルパーテキスト */
.checkbox-helper {
  font-size: var(--component-checkbox-helper-font-size);
  color: var(--component-checkbox-helper-color-default);
  margin-left: calc(var(--component-checkbox-size-default) + var(--component-checkbox-label-spacing));
}

.checkbox-helper-error {
  color: var(--component-checkbox-helper-color-error);
}
```

### React

```tsx
import React from 'react';

type CheckboxSize = 'small' | 'default' | 'large';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
  helper?: string;
  error?: boolean;
  disabled?: boolean;
  size?: CheckboxSize;
  name?: string;
}

export function Checkbox({
  checked = false,
  onChange,
  label,
  helper,
  error = false,
  disabled = false,
  size = 'default',
  name,
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const sizeClass = size !== 'default' ? `checkbox-${size}` : '';
  const errorClass = error ? 'checkbox-error' : '';

  return (
    <div className="checkbox-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          className={`checkbox ${sizeClass} ${errorClass}`.trim()}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
        />
        <span className="checkbox-text">{label}</span>
      </label>
      {helper && (
        <span className={`checkbox-helper ${error ? 'checkbox-helper-error' : ''}`}>
          {helper}
        </span>
      )}
    </div>
  );
}

// 使用例
<Checkbox
  label="利用規約に同意する"
  checked={agreed}
  onChange={setAgreed}
  error={!agreed && submitted}
  helper={!agreed && submitted ? '同意が必要です' : '必須項目です'}
/>
```

---

## アクセシビリティ

### キーボード操作

- **Tab**: チェックボックスにフォーカス
- **Space**: チェックボックスの選択/解除を切り替え
- **Shift + Tab**: 前の要素にフォーカス

### ARIA属性

```html
<!-- エラー状態のチェックボックス -->
<div class="checkbox-group">
  <label class="checkbox-label">
    <input
      type="checkbox"
      class="checkbox checkbox-error"
      aria-invalid="true"
      aria-describedby="error-message"
    >
    <span class="checkbox-text">必須項目</span>
  </label>
  <span id="error-message" class="checkbox-helper checkbox-helper-error">
    この項目は必須です
  </span>
</div>

<!-- グループ化されたチェックボックス -->
<fieldset>
  <legend>興味のあるトピック</legend>
  <label class="checkbox-label">
    <input type="checkbox" class="checkbox" name="topics" value="tech">
    <span class="checkbox-text">テクノロジー</span>
  </label>
  <label class="checkbox-label">
    <input type="checkbox" class="checkbox" name="topics" value="design">
    <span class="checkbox-text">デザイン</span>
  </label>
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

1. **明確なラベル**
   - 何を選択するのか明確に記述

2. **独立した選択肢**
   - 各チェックボックスは独立して操作可能に

3. **グループ化**
   - 関連するチェックボックスは `<fieldset>` でグループ化

4. **ヘルパーテキスト**
   - 必要に応じて補足説明を追加

5. **適切なサイズ**
   - コンテキストに応じたサイズを選択
   - モバイルでは large を検討

### ❌ 非推奨

1. **相互排他的な選択肢**
   - 1つしか選べない場合は Radio を使用

2. **ラベルなし**
   - 必ずラベルテキストを提供

3. **長すぎるラベル**
   - 簡潔で理解しやすいラベルに

4. **不適切なデフォルト**
   - ユーザーの意図しない同意を避ける

---

## バリエーション

### インデタミネート状態 (部分選択)

親子関係のあるチェックボックスで、一部のみ選択されている状態を表現できます：

```html
<label class="checkbox-label">
  <input type="checkbox" class="checkbox" id="parent">
  <span class="checkbox-text">すべて選択</span>
</label>
```

```javascript
const parent = document.getElementById('parent');
parent.indeterminate = true; // 部分選択状態
```

### カスタムチェックマーク

チェックマークの代わりにアイコンを使用：

```css
.checkbox-custom:checked::after {
  content: '✓';
  border: none;
  transform: translate(-50%, -50%);
  font-size: 0.875rem;
  color: var(--component-checkbox-checkmark-default);
}
```

---

## テーマ対応

全てのチェックボックストークンはテーマに対応しています。`data-theme` 属性の変更で自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <label class="checkbox-label">
    <input type="checkbox" class="checkbox" checked>
    <span class="checkbox-text">オプション</span>
  </label>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <label class="checkbox-label">
    <input type="checkbox" class="checkbox" checked>
    <span class="checkbox-text">オプション</span>
  </label>
</html>
```

---

## 関連コンポーネント

- [Radio](./radio.md) - 単一選択用
- [Switch](./switch.md) - オン/オフ切り替え
- [Input](./input.md) - テキスト入力
- [Button](./button.md) - アクション実行

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)
