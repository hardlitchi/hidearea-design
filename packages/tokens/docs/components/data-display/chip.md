# Chip コンポーネント

タグ、ラベル、フィルターなどのコンパクトな情報を表示するコンポーネントです。

## 概要

Chipコンポーネントは、カテゴリ、タグ、フィルター、選択された項目などを表示する小さなインタラクティブな要素です。アイコンの追加や削除ボタンの実装が可能で、様々な色とサイズで使用できます。

## 基本的な使い方

```html
<span class="chip chip-medium chip-default">
  デフォルトチップ
</span>
```

## サイズバリアント

3つのサイズオプションが利用可能です：

```html
<!-- 小 (24px) -->
<span class="chip chip-small chip-default">
  小サイズ
</span>

<!-- 中（デフォルト、32px） -->
<span class="chip chip-medium chip-default">
  中サイズ
</span>

<!-- 大 (40px) -->
<span class="chip chip-large chip-default">
  大サイズ
</span>
```

## カラーバリアント

6つの意味を持つカラーバリアント：

```html
<!-- デフォルト（グレー） -->
<span class="chip chip-medium chip-default">
  デフォルト
</span>

<!-- プライマリ（ブランドカラー） -->
<span class="chip chip-medium chip-primary">
  プライマリ
</span>

<!-- 成功（グリーン） -->
<span class="chip chip-medium chip-success">
  成功
</span>

<!-- 警告（イエロー） -->
<span class="chip chip-medium chip-warning">
  警告
</span>

<!-- エラー（レッド） -->
<span class="chip chip-medium chip-error">
  エラー
</span>

<!-- 情報（ブルー） -->
<span class="chip chip-medium chip-info">
  情報
</span>
```

## アイコン付きチップ

先頭にアイコンを配置：

```html
<span class="chip chip-medium chip-primary">
  <span class="chip-icon">⭐</span>
  お気に入り
</span>

<span class="chip chip-medium chip-success">
  <span class="chip-icon">✓</span>
  完了
</span>

<span class="chip chip-medium chip-warning">
  <span class="chip-icon">⚠</span>
  警告
</span>
```

## 削除可能なチップ

削除ボタン付きのチップ：

```html
<span class="chip chip-medium chip-primary chip-deletable">
  <span class="chip-text">JavaScript</span>
  <button class="chip-close" aria-label="削除">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>
</span>
```

## インタラクティブチップ

クリック可能なチップ（フィルターなど）：

```html
<button class="chip chip-medium chip-default chip-interactive">
  <span class="chip-text">カテゴリ</span>
</button>
```

## 選択可能なチップ（トグル）

選択状態を持つチップ：

```html
<button class="chip chip-medium chip-default chip-interactive"
        aria-pressed="false">
  Python
</button>

<button class="chip chip-medium chip-primary chip-interactive chip-selected"
        aria-pressed="true">
  <span class="chip-icon">✓</span>
  JavaScript
</button>
```

## 無効状態

操作できないチップ：

```html
<span class="chip chip-medium chip-default chip-disabled">
  無効なチップ
</span>
```

## デザイントークン

### サイズ

#### 小サイズ
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.size.small.height` | `1.5rem` | 小サイズの高さ (24px) |
| `component.chip.size.small.padding.horizontal` | `{spacing.2}` | 水平パディング (0.5rem) |
| `component.chip.size.small.fontSize` | `{font.size.xs}` | フォントサイズ (0.75rem) |
| `component.chip.size.small.iconSize` | `0.875rem` | アイコンサイズ (14px) |

#### 中サイズ
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.size.medium.height` | `2rem` | 中サイズの高さ (32px) |
| `component.chip.size.medium.padding.horizontal` | `{spacing.3}` | 水平パディング (0.75rem) |
| `component.chip.size.medium.fontSize` | `{font.size.sm}` | フォントサイズ (0.875rem) |
| `component.chip.size.medium.iconSize` | `1rem` | アイコンサイズ (16px) |

