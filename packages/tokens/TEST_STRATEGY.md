# テスト戦略

**パッケージ:** @hidearea-design/tokens
**目的:** デザイントークンとコンポーネントスタイルの品質と一貫性を保証

---

## 📋 テストの範囲

### 1. ビルドシステムテスト
**目的:** ビルドプロセスが正しく動作し、すべての必要なファイルが生成されることを確認

**テスト項目:**
- ✅ デザイントークンのビルド (CSS変数, JS, TS)
- ✅ コンポーネントスタイルの4パターン生成
  - Pattern 1: WebComponents (`:host` セレクター)
  - Pattern 2: HTML (`.ha-*` クラスセレクター)
  - Pattern 3: React/Vue (JavaScript/TypeScript エクスポート)
  - Pattern 4: Unified (統合CSSファイル)
- ✅ ファイル数と構造の検証
- ✅ CSS変換の正確性 (`:host` → `.ha-*`)

**実装方法:** Node.js スクリプト

### 2. CSSバリデーション
**目的:** 生成されたCSSが有効で、構文エラーがないことを確認

**テスト項目:**
- CSS構文の妥当性
- セレクターの正確性
- CSS変数参照の正当性
- メディアクエリの構文

**実装方法:** postcss + stylelint または css-validator

### 3. トークン整合性テスト
**目的:** デザイントークンが一貫性を持ち、参照エラーがないことを確認

**テスト項目:**
- トークン参照の解決
- 循環参照の検出
- 欠損トークンの検出
- テーマトークン（light/dark）の対称性

**実装方法:** カスタムNode.jsスクリプト

### 4. ドキュメント整合性テスト
**目的:** ドキュメントとCSS実装が一致していることを確認

**テスト項目:**
- ドキュメント内のクラス名とCSS実装の一致
- すべてのコンポーネントにドキュメントが存在
- Pattern 2セクションの存在確認

**実装方法:** カスタムNode.jsスクリプト（既に実装済み）

### 5. ビジュアルリグレッションテスト（今後）
**目的:** コンポーネントの見た目が意図しない変更を受けていないことを確認

**テスト項目:**
- 各コンポーネントのスナップショット
- テーマ切り替え時の見た目
- レスポンシブブレークポイント

**実装方法:** Playwright + Storybook (今後実装)

---

## 🧪 テスト実装計画

### Phase 1: 基本テスト（現在）
デザイントークンパッケージに最低限必要なテストを実装

**実装するテスト:**
1. ビルドシステムテスト
   - `tests/build.test.js` - ビルド出力の検証
2. CSS構文テスト
   - `tests/css-validation.test.js` - CSS構文の検証
3. トークン整合性テスト
   - `tests/token-consistency.test.js` - トークン参照の検証

**テストフレームワーク:** Vitest (軽量、高速、ESM対応)

### Phase 2: 拡張テスト（今後）
より包括的なテストスイート

**実装するテスト:**
1. コンポーネント単位テスト
2. アクセシビリティテスト
3. パフォーマンステスト
4. ビジュアルリグレッションテスト

---

## 🛠️ テストツール

### 選定理由

**Vitest**
- ✅ ESM ネイティブサポート
- ✅ 高速な実行速度
- ✅ Jest互換のAPI
- ✅ TypeScript サポート
- ✅ 設定が簡単

**代替案:**
- Jest: ESM対応が不完全
- Mocha: 機能が少ない
- Node.js test runner: 新しすぎる

---

## 📊 テスト実行

### コマンド

```bash
# すべてのテストを実行
npm test

# ウォッチモードで実行
npm run test:watch

# カバレッジレポート生成
npm run test:coverage

# 特定のテストファイルのみ実行
npm test build.test.js
```

### CI/CD統合

**GitHub Actions ワークフロー:**
1. コミット時に自動実行
2. プルリクエスト時に自動実行
3. テスト失敗時はマージをブロック

---

## ✅ 成功基準

### ビルドシステムテスト
- ✅ 175個のファイルが生成される
- ✅ すべてのコンポーネント (42個) が4パターンでビルドされる
- ✅ 統合CSSファイルが生成される
- ✅ TypeScript定義ファイルが生成される

### CSS構文テスト
- ✅ すべてのCSSファイルが有効な構文
- ✅ セレクターエラーなし
- ✅ CSS変数参照エラーなし

### トークン整合性テスト
- ✅ すべてのトークン参照が解決可能
- ✅ 循環参照なし
- ✅ light/darkテーマの対称性確保

### ドキュメント整合性テスト
- ✅ 40/40コンポーネントにドキュメント存在
- ✅ すべてのドキュメントで正しい `.ha-*` クラス使用
- ✅ Pattern 2 セクション100%存在

---

## 🎯 Phase 1 実装ステップ

### Step 1: Vitestのインストール

```bash
npm install -D vitest @vitest/ui
```

### Step 2: vitest.config.js作成

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['build/**', 'node_modules/**', 'tests/**']
    }
  }
});
```

### Step 3: テストファイル作成

1. `tests/build.test.js`
2. `tests/css-validation.test.js`
3. `tests/token-consistency.test.js`

### Step 4: package.json更新

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Step 5: GitHub Actionsワークフロー作成

`.github/workflows/test.yml`

---

## 📝 メンテナンス

### テストの更新タイミング
- 新しいコンポーネント追加時
- トークン構造変更時
- ビルドシステム変更時
- バグ発見時（リグレッション防止）

### テストカバレッジ目標
- ビルドスクリプト: 80%以上
- トークン定義: 100%（すべてのトークンが検証される）
- CSS変換: 90%以上

---

**作成日:** 2025-12-15
**最終更新:** 2025-12-15
