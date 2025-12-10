# Drawer (ドロワー) コンポーネント

**カテゴリ:** Overlays
**ファイル:** `src/components/overlays/drawer.yaml`
**ステータス:** ✅ 実装済み (Phase 4 Option D)

---

## 概要

ドロワーコンポーネントは、画面の端からスライドインするサイドパネルUIです。ナビゲーション、フィルター、詳細表示、フォームなど、様々なコンテンツを表示するのに適しています。

### 用途

- ナビゲーションメニュー（モバイル）
- フィルターパネル
- 詳細情報の表示
- 設定パネル
- フォーム入力
- 通知一覧

### 特徴

- 4方向からのスライドイン（左、右、上、下）
- 4つのサイズバリアント（small、default、large、full）
- リサイズ可能（オプション）
- モバイル対応（スワイプジェスチャー）
- キーボードショートカット対応

---

## ポジションバリアント

### 1. Left (左)

画面左端からスライドインするドロワー。

**使用場面:**
- ナビゲーションメニュー（最も一般的）
- サイドバー
- フィルターパネル

**ボーダー:**
- 右ボーダー: `1px solid {border.default}`

### 2. Right (右)

画面右端からスライドインするドロワー。

**使用場面:**
- 詳細パネル
- 設定パネル
- ショッピングカート
- 通知パネル

**ボーダー:**
- 左ボーダー: `1px solid {border.default}`

### 3. Top (上)

画面上端からスライドインするドロワー。

**使用場面:**
- 通知バー
- 検索パネル
- フィルター（水平レイアウト）

**ボーダー:**
- 下ボーダー: `1px solid {border.default}`

### 4. Bottom (下)

画面下端からスライドインするドロワー。

**使用場面:**
- モバイルメニュー
- アクションシート
- 詳細情報（モバイル）
- 共有オプション

**ボーダー:**
- 上ボーダー: `1px solid {border.default}`

---

## サイズバリアント

### Small (320px)

**用途:** ナビゲーション、フィルター、簡単な情報表示

```html
<div class="drawer drawer-left drawer-small">
  <!-- コンテンツ -->
</div>
```

### Default (480px)

**用途:** 詳細表示、標準的なフォーム

```html
<div class="drawer drawer-right drawer-default">
  <!-- コンテンツ -->
</div>
```

### Large (640px)

**用途:** 複雑なフォーム、詳細な情報

```html
<div class="drawer drawer-right drawer-large">
  <!-- コンテンツ -->
</div>
```

### Full (100%)

**用途:** 全画面表示、モーダル的な使用

```html
<div class="drawer drawer-left drawer-full">
  <!-- コンテンツ -->
</div>
```

---

## トークン一覧

### サイズ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.size.small` | `320px` | 小サイズ - ナビゲーションやフィルター |
| `component.drawer.size.default` | `480px` | デフォルトサイズ - 詳細表示 |
| `component.drawer.size.large` | `640px` | 大サイズ - フォームや複雑なコンテンツ |
| `component.drawer.size.full` | `100%` | フルサイズ - 画面全体 |
| `component.drawer.maxSize` | `90vw` | 最大サイズ - 画面幅/高さの90% |

### スペーシング

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.padding.header` | `{spacing.6}` | ヘッダーパディング (24px) |
| `component.drawer.padding.body` | `{spacing.6}` | ボディパディング (24px) |
| `component.drawer.padding.footer` | `{spacing.6}` | フッターパディング (24px) |

### 背景とオーバーレイ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.background.default` | `{background.primary}` | ドロワー背景色 |
| `component.drawer.background.overlay` | `rgba(0, 0, 0, 0.5)` | 背景オーバーレイ - 半透明黒 |

### ボーダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.border.width` | `{border.width.1}` | ボーダー幅 (1px) |
| `component.drawer.border.color` | `{border.default}` | ボーダー色 |
| `component.drawer.position.left.borderRight` | `1px solid {border.default}` | 左ドロワーの右ボーダー |
| `component.drawer.position.right.borderLeft` | `1px solid {border.default}` | 右ドロワーの左ボーダー |
| `component.drawer.position.top.borderBottom` | `1px solid {border.default}` | 上ドロワーの下ボーダー |
| `component.drawer.position.bottom.borderTop` | `1px solid {border.default}` | 下ドロワーの上ボーダー |

