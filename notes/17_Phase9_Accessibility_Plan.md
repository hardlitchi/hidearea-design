# Phase 9 - Option B: アクセシビリティ向上計画

**作成日**: 2025-12-06
**対象**: 全36コンポーネント
**目標**: WCAG 2.1 AA準拠

---

## 概要

このフェーズでは、Hidearea Design Systemの全36コンポーネントについて、アクセシビリティを大幅に向上させます。

### 目標

1. **WCAG 2.1 AA準拠**: すべてのコンポーネントがWCAG 2.1 AAレベルに準拠
2. **スクリーンリーダー対応**: すべてのコンポーネントが主要なスクリーンリーダー（NVDA, JAWS, VoiceOver）で適切に読み上げられる
3. **キーボードナビゲーション**: すべてのインタラクティブコンポーネントがキーボードのみで操作可能
4. **フォーカス管理**: 適切なフォーカスインジケーターとフォーカス順序
5. **ARIAベストプラクティス**: WAI-ARIA 1.2に準拠したラベル・ロール・ステート実装

---

## WCAG 2.1 AAチェックリスト

### 知覚可能 (Perceivable)

- [ ] **1.1.1 非テキストコンテンツ**: すべての非テキストコンテンツに代替テキスト
- [ ] **1.3.1 情報と関係性**: マークアップで構造を伝達
- [ ] **1.3.2 意味のある順序**: 適切なDOM順序
- [ ] **1.3.3 感覚的な特徴**: 色のみに依存しない情報伝達
- [ ] **1.3.4 表示の向き**: 縦横両方向に対応
- [ ] **1.3.5 入力目的の特定**: autocomplete属性の適切な使用
- [ ] **1.4.1 色の使用**: 色だけで情報を伝えない
- [ ] **1.4.3 コントラスト (最小)**: 4.5:1以上のコントラスト比
- [ ] **1.4.4 テキストのサイズ変更**: 200%まで拡大可能
- [ ] **1.4.10 リフロー**: 320pxまでスクロールなしで表示
- [ ] **1.4.11 非テキストコントラスト**: UI要素3:1以上
- [ ] **1.4.12 テキストの間隔**: 行間、段落間隔の調整可能
- [ ] **1.4.13 ホバーまたはフォーカスで表示されるコンテンツ**: Tooltipなどの適切な実装

### 操作可能 (Operable)

- [ ] **2.1.1 キーボード**: すべての機能をキーボードで操作可能
- [ ] **2.1.2 キーボードトラップなし**: フォーカスが閉じ込められない
- [ ] **2.1.4 文字キーのショートカット**: 無効化・再マッピング可能
- [ ] **2.4.3 フォーカス順序**: 論理的なフォーカス順序
- [ ] **2.4.5 複数の手段**: 複数の方法でアクセス可能
- [ ] **2.4.6 見出しおよびラベル**: わかりやすいラベル
- [ ] **2.4.7 フォーカスの可視化**: 明確なフォーカスインジケーター
- [ ] **2.5.1 ポインタのジェスチャー**: 単純なポインタ操作
- [ ] **2.5.2 ポインタのキャンセル**: クリック操作のキャンセル可能
- [ ] **2.5.3 ラベルを含む名前**: アクセシブル名にラベルテキストを含む
- [ ] **2.5.4 動きによる起動**: モーション操作の代替手段

### 理解可能 (Understandable)

- [ ] **3.1.1 ページの言語**: lang属性の設定
- [ ] **3.2.1 フォーカス時**: フォーカスで予期しない変化なし
- [ ] **3.2.2 入力時**: 入力で予期しない変化なし
- [ ] **3.2.3 一貫したナビゲーション**: 一貫したUI
- [ ] **3.2.4 一貫した識別性**: 同じ機能には同じラベル
- [ ] **3.3.1 エラーの特定**: エラーの明確な識別
- [ ] **3.3.2 ラベルまたは説明**: フォーム要素のラベル
- [ ] **3.3.3 エラー修正の提案**: エラー修正方法の提示
- [ ] **3.3.4 エラー回避 (法的、金融、データ)**: 重要な操作の確認

### 頑健性 (Robust)

- [ ] **4.1.1 構文解析**: 有効なHTML
- [ ] **4.1.2 名前 (name)、役割 (role)、値 (value)**: 適切なARIA属性
- [ ] **4.1.3 ステータスメッセージ**: ライブリージョンの適切な使用

---

## コンポーネント別アクセシビリティチェックリスト

### フォーム系コンポーネント (12個)

