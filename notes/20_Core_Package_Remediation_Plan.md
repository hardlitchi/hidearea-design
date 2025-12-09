# Coreパッケージ修正計画

**日付:** 2025-12-09
**プロジェクト:** @hidearea-design/core トークン移行
**優先度:** 高
**推定作業量:** 2-3日（40時間）

---

## エグゼクティブサマリー

このドキュメントは、coreパッケージレビューで特定された主要な問題に対処するための包括的な修正計画を概説します：**23コンポーネントにおける一貫性のないデザイントークン使用**。

### 目的

1. **トークン使用の標準化** - 全35コンポーネント間で統一
2. **レガシートークンからの移行** - `--color-gray-*`、`--color-neutral-*`からセマンティックトークンへ
3. **ハードコードされたカラーフォールバックの削除** - セマンティックトークンシステムをバイパスするものを削除
4. **テーマの一貫性確保** - 全コンポーネントで統一
5. **保守性の向上** - 一貫したトークンパターンによる

### 成功基準

- ✅ 影響を受ける23コンポーネント全てをセマンティックトークンに移行
- ✅ ハードコードされたカラー参照をゼロに（tokensパッケージを除く）
- ✅ ライトモードとダークモードの両方で100%テーマ一貫性
- ✅ 全テストがパス
- ✅ トークン一貫性スコア: 10/10

---

## 1. 現状分析

### 1.1 トークンシステム

#### 利用可能なセマンティックトークン（移行先）

```css
/* フォアグラウンド（テキスト） */
--foreground-primary      /* プライマリテキスト */
--foreground-secondary    /* セカンダリ/ミュートテキスト */
--foreground-tertiary     /* 無効/プレースホルダーテキスト */
--foreground-inverse      /* カラー背景上のテキスト */
--foreground-on-primary   /* プライマリカラー上のテキスト */
--foreground-error        /* エラーテキスト */
--foreground-warning      /* 警告テキスト */
--foreground-success      /* 成功テキスト */

/* バックグラウンド */
--background-primary      /* メイン背景 */
--background-secondary    /* カード/パネル背景 */
--background-tertiary     /* ホバー/サブトル背景 */
--background-inverse      /* ダークモードプライマリ */
--background-error        /* エラー背景 */
--background-warning      /* 警告背景 */
--background-success      /* 成功背景 */

/* ボーダー */
--border-default          /* デフォルトボーダーカラー */
--border-hover            /* ホバー時のボーダー */
--border-focus            /* フォーカス時のボーダー */
--border-error            /* エラーボーダー */

/* インタラクティブ */
--interactive-primary     /* プライマリボタン/リンク */
--interactive-hover       /* ホバー状態 */
--interactive-active      /* アクティブ/押下状態 */
--interactive-disabled    /* 無効状態 */

/* その他 */
--spacing-1 から --spacing-12
--font-size-xs から --font-size-4xl
--border-radius-sm から --border-radius-full
--shadow-sm から --shadow-2xl
```

#### レガシートークン（現状、問題あり）

```css
/* 生のカラートークン（コンポーネントで直接使用すべきでない） */
--color-gray-50 から --color-gray-900
--color-neutral-0 から --color-neutral-900
--color-primary-500
--color-success-500
--color-warning-500
--color-error-500
--color-white
```

### 1.2 影響を受けるコンポーネント（23件）

#### カテゴリ1: ナビゲーションコンポーネント（3件）
- `pagination` - 8箇所のハードコードされたカラー参照
- `breadcrumb` - 4箇所のハードコードされたカラー参照
- `tabs` - 6箇所のハードコードされたカラー参照

#### カテゴリ2: フォームコンポーネント（3件）
- `switch` - 4箇所のハードコードされたカラー参照
- `select` - 5箇所のハードコードされたカラー参照
- `slider` - 3箇所のハードコードされたカラー参照（インラインスタイル）

#### カテゴリ3: データ表示（7件）
- `avatar` - 5箇所のハードコードされたカラー参照
- `avatar-group` - 8箇所のハードコードされたカラー参照
- `spinner` - 2箇所のハードコードされたカラー参照
- `skeleton` - 4箇所のハードコードされたカラー参照
- `table` - 7箇所のハードコードされたカラー参照
- `datagrid` - 8箇所のハードコードされたカラー参照
- `progress` - 3箇所のハードコードされたカラー参照

