# Phase 9 Part 1: FileUpload コンポーネント

**開始日**: 2025-12-05
**ステータス**: 🚧 計画中

---

## コンポーネント概要

ファイルアップロード機能を提供する汎用コンポーネント。
ドラッグ&ドロップ、複数ファイル選択、プレビュー機能を備える。

---

## 機能要件

### 必須機能
- ✅ ファイル選択（クリック）
- ✅ ドラッグ&ドロップ
- ✅ 複数ファイル選択（`multiple` 属性）
- ✅ ファイルタイプ制限（`accept` 属性）
- ✅ ファイルサイズ制限
- ✅ ファイルリスト表示
- ✅ 個別ファイル削除
- ✅ 全ファイルクリア
- ✅ バリデーションエラー表示

### オプション機能
- ⏳ アップロード進行状況表示
- ⏳ 画像プレビュー
- ⏳ ファイル数制限
- ⏳ ディレクトリアップロード
- ⏳ カスタムバリデータ

---

## Props / Attributes

```typescript
interface FileUploadProps {
  // 基本設定
  multiple?: boolean;           // 複数ファイル選択
  accept?: string;              // 許可するファイルタイプ (e.g., "image/*,application/pdf")
  maxSize?: number;             // 最大ファイルサイズ (bytes)
  maxFiles?: number;            // 最大ファイル数
  disabled?: boolean;           // 無効化

  // 表示設定
  variant?: 'default' | 'compact' | 'button';  // 表示スタイル
  showPreview?: boolean;        // プレビュー表示
  showFileList?: boolean;       // ファイルリスト表示

  // ラベル・メッセージ
  label?: string;               // ラベル
  placeholder?: string;         // プレースホルダー
  dragDropText?: string;        // ドラッグ&ドロップ時のテキスト

  // バリデーション
  required?: boolean;           // 必須
  error?: boolean;              // エラー状態
  helperText?: string;          // ヘルパーテキスト
  errorText?: string;           // エラーメッセージ
}
```

---

## Events

```typescript
// ファイル選択時
interface FileSelectEvent {
  files: File[];                // 選択されたファイル
  validFiles: File[];           // バリデーション通過ファイル
  invalidFiles: Array<{         // バリデーション失敗ファイル
    file: File;
    error: string;
  }>;
}

// ファイル削除時
interface FileRemoveEvent {
  file: File;                   // 削除されたファイル
  remainingFiles: File[];       // 残りのファイル
}

// 全削除時
interface FileClearEvent {
  clearedFiles: File[];         // クリアされたファイル
}
```

---

## Methods (Public API)

```typescript
class HaFileUpload extends HTMLElement {
  // ファイル取得
  getFiles(): File[];

  // ファイル追加（プログラマティック）
  addFiles(files: File[]): void;

  // ファイル削除
  removeFile(file: File): void;

  // 全ファイルクリア
  clearFiles(): void;

  // バリデーション実行
  validate(): boolean;

  // ファイル選択ダイアログを開く
  openFilePicker(): void;
}
```

---

## CSS Parts

```css
/* カスタマイズ可能な部分 */
::part(container)      /* 全体コンテナ */
::part(dropzone)       /* ドロップゾーン */
::part(input)          /* hiddenファイル入力 */
::part(label)          /* ラベル */
::part(file-list)      /* ファイルリスト */
::part(file-item)      /* ファイルアイテム */
::part(file-preview)   /* プレビュー */
::part(file-name)      /* ファイル名 */
::part(file-size)      /* ファイルサイズ */
::part(remove-button)  /* 削除ボタン */
::part(error-message)  /* エラーメッセージ */
::part(helper-text)    /* ヘルパーテキスト */
```

---

## CSS Variables

```css
:host {
  /* サイズ */
  --ha-fileupload-min-height: 120px;
  --ha-fileupload-padding: var(--ha-spacing-4);

  /* 色 */
  --ha-fileupload-bg: var(--ha-color-neutral-50);
  --ha-fileupload-border-color: var(--ha-color-neutral-300);
  --ha-fileupload-border-radius: var(--ha-radius-md);

  /* ドラッグ中の状態 */
  --ha-fileupload-drag-bg: var(--ha-color-primary-50);
  --ha-fileupload-drag-border-color: var(--ha-color-primary-500);

  /* エラー状態 */
  --ha-fileupload-error-border-color: var(--ha-color-error-500);
  --ha-fileupload-error-text-color: var(--ha-color-error-700);

  /* ファイルアイテム */
  --ha-fileupload-item-padding: var(--ha-spacing-2);
  --ha-fileupload-item-gap: var(--ha-spacing-2);

  /* プレビュー */
  --ha-fileupload-preview-size: 64px;
}
```

