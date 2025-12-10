# Tabs (タブ) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/components/navigation/tabs.yaml`
**ステータス:** ✅ 実装済み (Phase 4 Option C)

---

## 概要

タブコンポーネントは、関連するコンテンツを複数のパネルに整理し、ユーザーが簡単に切り替えられるようにするナビゲーション要素です。3つのバリアント（line, enclosed, soft）と、複数のサイズ（small, default, large）をサポートしています。

### 用途

- 設定画面の複数のセクション
- プロダクト情報の異なるビュー（概要、仕様、レビュー）
- ダッシュボードの異なるデータビュー
- ドキュメントの異なるセクション

---

## バリアント

### 1. Line (ライン) - デフォルト

最も一般的なタブスタイル。アクティブなタブの下部に2pxのインジケーターラインが表示されます。

**使用場面:**
- 標準的なタブナビゲーション
- コンテンツの切り替え
- 設定画面

**特徴:**
- 下部ボーダーでタブリストを区切る
- アクティブタブに下線インジケーター

### 2. Enclosed (囲み型)

タブがコンテナに囲まれたスタイル。アクティブなタブがコンテンツと視覚的に繋がります。

**使用場面:**
- カード内のタブ
- より明確な区切りが必要な場合

**特徴:**
- ボーダーで囲まれたタブ
- アクティブタブの下ボーダーが消えてコンテンツと繋がる

### 3. Soft (ソフトラウンド)

丸みのある背景色でアクティブ状態を表現するスタイル。

**使用場面:**
- モダンなUI
- 控えめなタブナビゲーション

**特徴:**
- 角丸の背景色
- ソフトな見た目

---

## サイズバリアント

### Small (小)

コンパクトなスペースに適したサイズ。

- パディング: 水平 0.75rem / 垂直 0.5rem
- フォントサイズ: 0.75rem (12px)
- アイコンサイズ: 0.75rem

### Default (デフォルト)

標準的なサイズ。

- パディング: 水平 1rem / 垂直 0.75rem
- フォントサイズ: 0.875rem (14px)
- アイコンサイズ: 1rem

### Large (大)

大きめのタッチターゲットが必要な場合に適したサイズ。

- パディング: 水平 1.25rem / 垂直 1rem
- フォントサイズ: 1rem (16px)
- アイコンサイズ: 1.25rem

---

## トークン一覧

### コンテナ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.container.background` | `{background.primary}` | タブコンテナの背景色 |
| `component.tabs.container.borderBottom` | `1px solid {border.default}` | タブリストの下ボーダー |
| `component.tabs.container.gap` | `{spacing.1}` | タブ間の間隔 (0.25rem) |

### タブアイテム

#### テキスト色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.tab.text.default` | `{foreground.secondary}` | デフォルトのテキスト色 |
| `component.tabs.tab.text.hover` | `{foreground.primary}` | ホバー時のテキスト色 |
| `component.tabs.tab.text.active` | `{primary.active}` | アクティブタブのテキスト色 |
| `component.tabs.tab.text.disabled` | `{foreground.tertiary}` | 無効状態のテキスト色 |

#### 背景色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.tab.background.default` | `transparent` | デフォルトの背景色 |
| `component.tabs.tab.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.tabs.tab.background.active` | `transparent` | アクティブタブの背景色 |

#### タイポグラフィ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.tab.fontSize` | `{font.size.sm}` | タブのフォントサイズ |
| `component.tabs.tab.fontWeight.default` | `{font.weight.medium}` | デフォルトのフォントウェイト |
| `component.tabs.tab.fontWeight.active` | `{font.weight.semibold}` | アクティブタブのフォントウェイト |
| `component.tabs.tab.lineHeight` | `{font.lineHeight.normal}` | タブの行高 |

#### パディング

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.tab.padding.horizontal` | `{spacing.4}` | タブの水平パディング (1rem) |
| `component.tabs.tab.padding.vertical` | `{spacing.3}` | タブの垂直パディング (0.75rem) |

### アクティブインジケーター

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.tab.indicator.height` | `2px` | インジケーターの高さ |
| `component.tabs.tab.indicator.color` | `{primary.default}` | インジケーターの色 |

