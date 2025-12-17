# リリースプロセス

このドキュメントでは、hidearea-designの正式なリリースプロセスについて説明します。

## リリースの種類

### パッチリリース (0.0.x)

**対象:**
- バグ修正
- ドキュメントの更新
- パフォーマンス改善（破壊的変更なし）
- 内部リファクタリング

**頻度:** 必要に応じて随時

**例:** v0.1.0 → v0.1.1

### マイナーリリース (0.x.0)

**対象:**
- 新機能の追加
- 新しいコンポーネント
- 既存機能の拡張（後方互換性あり）

**頻度:** 2-4週間ごと

**例:** v0.1.0 → v0.2.0

### メジャーリリース (x.0.0)

**対象:**
- 破壊的変更
- APIの大幅な変更
- アーキテクチャの変更

**頻度:** 必要に応じて（慎重に計画）

**例:** v0.9.0 → v1.0.0

## リリースチェックリスト

### 事前準備 (1-2週間前)

#### 1. イシューとPRの整理

- [ ] マイルストーン対象のissueをすべて確認
- [ ] すべてのPRがマージ済みであることを確認
- [ ] クローズされるissueにリリースバージョンをラベル付け

#### 2. ドキュメント review

- [ ] 新機能のドキュメントが追加されているか
- [ ] 既存ドキュメントが最新か
- [ ] マイグレーションガイド（破壊的変更がある場合）
- [ ] CHANGELOGの下書きを確認

#### 3. テストとQA

- [ ] すべてのユニットテストが通過
- [ ] E2Eテストが通過
- [ ] ビジュアルリグレッションテスト
- [ ] 主要ブラウザでの動作確認
  - [ ] Chrome/Edge (最新版)
  - [ ] Firefox (最新版)
  - [ ] Safari (最新版)
- [ ] アクセシビリティテスト
  - [ ] スクリーンリーダー（NVDA/VoiceOver）
  - [ ] キーボードナビゲーション
  - [ ] axe DevTools

### リリース週

#### 1. コードフリーズ (リリース3日前)

```bash
# リリースブランチの作成
git checkout -b release/v0.2.0 main
```

- [ ] 新機能のマージを停止
- [ ] バグ修正とドキュメント更新のみ許可
- [ ] リリースブランチをプッシュ

#### 2. ベータリリース (リリース2日前)

```bash
# ベータバージョンの公開
pnpm changeset version --snapshot beta
pnpm build
pnpm changeset publish --tag beta
```

- [ ] ベータバージョンをnpmに公開
- [ ] チームメンバーによる最終確認
- [ ] 重大なバグがあれば修正

#### 3. Release Candidate (リリース1日前)

```bash
# RCバージョンの公開
pnpm changeset version --snapshot rc
pnpm build
pnpm changeset publish --tag rc
```

- [ ] RCバージョンをテスト環境にデプロイ
- [ ] 最終的な動作確認
- [ ] リリースノートの最終確認

### リリース当日

#### 1. 最終チェック

```bash
# すべてのテストを実行
pnpm test

# すべてのパッケージをビルド
pnpm build

# リンターチェック
pnpm lint

# 型チェック
pnpm typecheck
```

- [ ] CIがすべてグリーン
- [ ] ビルド成果物の確認
- [ ] ドキュメントサイトのビルド確認

#### 2. バージョン更新

```bash
# changesetからバージョンを生成
pnpm changeset version

# 変更を確認
git diff

# コミット
git add .
git commit -m "chore: version packages for v0.2.0"
git push origin release/v0.2.0
```

- [ ] package.jsonのバージョンが正しい
- [ ] CHANGELOGが生成されている
- [ ] 依存関係のバージョンが更新されている

#### 3. mainブランチへのマージ

```bash
# PRを作成
gh pr create --base main --head release/v0.2.0 \
  --title "Release v0.2.0" \
  --body "Release v0.2.0

## Changes
See CHANGELOG.md for details

## Checklist
- [x] All tests passing
- [x] Documentation updated
- [x] CHANGELOG updated
- [x] Version bumped
"

# PRをマージ（レビュー後）
gh pr merge --merge
```

