#!/bin/bash

# フェーズ1: レガシー変数名の一括置換スクリプト
# 既存トークンが存在する変数のみを置換

set -e

CSS_DIR="src/css"
BACKUP_DIR="src/css.backup.$(date +%Y%m%d_%H%M%S)"

echo "🔧 レガシーCSS変数の一括置換を開始..."
echo ""

# バックアップ作成
echo "📦 バックアップ作成中: $BACKUP_DIR"
cp -r "$CSS_DIR" "$BACKUP_DIR"
echo "✓ バックアップ完了"
echo ""

# 置換実行
echo "🔄 変数名を置換中..."
echo ""

# Border radius
echo "  • --radius-* → --border-radius-*"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--radius-sm)/var(--border-radius-sm)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--radius-base)/var(--border-radius-base)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--radius-md)/var(--border-radius-md)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--radius-lg)/var(--border-radius-lg)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--radius-full)/var(--border-radius-full)/g' {} \;

# Animation duration
echo "  • --duration-* → --animation-duration-*"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--duration-fast)/var(--animation-duration-fast)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--duration-base)/var(--animation-duration-base)/g' {} \;

# Animation easing
echo "  • --ease* → --animation-easing-*"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--ease-out)/var(--animation-easing-ease-out)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--ease-in)/var(--animation-easing-ease-in)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--ease)/var(--animation-easing-ease)/g' {} \;

# Font
echo "  • --font-weight-regular → --font-weight-normal"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--font-weight-regular)/var(--font-weight-normal)/g' {} \;
echo "  • --font-family-base → --font-family-sans"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--font-family-base)/var(--font-family-sans)/g' {} \;

# Colors - foreground
echo "  • --color-text-* → --foreground-*"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--color-text-primary)/var(--foreground-primary)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--color-text-secondary)/var(--foreground-secondary)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--color-text-disabled)/var(--foreground-tertiary)/g' {} \;

# Colors - background
echo "  • --color-background → --background-primary"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--color-background)/var(--background-primary)/g' {} \;
echo "  • --background-disabled → --background-secondary"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--background-disabled)/var(--background-secondary)/g' {} \;

# Colors - error/danger
echo "  • --color-error → --error-default"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--color-error)/var(--error-default)/g' {} \;
echo "  • --color-danger-600 → --error-default"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--color-danger-600)/var(--error-default)/g' {} \;
echo "  • --color-danger-700 → --error-default"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--color-danger-700)/var(--error-default)/g' {} \;
echo "  • --color-danger-200 → --error-subtle"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--color-danger-200)/var(--error-subtle)/g' {} \;

# Colors - muted
echo "  • --*-muted → --*-subtle"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--info-muted)/var(--info-subtle)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--success-muted)/var(--success-subtle)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--warning-muted)/var(--warning-subtle)/g' {} \;
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--error-muted)/var(--error-subtle)/g' {} \;

# Border
echo "  • --border-hover → --border-default (注: hover状態は要確認)"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--border-hover)/var(--border-default)/g' {} \;

# Foreground disabled
echo "  • --foreground-disabled → --foreground-tertiary"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/var(--foreground-disabled)/var(--foreground-tertiary)/g' {} \;

echo ""
echo "✅ 置換完了！"
echo ""
echo "📊 統計情報:"
echo "  • 処理ファイル数: $(find "$CSS_DIR" -name "*.css" -type f | wc -l)"
echo "  • バックアップ: $BACKUP_DIR"
echo ""
echo "⚠️  注意: 以下の変数は未定義のため、別途対応が必要です:"
echo "  • --touch-target-minimum"
echo "  • --touch-target-comfortable"
echo "  • --touch-target-large"
echo "  • --line-height-normal"
echo "  • コンポーネント固有の変数（toast, modal, date-picker等）"
echo ""
