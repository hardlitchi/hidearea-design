# Theme System Guide

Hidearea Design Systemの包括的なテーマシステムガイド。ライト・ダークモード、カスタムテーマの作成、テーマ切り替えの実装方法を解説します。

## 目次

- [概要](#概要)
- [テーマの仕組み](#テーマの仕組み)
- [基本的な使い方](#基本的な使い方)
- [デザイントークンとテーマ](#デザイントークンとテーマ)
- [テーマのカスタマイズ](#テーマのカスタマイズ)
- [テーマ切り替えの実装](#テーマ切り替えの実装)
- [高度な使用方法](#高度な使用方法)
- [ベストプラクティス](#ベストプラクティス)
- [トラブルシューティング](#トラブルシューティング)

## 概要

Hidearea Design Systemは、完全なテーマサポートを提供します：

- **ライト・ダークモード**: 2つの組み込みテーマ
- **システム設定連動**: OSのテーマ設定に自動追従
- **スムーズな切り替え**: アニメーション付きテーマ遷移
- **永続化**: LocalStorageによるテーマ設定の保存
- **カスタマイズ可能**: 独自のテーマを簡単に作成
- **アクセシビリティ**: WCAG AA準拠のコントラスト比

## テーマの仕組み

### テーマアーキテクチャ

テーマシステムは3層構造で構成されています：

```
┌─────────────────────────────────────┐
│  1. ベーストークン                    │
│  (colors, spacing, typography)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  2. セマンティックトークン              │
│  (component-*, surface-*, text-*)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  3. テーマバリアント                   │
│  (light, dark)                      │
└─────────────────────────────────────┘
```

### テーマトークンの定義

各テーマは、`data-theme`属性を使用してセマンティックトークンを上書きします：

```css
/* ライトテーマ */
[data-theme="light"] {
  --component-button-primary-background-default: #3B82F6;
  --component-button-primary-background-hover: #2563EB;
  --surface-base-background: #FFFFFF;
  --text-body-default-color: #171717;
}

/* ダークテーマ */
[data-theme="dark"] {
  --component-button-primary-background-default: #2563EB;
  --component-button-primary-background-hover: #1D4ED8;
  --surface-base-background: #171717;
  --text-body-default-color: #FAFAFA;
}
```

### テーマの検出順序

1. **LocalStorageの設定**: ユーザーが明示的に選択したテーマ
2. **システム設定**: `prefers-color-scheme`メディアクエリ
3. **デフォルト**: ライトテーマ

## 基本的な使い方

### インストール

```bash
npm install @hidearea-design/core @hidearea-design/tokens
```

### 最小限のセットアップ

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="node_modules/@hidearea-design/tokens/css/variables.css">
</head>
<body>
  <script type="module">
    import { initTheme } from '@hidearea-design/core/utils/theme';

    // テーマシステムを初期化
    initTheme();
  </script>
</body>
</html>
```

### JavaScriptでのテーマ操作

```javascript
import {
  initTheme,
  getTheme,
  setTheme,
  toggleTheme,
  getEffectiveTheme,
  onThemeChange
} from '@hidearea-design/core/utils/theme';

// 1. 初期化（ページロード時に1回だけ）
initTheme();

// 2. 現在のテーマを取得
const current = getTheme(); // 'light' | 'dark' | 'auto'

// 3. 実際に適用されているテーマを取得
const effective = getEffectiveTheme(); // 'light' | 'dark'

// 4. テーマを設定
setTheme('dark');   // ダークモード
setTheme('light');  // ライトモード
setTheme('auto');   // システム設定に従う

// 5. ライト⇔ダークをトグル
toggleTheme();

// 6. テーマ変更を監視
const unsubscribe = onThemeChange((theme) => {
  console.log('Theme changed to:', theme);
});

// 監視を解除
unsubscribe();
```

## デザイントークンとテーマ

### トークンカテゴリ

テーマシステムで使用される主なトークンカテゴリ：

#### 1. コンポーネントトークン

コンポーネント固有のスタイル定義：

```css
/* Button */
--component-button-primary-background-default
--component-button-primary-background-hover
--component-button-primary-background-active
--component-button-primary-text-default
--component-button-primary-border-default

/* Input */
--component-input-background-default
--component-input-background-disabled
--component-input-text-default
--component-input-text-placeholder
--component-input-border-default
--component-input-border-hover
--component-input-border-focus

/* Card */
--component-card-background-default
--component-card-background-hover
--component-card-background-selected
--component-card-border-default
```

#### 2. サーフェストークン

背景や階層を表現：

```css
/* Base surfaces */
--surface-base-background
--surface-base-foreground
--surface-base-border

/* Raised surfaces (cards, modals) */
--surface-raised-background
--surface-raised-foreground
--surface-raised-border
--surface-raised-elevation

/* Overlay surfaces (modals, drawers) */
--surface-overlay-background
--surface-overlay-foreground
--surface-overlay-scrim
```

#### 3. テキストトークン

タイポグラフィとコントラスト：

```css
/* Body text */
--text-body-default-color
--text-body-muted-color
--text-body-subtle-color

/* Headings */
--text-heading-default-color
--text-heading-muted-color

/* UI text */
--text-label-default-color
--text-caption-default-color
--text-helper-default-color

/* Links */
--text-link-default-color
--text-link-hover-color
--text-link-visited-color
```

#### 4. 状態トークン

インタラクション状態：

```css
/* Focus */
--state-focus-ring-color
--state-focus-ring-width
--state-focus-ring-offset

/* Hover */
--state-hover-elevation-low
--state-hover-elevation-medium
--state-hover-elevation-high

/* Disabled */
--state-disabled-opacity
--state-disabled-cursor

/* Loading */
--state-loading-overlay-background
--state-loading-spinner-color
```

### テーマ別トークン値

#### ライトテーマの主要トークン

```css
[data-theme="light"] {
  /* Surfaces */
  --surface-base-background: #FFFFFF;
  --surface-base-foreground: #171717;
  --surface-base-border: #E5E5E5;

  --surface-raised-background: #FFFFFF;
  --surface-raised-elevation: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

  --surface-overlay-background: #FFFFFF;
  --surface-overlay-scrim: rgba(0, 0, 0, 0.5);

  /* Text */
  --text-body-default-color: #171717;
  --text-body-muted-color: #525252;
  --text-body-subtle-color: #737373;

  /* Components */
  --component-button-primary-background-default: #3B82F6;
  --component-input-background-default: #FFFFFF;
  --component-input-border-default: #D4D4D4;
  --component-card-background-default: #FFFFFF;

  /* States */
  --state-focus-ring-color: #3B82F6;
  --state-hover-elevation-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

#### ダークテーマの主要トークン

```css
[data-theme="dark"] {
  /* Surfaces */
  --surface-base-background: #171717;
  --surface-base-foreground: #FAFAFA;
  --surface-base-border: #404040;

  --surface-raised-background: #262626;
  --surface-raised-elevation: 0 1px 3px 0 rgba(0, 0, 0, 0.3);

  --surface-overlay-background: #262626;
  --surface-overlay-scrim: rgba(0, 0, 0, 0.75);

  /* Text */
  --text-body-default-color: #FAFAFA;
  --text-body-muted-color: #A3A3A3;
  --text-body-subtle-color: #737373;

  /* Components */
  --component-button-primary-background-default: #2563EB;
  --component-input-background-default: #262626;
  --component-input-border-default: #525252;
  --component-card-background-default: #262626;

  /* States */
  --state-focus-ring-color: #60A5FA;
  --state-hover-elevation-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
}
```

## テーマのカスタマイズ

### 方法1: CSS変数の上書き

既存のテーマをベースにカスタマイズ：

```css
/* custom-theme.css */
[data-theme="light"] {
  /* ブランドカラーに変更 */
  --component-button-primary-background-default: #8B5CF6;
  --component-button-primary-background-hover: #7C3AED;
  --state-focus-ring-color: #8B5CF6;

  /* サーフェスを調整 */
  --surface-base-background: #F9FAFB;
  --surface-raised-background: #FFFFFF;
}

[data-theme="dark"] {
  --component-button-primary-background-default: #A78BFA;
  --component-button-primary-background-hover: #8B5CF6;
  --state-focus-ring-color: #A78BFA;

  --surface-base-background: #111827;
  --surface-raised-background: #1F2937;
}
```

### 方法2: カスタムテーマの作成

新しいテーマを定義：

```css
/* brand-theme.css */
[data-theme="brand"] {
  /* ブランド専用のカラーパレット */
  --surface-base-background: #FEF3C7;
  --surface-base-foreground: #78350F;
  --surface-base-border: #FCD34D;

  --component-button-primary-background-default: #F59E0B;
  --component-button-primary-background-hover: #D97706;
  --component-button-primary-text-default: #FFFFFF;

  --text-body-default-color: #78350F;
  --text-heading-default-color: #92400E;

  --state-focus-ring-color: #F59E0B;
}
```

```javascript
// カスタムテーマを適用
document.documentElement.setAttribute('data-theme', 'brand');
```

### 方法3: Design Tokensでのカスタマイズ

Style Dictionary形式でトークンを定義：

```json
{
  "theme": {
    "custom": {
      "component": {
        "button": {
          "primary": {
            "background": {
              "default": { "value": "#8B5CF6" },
              "hover": { "value": "#7C3AED" },
              "active": { "value": "#6D28D9" }
            },
            "text": {
              "default": { "value": "#FFFFFF" }
            }
          }
        }
      },
      "surface": {
        "base": {
          "background": { "value": "#F9FAFB" },
          "foreground": { "value": "#111827" },
          "border": { "value": "#E5E7EB" }
        }
      }
    }
  }
}
```

ビルドして使用：

```bash
cd packages/tokens
npm run build
```

### テーマプリセット

よくあるカスタマイズパターン：

#### High Contrast（高コントラスト）

```css
[data-theme="high-contrast"] {
  --surface-base-background: #FFFFFF;
  --surface-base-foreground: #000000;
  --text-body-default-color: #000000;
  --component-button-primary-background-default: #000000;
  --component-input-border-default: #000000;
  --state-focus-ring-width: 3px;
}
```

#### Sepia（セピア）

```css
[data-theme="sepia"] {
  --surface-base-background: #F4ECD8;
  --surface-base-foreground: #5B4636;
  --text-body-default-color: #5B4636;
  --component-button-primary-background-default: #8B7355;
  --component-card-background-default: #F9F5EB;
}
```

## テーマ切り替えの実装

### 方法1: Theme Switcherコンポーネント

最も簡単な方法：

```html
<ha-theme-switcher></ha-theme-switcher>

<script type="module">
  import '@hidearea-design/core/components/theme-switcher/theme-switcher.js';
  import { initTheme } from '@hidearea-design/core/utils/theme';

  initTheme();
</script>
```

バリアント：

```html
<!-- ボタングループ形式 -->
<ha-theme-switcher variant="segmented"></ha-theme-switcher>

<!-- ドロップダウン形式 -->
<ha-theme-switcher variant="dropdown"></ha-theme-switcher>

<!-- アイコンのみ -->
<ha-theme-switcher variant="icon-only"></ha-theme-switcher>

<!-- Auto選択を表示 -->
<ha-theme-switcher show-auto></ha-theme-switcher>
```

### 方法2: カスタムボタン

独自のUIを実装：

```html
<button id="theme-toggle" aria-label="Toggle theme">
  <span class="icon-light">☀️</span>
  <span class="icon-dark">🌙</span>
</button>

<script type="module">
  import { initTheme, toggleTheme, getEffectiveTheme, onThemeChange } from '@hidearea-design/core/utils/theme';

  initTheme();

  const button = document.getElementById('theme-toggle');
  const iconLight = button.querySelector('.icon-light');
  const iconDark = button.querySelector('.icon-dark');

  // アイコン表示を更新
  function updateIcon(theme) {
    if (theme === 'dark') {
      iconLight.style.display = 'none';
      iconDark.style.display = 'inline';
    } else {
      iconLight.style.display = 'inline';
      iconDark.style.display = 'none';
    }
  }

  // 初期状態
  updateIcon(getEffectiveTheme());

  // クリックでトグル
  button.addEventListener('click', () => {
    toggleTheme();
  });

  // テーマ変更を監視
  onThemeChange(updateIcon);
</script>
```

### 方法3: セレクトメニュー

3つのオプションを提供：

```html
<select id="theme-select">
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="auto">Auto</option>
</select>

<script type="module">
  import { initTheme, getTheme, setTheme, onThemeChange } from '@hidearea-design/core/utils/theme';

  initTheme();

  const select = document.getElementById('theme-select');
  select.value = getTheme();

  select.addEventListener('change', (e) => {
    setTheme(e.target.value);
  });

  onThemeChange(() => {
    select.value = getTheme();
  });
</script>
```

## 高度な使用方法

### テーマトランジション

スムーズなテーマ切り替えアニメーション：

```css
:root {
  /* トランジション対象のプロパティ */
  --theme-transition-properties: background-color, color, border-color, box-shadow;
  --theme-transition-duration: 200ms;
  --theme-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* すべての要素にトランジションを適用 */
*,
*::before,
*::after {
  transition: var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-easing);
}

/* パフォーマンス最適化: 初回ロード時はトランジション無効 */
html.no-transition *,
html.no-transition *::before,
html.no-transition *::after {
  transition: none !important;
}
```

```javascript
import { initTheme, setTheme } from '@hidearea-design/core/utils/theme';

// 初期化時はトランジション無効
document.documentElement.classList.add('no-transition');
initTheme();

// ロード後に有効化
window.addEventListener('load', () => {
  document.documentElement.classList.remove('no-transition');
});

// テーマ切り替え
function switchTheme(newTheme) {
  // View Transition APIがある場合
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  } else {
    setTheme(newTheme);
  }
}
```

### Per-Componentテーマ

特定のコンポーネントだけ異なるテーマ：

```html
<div data-theme="light">
  <ha-button variant="primary">Light Button</ha-button>
</div>

<div data-theme="dark">
  <ha-button variant="primary">Dark Button</ha-button>
</div>
```

```css
/* コンポーネントスコープのテーマ */
.card[data-theme="dark"] {
  --component-card-background-default: #262626;
  --component-card-border-default: #404040;
  --text-body-default-color: #FAFAFA;
}
```

### システムテーマ変更の検出

```javascript
import { initTheme, getTheme, getEffectiveTheme } from '@hidearea-design/core/utils/theme';

initTheme();

// システムテーマ設定の変更を監視
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

mediaQuery.addEventListener('change', (e) => {
  const currentTheme = getTheme();

  // Auto設定の場合のみ反応
  if (currentTheme === 'auto') {
    const newTheme = e.matches ? 'dark' : 'light';
    console.log('System theme changed to:', newTheme);

    // 必要に応じて追加処理
    // 例: アナリティクスイベント送信
  }
});
```

### テーマごとの画像・アセット

```html
<picture>
  <source
    srcset="/images/hero-dark.jpg"
    media="(prefers-color-scheme: dark)"
  >
  <img src="/images/hero-light.jpg" alt="Hero image">
</picture>
```

CSS版：

```css
.logo {
  background-image: url('/images/logo-light.svg');
}

[data-theme="dark"] .logo {
  background-image: url('/images/logo-dark.svg');
}
```

### テーマに基づく条件分岐

```javascript
import { getEffectiveTheme, onThemeChange } from '@hidearea-design/core/utils/theme';

function updateChart() {
  const theme = getEffectiveTheme();

  const chartOptions = {
    theme: theme,
    colors: theme === 'dark'
      ? ['#60A5FA', '#34D399', '#FBBF24']
      : ['#3B82F6', '#10B981', '#F59E0B'],
    backgroundColor: theme === 'dark' ? '#171717' : '#FFFFFF',
    textColor: theme === 'dark' ? '#FAFAFA' : '#171717'
  };

  renderChart(chartOptions);
}

// 初回レンダリング
updateChart();

// テーマ変更時に再レンダリング
onThemeChange(updateChart);
```

## ベストプラクティス

### 1. セマンティックトークンを使用

```css
/* ✓ 良い例 */
.button {
  background: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
}

/* ✗ 悪い例 */
.button {
  background: #3B82F6;
  color: white;
}
```

### 2. テーマに依存しない実装

```javascript
// ✓ 良い例: トークンを使用
element.style.setProperty('background', 'var(--surface-raised-background)');

// ✗ 悪い例: ハードコードされた色
element.style.background = '#FFFFFF';
```

### 3. コントラスト比の確保

```css
/* WCAG AA準拠（4.5:1以上） */
[data-theme="light"] {
  --text-body-default-color: #171717; /* on #FFFFFF = 16.1:1 */
  --text-body-muted-color: #525252;   /* on #FFFFFF = 7.6:1 */
}

[data-theme="dark"] {
  --text-body-default-color: #FAFAFA; /* on #171717 = 15.6:1 */
  --text-body-muted-color: #A3A3A3;   /* on #171717 = 5.9:1 */
}
```

### 4. パフォーマンス最適化

```javascript
// ✓ 良い例: デバウンス
import { setTheme } from '@hidearea-design/core/utils/theme';

let timeoutId;
function debouncedSetTheme(theme) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    setTheme(theme);
  }, 100);
}

// ✗ 悪い例: 頻繁な切り替え
element.addEventListener('mousemove', () => {
  setTheme(Math.random() > 0.5 ? 'light' : 'dark');
});
```

### 5. アクセシビリティ

```html
<!-- ✓ 良い例: ARIAラベル -->
<button
  id="theme-toggle"
  aria-label="Switch to dark mode"
  aria-pressed="false"
>
  Toggle Theme
</button>

<script>
  const button = document.getElementById('theme-toggle');

  onThemeChange((theme) => {
    const isDark = theme === 'dark';
    button.setAttribute('aria-pressed', isDark);
    button.setAttribute('aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
  });
</script>
```

### 6. SSR対応

```javascript
// サーバーサイド: クッキーにテーマを保存
function getThemeFromCookie() {
  const cookies = document.cookie.split(';');
  const themeCookie = cookies.find(c => c.trim().startsWith('theme='));
  return themeCookie ? themeCookie.split('=')[1] : 'auto';
}

// クライアントサイド: 初期化前に適用
const savedTheme = getThemeFromCookie();
document.documentElement.setAttribute('data-theme',
  savedTheme === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : savedTheme
);

// その後通常の初期化
initTheme();
```

### 7. テストの実装

```javascript
// テーマ切り替えのテスト
describe('Theme System', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should default to auto mode', () => {
    initTheme();
    expect(getTheme()).toBe('auto');
  });

  it('should switch to dark mode', () => {
    initTheme();
    setTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should persist theme in localStorage', () => {
    setTheme('dark');
    expect(localStorage.getItem('ha-theme')).toBe('dark');
  });

  it('should toggle between light and dark', () => {
    setTheme('light');
    toggleTheme();
    expect(getEffectiveTheme()).toBe('dark');
    toggleTheme();
    expect(getEffectiveTheme()).toBe('light');
  });
});
```

## トラブルシューティング

### 問題: テーマが適用されない

**原因**: CSS変数がロードされていない

**解決策**:
```html
<!-- トークンCSSを必ずインポート -->
<link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
```

### 問題: ちらつきが発生する

**原因**: 初期化タイミングが遅い

**解決策**:
```html
<head>
  <!-- できるだけ早く実行 -->
  <script>
    const theme = localStorage.getItem('ha-theme') || 'auto';
    const effective = theme === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.setAttribute('data-theme', effective);
  </script>
</head>
```

### 問題: システムテーマに追従しない

**原因**: Auto設定時のリスナーが動作していない

**解決策**:
```javascript
// 必ずinitTheme()を呼び出す
initTheme();

// Auto設定になっているか確認
console.log(getTheme()); // 'auto'であるべき
```

### 問題: カスタムトークンが効かない

**原因**: 詳細度の問題

**解決策**:
```css
/* ✗ 詳細度が低い */
:root {
  --component-button-primary-background-default: red;
}

/* ✓ テーマセレクタを使用 */
[data-theme="light"] {
  --component-button-primary-background-default: red;
}
```

### 問題: パフォーマンスが悪い

**原因**: トランジションが多すぎる

**解決策**:
```css
/* 必要なプロパティだけトランジション */
* {
  transition: background-color 200ms, color 200ms;
}

/* transform, opacityは除外（アニメーションで使う） */
```

### デバッグヒント

```javascript
// 現在のテーマ状態を確認
console.log({
  stored: localStorage.getItem('ha-theme'),
  current: getTheme(),
  effective: getEffectiveTheme(),
  attribute: document.documentElement.getAttribute('data-theme'),
  systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches
});

// すべてのテーマトークンを確認
const styles = getComputedStyle(document.documentElement);
const tokens = Array.from(document.styleSheets)
  .flatMap(sheet => Array.from(sheet.cssRules || []))
  .filter(rule => rule.selectorText?.includes('[data-theme='))
  .flatMap(rule => Array.from(rule.style))
  .filter(prop => prop.startsWith('--'));

console.log('Theme tokens:', [...new Set(tokens)]);
```

## まとめ

Hidearea Design Systemのテーマシステムは：

- **簡単に始められる**: `initTheme()`だけで基本機能が使える
- **柔軟にカスタマイズ可能**: CSS変数で簡単に上書き
- **パフォーマンス最適化済み**: 効率的な実装
- **アクセシビリティ対応**: WCAG準拠のコントラスト比
- **開発者フレンドリー**: 豊富なAPI、デバッグツール

詳細な実装例は[examples/](../../examples/)ディレクトリを参照してください。

## 関連ドキュメント

- [セマンティックトークンガイド](../../packages/tokens/docs/セマンティックトークンガイド.md)
- [アーキテクチャガイド](../../packages/tokens/docs/アーキテクチャガイド.md)
- [Theme Switcherコンポーネント](../../packages/core/src/components/theme-switcher/README.md)
