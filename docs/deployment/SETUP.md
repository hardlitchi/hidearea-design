# セットアップガイド - hidearea-design Examples

systemdサービスとして hidearea-design examples をセットアップする手順です。

## 📋 前提条件

以下がインストールされている必要があります：

- Node.js v22.21.0以上
- pnpm 10.22.0以上
- Git

## 🚀 セットアップ手順

### ステップ1: パッケージのビルド

```bash
cd /home/neko/workspaces/design

# 依存関係をインストール
pnpm install

# すべてのパッケージをビルド
pnpm build
```

### ステップ2: サービスのインストール

```bash
# インストールスクリプトを実行（自動的にpnpmのパスを検出）
sudo ./scripts/install-systemd-service.sh
```

このスクリプトは以下を実行します：
- ユーザーとホームディレクトリの自動検出
- pnpmのインストールパスの自動検出（nvm または system）
- systemdサービスファイルの自動生成
- サービスの有効化

### ステップ3: サービスの起動

```bash
# サービスを起動
sudo systemctl start hidearea-examples

# 状態を確認
sudo systemctl status hidearea-examples
```

## ✅ 動作確認

サービスが正常に起動したら、以下のURLにアクセスできます：

- Component Showcase: http://localhost:5173
- Login Form: http://localhost:5174
- Dashboard: http://localhost:5175

## 🔧 トラブルシューティング

### エラー: pnpm: コマンドが見つかりません

**原因:** systemdサービスがpnpmのPATHを認識していない

**解決方法:**

```bash
# 1. pnpmがインストールされているか確認
which pnpm

# 2. サービスを再インストール（パスを自動検出）
sudo ./scripts/install-systemd-service.sh

# 3. サービスを再起動
sudo systemctl daemon-reload
sudo systemctl restart hidearea-examples
```

### エラー: パッケージがビルドされていない

**原因:** packages/core または packages/tokens がビルドされていない

**解決方法:**

```bash
cd /home/neko/workspaces/design
pnpm build
sudo systemctl restart hidearea-examples
```

### ログの確認方法

```bash
# リアルタイムでログを確認
sudo journalctl -u hidearea-examples -f

# 最新50件のログ
sudo journalctl -u hidearea-examples -n 50

# エラーのみ表示
sudo journalctl -u hidearea-examples -p err
```

### サービスが自動再起動を繰り返す場合

```bash
# サービスを停止
sudo systemctl stop hidearea-examples

# ログで原因を確認
sudo journalctl -u hidearea-examples -n 100 --no-pager

# 手動で起動スクリプトをテスト
./scripts/start-examples.sh

# エラーを修正後、サービスを再起動
sudo systemctl start hidearea-examples
```

## 📝 サービス管理コマンド

```bash
# 起動
sudo systemctl start hidearea-examples

# 停止
sudo systemctl stop hidearea-examples

# 再起動
sudo systemctl restart hidearea-examples

# 状態確認
sudo systemctl status hidearea-examples

# 自動起動を有効化（既に有効）
sudo systemctl enable hidearea-examples

# 自動起動を無効化
sudo systemctl disable hidearea-examples

# ログ確認
sudo journalctl -u hidearea-examples -f
```

## 🔄 サービスの更新

コードを更新した場合：

```bash
cd /home/neko/workspaces/design

# 最新のコードを取得
git pull

# パッケージを再ビルド
pnpm build

# サービスを再起動
sudo systemctl restart hidearea-examples
```

## 🗑️ サービスのアンインストール

```bash
# サービスを停止して無効化
sudo systemctl stop hidearea-examples
sudo systemctl disable hidearea-examples

# サービスファイルを削除
sudo rm /etc/systemd/system/hidearea-examples.service

# systemdをリロード
sudo systemctl daemon-reload
```

## 🌐 外部アクセスの設定

デフォルトで `--host 0.0.0.0` が設定されているため、同じネットワーク内の他のデバイスからアクセス可能です。

### ファイアウォールの設定（必要な場合）

#### ufw の場合

```bash
sudo ufw allow 5173/tcp
sudo ufw allow 5174/tcp
sudo ufw allow 5175/tcp
```

#### firewalld の場合

```bash
sudo firewall-cmd --permanent --add-port=5173/tcp
sudo firewall-cmd --permanent --add-port=5174/tcp
sudo firewall-cmd --permanent --add-port=5175/tcp
sudo firewall-cmd --reload
```

## 💡 ヒント

### 起動時の自動起動

インストールスクリプトを実行すると、自動的に有効化されます。サーバー再起動時に自動的にサンプルページが起動します。

### パフォーマンスモニタリング

```bash
# CPU/メモリ使用量を確認
systemctl status hidearea-examples

# 詳細なリソース使用状況
systemd-cgtop
```

### ポート番号の変更

各サンプルのポート番号を変更する場合：

1. `example/*/package.json` の `--port` を変更
2. `pnpm install` を実行
3. サービスを再起動

## 📚 関連ドキュメント

- [ローカルサーバーデプロイガイド](./local-server.md)
- [Examples README](../../example/README.md)
- [使い方ガイド](../getting-started/usage-guide.md)