#### 大サイズ
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.size.large.height` | `2.5rem` | 大サイズの高さ (40px) |
| `component.chip.size.large.padding.horizontal` | `{spacing.4}` | 水平パディング (1rem) |
| `component.chip.size.large.fontSize` | `{font.size.base}` | フォントサイズ (1rem) |
| `component.chip.size.large.iconSize` | `1.25rem` | アイコンサイズ (20px) |

### カラーバリアント

#### デフォルト
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.default.background.default` | `{background.tertiary}` | デフォルト背景 |
| `component.chip.default.background.hover` | `{background.secondary}` | ホバー時背景 |
| `component.chip.default.text` | `{foreground.primary}` | テキスト色 |
| `component.chip.default.border.color` | `{border.default}` | ボーダー色 |

#### プライマリ
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.primary.background.default` | `{primary.subtle}` | デフォルト背景 |
| `component.chip.primary.background.hover` | `{primary.default}` | ホバー時背景 |
| `component.chip.primary.text.default` | `{primary.default}` | デフォルトテキスト色 |
| `component.chip.primary.text.hover` | `{foreground.inverse}` | ホバー時テキスト色 |
| `component.chip.primary.border.color` | `{primary.default}` | ボーダー色 |

#### 成功
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.success.background.default` | `{success.subtle}` | デフォルト背景 |
| `component.chip.success.background.hover` | `{success.default}` | ホバー時背景 |
| `component.chip.success.text.default` | `{success.default}` | デフォルトテキスト色 |
| `component.chip.success.text.hover` | `{foreground.inverse}` | ホバー時テキスト色 |

#### 警告
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.warning.background.default` | `{warning.subtle}` | デフォルト背景 |
| `component.chip.warning.background.hover` | `{warning.default}` | ホバー時背景 |
| `component.chip.warning.text.default` | `{warning.default}` | デフォルトテキスト色 |
| `component.chip.warning.text.hover` | `{foreground.inverse}` | ホバー時テキスト色 |

#### エラー
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.error.background.default` | `{error.subtle}` | デフォルト背景 |
| `component.chip.error.background.hover` | `{error.default}` | ホバー時背景 |
| `component.chip.error.text.default` | `{error.default}` | デフォルトテキスト色 |
| `component.chip.error.text.hover` | `{foreground.inverse}` | ホバー時テキスト色 |

#### 情報
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.info.background.default` | `{info.subtle}` | デフォルト背景 |
| `component.chip.info.background.hover` | `{info.default}` | ホバー時背景 |
| `component.chip.info.text.default` | `{info.default}` | デフォルトテキスト色 |
| `component.chip.info.text.hover` | `{foreground.inverse}` | ホバー時テキスト色 |

### ボーダーと角丸

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.border.width` | `{border.width.1}` | ボーダー幅 (1px) |
| `component.chip.border.radius` | `{border.radius.full}` | 角丸（完全な丸） (9999px) |

### タイポグラフィ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.fontWeight` | `{font.weight.medium}` | フォントウェイト (500) |
| `component.chip.lineHeight` | `{font.lineHeight.tight}` | 行高 (1.25) |

### アイコン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.icon.gap` | `{spacing.1}` | アイコンとテキストの間隔 (0.25rem) |
| `component.chip.icon.color` | `currentColor` | アイコンの色（テキストと同じ） |

### 削除ボタン

#### サイズ
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.close.size.small` | `1rem` | 小サイズの削除ボタン (16px) |
| `component.chip.close.size.medium` | `1.25rem` | 中サイズの削除ボタン (20px) |
| `component.chip.close.size.large` | `1.5rem` | 大サイズの削除ボタン (24px) |

#### スタイル
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.close.gap` | `{spacing.1}` | テキストとの間隔 (0.25rem) |
| `component.chip.close.color.default` | `currentColor` | デフォルト色 |
| `component.chip.close.color.hover` | `{foreground.primary}` | ホバー時色 |
| `component.chip.close.background.hover` | `rgba(0, 0, 0, 0.1)` | ホバー時背景色 |
| `component.chip.close.borderRadius` | `{border.radius.full}` | 角丸（完全な円） |
| `component.chip.close.padding` | `{spacing.1}` | パディング (0.25rem) |

