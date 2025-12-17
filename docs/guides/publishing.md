# パッケージの公開ガイド

このガイドでは、hidearea-designパッケージをnpmに公開する手順を説明します。

## 前提条件

### 必要な権限

- npm organizationへのアクセス権限（@hidearea-design）
- GitHubリポジトリへのwrite権限
- 必要な環境変数の設定

### 必要なツール

```bash
# Node.js 18以上
node --version  # v18.0.0+

# pnpm
pnpm --version  # 8.0.0+

# npm認証
npm whoami  # ログインしていることを確認
```

## 公開プロセス

### 1. 変更内容の確認

まず、公開予定の変更内容を確認します：

```bash
# すべてのテストが通ることを確認
pnpm test

# ビルドが成功することを確認
pnpm build

# リンターエラーがないことを確認
pnpm lint
```

### 2. Changesetの作成

機能追加や修正を行った場合は、changesetを作成します：

```bash
pnpm changeset
```

対話的なプロンプトに従って、以下を入力します：

1. **変更されたパッケージを選択**
   - `@hidearea-design/core` - コンポーネントライブラリ
   - `@hidearea-design/tokens` - デザイントークン
   - `@hidearea-design/react` - Reactラッパー
   - `@hidearea-design/vue` - Vueラッパー

2. **バージョンバンプのタイプを選択**
   - `major` - 破壊的変更（v1.0.0 → v2.0.0）
   - `minor` - 新機能追加（v1.0.0 → v1.1.0）
   - `patch` - バグ修正（v1.0.0 → v1.0.1）

3. **変更内容のサマリーを入力**
   - ユーザーに表示される変更内容
   - 日本語または英語で記述

**例：**

```
🦋  Which packages would you like to include?
› ◉ @hidearea-design/core
  ◯ @hidearea-design/tokens
  ◯ @hidearea-design/react
  ◯ @hidearea-design/vue

🦋  Which packages should have a minor bump?
› ◉ @hidearea-design/core

🦋  Please enter a summary for this change:
› Add theme-switcher component with toggle, dropdown, and segmented variants
```

### 3. バージョンの更新

changesetをもとにバージョンを更新します：

```bash
pnpm changeset version
```

このコマンドは：
- 各パッケージの`package.json`のversionを更新
- `CHANGELOG.md`を生成または更新
- changesetファイルを削除

**生成されるCHANGELOG例：**

```markdown
## 0.1.0

### Minor Changes

- abc123: Add theme-switcher component with toggle, dropdown, and segmented variants
```

### 4. 変更内容のレビューとコミット

更新された内容を確認してコミットします：

```bash
# 変更内容を確認
git status
git diff

# コミット
git add .
git commit -m "chore: version packages"
git push
```

### 5. パッケージのビルド

公開前に最終ビルドを実行します：

```bash
# クリーンビルド
pnpm clean
pnpm build

# ビルド成果物の確認
ls packages/core/dist/
ls packages/tokens/build/
```

### 6. npmへの公開

#### 6.1 ドライラン（推奨）

実際に公開する前に、ドライランで確認します：

```bash
# coreパッケージのドライラン
cd packages/core
npm publish --dry-run

# tokensパッケージのドライラン
cd ../tokens
npm publish --dry-run
```

#### 6.2 実際の公開

問題がなければ、実際に公開します：

```bash
# changesetを使用した一括公開（推奨）
pnpm changeset publish
```

または、個別に公開：

```bash
# coreパッケージ
cd packages/core
npm publish --access public

# tokensパッケージ
cd ../tokens
npm publish --access public

# reactパッケージ
cd ../react
npm publish --access public

# vueパッケージ
cd ../vue
npm publish --access public
```

#### 6.3 公開の確認

```bash
# npmで公開されたことを確認
npm view @hidearea-design/core
npm view @hidearea-design/tokens

# バージョンが正しいことを確認
npm view @hidearea-design/core version
```

### 7. GitHubリリースの作成

npmへの公開後、GitHubでリリースを作成します：

```bash
# タグの作成
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

GitHubのウェブUIで：
1. [Releases](https://github.com/hardlitchi/hidearea-design/releases) ページへ移動
2. "Draft a new release" をクリック
3. タグを選択（v0.1.0）
4. リリースノートを記述：
   - 新機能のハイライト
   - 破壊的変更（もしあれば）
   - バグ修正
   - CHANGELOGへのリンク
5. "Publish release" をクリック

## トラブルシューティング

### npm認証エラー

```bash
# npmにログイン
npm login

# 認証トークンの確認
cat ~/.npmrc | grep _authToken
```

### パッケージが見つからない

```bash
# package.jsonのnameとversionを確認
cat packages/core/package.json | grep -E '"name"|"version"'

# npm organizationを確認
npm org ls @hidearea-design
```

### バージョンが既に存在する

一度公開したバージョンは削除できません。新しいバージョンを公開してください：

```bash
# パッチバージョンを上げる
pnpm changeset version
# または
npm version patch
```

### ビルドエラー

```bash
# node_modulesとビルド成果物を削除して再ビルド
pnpm clean
rm -rf node_modules
pnpm install
pnpm build
```

## ベストプラクティス

### バージョニング

- **Major (x.0.0)**: 破壊的変更、API変更
- **Minor (0.x.0)**: 新機能追加、後方互換性あり
- **Patch (0.0.x)**: バグ修正、後方互換性あり

### Changesetのタイミング

- PRごとにchangesetを作成
- 複数の関連する変更は1つのchangesetにまとめる
- 内部変更（テスト、ドキュメント）はchangeset不要

### 公開頻度

- バグ修正: 即座に公開（パッチバージョン）
- 新機能: 週次または隔週（マイナーバージョン）
- 破壊的変更: 慎重に計画（メジャーバージョン）

### セキュリティ

- `.npmrc`をgitignoreに追加
- npm tokenは環境変数で管理
- 2FAを有効化
- packageのaccessは`public`に設定

## CI/CD統合

GitHub Actionsでの自動公開も設定可能です：

```yaml
# .github/workflows/publish.yml
name: Publish
on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install
      - run: pnpm build
      - run: pnpm changeset publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 関連リンク

- [Changesets Documentation](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- [Semantic Versioning](https://semver.org/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [CHANGELOG](../../CHANGELOG.md)
