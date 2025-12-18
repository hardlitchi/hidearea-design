#!/bin/bash

# Toast コンポーネントの変数を修正

set -e

TOAST_CSS="src/css/components/feedback/toast.css"
TOAST_CONTAINER_CSS="src/css/components/feedback/toast-container.css"

echo "🔧 Toast コンポーネントの変数を修正中..."
echo ""

# Toast.css の変数を置換
echo "  • toast.css を更新中..."

# padding は vertical/horizontal に分かれているため、計算値を使用
# --toast-padding → padding-top/bottom: var(--component-toast-padding-vertical), padding-left: var(--component-toast-padding-horizontal)

# 基本スタイル
sed -i 's/var(--toast-bg,/var(--background-primary,/g' "$TOAST_CSS"
sed -i 's/var(--toast-border-radius,/var(--component-toast-border-radius-default,/g' "$TOAST_CSS"
sed -i 's/var(--toast-shadow,/var(--component-toast-shadow-default,/g' "$TOAST_CSS"
sed -i 's/var(--toast-border-color,/var(--border-default,/g' "$TOAST_CSS"
sed -i 's/var(--toast-min-width,/var(--component-toast-min-width,/g' "$TOAST_CSS"
sed -i 's/var(--toast-max-width,/var(--component-toast-max-width,/g' "$TOAST_CSS"

# テキスト
sed -i 's/var(--toast-message-color,/var(--foreground-primary,/g' "$TOAST_CSS"
sed -i 's/var(--toast-font-size,/var(--component-toast-font-size,/g' "$TOAST_CSS"

# 閉じるボタン
sed -i 's/var(--toast-close-color,/var(--component-toast-close-button-color-default,/g' "$TOAST_CSS"
sed -i 's/var(--toast-close-hover-bg,/var(--background-secondary,/g' "$TOAST_CSS"

# プログレスバー
sed -i 's/var(--toast-progress-bg,/var(--background-secondary,/g' "$TOAST_CSS"
sed -i 's/var(--toast-progress-color,/var(--primary-default,/g' "$TOAST_CSS"

# toast-container.css の変数を置換
if [ -f "$TOAST_CONTAINER_CSS" ]; then
  echo "  • toast-container.css を更新中..."
  sed -i 's/var(--toast-container-z-index,/var(--z-index-toast, 9999,/g' "$TOAST_CONTAINER_CSS"
  sed -i 's/var(--toast-gap,/var(--component-toast-gap,/g' "$TOAST_CONTAINER_CSS"
  sed -i 's/var(--toast-container-padding,/var(--component-toast-position-offset, 1rem,/g' "$TOAST_CONTAINER_CSS"
fi

echo ""
echo "✅ Toast コンポーネントの変数修正完了！"
echo ""
