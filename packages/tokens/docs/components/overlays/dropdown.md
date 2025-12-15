# Dropdown (ドロップダウン) コンポーネント

**カテゴリ:** Overlays
**ファイル:** `src/components/overlays/dropdown.yaml`
**ステータス:** ⏸️ CSS実装未完了（Phase 4 - YAML定義のみ）

---

## 概要

ドロップダウンコンポーネントは、選択可能なオプションリストを表示するUIです。シンプルな選択から、検索機能付き、グループ化、アイコン表示まで、様々な形式に対応しています。

### 用途

- 選択肢からの項目選択
- メニューオプションの表示
- アクションリスト
- フィルター選択
- 設定オプション
- コマンドパレット

### 特徴

- 選択可能なオプションリスト
- 検索機能（オプション）
- グループ化対応
- アイコン表示対応
- キーボードナビゲーション
- チェックマークで選択状態を表示

---

## トークン一覧

### コンテナ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.container.background` | `{background.primary}` | ドロップダウンコンテナの背景色 |
| `component.dropdown.container.border.width` | `{border.width.1}` | コンテナのボーダー幅 (1px) |
| `component.dropdown.container.border.color` | `{border.default}` | コンテナのボーダー色 |
| `component.dropdown.container.border.radius` | `{border.radius.md}` | コンテナの角丸 (6px) |
| `component.dropdown.container.shadow` | `{shadow.lg}` | コンテナのシャドウ |
| `component.dropdown.container.padding.vertical` | `{spacing.1}` | コンテナの垂直パディング (4px) |
| `component.dropdown.container.padding.horizontal` | `{spacing.0}` | コンテナの水平パディング (0) |
| `component.dropdown.container.minWidth` | `160px` | コンテナの最小幅 |
| `component.dropdown.container.maxWidth` | `320px` | コンテナの最大幅 |
| `component.dropdown.container.maxHeight` | `320px` | コンテナの最大高さ |
| `component.dropdown.container.overflow` | `auto` | オーバーフロー時スクロール |

### Z-index

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.zIndex` | `1100` | ドロップダウンのz-index |

### オプションアイテム

#### パディング

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.item.padding.vertical` | `{spacing.2}` | アイテムの垂直パディング (8px) |
| `component.dropdown.item.padding.horizontal` | `{spacing.3}` | アイテムの水平パディング (12px) |

#### サイズバリアント

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.item.minHeight.small` | `{spacing.8}` | 小サイズ最小高さ (32px) |
| `component.dropdown.item.minHeight.default` | `{spacing.10}` | デフォルト最小高さ (40px) |
| `component.dropdown.item.minHeight.large` | `{spacing.12}` | 大サイズ最小高さ (48px) |

#### タイポグラフィ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.item.fontSize` | `{font.size.sm}` | アイテムのフォントサイズ (14px) |
| `component.dropdown.item.fontWeight.default` | `{font.weight.normal}` | デフォルトフォントウェイト (400) |
| `component.dropdown.item.fontWeight.selected` | `{font.weight.medium}` | 選択時フォントウェイト (500) |
| `component.dropdown.item.lineHeight` | `{font.lineHeight.normal}` | 行高 |

#### 色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.item.background.default` | `transparent` | デフォルト背景 - 透明 |
| `component.dropdown.item.background.hover` | `{background.secondary}` | ホバー時背景 |
| `component.dropdown.item.background.selected` | `{primary.subtle}` | 選択時背景 - プライマリ淡色 |
| `component.dropdown.item.background.active` | `{background.tertiary}` | アクティブ時背景 |
| `component.dropdown.item.background.disabled` | `transparent` | 無効時背景 - 透明 |
| `component.dropdown.item.text.default` | `{foreground.primary}` | デフォルトテキスト色 |
| `component.dropdown.item.text.hover` | `{foreground.primary}` | ホバー時テキスト色 |
| `component.dropdown.item.text.selected` | `{primary.default}` | 選択時テキスト色 - プライマリ |
| `component.dropdown.item.text.disabled` | `{foreground.tertiary}` | 無効時テキスト色 |

#### カーソル

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.item.cursor.default` | `pointer` | デフォルトカーソル |
| `component.dropdown.item.cursor.disabled` | `not-allowed` | 無効時カーソル |

### チェックマーク（選択インジケーター）

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.checkmark.size` | `{spacing.4}` | チェックマークサイズ (16px) |
| `component.dropdown.checkmark.color` | `{primary.default}` | チェックマーク色 - プライマリ |
| `component.dropdown.checkmark.marginRight` | `{spacing.2}` | 右マージン (8px) |

