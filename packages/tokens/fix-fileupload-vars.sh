#!/bin/bash
set -e

CSS_FILE="src/css/components/forms/file-upload.css"

echo "🔧 File Upload変数を修正中..."

# 変数参照を置換（フォールバック付き）
sed -i 's/--fileupload-gap,/--component-file-upload-gap,/g' "$CSS_FILE"
sed -i 's/--fileupload-min-height,/--component-file-upload-min-height,/g' "$CSS_FILE"
sed -i 's/--fileupload-padding,/--component-file-upload-padding,/g' "$CSS_FILE"
sed -i 's/--fileupload-bg,/--component-file-upload-background,/g' "$CSS_FILE"
sed -i 's/--fileupload-border-width,/--component-file-upload-border-width,/g' "$CSS_FILE"
sed -i 's/--fileupload-border-color,/--component-file-upload-border-color,/g' "$CSS_FILE"
sed -i 's/--fileupload-border-radius,/--component-file-upload-border-radius,/g' "$CSS_FILE"
sed -i 's/--fileupload-drag-border-color,/--component-file-upload-drag-border-color,/g' "$CSS_FILE"
sed -i 's/--fileupload-drag-bg,/--component-file-upload-drag-background,/g' "$CSS_FILE"
sed -i 's/--fileupload-icon-size,/--component-file-upload-icon-size,/g' "$CSS_FILE"
sed -i 's/--fileupload-icon-color,/--component-file-upload-icon-color,/g' "$CSS_FILE"
sed -i 's/--fileupload-text-color,/--component-file-upload-text-color,/g' "$CSS_FILE"
sed -i 's/--fileupload-item-gap,/--component-file-upload-item-gap,/g' "$CSS_FILE"
sed -i 's/--fileupload-item-padding,/--component-file-upload-item-padding,/g' "$CSS_FILE"
sed -i 's/--fileupload-item-bg,/--component-file-upload-item-background,/g' "$CSS_FILE"
sed -i 's/--fileupload-item-border-radius,/--component-file-upload-item-border-radius,/g' "$CSS_FILE"
sed -i 's/--fileupload-error-border-color,/--component-file-upload-error-border-color,/g' "$CSS_FILE"
sed -i 's/--fileupload-preview-size,/--component-file-upload-preview-size,/g' "$CSS_FILE"
sed -i 's/--fileupload-error-text-color,/--component-file-upload-error-text-color,/g' "$CSS_FILE"

# --color-error も置換
sed -i 's/var(--color-error)/var(--error-default)/g' "$CSS_FILE"
sed -i 's/--color-error,/--error-default,/g' "$CSS_FILE"

echo "✅ File Upload変数の修正完了！"
