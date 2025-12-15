# Navigation (ナビゲーション) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/css/components/navigation/navigation.css`
**ステータス:** ✅ 実装済み

---

## 概要

Navigationコンポーネントは、アプリケーション内のページ間を移動するためのメニュー要素です。複数の状態（default, active, hover）をサポートし、ユーザーが現在位置を把握しやすくします。

### 用途

- メインナビゲーションメニュー
- サイドバーナビゲーション
- タブナビゲーション
- ブレッドクラム
- フッターリンク
- ページ内ナビゲーション

---

## 状態

### 1. Default (デフォルト)

通常の非アクティブな状態です。

**使用場面:**
- 現在のページではないリンク
- 標準的なナビゲーション項目
- クリック可能な項目

**トークンプレフィックス:** `component.navigation.background.default`, `component.navigation.text.default`

### 2. Active (アクティブ)

現在選択されているページの状態です。

**使用場面:**
- 現在表示中のページ
- アクティブなセクション
- 選択された項目

**トークンプレフィックス:** `component.navigation.background.active`, `component.navigation.text.active`

### 3. Hover (ホバー)

マウスオーバー時の状態です。

**使用場面:**
- ユーザーがリンクの上にマウスを置いた時
- インタラクティブであることを示す
- クリック前のフィードバック

**トークンプレフィックス:** `component.navigation.text.hover`

---

## トークン一覧

### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.navigation.background.default` | `{background.primary}` | デフォルト背景色 |
| `component.navigation.background.active` | `{primary.subtle}` | アクティブ項目の背景色 |

### Text (テキスト色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.navigation.text.default` | `{foreground.secondary}` | デフォルトテキスト色 |
| `component.navigation.text.active` | `{primary.active}` | アクティブ項目のテキスト色 |
| `component.navigation.text.hover` | `{foreground.primary}` | ホバー時テキスト色 |

---

## 使用方法



### Pattern 2: Plain HTML (推奨)

#### CSSファイルの読み込み

```html
<link rel="stylesheet" href="@hidearea-design/tokens/build/css/html/navigation/navigation.css">
```

#### 基本的な構造

Navigation コンポーネントは `.ha-navigation` をルート要素とし、その中に `<nav class="navigation">` を配置します。

```html
<div class="ha-navigation">
  <nav class="navigation">
    <a href="/" class="navigation-brand">
      <img src="/logo.svg" alt="ロゴ" class="navigation-brand-logo">
      <span>サイト名</span>
    </a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link" aria-current="page">
          ホーム
        </a>
      </li>
      <li class="navigation-item">
        <a href="/about" class="navigation-link">
          概要
        </a>
      </li>
      <li class="navigation-item">
        <a href="/contact" class="navigation-link">
          お問い合わせ
        </a>
      </li>
    </ul>

    <ul class="navigation-menu navigation-menu-end">
      <li class="navigation-item">
        <button class="navigation-link">ログイン</button>
      </li>
    </ul>

    <button class="navigation-toggle" aria-label="メニューを開く">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 12h18M3 6h18M3 18h18"/>
      </svg>
    </button>
  </nav>
</div>
```

#### アイコン付きリンク

```html
<div class="ha-navigation">
  <nav class="navigation">
    <a href="/" class="navigation-brand">
      <img src="/logo.svg" alt="ロゴ" class="navigation-brand-logo">
      <span>サイト名</span>
    </a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link">
          <svg class="navigation-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1l7 6v8H1V7l7-6z"/>
          </svg>
          ホーム
        </a>
      </li>
      <li class="navigation-item">
        <a href="/dashboard" class="navigation-link">
          <svg class="navigation-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 0h7v7H0V0zm9 0h7v7H9V0zM0 9h7v7H0V9zm9 0h7v7H9V9z"/>
          </svg>
          ダッシュボード
        </a>
      </li>
      <li class="navigation-item">
        <a href="/settings" class="navigation-link">
          <svg class="navigation-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zM5.754 8a2.246 2.246 0 114.492 0 2.246 2.246 0 01-4.492 0z"/>
          </svg>
          設定
        </a>
      </li>
    </ul>
  </nav>
</div>
```

#### ディバイダー

