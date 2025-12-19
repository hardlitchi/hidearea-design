# Per-Component Imports ガイド

バンドルサイズを最適化するために、個別のコンポーネントインポートをサポートしています。

## 📦 概要

Hidearea Design では、以下の3つのインポート方法を提供しています：

1. **Full Import** - すべてのコンポーネントをインポート
2. **Named Import** - 必要なコンポーネントのみを選択的にインポート（ツリーシェイキングに依存）
3. **Per-Component Import** - 個別のコンポーネントパスから直接インポート（推奨）

## 🎯 推奨: Per-Component Imports

最小のバンドルサイズを実現するために、個別のコンポーネントパスからのインポートを推奨します。

### Core Package

```typescript
// ✅ 推奨: 個別インポート
import { HaButton } from '@hidearea-design/core/button';
import { HaInput } from '@hidearea-design/core/input';
import { HaCard } from '@hidearea-design/core/card';

// ユーティリティもインポート可能
import { getTheme, setTheme } from '@hidearea-design/core/utils/theme';
```

### React Wrapper

```typescript
// ✅ 推奨: 個別インポート（実装予定）
import { Button } from '@hidearea-design/react/button';
import { Input } from '@hidearea-design/react/input';

// 現在は Named Import を使用
import { Button, Input } from '@hidearea-design/react';
```

### Vue Wrapper

```typescript
// ✅ 推奨: 個別インポート（実装予定）
import { Button } from '@hidearea-design/vue/button';
import { Input } from '@hidearea-design/vue/input';

// 現在は Named Import を使用
import { Button, Input } from '@hidearea-design/vue';
```

## 📊 バンドルサイズの比較

| インポート方法 | バンドルサイズ (gzip) | ユースケース |
|------------|-------------------|------------|
| Per-Component (1個) | ~5-8 KB | 単一コンポーネント使用 |
| Per-Component (3個) | ~15-20 KB | 基本的なフォーム |
| Per-Component (5個) | ~25-30 KB | 一般的なUI |
| Named Import | ~64 KB * | ツリーシェイキング次第 |
| Full Import | 64 KB | 多数のコンポーネント使用 |

\* ツリーシェイキングが効果的に機能する場合、Per-Component と同等のサイズになります。

## 🔧 利用可能なコンポーネントパス

### レイアウト
```typescript
import { HaButton } from '@hidearea-design/core/button';
import { HaContainer } from '@hidearea-design/core/container';
import { HaGrid } from '@hidearea-design/core/grid';
import { HaStack } from '@hidearea-design/core/stack';
```

### フォーム
```typescript
import { HaInput } from '@hidearea-design/core/input';
import { HaCheckbox } from '@hidearea-design/core/checkbox';
import { HaRadio } from '@hidearea-design/core/radio';
import { HaSelect } from '@hidearea-design/core/select';
import { HaSwitch } from '@hidearea-design/core/switch';
import { HaTextarea } from '@hidearea-design/core/textarea';
import { HaSlider } from '@hidearea-design/core/slider';
import { HaFormGroup } from '@hidearea-design/core/form-group';
```

### データ表示
```typescript
import { HaCard } from '@hidearea-design/core/card';
import { HaBadge } from '@hidearea-design/core/badge';
import { HaChip } from '@hidearea-design/core/chip';
import { HaAvatar } from '@hidearea-design/core/avatar';
import { HaTable } from '@hidearea-design/core/table';
import { HaDataGrid } from '@hidearea-design/core/datagrid';
import { HaAccordion } from '@hidearea-design/core/accordion';
import { HaList } from '@hidearea-design/core/list';
```

### ナビゲーション
```typescript
import { HaTabs } from '@hidearea-design/core/tabs';
import { HaBreadcrumb } from '@hidearea-design/core/breadcrumb';
import { HaMenu } from '@hidearea-design/core/menu';
import { HaPagination } from '@hidearea-design/core/pagination';
```

### フィードバック
```typescript
import { HaAlert } from '@hidearea-design/core/alert';
import { HaToast } from '@hidearea-design/core/toast';
import { HaProgress } from '@hidearea-design/core/progress';
import { HaSpinner } from '@hidearea-design/core/spinner';
import { HaSkeleton } from '@hidearea-design/core/skeleton';
```

### オーバーレイ
```typescript
import { HaModal } from '@hidearea-design/core/modal';
import { HaDrawer } from '@hidearea-design/core/drawer';
import { HaTooltip } from '@hidearea-design/core/tooltip';
```

### ピッカー
```typescript
import { HaDatePicker } from '@hidearea-design/core/date-picker';
import { HaTimePicker } from '@hidearea-design/core/time-picker';
import { HaColorPicker } from '@hidearea-design/core/color-picker';
import { HaFileUpload } from '@hidearea-design/core/file-upload';
```