### アイコン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.icon.size` | `{spacing.4}` | アイコンサイズ (16px) |
| `component.dropdown.icon.color.default` | `{foreground.secondary}` | デフォルトアイコン色 |
| `component.dropdown.icon.color.hover` | `{foreground.primary}` | ホバー時アイコン色 |
| `component.dropdown.icon.color.disabled` | `{foreground.tertiary}` | 無効時アイコン色 |
| `component.dropdown.icon.marginRight` | `{spacing.2}` | 右マージン (8px) |

### ディバイダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.divider.height` | `{border.width.1}` | ディバイダー高さ (1px) |
| `component.dropdown.divider.background` | `{border.default}` | ディバイダー背景色 |
| `component.dropdown.divider.margin.vertical` | `{spacing.1}` | 垂直マージン (4px) |
| `component.dropdown.divider.margin.horizontal` | `{spacing.0}` | 水平マージン (0) |

### グループヘッダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.groupHeader.padding.vertical` | `{spacing.1}` | 垂直パディング (4px) |
| `component.dropdown.groupHeader.padding.horizontal` | `{spacing.3}` | 水平パディング (12px) |
| `component.dropdown.groupHeader.fontSize` | `{font.size.xs}` | フォントサイズ (12px) |
| `component.dropdown.groupHeader.fontWeight` | `{font.weight.semibold}` | フォントウェイト (600) |
| `component.dropdown.groupHeader.textTransform` | `uppercase` | 大文字変換 |
| `component.dropdown.groupHeader.letterSpacing` | `0.05em` | 文字間隔 |
| `component.dropdown.groupHeader.color` | `{foreground.tertiary}` | テキスト色 |
| `component.dropdown.groupHeader.marginTop` | `{spacing.2}` | 上マージン (8px) |

### 検索入力

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.search.padding` | `{spacing.2}` | 検索入力パディング (8px) |
| `component.dropdown.search.border.bottom` | `1px solid {border.default}` | 下ボーダー |
| `component.dropdown.search.background` | `{background.primary}` | 検索入力背景 |
| `component.dropdown.search.input.fontSize` | `{font.size.sm}` | 入力文字サイズ (14px) |
| `component.dropdown.search.input.padding` | `{spacing.2} {spacing.3}` | 入力パディング |
| `component.dropdown.search.input.border.radius` | `{border.radius.sm}` | 入力角丸 (4px) |
| `component.dropdown.search.input.background` | `{background.secondary}` | 入力背景 |

### 空状態（No results）

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.empty.padding.vertical` | `{spacing.6}` | 垂直パディング (24px) |
| `component.dropdown.empty.padding.horizontal` | `{spacing.4}` | 水平パディング (16px) |
| `component.dropdown.empty.fontSize` | `{font.size.sm}` | フォントサイズ (14px) |
| `component.dropdown.empty.color` | `{foreground.tertiary}` | テキスト色 |
| `component.dropdown.empty.textAlign` | `center` | 中央揃え |

### アニメーション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.animation.duration` | `{animation.duration.fast}` | アニメーション時間 (0.15s) |
| `component.dropdown.animation.timing` | `{animation.easing.easeOut}` | イージング |
| `component.dropdown.animation.enter` | `transform: translateY(-8px); opacity: 0` | 出現アニメーション開始状態 |
| `component.dropdown.animation.exit` | `transform: translateY(-8px); opacity: 0` | 退出アニメーション終了状態 |

### トランジション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.transition.duration` | `{animation.duration.fast}` | トランジション時間 (0.15s) |
| `component.dropdown.transition.timing` | `{animation.easing.ease}` | イージング |
| `component.dropdown.transition.properties` | `background-color, color, opacity, transform` | トランジション対象 |

### オフセット

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.dropdown.offset` | `{spacing.1}` | トリガー要素からのオフセット (4px) |

---

## 使用例

### HTML

```html
<!-- 基本的なドロップダウン -->
<div class="dropdown">
  <button
    class="dropdown-trigger"
    aria-haspopup="listbox"
    aria-expanded="false"
  >
    選択してください
    <span class="dropdown-arrow">▼</span>
  </button>

  <div class="dropdown-menu" role="listbox" hidden>
    <button class="dropdown-item" role="option" aria-selected="false">
      オプション 1
    </button>
    <button class="dropdown-item" role="option" aria-selected="false">
      オプション 2
    </button>
    <button class="dropdown-item" role="option" aria-selected="false">
      オプション 3
    </button>
  </div>