### シャドウとZ-index

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.shadow` | `{shadow.2xl}` | 大きな影で浮き上がり効果 |
| `component.drawer.zIndex.overlay` | `1000` | オーバーレイのz-index |
| `component.drawer.zIndex.content` | `1001` | ドロワーコンテンツのz-index |

### ヘッダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.header.background` | `transparent` | ヘッダー背景 - 透明 |
| `component.drawer.header.borderBottom` | `1px solid {border.default}` | ヘッダー下ボーダー |
| `component.drawer.header.padding` | `{spacing.6}` | ヘッダーパディング (24px) |
| `component.drawer.header.minHeight` | `{spacing.16}` | ヘッダー最小高さ (64px) |

#### タイトル

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.header.title.fontSize` | `{font.size.lg}` | タイトル文字サイズ (18px) |
| `component.drawer.header.title.fontWeight` | `{font.weight.semibold}` | タイトル太さ (600) |
| `component.drawer.header.title.lineHeight` | `{font.lineHeight.tight}` | 行高 |
| `component.drawer.header.title.color` | `{foreground.primary}` | タイトル色 |

#### サブタイトル

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.header.subtitle.fontSize` | `{font.size.sm}` | サブタイトル文字サイズ (14px) |
| `component.drawer.header.subtitle.fontWeight` | `{font.weight.normal}` | サブタイトル太さ (400) |
| `component.drawer.header.subtitle.lineHeight` | `{font.lineHeight.normal}` | 行高 |
| `component.drawer.header.subtitle.color` | `{foreground.secondary}` | サブタイトル色 |
| `component.drawer.header.subtitle.marginTop` | `{spacing.1}` | サブタイトル上マージン (4px) |

### ボディ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.body.padding` | `{spacing.6}` | ボディパディング (24px) |
| `component.drawer.body.overflow` | `auto` | スクロール可能 |

### フッター

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.footer.background` | `{background.secondary}` | フッター背景 |
| `component.drawer.footer.borderTop` | `1px solid {border.default}` | フッター上ボーダー |
| `component.drawer.footer.padding` | `{spacing.6}` | フッターパディング (24px) |
| `component.drawer.footer.gap` | `{spacing.3}` | ボタン間の間隔 (12px) |
| `component.drawer.footer.justifyContent` | `flex-end` | ボタンを右寄せ |
| `component.drawer.footer.minHeight` | `{spacing.16}` | フッター最小高さ (64px) |

### 閉じるボタン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.closeButton.size` | `{spacing.8}` | 閉じるボタンサイズ (32px) |
| `component.drawer.closeButton.position.top` | `{spacing.4}` | 上からの位置 (16px) |
| `component.drawer.closeButton.position.right` | `{spacing.4}` | 右からの位置 (16px) |
| `component.drawer.closeButton.background.default` | `transparent` | デフォルト背景 |
| `component.drawer.closeButton.background.hover` | `{background.secondary}` | ホバー時背景 |
| `component.drawer.closeButton.color.default` | `{foreground.tertiary}` | デフォルト色 |
| `component.drawer.closeButton.color.hover` | `{foreground.primary}` | ホバー時色 |
| `component.drawer.closeButton.borderRadius` | `{border.radius.md}` | 角丸 (6px) |

### ハンドル（モバイル用）

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.handle.width` | `{spacing.8}` | ハンドル幅 (32px) |
| `component.drawer.handle.height` | `{spacing.1}` | ハンドル高さ (4px) |
| `component.drawer.handle.background` | `{foreground.tertiary}` | ハンドル色 |
| `component.drawer.handle.borderRadius` | `{border.radius.full}` | 完全な角丸 |
| `component.drawer.handle.marginTop` | `{spacing.2}` | 上マージン (8px) |
| `component.drawer.handle.marginBottom` | `{spacing.2}` | 下マージン (8px) |

### リサイズハンドル

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.resizeHandle.width` | `{spacing.1}` | リサイズハンドル幅 (4px) |
| `component.drawer.resizeHandle.background.default` | `transparent` | デフォルト背景 - 透明 |
| `component.drawer.resizeHandle.background.hover` | `{primary.default}` | ホバー時背景 - プライマリ |
| `component.drawer.resizeHandle.background.active` | `{primary.active}` | アクティブ時背景 |
| `component.drawer.resizeHandle.cursor` | `col-resize` | リサイズカーソル（左右ドロワー） |

