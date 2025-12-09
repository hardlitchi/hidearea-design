# Radio

ラジオボタンコンポーネント。自動グループ化機能をサポートします。

## 基本的な使い方

```html
<ha-radio name="plan" value="free">無料プラン</ha-radio>
<ha-radio name="plan" value="pro">プロプラン</ha-radio>
<ha-radio name="plan" value="enterprise">エンタープライズプラン</ha-radio>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-radio name="size" value="sm" size="sm">Small</ha-radio>
<ha-radio name="size" value="md" size="md">Medium</ha-radio>
<ha-radio name="size" value="lg" size="lg">Large</ha-radio>
```

## 状態

### Checked

```html
<ha-radio name="option" value="1" checked>選択済み</ha-radio>
<ha-radio name="option" value="2">未選択</ha-radio>
```

### Disabled

```html
<ha-radio disabled>無効状態</ha-radio>
<ha-radio checked disabled>選択済み（無効）</ha-radio>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `checked` | `boolean` | `false` | 選択状態 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `value` | `string` | `''` | フォーム値 |
| `name` | `string` | `''` | フォーム名（グループ化に使用） |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `change` | 選択状態が変更された時 | `CustomEvent<string>` |

## React

```tsx
import { Radio } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [plan, setPlan] = useState('free');

  return (
    <div>
      <Radio
        name="plan"
        value="free"
        checked={plan === 'free'}
        onChange={(e) => setPlan(e.target.value)}
      >
        無料プラン
      </Radio>
      <Radio
        name="plan"
        value="pro"
        checked={plan === 'pro'}
        onChange={(e) => setPlan(e.target.value)}
      >
        プロプラン
      </Radio>
      <Radio
        name="plan"
        value="enterprise"
        checked={plan === 'enterprise'}
        onChange={(e) => setPlan(e.target.value)}
      >
        エンタープライズプラン
      </Radio>
    </div>
  );
}
```

## Vue

```vue
<template>
  <div>
    <HaRadio v-model="plan" value="free">無料プラン</HaRadio>
    <HaRadio v-model="plan" value="pro">プロプラン</HaRadio>
    <HaRadio v-model="plan" value="enterprise">エンタープライズプラン</HaRadio>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Radio as HaRadio } from '@hidearea-design/vue';

const plan = ref('free');
</script>
```

## 使用例

### FormGroup と組み合わせる

```html
<ha-form-group label="プランを選択" required>
  <ha-radio name="plan" value="free" checked>無料プラン</ha-radio>
  <ha-radio name="plan" value="pro">プロプラン</ha-radio>
  <ha-radio name="plan" value="enterprise">エンタープライズプラン</ha-radio>
</ha-form-group>
```

### 説明付きオプション

```html
<ha-form-group label="配送方法">
  <div>
    <ha-radio name="shipping" value="standard">
      <div>
        <strong>標準配送</strong>
        <div style="font-size: 12px; color: var(--color-gray-600);">
          3-5営業日 / 無料
        </div>
      </div>
    </ha-radio>
  </div>

  <div>
    <ha-radio name="shipping" value="express">
      <div>
        <strong>速達配送</strong>
        <div style="font-size: 12px; color: var(--color-gray-600);">
          1-2営業日 / 500円
        </div>
      </div>
    </ha-radio>
  </div>
</ha-form-group>
```

### 水平レイアウト

```html
<ha-form-group label="性別">
  <div style="display: flex; gap: 16px;">
    <ha-radio name="gender" value="male">男性</ha-radio>
    <ha-radio name="gender" value="female">女性</ha-radio>
    <ha-radio name="gender" value="other">その他</ha-radio>
  </div>
