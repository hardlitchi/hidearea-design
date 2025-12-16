# Theme System Guide

Hidearea Design Systemは、ライトモード・ダークモードの完全なテーマ切り替えをサポートしています。すべてのコンポーネントはセマンティックトークンを使用しており、テーマの変更に自動的に適応します。

## 目次

- [概要](#概要)
- [使い方](#使い方)
- [JavaScript API](#javascript-api)
- [Web Component](#web-component)
- [カスタマイズ](#カスタマイズ)
- [ベストプラクティス](#ベストプラクティス)

## 概要

### テーマシステムの特徴

- **自動適応**: すべてのコンポーネントが自動的にテーマに適応
- **システム連携**: OSのテーマ設定と同期可能
- **永続化**: localStorage でユーザーの選択を保存
- **シームレス**: スムーズなトランジション効果
- **アクセシブル**: 適切なコントラスト比を維持

### 利用可能なテーマ

| テーマ | 説明 |
|------|------|
| `light` | ライトモード（明るい背景） |
| `dark` | ダークモード（暗い背景） |
| `auto` | システム設定に従う |

## 使い方

### 1. 基本的なHTML設定

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <link rel="stylesheet" href="path/to/variables.css">
</head>
<body>
  <!-- コンテンツ -->

  <script type="module">
    import { initializeTheme } from '@hidearea-design/tokens/theme';
    initializeTheme();
  </script>
</body>
</html>
```

### 2. Web Componentを使用

```html
<!-- Toggle button -->
<ha-theme-switcher variant="toggle"></ha-theme-switcher>

<!-- Dropdown -->
<ha-theme-switcher variant="dropdown" show-auto></ha-theme-switcher>

<!-- Segmented control -->
<ha-theme-switcher variant="segmented" show-auto show-label></ha-theme-switcher>
```

```html
<script type="module">
  import '@hidearea-design/tokens/theme-switcher';
  import { initializeTheme } from '@hidearea-design/tokens/theme';

  initializeTheme();
</script>
```

### 3. プログラムで制御

```javascript
import { setTheme, toggleTheme, getCurrentTheme } from '@hidearea-design/tokens/theme';

// テーマを設定
setTheme('dark');

// トグル
toggleTheme();

// 現在のテーマを取得
const current = getCurrentTheme(); // 'light' または 'dark'
```

## JavaScript API

### Functions

#### `initializeTheme()`

テーマシステムを初期化します。保存されたテーマ設定を読み込み、システムテーマの変更を監視します。

```javascript
import { initializeTheme } from '@hidearea-design/tokens/theme';

initializeTheme();
```

#### `setTheme(theme, store = true)`

テーマを設定します。

**パラメータ:**
- `theme` (string): `'light'`, `'dark'`, または `'auto'`
- `store` (boolean): localStorage に保存するかどうか（デフォルト: `true`）

```javascript
import { setTheme } from '@hidearea-design/tokens/theme';

// ダークモードに設定（保存する）
setTheme('dark');

// ライトモードに設定（保存しない）
setTheme('light', false);

// システム設定に従う
setTheme('auto');
```

#### `toggleTheme()`

ライトとダークを切り替えます。

```javascript
import { toggleTheme } from '@hidearea-design/tokens/theme';

toggleTheme();
```

#### `getCurrentTheme()`

現在適用されているテーマを取得します。

**戻り値:** `'light'` または `'dark'`

```javascript
import { getCurrentTheme } from '@hidearea-design/tokens/theme';

const theme = getCurrentTheme();
console.log(theme); // 'light' or 'dark'
```

#### `getStoredTheme()`

localStorage に保存されているテーマ設定を取得します。

**戻り値:** `'light'`, `'dark'`, `'auto'`, または `null`

```javascript
import { getStoredTheme } from '@hidearea-design/tokens/theme';

const stored = getStoredTheme();
```

#### `getSystemTheme()`

OSのテーマ設定を取得します。

**戻り値:** `'light'` または `'dark'`

```javascript
import { getSystemTheme } from '@hidearea-design/tokens/theme';

const systemTheme = getSystemTheme();
```

### ThemeManager Class

オブジェクト指向インターフェースでテーマを管理します。

```javascript
import { ThemeManager } from '@hidearea-design/tokens/theme';

const manager = new ThemeManager();

// 現在のテーマを取得
console.log(manager.current); // 'light' or 'dark'

// ユーザー設定を取得
console.log(manager.preference); // 'light', 'dark', or 'auto'

// テーマを設定
manager.set('dark');

// トグル
manager.toggle();

// 変更を監視
const unsubscribe = manager.subscribe(({ theme, preference }) => {
  console.log(`Theme changed to: ${theme}`);
});

// 監視を解除
unsubscribe();
```

### Events

#### `theme-changed`

テーマが変更されたときに発火します。

```javascript
window.addEventListener('theme-changed', (event) => {
  console.log('New theme:', event.detail.theme);
  console.log('Preference:', event.detail.preference);
});
```

**Event detail:**
```javascript
{
  theme: 'light' | 'dark',        // 適用されたテーマ
  preference: 'light' | 'dark' | 'auto'  // ユーザーの設定
}
```

## Web Component

### `<ha-theme-switcher>`

テーマ切り替え用のWeb Componentです。

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'toggle'` \| `'dropdown'` \| `'segmented'` | `'toggle'` | 表示バリアント |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | サイズ |
| `show-label` | boolean | `false` | ラベルを表示するか |
| `show-auto` | boolean | `true` | Autoオプションを表示するか |

#### Variants

**Toggle Button**
```html
<ha-theme-switcher variant="toggle"></ha-theme-switcher>
<ha-theme-switcher variant="toggle" show-label></ha-theme-switcher>
```

**Dropdown**
```html
<ha-theme-switcher variant="dropdown"></ha-theme-switcher>
<ha-theme-switcher variant="dropdown" show-auto></ha-theme-switcher>
```

**Segmented Control**
```html
<ha-theme-switcher variant="segmented"></ha-theme-switcher>
<ha-theme-switcher variant="segmented" show-auto show-label></ha-theme-switcher>
```

#### Events

```javascript
const switcher = document.querySelector('ha-theme-switcher');

switcher.addEventListener('theme-change', (event) => {
  console.log('Theme changed:', event.detail);
});
```

#### Sizes

```html
<ha-theme-switcher size="sm"></ha-theme-switcher>
<ha-theme-switcher size="md"></ha-theme-switcher>
<ha-theme-switcher size="lg"></ha-theme-switcher>
```

## カスタマイズ

### CSSでスタイルを上書き

```css
ha-theme-switcher {
  /* カスタムスタイル */
}

ha-theme-switcher::part(button) {
  /* ボタンのスタイルを上書き */
}
```

### カスタムテーマカラーの定義

```css
[data-theme="light"] {
  --theme-background-primary: #ffffff;
  --theme-foreground-primary: #000000;
  /* その他のトークン */
}

[data-theme="dark"] {
  --theme-background-primary: #1a1a1a;
  --theme-foreground-primary: #ffffff;
  /* その他のトークン */
}
```

### トランジションの調整

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
```

## ベストプラクティス

### 1. 初期化は早めに

テーマのちらつきを防ぐため、できるだけ早く`initializeTheme()`を呼び出します。

```html
<head>
  <script type="module">
    import { initializeTheme } from '@hidearea-design/tokens/theme';
    initializeTheme();
  </script>
</head>
```

### 2. セマンティックトークンを使用

直接的な色指定ではなく、セマンティックトークンを使用します。

```css
/* Good ✓ */
.element {
  background: var(--background-primary);
  color: var(--foreground-primary);
  border: 1px solid var(--border-default);
}

/* Bad ✗ */
.element {
  background: #ffffff;
  color: #000000;
  border: 1px solid #e5e5e5;
}
```

### 3. システム設定を尊重

ユーザーがテーマを選択していない場合は、システム設定に従います。

```javascript
import { initializeTheme, getStoredTheme, setTheme } from '@hidearea-design/tokens/theme';

// 初期化時に自動でシステム設定を適用
initializeTheme();

// または明示的に
if (!getStoredTheme()) {
  setTheme('auto');
}
```

### 4. アクセシビリティを確保

すべてのテーマで適切なコントラスト比を維持します。

```css
/* コントラスト比を考慮したカラー設定 */
[data-theme="light"] {
  --theme-foreground-primary: #171717;  /* AAA対応 */
  --theme-background-primary: #ffffff;
}

[data-theme="dark"] {
  --theme-foreground-primary: #fafafa;  /* AAA対応 */
  --theme-background-primary: #171717;
}
```

### 5. パフォーマンスを考慮

CSSトランジションは控えめに使用します。

```css
/* 必要な要素のみトランジション */
body,
.card,
.button {
  transition: background-color 0.2s ease;
}

/* すべてに適用しない */
* {
  transition: all 0.2s ease; /* Bad ✗ */
}
```

## 例

### React での使用

```jsx
import { useEffect, useState } from 'react';
import { ThemeManager } from '@hidearea-design/tokens/theme';
import '@hidearea-design/tokens/theme-switcher';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const manager = new ThemeManager();

    const unsubscribe = manager.subscribe(({ theme }) => {
      setTheme(theme);
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Current theme: {theme}</h1>
      <ha-theme-switcher variant="segmented" show-auto></ha-theme-switcher>
    </div>
  );
}
```

### Vue での使用

```vue
<template>
  <div>
    <h1>Current theme: {{ theme }}</h1>
    <ha-theme-switcher variant="segmented" show-auto></ha-theme-switcher>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ThemeManager } from '@hidearea-design/tokens/theme';
import '@hidearea-design/tokens/theme-switcher';

const theme = ref('light');
let unsubscribe = null;

onMounted(() => {
  const manager = new ThemeManager();
  unsubscribe = manager.subscribe(({ theme: newTheme }) => {
    theme.value = newTheme;
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>
```

## トラブルシューティング

### テーマが適用されない

1. `initializeTheme()`が呼ばれているか確認
2. CSS変数が正しく読み込まれているか確認
3. ブラウザの開発者ツールで`data-theme`属性を確認

### ちらつきが発生する

`initializeTheme()`をできるだけ早く（`<head>`内で）呼び出してください。

```html
<head>
  <script type="module">
    import { initializeTheme } from '@hidearea-design/tokens/theme';
    initializeTheme();
  </script>
</head>
```

### localStorage が動作しない

プライベートモードやCookie無効の環境では、localStorage が使用できません。この場合、テーマはセッション中のみ保持されます。

## まとめ

Hidearea Design Systemのテーマシステムは、シンプルで強力なAPIを提供し、ライト・ダークモードの完全なサポートを実現しています。セマンティックトークンを使用することで、すべてのコンポーネントが自動的にテーマに適応し、一貫したユーザー体験を提供します。
