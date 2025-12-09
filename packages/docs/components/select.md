# Select

ドロップダウン選択フィールド。optgroup をサポートします。

## 基本的な使い方

```html
<ha-select>
  <option value="">選択してください</option>
  <option value="1">オプション1</option>
  <option value="2">オプション2</option>
  <option value="3">オプション3</option>
</ha-select>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-select size="sm">
  <option>Small</option>
</ha-select>

<ha-select size="md">
  <option>Medium</option>
</ha-select>

<ha-select size="lg">
  <option>Large</option>
</ha-select>
```

## 状態

### Disabled

```html
<ha-select disabled>
  <option>選択できません</option>
</ha-select>
```

### Required

```html
<ha-select required>
  <option value="">選択してください</option>
  <option value="1">オプション1</option>
</ha-select>
```

### Error

```html
<ha-select error>
  <option value="">選択してください</option>
  <option value="1">オプション1</option>
</ha-select>
```

## フルワイド

```html
<ha-select full-width>
  <option>フルワイド</option>
</ha-select>
```

## optgroup

```html
<ha-select>
  <option value="">選択してください</option>
  <optgroup label="フルーツ">
    <option value="apple">りんご</option>
    <option value="banana">バナナ</option>
    <option value="orange">オレンジ</option>
  </optgroup>
  <optgroup label="野菜">
    <option value="carrot">にんじん</option>
    <option value="potato">じゃがいも</option>
    <option value="tomato">トマト</option>
  </optgroup>
</ha-select>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `value` | `string` | `''` | 選択値 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `required` | `boolean` | `false` | 必須項目 |
| `error` | `boolean` | `false` | エラー状態 |
| `full-width` | `boolean` | `false` | フルワイド表示 |
| `name` | `string` | `''` | フォーム名 |
| `multiple` | `boolean` | `false` | 複数選択 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `change` | 選択が変更された時 | `CustomEvent<string>` |
| `focus` | フォーカスされた時 | `FocusEvent` |
| `blur` | フォーカスが外れた時 | `FocusEvent` |

## React

```tsx
import { Select } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [country, setCountry] = useState('');

  return (
    <Select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      fullWidth
    >
      <option value="">選択してください</option>
      <option value="jp">日本</option>
      <option value="us">アメリカ</option>
      <option value="uk">イギリス</option>
    </Select>
  );
}
```

## Vue

```vue
<template>
  <HaSelect v-model="country" full-width>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
    <option value="uk">イギリス</option>
  </HaSelect>
</template>

<script setup>
import { ref } from 'vue';
import { Select as HaSelect } from '@hidearea-design/vue';

const country = ref('');
</script>
```

## 使用例

### FormGroup と組み合わせる

```html
<ha-form-group label="国" required>
  <ha-select name="country" required full-width>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
    <option value="uk">イギリス</option>
  </ha-select>
</ha-form-group>
```

### カテゴリ別選択

```html
<ha-form-group label="商品カテゴリ">
  <ha-select full-width>
    <option value="">選択してください</option>
    <optgroup label="電化製品">
      <option value="pc">パソコン</option>
      <option value="smartphone">スマートフォン</option>
      <option value="tablet">タブレット</option>
    </optgroup>
    <optgroup label="家具">
      <option value="desk">デスク</option>
      <option value="chair">チェア</option>
      <option value="shelf">シェルフ</option>
    </optgroup>
  </ha-select>
</ha-form-group>
```

### 複数選択

```html
<ha-select multiple size="5" full-width>
  <option value="design">デザイン</option>
  <option value="development">開発</option>
  <option value="marketing">マーケティング</option>
  <option value="sales">営業</option>
  <option value="support">サポート</option>
</ha-select>
```

## アクセシビリティ

### ARIAサポート

- **role**: `listbox` （自動設定）
- **aria-disabled**: `disabled` 属性が設定されている場合、自動的に `true` に設定
- **aria-required**: `required` 属性が設定されている場合、自動的に `true` に設定
- **aria-invalid**: `error` 属性が設定されている場合、自動的に `true` に設定
- **aria-label**: ラベルがない場合は設定を推奨（Form Groupを使用すると自動関連付け）

### キーボード操作

| キー | アクション |
|------|----------|
| `Tab` | フォーカス移動 |
| `Space` | ドロップダウンを開く/閉じる |
| `Enter` | 選択を確定してドロップダウンを閉じる |
| `Arrow Up/Down` | オプションを上下に移動 |
| `Home` | 最初のオプションに移動 |
| `End` | 最後のオプションに移動 |
| `文字キー` | その文字で始まるオプションに移動 |
| `Esc` | ドロップダウンを閉じる（変更をキャンセル） |

### スクリーンリーダー

- 選択フィールドの目的とロール（"リストボックス"）が読み上げられます
- `required` 状態の場合、"必須" として通知されます
- `error` 状態の場合、"無効な選択" として通知されます
- 現在の選択肢とその位置（"5個中2番目"など）が読み上げられます
- Form Group と組み合わせることで、ラベルとエラーメッセージが適切に関連付けられます

### フォームラベルとの関連付け

```html
<!-- Good ✓: Form Groupを使用 -->
<ha-form-group label="国を選択" required>
  <ha-select name="country" required>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
  </ha-select>
