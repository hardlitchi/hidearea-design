#!/bin/bash

# フェーズ1.75: 残りのレガシー変数の置換

set -e

CSS_DIR="src/css"

echo "🔧 残りのレガシー変数を置換中..."
echo ""

# Line height
echo "  • --line-height-normal → --font-line-height-normal"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--line-height-normal/--font-line-height-normal/g' {} \;

# Color danger 700
echo "  • --color-danger-700 → --error-default"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--color-danger-700/--error-default/g' {} \;

# Background disabled
echo "  • --background-disabled → --background-secondary"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--background-disabled/--background-secondary/g' {} \;

echo ""
echo "✅ 置換完了！"
echo ""
