#!/bin/bash

# systemd service installer for hidearea-design examples

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_TEMPLATE="$SCRIPT_DIR/hidearea-examples.service"
SERVICE_FILE="/etc/systemd/system/hidearea-examples.service"

# 色付きログ
info() {
    echo -e "\033[0;36m[INFO]\033[0m $1"
}

success() {
    echo -e "\033[0;32m[SUCCESS]\033[0m $1"
}

error() {
    echo -e "\033[0;31m[ERROR]\033[0m $1"
}

warning() {
    echo -e "\033[0;33m[WARNING]\033[0m $1"
}

# root権限チェック
if [ "$EUID" -ne 0 ]; then
    error "This script must be run as root (use sudo)"
    exit 1
fi

# ユーザー名の取得（sudoで実行された場合は元のユーザー）
ACTUAL_USER="${SUDO_USER:-$USER}"
ACTUAL_HOME=$(eval echo ~$ACTUAL_USER)

info "Detected user: $ACTUAL_USER"
info "Home directory: $ACTUAL_HOME"

# nvmとNode.jsのセットアップ
info "Setting up nvm and Node.js..."
NVM_DIR="$ACTUAL_HOME/.nvm"

if [ ! -d "$NVM_DIR" ]; then
    error "nvm not found at $NVM_DIR"
    echo "Please install nvm first:"
    echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    exit 1
fi

# nvmスクリプトを読み込み
info "Loading nvm..."
export NVM_DIR="$NVM_DIR"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Node.js LTSをインストール/使用
info "Setting up Node.js LTS..."

# 現在のLTSバージョンを取得して使用
if ! nvm use --lts 2>/dev/null; then
    warning "Node.js LTS not found, installing..."
    nvm install --lts
    nvm use --lts
fi

NODE_VERSION=$(nvm version)
info "Using Node.js version: $NODE_VERSION"

# pnpmの確認とインストール
info "Checking pnpm installation..."
if ! command -v pnpm &> /dev/null; then
    warning "pnpm not found, installing..."
    npm install -g pnpm
fi

# pnpmのパスを取得
PNPM_PATH=$(dirname $(which pnpm))
NODE_PATH=$(dirname $(which node))

if [ -z "$PNPM_PATH" ] || [ -z "$NODE_PATH" ]; then
    error "Failed to detect pnpm or node path"
    exit 1
fi

success "Found Node.js at: $NODE_PATH"
success "Found pnpm at: $PNPM_PATH"

# サービスファイルを生成（PATHを動的に設定）
info "Generating service file..."
cat > "$SERVICE_FILE" <<EOF
[Unit]
Description=hidearea-design Examples Server
After=network.target

[Service]
Type=forking
User=$ACTUAL_USER
WorkingDirectory=$ACTUAL_HOME/workspaces/design
ExecStart=$ACTUAL_HOME/workspaces/design/scripts/start-examples.sh
ExecStop=$ACTUAL_HOME/workspaces/design/scripts/stop-examples.sh
Restart=on-failure
RestartSec=10

# Environment
Environment="NODE_ENV=production"
Environment="PATH=$NODE_PATH:/usr/local/bin:/usr/bin:/bin"
Environment="HOME=$ACTUAL_HOME"
Environment="NVM_DIR=$NVM_DIR"

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=hidearea-examples

[Install]
WantedBy=multi-user.target
EOF

success "Service file generated at $SERVICE_FILE"

# systemdをリロード
info "Reloading systemd..."
systemctl daemon-reload

# サービスを有効化
info "Enabling service..."
systemctl enable hidearea-examples.service

success "Service installed successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📦 hidearea-design Examples Service"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Usage:"
echo "    Start:   sudo systemctl start hidearea-examples"
echo "    Stop:    sudo systemctl stop hidearea-examples"
echo "    Status:  sudo systemctl status hidearea-examples"
echo "    Logs:    sudo journalctl -u hidearea-examples -f"
echo ""
echo "  The service will start automatically on boot."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
