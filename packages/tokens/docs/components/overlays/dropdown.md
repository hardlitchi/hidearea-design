# Dropdown (ドロップダウン) コンポーネント

**カテゴリ:** Overlays
**ファイル:** `src/css/components/overlays/dropdown.css`
**ステータス:** ✅ 実装済み

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

## 使用方法

### Pattern 2: Plain HTML (推奨)

#### CSSファイルの読み込み

```html
<link rel="stylesheet" href="@hidearea-design/tokens/build/css/html/overlays/dropdown.css">
```

#### 基本的な構造

Dropdown コンポーネントは `.ha-dropdown` をルート要素とし、`open` 属性でメニューの表示・非表示を制御します。

```html
<div class="ha-dropdown" open>
  <div class="dropdown-menu">
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
```

#### アイコン付きアイテム

```html
<div class="ha-dropdown" open>
  <div class="dropdown-menu">
    <button class="dropdown-item" role="menuitem">
      <svg class="dropdown-item-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.5 1a1.5 1.5 0 010 3h-11a1.5 1.5 0 010-3h11zM13.5 6a1.5 1.5 0 010 3h-11a1.5 1.5 0 010-3h11zM13.5 11a1.5 1.5 0 010 3h-11a1.5 1.5 0 010-3h11z"/>
      </svg>
      編集
    </button>
    <button class="dropdown-item" role="menuitem">
      <svg class="dropdown-item-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V2z"/>
      </svg>
      複製
    </button>
    <button class="dropdown-item" role="menuitem">
      <svg class="dropdown-item-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0a1 1 0 011 1v6h6a1 1 0 110 2H9v6a1 1 0 11-2 0V9H1a1 1 0 010-2h6V1a1 1 0 011-1z"/>
      </svg>
      共有
    </button>
  </div>
</div>
```

#### 選択インジケーター付き

```html
<div class="ha-dropdown" open>
  <div class="dropdown-menu">
    <button class="dropdown-item" role="option" aria-selected="true">
      <svg class="dropdown-item-checkmark" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.485 1.929a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L6 9.657l7.485-7.728z"/>
      </svg>
      日本語
    </button>
    <button class="dropdown-item" role="option" aria-selected="false">
      <svg class="dropdown-item-checkmark" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.485 1.929a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L6 9.657l7.485-7.728z"/>
      </svg>
      English
    </button>
    <button class="dropdown-item" role="option" aria-selected="false">
      <svg class="dropdown-item-checkmark" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.485 1.929a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L6 9.657l7.485-7.728z"/>
      </svg>
      中文
    </button>
  </div>
</div>
```

#### ディバイダー

```html
<div class="ha-dropdown" open>
  <div class="dropdown-menu">
    <button class="dropdown-item" role="menuitem">プロフィール</button>
    <button class="dropdown-item" role="menuitem">設定</button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" role="menuitem">ログアウト</button>
  </div>
</div>
```

#### グループヘッダー

```html
<div class="ha-dropdown" open>
  <div class="dropdown-menu">
    <div class="dropdown-group-header">アカウント</div>
    <button class="dropdown-item" role="menuitem">プロフィール</button>
    <button class="dropdown-item" role="menuitem">設定</button>

    <div class="dropdown-group-header">その他</div>
    <button class="dropdown-item" role="menuitem">ヘルプ</button>
    <button class="dropdown-item" role="menuitem">フィードバック</button>
  </div>
</div>
```

#### 検索機能付き

```html
<div class="ha-dropdown" open>
  <div class="dropdown-menu">
    <div class="dropdown-search">
      <input type="text" placeholder="検索...">
    </div>
    <button class="dropdown-item" role="option">オプション 1</button>
    <button class="dropdown-item" role="option">オプション 2</button>
    <button class="dropdown-item" role="option">オプション 3</button>
  </div>
</div>
```

#### 無効化されたアイテム

```html
<div class="ha-dropdown" open>
  <div class="dropdown-menu">
    <button class="dropdown-item" role="menuitem">有効なアイテム</button>
    <button class="dropdown-item" role="menuitem" aria-disabled="true">無効なアイテム</button>
    <button class="dropdown-item" role="menuitem" disabled>無効なアイテム</button>
  </div>
</div>
```

#### サイズバリアント

```html
<!-- Small -->
<div class="ha-dropdown" size="sm" open>
  <div class="dropdown-menu">
    <button class="dropdown-item">Small アイテム</button>
  </div>
</div>

<!-- Medium (デフォルト) -->
<div class="ha-dropdown" size="md" open>
  <div class="dropdown-menu">
    <button class="dropdown-item">Medium アイテム</button>
  </div>
</div>

<!-- Large -->
<div class="ha-dropdown" size="lg" open>
  <div class="dropdown-menu">
    <button class="dropdown-item">Large アイテム</button>
  </div>
</div>
```

