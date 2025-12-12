# Menu (メニュー) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/components/navigation/menu.yaml`
**ステータス:** ✅ 実装済み (Phase 4 Option C)

---

## 概要

メニューコンポーネントは、ドロップダウンメニューやコンテキストメニューとして使用される、アクションやオプションのリストを表示するナビゲーション要素です。グループヘッダー、ショートカットキー表示、チェックマーク、危険なアクションなど、豊富な機能をサポートしています。

### 用途

- ドロップダウンメニュー（ヘッダーナビゲーション）
- コンテキストメニュー（右クリックメニュー）
- アクションメニュー（ケバブメニュー）
- セレクトメニュー（選択肢の表示）

---

## サイズバリアント

### Compact (コンパクト)

密度の高いメニュー。多くのアイテムを表示する場合に適しています。

- フォントサイズ: 0.75rem (12px)
- パディング: 垂直 0.25rem / 水平 0.5rem
- 最小高さ: 32px

### Default (デフォルト)

標準的なサイズ。多くの場面で使用されます。

- フォントサイズ: 0.875rem (14px)
- パディング: 垂直 0.5rem / 水平 0.75rem
- 最小高さ: 40px

### Comfortable (ゆったり)

ゆとりのあるサイズ。タッチデバイスに適しています。

- フォントサイズ: 1rem (16px)
- パディング: 垂直 0.75rem / 水平 1rem
- 最小高さ: 48px

---

## トークン一覧

### コンテナ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.container.background` | `{background.primary}` | メニューの背景色 |
| `component.menu.container.border.width` | `{border.width.1}` | コンテナのボーダー幅 |
| `component.menu.container.border.color` | `{border.default}` | コンテナのボーダー色 |
| `component.menu.container.border.radius` | `{border.radius.md}` | コンテナの角丸 |
| `component.menu.container.shadow` | `{shadow.lg}` | コンテナのシャドウ |
| `component.menu.container.padding.vertical` | `{spacing.2}` | 垂直パディング (0.5rem) |
| `component.menu.container.padding.horizontal` | `{spacing.0}` | 水平パディング |
| `component.menu.container.minWidth` | `{spacing.48}` | 最小幅 (12rem/192px) |
| `component.menu.container.maxHeight` | `400px` | 最大高さ |
| `component.menu.container.overflow` | `auto` | オーバーフロー時の挙動 |
| `component.menu.zIndex` | `1000` | z-index（重なり順） |

### メニューアイテム

#### パディング

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.item.padding.vertical` | `{spacing.2}` | 垂直パディング (0.5rem) |
| `component.menu.item.padding.horizontal` | `{spacing.3}` | 水平パディング (0.75rem) |

#### タイポグラフィ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.item.fontSize` | `{font.size.sm}` | フォントサイズ (0.875rem) |
| `component.menu.item.fontWeight` | `{font.weight.normal}` | フォントウェイト |
| `component.menu.item.lineHeight` | `{font.lineHeight.normal}` | 行高 |

#### 背景色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.item.background.default` | `transparent` | デフォルトの背景色 |
| `component.menu.item.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.menu.item.background.active` | `{primary.subtle}` | アクティブ時の背景色 |
| `component.menu.item.background.focus` | `{background.secondary}` | フォーカス時の背景色 |
| `component.menu.item.background.disabled` | `transparent` | 無効状態の背景色 |

#### テキスト色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.item.text.default` | `{foreground.primary}` | デフォルトのテキスト色 |
| `component.menu.item.text.hover` | `{foreground.primary}` | ホバー時のテキスト色 |
| `component.menu.item.text.active` | `{primary.active}` | アクティブ時のテキスト色 |
| `component.menu.item.text.disabled` | `{foreground.tertiary}` | 無効状態のテキスト色 |

#### 高さ・カーソル

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.item.minHeight.default` | `{spacing.10}` | デフォルトの最小高さ (2.5rem) |
| `component.menu.item.minHeight.compact` | `{spacing.8}` | コンパクトの最小高さ (2rem) |
| `component.menu.item.minHeight.comfortable` | `{spacing.12}` | ゆったりの最小高さ (3rem) |
| `component.menu.item.cursor.default` | `pointer` | デフォルトのカーソル |
| `component.menu.item.cursor.disabled` | `not-allowed` | 無効状態のカーソル |

### アイコン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.icon.size` | `{spacing.4}` | アイコンのサイズ (1rem) |
| `component.menu.icon.gap` | `{spacing.3}` | アイコンとテキストの間隔 |
| `component.menu.icon.color.default` | `{foreground.secondary}` | デフォルトのアイコン色 |
| `component.menu.icon.color.hover` | `{foreground.primary}` | ホバー時のアイコン色 |
| `component.menu.icon.color.active` | `{primary.default}` | アクティブ時のアイコン色 |