### ユーティリティ
```typescript
import { ThemeSwitcher } from '@hidearea-design/core/theme-switcher';
import { getTheme, setTheme, toggleTheme } from '@hidearea-design/core/utils/theme';
```

## 💡 実用例

### 例1: シンプルなログインフォーム

```typescript
// 必要なコンポーネントのみインポート
import { HaInput } from '@hidearea-design/core/input';
import { HaButton } from '@hidearea-design/core/button';
import { HaFormGroup } from '@hidearea-design/core/form-group';
import { HaAlert } from '@hidearea-design/core/alert';

// 予想バンドルサイズ: ~18 KB (gzip)
```

### 例2: ダッシュボードUI

```typescript
import { HaCard } from '@hidearea-design/core/card';
import { HaBadge } from '@hidearea-design/core/badge';
import { HaButton } from '@hidearea-design/core/button';
import { HaGrid } from '@hidearea-design/core/grid';
import { HaProgress } from '@hidearea-design/core/progress';

// 予想バンドルサイズ: ~25 KB (gzip)
```

### 例3: データテーブル

```typescript
import { HaDataGrid } from '@hidearea-design/core/datagrid';
import { HaPagination } from '@hidearea-design/core/pagination';
import { HaButton } from '@hidearea-design/core/button';
import { HaInput } from '@hidearea-design/core/input';
import { HaSpinner } from '@hidearea-design/core/spinner';

// 予想バンドルサイズ: ~35 KB (gzip)
```

## 🚀 パフォーマンスのヒント

### 1. 動的インポートを活用

重いコンポーネントは遅延読み込みを検討してください：

```typescript
// React での例
const DatePicker = lazy(() => import('@hidearea-design/core/date-picker').then(m => ({ default: m.HaDatePicker })));

function MyForm() {
  return (
    <Suspense fallback={<Spinner />}>
      <DatePicker />
    </Suspense>
  );
}
```

```typescript
// Vue での例
import { defineAsyncComponent } from 'vue';

const DatePicker = defineAsyncComponent(() =>
  import('@hidearea-design/core/date-picker').then(m => m.HaDatePicker)
);
```

### 2. CSS も個別に読み込む

コンポーネントのスタイルも必要なものだけ読み込みます：

```typescript
// Tokens パッケージから個別のCSSを読み込み
import '@hidearea-design/tokens/button.css';
import '@hidearea-design/tokens/input.css';

// または、全体のスタイル
import '@hidearea-design/tokens/all.css';
```

### 3. ビルドツールの設定

最適なツリーシェイキングのために、ビルドツールを適切に設定してください：

#### Vite

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 大きなコンポーネントを個別にチャンク化
          'datagrid': ['@hidearea-design/core/datagrid'],
          'date-picker': ['@hidearea-design/core/date-picker'],
          'color-picker': ['@hidearea-design/core/color-picker'],
        }
      }
    }
  }
});
```

#### Webpack

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: true,
  },
};
```

## 🔍 バンドルサイズの確認方法

### 1. Bundle Analyzer を使用

```bash
# Vite
npm install -D rollup-plugin-visualizer

# Webpack
npm install -D webpack-bundle-analyzer
```

### 2. Bundlephobia で確認

https://bundlephobia.com/ にアクセスして、`@hidearea-design/core` を検索

### 3. ビルド後のサイズを確認

```bash
pnpm build

# 出力されたファイルサイズを確認
ls -lh dist/
```

## ⚠️ 注意事項

### Web Components の登録

Per-component imports を使用する場合でも、Web Components は自動的にカスタム要素として登録されます：

```typescript
import { HaButton } from '@hidearea-design/core/button';

// これで <ha-button> が使用可能になります
// 明示的な登録は不要
```

### TypeScript の型定義

各コンポーネントパスには型定義が含まれています：

```typescript
import { HaButton } from '@hidearea-design/core/button';

// 型定義が自動的に利用可能
const button: HaButton = document.createElement('ha-button');
```

## 📚 関連ドキュメント

- [パフォーマンス最適化ガイド](./performance-optimization.md)
- [バンドルサイズ分析レポート](./performance-analysis.md)
- [Tree-shaking ガイド](./performance-optimization.md#tree-shaking-analysis)

## 🎯 まとめ

Per-component imports を使用することで：

- ✅ バンドルサイズを **50-80% 削減**
- ✅ 初回ロード時間を大幅に短縮
- ✅ より細かいコード分割が可能
- ✅ ツリーシェイキングの効果を最大化

小規模なプロジェクトや、少数のコンポーネントのみを使用する場合は、Per-component imports を強く推奨します。