#### 配置バリアント

```html
<!-- Top -->
<div class="ha-dropdown" placement="top" open>
  <div class="dropdown-menu">
    <button class="dropdown-item">アイテム</button>
  </div>
</div>

<!-- Left -->
<div class="ha-dropdown" placement="left" open>
  <div class="dropdown-menu">
    <button class="dropdown-item">アイテム</button>
  </div>
</div>

<!-- Right -->
<div class="ha-dropdown" placement="right" open>
  <div class="dropdown-menu">
    <button class="dropdown-item">アイテム</button>
  </div>
</div>
```

#### JavaScript による制御

Dropdown の開閉とキーボードナビゲーションを実装するコントローラークラス:

```javascript
class DropdownController {
  constructor(dropdownElement, triggerElement) {
    this.dropdown = dropdownElement;
    this.trigger = triggerElement;
    this.menu = dropdownElement.querySelector('.dropdown-menu');
    this.items = [];
    this.currentIndex = -1;
    this.searchQuery = '';
    this.searchTimeout = null;

    this.init();
  }

  init() {
    // トリガーボタンのクリックイベント
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // 外部クリックで閉じる
    document.addEventListener('click', (e) => {
      if (this.isOpen() && !this.dropdown.contains(e.target)) {
        this.close();
      }
    });

    // キーボードイベント
    this.handleKeyDown = (e) => {
      if (!this.isOpen()) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.close();
          this.trigger.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.navigateNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.navigatePrevious();
          break;
        case 'Home':
          e.preventDefault();
          this.navigateFirst();
          break;
        case 'End':
          e.preventDefault();
          this.navigateLast();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.selectCurrent();
          break;
        default:
          // タイプアヘッド検索
          if (e.key.length === 1) {
            this.handleTypeAhead(e.key);
          }
      }
    };

    document.addEventListener('keydown', this.handleKeyDown);

    // アイテムのクリックイベント
    this.updateItems();
  }

  updateItems() {
    this.items = Array.from(
      this.menu.querySelectorAll('.dropdown-item:not([disabled]):not([aria-disabled="true"])')
    );

    this.items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.selectItem(index);
      });
    });
  }

  open() {
    this.dropdown.setAttribute('open', '');
    this.trigger.setAttribute('aria-expanded', 'true');
    this.updateItems();
    this.currentIndex = -1;
  }

  close() {
    this.dropdown.removeAttribute('open');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.currentIndex = -1;
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  isOpen() {
    return this.dropdown.hasAttribute('open');
  }

  navigateNext() {
    if (this.items.length === 0) return;

    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.focusCurrentItem();
  }

  navigatePrevious() {
    if (this.items.length === 0) return;

    this.currentIndex = this.currentIndex <= 0
      ? this.items.length - 1
      : this.currentIndex - 1;
    this.focusCurrentItem();
  }

  navigateFirst() {
    if (this.items.length === 0) return;
    this.currentIndex = 0;
    this.focusCurrentItem();
  }

  navigateLast() {
    if (this.items.length === 0) return;
    this.currentIndex = this.items.length - 1;
    this.focusCurrentItem();
  }

  focusCurrentItem() {
    if (this.currentIndex >= 0 && this.currentIndex < this.items.length) {
      this.items[this.currentIndex].focus();
    }
  }

  selectCurrent() {
    if (this.currentIndex >= 0 && this.currentIndex < this.items.length) {
      this.selectItem(this.currentIndex);
    }
  }

  selectItem(index) {
    const item = this.items[index];

    // 選択状態を更新
    this.items.forEach(i => i.setAttribute('aria-selected', 'false'));
    item.setAttribute('aria-selected', 'true');

    // カスタムイベントを発火
    const event = new CustomEvent('dropdown:select', {
      detail: {
        value: item.textContent.trim(),
        index: index,
        item: item
      }
    });
    this.dropdown.dispatchEvent(event);

    // ドロップダウンを閉じる
    this.close();
    this.trigger.focus();
  }

  handleTypeAhead(key) {
    clearTimeout(this.searchTimeout);

    this.searchQuery += key.toLowerCase();

    // 検索にマッチするアイテムを探す
    const matchIndex = this.items.findIndex(item =>
      item.textContent.trim().toLowerCase().startsWith(this.searchQuery)
    );

    if (matchIndex !== -1) {
      this.currentIndex = matchIndex;
      this.focusCurrentItem();
    }

    // 1秒後に検索クエリをリセット
    this.searchTimeout = setTimeout(() => {
      this.searchQuery = '';
    }, 1000);
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}

// 使用例
const dropdown = document.querySelector('.ha-dropdown');
const trigger = document.querySelector('#dropdown-trigger');
const controller = new DropdownController(dropdown, trigger);

// 選択イベントをリスン
dropdown.addEventListener('dropdown:select', (e) => {
  console.log('Selected:', e.detail.value);
  trigger.textContent = e.detail.value;
});
```