</ha-form-group>
```

### 動的オプション

```tsx
import { Radio, FormGroup } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [selectedSize, setSelectedSize] = useState('m');

  const sizes = [
    { value: 's', label: 'S', stock: 5 },
    { value: 'm', label: 'M', stock: 10 },
    { value: 'l', label: 'L', stock: 0 },
    { value: 'xl', label: 'XL', stock: 3 },
  ];

  return (
    <FormGroup label="サイズを選択">
      {sizes.map((size) => (
        <Radio
          key={size.value}
          name="size"
          value={size.value}
          checked={selectedSize === size.value}
          disabled={size.stock === 0}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {size.label} {size.stock === 0 && '(在庫なし)'}
        </Radio>
      ))}
    </FormGroup>
  );
}
```

## アクセシビリティ

### ARIAサポート

`<ha-radio>` コンポーネントは、WCAG 2.1 AA基準に準拠したアクセシビリティ機能を提供します。

- **role**: `radio` （自動設定）
- **aria-checked**: 選択状態を表します
  - `true`: 選択済み
  - `false`: 未選択
- **aria-disabled**: `disabled` 属性が設定されている場合、自動的に `true` に設定
- **aria-required**: `required` 属性が設定されている場合、自動的に `true` に設定
- **name属性によるグループ化**: 同じ `name` 属性を持つラジオボタンは自動的にラジオグループとして認識される

### キーボード操作

| キー | アクション |
|------|----------|
| `Tab` | フォーカス移動（グループ内で選択されている項目、または最初の項目） |
| `Shift + Tab` | 逆方向にフォーカス移動 |
| `Space` | 現在フォーカスされているラジオボタンを選択 |
| `Arrow Up/Left` | 前のラジオボタンを選択（グループ内を循環） |
| `Arrow Down/Right` | 次のラジオボタンを選択（グループ内を循環） |

### スクリーンリーダー

`<ha-radio>` は主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます：

- ラジオボタンの役割（ラジオボタン）
- グループ内の位置（例: 3つのうち1つ目）
- 選択状態（選択済み/未選択）
- ラベルテキスト
- 無効状態
- 必須フィールド

### フォームラベルの関連付け

```html
<!-- Good ✓: スロットでラベルを提供 -->
<ha-radio name="plan" value="pro">
  プロプラン
</ha-radio>

<!-- Good ✓: ha-form-group でグループラベル -->
<ha-form-group label="プランを選択" required>
  <ha-radio name="plan" value="free">無料プラン</ha-radio>
  <ha-radio name="plan" value="pro">プロプラン</ha-radio>
  <ha-radio name="plan" value="enterprise">エンタープライズプラン</ha-radio>
</ha-form-group>

<!-- Good ✓: fieldset と legend（ネイティブHTML） -->
<fieldset>
  <legend>配送方法</legend>
  <ha-radio name="shipping" value="standard">標準配送</ha-radio>
  <ha-radio name="shipping" value="express">速達配送</ha-radio>
</fieldset>

<!-- Bad ✗: ラベルなし -->
<ha-radio name="option" value="1"></ha-radio>
```

## スタイルのカスタマイズ

### デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

```css
/* カラー */
var(--component-radio-background-default)
var(--component-radio-background-checked)
var(--component-radio-background-disabled)
var(--component-radio-border-default)
var(--component-radio-border-checked)
var(--component-radio-border-focus)
var(--component-radio-dot-color)

/* サイズ */
var(--component-radio-size-sm)    /* 16px */
var(--component-radio-size-md)    /* 20px */
var(--component-radio-size-lg)    /* 24px */

/* スペーシング */
var(--spacing-xs)  /* ラジオボタンとラベル間 */
var(--spacing-sm)  /* グループ内のラジオボタン間 */

/* その他 */
var(--state-focus-ring-color)
var(--state-focus-ring-width)
var(--state-disabled-opacity)
```

### カスタムCSS変数

Shadow DOM外部からカスタマイズ可能なCSS変数：

```css
ha-radio {
  /* サイズ調整 */
  --radio-size: 20px;
  --radio-dot-size: 10px;

  /* カラー */
  --radio-border-color: var(--color-gray-300);
  --radio-checked-bg: var(--color-primary-500);
  --radio-checked-border: var(--color-primary-500);
  --radio-dot-color: white;

  /* ボーダー */
  --radio-border-width: 2px;

  /* レイアウト */
  --radio-gap: 8px;  /* ラジオボタンとラベル間 */

  /* フォーカスリング */
  --radio-focus-ring-color: var(--color-primary-300);
  --radio-focus-ring-width: 2px;
  --radio-focus-ring-offset: 2px;
}
```

### Shadow DOMパーツ

`::part()` を使用してShadow DOM内部のスタイルをカスタマイズ：

```css
/* ラジオボタン本体 */
ha-radio::part(control) {
  border-width: 2px;
}

