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

# pnpmのパスを検出
info "Detecting pnpm installation..."
PNPM_PATH=""

# 1. nvmの場合
if [ -d "$ACTUAL_HOME/.nvm" ]; then
    # Node.jsのバージョンを検出
    NODE_VERSION=$(ls -t "$ACTUAL_HOME/.nvm/versions/node/" | head -1)
    if [ -n "$NODE_VERSION" ] && [ -f "$ACTUAL_HOME/.nvm/versions/node/$NODE_VERSION/bin/pnpm" ]; then
        PNPM_PATH="$ACTUAL_HOME/.nvm/versions/node/$NODE_VERSION/bin"
        info "Found pnpm in nvm: $PNPM_PATH"
    fi
fi

# 2. システムインストールの場合
if [ -z "$PNPM_PATH" ] && command -v pnpm &> /dev/null; then
    PNPM_PATH=$(dirname $(which pnpm))
    info "Found pnpm in system: $PNPM_PATH"
fi

# pnpmが見つからない場合
if [ -z "$PNPM_PATH" ]; then
    error "pnpm not found. Please install pnpm first:"
    echo "  npm install -g pnpm"
    echo "  or"
    echo "  curl -fsSL https://get.pnpm.io/install.sh | sh -"
    exit 1
fi

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
Environment="PATH=$PNPM_PATH:/usr/local/bin:/usr/bin:/bin"
Environment="HOME=$ACTUAL_HOME"

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