#### カテゴリ4: オーバーレイ/フィードバック（4件）
- `drawer` - 6箇所のハードコードされたカラー参照
- `menu` - 5箇所のハードコードされたカラー参照
- `toast` - 4箇所のハードコードされたカラー参照
- `tooltip` - 3箇所のハードコードされたカラー参照

#### カテゴリ5: 複雑なコンポーネント（3件）
- `accordion` - 4箇所のハードコードされたカラー参照
- `list` - 5箇所のハードコードされたカラー参照
- `file-upload` - 4箇所のハードコードされたカラー参照

#### カテゴリ6: ピッカー（3件）
- `date-picker` - 12箇所のハードコードされたカラー参照
- `time-picker` - 9箇所のハードコードされたカラー参照
- `color-picker` - 6箇所のハードコードされたカラー参照（インラインスタイル）

**合計問題数:** 23コンポーネントで約128箇所のハードコードされたカラートークン参照

---

## 2. 移行戦略

### 2.1 トークンマッピングルール

#### ルール1: テキストカラー

```css
/* 移行前（レガシー） */
color: var(--color-gray-700);
color: var(--color-gray-600);
color: var(--color-gray-500);
color: var(--color-neutral-600, #4b5563);

/* 移行後（セマンティック） */
color: var(--foreground-primary);      /* プライマリテキスト */
color: var(--foreground-secondary);    /* セカンダリテキスト */
color: var(--foreground-tertiary);     /* ミュートテキスト */
color: var(--foreground-secondary);    /* ハードコードされたフォールバックなし */
```

#### ルール2: 背景カラー

```css
/* 移行前（レガシー） */
background: var(--color-gray-50);
background: var(--color-gray-100);
background: var(--color-gray-200);
background: var(--color-neutral-100, #f3f4f6);
background: var(--color-white);

/* 移行後（セマンティック） */
background: var(--background-tertiary);   /* サブトルホバー背景 */
background: var(--background-secondary);  /* カード/パネル背景 */
background: var(--background-tertiary);   /* ライトニュートラル背景 */
background: var(--background-secondary);  /* ハードコードされたフォールバックなし */
background: var(--background-primary);    /* プライマリ背景 */
```

#### ルール3: ボーダーカラー

```css
/* 移行前（レガシー） */
border: 1px solid var(--color-gray-300);
border: 1px solid var(--color-gray-400);
border: 2px solid var(--color-neutral-200, #e5e7eb);

/* 移行後（セマンティック） */
border: 1px solid var(--border-default);
border: 1px solid var(--border-hover);
border: 2px solid var(--border-default);
```

#### ルール4: 状態カラー

```css
/* 移行前（レガシー） */
background: var(--color-primary-500);
color: var(--color-success-500);
background: var(--color-error-500);
background: var(--color-warning-500);

/* 移行後（セマンティック） */
background: var(--interactive-primary);
color: var(--foreground-success);
background: var(--background-error);
background: var(--background-warning);
```

#### ルール5: コンポーネント固有トークン

```css
/* コンポーネントは自身のセマンティックCSS変数を定義すべき */
/* これらはグローバルセマンティックトークンを参照する */

/* 移行前（直接使用） */
.button {
  background: var(--color-gray-100);
  color: var(--color-gray-700);
}

/* 移行後（コンポーネントセマンティックトークン） */
.button {
  background: var(--button-bg, var(--background-tertiary));
  color: var(--button-color, var(--foreground-primary));
}
```

### 2.2 移行フェーズ

#### フェーズ1: 準備（2時間）

**タスク:**
1. トークンマッピング参照ドキュメントを作成
2. ビジュアルリグレッション用の自動テストを設定
3. ブランチを作成: `refactor/semantic-tokens-migration`
4. 現在の実装をバックアップ

**成果物:**
- トークンマッピングガイド
- テストベースラインスクリーンショット
- 変更準備ができたGitブランチ

#### フェーズ2: ナビゲーションコンポーネント（4時間）

