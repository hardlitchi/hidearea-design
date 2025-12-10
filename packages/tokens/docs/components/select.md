# Select (セレクトボックス) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/components/forms/select.yaml`
**ステータス:** ✅ 実装済み (Phase 4)

---

## 概要

セレクトボックスコンポーネントは、ユーザーがドロップダウンメニューから1つのオプションを選択できるようにするフォーム要素です。複数の選択肢から1つを選ぶ際に使用します。

### 用途

- 国・地域の選択
- カテゴリーやタイプの選択
- 日付の月や年の選択
- 言語設定の切り替え
- フィルター条件の指定

---

## 状態

### Default (デフォルト)
通常の選択可能な状態です。

### Hover (ホバー)
マウスカーソルがセレクトボックス上にある状態です。

### Focus (フォーカス)
キーボードフォーカスがある状態で、フォーカスリングが表示されます。

### Disabled (無効)
操作できない状態で、視覚的に無効であることを示します。

### Readonly (読み取り専用)
値は表示されますが編集できない状態です。

### Error (エラー)
バリデーションエラーがある状態です。

### Success (成功)
バリデーションが成功した状態です。

---

## トークン一覧

### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.background.default` | `{background.primary}` | デフォルト背景色 |
| `component.select.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.select.background.disabled` | `{background.tertiary}` | 無効時の背景色 |
| `component.select.background.readonly` | `{background.secondary}` | 読み取り専用の背景色 |

### Text (テキスト色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.text.default` | `{foreground.primary}` | デフォルトのテキスト色 |
| `component.select.text.placeholder` | `{foreground.tertiary}` | プレースホルダーの色 |
| `component.select.text.disabled` | `{foreground.tertiary}` | 無効時のテキスト色 |

### Border (ボーダー色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.border.default` | `{border.default}` | デフォルトのボーダー色 |
| `component.select.border.hover` | `{border.strong}` | ホバー時のボーダー色 |
| `component.select.border.focus` | `{primary.default}` | フォーカス時のボーダー色 |
| `component.select.border.error` | `{error.default}` | エラー時のボーダー色 |
| `component.select.border.success` | `{success.default}` | 成功時のボーダー色 |
| `component.select.border.disabled` | `{border.subtle}` | 無効時のボーダー色 |

### Border Width & Radius (ボーダー幅・角丸)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.borderWidth.default` | `{border.width.1}` | デフォルトのボーダー幅 |
| `component.select.borderRadius.default` | `{border.radius.md}` | セレクトボックスの角丸 |

### Icon (矢印アイコン)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.icon.color.default` | `{foreground.secondary}` | 矢印アイコンのデフォルト色 |
| `component.select.icon.color.hover` | `{foreground.primary}` | ホバー時の矢印色 |
| `component.select.icon.color.disabled` | `{foreground.tertiary}` | 無効時の矢印色 |
| `component.select.icon.size` | `1rem` | 矢印アイコンのサイズ (16px) |
| `component.select.icon.spacing` | `{spacing.2}` | 矢印アイコンと端の間隔 |

### Focus Ring (フォーカスリング)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.focusRing.width` | `3px` | フォーカスリングの幅 |
| `component.select.focusRing.offset` | `2px` | フォーカスリングのオフセット |
| `component.select.focusRing.color.default` | `{primary.subtle}` | フォーカスリングのデフォルト色 |
| `component.select.focusRing.color.error` | `{error.subtle}` | エラー時のフォーカスリング色 |

### Padding (パディング)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.padding.vertical` | `{spacing.2}` | 縦方向のパディング |
| `component.select.padding.horizontal` | `{spacing.3}` | 横方向のパディング |
| `component.select.padding.withIcon` | `{spacing.10}` | アイコンがある場合の右パディング |

### Label (ラベル)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.label.fontSize` | `{font.size.sm}` | ラベルのフォントサイズ |
| `component.select.label.fontWeight` | `{font.weight.medium}` | ラベルのフォントウェイト |
| `component.select.label.color.default` | `{foreground.primary}` | ラベルのデフォルト色 |
| `component.select.label.color.disabled` | `{foreground.tertiary}` | 無効時のラベル色 |
| `component.select.label.spacing` | `{spacing.2}` | ラベルとセレクトボックスの間隔 |

### Helper Text (ヘルパーテキスト)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.helper.fontSize` | `{font.size.sm}` | ヘルパーテキストのフォントサイズ |
| `component.select.helper.color.default` | `{foreground.secondary}` | ヘルパーテキストのデフォルト色 |
| `component.select.helper.color.error` | `{error.default}` | エラー時のヘルパーテキスト色 |
| `component.select.helper.color.success` | `{success.default}` | 成功時のヘルパーテキスト色 |
| `component.select.helper.spacing` | `{spacing.2}` | セレクトボックスとヘルパーテキストの間隔 |

