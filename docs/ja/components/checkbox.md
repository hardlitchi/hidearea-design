# Checkbox（チェックボックス）

不確定状態をサポートするカスタマイズ可能なチェックボックスコンポーネント。

## インポート

```js
// Web Component
import '@hidearea-design/core';

// React
import { Checkbox } from '@hidearea-design/react';

// Vue
import { HaCheckbox } from '@hidearea-design/vue';
```

## 基本的な使い方

### Vanilla JavaScript

```html
<ha-checkbox label="利用規約に同意する"></ha-checkbox>
```

### React

```tsx
<Checkbox>利用規約に同意する</Checkbox>
```

### Vue

```vue
<HaCheckbox v-model="accepted">利用規約に同意する</HaCheckbox>
```

## サイズ

```html
<ha-checkbox size="sm" label="小"></ha-checkbox>
<ha-checkbox size="md" label="中"></ha-checkbox>
<ha-checkbox size="lg" label="大"></ha-checkbox>
```

## 状態

### チェック済み

```html
<ha-checkbox checked label="チェック済み"></ha-checkbox>
```

### 不確定

```html
<ha-checkbox indeterminate label="不確定"></ha-checkbox>
```

### 無効化

```html
<ha-checkbox disabled label="無効"></ha-checkbox>
<ha-checkbox checked disabled label="チェック済みで無効"></ha-checkbox>
```

### 必須

```html
<ha-checkbox required label="必須フィールド"></ha-checkbox>
```

### エラー

```html
<ha-checkbox error label="無効な選択"></ha-checkbox>
```

## 説明付き

```html
<ha-checkbox
  label="通知を有効にする"
  description="アカウントのアクティビティに関する更新を受け取る"
></ha-checkbox>
```

## スロットの使用

```html
<ha-checkbox>
  <strong>同意します</strong>
  <a href="/terms">利用規約</a>
</ha-checkbox>

<ha-checkbox>
  通知を有効にする
  <span slot="description">
    アカウントに関するメール更新を受け取る
  </span>
</ha-checkbox>
```

## イベント

```js
// Vanilla JS
const checkbox = document.querySelector('ha-checkbox');

checkbox.addEventListener('change', (e) => {
  console.log('チェック:', e.detail.checked);
});

checkbox.addEventListener('input', (e) => {
  console.log('入力イベント:', e.detail.checked);
});

// React
<Checkbox
  onChange={(e) => console.log('チェック:', e.detail.checked)}
>
  利用規約に同意する
</Checkbox>

// Vue
<HaCheckbox
  v-model="checked"
  @change="handleChange"
>
  利用規約に同意する
</HaCheckbox>
```

## API リファレンス

### プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | チェックボックスのサイズ |
| `checked` | `boolean` | `false` | チェック状態 |
| `indeterminate` | `boolean` | `false` | 不確定状態 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `required` | `boolean` | `false` | 必須フィールド |
| `error` | `boolean` | `false` | エラー状態 |
| `name` | `string` | `''` | チェックボックスの name 属性 |
| `value` | `string` | `'on'` | チェックボックスの値 |
| `label` | `string` | `''` | ラベルテキスト（スロットの代替） |
| `description` | `string` | `''` | 説明テキスト（スロットの代替） |

### メソッド

| メソッド | 説明 |
|--------|-------------|
| `focus()` | チェックボックスにフォーカス |
| `blur()` | チェックボックスからフォーカスを外す |
| `checkValidity()` | チェックボックスが有効かチェック |
| `reportValidity()` | ユーザーに妥当性を報告 |
| `setCustomValidity(message)` | カスタムバリデーションメッセージを設定 |

### スロット

| スロット | 説明 |
|------|-------------|
| (デフォルト) | チェックボックスのラベル内容 |
| `description` | 説明の内容 |

### イベント

| イベント | Detail | 説明 |
|-------|--------|-------------|
| `change` | `{ checked: boolean }` | チェック状態が変更されたときに発火 |
| `input` | `{ checked: boolean }` | チェック状態が変更されたときに発火 |

### CSS Parts

| Part | 説明 |
|------|-------------|
| `checkbox-container` | コンテナ要素 |
| `checkbox-box` | 視覚的なチェックボックスボックス |
| `checkbox-icon` | チェック/不確定アイコン |
| `label` | ラベル要素 |
| `description` | 説明要素 |

## 使用例

### チェックボックスグループ

```tsx
// React
import { useState } from 'react';
import { Checkbox } from '@hidearea-design/react';

function CheckboxGroup() {
  const [selected, setSelected] = useState<string[]>([]);

  const options = ['オプション1', 'オプション2', 'オプション3'];

  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter(v => v !== value));
    }
  };

  return (
    <div>
      {options.map(option => (
        <Checkbox
          key={option}
          value={option}
          checked={selected.includes(option)}
          onChange={(e) => handleChange(option, e.detail.checked)}
        >
          {option}
        </Checkbox>
      ))}
    </div>
  );
}
```

### 不確定状態を使ったすべて選択

```tsx
// React
import { useState, useEffect } from 'react';
import { Checkbox } from '@hidearea-design/react';

function SelectAllExample() {
  const [items, setItems] = useState([
    { id: 1, label: 'アイテム1', checked: false },
    { id: 2, label: 'アイテム2', checked: false },
    { id: 3, label: 'アイテム3', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked) && !allChecked;

  const toggleAll = () => {
    const newChecked = !allChecked;
    setItems(items.map(item => ({ ...item, checked: newChecked })));
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked}
        onChange={toggleAll}
      >
        すべて選択
      </Checkbox>
      <div style={{ marginLeft: '24px' }}>
        {items.map(item => (
          <Checkbox
            key={item.id}
            checked={item.checked}
            onChange={() => toggleItem(item.id)}
          >
            {item.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
```

### フォームバリデーション

```html
<form>
  <ha-checkbox required name="terms">
    利用規約に同意します
  </ha-checkbox>
  <ha-button type="submit">送信</ha-button>
</form>

<script>
  const form = document.querySelector('form');
  const checkbox = form.querySelector('ha-checkbox');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!checkbox.checkValidity()) {
      checkbox.reportValidity();
      return;
    }

    console.log('フォーム送信');
  });
</script>
```

## アクセシビリティ

- ネイティブのチェックボックス入力を使用し、完全なキーボードサポート
- 適切な ARIA 属性が自動的に適用されます
- 無効時に `aria-disabled` が設定されます
- 必須時に `aria-required` が設定されます
- エラー状態時に `aria-invalid` が設定されます
- `aria-checked` がチェック/不確定状態を反映
- ラベルと説明が適切に関連付けられます

## ベストプラクティス

1. **常にラベルを提供**：明確で説明的なラベルを使用
2. **関連するチェックボックスをグループ化**：関連オプションには fieldset を使用
3. **不確定状態を賢く使用**：「すべて選択」や部分選択のみに使用
4. **必須フィールドを示す**：required 属性を使用
5. **バリデーションフィードバックを提供**：明確なメッセージと共にエラー状態を使用

## 関連コンポーネント

- [Button](./button.md)
- [Input](./input.md)
