# Checkbox

チェックボックスコンポーネント。indeterminate（不確定）状態をサポートします。

## 基本的な使い方

```html
<ha-checkbox>利用規約に同意する</ha-checkbox>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-checkbox size="sm">Small</ha-checkbox>
<ha-checkbox size="md">Medium</ha-checkbox>
<ha-checkbox size="lg">Large</ha-checkbox>
```

## 状態

### Checked

```html
<ha-checkbox checked>チェック済み</ha-checkbox>
```

### Disabled

```html
<ha-checkbox disabled>無効状態</ha-checkbox>
<ha-checkbox checked disabled>チェック済み（無効）</ha-checkbox>
```

### Indeterminate

```html
<ha-checkbox indeterminate>不確定状態</ha-checkbox>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `checked` | `boolean` | `false` | チェック状態 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `indeterminate` | `boolean` | `false` | 不確定状態 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `value` | `string` | `''` | フォーム値 |
| `name` | `string` | `''` | フォーム名 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `change` | チェック状態が変更された時 | `CustomEvent<boolean>` |

## React

```tsx
import { Checkbox } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      利用規約に同意する
    </Checkbox>
  );
}
```

## Vue

```vue
<template>
  <HaCheckbox v-model="accepted">
    利用規約に同意する
  </HaCheckbox>
</template>

<script setup>
import { ref } from 'vue';
import { Checkbox as HaCheckbox } from '@hidearea-design/vue';

const accepted = ref(false);
</script>
```

## 使用例

### フォームでの使用

```html
<ha-form-group>
  <ha-checkbox name="newsletter" value="yes">
    ニュースレターを受け取る
  </ha-checkbox>
  <ha-checkbox name="terms" value="yes" required>
    利用規約に同意する
  </ha-checkbox>
</ha-form-group>
```

### チェックボックスグループ

```html
<ha-form-group label="興味のある分野">
  <ha-checkbox name="interests" value="design">デザイン</ha-checkbox>
  <ha-checkbox name="interests" value="development">開発</ha-checkbox>
  <ha-checkbox name="interests" value="marketing">マーケティング</ha-checkbox>
</ha-form-group>
```

### 全選択機能

```tsx
import { Checkbox } from '@hidearea-design/react';
import { useState } from 'react';

function CheckboxGroup() {
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: false },
    { id: 3, label: 'Item 3', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked);

  const handleSelectAll = () => {
    setItems(items.map(item => ({ ...item, checked: !allChecked })));
  };

  const handleItemChange = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onChange={handleSelectAll}
      >
        全て選択
      </Checkbox>
      {items.map(item => (
        <Checkbox
          key={item.id}
          checked={item.checked}
          onChange={() => handleItemChange(item.id)}
        >
          {item.label}
        </Checkbox>
      ))}
    </div>
  );
}
```

## アクセシビリティ

### ARIAサポート

`<ha-checkbox>` コンポーネントは、WCAG 2.1 AA基準に準拠したアクセシビリティ機能を提供します。

- **role**: `checkbox` （自動設定）
- **aria-checked**: チェック状態を表します
  - `true`: チェック済み
  - `false`: 未チェック
  - `mixed`: 不確定状態（indeterminate）
- **aria-disabled**: `disabled` 属性が設定されている場合、自動的に `true` に設定
- **aria-required**: `required` 属性が設定されている場合、自動的に `true` に設定
- **aria-labelledby**: ラベルとの関連付けを自動管理

### キーボード操作

| キー | アクション |
|------|----------|
| `Tab` | フォーカス移動 |
| `Space` | チェック状態をトグル |
| `Shift + Tab` | 逆方向にフォーカス移動 |

### スクリーンリーダー

`<ha-checkbox>` は主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます：

- チェック状態（チェック済み/未チェック/不確定）
- ラベルテキスト
- 無効状態
- 必須フィールド

### フォームラベルの関連付け

```html
<!-- Good ✓: スロットでラベルを提供 -->
<ha-checkbox name="terms">
  利用規約に同意する
</ha-checkbox>

<!-- Good ✓: aria-label で明示的にラベル -->
<ha-checkbox name="newsletter" aria-label="ニュースレターを購読する"></ha-checkbox>

<!-- Good ✓: ha-form-group と組み合わせ -->
<ha-form-group label="設定">
  <ha-checkbox name="notifications">通知を受け取る</ha-checkbox>
  <ha-checkbox name="marketing">マーケティングメールを受け取る</ha-checkbox>
</ha-form-group>
```

## スタイルのカスタマイズ

### デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

```css
/* カラー */
var(--component-checkbox-background-default)
var(--component-checkbox-background-checked)
var(--component-checkbox-background-indeterminate)
var(--component-checkbox-background-disabled)
var(--component-checkbox-border-default)
var(--component-checkbox-border-checked)
var(--component-checkbox-border-focus)
var(--component-checkbox-checkmark-color)

/* サイズ */
var(--component-checkbox-size-sm)    /* 16px */
var(--component-checkbox-size-md)    /* 20px */
var(--component-checkbox-size-lg)    /* 24px */

