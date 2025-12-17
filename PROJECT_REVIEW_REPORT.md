# プロジェクト横断レビューレポート

実施日: 2025-12-17
対象: hidearea-design プロジェクト全体

## エグゼクティブサマリー

hidearea-designプロジェクトの全体的なコードベースを横断的にレビューしました。
プロジェクト構造は堅牢で、モノレポ設計は良好ですが、いくつかの改善点が見つかりました。

### 重要度別サマリー

- 🔴 **Critical（緊急）**: 1件
- 🟡 **High（高）**: 3件
- 🟢 **Medium（中）**: 4件
- ⚪ **Low（低）**: 2件

---

## 🔴 Critical Issues（緊急対応が必要）

### 1. Repository URLの不整合

**ファイル**: `/package.json`
**行**: 6-8

**問題**:
```json
"repository": {
  "type": "git",
  "url": "https://github.com/hidearea-design/hidearea-design.git"
}
```

**実際のURL**: `https://github.com/hardlitchi/hidearea-design.git`

**影響**:
- npm公開時にリポジトリリンクが正しく表示されない
- ユーザーがソースコードを見つけられない
- 自動化ツールがリポジトリを正しく参照できない

**修正案**:
```json
"repository": {
  "type": "git",
  "url": "https://github.com/hardlitchi/hidearea-design.git"
}
```

---

## 🟡 High Priority Issues（優先度高）

### 2. 全パッケージでrepositoryフィールドが欠落

**影響するファイル**:
- `packages/core/package.json`
- `packages/tokens/package.json`
- `packages/react/package.json`
- `packages/vue/package.json`
- `packages/mcp-server/package.json`
- `packages/docs/package.json`
- `packages/storybook/package.json`
- `packages/visual-tests/package.json`

**問題**:
各パッケージにrepositoryフィールドが設定されていない

**影響**:
- npm公開時にパッケージページでリポジトリリンクが表示されない
- Issue trackerへの参照が欠落
- パッケージの信頼性が低下

**修正案**:
各package.jsonに以下を追加:
```json
"repository": {
  "type": "git",
  "url": "https://github.com/hardlitchi/hidearea-design.git",
  "directory": "packages/<package-name>"
}
```

### 3. visual-regression.ymlでnpmを使用（pnpmプロジェクト）

**ファイル**: `.github/workflows/visual-regression.yml`
**行**: 23, 26, 30-31, 37

**問題**:
```yaml
cache: 'npm'           # 行23
run: npm ci            # 行26
run: npm run build     # 行30-31
run: npm run test      # 行37
```

プロジェクトは`pnpm`を使用しているが、このワークフローだけ`npm`を使用

**影響**:
- ワークフローが失敗する可能性
- 依存関係の不整合
- ビルド時間の増加

**修正案**:
```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v4

- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'pnpm'

- name: Install dependencies
  run: pnpm install --frozen-lockfile

- name: Build packages
  run: |
    pnpm --filter @hidearea-design/tokens build
    pnpm --filter @hidearea-design/core build

- name: Run visual regression tests
  run: pnpm --filter @hidearea-design/visual-tests test
```

### 4. パッケージバージョンの不整合

**問題**:
モノレポ内のパッケージバージョンが統一されていない

**現在のバージョン**:
- `@hidearea-design/core`: 0.1.0
- `@hidearea-design/tokens`: 0.1.0
- `@hidearea-design/react`: 0.1.0
- `@hidearea-design/vue`: 0.1.0
- `@hidearea-design/mcp-server`: **0.2.0** ⚠️
- `@hidearea-design/docs`: **0.0.1** ⚠️
- `@hidearea-design/storybook`: **0.0.1** ⚠️
- `@hidearea-design/visual-tests`: **0.0.1** ⚠️

**影響**:
- リリース管理の混乱
- ユーザーがどのバージョンが最新か分からない
- changesetsによる自動バージョン管理の妨げ

**推奨事項**:
1. **公開パッケージ**（core, tokens, react, vue, mcp-server）は統一バージョンを維持
2. **内部パッケージ**（docs, storybook, visual-tests）は`"private": true`なので独自バージョンでOK
3. mcp-serverを0.1.0に戻すか、他を0.2.0に上げるか決定

---

## 🟢 Medium Priority Issues（中優先度）

### 5. TypeScriptバージョンの不整合

**問題**:
- ルートおよびほとんどのパッケージ: `^5.4.5`
- mcp-serverパッケージ: `^5.7.2`

**ファイル**:
- `/package.json` (行42): `"typescript": "^5.4.5"`
- `packages/mcp-server/package.json` (行38): `"typescript": "^5.7.2"`

