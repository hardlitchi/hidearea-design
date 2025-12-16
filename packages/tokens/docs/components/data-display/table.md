# Table (テーブル) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/css/components/data-display/table.css`
**ステータス:** ✅ 実装済み

---

## 概要

Tableコンポーネントは、構造化されたデータを行と列で整理して表示するコンポーネントです。
4つのバリアント（default, bordered, striped, hoverable）をサポートし、
ソート、選択、レスポンシブ表示などの機能を提供します。

### 用途

- データの一覧表示
- 比較表やレポート表示
- ユーザーリストや商品カタログ
- 統計データ表示

---

## バリアント

### 1. Default (デフォルト)

標準的なテーブルスタイルです。ボーダーなし、ストライプなしのシンプルな表示です。

**使用場面:**
- シンプルなデータ表示
- 少量のデータ
- ミニマルなデザインが必要な場合

### 2. Bordered (ボーダー付き)

すべてのセルにボーダーが表示されます。

**使用場面:**
- データの区切りを明確にする必要がある場合
- 複雑なデータ構造
- フォーマルな文書

### 3. Striped (ストライプ)

交互に行の背景色が変わるゼブラストライプ表示です。

**使用場面:**
- 多数の行がある場合
- 行の識別を容易にする
- 可読性の向上

### 4. Hoverable (ホバー可能)

マウスオーバー時に行がハイライトされます。

**使用場面:**
- クリック可能な行
- インタラクティブなテーブル
- 行の選択を促す場合

---

## 機能

### Sortable (ソート可能)

列ヘッダーをクリックすることでデータをソートできます。

### Selectable (選択可能)

チェックボックスを使用して行を選択できます。

### Responsive (レスポンシブ)

小さい画面ではスクロール可能になります。

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- デフォルトテーブル -->
<ha-table>
  <table class="table">
    <thead>
      <tr>
        <th>名前</th>
        <th>メール</th>
        <th>役割</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>山田太郎</td>
        <td>yamada@example.com</td>
        <td>管理者</td>
      </tr>
    </tbody>
  </table>
</ha-table>

<!-- ボーダー付きテーブル -->
<ha-table variant="bordered">
  <table class="table table--bordered">
    <thead>...</thead>
    <tbody>...</tbody>
  </table>
</ha-table>

<!-- ストライプテーブル -->
<ha-table variant="striped">
  <table class="table table--striped">
    <thead>...</thead>
    <tbody>...</tbody>
  </table>
</ha-table>

<!-- ホバー可能テーブル -->
<ha-table variant="hoverable">
  <table class="table table--hoverable">
    <thead>...</thead>
    <tbody>...</tbody>
  </table>
