# Modal (モーダル) コンポーネント

**カテゴリ:** Overlays
**ファイル:** `src/components/overlays/modal.yaml`
**ステータス:** ✅ 実装済み (Phase 4 Option D)

---

## 概要

モーダルコンポーネントは、画面全体を覆うオーバーレイ上に表示されるコンテナです。ユーザーの注意を特定のコンテンツやタスクに集中させ、モーダルが閉じられるまで他の操作をブロックします。

### 用途

- フォームの入力（ログイン、サインアップ）
- 重要な情報の表示
- 画像や動画のプレビュー
- 複雑な設定画面
- ウィザード形式の多段階フロー

### 特徴

- 背景オーバーレイで他のコンテンツをブロック
- Escキーで閉じる機能
- 背景クリックで閉じる機能（オプション）
- フォーカストラップによるキーボードナビゲーション

---

## トークン一覧

### 背景色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.modal.background.default` | `{background.primary}` | モーダルコンテンツの背景色 |
| `component.modal.background.overlay` | `rgba(0, 0, 0, 0.5)` | 背景オーバーレイ色（半透明黒・50%透明度） |

### ボーダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.modal.border.default` | `{border.default}` | モーダルのボーダー色 |

---

## 使用方法

### Pattern 1: Web Component (推奨)

```html
<!-- Web Componentとして使用 -->
<ha-modal id="example-modal" size="md">
  <div slot="header">
    <h2>タイトル</h2>
  </div>
  <div slot="body">
    <p>モーダルの内容がここに入ります。</p>
  </div>
  <div slot="footer">
    <button>キャンセル</button>
    <button>確認</button>
  </div>
</ha-modal>

<script type="module">
  import '@hidearea-design/components/modal';

  // モーダルを開く
  const modal = document.getElementById('example-modal');
  const openButton = document.getElementById('open-button');

  openButton.addEventListener('click', () => {
    modal.open();
  });
</script>
```

### Pattern 2: Plain HTML (推奨)

#### CSSファイルの読み込み

```html
<!-- デザイントークン（必須） -->
<link rel="stylesheet" href="@hidearea-design/tokens/build/css/tokens.css">

<!-- Modalコンポーネント -->
<link rel="stylesheet" href="@hidearea-design/tokens/build/css/html/overlays/modal.css">
```

#### 基本的な構造

```html
<div class="ha-modal" size="md" id="example-modal">
  <div class="overlay">
    <div class="container">
      <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header class="header">
          <h2 id="modal-title" class="title">モーダルタイトル</h2>
          <button class="close" aria-label="閉じる">×</button>
        </header>
        <div class="body">
          <p>モーダルの内容がここに入ります。</p>
        </div>
        <footer class="footer">
          <button class="button-secondary">キャンセル</button>
          <button class="button-primary">確認</button>
        </footer>
      </div>
    </div>
  </div>
</div>
```

#### サイズバリエーション

```html
<!-- Small (400px) -->
<div class="ha-modal" size="sm" id="small-modal">
  <!-- ... -->
</div>

<!-- Medium (600px) - デフォルト -->
<div class="ha-modal" size="md" id="medium-modal">
  <!-- ... -->
</div>

<!-- Large (800px) -->
<div class="ha-modal" size="lg" id="large-modal">
  <!-- ... -->
</div>

<!-- Extra Large (1200px) -->
<div class="ha-modal" size="xl" id="xlarge-modal">
  <!-- ... -->
</div>

<!-- Full Screen -->
<div class="ha-modal" size="full" id="fullscreen-modal">
  <!-- ... -->
</div>
```

#### JavaScript実装

