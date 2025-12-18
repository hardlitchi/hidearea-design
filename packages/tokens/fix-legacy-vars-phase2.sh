#!/bin/bash

# フェーズ1.5: フォールバック値付き変数の置換
# var(--old-name, fallback) → var(--new-name, fallback)

set -e

CSS_DIR="src/css"

echo "🔧 フォールバック値付きレガシー変数の置換を開始..."
echo ""

# Duration with fallback
echo "  • --duration-fast, → --animation-duration-fast,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--duration-fast,/--animation-duration-fast,/g' {} \;

echo "  • --duration-base, → --animation-duration-base,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--duration-base,/--animation-duration-base,/g' {} \;

# Radius with fallback
echo "  • --radius-sm, → --border-radius-sm,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--radius-sm,/--border-radius-sm,/g' {} \;

echo "  • --radius-base, → --border-radius-base,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--radius-base,/--border-radius-base,/g' {} \;

echo "  • --radius-md, → --border-radius-md,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--radius-md,/--border-radius-md,/g' {} \;

echo "  • --radius-lg, → --border-radius-lg,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--radius-lg,/--border-radius-lg,/g' {} \;

echo "  • --radius-full, → --border-radius-full,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--radius-full,/--border-radius-full,/g' {} \;

# Font with fallback
echo "  • --font-weight-regular, → --font-weight-normal,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--font-weight-regular,/--font-weight-normal,/g' {} \;

echo "  • --font-family-base, → --font-family-sans,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--font-family-base,/--font-family-sans,/g' {} \;

# Colors with fallback
echo "  • --color-text-primary, → --foreground-primary,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--color-text-primary,/--foreground-primary,/g' {} \;

echo "  • --color-text-secondary, → --foreground-secondary,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--color-text-secondary,/--foreground-secondary,/g' {} \;

echo "  • --color-text-disabled, → --foreground-tertiary,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--color-text-disabled,/--foreground-tertiary,/g' {} \;

echo "  • --color-background, → --background-primary,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--color-background,/--background-primary,/g' {} \;

echo "  • --color-danger-600, → --error-default,"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--color-danger-600,/--error-default,/g' {} \;

echo ""
echo "✅ フォールバック値付き変数の置換完了！"
echo ""
