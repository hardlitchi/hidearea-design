# Tooltip (ツールチップ) コンポーネント

**カテゴリ:** Overlays
**ファイル:** `src/components/overlays/tooltip.yaml`
**ステータス:** ✅ 実装済み (Phase 4 Option D)

---

## 概要

ツールチップコンポーネントは、要素にホバーまたはフォーカスしたときに表示される小さな情報パネルです。簡潔な説明やヒントを提供し、ユーザーの理解を助けます。

### 用途

- アイコンの説明
- 切り詰められたテキストの全文表示
- フォーム入力のヒント
- ボタンやリンクの補足説明
- キーボードショートカットの表示

### 特徴

- ホバーまたはフォーカス時に自動表示
- 簡潔な情報提供（1-2行）
- 位置の自動調整（上下左右）
- アクセシビリティ対応

---

## トークン一覧

### 背景色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tooltip.background.default` | `{foreground.primary}` | ツールチップ背景色（反転利用でコントラスト向上） |

### テキスト色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tooltip.text.default` | `{foreground.inverse}` | ツールチップテキスト色（反転色で視認性向上） |

---

## 使用例

### HTML

```html
<!-- 基本的なツールチップ -->
<button
  class="button"
  aria-describedby="tooltip-1"
  data-tooltip="このボタンをクリックして保存"
>
  保存
</button>

<div id="tooltip-1" role="tooltip" class="tooltip">
  このボタンをクリックして保存
</div>

<!-- アイコンボタン付きツールチップ -->
<button
  class="icon-button"
  aria-label="設定"
  data-tooltip="設定を開く"
>
  ⚙️
  <span class="tooltip">設定を開く</span>
</button>

<!-- 位置指定ツールチップ -->
<button data-tooltip="上に表示" data-tooltip-position="top">
  上
</button>

<button data-tooltip="右に表示" data-tooltip-position="right">
  右
</button>

<button data-tooltip="下に表示" data-tooltip-position="bottom">
  下
</button>

<button data-tooltip="左に表示" data-tooltip-position="left">
  左
</button>

<!-- 長いテキストのツールチップ -->
<span
  class="text-truncate"
  data-tooltip="これは非常に長いテキストで、画面に収まらないため切り詰められています"
>
  これは非常に長いテキストで...
</span>
```

### CSS

```css
/* ツールチップコンテナ */
.tooltip {
  position: absolute;
  z-index: 1000;
  padding: 0.5rem 0.75rem;
  background-color: var(--component-tooltip-background-default);
  color: var(--component-tooltip-text-default);
  font-size: 0.875rem;
  line-height: 1.4;
  border-radius: 0.375rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}

/* 表示状態 */
.tooltip.tooltip-visible {
  opacity: 1;
}

/* 位置バリアント */
.tooltip-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-0.5rem);
  margin-bottom: 0.5rem;
}

.tooltip-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0.5rem);
  margin-top: 0.5rem;
}

.tooltip-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(-0.5rem);
  margin-right: 0.5rem;
}

.tooltip-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(0.5rem);
  margin-left: 0.5rem;
}

/* 矢印 */
.tooltip::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 0.375rem solid transparent;
}

.tooltip-top::before {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: var(--component-tooltip-background-default);
  border-bottom-width: 0;
}

.tooltip-bottom::before {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: var(--component-tooltip-background-default);
  border-top-width: 0;
}

.tooltip-left::before {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: var(--component-tooltip-background-default);
  border-right-width: 0;
}

.tooltip-right::before {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: var(--component-tooltip-background-default);
  border-left-width: 0;
}

/* アニメーション */
@keyframes tooltip-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.tooltip-visible {
  animation: tooltip-fade-in 0.15s ease;
}
```

### JavaScript