**コンポーネント:**
- pagination（8参照）
- breadcrumb（4参照）
- tabs（6参照）

**コンポーネントごとのステップ:**
1. コンポーネントの`.styles.ts`ファイルを開く
2. 全ての`--color-*`参照を特定
3. セマンティック等価物で置換
4. ハードコードされたフォールバックを削除
5. コンポーネントテストを実行
6. ライト/ダークモードでビジュアル検証
7. 変更をコミット

**検証:**
```bash
# テストを実行
npm run test -- pagination.test.ts
npm run test -- breadcrumb.test.ts
npm run test -- tabs.test.ts

# ビジュアルチェック
npm run dev
# ブラウザでライト/ダークモード切り替えをテスト
```

#### フェーズ3: フォームコンポーネント（4時間）

**コンポーネント:**
- switch（4参照）
- select（5参照）
- slider（3参照 + インラインスタイル抽出）

**sliderの追加タスク:**
1. インラインスタイルを`slider.styles.ts`に抽出
2. その後トークン移行を適用

#### フェーズ4: データ表示コンポーネント（6時間）

**コンポーネント:**
- avatar（5参照）
- avatar-group（8参照）
- spinner（2参照）
- skeleton（4参照）
- table（7参照）
- datagrid（8参照）
- progress（3参照）

**高影響コンポーネント:** avatar、avatar-group、table、datagrid

#### フェーズ5: オーバーレイ/フィードバックコンポーネント（5時間）

**コンポーネント:**
- drawer（6参照）
- menu（5参照）
- toast（4参照）
- tooltip（3参照）

#### フェーズ6: 複雑なコンポーネント（5時間）

**コンポーネント:**
- accordion（4参照）
- list（5参照）
- file-upload（4参照）

#### フェーズ7: ピッカーコンポーネント（6時間）

**コンポーネント:**
- date-picker（12参照）
- time-picker（9参照）
- color-picker（6参照 + インラインスタイル抽出）

**最大コンポーネント:** date-picker（1,030行）、color-picker（796行）

**color-pickerの追加タスク:**
1. インラインスタイルを`color-picker.styles.ts`に抽出
2. その後トークン移行を適用

#### フェーズ8: テストと検証（4時間）

**タスク:**
1. 全テストスイートを実行
2. カバレッジレポートを実行
3. ビジュアルリグレッションテスト（全コンポーネント）
4. テーマ切り替え検証
5. アクセシビリティ検証
6. パフォーマンステスト

**検証:**
```bash
# 全テストスイート
npm run test

# カバレッジ
npm run test:coverage

# Lint
npm run lint

# ビルド
npm run build
```

#### フェーズ9: ドキュメント化（2時間）

**タスク:**
1. 新しいトークンでコンポーネントメタデータファイルを更新
2. base.tsドキュメントを更新
3. トークン使用ガイドを作成
4. CHANGELOG.mdを更新

#### フェーズ10: レビューとマージ（2時間）

**タスク:**
1. 全変更のセルフレビュー
2. プルリクエストを作成
3. チームレビューを依頼
4. フィードバックに対応
5. mainブランチにマージ

---

## 3. 詳細なコンポーネント移行ガイド

### 3.1 例: Paginationコンポーネント

#### 移行前

**ファイル:** `src/components/pagination/pagination.styles.ts`

```css
.button {
  background: var(--pagination-button-bg, transparent);
  border: 1px solid var(--pagination-button-border, var(--color-gray-300));
  color: var(--pagination-button-color, var(--color-gray-700));
  /* ... */
}

.button:hover:not(:disabled):not(.active) {
  background: var(--pagination-button-hover-bg, var(--color-gray-50));
  border-color: var(--pagination-button-hover-border, var(--color-primary-500));
  color: var(--pagination-button-hover-color, var(--color-primary-500));
}

.button.active {
  background: var(--pagination-active-bg, var(--color-primary-500));
  border-color: var(--pagination-active-border, var(--color-primary-500));
  color: var(--pagination-active-color, var(--color-white));
}

.ellipsis {
  color: var(--color-gray-500);
}

.info {
  color: var(--color-gray-600);
}
```

