#!/bin/bash

# hidearea-design examples server stopper

set -e

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

# プロセスを停止
stop_process() {
    local pid_file=$1
    local name=$2

    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p "$pid" > /dev/null 2>&1; then
            info "Stopping $name (PID: $pid)..."
            kill "$pid"
            rm "$pid_file"
            success "$name stopped"
        else
            info "$name is not running"
            rm "$pid_file"
        fi
    else
        info "$name PID file not found (may not be running)"
    fi
}

# メイン処理
main() {
    info "Stopping hidearea-design examples..."

    stop_process "/tmp/hidearea-showcase.pid" "Component Showcase"
    stop_process "/tmp/hidearea-login.pid" "Login Form"
    stop_process "/tmp/hidearea-dashboard.pid" "Dashboard"

    # Viteプロセスが残っている場合は強制終了
    info "Checking for remaining Vite processes..."
    pkill -f "vite.*--port 517" || true

    success "All examples stopped"
}

main "$@"
