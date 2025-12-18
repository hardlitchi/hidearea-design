#!/bin/bash
set -e

CSS_FILE="src/css/components/navigation/pagination.css"

echo "🔧 Pagination変数を修正中..."

sed -i 's/--pagination-gap,/--component-pagination-gap,/g' "$CSS_FILE"
sed -i 's/--pagination-button-size,/--component-pagination-button-size,/g' "$CSS_FILE"
sed -i 's/--pagination-button-bg,/--component-pagination-button-background,/g' "$CSS_FILE"
sed -i 's/--pagination-button-border,/--component-pagination-button-border,/g' "$CSS_FILE"
sed -i 's/--pagination-button-radius,/--component-pagination-button-radius,/g' "$CSS_FILE"
sed -i 's/--pagination-button-color,/--component-pagination-button-color,/g' "$CSS_FILE"
sed -i 's/--pagination-font-size,/--component-pagination-font-size,/g' "$CSS_FILE"
sed -i 's/--pagination-button-hover-bg,/--component-pagination-button-hover-background,/g' "$CSS_FILE"
sed -i 's/--pagination-button-hover-border,/--component-pagination-button-hover-border,/g' "$CSS_FILE"
sed -i 's/--pagination-button-hover-color,/--component-pagination-button-hover-color,/g' "$CSS_FILE"
sed -i 's/--pagination-active-bg,/--component-pagination-active-background,/g' "$CSS_FILE"
sed -i 's/--pagination-active-border,/--component-pagination-active-border,/g' "$CSS_FILE"
sed -i 's/--pagination-active-color,/--component-pagination-active-color,/g' "$CSS_FILE"

# --interactive-primary は --primary-default に置換
sed -i 's/var(--interactive-primary)/var(--primary-default)/g' "$CSS_FILE"
sed -i 's/--interactive-primary,/--primary-default,/g' "$CSS_FILE"

echo "✅ Pagination変数の修正完了！"