### アイコン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.icon.size` | `{spacing.4}` | アイコンのサイズ (1rem) |
| `component.tabs.icon.gap` | `{spacing.2}` | アイコンとテキストの間隔 |
| `component.tabs.icon.color.default` | `{foreground.tertiary}` | デフォルトのアイコン色 |
| `component.tabs.icon.color.active` | `{primary.default}` | アクティブタブのアイコン色 |

### バッジ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.badge.size` | `{spacing.5}` | バッジのサイズ (1.25rem) |
| `component.tabs.badge.fontSize` | `{font.size.xs}` | バッジのフォントサイズ |
| `component.tabs.badge.background` | `{error.default}` | バッジの背景色 |
| `component.tabs.badge.text` | `{foreground.inverse}` | バッジのテキスト色 |
| `component.tabs.badge.marginLeft` | `{spacing.2}` | バッジの左マージン |

### タブパネル

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.panel.padding` | `{spacing.6}` | タブパネルのパディング (1.5rem) |
| `component.tabs.panel.background` | `{background.primary}` | タブパネルの背景色 |

### トランジション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.tabs.transition.duration` | `{animation.duration.fast}` | トランジションの持続時間 |
| `component.tabs.transition.timing` | `{animation.easing.ease}` | トランジションのイージング |
| `component.tabs.transition.properties` | `color, background-color, border-color` | トランジション対象 |

---

## 使用例

### HTML

```html
<!-- 基本的なタブ -->
<div class="tabs">
  <div class="tabs-list" role="tablist">
    <button class="tab tab-active" role="tab" aria-selected="true" aria-controls="panel-1">
      概要
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="panel-2">
      ドキュメント
    </button>
    <button class="tab" role="tab" aria-selected="false" aria-controls="panel-3">
      設定
    </button>
  </div>

  <div class="tab-panels">
    <div class="tab-panel tab-panel-active" id="panel-1" role="tabpanel">
      <p>概要タブの内容</p>
    </div>
    <div class="tab-panel" id="panel-2" role="tabpanel" hidden>
      <p>ドキュメントタブの内容</p>
    </div>
    <div class="tab-panel" id="panel-3" role="tabpanel" hidden>
      <p>設定タブの内容</p>
    </div>
  </div>
</div>

<!-- アイコンとバッジ付きタブ -->
<div class="tabs">
  <div class="tabs-list" role="tablist">
    <button class="tab tab-active" role="tab">
      <span class="tab-icon">🏠</span>
      <span>ホーム</span>
      <span class="tab-badge">5</span>
    </button>
    <button class="tab" role="tab">
      <span class="tab-icon">📧</span>
      <span>メッセージ</span>
      <span class="tab-badge">12</span>
    </button>
    <button class="tab" role="tab">
      <span class="tab-icon">⚙️</span>
      <span>設定</span>
    </button>
  </div>
</div>
```

### CSS

```css
.tabs {
  width: 100%;
}

.tabs-list {
  display: flex;
  gap: var(--component-tabs-container-gap);
  border-bottom: var(--component-tabs-container-border-bottom);
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: var(--component-tabs-icon-gap);
  padding: var(--component-tabs-tab-padding-vertical)
           var(--component-tabs-tab-padding-horizontal);
  font-size: var(--component-tabs-tab-font-size);
  font-weight: var(--component-tabs-tab-font-weight-default);
  color: var(--component-tabs-tab-text-default);
  background: var(--component-tabs-tab-background-default);
  border: none;
  border-radius: var(--component-tabs-tab-border-radius);
  cursor: pointer;
  position: relative;
  transition: var(--component-tabs-transition-properties)
              var(--component-tabs-transition-duration)
              var(--component-tabs-transition-timing);
}

.tab:hover:not(:disabled) {
  color: var(--component-tabs-tab-text-hover);
  background: var(--component-tabs-tab-background-hover);
}

.tab-active {
  color: var(--component-tabs-tab-text-active);
  font-weight: var(--component-tabs-tab-font-weight-active);
}

.tab-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--component-tabs-tab-indicator-height);
  background-color: var(--component-tabs-tab-indicator-color);
}

.tab-panel {
  display: none;
  padding: var(--component-tabs-panel-padding);
}

.tab-panel-active {
  display: block;
}
```