```javascript
class ModalController {
  constructor(modalElement) {
    this.modal = modalElement;
    this.dialog = modalElement.querySelector('.dialog');
    this.overlay = modalElement.querySelector('.overlay');
    this.closeButton = modalElement.querySelector('.close');
    this.previousActiveElement = null;

    this.init();
  }

  init() {
    // 閉じるボタンのイベント
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }

    // オーバーレイクリックで閉じる
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Escキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // フォーカストラップを設定
    this.setupFocusTrap();
  }

  open() {
    // 現在のフォーカス要素を保存
    this.previousActiveElement = document.activeElement;

    // モーダルを表示
    this.modal.setAttribute('open', '');

    // bodyのスクロールを無効化
    document.body.style.overflow = 'hidden';

    // 最初のフォーカス可能な要素にフォーカス
    const firstFocusable = this.getFocusableElements()[0];
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }
  }

  close() {
    // モーダルを非表示
    this.modal.removeAttribute('open');

    // bodyのスクロールを有効化
    document.body.style.overflow = '';

    // 以前のフォーカスを復元
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  isOpen() {
    return this.modal.hasAttribute('open');
  }

  getFocusableElements() {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    return Array.from(this.dialog.querySelectorAll(selector));
  }

  setupFocusTrap() {
    this.dialog.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = this.getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    });
  }
}

// 使用例
const modal = new ModalController(document.getElementById('example-modal'));

// モーダルを開くボタン
document.getElementById('open-button').addEventListener('click', () => {
  modal.open();
});
```

#### ARIA属性の使用

```html
<div class="ha-modal" size="md" id="accessible-modal">
  <div class="overlay">
    <div class="container">
      <div
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <header class="header">
          <h2 id="modal-title" class="title">確認</h2>
          <button class="close" aria-label="モーダルを閉じる">×</button>
        </header>
        <div class="body">
          <p id="modal-description">この操作を実行してもよろしいですか?</p>
        </div>
        <footer class="footer">
          <button class="button-secondary">キャンセル</button>
          <button class="button-primary">実行</button>
        </footer>
      </div>
    </div>
  </div>
</div>
```

**重要なARIA属性:**

- `role="dialog"`: モーダルがダイアログであることを示す
- `aria-modal="true"`: モーダルダイアログであることを明示
- `aria-labelledby`: タイトル要素のIDを参照
- `aria-describedby`: 説明文要素のIDを参照（オプション）
- `aria-label`: 閉じるボタンの目的を明確に

#### フォーカストラップの実装

```javascript
// フォーカストラップの詳細実装
function setupFocusTrap(dialogElement) {
  const focusableSelector = [
    'a[href]:not([disabled])',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  dialogElement.addEventListener('keydown', (e) => {
    // Tabキー以外は無視
    if (e.key !== 'Tab') return;

    const focusableElements = Array.from(
      dialogElement.querySelectorAll(focusableSelector)
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab: 逆方向
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab: 順方向
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });
}
```

#### 背景クリックで閉じる機能

```javascript
// 背景クリックで閉じる（クリックイベントの伝播を考慮）
overlay.addEventListener('click', (e) => {
  // オーバーレイ自体がクリックされた場合のみ閉じる
  if (e.target === overlay) {
    modal.close();
  }
});

// dialogの内側をクリックした場合は閉じない
dialog.addEventListener('click', (e) => {
  e.stopPropagation();
});
```

#### Escキーで閉じる機能

```javascript
// グローバルなキーボードイベント
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // 最前面のモーダルのみを閉じる
    const openModals = document.querySelectorAll('.ha-modal[open]');
    if (openModals.length > 0) {
      const topModal = openModals[openModals.length - 1];
      const controller = modalControllers.get(topModal);
      if (controller) {
        controller.close();
      }
    }
  }
});
```

