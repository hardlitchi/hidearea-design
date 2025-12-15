# Navigation (ナビゲーション) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/components/navigation/navigation.yaml`
**ステータス:** ⏸️ CSS実装未完了（Phase 3 - YAML定義のみ）

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

## 使用例

### HTML/CSS

```html
<!-- 水平ナビゲーション -->
<nav
  class="navigation"
  role="navigation"
  aria-label="メインナビゲーション"
  style="
    background: var(--component-navigation-background-default);
    padding: 16px;
    border-bottom: 1px solid var(--border-default);
  "
>
  <ul style="display: flex; gap: 8px; list-style: none; margin: 0; padding: 0;">
    <li>
      <a
        href="/dashboard"
        class="nav-item nav-item--active"
        aria-current="page"
        style="
          display: block;
          padding: 8px 16px;
          border-radius: 6px;
          background: var(--component-navigation-background-active);
          color: var(--component-navigation-text-active);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        "
      >
        ダッシュボード
      </a>
    </li>
    <li>
      <a
        href="/projects"
        class="nav-item"
        style="
          display: block;
          padding: 8px 16px;
          border-radius: 6px;
          color: var(--component-navigation-text-default);
          text-decoration: none;
          transition: all 0.2s ease;
        "
      >
        プロジェクト
      </a>
    </li>
    <li>
      <a href="/team" class="nav-item">チーム</a>
    </li>
    <li>
      <a href="/settings" class="nav-item">設定</a>
    </li>
  </ul>
</nav>

<!-- 垂直ナビゲーション（サイドバー） -->
<aside
  class="sidebar"
  style="
    width: 250px;
    background: var(--component-navigation-background-default);
    padding: 16px;
    min-height: 100vh;
  "
>
  <nav aria-label="サイドバーナビゲーション">
    <ul style="list-style: none; margin: 0; padding: 0;">
      <li style="margin-bottom: 4px;">
        <a
          href="/home"
          class="nav-item nav-item--active"
          aria-current="page"
          style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            border-radius: 6px;
            background: var(--component-navigation-background-active);
            color: var(--component-navigation-text-active);
            text-decoration: none;
          "
        >
          <svg width="20" height="20" fill="currentColor">
            <!-- Home icon -->
          </svg>
          <span>ホーム</span>
        </a>
      </li>
      <li style="margin-bottom: 4px;">
        <a
          href="/documents"
          class="nav-item"
          style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            border-radius: 6px;
            color: var(--component-navigation-text-default);
            text-decoration: none;
          "
        >
          <svg width="20" height="20" fill="currentColor">
            <!-- Documents icon -->
          </svg>
          <span>ドキュメント</span>
        </a>
      </li>
      <li style="margin-bottom: 4px;">
        <a href="/analytics" class="nav-item">
          <svg width="20" height="20" fill="currentColor">
            <!-- Analytics icon -->
          </svg>
          <span>分析</span>
        </a>
      </li>
    </ul>
  </nav>
</aside>

<!-- タブナビゲーション -->
<div class="tabs" role="tablist">
  <button
    role="tab"
    aria-selected="true"
    aria-controls="overview-panel"
    class="tab tab--active"
    style="
      padding: 12px 24px;
      border: none;
      border-bottom: 2px solid var(--component-navigation-text-active);
      background: transparent;
      color: var(--component-navigation-text-active);
      font-weight: 600;
      cursor: pointer;
    "
  >
    概要
  </button>
  <button
    role="tab"
    aria-selected="false"
    aria-controls="details-panel"
    class="tab"
    style="
      padding: 12px 24px;
      border: none;
      border-bottom: 2px solid transparent;
      background: transparent;
      color: var(--component-navigation-text-default);
      cursor: pointer;
    "
  >
    詳細
  </button>
  <button
    role="tab"
    aria-selected="false"
    aria-controls="settings-panel"
    class="tab"
  >
    設定
  </button>
</div>

<!-- ブレッドクラム -->
<nav aria-label="パンくずリスト">
  <ol style="display: flex; gap: 8px; list-style: none; margin: 0; padding: 0;">
    <li>
      <a
        href="/"
        style="
          color: var(--component-navigation-text-default);
          text-decoration: none;
        "
      >
        ホーム
      </a>
    </li>
    <li aria-hidden="true" style="color: var(--foreground-tertiary);">/</li>
    <li>
      <a href="/products" style="color: var(--component-navigation-text-default);">
        商品
      </a>
    </li>
    <li aria-hidden="true" style="color: var(--foreground-tertiary);">/</li>
    <li aria-current="page" style="color: var(--component-navigation-text-active); font-weight: 500;">
      商品詳細
    </li>
  </ol>
</nav>
```

### CSS Classes

