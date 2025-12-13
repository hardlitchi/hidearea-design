# コンポーネントドキュメント更新ガイド

このガイドは、各コンポーネントのドキュメントを実装に合わせて更新するための手順書です。

## 更新済みコンポーネント

- ✅ Button (layout/button.md) - 2025-12-12
- ✅ Input (forms/input.md) - 2025-12-12

## 更新が必要なコンポーネント

### Forms カテゴリ (8コンポーネント残)
- [ ] Checkbox - docs/components/forms/checkbox.md
- [ ] Radio - docs/components/forms/radio.md
- [ ] Select - docs/components/forms/select.md
- [ ] Switch - docs/components/forms/switch.md
- [ ] Textarea - docs/components/forms/textarea.md
- [ ] Date Picker - 📝 ドキュメント未作成
- [ ] File Upload - 📝 ドキュメント未作成
- [ ] Form Group - 📝 ドキュメント未作成
- [ ] Time Picker - 📝 ドキュメント未作成

### Feedback カテゴリ (5コンポーネント)
- [ ] Alert - docs/components/feedback/alert.md
- [ ] Progress - docs/components/feedback/progress.md
- [ ] Skeleton - docs/components/feedback/skeleton.md
- [ ] Spinner - docs/components/feedback/spinner.md
- [ ] Toast - docs/components/feedback/toast.md
- [ ] Toast Container - 📝 ドキュメント未作成

### Data Display カテゴリ追加
- [ ] Badge - docs/components/data-display/badge.md (Feedback → Data Display に移動済み)

### Data Display カテゴリ (11コンポーネント)
- [ ] Avatar - docs/components/data-display/avatar.md
- [ ] Card - docs/components/data-display/card.md
- [ ] Chip - docs/components/data-display/chip.md
- [ ] List - docs/components/data-display/list.md (3ファイルに分割が必要)
- [ ] Table - docs/components/data-display/table.md
- [ ] Accordion - 📝 ドキュメント未作成
- [ ] Avatar Group - 📝 ドキュメント未作成
- [ ] Datagrid - 📝 ドキュメント未作成

### Layout カテゴリ (3コンポーネント残)
- [ ] Container - 📝 ドキュメント未作成
- [ ] Grid - 📝 ドキュメント未作成
- [ ] Stack - 📝 ドキュメント未作成

### Overlays カテゴリ (3コンポーネント)
- [ ] Drawer - docs/components/overlays/drawer.md
- [ ] Modal - docs/components/overlays/modal.md
- [ ] Tooltip - docs/components/overlays/tooltip.md

### Navigation カテゴリ (4コンポーネント)
- [ ] Breadcrumb - docs/components/navigation/breadcrumb.md
- [ ] Menu - docs/components/navigation/menu.md
- [ ] Pagination - docs/components/navigation/pagination.md
- [ ] Tabs - docs/components/navigation/tabs.md

---

## 更新手順

### 1. 実装の確認

```bash
# コンポーネントのCSSファイルを確認
cat src/css/components/{category}/{component}.css

# バリアントとサイズを抽出
grep -n "Variant:\|Size:" src/css/components/{category}/{component}.css

# 属性セレクタを確認
grep ":host\[" src/css/components/{category}/{component}.css
```

### 2. ドキュメントテンプレート

各コンポーネントのドキュメントは以下の構成で作成してください:

```markdown
# {ComponentName} コンポーネント

**カテゴリ:** {Category}
**ファイル:** `src/css/components/{category}/{component}.css`
**ステータス:** ✅ 実装済み

---

## 概要

{コンポーネントの説明}

### 用途

- {用途1}
- {用途2}
- {用途3}

---

## バリアント

### 1. {Variant1}

{説明}

**使用場面:**
- {場面1}
- {場面2}

**スタイル:**
- {スタイル特性}

---

## サイズ (該当する場合)

### Small (sm)
- {詳細}

### Medium (md) - デフォルト
- {詳細}

### Large (lg)
- {詳細}

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

\```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/{category}/{component}.css">
</head>
<body>
  <!-- 基本的な使用例 -->
  <div class="ha-{component}" variant="{variant}" size="{size}">
    {内部構造}
  </div>

  <!-- バリアント例 -->
  {各バリアントの例}

  <!-- 状態例 -->
  {各状態の例}
</body>
</html>
\```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | {値} | {デフォルト} | {説明} |
| `size` | {値} | {デフォルト} | {説明} |

---

## CSS変数

### 色関連
- `--{token-name}` - {説明}

### スペーシング
- `--spacing-{n}` - {値}

### その他
- {その他の変数}

---

## アクセシビリティ

\```html
<!-- アクセシビリティの良い例 -->
{ARIA属性を使った例}
\```

---

## ベストプラクティス

### ✅ 推奨

\```html
{推奨される使い方}
\```

### ❌ 非推奨

\```html
{避けるべき使い方}
\```

---

## 関連コンポーネント

- [{RelatedComponent1}](./path/to/component.md) - {説明}
- [{RelatedComponent2}](./path/to/component.md) - {説明}

---

**最終更新:** {日付}
```

---

## チェックリスト

各コンポーネントのドキュメントを更新する際、以下をチェックしてください:

- [ ] ファイルパスが実装ファイルと一致している (`src/css/components/` から始まる)
- [ ] カテゴリが正しい (forms/feedback/data-display/layout/overlays/navigation)
- [ ] バリアント数が実装と一致している
- [ ] サイズ数が実装と一致している
- [ ] YAMLトークン参照を削除している
- [ ] `.ha-*` クラスセレクタを使用している
- [ ] 4つのビルドパターンのうち、最低でもPattern 2 (HTML) の例がある
- [ ] アクセシビリティの例がある
- [ ] ベストプラクティスセクションがある
- [ ] 関連コンポーネントへのリンクがある
- [ ] 最終更新日が記載されている

---

## 参考: 実装ファイルの構造

```css
/* 典型的なコンポーネントCSS構造 */

:host {
  /* ホスト要素のスタイル */
}

/* 内部要素のスタイル */
.element {
  /* ... */
}

/* Variant: {Name} */
:host([variant="{name}"]) .element {
  /* ... */
}

/* Size: {Name} */
:host([size="{name}"]) .element {
  /* ... */
}

/* 状態 */
:host([disabled]) .element {
  /* ... */
}

:host([error]) .element {
  /* ... */
}
```

---

## ドキュメント作成の優先順位

1. **高優先度** (よく使われるコンポーネント):
   - Card, Alert, Badge (Feedback/Data Display)
   - Checkbox, Radio, Select (Forms)

2. **中優先度**:
   - Modal, Tooltip (Overlays)
   - Tabs, Pagination (Navigation)
   - Avatar, Chip (Data Display)

3. **低優先度**:
   - Container, Grid, Stack (Layout - シンプルなので後回し可)
   - Date Picker, File Upload (Forms - 複雑だが使用頻度低め)

---

## 注意事項

1. **カテゴリ変更があったコンポーネント**
   - Button: forms → layout に移動済み

2. **実装が無いコンポーネント**
   - Dialog, Popover, Dropdown は実装されていないため、ドキュメントを削除または「未実装」マークを付ける

3. **複数ファイルに分割されているコンポーネント**
   - List: list-container, list-divider, list-item の3ファイル
   - Toast: toast, toast-container の2ファイル
   - Avatar: avatar, avatar-group の2ファイル

---

**作成日:** 2025-12-12
**作成者:** Claude Code
