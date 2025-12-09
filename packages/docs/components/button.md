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

### ARIAサポート

- **role**: `button` （自動設定）
- **aria-disabled**: `disabled` 属性が設定されている場合、自動的に `true` に設定
- **aria-busy**: `loading` 属性が設定されている場合、自動的に `true` に設定
- **aria-label**: ボタンにテキストがない場合に推奨

### キーボード操作

| キー | アクション |
|------|----------|
| `Enter` | ボタンを実行 |
| `Space` | ボタンを実行 |
| `Tab` | フォーカス移動 |

### スクリーンリーダー

- ボタンの内容とロール（"ボタン"）が読み上げられます
- `loading` 状態の場合、"ビジー" として通知されます
- `disabled` 状態の場合、"無効" として通知されます

### カラーコントラスト

すべてのバリアントはWCAG 2.1 AA基準（4.5:1）を満たしています：

- **Primary**: テキストと背景のコントラスト比 7.2:1
- **Secondary**: テキストと背景のコントラスト比 6.8:1
- **Outline**: テキストと背景のコントラスト比 8.1:1

## スタイルのカスタマイズ

### デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

```css
/* Primary Button */
var(--component-button-primary-background-default)
var(--component-button-primary-background-hover)
var(--component-button-primary-background-active)
var(--component-button-primary-background-disabled)
var(--component-button-primary-text-default)
var(--component-button-primary-text-disabled)
var(--component-button-primary-border-default)

/* Secondary, Outline, Ghost, Danger も同様のパターン */

/* 共通トークン */
var(--spacing-sm)              /* Padding（小） */
var(--spacing-md)              /* Padding（中） */
var(--spacing-lg)              /* Padding（大） */
var(--border-radius-md)        /* 角丸 */
var(--font-weight-medium)      /* フォントウェイト */
var(--interaction-transition-fast-duration)  /* トランジション */
```

### カスタムCSS変数

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-button {
  --button-padding: 12px 24px;
  --button-border-radius: 8px;
  --button-font-size: 16px;
}
```

### スタイルの上書き

Shadow DOMのパーツを使用してスタイルを上書き：

```css
ha-button::part(button) {
  font-family: 'Your Custom Font', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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

### アイコン付きボタン

```html
<ha-button>
  <svg><!-- icon --></svg>
  保存
</ha-button>
```

## ベストプラクティス

### Do's ✓

- **適切なバリアントを使用**: Primary は主要アクション、Secondary は補助アクション、Danger は破壊的アクション
- **明確なラベル**: ボタンのテキストは行動を明確に示す（例: "保存"、"削除"、"キャンセル"）
- **ローディング状態を表示**: 非同期処理中は `loading` 属性を使用してユーザーにフィードバック
- **適切なサイズ**: タッチデバイスでは最小 `44x44px` を確保（`size="lg"` を使用）
- **フォーカス可視化**: キーボードユーザーのためにフォーカスリングを維持

### Don'ts ✗

- **アイコンのみのボタン**: テキストなしの場合は必ず `aria-label` を設定
- **複数の Primary ボタン**: 1つの画面に複数の Primary ボタンは避ける
- **曖昧なラベル**: "OK"、"送信" などの一般的すぎるラベルは避ける
- **disabled の濫用**: 可能な限りエラーメッセージで誘導し、disabled は最小限に
- **カスタムカラーの過度な使用**: デザイントークンを使用して一貫性を保つ

## よくある質問

### ボタンとリンクの使い分けは？

**ボタン**: ページ内のアクション（フォーム送信、モーダル開閉、データ変更）
**リンク**: ページ遷移や外部リソースへの移動

```html
<!-- Good: ボタンでアクション -->
<ha-button @click="saveData">保存</ha-button>

<!-- Good: リンクでナビゲーション -->
<a href="/profile">プロフィールを見る</a>
```

### loading 状態でもクリックイベントは発火しますか？

いいえ。`loading` 属性が設定されている場合、ボタンは自動的に無効化され、クリックイベントは発火しません。

### カスタムアイコンを追加するには？

スロットを使用してSVGアイコンやカスタムコンテンツを追加できます：

```html
<ha-button variant="primary">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z"/>
  </svg>
  お気に入り
</ha-button>
```

### フルワイドボタンをモバイルのみに適用するには？

CSS メディアクエリと組み合わせて使用：

```css
@media (max-width: 768px) {
  ha-button {
    width: 100%;
  }
}
```

または、JavaScriptで動的に制御：

```tsx
import { useMediaQuery } from 'your-hooks';

function ResponsiveButton() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Button fullWidth={isMobile}>
      ボタン
    </Button>
  );
}
```

## 関連コンポーネント

- [Button Group](/components/button-group) - 複数のボタンをグループ化
- [Icon Button](/components/icon-button) - アイコンのみのボタン
- [Input](/components/input) - フォーム入力と組み合わせて使用
- [Card](/components/card) - カード内のアクションボタン

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { ButtonProps } from '@hidearea-design/core';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
```

## トラブルシューティング

### ボタンがクリックできない

**問題**: ボタンをクリックしてもイベントが発火しない

**解決策**:
1. `disabled` または `loading` 属性が設定されていないか確認
2. CSSで `pointer-events: none` が設定されていないか確認
3. 上位要素で `z-index` が低くないか確認

```html
<!-- ✓ Good -->
<ha-button @click="handleClick">クリック</ha-button>

<!-- ✗ Bad: disabled属性がある -->
<ha-button disabled @click="handleClick">クリック</ha-button>
```

### スタイルが適用されない

**問題**: カスタムスタイルが反映されない

**解決策**:
Shadow DOMを使用しているため、`::part()` または CSS変数を使用：

```css
/* ✓ Good: CSS変数を使用 */
ha-button {
  --button-padding: 20px;
}

/* ✓ Good: パーツセレクタを使用 */
ha-button::part(button) {
  padding: 20px;
}

/* ✗ Bad: 通常のセレクタは効かない */
ha-button button {
  padding: 20px;
}
```

### フォーム送信が動作しない

**問題**: `type="submit"` を設定しても form が送信されない

**解決策**:
ボタンが `<form>` 要素の中にあることを確認：

```html
<!-- ✓ Good -->
<form @submit="handleSubmit">
  <ha-input name="email"></ha-input>
  <ha-button type="submit">送信</ha-button>
</form>

<!-- ✗ Bad: form の外にある -->
<ha-button type="submit">送信</ha-button>
<form @submit="handleSubmit">
  <ha-input name="email"></ha-input>
</form>
```
