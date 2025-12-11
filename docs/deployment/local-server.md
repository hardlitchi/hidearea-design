# ローカルサーバーでのデプロイ

hidearea-design examplesをローカルサーバーで公開する方法を説明します。

## 📋 概要

以下の3つのサンプルページが別々のポートで起動します：

- **Component Showcase**: `http://localhost:5173`
- **Login Form**: `http://localhost:5174`
- **Dashboard**: `http://localhost:5175`

## 🚀 クイックスタート

### 方法1: 手動起動（開発時）

```bash
# プロジェクトルートで
./scripts/start-examples.sh

# 停止する場合
./scripts/stop-examples.sh
```

### 方法2: systemd サービス（本番環境推奨）

```bash
# サービスをインストール（初回のみ）
sudo ./scripts/install-systemd-service.sh

# サービスを起動
sudo systemctl start hidearea-examples

# サービスを停止
sudo systemctl stop hidearea-examples

# サービスの状態確認
sudo systemctl status hidearea-examples

# ログを確認
sudo journalctl -u hidearea-examples -f
```

**メリット:**
- サーバー起動時に自動起動
- クラッシュ時の自動再起動
- ログの一元管理

## 📁 ファイル構成

```
design/
├── scripts/
│   ├── start-examples.sh              # サンプル起動スクリプト
│   ├── stop-examples.sh               # サンプル停止スクリプト
│   ├── hidearea-examples.service      # systemd サービス定義
│   └── install-systemd-service.sh     # サービスインストーラー
└── example/
    ├── component-showcase/
    │   ├── package.json               # ポート 5173
    │   ├── index.html
    │   └── main.js
    ├── login-form/
    │   ├── package.json               # ポート 5174
    │   ├── index.html
    │   └── main.js
    └── dashboard/
        ├── package.json               # ポート 5175
        ├── index.html
        └── main.js
```

## 🔧 詳細設定

### ポート番号の変更

各サンプルの `package.json` を編集：

```json
{
  "scripts": {
    "dev": "vite --port <新しいポート番号> --host 0.0.0.0"
  }
}
```

### 外部からのアクセスを許可

デフォルトで `--host 0.0.0.0` が設定されているため、同じネットワーク内の他のデバイスからアクセス可能です。

サーバーのIPアドレスが `192.168.1.100` の場合：
- Component Showcase: `http://192.168.1.100:5173`
- Login Form: `http://192.168.1.100:5174`
- Dashboard: `http://192.168.1.100:5175`

### ファイアウォールの設定

必要に応じてポートを開放：

```bash
# ufw の場合
sudo ufw allow 5173/tcp
sudo ufw allow 5174/tcp
sudo ufw allow 5175/tcp

# firewalld の場合
sudo firewall-cmd --permanent --add-port=5173/tcp
sudo firewall-cmd --permanent --add-port=5174/tcp
sudo firewall-cmd --permanent --add-port=5175/tcp
sudo firewall-cmd --reload
```

## 🛠️ トラブルシューティング

### ポートが既に使用されている

```bash
# ポートを使用しているプロセスを確認
sudo lsof -i :5173
sudo lsof -i :5174
sudo lsof -i :5175

# プロセスを終了
kill -9 <PID>
```

### パッケージがビルドされていない

```bash
# プロジェクトルートで
pnpm build
```

### 依存関係のエラー

```bash
# 依存関係を再インストール
pnpm install

# キャッシュをクリア
rm -rf node_modules
rm -rf example/*/node_modules
pnpm install
```

### systemd サービスが起動しない

```bash
# ログを確認
sudo journalctl -u hidearea-examples -n 50 --no-pager

# サービス設定をリロード
sudo systemctl daemon-reload
sudo systemctl restart hidearea-examples
```

## 📊 ログの場所

### 手動起動の場合

- Component Showcase: `/tmp/hidearea-showcase.log`
- Login Form: `/tmp/hidearea-login.log`
- Dashboard: `/tmp/hidearea-dashboard.log`

```bash
# ログをリアルタイムで確認
tail -f /tmp/hidearea-showcase.log
```

### systemd サービスの場合

```bash
# すべてのログ
sudo journalctl -u hidearea-examples

# リアルタイムでログを確認
sudo journalctl -u hidearea-examples -f

# 最新50件
sudo journalctl -u hidearea-examples -n 50
```

## 🔒 セキュリティ考慮事項

### ローカルネットワークのみで公開する場合

特別な設定は不要です。デフォルトで HTTP のみで動作します。

### インターネットに公開する場合

**推奨しません**が、必要な場合は以下を検討してください：

1. **リバースプロキシの使用（Nginx/Caddy）**
   - HTTPS対応
   - 認証の追加
   - レート制限

2. **VPNの使用**
   - WireGuard/OpenVPN経由でアクセス

## 🎯 本番環境での使用

### systemd サービスの自動起動

```bash
# サービスを有効化（起動時に自動起動）
sudo systemctl enable hidearea-examples

# サービスを無効化
sudo systemctl disable hidearea-examples
```

### モニタリング

```bash
# サービスの状態を定期的にチェック
watch -n 5 'systemctl status hidearea-examples'
```

### 自動再起動の設定

サービスファイル（`hidearea-examples.service`）に以下が設定済み：

```ini
Restart=on-failure
RestartSec=10
```

クラッシュ時は10秒後に自動的に再起動します。

## 📚 関連ドキュメント

- [Examples README](../../example/README.md)
- [使い方ガイド](../getting-started/usage-guide.md)
- [インストールガイド](../getting-started/installation.md)

## 💡 ヒント

### 開発時の推奨ワークフロー

1. **開発中**: 手動起動スクリプトを使用
   ```bash
   ./scripts/start-examples.sh
   ```

2. **テスト/本番**: systemd サービスを使用
   ```bash
   sudo systemctl start hidearea-examples
   ```

### パフォーマンスの最適化

本番環境では、ビルド済みファイルを配信することを推奨：

```bash
# 各サンプルをビルド
cd example/component-showcase && pnpm build
cd example/login-form && pnpm build
cd example/dashboard && pnpm build

# previewモードで起動（ビルド済みファイルを配信）
pnpm preview
```

この場合、より軽量で高速に動作します。
