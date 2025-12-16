# Tabs (タブ) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/css/components/navigation/tabs.css`
**ステータス:** ✅ 実装済み

---

## 概要

タブコンポーネントは、関連するコンテンツを複数のパネルに分けて表示するためのナビゲーション要素です。
3つのバリアント（underline, pills, outlined）と、3つのサイズ（sm, md, lg）をサポートしています。

### 用途

- コンテンツの整理と分類
- 設定画面のセクション切り替え
- ダッシュボードのビュー切り替え
- フォームの複数ステップ表示

---

## バリアント

### 1. Default (アンダーライン)

下線で現在のタブを示すデフォルトスタイルです。最も一般的なタブUIです。

**使用場面:**
- 標準的なタブナビゲーション
- ドキュメント閲覧
- プロファイル画面のセクション

### 2. Pills (ピル)

丸みを帯びたピル型のタブです。よりモダンな印象を与えます。

**使用場面:**
- モダンなUI
- カード内のタブ
- ダッシュボードのフィルター

### 3. Outlined (アウトライン)

枠線で囲まれたタブです。より明確な区切りが必要な場合に使用します。

**使用場面:**
- 高コントラストが必要な場面
- 重要な選択肢の切り替え
- 設定画面

---

## サイズ

### Small (sm)
- パディング: `0.25rem 0.75rem`
- フォントサイズ: `0.875rem`

### Medium (md) - デフォルト
- パディング: `0.5rem 1rem`
- フォントサイズ: `1rem`

### Large (lg)
- パディング: `0.75rem 1.25rem`
- フォントサイズ: `1.125rem`

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- デフォルトタブ -->
<ha-tabs variant="default">
  <div role="tablist" aria-label="Main navigation">
    <ha-tab-item active>
      <button role="tab" aria-selected="true">ホーム</button>
    </ha-tab-item>
    <ha-tab-item>
      <button role="tab" aria-selected="false">プロフィール</button>
    </ha-tab-item>
    <ha-tab-item>
      <button role="tab" aria-selected="false">設定</button>
    </ha-tab-item>
  </div>
</ha-tabs>

<!-- ピルタブ -->
<ha-tabs variant="pills">
  <div role="tablist">
    <ha-tab-item active>
      <button role="tab">概要</button>
    </ha-tab-item>
    <ha-tab-item>
      <button role="tab">詳細</button>
    </ha-tab-item>
  </div>
</ha-tabs>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/navigation/tabs.css">
</head>
<body>
  <!-- デフォルトタブ -->
  <div class="ha-tabs">
    <div class="tabs-list" role="tablist" aria-label="Main tabs">
      <button class="tab-item active" role="tab" aria-selected="true" id="tab1">
        ホーム
      </button>
      <button class="tab-item" role="tab" aria-selected="false" id="tab2">
        プロフィール
      </button>
      <button class="tab-item" role="tab" aria-selected="false" id="tab3">
        設定
      </button>
      <button class="tab-item" role="tab" aria-selected="false" disabled>
        無効
      </button>
    </div>

    <div class="tabs-panels">
      <div class="tab-panel" role="tabpanel" aria-labelledby="tab1">
        ホームコンテンツ
      </div>
      <div class="tab-panel" role="tabpanel" aria-labelledby="tab2" hidden>
        プロフィールコンテンツ
      </div>
      <div class="tab-panel" role="tabpanel" aria-labelledby="tab3" hidden>
        設定コンテンツ
      </div>
    </div>
  </div>

  <!-- ピルタブ -->
  <div class="ha-tabs" variant="pills">
    <div class="tabs-list variant-pills" role="tablist">
      <button class="tab-item size-md active" role="tab">概要</button>
      <button class="tab-item size-md" role="tab">詳細</button>
      <button class="tab-item size-md" role="tab">レビュー</button>
    </div>
  </div>

  <!-- アウトラインタブ -->
  <div class="ha-tabs" variant="outlined">
    <div class="tabs-list variant-outlined" role="tablist">
      <button class="tab-item size-sm active" role="tab">タブ1</button>
      <button class="tab-item size-sm" role="tab">タブ2</button>
      <button class="tab-item size-sm" role="tab">タブ3</button>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import '@hidearea-design/tokens/css/html/navigation/tabs.css';