</div>

<!-- アイコン付きドロップダウン -->
<div class="dropdown">
  <button class="dropdown-trigger">アクション</button>

  <div class="dropdown-menu" role="menu">
    <button class="dropdown-item" role="menuitem">
      <span class="dropdown-icon">✏️</span>
      編集
    </button>
    <button class="dropdown-item" role="menuitem">
      <span class="dropdown-icon">📋</span>
      複製
    </button>
    <button class="dropdown-item" role="menuitem">
      <span class="dropdown-icon">📤</span>
      共有
    </button>
    <hr class="dropdown-divider" />
    <button class="dropdown-item danger" role="menuitem">
      <span class="dropdown-icon">🗑️</span>
      削除
    </button>
  </div>
</div>

<!-- 選択状態付きドロップダウン -->
<div class="dropdown">
  <button class="dropdown-trigger">並び順</button>

  <div class="dropdown-menu" role="listbox">
    <button class="dropdown-item selected" role="option" aria-selected="true">
      <span class="dropdown-checkmark">✓</span>
      名前順
    </button>
    <button class="dropdown-item" role="option" aria-selected="false">
      日付順
    </button>
    <button class="dropdown-item" role="option" aria-selected="false">
      サイズ順
    </button>
  </div>
</div>

<!-- グループ化ドロップダウン -->
<div class="dropdown">
  <button class="dropdown-trigger">カテゴリ選択</button>

  <div class="dropdown-menu" role="listbox">
    <div class="dropdown-group-header">最近使用</div>
    <button class="dropdown-item" role="option">プロジェクトA</button>
    <button class="dropdown-item" role="option">プロジェクトB</button>

    <hr class="dropdown-divider" />

    <div class="dropdown-group-header">すべて</div>
    <button class="dropdown-item" role="option">プロジェクトC</button>
    <button class="dropdown-item" role="option">プロジェクトD</button>
    <button class="dropdown-item" role="option">プロジェクトE</button>
  </div>
</div>

<!-- 検索機能付きドロップダウン -->
<div class="dropdown">
  <button class="dropdown-trigger">国を選択</button>

  <div class="dropdown-menu dropdown-searchable" role="listbox">
    <div class="dropdown-search">
      <input
        type="text"
        class="dropdown-search-input"
        placeholder="検索..."
        aria-label="国を検索"
      />
    </div>

    <button class="dropdown-item" role="option">日本</button>
    <button class="dropdown-item" role="option">アメリカ</button>
    <button class="dropdown-item" role="option">イギリス</button>
    <button class="dropdown-item" role="option">フランス</button>
    <button class="dropdown-item" role="option">ドイツ</button>

    <div class="dropdown-empty" hidden>
      検索結果が見つかりません
    </div>
  </div>
</div>
```

### CSS

```css
/* ドロップダウンコンテナ */
.dropdown {
  position: relative;
  display: inline-block;
}

/* ドロップダウンメニュー */
.dropdown-menu {
  position: absolute;
  top: calc(100% + var(--component-dropdown-offset));
  left: 0;
  z-index: var(--component-dropdown-z-index);
  min-width: var(--component-dropdown-container-min-width);
  max-width: var(--component-dropdown-container-max-width);
  max-height: var(--component-dropdown-container-max-height);
  padding: var(--component-dropdown-container-padding-vertical)
           var(--component-dropdown-container-padding-horizontal);
  background-color: var(--component-dropdown-container-background);
  border: var(--component-dropdown-container-border-width) solid
          var(--component-dropdown-container-border-color);
  border-radius: var(--component-dropdown-container-border-radius);
  box-shadow: var(--component-dropdown-container-shadow);
  overflow: var(--component-dropdown-container-overflow);
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity var(--component-dropdown-animation-duration)
              var(--component-dropdown-animation-timing),
              transform var(--component-dropdown-animation-duration)
              var(--component-dropdown-animation-timing);
  pointer-events: none;
}

.dropdown-menu[hidden] {
  display: none;
}

.dropdown-menu.is-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* ドロップダウンアイテム */
.dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--component-dropdown-item-min-height-default);
  padding: var(--component-dropdown-item-padding-vertical)
           var(--component-dropdown-item-padding-horizontal);
  background: var(--component-dropdown-item-background-default);
  border: none;
  color: var(--component-dropdown-item-text-default);
  font-size: var(--component-dropdown-item-font-size);
  font-weight: var(--component-dropdown-item-font-weight-default);
  line-height: var(--component-dropdown-item-line-height);
  text-align: left;
  cursor: var(--component-dropdown-item-cursor-default);
  transition: var(--component-dropdown-transition-properties)
              var(--component-dropdown-transition-duration)
              var(--component-dropdown-transition-timing);
}

