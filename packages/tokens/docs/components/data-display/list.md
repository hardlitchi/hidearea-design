# List (リスト) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/css/components/data-display/list-container.css`, `list-item.css`, `list-divider.css`
**ステータス:** ✅ 実装済み

---

## 概要

Listコンポーネントは、項目を縦に並べて表示する基本的なUIパターンを提供します。
3つのサブコンポーネント（container, item, divider）で構成され、
インタラクティブなリスト、区切り線付きリスト、密度調整などの機能をサポートします。

### 用途

- ナビゲーションメニュー
- 設定オプションの一覧
- ファイル/フォルダのリスト
- 関連項目のグループ表示

---

## サブコンポーネント

### 1. List Container (ha-list)

リスト項目を格納するコンテナです。区切り線やボーダーなどのバリアントを制御します。

### 2. List Item (ha-list-item)

個々のリスト項目です。プレフィックス（アイコンなど）、コンテンツ、サフィックスの3つのスロットを持ちます。

### 3. List Divider (ha-list-divider)

リスト項目間の視覚的な区切り線です。

---

## 機能

### Interactive Items (インタラクティブ項目)

クリック可能な項目。ホバー、アクティブ、選択状態をサポートします。

### Dividers (区切り線)

項目間に区切り線を表示し、視覚的なグループ化を提供します。

### Dense/Comfortable Spacing (密度調整)

項目の高さとパディングを調整できます（コンパクト/デフォルト/快適）。

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- シンプルなリスト -->
<ha-list>
  <ha-list-item>
    <div class="list-item">
      <div class="list-item__content">ホーム</div>
    </div>
  </ha-list-item>
  <ha-list-item>
    <div class="list-item">
      <div class="list-item__content">プロフィール</div>
    </div>
  </ha-list-item>
  <ha-list-item>
    <div class="list-item">
      <div class="list-item__content">設定</div>
    </div>
  </ha-list-item>
</ha-list>

<!-- アイコン付きリスト -->
<ha-list>
  <ha-list-item interactive>
    <div class="list-item">
      <div class="list-item__prefix">
        <svg>...</svg>
      </div>
      <div class="list-item__content">ドキュメント</div>
    </div>
  </ha-list-item>
  <ha-list-item interactive>
    <div class="list-item">
      <div class="list-item__prefix">
        <svg>...</svg>
      </div>
      <div class="list-item__content">画像</div>
    </div>
  </ha-list-item>
</ha-list>

<!-- 区切り線付きリスト -->
<ha-list variant="divided">
  <ha-list-item>項目 1</ha-list-item>
  <ha-list-divider></ha-list-divider>
  <ha-list-item>項目 2</ha-list-item>
  <ha-list-divider></ha-list-divider>
  <ha-list-item>項目 3</ha-list-item>
</ha-list>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/list.css">
</head>
<body>
  <!-- シンプルなリスト -->
  <div class="ha-list" role="list" aria-label="ナビゲーションメニュー">
    <div class="list">
      <div class="ha-list-item" role="listitem">
        <div class="list-item">
          <div class="list-item__content">ホーム</div>
        </div>
      </div>
      <div class="ha-list-item" role="listitem">
        <div class="list-item">
          <div class="list-item__content">プロフィール</div>
        </div>
      </div>
      <div class="ha-list-item" role="listitem">
        <div class="list-item">
          <div class="list-item__content">設定</div>
        </div>
      </div>
    </div>
  </div>

  <!-- アイコン付きインタラクティブリスト -->
  <div class="ha-list ha-list--hoverable" role="list">
    <div class="list">
      <div class="ha-list-item" role="listitem" tabindex="0" interactive>
        <div class="list-item">
          <div class="list-item__prefix">
            <svg width="20" height="20">...</svg>
          </div>
          <div class="list-item__content">
            <div>ドキュメント</div>
          </div>
          <div class="list-item__suffix">
            <svg width="16" height="16">...</svg>
          </div>
        </div>
      </div>
      <div class="ha-list-item" role="listitem" tabindex="0" interactive>
        <div class="list-item">
          <div class="list-item__prefix">
            <svg width="20" height="20">...</svg>
          </div>
          <div class="list-item__content">
            <div>画像</div>
          </div>
          <div class="list-item__suffix">
            <svg width="16" height="16">...</svg>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 区切り線付きリスト -->
  <div class="ha-list ha-list--divided" role="list">
    <div class="list list--divided">
      <div class="ha-list-item" role="listitem">
        <div class="list-item">
          <div class="list-item__content">プロジェクト設定</div>
        </div>
      </div>
      <div class="ha-list-divider">
        <div class="list-divider"></div>
      </div>
      <div class="ha-list-item" role="listitem">
        <div class="list-item">
          <div class="list-item__content">チーム管理</div>
        </div>
      </div>
      <div class="ha-list-divider">
        <div class="list-divider"></div>
      </div>
      <div class="ha-list-item" role="listitem">
        <div class="list-item">
          <div class="list-item__content">セキュリティ</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 選択可能リスト -->
  <div class="ha-list" role="list" aria-label="ファイル一覧">
    <div class="list">
      <div class="ha-list-item" role="listitem" tabindex="0" interactive selected aria-selected="true">
        <div class="list-item">
          <div class="list-item__prefix">
            <svg width="20" height="20">...</svg>
          </div>
          <div class="list-item__content">README.md</div>
        </div>
      </div>
      <div class="ha-list-item" role="listitem" tabindex="0" interactive>
        <div class="list-item">
          <div class="list-item__prefix">
            <svg width="20" height="20">...</svg>
          </div>
          <div class="list-item__content">package.json</div>
        </div>
      </div>
      <div class="ha-list-item" role="listitem" tabindex="0" interactive disabled>
        <div class="list-item list-item--disabled">
          <div class="list-item__prefix">
            <svg width="20" height="20">...</svg>
          </div>
          <div class="list-item__content">node_modules (無効)</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import { listStyles } from '@hidearea-design/tokens/styles/list';