### React

```tsx
import { useState } from 'react';

function Tabs({ items }: { items: Array<{ label: string; content: React.ReactNode }> }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist">
        {items.map((item, index) => (
          <button
            key={index}
            className={`tab ${activeIndex === index ? 'tab-active' : ''}`}
            role="tab"
            aria-selected={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="tab-panels">
        {items.map((item, index) => (
          <div
            key={index}
            className={`tab-panel ${activeIndex === index ? 'tab-panel-active' : ''}`}
            role="tabpanel"
            hidden={activeIndex !== index}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## アクセシビリティ

### ARIA属性

- `role="tablist"`: タブリストコンテナに設定
- `role="tab"`: 各タブボタンに設定
- `role="tabpanel"`: 各タブパネルに設定
- `aria-selected`: タブの選択状態（true/false）
- `aria-controls`: タブが制御するパネルのIDを指定
- `hidden`: 非アクティブなパネルに設定

### キーボードナビゲーション

実装すべきキーボードショートカット：

- **←/→ (矢印キー)**: タブ間を移動
- **Home**: 最初のタブに移動
- **End**: 最後のタブに移動
- **Tab**: タブリストからパネルにフォーカス移動
- **Enter/Space**: タブを選択

### フォーカス管理

```javascript
// キーボードナビゲーションの実装例
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', (e) => {
  const currentTab = document.activeElement;
  const currentIndex = Array.from(tabs).indexOf(currentTab);

  let newIndex;

  switch(e.key) {
    case 'ArrowLeft':
      newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = tabs.length - 1;
      break;
    case 'ArrowRight':
      newIndex = currentIndex + 1;
      if (newIndex >= tabs.length) newIndex = 0;
      break;
    case 'Home':
      newIndex = 0;
      break;
    case 'End':
      newIndex = tabs.length - 1;
      break;
    default:
      return;
  }

  tabs[newIndex].focus();
  tabs[newIndex].click();
  e.preventDefault();
});
```

---

## ベストプラクティス

### タブの使用

1. **タブ数の制限**
   - 5-7個以内に抑える
   - それ以上の場合はドロップダウンメニューを検討

2. **ラベルの明確性**
   - 簡潔で分かりやすいラベル
   - 1-2単語が理想的

3. **順序**
   - 最も重要な内容を左端に配置
   - 論理的な順序で並べる

### 状態管理

1. **初期状態**
   - 常に1つのタブをアクティブに
   - デフォルトは最初のタブ

2. **URL同期**
   - URLハッシュやクエリパラメータでタブ状態を保存
   - ブラウザの戻る/進むに対応

```javascript
// URL同期の例
function activateTab(index) {
  // タブを切り替え
  setActiveTab(index);

  // URLを更新
  const tab = tabs[index];
  window.location.hash = tab.id;
}

// ページ読み込み時にURLから復元
window.addEventListener('load', () => {
  const hash = window.location.hash.slice(1);
  const tab = tabs.find(t => t.id === hash);
  if (tab) activateTab(tabs.indexOf(tab));
});
```

### パフォーマンス

1. **遅延読み込み**
   - タブパネルの内容を必要になるまで読み込まない

2. **コンテンツの保持**
   - 一度読み込んだタブ内容は保持する（display: noneで非表示）

---

## 関連コンポーネント

- **Navigation**: メインナビゲーションバー
- **Breadcrumb**: パンくずリスト
- **Menu**: ドロップダウンメニュー

---

## バリエーション

### 垂直タブ

```css
.tabs-vertical .tabs-list {
  flex-direction: column;
  border-bottom: none;
  border-right: var(--component-tabs-container-border-bottom);
}

.tabs-vertical .tab-active::after {
  bottom: auto;
  left: auto;
  right: 0;
  top: 0;
  bottom: 0;
  width: var(--component-tabs-tab-indicator-height);
  height: auto;
}
```

### アイコンオンリータブ

```html
<button class="tab tab-icon-only" aria-label="ホーム">
  <span class="tab-icon">🏠</span>
</button>
```

---

**最終更新:** 2025-12-10
**Phase 4 Option C で実装**
