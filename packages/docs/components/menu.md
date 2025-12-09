# Menu / Dropdown

ドロップダウンメニューコンポーネント。8種類の配置オプションをサポートします。

## 基本的な使い方

```html
<ha-dropdown>
  <ha-button slot="trigger">メニュー</ha-button>
  <ha-menu>
    <ha-menu-item>アイテム1</ha-menu-item>
    <ha-menu-item>アイテム2</ha-menu-item>
    <ha-menu-item>アイテム3</ha-menu-item>
  </ha-menu>
</ha-dropdown>
```

## 配置

8種類の配置オプションが利用可能です：

```html
<ha-dropdown placement="bottom-start">
  <ha-button slot="trigger">下・開始</ha-button>
  <ha-menu>
    <ha-menu-item>アイテム1</ha-menu-item>
    <ha-menu-item>アイテム2</ha-menu-item>
  </ha-menu>
</ha-dropdown>
```

配置オプション：
- `bottom-start`（デフォルト）
- `bottom-end`
- `top-start`
- `top-end`
- `right-start`
- `right-end`
- `left-start`
- `left-end`

## 無効化

```html
<ha-menu>
  <ha-menu-item>アイテム1</ha-menu-item>
  <ha-menu-item disabled>アイテム2（無効）</ha-menu-item>
  <ha-menu-item>アイテム3</ha-menu-item>
</ha-menu>
```

## 区切り線

```html
<ha-menu>
  <ha-menu-item>アイテム1</ha-menu-item>
  <ha-menu-item>アイテム2</ha-menu-item>
  <ha-menu-divider></ha-menu-divider>
  <ha-menu-item>アイテム3</ha-menu-item>
</ha-menu>
```

## プロパティ

### ha-dropdown

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'right-start' \| 'right-end' \| 'left-start' \| 'left-end'` | `'bottom-start'` | 配置位置 |
| `open` | `boolean` | `false` | 開閉状態 |

### ha-menu-item

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `disabled` | `boolean` | `false` | 無効状態 |
| `href` | `string` | `''` | リンク先URL |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `select` | メニューアイテムが選択された時 | `CustomEvent` |

## React

```tsx
import { Dropdown, Menu, MenuItem, MenuDivider, Button } from '@hidearea-design/react';

function App() {
  return (
    <Dropdown placement="bottom-start">
      <Button slot="trigger">メニュー</Button>
      <Menu>
        <MenuItem onSelect={() => console.log('編集')}>編集</MenuItem>
        <MenuItem onSelect={() => console.log('複製')}>複製</MenuItem>
        <MenuDivider />
        <MenuItem onSelect={() => console.log('削除')}>削除</MenuItem>
      </Menu>
    </Dropdown>
  );
}
```

## Vue

```vue
<template>
  <HaDropdown placement="bottom-start">
    <HaButton slot="trigger">メニュー</HaButton>
    <HaMenu>
      <HaMenuItem @select="handleEdit">編集</HaMenuItem>
      <HaMenuItem @select="handleDuplicate">複製</HaMenuItem>
      <HaMenuDivider />
      <HaMenuItem @select="handleDelete">削除</HaMenuItem>
    </HaMenu>
  </HaDropdown>
</template>

<script setup>
import {
  Dropdown as HaDropdown,
  Menu as HaMenu,
  MenuItem as HaMenuItem,
  MenuDivider as HaMenuDivider,
  Button as HaButton,
} from '@hidearea-design/vue';

const handleEdit = () => console.log('編集');
const handleDuplicate = () => console.log('複製');
const handleDelete = () => console.log('削除');
</script>
```

## 使用例

### ユーザーメニュー

```html
<ha-dropdown placement="bottom-end">
  <ha-button slot="trigger" variant="ghost">
    👤 ユーザー名
  </ha-button>
  <ha-menu>
    <ha-menu-item>👤 プロフィール</ha-menu-item>
    <ha-menu-item>⚙️ 設定</ha-menu-item>
    <ha-menu-divider></ha-menu-divider>
    <ha-menu-item>🚪 ログアウト</ha-menu-item>
  </ha-menu>
</ha-dropdown>
```

### アクションメニュー

```html
<ha-dropdown>
  <ha-button slot="trigger" variant="outline" size="sm">
    ⋮ アクション
  </ha-button>
  <ha-menu>
    <ha-menu-item>✏️ 編集</ha-menu-item>
    <ha-menu-item>📋 複製</ha-menu-item>
    <ha-menu-item>📤 エクスポート</ha-menu-item>
    <ha-menu-divider></ha-menu-divider>
    <ha-menu-item>🗑️ 削除</ha-menu-item>
  </ha-menu>
</ha-dropdown>
```

### ナビゲーションメニュー

```html
<ha-stack direction="horizontal" gap="2">
  <ha-dropdown placement="bottom-start">
    <ha-button slot="trigger" variant="ghost">
      商品
    </ha-button>
    <ha-menu>
      <ha-menu-item href="/products/electronics">電化製品</ha-menu-item>
      <ha-menu-item href="/products/clothing">衣類</ha-menu-item>
      <ha-menu-item href="/products/books">書籍</ha-menu-item>
      <ha-menu-item href="/products/furniture">家具</ha-menu-item>
    </ha-menu>
  </ha-dropdown>

  <ha-dropdown placement="bottom-start">
    <ha-button slot="trigger" variant="ghost">
      サービス
    </ha-button>
    <ha-menu>
      <ha-menu-item href="/services/consulting">コンサルティング</ha-menu-item>
      <ha-menu-item href="/services/development">開発</ha-menu-item>
      <ha-menu-item href="/services/design">デザイン</ha-menu-item>
    </ha-menu>
  </ha-dropdown>