### Pattern 3: React

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '@hidearea-design/tokens/build/css/html/overlays/modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  size = 'md',
  title,
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEsc = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 現在のフォーカス要素を保存
      previousActiveElement.current = document.activeElement as HTMLElement;

      // bodyのスクロールを無効化
      document.body.style.overflow = 'hidden';

      // ダイアログにフォーカス
      const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
      }

      // Escキーのハンドラー
      const handleEscape = (e: KeyboardEvent) => {
        if (closeOnEsc && e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        // クリーンアップ
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);

        // フォーカスを復元
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  return createPortal(
    <div className="ha-modal" {...(isOpen ? { open: '' } : {})} size={size}>
      <div className="overlay" onClick={closeOnBackdrop ? onClose : undefined}>
        <div className="container">
          <div
            ref={dialogRef}
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="header">
              <h2 id="modal-title" className="title">{title}</h2>
              <button className="close" onClick={onClose} aria-label="閉じる">
                ×
              </button>
            </header>

            <div className="body">
              {children}
            </div>

            {footer && (
              <footer className="footer">
                {footer}
              </footer>
            )}
          </div>
        </div>
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
      <button onClick={() => setIsOpen(true)}>
        モーダルを開く
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="md"
        title="確認"
        footer={
          <>
            <button className="button-secondary" onClick={() => setIsOpen(false)}>
              キャンセル
            </button>
            <button className="button-primary" onClick={() => {
              // 処理を実行
              setIsOpen(false);
            }}>
              確認
            </button>
          </>
        }
      >
        <p>この操作を実行してもよろしいですか?</p>
      </Modal>
    </>
  );
}
```

### Pattern 4: Vue

```vue
<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="ha-modal"
      :size="size"
      open
    >
      <div class="overlay" @click="handleBackdropClick">
        <div class="container">
          <div
            ref="dialogRef"
            class="dialog"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            @click.stop
          >
            <header class="header">
              <h2 :id="titleId" class="title">{{ title }}</h2>
              <button class="close" @click="close" aria-label="閉じる">
                ×
              </button>
            </header>

            <div class="body">
              <slot />
            </div>

            <footer v-if="$slots.footer" class="footer">
              <slot name="footer" />
            </footer>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import '@hidearea-design/tokens/build/css/html/overlays/modal.css';

interface Props {
  isOpen: boolean;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnBackdrop: true,
  closeOnEsc: true,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const dialogRef = ref<HTMLElement | null>(null);
const previousActiveElement = ref<HTMLElement | null>(null);
const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;

const close = () => {
  emit('close');
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close();
  }
};

const handleEscape = (e: KeyboardEvent) => {
  if (props.closeOnEsc && e.key === 'Escape' && props.isOpen) {
    close();
  }
};

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    // 現在のフォーカス要素を保存
    previousActiveElement.value = document.activeElement as HTMLElement;

    // bodyのスクロールを無効化
    document.body.style.overflow = 'hidden';

    // ダイアログにフォーカス
    setTimeout(() => {
      const firstFocusable = dialogRef.value?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }, 100);
  } else {
    // bodyのスクロールを有効化
    document.body.style.overflow = '';

    // フォーカスを復元
    if (previousActiveElement.value) {
      previousActiveElement.value.focus();
    }
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = '';
});
</script>

<!-- 使用例 -->
<template>
  <div>
    <button @click="isOpen = true">
      モーダルを開く
    </button>

    <Modal
      :is-open="isOpen"
      @close="isOpen = false"
      title="確認"
      size="md"
    >
      <p>この操作を実行してもよろしいですか?</p>

      <template #footer>
        <button class="button-secondary" @click="isOpen = false">
          キャンセル
        </button>
        <button class="button-primary" @click="handleConfirm">
          確認
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';

const isOpen = ref(false);

const handleConfirm = () => {
  // 処理を実行
  isOpen.value = false;
};
</script>
```

---

## 使用例

### HTML

```html
<!-- 基本的なモーダル -->
<div class="modal-overlay" role="presentation" aria-hidden="false">
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <div class="modal-header">
      <h2 id="modal-title" class="modal-title">モーダルタイトル</h2>
      <button
        class="modal-close"
        aria-label="閉じる"
        type="button"
      >
        ×
      </button>
    </div>

    <div class="modal-body">
      <p id="modal-description">
        これはモーダルの本文です。重要な情報やフォームをここに配置します。
      </p>
    </div>

    <div class="modal-footer">
      <button class="button button-secondary" type="button">
        キャンセル
      </button>
      <button class="button button-primary" type="button">
        確認
      </button>
    </div>
  </div>
</div>

<!-- フォーム付きモーダル -->
<div class="modal-overlay">
  <div class="modal" role="dialog" aria-modal="true">
    <div class="modal-header">
      <h2 class="modal-title">ログイン</h2>
      <button class="modal-close" aria-label="閉じる">×</button>
    </div>

    <form class="modal-body">
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          class="input"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">パスワード</label>
        <input
          type="password"
          id="password"
          class="input"
          required
        />
      </div>

      <div class="modal-footer">
        <button type="button" class="button button-secondary">
          キャンセル
        </button>
        <button type="submit" class="button button-primary">
          ログイン
        </button>
      </div>
    </form>
  </div>