---

## Variants

### Default
標準のドロップゾーンスタイル。大きな領域でドラッグ&ドロップを強調。

### Compact
コンパクトな表示。フォーム内での使用に最適。

### Button
ボタンスタイル。クリックのみで選択。

---

## 実装の考慮事項

### ドラッグ&ドロップ
- `dragenter`, `dragover`, `dragleave`, `drop` イベントハンドリング
- ドラッグ中の視覚的フィードバック
- ドラッグ外でのドロップ無効化

### ファイルバリデーション
- MIMEタイプチェック
- ファイルサイズチェック
- ファイル数チェック
- カスタムバリデータ対応

### プレビュー生成
- 画像ファイル: `FileReader` で base64 変換
- その他: ファイルタイプアイコン表示
- メモリリーク対策（`URL.revokeObjectURL`）

### アクセシビリティ
- `role="button"` でクリック可能エリア明示
- キーボード操作対応（Enter, Space）
- スクリーンリーダー対応
- エラーメッセージの適切な関連付け

---

## テスト項目

### 基本機能
- [ ] ファイル選択ダイアログ表示
- [ ] ファイル選択後のリスト表示
- [ ] 複数ファイル選択
- [ ] ファイル削除
- [ ] 全ファイルクリア

### ドラッグ&ドロップ
- [ ] ドラッグエンター時のスタイル変更
- [ ] ドロップ時のファイル追加
- [ ] ドラッグリーブ時のスタイル復元
- [ ] 複数ファイルドロップ

### バリデーション
- [ ] ファイルタイプ制限
- [ ] ファイルサイズ制限
- [ ] ファイル数制限
- [ ] エラーメッセージ表示

### プレビュー
- [ ] 画像ファイルのプレビュー表示
- [ ] 非画像ファイルのアイコン表示
- [ ] プレビュー削除

### イベント
- [ ] file-select イベント発火
- [ ] file-remove イベント発火
- [ ] file-clear イベント発火
- [ ] validation-error イベント発火

### アクセシビリティ
- [ ] キーボード操作（Enter, Space）
- [ ] フォーカス管理
- [ ] ARIA属性
- [ ] スクリーンリーダー対応

### エッジケース
- [ ] 0バイトファイル
- [ ] 巨大ファイル
- [ ] 同名ファイルの重複追加
- [ ] 無効なファイルタイプ

---

## Storybook Stories

1. **Default** - 基本的な使い方
2. **Multiple Files** - 複数ファイル選択
3. **With Accept** - ファイルタイプ制限
4. **With Max Size** - サイズ制限
5. **With Preview** - プレビュー表示
6. **Compact Variant** - コンパクト表示
7. **Button Variant** - ボタンスタイル
8. **With Validation** - バリデーションエラー
9. **Disabled** - 無効状態
10. **Custom Styling** - カスタムスタイル例
11. **Form Integration** - フォーム統合例
12. **Image Upload** - 画像専用アップロード例

---

## 実装順序

1. **Core機能** (datagridファイル作成)
   - ファイル選択（input type="file"）
   - ファイルリスト表示
   - ファイル削除

2. **ドラッグ&ドロップ**
   - イベントハンドリング
   - 視覚的フィードバック

3. **バリデーション**
   - ファイルタイプチェック
   - サイズチェック
   - エラー表示

4. **スタイリング**
   - 3つのバリアント実装
   - レスポンシブ対応

5. **プレビュー機能**
   - 画像プレビュー
   - ファイルアイコン

6. **テスト**
   - ユニットテスト
   - 統合テスト

7. **React/Vueラッパー**
   - Props対応
   - イベントハンドリング

8. **Storybook**
   - 12ストーリー作成

9. **ドキュメント**
   - API リファレンス
   - 使用例

---

## 参考実装

- [Shoelace File Upload](https://shoelace.style/)
- [Material-UI File Upload](https://mui.com/material-ui/react-file-upload/)
- [Ant Design Upload](https://ant.design/components/upload)

---

## 完了条件

- ✅ Core実装完了
- ✅ テスト100%カバレッジ
- ✅ React/Vueラッパー実装
- ✅ Storybook 12ストーリー
- ✅ ドキュメント作成
- ✅ ビルド成功
- ✅ 全テストパス