### チェックマーク

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.check.size` | `{spacing.4}` | チェックマークのサイズ (1rem) |
| `component.menu.check.color` | `{primary.default}` | チェックマークの色 |
| `component.menu.check.marginRight` | `{spacing.3}` | 右マージン (0.75rem) |

### ショートカットキー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.shortcut.fontSize` | `{font.size.xs}` | フォントサイズ (0.75rem) |
| `component.menu.shortcut.color` | `{foreground.tertiary}` | テキスト色 |
| `component.menu.shortcut.marginLeft` | `{spacing.4}` | 左マージン (1rem) |
| `component.menu.shortcut.padding` | `{spacing.1} {spacing.2}` | パディング |
| `component.menu.shortcut.background` | `{background.secondary}` | 背景色 |
| `component.menu.shortcut.borderRadius` | `{border.radius.sm}` | 角丸 |

### サブメニュー矢印

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.arrow.size` | `{spacing.4}` | 矢印のサイズ (1rem) |
| `component.menu.arrow.color` | `{foreground.tertiary}` | 矢印の色 |
| `component.menu.arrow.marginLeft` | `auto` | 左マージン（右寄せ） |

### 区切り線

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.divider.height` | `1px` | 区切り線の高さ |
| `component.menu.divider.background` | `{border.default}` | 区切り線の背景色 |
| `component.menu.divider.margin.vertical` | `{spacing.2}` | 垂直マージン (0.5rem) |
| `component.menu.divider.margin.horizontal` | `{spacing.0}` | 水平マージン |

### グループヘッダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.group.header.padding.vertical` | `{spacing.2}` | 垂直パディング (0.5rem) |
| `component.menu.group.header.padding.horizontal` | `{spacing.3}` | 水平パディング (0.75rem) |
| `component.menu.group.header.fontSize` | `{font.size.xs}` | フォントサイズ (0.75rem) |
| `component.menu.group.header.fontWeight` | `{font.weight.semibold}` | フォントウェイト |
| `component.menu.group.header.color` | `{foreground.tertiary}` | テキスト色 |
| `component.menu.group.header.textTransform` | `uppercase` | テキスト変換 |
| `component.menu.group.header.letterSpacing` | `0.05em` | 字間 |

### 危険なアクション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.danger.text.default` | `{error.default}` | デフォルトのテキスト色 |
| `component.menu.danger.text.hover` | `{foreground.inverse}` | ホバー時のテキスト色 |
| `component.menu.danger.background.hover` | `{error.default}` | ホバー時の背景色 |
| `component.menu.danger.icon.color` | `{error.default}` | アイコンの色 |

### アニメーション

#### 表示時

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.animation.enter.duration` | `{animation.duration.fast}` | 表示アニメーションの持続時間 |
| `component.menu.animation.enter.timing` | `{animation.easing.easeOut}` | イージング |
| `component.menu.animation.enter.opacity.from` | `0` | 開始時の透明度 |
| `component.menu.animation.enter.opacity.to` | `1` | 終了時の透明度 |
| `component.menu.animation.enter.transform.from` | `translateY(-8px)` | 開始時の位置 |
| `component.menu.animation.enter.transform.to` | `translateY(0)` | 終了時の位置 |

#### 非表示時

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.animation.exit.duration` | `{animation.duration.fast}` | 非表示アニメーションの持続時間 |
| `component.menu.animation.exit.timing` | `{animation.easing.easeIn}` | イージング |
| `component.menu.animation.exit.opacity.from` | `1` | 開始時の透明度 |
| `component.menu.animation.exit.opacity.to` | `0` | 終了時の透明度 |

### トランジション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.menu.transition.duration` | `{animation.duration.fast}` | トランジションの持続時間 |
| `component.menu.transition.timing` | `{animation.easing.ease}` | トランジションのイージング |
| `component.menu.transition.properties` | `background-color, color` | トランジション対象 |

---

## 使用例

### HTML