</ha-stack>
```

### テーブル行アクション

```tsx
import { Dropdown, Menu, MenuItem, MenuDivider, Button } from '@hidearea-design/react';

interface RowActionsProps {
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

function RowActions({ onEdit, onDuplicate, onDelete }: RowActionsProps) {
  return (
    <Dropdown placement="bottom-end">
      <Button slot="trigger" variant="ghost" size="sm">
        ⋮
      </Button>
      <Menu>
        <MenuItem onSelect={onEdit}>✏️ 編集</MenuItem>
        <MenuItem onSelect={onDuplicate}>📋 複製</MenuItem>
        <MenuDivider />
        <MenuItem onSelect={onDelete}>🗑️ 削除</MenuItem>
      </Menu>
    </Dropdown>
  );
}

function DataTable() {
  const data = [
    { id: 1, name: 'アイテム1' },
    { id: 2, name: 'アイテム2' },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名前</th>
          <th>アクション</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <RowActions
                onEdit={() => console.log('編集', item.id)}
                onDuplicate={() => console.log('複製', item.id)}
                onDelete={() => console.log('削除', item.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### カード内メニュー

```html
<ha-card>
  <ha-stack direction="vertical" gap="3">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3>プロジェクト名</h3>
      <ha-dropdown placement="bottom-end">
        <ha-button slot="trigger" variant="ghost" size="sm">
          ⋮
        </ha-button>
        <ha-menu>
          <ha-menu-item>✏️ 編集</ha-menu-item>
          <ha-menu-item>👥 共有</ha-menu-item>
          <ha-menu-divider></ha-menu-divider>
          <ha-menu-item>📤 エクスポート</ha-menu-item>
          <ha-menu-item>🗑️ 削除</ha-menu-item>
        </ha-menu>
      </ha-dropdown>
    </div>
    <p>プロジェクトの説明</p>
  </ha-stack>
</ha-card>
```

### コンテキストメニュー

```tsx
import { Dropdown, Menu, MenuItem, MenuDivider, Card } from '@hidearea-design/react';
import { useState } from 'react';

function ContextMenu() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  return (
    <>
      <Card
        onContextMenu={handleContextMenu}
        style={{ minHeight: '200px', cursor: 'context-menu' }}
      >
        <p>右クリックしてコンテキストメニューを表示</p>
      </Card>

      {open && (
        <div
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            zIndex: 9999,
          }}
          onClick={() => setOpen(false)}
        >
          <Menu>
            <MenuItem>コピー</MenuItem>
            <MenuItem>ペースト</MenuItem>
            <MenuDivider />
            <MenuItem>削除</MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}
```

### 多階層メニュー

```html
<ha-dropdown>
  <ha-button slot="trigger">メニュー</ha-button>
  <ha-menu>
    <ha-menu-item>新規作成</ha-menu-item>

    <ha-menu-item disabled>
      開く
      <!-- サブメニューは将来のバージョンで実装予定 -->
    </ha-menu-item>

    <ha-menu-divider></ha-menu-divider>

    <ha-menu-item>保存</ha-menu-item>
    <ha-menu-item>名前を付けて保存</ha-menu-item>

    <ha-menu-divider></ha-menu-divider>

    <ha-menu-item>終了</ha-menu-item>
  </ha-menu>
</ha-dropdown>
```

### フィルターメニュー

```tsx
import { Dropdown, Menu, MenuItem, Button, Badge } from '@hidearea-design/react';
import { useState } from 'react';

function FilterMenu() {
  const [filters, setFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <Dropdown placement="bottom-start">
      <Button slot="trigger" variant="outline">
        フィルター
        {filters.length > 0 && (
          <Badge variant="primary" size="sm" style={{ marginLeft: '8px' }}>
            {filters.length}
          </Badge>
        )}
      </Button>
      <Menu>
        <MenuItem onSelect={() => toggleFilter('active')}>
          {filters.includes('active') ? '✓' : '\u00A0\u00A0'} 有効
        </MenuItem>
        <MenuItem onSelect={() => toggleFilter('inactive')}>
          {filters.includes('inactive') ? '✓' : '\u00A0\u00A0'} 無効
        </MenuItem>
        <MenuItem onSelect={() => toggleFilter('pending')}>
          {filters.includes('pending') ? '✓' : '\u00A0\u00A0'} 保留中
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
```

### ソートメニュー

```html
<ha-dropdown placement="bottom-end">
  <ha-button slot="trigger" variant="outline">
    並び替え
  </ha-button>
  <ha-menu>
    <ha-menu-item>名前（昇順）</ha-menu-item>
    <ha-menu-item>名前（降順）</ha-menu-item>
    <ha-menu-divider></ha-menu-divider>
    <ha-menu-item>日付（新しい順）</ha-menu-item>
    <ha-menu-item>日付（古い順）</ha-menu-item>
    <ha-menu-divider></ha-menu-divider>
    <ha-menu-item>価格（安い順）</ha-menu-item>
    <ha-menu-item>価格（高い順）</ha-menu-item>
  </ha-menu>
</ha-dropdown>
```

## アクセシビリティ

Menu/Dropdownコンポーネントは、WCAG 2.1 AAに準拠し、WAI-ARIA Menu/Menubarパターンに従っています。

### ARIAサポート

Menu/Dropdownコンポーネントは自動的にARIA属性を適用します：

| ARIA属性 | 要素 | 説明 |
|---------|------|------|
| `role="button"` | トリガーボタン | ボタンであることを示す |
| `aria-haspopup="menu"` | トリガーボタン | メニューを開くことを示す |
| `aria-expanded` | トリガーボタン | メニューの開閉状態を示す（true/false） |
| `aria-controls` | トリガーボタン | 制御するメニューのIDを参照 |
| `role="menu"` | メニューコンテナ | メニューであることを示す |
| `role="menuitem"` | メニューアイテム | メニュー項目であることを示す |
| `role="separator"` | メニュー区切り線 | 区切り線であることを示す |
| `aria-disabled="true"` | メニューアイテム | `disabled`属性が設定されている場合 |
| `aria-current="page"` | メニューアイテム | 現在のページ（hrefと一致する場合） |
| `tabindex="-1"` | メニューアイテム | キーボードフォーカス管理用 |
| `tabindex="0"` | 最初のアイテム | 最初のフォーカス可能アイテム |

### キーボードナビゲーション

#### トリガーボタン（メニュー閉じている時）

| キー | 動作 |
|-----|------|
| `Tab` | トリガーボタンにフォーカスを移動 |
| `Shift + Tab` | 前のフォーカス可能要素へ移動 |
| `Space` / `Enter` | メニューを開き、最初のアイテムにフォーカス |
| `Arrow Down` | メニューを開き、最初のアイテムにフォーカス |
| `Arrow Up` | メニューを開き、最後のアイテムにフォーカス |

#### メニュー（開いている時）

| キー | 動作 |
|-----|------|
| `Arrow Down` | 次のアイテムに移動（最後の場合は最初へループ） |
| `Arrow Up` | 前のアイテムに移動（最初の場合は最後へループ） |
| `Home` | 最初のアイテムに移動 |
| `End` | 最後のアイテムに移動 |
| `Enter` / `Space` | フォーカス中のアイテムを選択してメニューを閉じる |
| `Escape` | メニューを閉じてトリガーボタンにフォーカスを戻す |
| `Tab` | メニューを閉じて次のフォーカス可能要素へ移動 |
| `Shift + Tab` | メニューを閉じて前のフォーカス可能要素へ移動 |
| `文字キー` | その文字で始まるアイテムに移動（タイプアヘッド） |

### スクリーンリーダーの対応

Menu/Dropdownコンポーネントは主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます。

#### 読み上げ例

**トリガーボタンにフォーカス時**:
```
「メニュー、ボタン、メニューポップアップ、閉じています」
（"Menu, button, has menu popup, collapsed"）
```

**メニューを開いた時**:
```
「メニュー、5個のアイテム」
「編集、メニュー項目、1個目、5個中」
（"Menu, 5 items"）
（"Edit, menu item, 1 of 5"）
```

**メニューアイテムにフォーカス時**:
```
「編集、メニュー項目、1個目、5個中」
（"Edit, menu item, 1 of 5"）
```

**無効なアイテムにフォーカス時**:
```
「複製、メニュー項目、無効、2個目、5個中」
（"Duplicate, menu item, disabled, 2 of 5"）
```

**区切り線を通過する時**:
```
「区切り線」
（"Separator"）
```

**リンク付きアイテム**:
```
「電化製品、メニュー項目、リンク、1個目、4個中」
（"Electronics, menu item, link, 1 of 4"）
```

**メニューを閉じた時**:
```
「メニュー、ボタン、閉じました」
（"Menu, button, collapsed"）
```

#### ライブリージョン

メニューの開閉やアイテム選択時にスクリーンリーダーに通知されます：

```html
<!-- Dropdownが自動的に生成するライブリージョン -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  メニューを開きました
</div>

<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  編集を選択しました
</div>
```

### フォーカス管理

メニューのフォーカス管理はWAI-ARIAパターンに従っています：

```html
<!-- メニューを開くとフォーカスは最初のアイテムへ -->
<ha-dropdown>
  <ha-button slot="trigger">メニュー</ha-button>
  <ha-menu>
    <ha-menu-item tabindex="0">編集</ha-menu-item> <!-- フォーカスを受ける -->
    <ha-menu-item tabindex="-1">複製</ha-menu-item>
    <ha-menu-item tabindex="-1">削除</ha-menu-item>
  </ha-menu>
</ha-dropdown>
```

### フォーカスインジケーター

キーボードユーザーのために、フォーカス状態が明確に表示されます：

```css
/* トリガーボタンのフォーカス */
ha-dropdown::part(trigger):focus {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: 2px;
}

/* メニューアイテムのフォーカス */
ha-menu-item:focus {
  background-color: var(--color-primary-50);
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: -2px;
}

/* ハイコントラストモード対応 */
@media (prefers-contrast: high) {
  ha-menu-item:focus {
    outline-width: 3px;
  }
}
```

### 無効化されたアイテムのアクセシビリティ

無効化されたアイテムは適切にマークされます：

```html
<ha-menu>
  <ha-menu-item>編集</ha-menu-item>
  <ha-menu-item disabled aria-disabled="true">複製（利用不可）</ha-menu-item>
  <ha-menu-item>削除</ha-menu-item>
</ha-menu>
```

**スクリーンリーダー読み上げ**:
```
「複製（利用不可）、メニュー項目、無効、2個目、3個中」
（"Duplicate (unavailable), menu item, disabled, 2 of 3"）
```

## スタイルのカスタマイズ

Menu/Dropdownコンポーネントは、デザイントークンとCSS変数を使用して柔軟にカスタマイズできます。

### デザイントークン

Menu/Dropdownコンポーネントで使用されるセマンティックトークン：

```css
ha-dropdown {
  /* スペーシング */
  --dropdown-offset: var(--spacing-1);

  /* Z-index */
  --dropdown-z-index: var(--z-index-dropdown, 1000);
}

ha-menu {
  /* カラー */
  --menu-bg: var(--color-surface-elevated);
  --menu-border-color: var(--color-border-default);

  /* スペーシング */
  --menu-padding: var(--spacing-2);
  --menu-gap: var(--spacing-0-5);

  /* タイポグラフィ */
  --menu-font-family: var(--font-family-base);
  --menu-font-size: var(--font-size-sm);
  --menu-line-height: var(--line-height-normal);

  /* ボーダー */
  --menu-border-width: var(--border-width-thin);
  --menu-border-radius: var(--radius-md);

  /* シャドウ */
  --menu-shadow: var(--shadow-lg);

  /* サイズ */
  --menu-min-width: 180px;
  --menu-max-width: 320px;
  --menu-max-height: 400px;
}

ha-menu-item {
  /* カラー */
  --menu-item-color: var(--color-text-primary);
  --menu-item-bg-hover: var(--color-surface-hover);
  --menu-item-bg-active: var(--color-surface-active);
  --menu-item-color-disabled: var(--color-text-disabled);
  --menu-item-bg-disabled: transparent;

  /* スペーシング */
  --menu-item-padding: var(--spacing-2) var(--spacing-3);
  --menu-item-gap: var(--spacing-2);

  /* タイポグラフィ */
  --menu-item-font-size: var(--font-size-sm);
  --menu-item-font-weight: var(--font-weight-normal);
  --menu-item-line-height: var(--line-height-normal);

  /* ボーダー */
  --menu-item-border-radius: var(--radius-sm);

  /* トランジション */
  --menu-item-transition: background-color var(--duration-fast) var(--easing-standard);
}

ha-menu-divider {
  /* カラー */
  --menu-divider-color: var(--color-border-default);

  /* サイズ */
  --menu-divider-height: var(--border-width-thin);

  /* スペーシング */
  --menu-divider-margin: var(--spacing-1) 0;
}
```

### CSS変数の基本的なカスタマイズ

```css
/* メニュー全体のスタイル */
ha-menu {
  --menu-bg: var(--color-white);
  --menu-border-color: var(--color-gray-200);
  --menu-border-radius: 8px;
  --menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --menu-padding: 8px;
  --menu-min-width: 180px;
  --menu-max-width: 320px;
}

/* メニューアイテムのスタイル */
ha-menu-item {
  --menu-item-padding: 8px 12px;
  --menu-item-font-size: 14px;
  --menu-item-hover-bg: var(--color-gray-50);
  --menu-item-active-bg: var(--color-gray-100);
}
```

### Shadow DOMパーツ

`::part()` セレクタを使用してコンポーネント内部のスタイルをカスタマイズできます：

| パーツ名 | 対象要素 | 説明 |
|---------|---------|------|
| `trigger` | トリガーボタン | Dropdown内のトリガー要素 |
| `popup` | ポップアップコンテナ | メニューを含むポップアップ |
| `base` | メニューのルート | メニューコンポーネントのベース要素 |
| `item` | メニューアイテム | 個々のメニューアイテム |
| `divider` | 区切り線 | メニューの区切り線 |

**使用例**:

```css
/* トリガーボタンのカスタマイズ */
ha-dropdown::part(trigger) {
  border: 2px solid var(--color-primary-500);
  border-radius: 12px;
}

/* ポップアップのカスタマイズ */
ha-dropdown::part(popup) {
  margin-top: 8px;
}

/* メニューベースのカスタマイズ */
ha-menu::part(base) {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 2px solid var(--color-gray-300);
}

/* メニューアイテムのカスタマイズ */
ha-menu-item::part(item) {
  font-weight: 500;
  padding: 12px 16px;
}

/* 区切り線のカスタマイズ */
ha-menu-divider::part(divider) {
  border-color: var(--color-gray-300);
  margin: 12px 0;
}
```

### ダークモード対応

```css
@media (prefers-color-scheme: dark) {
  ha-menu {
    --menu-bg: var(--color-gray-800);
    --menu-border-color: var(--color-gray-700);
    --menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  ha-menu-item {
    --menu-item-color: var(--color-gray-100);
    --menu-item-hover-bg: var(--color-gray-700);
    --menu-item-active-bg: var(--color-gray-600);
    --menu-item-color-disabled: var(--color-gray-500);
  }

  ha-menu-divider {
    --menu-divider-color: var(--color-gray-700);
  }
}
```

### カスタムテーマの例

#### プライマリテーマ

```css
ha-menu.theme-primary {
  --menu-bg: var(--color-primary-50);
  --menu-border-color: var(--color-primary-200);
}

ha-menu.theme-primary ha-menu-item {
  --menu-item-color: var(--color-primary-900);
  --menu-item-hover-bg: var(--color-primary-100);
  --menu-item-active-bg: var(--color-primary-200);
}
```

#### ミニマルテーマ

```css
ha-menu.theme-minimal {
  --menu-bg: transparent;
  --menu-border-color: transparent;
  --menu-shadow: none;
  --menu-padding: 0;
}

ha-menu.theme-minimal ha-menu-item {
  --menu-item-border-radius: 0;
  --menu-item-padding: 6px 12px;
}
```

#### カードテーマ

```css
ha-menu.theme-card {
  --menu-bg: var(--color-white);
  --menu-border-radius: 16px;
  --menu-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  --menu-padding: 16px;
}

ha-menu.theme-card ha-menu-item {
  --menu-item-border-radius: 8px;
  --menu-item-padding: 12px 16px;
  --menu-item-font-size: 15px;
}
```

#### コンパクトテーマ

```css
ha-menu.theme-compact {
  --menu-padding: 4px;
  --menu-min-width: 120px;
}

ha-menu.theme-compact ha-menu-item {
  --menu-item-padding: 4px 8px;
  --menu-item-font-size: 13px;
}
```

### TypeScript型定義

```typescript
interface MenuCSSProperties {
  // カラー
  '--menu-bg'?: string;
  '--menu-border-color'?: string;

  // スペーシング
  '--menu-padding'?: string;
  '--menu-gap'?: string;

  // タイポグラフィ
  '--menu-font-family'?: string;
  '--menu-font-size'?: string;
  '--menu-line-height'?: string;

  // ボーダー
  '--menu-border-width'?: string;
  '--menu-border-radius'?: string;

  // シャドウ
  '--menu-shadow'?: string;

  // サイズ
  '--menu-min-width'?: string;
  '--menu-max-width'?: string;
  '--menu-max-height'?: string;
}

interface MenuItemCSSProperties {
  // カラー
  '--menu-item-color'?: string;
  '--menu-item-bg-hover'?: string;
  '--menu-item-bg-active'?: string;
  '--menu-item-color-disabled'?: string;
  '--menu-item-bg-disabled'?: string;

  // スペーシング
  '--menu-item-padding'?: string;
  '--menu-item-gap'?: string;

  // タイポグラフィ
  '--menu-item-font-size'?: string;
  '--menu-item-font-weight'?: string;
  '--menu-item-line-height'?: string;

  // ボーダー
  '--menu-item-border-radius'?: string;

  // トランジション
  '--menu-item-transition'?: string;
}

// React での使用例
const menuStyle: React.CSSProperties & MenuCSSProperties = {
  '--menu-bg': '#ffffff',
  '--menu-border-radius': '12px',
  '--menu-shadow': '0 4px 16px rgba(0, 0, 0, 0.1)',
};
```

## 配置オプション一覧

| 配置 | 説明 |
|------|------|
| `bottom-start` | 下・左寄せ（デフォルト） |
| `bottom-end` | 下・右寄せ |
| `top-start` | 上・左寄せ |
| `top-end` | 上・右寄せ |
| `right-start` | 右・上寄せ |
| `right-end` | 右・下寄せ |
| `left-start` | 左・上寄せ |
| `left-end` | 左・下寄せ |

## ベストプラクティス

### ✓ 推奨される使い方

**1. メニュー項目は5-7個以内に抑える**
```html
<!-- ✓ Good: 適切な項目数 -->
<ha-menu>
  <ha-menu-item>編集</ha-menu-item>
  <ha-menu-item>複製</ha-menu-item>
  <ha-menu-item>共有</ha-menu-item>
  <ha-menu-divider></ha-menu-divider>
  <ha-menu-item>削除</ha-menu-item>
</ha-menu>
```
理由: 認知的負荷を減らし、ユーザーがすばやく選択できるようにします。多すぎる場合はグループ化や階層化を検討してください。

**2. 危険な操作は区切り線で分離して下部に配置**
```html
<!-- ✓ Good: 削除は区切り線の下 -->
<ha-menu>
  <ha-menu-item>編集</ha-menu-item>
  <ha-menu-item>複製</ha-menu-item>
  <ha-menu-item>エクスポート</ha-menu-item>
  <ha-menu-divider></ha-menu-divider>
  <ha-menu-item>🗑️ 削除</ha-menu-item>
</ha-menu>
```
理由: 誤操作を防ぎ、破壊的なアクションであることを視覚的に示します。

**3. アイコンで視認性と理解を向上**
```html
<!-- ✓ Good: アイコン付き -->
<ha-menu>
  <ha-menu-item>✏️ 編集</ha-menu-item>
  <ha-menu-item>📋 複製</ha-menu-item>
  <ha-menu-item>📤 共有</ha-menu-item>
</ha-menu>
```
理由: アイコンは視覚的な手がかりとなり、項目を素早く識別できます。

**4. 適切な配置を使用する**
```html
<!-- ✓ Good: ユーザーメニューは右寄せ -->
<ha-dropdown placement="bottom-end">
  <ha-button slot="trigger">👤 ユーザー名</ha-button>
  <ha-menu>
    <ha-menu-item>プロフィール</ha-menu-item>
    <ha-menu-item>設定</ha-menu-item>
  </ha-menu>
</ha-dropdown>
```
理由: UIの配置に合わせることで、自然なユーザー体験を提供します。

**5. 明確で一貫性のあるラベルを使用**
```html
<!-- ✓ Good: 明確な動詞 -->
<ha-menu>
  <ha-menu-item>プロフィールを編集</ha-menu-item>
  <ha-menu-item>パスワードを変更</ha-menu-item>
  <ha-menu-item>アカウントを削除</ha-menu-item>
</ha-menu>
```
理由: ユーザーが各アクションの結果を理解しやすくなります。

**6. リンク付きアイテムにはhref属性を使用**
```html
<!-- ✓ Good: ナビゲーションリンク -->
<ha-menu>
  <ha-menu-item href="/settings">設定</ha-menu-item>
  <ha-menu-item href="/profile">プロフィール</ha-menu-item>
</ha-menu>
```
理由: SEOとアクセシビリティが向上し、右クリックでの新しいタブで開くなどの機能が使えます。

### ✗ 避けるべき使い方

**1. メニュー項目が多すぎる**
```html
<!-- ✗ Bad: 10個以上の項目 -->
<ha-menu>
  <ha-menu-item>項目1</ha-menu-item>
  <ha-menu-item>項目2</ha-menu-item>
  <!-- ... 項目が12個も続く ... -->
  <ha-menu-item>項目12</ha-menu-item>
</ha-menu>
```
代替案: カテゴリーでグループ化するか、複数のメニューに分割してください。

**2. 危険な操作を上部に配置**
```html
<!-- ✗ Bad: 削除が上部 -->
<ha-menu>
  <ha-menu-item>🗑️ 削除</ha-menu-item>
  <ha-menu-divider></ha-menu-divider>
  <ha-menu-item>編集</ha-menu-item>
  <ha-menu-item>複製</ha-menu-item>
</ha-menu>
```
代替案: 削除などの破壊的アクションは常に下部に配置してください。

**3. 曖昧なラベル**
```html
<!-- ✗ Bad: 不明確 -->
<ha-menu>
  <ha-menu-item>実行</ha-menu-item>
  <ha-menu-item>処理</ha-menu-item>
  <ha-menu-item>操作</ha-menu-item>
</ha-menu>
```
代替案: 具体的な動詞を使用してください（「プロジェクトを削除」「ファイルをエクスポート」など）。

**4. ボタンにイベントハンドラーを持つリンク**
```html
<!-- ✗ Bad: href とイベントハンドラーの混在 -->
<ha-menu-item href="/edit" @click="handleClick">編集</ha-menu-item>
```
代替案: リンクの場合はhrefのみ、アクションの場合はイベントハンドラーのみを使用してください。

**5. 無効化されたアイテムに説明がない**
```html
<!-- ✗ Bad: なぜ無効かわからない -->
<ha-menu>
  <ha-menu-item disabled>共有</ha-menu-item>
</ha-menu>
```
代替案: ツールチップやラベルで理由を説明してください（「共有（権限がありません）」など）。

**6. トリガーボタンの内容が不明確**
```html
<!-- ✗ Bad: 何のメニューか不明 -->
<ha-dropdown>
  <ha-button slot="trigger">⋮</ha-button>
  <ha-menu>...</ha-menu>
</ha-dropdown>
```
代替案: アクセシブルなラベルを追加してください：
```html
<!-- ✓ Good: aria-label で説明 -->
<ha-dropdown>
  <ha-button slot="trigger" aria-label="アクションメニュー">⋮</ha-button>
  <ha-menu>...</ha-menu>
</ha-dropdown>
```

## FAQ（よくある質問）

### Q1: メニューを開いたままにする方法は？

**A**: `open`プロパティを使用して、メニューの開閉状態を制御できます。

```tsx
import { Dropdown, Menu, MenuItem, Button } from '@hidearea-design/react';
import { useState } from 'react';

function PersistentMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (e: CustomEvent) => {
    // メニューを開いたままにする場合は、状態を変更しない
    console.log('選択されました');
  };

  return (
    <Dropdown open={isOpen} onOpenChange={(e) => setIsOpen(e.detail.open)}>
      <Button slot="trigger">メニュー</Button>
      <Menu>
        <MenuItem onSelect={handleItemClick}>項目1</MenuItem>
        <MenuItem onSelect={handleItemClick}>項目2</MenuItem>
      </Menu>
    </Dropdown>
  );
}
```

**Vue での例**:
```vue
<template>
  <HaDropdown :open="isOpen" @open-change="handleOpenChange">
    <HaButton slot="trigger">メニュー</HaButton>
    <HaMenu>
      <HaMenuItem @select="handleItemClick">項目1</HaMenuItem>
      <HaMenuItem @select="handleItemClick">項目2</HaMenuItem>
    </HaMenu>
  </HaDropdown>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const handleOpenChange = (e) => {
  isOpen.value = e.detail.open;
};

const handleItemClick = () => {
  console.log('選択されました');
  // isOpen.value を false にしなければ開いたまま
};
</script>
```

### Q2: メニューアイテムに確認ダイアログを追加する方法は？

**A**: `select`イベントで確認ダイアログを表示できます。

```tsx
import { Dropdown, Menu, MenuItem, Button } from '@hidearea-design/react';

function MenuWithConfirmation() {
  const handleDelete = async () => {
    const confirmed = window.confirm('本当に削除しますか?');
    if (confirmed) {
      // 削除処理
      console.log('削除されました');
    }
  };

  return (
    <Dropdown>
      <Button slot="trigger">アクション</Button>
      <Menu>
        <MenuItem onSelect={() => console.log('編集')}>編集</MenuItem>
        <MenuItem onSelect={() => console.log('複製')}>複製</MenuItem>
        <MenuItem onSelect={handleDelete}>🗑️ 削除</MenuItem>
      </Menu>
    </Dropdown>
  );
}
```

### Q3: メニュー内にカスタムコンテンツを配置する方法は？

**A**: `ha-menu`内に任意のHTML要素を配置できます。

```html
<ha-dropdown>
  <ha-button slot="trigger">通知</ha-button>
  <ha-menu style="min-width: 300px; padding: 0;">
    <!-- ヘッダー -->
    <div style="padding: 12px 16px; border-bottom: 1px solid var(--color-border-default);">
      <strong>通知</strong>
    </div>

    <!-- 通知項目 -->
    <ha-menu-item>
      <div>
        <strong>新しいメッセージ</strong>
        <p style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0;">
          田中さんからメッセージが届きました
        </p>
      </div>
    </ha-menu-item>

    <ha-menu-item>
      <div>
        <strong>タスク完了</strong>
        <p style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0;">
          プロジェクトAのタスクが完了しました
        </p>
      </div>
    </ha-menu-item>

    <!-- フッター -->
    <div style="padding: 12px 16px; border-top: 1px solid var(--color-border-default); text-align: center;">
      <a href="/notifications">すべての通知を見る</a>
    </div>
  </ha-menu>
</ha-dropdown>
```

**React での例**:
```tsx
import { Dropdown, Menu, MenuItem, Button } from '@hidearea-design/react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
}

function NotificationMenu() {
  const notifications: Notification[] = [
    { id: 1, title: '新しいメッセージ', message: '田中さんからメッセージが届きました', time: '5分前' },
    { id: 2, title: 'タスク完了', message: 'プロジェクトAのタスクが完了しました', time: '10分前' },
  ];

  return (
    <Dropdown>
      <Button slot="trigger">🔔 通知 ({notifications.length})</Button>
      <Menu style={{ minWidth: '320px', padding: '0' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border-default)' }}>
          <strong>通知</strong>
        </div>

        {notifications.map((notification) => (
          <MenuItem key={notification.id} onSelect={() => console.log(notification.id)}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{notification.title}</strong>
                <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  {notification.time}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
                {notification.message}
              </p>
            </div>
          </MenuItem>
        ))}

        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border-default)', textAlign: 'center' }}>
          <a href="/notifications">すべての通知を見る →</a>
        </div>
      </Menu>
    </Dropdown>
  );
}
```

### Q4: メニューをプログラムで開閉する方法は？

**A**: `open`プロパティと状態管理を使用します。

```tsx
import { Dropdown, Menu, MenuItem, Button } from '@hidearea-design/react';
import { useState, useRef } from 'react';

function ProgrammaticMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={openMenu}>メニューを開く</button>
      <button onClick={closeMenu}>メニューを閉じる</button>
      <button onClick={toggleMenu}>メニューを切り替え</button>

      <Dropdown open={isOpen} onOpenChange={(e) => setIsOpen(e.detail.open)}>
        <Button slot="trigger">メニュー</Button>
        <Menu>
          <MenuItem onSelect={() => console.log('項目1')}>項目1</MenuItem>
          <MenuItem onSelect={() => console.log('項目2')}>項目2</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
}
```

**Vue での例**:
```vue
<template>
  <div>
    <button @click="openMenu">メニューを開く</button>
    <button @click="closeMenu">メニューを閉じる</button>
    <button @click="toggleMenu">メニューを切り替え</button>

    <HaDropdown :open="isOpen" @open-change="handleOpenChange">
      <HaButton slot="trigger">メニュー</HaButton>
      <HaMenu>
        <HaMenuItem @select="handleSelect">項目1</HaMenuItem>
        <HaMenuItem @select="handleSelect">項目2</HaMenuItem>
      </HaMenu>
    </HaDropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const openMenu = () => { isOpen.value = true; };
const closeMenu = () => { isOpen.value = false; };
const toggleMenu = () => { isOpen.value = !isOpen.value; };

const handleOpenChange = (e) => {
  isOpen.value = e.detail.open;
};

const handleSelect = (item) => {
  console.log('選択:', item);
};
</script>
```

### Q5: メニューアイテムにバッジや状態インジケーターを追加する方法は?

**A**: メニューアイテム内にBadgeコンポーネントや任意のHTML要素を配置できます。

```tsx
import { Dropdown, Menu, MenuItem, Button, Badge } from '@hidearea-design/react';

function MenuWithBadges() {
  return (
    <Dropdown>
      <Button slot="trigger">ナビゲーション</Button>
      <Menu>
        <MenuItem>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span>メッセージ</span>
            <Badge variant="danger" size="sm">5</Badge>
          </div>
        </MenuItem>

        <MenuItem>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span>通知</span>
            <Badge variant="primary" size="sm">12</Badge>
          </div>
        </MenuItem>

        <MenuItem>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span>タスク</span>
            <Badge variant="success" size="sm">完了</Badge>
          </div>
        </MenuItem>

        <MenuItem>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span>設定</span>
          </div>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
```

## 関連コンポーネント

- [Button](/components/button) - メニューのトリガーとして使用
- [Tooltip](/components/tooltip) - メニューアイテムに追加情報を表示
- [Badge](/components/badge) - メニューアイテムに状態や数値を表示
- [Card](/components/card) - メニューを含むカード型のUI

## APIリファレンス

### ha-dropdown

```typescript
interface DropdownProps {
  /**
   * メニューの配置位置
   * @default 'bottom-start'
   */
  placement?:
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';

  /**
   * メニューの開閉状態
   * @default false
   */
  open?: boolean;

  /**
   * トリガーとメニューの距離（ピクセル）
   * @default 4
   */
  distance?: number;

  /**
   * メニューが画面外に出る場合に自動調整するか
   * @default true
   */
  flip?: boolean;

  /**
   * メニューがトリガーに収まるように幅を調整するか
   * @default false
   */
  sameWidth?: boolean;
}

interface DropdownEvents {
  /**
   * メニューの開閉状態が変更された時に発火
   */
  'open-change': CustomEvent<{ open: boolean }>;
}

interface DropdownSlots {
  /**
   * トリガー要素（ボタンなど）
   */
  trigger: HTMLElement;

  /**
   * メニューコンテンツ（ha-menu）
   */
  default: HTMLElement;
}
```

### ha-menu

```typescript
interface MenuProps {
  /**
   * メニューのロール
   * @default 'menu'
   */
  role?: 'menu' | 'listbox';
}

interface MenuEvents {
  /**
   * メニューアイテムが選択された時に発火
   */
  select: CustomEvent<{ value?: string }>;
}
```

### ha-menu-item

```typescript
interface MenuItemProps {
  /**
   * メニューアイテムの値
   */
  value?: string;

  /**
   * リンク先URL（設定するとaタグとして動作）
   */
  href?: string;

  /**
   * リンクのターゲット
   * @default '_self'
   */
  target?: '_self' | '_blank' | '_parent' | '_top';

  /**
   * 無効状態
   * @default false
   */
  disabled?: boolean;

  /**
   * 現在のページであることを示す
   * @default false
   */
  current?: boolean;
}

interface MenuItemEvents {
  /**
   * メニューアイテムが選択された時に発火
   */
  select: CustomEvent<{ value?: string }>;
}
```

### ha-menu-divider

```typescript
interface MenuDividerProps {
  // プロパティなし
}
```

## トラブルシューティング

### 問題1: メニューが画面外に表示される

**問題**: メニューが画面の端で切れたり、スクロールバーの外に表示される

**原因**:
- `flip`プロパティが無効になっている
- 親要素に`overflow: hidden`が設定されている
- Z-indexの問題

**解決策**:
```html
<!-- flip を有効にする（デフォルトで有効） -->
<ha-dropdown placement="bottom-start" flip>
  <ha-button slot="trigger">メニュー</ha-button>
  <ha-menu>
    <ha-menu-item>項目1</ha-menu-item>
  </ha-menu>
</ha-dropdown>

<!-- Z-indexを調整 -->
<style>
  ha-dropdown {
    --dropdown-z-index: 9999;
  }
</style>

<!-- 親要素の overflow を調整 -->
<style>
  .parent {
    overflow: visible; /* hidden の代わりに visible を使用 */
  }
</style>
```

### 問題2: メニューアイテムのクリックが反応しない

**問題**: メニューアイテムをクリックしても何も起こらない

**原因**:
- イベントリスナーが正しく設定されていない
- アイテムが無効化されている
- イベント伝播が止められている

**解決策**:
```tsx
// React: onSelect を使用
<MenuItem onSelect={() => console.log('clicked')}>項目</MenuItem>

// Vue: @select を使用
<HaMenuItem @select="handleSelect">項目</HaMenuItem>

// 無効状態を確認
<ha-menu-item disabled={false}>項目</ha-menu-item>

// イベント伝播を確認
const handleSelect = (e: CustomEvent) => {
  // e.stopPropagation() を削除
  console.log('選択されました');
};
```

### 問題3: メニューがトリガーボタンと位置がずれる

**問題**: メニューの配置がトリガーボタンとずれている

**原因**:
- CSS transformが親要素に適用されている
- positioningの基準要素が異なる
- `distance`プロパティの値が大きすぎる

**解決策**:
```html
<!-- distance を調整 -->
<ha-dropdown distance="4">
  <ha-button slot="trigger">メニュー</ha-button>
  <ha-menu>
    <ha-menu-item>項目</ha-menu-item>
  </ha-menu>
</ha-dropdown>

<!-- トリガーと同じ幅にする -->
<ha-dropdown same-width>
  <ha-button slot="trigger">メニュー</ha-button>
  <ha-menu>
    <ha-menu-item>項目</ha-menu-item>
  </ha-menu>
</ha-dropdown>

<style>
  /* 親要素の transform を確認 */
  .parent {
    /* transform を削除または will-change に変更 */
    will-change: transform;
  }
</style>
```

### 問題4: キーボードナビゲーションが動作しない

**問題**: 矢印キーでメニューアイテム間を移動できない

**原因**:
- カスタムキーイベントハンドラーがデフォルト動作を妨げている
- フォーカス管理が正しく設定されていない
- メニューアイテムにtabindex属性が正しく設定されていない

**解決策**:
```tsx
// カスタムキーハンドラーを削除または修正
function Menu() {
  const handleKeyDown = (e: KeyboardEvent) => {
    // デフォルトの動作を妨げない
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      // カスタム処理
    }
  };

  return (
    <Dropdown>
      <Button slot="trigger">メニュー</Button>
      <Menu onKeyDown={handleKeyDown}>
        <MenuItem>項目1</MenuItem>
        <MenuItem>項目2</MenuItem>
      </Menu>
    </Dropdown>
  );
}

// フォーカス可能な要素を確認
<ha-menu>
  <ha-menu-item tabindex="0">項目1</ha-menu-item> <!-- 最初の項目 -->
  <ha-menu-item tabindex="-1">項目2</ha-menu-item>
  <ha-menu-item tabindex="-1">項目3</ha-menu-item>
</ha-menu>
```
