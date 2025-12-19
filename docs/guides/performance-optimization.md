# パフォーマンス最適化ガイド

Generated: 2025-12-19

## 📊 現在の状態

### パッケージサイズ概要

| Package | Total Size | Main Bundle (ES) | Main Bundle (UMD) | Gzipped (ES) |
|---------|------------|------------------|-------------------|--------------|
| @hidearea-design/core | 3.66 MB | 408.44 KB | 362.41 KB | 64.49 KB |
| @hidearea-design/react | 586.30 KB | 66.20 KB | 45.13 KB | 15.69 KB |
| @hidearea-design/vue | 420.77 KB | 71.61 KB | 52.84 KB | 11.20 KB |
| @hidearea-design/tokens | 1.51 MB | - | - | - |

### ツリーシェイキング対応状況

✅ **対応済み**
- Named exportsを使用
- ES module形式で配布
- 個別コンポーネントファイルを提供

## 🎯 最適化の優先順位

### 優先度: 高 🔴

#### 1. Per-Component Import パスの提供

**現状の課題**:
```javascript
// 現在はフルインポートが推奨される
import { Button, Input } from '@hidearea-design/core';
// → 全コンポーネントがバンドルに含まれる可能性
```

**改善案**:
```javascript
// 個別インポートパスを提供
import { Button } from '@hidearea-design/core/button';
import { Input } from '@hidearea-design/core/input';
// → 使用するコンポーネントのみバンドル
```

**実装方法**:

`packages/core/package.json` に exports フィールドを追加：

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js"
    },
    "./button": {
      "types": "./dist/components/button/button.d.ts",
      "import": "./dist/components/button/button.js"
    },
    "./input": {
      "types": "./dist/components/input/input.d.ts",
      "import": "./dist/components/input/input.js"
    }
    // ... 全コンポーネント分
  },
  "sideEffects": false
}
```

**期待される効果**:
- バンドルサイズ 50-80% 削減
- 初回ロード時間の短縮

#### 2. CSS の最適化

**現状**: CSS トークン合計 841.79 KB

**推奨対策**:

1. **コンポーネント別CSS読み込み**:
```javascript
// 必要なコンポーネントのCSSのみ
import '@hidearea-design/tokens/button.css';
import '@hidearea-design/tokens/input.css';
```

2. **PurgeCSS の導入**:
```javascript
// postcss.config.js
import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    purgecss({
      content: ['./src/**/*.{html,ts,tsx,vue}'],
      safelist: {
        standard: [/^ha-/],
        deep: [/::part/],
        greedy: [/data-theme/]
      }
    })
  ]
};
```

**期待される効果**: 30-50% の CSS サイズ削減

#### 3. Code Splitting の実装

**対象コンポーネント**（サイズの大きい順）:

| Component | Source Size | 推奨アプローチ |
|-----------|-------------|-------------|
| TimePicker | 27.74 KB | 動的インポート |
| ColorPicker | 24.75 KB | 動的インポート |
| DatePicker | 24.61 KB | 動的インポート |
| FileUpload | 17.86 KB | 動的インポート |
| DataGrid | 13.65 KB | 動的インポート |

**実装例**:
```typescript
// ユーザーがアクションを実行したときに読み込む
async function openDatePicker() {
  const { DatePicker } = await import('@hidearea-design/core/date-picker');
  const picker = new DatePicker();
  // ...
}
```

**期待される効果**: 初回ロードで 100+ KB の削減

### 優先度: 中 🟡

#### 4. 依存関係の最適化

**現在の依存関係分析**:
```bash
# バンドルアナライザーで確認
pnpm exec vite-bundle-visualizer
```

**推奨アクション**:
- 重複する依存関係を peerDependencies に移行
- 未使用の依存関係を削除
- より軽量な代替ライブラリを検討

#### 5. アイコンとアセットの最適化

**推奨**:
1. **SVGスプライトの使用**
   ```html
   <svg><use href="#icon-check"></use></svg>
   ```

2. **アイコンフォントの遅延読み込み**
   ```javascript
   // 必要になったときに読み込む
   if (needsIcons) {
     await import('./icon-font.css');
   }
   ```

3. **画像フォーマットの最適化**
   - WebP/AVIFフォーマットのサポート
   - 画像の遅延読み込み

### 優先度: 低 🟢

#### 6. Web Workers の活用

**対象処理**:
- DataGrid のソート・フィルタリング
- 大量データの変換・処理
- 複雑な計算処理

**実装例**:
```typescript
// worker.ts
self.addEventListener('message', (e) => {
  const sorted = sortLargeDataset(e.data);
  self.postMessage(sorted);
});

// main.ts
const worker = new Worker('./worker.ts');
worker.postMessage(largeDataset);
worker.addEventListener('message', (e) => {
  updateGrid(e.data);
});
```

#### 7. Virtual Scrolling の実装

**対象コンポーネント**:
- DataGrid (大量行の表示)
- 長いリスト表示

**期待される効果**: メモリ使用量の大幅削減

## 📈 使用パターン別の期待サイズ

| 使用パターン | バンドルサイズ (gzip) | コンポーネント数 |
|------------|-------------------|----------------|
| 単一コンポーネント | 5-8 KB | 1 (Button) |
| 基本フォーム | 15-20 KB | 3 (Input, Button, Alert) |
| 一般的なUI | 20-25 KB | 4 (Button, Card, Badge, Alert) |
| 複雑なフォーム | 35-45 KB | 4 (Input, Select, DatePicker, Button) |
| 全コンポーネント | 64 KB | 37 (全て) |

## 🔬 パフォーマンステスト

### ベンチマークの実行

```bash
# 開発サーバーを起動
pnpm dev

