# コンポーネント一覧

Hidearea Designで利用可能な全21コンポーネントの概要です。

## フォームコンポーネント（8個）

### Button
汎用的なボタンコンポーネント。5つのバリアント（primary, secondary, outline, ghost, danger）と3つのサイズ（sm, md, lg）をサポート。

[詳細を見る →](/components/button)

### Input
テキスト入力フィールド。3つのバリアント（default, filled, outlined）と複数の入力タイプをサポート。

[詳細を見る →](/components/input)

### Checkbox
チェックボックス。indeterminate状態をサポート。

[詳細を見る →](/components/checkbox)

### FormGroup
フォームフィールドのラッパー。ラベル、ヘルパーテキスト、エラーメッセージを表示。

[詳細を見る →](/components/form-group)

### Select
ドロップダウン選択フィールド。optgroupをサポート。

[詳細を見る →](/components/select)

### Radio
ラジオボタン。自動グループ化機能。

[詳細を見る →](/components/radio)

### Textarea
複数行テキスト入力フィールド。resize制御をサポート。

[詳細を見る →](/components/textarea)

### Switch
トグルスイッチ。ON/OFF状態の切り替え。

[詳細を見る →](/components/switch)

---

## レイアウトコンポーネント（3個）

### Container
コンテンツのコンテナ。6種類の最大幅（sm, md, lg, xl, 2xl, full）をサポート。

[詳細を見る →](/components/container)

### Grid
グリッドレイアウト。12カラムシステムまたはカスタムカラム数をサポート。

[詳細を見る →](/components/grid)

### Stack
垂直・水平スタックレイアウト。flexboxベースの柔軟なレイアウト。

[詳細を見る →](/components/stack)

---

## フィードバックコンポーネント（5個）

### Alert
通知メッセージ。4つのバリアント（info, success, warning, error）と3つのスタイル（filled, outlined, soft）。

[詳細を見る →](/components/alert)

### Badge
小さなラベルバッジ。6つのバリアントと3つのスタイル。

[詳細を見る →](/components/badge)

### Card
コンテンツカード。3つのバリアント（default, outlined, elevated）とカスタマイズ可能なパディング。

[詳細を見る →](/components/card)

### Progress
プログレスバー。3つのバリアント（default, striped, animated）。

[詳細を見る →](/components/progress)

### Spinner
ローディングインジケーター。3つのバリアント（circular, dots, pulse）と5つのサイズ。

[詳細を見る →](/components/spinner)

---

## ナビゲーションコンポーネント（4個）✨ NEW

### Tooltip
ツールチップ。12種類の配置オプションと3つのトリガーモード（hover, focus, click）。

[詳細を見る →](/components/tooltip)

### Tabs
タブコンポーネント。3つのバリアント（default, outlined, pills）とキーボードナビゲーション。

[詳細を見る →](/components/tabs)

### Breadcrumb
パンくずリスト。4種類のセパレーター（slash, chevron, arrow, dot）。

[詳細を見る →](/components/breadcrumb)

### Menu/Dropdown
ドロップダウンメニュー。8種類の配置オプションとキーボードナビゲーション。

[詳細を見る →](/components/menu)

---

## コンポーネント選択ガイド

### フォーム作成時
1. **FormGroup** - フィールドのラベルとエラー表示
2. **Input** - テキスト入力
3. **Select** - 選択肢から選択
4. **Checkbox/Radio** - 複数選択/単一選択
5. **Textarea** - 長文入力
6. **Switch** - ON/OFF切り替え
7. **Button** - 送信ボタン

### レイアウト構築時
1. **Container** - ページ全体のコンテナ
2. **Grid** - グリッドレイアウト
3. **Stack** - 要素の積み重ね

### フィードバック表示時
1. **Alert** - 重要な通知
2. **Badge** - ステータス表示
3. **Spinner** - 読み込み中
4. **Progress** - 進捗状況

### ナビゲーション
1. **Breadcrumb** - 現在位置の表示
2. **Tabs** - コンテンツの切り替え
3. **Menu** - アクションメニュー
4. **Tooltip** - 補足情報の表示

## 統計

| カテゴリ | コンポーネント数 | テスト数 | Storybookストーリー |
|----------|-----------------|----------|---------------------|
| フォーム | 8 | 434 | 95 |
| レイアウト | 3 | 91 | 42 |
| フィードバック | 5 | 150 | 63 |
| ナビゲーション | 4 | 136 | 30 |
| **合計** | **21** | **811** | **203** |

## 今後の予定

### Phase 6: モーダル・高度なフィードバック
- Modal/Dialog
- Toast/Notification
- Pagination
- Avatar

### Phase 7: データ表示・レイアウト拡張
- Table
- Accordion
- Sidebar/Drawer
- List

### Phase 8: 追加・オプション
- Skeleton Loader
- DataGrid