// React例
function Tabs({ variant = 'default', activeTab, onChange, tabs }) {
  return (
    <div className="ha-tabs" data-variant={variant}>
      <div className={`tabs-list variant-${variant}`} role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === index ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === index}
            onClick={() => onChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-panels">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className="tab-panel"
            role="tabpanel"
            hidden={activeTab !== index}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// 使用例
<Tabs
  variant="pills"
  activeTab={0}
  onChange={setActiveTab}
  tabs={[
    { id: 'home', label: 'ホーム', content: <HomeContent /> },
    { id: 'profile', label: 'プロフィール', content: <ProfileContent /> },
    { id: 'settings', label: '設定', content: <SettingsContent /> },
  ]}
/>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `default` \| `pills` \| `outlined` | `default` | タブのスタイルバリアント |
| `size` | `sm` \| `md` \| `lg` | `md` | タブのサイズ |
| `align` | `start` \| `center` \| `end` | `start` | タブの配置 |

---

## CSS変数

タブコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- `--primary-default` - アクティブタブの色
- `--border-default` - ボーダーカラー
- `--foreground-tertiary` - 無効タブの色
- `--foreground-secondary` - デフォルトタブの色
- `--foreground-primary` - ホバー時の色
- `--foreground-inverse` - ピルバリアントの背景色

### スペーシング
- `--spacing-1` - 0.25rem (小パディング)
- `--spacing-2` - 0.5rem (中パディング、ギャップ)
- `--spacing-3` - 0.75rem (sm横パディング)
- `--spacing-4` - 1rem (md横パディング、コンテナギャップ)
- `--spacing-5` - 1.25rem (lg横パディング)

### ボーダー
- `--border-radius-base` - 基本角丸
- `--border-radius-sm` - 小角丸
- `--border-radius-full` - 完全な丸

### アニメーション
- `--animation-duration-base` - 200ms
- `--animation-easing-ease` - ease

---

## アクセシビリティ

- `role="tablist"`でタブリストを識別
- `role="tab"`で各タブを識別
- `role="tabpanel"`でパネルを識別
- `aria-selected`でアクティブなタブを示す
- `aria-labelledby`でパネルとタブを関連付け
- `aria-label`でタブリストに説明を追加

```html
<!-- アクセシビリティの良い例 -->
<div class="ha-tabs">
  <div class="tabs-list" role="tablist" aria-label="アカウント設定">
    <button
      class="tab-item active"
      role="tab"
      aria-selected="true"
      aria-controls="panel-general"
      id="tab-general"
    >
      一般
    </button>
    <button
      class="tab-item"
      role="tab"
      aria-selected="false"
      aria-controls="panel-security"
      id="tab-security"
    >
      セキュリティ
    </button>
  </div>

  <div class="tabs-panels">
    <div
      class="tab-panel"
      role="tabpanel"
      aria-labelledby="tab-general"
      id="panel-general"
    >
      一般設定コンテンツ
    </div>
    <div
      class="tab-panel"
      role="tabpanel"
      aria-labelledby="tab-security"
      id="panel-security"
      hidden
    >
      セキュリティ設定コンテンツ
    </div>
  </div>
</div>
```

### キーボード操作

- **Tab**: タブリストにフォーカス
- **Arrow Left/Right**: 前後のタブに移動
- **Home**: 最初のタブに移動
- **End**: 最後のタブに移動
- **Enter/Space**: タブを選択
- **Ctrl + Tab**: 次のタブパネルに移動（ブラウザの動作）

### JavaScript例（キーボードナビゲーション）

```javascript
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab, index) => {
  tab.addEventListener('keydown', (e) => {
    let newIndex = index;

    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    activateTab(newIndex);
  });

  tab.addEventListener('click', () => activateTab(index));
});

function activateTab(index) {
  tabs.forEach((t, i) => {
    t.classList.toggle('active', i === index);
    t.setAttribute('aria-selected', i === index);
  });

  panels.forEach((p, i) => {
    p.hidden = i !== index;
  });

  tabs[index].focus();
}
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切なタブ数**
   - 5-7個以内のタブを推奨
   - それ以上の場合はドロップダウンメニューを検討

2. **明確なラベル**
   - 短く分かりやすいラベルを使用
   - アイコンと組み合わせて視覚的に区別

3. **デフォルト選択**
   - 最初のタブまたは最も重要なタブを選択状態にする

4. **レスポンシブ対応**
   - 小画面ではスクロール可能にする
   - またはドロップダウンに変換する

```html
<!-- 適切なタブの使用例 -->
<div class="ha-tabs">
  <div class="tabs-list" role="tablist">
    <button class="tab-item active" role="tab">
      <svg>...</svg>
      概要
    </button>
    <button class="tab-item" role="tab">
      <svg>...</svg>
      統計
    </button>
    <button class="tab-item" role="tab">
      <svg>...</svg>
      設定
    </button>
  </div>
</div>
```

### ❌ 非推奨

1. **タブ内でのナビゲーション**
   - タブは同一ページ内のコンテンツ切り替えに使用
   - ページ遷移には使用しない

2. **ネストされたタブ**
   - タブの中にタブを配置しない
   - 複雑になりすぎる場合は別のUIパターンを検討

3. **長すぎるラベル**
   - 1-2単語程度に収める
   - 長い説明は不要

```html
<!-- タブが多すぎる例（非推奨） -->
<div class="tabs-list" role="tablist">
  <button class="tab-item" role="tab">タブ1</button>
  <button class="tab-item" role="tab">タブ2</button>
  <button class="tab-item" role="tab">タブ3</button>
  <button class="tab-item" role="tab">タブ4</button>
  <button class="tab-item" role="tab">タブ5</button>
  <button class="tab-item" role="tab">タブ6</button>
  <button class="tab-item" role="tab">タブ7</button>
  <button class="tab-item" role="tab">タブ8</button>
</div>

<!-- 長すぎるラベル（非推奨） -->
<button class="tab-item" role="tab">
  これは非常に長いタブのラベルです
</button>
```

---

## バリエーション

### アイコン付きタブ

```html
<div class="tabs-list" role="tablist">
  <button class="tab-item active" role="tab">
    <svg width="16" height="16">...</svg>
    <span>ホーム</span>
  </button>
  <button class="tab-item" role="tab">
    <svg width="16" height="16">...</svg>
    <span>設定</span>
  </button>
</div>
```

### スクロール可能なタブ

```css
.tabs-list {
  overflow-x: auto;
  scrollbar-width: thin;
}

.tabs-list::-webkit-scrollbar {
  height: 4px;
}

.tabs-list::-webkit-scrollbar-thumb {
  background-color: var(--color-neutral-300);
  border-radius: var(--border-radius-full);
}
```

---

## テーマ対応

全てのタブトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-tabs">
    <div class="tabs-list" role="tablist">
      <button class="tab-item active" role="tab">ホーム</button>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-tabs">
    <div class="tabs-list" role="tablist">
      <button class="tab-item active" role="tab">ホーム</button>
    </div>
  </div>
</html>
```

---

## 関連コンポーネント

- [Button](../layout/button.md) - タブ内のアクションボタン
- [Menu](./menu.md) - タブが多い場合の代替
- [Breadcrumb](./breadcrumb.md) - 階層ナビゲーション

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)

---

**最終更新:** 2025-12-12