/* 選択時のドット */
ha-radio::part(dot) {
  width: 10px;
  height: 10px;
}

/* ラベルテキスト */
ha-radio::part(label) {
  font-weight: 500;
  color: var(--color-gray-800);
}

/* ホバー状態 */
ha-radio:hover::part(control) {
  border-color: var(--color-primary-600);
  background-color: var(--color-primary-50);
}

/* 選択状態 */
ha-radio[checked]::part(control) {
  border-color: var(--color-primary-600);
  background-color: var(--color-primary-500);
}
```

## ベストプラクティス

### Do's ✓

- **同じname属性でグループ化**: 同じグループのラジオボタンには必ず同じ `name` 属性を設定
- **1つをデフォルト選択**: グループ内で最も一般的な選択肢を `checked` で初期選択
- **明確なラベル**: 各オプションの意味を明確に示すラベルテキストを提供
- **FormGroupでグループ化**: 関連するラジオボタンは `<ha-form-group>` でまとめる
- **適切な選択肢数**: 2〜7個程度の選択肢が最適（それ以上は `<ha-select>` を検討）

```html
<!-- Good ✓: 適切な設定 -->
<ha-form-group label="プランを選択" required>
  <ha-radio name="plan" value="free" checked>
    無料プラン（機能制限あり）
  </ha-radio>
  <ha-radio name="plan" value="pro">
    プロプラン（月額980円）
  </ha-radio>
  <ha-radio name="plan" value="enterprise">
    エンタープライズプラン（要問い合わせ）
  </ha-radio>
</ha-form-group>
```

### Don'ts ✗

- **異なるname属性**: 同じグループのラジオボタンに異なる `name` を設定しない
- **複数選択**: 複数選択が必要な場合は `<ha-checkbox>` を使用
- **ラベルなし**: 必ずラベルテキストを提供する
- **過多な選択肢**: 10個以上の場合は `<ha-select>` または別のUIパターンを使用
- **選択解除**: ラジオボタンは一度選択したら解除できない仕様

```html
<!-- Bad ✗: 異なるname属性 -->
<ha-radio name="plan1" value="free">無料</ha-radio>
<ha-radio name="plan2" value="pro">プロ</ha-radio>
<!-- これらは別のグループとして扱われる -->

<!-- Bad ✗: 複数選択にラジオボタン -->
<ha-radio name="features" value="feature1">機能1</ha-radio>
<ha-radio name="features" value="feature2">機能2</ha-radio>
<!-- 複数選択には ha-checkbox を使用 -->

<!-- Bad ✗: ラベルなし -->
<ha-radio name="option" value="1"></ha-radio>
<ha-radio name="option" value="2"></ha-radio>
```

## よくある質問

### プログラムで選択を変更するには？

ReactとVueでは、state/refを更新することで選択を変更できます。

**React:**
```tsx
import { Radio } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [plan, setPlan] = useState('free');

  const selectProPlan = () => {
    setPlan('pro');
  };

  return (
    <div>
      <Radio
        name="plan"
        value="free"
        checked={plan === 'free'}
        onChange={(e) => setPlan(e.target.value)}
      >
        無料プラン
      </Radio>
      <Radio
        name="plan"
        value="pro"
        checked={plan === 'pro'}
        onChange={(e) => setPlan(e.target.value)}
      >
        プロプラン
      </Radio>
      <button onClick={selectProPlan}>プロプランを選択</button>
    </div>
  );
}
```

**Vue:**
```vue
<template>
  <div>
    <HaRadio v-model="plan" value="free">無料プラン</HaRadio>
    <HaRadio v-model="plan" value="pro">プロプラン</HaRadio>
    <button @click="plan = 'pro'">プロプランを選択</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Radio as HaRadio } from '@hidearea-design/vue';