### インタラクティブ状態

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.interactive.cursor` | `pointer` | クリック可能なカーソル |
| `component.chip.interactive.transition.duration` | `{animation.duration.fast}` | トランジション時間 (150ms) |
| `component.chip.interactive.transition.timing` | `{animation.easing.ease}` | トランジションのイージング |
| `component.chip.interactive.transition.properties` | `background-color, color, border-color, transform` | トランジション対象 |

### フォーカスリング

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.focus.ring.width` | `2px` | フォーカスリングの幅 |
| `component.chip.focus.ring.offset` | `2px` | フォーカスリングのオフセット |
| `component.chip.focus.ring.color` | `{primary.default}` | フォーカスリングの色 |

### 無効状態

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.chip.disabled.opacity` | `0.5` | 無効時の透明度 |
| `component.chip.disabled.cursor` | `not-allowed` | 無効時のカーソル |

## アクセシビリティ

### ARIA属性

#### 削除可能なチップ
```html
<span class="chip chip-medium chip-primary" role="listitem">
  <span class="chip-text">タグ</span>
  <button class="chip-close"
          aria-label="タグを削除"
          type="button">
    ×
  </button>
</span>
```

#### 選択可能なチップ
```html
<button class="chip chip-medium chip-default"
        role="button"
        aria-pressed="false">
  カテゴリ
</button>
```

#### チップグループ
```html
<div role="list" aria-label="選択されたタグ">
  <span class="chip" role="listitem">タグ1</span>
  <span class="chip" role="listitem">タグ2</span>
</div>
```

### キーボードナビゲーション

削除可能なチップでは、以下のキーをサポート：

- `Tab`: チップ間/削除ボタンへのフォーカス移動
- `Enter` / `Space`: 削除ボタンの実行
- `Delete` / `Backspace`: チップ全体にフォーカスがある場合の削除

## ベストプラクティス

### 使用すべき場合

- タグやカテゴリの表示
- フィルターの視覚化
- 選択された項目の表示
- ステータスやラベルの表示
- 連絡先リスト（メール宛先など）

### 避けるべき使用方法

- 長いテキストの表示（→ Badge や Label を検討）
- アクションボタン（→ Button コンポーネントを使用）
- ナビゲーション（→ Tab や Navigation を使用）

### テキストの長さ

チップ内のテキストは短く保つ：

```html
<!-- 良い例 -->
<span class="chip chip-medium chip-default">JavaScript</span>

<!-- 避けるべき例 -->
<span class="chip chip-medium chip-default">
  この長いテキストはチップには適していません
</span>
```

### カラーの使い分け

```html
<!-- ステータス表示 -->
<span class="chip chip-medium chip-success">完了</span>
<span class="chip chip-medium chip-warning">保留中</span>
<span class="chip chip-medium chip-error">エラー</span>

