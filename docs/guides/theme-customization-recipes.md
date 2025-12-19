# Theme Customization Recipes

実践的なテーマカスタマイズのレシピ集。よくあるカスタマイズパターンをコピー&ペーストで使えます。

## 目次

- [ブランドカラーのカスタマイズ](#ブランドカラーのカスタマイズ)
- [ダークモードのカスタマイズ](#ダークモードのカスタマイズ)
- [特殊テーマの作成](#特殊テーマの作成)
- [コンポーネント別カスタマイズ](#コンポーネント別カスタマイズ)
- [レイアウトのカスタマイズ](#レイアウトのカスタマイズ)
- [アニメーションのカスタマイズ](#アニメーションのカスタマイズ)

## ブランドカラーのカスタマイズ

### レシピ1: プライマリカラーを変更

```css
/* custom-brand.css */
:root {
  /* Step 1: ブランドカラーパレットを定義 */
  --color-brand-50: #F0F9FF;
  --color-brand-100: #E0F2FE;
  --color-brand-200: #BAE6FD;
  --color-brand-300: #7DD3FC;
  --color-brand-400: #38BDF8;
  --color-brand-500: #0EA5E9; /* メインカラー */
  --color-brand-600: #0284C7;
  --color-brand-700: #0369A1;
  --color-brand-800: #075985;
  --color-brand-900: #0C4A6E;

  /* Step 2: プライマリカラートークンを上書き */
  --color-primary-50: var(--color-brand-50);
  --color-primary-100: var(--color-brand-100);
  --color-primary-200: var(--color-brand-200);
  --color-primary-300: var(--color-brand-300);
  --color-primary-400: var(--color-brand-400);
  --color-primary-500: var(--color-brand-500);
  --color-primary-600: var(--color-brand-600);
  --color-primary-700: var(--color-brand-700);
  --color-primary-800: var(--color-brand-800);
  --color-primary-900: var(--color-brand-900);
}

/* ダークモード用の調整 */
[data-theme="dark"] {
  --color-primary-500: var(--color-brand-400); /* ダークでは明るめに */
  --color-primary-600: var(--color-brand-500);
}
```

### レシピ2: セカンダリカラーを追加

```css
:root {
  /* セカンダリカラーパレット */
  --color-secondary-50: #FDF4FF;
  --color-secondary-100: #FAE8FF;
  --color-secondary-500: #A855F7;
  --color-secondary-600: #9333EA;
  --color-secondary-700: #7E22CE;

  /* セカンダリボタンを定義 */
  --component-button-secondary-background-default: var(--color-secondary-500);
  --component-button-secondary-background-hover: var(--color-secondary-600);
  --component-button-secondary-background-active: var(--color-secondary-700);
  --component-button-secondary-text-default: var(--color-white);
  --component-button-secondary-border-default: var(--color-secondary-500);
}

[data-theme="dark"] {
  --component-button-secondary-background-default: var(--color-secondary-600);
  --component-button-secondary-background-hover: var(--color-secondary-700);
}
```

使用例：

```css
.button--secondary {
  background-color: var(--component-button-secondary-background-default);
  color: var(--component-button-secondary-text-default);
  border-color: var(--component-button-secondary-border-default);
}
```

### レシピ3: カラーパレット全体を置き換え

企業ブランドガイドラインに合わせた完全なカスタマイズ：

```css
/* acme-brand.css */
:root {
  /* === ACME Corp. Brand Colors === */

  /* Primary: ACME Blue */
  --color-primary-500: #0066CC;
  --color-primary-600: #0052A3;
  --color-primary-700: #003D7A;

  /* Accent: ACME Orange */
  --color-accent-500: #FF6B35;
  --color-accent-600: #E5551F;

  /* Neutral: ACME Gray */
  --color-gray-100: #F5F5F5;
  --color-gray-300: #D1D1D1;
  --color-gray-500: #8C8C8C;
  --color-gray-700: #4A4A4A;
  --color-gray-900: #1A1A1A;

  /* Semantic colors */
  --color-success-500: #00A86B;
  --color-warning-500: #FFB627;
  --color-error-500: #DC3545;

  /* === Apply to components === */

  /* Buttons */
  --component-button-primary-background-default: var(--color-primary-500);
  --component-button-primary-background-hover: var(--color-primary-600);

  /* Links */
  --text-link-default-color: var(--color-primary-600);
  --text-link-hover-color: var(--color-primary-700);

  /* Focus ring */
  --state-focus-ring-color: var(--color-primary-500);

  /* Badges */
  --component-badge-primary-background: var(--color-accent-500);
  --component-badge-primary-text: var(--color-white);
}
```

## ダークモードのカスタマイズ

### レシピ4: ダークモードの色調整

```css
[data-theme="dark"] {
  /* === Background tones === */

  /* より暗いベース（True Black寄り） */
  --surface-base-background: #0A0A0A;
  --surface-raised-background: #1A1A1A;

  /* または、より明るいベース（グレー寄り） */
  --surface-base-background: #1E1E1E;
  --surface-raised-background: #2D2D2D;

  /* === Text contrast === */

  /* より高コントラスト */
  --text-body-default-color: #FFFFFF;
  --text-body-muted-color: #CCCCCC;

  /* または、目に優しい低コントラスト */
  --text-body-default-color: #E5E5E5;
  --text-body-muted-color: #A0A0A0;

  /* === Component adjustments === */

  /* ボタンをより明るく */
  --component-button-primary-background-default: #60A5FA;
  --component-button-primary-background-hover: #3B82F6;

  /* シャドウを強調 */
  --surface-raised-elevation: 0 4px 12px 0 rgba(0, 0, 0, 0.5);
  --surface-overlay-elevation: 0 20px 25px -5px rgba(0, 0, 0, 0.8);
}
```

### レシピ5: OLED向け完全な黒背景

```css
[data-theme="dark"] {
  /* Pure black for OLED screens */
  --surface-base-background: #000000;
  --surface-raised-background: #0D0D0D;
  --surface-overlay-background: #121212;

  /* Increase contrast for readability */
  --text-body-default-color: #FFFFFF;
  --surface-base-border: #2A2A2A;

  /* Soften shadows on black */
  --surface-raised-elevation: 0 2px 8px 0 rgba(255, 255, 255, 0.05);
}
```

### レシピ6: ブルーライトカット（夜間モード）

```css
[data-theme="dark"] {
  /* Warm tones for night mode */
  --surface-base-background: #1A1612;
  --surface-raised-background: #251F1A;
  --text-body-default-color: #F5E6D3;
  --text-body-muted-color: #C9B8A0;

  /* Reduce blue light in primary colors */
  --color-primary-500: #D97706; /* Amber instead of blue */
  --component-button-primary-background-default: #D97706;

  /* Warm tint on surfaces */
  filter: sepia(0.1);
}
```

## 特殊テーマの作成

### レシピ7: 高コントラストテーマ

```css
[data-theme="high-contrast"] {
  /* Maximum contrast */
  --surface-base-background: #FFFFFF;
  --surface-base-foreground: #000000;
  --text-body-default-color: #000000;

  /* Bold borders */
  --surface-base-border: #000000;
  --border-width-thin: 2px;
  --border-width-medium: 3px;

  /* Clear focus indicators */
  --state-focus-ring-width: 4px;
  --state-focus-ring-color: #0000FF;
  --state-focus-ring-offset: 2px;

  /* High contrast buttons */
  --component-button-primary-background-default: #000000;
  --component-button-primary-text-default: #FFFFFF;
  --component-button-primary-border-default: #000000;

  /* Remove subtle effects */
  --surface-raised-elevation: none;
  --state-hover-elevation-medium: none;
}

[data-theme="high-contrast-dark"] {
  --surface-base-background: #000000;
  --surface-base-foreground: #FFFFFF;
  --text-body-default-color: #FFFFFF;
  --surface-base-border: #FFFFFF;

  --component-button-primary-background-default: #FFFFFF;
  --component-button-primary-text-default: #000000;
}
```

### レシピ8: セピアテーマ（読書モード）

```css
[data-theme="sepia"] {
  /* Warm paper-like background */
  --surface-base-background: #F4ECD8;
  --surface-raised-background: #F9F5EB;
  --surface-overlay-background: #FBF8F0;

  /* Brown text for comfort */
  --text-body-default-color: #5B4636;
  --text-heading-default-color: #3E2F23;
  --text-body-muted-color: #8B7355;

  /* Sepia tinted components */
  --component-button-primary-background-default: #8B7355;
  --component-button-primary-background-hover: #725E46;
  --component-button-primary-text-default: #F4ECD8;

  --surface-base-border: #D4C4B0;
  --component-card-background-default: #F9F5EB;

  /* Soft shadows */
  --surface-raised-elevation: 0 2px 4px 0 rgba(91, 70, 54, 0.1);
}
```

### レシピ9: カラーブラインドモード

```css
[data-theme="colorblind-friendly"] {
  /* Use distinct hues that work for most color vision deficiencies */

  /* Primary: Blue (safe for all types) */
  --color-primary-500: #0077BB;

  /* Success: Blue-green */
  --color-success-500: #009988;

  /* Warning: Orange */
  --color-warning-500: #EE7733;

  /* Error: Vermillion (not pure red) */
  --color-error-500: #CC3311;

  /* Info: Sky blue */
  --color-info-500: #33BBEE;

  /* Add patterns for additional differentiation */
  --component-badge-success-background: var(--color-success-500);
  --component-badge-success-pattern: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.2) 2px,
    rgba(255,255,255,0.2) 4px
  );
}
```

## コンポーネント別カスタマイズ

### レシピ10: ボタンスタイルのカスタマイズ

```css
:root {
  /* === Rounded buttons === */
  --component-button-border-radius: var(--border-radius-full);

  /* === Larger buttons === */
  --component-button-padding-y: var(--spacing-3);
  --component-button-padding-x: var(--spacing-6);
  --component-button-font-size: var(--font-size-lg);

  /* === Bold button style === */
  --component-button-font-weight: var(--font-weight-bold);
  --component-button-text-transform: uppercase;
  --component-button-letter-spacing: 0.05em;

  /* === Glass morphism button === */
  --component-button-primary-background-default: rgba(59, 130, 246, 0.8);
  --component-button-primary-backdrop-filter: blur(10px);
  --component-button-primary-border-default: rgba(255, 255, 255, 0.2);
}

/* Apply backdrop filter to buttons */
.button--primary {
  backdrop-filter: var(--component-button-primary-backdrop-filter);
}
```

### レシピ11: Cardコンポーネントのカスタマイズ

```css
:root {
  /* === Elevated card === */
  --component-card-border-radius: var(--border-radius-2xl);
  --surface-raised-elevation: 0 10px 30px rgba(0, 0, 0, 0.15);

  /* === Bordered card === */
  --component-card-border-width: var(--border-width-medium);
  --component-card-border-default: var(--color-primary-200);

  /* === Gradient card === */
  --component-card-background-gradient: linear-gradient(
    135deg,
    var(--surface-raised-background) 0%,
    var(--color-primary-50) 100%
  );
}

.card {
  background: var(--component-card-background-gradient);
}

/* Glass morphism card */
.card--glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### レシピ12: Input/フォームのカスタマイズ

```css
:root {
  /* === Filled input style === */
  --component-input-background-default: var(--color-gray-100);
  --component-input-border-width: 0;
  --component-input-border-bottom-width: 2px;
  --component-input-border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;

  /* === Large input === */
  --component-input-padding-y: var(--spacing-4);
  --component-input-padding-x: var(--spacing-4);
  --component-input-font-size: var(--font-size-lg);

  /* === Animated focus === */
  --component-input-focus-scale: 1.02;
  --component-input-focus-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.input:focus {
  transform: scale(var(--component-input-focus-scale));
}
```

### レシピ13: モーダル/オーバーレイのカスタマイズ

```css
:root {
  /* === Stronger overlay === */
  --component-modal-background-overlay: rgba(0, 0, 0, 0.8);

  /* === Blurred backdrop === */
  --component-modal-backdrop-filter: blur(8px);

  /* === Rounded modal === */
  --component-modal-border-radius: var(--border-radius-2xl);

  /* === Large shadow === */
  --surface-overlay-elevation: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-overlay {
  backdrop-filter: var(--component-modal-backdrop-filter);
}
```

## レイアウトのカスタマイズ

### レシピ14: コンパクトレイアウト

```css
:root {
  /* Reduced spacing */
  --layout-container-padding: var(--spacing-3);
  --layout-section-gap: var(--spacing-4);
  --layout-grid-gap: var(--spacing-2);

  /* Smaller components */
  --component-button-padding-y: var(--spacing-1-5);
  --component-button-padding-x: var(--spacing-3);
  --component-input-padding-y: var(--spacing-2);

  /* Tighter typography */
  --text-body-default-fontSize: var(--font-size-sm);
  --line-height-normal: 1.4;
}
```

### レシピ15: 広々としたレイアウト

```css
:root {
  /* Generous spacing */
  --layout-container-padding: var(--spacing-8);
  --layout-section-gap: var(--spacing-16);
  --layout-grid-gap: var(--spacing-8);

  /* Larger components */
  --component-button-padding-y: var(--spacing-4);
  --component-button-padding-x: var(--spacing-8);
  --component-input-padding-y: var(--spacing-4);

  /* Relaxed typography */
  --text-body-default-fontSize: var(--font-size-lg);
  --line-height-normal: 1.75;
}
```

### レシピ16: 固定幅コンテナ

```css
:root {
  --layout-container-max-width: 1200px;
}

@media (min-width: 1536px) {
  :root {
    --layout-container-max-width: 1400px;
  }
}

/* Full-width variant */
.container--full {
  --layout-container-max-width: 100%;
}

/* Narrow variant (for reading) */
.container--narrow {
  --layout-container-max-width: 720px;
}
```

## アニメーションのカスタマイズ

### レシピ17: 高速アニメーション

```css
:root {
  /* Faster transitions */
  --duration-fast: 100ms;
  --duration-normal: 150ms;
  --duration-slow: 250ms;

  /* Snappier easing */
  --easing-ease-out: cubic-bezier(0.2, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### レシピ18: スローモーション（豪華な演出）

```css
:root {
  /* Slower transitions */
  --duration-fast: 300ms;
  --duration-normal: 500ms;
  --duration-slow: 800ms;

  /* Elastic easing */
  --easing-ease-out: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Spring animation */
  --easing-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### レシピ19: アニメーション無効化（アクセシビリティ）

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-instant: 0ms;
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
  }

  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### レシピ20: カスタムアニメーション

```css
:root {
  /* Bounce animation */
  --animation-bounce-duration: 600ms;
  --animation-bounce-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes custom-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.button:hover {
  animation: custom-bounce var(--animation-bounce-duration) var(--animation-bounce-easing);
}

/* Pulse animation */
@keyframes custom-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.98);
  }
}

.loading {
  animation: custom-pulse var(--duration-slow) var(--easing-ease-in-out) infinite;
}
```

## 組み合わせ例

### レシピ21: 完全カスタムテーマ

```css
/* mytheme.css - Complete custom theme */

:root {
  /* === Brand colors === */
  --color-brand-primary: #6366F1;
  --color-brand-secondary: #EC4899;
  --color-brand-accent: #14B8A6;

  /* === Override primary colors === */
  --color-primary-500: var(--color-brand-primary);
  --color-primary-600: #4F46E5;

  /* === Layout === */
  --layout-container-max-width: 1280px;
  --layout-container-padding: var(--spacing-6);
  --layout-section-gap: var(--spacing-12);

  /* === Typography === */
  --font-family-base: 'Inter', system-ui, sans-serif;
  --text-body-default-fontSize: 16px;
  --line-height-normal: 1.6;

  /* === Components === */
  --component-button-border-radius: var(--border-radius-lg);
  --component-card-border-radius: var(--border-radius-xl);
  --component-input-border-radius: var(--border-radius-lg);

  /* === Effects === */
  --surface-raised-elevation: 0 4px 16px rgba(0, 0, 0, 0.1);
  --state-hover-elevation-medium: 0 8px 24px rgba(0, 0, 0, 0.15);

  /* === Animations === */
  --duration-normal: 250ms;
  --easing-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="dark"] {
  --surface-base-background: #0F172A;
  --surface-raised-background: #1E293B;
  --text-body-default-color: #F1F5F9;
  --surface-base-border: #334155;

  /* Adjust brand colors for dark mode */
  --color-primary-500: #818CF8;
  --component-button-primary-background-default: var(--color-primary-500);
}
```

## テーマの適用方法

### HTMLから読み込む

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- Base tokens -->
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">

  <!-- Your custom theme -->
  <link rel="stylesheet" href="./path/to/your-theme.css">
</head>
<body>
  <!-- Your content -->
</body>
</html>
```

### JavaScript で動的に切り替え

```javascript
// テーマファイルを動的にロード
function loadTheme(themeName) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `/themes/${themeName}.css`;
  link.id = 'custom-theme';

  // 既存のカスタムテーマを削除
  const existing = document.getElementById('custom-theme');
  if (existing) {
    existing.remove();
  }

  document.head.appendChild(link);
}

// 使用例
loadTheme('acme-brand');
loadTheme('high-contrast');
```

### CSS変数を直接操作

```javascript
function applyTheme(themeConfig) {
  const root = document.documentElement;

  Object.entries(themeConfig).forEach(([token, value]) => {
    root.style.setProperty(token, value);
  });
}

// 使用例
applyTheme({
  '--color-primary-500': '#FF6B35',
  '--component-button-border-radius': '24px',
  '--layout-container-max-width': '1400px'
});
```

## まとめ

このレシピ集を使えば：

1. **ブランドカラー**を簡単に適用
2. **ダークモード**を細かく調整
3. **特殊なテーマ**（高コントラスト、セピアなど）を作成
4. **コンポーネント単位**でスタイルをカスタマイズ
5. **レイアウト**と**アニメーション**を最適化

すべてのレシピはコピー&ペーストで使用でき、自由に組み合わせることができます。

## 関連ドキュメント

- [Theme System Guide](./theme-system.md)
- [Design Tokens Usage Guide](./design-tokens-usage.md)
- [セマンティックトークンガイド](../../packages/tokens/docs/セマンティックトークンガイド.md)
