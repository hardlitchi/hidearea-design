#!/bin/bash
set -e

CSS_FILE="src/css/components/forms/time-picker.css"

echo "🔧 Time Picker変数を修正中..."

# 変数参照を置換
sed -i 's/var(--time-picker-width,/var(--component-time-picker-width,/g' "$CSS_FILE"
sed -i 's/var(--time-picker-input-height)/var(--component-time-picker-input-height)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-input-padding)/var(--component-time-picker-input-padding)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-input-bg)/var(--component-time-picker-input-background)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-input-border)/var(--component-time-picker-input-border)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-input-color)/var(--component-time-picker-input-color)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-border-radius)/var(--component-time-picker-border-radius)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-error-border)/var(--component-time-picker-error-border)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-error-color)/var(--component-time-picker-error-color)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-panel-width)/var(--component-time-picker-panel-width)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-panel-max-height)/var(--component-time-picker-panel-max-height)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-panel-bg)/var(--component-time-picker-panel-background)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-panel-shadow)/var(--component-time-picker-panel-shadow)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-item-padding)/var(--component-time-picker-item-padding)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-item-hover-bg)/var(--component-time-picker-item-hover-background)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-item-selected-bg)/var(--component-time-picker-item-selected-background)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-item-selected-color)/var(--component-time-picker-item-selected-color)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-item-disabled-color)/var(--component-time-picker-item-disabled-color)/g' "$CSS_FILE"
sed -i 's/var(--time-picker-item-disabled-bg)/var(--component-time-picker-item-disabled-background)/g' "$CSS_FILE"

echo "✅ Time Picker変数の修正完了！"
