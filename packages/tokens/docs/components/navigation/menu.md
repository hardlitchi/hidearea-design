# Menu (メニュー) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/css/components/navigation/menu.css`
**ステータス:** ✅ 実装済み

---

## 概要

メニューコンポーネントは、アクションや選択肢のリストを表示するためのドロップダウン要素です。
3つのサイズ（sm, md, lg）と、アイコン、区切り線、サブメニューなどの機能をサポートしています。

### 用途

- ドロップダウンメニュー
- コンテキストメニュー（右クリックメニュー）
- ユーザーアカウントメニュー
- アクションメニュー

---

## 特徴

### 1. メニューアイテム

標準的なクリック可能なメニュー項目です。

**使用場面:**
- 標準的なアクション
- ナビゲーション
- 選択肢の提供

### 2. アイコン付きメニューアイテム

アイコンとテキストを組み合わせた視覚的に分かりやすいメニュー項目です。

**使用場面:**
- 視覚的な区別が必要な場合
- アクションの理解を助ける
- ブランディング

### 3. 区切り線

メニュー項目をグループ化するための視覚的な区切りです。

**使用場面:**
- 関連するアイテムのグループ化
- 破壊的なアクションの分離
- セクションの区切り

### 4. 無効化アイテム

現在使用できないメニュー項目です。

**使用場面:**
- 条件が満たされていない場合
- 権限が不足している場合
- 一時的に利用不可の機能

### 5. 危険なアクション

削除などの破壊的なアクションを示すメニュー項目です。

**使用場面:**
- 削除アクション
- データの消去
- 取り消し不可能な操作

---

## サイズ

### Small (sm)
- パディング: `0.25rem 0.75rem`
- フォントサイズ: `0.875rem`
- 最小幅: `160px`

### Medium (md) - デフォルト
- パディング: `0.5rem 1rem`
- フォントサイズ: `1rem`
- 最小幅: `200px`

### Large (lg)
- パディング: `0.75rem 1.25rem`
- フォントサイズ: `1rem`
- 最小幅: `240px`

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