### Menu (ドロップダウンメニュー)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.menu.background` | `{background.primary}` | ドロップダウンメニューの背景色 |
| `component.select.menu.border` | `{border.default}` | ドロップダウンメニューのボーダー色 |
| `component.select.menu.borderRadius` | `{border.radius.md}` | ドロップダウンメニューの角丸 |
| `component.select.menu.shadow` | `{shadow.md}` | ドロップダウンメニューの影 |
| `component.select.menu.maxHeight` | `16rem` | ドロップダウンメニューの最大高さ (256px) |

### Option (オプション項目)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.option.background.default` | `transparent` | オプションのデフォルト背景色 |
| `component.select.option.background.hover` | `{background.secondary}` | ホバー時のオプション背景色 |
| `component.select.option.background.selected` | `{primary.subtle}` | 選択されたオプションの背景色 |
| `component.select.option.background.disabled` | `transparent` | 無効なオプションの背景色 |
| `component.select.option.text.default` | `{foreground.primary}` | オプションのデフォルトテキスト色 |
| `component.select.option.text.selected` | `{primary.default}` | 選択されたオプションのテキスト色 |
| `component.select.option.text.disabled` | `{foreground.tertiary}` | 無効なオプションのテキスト色 |
| `component.select.option.padding.vertical` | `{spacing.2}` | オプションの縦方向パディング |
| `component.select.option.padding.horizontal` | `{spacing.3}` | オプションの横方向パディング |

### Transition (トランジション)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.select.transition.duration` | `{animation.duration.fast}` | トランジションの時間 |
| `component.select.transition.timing` | `{animation.easing.ease}` | トランジションのイージング |
| `component.select.transition.properties` | `background-color, border-color, box-shadow, transform` | トランジション対象のプロパティ |

---

## 使用例

### HTML

```html
<!-- 基本的なセレクトボックス -->
<div class="select-group">
  <label class="select-label" for="country">国を選択</label>
  <select class="select" id="country">
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
    <option value="uk">イギリス</option>
    <option value="de">ドイツ</option>
  </select>
  <span class="select-helper">お住まいの国を選択してください</span>
</div>

<!-- エラー状態 -->
<div class="select-group">
  <label class="select-label" for="category">カテゴリー</label>
  <select class="select select-error" id="category">
    <option value="">選択してください</option>
    <option value="tech">テクノロジー</option>
    <option value="design">デザイン</option>
  </select>
  <span class="select-helper select-helper-error">カテゴリーを選択してください</span>
</div>

<!-- 無効状態 -->
<div class="select-group">
  <label class="select-label" for="region">地域</label>
  <select class="select" id="region" disabled>
    <option value="">利用不可</option>
  </select>
  <span class="select-helper">現在選択できません</span>
</div>
```

### CSS

```css
/* セレクトグループ */
.select-group {
  display: flex;
  flex-direction: column;
  gap: var(--component-select-label-spacing);
}

/* ラベル */
.select-label {
  font-size: var(--component-select-label-font-size);
  font-weight: var(--component-select-label-font-weight);
  color: var(--component-select-label-color-default);
}

.select-group:has(.select:disabled) .select-label {
  color: var(--component-select-label-color-disabled);
}

/* セレクトボックス本体 */
.select {
  appearance: none;
  width: 100%;
  padding: var(--component-select-padding-vertical)
           var(--component-select-padding-with-icon)
           var(--component-select-padding-vertical)
           var(--component-select-padding-horizontal);
  font-size: var(--font-size-base);
  color: var(--component-select-text-default);
  background-color: var(--component-select-background-default);
  background-image: url("data:image/svg+xml,..."); /* 矢印アイコン */
  background-repeat: no-repeat;
  background-position: right var(--component-select-icon-spacing) center;
  border: var(--component-select-border-width-default) solid
          var(--component-select-border-default);
  border-radius: var(--component-select-border-radius-default);
  cursor: pointer;
  transition: var(--component-select-transition-properties)
              var(--component-select-transition-duration)
              var(--component-select-transition-timing);
}

.select:hover:not(:disabled) {
  background-color: var(--component-select-background-hover);
  border-color: var(--component-select-border-hover);
}

.select:focus {
  outline: none;
  border-color: var(--component-select-border-focus);
  box-shadow: 0 0 0 var(--component-select-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-select-focus-ring-width) +
                var(--component-select-focus-ring-offset))
                var(--component-select-focus-ring-color-default);
}

/* 無効状態 */
.select:disabled {
  background-color: var(--component-select-background-disabled);
  border-color: var(--component-select-border-disabled);
  color: var(--component-select-text-disabled);
  cursor: not-allowed;
}

/* エラー状態 */
.select-error {
  border-color: var(--component-select-border-error);
}

.select-error:focus {
  box-shadow: 0 0 0 var(--component-select-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-select-focus-ring-width) +
                var(--component-select-focus-ring-offset))
                var(--component-select-focus-ring-color-error);
}

/* ヘルパーテキスト */
.select-helper {
  font-size: var(--component-select-helper-font-size);
  color: var(--component-select-helper-color-default);
}

.select-helper-error {
  color: var(--component-select-helper-color-error);
}

.select-helper-success {
  color: var(--component-select-helper-color-success);
}
```

