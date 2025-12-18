# 未定義CSS変数の調査レポート

## 概要

**調査日**: 2025-12-18
**発見された未定義変数**: 179個

## 優先度分類

### 🔴 高優先度：複数ファイルで使用（即座に修正すべき）

これらの変数は複数のコンポーネントで使用されているため、影響範囲が大きい：

| 変数名 | 使用箇所 | 推奨マッピング | 状態 |
|--------|---------|---------------|------|
| `--touch-target-minimum` | 6ファイル | 新規トークン定義が必要 (`44px`) | ❌ 未定義 |
| `--duration-fast` | 4ファイル | `--animation-duration-fast` | ✅ 定義済み |
| `--radius-md` | 4ファイル | `--border-radius-md` | ✅ 定義済み |
| `--ease-out` | 3ファイル | `--animation-easing-ease-out` | ✅ 定義済み |
| `--radius-lg` | 3ファイル | `--border-radius-lg` | ✅ 定義済み |
| `--radius-base` | 3ファイル | `--border-radius-base` | ✅ 定義済み |
| `--ease` | 3ファイル | `--animation-easing-ease` | ✅ 定義済み |
| `--font-weight-regular` | 3ファイル | `--font-weight-normal` | ✅ 定義済み |
| `--color-text-primary` | 3ファイル | `--foreground-primary` | ✅ 定義済み |
| `--color-text-secondary` | 3ファイル | `--foreground-secondary` | ✅ 定義済み |
| `--color-text-disabled` | 3ファイル | `--foreground-tertiary` | ✅ 定義済み |
| `--duration-base` | 2ファイル | `--animation-duration-base` | ✅ 定義済み |
| `--touch-target-comfortable` | 2ファイル | 新規トークン定義が必要 (`48px`) | ❌ 未定義 |
| `--touch-target-large` | 2ファイル | 新規トークン定義が必要 (`56px`) | ❌ 未定義 |
| `--font-family-base` | 2ファイル | `--font-family-sans` | ✅ 定義済み |
| `--color-background` | 2ファイル | `--background-primary` | ✅ 定義済み |
| `--color-danger-600` | 2ファイル | `--error-default` | ✅ 定義済み |
| `--line-height-normal` | 2ファイル | 新規トークン定義が必要 (`1.5`) | ❌ 未定義 |
| `--color-danger-700` | 2ファイル | `--error-default` (darker) | ⚠️  要確認 |
| `--background-disabled` | 2ファイル | `--background-secondary` | ✅ 定義済み |
| `--border-hover` | 2ファイル | `--border-default` (hover) | ⚠️  要確認 |
| `--radius-sm` | 2ファイル | `--border-radius-sm` | ✅ 定義済み |

### 🟡 中優先度：単一コンポーネント専用（段階的に修正）

#### Toast関連 (24個の変数)
- ファイル: `feedback/toast.css`
- 多くがコンポーネント固有の変数として定義すべき

#### Date Picker関連 (22個の変数)
- ファイル: `forms/date-picker.css`
- コンポーネントYAMLに定義を追加する必要あり

#### Modal関連 (20個の変数)
- ファイル: `overlays/modal.css`
- コンポーネントYAMLに定義を追加する必要あり

#### Time Picker関連 (19個の変数)
- ファイル: `forms/time-picker.css`
- コンポーネントYAMLに定義を追加する必要あり

#### File Upload関連 (19個の変数)
- ファイル: `forms/file-upload.css`
- コンポーネントYAMLに定義を追加する必要あり

## 修正戦略

### フェーズ1：レガシー変数名の置換（即座に実行可能）

既存のトークンが存在する場合は、CSSファイル内の変数参照を一括置換：

```bash
# 例：--radius-* を --border-radius-* に置換
find packages/tokens/src/css -name "*.css" -exec sed -i 's/--radius-sm/--border-radius-sm/g' {} \;
find packages/tokens/src/css -name "*.css" -exec sed -i 's/--radius-md/--border-radius-md/g' {} \;
find packages/tokens/src/css -name "*.css" -exec sed -i 's/--radius-lg/--border-radius-lg/g' {} \;
find packages/tokens/src/css -name "*.css" -exec sed -i 's/--radius-base/--border-radius-base/g' {} \;
find packages/tokens/src/css -name "*.css" -exec sed -i 's/--radius-full/--border-radius-full/g' {} \;
```

### フェーズ2：新規トークンの定義

以下のトークンをYAMLファイルに追加：

#### `src/base/accessibility.yaml` (新規作成)
```yaml
touchTarget:
  minimum:
    value: "44px"
    comment: "WCAG AA準拠の最小タッチターゲットサイズ"
  comfortable:
    value: "48px"
    comment: "より快適なタッチターゲットサイズ"
  large:
    value: "56px"
    comment: "大きなタッチターゲットサイズ"
```

#### `src/base/typography.yaml`
```yaml
lineHeight:
  normal:
    value: "1.5"
    comment: "標準的な行の高さ"
```

### フェーズ3：コンポーネント固有変数の定義

各コンポーネントのYAMLファイルに不足している変数を追加：

- `src/components/feedback/toast.yaml` (24個)
- `src/components/forms/date-picker.yaml` (22個)
- `src/components/overlays/modal.yaml` (20個)
- `src/components/forms/time-picker.yaml` (19個)
- `src/components/forms/file-upload.yaml` (19個)

## 影響度評価

### 即座の影響
- コンポーネントの一部スタイル（spacing、border-radius、color）が正しく適用されない
- Avatar variantsと同様の問題が他のコンポーネントでも発生している可能性

### 長期的リスク
- デザインシステムの一貫性の欠如
- 保守性の低下
- 新規コンポーネント開発時の混乱

## 推奨アクション

1. **即座に実行**: レガシー変数名の一括置換（フェーズ1）
2. **次のステップ**: 新規基本トークンの定義（フェーズ2）
3. **継続的改善**: コンポーネント固有変数の段階的追加（フェーズ3）

## 検証方法

修正後、以下のスクリプトで確認：
```bash
node packages/tokens/check-undefined-vars.mjs
```

期待される結果：
```
✅ All CSS variables are properly defined!
```