#### 1. Button
**現状**: 基本的なARIA対応あり
**改善点**:
- [ ] `aria-pressed` for toggle buttons
- [ ] `aria-expanded` for expandable buttons
- [ ] `aria-haspopup` for menu buttons
- [ ] disabled状態で `aria-disabled="true"`
- [ ] loading状態で `aria-busy="true"`
- [ ] アイコンのみボタンに `aria-label`

#### 2. Input
**現状**: 基本的なフォーム要素
**改善点**:
- [ ] `aria-invalid` for error state
- [ ] `aria-describedby` for help text
- [ ] `aria-required` for required fields
- [ ] `autocomplete` 属性の適切な使用
- [ ] エラーメッセージの関連付け

#### 3. Textarea
**現状**: 基本的なフォーム要素
**改善点**:
- [ ] `aria-invalid` for error state
- [ ] `aria-describedby` for help text
- [ ] `aria-required` for required fields
- [ ] 文字数カウンターに `aria-live`

#### 4. Checkbox
**現状**: 基本的なARIA対応あり
**改善点**:
- [ ] `aria-checked` state management
- [ ] indeterminate状態で `aria-checked="mixed"`
- [ ] `aria-describedby` for help text
- [ ] グループ化に `role="group"` と `aria-labelledby`

#### 5. Radio
**現状**: 基本的なARIA対応あり
**改善点**:
- [ ] `role="radiogroup"` でグループ化
- [ ] `aria-labelledby` でグループラベル
- [ ] 矢印キーでのナビゲーション
- [ ] `aria-checked` state

#### 6. Switch
**現状**: トグルスイッチ
**改善点**:
- [ ] `role="switch"`
- [ ] `aria-checked` state
- [ ] `aria-labelledby` or `aria-label`
- [ ] Space/Enterキーでトグル

#### 7. Select
**現状**: カスタムセレクト
**改善点**:
- [ ] `role="combobox"` or `role="listbox"`
- [ ] `aria-expanded` state
- [ ] `aria-activedescendant` for active option
- [ ] `aria-labelledby` or `aria-label`
- [ ] 矢印キー、Home/Endキーナビゲーション
- [ ] typeahead検索

#### 8. Slider
**現状**: 新規実装
**改善点**:
- [ ] `role="slider"`
- [ ] `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- [ ] `aria-valuetext` for formatted value
- [ ] `aria-orientation` for vertical sliders
- [ ] 矢印キー、PageUp/PageDownキーで値変更

#### 9. DatePicker
**現状**: 新規実装
**改善点**:
- [ ] `role="dialog"` for calendar popup
- [ ] `aria-label` for calendar grid
- [ ] `aria-selected` for selected dates
- [ ] 矢印キーで日付ナビゲーション
- [ ] Escapeでポップアップを閉じる

#### 10. TimePicker
**現状**: 新規実装
**改善点**:
- [ ] `role="listbox"` for time selection
- [ ] `aria-activedescendant` for active time
- [ ] 矢印キーでナビゲーション
- [ ] 時刻の読み上げ最適化

#### 11. ColorPicker
**現状**: 新規実装
**改善点**:
- [ ] `role="slider"` for hue/saturation/lightness
- [ ] `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- [ ] `aria-valuetext` for color description
- [ ] 矢印キーで色変更
- [ ] HEX入力フィールドのラベル

#### 12. FileUpload
**現状**: 新規実装
**改善点**:
- [ ] `aria-label` for file input
- [ ] ドロップゾーンに `aria-describedby`
- [ ] アップロード中に `aria-busy="true"`
- [ ] `role="list"` for file list
- [ ] `role="listitem"` for each file
- [ ] 削除ボタンに `aria-label`

### ナビゲーション系コンポーネント (6個)

#### 13. Tabs
**現状**: タブナビゲーション
**改善点**:
- [ ] `role="tablist"`, `role="tab"`, `role="tabpanel"`
- [ ] `aria-selected` for active tab
- [ ] `aria-controls` linking tab to panel
- [ ] `aria-labelledby` linking panel to tab
- [ ] 矢印キーでタブナビゲーション
- [ ] Home/Endキー

#### 14. Menu
**現状**: ドロップダウンメニュー
**改善点**:
- [ ] `role="menu"`, `role="menuitem"`
- [ ] `role="menuitemcheckbox"` for checkable items
- [ ] `role="menuitemradio"` for radio items
- [ ] `aria-haspopup="true"` for trigger
- [ ] `aria-expanded` state
- [ ] 矢印キーでナビゲーション
- [ ] Escapeでメニューを閉じる

