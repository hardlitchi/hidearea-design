# Toast Container (トーストコンテナ) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/css/components/feedback/toast-container.css`
**ステータス:** ✅ 実装済み

---

## 概要

Toast Containerコンポーネントは、トースト通知を画面上の特定の位置に表示し、複数のトーストを管理するためのコンテナです。6つの配置オプションをサポートし、トーストのスタック管理を自動的に行います。

### 用途

- トースト通知の表示位置の管理
- 複数のトーストの積み重ね表示
- トーストの表示順序の制御
- 画面サイズに応じたレスポンシブな配置

---

## 配置オプション

### 1. Top-Left (左上)

画面の左上隅にトーストを表示します。

**使用場面:**
- 左側のサイドバーがある場合
- LTR（左から右）レイアウトで重要度の低い通知

### 2. Top-Center (上中央)

画面の上部中央にトーストを表示します。

**使用場面:**
- 全画面アプリケーション
- 中央揃えのデザイン
- 重要な通知を目立たせたい場合

### 3. Top-Right (右上) - デフォルト

画面の右上隅にトーストを表示します。最も一般的な配置です。

**使用場面:**
- 標準的なWebアプリケーション
- RTL（右から左）レイアウト
- 一般的な通知

### 4. Bottom-Left (左下)

画面の左下隅にトーストを表示します。

**使用場面:**
- チャットアプリケーション
- 左下にアクションエリアがない場合
- 下部ナビゲーションとの干渉を避ける場合

### 5. Bottom-Center (下中央)

画面の下部中央にトーストを表示します。

**使用場面:**
- モバイルアプリケーション
- フッターが固定されていない場合
- Snackbar風のデザイン

### 6. Bottom-Right (右下)

画面の右下隅にトーストを表示します。

**使用場面:**
- チャットボットのUI
- フローティングアクションボタンが左側にある場合
- 下部の通知エリア

---

## スタック管理

### Top 配置のスタック

Top系の配置（top-left, top-center, top-right）では、新しいトーストが上から順に追加されます。

```
┌─────────────────┐
│ 新しいトースト 3  │
├─────────────────┤
│ トースト 2      │
├─────────────────┤
│ 古いトースト 1   │
└─────────────────┘
```

### Bottom 配置のスタック

Bottom系の配置（bottom-left, bottom-center, bottom-right）では、新しいトーストが下から順に追加されます（逆順）。

```
┌─────────────────┐
│ 古いトースト 1   │
├─────────────────┤
│ トースト 2      │
├─────────────────┤
│ 新しいトースト 3  │
└─────────────────┘
```

---

## 使用方法

### WebComponents 使用例

```html
<!-- 右上配置（デフォルト） -->
<ha-toast-container position="top-right">
  <ha-toast variant="success">
    <div class="icon">✓</div>
    <div class="content">
      <p class="message">保存しました</p>
    </div>
  </ha-toast>

  <ha-toast variant="info">
    <div class="icon">ℹ️</div>
    <div class="content">
      <p class="message">処理中です...</p>
    </div>
  </ha-toast>
</ha-toast-container>

<!-- 下中央配置 -->
<ha-toast-container position="bottom-center">
  <ha-toast variant="warning">
    <div class="icon">⚠</div>
    <div class="content">
      <p class="message">ネットワーク接続が不安定です</p>
    </div>
  </ha-toast>
</ha-toast-container>

<!-- 左上配置 -->
<ha-toast-container position="top-left">
  <ha-toast variant="error">
    <div class="icon">✕</div>
    <div class="content">
      <p class="message">エラーが発生しました</p>
    </div>
  </ha-toast>
</ha-toast-container>
```

### Plain HTML での実装

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/components/feedback/toast-container.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/components/feedback/toast.css">
</head>
<body>
  <!-- トーストコンテナ - 右上 -->
  <div class="ha-toast-container" data-position="top-right">
    <div class="container">
      <!-- トーストがここに追加される -->
    </div>
  </div>

  <!-- トーストコンテナ - 下中央 -->
  <div class="ha-toast-container" data-position="bottom-center">
    <div class="container">
      <!-- トーストがここに追加される -->
    </div>
  </div>