</ha-form-group>

<!-- Good ✓: HTMLラベルを使用 -->
<label for="country-select">国を選択</label>
<ha-select id="country-select" name="country">
  <option value="">選択してください</option>
  <option value="jp">日本</option>
</ha-select>

<!-- Avoid ✗: ラベルなし -->
<ha-select name="country">
  <option value="">選択してください</option>
</ha-select>
```

## スタイルのカスタマイズ

### デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

```css
/* Select (Input トークンを共有) */
var(--component-input-background-default)
var(--component-input-background-disabled)
var(--component-input-text-default)
var(--component-input-border-default)
var(--component-input-border-hover)
var(--component-input-border-focus)
var(--component-input-border-error)

/* 共通トークン */
var(--spacing-sm)              /* Padding（小） */
var(--spacing-md)              /* Padding（中） */
var(--spacing-lg)              /* Padding（大） */
var(--border-radius-md)        /* 角丸 */
var(--text-body-default-fontSize)  /* フォントサイズ */
var(--interaction-transition-fast-duration)  /* トランジション */
var(--state-focus-ring-color)  /* フォーカスリング */
```

### カスタムCSS変数

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-select {
  --select-padding: 10px 12px;
  --select-border-radius: 6px;
  --select-font-size: 14px;
  --select-border-color: var(--color-gray-300);
  --select-focus-border-color: var(--color-primary-500);
}
```

### スタイルの上書き

Shadow DOMのパーツを使用してスタイルを上書き：

```css
ha-select::part(select) {
  font-family: 'Your Custom Font', sans-serif;
  font-weight: 500;
}

ha-select::part(select):focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

## ベストプラクティス

### Do's ✓

- **最初のoptionは空にする**: プレースホルダーとして「選択してください」を使用
- **optgroupで分類**: 選択肢が多い場合はoptgroupでグループ化
- **適切なvalue属性**: 意味のある値（IDやコード）を設定
- **required と組み合わせる**: 必須選択の場合は空のoptionをvalue=""に
- **Form Groupを使用**: ラベルとエラーメッセージを適切に関連付け
- **name属性を設定**: フォーム送信時に値を取得できるように

### Don'ts ✗

- **選択肢が多すぎる**: 10個以上の場合は検索機能付きのカスタムコンポーネントを検討
- **optionにvalue属性がない**: ブラウザのデフォルト動作（テキストが値になる）は避ける
- **選択済みの表示が不明瞭**: デフォルト選択がある場合は`selected`属性を明示
- **ラベルなし**: アクセシビリティのため必ずラベルを設定
- **複数選択の濫用**: UXが悪いため、Checkboxグループを検討

## よくある質問

### プログラムで選択値を変更するには？

React/Vueでは状態を更新するだけで自動的に反映されます：

```tsx
// React
const [value, setValue] = useState('');
setValue('jp'); // プログラムで値を変更

<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="">選択してください</option>
  <option value="jp">日本</option>
</Select>
```

```vue
<!-- Vue -->
<script setup>
const country = ref('');
country.value = 'jp'; // プログラムで値を変更
</script>

<template>
  <HaSelect v-model="country">
    <option value="">選択してください</option>
    <option value="jp">日本</option>
  </HaSelect>
</template>
```

### 動的にoptionを追加/削除するには？

配列をマッピングしてoptionを生成：

```tsx
// React
const countries = [
  { value: 'jp', label: '日本' },
  { value: 'us', label: 'アメリカ' },
  { value: 'uk', label: 'イギリス' },
];

<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="">選択してください</option>
  {countries.map(country => (
    <option key={country.value} value={country.value}>
      {country.label}
    </option>
  ))}
</Select>
```

```vue
<!-- Vue -->
<script setup>
const countries = [
  { value: 'jp', label: '日本' },
  { value: 'us', label: 'アメリカ' },
  { value: 'uk', label: 'イギリス' },
];
</script>