### アニメーション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.drawer.animation.duration` | `{animation.duration.base}` | アニメーション時間 (0.2s) |
| `component.drawer.animation.timing` | `{animation.easing.easeOut}` | イージング |
| `component.drawer.transition.duration` | `{animation.duration.fast}` | トランジション時間 (0.15s) |
| `component.drawer.transition.timing` | `{animation.easing.ease}` | イージング |
| `component.drawer.transition.properties` | `background-color, color, transform, opacity` | トランジション対象 |

---

## 使用例

### HTML

```html
<!-- 左ドロワー - ナビゲーション -->
<div class="drawer-overlay" role="presentation">
  <div
    class="drawer drawer-left drawer-default"
    role="dialog"
    aria-labelledby="drawer-title"
    aria-modal="true"
  >
    <div class="drawer-header">
      <button class="drawer-close" aria-label="閉じる">
        ×
      </button>
      <h2 id="drawer-title" class="drawer-title">ナビゲーション</h2>
    </div>

    <div class="drawer-body">
      <nav>
        <a href="#home" class="nav-item">ホーム</a>
        <a href="#products" class="nav-item">製品</a>
        <a href="#about" class="nav-item">会社情報</a>
        <a href="#contact" class="nav-item">お問い合わせ</a>
      </nav>
    </div>
  </div>
</div>

<!-- 右ドロワー - 詳細パネル -->
<div class="drawer-overlay">
  <div class="drawer drawer-right drawer-large" role="dialog">
    <div class="drawer-resize-handle"></div>

    <div class="drawer-header">
      <button class="drawer-close" aria-label="閉じる">×</button>
      <div>
        <h2 class="drawer-title">商品詳細</h2>
        <p class="drawer-subtitle">SKU: ABC-12345</p>
      </div>
    </div>

    <div class="drawer-body">
      <img src="product.jpg" alt="商品画像" class="product-image" />
      <h3>商品名</h3>
      <p>商品の詳細説明がここに入ります...</p>
      <div class="product-specs">
        <h4>仕様</h4>
        <ul>
          <li>サイズ: M</li>
          <li>色: ブルー</li>
          <li>素材: コットン100%</li>
        </ul>
      </div>
    </div>

    <div class="drawer-footer">
      <button class="button button-secondary">お気に入り</button>
      <button class="button button-primary">カートに追加</button>
    </div>
  </div>
</div>

<!-- 下ドロワー - モバイルメニュー -->
<div class="drawer-overlay">
  <div class="drawer drawer-bottom drawer-default" role="dialog">
    <div class="drawer-handle"></div>

    <div class="drawer-header">
      <h2 class="drawer-title">アクション</h2>
    </div>

    <div class="drawer-body">
      <button class="action-item">共有</button>
      <button class="action-item">編集</button>
      <button class="action-item">複製</button>
      <button class="action-item danger">削除</button>
    </div>
  </div>
</div>
```

### CSS