</body>
</html>
```

### JavaScript での動的管理

```javascript
class ToastContainer {
  constructor(position = 'top-right') {
    this.position = position;
    this.container = this.createContainer();
    this.toasts = [];
    this.maxToasts = 5; // 最大表示数
  }

  createContainer() {
    const container = document.createElement('ha-toast-container');
    container.setAttribute('position', this.position);

    const innerContainer = document.createElement('div');
    innerContainer.className = 'container';
    container.appendChild(innerContainer);

    document.body.appendChild(container);
    return innerContainer;
  }

  add(toast) {
    // 最大数を超えたら古いトーストを削除
    if (this.toasts.length >= this.maxToasts) {
      const oldestToast = this.toasts.shift();
      this.remove(oldestToast);
    }

    this.container.appendChild(toast);
    this.toasts.push(toast);

    return toast;
  }

  remove(toast) {
    toast.setAttribute('closing', '');

    setTimeout(() => {
      if (toast.parentNode === this.container) {
        this.container.removeChild(toast);
      }
      const index = this.toasts.indexOf(toast);
      if (index > -1) {
        this.toasts.splice(index, 1);
      }
    }, 200); // アニメーション時間
  }

  clear() {
    this.toasts.forEach(toast => this.remove(toast));
  }

  setPosition(position) {
    this.position = position;
    this.container.parentElement.setAttribute('position', position);
  }

  getToastCount() {
    return this.toasts.length;
  }
}

// 使用例
const toastContainer = new ToastContainer('top-right');

// トーストを追加
function showToast(message, variant = 'info', duration = 5000) {
  const toast = document.createElement('ha-toast');
  toast.setAttribute('variant', variant);
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  toast.innerHTML = `
    <div class="icon">${getIcon(variant)}</div>
    <div class="content">
      <p class="message">${message}</p>
    </div>
    <button class="close-button" aria-label="通知を閉じる">×</button>
    ${duration > 0 ? `
      <div class="progress">
        <div class="progress-bar" style="width: 100%; transition-duration: ${duration}ms;"></div>
      </div>
    ` : ''}
  `;

  toastContainer.add(toast);

  // 閉じるボタン
  toast.querySelector('.close-button').addEventListener('click', () => {
    toastContainer.remove(toast);
  });

  // 自動削除
  if (duration > 0) {
    const progressBar = toast.querySelector('.progress-bar');
    setTimeout(() => progressBar.style.width = '0%', 10);

    setTimeout(() => {
      toastContainer.remove(toast);
    }, duration);
  }
}

function getIcon(variant) {
  const icons = {
    info: 'ℹ️',
    success: '✓',
    warning: '⚠',
    error: '✕'
  };
  return icons[variant] || icons.info;
}

// 使用例
showToast('データを保存しました', 'success', 3000);
showToast('処理中です...', 'info', 0);
showToast('エラーが発生しました', 'error', 5000);
```

### React での実装

```jsx
import { useState, createContext, useContext } from 'react';

// Toast Context
const ToastContext = createContext();

export function ToastProvider({ children, position = 'top-right', maxToasts = 5 }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, variant = 'info', duration = 5000) => {
    const id = Date.now();
    const newToast = { id, message, variant, duration };

    setToasts(prev => {
      // 最大数を超えたら古いものを削除
      const updated = prev.length >= maxToasts
        ? [...prev.slice(1), newToast]
        : [...prev, newToast];
      return updated;
    });

    // 自動削除
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, clearToasts }}>
      {children}
      <ha-toast-container position={position}>
        <div className="container">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              variant={toast.variant}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </ha-toast-container>
    </ToastContext.Provider>
  );
}

// Toast Hook
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// Toast Component
function Toast({ message, variant, duration, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration > 0) {
      setTimeout(() => setProgress(0), 10);
    }
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  return (
    <ha-toast variant={variant} closing={isClosing || undefined}>
      <div className="icon">{getIcon(variant)}</div>
      <div className="content">
        <p className="message">{message}</p>
      </div>
      <button className="close-button" onClick={handleClose} aria-label="通知を閉じる">
        ×
      </button>
      {duration > 0 && (
        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              transitionDuration: `${duration}ms`
            }}
          />
        </div>
      )}
    </ha-toast>
  );
}

