#!/bin/bash
set -e

CSS_FILE="src/css/components/overlays/modal.css"

echo "🔧 Modal変数を修正中..."

sed -i 's/--modal-z-index,/--component-modal-z-index,/g' "$CSS_FILE"
sed -i 's/--modal-overlay-padding,/--component-modal-overlay-padding,/g' "$CSS_FILE"
sed -i 's/--modal-container-padding,/--component-modal-container-padding,/g' "$CSS_FILE"
sed -i 's/--modal-bg,/--component-modal-background-default,/g' "$CSS_FILE"
sed -i 's/--modal-border-radius,/--component-modal-container-border-radius,/g' "$CSS_FILE"
sed -i 's/--modal-shadow,/--component-modal-container-shadow,/g' "$CSS_FILE"
sed -i 's/--modal-max-width,/--component-modal-container-max-width,/g' "$CSS_FILE"
sed -i 's/--modal-header-padding,/--component-modal-header-padding,/g' "$CSS_FILE"
sed -i 's/--modal-border-color,/--component-modal-border-default,/g' "$CSS_FILE"
sed -i 's/--modal-body-padding,/--component-modal-body-padding,/g' "$CSS_FILE"
sed -i 's/--modal-footer-padding,/--component-modal-footer-padding,/g' "$CSS_FILE"
sed -i 's/--modal-close-color,/--component-modal-close-color,/g' "$CSS_FILE"
sed -i 's/--modal-close-hover-bg,/--component-modal-close-hover-background,/g' "$CSS_FILE"

echo "✅ Modal変数の修正完了！"