#### 移行後

```css
.button {
  background: var(--pagination-button-bg, transparent);
  border: 1px solid var(--pagination-button-border, var(--border-default));
  color: var(--pagination-button-color, var(--foreground-primary));
  /* ... */
}

.button:hover:not(:disabled):not(.active) {
  background: var(--pagination-button-hover-bg, var(--background-tertiary));
  border-color: var(--pagination-button-hover-border, var(--interactive-primary));
  color: var(--pagination-button-hover-color, var(--interactive-primary));
}

.button.active {
  background: var(--pagination-active-bg, var(--interactive-primary));
  border-color: var(--pagination-active-border, var(--interactive-primary));
  color: var(--pagination-active-color, var(--foreground-inverse));
}

.ellipsis {
  color: var(--foreground-tertiary);
}

.info {
  color: var(--foreground-secondary);
}
```

#### 変更サマリー

- `var(--color-gray-300)` → `var(--border-default)`
- `var(--color-gray-700)` → `var(--foreground-primary)`
- `var(--color-gray-50)` → `var(--background-tertiary)`
- `var(--color-primary-500)` → `var(--interactive-primary)`
- `var(--color-white)` → `var(--foreground-inverse)`
- `var(--color-gray-500)` → `var(--foreground-tertiary)`
- `var(--color-gray-600)` → `var(--foreground-secondary)`

### 3.2 例: Avatarコンポーネント

#### 移行前

**ファイル:** `src/components/avatar/avatar.styles.ts`

```css
.container {
  background: var(--avatar-bg, var(--color-gray-200));
  color: var(--avatar-color, var(--color-gray-700));
  /* ... */
}

.status {
  border: 2px solid var(--avatar-status-border, var(--color-white));
  background: var(--avatar-status-bg, var(--color-gray-400));
}

:host([status="offline"]) .status {
  background: var(--color-gray-400);
}
```

#### 移行後

```css
.container {
  background: var(--avatar-bg, var(--background-tertiary));
  color: var(--avatar-color, var(--foreground-primary));
  /* ... */
}

.status {
  border: 2px solid var(--avatar-status-border, var(--background-primary));
  background: var(--avatar-status-bg, var(--foreground-tertiary));
}

:host([status="offline"]) .status {
  background: var(--foreground-tertiary);
}
```

### 3.3 例: Avatar Groupコンポーネント

#### 移行前

**ファイル:** `src/components/avatar/avatar-group.styles.ts`

```css
.avatar {
  border: 2px solid var(--color-neutral-0, #ffffff);
  box-shadow: 0 0 0 1px var(--color-neutral-200, #e5e7eb);
}

.more {
  background: var(--color-neutral-100, #f3f4f6);
  color: var(--color-neutral-600, #4b5563);
  border: 2px solid var(--color-neutral-0, #ffffff);
  box-shadow: 0 0 0 1px var(--color-neutral-200, #e5e7eb);
}
```

#### 移行後

```css
.avatar {
  border: 2px solid var(--background-primary);
  box-shadow: 0 0 0 1px var(--border-default);
}

.more {
  background: var(--background-secondary);
  color: var(--foreground-secondary);
  border: 2px solid var(--background-primary);
  box-shadow: 0 0 0 1px var(--border-default);
}
```

#### 変更サマリー

- `var(--color-neutral-0, #ffffff)` → `var(--background-primary)`
- `var(--color-neutral-200, #e5e7eb)` → `var(--border-default)`
- `var(--color-neutral-100, #f3f4f6)` → `var(--background-secondary)`
- `var(--color-neutral-600, #4b5563)` → `var(--foreground-secondary)`
- **全てのハードコードされた16進数フォールバックを削除**

---

## 4. テスト戦略

### 4.1 ユニットテスト

**移行した各コンポーネントに対して:**

```bash
# コンポーネント固有のテストを実行
npm run test -- [component].test.ts

# リグレッションがないことを確認
npm run test:coverage
```

**受け入れ基準:**
- ✅ 既存の全テストがパス
- ✅ カバレッジの低下なし
- ✅ コンポーネント機能が変更されていない

### 4.2 ビジュアルテスト