<template>
  <HaSelect v-model="country">
    <option value="">選択してください</option>
    <option
      v-for="c in countries"
      :key="c.value"
      :value="c.value"
    >
      {{ c.label }}
    </option>
  </HaSelect>
</template>
```

### 複数選択の値を取得するには？

`multiple` 属性を使用した場合、選択値は配列になります：

```tsx
// React
const [selectedItems, setSelectedItems] = useState<string[]>([]);

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const options = Array.from(e.target.selectedOptions);
  const values = options.map(option => option.value);
  setSelectedItems(values);
};

<Select multiple value={selectedItems} onChange={handleChange}>
  <option value="design">デザイン</option>
  <option value="dev">開発</option>
  <option value="marketing">マーケティング</option>
</Select>
```

### デフォルト値を設定するには？

`selected` 属性またはコンポーネントの初期状態で設定：

```html
<!-- HTML: selected属性 -->
<ha-select>
  <option value="">選択してください</option>
  <option value="jp" selected>日本</option>
  <option value="us">アメリカ</option>
</ha-select>
```

```tsx
// React: 初期状態で設定
const [country, setCountry] = useState('jp'); // デフォルト値

<Select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="">選択してください</option>
  <option value="jp">日本</option>
  <option value="us">アメリカ</option>
</Select>
```

## 関連コンポーネント

- [Input](/components/input) - テキスト入力フィールド
- [Checkbox](/components/checkbox) - チェックボックス（複数選択の代替）
- [Radio](/components/radio) - ラジオボタン（単一選択の代替）
- [Form Group](/components/form-group) - ラベルとエラーメッセージの統合
- [Button](/components/button) - フォーム送信ボタン

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { SelectProps } from '@hidearea-design/core';

interface SelectProps {
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  name?: string;
  multiple?: boolean;
}
```

## トラブルシューティング

### 選択値が変更されない

**問題**: Selectをクリックしても値が更新されない

**解決策**:
Reactの場合、`onChange`イベントハンドラが必要です：

```tsx
// ✓ Good
const [value, setValue] = useState('');
<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="1">オプション1</option>
</Select>

// ✗ Bad: onChange がない
<Select value={value}>
  <option value="1">オプション1</option>
</Select>
```

Vueの場合、`v-model`を使用：

```vue
<!-- ✓ Good -->
<HaSelect v-model="value">
  <option value="1">オプション1</option>
</HaSelect>

<!-- ✗ Bad: v-model がない -->
<HaSelect :value="value">
  <option value="1">オプション1</option>
</HaSelect>
```

### フォーム送信時に値が取得できない

**問題**: フォーム送信時にSelectの値が含まれない

**解決策**:
`name`属性を設定：

```html
<!-- ✓ Good -->
<form @submit="handleSubmit">
  <ha-select name="country">
    <option value="jp">日本</option>
  </ha-select>
  <ha-button type="submit">送信</ha-button>
</form>

<!-- ✗ Bad: name がない -->
<ha-select>
  <option value="jp">日本</option>
</ha-select>
```

### 選択肢が表示されない/見切れる

**問題**: ドロップダウンが画面外に表示される、または見切れる

**解決策**:
1. 親要素の`overflow: hidden`を確認
2. z-indexが低くないか確認
3. ページ下部の場合、上方向に展開されるか確認

```css
/* 親要素のoverflowを調整 */
.form-container {
  overflow: visible; /* hidden → visible */
}

/* z-indexを調整 */
ha-select {
  z-index: 100;
}
```

### 複数選択で全選択/全解除を実装するには？

**問題**: multipleモードで全選択/全解除ボタンを追加したい

**解決策**:

```tsx
const [selected, setSelected] = useState<string[]>([]);
const allValues = ['design', 'dev', 'marketing', 'sales'];

const selectAll = () => setSelected(allValues);
const deselectAll = () => setSelected([]);

<div>
  <Stack direction="horizontal" gap="2">
    <Button size="sm" onClick={selectAll}>全選択</Button>
    <Button size="sm" onClick={deselectAll}>全解除</Button>
  </Stack>
  <Select
    multiple
    value={selected}
    onChange={(e) => {
      const values = Array.from(e.target.selectedOptions).map(o => o.value);
      setSelected(values);
    }}
  >
    <option value="design">デザイン</option>
    <option value="dev">開発</option>
    <option value="marketing">マーケティング</option>
    <option value="sales">営業</option>
  </Select>
</div>
```
