# Coreパッケージ現状分析レポート

**日付:** 2025-12-16
**プロジェクト:** @hidearea-design/core トークン移行
**前回レビュー:** 2025-12-09
**ステータス:** 部分的に改善済み、作業継続が必要

---

## エグゼクティブサマリー

2025-12-09の包括的レビュー以降、以下の進捗がありました:

### 達成事項 ✅

1. **Chip コンポーネントの統合完了**
   - `/packages/core/src/components/chip/` に正常に統合
   - 集中化されたスタイルシステムを使用
   - インラインスタイルなし

2. **Avatar コンポーネントのトークン移行完了**
   - レガシートークン (`--color-gray-*`, `--color-neutral-*`) を完全に削除
   - セマンティックトークン (`--component-avatar-*`) に移行
   - 前回レビューで特定された5箇所の問題を解決

### 残存問題 🔴

1. **検証済みのレガシートークン使用コンポーネント:**
   - **Pagination**: 8箇所のレガシートークン参照 (変更なし)
   - **Switch**: 6箇所のレガシートークン参照 (レビュー時4箇所→実際6箇所)
   - **Breadcrumb**: 4箇所 (未検証、レビュー通りと推定)

2. **インラインスタイル問題:**
   - **Slider**: インラインスタイルブロック + レガシートークン参照
   - **Color-Picker**: インラインスタイルブロック

3. **未検証コンポーネント:**
   - レビューで特定された残り19コンポーネント
   - Avatarのように既に移行済みの可能性あり

---

## 詳細分析

### 1. Pagination コンポーネント

**ファイル:** `/home/neko/workspaces/design/packages/tokens/build/js/styles/pagination.js`

**レガシートークン使用箇所 (8箇所):**

```javascript
// ボーダーカラー (2箇所)
border: 1px solid var(--color-gray-300)

// テキストカラー (2箇所)
color: var(--color-gray-700)

// ホバー背景 (2箇所)
background: var(--color-gray-50)

// 省略記号カラー (2箇所)
color: var(--color-gray-500)

// 情報テキストカラー (2箇所)
color: var(--color-gray-600)
```

**推奨される移行先:**
- `var(--color-gray-300)` → `var(--border-default)`
- `var(--color-gray-700)` → `var(--foreground-primary)`
- `var(--color-gray-50)` → `var(--background-tertiary)`
- `var(--color-gray-500)` → `var(--foreground-tertiary)`
- `var(--color-gray-600)` → `var(--foreground-secondary)`

**優先度:** HIGH
**推定作業時間:** 1時間

---

### 2. Switch コンポーネント

**ファイル:** `/home/neko/workspaces/design/packages/tokens/build/js/styles/switch.js`

**レガシートークン使用箇所 (6箇所 - レビュー時の記載より2箇所多い):**

```javascript
// 背景カラー (3箇所)
background-color: var(--color-neutral-300, #d1d5db)

// ホバー状態 (2箇所)
background-color: var(--color-neutral-200, #e5e7eb)

// エラー状態 (1箇所)
background-color: var(--color-neutral-400, #9ca3af)
```

**注意:** ハードコードされた16進数フォールバック (`#d1d5db`, `#e5e7eb`, `#9ca3af`) も含まれており、これらも削除が必要

**推奨される移行先:**
- `var(--color-neutral-300, #d1d5db)` → `var(--background-tertiary)`
- `var(--color-neutral-200, #e5e7eb)` → `var(--background-secondary)`
- `var(--color-neutral-400, #9ca3af)` → `var(--border-hover)`

**優先度:** HIGH
**推定作業時間:** 1時間

---

### 3. Avatar コンポーネント (完了)

**ファイル:** `/home/neko/workspaces/design/packages/tokens/build/js/styles/avatar.js`

**現在の実装:** ✅ セマンティックトークンのみ使用

```javascript
// 適切なコンポーネント固有トークン
var(--component-avatar-background-default)
var(--component-avatar-text-default)
var(--component-avatar-background-primary)
var(--component-avatar-status-background-online)
var(--component-avatar-border-color)
// ... 他多数
```

**ステータス:** 完全に移行完了、追加作業不要

---

### 4. Slider コンポーネント (インラインスタイル問題)

**ファイル:** `/home/neko/workspaces/design/packages/core/src/components/slider/slider.ts`

