# Popover (ポップオーバー) コンポーネント

**カテゴリ:** Overlays
**ファイル:** `src/components/overlays/popover.yaml`
**ステータス:** ✅ 実装済み (Phase 4 Option D)

---

## 概要

ポップオーバーコンポーネントは、トリガー要素に対してインタラクティブな吹き出しを表示するUIです。ツールチップよりも複雑な内容を表示でき、クリックやフォーカスで開き、インタラクティブな要素を含めることができます。

### 用途

- 詳細情報の表示
- フォームやアクションの表示
- 追加オプションの提供
- ヘルプコンテンツ
- 確認プロンプト
- 設定パネル

### 特徴

- 矢印付きの吹き出しデザイン
- 3つのサイズバリアント（small、default、large）
- 4方向の配置（上、下、左、右）
- インタラクティブな要素を含められる
- 自動位置調整
- クリックまたはフォーカスで開閉

---

## サイズバリアント

### Small (240px)

**用途:** 簡単な説明、短いヘルプテキスト

```html
<div class="popover popover-small">
  <p>簡単な説明文</p>
</div>
```

### Default (320px)

**用途:** 標準的な内容、小さなフォーム

```html
<div class="popover popover-default">
  <h3>タイトル</h3>
  <p>標準的な内容がここに入ります。</p>
</div>
```

### Large (480px)

**用途:** 詳細な内容、複雑なフォーム

```html
<div class="popover popover-large">
  <form>
    <!-- フォーム要素 -->
  </form>
</div>
```

---

## トークン一覧

### サイズ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.width.small` | `240px` | 小サイズ - 簡単な説明 |
| `component.popover.width.default` | `320px` | デフォルトサイズ - 標準的な内容 |
| `component.popover.width.large` | `480px` | 大サイズ - 詳細な内容やフォーム |
| `component.popover.maxWidth` | `90vw` | 画面幅の90%まで |
| `component.popover.minWidth` | `200px` | 最小幅 |
| `component.popover.maxHeight` | `480px` | 最大高さ |

### スペーシング

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.padding` | `{spacing.4}` | 内部パディング (16px) |
| `component.popover.gap` | `{spacing.3}` | 要素間の間隔 (12px) |

### 背景

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.background.default` | `{background.primary}` | ポップオーバー背景色 |

### ボーダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.border.width` | `{border.width.1}` | ボーダー幅 (1px) |
| `component.popover.border.radius` | `{border.radius.md}` | 角丸 (6px) |
| `component.popover.border.color` | `{border.default}` | ボーダー色 |

### シャドウとZ-index

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.shadow` | `{shadow.lg}` | 大きめの影 |
| `component.popover.zIndex` | `1100` | ポップオーバーのz-index（モーダルより上） |

### 矢印（Arrow）

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.arrow.size` | `{spacing.2}` | 矢印サイズ (8px) |
| `component.popover.arrow.background` | `{background.primary}` | 矢印背景色 |
| `component.popover.arrow.border.width` | `{border.width.1}` | 矢印ボーダー幅 (1px) |
| `component.popover.arrow.border.color` | `{border.default}` | 矢印ボーダー色 |
| `component.popover.arrow.offset` | `{spacing.3}` | 矢印のオフセット (12px) |

### ヘッダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.header.padding` | `{spacing.4}` | ヘッダーパディング (16px) |
| `component.popover.header.borderBottom` | `1px solid {border.default}` | ヘッダー下ボーダー |

#### タイトル

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.header.title.fontSize` | `{font.size.base}` | タイトル文字サイズ (16px) |
| `component.popover.header.title.fontWeight` | `{font.weight.semibold}` | タイトル太さ (600) |
| `component.popover.header.title.lineHeight` | `{font.lineHeight.tight}` | 行高 |
| `component.popover.header.title.color` | `{foreground.primary}` | タイトル色 |

### ボディ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.body.padding` | `{spacing.4}` | ボディパディング (16px) |
| `component.popover.body.fontSize` | `{font.size.sm}` | ボディ文字サイズ (14px) |
| `component.popover.body.lineHeight` | `{font.lineHeight.relaxed}` | 行高 |
| `component.popover.body.color` | `{foreground.secondary}` | ボディ色 |
| `component.popover.body.maxHeight` | `320px` | ボディ最大高さ |
| `component.popover.body.overflow` | `auto` | スクロール可能 |