\`\`\`html
<!-- ドロップダウンメニュー -->
<ha-dropdown>
  <button slot="trigger">メニュー</button>
  <ha-menu size="md">
    <ha-menu-item>
      <button>プロフィール</button>
    </ha-menu-item>
    <ha-menu-item>
      <button>設定</button>
    </ha-menu-item>
    <ha-menu-divider></ha-menu-divider>
    <ha-menu-item danger>
      <button>ログアウト</button>
    </ha-menu-item>
  </ha-menu>
</ha-dropdown>
\`\`\`

### Pattern 2: Plain HTML (推奨)

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/navigation/menu.css">
</head>
<body>
  <!-- 基本的なメニュー -->
  <div class="ha-menu">
    <div class="menu size-md" role="menu">
      <button class="menu-item" role="menuitem">
        <span class="content">プロフィール</span>
      </button>
      <button class="menu-item" role="menuitem">
        <span class="content">設定</span>
      </button>
      <div class="divider" role="separator"></div>
      <button class="menu-item" role="menuitem">
        <span class="content">ヘルプ</span>
      </button>
      <button class="menu-item danger" role="menuitem">
        <span class="content">ログアウト</span>
      </button>
    </div>
  </div>

  <!-- アイコン付きメニュー -->
  <div class="ha-menu">
    <div class="menu size-md" role="menu">
      <button class="menu-item" role="menuitem">
        <span class="icon-slot">
          <svg width="16" height="16">...</svg>
        </span>
        <span class="content">新規作成</span>
      </button>
      <button class="menu-item" role="menuitem">
        <span class="icon-slot">
          <svg width="16" height="16">...</svg>
        </span>
        <span class="content">開く</span>
      </button>
      <button class="menu-item" role="menuitem">
        <span class="icon-slot">
          <svg width="16" height="16">...</svg>
        </span>
        <span class="content">保存</span>
      </button>
      <div class="divider" role="separator"></div>
      <button class="menu-item danger" role="menuitem">
        <span class="icon-slot">
          <svg width="16" height="16">...</svg>
        </span>
        <span class="content">削除</span>
      </button>
    </div>
  </div>

  <!-- 無効化アイテムを含むメニュー -->
  <div class="ha-menu">
    <div class="menu size-sm" role="menu">
      <button class="menu-item" role="menuitem">
        <span class="content">コピー</span>
      </button>
      <button class="menu-item" role="menuitem">
        <span class="content">切り取り</span>
      </button>
      <button class="menu-item" role="menuitem" disabled>
        <span class="content">貼り付け（利用不可）</span>
      </button>
    </div>
  </div>

  <!-- ドロップダウンコンテナ付き -->
  <div class="ha-dropdown">
    <div class="trigger">
      <button>アクション</button>
    </div>
    <div class="menu-container open">
      <div class="menu size-md" role="menu">
        <button class="menu-item" role="menuitem">編集</button>
        <button class="menu-item" role="menuitem">複製</button>
        <div class="divider" role="separator"></div>
        <button class="menu-item danger" role="menuitem">削除</button>
      </div>
    </div>
  </div>
</body>
</html>
\`\`\`

### Pattern 3: React/Vue

\`\`\`javascript
import '@hidearea-design/tokens/css/html/navigation/menu.css';

// React例
function Menu({ items, size = 'md', onSelect }) {
  return (
    <div className="ha-menu">
      <div className={\`menu size-\${size}\`} role="menu">
        {items.map((item, index) => {
          if (item.type === 'divider') {
            return <div key={index} className="divider" role="separator" />;
          }

          return (
            <button
              key={index}
              className={\`menu-item \${item.danger ? 'danger' : ''}\`}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => onSelect(item)}
            >
              {item.icon && (
                <span className="icon-slot">{item.icon}</span>
              )}
              <span className="content">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Dropdown例
function Dropdown({ trigger, items, size = 'md' }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <div className="ha-dropdown" ref={dropdownRef}>
      <div className="trigger" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      <div className={\`menu-container \${isOpen ? 'open' : ''}\`}>
        <div className={\`menu size-\${size}\`} role="menu">
          {items.map((item, index) => {
            if (item.type === 'divider') {
              return <div key={index} className="divider" role="separator" />;
            }

            return (
              <button
                key={index}
                className={\`menu-item \${item.danger ? 'danger' : ''}\`}
                role="menuitem"
                disabled={item.disabled}
                onClick={() => handleSelect(item)}
              >
                {item.icon && (
                  <span className="icon-slot">{item.icon}</span>
                )}
                <span className="content">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 使用例
<Dropdown
  trigger={<button>メニュー</button>}
  size="md"
  items={[
    { label: 'プロフィール', icon: <UserIcon />, onClick: () => {} },
    { label: '設定', icon: <SettingsIcon />, onClick: () => {} },
    { type: 'divider' },
    { label: 'ヘルプ', icon: <HelpIcon />, onClick: () => {} },
    { label: 'ログアウト', icon: <LogoutIcon />, danger: true, onClick: () => {} },
  ]}
/>
\`\`\`

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| \`size\` | \`sm\` \\| \`md\` \\| \`lg\` | \`md\` | メニューのサイズ |
| \`danger\` | \`boolean\` | \`false\` | 危険なアクションを示す（menu-item） |
| \`disabled\` | \`boolean\` | \`false\` | メニュー項目の無効化 |

---

## CSS変数

メニューコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- \`--primary-default\` - ホバー時の背景色/テキスト色
- \`--error-default\` - 危険なアクションの色
- \`--color-neutral-200\` - ボーダー、区切り線
- \`--color-neutral-400\` - 無効テキストの色
- \`--color-neutral-700\` - デフォルトテキスト色

### スペーシング
- \`--spacing-1\` - 0.25rem (sm パディング縦、区切り線マージン)
- \`--spacing-2\` - 0.5rem (md パディング縦、アイテム間ギャップ)
- \`--spacing-3\` - 0.75rem (sm パディング横、lg パディング縦)
- \`--spacing-4\` - 1rem (md パディング横、メニューパディング)
- \`--spacing-5\` - 1.25rem (lg パディング横)

### ボーダー
- \`--border-radius-base\` - 基本角丸

### シャドウ
- \`--shadow-lg\` - メニューの影

### アニメーション
- \`--animation-duration-base\` - 200ms
- \`--animation-easing-ease\` - ease

---

## アクセシビリティ

- \`role="menu"\`でメニューを識別
- \`role="menuitem"\`で各アイテムを識別
- \`role="separator"\`で区切り線を識別
- \`disabled\`属性で無効状態を表現
- キーボードナビゲーションのサポート
- \`aria-label\`でメニューの目的を説明

\`\`\`html
<!-- アクセシビリティの良い例 -->
<div class="ha-dropdown">
  <button
    id="menu-button"
    aria-haspopup="true"
    aria-expanded="false"
    aria-controls="menu-list"
  >
    メニュー
  </button>

  <div
    class="menu-container"
    id="menu-list"
    role="menu"
    aria-labelledby="menu-button"
  >
    <div class="menu">
      <button class="menu-item" role="menuitem">
        <span class="content">プロフィール</span>
      </button>
      <button class="menu-item" role="menuitem">
        <span class="content">設定</span>
      </button>
      <div class="divider" role="separator"></div>
      <button
        class="menu-item danger"
        role="menuitem"
        aria-label="アカウントからログアウト"
      >
        <span class="content">ログアウト</span>
      </button>
    </div>
  </div>
</div>
\`\`\`

### キーボード操作

- **Tab**: メニュートリガーにフォーカス
- **Enter/Space**: メニューを開く/項目を選択
- **Escape**: メニューを閉じる
- **Arrow Down**: 次の項目に移動
- **Arrow Up**: 前の項目に移動
- **Home**: 最初の項目に移動
- **End**: 最後の項目に移動

### JavaScript例（キーボードナビゲーション）

\`\`\`javascript
const menuButton = document.querySelector('[aria-haspopup="true"]');
const menu = document.querySelector('[role="menu"]');
const menuItems = menu.querySelectorAll('[role="menuitem"]:not([disabled])');
let currentIndex = -1;

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !isOpen);
  menu.parentElement.classList.toggle('open');

  if (!isOpen) {
    currentIndex = 0;
    menuItems[0]?.focus();
  }
});

menu.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      currentIndex = (currentIndex + 1) % menuItems.length;
      menuItems[currentIndex].focus();
      break;

    case 'ArrowUp':
      e.preventDefault();
      currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      menuItems[currentIndex].focus();
      break;

    case 'Home':
      e.preventDefault();
      currentIndex = 0;
      menuItems[0].focus();
      break;

    case 'End':
      e.preventDefault();
      currentIndex = menuItems.length - 1;
      menuItems[currentIndex].focus();
      break;

    case 'Escape':
      e.preventDefault();
      menuButton.setAttribute('aria-expanded', 'false');
      menu.parentElement.classList.remove('open');
      menuButton.focus();
      break;
  }
});

// メニュー外クリックで閉じる
document.addEventListener('click', (e) => {
  if (!menu.parentElement.contains(e.target)) {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.parentElement.classList.remove('open');
  }
});
\`\`\`

---

## ベストプラクティス

### ✅ 推奨

1. **論理的なグループ化**
   - 関連するアイテムをまとめる
   - 区切り線で視覚的に分離

2. **危険なアクションの分離**
   - 破壊的なアクションは最下部に配置
   - \`danger\`クラスで視覚的に区別

3. **適切なアイコンの使用**
   - アクションを視覚的に補強
   - 一貫性のあるアイコンセットを使用

4. **無効状態の適切な表示**
   - 条件が満たされない場合は無効化
   - 完全に非表示にしない

\`\`\`html
<!-- 適切なメニュー構成 -->
<div class="menu" role="menu">
  <!-- 主要アクション -->
  <button class="menu-item" role="menuitem">
    <span class="icon-slot"><svg>...</svg></span>
    <span class="content">新規作成</span>
  </button>
  <button class="menu-item" role="menuitem">
    <span class="icon-slot"><svg>...</svg></span>
    <span class="content">編集</span>
  </button>

  <div class="divider" role="separator"></div>

  <!-- 副次的アクション -->
  <button class="menu-item" role="menuitem">
    <span class="icon-slot"><svg>...</svg></span>
    <span class="content">共有</span>
  </button>
  <button class="menu-item" role="menuitem">
    <span class="icon-slot"><svg>...</svg></span>
    <span class="content">エクスポート</span>
  </button>

  <div class="divider" role="separator"></div>

  <!-- 破壊的アクション -->
  <button class="menu-item danger" role="menuitem">
    <span class="icon-slot"><svg>...</svg></span>
    <span class="content">削除</span>
  </button>
</div>
\`\`\`

### ❌ 非推奨

1. **メニューアイテムが多すぎる**
   - 7-10個以内に抑える
   - サブメニューやカテゴリ分けを検討

2. **不明確なラベル**
   - 具体的なアクションを示す
   - 「実行」「OK」などは避ける

3. **区切り線の過剰使用**
   - 意味のあるグループ化のみに使用

\`\`\`html
<!-- メニューアイテムが多すぎる（非推奨） -->
<div class="menu" role="menu">
  <button class="menu-item" role="menuitem">項目1</button>
  <button class="menu-item" role="menuitem">項目2</button>
  <button class="menu-item" role="menuitem">項目3</button>
  <!-- ...さらに10個以上続く -->
</div>

<!-- 区切り線が多すぎる（非推奨） -->
<div class="menu" role="menu">
  <button class="menu-item" role="menuitem">項目1</button>
  <div class="divider"></div>
  <button class="menu-item" role="menuitem">項目2</button>
  <div class="divider"></div>
  <button class="menu-item" role="menuitem">項目3</button>
  <div class="divider"></div>
</div>
\`\`\`

---

## バリエーション

### ショートカット表示付きメニュー

\`\`\`html
<button class="menu-item" role="menuitem">
  <span class="icon-slot"><svg>...</svg></span>
  <span class="content">保存</span>
  <span style="margin-left: auto; opacity: 0.6;">Ctrl+S</span>
</button>
\`\`\`

### チェックマーク付きメニュー

\`\`\`html
<button class="menu-item" role="menuitemcheckbox" aria-checked="true">
  <span class="icon-slot">
    <svg><!-- チェックマーク --></svg>
  </span>
  <span class="content">通知を有効にする</span>
</button>
\`\`\`

---

## テーマ対応

全てのメニュートークンはテーマに対応しています。\`data-theme\` 属性を変更するだけで、自動的にダークモードに切り替わります。

\`\`\`html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-menu">
    <div class="menu" role="menu">
      <button class="menu-item" role="menuitem">項目</button>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-menu">
    <div class="menu" role="menu">
      <button class="menu-item" role="menuitem">項目</button>
    </div>
  </div>
</html>
\`\`\`

---

## 関連コンポーネント

- [Button](../layout/button.md) - メニュートリガーボタン
- [Dropdown](../overlays/dropdown.md) - ドロップダウンコンテナ
- [Tabs](./tabs.md) - タブナビゲーション

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)

---

**最終更新:** 2025-12-12
