# コンポーネント一覧

Hidearea Designで利用可能な全30コンポーネントの概要です。

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

## フィードバック・表示コンポーネント（6個）

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

### Skeleton ✨ NEW
ローディングプレースホルダー。3つのバリアント（text, circular, rectangular）と3つのアニメーション（pulse, wave, none）。

[詳細を見る →](/components/skeleton)

---

## ナビゲーションコンポーネント（4個）

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

## モーダル・通知コンポーネント（4個）

### Modal
モーダルダイアログ。3つのサイズ（sm, md, lg）とカスタマイズ可能なヘッダー・フッター。

### Toast
トースト通知。4つのバリアント（info, success, warning, error）と5つの配置オプション。

### Pagination
ページネーション。前後ページ、最初・最後のページへのナビゲーション。

### Avatar
アバター画像。4つのサイズ（sm, md, lg, xl）とグループ表示対応。

---

## データ表示・レイアウト拡張（4個）

### Table
データテーブル。3つのバリアント（default, striped, bordered）とカスタマイズ可能なレイアウト。

### Accordion
アコーディオン。単一・複数展開モードとアニメーション対応。

### Drawer
サイドドロワー。4つの配置（left, right, top, bottom）とオーバーレイ。

### List
リストコンポーネント。3つのバリアント（default, bordered, divided）。

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
5. **Skeleton** - コンテンツローディング中のプレースホルダー

### ナビゲーション
1. **Breadcrumb** - 現在位置の表示
2. **Tabs** - コンテンツの切り替え
3. **Menu** - アクションメニュー
4. **Tooltip** - 補足情報の表示

### モーダル・通知
1. **Modal** - ダイアログ表示
2. **Toast** - 一時的な通知
3. **Pagination** - ページ切り替え
4. **Avatar** - ユーザーアイコン

### データ表示
1. **Table** - データテーブル
2. **List** - リスト表示
3. **Accordion** - 折りたたみ可能なコンテンツ
4. **Drawer** - サイドパネル

## 統計

| カテゴリ | コンポーネント数 | テスト数 | Storybookストーリー |
|----------|-----------------|----------|---------------------|
| フォーム | 8 | 434 | 95 |
| レイアウト | 3 | 91 | 42 |
| フィードバック・表示 | 6 | 173 | 73 |
| ナビゲーション | 4 | 136 | 30 |
| モーダル・通知 | 4 | 151 | 38 |
| データ表示 | 4 | 132 | 30 |
| **合計** | **30** | **1,117** | **282** |

## 今後の予定

### Phase 8 Part 2: DataGrid（高度なデータグリッド）
- ソート、フィルタリング、ページネーション機能
- 編集可能なセル
- カラムリサイズ・並び替え
- 大量データのパフォーマンス最適化