#### 15. Breadcrumb
**現状**: パンくずリスト
**改善点**:
- [ ] `nav` with `aria-label="Breadcrumb"`
- [ ] `ol` list structure
- [ ] `aria-current="page"` for current page
- [ ] separator の適切な実装（視覚のみ）

#### 16. Pagination
**現状**: ページネーション
**改善点**:
- [ ] `nav` with `aria-label="Pagination"`
- [ ] `aria-current="page"` for current page
- [ ] `aria-label` for prev/next buttons
- [ ] disabled状態の適切な処理

#### 17. Accordion
**現状**: アコーディオン
**改善点**:
- [ ] `button` for trigger
- [ ] `aria-expanded` state
- [ ] `aria-controls` linking button to panel
- [ ] `id` and `aria-labelledby` for panel
- [ ] Space/Enterキーでトグル

#### 18. Drawer
**現状**: サイドドロワー
**改善点**:
- [ ] `role="dialog"` or `role="complementary"`
- [ ] `aria-modal="true"` for modal drawers
- [ ] `aria-labelledby` for title
- [ ] Escapeで閉じる
- [ ] フォーカストラップ

### フィードバック系コンポーネント (6個)

#### 19. Alert
**現状**: アラート
**改善点**:
- [ ] `role="alert"` for important alerts
- [ ] `role="status"` for status updates
- [ ] `aria-live="polite"` or `"assertive"`
- [ ] `aria-atomic="true"`
- [ ] 閉じるボタンに `aria-label`

#### 20. Toast
**現状**: トースト通知
**改善点**:
- [ ] `role="status"` or `role="alert"`
- [ ] `aria-live="polite"` or `"assertive"`
- [ ] `aria-atomic="true"`
- [ ] 閉じるボタンに `aria-label`
- [ ] 自動消去のタイムアウト設定

#### 21. Modal
**現状**: モーダルダイアログ
**改善点**:
- [ ] `role="dialog"` or `role="alertdialog"`
- [ ] `aria-modal="true"`
- [ ] `aria-labelledby` for title
- [ ] `aria-describedby` for description
- [ ] Escapeで閉じる
- [ ] フォーカストラップ
- [ ] 開いたときに最初の要素にフォーカス

#### 22. Tooltip
**現状**: ツールチップ
**改善点**:
- [ ] `role="tooltip"`
- [ ] `aria-describedby` linking trigger to tooltip
- [ ] Escapeで閉じる
- [ ] ホバー、フォーカスで表示
- [ ] `aria-hidden="true"` when not visible