```javascript
class Tooltip {
  constructor() {
    this.activeTooltip = null;
    this.init();
  }

  init() {
    // data-tooltip属性を持つすべての要素にイベントを追加
    const elements = document.querySelectorAll('[data-tooltip]');

    elements.forEach(element => {
      element.addEventListener('mouseenter', (e) => this.show(e));
      element.addEventListener('mouseleave', () => this.hide());
      element.addEventListener('focus', (e) => this.show(e));
      element.addEventListener('blur', () => this.hide());
    });
  }

  show(event) {
    const element = event.currentTarget;
    const text = element.getAttribute('data-tooltip');
    const position = element.getAttribute('data-tooltip-position') || 'top';

    if (!text) return;

    // ツールチップ要素を作成
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip-${position}`;
    tooltip.textContent = text;
    tooltip.setAttribute('role', 'tooltip');

    // DOMに追加
    document.body.appendChild(tooltip);

    // 位置を計算
    this.position(tooltip, element, position);

    // 表示
    requestAnimationFrame(() => {
      tooltip.classList.add('tooltip-visible');
    });

    this.activeTooltip = tooltip;
  }

  hide() {
    if (this.activeTooltip) {
      this.activeTooltip.classList.remove('tooltip-visible');

      setTimeout(() => {
        if (this.activeTooltip) {
          this.activeTooltip.remove();
          this.activeTooltip = null;
        }
      }, 150); // アニメーション時間と合わせる
    }
  }

  position(tooltip, element, position) {
    const elementRect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 8; // 要素との間隔

    let top, left;

    switch (position) {
      case 'top':
        top = elementRect.top - tooltipRect.height - gap;
        left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
        break;

      case 'bottom':
        top = elementRect.bottom + gap;
        left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
        break;

      case 'left':
        top = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
        left = elementRect.left - tooltipRect.width - gap;
        break;

      case 'right':
        top = elementRect.top + (elementRect.height - tooltipRect.height) / 2;
        left = elementRect.right + gap;
        break;

      default:
        top = elementRect.top - tooltipRect.height - gap;
        left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
    }

    // 画面外に出ないように調整
    const margin = 8;
    const maxLeft = window.innerWidth - tooltipRect.width - margin;
    const maxTop = window.innerHeight - tooltipRect.height - margin;

    top = Math.max(margin, Math.min(top, maxTop));
    left = Math.max(margin, Math.min(left, maxLeft));

    tooltip.style.top = `${top + window.scrollY}px`;
    tooltip.style.left = `${left + window.scrollX}px`;
  }
}

// 初期化
new Tooltip();
```

### React

```tsx
import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactElement;
}

function Tooltip({ content, position = 'top', children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;

      case 'bottom':
        top = triggerRect.bottom + gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;

      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;

      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + gap;
        break;
    }

    // 画面外に出ないように調整
    const margin = 8;
    top = Math.max(margin, Math.min(top, window.innerHeight - tooltipRect.height - margin));
    left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin));

    setCoords({ top: top + window.scrollY, left: left + window.scrollX });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible]);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  // 子要素にイベントハンドラーを追加
  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
    'aria-describedby': isVisible ? 'tooltip' : undefined,
  });

  return (
    <>
      {trigger}
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip"
          role="tooltip"
          className={`tooltip tooltip-${position} tooltip-visible`}
          style={{
            position: 'absolute',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}

// 使用例
function App() {
  return (
    <div>
      <Tooltip content="この操作を実行" position="top">
        <button className="button">実行</button>
      </Tooltip>

      <Tooltip content="設定を開く" position="right">
        <button className="icon-button">⚙️</button>
      </Tooltip>
    </div>
  );
}
```

---

## アクセシビリティ

### ARIA属性

- `role="tooltip"`: ツールチップの役割を設定
- `aria-describedby`: トリガー要素とツールチップを関連付け
- `aria-label`: アイコンボタンなど、テキストラベルがない要素に設定

### キーボード対応

実装すべき機能:

- **フォーカス時**: ツールチップを表示
- **ブラー時**: ツールチップを非表示
- **Esc**: ツールチップを非表示（オプション）

```javascript
element.addEventListener('focus', showTooltip);
element.addEventListener('blur', hideTooltip);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideTooltip();
  }
});
```

### スクリーンリーダー対応

1. **適切な関連付け**
   - `aria-describedby`でツールチップとトリガー要素を関連付け
   - スクリーンリーダーが自動的にツールチップ内容を読み上げ

2. **冗長性の回避**
   - ツールチップの内容が既に表示されているテキストと重複しない
   - 追加情報のみを提供

3. **ポインター非依存**
   - キーボードフォーカスでもツールチップを表示
   - マウスだけでなくキーボードでもアクセス可能

---

## ベストプラクティス

### ツールチップの使用

1. **簡潔な内容**
   - 1-2行の短い説明
   - 長い説明が必要な場合はPopoverを使用

2. **適切な配置**
   - 要素の近くに配置
   - 画面外に出ないように自動調整

3. **適切なタイミング**
   - ホバー後、短い遅延（200-300ms）後に表示
   - 即座に表示すると邪魔になる可能性

```javascript
let tooltipTimeout;