### フッター

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.footer.padding` | `{spacing.4}` | フッターパディング (16px) |
| `component.popover.footer.borderTop` | `1px solid {border.default}` | フッター上ボーダー |
| `component.popover.footer.gap` | `{spacing.2}` | ボタン間の間隔 (8px) |
| `component.popover.footer.justifyContent` | `flex-end` | ボタンを右寄せ |

### 閉じるボタン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.closeButton.size` | `{spacing.6}` | 閉じるボタンサイズ (24px) |
| `component.popover.closeButton.position.top` | `{spacing.2}` | 上からの位置 (8px) |
| `component.popover.closeButton.position.right` | `{spacing.2}` | 右からの位置 (8px) |
| `component.popover.closeButton.background.default` | `transparent` | デフォルト背景 - 透明 |
| `component.popover.closeButton.background.hover` | `{background.secondary}` | ホバー時背景 |
| `component.popover.closeButton.color.default` | `{foreground.tertiary}` | デフォルト色 |
| `component.popover.closeButton.color.hover` | `{foreground.primary}` | ホバー時色 |
| `component.popover.closeButton.borderRadius` | `{border.radius.sm}` | 角丸 (4px) |

### オフセット

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.offset.default` | `{spacing.2}` | デフォルトオフセット (8px) |
| `component.popover.offset.withArrow` | `{spacing.3}` | 矢印付きオフセット (12px) |

### アニメーション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.animation.duration` | `{animation.duration.fast}` | アニメーション時間 (0.15s) |
| `component.popover.animation.timing` | `{animation.easing.easeOut}` | イージング |
| `component.popover.animation.enter.top` | `transform: translateY(-8px); opacity: 0` | 上から出現 |
| `component.popover.animation.enter.bottom` | `transform: translateY(8px); opacity: 0` | 下から出現 |
| `component.popover.animation.enter.left` | `transform: translateX(-8px); opacity: 0` | 左から出現 |
| `component.popover.animation.enter.right` | `transform: translateX(8px); opacity: 0` | 右から出現 |

### トランジション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.transition.duration` | `{animation.duration.fast}` | トランジション時間 (0.15s) |
| `component.popover.transition.timing` | `{animation.easing.ease}` | イージング |
| `component.popover.transition.properties` | `background-color, color, border-color, opacity, transform` | トランジション対象 |

### インタラクティブ設定

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.popover.interactive.cursor` | `auto` | ポインターカーソル |
| `component.popover.interactive.focusRing.width` | `2px` | フォーカスリング幅 |
| `component.popover.interactive.focusRing.offset` | `2px` | フォーカスリングオフセット |
| `component.popover.interactive.focusRing.color` | `{primary.default}` | フォーカスリング色 |

---

## 使用例

### HTML

```html
<!-- 基本的なポップオーバー -->
<button
  id="trigger-1"
  class="button"
  aria-describedby="popover-1"
  aria-expanded="false"
>
  詳細を表示
</button>

<div
  id="popover-1"
  class="popover popover-default"
  role="dialog"
  aria-labelledby="popover-title-1"
  hidden
>
  <div class="popover-arrow"></div>
  <div class="popover-header">
    <button class="popover-close" aria-label="閉じる">×</button>
    <h3 id="popover-title-1" class="popover-title">詳細情報</h3>
  </div>
  <div class="popover-body">
    <p>ここに詳細な説明が入ります。</p>
  </div>
</div>

<!-- フォーム付きポップオーバー -->
<button id="trigger-2" class="button">設定</button>

<div id="popover-2" class="popover popover-large" role="dialog" hidden>
  <div class="popover-arrow"></div>
  <div class="popover-header">
    <h3 class="popover-title">通知設定</h3>
  </div>
  <div class="popover-body">
    <form>
      <div class="form-field">
        <label>
          <input type="checkbox" checked />
          メール通知を受け取る
        </label>
      </div>
      <div class="form-field">
        <label>
          <input type="checkbox" />
          プッシュ通知を受け取る
        </label>
      </div>
    </form>
  </div>
  <div class="popover-footer">
    <button class="button button-secondary">キャンセル</button>
    <button class="button button-primary">保存</button>
  </div>
</div>

<!-- リスト付きポップオーバー -->
<button id="trigger-3" class="icon-button">⋮</button>

<div id="popover-3" class="popover popover-small" role="menu" hidden>
  <div class="popover-arrow"></div>
  <div class="popover-body">
    <button role="menuitem" class="menu-item">編集</button>
    <button role="menuitem" class="menu-item">複製</button>
    <button role="menuitem" class="menu-item">共有</button>
    <hr class="menu-divider" />
    <button role="menuitem" class="menu-item danger">削除</button>
  </div>
