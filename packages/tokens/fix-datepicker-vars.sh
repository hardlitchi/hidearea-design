#!/bin/bash
set -e

CSS_FILE="src/css/components/forms/date-picker.css"

echo "🔧 Date Picker変数を修正中..."

# :host内のローカル変数定義を削除し、コンポーネント変数を使用
sed -i '/:host {/,/^}/ {
  /--datepicker-bg:/d
  /--datepicker-border-color:/d
  /--datepicker-border-radius:/d
  /--datepicker-shadow:/d
  /--datepicker-input-padding:/d
  /--datepicker-input-font-size:/d
  /--datepicker-input-height:/d
  /--datepicker-calendar-padding:/d
  /--datepicker-calendar-gap:/d
  /--datepicker-header-height:/d
  /--datepicker-header-font-weight:/d
  /--datepicker-day-size:/d
  /--datepicker-day-font-size:/d
  /--datepicker-day-hover-bg:/d
  /--datepicker-day-selected-bg:/d
  /--datepicker-day-selected-color:/d
  /--datepicker-day-today-border-color:/d
  /--datepicker-day-disabled-opacity:/d
  /--datepicker-day-outside-opacity:/d
  /--datepicker-range-bg:/d
  /--datepicker-range-color:/d
  /\/\* Base \*\//d
  /\/\* Input \*\//d
  /\/\* Calendar \*\//d
  /\/\* Header \*\//d
  /\/\* Day cells \*\//d
  /\/\* Range \*\//d
}' "$CSS_FILE"

# 変数参照を置換
sed -i 's/var(--datepicker-width,/var(--component-date-picker-width,/g' "$CSS_FILE"
sed -i 's/var(--datepicker-bg)/var(--component-date-picker-panel-background)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-border-color)/var(--component-date-picker-panel-border-color)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-border-radius)/var(--component-date-picker-panel-border-radius)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-shadow)/var(--component-date-picker-panel-shadow)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-input-padding)/var(--component-date-picker-input-padding)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-input-font-size)/var(--component-date-picker-input-font-size)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-input-height)/var(--component-date-picker-input-height)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-calendar-padding)/var(--component-date-picker-panel-padding)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-calendar-gap)/var(--component-date-picker-panel-gap)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-header-height)/var(--component-date-picker-header-height)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-header-font-weight)/var(--component-date-picker-header-font-weight)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-day-size)/var(--component-date-picker-day-size)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-day-font-size)/var(--component-date-picker-day-font-size)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-day-hover-bg)/var(--component-date-picker-day-hover-background)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-day-selected-bg)/var(--component-date-picker-day-selected-background)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-day-selected-color)/var(--component-date-picker-day-selected-color)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-day-today-border-color)/var(--component-date-picker-day-today-border-color)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-day-disabled-opacity)/var(--component-date-picker-day-disabled-opacity)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-day-outside-opacity)/var(--component-date-picker-day-outside-opacity)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-range-bg)/var(--component-date-picker-range-background)/g' "$CSS_FILE"
sed -i 's/var(--datepicker-range-color)/var(--component-date-picker-range-color)/g' "$CSS_FILE"

echo "✅ Date Picker変数の修正完了！"