const plan = ref('free');
</script>
```

### 動的にラジオボタンを生成するには？

配列をマップしてラジオボタンを生成できます。

```tsx
import { Radio, FormGroup } from '@hidearea-design/react';
import { useState } from 'react';

interface Plan {
  value: string;
  label: string;
  price: string;
  description: string;
  disabled?: boolean;
}

function DynamicRadios() {
  const [selectedPlan, setSelectedPlan] = useState('free');

  const plans: Plan[] = [
    {
      value: 'free',
      label: '無料プラン',
      price: '¥0',
      description: '基本機能のみ',
    },
    {
      value: 'pro',
      label: 'プロプラン',
      price: '¥980/月',
      description: '全機能利用可能',
    },
    {
      value: 'enterprise',
      label: 'エンタープライズプラン',
      price: 'お問い合わせ',
      description: 'カスタマイズ可能',
      disabled: true, // 例: 現在提供していない
    },
  ];

  return (
    <FormGroup label="プランを選択">
      {plans.map((plan) => (
        <Radio
          key={plan.value}
          name="plan"
          value={plan.value}
          checked={selectedPlan === plan.value}
          disabled={plan.disabled}
          onChange={(e) => setSelectedPlan(e.target.value)}
        >
          <div>
            <strong>{plan.label}</strong> - {plan.price}
            <div style={{ fontSize: '12px', color: 'var(--color-gray-600)' }}>
              {plan.description}
            </div>
          </div>
        </Radio>
      ))}
    </FormGroup>
  );
}
```

### フォーム送信時に選択値を取得するには？

HTMLフォームまたはReact Hook Formで選択値を取得できます。

**HTMLフォーム:**
```html
<form id="planForm">
  <ha-radio name="plan" value="free" checked>無料プラン</ha-radio>
  <ha-radio name="plan" value="pro">プロプラン</ha-radio>
  <ha-radio name="plan" value="enterprise">エンタープライズプラン</ha-radio>
  <button type="submit">送信</button>
</form>

<script>
document.getElementById('planForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const selectedPlan = formData.get('plan');
  console.log('選択されたプラン:', selectedPlan); // 'free', 'pro', 'enterprise'
});
</script>
```

**React Hook Form:**
```tsx
import { useForm } from 'react-hook-form';
import { Radio, Button } from '@hidearea-design/react';

function Form() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      plan: 'free',
    },
  });

  const onSubmit = (data) => {
    console.log('選択されたプラン:', data.plan);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Radio {...register('plan')} value="free">無料プラン</Radio>
      <Radio {...register('plan')} value="pro">プロプラン</Radio>
      <Radio {...register('plan')} value="enterprise">エンタープライズプラン</Radio>
      <Button type="submit">送信</Button>
    </form>
  );
}
```

### ラジオボタンの選択を解除できますか？

ラジオボタンは一度選択すると解除できない仕様です。選択解除が必要な場合の対応方法：

**方法1: 「なし」オプションを追加**
```html
<ha-form-group label="オプションサービス">
  <ha-radio name="service" value="none" checked>なし</ha-radio>
  <ha-radio name="service" value="basic">ベーシック</ha-radio>
  <ha-radio name="service" value="premium">プレミアム</ha-radio>