// React例
function List({ items, onItemClick, selectedId }) {
  return (
    <div className="ha-list" role="list">
      <div className="list">
        {items.map((item) => (
          <div
            key={item.id}
            className="ha-list-item"
            role="listitem"
            tabIndex={0}
            onClick={() => onItemClick(item)}
            aria-selected={item.id === selectedId}
            {...(item.id === selectedId ? { selected: true } : {})}
            {...(item.interactive ? { interactive: true } : {})}
          >
            <div className="list-item">
              {item.icon && (
                <div className="list-item__prefix">
                  {item.icon}
                </div>
              )}
              <div className="list-item__content">
                {item.label}
              </div>
              {item.badge && (
                <div className="list-item__suffix">
                  {item.badge}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 使用例
<List
  items={[
    { id: 1, label: 'ホーム', icon: <HomeIcon />, interactive: true },
    { id: 2, label: 'プロフィール', icon: <ProfileIcon />, interactive: true },
    { id: 3, label: '設定', icon: <SettingsIcon />, badge: '3', interactive: true }
  ]}
  selectedId={1}
  onItemClick={(item) => console.log('Clicked:', item)}
/>
```

---

## 属性

### List Container

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | - | - | コンテナのバリアント（クラスで指定） |

### List Item

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `interactive` | - | - | インタラクティブ項目として機能 |
| `selected` | - | - | 選択状態 |
| `disabled` | - | - | 無効状態 |

### クラス修飾子

| クラス | 説明 |
|--------|------|
| `.ha-list--divided` | 区切り線付きリスト |
| `.ha-list--bordered` | ボーダー付きリスト |
| `.ha-list--hoverable` | ホバー可能リスト |

---

## CSS変数

Listコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### コンテナ
- `--component-list-container-background` - リストの背景色
- `--component-list-container-padding` - リストのパディング
- `--component-list-container-borderRadius` - リストの角丸 (0.375rem)
- `--component-list-container-gap` - 項目間の間隔

### 項目
- `--component-list-item-padding-vertical-default` - 縦パディング（デフォルト）
- `--component-list-item-padding-horizontal` - 横パディング
- `--component-list-item-background-default` - デフォルト背景色
- `--component-list-item-background-hover` - ホバー時背景色
- `--component-list-item-background-active` - アクティブ時背景色
- `--component-list-item-background-selected` - 選択時背景色
- `--component-list-item-text-default` - テキストカラー
- `--component-list-item-fontSize-default` - フォントサイズ
- `--component-list-item-lineHeight` - 行の高さ
- `--component-list-item-border-radius` - 項目の角丸

### アイコン
- `--component-list-icon-size-default` - アイコンサイズ (デフォルト)
- `--component-list-icon-color-default` - アイコンカラー (デフォルト)
- `--component-list-icon-gap` - アイコンとテキストの間隔

### 区切り線
- `--component-list-divider-color` - 区切り線の色
- `--component-list-divider-width` - 区切り線の幅
- `--component-list-divider-margin-vertical` - 区切り線の上下マージン

### インタラクティブ状態
- `--component-list-interactive-cursor` - pointer
- `--component-list-interactive-transition-duration` - トランジション時間
- `--component-list-interactive-transition-timing` - トランジションイージング
- `--component-list-interactive-transition-properties` - トランジションプロパティ

### 無効状態
- `--component-list-disabled-opacity` - 0.5
- `--component-list-disabled-cursor` - not-allowed

### フォーカスリング
- `--component-list-focus-ring-width` - 2px
- `--component-list-focus-ring-offset` - 2px
- `--component-list-focus-ring-color` - フォーカスリングの色

---

## アクセシビリティ

### ARIA属性

適切なrole属性とaria属性を使用します:

```html
<!-- 基本的なリスト -->
<div class="ha-list" role="list" aria-label="ナビゲーションメニュー">
  <div class="list">
    <div class="ha-list-item" role="listitem">
      <div class="list-item">
        <div class="list-item__content">ホーム</div>
      </div>
    </div>
  </div>
</div>

<!-- 選択可能リスト -->
<div class="ha-list" role="list" aria-label="ファイル一覧">
  <div class="list">
    <div class="ha-list-item"
         role="listitem"
         tabindex="0"
         interactive
         selected
         aria-selected="true">
      <div class="list-item">
        <div class="list-item__content">README.md</div>
      </div>
    </div>
    <div class="ha-list-item"
         role="listitem"
         tabindex="0"
         interactive
         aria-selected="false">
      <div class="list-item">
        <div class="list-item__content">package.json</div>
      </div>
    </div>
  </div>
</div>

<!-- 無効項目 -->
<div class="ha-list-item"
     role="listitem"
     tabindex="-1"
     interactive
     disabled
     aria-disabled="true">
  <div class="list-item list-item--disabled">
    <div class="list-item__content">無効な項目</div>
  </div>
</div>
```

### キーボード操作

- **Tab / Shift+Tab**: リスト項目間のフォーカス移動
- **Enter / Space**: インタラクティブ項目の選択
- **Arrow Up / Arrow Down**: 項目間の移動（実装により）

### フォーカス管理

```javascript
// キーボードナビゲーションの実装例
const listItems = document.querySelectorAll('[interactive]');

listItems.forEach((item, index) => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = listItems[index + 1];
      if (next) next.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = listItems[index - 1];
      if (prev) prev.focus();
    }
  });
});
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切なrole属性の使用**
   - `role="list"`と`role="listitem"`を設定

2. **インタラクティブ項目にはtabindex**
   - キーボードナビゲーションを有効にする

3. **選択状態の明示**
   - `aria-selected`属性で選択状態を示す

4. **アイコンと区切り線の適切な使用**
   - 視覚的な識別を容易にする

```html
<!-- 適切な実装 -->
<div class="ha-list" role="list" aria-label="ファイル一覧">
  <div class="list">
    <div class="ha-list-item" role="listitem" tabindex="0" interactive>
      <div class="list-item">
        <div class="list-item__prefix">
          <svg width="20" height="20">...</svg>
        </div>
        <div class="list-item__content">README.md</div>
      </div>
    </div>
  </div>
</div>
```

### ❌ 非推奨

1. **role属性の省略**
   - アクセシビリティを損なう

2. **インタラクティブ項目にtabindexなし**
   - キーボード操作不可

3. **大量データを一度にレンダリング**
   - パフォーマンスの問題

```html
<!-- 不適切な実装 -->
<div class="ha-list">
  <div class="list">
    <div class="ha-list-item" interactive>
      <!-- tabindex, role, aria属性なし -->
      <div class="list-item">
        <div class="list-item__content">項目</div>
      </div>
    </div>
  </div>
</div>
```

---

## パフォーマンス

大量の項目（100+）を表示する場合は、以下を検討してください:

1. **仮想スクロール**: 表示されている項目のみをレンダリング
2. **ページネーション**: 項目を複数ページに分割
3. **遅延読み込み**: スクロール時に項目を追加読み込み

---

## テーマ対応

全てのListトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-list" role="list">
    <div class="list">
      <div class="ha-list-item" role="listitem" interactive>
        <div class="list-item">
          <div class="list-item__content">ホーム</div>
        </div>
      </div>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-list" role="list">
    <div class="list">
      <div class="ha-list-item" role="listitem" interactive>
        <div class="list-item">
          <div class="list-item__content">ホーム</div>
        </div>
      </div>
    </div>
  </div>
</html>
```

---

## 関連コンポーネント

- [Menu](../navigation/menu.md) - ドロップダウンメニュー
- [Navigation](../navigation/navigation.md) - ナビゲーションバー
- [Table](./table.md) - 表形式のデータ表示
- [Card](./card.md) - カード形式の表示

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)

---

**最終更新:** 2025-12-12