```html
<div class="ha-navigation">
  <nav class="navigation">
    <a href="/" class="navigation-brand">サイト名</a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link">ホーム</a>
      </li>
      <li class="navigation-item">
        <a href="/products" class="navigation-link">製品</a>
      </li>
    </ul>

    <div class="navigation-divider"></div>

    <ul class="navigation-menu navigation-menu-end">
      <li class="navigation-item">
        <button class="navigation-link">ログイン</button>
      </li>
    </ul>
  </nav>
</div>
```

#### ドロップダウンメニュー

```html
<div class="ha-navigation">
  <nav class="navigation">
    <a href="/" class="navigation-brand">サイト名</a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link">ホーム</a>
      </li>

      <li class="navigation-item navigation-dropdown" aria-expanded="false">
        <button class="navigation-link">
          製品
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 8L2 4h8L6 8z"/>
          </svg>
        </button>
        <div class="navigation-dropdown-menu">
          <a href="/products/a" class="navigation-dropdown-item">製品 A</a>
          <a href="/products/b" class="navigation-dropdown-item">製品 B</a>
          <a href="/products/c" class="navigation-dropdown-item">製品 C</a>
        </div>
      </li>

      <li class="navigation-item">
        <a href="/about" class="navigation-link">概要</a>
      </li>
    </ul>
  </nav>
</div>
```

#### 無効化されたリンク

```html
<div class="ha-navigation">
  <nav class="navigation">
    <a href="/" class="navigation-brand">サイト名</a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link">ホーム</a>
      </li>
      <li class="navigation-item">
        <a href="/premium" class="navigation-link" aria-disabled="true">
          プレミアム機能
        </a>
      </li>
    </ul>
  </nav>
</div>
```

#### Sticky（固定）ナビゲーション

```html
<div class="ha-navigation">
  <nav class="navigation sticky">
    <a href="/" class="navigation-brand">サイト名</a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link">ホーム</a>
      </li>
      <li class="navigation-item">
        <a href="/about" class="navigation-link">概要</a>
      </li>
    </ul>
  </nav>
</div>
```

#### バリアント

**Compact（コンパクト）**

```html
<div class="ha-navigation">
  <nav class="navigation compact">
    <a href="/" class="navigation-brand">サイト名</a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link">ホーム</a>
      </li>
      <li class="navigation-item">
        <a href="/about" class="navigation-link">概要</a>
      </li>
    </ul>
  </nav>
</div>
```

**Filled（塗りつぶし）**

```html
<div class="ha-navigation">
  <nav class="navigation filled">
    <a href="/" class="navigation-brand">サイト名</a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link">ホーム</a>
      </li>
      <li class="navigation-item">
        <a href="/about" class="navigation-link">概要</a>
      </li>
    </ul>
  </nav>
</div>
```

**Bordered（ボーダー付き）**

```html
<div class="ha-navigation">
  <nav class="navigation bordered">
    <a href="/" class="navigation-brand">サイト名</a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link">ホーム</a>
      </li>
      <li class="navigation-item">
        <a href="/about" class="navigation-link">概要</a>
      </li>
    </ul>
  </nav>
</div>
```

#### JavaScript による制御

Navigation のモバイルメニューとドロップダウンを制御するコントローラークラス:

```javascript
class NavigationController {
  constructor(navigationElement) {
    this.navigation = navigationElement;
    this.toggle = navigationElement.querySelector('.navigation-toggle');
    this.menus = Array.from(navigationElement.querySelectorAll('.navigation-menu'));
    this.dropdowns = Array.from(navigationElement.querySelectorAll('.navigation-dropdown'));

    this.init();
  }

  init() {
    // モバイルメニュートグル
    if (this.toggle) {
      this.toggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    // ドロップダウンの初期化
    this.dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.navigation-link');

      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDropdown(dropdown);
      });

      // 外部クリックで閉じる
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          this.closeDropdown(dropdown);
        }
      });
    });

    // Escキーでドロップダウンを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
      }
    });

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  toggleMobileMenu() {
    this.menus.forEach(menu => {
      menu.classList.toggle('open');
    });

    const isOpen = this.menus[0]?.classList.contains('open');
    this.toggle.setAttribute('aria-expanded', isOpen.toString());
    this.toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  }

  toggleDropdown(dropdown) {
    const isOpen = dropdown.getAttribute('aria-expanded') === 'true';

    // 他のドロップダウンを閉じる
    this.closeAllDropdowns();

    if (!isOpen) {
      this.openDropdown(dropdown);
    }
  }

  openDropdown(dropdown) {
    dropdown.setAttribute('aria-expanded', 'true');
  }

  closeDropdown(dropdown) {
    dropdown.setAttribute('aria-expanded', 'false');
  }

  closeAllDropdowns() {
    this.dropdowns.forEach(dropdown => {
      this.closeDropdown(dropdown);
    });
  }

  handleResize() {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // デスクトップ表示時はモバイルメニューを閉じる
      this.menus.forEach(menu => {
        menu.classList.remove('open');
      });

      if (this.toggle) {
        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.setAttribute('aria-label', 'メニューを開く');
      }
    }
  }
}

// 使用例
const navigation = document.querySelector('.ha-navigation');
const controller = new NavigationController(navigation);
```