```css
/* オーバーレイ */
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--component-drawer-background-overlay);
  z-index: var(--component-drawer-z-index-overlay);
  opacity: 0;
  animation: fade-in var(--component-drawer-animation-duration)
             var(--component-drawer-animation-timing);
}

.drawer-overlay.is-open {
  opacity: 1;
}

/* ドロワーコンテナ */
.drawer {
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: var(--component-drawer-background-default);
  box-shadow: var(--component-drawer-shadow);
  z-index: var(--component-drawer-z-index-content);
  transition: transform var(--component-drawer-animation-duration)
              var(--component-drawer-animation-timing);
}

/* 左ドロワー */
.drawer-left {
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--component-drawer-size-default);
  max-width: var(--component-drawer-max-size);
  border-right: var(--component-drawer-position-left-border-right);
  transform: translateX(-100%);
}

.drawer-left.is-open {
  transform: translateX(0);
}

/* 右ドロワー */
.drawer-right {
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--component-drawer-size-default);
  max-width: var(--component-drawer-max-size);
  border-left: var(--component-drawer-position-right-border-left);
  transform: translateX(100%);
}

.drawer-right.is-open {
  transform: translateX(0);
}

/* 上ドロワー */
.drawer-top {
  top: 0;
  left: 0;
  right: 0;
  height: var(--component-drawer-size-default);
  max-height: var(--component-drawer-max-size);
  border-bottom: var(--component-drawer-position-top-border-bottom);
  transform: translateY(-100%);
}

.drawer-top.is-open {
  transform: translateY(0);
}

/* 下ドロワー */
.drawer-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--component-drawer-size-default);
  max-height: var(--component-drawer-max-size);
  border-top: var(--component-drawer-position-bottom-border-top);
  transform: translateY(100%);
}

.drawer-bottom.is-open {
  transform: translateY(0);
}

/* サイズバリアント */
.drawer-small {
  width: var(--component-drawer-size-small);
}

.drawer-large {
  width: var(--component-drawer-size-large);
}

.drawer-full {
  width: var(--component-drawer-size-full);
}

/* ヘッダー */
.drawer-header {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--component-drawer-padding-header);
  min-height: var(--component-drawer-header-min-height);
  padding: var(--component-drawer-header-padding);
  background: var(--component-drawer-header-background);
  border-bottom: var(--component-drawer-header-border-bottom);
}

.drawer-title {
  margin: 0;
  font-size: var(--component-drawer-header-title-font-size);
  font-weight: var(--component-drawer-header-title-font-weight);
  line-height: var(--component-drawer-header-title-line-height);
  color: var(--component-drawer-header-title-color);
}

.drawer-subtitle {
  margin: var(--component-drawer-header-subtitle-margin-top) 0 0;
  font-size: var(--component-drawer-header-subtitle-font-size);
  font-weight: var(--component-drawer-header-subtitle-font-weight);
  line-height: var(--component-drawer-header-subtitle-line-height);
  color: var(--component-drawer-header-subtitle-color);
}

/* ボディ */
.drawer-body {
  flex: 1;
  padding: var(--component-drawer-body-padding);
  overflow: var(--component-drawer-body-overflow);
}

/* フッター */
.drawer-footer {
  display: flex;
  gap: var(--component-drawer-footer-gap);
  justify-content: var(--component-drawer-footer-justify-content);
  min-height: var(--component-drawer-footer-min-height);
  padding: var(--component-drawer-footer-padding);
  background: var(--component-drawer-footer-background);
  border-top: var(--component-drawer-footer-border-top);
}

/* 閉じるボタン */
.drawer-close {
  position: absolute;
  top: var(--component-drawer-close-button-position-top);
  right: var(--component-drawer-close-button-position-right);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--component-drawer-close-button-size);
  height: var(--component-drawer-close-button-size);
  padding: 0;
  background: var(--component-drawer-close-button-background-default);
  border: none;
  border-radius: var(--component-drawer-close-button-border-radius);
  color: var(--component-drawer-close-button-color-default);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: var(--component-drawer-transition-properties)
              var(--component-drawer-transition-duration)
              var(--component-drawer-transition-timing);
}

.drawer-close:hover {
  background: var(--component-drawer-close-button-background-hover);
  color: var(--component-drawer-close-button-color-hover);
}

/* ハンドル（モバイル用） */
.drawer-handle {
  width: var(--component-drawer-handle-width);
  height: var(--component-drawer-handle-height);
  margin: var(--component-drawer-handle-margin-top) auto
          var(--component-drawer-handle-margin-bottom);
  background: var(--component-drawer-handle-background);
  border-radius: var(--component-drawer-handle-border-radius);
}

/* リサイズハンドル */
.drawer-resize-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: var(--component-drawer-resize-handle-width);
  background: var(--component-drawer-resize-handle-background-default);
  cursor: var(--component-drawer-resize-handle-cursor);
  transition: background-color var(--component-drawer-transition-duration);
}

.drawer-left .drawer-resize-handle {
  right: 0;
}

.drawer-right .drawer-resize-handle {
  left: 0;
}

.drawer-resize-handle:hover {
  background: var(--component-drawer-resize-handle-background-hover);
}

.drawer-resize-handle:active {
  background: var(--component-drawer-resize-handle-background-active);
}

/* アニメーション */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### JavaScript

```javascript
class Drawer {
  constructor(element) {
    this.drawer = element;
    this.overlay = element.closest('.drawer-overlay');
    this.closeButton = element.querySelector('.drawer-close');
    this.resizeHandle = element.querySelector('.drawer-resize-handle');
    this.isOpen = false;
    this.isResizing = false;

    this.init();
  }