**影響**:
- ビルド結果の不整合の可能性
- 型定義の互換性問題

**修正案**:
すべてのパッケージで`^5.7.2`に統一（より新しいバージョン）

### 6. 未使用のcliパッケージディレクトリ

**パス**: `packages/cli/`

**問題**:
- package.jsonが存在しない
- distディレクトリのみ存在
- ワークスペースに含まれていない

**推奨事項**:
- 使用していない場合は削除
- 将来使用する予定がある場合は.gitignoreまたはドキュメントに記載

### 7. 重複する開発用依存関係

**問題**:
ルートと各パッケージで同じ開発用依存関係が重複

**例**:
- `vitest`, `@vitest/coverage-v8`, `@vitest/ui` が複数パッケージで重複
- `eslint`, `typescript` が複数パッケージで重複

**影響**:
- インストール時間の増加
- ディスク容量の無駄

**推奨事項**:
pnpmの共有機能を活用しているので問題は最小限だが、将来的にはルートでの一元管理を検討

### 8. CHANGELOGとCHANGELOG.mdの二重管理

**ファイル**:
- `/CHANGELOG.md` - プロジェクト全体のchangelog
- 各パッケージの`CHANGELOG.md` - changesets生成

**問題**:
ルートのCHANGELOG.mdが手動管理されており、changesetsと二重管理になっている

**推奨事項**:
- ルートCHANGELOG.mdを削除し、changesetsに一本化
- または、ルートCHANGELOG.mdを各パッケージのchangelogの集約ビューとして自動生成

---

## ⚪ Low Priority Issues（低優先度）

### 9. docsパッケージのNode.jsバージョン指定なし

**ファイル**: `packages/docs/package.json`

**問題**:
他のパッケージには`engines`フィールドがあるが、docsパッケージにはない

**推奨事項**:
一貫性のため追加:
```json
"engines": {
  "node": ">=18.0.0"
}
```

### 10. 開発スクリプトの不統一

**問題**:
- 一部パッケージ: `"dev": "vite build --watch"`
- 一部パッケージ: `"dev": "tsc --watch"`
- 一部パッケージ: 独自の dev スクリプト

**影響**:
開発者体験の一貫性低下（ただし、各パッケージの性質による違いは妥当）

**推奨事項**:
現状維持でOK（各パッケージの性質に合わせている）

---

## ✅ Positive Findings（良好な点）

1. **workspace:* の正しい使用**
   - すべての内部依存関係で`workspace:*`を使用
   - バージョン管理が適切

2. **一貫したビルドツール**
   - Vite, Vitest, TypeScriptを統一的に使用
   - 最新のツールチェーン

3. **包括的なテスト環境**
   - 単体テスト（Vitest）
   - ビジュアルリグレッションテスト（Playwright）
   - アクセシビリティテスト（axe-core）

4. **優れたドキュメント**
   - README.md が充実
   - docs/guides/ に詳細なガイド
   - Storybookによるコンポーネントカタログ

5. **適切なCI/CD設定**
   - GitHub Actions で自動テスト
   - 自動デプロイ（Docs, Storybook）
   - Changesets による自動リリース管理

6. **モダンな開発環境**
   - pnpm によるモノレポ管理
   - Turbo による並列ビルド
   - TypeScript による型安全性

---

## 推奨される優先順位付き対応

### Phase 1: 緊急（今すぐ）

1. ✅ Repository URLを修正（ルートpackage.json）
2. ✅ 各パッケージにrepositoryフィールドを追加
3. ⏳ visual-regression.ymlをpnpmに移行

### Phase 2: 短期（v0.1.0リリース前）

4. ⏳ パッケージバージョンの整合性を確認・調整
5. ⏳ TypeScriptバージョンを統一

### Phase 3: 中期（v0.2.0以降）

6. ⏳ 未使用のcliディレクトリを整理
7. ⏳ CHANGELOG管理方法の統一
8. ⏳ 開発用依存関係の最適化検討

---

## 結論

hidearea-designプロジェクトは全体的に非常に良好な状態です。
モダンな技術スタック、適切なアーキテクチャ、包括的なテストとドキュメントを備えています。

発見された問題の多くは設定レベルの軽微なものであり、
Critical/High優先度の項目を修正すれば、v0.1.0リリースに向けて準備は整います。

特に評価できる点:
- Web Components標準による真のフレームワーク非依存性
- トークンベースの設計による保守性の高さ
- アクセシビリティへの配慮
- 充実したドキュメントとサンプル

今後の成長が期待できる、非常に有望なデザインシステムプロジェクトです。