.dropdown-item:hover {
  background: var(--component-dropdown-item-background-hover);
  color: var(--component-dropdown-item-text-hover);
}

.dropdown-item:active {
  background: var(--component-dropdown-item-background-active);
}

.dropdown-item.selected {
  background: var(--component-dropdown-item-background-selected);
  color: var(--component-dropdown-item-text-selected);
  font-weight: var(--component-dropdown-item-font-weight-selected);
}

.dropdown-item:disabled,
.dropdown-item.disabled {
  background: var(--component-dropdown-item-background-disabled);
  color: var(--component-dropdown-item-text-disabled);
  cursor: var(--component-dropdown-item-cursor-disabled);
}

/* チェックマーク */
.dropdown-checkmark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--component-dropdown-checkmark-size);
  height: var(--component-dropdown-checkmark-size);
  margin-right: var(--component-dropdown-checkmark-margin-right);
  color: var(--component-dropdown-checkmark-color);
}

.dropdown-item:not(.selected) .dropdown-checkmark {
  opacity: 0;
}

/* アイコン */
.dropdown-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--component-dropdown-icon-size);
  height: var(--component-dropdown-icon-size);
  margin-right: var(--component-dropdown-icon-margin-right);
  color: var(--component-dropdown-icon-color-default);
}

.dropdown-item:hover .dropdown-icon {
  color: var(--component-dropdown-icon-color-hover);
}

.dropdown-item:disabled .dropdown-icon,
.dropdown-item.disabled .dropdown-icon {
  color: var(--component-dropdown-icon-color-disabled);
}

/* ディバイダー */
.dropdown-divider {
  height: var(--component-dropdown-divider-height);
  margin: var(--component-dropdown-divider-margin-vertical)
          var(--component-dropdown-divider-margin-horizontal);
  background: var(--component-dropdown-divider-background);
  border: none;
}

/* グループヘッダー */
.dropdown-group-header {
  padding: var(--component-dropdown-group-header-padding-vertical)
           var(--component-dropdown-group-header-padding-horizontal);
  margin-top: var(--component-dropdown-group-header-margin-top);
  font-size: var(--component-dropdown-group-header-font-size);
  font-weight: var(--component-dropdown-group-header-font-weight);
  text-transform: var(--component-dropdown-group-header-text-transform);
  letter-spacing: var(--component-dropdown-group-header-letter-spacing);
  color: var(--component-dropdown-group-header-color);
}

.dropdown-group-header:first-child {
  margin-top: 0;
}

/* 検索 */
.dropdown-search {
  padding: var(--component-dropdown-search-padding);
  border-bottom: var(--component-dropdown-search-border-bottom);
  background: var(--component-dropdown-search-background);
}

.dropdown-search-input {
  width: 100%;
  padding: var(--component-dropdown-search-input-padding);
  background: var(--component-dropdown-search-input-background);
  border: none;
  border-radius: var(--component-dropdown-search-input-border-radius);
  font-size: var(--component-dropdown-search-input-font-size);
  outline: none;
}

.dropdown-search-input:focus {
  box-shadow: 0 0 0 2px var(--primary-default);
}

/* 空状態 */
.dropdown-empty {
  padding: var(--component-dropdown-empty-padding-vertical)
           var(--component-dropdown-empty-padding-horizontal);
  font-size: var(--component-dropdown-empty-font-size);
  color: var(--component-dropdown-empty-color);
  text-align: var(--component-dropdown-empty-text-align);
}

/* サイズバリアント */
.dropdown-item.dropdown-item-small {
  min-height: var(--component-dropdown-item-min-height-small);
}

.dropdown-item.dropdown-item-large {
  min-height: var(--component-dropdown-item-min-height-large);
}
```

### JavaScript

```javascript
class Dropdown {
  constructor(element) {
    this.dropdown = element;
    this.trigger = element.querySelector('.dropdown-trigger');
    this.menu = element.querySelector('.dropdown-menu');
    this.items = Array.from(element.querySelectorAll('.dropdown-item'));
    this.searchInput = element.querySelector('.dropdown-search-input');
    this.emptyState = element.querySelector('.dropdown-empty');
    this.isOpen = false;
    this.selectedIndex = -1;

    this.init();
  }