</div>
```

### CSS

```css
/* ポップオーバーコンテナ */
.popover {
  position: absolute;
  z-index: var(--component-popover-z-index);
  width: var(--component-popover-width-default);
  min-width: var(--component-popover-min-width);
  max-width: var(--component-popover-max-width);
  max-height: var(--component-popover-max-height);
  background-color: var(--component-popover-background-default);
  border: var(--component-popover-border-width) solid var(--component-popover-border-color);
  border-radius: var(--component-popover-border-radius);
  box-shadow: var(--component-popover-shadow);
  opacity: 0;
  transition: opacity var(--component-popover-animation-duration)
              var(--component-popover-animation-timing),
              transform var(--component-popover-animation-duration)
              var(--component-popover-animation-timing);
}

.popover[hidden] {
  display: none;
}

.popover.is-visible {
  opacity: 1;
}

/* サイズバリアント */
.popover-small {
  width: var(--component-popover-width-small);
}

.popover-large {
  width: var(--component-popover-width-large);
}

/* 矢印 */
.popover-arrow {
  position: absolute;
  width: calc(var(--component-popover-arrow-size) * 2);
  height: calc(var(--component-popover-arrow-size) * 2);
  background-color: var(--component-popover-arrow-background);
  border: var(--component-popover-arrow-border-width) solid
          var(--component-popover-arrow-border-color);
  transform: rotate(45deg);
}

/* 位置別矢印配置 */
.popover[data-position="top"] .popover-arrow {
  bottom: calc(var(--component-popover-arrow-size) * -1);
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  border-top: none;
  border-left: none;
}

.popover[data-position="bottom"] .popover-arrow {
  top: calc(var(--component-popover-arrow-size) * -1);
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  border-bottom: none;
  border-right: none;
}

.popover[data-position="left"] .popover-arrow {
  right: calc(var(--component-popover-arrow-size) * -1);
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  border-left: none;
  border-bottom: none;
}

.popover[data-position="right"] .popover-arrow {
  left: calc(var(--component-popover-arrow-size) * -1);
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  border-right: none;
  border-top: none;
}

/* 位置別アニメーション */
.popover[data-position="top"] {
  transform: translateY(-8px);
}

.popover[data-position="bottom"] {
  transform: translateY(8px);
}

.popover[data-position="left"] {
  transform: translateX(-8px);
}

.popover[data-position="right"] {
  transform: translateX(8px);
}

.popover.is-visible {
  transform: translate(0, 0);
}

/* ヘッダー */
.popover-header {
  position: relative;
  padding: var(--component-popover-header-padding);
  border-bottom: var(--component-popover-header-border-bottom);
}

.popover-title {
  margin: 0;
  font-size: var(--component-popover-header-title-font-size);
  font-weight: var(--component-popover-header-title-font-weight);
  line-height: var(--component-popover-header-title-line-height);
  color: var(--component-popover-header-title-color);
}

/* ボディ */
.popover-body {
  padding: var(--component-popover-body-padding);
  font-size: var(--component-popover-body-font-size);
  line-height: var(--component-popover-body-line-height);
  color: var(--component-popover-body-color);
  max-height: var(--component-popover-body-max-height);
  overflow: var(--component-popover-body-overflow);
}

/* フッター */
.popover-footer {
  display: flex;
  gap: var(--component-popover-footer-gap);
  justify-content: var(--component-popover-footer-justify-content);
  padding: var(--component-popover-footer-padding);
  border-top: var(--component-popover-footer-border-top);
}

/* 閉じるボタン */
.popover-close {
  position: absolute;
  top: var(--component-popover-close-button-position-top);
  right: var(--component-popover-close-button-position-right);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--component-popover-close-button-size);
  height: var(--component-popover-close-button-size);
  padding: 0;
  background: var(--component-popover-close-button-background-default);
  border: none;
  border-radius: var(--component-popover-close-button-border-radius);
  color: var(--component-popover-close-button-color-default);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: var(--component-popover-transition-properties)
              var(--component-popover-transition-duration)
              var(--component-popover-transition-timing);
}

.popover-close:hover {
  background: var(--component-popover-close-button-background-hover);
  color: var(--component-popover-close-button-color-hover);
}
```

### JavaScript

```javascript
class Popover {
  constructor(trigger, popover) {
    this.trigger = trigger;
    this.popover = popover;
    this.isOpen = false;
    this.position = 'bottom';

    this.init();
  }

