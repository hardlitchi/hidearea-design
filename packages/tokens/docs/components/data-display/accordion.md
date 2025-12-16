# Accordion (アコーディオン) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/css/components/data-display/accordion.css`
**ステータス:** ✅ 実装済み

---

## 概要

アコーディオンコンポーネントは、コンテンツを展開可能なセクションに整理するための UI パターンです。
ユーザーはヘッダーをクリックして各セクションの表示/非表示を切り替えることができます。

### 用途

- FAQ セクション
- 詳細情報の段階的な表示
- 長いコンテンツの整理
- ナビゲーションメニュー
- フォームの複数ステップ表示

---

## 状態

### Open (開いた状態)

セクションのコンテンツが表示されている状態です。アイコンが180度回転します。

**使用場面:**
- デフォルトで表示したい重要な情報
- 最初のセクションを開いた状態で表示
- ユーザーがクリックして開いた状態

### Closed (閉じた状態)

セクションのコンテンツが非表示の状態です。

**使用場面:**
- 詳細情報を隠す
- ページの初期表示時
- ユーザーがクリックして閉じた状態

### Disabled (無効状態)

アコーディオンアイテムが操作できない状態です。

**使用場面:**
- 権限がないコンテンツ
- 条件を満たしていないセクション
- 一時的に利用不可のセクション

---

## 機能

### 単一展開モード

一度に1つのセクションのみを開くことができるモードです。

### 複数展開モード

複数のセクションを同時に開くことができるモードです。

### アニメーション

コンテンツの展開/折りたたみは滑らかなアニメーションで行われます。
`max-height` トランジションを使用し、`--animation-duration-slow` トークンで速度を制御します。

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-accordion>
  <div class="accordion">
    <div class="accordion-item">
      <button class="accordion-item__header" aria-expanded="false">
        <span>セクション 1</span>
        <span class="accordion-item__icon">▼</span>
      </button>
      <div class="accordion-item__content">
        <slot>セクション 1 のコンテンツ</slot>
      </div>
    </div>

    <div class="accordion-item accordion-item--open">
      <button class="accordion-item__header" aria-expanded="true">
        <span>セクション 2</span>
        <span class="accordion-item__icon">▼</span>
      </button>
      <div class="accordion-item__content">
        <slot>セクション 2 のコンテンツ</slot>
      </div>
    </div>

    <div class="accordion-item accordion-item--disabled">
      <button class="accordion-item__header" disabled aria-expanded="false">
        <span>セクション 3 (無効)</span>
        <span class="accordion-item__icon">▼</span>
      </button>
      <div class="accordion-item__content">
        <slot>セクション 3 のコンテンツ</slot>
      </div>
    </div>
  </div>
</ha-accordion>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/accordion.css">
</head>
<body>
  <div class="ha-accordion">
    <div class="accordion">
      <!-- アコーディオンアイテム 1 -->
      <div class="accordion-item">
        <button class="accordion-item__header" aria-expanded="false">
          <span>よくある質問 1</span>
          <span class="accordion-item__icon">▼</span>
        </button>
        <div class="accordion-item__content">
          <p>回答がここに表示されます。</p>
        </div>
      </div>

      <!-- アコーディオンアイテム 2 (開いた状態) -->
      <div class="accordion-item accordion-item--open">
        <button class="accordion-item__header" aria-expanded="true">
          <span>よくある質問 2</span>
          <span class="accordion-item__icon">▼</span>
        </button>
        <div class="accordion-item__content">
          <p>この回答は初期状態で表示されています。</p>
        </div>
      </div>

      <!-- アコーディオンアイテム 3 (無効状態) -->
      <div class="accordion-item accordion-item--disabled">
        <button class="accordion-item__header" disabled aria-expanded="false">
          <span>よくある質問 3 (準備中)</span>
          <span class="accordion-item__icon">▼</span>
        </button>
        <div class="accordion-item__content">
          <p>この内容は現在利用できません。</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import '@hidearea-design/tokens/css/variables.css';
import '@hidearea-design/tokens/css/html/data-display/accordion.css';

