#!/bin/bash

# フェーズ2: accessibility トークンの置換

set -e

CSS_DIR="src/css"

echo "🔧 Accessibility トークンを置換中..."
echo ""

# Touch targets
echo "  • --touch-target-minimum → --accessibility-touch-target-minimum"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--touch-target-minimum/--accessibility-touch-target-minimum/g' {} \;

echo "  • --touch-target-comfortable → --accessibility-touch-target-comfortable"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--touch-target-comfortable/--accessibility-touch-target-comfortable/g' {} \;

echo "  • --touch-target-large → --accessibility-touch-target-large"
find "$CSS_DIR" -name "*.css" -type f -exec sed -i 's/--touch-target-large/--accessibility-touch-target-large/g' {} \;

echo ""
echo "✅ 置換完了！"
echo ""