</div>
```

### CSS

```css
/* オーバーレイ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--component-modal-background-overlay);
  z-index: 1000;
  padding: 1rem;
}

/* モーダルコンテナ */
.modal {
  position: relative;
  background-color: var(--component-modal-background-default);
  border: 1px solid var(--component-modal-border-default);
  border-radius: 0.5rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* ヘッダー */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--component-modal-border-default);
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--foreground-primary);
}

/* 閉じるボタン */
.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 0.375rem;
  color: var(--foreground-tertiary);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.modal-close:hover {
  background-color: var(--background-secondary);
  color: var(--foreground-primary);
}

/* ボディ */
.modal-body {
  padding: 1.5rem;
}

/* フッター */
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid var(--component-modal-border-default);
}

/* アニメーション */
@keyframes modal-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-overlay {
  animation: modal-fade-in 0.2s ease-out;
}

.modal {
  animation: modal-scale-in 0.2s ease-out;
}
```

### JavaScript

```javascript
class Modal {
  constructor(element) {
    this.modal = element;
    this.overlay = element.closest('.modal-overlay');
    this.closeButtons = element.querySelectorAll('[data-modal-close], .modal-close');
    this.previousActiveElement = null;
    this.focusableElements = null;

    this.init();
  }

  init() {
    // 閉じるボタンのイベント
    this.closeButtons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });

    // オーバーレイクリックで閉じる
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Escキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // フォーカストラップを初期化
    this.setupFocusTrap();
  }

  open() {
    // 現在のフォーカス要素を保存
    this.previousActiveElement = document.activeElement;

    // モーダルを表示
    this.overlay.style.display = 'flex';
    this.overlay.setAttribute('aria-hidden', 'false');

    // bodyのスクロールを無効化
    document.body.style.overflow = 'hidden';

    // 最初のフォーカス可能な要素にフォーカス
    const firstFocusable = this.getFocusableElements()[0];
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  close() {
    // モーダルを非表示
    this.overlay.style.display = 'none';
    this.overlay.setAttribute('aria-hidden', 'true');

    // bodyのスクロールを有効化
    document.body.style.overflow = '';

    // 以前のフォーカスを復元
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  isOpen() {
    return this.overlay.style.display === 'flex';
  }

  getFocusableElements() {
    const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), ' +
                    'input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(this.modal.querySelectorAll(selector));
  }

  setupFocusTrap() {
    this.modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = this.getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    });
  }
}

// 使用例
const modalElement = document.querySelector('.modal');
const modal = new Modal(modalElement);