  init() {
    // 閉じるボタン
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }

    // オーバーレイクリック
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    // Escキー
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // リサイズ
    if (this.resizeHandle) {
      this.initResize();
    }

    // スワイプジェスチャー（モバイル）
    this.initSwipe();
  }

  open() {
    this.isOpen = true;
    this.overlay.classList.add('is-open');
    this.drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // フォーカス管理
    this.previousActiveElement = document.activeElement;
    this.drawer.focus();
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('is-open');
    this.drawer.classList.remove('is-open');
    document.body.style.overflow = '';

    // フォーカスを戻す
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  initResize() {
    this.resizeHandle.addEventListener('mousedown', (e) => {
      this.isResizing = true;
      this.startX = e.clientX;
      this.startWidth = this.drawer.offsetWidth;

      document.addEventListener('mousemove', this.handleResize);
      document.addEventListener('mouseup', this.stopResize);
    });
  }

  handleResize = (e) => {
    if (!this.isResizing) return;

    const delta = this.startX - e.clientX;
    const newWidth = this.startWidth + delta;

    // 最小・最大幅の制約
    const minWidth = 320;
    const maxWidth = window.innerWidth * 0.9;

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      this.drawer.style.width = `${newWidth}px`;
    }
  };

  stopResize = () => {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.handleResize);
    document.removeEventListener('mouseup', this.stopResize);
  };

  initSwipe() {
    let startX = 0;
    let startY = 0;
    let currentX = 0;

    this.drawer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    this.drawer.addEventListener('touchmove', (e) => {
      if (!startX) return;

      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
      const deltaY = e.touches[0].clientY - startY;

      // 水平方向のスワイプのみ
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();

        // 左ドロワーは左スワイプで閉じる
        if (this.drawer.classList.contains('drawer-left') && deltaX < -50) {
          this.close();
        }
        // 右ドロワーは右スワイプで閉じる
        if (this.drawer.classList.contains('drawer-right') && deltaX > 50) {
          this.close();
        }
      }
    });

    this.drawer.addEventListener('touchend', () => {
      startX = 0;
      startY = 0;
    });
  }
}

// 使用例
const drawer = new Drawer(document.querySelector('.drawer'));
document.querySelector('#open-drawer').addEventListener('click', () => {
  drawer.open();
});
```

### React

```tsx
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
type DrawerSize = 'small' | 'default' | 'large' | 'full';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  size?: DrawerSize;
  resizable?: boolean;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