// 使用例
function App() {
  return (
    <ToastProvider position="top-right" maxToasts={3}>
      <YourApp />
    </ToastProvider>
  );
}

function YourComponent() {
  const { addToast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      addToast('保存しました', 'success', 3000);
    } catch (error) {
      addToast('エラーが発生しました', 'error', 5000);
    }
  };

  return <button onClick={handleSave}>保存</button>;
}
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `position` | `top-left` \| `top-center` \| `top-right` \| `bottom-left` \| `bottom-center` \| `bottom-right` | `top-right` | トーストコンテナの表示位置 |

---

## CSS クラス

| クラス | 説明 |
|--------|------|
| `.ha-toast-container` | トーストコンテナのルート要素 |
| `.container` | トーストを含む内部コンテナ |

---

## CSS変数

Toast Containerコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### レイアウト
- `--toast-gap` (デフォルト: `12px`) - トースト間の間隔
- `--toast-container-padding` (デフォルト: `16px`) - コンテナの内部パディング

### z-index
- `--toast-container-z-index` (デフォルト: `9999`) - コンテナの重ね順（最前面に表示）

---

## レスポンシブ対応

Toast Containerはレスポンシブデザインに対応しています。

### モバイル向けの推奨配置

```css
/* モバイルでは下部中央配置を推奨 */
@media (max-width: 768px) {
  .ha-toast-container[position="top-right"],
  .ha-toast-container[position="top-left"] {
    /* モバイルでは下部中央に変更 */
    top: auto;
    bottom: 0;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
}
```

### カスタムレスポンシブ実装

```javascript
class ResponsiveToastContainer extends ToastContainer {
  constructor() {
    const isMobile = window.innerWidth <= 768;
    const position = isMobile ? 'bottom-center' : 'top-right';
    super(position);

    // ウィンドウリサイズ時に位置を変更
    window.addEventListener('resize', () => {
      const newIsMobile = window.innerWidth <= 768;
      if (newIsMobile !== isMobile) {
        this.setPosition(newIsMobile ? 'bottom-center' : 'top-right');
      }
    });
  }
}
```

---

## アクセシビリティ

### ARIA Live Regions

Toast Containerは、スクリーンリーダーがトーストを適切に読み上げられるように、ARIA Live Regionsとして機能します。

```html
<!-- コンテナ自体にaria-liveを設定することも可能 -->
<ha-toast-container position="top-right" role="region" aria-label="通知エリア">
  <div class="container">
    <ha-toast variant="success" role="status" aria-live="polite">
      <!-- トースト内容 -->
    </ha-toast>
  </div>
</ha-toast-container>
```

### フォーカス管理

複数のトーストが表示されている場合、フォーカスの管理に注意が必要です。

```javascript
class AccessibleToastContainer extends ToastContainer {
  add(toast) {
    super.add(toast);

    // 新しいトーストが追加されたら、閉じるボタンにフォーカス（オプション）
    const closeButton = toast.querySelector('.close-button');
    if (closeButton && this.shouldFocusNewToast()) {
      closeButton.focus();
    }
  }

  shouldFocusNewToast() {
    // エラーや警告の場合のみフォーカス
    return toast.getAttribute('variant') === 'error' ||
           toast.getAttribute('variant') === 'warning';
  }
}
```

---

## ベストプラクティス

### ✅ 推奨

#### 1. 適切な配置の選択

アプリケーションのレイアウトに応じて適切な配置を選択してください。

```html
<!-- 標準的なWebアプリ: 右上 -->
<ha-toast-container position="top-right"></ha-toast-container>

<!-- モバイルアプリ: 下中央 -->
<ha-toast-container position="bottom-center"></ha-toast-container>

<!-- チャットアプリ: 左下 -->
<ha-toast-container position="bottom-left"></ha-toast-container>
```

#### 2. 最大表示数の制限

画面を占有しすぎないよう、表示するトーストの数を制限してください。