// モーダルを開く
document.querySelector('[data-open-modal]').addEventListener('click', () => {
  modal.open();
});
```

### React

```tsx
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 現在のフォーカスを保存
      previousActiveElement.current = document.activeElement as HTMLElement;

      // bodyのスクロールを無効化
      document.body.style.overflow = 'hidden';

      // モーダルにフォーカス
      modalRef.current?.focus();

      // Escキーのハンドラー
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        // クリーンアップ
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);

        // フォーカスを復元
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
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
      <button onClick={() => setIsOpen(true)}>
        モーダルを開く
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="確認"
        footer={
          <>
            <button
              className="button button-secondary"
              onClick={() => setIsOpen(false)}
            >
              キャンセル
            </button>
            <button
              className="button button-primary"
              onClick={() => {
                // アクション実行
                setIsOpen(false);
              }}
            >
              確認
            </button>
          </>
        }
      >
        <p>この操作を実行してもよろしいですか?</p>
      </Modal>
    </>
  );
}
```

---

## アクセシビリティ

### ARIA属性

- `role="dialog"`: モーダルにダイアログの役割を設定
- `aria-modal="true"`: モーダルダイアログであることを明示
- `aria-labelledby`: タイトルとモーダルを関連付け
- `aria-describedby`: 説明文とモーダルを関連付け
- `aria-hidden`: オーバーレイの表示/非表示状態を管理

### キーボード操作

実装すべきキーボードショートカット:

- **Esc**: モーダルを閉じる
- **Tab**: モーダル内の要素間を移動（フォーカストラップ）
- **Shift + Tab**: モーダル内の要素間を逆順で移動

### フォーカス管理

```javascript
// フォーカストラップの実装例
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), ' +
    'input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });
}
```

### スクリーンリーダー対応

1. **適切なARIA属性の設定**
   - すべてのインタラクティブ要素にラベルを設定
   - モーダルの目的を明確に説明

2. **フォーカス管理**
   - モーダルを開いたときにフォーカスを移動
   - モーダルを閉じたときに元の位置にフォーカスを復元

3. **背景コンテンツの無効化**
   - `aria-hidden="true"`で背景を非表示に
   - スクリーンリーダーがモーダル外の要素を読み上げないようにする

---

## ベストプラクティス

### モーダルの使用

1. **使いすぎに注意**
   - モーダルは控えめに使用
   - 重要な情報や必須のアクションのみに使用
   - インラインフォームやトーストで代替できないか検討

2. **サイズ調整**
   - コンテンツに応じて適切なサイズを選択
   - モバイルでは画面の90%を超えないように
   - 長いコンテンツの場合はスクロール可能に

3. **閉じる方法**
   - 複数の閉じる方法を提供（×ボタン、Escキー、背景クリック）
   - キャンセルボタンを明確に配置

### パフォーマンス

1. **レンダリングの最適化**
   - モーダルをReact Portalで描画
   - 不要な再レンダリングを防ぐ

```tsx
// Portal経由でbody直下に描画
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>,
    document.body
  );
}
```

2. **アニメーション**
   - CSS transitionsを使用
   - JavaScriptアニメーションは避ける

3. **遅延読み込み**
   - 大きなコンテンツは遅延読み込み
   - 画像は必要になってから読み込む

### UXの向上

1. **適切なタイミング**
   - ページ読み込み直後のモーダルは避ける
   - ユーザーのアクションに応じて表示

2. **明確なアクション**
   - プライマリアクションとセカンダリアクションを明確に区別
   - 破壊的アクションは視覚的に強調

3. **状態の保持**
   - フォーム入力中にモーダルを閉じる場合は警告
   - 必要に応じて下書き保存機能を提供

---

## サイズバリアント

モーダルのサイズは、コンテンツに応じてカスタマイズできます:

### Small (小)

```css
.modal-small {
  max-width: 400px;
}
```

**使用場面:**
- シンプルな確認ダイアログ
- 短いフォーム

### Medium (中) - デフォルト

```css
.modal-medium {
  max-width: 500px;
}
```

**使用場面:**
- 標準的なフォーム
- 一般的な情報表示

### Large (大)

```css
.modal-large {
  max-width: 800px;
}
```

**使用場面:**
- 複雑なフォーム
- 詳細な情報表示
- 画像ギャラリー

### Full Screen (全画面)

```css
.modal-fullscreen {
  max-width: none;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  border-radius: 0;
}
```

**使用場面:**
- 複雑なウィザード
- エディター
- モバイルデバイス

---

## 関連コンポーネント

- **Dialog**: 確認や警告のための特化したダイアログ
- **Drawer**: サイドから出現するパネル
- **Popover**: 小さな情報表示
- **Tooltip**: 短い説明表示

---

## トラブルシューティング

### 背景がスクロールしてしまう

モーダルを開いたときに`body`のスクロールを無効化:

```javascript
// モーダルを開く
document.body.style.overflow = 'hidden';

// モーダルを閉じる
document.body.style.overflow = '';
```

### フォーカスがモーダル外に移動してしまう

フォーカストラップを実装し、Tabキーでのナビゲーションをモーダル内に制限:

```javascript
// 上記の「フォーカス管理」セクションを参照
```

### モーダルが画面外にはみ出る

最大高さと最大幅を設定し、スクロール可能にする:

```css
.modal {
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}
```

---

**最終更新:** 2025-12-11
**Phase 4 Option D で実装**