function Drawer({
  isOpen,
  onClose,
  position = 'right',
  size = 'default',
  resizable = false,
  title,
  subtitle,
  footer,
  children,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [drawerWidth, setDrawerWidth] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!resizable) return;

    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = drawerRef.current?.offsetWidth || 0;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = position === 'left' ? e.clientX - startX : startX - e.clientX;
      const newWidth = startWidth + delta;
      const maxWidth = window.innerWidth * 0.9;

      if (newWidth >= 320 && newWidth <= maxWidth) {
        setDrawerWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`drawer-overlay ${isOpen ? 'is-open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        className={`drawer drawer-${position} drawer-${size} ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        style={drawerWidth ? { width: `${drawerWidth}px` } : undefined}
      >
        {resizable && (position === 'left' || position === 'right') && (
          <div
            className="drawer-resize-handle"
            onMouseDown={handleMouseDown}
            style={{ cursor: isResizing ? 'col-resize' : undefined }}
          />
        )}

        {position === 'bottom' && <div className="drawer-handle" />}

        {(title || subtitle) && (
          <div className="drawer-header">
            <button className="drawer-close" onClick={onClose} aria-label="閉じる">
              ×
            </button>
            {title && (
              <div>
                <h2 id="drawer-title" className="drawer-title">
                  {title}
                </h2>
                {subtitle && <p className="drawer-subtitle">{subtitle}</p>}
              </div>
            )}
          </div>
        )}

        <div className="drawer-body">{children}</div>

        {footer && <div className="drawer-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

// 使用例
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>ドロワーを開く</button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        size="large"
        resizable
        title="商品詳細"
        subtitle="SKU: ABC-12345"
        footer={
          <>
            <button className="button button-secondary">お気に入り</button>
            <button className="button button-primary">カートに追加</button>
          </>
        }
      >
        <div className="product-details">
          <img src="product.jpg" alt="商品" />
          <h3>商品名</h3>
          <p>商品の詳細説明...</p>
        </div>
      </Drawer>
    </>
  );
}
```

---

## アクセシビリティ

### ARIA属性

- `role="dialog"`: ドロワーの役割を設定
- `aria-modal="true"`: モーダルダイアログであることを明示
- `aria-labelledby`: タイトルとドロワーを関連付け
- `aria-label`: 閉じるボタンなど、視覚的ラベルがない要素に設定

### キーボード操作

実装すべきキーボードショートカット:

- **Esc**: ドロワーを閉じる
- **Tab**: ドロワー内の要素間を移動（フォーカストラップ）
- **Shift + Tab**: 逆方向に移動

### フォーカス管理

```javascript
// ドロワーを開く
function openDrawer() {
  // 現在のフォーカスを保存
  previousActiveElement = document.activeElement;

  // ドロワーにフォーカス
  drawerElement.focus();

  // フォーカストラップを有効化
  trapFocus(drawerElement);
}

// ドロワーを閉じる
function closeDrawer() {
  // フォーカスを復元
  previousActiveElement?.focus();
}

// フォーカストラップ
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

---

## ベストプラクティス

### ドロワーの使用

1. **適切な位置の選択**
   - 左: ナビゲーション（最も一般的）
   - 右: 詳細パネル、設定
   - 上: 検索、フィルター
   - 下: モバイルメニュー、アクションシート

2. **適切なサイズの選択**
   - Small (320px): ナビゲーション、フィルター
   - Default (480px): 詳細表示
   - Large (640px): フォーム、複雑なコンテンツ
   - Full (100%): 全画面表示

3. **ヘッダーとフッター**
   - ヘッダー: タイトル、閉じるボタンを含める
   - フッター: アクションボタンを配置
   - 長いコンテンツでもヘッダー/フッターは固定

### UXの向上

1. **リサイズ機能**
   - ユーザーがドロワーの幅を調整できるようにする
   - 最小・最大幅の制約を設定

```javascript
const minWidth = 320;
const maxWidth = window.innerWidth * 0.9;
```

2. **スワイプジェスチャー（モバイル）**
   - モバイルでドロワーをスワイプで閉じられるようにする
   - ハンドルを表示してスワイプ可能であることを示す

3. **アニメーション**
   - スムーズなスライドインアニメーション
   - オーバーレイのフェードイン

### パフォーマンス

1. **レイジーレンダリング**
   - ドロワーが開かれるまでコンテンツをレンダリングしない

```tsx
{isOpen && (
  <Drawer>
    <HeavyComponent />
  </Drawer>
)}
```

2. **ポータルの使用**
   - React Portalを使用してbodyの直下にレンダリング
   - z-indexの問題を回避

3. **スクロール制御**
   - ドロワーが開いているときは背景のスクロールを無効化

```javascript
document.body.style.overflow = 'hidden';
```

---

## 関連コンポーネント

- **Modal**: 中央に表示されるオーバーレイ
- **Dialog**: 確認や警告用の特化したモーダル
- **Popover**: 小さなポップアップパネル
- **Sidebar**: 常に表示されるサイドバー

---

**最終更新:** 2025-12-11
**Phase 4 Option D で実装**