**コンポーネントごとの手動検証チェックリスト:**

```markdown
- [ ] ライトモードの外観
- [ ] ダークモードの外観
- [ ] ホバー状態
- [ ] アクティブ状態
- [ ] 無効状態
- [ ] フォーカス状態
- [ ] 全バリアント（該当する場合）
- [ ] 全サイズ（該当する場合）
- [ ] ボーダーの可視性
- [ ] テキストの可読性
- [ ] コントラスト比（WCAG AA）
```

**ツール:**
- ブラウザDevTools
- テーマ切り替えユーティリティ（`toggleTheme()`）
- アクセシビリティインスペクター

### 4.3 テーマ切り替えテスト

**テスト手順:**

1. ブラウザでコンポーネントを開く
2. テーマを切り替え: ライト → ダーク
3. スムーズな遷移を確認
4. 全カラーが正しく更新されることを確認
5. テーマを切り替え: ダーク → ライト
6. ビジュアルアーティファクトがないことを確認

```typescript
// テストスクリプト
import { toggleTheme, getEffectiveTheme } from '@hidearea-design/core';

// ライトモードで開始
console.log('現在のテーマ:', getEffectiveTheme()); // 'light'

// ダークに切り替え
toggleTheme();
console.log('現在のテーマ:', getEffectiveTheme()); // 'dark'

// コンポーネントカラーが更新されたことを確認
// ビジュアル検査が必要
```

### 4.4 自動テストスクリプト

**テストスクリプトを作成:** `scripts/test-token-migration.mjs`

```javascript
import { execSync } from 'child_process';
import { readdirSync } from 'fs';

const componentsDir = './src/components';

// 全コンポーネントディレクトリを取得
const components = readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`${components.length}個のコンポーネントをテスト中...\n`);

let passed = 0;
let failed = 0;
const failures = [];

for (const component of components) {
  try {
    // コンポーネントのテストを実行
    execSync(`npm run test -- ${component}.test.ts`, {
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    console.log(`✅ ${component}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${component}`);
    failed++;
    failures.push(component);
  }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`合計: ${components.length} | 成功: ${passed} | 失敗: ${failed}`);

if (failed > 0) {
  console.log(`\n失敗したコンポーネント:`);
  failures.forEach(c => console.log(`  - ${c}`));
  process.exit(1);
}

console.log('\n✅ 全テストが成功！');
```

**スクリプトを実行:**
```bash
node scripts/test-token-migration.mjs
```

---

## 5. リスク評価と軽減策

### 5.1 特定されたリスク

#### リスク1: ビジュアルリグレッション

**影響:** 高
**確率:** 中

**説明:**
セマンティックトークンマッピングがレガシーカラーと完全に一致しない可能性があり、ビジュアルの違いを引き起こす。

**軽減策:**
1. サイドバイサイドビジュアル比較（移行前/後）
2. テーマ切り替え検証
3. ユーザー受け入れテスト
4. 段階的ロールアウト（一度に1カテゴリずつ）
5. Gitによる容易なロールバック

#### リスク2: 破壊的変更

**影響:** 高
**確率:** 低

**説明:**
トークン変更がコンポーネント機能やテストを破壊する可能性。

**軽減策:**
1. 移行前に包括的なユニットテスト
2. 変更後すぐに各コンポーネントをテスト
3. 全コンポーネントの自動テストスイート実行
4. 容易なロールバックが可能なフィーチャーブランチ

#### リスク3: テーマの不整合

**影響:** 中
**確率:** 低

**説明:**
移行フェーズ中にレガシーとセマンティックトークンが混在。

**軽減策:**
1. 論理的なグループでコンポーネントを移行（カテゴリ別）
2. 次を開始する前に1カテゴリを完了
3. 移行中の日次統合テスト
4. ドキュメント化された移行ステータス

#### リスク4: パフォーマンス影響

**影響:** 低
**確率:** 非常に低

**説明:**
追加のCSS変数ルックアップがパフォーマンスに影響する可能性。

**軽減策:**
1. 移行前/後のパフォーマンスベンチマーク
2. ブラウザDevToolsパフォーマンスプロファイリング
3. バンドルサイズ比較
4. CSS変数解決は最新ブラウザで高度に最適化されている