#### アクティブリンクの管理

現在のページに応じてアクティブリンクを設定:

```javascript
class ActiveLinkManager {
  constructor(navigationElement) {
    this.navigation = navigationElement;
    this.links = Array.from(navigationElement.querySelectorAll('.navigation-link[href]'));

    this.init();
  }

  init() {
    this.updateActiveLink();

    // SPA の場合はルート変更を監視
    window.addEventListener('popstate', () => {
      this.updateActiveLink();
    });
  }

  updateActiveLink() {
    const currentPath = window.location.pathname;

    this.links.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      if (linkPath === currentPath) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active');
      } else {
        link.removeAttribute('aria-current');
        link.classList.remove('active');
      }
    });
  }

  setActive(path) {
    this.links.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      if (linkPath === path) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active');
      } else {
        link.removeAttribute('aria-current');
        link.classList.remove('active');
      }
    });
  }
}

// 使用例
const navigation = document.querySelector('.navigation');
const activeLinkManager = new ActiveLinkManager(navigation);

// プログラムからアクティブリンクを設定
activeLinkManager.setActive('/dashboard');
```

#### アクセシビリティ

Navigation は ARIA 属性とセマンティック HTML を適切に使用する必要があります:

**必須の ARIA 属性とセマンティック HTML**

```html
<div class="ha-navigation">
  <nav class="navigation" role="navigation" aria-label="メインナビゲーション">
    <a href="/" class="navigation-brand">
      <img src="/logo.svg" alt="会社ロゴ" class="navigation-brand-logo">
      <span>サイト名</span>
    </a>

    <ul class="navigation-menu navigation-menu-start">
      <li class="navigation-item">
        <a href="/home" class="navigation-link" aria-current="page">
          ホーム
        </a>
      </li>

      <li class="navigation-item navigation-dropdown" aria-expanded="false">
        <button
          class="navigation-link"
          aria-haspopup="true"
          aria-expanded="false">
          製品
        </button>
        <div class="navigation-dropdown-menu" role="menu">
          <a href="/products/a" class="navigation-dropdown-item" role="menuitem">
            製品 A
          </a>
        </div>
      </li>

      <li class="navigation-item">
        <a href="/disabled" class="navigation-link" aria-disabled="true">
          無効なリンク
        </a>
      </li>
    </ul>

    <button class="navigation-toggle" aria-label="メニューを開く" aria-expanded="false">
      <svg aria-hidden="true" width="24" height="24">
        <path d="M3 12h18M3 6h18M3 18h18"/>
      </svg>
    </button>
  </nav>
</div>
```

**キーボード操作**

- `Tab`: 次のナビゲーションアイテムへ移動
- `Shift + Tab`: 前のナビゲーションアイテムへ移動
- `Enter / Space`: リンクを開く、ドロップダウンを開閉
- `Esc`: ドロップダウンを閉じる
- `↓ / ArrowDown`: ドロップダウン内の次のアイテムへ移動（ドロップダウンが開いている場合）
- `↑ / ArrowUp`: ドロップダウン内の前のアイテムへ移動（ドロップダウンが開いている場合）

**スクリーンリーダー対応**

