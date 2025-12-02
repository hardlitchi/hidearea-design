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

## キーボード操作

- `Enter/Space`: メニューを開く
- `↑/↓`: メニュー項目を移動
- `Home`: 最初の項目に移動
- `End`: 最後の項目に移動
- `Esc`: メニューを閉じる
- `Enter`: 項目を選択

## アクセシビリティ

- `role="menu"` がメニューに設定されます
- `role="menuitem"` が各項目に設定されます
- `aria-haspopup="true"` がトリガーに設定されます
- `aria-expanded` でメニューの開閉状態が管理されます
- `aria-disabled` で無効状態が管理されます
- キーボードナビゲーションに完全対応

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-menu {
  --menu-bg: var(--color-white);
  --menu-border-color: var(--color-gray-200);
  --menu-border-radius: 8px;
  --menu-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --menu-padding: 8px;
  --menu-min-width: 180px;
  --menu-max-width: 320px;
}

ha-menu-item {
  --menu-item-padding: 8px 12px;
  --menu-item-font-size: 14px;
  --menu-item-hover-bg: var(--color-gray-50);
  --menu-item-active-bg: var(--color-gray-100);
}
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

1. **項目は5-7個以内**: 多すぎる場合はサブメニューやグループ化を検討
2. **危険な操作は下部**: 削除などは区切り線で分離して下部に配置
3. **アイコンで視認性向上**: 重要な項目にはアイコンを付ける
4. **キーボードショートカット表示**: 対応する場合は右側に表示
5. **一貫性**: サイト全体で同じ配置とスタイルを使用