```css
/* 水平ナビゲーション */
.navigation {
  background: var(--component-navigation-background-default);
  padding: 16px;
  border-bottom: 1px solid var(--border-default);
}

.navigation ul {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: block;
  padding: 8px 16px;
  border-radius: 6px;
  color: var(--component-navigation-text-default);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: var(--component-navigation-text-hover);
  background: var(--background-secondary);
}

.nav-item--active,
.nav-item[aria-current="page"] {
  background: var(--component-navigation-background-active);
  color: var(--component-navigation-text-active);
}

/* 垂直ナビゲーション */
.sidebar {
  width: 250px;
  background: var(--component-navigation-background-default);
  padding: 16px;
  min-height: 100vh;
  border-right: 1px solid var(--border-default);
}

.sidebar .nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  margin-bottom: 4px;
}

.sidebar .nav-item svg {
  width: 20px;
  height: 20px;
}

/* タブナビゲーション */
.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-default);
}

.tab {
  padding: 12px 24px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--component-navigation-text-default);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  color: var(--component-navigation-text-hover);
  background: var(--background-secondary);
}

.tab--active,
.tab[aria-selected="true"] {
  color: var(--component-navigation-text-active);
  border-bottom-color: var(--component-navigation-text-active);
}

/* ブレッドクラム */
.breadcrumb {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.breadcrumb a {
  color: var(--component-navigation-text-default);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb a:hover {
  color: var(--component-navigation-text-hover);
  text-decoration: underline;
}

.breadcrumb [aria-current="page"] {
  color: var(--component-navigation-text-active);
  font-weight: 500;
}

/* レスポンシブメニュー */
@media (max-width: 768px) {
  .navigation ul {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: auto;
  }
}

/* モバイルメニューボタン */
.menu-toggle {
  display: none;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .navigation ul {
    display: none;
  }

  .navigation ul.open {
    display: flex;
  }
}
```

### React

```tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // または React Router

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface NavigationProps {
  items: NavItem[];
  variant?: 'horizontal' | 'vertical' | 'tabs';
  onItemClick?: (href: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  variant = 'horizontal',
  onItemClick,
}) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (href: string) => {
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  const handleClick = (e: React.MouseEvent, href: string) => {
    if (onItemClick) {
      e.preventDefault();
      onItemClick(href);
    }
  };

  if (variant === 'tabs') {
    return (
      <div className="tabs" role="tablist">
        {items.map((item) => (
          <button
            key={item.href}
            role="tab"
            aria-selected={isActive(item.href)}
            onClick={(e) => handleClick(e, item.href)}
            className={`tab ${isActive(item.href) ? 'tab--active' : ''}`}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderBottom: `2px solid ${
                isActive(item.href)
                  ? 'var(--component-navigation-text-active)'
                  : 'transparent'
              }`,
              background: 'transparent',
              color: isActive(item.href)
                ? 'var(--component-navigation-text-active)'
                : 'var(--component-navigation-text-default)',
              fontWeight: isActive(item.href) ? 600 : 500,
              cursor: 'pointer',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }

  const containerStyle = variant === 'vertical'
    ? { flexDirection: 'column' as const, width: '250px' }
    : { flexDirection: 'row' as const, gap: '8px' };

  return (
    <nav
      className={`navigation navigation--${variant}`}
      style={{
        background: 'var(--component-navigation-background-default)',
        padding: '16px',
      }}
    >
      <ul
        style={{
          display: 'flex',
          ...containerStyle,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href} style={{ marginBottom: variant === 'vertical' ? '4px' : 0 }}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                aria-current={active ? 'page' : undefined}
                className={`nav-item ${active ? 'nav-item--active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: item.icon ? '12px' : undefined,
                  padding: variant === 'vertical' ? '10px 12px' : '8px 16px',
                  borderRadius: '6px',
                  background: active
                    ? 'var(--component-navigation-background-active)'
                    : 'transparent',
                  color: active
                    ? 'var(--component-navigation-text-active)'
                    : 'var(--component-navigation-text-default)',
                  textDecoration: 'none',
                  fontWeight: active ? 600 : 500,
                  position: 'relative',
                }}
              >
                {item.icon && <span style={{ width: '20px', height: '20px' }}>{item.icon}</span>}
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span
                    className="badge badge--error"
                    style={{
                      position: variant === 'horizontal' ? 'absolute' : 'static',
                      top: variant === 'horizontal' ? '-4px' : undefined,
                      right: variant === 'horizontal' ? '-4px' : undefined,
                      minWidth: '20px',
                      height: '20px',
                      padding: '0 6px',
                      borderRadius: '10px',
                      background: 'var(--component-badge-error-background)',
                      color: 'var(--component-badge-error-text)',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// ブレッドクラムコンポーネント
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="パンくずリスト">
      <ol
        style={{
          display: 'flex',
          gap: '8px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontSize: '14px',
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {item.href ? (
                <a
                  href={item.href}
                  style={{
                    color: 'var(--component-navigation-text-default)',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current="page"
                  style={{
                    color: 'var(--component-navigation-text-active)',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </span>
              )}
            </li>
            {index < items.length - 1 && (
              <li aria-hidden="true" style={{ color: 'var(--foreground-tertiary)' }}>
                /
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

// 使用例
export default function Example() {
  const navItems: NavItem[] = [
    { label: 'ダッシュボード', href: '/dashboard', icon: <DashboardIcon /> },
    { label: 'プロジェクト', href: '/projects', icon: <ProjectsIcon />, badge: 3 },
    { label: 'チーム', href: '/team', icon: <TeamIcon /> },
    { label: '設定', href: '/settings', icon: <SettingsIcon /> },
  ];

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'ホーム', href: '/' },
    { label: '商品', href: '/products' },
    { label: '商品詳細' },
  ];

  return (
    <div>
      {/* 水平ナビゲーション */}
      <Navigation items={navItems} variant="horizontal" />

      {/* 垂直ナビゲーション */}
      <Navigation items={navItems} variant="vertical" />

      {/* タブナビゲーション */}
      <Navigation
        items={[
          { label: '概要', href: '/overview' },
          { label: '詳細', href: '/details' },
          { label: '設定', href: '/settings' },
        ]}
        variant="tabs"
      />

      {/* ブレッドクラム */}
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
```

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