/* スペーシング */
var(--spacing-xs)  /* チェックボックスとラベル間 */
var(--spacing-sm)

/* その他 */
var(--border-radius-sm)
var(--state-focus-ring-color)
var(--state-focus-ring-width)
var(--state-disabled-opacity)
```

### カスタムCSS変数

Shadow DOM外部からカスタマイズ可能なCSS変数：

```css
ha-checkbox {
  /* サイズ調整 */
  --checkbox-size: 20px;

  /* カラー */
  --checkbox-border-color: var(--color-gray-300);
  --checkbox-checked-bg: var(--color-primary-500);
  --checkbox-checkmark-color: white;

  /* ボーダー */
  --checkbox-border-width: 2px;
  --checkbox-border-radius: 4px;

  /* フォーカスリング */
  --checkbox-focus-ring-color: var(--color-primary-300);
  --checkbox-focus-ring-width: 2px;
  --checkbox-focus-ring-offset: 2px;
}
```

### Shadow DOMパーツ

`::part()` を使用してShadow DOM内部のスタイルをカスタマイズ：

```css
/* チェックボックス本体 */
ha-checkbox::part(control) {
  border-width: 2px;
  border-radius: 6px;
}

/* チェックマーク */
ha-checkbox::part(checkmark) {
  stroke-width: 3;
}

/* ラベルテキスト */
ha-checkbox::part(label) {
  font-weight: 500;
  color: var(--color-gray-800);
}

/* ホバー状態 */
ha-checkbox:hover::part(control) {
  border-color: var(--color-primary-600);
}
```

## ベストプラクティス

### Do's ✓

- **明確なラベルを提供**: チェックボックスの目的を明確に示すラベルを必ず設定する
- **indeterminate状態を活用**: 親子関係のチェックボックスで部分選択を視覚的に表現
- **適切なname/value属性**: フォーム送信時に適切なデータが送信されるよう設定
- **グループ化**: 関連するチェックボックスは `<ha-form-group>` でグループ化
- **視覚的なフィードバック**: ホバーやフォーカス時の状態を明確に表現

```html
<!-- Good ✓ -->
<ha-form-group label="通知設定">
  <ha-checkbox name="notifications[]" value="email">
    メール通知を受け取る
  </ha-checkbox>
  <ha-checkbox name="notifications[]" value="sms">
    SMS通知を受け取る
  </ha-checkbox>
  <ha-checkbox name="notifications[]" value="push">
    プッシュ通知を受け取る
  </ha-checkbox>
</ha-form-group>
```

### Don'ts ✗

- **ラベルなしのチェックボックス**: アクセシビリティの観点から必ずラベルを提供
- **トグルスイッチの代用**: オン/オフの状態変更には `<ha-switch>` を使用
- **単一選択**: 単一選択には `<ha-radio>` を使用（チェックボックスは複数選択用）
- **過度なグループ化**: 10個以上のチェックボックスは別のUIパターンを検討

```html
<!-- Bad ✗: ラベルなし -->
<ha-checkbox name="agree"></ha-checkbox>

<!-- Bad ✗: トグルスイッチとして使用 -->
<ha-checkbox name="darkMode">ダークモード</ha-checkbox>
<!-- 代わりに ha-switch を使用 -->
<ha-switch name="darkMode">ダークモード</ha-switch>

<!-- Bad ✗: 単一選択にチェックボックス -->
<ha-checkbox name="size" value="s">S</ha-checkbox>
<ha-checkbox name="size" value="m">M</ha-checkbox>
<!-- 代わりに ha-radio を使用 -->
```

## よくある質問

### チェック状態をプログラムで変更するには？

ReactとVueでそれぞれ異なる方法で制御できます。

**React:**
```tsx
import { Checkbox } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <>
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        同意する
      </Checkbox>
      <button onClick={handleToggle}>トグル</button>
    </>
  );
}
```

**Vue:**
```vue
<template>
  <div>
    <HaCheckbox v-model="checked">同意する</HaCheckbox>
    <button @click="checked = !checked">トグル</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Checkbox as HaCheckbox } from '@hidearea-design/vue';

const checked = ref(false);
</script>
```

### indeterminate（不確定）状態はいつ使うべき？

親チェックボックスと子チェックボックスの関係で、子の一部だけがチェックされている場合に使用します。

```tsx
import { Checkbox } from '@hidearea-design/react';
import { useState } from 'react';