- [ ] PRを作成
- [ ] 最終レビュー
- [ ] mainにマージ

#### 4. npmへの公開

```bash
# mainブランチに切り替え
git checkout main
git pull

# タグを作成
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin v0.2.0

# npmに公開
pnpm changeset publish
```

- [ ] npmに公開成功
- [ ] パッケージが正しくインストールできることを確認

```bash
# 新規プロジェクトでテスト
mkdir test-install && cd test-install
npm init -y
npm install @hidearea-design/core@latest
```

#### 5. GitHubリリースの作成

GitHub UIで：

1. [Releases](https://github.com/hardlitchi/hidearea-design/releases) → "Draft a new release"
2. タグ: `v0.2.0`
3. タイトル: `v0.2.0 - [リリース名]`
4. 説明:

```markdown
## 🎉 What's New

### ✨ Features
- 新機能1の説明
- 新機能2の説明

### 🐛 Bug Fixes
- バグ修正1
- バグ修正2

### 📚 Documentation
- ドキュメント更新の内容

### 🔧 Internal
- 内部的な改善

## 📦 Installation

\`\`\`bash
npm install @hidearea-design/core@0.2.0
\`\`\`

## 📖 Full Changelog

See [CHANGELOG.md](CHANGELOG.md) for details.

**Full Changelog**: https://github.com/hardlitchi/hidearea-design/compare/v0.1.0...v0.2.0
```

- [ ] リリースノートを公開
- [ ] "Set as the latest release" をチェック

### リリース後

#### 1. アナウンス

- [ ] GitHubディスカッションに投稿
- [ ] Twitter/X でアナウンス
- [ ] ドキュメントサイトに反映されているか確認

#### 2. モニタリング

リリース後24-48時間：

- [ ] npmダウンロード数を確認
- [ ] GitHubのissueを監視（バグレポート）
- [ ] ドキュメントサイトのエラーログ確認

#### 3. 次のマイルストーンの準備

- [ ] 次のバージョンのマイルストーンを作成
- [ ] リリース後のissueを整理
- [ ] 改善点をドキュメント化

## 緊急リリース（ホットフィックス）

重大なバグや セキュリティ問題が見つかった場合：

### 1. ホットフィックスブランチの作成

```bash
# 最新のリリースタグからブランチを作成
git checkout -b hotfix/v0.2.1 v0.2.0
```

### 2. 修正とテスト

```bash
# 修正を実装
git commit -m "fix: critical bug in component X"

# テスト
pnpm test
```

### 3. 緊急リリース

```bash
# バージョンを上げる（パッチ）
pnpm changeset
pnpm changeset version

# mainとリリースタグにマージ
git checkout main
git merge hotfix/v0.2.1
git tag -a v0.2.1 -m "Hotfix v0.2.1"
git push origin main v0.2.1

# 公開
pnpm changeset publish
```

### 4. アナウンス

- [ ] GitHubリリースを作成（"Critical Fix"ラベル）
- [ ] 緊急度が高い場合は即座にアナウンス

## バージョン戦略

### v0.x.x（プレ1.0）

- マイナーバージョンで破壊的変更を含めることができる
- ユーザーには変更内容を明確に伝える
- マイグレーションガイドを提供

### v1.0.0以降

- Semantic Versioningを厳密に遵守
- 破壊的変更はメジャーバージョンでのみ
- 非推奨(deprecated)機能は1バージョン前にアナウンス

## ロールバック手順

リリース後に重大な問題が見つかった場合：

### 1. npmからのアンパブリッシュ（72時間以内のみ）

```bash
npm unpublish @hidearea-design/core@0.2.0
```

**注意:** これは最終手段。通常はホットフィックスリリースを推奨。

### 2. GitHubリリースの削除

1. リリースページで該当バージョンを削除
2. タグも削除

```bash
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0
```

### 3. ホットフィックスリリース

可能であれば、問題を修正した新しいバージョンをリリース。

## 関連リンク

- [CHANGELOG](../../CHANGELOG.md)
- [パッケージ公開ガイド](./publishing.md)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