#### 23. Progress
**現状**: プログレスバー
**改善点**:
- [ ] `role="progressbar"`
- [ ] `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- [ ] `aria-valuetext` for percentage
- [ ] indeterminate状態の適切な処理

#### 24. Spinner
**現状**: ローディングスピナー
**改善点**:
- [ ] `role="status"` or `role="progressbar"`
- [ ] `aria-live="polite"`
- [ ] `aria-label` or `aria-labelledby`
- [ ] `aria-busy="true"` on loading container

### データ表示系コンポーネント (7個)

#### 25. Table
**現状**: データテーブル
**改善点**:
- [ ] `<table>` semantic markup
- [ ] `<thead>`, `<tbody>`, `<tfoot>`
- [ ] `<th scope="col">` for column headers
- [ ] `<th scope="row">` for row headers
- [ ] `<caption>` for table title
- [ ] ソート可能な列に `aria-sort`
- [ ] 選択可能な行に `aria-selected`

#### 26. DataGrid
**現状**: インタラクティブグリッド
**改善点**:
- [ ] `role="grid"`
- [ ] `role="row"`, `role="columnheader"`, `role="gridcell"`
- [ ] `aria-rowindex`, `aria-colindex`
- [ ] `aria-selected` for selected cells
- [ ] 矢印キーでナビゲーション
- [ ] ページング、ソート、フィルターのアクセシビリティ

#### 27. List
**現状**: リスト
**改善点**:
- [ ] `<ul>`, `<ol>` semantic markup
- [ ] `role="list"`, `role="listitem"` for custom lists
- [ ] `aria-labelledby` for list title

#### 28. Card
**現状**: カード
**改善点**:
- [ ] `article` or `section` semantic markup
- [ ] 見出しの階層構造
- [ ] クリッカブルカードに `role="button"` or `role="link"`
- [ ] `aria-labelledby` for card title

#### 29. Avatar
**現状**: アバター
**改善点**:
- [ ] `img` with `alt` text
- [ ] イニシャル表示の場合 `aria-label`
- [ ] ステータスインジケーターに `aria-label`

#### 30. Badge
**現状**: バッジ
**改善点**:
- [ ] `aria-label` for icon badges
- [ ] 通知バッジに `aria-live="polite"`

#### 31. Skeleton
**現状**: スケルトンローダー
**改善点**:
- [ ] `aria-busy="true"` on container
- [ ] `aria-live="polite"` for loading state
- [ ] `aria-label="Loading content"`

### レイアウト系コンポーネント (5個)

#### 32. Container
**現状**: レイアウトコンテナ
**改善点**:
- [ ] ランドマークロールの適切な使用
- [ ] `main`, `aside`, `nav`, `section` など

#### 33. Grid
**現状**: グリッドレイアウト
**改善点**:
- [ ] 読み上げ順序の確認
- [ ] レスポンシブ時のフォーカス順序

#### 34. Stack
**現状**: スタックレイアウト
**改善点**:
- [ ] 読み上げ順序の確認
- [ ] セマンティックな要素の使用推奨

#### 35. FormGroup
**現状**: フォームグループ
**改善点**:
- [ ] `fieldset` and `legend` for grouped inputs
- [ ] `aria-labelledby` for group label
- [ ] エラーメッセージの関連付け

#### 36. Divider (存在する場合)
**改善点**:
- [ ] `role="separator"`
- [ ] `aria-orientation` for vertical dividers

---

## 実装フェーズ

### Phase 1: 基盤整備（Week 1）
- [ ] アクセシビリティテストツールのセットアップ
  - [ ] @axe-core/cli インストール
  - [ ] @storybook/addon-a11y セットアップ
  - [ ] Pa11y CI 統合
- [ ] アクセシビリティユーティリティ関数作成
  - [ ] フォーカストラップ
  - [ ] キーボードナビゲーションヘルパー
  - [ ] ARIA属性管理
- [ ] ドキュメントテンプレート作成

### Phase 2: フォーム系コンポーネント（Week 2-3）
優先度順:
1. Button, Input, Textarea (Week 2 Day 1-2)
2. Checkbox, Radio, Switch (Week 2 Day 3-4)
3. Select, Slider (Week 2 Day 5)
4. DatePicker, TimePicker (Week 3 Day 1-2)
5. ColorPicker, FileUpload (Week 3 Day 3-4)

### Phase 3: ナビゲーション系コンポーネント（Week 4）
1. Tabs, Menu (Day 1-2)
2. Breadcrumb, Pagination (Day 3)
3. Accordion, Drawer (Day 4-5)

### Phase 4: フィードバック系コンポーネント（Week 5）
1. Alert, Toast (Day 1-2)
2. Modal, Tooltip (Day 3-4)
3. Progress, Spinner (Day 5)

### Phase 5: データ表示系コンポーネント（Week 6）
1. Table, DataGrid (Day 1-3)
2. List, Card (Day 4)
3. Avatar, Badge, Skeleton (Day 5)

### Phase 6: レイアウト系コンポーネント（Week 7 Day 1-2）
1. Container, Grid, Stack
2. FormGroup

### Phase 7: 統合テストとドキュメント（Week 7 Day 3-5）
- [ ] 全コンポーネントのアクセシビリティテスト
- [ ] スクリーンリーダーテスト（NVDA, JAWS, VoiceOver）
- [ ] キーボードナビゲーションテスト
- [ ] コントラストチェック
- [ ] アクセシビリティガイドライン作成
- [ ] 各コンポーネントのアクセシビリティドキュメント更新

---

## テスト戦略

### 自動テスト
1. **axe-core**: 各コンポーネントのVitest テストに統合
2. **@storybook/addon-a11y**: Storybook上でのビジュアルチェック
3. **Pa11y CI**: CI/CDパイプラインで自動チェック

### 手動テスト
1. **キーボードナビゲーション**: Tabキー、矢印キー、Enter、Space、Escapeキー
2. **スクリーンリーダー**:
   - NVDA (Windows)
   - JAWS (Windows)
   - VoiceOver (macOS, iOS)
   - TalkBack (Android)
3. **ズーム**: 200%まで拡大
4. **カラーコントラスト**: 各テーマでのコントラストチェック

---

## 成功基準

- [ ] 全36コンポーネントがWCAG 2.1 AAに準拠
- [ ] axe-coreで0エラー
- [ ] すべてのインタラクティブ要素がキーボードで操作可能
- [ ] すべての非テキストコンテンツに代替テキスト
- [ ] 4.5:1以上のコントラスト比（通常テキスト）
- [ ] 3:1以上のコントラスト比（大きいテキスト、UI要素）
- [ ] スクリーンリーダーで適切に読み上げ
- [ ] アクセシビリティドキュメント完備

---

## 参考資料

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