```javascript
const MAX_TOASTS = 3;

function addToast(message, variant) {
  const container = document.querySelector('.ha-toast-container .container');
  const toasts = container.querySelectorAll('ha-toast');

  // 最大数を超えたら古いものを削除
  if (toasts.length >= MAX_TOASTS) {
    toasts[0].setAttribute('closing', '');
    setTimeout(() => toasts[0].remove(), 200);
  }

  // 新しいトーストを追加
  // ...
}
```

#### 3. 一貫性のある配置

アプリケーション全体で一貫した配置を使用してください。

```javascript
// グローバル設定
const TOAST_POSITION = 'top-right';

// すべてのトーストで同じ配置を使用
const toastContainer = new ToastContainer(TOAST_POSITION);
```

#### 4. z-indexの管理

他のUI要素との重なりを考慮してz-indexを設定してください。

```css
:root {
  --toast-container-z-index: 9999; /* モーダルより上 */
}
```

### ❌ 非推奨

#### 1. 複数のコンテナを同時使用

```html
<!-- Bad: 複数の位置にコンテナを配置 -->
<ha-toast-container position="top-right"></ha-toast-container>
<ha-toast-container position="bottom-left"></ha-toast-container>
<ha-toast-container position="top-center"></ha-toast-container>

<!-- Good: 1つのコンテナのみ使用 -->
<ha-toast-container position="top-right"></ha-toast-container>
```

#### 2. 無制限なトーストの追加

```javascript
// Bad: 制限なし
function addManyToasts() {
  for (let i = 0; i < 100; i++) {
    showToast(`メッセージ ${i}`, 'info');
  }
}

// Good: 制限あり、または統合メッセージ
function addManyToasts(count) {
  if (count > 5) {
    showToast(`${count}件の新しいメッセージがあります`, 'info');
  } else {
    // 個別に表示
  }
}
```

#### 3. 配置の頻繁な変更

```javascript
// Bad: 配置を頻繁に変更
setInterval(() => {
  const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  const random = positions[Math.floor(Math.random() * positions.length)];
  container.setPosition(random);
}, 1000);

// Good: 固定の配置を使用
const container = new ToastContainer('top-right');
```

---

## 使用例

### シンプルな通知システム

```javascript
// グローバルトーストマネージャー
const toast = {
  container: new ToastContainer('top-right'),

  success(message, duration = 3000) {
    showToast(message, 'success', duration);
  },

  error(message, duration = 5000) {
    showToast(message, 'error', duration);
  },

  info(message, duration = 4000) {
    showToast(message, 'info', duration);
  },

  warning(message, duration = 4000) {
    showToast(message, 'warning', duration);
  }
};

// 使用例
toast.success('保存しました');
toast.error('エラーが発生しました');
toast.info('処理中です...');
toast.warning('接続が不安定です');
```

### プログレスバー付き通知

```javascript
function showProgressToast(message) {
  const toast = document.createElement('ha-toast');
  toast.setAttribute('variant', 'info');

  toast.innerHTML = `
    <div class="icon">⏳</div>
    <div class="content">
      <p class="message">${message}</p>
    </div>
    <div class="progress">
      <div class="progress-bar" style="width: 100%; transition-duration: 10s;"></div>
    </div>
  `;

  toastContainer.add(toast);

  const progressBar = toast.querySelector('.progress-bar');
  setTimeout(() => progressBar.style.width = '0%', 10);

  setTimeout(() => {
    toastContainer.remove(toast);
  }, 10000);

  return toast;
}
```

---

## テーマ対応

Toast Containerはテーマに対応しており、`data-theme` 属性でダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <ha-toast-container position="top-right">
    <!-- トースト -->
  </ha-toast-container>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <ha-toast-container position="top-right">
    <!-- トースト -->
  </ha-toast-container>
</html>
```

---

## 関連コンポーネント

- [Toast](./toast.md) - 個別のトースト通知
- [Alert](./alert.md) - ページ内の永続的なメッセージ
- [Modal](../overlays/modal.md) - モーダルダイアログ
- [Dialog](../overlays/dialog.md) - ダイアログ

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)
- [セマンティックトークンガイド](../../セマンティックトークンガイド.md)

---

**最終更新:** 2025-12-12
