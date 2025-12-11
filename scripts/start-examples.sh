#!/bin/bash

# hidearea-design examples server starter
# このスクリプトは3つのサンプルページを別々のポートで起動します

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
EXAMPLE_DIR="$PROJECT_ROOT/example"

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

# nvmの読み込み（systemdから実行される場合に必要）
load_nvm() {
    export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        \. "$NVM_DIR/nvm.sh"
        # LTSバージョンを使用
        nvm use --lts &>/dev/null || nvm use default &>/dev/null || true
    fi
}

# nvmを読み込む
load_nvm

# ビルドされたパッケージがあるか確認
check_build() {
    info "Checking if packages are built..."

    if [ ! -d "$PROJECT_ROOT/packages/core/dist" ]; then
        error "Core package not built. Running build..."
        cd "$PROJECT_ROOT"
        pnpm build
    fi

    if [ ! -d "$PROJECT_ROOT/packages/tokens/build" ]; then
        error "Tokens package not built. Running build..."
        cd "$PROJECT_ROOT"
        pnpm build
    fi

    success "Packages are ready"
}

# 依存関係のインストール
install_deps() {
    info "Installing dependencies..."
    cd "$PROJECT_ROOT"
    pnpm install
    success "Dependencies installed"
}

# サンプルを起動
start_examples() {
    info "Starting example servers..."

    cd "$PROJECT_ROOT"

    # バックグラウンドで各サンプルを起動
    info "Starting Component Showcase on port 5173..."
    cd "$EXAMPLE_DIR/component-showcase"
    pnpm dev > /tmp/hidearea-showcase.log 2>&1 &
    SHOWCASE_PID=$!

    info "Starting Login Form on port 5174..."
    cd "$EXAMPLE_DIR/login-form"
    pnpm dev > /tmp/hidearea-login.log 2>&1 &
    LOGIN_PID=$!

    info "Starting Dashboard on port 5175..."
    cd "$EXAMPLE_DIR/dashboard"
    pnpm dev > /tmp/hidearea-dashboard.log 2>&1 &
    DASHBOARD_PID=$!

    # PIDを保存
    echo "$SHOWCASE_PID" > /tmp/hidearea-showcase.pid
    echo "$LOGIN_PID" > /tmp/hidearea-login.pid
    echo "$DASHBOARD_PID" > /tmp/hidearea-dashboard.pid

    sleep 3

    success "All examples started!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  📦 hidearea-design Examples Running"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "  🎨 Component Showcase:  http://localhost:5173"
    echo "  🔐 Login Form:          http://localhost:5174"
    echo "  📊 Dashboard:           http://localhost:5175"
    echo ""
    echo "  Logs:"
    echo "    - Showcase: /tmp/hidearea-showcase.log"
    echo "    - Login:    /tmp/hidearea-login.log"
    echo "    - Dashboard: /tmp/hidearea-dashboard.log"
    echo ""
    echo "  To stop: ./scripts/stop-examples.sh"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# メイン処理
main() {
    info "Starting hidearea-design examples..."
    check_build
    install_deps
    start_examples
}

main "$@"
