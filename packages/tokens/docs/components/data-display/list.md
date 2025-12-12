# List コンポーネント

リスト形式でデータやコンテンツを表示するコンポーネントです。

## 概要

Listコンポーネントは、項目を縦に並べて表示する基本的なUIパターンを提供します。シンプルなテキストリストから、アイコン付きのインタラクティブなリストまで、様々な用途に対応できます。

## 基本的な使い方

```html
<ul class="list">
  <li class="list-item">リスト項目 1</li>
  <li class="list-item">リスト項目 2</li>
  <li class="list-item">リスト項目 3</li>
</ul>
```

## バリアント

### 密度オプション

リスト項目の高さとパディングを調整できます：

#### コンパクト
```html
<ul class="list list-compact">
  <li class="list-item">コンパクトな項目</li>
</ul>
```

#### デフォルト
```html
<ul class="list">
  <li class="list-item">通常の項目</li>
</ul>
```

#### 快適
```html
<ul class="list list-comfortable">
  <li class="list-item">ゆったりした項目</li>
</ul>
```

### インタラクティブリスト

クリック可能なリスト項目：

```html
<ul class="list">
  <li class="list-item list-item-interactive">
    <span class="list-item-icon">📄</span>
    <span class="list-item-text">クリック可能な項目</span>
  </li>
</ul>
```

### 区切り線付きリスト

項目間に区切り線を表示：

```html
<ul class="list list-divided">
  <li class="list-item">項目 1</li>
  <li class="list-item">項目 2</li>
  <li class="list-item">項目 3</li>
</ul>
```

### アイコン付きリスト

各項目の左側にアイコンを配置：

```html
<ul class="list">
  <li class="list-item">
    <span class="list-item-icon">📁</span>
    <span class="list-item-text">フォルダ</span>
  </li>
  <li class="list-item">
    <span class="list-item-icon">📄</span>
    <span class="list-item-text">ドキュメント</span>
  </li>
</ul>
```

## デザイントークン

### コンテナ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.list.container.background` | `{background.primary}` | リストの背景色 |
| `component.list.container.padding` | `0` | リストのパディング |
| `component.list.container.borderRadius` | `{border.radius.md}` | リストの角丸 (0.375rem) |

### 項目

#### パディング（密度別）
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.list.item.padding.vertical.compact` | `{spacing.2}` | コンパクト縦パディング (0.5rem) |
| `component.list.item.padding.vertical.default` | `{spacing.3}` | デフォルト縦パディング (0.75rem) |
| `component.list.item.padding.vertical.comfortable` | `{spacing.4}` | 快適な縦パディング (1rem) |
| `component.list.item.padding.horizontal` | `{spacing.4}` | 水平パディング (1rem) |

#### 背景色
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.list.item.background.default` | `transparent` | デフォルト背景 |
| `component.list.item.background.hover` | `{background.secondary}` | ホバー時背景 |
| `component.list.item.background.selected` | `{primary.subtle}` | 選択時背景 |
| `component.list.item.background.active` | `{background.tertiary}` | アクティブ時背景 |

#### テキスト
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.list.item.text.color.default` | `{foreground.primary}` | デフォルトテキスト色 |
| `component.list.item.text.color.selected` | `{primary.default}` | 選択時テキスト色 |
| `component.list.item.text.fontSize` | `{font.size.base}` | フォントサイズ (1rem) |
| `component.list.item.text.lineHeight` | `{font.lineHeight.normal}` | 行高 (1.5) |

### 区切り線

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.list.divider.color` | `{border.default}` | 区切り線の色 |
| `component.list.divider.width` | `{border.width.1}` | 区切り線の幅 (1px) |

### アイコン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.list.icon.size` | `1.25rem` | アイコンサイズ (20px) |
| `component.list.icon.color` | `{foreground.secondary}` | アイコン色 |
| `component.list.icon.gap` | `{spacing.3}` | アイコンとテキストの間隔 (0.75rem) |

### インタラクティブ状態

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.list.interactive.cursor` | `pointer` | クリック可能なカーソル |
| `component.list.interactive.transition.duration` | `{animation.duration.fast}` | トランジション時間 (150ms) |
| `component.list.interactive.transition.timing` | `{animation.easing.ease}` | トランジションのイージング |

### 無効状態

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.list.disabled.opacity` | `0.5` | 無効時の透明度 |
| `component.list.disabled.cursor` | `not-allowed` | 無効時のカーソル |

### フォーカスリング

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.list.focus.ring.width` | `2px` | フォーカスリングの幅 |
| `component.list.focus.ring.offset` | `2px` | フォーカスリングのオフセット |
| `component.list.focus.ring.color` | `{primary.default}` | フォーカスリングの色 |

## アクセシビリティ

### ARIA属性

```html
<ul class="list" role="list">
  <li class="list-item list-item-interactive"
      role="listitem"
      tabindex="0"
      aria-selected="false">
    項目
  </li>
</ul>
```

### キーボードナビゲーション

- `Tab` / `Shift+Tab`: リスト項目間のフォーカス移動
- `Enter` / `Space`: インタラクティブ項目の選択
- `↑` / `↓`: （実装により）項目間の移動

### スクリーンリーダー対応

```html
<ul class="list" aria-label="ナビゲーションメニュー">
  <li class="list-item">
    <span class="list-item-text">ホーム</span>
  </li>
</ul>
```

## ベストプラクティス

### 使用すべき場合

- 関連する項目のグループを表示する
- ナビゲーションメニューを作成する
- 設定オプションの一覧を表示する
- ファイル/フォルダのリストを表示する

### 避けるべき使用方法

- 複雑な表形式データ（→ Tableコンポーネントを使用）
- 大量のデータ（→ 仮想スクロールの実装を検討）
- 画像グリッド（→ Gridレイアウトを使用）

### パフォーマンス

大量の項目（100+）を表示する場合は、以下を検討してください：

1. **仮想スクロール**: 表示されている項目のみをレンダリング
2. **ページネーション**: 項目を複数ページに分割
3. **遅延読み込み**: スクロール時に項目を追加読み込み

## 実装例

### 選択可能なリスト（JavaScript）

```javascript
document.querySelectorAll('.list-item-interactive').forEach(item => {
  item.addEventListener('click', () => {
    // 他の項目の選択を解除
    document.querySelectorAll('.list-item-interactive').forEach(i => {
      i.classList.remove('list-item-selected');
      i.setAttribute('aria-selected', 'false');
    });

    // 現在の項目を選択
    item.classList.add('list-item-selected');
    item.setAttribute('aria-selected', 'true');

    // カスタムイベントを発行
    item.dispatchEvent(new CustomEvent('list-item-select', {
      detail: { item: item.textContent }
    }));
  });
});
```

### キーボードナビゲーション

```javascript
const listItems = document.querySelectorAll('.list-item-interactive');

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

## 関連コンポーネント

- **Menu**: ドロップダウンメニュー用のリスト
- **Navigation**: ナビゲーションバー
- **Table**: 表形式のデータ表示

## ブラウザ対応

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 変更履歴

- **Phase 4 (2025-12)**: 初回実装
  - 3つの密度オプション（コンパクト/デフォルト/快適）
  - インタラクティブ状態のサポート
  - アイコンと区切り線のサポート
  - フォーカスリングとアクセシビリティ対応
