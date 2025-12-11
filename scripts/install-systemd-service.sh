#!/bin/bash

# systemd service installer for hidearea-design examples

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_FILE="$SCRIPT_DIR/hidearea-examples.service"
SYSTEMD_DIR="/etc/systemd/system"

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

# root権限チェック
if [ "$EUID" -ne 0 ]; then
    error "This script must be run as root (use sudo)"
    exit 1
fi

# サービスファイルをコピー
info "Installing systemd service..."
cp "$SERVICE_FILE" "$SYSTEMD_DIR/hidearea-examples.service"

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