<!-- カテゴリ表示 -->
<span class="chip chip-medium chip-primary">重要</span>
<span class="chip chip-medium chip-info">情報</span>
<span class="chip chip-medium chip-default">その他</span>
```

## 実装例

### 削除機能の実装

```javascript
// 削除ボタンの初期化
document.querySelectorAll('.chip-close').forEach(closeButton => {
  closeButton.addEventListener('click', (e) => {
    e.stopPropagation(); // 親要素のクリックイベントを防止

    const chip = closeButton.closest('.chip');
    if (chip) {
      // カスタムイベントを発行（削除前の処理用）
      const deleteEvent = new CustomEvent('chip-delete', {
        detail: { chip, text: chip.textContent.trim() },
        cancelable: true
      });

      if (chip.dispatchEvent(deleteEvent)) {
        // アニメーション付きで削除
        chip.style.opacity = '0';
        chip.style.transform = 'scale(0.8)';
        chip.style.transition = 'opacity 200ms ease, transform 200ms ease';

        setTimeout(() => {
          chip.remove();
        }, 200);
      }
    }
  });
});
```

### 選択機能の実装

```javascript
// 選択可能なチップの初期化
document.querySelectorAll('.chip-interactive').forEach(chip => {
  chip.addEventListener('click', () => {
    const isSelected = chip.getAttribute('aria-pressed') === 'true';
    chip.setAttribute('aria-pressed', !isSelected);
    chip.classList.toggle('chip-selected');

    // カスタムイベントを発行
    chip.dispatchEvent(new CustomEvent('chip-toggle', {
      detail: {
        selected: !isSelected,
        text: chip.textContent.trim()
      }
    }));
  });
});
```

### 動的チップの生成

```javascript
function createChip(text, options = {}) {
  const {
    color = 'default',
    size = 'medium',
    icon = null,
    deletable = false,
    onDelete = null
  } = options;

  const chip = document.createElement('span');
  chip.className = `chip chip-${size} chip-${color}`;

  if (deletable) {
    chip.classList.add('chip-deletable');
  }

  // アイコン
  if (icon) {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'chip-icon';
    iconSpan.textContent = icon;
    chip.appendChild(iconSpan);
  }

  // テキスト
  const textSpan = document.createElement('span');
  textSpan.className = 'chip-text';
  textSpan.textContent = text;
  chip.appendChild(textSpan);

  // 削除ボタン
  if (deletable) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'chip-close';
    closeBtn.setAttribute('aria-label', `${text}を削除`);
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (onDelete) {
        onDelete(chip, text);
      } else {
        chip.remove();
      }
    });
    chip.appendChild(closeBtn);
  }

  return chip;
}

// 使用例
const container = document.getElementById('chip-container');
container.appendChild(createChip('JavaScript', {
  color: 'primary',
  size: 'medium',
  icon: '⭐',
  deletable: true,
  onDelete: (chip, text) => {
    console.log(`${text} が削除されました`);
    chip.remove();
  }
}));
```

### フィルターチップの実装

```javascript
class FilterChips {
  constructor(container, options = {}) {
    this.container = container;
    this.filters = new Set();
    this.onChange = options.onChange || (() => {});
  }

  addFilter(text, value) {
    const chip = createChip(text, {
      color: 'primary',
      deletable: true,
      onDelete: () => this.removeFilter(value)
    });

    this.container.appendChild(chip);
    this.filters.add(value);
    this.onChange(Array.from(this.filters));
  }

  removeFilter(value) {
    this.filters.delete(value);
    this.onChange(Array.from(this.filters));
  }

  clear() {
    this.container.innerHTML = '';
    this.filters.clear();
    this.onChange([]);
  }

  getFilters() {
    return Array.from(this.filters);
  }
}

// 使用例
const filterChips = new FilterChips(
  document.getElementById('filters'),
  {
    onChange: (filters) => {
      console.log('現在のフィルター:', filters);
      // データのフィルタリング処理
    }
  }
);

// フィルター追加
filterChips.addFilter('JavaScript', 'js');
filterChips.addFilter('Python', 'py');
```

## 関連コンポーネント

- **Badge**: 数値やステータスの表示
- **Tag**: より大きなタグ表示
- **Button**: アクションボタン
- **Pill**: 角丸のラベル

## ブラウザ対応

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 変更履歴

- **Phase 4 (2025-12)**: 初回実装
  - 3つのサイズバリアント
  - 6つのカラーバリアント
  - アイコンサポート
  - 削除機能とアニメーション
  - インタラクティブ状態
  - フォーカスリングとアクセシビリティ対応