#### 検索機能の実装

```javascript
class SearchableDropdownController extends DropdownController {
  constructor(dropdownElement, triggerElement) {
    super(dropdownElement, triggerElement);
    this.searchInput = dropdownElement.querySelector('.dropdown-search input');
    this.allItems = [];

    if (this.searchInput) {
      this.initSearch();
    }
  }

  initSearch() {
    // すべてのアイテムを保存
    this.allItems = Array.from(
      this.menu.querySelectorAll('.dropdown-item')
    );

    // 検索入力イベント
    this.searchInput.addEventListener('input', (e) => {
      this.filterItems(e.target.value);
    });

    // 検索入力のキーイベント（矢印キーなど）
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateFirst();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
        this.trigger.focus();
      }
    });
  }

  filterItems(query) {
    const lowerQuery = query.toLowerCase();
    let visibleCount = 0;

    this.allItems.forEach(item => {
      const text = item.textContent.trim().toLowerCase();
      const matches = text.includes(lowerQuery);

      if (matches) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // アイテムリストを更新
    this.updateItems();

    // 空の状態を表示/非表示
    this.toggleEmptyState(visibleCount === 0);
  }

  toggleEmptyState(show) {
    let emptyState = this.menu.querySelector('.dropdown-empty');

    if (show && !emptyState) {
      emptyState = document.createElement('div');
      emptyState.className = 'dropdown-empty';
      emptyState.textContent = '結果が見つかりません';
      this.menu.appendChild(emptyState);
    } else if (!show && emptyState) {
      emptyState.remove();
    }
  }

  open() {
    super.open();

    // 検索入力をクリア
    if (this.searchInput) {
      this.searchInput.value = '';
      this.filterItems('');

      // 検索入力にフォーカス
      setTimeout(() => this.searchInput.focus(), 10);
    }
  }
}

// 使用例
const searchableDropdown = document.querySelector('.ha-dropdown');
const searchableTrigger = document.querySelector('#searchable-trigger');
const searchableController = new SearchableDropdownController(
  searchableDropdown,
  searchableTrigger
);
```

#### アクセシビリティ

Dropdown は ARIA 属性を適切に設定する必要があります:

**必須の ARIA 属性**

```html
<!-- トリガーボタン -->
<button
  id="dropdown-trigger"
  aria-haspopup="listbox"
  aria-expanded="false"
  aria-controls="dropdown-menu">
  選択してください
</button>

<!-- ドロップダウンメニュー -->
<div class="ha-dropdown">
  <div
    id="dropdown-menu"
    class="dropdown-menu"
    role="listbox"
    aria-labelledby="dropdown-trigger">

    <button
      class="dropdown-item"
      role="option"
      aria-selected="false">
      オプション 1
    </button>

    <button
      class="dropdown-item"
      role="option"
      aria-selected="true">
      オプション 2
    </button>
  </div>
</div>
```

**メニューとリストボックスの使い分け**

```html
<!-- Listbox: 単一/複数選択 -->
<div class="dropdown-menu" role="listbox">
  <button class="dropdown-item" role="option" aria-selected="false">項目</button>
</div>

<!-- Menu: アクション -->
<div class="dropdown-menu" role="menu">
  <button class="dropdown-item" role="menuitem">アクション</button>
</div>
```

**キーボード操作**

- `↓ / ArrowDown`: 次のアイテムへ移動
- `↑ / ArrowUp`: 前のアイテムへ移動
- `Home`: 最初のアイテムへ移動
- `End`: 最後のアイテムへ移動
- `Enter / Space`: 現在のアイテムを選択
- `Esc`: ドロップダウンを閉じる
- `a-z`: タイプアヘッド検索（入力した文字で始まるアイテムへ移動）

**スクリーンリーダー対応**

- `role="listbox"` または `role="menu"` でドロップダウンの種類を明示
- `aria-haspopup` でポップアップの種類を示す
- `aria-expanded` でメニューの開閉状態を示す
- `aria-selected` でアイテムの選択状態を示す
- `aria-disabled` で無効なアイテムを示す
- グループヘッダーは装飾的要素として扱う（role不要）

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