- `<nav>` 要素でナビゲーション領域を明示
- `aria-label` でナビゲーションの目的を説明
- `aria-current="page"` で現在のページを示す
- `aria-disabled="true"` で無効なリンクを示す
- `aria-haspopup="true"` でドロップダウンの存在を示す
- `aria-expanded` でドロップダウンの開閉状態を示す
- ブランドロゴには適切な `alt` 属性を設定
- アイコンには `aria-hidden="true"` を設定（テキストラベルがある場合）

**モバイルアクセシビリティ**

- トグルボタンには明確な `aria-label` を提供
- メニューの開閉状態を `aria-expanded` で示す
- タッチターゲットは最低 44x44px を確保
- フォーカス状態を視覚的に明示

---
## アクセシビリティ

### ARIA属性

```html
<!-- ナビゲーションランドマーク -->
<nav role="navigation" aria-label="メインナビゲーション">
  <ul>
    <li>
      <a href="/home" aria-current="page">ホーム</a>
    </li>
    <li>
      <a href="/about">概要</a>
    </li>
  </ul>
</nav>

<!-- タブナビゲーション -->
<div role="tablist" aria-label="コンテンツタブ">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    タブ1
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">
    タブ2
  </button>
</div>

<!-- ブレッドクラム -->
<nav aria-label="パンくずリスト">
  <ol>
    <li><a href="/">ホーム</a></li>
    <li aria-current="page">現在のページ</li>
  </ol>
</nav>
```

### キーボード操作

- `Tab`: 次のナビゲーション項目へ移動
- `Shift + Tab`: 前のナビゲーション項目へ移動
- `Enter`/`Space`: リンクまたはタブをアクティブ化
- `Arrow keys`: タブ間を移動（タブリストの場合）

---

## ベストプラクティス

### 1. 現在位置の明示

```html
<!-- Good: aria-current使用 -->
<a href="/current" aria-current="page" class="nav-item--active">
  現在のページ
</a>

<!-- Bad: クラスのみ -->
<a href="/current" class="active">現在のページ</a>
```

### 2. 適切なラベル付け

```html
<!-- Good: aria-label -->
<nav aria-label="メインナビゲーション">...</nav>
<nav aria-label="フッターナビゲーション">...</nav>

<!-- Bad: ラベルなし -->
<nav>...</nav>
<nav>...</nav>
```

### 3. レスポンシブ対応

```html
<!-- Good: モバイルメニュー -->
<button
  class="menu-toggle"
  aria-expanded="false"
  aria-controls="main-menu"
  aria-label="メニューを開く"
>
  ☰
</button>
<nav id="main-menu" hidden>...</nav>
```

### 4. アイコンとテキストの併用

```html
<!-- Good: アイコン + テキスト -->
<a href="/home" class="nav-item">
  <svg aria-hidden="true">...</svg>
  <span>ホーム</span>
</a>

<!-- Bad: アイコンのみ -->
<a href="/home" class="nav-item">
  <svg>...</svg>
</a>
```

---

## 関連コンポーネント

- **[Button](./button.md)** - ナビゲーションボタン
- **[Dropdown](./dropdown.md)** - ドロップダウンメニュー
- **[Badge](./badge.md)** - 通知バッジ
- **[Sidebar](./sidebar.md)** - サイドバーレイアウト

---

## デザインガイドライン

### サイズとスペーシング

- **水平ナビゲーション項目パディング:** 8px 16px
- **垂直ナビゲーション項目パディング:** 10px 12px
- **タブパディング:** 12px 24px
- **項目間の間隔:** 8px（水平）、4px（垂直）
- **アイコンサイズ:** 20px × 20px
- **アイコンとテキストの間隔:** 12px

### トランジション

- ホバーエフェクト: 0.2s ease
- 背景色変化: 0.2s ease
- テキスト色変化: 0.2s ease

### レスポンシブブレークポイント

```css
/* モバイル */
@media (max-width: 768px) {
  .navigation {
    /* ハンバーガーメニュー */
  }
}

/* タブレット */
@media (min-width: 769px) and (max-width: 1024px) {
  .navigation {
    /* コンパクトナビゲーション */
  }
}

/* デスクトップ */
@media (min-width: 1025px) {
  .navigation {
    /* フルナビゲーション */
  }
}
```

---

**最終更新:** 2025-12-12
**バージョン:** 1.0.0
