# Input（入力フィールド）

複数のタイプ、バリエーション、バリデーションサポートを備えた柔軟な入力コンポーネント。

## インポート

```js
// Web Component
import '@hidearea-design/core';

// React
import { Input } from '@hidearea-design/react';

// Vue
import { HaInput } from '@hidearea-design/vue';
```

## 基本的な使い方

### Vanilla JavaScript

```html
<ha-input placeholder="名前を入力"></ha-input>
```

### React

```tsx
<Input placeholder="名前を入力" />
```

### Vue

```vue
<HaInput v-model="name" placeholder="名前を入力" />
```

## 入力タイプ

```html
<ha-input type="text" placeholder="テキスト入力"></ha-input>
<ha-input type="email" placeholder="email@example.com"></ha-input>
<ha-input type="password" placeholder="パスワード"></ha-input>
<ha-input type="number" placeholder="123"></ha-input>
<ha-input type="tel" placeholder="電話番号"></ha-input>
<ha-input type="url" placeholder="https://example.com"></ha-input>
<ha-input type="search" placeholder="検索..."></ha-input>
```

## バリエーション

```html
<ha-input variant="default" placeholder="デフォルト"></ha-input>
<ha-input variant="filled" placeholder="塗りつぶし"></ha-input>
<ha-input variant="outlined" placeholder="アウトライン"></ha-input>
```

## サイズ

```html
<ha-input size="sm" placeholder="小"></ha-input>
<ha-input size="md" placeholder="中"></ha-input>
<ha-input size="lg" placeholder="大"></ha-input>
```

## 状態

### 無効化

```html
<ha-input disabled placeholder="無効な入力"></ha-input>
```

### 読み取り専用

```html
<ha-input readonly value="読み取り専用の値"></ha-input>
```

### 必須

```html
<ha-input required placeholder="必須フィールド"></ha-input>
```

### エラー

```html
<ha-input error placeholder="無効な入力"></ha-input>
```

### フル幅

```html
<ha-input full-width placeholder="フル幅の入力"></ha-input>
```

## プレフィックス/サフィックス付き

```html
<ha-input placeholder="金額を入力">
  <span slot="prefix">¥</span>
</ha-input>

<ha-input placeholder="ドメインを入力">
  <span slot="suffix">.com</span>
</ha-input>
```

## バリデーション

### HTML5 バリデーション

```html
<ha-input
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  minlength="5"
  maxlength="50"
></ha-input>
```

### 数値バリデーション

```html
<ha-input
  type="number"
  min="0"
  max="100"
  step="5"
></ha-input>
```

## イベント

```js
// Vanilla JS
const input = document.querySelector('ha-input');

input.addEventListener('input', (e) => {
  console.log('入力値:', e.detail.value);
});

input.addEventListener('change', (e) => {
  console.log('変更:', e.detail.value);
});

input.addEventListener('focus', (e) => {
  console.log('フォーカス取得');
});

input.addEventListener('blur', (e) => {
  console.log('フォーカス喪失');
});

// React
<Input
  onInput={(e) => console.log(e.detail.value)}
  onChange={(e) => console.log(e.detail.value)}
  onFocus={() => console.log('フォーカス')}
  onBlur={() => console.log('ブラー')}
/>

// Vue
<HaInput
  v-model="value"
  @input="handleInput"
  @change="handleChange"
  @focus="handleFocus"
  @blur="handleBlur"
/>
```

## API リファレンス

### プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'filled' \| 'outlined'` | `'default'` | 視覚的スタイルのバリエーション |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 入力フィールドのサイズ |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | 入力タイプ |
| `value` | `string` | `''` | 入力値 |
| `placeholder` | `string` | `''` | プレースホルダーテキスト |
| `disabled` | `boolean` | `false` | 無効状態 |
| `readonly` | `boolean` | `false` | 読み取り専用状態 |
| `required` | `boolean` | `false` | 必須フィールド |
| `error` | `boolean` | `false` | エラー状態 |
| `fullWidth` | `boolean` | `false` | フル幅入力 |
| `name` | `string` | `''` | 入力の name 属性 |
| `autocomplete` | `string` | `''` | オートコンプリート属性 |
| `maxlength` | `number` | - | 最大文字数 |
| `minlength` | `number` | - | 最小文字数 |
| `pattern` | `string` | - | バリデーションパターン |
| `min` | `number` | - | 最小値（number タイプ） |
| `max` | `number` | - | 最大値（number タイプ） |
| `step` | `number` | - | ステップ値（number タイプ） |

### メソッド

| メソッド | 説明 |
|--------|-------------|
| `focus()` | 入力フィールドにフォーカス |
| `blur()` | 入力フィールドからフォーカスを外す |
| `select()` | すべてのテキストを選択 |
| `setSelectionRange(start, end, direction?)` | テキスト選択範囲を設定 |
| `checkValidity()` | 入力が有効かチェック |
| `reportValidity()` | ユーザーに妥当性を報告 |
| `setCustomValidity(message)` | カスタムバリデーションメッセージを設定 |

### スロット

| スロット | 説明 |
|------|-------------|
| `prefix` | 入力フィールドの前の内容 |
| `suffix` | 入力フィールドの後の内容 |

### イベント

| イベント | Detail | 説明 |
|-------|--------|-------------|
| `input` | `{ value: string }` | 値が変更されたときに発火 |
| `change` | `{ value: string }` | 値変更後にフォーカスを失ったときに発火 |
| `focus` | - | フォーカス取得時に発火 |
| `blur` | - | フォーカス喪失時に発火 |

## 使用例

### バリデーション付きフォーム

```tsx
// React
import { useState } from 'react';
import { Input, Button } from '@hidearea-design/react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('ha-input');

    if (!input.checkValidity()) {
      setError(true);
      input.reportValidity();
      return;
    }

    console.log('有効なメール:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        required
        error={error}
        placeholder="email@example.com"
        onInput={(e) => {
          setEmail(e.detail.value);
          setError(false);
        }}
      />
      <Button type="submit">ログイン</Button>
    </form>
  );
}
```

### アイコン付き検索入力

```html
<ha-input type="search" placeholder="検索...">
  <span slot="prefix">
    <svg><!-- 検索アイコン --></svg>
  </span>
</ha-input>
```

### 通貨入力

```html
<ha-input type="number" step="0.01" min="0">
  <span slot="prefix">¥</span>
  <span slot="suffix">JPY</span>
</ha-input>
```

## アクセシビリティ

- 適切な ARIA 属性が自動的に適用されます
- 無効時に `aria-disabled` が設定されます
- 読み取り専用時に `aria-readonly` が設定されます
- 必須時に `aria-required` が設定されます
- エラー状態時に `aria-invalid` が設定されます
- 標準的なフォームプラクティスによるラベル関連付け
- キーボードナビゲーション完全サポート

## ベストプラクティス

1. **常にラベルを使用**：アクセシビリティのため入力とラベルを関連付ける
2. **バリデーションフィードバックを提供**：説明的なメッセージと共にエラー状態を使用
3. **適切なタイプを使用**：メールには email、電話には tel など
4. **オートコンプリートを設定**：ユーザーがフォームを素早く入力できるようにする
5. **必須フィールドを示す**：required 属性と視覚的インジケーターを使用

## 関連コンポーネント

- [Button](./button.md)
- [Checkbox](./checkbox.md)