### React

```tsx
import React from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label: string;
  helper?: string;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  required?: boolean;
}

export function Select({
  value,
  onChange,
  options,
  label,
  helper,
  error = false,
  success = false,
  disabled = false,
  placeholder = '選択してください',
  name,
  required = false,
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const errorClass = error ? 'select-error' : '';
  const helperClass = error
    ? 'select-helper-error'
    : success
    ? 'select-helper-success'
    : '';

  return (
    <div className="select-group">
      <label className="select-label" htmlFor={name}>
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        className={`select ${errorClass}`.trim()}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={error}
        aria-describedby={helper ? `${name}-helper` : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {helper && (
        <span id={`${name}-helper`} className={`select-helper ${helperClass}`}>
          {helper}
        </span>
      )}
    </div>
  );
}

// 使用例
const countries = [
  { value: 'jp', label: '日本' },
  { value: 'us', label: 'アメリカ' },
  { value: 'uk', label: 'イギリス' },
];

<Select
  label="国を選択"
  value={country}
  onChange={setCountry}
  options={countries}
  error={!country && submitted}
  helper={!country && submitted ? '国を選択してください' : 'お住まいの国を選択してください'}
  required
/>
```

---

## アクセシビリティ

### キーボード操作

- **Tab**: セレクトボックスにフォーカス
- **Space / Enter**: ドロップダウンメニューを開く
- **↑ / ↓**: オプション間を移動
- **Home / End**: 最初/最後のオプションに移動
- **文字キー**: その文字で始まるオプションに移動
- **Esc**: ドロップダウンメニューを閉じる
- **Shift + Tab**: 前の要素にフォーカス

### ARIA属性

```html
<!-- エラー状態のセレクトボックス -->
<div class="select-group">
  <label class="select-label" for="country">
    国を選択 <span aria-label="required">*</span>
  </label>
  <select
    id="country"
    class="select select-error"
    aria-invalid="true"
    aria-describedby="country-error"
    aria-required="true"
  >
    <option value="">選択してください</option>
    <option value="jp">日本</option>
  </select>
  <span id="country-error" class="select-helper select-helper-error">
    国を選択してください
  </span>
</div>

<!-- グループ化されたオプション -->
<label for="timezone">タイムゾーン</label>
<select id="timezone" class="select">
  <optgroup label="アジア">
    <option value="tokyo">東京</option>
    <option value="seoul">ソウル</option>
  </optgroup>
  <optgroup label="ヨーロッパ">
    <option value="london">ロンドン</option>
    <option value="paris">パリ</option>
  </optgroup>
</select>
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
   - 必須項目には視覚的な表示を追加

2. **適切なデフォルト値**
   - プレースホルダーオプションを最初に配置
   - よく使われる選択肢を上部に配置

3. **オプションの整理**
   - 論理的な順序で並べる（アルファベット順、使用頻度順など）
   - 多数のオプションは `<optgroup>` でグループ化

4. **ヘルパーテキスト**
   - 選択のヒントや補足情報を提供
   - エラーメッセージは具体的に

5. **適切な幅**
   - 最長のオプションが表示できる幅を確保
   - コンテキストに応じて `width: 100%` または固定幅

### ❌ 非推奨

1. **多すぎるオプション**
   - 20個を超える場合は検索機能付きセレクトを検討
   - またはオートコンプリート入力を使用

2. **ラベルなし**
   - 必ずラベルテキストを提供
   - プレースホルダーだけでは不十分

3. **複雑な階層**
   - ネストされた optgroup は避ける
   - シンプルな構造を維持

4. **曖昧な選択肢**
   - 「その他」だけでなく具体的な説明を

---

## カスタムセレクトボックス

ネイティブの `<select>` 要素はスタイリングに制限があるため、完全なカスタマイズが必要な場合は、カスタムコンポーネントの実装を検討してください：

```tsx
// カスタムセレクトコンポーネントの例
import { useState, useRef, useEffect } from 'react';

export function CustomSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // キーボード操作の実装
  // ドロップダウンメニューの位置調整
  // 外側クリックでの閉じる処理
  // など...

  return (
    <div ref={containerRef} className="custom-select">
      {/* 実装 */}
    </div>
  );
}
```

**注意**: カスタム実装する場合は、必ず適切な ARIA 属性とキーボード操作をサポートしてください。

---

## テーマ対応

全てのセレクトボックストークンはテーマに対応しています。`data-theme` 属性の変更で自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <select class="select">
    <option>オプション</option>
  </select>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <select class="select">
    <option>オプション</option>
  </select>
</html>
```

---

## 関連コンポーネント

- [Input](./input.md) - テキスト入力
- [Checkbox](./checkbox.md) - 複数選択
- [Radio](./radio.md) - 単一選択（固定オプション）
- [Textarea](./textarea.md) - 複数行入力

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)