function NestedCheckboxes() {
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: true },
    { id: 3, label: 'Item 3', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked) && !allChecked;

  const handleParentChange = () => {
    const newChecked = !allChecked;
    setItems(items.map(item => ({ ...item, checked: newChecked })));
  };

  const handleChildChange = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked}
        onChange={handleParentChange}
      >
        全て選択
      </Checkbox>
      <div style={{ marginLeft: '24px' }}>
        {items.map(item => (
          <Checkbox
            key={item.id}
            checked={item.checked}
            onChange={() => handleChildChange(item.id)}
          >
            {item.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
```

### フォーム送信時に複数の値を取得するには？

同じ `name` 属性を持つチェックボックスは、配列として送信されます。

```html
<form id="myForm">
  <ha-checkbox name="interests[]" value="design">デザイン</ha-checkbox>
  <ha-checkbox name="interests[]" value="development">開発</ha-checkbox>
  <ha-checkbox name="interests[]" value="marketing">マーケティング</ha-checkbox>
  <button type="submit">送信</button>
</form>

<script>
document.getElementById('myForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  // 配列として取得
  const interests = formData.getAll('interests[]');
  console.log(interests); // ['design', 'development'] など
});
</script>
```

**React Hook Form との統合:**
```tsx
import { useForm } from 'react-hook-form';
import { Checkbox } from '@hidearea-design/react';

function Form() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data.interests); // チェックされた値の配列
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Checkbox {...register('interests')} value="design">
        デザイン
      </Checkbox>
      <Checkbox {...register('interests')} value="development">
        開発
      </Checkbox>
      <button type="submit">送信</button>
    </form>
  );
}
```

### カスタムチェックマークアイコンを使用できますか？

Shadow DOMの制限により、直接的なアイコン変更は難しいですが、CSS変数とパーツを組み合わせてカスタマイズできます。

```css
/* チェックマークの色とサイズを変更 */
ha-checkbox {
  --checkbox-checkmark-color: #10b981;
}

ha-checkbox::part(checkmark) {
  stroke-width: 3;
  /* SVGパスのstrokeプロパティを調整 */
}

/* より高度なカスタマイズが必要な場合は、完全にカスタムコンポーネントを作成 */
```

## 関連コンポーネント

- [Radio](/components/radio) - 単一選択用のラジオボタン
- [Switch](/components/switch) - オン/オフのトグルスイッチ
- [Form Group](/components/form-group) - フォーム要素のグループ化
- [Button](/components/button) - フォーム送信用ボタン

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { CheckboxProps } from '@hidearea-design/core';

interface CheckboxProps {
  /**
   * チェック状態
   * @default false
   */
  checked?: boolean;

  /**
   * 不確定状態（部分選択を表す）
   * @default false
   */
  indeterminate?: boolean;

  /**
   * 無効状態
   * @default false
   */
  disabled?: boolean;

  /**
   * 必須フィールド
   * @default false
   */
  required?: boolean;

  /**
   * サイズバリアント
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * フォーム送信時の値
   */
  value?: string;

  /**
   * フォームフィールド名
   */
  name?: string;

  /**
   * チェック状態変更時のイベントハンドラ
   */
  onChange?: (event: CustomEvent<boolean>) => void;
}
```

## トラブルシューティング

### チェック状態が変更されない

**問題**: チェックボックスをクリックしても状態が変わらない

**原因**: Reactで `checked` プロパティを制御している場合、`onChange` ハンドラが必要

**解決策**:
```tsx
// Bad ✗: onChange がないため状態が変わらない
<Checkbox checked={checked}>ラベル</Checkbox>

// Good ✓: onChange で状態を更新
<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
>
  ラベル
</Checkbox>
```

### フォーム送信時に値が取得できない

**問題**: フォームを送信してもチェックボックスの値が含まれない

**原因**: `name` 属性が設定されていない、またはチェックされていないチェックボックスは送信されない

**解決策**:
```html
<!-- name 属性を必ず設定 -->
<ha-checkbox name="terms" value="accepted">
  利用規約に同意する
</ha-checkbox>

<!-- チェックされていない場合も値を送信したい場合 -->
<input type="hidden" name="terms" value="not_accepted">
<ha-checkbox name="terms" value="accepted">
  利用規約に同意する
</ha-checkbox>
```

### indeterminate状態がリセットされる

**問題**: indeterminate状態がユーザー操作後に消えてしまう

**原因**: ユーザーがクリックすると `checked` 状態に移行するため、indeterminateは自動的に解除される

**解決策**:
```tsx
// indeterminate状態を手動で管理
function ParentCheckbox() {
  const [items, setItems] = useState([...]);
  const someChecked = items.some(i => i.checked) && !items.every(i => i.checked);

  return (
    <Checkbox
      checked={items.every(i => i.checked)}
      indeterminate={someChecked}  // 常に計算で設定
      onChange={handleChange}
    >
      全て選択
    </Checkbox>
  );
}
```

### スタイルが適用されない

**問題**: カスタムCSSが効かない

**原因**: Shadow DOMによるカプセル化により、通常のCSSセレクタでは内部要素にアクセスできない

**解決策**:
```css
/* Bad ✗: 通常のセレクタは効かない */
ha-checkbox input {
  border: 2px solid red;
}

/* Good ✓: CSS変数を使用 */
ha-checkbox {
  --checkbox-border-color: red;
  --checkbox-size: 24px;
}

/* Good ✓: ::part() セレクタを使用 */
ha-checkbox::part(control) {
  border: 2px solid red;
}
```