### 5.2 ロールバック計画

**重大な問題が発見された場合:**

```bash
# 即座のロールバック
git checkout main
git branch -D refactor/semantic-tokens-migration

# 部分的なロールバック（特定のコンポーネントを戻す）
git revert <commit-hash>
```

**ロールバックトリガー:**
- 迅速に修正できない失敗したテスト
- 重大なビジュアルリグレッション
- パフォーマンス低下 >10%
- アクセシビリティ問題（WCAG失敗）

---

## 6. タイムラインとリソース配分

### 6.1 推定タイムライン

| フェーズ | 期間 | コンポーネント | 合計時間 |
|-------|------|------------|---------|
| フェーズ1: 準備 | 2時間 | - | 2 |
| フェーズ2: ナビゲーション | 4時間 | 3 | 4 |
| フェーズ3: フォーム | 4時間 | 3 | 4 |
| フェーズ4: データ表示 | 6時間 | 7 | 6 |
| フェーズ5: オーバーレイ/フィードバック | 5時間 | 4 | 5 |
| フェーズ6: 複雑 | 5時間 | 3 | 5 |
| フェーズ7: ピッカー | 6時間 | 3 | 6 |
| フェーズ8: テスト | 4時間 | - | 4 |
| フェーズ9: ドキュメント | 2時間 | - | 2 |
| フェーズ10: レビュー | 2時間 | - | 2 |
| **合計** | **40時間** | **23** | **40** |

**カレンダー時間:** 5営業日（1日8時間想定）

### 6.2 リソース要件

**人員:**
- シニアフロントエンド開発者1名（フルタイム、5日間）
- QAエンジニア1名（パートタイム、テストフェーズで2日間）
- デザイナー1名（相談、ビジュアル承認で4時間）

**ツール:**
- 開発環境
- ブラウザDevTools
- Gitバージョン管理
- npmテストランナー

---

## 7. 成功指標

### 7.1 定量的指標

**移行前:**
- トークン一貫性スコア: 7.0/10
- セマンティックトークンを使用するコンポーネント: 12/35（34.3%）
- レガシートークンを使用するコンポーネント: 23/35（65.7%）
- ハードコードされたカラー参照: 約128箇所

**移行後（目標）:**
- トークン一貫性スコア: 10.0/10
- セマンティックトークンを使用するコンポーネント: 35/35（100%）
- レガシートークンを使用するコンポーネント: 0/35（0%）
- ハードコードされたカラー参照: 0箇所

### 7.2 定性的指標

**成功基準:**
- ✅ 全テストが成功（100%）
- ✅ ビジュアルリグレッションなし
- ✅ スムーズなテーマ遷移
- ✅ 保守性の向上
- ✅ 一貫したトークンパターン
- ✅ 更新されたドキュメント
- ✅ チームの承認

---

## 8. 移行後のタスク

### 8.1 即時タスク

1. **ドキュメントを更新**
   - コンポーネントメタデータファイル
   - トークン使用ガイド
   - CHANGELOG.mdに移行ノート

2. **チームコミュニケーション**
   - 完了を告知
   - 移行前/後の比較を共有
   - 学んだ教訓をドキュメント化

3. **モニタリング**
   - バグレポートを監視
   - テーマ切り替えの問題を監視
   - ユーザーフィードバックを追跡

### 8.2 フォローアップタスク

4. **スタイル抽出**（優先度：中）
   - sliderからインラインスタイルを抽出
   - color-pickerからインラインスタイルを抽出
   - 一貫性を維持

5. **ESLintルール**（優先度：中）
   - `--color-*`使用を防ぐルールを追加
   - セマンティックトークンパターンを強制
   - pre-commitフックに追加

6. **トークンドキュメント**（優先度：低）
   - ビジュアルトークンガイドを作成
   - 使用例を追加
   - ベストプラクティスをドキュメント化

---

## 9. 付録

### 9.1 トークン参照テーブル