```html
<!-- 基本的なメニュー -->
<div class="menu">
  <button class="menu-item">
    <span class="menu-icon">👤</span>
    <span>プロフィール</span>
  </button>
  <button class="menu-item">
    <span class="menu-icon">⚙️</span>
    <span>設定</span>
  </button>
  <div class="menu-divider"></div>
  <button class="menu-item menu-item-danger">
    <span class="menu-icon">🚪</span>
    <span>ログアウト</span>
  </button>
</div>

<!-- グループ化されたメニュー -->
<div class="menu">
  <div class="menu-group-header">アカウント</div>
  <button class="menu-item">
    <span class="menu-icon">👤</span>
    <span>プロフィール</span>
    <span class="menu-shortcut">⌘P</span>
  </button>
  <button class="menu-item">
    <span class="menu-icon">⚙️</span>
    <span>設定</span>
    <span class="menu-shortcut">⌘S</span>
  </button>

  <div class="menu-divider"></div>

  <div class="menu-group-header">アクション</div>
  <button class="menu-item menu-item-active">
    <span class="menu-check">✓</span>
    <span>選択済み項目</span>
  </button>
  <button class="menu-item">
    <span class="menu-icon">📄</span>
    <span>新規作成</span>
    <span class="menu-arrow">›</span>
  </button>
  <button class="menu-item" disabled>
    <span class="menu-icon">🔒</span>
    <span>無効な項目</span>
  </button>

  <div class="menu-divider"></div>

  <button class="menu-item menu-item-danger">
    <span class="menu-icon">🗑️</span>
    <span>削除</span>
  </button>
</div>
```

### CSS

```css
.menu {
  min-width: var(--component-menu-container-min-width);
  max-height: var(--component-menu-container-max-height);
  padding: var(--component-menu-container-padding-vertical)
           var(--component-menu-container-padding-horizontal);
  background: var(--component-menu-container-background);
  border: var(--component-menu-container-border-width) solid;
  border-color: var(--component-menu-container-border-color);
  border-radius: var(--component-menu-container-border-radius);
  box-shadow: var(--component-menu-container-shadow);
  overflow: var(--component-menu-container-overflow);
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--component-menu-item-min-height-default);
  padding: var(--component-menu-item-padding-vertical)
           var(--component-menu-item-padding-horizontal);
  font-size: var(--component-menu-item-font-size);
  color: var(--component-menu-item-text-default);
  background: var(--component-menu-item-background-default);
  border: none;
  text-align: left;
  cursor: var(--component-menu-item-cursor-default);
  transition: var(--component-menu-transition-properties)
              var(--component-menu-transition-duration)
              var(--component-menu-transition-timing);
}

.menu-item:hover:not(:disabled) {
  color: var(--component-menu-item-text-hover);
  background: var(--component-menu-item-background-hover);
}

.menu-item-danger {
  color: var(--component-menu-danger-text-default);
}

.menu-item-danger:hover:not(:disabled) {
  color: var(--component-menu-danger-text-hover);
  background: var(--component-menu-danger-background-hover);
}
```

### React

```tsx
interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  checked?: boolean;
  divider?: boolean;
  header?: string;
}

function Menu({ items, isOpen, onClose }: {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="menu" ref={menuRef}>
      {items.map((item, index) => {
        if (item.divider) {
          return <div key={index} className="menu-divider" />;
        }

        if (item.header) {
          return (
            <div key={index} className="menu-group-header">
              {item.header}
            </div>
          );
        }

        return (
          <button
            key={index}
            className={`menu-item ${item.danger ? 'menu-item-danger' : ''} ${
              item.checked ? 'menu-item-active' : ''
            }`}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item.checked && <span className="menu-check">✓</span>}
            {item.icon && <span className="menu-icon">{item.icon}</span>}
            <span>{item.label}</span>
            {item.shortcut && (
              <span className="menu-shortcut">{item.shortcut}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// 使用例
<Menu
  isOpen={isMenuOpen}
  onClose={() => setIsMenuOpen(false)}
  items={[
    { header: 'アカウント' },
    { label: 'プロフィール', icon: '👤', shortcut: '⌘P' },
    { label: '設定', icon: '⚙️', shortcut: '⌘S' },
    { divider: true },
    { label: '選択済み', checked: true },
    { divider: true },
    { label: '削除', icon: '🗑️', danger: true }
  ]}
/>
```

---

## アクセシビリティ

### ARIA属性

- `role="menu"`: メニューコンテナに設定
- `role="menuitem"`: 各メニューアイテムに設定
- `role="separator"`: 区切り線に設定
- `aria-disabled="true"`: 無効なアイテムに設定
- `aria-checked`: チェックボックス型アイテムに設定

### キーボードナビゲーション

実装すべきキーボードショートカット：

- **↑/↓ (矢印キー)**: アイテム間を移動
- **Enter/Space**: アイテムを選択
- **Esc**: メニューを閉じる
- **Home**: 最初のアイテムに移動
- **End**: 最後のアイテムに移動
- **Tab**: メニューを閉じてフォーカス移動