// React例
function Accordion({ items }) {
  const [openItems, setOpenItems] = React.useState([]);

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(i => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <div className="ha-accordion">
      <div className="accordion">
        {items.map((item, index) => (
          <div
            key={index}
            className={`accordion-item ${openItems.includes(index) ? 'accordion-item--open' : ''} ${item.disabled ? 'accordion-item--disabled' : ''}`}
          >
            <button
              className="accordion-item__header"
              onClick={() => toggleItem(index)}
              aria-expanded={openItems.includes(index)}
              disabled={item.disabled}
            >
              <span>{item.title}</span>
              <span className="accordion-item__icon">▼</span>
            </button>
            <div className="accordion-item__content">
              <div>{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 使用例
<Accordion items={[
  { title: 'セクション 1', content: 'コンテンツ 1' },
  { title: 'セクション 2', content: 'コンテンツ 2' },
  { title: 'セクション 3', content: 'コンテンツ 3', disabled: true }
]} />
```

### Pattern 4: 統合CSS

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/all.css">
</head>
<body>
  <!-- 全コンポーネントが利用可能 -->
  <div class="ha-accordion">
    <div class="accordion">
      <div class="accordion-item">
        <button class="accordion-item__header" aria-expanded="false">
          <span>FAQ</span>
          <span class="accordion-item__icon">▼</span>
        </button>
        <div class="accordion-item__content">
          <p>回答内容</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## CSS変数

アコーディオンコンポーネントは以下のCSS変数(デザイントークン)を使用しています:

### 色関連
- `--accordion-border-color` - ボーダーカラー (デフォルト: `var(--border-default)`)
- `--accordion-header-bg` - ヘッダー背景色 (デフォルト: `var(--foreground-inverse)`)
- `--accordion-header-hover-bg` - ヘッダーホバー背景色 (デフォルト: `var(--background-tertiary)`)
- `--foreground-primary` - テキストカラー
- `--primary-default` - フォーカス時のアウトラインカラー

### スペーシング
- `--accordion-item-padding` - アイテムパディング (デフォルト: `var(--spacing-4)` = 1rem)
- `--spacing-2` - アイコンマージン (0.5rem)

### ボーダー
- `--border-radius-md` - 角丸サイズ

### アニメーション
- `--animation-duration-base` - ヘッダーホバーアニメーション (200ms)
- `--animation-duration-slow` - コンテンツ展開アニメーション

### カスタマイズ例

```css
.ha-accordion {
  --accordion-border-color: var(--primary-default);
  --accordion-item-padding: var(--spacing-6);
  --accordion-header-bg: var(--background-secondary);
}
```

---

## アクセシビリティ

### ARIA属性

```html
<!-- アクセシビリティの良い例 -->
<div class="accordion-item">
  <button
    class="accordion-item__header"
    aria-expanded="false"
    aria-controls="section1"
    id="header1"
  >
    <span>セクションタイトル</span>
    <span class="accordion-item__icon">▼</span>
  </button>
  <div
    class="accordion-item__content"
    id="section1"
    role="region"
    aria-labelledby="header1"
  >
    <p>セクションの内容</p>
  </div>
</div>
```

### キーボード操作

- **Tab**: 次のアコーディオンヘッダーにフォーカス
- **Shift + Tab**: 前のアコーディオンヘッダーにフォーカス
- **Enter/Space**: フォーカス中のセクションを展開/折りたたみ
- **Home**: 最初のアコーディオンヘッダーにフォーカス (推奨)
- **End**: 最後のアコーディオンヘッダーにフォーカス (推奨)
- **↑**: 前のアコーディオンヘッダーにフォーカス (推奨)
- **↓**: 次のアコーディオンヘッダーにフォーカス (推奨)

### フォーカススタイル

```css
.accordion-item__header:focus-visible {
  outline: 2px solid var(--primary-default);
  outline-offset: -2px;
  z-index: 1;
}
```

### セマンティックHTML

- `button`要素をヘッダーに使用
- `aria-expanded`で展開状態を明示
- `aria-controls`でコンテンツとの関連を明示
- `disabled`属性で無効状態を表現

---

## ベストプラクティス

### ✅ 推奨

1. **明確なヘッダーラベル**
   - 各セクションの内容が分かるタイトルを使用

2. **適切な初期状態**
   - 重要な情報は初期状態で開いておく
   - 長いリストは全て閉じた状態で表示

3. **一貫したアイコン**
   - 展開/折りたたみを示すアイコンを全てのヘッダーに配置

4. **適切な無効化**
   - 利用不可のセクションには`disabled`を使用

```html
<!-- 適切な使用例 -->
<div class="ha-accordion">
  <div class="accordion">
    <!-- 重要な情報は開いた状態 -->
    <div class="accordion-item accordion-item--open">
      <button class="accordion-item__header" aria-expanded="true">
        <span>重要なお知らせ</span>
        <span class="accordion-item__icon">▼</span>
      </button>
      <div class="accordion-item__content">
        <p>必読の情報がここに表示されます。</p>
      </div>
    </div>

    <!-- その他は閉じた状態 -->
    <div class="accordion-item">
      <button class="accordion-item__header" aria-expanded="false">
        <span>詳細情報</span>
        <span class="accordion-item__icon">▼</span>
      </button>
      <div class="accordion-item__content">
        <p>追加の詳細情報</p>
      </div>
    </div>
  </div>
</div>
```

### ❌ 非推奨

1. **曖昧なラベル**
   - 「その他」「詳細」などの一般的すぎるラベル

2. **アイコンの欠如**
   - 展開可能であることが分かりにくい

3. **過度なネスト**
   - アコーディオンの中にアコーディオンを配置

```html
<!-- 避けるべき例 -->
<div class="ha-accordion">
  <div class="accordion">
    <!-- アイコンがない -->
    <div class="accordion-item">
      <button class="accordion-item__header">
        <span>情報</span>
      </button>
      <div class="accordion-item__content">
        <p>コンテンツ</p>
      </div>
    </div>

    <!-- ネストされたアコーディオン -->
    <div class="accordion-item">
      <button class="accordion-item__header">
        <span>親セクション</span>
        <span class="accordion-item__icon">▼</span>
      </button>
      <div class="accordion-item__content">
        <div class="ha-accordion">
          <!-- これは避ける -->
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## バリエーション

### アイコン付きヘッダー

```html
<div class="accordion-item">
  <button class="accordion-item__header" aria-expanded="false">
    <span style="display: flex; align-items: center; gap: 0.5rem;">
      <svg width="20" height="20">...</svg>
      セクションタイトル
    </span>
    <span class="accordion-item__icon">▼</span>
  </button>
  <div class="accordion-item__content">
    <p>コンテンツ</p>
  </div>
</div>
```

### リッチコンテンツ

```html
<div class="accordion-item">
  <button class="accordion-item__header" aria-expanded="false">
    <span>製品詳細</span>
    <span class="accordion-item__icon">▼</span>
  </button>
  <div class="accordion-item__content">
    <h4>仕様</h4>
    <ul>
      <li>サイズ: 100x200mm</li>
      <li>重量: 500g</li>
    </ul>
    <img src="product.jpg" alt="製品画像">
  </div>
</div>
```

---

## テーマ対応

全てのトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-accordion">
    <!-- ... -->
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-accordion">
    <!-- ... -->
  </div>
</html>
```

---

## JavaScript インタラクション例

```javascript
// シンプルなトグル実装
document.querySelectorAll('.accordion-item__header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item');
    const isOpen = item.classList.contains('accordion-item--open');

    // 単一展開モードの場合、他を全て閉じる
    // document.querySelectorAll('.accordion-item').forEach(i => {
    //   i.classList.remove('accordion-item--open');
    //   i.querySelector('.accordion-item__header').setAttribute('aria-expanded', 'false');
    // });

    // トグル
    item.classList.toggle('accordion-item--open');
    header.setAttribute('aria-expanded', !isOpen);

    // コンテンツの高さを動的に設定
    const content = item.querySelector('.accordion-item__content');
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = '0';
    }
  });
});
```

---

## 関連コンポーネント

- [Card](./card.md) - カード内でアコーディオンを使用
- [Tabs](../navigation/tabs.md) - 別のコンテンツ切り替え方法
- [Modal](../overlays/modal.md) - オーバーレイ表示

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)

---

**最終更新:** 2025-12-12