**問題:**
1. インラインスタイルブロック (lines 533-711, 179行)
2. レガシートークン参照:
   - `var(--color-neutral-3, #e5e7eb)` - トラックカラー
   - `var(--color-neutral-5, #9ca3af)` - マークカラー
3. 動的インラインスタイル (lines 481, 487, 504, 522)

**推奨アプローチ:**
1. 外部 `slider.styles.ts` ファイルを作成
2. インラインスタイルを抽出
3. レガシートークンをセマンティックトークンに移行
4. 動的スタイルはCSS変数として実装

**優先度:** MEDIUM
**推定作業時間:** 3時間 (構造改善が必要)

---

### 5. Color-Picker コンポーネント (インラインスタイル問題)

**ファイル:** `/home/neko/workspaces/design/packages/core/src/components/color-picker/color-picker.ts`

**問題:**
1. インラインスタイルブロック (lines 854-1020, 167行)
2. レガシートークンは使用していない (ハードコードされたカラーを使用)
3. 動的インラインスタイル (line 1069)

**推奨アプローチ:**
1. 外部 `color-picker.styles.ts` ファイルを作成
2. インラインスタイルを抽出
3. ハードコードされたカラーをセマンティックトークンに置換

**優先度:** MEDIUM
**推定作業時間:** 3時間 (構造改善が必要)

---

## 更新された移行戦略

### Phase 1: 簡単なトークン置換 (優先度 HIGH)

**対象コンポーネント:**
- Pagination (8箇所)
- Switch (6箇所)
- Breadcrumb (4箇所、要検証)

**作業内容:**
- `.styles.ts` ファイル内のレガシートークンをセマンティックトークンに置換
- ハードコードされた16進数フォールバックを削除
- ライト/ダークモードでテスト

**推定作業時間:** 4時間
**ブランチ:** `refactor/token-migration-phase1`

---

### Phase 2: インラインスタイル抽出 (優先度 MEDIUM)

**対象コンポーネント:**
- Slider
- Color-Picker

**作業内容:**
1. 外部 `.styles.ts` ファイルを作成
2. インラインスタイルを抽出
3. レガシートークン/ハードコードされたカラーをセマンティックトークンに置換
4. 動的スタイルをCSS変数として実装
5. 全機能が動作することを確認

**推定作業時間:** 6時間
**ブランチ:** `refactor/inline-styles-extraction`

---

### Phase 3: 残りコンポーネントの検証と移行 (優先度 LOW)

**対象コンポーネント:**
- レビューで特定された残り19コンポーネント
- ただし、Avatarのように既に移行済みの可能性あり

**作業内容:**
1. 各コンポーネントの `.styles.ts` ファイルをレビュー
2. レガシートークン使用を確認
3. 必要に応じて移行
4. 移行済みコンポーネントをドキュメント化

**推定作業時間:** 10-15時間 (実際の問題数による)
**ブランチ:** `refactor/token-migration-phase3`

---

## 更新された成功指標

### 移行前 (2025-12-16時点)

- **Avatar**: ✅ 完全に移行済み
- **Chip**: ✅ 適切に統合済み
- **検証済みレガシートークン使用**: 3コンポーネント (pagination, switch, breadcrumb)
- **インラインスタイル問題**: 2コンポーネント (slider, color-picker)
- **未検証**: 19コンポーネント

### 移行後 (目標)

- **セマンティックトークン使用**: 35/35コンポーネント (100%)
- **レガシートークン使用**: 0/35コンポーネント (0%)
- **インラインスタイル**: 0コンポーネント
- **トークン一貫性スコア**: 10.0/10

---

## 次のステップ (推奨順序)

1. **Phase 1を開始** (即座に実行可能)
   - Pagination, Switch, Breadcrumbのトークン移行
   - 比較的簡単で即効性がある

2. **Phase 2を実行** (Phase 1完了後)
   - Slider, Color-Pickerのインラインスタイル抽出
   - より複雑だが重要な構造改善

3. **Phase 3を計画** (Phase 1, 2完了後)
   - 残りコンポーネントの体系的レビュー
   - 実際の問題数を確認してから作業量を見積もり

4. **ドキュメント更新**
   - 19_Core_Package_Comprehensive_Review.md を更新
   - 20_Core_Package_Remediation_Plan.md を更新
   - 移行完了コンポーネントをリスト化

---

**ドキュメントバージョン:** 1.0
**作成日:** 2025-12-16
**作成者:** Claude Code
**ステータス:** Phase 1実行準備完了