element.addEventListener('mouseenter', () => {
  tooltipTimeout = setTimeout(() => {
    showTooltip();
  }, 300); // 300ms遅延
});

element.addEventListener('mouseleave', () => {
  clearTimeout(tooltipTimeout);
  hideTooltip();
});
```

### 使うべき場面

**ツールチップを使う:**
- アイコンの説明
- 切り詰められたテキスト
- 簡単なヒント
- キーボードショートカット

**ツールチップを使わない:**
- 重要な情報（必ず見えるようにする）
- 長い説明（Popoverを使用）
- インタラクティブな要素（Popoverを使用）
- エラーメッセージ（インライン表示を使用）

### パフォーマンス

1. **遅延読み込み**
   - ツールチップ要素は必要になるまで作成しない
   - 使用後は削除

2. **イベント委譲**
   - 多数の要素に個別イベントを付けない
   - 親要素で一括管理

```javascript
// 悪い例
document.querySelectorAll('[data-tooltip]').forEach(el => {
  el.addEventListener('mouseenter', showTooltip);
});

// 良い例
document.body.addEventListener('mouseenter', (e) => {
  if (e.target.matches('[data-tooltip]')) {
    showTooltip(e);
  }
}, true); // useCapture: true
```

3. **位置計算の最適化**
   - requestAnimationFrameを使用
   - 不要な再計算を避ける

---

## 位置バリアント

### Top (上)

```html
<button data-tooltip="上に表示" data-tooltip-position="top">
  ホバー
</button>
```

**使用場面:**
- デフォルトの位置
- 最も一般的な配置

### Bottom (下)

```html
<button data-tooltip="下に表示" data-tooltip-position="bottom">
  ホバー
</button>
```

**使用場面:**
- 要素が画面上部にある場合

### Left (左)

```html
<button data-tooltip="左に表示" data-tooltip-position="left">
  ホバー
</button>
```

**使用場面:**
- 要素が画面右端にある場合
- 横方向のスペースがある場合

### Right (右)

```html
<button data-tooltip="右に表示" data-tooltip-position="right">
  ホバー
</button>
```

**使用場面:**
- 要素が画面左端にある場合
- 横方向のスペースがある場合

### 自動調整

画面外に出る場合は自動的に位置を調整:

```javascript
function autoPosition(tooltip, element) {
  const positions = ['top', 'bottom', 'left', 'right'];

  for (const pos of positions) {
    const coords = calculatePosition(tooltip, element, pos);

    // 画面内に収まるかチェック
    if (isInViewport(coords, tooltip)) {
      return pos;
    }
  }

  return 'top'; // デフォルト
}
```

---

## スタイルバリエーション

### 矢印なしツールチップ

```css
.tooltip-no-arrow::before {
  display: none;
}
```

### 大きなツールチップ

```css
.tooltip-large {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  white-space: normal;
  max-width: 300px;
}
```

### カラーバリアント

```css
.tooltip-primary {
  background-color: var(--primary-default);
  color: var(--foreground-inverse);
}

.tooltip-success {
  background-color: var(--success-default);
  color: var(--foreground-inverse);
}

.tooltip-error {
  background-color: var(--error-default);
  color: var(--foreground-inverse);
}
```

---

## 関連コンポーネント

- **Popover**: より複雑な内容を表示（インタラクティブ要素を含む）
- **Modal**: 全画面オーバーレイ
- **Dialog**: 確認や警告ダイアログ

---

## トラブルシューティング

### ツールチップが画面外に出る

位置計算で画面サイズを考慮:

```javascript
const margin = 8;
const maxLeft = window.innerWidth - tooltipRect.width - margin;
const maxTop = window.innerHeight - tooltipRect.height - margin;

left = Math.max(margin, Math.min(left, maxLeft));
top = Math.max(margin, Math.min(top, maxTop));
```

### ツールチップが要素と重なる

適切な`gap`を設定:

```javascript
const gap = 8; // 要素との間隔（ピクセル）
```

### モバイルでツールチップが表示されない

タッチイベントにも対応:

```javascript
element.addEventListener('touchstart', showTooltip);
element.addEventListener('touchend', hideTooltip);
```

ただし、モバイルではツールチップよりもPopoverの使用を推奨。

---

**最終更新:** 2025-12-11
**Phase 4 Option D で実装**