# ブラウザでアクセス
# http://localhost:5173/scripts/performance-benchmark.html
```

### 目標パフォーマンス指標

| 指標 | 目標値 | 良好 | 要改善 |
|-----|-------|------|-------|
| コンポーネント登録 | < 1ms | < 5ms | > 10ms |
| 初回レンダリング | < 10ms | < 50ms | > 100ms |
| 再レンダリング | < 5ms | < 20ms | > 50ms |
| 属性変更 | < 1ms | < 5ms | > 10ms |
| イベントハンドラ | < 1ms | < 3ms | > 5ms |

### コンポーネント別の推定パフォーマンス

| Component | 登録 | 初回レンダリング | 再レンダリング | メモリ/個 |
|-----------|-----|--------------|------------|----------|
| Button | 0.5ms | 2ms | 0.5ms | 1-2 KB |
| Input | 0.8ms | 3ms | 1ms | 2-3 KB |
| Select | 1ms | 5ms | 2ms | 3-5 KB |
| Table (100行) | 1ms | 30ms | 15ms | 50-100 KB |
| DataGrid (1000行) | 2ms | 80ms | 40ms | 100-200 KB |
| DatePicker | 2ms | 10ms | 5ms | 10-15 KB |
| Modal | 1ms | 8ms | 3ms | 5-8 KB |

## 🎯 Core Web Vitals 目標

| メトリクス | 目標値 | 説明 |
|----------|-------|-----|
| LCP | < 2.5s | 最大コンテンツの描画時間 |
| FID | < 100ms | 初回入力遅延 |
| CLS | < 0.1 | 累積レイアウトシフト |
| FCP | < 1.8s | 初回コンテンツ描画 |
| TTI | < 3.8s | インタラクティブまでの時間 |

## 🛠️ 推奨ツール

### 1. バンドル分析
```bash
# Vite Bundle Visualizer
pnpm add -D vite-bundle-visualizer
pnpm exec vite-bundle-visualizer
```

### 2. Lighthouse CI
```bash
npm install -g @lhci/cli
lhci autorun --config=lighthouserc.json
```

### 3. Web Vitals モニタリング
```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

## 📝 ベストプラクティス

### コンポーネントのインポート

```typescript
// ✅ 推奨: 個別インポート（実装予定）
import { Button } from '@hidearea-design/core/button';
import { Input } from '@hidearea-design/core/input';

// ⚠️ 許容: Named imports (ツリーシェイキングに依存)
import { Button, Input } from '@hidearea-design/core';

// ❌ 非推奨: 全体インポート
import * as HideareaDesign from '@hidearea-design/core';
```

### CSSの読み込み

```typescript
// ✅ 推奨: 必要なコンポーネントのみ
import '@hidearea-design/tokens/button.css';
import '@hidearea-design/tokens/input.css';

// ❌ 非推奨: 全CSS読み込み
import '@hidearea-design/tokens/all.css';
```

### 動的読み込み

```typescript
// ✅ 推奨: 重いコンポーネントは動的に
const DatePicker = lazy(() => import('@hidearea-design/core/date-picker'));

// 使用時
<Suspense fallback={<Spinner />}>
  <DatePicker />
</Suspense>
```

## 📊 継続的なモニタリング

### CI/CD統合

```yaml
# .github/workflows/performance.yml
name: Performance Tests

on: [pull_request]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm build
      - name: Bundle size check
        run: pnpm exec tsx scripts/analyze-bundle-sizes.ts
      - name: Performance benchmark
        run: pnpm test:perf
```

### パフォーマンス予算

```json
{
  "budgets": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 100 },
        { "resourceType": "style", "budget": 50 }
      ]
    },
    {
      "timings": [
        { "metric": "interactive", "budget": 3000 },
        { "metric": "first-contentful-paint", "budget": 1000 }
      ]
    }
  ]
}
```

## 🎬 次のステップ

### 短期（1-2週間）
1. ✅ バンドルサイズ分析完了
2. ✅ ツリーシェイキング検証完了
3. ✅ パフォーマンスベンチマーク作成完了
4. 🔲 Per-component imports の実装
5. 🔲 PurgeCSS の導入
6. 🔲 `sideEffects: false` の追加

### 中期（1-2ヶ月）
1. 🔲 Code splitting の実装
2. 🔲 パフォーマンステストの自動化
3. 🔲 Bundle size regression テスト
4. 🔲 Lighthouse CI の導入

### 長期（3+ ヶ月）
1. 🔲 Web Workers の活用
2. 🔲 Virtual scrolling の実装
3. 🔲 パフォーマンスダッシュボード構築
4. 🔲 Real User Monitoring (RUM)

## 📚 参考資料

- [Bundle Size Analysis Report](./performance-analysis.md) - 詳細な分析レポート
- [Performance Benchmark Suite](../../scripts/performance-benchmark.html) - ブラウザベンチマーク
- [Tree-shaking Test](../../scripts/tree-shaking-test/) - ツリーシェイキング検証

## まとめ

### 現在の評価
- ✅ 基本的なツリーシェイキング対応済み
- ✅ 良好な圧縮率（15-23%）
- ✅ 許容範囲のバンドルサイズ（64 KB gzip）
- ⚠️ CSS最適化の余地あり
- ⚠️ 大型コンポーネントの分割推奨

### 重点施策
1. **Per-component imports の提供**（最優先）
2. **CSS最適化**（PurgeCSS導入）
3. **大型コンポーネントの Code splitting**
4. **継続的なパフォーマンス監視体制の構築**

これらの施策により、実際の使用シーンでのバンドルサイズを **50-80% 削減** できる見込みです。