| レガシートークン | セマンティックトークン | 使用コンテキスト |
|--------------|-------------------|---------------|
| `--color-gray-50` | `--background-tertiary` | サブトルホバー背景 |
| `--color-gray-100` | `--background-secondary` | カード/パネル背景 |
| `--color-gray-200` | `--background-tertiary` | 無効/非アクティブ背景 |
| `--color-gray-300` | `--border-default` | デフォルトボーダー |
| `--color-gray-400` | `--border-hover` | ホバーボーダー |
| `--color-gray-500` | `--foreground-tertiary` | ミュート/無効テキスト |
| `--color-gray-600` | `--foreground-secondary` | セカンダリテキスト |
| `--color-gray-700` | `--foreground-primary` | プライマリテキスト |
| `--color-gray-900` | `--foreground-primary` | 強調テキスト |
| `--color-neutral-0` | `--background-primary` | 白/プライマリ背景 |
| `--color-neutral-100` | `--background-secondary` | ライトニュートラル背景 |
| `--color-neutral-200` | `--border-default` | ライトボーダー |
| `--color-neutral-300` | `--border-default` | ミディアムボーダー |
| `--color-neutral-400` | `--border-hover` | ホバーボーダー |
| `--color-neutral-500` | `--foreground-tertiary` | ミュートテキスト |
| `--color-neutral-600` | `--foreground-secondary` | セカンダリテキスト |
| `--color-neutral-700` | `--foreground-primary` | プライマリテキスト |
| `--color-primary-500` | `--interactive-primary` | プライマリインタラクティブカラー |
| `--color-success-500` | `--foreground-success` | 成功テキスト/アイコン |
| `--color-warning-500` | `--foreground-warning` | 警告テキスト/アイコン |
| `--color-error-500` | `--foreground-error` | エラーテキスト/アイコン |
| `--color-white` | `--foreground-inverse` | カラー背景上のテキスト |

### 9.2 検証チェックリスト

**コンポーネントごとのチェックリスト:**

```markdown
## [コンポーネント名] 移行チェックリスト

### コード変更
- [ ] 全ての`--color-gray-*`トークンを置換
- [ ] 全ての`--color-neutral-*`トークンを置換
- [ ] 全ての状態カラーを更新
- [ ] ハードコードされた16進数フォールバックを削除
- [ ] コンポーネントトークンがセマンティックフォールバックを使用

### テスト
- [ ] ユニットテストが成功
- [ ] ライトモードでのビジュアルテスト
- [ ] ダークモードでのビジュアルテスト
- [ ] テーマ切り替えが動作
- [ ] 全バリアントをテスト
- [ ] 全サイズをテスト
- [ ] ホバー状態を確認
- [ ] アクティブ状態を確認
- [ ] 無効状態を確認
- [ ] フォーカス状態を確認

### アクセシビリティ
- [ ] コントラスト比がWCAG AAを満たす
- [ ] 両テーマでテキストが読める
- [ ] ボーダーの可視性を維持
- [ ] アクセシビリティのリグレッションなし

### ドキュメント
- [ ] 新しいトークンでメタデータを更新
- [ ] コンポーネントトークンをドキュメント化
- [ ] 例を更新

### レビュー
- [ ] コードのセルフレビュー完了
- [ ] デザイナーの承認取得
- [ ] Gitに変更をコミット
```

---

## 10. 結論

この修正計画は、影響を受ける23コンポーネント全てをレガシーカラートークンからセマンティックトークンに移行するための包括的な段階的アプローチを提供します。この計画に従うことで、coreパッケージは以下を達成します：

- **100%のトークン一貫性** - 全コンポーネントで統一
- **改善されたテーマ切り替え** - ダークモードサポート向上
- **より良い保守性** - 標準化されたトークン使用
- **強化された開発者体験** - 明確なトークンパターン

### 次のステップ

1. **この修正計画をレビューして承認**
2. **リソースを割り当て**（開発者、QA、デザイナー）
3. **プロジェクトタイムラインで移行をスケジュール**
4. **移行作業用のGitブランチを作成**
5. **フェーズ1（準備）を開始**

**完了予定:** 開始から5営業日

---

**ドキュメントバージョン:** 1.0
**最終更新:** 2025-12-09
**作成者:** Claude Code
**ステータス:** 実装準備完了
