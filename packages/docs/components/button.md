# Button

汎用的なボタンコンポーネント。5つのバリアントと3つのサイズをサポートします。

## 基本的な使い方

```html
<ha-button>ボタン</ha-button>
```

## バリアント

5種類のスタイルバリアントが利用可能です：

### Primary

```html
<ha-button variant="primary">Primary Button</ha-button>
```

### Secondary

```html
<ha-button variant="secondary">Secondary Button</ha-button>
```

### Outline

```html
<ha-button variant="outline">Outline Button</ha-button>
```

### Ghost

```html
<ha-button variant="ghost">Ghost Button</ha-button>
```

### Danger

```html
<ha-button variant="danger">Danger Button</ha-button>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-button size="sm">Small</ha-button>
<ha-button size="md">Medium</ha-button>
<ha-button size="lg">Large</ha-button>
```

## 状態

### Disabled

```html
<ha-button disabled>Disabled Button</ha-button>
```

### Loading

```html
<ha-button loading>Loading...</ha-button>
```

## フルワイド

```html
<ha-button full-width>Full Width Button</ha-button>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | ボタンのスタイルバリアント |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ボタンのサイズ |
| `disabled` | `boolean` | `false` | 無効状態 |
| `loading` | `boolean` | `false` | ローディング状態 |
| `full-width` | `boolean` | `false` | フルワイド表示 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | ボタンタイプ |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `click` | ボタンがクリックされた時 | `MouseEvent` |

## React

```tsx
import { Button } from '@hidearea-design/react';

function App() {
  return (
    <Button variant="primary" size="lg" onClick={() => console.log('clicked')}>
      クリック
    </Button>
  );
}
```

## Vue

```vue
<template>
  <HaButton variant="primary" size="lg" @click="handleClick">
    クリック
  </HaButton>
</template>

<script setup>
import { Button as HaButton } from '@hidearea-design/vue';

const handleClick = () => {
  console.log('clicked');
};
</script>
```

## アクセシビリティ

- `disabled` 属性が設定されている場合、`aria-disabled="true"` が自動的に設定されます
- `loading` 属性が設定されている場合、`aria-busy="true"` が自動的に設定されます
- キーボード操作に対応しています（Enter、Space キー）

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-button {
  --button-padding: 12px 24px;
  --button-border-radius: 8px;
  --button-font-size: 16px;
}
```

## 使用例

### フォーム送信

```html
<form>
  <ha-input name="email" type="email" required></ha-input>
  <ha-button type="submit" variant="primary">送信</ha-button>
</form>
```

### アクションボタングループ

```html
<div style="display: flex; gap: 8px;">
  <ha-button variant="primary">保存</ha-button>
  <ha-button variant="outline">キャンセル</ha-button>
  <ha-button variant="danger">削除</ha-button>
</div>
```

### ローディング状態

```html
<ha-button loading>処理中...</ha-button>
```