  init() {
    // トリガーイベント
    this.trigger.addEventListener('click', () => this.toggle());

    // 閉じるボタン
    const closeButton = this.popover.querySelector('.popover-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    }

    // 外側クリック
    document.addEventListener('click', (e) => {
      if (
        this.isOpen &&
        !this.trigger.contains(e.target) &&
        !this.popover.contains(e.target)
      ) {
        this.close();
      }
    });

    // Escキー
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    this.isOpen = true;
    this.popover.hidden = false;
    this.trigger.setAttribute('aria-expanded', 'true');

    // 位置を計算
    this.updatePosition();

    // アニメーション
    requestAnimationFrame(() => {
      this.popover.classList.add('is-visible');
    });
  }

  close() {
    this.isOpen = false;
    this.popover.classList.remove('is-visible');
    this.trigger.setAttribute('aria-expanded', 'false');

    // アニメーション終了後に非表示
    setTimeout(() => {
      if (!this.isOpen) {
        this.popover.hidden = true;
      }
    }, 150);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  updatePosition() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();
    const offset = 12; // 矢印付きオフセット

    let position = 'bottom';
    let top = 0;
    let left = 0;

    // 位置を自動決定
    const spaceAbove = triggerRect.top;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = window.innerWidth - triggerRect.right;

    if (spaceBelow >= popoverRect.height + offset) {
      position = 'bottom';
      top = triggerRect.bottom + offset;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
    } else if (spaceAbove >= popoverRect.height + offset) {
      position = 'top';
      top = triggerRect.top - popoverRect.height - offset;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
    } else if (spaceRight >= popoverRect.width + offset) {
      position = 'right';
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      left = triggerRect.right + offset;
    } else if (spaceLeft >= popoverRect.width + offset) {
      position = 'left';
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      left = triggerRect.left - popoverRect.width - offset;
    }

    // 画面外に出ないように調整
    const margin = 8;
    top = Math.max(margin, Math.min(top, window.innerHeight - popoverRect.height - margin));
    left = Math.max(margin, Math.min(left, window.innerWidth - popoverRect.width - margin));

    // 位置を適用
    this.popover.style.top = `${top + window.scrollY}px`;
    this.popover.style.left = `${left + window.scrollX}px`;
    this.popover.setAttribute('data-position', position);
    this.position = position;
  }
}

// 使用例
document.querySelectorAll('[aria-describedby]').forEach((trigger) => {
  const popoverId = trigger.getAttribute('aria-describedby');
  const popover = document.getElementById(popoverId);
  if (popover) {
    new Popover(trigger, popover);
  }
});
```

### React

```tsx
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
type PopoverSize = 'small' | 'default' | 'large';

interface PopoverProps {
  trigger: React.ReactElement;
  position?: PopoverPosition;
  size?: PopoverSize;
  title?: string;
  footer?: React.ReactNode;
  closeOnOutsideClick?: boolean;
  children: React.ReactNode;
}

function Popover({
  trigger,
  position: preferredPosition = 'bottom',
  size = 'default',
  title,
  footer,
  closeOnOutsideClick = true,
  children,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition>(preferredPosition);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const offset = 12;

    let finalPosition = preferredPosition;
    let top = 0;
    let left = 0;

    const spaceAbove = triggerRect.top;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = window.innerWidth - triggerRect.right;

    // 自動位置決定
    if (preferredPosition === 'bottom' && spaceBelow >= popoverRect.height + offset) {
      finalPosition = 'bottom';
      top = triggerRect.bottom + offset;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
    } else if (preferredPosition === 'top' && spaceAbove >= popoverRect.height + offset) {
      finalPosition = 'top';
      top = triggerRect.top - popoverRect.height - offset;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
    } else if (spaceBelow >= popoverRect.height + offset) {
      finalPosition = 'bottom';
      top = triggerRect.bottom + offset;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
    } else if (spaceAbove >= popoverRect.height + offset) {
      finalPosition = 'top';
      top = triggerRect.top - popoverRect.height - offset;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
    }

    // 画面外に出ないように調整
    const margin = 8;
    top = Math.max(margin, Math.min(top, window.innerHeight - popoverRect.height - margin));
    left = Math.max(margin, Math.min(left, window.innerWidth - popoverRect.width - margin));

    setPosition(finalPosition);
    setCoords({ top: top + window.scrollY, left: left + window.scrollX });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };

      const handleClickOutside = (e: MouseEvent) => {
        if (
          closeOnOutsideClick &&
          popoverRef.current &&
          !popoverRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isOpen, closeOnOutsideClick]);

  const triggerElement = React.cloneElement(trigger, {
    ref: triggerRef,
    onClick: () => setIsOpen(!isOpen),
    'aria-expanded': isOpen,
  });

  return (
    <>
      {triggerElement}
      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            className={`popover popover-${size} ${isOpen ? 'is-visible' : ''}`}
            role="dialog"
            aria-labelledby={title ? 'popover-title' : undefined}
            data-position={position}
            style={{
              position: 'absolute',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
          >
            <div className="popover-arrow" />

            {title && (
              <div className="popover-header">
                <button
                  className="popover-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="閉じる"
                >
                  ×
                </button>
                <h3 id="popover-title" className="popover-title">
                  {title}
                </h3>
              </div>
            )}

            <div className="popover-body">{children}</div>

            {footer && <div className="popover-footer">{footer}</div>}
          </div>,
          document.body
        )}
    </>
  );
}

// 使用例
function App() {
  return (
    <div>
      <Popover
        trigger={<button className="button">詳細を表示</button>}
        title="詳細情報"
        size="default"
      >
        <p>ここに詳細な説明が入ります。</p>
      </Popover>

      <Popover
        trigger={<button className="button">設定</button>}
        title="通知設定"
        size="large"
        footer={
          <>
            <button className="button button-secondary">キャンセル</button>
            <button className="button button-primary">保存</button>
          </>
        }
      >
        <form>
          <label>
            <input type="checkbox" /> メール通知を受け取る
          </label>
        </form>
      </Popover>
    </div>
  );
}
```

---

## アクセシビリティ

### ARIA属性

- `role="dialog"`: ポップオーバーの役割を設定
- `aria-labelledby`: タイトルとポップオーバーを関連付け
- `aria-describedby`: トリガー要素とポップオーバーを関連付け
- `aria-expanded`: トリガーの展開状態を示す

### キーボード操作

実装すべきキーボードショートカット:

- **Click / Enter / Space**: ポップオーバーを開く
- **Esc**: ポップオーバーを閉じる
- **Tab**: ポップオーバー内の要素間を移動

### スクリーンリーダー対応

1. **適切な関連付け**
   - トリガーとポップオーバーをARIA属性で関連付け
   - タイトルを`aria-labelledby`で設定

2. **フォーカス管理**
   - ポップオーバーを開いたときにフォーカスを移動
   - 閉じたときにトリガーにフォーカスを戻す

```javascript
// ポップオーバーを開く
function openPopover() {
  popover.hidden = false;
  popover.querySelector('button, [href], input')?.focus();
}

// ポップオーバーを閉じる
function closePopover() {
  popover.hidden = true;
  trigger.focus();
}
```

---

## ベストプラクティス

### ポップオーバーの使用

1. **ツールチップとの使い分け**
   - ツールチップ: 1-2行の簡単な説明
   - ポップオーバー: 複雑な内容、インタラクティブ要素

2. **適切な配置**
   - デフォルトは下方向
   - 自動位置調整を実装
   - 画面外に出ないように

3. **閉じる方法**
   - 外側クリック
   - Escキー
   - 閉じるボタン
   - アクション完了後

### UXの向上

1. **自動位置調整**

```javascript
function autoPosition(trigger, popover) {
  const positions = ['bottom', 'top', 'right', 'left'];

  for (const pos of positions) {
    const coords = calculatePosition(trigger, popover, pos);
    if (isInViewport(coords, popover)) {
      return pos;
    }
  }

  return 'bottom'; // フォールバック
}
```

2. **アニメーション**
   - スムーズな表示/非表示
   - 位置に応じた方向からの出現

3. **レスポンシブ対応**

```css
@media (max-width: 640px) {
  .popover {
    max-width: calc(100vw - 32px);
    left: 16px !important;
    right: 16px !important;
    width: auto;
  }
}
```

### パフォーマンス

1. **遅延レンダリング**
   - ポップオーバーが開かれるまでコンテンツをレンダリングしない

2. **位置計算の最適化**
   - requestAnimationFrameを使用
   - スクロールイベントはデバウンス

3. **メモリ管理**
   - 使用後はイベントリスナーをクリーンアップ

---

## 関連コンポーネント

- **Tooltip**: より簡単な説明用（インタラクティブでない）
- **Dropdown**: 選択肢のリスト表示
- **Modal**: 全画面オーバーレイ
- **Dialog**: 確認や警告用

---

**最終更新:** 2025-12-11
**Phase 4 Option D で実装**
