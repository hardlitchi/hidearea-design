# パフォーマンステスト自動化ガイド

Generated: 2025-12-19

Hidearea Design システムのパフォーマンステスト自動化について説明します。

## 📋 目次

- [概要](#概要)
- [テストの種類](#テストの種類)
- [ローカルでのテスト実行](#ローカルでのテスト実行)
- [CI/CDでの自動実行](#cicdでの自動実行)
- [パフォーマンス予算](#パフォーマンス予算)
- [ダッシュボード](#ダッシュボード)
- [トラブルシューティング](#トラブルシューティング)

## 概要

パフォーマンステスト自動化は、以下の目的で実装されています：

1. **バンドルサイズの監視** - リグレッションを防止
2. **レンダリングパフォーマンス** - コンポーネントの描画速度を測定
3. **メモリ使用量** - メモリリークの検出
4. **継続的な改善** - トレンドの可視化

## テストの種類

### 1. バンドルサイズ回帰テスト

```bash
# 全体のバンドルサイズをチェック
pnpm --filter @hidearea-design/core test:perf:bundle
```

**テスト内容**:
- メインバンドル（ES/UMD）のサイズ検証
- 個別コンポーネントのサイズ検証
- サイズ制限を超えたコンポーネントの検出

**テストファイル**: `packages/core/tests/performance/bundle-regression.test.ts`

**設定されている制限**:

| ファイル | 最大サイズ |
|---------|----------|
| Main ES Bundle | 450 KB |
| Main UMD Bundle | 400 KB |
| Simple Component | 15 KB |
| Medium Component | 30 KB |
| Complex Component | 50 KB |

### 2. レンダリングパフォーマンステスト

```bash
# コンポーネントのレンダリング速度をテスト
pnpm --filter @hidearea-design/core test:perf:render
```

**テスト内容**:
- コンポーネント登録速度
- 初回レンダリング時間
- バッチレンダリング効率
- 再レンダリング速度
- 属性変更の応答時間

**テストファイル**: `packages/core/tests/performance/render-performance.test.ts`

**パフォーマンス閾値**:

| 操作 | シンプル | 中程度 | 複雑 |
|------|---------|-------|------|
| 初回レンダリング | < 10ms | < 50ms | < 100ms |
| 再レンダリング | < 5ms | < 20ms | < 50ms |
| 属性変更 | < 5ms | < 5ms | < 5ms |

### 3. メモリ使用量テスト

```bash
# メモリリークをチェック
pnpm --filter @hidearea-design/core test:perf:memory
```

**テスト内容**:
- コンポーネントごとのメモリフットプリント
- メモリリークの検出
- 高速な作成/破棄サイクルでの挙動
- イベントリスナーのクリーンアップ

**テストファイル**: `packages/core/tests/performance/memory-usage.test.ts`

**メモリ閾値**:

| コンポーネント種別 | 最大メモリ/個 |
|------------------|-------------|
| シンプル (Button, Badge) | 5 KB |
| 中程度 (Input, Card) | 10 KB |
| 複雑 (DataGrid) | 50 KB |

**注意**: メモリAPIを有効にするには、Chromeを以下のフラグで起動:
```bash
chrome --enable-precise-memory-info
```

### 4. 全パフォーマンステスト実行

```bash
# すべてのパフォーマンステストを実行
pnpm --filter @hidearea-design/core test:perf
```

## ローカルでのテスト実行

### 準備

```bash
# 依存関係のインストール
pnpm install

# パッケージのビルド
pnpm build
```

### テスト実行

```bash
# 個別テスト
pnpm --filter @hidearea-design/core test:perf:bundle
pnpm --filter @hidearea-design/core test:perf:render
pnpm --filter @hidearea-design/core test:perf:memory

# すべてのパフォーマンステスト
pnpm --filter @hidearea-design/core test:perf
```

### ブラウザベンチマーク

```bash
# 開発サーバーを起動
pnpm dev

# ブラウザでアクセス
# http://localhost:5173/scripts/performance-benchmark.html
```

手動で各ベンチマークボタンをクリックして結果を確認できます。

### Playwrightによる自動ベンチマーク

```bash
# Playwrightブラウザのインストール
pnpm exec playwright install --with-deps chromium

# 開発サーバーを起動（別ターミナル）
pnpm dev

# ベンチマークを実行
pnpm exec playwright test scripts/performance-benchmark.spec.ts
```

## CI/CDでの自動実行

### GitHub Actionsワークフロー

パフォーマンステストは、以下のタイミングで自動実行されます：

- **Pull Request作成時** - mainブランチへのPR
- **mainブランチへのpush**
- **手動実行** (workflow_dispatch)

ワークフロー: `.github/workflows/performance.yml`

### ワークフローの構成

#### 1. Bundle Size Analysis

```yaml
- name: Analyze bundle sizes
  run: pnpm --filter @hidearea-design/core exec tsx ../../scripts/analyze-bundle-sizes.ts
```

バンドルサイズを分析し、PRにコメントとして結果を投稿します。

#### 2. Performance Tests

```yaml
- name: Run bundle size regression tests
  run: pnpm --filter @hidearea-design/core test:perf:bundle

- name: Run render performance tests
  run: pnpm --filter @hidearea-design/core test:perf:render

- name: Run memory usage tests
  run: pnpm --filter @hidearea-design/core test:perf:memory
```

#### 3. Performance Budget Check

```yaml
- name: Check performance budgets
  run: pnpm --filter @hidearea-design/core exec tsx ../../scripts/check-performance-budget.ts
```

パフォーマンス予算を超えた場合、CIが失敗します。

#### 4. Compare with Base Branch

PRの変更により、バンドルサイズがどれだけ変化したかを比較します。

### アーティファクト

以下のアーティファクトがCI実行後にダウンロード可能です：

- `bundle-analysis` - バンドルサイズ分析レポート
- `performance-metrics` - パフォーマンスメトリクスJSON
- `benchmark-results` - ブラウザベンチマーク結果

## パフォーマンス予算

### 予算の確認

```bash
# パフォーマンス予算をチェック
pnpm --filter @hidearea-design/core exec tsx ../../scripts/check-performance-budget.ts
```

### 予算の設定

予算は `scripts/check-performance-budget.ts` で定義されています：

```typescript
const BUDGETS: BudgetRule[] = [
  {
    package: '@hidearea-design/core',
    file: 'dist/index.js',
    maxSize: 450, // KB
    type: 'bundle',
  },
  // ...
];
```

### 予算超過時の対応

予算を超えた場合の推奨アクション：

1. **バンドルサイズ超過**
   - Code splittingの実装
   - 依存関係の見直し
   - ツリーシェイキングの確認

2. **コンポーネントサイズ超過**
   - コンポーネントの分割
   - 複雑な機能を遅延読み込み
   - 不要なコードの削除

3. **CSSサイズ超過**
   - Per-component CSS importsの活用
   - 未使用のスタイルの削除
   - CSS変数の最適化

## ダッシュボード

### ダッシュボードの生成

```bash
# パフォーマンステストを実行（メトリクスを収集）
pnpm --filter @hidearea-design/core test:perf:bundle

# ダッシュボードを生成
pnpm exec tsx scripts/generate-performance-dashboard.ts
```

生成されたダッシュボード: `performance-dashboard.html`

### ダッシュボードの内容

- **統計カード**
  - メインバンドルサイズ
  - コンポーネント数
  - 平均コンポーネントサイズ
  - 総コンポーネントサイズ

- **チャート**
  - バンドルサイズのトレンド
  - 平均コンポーネントサイズのトレンド

### メトリクスの保存

メトリクスは以下に自動保存されます：
- `packages/core/tests/performance/bundle-metrics.json`
- 最新10件のメトリクスを保持

## バンドルサイズ分析

### 詳細分析の実行

```bash
# すべてのパッケージのバンドルサイズを分析
pnpm exec tsx scripts/analyze-bundle-sizes.ts
```

### 分析内容

- パッケージ別の総サイズ
- メインバンドル（ES/UMD）のサイズ
- 個別コンポーネントのソースサイズ
- 最適化の機会の特定

### 出力例

```
# Bundle Size Analysis Report

## Package Overview

| Package | Total Size | Main Bundle (ES) | Main Bundle (UMD) |
|---------|------------|------------------|-------------------|
| @hidearea-design/core | 3.66 MB | 408.44 KB | 362.41 KB |
| @hidearea-design/react | 586.30 KB | 66.20 KB | 45.13 KB |
| @hidearea-design/vue | 420.77 KB | 71.61 KB | 52.84 KB |

## Component Source Sizes

| Component | Source Size | Type Definitions |
|-----------|-------------|------------------|
| time-picker | 27.74 KB | 1.02 KB |
| color-picker | 24.75 KB | 0.99 KB |
| date-picker | 24.61 KB | 0.99 KB |
...
```

## トラブルシューティング

### テストが失敗する

**問題**: バンドルサイズテストが失敗する

**解決策**:
```bash
# パッケージを再ビルド
pnpm build

# テストを再実行
pnpm --filter @hidearea-design/core test:perf:bundle
```

### メモリテストが実行されない

**問題**: Memory API not available

**解決策**:
Chromeを適切なフラグで起動:
```bash
chrome --enable-precise-memory-info --js-flags="--expose-gc"
```

### CIでタイムアウトする

**問題**: パフォーマンステストがCIでタイムアウト

**解決策**:
- `.github/workflows/performance.yml` のタイムアウト設定を調整
- テストの並列実行を検討
- 重いテストを最適化

### ダッシュボードが生成されない

**問題**: メトリクスデータがない

**解決策**:
```bash
# まずパフォーマンステストを実行してメトリクスを収集
pnpm --filter @hidearea-design/core test:perf:bundle

# その後ダッシュボードを生成
pnpm exec tsx scripts/generate-performance-dashboard.ts
```

## ベストプラクティス

### 1. 定期的な実行

- すべてのPRでパフォーマンステストを実行
- 週次でトレンドをレビュー
- 大きな変更前後でベンチマークを取得

### 2. 予算の維持

- 予算を超えないようにコード変更を管理
- 予算見直しは慎重に（基準を下げない）
- 最適化の余地を常に確保

### 3. メトリクスの活用

- ダッシュボードで傾向を監視
- 異常な増加を早期に検出
- パフォーマンス改善の効果を測定

### 4. ドキュメント更新

- 新しいテストを追加したら文書化
- 予算変更の理由を記録
- ベストプラクティスを共有

## 参考資料

- [パフォーマンス最適化ガイド](./performance-optimization.md)
- [パフォーマンス分析レポート](./performance-analysis.md)
- [CSS最適化ガイド](./css-optimization.md)
- [Per-component Imports ガイド](./per-component-imports.md)

## まとめ

### 実装した機能

✅ **自動テスト**
- バンドルサイズ回帰テスト
- レンダリングパフォーマンステスト
- メモリ使用量テスト

✅ **CI/CD統合**
- GitHub Actionsワークフロー
- PRへの自動コメント
- ベースブランチとの比較

✅ **監視ツール**
- パフォーマンス予算チェッカー
- バンドルサイズ分析
- パフォーマンスダッシュボード

### 期待される効果

- 🎯 **バンドルサイズのリグレッション防止**
- 🚀 **パフォーマンスの継続的改善**
- 📊 **データ駆動型の意思決定**
- 🔍 **問題の早期発見**

パフォーマンステスト自動化により、高品質なデザインシステムを維持できます。
