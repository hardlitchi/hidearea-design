# npm パッケージ公開ガイド

## 概要

このガイドでは、hidearea-designパッケージをnpmレジストリに公開する手順を説明します。

## 前提条件

### 1. npmアカウントの作成

1. [npmjs.com](https://www.npmjs.com/)でアカウントを作成
2. メールアドレスを確認

### 2. npmトークンの生成

#### オプション A: Classic Token（推奨）

1. [npmjs.com](https://www.npmjs.com/)にログイン
2. 右上のプロフィール → **Access Tokens** をクリック
3. **Generate New Token** → **Classic Token** をクリック
4. トークン名を入力（例: `hidearea-design-ci`）
5. トークンタイプを選択:
   - **Automation**: CI/CDでの使用に推奨
   - **Publish**: パッケージの公開のみ
6. **Generate Token** をクリック
7. トークンをコピー（一度しか表示されません！）

#### オプション B: Granular Access Token（より細かい制御）

1. **Generate New Token** → **Granular Access Token** をクリック
2. 以下の設定を行う:
   - **Expiration**: 有効期限を設定（推奨: 1年）
   - **Packages and scopes**:
     - **Organizations and scopes**: `@hidearea-design` を選択
     - **Permissions**: `Read and write` を選択
3. **Generate Token** をクリック

### 3. GitHub Secretsへの登録

1. GitHubリポジトリページを開く: https://github.com/hardlitchi/hidearea-design
2. **Settings** → **Secrets and variables** → **Actions** をクリック
3. **New repository secret** をクリック
4. 以下を入力:
   - **Name**: `NPM_TOKEN`
   - **Secret**: 生成したnpmトークンを貼り付け
5. **Add secret** をクリック

## トラブルシューティング

### エラー: "Access token expired or revoked"

**原因**: npmトークンが期限切れまたは無効

**解決方法**:
1. 新しいトークンを生成（上記手順を参照）
2. GitHub Secretsの`NPM_TOKEN`を更新:
   - Settings → Secrets and variables → Actions
   - `NPM_TOKEN`の横の **Update** をクリック
   - 新しいトークンを貼り付けて保存

### エラー: "404 Not found" または "not in this registry"

**原因**:
- スコープ付きパッケージの権限がない
- `publishConfig.access`が設定されていない

**解決方法**:

✅ **すでに修正済み**: すべてのパッケージに`publishConfig`を追加しました:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

### エラー: "You do not have permission to publish"

**原因**: npmアカウントが`@hidearea-design`スコープへのアクセス権を持っていない

**解決方法**:

#### 新しいスコープの場合（初回公開）:

スコープ付きパッケージは自動的に作成されますが、以下を確認:

1. npmにログイン: `npm login`
2. パッケージをローカルでテスト公開:
   ```bash
   cd packages/core
   npm publish --dry-run
   ```
3. 問題なければ実際に公開:
   ```bash
   npm publish --access public
   ```

#### 既存のスコープの場合:

npmのOrganizationオーナーに以下を依頼:
1. [npmjs.com](https://www.npmjs.com/)の Organization設定
2. **Members** → あなたのアカウントを追加
3. **Developer** または **Owner** 権限を付与

## ローカルでのテスト公開

実際に公開する前に、ドライランでテスト:

```bash
# すべてのパッケージをビルド
pnpm build

# ドライランでテスト（実際には公開されない）
pnpm --filter @hidearea-design/core publish --dry-run
pnpm --filter @hidearea-design/tokens publish --dry-run
pnpm --filter @hidearea-design/react publish --dry-run
pnpm --filter @hidearea-design/vue publish --dry-run
pnpm --filter @hidearea-design/mcp-server publish --dry-run
```

## CI/CDでの自動公開

### Releaseワークフローの仕組み

`.github/workflows/release.yml`が以下を自動的に実行:

1. **mainブランチへのプッシュ**をトリガーに実行
2. **changesets/action**が:
   - `.changeset/*.md`ファイルを検出
   - バージョンを更新してCHANGELOG.mdを生成
   - Pull Request `changeset-release/main`を作成
3. **PRをマージ**すると:
   - すべてのパッケージをnpmに公開
   - GitHub Releasesを作成

### 手動でのリリース手順

1. **changesetを作成**:
   ```bash
   pnpm changeset
   ```
   - パッケージを選択
   - 変更タイプを選択（patch/minor/major）
   - 変更内容を記述

2. **変更をコミット・プッシュ**:
   ```bash
   git add .changeset/*.md
   git commit -m "chore: add changeset"
   git push
   ```

3. **Releaseワークフローが実行**:
   - 自動的にPRが作成される
   - PRをレビュー・承認

4. **PRをマージ**:
   - マージすると自動的にnpmに公開される

## パッケージの確認

公開後、以下で確認:

- [@hidearea-design/core](https://www.npmjs.com/package/@hidearea-design/core)
- [@hidearea-design/tokens](https://www.npmjs.com/package/@hidearea-design/tokens)
- [@hidearea-design/react](https://www.npmjs.com/package/@hidearea-design/react)
- [@hidearea-design/vue](https://www.npmjs.com/package/@hidearea-design/vue)
- [@hidearea-design/mcp-server](https://www.npmjs.com/package/@hidearea-design/mcp-server)

## セキュリティのベストプラクティス

1. **トークンの管理**:
   - トークンをコードにコミットしない
   - 定期的にトークンをローテーション（推奨: 6ヶ月ごと）
   - 不要になったトークンは削除

2. **2FA（二要素認証）の有効化**:
   - npmアカウントで2FAを有効化すること
   - Settings → Two-Factor Authentication

3. **最小権限の原則**:
   - CIには`Automation`トークンを使用
   - 個人使用には`Publish`トークンを使用
   - `@hidearea-design`スコープのみに限定

## 関連リソース

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