  init() {
    // トリガークリック
    this.trigger.addEventListener('click', () => this.toggle());

    // アイテムクリック
    this.items.forEach((item, index) => {
      item.addEventListener('click', () => this.selectItem(index));
    });

    // 外側クリック
    document.addEventListener('click', (e) => {
      if (!this.dropdown.contains(e.target) && this.isOpen) {
        this.close();
      }
    });

    // キーボードナビゲーション
    this.trigger.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.menu.addEventListener('keydown', (e) => this.handleKeydown(e));

    // 検索
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
    }
  }

  open() {
    this.isOpen = true;
    this.menu.hidden = false;
    this.trigger.setAttribute('aria-expanded', 'true');

    requestAnimationFrame(() => {
      this.menu.classList.add('is-open');
    });

    // 検索入力にフォーカス
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }

  close() {
    this.isOpen = false;
    this.menu.classList.remove('is-open');
    this.trigger.setAttribute('aria-expanded', 'false');

    setTimeout(() => {
      if (!this.isOpen) {
        this.menu.hidden = true;
      }
    }, 150);

    this.trigger.focus();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  selectItem(index) {
    // 以前の選択を解除
    this.items.forEach((item) => {
      item.classList.remove('selected');
      item.setAttribute('aria-selected', 'false');
    });

    // 新しい選択
    const item = this.items[index];
    item.classList.add('selected');
    item.setAttribute('aria-selected', 'true');
    this.selectedIndex = index;

    // トリガーのテキストを更新
    const text = item.textContent.trim();
    this.trigger.querySelector('.dropdown-label')?.textContent = text;

    this.close();
  }

  handleKeydown(e) {
    const visibleItems = this.items.filter((item) => {
      return item.offsetParent !== null && !item.disabled;
    });

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.close();
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.selectedIndex = Math.min(
            this.selectedIndex + 1,
            visibleItems.length - 1
          );
          visibleItems[this.selectedIndex]?.focus();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (this.isOpen) {
          this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
          visibleItems[this.selectedIndex]?.focus();
        }
        break;

      case 'Home':
        e.preventDefault();
        if (this.isOpen) {
          this.selectedIndex = 0;
          visibleItems[0]?.focus();
        }
        break;

      case 'End':
        e.preventDefault();
        if (this.isOpen) {
          this.selectedIndex = visibleItems.length - 1;
          visibleItems[this.selectedIndex]?.focus();
        }
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.isOpen && this.selectedIndex >= 0) {
          const index = this.items.indexOf(visibleItems[this.selectedIndex]);
          this.selectItem(index);
        } else if (!this.isOpen) {
          this.open();
        }
        break;
    }
  }

  handleSearch(e) {
    const query = e.target.value.toLowerCase();
    let visibleCount = 0;

    this.items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      const matches = text.includes(query);

      item.hidden = !matches;

      if (matches) visibleCount++;
    });

    // 空状態の表示/非表示
    if (this.emptyState) {
      this.emptyState.hidden = visibleCount > 0;
    }
  }
}

// 初期化
document.querySelectorAll('.dropdown').forEach((element) => {
  new Dropdown(element);
});
```

### React

```tsx
import { useEffect, useRef, useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  size?: 'small' | 'default' | 'large';
  grouped?: boolean;
  groups?: { [key: string]: DropdownOption[] };
}