```javascript
// キーボードナビゲーションの実装
const menuItems = menu.querySelectorAll('[role="menuitem"]:not([disabled])');
let currentIndex = 0;

menu.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowDown':
      currentIndex = (currentIndex + 1) % menuItems.length;
      menuItems[currentIndex].focus();
      e.preventDefault();
      break;

    case 'ArrowUp':
      currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      menuItems[currentIndex].focus();
      e.preventDefault();
      break;

    case 'Home':
      currentIndex = 0;
      menuItems[0].focus();
      e.preventDefault();
      break;

    case 'End':
      currentIndex = menuItems.length - 1;
      menuItems[currentIndex].focus();
      e.preventDefault();
      break;

    case 'Escape':
      closeMenu();
      returnFocusToTrigger();
      break;
  }
});
```

### フォーカス管理

```javascript
function openMenu(triggerElement) {
  menu.style.display = 'block';

  // 最初のアイテムにフォーカス
  const firstItem = menu.querySelector('[role="menuitem"]:not([disabled])');
  firstItem?.focus();

  // トリガー要素を記憶（閉じる時に戻す）
  menu.dataset.trigger = triggerElement.id;
}

function closeMenu() {
  menu.style.display = 'none';

  // トリガー要素にフォーカスを戻す
  const triggerId = menu.dataset.trigger;
  document.getElementById(triggerId)?.focus();
}
```

---

## ベストプラクティス

### メニューの配置

1. **ドロップダウン位置の計算**

```javascript
function positionMenu(trigger, menu) {
  const triggerRect = trigger.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  // デフォルトは下に表示
  let top = triggerRect.bottom + 4;
  let left = triggerRect.left;

  // 画面下部に収まらない場合は上に表示
  if (top + menuRect.height > viewport.height) {
    top = triggerRect.top - menuRect.height - 4;
  }

  // 画面右端に収まらない場合は左寄せ
  if (left + menuRect.width > viewport.width) {
    left = viewport.width - menuRect.width - 16;
  }

  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
}
```

2. **コンテキストメニュー（右クリック）**

```javascript
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  // メニューを表示
  menu.style.display = 'block';
  menu.style.top = `${e.pageY}px`;
  menu.style.left = `${e.pageX}px`;

  // 画面外に出ないように調整
  positionMenu(null, menu);
});
```

### グループ化

論理的にアイテムをグループ化：

1. **関連するアクション**を同じグループに
2. **破壊的なアクション**は独立したグループに
3. グループ間に**区切り線**を配置

```javascript
const menuStructure = [
  {
    header: '編集',
    items: [
      { label: 'コピー', shortcut: '⌘C' },
      { label: '貼り付け', shortcut: '⌘V' }
    ]
  },
  { divider: true },
  {
    header: '危険な操作',
    items: [
      { label: '削除', danger: true, shortcut: '⌘D' }
    ]
  }
];
```

### ショートカットキー

1. **プラットフォーム対応**

```javascript
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const modifierKey = isMac ? '⌘' : 'Ctrl+';

const shortcuts = {
  copy: `${modifierKey}C`,
  paste: `${modifierKey}V`,
  delete: `${modifierKey}D`
};
```

2. **ショートカットの実装**

```javascript
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const modifier = e.metaKey || e.ctrlKey;

  if (modifier && key === 'c') {
    handleCopy();
    e.preventDefault();
  }
});
```

---

## パフォーマンス最適化

### 仮想スクロール

多数のアイテム（100+）がある場合：

```javascript
import { VirtualList } from 'virtual-list-library';

<VirtualList
  height={400}
  itemCount={items.length}
  itemSize={40}
  renderItem={({ index, style }) => (
    <button className="menu-item" style={style}>
      {items[index].label}
    </button>
  )}
/>
```

### 遅延読み込み

```javascript
function LazyMenu({ onOpen }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (onOpen) {
      fetchMenuItems().then(setItems);
    }
  }, [onOpen]);

  return <Menu items={items} />;
}
```

---

## 関連コンポーネント

- **Tabs**: タブナビゲーション
- **Navigation**: ナビゲーションバー
- **Select**: セレクトボックス（フォーム要素）

---

## よくあるパターン

### ケバブメニュー（3点メニュー）

```html
<button class="menu-trigger" aria-label="その他のオプション">
  ⋮
</button>
```

### ユーザーメニュー

```
👤 John Doe
├── プロフィール
├── 設定
├── ヘルプ
└── ログアウト (danger)
```

### エディットメニュー

```
編集
├── 元に戻す (⌘Z)
├── やり直す (⌘⇧Z)
---
├── カット (⌘X)
├── コピー (⌘C)
└── 貼り付け (⌘V)
```

---

**最終更新:** 2025-12-10
**Phase 4 Option C で実装**