</ha-form-group>
```

**方法2: チェックボックスを使用**
```html
<!-- 単一選択だが解除可能な場合 -->
<ha-checkbox name="newsletter">ニュースレターを受け取る</ha-checkbox>
```

**方法3: プログラムでリセット（React）**
```tsx
function ResettableRadio() {
  const [plan, setPlan] = useState<string | null>(null);

  const resetSelection = () => {
    setPlan(null);
  };

  return (
    <div>
      <Radio
        name="plan"
        value="free"
        checked={plan === 'free'}
        onChange={(e) => setPlan(e.target.value)}
      >
        無料プラン
      </Radio>
      <Radio
        name="plan"
        value="pro"
        checked={plan === 'pro'}
        onChange={(e) => setPlan(e.target.value)}
      >
        プロプラン
      </Radio>
      <button onClick={resetSelection}>選択を解除</button>
    </div>
  );
}
```

## 関連コンポーネント

- [Checkbox](/components/checkbox) - 複数選択用チェックボックス
- [Switch](/components/switch) - オン/オフのトグルスイッチ
- [Select](/components/select) - 多数の選択肢から1つを選ぶドロップダウン
- [Form Group](/components/form-group) - フォーム要素のグループ化

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { RadioProps } from '@hidearea-design/core';

interface RadioProps {
  /**
   * 選択状態
   * @default false
   */
  checked?: boolean;

  /**
   * 無効状態
   * @default false
   */
  disabled?: boolean;

  /**
   * 必須フィールド（グループ全体に対して）
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
  value: string;

  /**
   * フォームフィールド名（グループ化に使用）
   */
  name: string;

  /**
   * 選択変更時のイベントハンドラ
   */
  onChange?: (event: CustomEvent<string>) => void;
}
```

## トラブルシューティング

### ラジオボタンがグループ化されない

**問題**: 同じグループのはずなのに、複数のラジオボタンが同時に選択できてしまう

**原因**: `name` 属性が異なっている、または設定されていない

**解決策**:
```html
<!-- Bad ✗: name属性が異なる -->
<ha-radio name="plan1" value="free">無料</ha-radio>
<ha-radio name="plan2" value="pro">プロ</ha-radio>

<!-- Good ✓: 同じname属性 -->
<ha-radio name="plan" value="free">無料</ha-radio>
<ha-radio name="plan" value="pro">プロ</ha-radio>
```

### 選択状態が変更されない（React）

**問題**: ラジオボタンをクリックしても選択が変わらない

**原因**: `checked` プロパティを制御しているが、`onChange` ハンドラが適切に設定されていない

**解決策**:
```tsx
// Bad ✗: onChange がないため状態が更新されない
<Radio name="plan" value="free" checked={plan === 'free'}>
  無料プラン
</Radio>

// Good ✓: onChange で状態を更新
<Radio
  name="plan"
  value="free"
  checked={plan === 'free'}
  onChange={(e) => setPlan(e.target.value)}
>
  無料プラン
</Radio>
```

### 矢印キーでの選択移動が動作しない

**問題**: 矢印キーを押してもラジオボタン間を移動できない

**原因**: カスタムキーボードイベントハンドラが矢印キーのデフォルト動作を妨げている

**解決策**:
```tsx
// Bad ✗: キーイベントを完全に上書き
<Radio
  onKeyDown={(e) => {
    e.preventDefault(); // すべてのキーをブロック
    // カスタム処理
  }}
>
  オプション
</Radio>

// Good ✓: 矢印キー以外のみ処理
<Radio
  onKeyDown={(e) => {
    // 矢印キーはデフォルト動作を維持
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      // カスタム処理
    }
  }}
>
  オプション
</Radio>
```

### フォーム送信時に値が取得できない

**問題**: フォームを送信してもラジオボタンの値が含まれない

**原因**: `name` 属性が設定されていない、またはどのラジオボタンも選択されていない

**解決策**:
```html
<!-- name 属性を必ず設定 -->
<ha-radio name="plan" value="free" checked>無料プラン</ha-radio>
<ha-radio name="plan" value="pro">プロプラン</ha-radio>

<!-- デフォルト選択を設定（checked属性） -->
<ha-radio name="plan" value="free" checked>無料プラン</ha-radio>
```

**バリデーション（必須フィールド）:**
```html
<form id="myForm">
  <ha-form-group label="プランを選択" required>
    <ha-radio name="plan" value="free" required>無料プラン</ha-radio>
    <ha-radio name="plan" value="pro" required>プロプラン</ha-radio>
  </ha-form-group>
  <button type="submit">送信</button>
</form>

<script>
document.getElementById('myForm').addEventListener('submit', (e) => {
  const formData = new FormData(e.target);
  const plan = formData.get('plan');

  if (!plan) {
    e.preventDefault();
    alert('プランを選択してください');
    return;
  }

  // 送信処理
});
</script>
```