function Dropdown({
  options,
  value,
  onChange,
  placeholder = '選択してください',
  searchable = false,
  size = 'default',
  grouped = false,
  groups,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const visibleOptions = filteredOptions.filter((opt) => !opt.disabled);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setSelectedIndex((prev) =>
            Math.min(prev + 1, visibleOptions.length - 1)
          );
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && selectedIndex >= 0) {
          onChange(visibleOptions[selectedIndex].value);
          setIsOpen(false);
          setSearchQuery('');
        } else {
          setIsOpen(!isOpen);
        }
        break;
    }
  };

  return (
    <div ref={dropdownRef} className="dropdown" onKeyDown={handleKeyDown}>
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="dropdown-label">
          {selectedOption?.label || placeholder}
        </span>
        <span className="dropdown-arrow">▼</span>
      </button>

      <div
        className={`dropdown-menu ${isOpen ? 'is-open' : ''}`}
        role="listbox"
        hidden={!isOpen}
      >
        {searchable && (
          <div className="dropdown-search">
            <input
              ref={searchInputRef}
              type="text"
              className="dropdown-search-input"
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="検索"
            />
          </div>
        )}

        {grouped && groups ? (
          Object.entries(groups).map(([groupName, groupOptions]) => (
            <div key={groupName}>
              <div className="dropdown-group-header">{groupName}</div>
              {groupOptions.map((option) => (
                <button
                  key={option.value}
                  className={`dropdown-item dropdown-item-${size} ${
                    option.value === value ? 'selected' : ''
                  }`}
                  role="option"
                  aria-selected={option.value === value}
                  disabled={option.disabled}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                >
                  {option.value === value && (
                    <span className="dropdown-checkmark">✓</span>
                  )}
                  {option.icon && (
                    <span className="dropdown-icon">{option.icon}</span>
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          ))
        ) : (
          <>
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                className={`dropdown-item dropdown-item-${size} ${
                  option.value === value ? 'selected' : ''
                }`}
                role="option"
                aria-selected={option.value === value}
                disabled={option.disabled}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
              >
                {option.value === value && (
                  <span className="dropdown-checkmark">✓</span>
                )}
                {option.icon && (
                  <span className="dropdown-icon">{option.icon}</span>
                )}
                {option.label}
              </button>
            ))}
          </>
        )}

        {searchable && filteredOptions.length === 0 && (
          <div className="dropdown-empty">検索結果が見つかりません</div>
        )}
      </div>
    </div>
  );
}

// 使用例
function App() {
  const [selected, setSelected] = useState('option1');

  const options = [
    { value: 'option1', label: 'オプション 1', icon: '📄' },
    { value: 'option2', label: 'オプション 2', icon: '📁' },
    { value: 'option3', label: 'オプション 3', icon: '🖼️' },
  ];

  return (
    <Dropdown
      options={options}
      value={selected}
      onChange={setSelected}
      searchable
      size="default"
    />
  );
}
```

---

## アクセシビリティ

### ARIA属性

- `role="listbox"`: 選択リストの役割（単一選択）
- `role="menu"`: メニューの役割（アクション）
- `role="option"`: 選択可能なオプション
- `role="menuitem"`: メニューアイテム
- `aria-haspopup="listbox"`: ドロップダウンがあることを示す
- `aria-expanded`: メニューの開閉状態
- `aria-selected`: オプションの選択状態

### キーボード操作

実装すべきキーボードショートカット:

- **Enter / Space**: ドロップダウンを開く
- **Esc**: ドロップダウンを閉じる
- **↓**: 次のオプションに移動
- **↑**: 前のオプションに移動
- **Home**: 最初のオプションに移動
- **End**: 最後のオプションに移動
- **文字キー**: その文字で始まるオプションに移動

### スクリーンリーダー対応

1. **適切なロール設定**
   - listbox（選択リスト）とmenu（アクションメニュー）を使い分け
   - 選択状態を`aria-selected`で示す

2. **フォーカス管理**
   - ドロップダウンを開いたときにフォーカスを移動
   - 閉じたときにトリガーにフォーカスを戻す

---

## ベストプラクティス

### ドロップダウンの使用

1. **適切な選択肢の数**
   - 5-15個: 標準的なドロップダウン
   - 15個以上: 検索機能を追加
   - 3-4個: ラジオボタンやトグルボタンを検討

2. **グループ化**
   - 関連するオプションをグループ化
   - グループヘッダーで明確に区分

3. **デフォルト値**
   - 最も一般的な選択肢をデフォルトに
   - プレースホルダーは「選択してください」など明確に

### UXの向上

1. **検索機能**

```javascript
// 検索機能の実装
function filterOptions(query) {
  return options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );
}
```

2. **アイコンの使用**
   - 視覚的な手がかりを提供
   - 選択状態をチェックマークで明示

3. **無効状態**
   - 無効なオプションは視覚的に区別
   - カーソルを`not-allowed`に変更

### パフォーマンス

1. **仮想スクロール**
   - 大量のオプションがある場合は仮想スクロールを実装

2. **遅延読み込み**
   - オプションが開かれるまでレンダリングしない

3. **検索のデバウンス**

```javascript
const debouncedSearch = debounce((query) => {
  filterOptions(query);
}, 300);
```

---

## 関連コンポーネント

- **Select**: ネイティブのセレクト要素
- **Combobox**: 入力とドロップダウンの組み合わせ
- **Menu**: アクションのリスト
- **Popover**: より複雑な内容を表示

---

**最終更新:** 2025-12-11
**Phase 4 Option D で実装**