</ha-table>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/table.css">
</head>
<body>
  <!-- デフォルトテーブル -->
  <div class="ha-table">
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">名前</th>
            <th scope="col">メール</th>
            <th scope="col">役割</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>山田太郎</td>
            <td>yamada@example.com</td>
            <td>管理者</td>
          </tr>
          <tr>
            <td>佐藤花子</td>
            <td>sato@example.com</td>
            <td>編集者</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ボーダー付きテーブル -->
  <div class="ha-table">
    <div class="table-wrapper">
      <table class="table table--bordered">
        <thead>
          <tr>
            <th scope="col">商品名</th>
            <th scope="col">価格</th>
            <th scope="col">在庫</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>商品A</td>
            <td>¥1,200</td>
            <td>50</td>
          </tr>
          <tr>
            <td>商品B</td>
            <td>¥2,400</td>
            <td>32</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ストライプテーブル -->
  <div class="ha-table">
    <div class="table-wrapper">
      <table class="table table--striped">
        <thead>
          <tr>
            <th scope="col">商品名</th>
            <th scope="col">価格</th>
            <th scope="col">在庫</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>商品A</td>
            <td>¥1,200</td>
            <td>50</td>
          </tr>
          <tr>
            <td>商品B</td>
            <td>¥2,400</td>
            <td>32</td>
          </tr>
          <tr>
            <td>商品C</td>
            <td>¥800</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ホバー可能テーブル -->
  <div class="ha-table">
    <div class="table-wrapper">
      <table class="table table--hoverable">
        <thead>
          <tr>
            <th scope="col">タスク</th>
            <th scope="col">ステータス</th>
            <th scope="col">期限</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>レポート作成</td>
            <td>完了</td>
            <td>2025-12-15</td>
          </tr>
          <tr>
            <td>会議準備</td>
            <td>進行中</td>
            <td>2025-12-20</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 選択可能テーブル -->
  <div class="ha-table">
    <div class="table-wrapper">
      <table class="table table--hoverable" role="grid" aria-label="選択可能なタスク一覧">
        <thead>
          <tr>
            <th scope="col" style="width: 40px;">
              <input type="checkbox" aria-label="すべて選択">
            </th>
            <th scope="col">タスク</th>
            <th scope="col">ステータス</th>
          </tr>
        </thead>
        <tbody>
          <tr aria-selected="true">
            <td>
              <input type="checkbox" checked aria-label="タスクを選択">
            </td>
            <td>レポート作成</td>
            <td>完了</td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" aria-label="タスクを選択">
            </td>
            <td>会議準備</td>
            <td>進行中</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import { tableStyles } from '@hidearea-design/tokens/styles/table';

// React例
function Table({ data, columns, variant = 'default', selectable = false }) {
  return (
    <div className="ha-table">
      <div className="table-wrapper">
        <table className={`table ${variant !== 'default' ? `table--${variant}` : ''}`}>
          <thead>
            <tr>
              {selectable && (
                <th scope="col" style={{ width: '40px' }}>
                  <input type="checkbox" aria-label="すべて選択" />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} scope="col">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id}>
                {selectable && (
                  <td>
                    <input type="checkbox" aria-label="行を選択" />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 使用例
<Table
  data={users}
  columns={[
    { key: 'name', header: '名前' },
    { key: 'email', header: 'メール' },
    { key: 'role', header: '役割' }
  ]}
  variant="striped"
  selectable
/>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | - | - | テーブルのバリアント（クラスで指定） |

### クラス修飾子

| クラス | 説明 |
|--------|------|
| `.table--bordered` | ボーダー付きテーブル |
| `.table--striped` | ストライプテーブル |
| `.table--hoverable` | ホバー可能テーブル |
| `.table--compact` | コンパクトなパディング |
| `.table--full-width` | 幅100%のテーブル |

---

## CSS変数

Tableコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- `--table-border-color` - `var(--border-default)` - ボーダーカラー
- `--table-header-bg` - `var(--foreground-inverse)` - ヘッダー背景色
- `--table-row-hover-bg` - `var(--foreground-inverse)` - ホバー時背景色
- `--table-striped-bg` - `var(--foreground-inverse)` - ストライプ背景色
- `--foreground-primary` - テキストカラー

### スペーシング
- `--table-padding` - `var(--spacing-3)` - セルパディング（通常）
- `--table-padding-compact` - `var(--spacing-2)` - セルパディング（コンパクト）
- `--spacing-3` - 0.75rem (12px)
- `--spacing-2` - 0.5rem (8px)

### ボーダー
- `--border-radius-base` - 基本角丸

### タイポグラフィ
- `--font-size-base` - フォントサイズ
- `--font-weight-semibold` - ヘッダーフォントウェイト

---

## アクセシビリティ

### セマンティックHTML

適切なテーブル要素とscope属性を使用します:

```html
<div class="ha-table">
  <div class="table-wrapper">
    <table class="table">
      <caption>ユーザー一覧</caption>
      <thead>
        <tr>
          <th scope="col">名前</th>
          <th scope="col">メール</th>
          <th scope="col">役割</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">山田太郎</th>
          <td>yamada@example.com</td>
          <td>管理者</td>
        </tr>
        <tr>
          <th scope="row">佐藤花子</th>
          <td>sato@example.com</td>
          <td>編集者</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### ARIA属性

```html
<!-- ソート可能なテーブル -->
<div class="ha-table">
  <div class="table-wrapper">
    <table class="table" role="grid" aria-label="ソート可能なユーザー一覧">
      <thead>
        <tr role="row">
          <th role="columnheader" aria-sort="ascending" tabindex="0">
            名前
          </th>
          <th role="columnheader" tabindex="0">
            メール
          </th>
        </tr>
      </thead>
      <tbody>
        <tr role="row">
          <td role="gridcell">山田太郎</td>
          <td role="gridcell">yamada@example.com</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- 選択可能なテーブル -->
<div class="ha-table">
  <div class="table-wrapper">
    <table class="table table--hoverable" aria-label="選択可能なタスク一覧">
      <thead>
        <tr>
          <th scope="col"><input type="checkbox" aria-label="すべて選択"></th>
          <th scope="col">タスク</th>
        </tr>
      </thead>
      <tbody>
        <tr aria-selected="true">
          <td><input type="checkbox" checked aria-label="タスクを選択"></td>
          <td>レポート作成</td>
        </tr>
        <tr>
          <td><input type="checkbox" aria-label="タスクを選択"></td>
          <td>会議準備</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### キーボード操作

- **Tab**: セル間、チェックボックス、ソート可能なヘッダーを移動
- **Space**: チェックボックスの切り替え
- **Enter**: ソート可能なヘッダーでソート実行
- **Arrow keys**: グリッドモードでセル間をナビゲート

### headers属性

複雑なテーブルでは`headers`属性を使用:

```html
<table class="ha-table">
  <thead>
    <tr>
      <th id="name" scope="col">名前</th>
      <th id="email" scope="col">メール</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td headers="name">山田太郎</td>
      <td headers="email">yamada@example.com</td>
    </tr>
  </tbody>
</table>
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切なscope属性の使用**
   - `th scope="col"`で列ヘッダー、`th scope="row"`で行ヘッダーを指定

2. **caption要素でテーブルの説明**
   - テーブルの内容を簡潔に説明

3. **数値データは右揃え**
   - 価格、数量などは右揃えで表示

4. **レスポンシブ対応**
   - 小さい画面ではスクロール可能にする

```html
<!-- 適切な実装 -->
<div class="ha-table">
  <div class="table-wrapper">
    <table class="table table--striped">
      <caption>2025年第4四半期 売上データ</caption>
      <thead>
        <tr>
          <th scope="col">商品</th>
          <th scope="col" style="text-align: right;">売上</th>
          <th scope="col" style="text-align: right;">数量</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>商品A</td>
          <td style="text-align: right;">¥1,200,000</td>
          <td style="text-align: right;">500</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### ❌ 非推奨

1. **divやspanでテーブルを作成**
   - 適切なセマンティックHTMLを使用

2. **scope属性の省略**
   - アクセシビリティを損なう

3. **レイアウトテーブルの使用**
   - CSS Grid/Flexboxを使用

```html
<!-- 不適切な実装 -->
<div class="fake-table">
  <div class="row">
    <div class="cell">名前</div>
    <div class="cell">メール</div>
  </div>
</div>

<!-- scope属性なし -->
<table>
  <thead>
    <tr>
      <th>名前</th>
      <th>メール</th>
    </tr>
  </thead>
</table>
```

---

## テーマ対応

全てのTableトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-table">
    <div class="table-wrapper">
      <table class="table table--striped">
        <thead>...</thead>
        <tbody>...</tbody>
      </table>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-table">
    <div class="table-wrapper">
      <table class="table table--striped">
        <thead>...</thead>
        <tbody>...</tbody>
      </table>
    </div>
  </div>
</html>
```

---

## 関連コンポーネント

- [Card](./card.md) - カード形式のデータ表示
- [List](./list.md) - リスト形式の表示
- [Checkbox](../forms/checkbox.md) - 行選択用チェックボックス

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)

---

**最終更新:** 2025-12-12
