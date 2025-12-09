# FileUpload

ファイルをアップロードするための汎用的なコンポーネントです。ドラッグ＆ドロップ、複数ファイル選択、プレビュー表示、ファイル制限などの機能をサポートしています。

## 基本的な使い方

ファイルを選択したり、ドラッグ＆ドロップで追加できるシンプルなファイルアップロードです。

```html
<ha-file-upload label="ファイルをアップロード" helper-text="ここにファイルをドラッグ＆ドロップしてください"></ha-file-upload>
```

## 複数ファイル選択

`multiple` 属性を追加することで、複数のファイルを一度に選択できるようになります。

```html
<ha-file-upload multiple label="複数のファイルをアップロード" helper-text="複数のファイルを一度に選択できます"></ha-file-upload>
```

## ファイルタイプとサイズ制限

`accept` 属性で許可するファイルタイプを、`max-size` 属性で最大ファイルサイズ（バイト単位）を指定できます。

```html
<ha-file-upload
  accept="image/*"
  max-size="5242880"
  label="画像ファイル (最大 5MB)"
  helper-text="画像ファイルのみ、最大5MBまでアップロード可能です"
></ha-file-upload>
```

## ファイル数制限

`max-files` 属性でアップロードできる最大ファイル数を指定できます。

```html
<ha-file-upload
  multiple
  max-files="3"
  label="最大3つのファイルをアップロード"
  helper-text="最大3つのファイルを選択できます"
></ha-file-upload>
```

## プレビュー表示

`show-preview` 属性を追加すると、画像ファイルのプレビューが表示されます。

```html
<ha-file-upload
  multiple
  accept="image/*"
  show-preview
  label="画像アップロード (プレビュー付き)"
  helper-text="選択した画像ファイルのプレビューが表示されます"
></ha-file-upload>
```

## バリアント

`variant` 属性で表示スタイルを変更できます。

### Compact

よりコンパクトな表示スタイルです。

```html
<ha-file-upload variant="compact" label="コンパクト表示"></ha-file-upload>
```

### Button

ボタンとして機能するスタイルです。

```html
<ha-file-upload variant="button" placeholder="ファイルを選択"></ha-file-upload>
```

## 状態

### Disabled

`disabled` 属性を追加すると、コンポーネントが無効になり操作できなくなります。

```html
<ha-file-upload disabled label="無効なファイルアップロード"></ha-file-upload>
```

### Error

`error` 属性と `error-text` 属性を使用すると、エラー状態とエラーメッセージを表示できます。

```html
<ha-file-upload
  error
  error-text="無効なファイルが選択されました。"
  label="エラー状態"
></ha-file-upload>
```

### Required

`required` 属性を追加すると、ファイル選択が必須であることを示します。

```html
<ha-file-upload required label="必須ファイルアップロード"></ha-file-upload>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| `variant` | `'default' \| 'compact' \| 'button'` | `'default'` | ファイルアップロードの表示スタイル |
| `multiple` | `boolean` | `false` | 複数ファイルの選択を許可するか |
| `accept` | `string` | `''` | 許可するファイルタイプ（例: `image/*,application/pdf`） |
| `max-size` | `number` | `Infinity` | 最大ファイルサイズ（バイト単位） |
| `max-files` | `number` | `Infinity` | 最大ファイル数 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `required` | `boolean` | `false` | 必須フィールドとしてマークするか |
| `error` | `boolean` | `false` | エラー状態 |
| `show-file-list` | `boolean` | `true` | アップロードされたファイルのリストを表示するか |
| `show-preview` | `boolean` | `false` | 画像ファイルのプレビューを表示するか |
| `label` | `string` | `''` | コンポーネントのラベルテキスト |
| `placeholder` | `string` | `'Choose files or drag and drop'` | ドラッグ＆ドロップゾーンのプレースホルダーテキスト |
| `drag-drop-text` | `string` | `'Drop files here'` | ドラッグ中のドロップゾーンに表示されるテキスト |
| `helper-text` | `string` | `''` | ヘルパーテキスト |
| `error-text` | `string` | `''` | エラーメッセージ |

## イベント

| イベント | ペイロード | 説明 |
|---|---|---|
| `file-select` | `{ files: File[]; validFiles: File[]; invalidFiles: Array<{ file: File; error: string }>; }` | ファイルが選択またはドロップされた時 |
| `file-remove` | `{ file: File; remainingFiles: File[]; }` | ファイルが削除された時 |
| `file-clear` | `{ clearedFiles: File[]; }` | すべてのファイルがクリアされた時 |
| `validation-error` | `{ invalidFiles: Array<{ file: File; error: string }>; }` | ファイルバリデーションに失敗した時 |

## メソッド (Public API)

コンポーネントインスタンスを通して、以下のメソッドを直接呼び出すことができます。

| メソッド | 説明 |
|---|---|
| `getFiles(): File[]` | 現在選択されているすべてのファイルを取得します。 |
| `addFiles(files: File[]): void` | プログラム的にファイルを追加します。 |
| `removeFile(fileOrId: File \| string): void` | 指定されたファイルまたはIDのファイルを削除します。 |
| `clearFiles(): void` | すべての選択されたファイルをクリアします。 |
| `validate(): boolean` | 現在のファイルがバリデーションルールを満たしているか確認します。 |
| `openFilePicker(): void` | ファイル選択ダイアログを開きます。 |

## React

```tsx
import { useState, useRef } from 'react';
import { FileUpload, FileUploadRef } from '@hidearea-design/react';

function MyFileUploadComponent() {
  const fileUploadRef = useRef<FileUploadRef>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState('');

  const handleFileSelect = (
    files: File[],
    validFiles: File[],
    invalidFiles: Array<{ file: File; error: string }>
  ) => {
    setSelectedFiles(validFiles);
    if (invalidFiles.length > 0) {
      setUploadError(`以下のファイルはアップロードできません: ${invalidFiles.map(f => f.file.name).join(', ')}`);
    } else {
      setUploadError('');
    }
  };

  const handleFileRemove = (file: File, remainingFiles: File[]) => {
    setSelectedFiles(remainingFiles);
    setUploadError(''); // Clear error on remove
  };

  const handleClearAll = () => {
    fileUploadRef.current?.clearFiles();
    setSelectedFiles([]);
    setUploadError('');
  };

  return (
    <div>
      <FileUpload
        ref={fileUploadRef}
        multiple
        accept="image/*,application/pdf"
        maxSize={10485760} // 10MB
        maxFiles={5}
        showPreview
        label="ドキュメントと画像をアップロード"
        helperText="画像 (.jpg, .png) またはPDF (.pdf) を最大5つ、各10MBまで。"
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        onFileClear={() => {
          setSelectedFiles([]);
          setUploadError('');
        }}
        onValidationError={(invalidFiles) => {
          setUploadError(`無効なファイル: ${invalidFiles.map(f => f.file.name + ' (' + f.error + ')').join(', ')}`);
        }}
      />
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      {selectedFiles.length > 0 && (
        <button onClick={handleClearAll} style={{ marginTop: '10px' }}>
          すべてのファイルをクリア
        </button>
      )}
    </div>
  );
}
```

## Vue

```vue
<template>
  <div>
    <FileUpload
      ref="fileUploadRef"
      multiple
      accept="image/*,application/pdf"
      :max-size="10485760" <!-- 10MB -->
      :max-files="5"
      show-preview
      label="ドキュメントと画像をアップロード"
      helper-text="画像 (.jpg, .png) またはPDF (.pdf) を最大5つ、各10MBまで。"
      @file-select="handleFileSelect"
      @file-remove="handleFileRemove"
      @file-clear="handleClearAll"
      @validation-error="handleValidationError"
    />
    <p v-if="uploadError" style="color: red;">{{ uploadError }}</p>
    <button v-if="selectedFiles.length > 0" @click="handleClearAll" style="margin-top: 10px;">
      すべてのファイルをクリア
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FileUpload, type FileUploadRef } from '@hidearea-design/vue';
import type { FileUploadFile } from '@hidearea-design/core';

const fileUploadRef = ref<FileUploadRef | null>(null);
const selectedFiles = ref<File[]>([]);
const uploadError = ref<string>('');

const handleFileSelect = (
  files: File[],
  validFiles: File[],
  invalidFiles: Array<{ file: File; error: string }>
) => {
  selectedFiles.value = validFiles;
  if (invalidFiles.length > 0) {
    uploadError.value = `以下のファイルはアップロードできません: ${invalidFiles.map(f => f.file.name).join(', ')}`;
  } else {
    uploadError.value = '';
  }
};

const handleFileRemove = (file: File, remainingFiles: File[]) => {
  selectedFiles.value = remainingFiles;
  uploadError.value = ''; // Clear error on remove
};

const handleClearAll = () => {
  fileUploadRef.value?.clearFiles();
  selectedFiles.value = [];
  uploadError.value = '';
};

const handleValidationError = (invalidFiles: Array<{ file: File; error: string }>) => {
  uploadError.value = `無効なファイル: ${invalidFiles.map(f => f.file.name + ' (' + f.error + ')').join(', ')}`;
};
</script>

## アクセシビリティ

File Uploadコンポーネントは、WCAG 2.1 AAに準拠し、ファイルアップロードのアクセシビリティベストプラクティスに従っています。

### ARIAサポート

File Uploadコンポーネントは自動的にARIA属性を適用します：

| ARIA属性 | 要素 | 説明 |
|---------|------|------|
| `role="button"` | ドロップゾーン | クリック可能なボタンであることを示す |
| `tabindex="0"` | ドロップゾーン | キーボードフォーカス可能にする |
| `aria-label` | ドロップゾーン | ドロップゾーンの目的を説明 |
| `aria-labelledby` | ドロップゾーン | ラベルと関連付け |
| `aria-describedby` | ドロップゾーン | ヘルパーテキストやエラーメッセージのIDを参照 |
| `aria-disabled="true"` | ドロップゾーン | `disabled`属性が設定されている場合 |
| `aria-required="true"` | ドロップゾーン | `required`属性が設定されている場合 |
| `aria-invalid="true"` | ドロップゾーン | `error`属性が設定されている場合 |
| `aria-busy="true"` | ドロップゾーン | ファイルアップロード中 |
| `role="list"` | ファイルリスト | リストであることを示す |
| `role="listitem"` | ファイルアイテム | リストアイテムであることを示す |
| `aria-label` | 削除ボタン | "ファイル名を削除"などの説明 |
| `aria-live="polite"` | ステータス領域 | ファイル追加/削除をライブで通知 |

### キーボードナビゲーション

#### ドロップゾーン

| キー | 動作 |
|-----|------|
| `Tab` | ドロップゾーンにフォーカスを移動 |
| `Shift + Tab` | 前のフォーカス可能要素へ移動 |
| `Space` / `Enter` | ファイル選択ダイアログを開く |
| `Escape` | ドラッグ操作をキャンセル（ドラッグ中の場合） |

#### ファイルリスト

| キー | 動作 |
|-----|------|
| `Tab` | 次のファイルアイテムまたは削除ボタンへ移動 |
| `Shift + Tab` | 前のファイルアイテムまたは削除ボタンへ移動 |
| `Enter` / `Space` | フォーカス中の削除ボタンを実行 |
| `Delete` | フォーカス中のファイルを削除 |

### スクリーンリーダーの対応

File Uploadコンポーネントは主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます。

#### 読み上げ例

**ドロップゾーンにフォーカス時**:
```
「ファイルをアップロード、ボタン、ここにファイルをドラッグ＆ドロップしてください」
（"Upload files, button, Drag and drop files here"）
```

**必須フィールドの場合**:
```
「ファイルをアップロード、必須、ボタン」
（"Upload files, required, button"）
```

**エラー状態の場合**:
```
「ファイルをアップロード、ボタン、無効な入力、ファイルサイズが大きすぎます」
（"Upload files, button, invalid entry, File size is too large"）
```

**ファイルが追加された時**:
```
「document.pdf が追加されました。現在2個のファイルが選択されています」
（"document.pdf added. 2 files currently selected"）
```

**ファイルが削除された時**:
```
「document.pdf が削除されました。現在1個のファイルが選択されています」
（"document.pdf removed. 1 file currently selected"）
```

**ファイルリストの読み上げ**:
```
「ファイルリスト、3個のアイテム」
「1個目、image.jpg、2.5 MB、削除ボタン」
「2個目、document.pdf、1.8 MB、削除ボタン」
（"File list, 3 items"）
（"1 of 3, image.jpg, 2.5 MB, Remove button"）
```

**ドラッグ中**:
```
「ここにファイルをドロップしてアップロード」
（"Drop files here to upload"）
```

#### ライブリージョン

ファイルの追加・削除時にスクリーンリーダーに通知されます：

```html
<ha-file-upload
  multiple
  label="ファイルをアップロード"
  helper-text="画像またはPDFファイルを選択してください"
></ha-file-upload>

<!-- File Uploadが自動的に生成するライブリージョン -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  document.pdf が追加されました。現在2個のファイルが選択されています
</div>
```

### ラベルとの関連付け

File Uploadには必ずラベルを設定してください：

```html
<!-- ✓ Good: label属性を使用（推奨） -->
<ha-file-upload
  label="プロフィール画像をアップロード"
  helper-text="JPEG、PNG形式、最大5MB"
  accept="image/*"
  max-size="5242880"
  required
></ha-file-upload>

<!-- ✓ Good: aria-labelを使用 -->
<ha-file-upload
  aria-label="プロフィール画像をアップロード"
  accept="image/*"
  required
></ha-file-upload>

<!-- ✗ Avoid: ラベルなし（アクセシビリティ違反） -->
<ha-file-upload accept="image/*" required></ha-file-upload>
```

### エラーメッセージとの関連付け

エラーメッセージは`aria-describedby`で自動的に関連付けられます：

```html
<ha-file-upload
  label="ドキュメントをアップロード"
  required
  error
  error-text="ファイルサイズが大きすぎます（最大10MB）"
  max-size="10485760"
></ha-file-upload>

<!-- File Uploadが生成するマークアップ（簡略化） -->
<label id="upload-label">ドキュメントをアップロード *</label>
<div
  role="button"
  tabindex="0"
  aria-labelledby="upload-label"
  aria-describedby="upload-error upload-helper"
  aria-invalid="true"
  aria-required="true"
>
  ここにファイルをドラッグ＆ドロップ
</div>
<div id="upload-helper">最大10MB</div>
<div id="upload-error" role="alert">ファイルサイズが大きすぎます（最大10MB）</div>
```

### ドラッグ＆ドロップのアクセシビリティ

ドラッグ＆ドロップはマウスユーザー向けの機能ですが、キーボードユーザーも同等の機能にアクセスできます：

```html
<!-- キーボードユーザーはEnter/Spaceでファイル選択ダイアログを開ける -->
<ha-file-upload
  label="ファイルをアップロード"
  helper-text="ドラッグ＆ドロップまたはクリックしてファイルを選択"
></ha-file-upload>
```

**スクリーンリーダーへの通知**:
```
「ファイルをアップロード、ボタン、EnterまたはSpaceキーを押してファイルを選択」
（"Upload files, button, Press Enter or Space to select files"）
```

### フォーカスインジケーター

キーボードユーザーのために、フォーカス状態が明確に表示されます：

```css
/* デフォルトのフォーカススタイル */
ha-file-upload:focus-within {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: 2px;
}

/* ドロップゾーンのフォーカス */
ha-file-upload::part(dropzone):focus {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: -2px;
  background-color: var(--color-primary-50);
}

/* 削除ボタンのフォーカス */
ha-file-upload::part(remove-button):focus {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: 2px;
}

/* ハイコントラストモード対応 */
@media (prefers-contrast: high) {
  ha-file-upload:focus-within {
    outline-width: 3px;
  }
}
```

### ファイルバリデーションのアクセシビリティ

バリデーションエラーは明確にスクリーンリーダーに通知されます：

```html
<ha-file-upload
  label="画像をアップロード"
  accept="image/*"
  max-size="5242880"
  max-files="3"
  helper-text="画像ファイルを最大3つ、各5MBまで"
></ha-file-upload>

<!-- バリデーションエラー時のライブリージョン -->
<div role="alert" aria-live="assertive">
  以下のファイルはアップロードできません：
  large-file.jpg（ファイルサイズが大きすぎます：7.2 MB > 5 MB）
</div>
```

## スタイルのカスタマイズ

### デザイントークン

File Uploadコンポーネントは以下のデザイントークンを使用します：

```css
/* ドロップゾーン関連 */
var(--color-surface-default)                   /* 背景色（通常） */
var(--color-surface-hover)                     /* 背景色（ホバー） */
var(--color-surface-disabled)                  /* 背景色（無効） */
var(--color-border-default)                    /* ボーダー色（通常） */
var(--color-border-hover)                      /* ボーダー色（ホバー） */
var(--color-border-focus)                      /* ボーダー色（フォーカス） */
var(--color-border-error)                      /* ボーダー色（エラー） */
var(--color-border-dashed)                     /* 点線ボーダー */

/* ドラッグ状態 */
var(--color-primary-50)                        /* ドラッグ中背景 */
var(--color-primary-500)                       /* ドラッグ中ボーダー */

/* テキスト */
var(--color-text-default)                      /* テキスト色 */
var(--color-text-subtle)                       /* サブテキスト色 */
var(--color-text-disabled)                     /* 無効テキスト色 */

/* アイコン */
var(--color-icon-default)                      /* アイコン色 */
var(--color-icon-subtle)                       /* サブアイコン色 */

/* ファイルリスト */
var(--color-surface-overlay)                   /* ファイルアイテム背景 */
var(--elevation-shadow-sm)                     /* ファイルアイテム影 */

/* プレビュー */
var(--elevation-shadow-md)                     /* プレビュー画像影 */
var(--border-radius-md)                        /* プレビュー画像角丸 */

/* スペーシング */
var(--spacing-xs)                              /* 極小スペース */
var(--spacing-sm)                              /* 小スペース */
var(--spacing-md)                              /* 中スペース */
var(--spacing-lg)                              /* 大スペース */
var(--spacing-xl)                              /* 特大スペース */

/* タイポグラフィ */
var(--text-body-default-fontSize)              /* フォントサイズ */
var(--text-body-sm-fontSize)                   /* 小フォントサイズ */
var(--text-body-default-lineHeight)            /* 行高 */

/* ボーダーと角丸 */
var(--border-radius-md)                        /* 角丸 */
var(--border-radius-lg)                        /* 大角丸 */
var(--border-width-thin)                       /* ボーダー幅 */
var(--border-width-thick)                      /* 太ボーダー幅 */

/* インタラクション */
var(--interaction-transition-fast-duration)    /* トランジション速度 */
var(--state-focus-ring-color)                  /* フォーカスリング色 */
```

### カスタムCSS変数

CSS変数を使用してスタイルをカスタマイズできます：

```css
/* 基本的なカスタマイズ */
ha-file-upload {
  --file-upload-dropzone-padding: 32px;
  --file-upload-dropzone-border-radius: 12px;
  --file-upload-dropzone-border-width: 2px;
  --file-upload-dropzone-border-style: dashed;
  --file-upload-dropzone-background: var(--color-gray-50);
  --file-upload-dropzone-border-color: var(--color-gray-300);
}

/* ホバー時のカスタマイズ */
ha-file-upload {
  --file-upload-dropzone-hover-background: var(--color-gray-100);
  --file-upload-dropzone-hover-border-color: var(--color-primary-400);
}

/* ドラッグ中のカスタマイズ */
ha-file-upload {
  --file-upload-dropzone-drag-background: var(--color-primary-50);
  --file-upload-dropzone-drag-border-color: var(--color-primary-500);
  --file-upload-dropzone-drag-border-width: 3px;
}

/* ファイルリストのカスタマイズ */
ha-file-upload {
  --file-upload-file-item-padding: 12px 16px;
  --file-upload-file-item-border-radius: 8px;
  --file-upload-file-item-background: var(--color-white);
  --file-upload-file-item-gap: 12px;
}

/* プレビューのカスタマイズ */
ha-file-upload {
  --file-upload-preview-size: 80px;
  --file-upload-preview-border-radius: 8px;
  --file-upload-preview-border: 1px solid var(--color-gray-200);
}
```

### Shadow DOMパーツ

Shadow DOMの`::part()`セレクターを使用して、より詳細なスタイルのカスタマイズが可能です：

| Part名 | 説明 |
|--------|------|
| `dropzone` | ドロップゾーン全体 |
| `dropzone-content` | ドロップゾーン内のコンテンツ |
| `dropzone-icon` | ドロップゾーンアイコン |
| `dropzone-text` | ドロップゾーンテキスト |
| `file-list` | ファイルリスト全体 |
| `file-item` | 個別のファイルアイテム |
| `file-icon` | ファイルタイプアイコン |
| `file-info` | ファイル名とサイズ情報 |
| `file-name` | ファイル名 |
| `file-size` | ファイルサイズ |
| `file-preview` | プレビュー画像 |
| `remove-button` | 削除ボタン |
| `clear-all-button` | すべてクリアボタン |

```css
/* ドロップゾーンのカスタマイズ */
ha-file-upload::part(dropzone) {
  border-style: solid;
  border-width: 2px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: all 0.3s ease;
}

ha-file-upload::part(dropzone):hover {
  border-color: var(--color-primary-500);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

ha-file-upload::part(dropzone)[data-drag-active] {
  border-color: var(--color-primary-600);
  background: var(--color-primary-50);
  transform: scale(1.02);
}

/* ドロップゾーンアイコンのカスタマイズ */
ha-file-upload::part(dropzone-icon) {
  color: var(--color-primary-500);
  font-size: 48px;
}

/* ドロップゾーンテキストのカスタマイズ */
ha-file-upload::part(dropzone-text) {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-gray-700);
}

/* ファイルアイテムのカスタマイズ */
ha-file-upload::part(file-item) {
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 8px;
  padding: 12px 16px;
  transition: all 0.2s ease;
}

ha-file-upload::part(file-item):hover {
  background-color: var(--color-gray-50);
  border-color: var(--color-gray-300);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* ファイル名のカスタマイズ */
ha-file-upload::part(file-name) {
  font-weight: 600;
  color: var(--color-gray-900);
  font-size: 14px;
}

/* ファイルサイズのカスタマイズ */
ha-file-upload::part(file-size) {
  font-size: 12px;
  color: var(--color-gray-600);
}

/* プレビュー画像のカスタマイズ */
ha-file-upload::part(file-preview) {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid var(--color-gray-200);
}

/* 削除ボタンのカスタマイズ */
ha-file-upload::part(remove-button) {
  color: var(--color-danger-600);
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

ha-file-upload::part(remove-button):hover {
  background-color: var(--color-danger-50);
  color: var(--color-danger-700);
}
```

### ダークモードのサポート

ダークモードに対応したスタイルを定義できます：

```css
/* ライトモード（デフォルト） */
ha-file-upload {
  --file-upload-dropzone-background: var(--color-white);
  --file-upload-dropzone-border-color: var(--color-gray-300);
  --file-upload-file-item-background: var(--color-white);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  ha-file-upload {
    --file-upload-dropzone-background: var(--color-gray-800);
    --file-upload-dropzone-border-color: var(--color-gray-600);
    --file-upload-file-item-background: var(--color-gray-800);
  }

  ha-file-upload::part(dropzone) {
    color-scheme: dark;
  }

  ha-file-upload::part(dropzone):hover {
    background-color: var(--color-gray-700);
  }

  ha-file-upload::part(file-item) {
    background-color: var(--color-gray-700);
    border-color: var(--color-gray-600);
  }

  ha-file-upload::part(file-item):hover {
    background-color: var(--color-gray-600);
  }
}
```

### カスタムテーマ

特定のユースケース向けのカスタムテーマを作成できます：

```css
/* プライマリテーマ */
ha-file-upload.file-upload-primary::part(dropzone) {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-300);
}

ha-file-upload.file-upload-primary::part(dropzone):hover {
  background-color: var(--color-primary-100);
  border-color: var(--color-primary-500);
}

/* ミニマルテーマ */
ha-file-upload.file-upload-minimal::part(dropzone) {
  border: none;
  background-color: transparent;
  padding: 16px;
}

ha-file-upload.file-upload-minimal::part(dropzone):hover {
  background-color: var(--color-gray-50);
}

/* カードテーマ */
ha-file-upload.file-upload-card::part(dropzone) {
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  background-color: var(--color-white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* グラデーションテーマ */
ha-file-upload.file-upload-gradient::part(dropzone) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

ha-file-upload.file-upload-gradient::part(dropzone-text),
ha-file-upload.file-upload-gradient::part(dropzone-icon) {
  color: white;
}
```

### CSSカスタムプロパティインターフェース

TypeScript型定義：

```typescript
interface FileUploadCSSCustomProperties {
  '--file-upload-dropzone-padding'?: string;
  '--file-upload-dropzone-border-radius'?: string;
  '--file-upload-dropzone-border-width'?: string;
  '--file-upload-dropzone-border-style'?: string;
  '--file-upload-dropzone-background'?: string;
  '--file-upload-dropzone-border-color'?: string;
  '--file-upload-dropzone-hover-background'?: string;
  '--file-upload-dropzone-hover-border-color'?: string;
  '--file-upload-dropzone-drag-background'?: string;
  '--file-upload-dropzone-drag-border-color'?: string;
  '--file-upload-dropzone-drag-border-width'?: string;
  '--file-upload-file-item-padding'?: string;
  '--file-upload-file-item-border-radius'?: string;
  '--file-upload-file-item-background'?: string;
  '--file-upload-file-item-gap'?: string;
  '--file-upload-preview-size'?: string;
  '--file-upload-preview-border-radius'?: string;
  '--file-upload-preview-border'?: string;
}
```

## ベストプラクティス

### Do's ✓

#### 1. 適切なファイルタイプ制限を設定する

`accept`属性で許可するファイルタイプを明示的に指定します。

```html
<!-- ✓ Good: 画像のみ -->
<ha-file-upload
  accept="image/*"
  label="プロフィール画像をアップロード"
  helper-text="JPEG、PNG、GIF形式に対応"
></ha-file-upload>

<!-- ✓ Good: 複数の特定タイプ -->
<ha-file-upload
  accept=".pdf,.doc,.docx"
  label="ドキュメントをアップロード"
  helper-text="PDF、Word形式に対応"
></ha-file-upload>
```

**理由**: ユーザーが誤って不正なファイルタイプを選択するのを防ぎ、サーバー側の検証負荷を軽減します。

#### 2. 最大ファイルサイズを設定する

`max-size`属性でファイルサイズの上限を設定します。

```html
<!-- ✓ Good: サイズ制限を明示 -->
<ha-file-upload
  max-size="10485760"
  label="ファイルをアップロード"
  helper-text="最大10MB"
></ha-file-upload>
```

**理由**: 大きすぎるファイルのアップロードを防ぎ、サーバーリソースを保護します。

#### 3. ヘルパーテキストで制約を明示する

ファイルタイプ、サイズ、数の制約をヘルパーテキストで説明します。

```html
<!-- ✓ Good: 詳細なヘルパーテキスト -->
<ha-file-upload
  multiple
  accept="image/*"
  max-size="5242880"
  max-files="5"
  label="商品画像をアップロード"
  helper-text="JPEG、PNG形式、最大5MB、5枚まで選択可能"
></ha-file-upload>
```

**理由**: ユーザーが制約を理解し、正しいファイルを選択しやすくなります。

#### 4. プレビュー表示を活用する

画像ファイルをアップロードする場合は`show-preview`を使用します。

```html
<!-- ✓ Good: 画像プレビュー表示 -->
<ha-file-upload
  accept="image/*"
  show-preview
  label="画像をアップロード"
></ha-file-upload>
```

**理由**: ユーザーが選択した画像を視覚的に確認でき、間違ったファイルのアップロードを防ぎます。

#### 5. バリデーションエラーを適切に処理する

`validation-error`イベントを監視してエラーメッセージを表示します。

```tsx
// ✓ Good: エラーハンドリング
<FileUpload
  accept="image/*"
  maxSize={5242880}
  onValidationError={(invalidFiles) => {
    invalidFiles.forEach(({ file, error }) => {
      console.error(`${file.name}: ${error}`);
      showToast(`${file.name} - ${error}`, 'error');
    });
  }}
/>
```

**理由**: ユーザーにフィードバックを提供し、問題を解決しやすくします。

#### 6. 複数ファイルアップロードには制限を設ける

`max-files`属性で最大ファイル数を制限します。

```html
<!-- ✓ Good: ファイル数制限 -->
<ha-file-upload
  multiple
  max-files="10"
  label="ファイルをアップロード"
  helper-text="最大10個まで選択可能"
></ha-file-upload>
```

**理由**: 過剰なファイル数によるパフォーマンス問題を防ぎます。

### Don'ts ✗

#### 1. ラベルなし

アクセシビリティのため必ずラベルを設定します。

```html
<!-- ✗ Bad -->
<ha-file-upload accept="image/*"></ha-file-upload>

<!-- ✓ Good -->
<ha-file-upload
  accept="image/*"
  label="画像をアップロード"
></ha-file-upload>
```

**理由**: スクリーンリーダーユーザーがコンポーネントの目的を理解できません。

#### 2. ファイルタイプ制限なし

セキュリティのため、許可するファイルタイプを制限します。

```html
<!-- ✗ Bad: すべてのファイルタイプを許可 -->
<ha-file-upload label="ファイルをアップロード"></ha-file-upload>

<!-- ✓ Good: ファイルタイプを制限 -->
<ha-file-upload
  accept="image/*,application/pdf"
  label="画像またはPDFをアップロード"
></ha-file-upload>
```

**理由**: 悪意のあるファイルやサポートされていないファイルのアップロードを防ぎます。

**代替案**: サーバー側でもファイルタイプの検証を必ず行ってください。

#### 3. サイズ制限なし

サーバーリソースを保護するため、最大サイズを設定します。

```html
<!-- ✗ Bad: サイズ制限なし -->
<ha-file-upload label="ファイルをアップロード"></ha-file-upload>

<!-- ✓ Good: サイズ制限あり -->
<ha-file-upload
  max-size="10485760"
  label="ファイルをアップロード"
  helper-text="最大10MB"
></ha-file-upload>
```

**理由**: 大きなファイルによるサーバーの過負荷やストレージの浪費を防ぎます。

**代替案**: サーバー側でもファイルサイズの検証を必ず行ってください。

#### 4. エラーハンドリングなし

バリデーションエラーを適切に処理します。

```tsx
// ✗ Bad: エラーハンドリングなし
<FileUpload accept="image/*" maxSize={5242880} />

// ✓ Good: エラーハンドリングあり
<FileUpload
  accept="image/*"
  maxSize={5242880}
  onValidationError={(invalidFiles) => {
    setError(`無効なファイル: ${invalidFiles.map(f => f.file.name).join(', ')}`);
  }}
/>
```

**理由**: ユーザーが問題を理解できず、混乱します。

#### 5. 制約の説明不足

ヘルパーテキストで制約を明確に説明します。

```html
<!-- ✗ Bad: 制約が不明 -->
<ha-file-upload
  accept="image/*"
  max-size="5242880"
  label="画像をアップロード"
></ha-file-upload>

<!-- ✓ Good: 制約を明示 -->
<ha-file-upload
  accept="image/*"
  max-size="5242880"
  label="画像をアップロード"
  helper-text="JPEG、PNG形式、最大5MB"
></ha-file-upload>
```

**理由**: ユーザーが制約を知らずに無効なファイルを選択し、エラーになります。

## よくある質問

### アップロード進捗を表示するには？

ファイルアップロード中の進捗を表示するには、カスタムロジックを実装します：

```tsx
// React
import { useState } from 'react';

function FileUploadWithProgress() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const uploadFiles = async () => {
    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        }
      });

      xhr.addEventListener('load', () => {
        console.log(`${file.name} uploaded successfully`);
      });

      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    }

    setUploading(false);
  };

  return (
    <div>
      <FileUpload
        multiple
        onFileSelect={handleFileSelect}
        label="ファイルをアップロード"
      />
      {files.length > 0 && (
        <div>
          {files.map(file => (
            <div key={file.name}>
              <span>{file.name}</span>
              {uploadProgress[file.name] !== undefined && (
                <progress value={uploadProgress[file.name]} max="100">
                  {uploadProgress[file.name]}%
                </progress>
              )}
            </div>
          ))}
          <Button onClick={uploadFiles} disabled={uploading}>
            {uploading ? 'アップロード中...' : 'アップロード'}
          </Button>
        </div>
      )}
    </div>
  );
}
```

### クラウドストレージ（S3、GCS等）に直接アップロードするには？

プリサインドURLを使用してクラウドストレージに直接アップロードします：

```tsx
// React: AWS S3への直接アップロード
async function uploadToS3(file: File) {
  // 1. サーバーからプリサインドURLを取得
  const response = await fetch('/api/get-presigned-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name, fileType: file.type })
  });
  const { presignedUrl } = await response.json();

  // 2. プリサインドURLにファイルをアップロード
  await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type }
  });

  console.log('File uploaded to S3 successfully');
}

function CloudUploadExample() {
  const handleFileSelect = async (files: File[]) => {
    for (const file of files) {
      await uploadToS3(file);
    }
  };

  return (
    <FileUpload
      multiple
      onFileSelect={handleFileSelect}
      label="S3にアップロード"
    />
  );
}
```

### ドラッグ＆ドロップ時のビジュアルフィードバックをカスタマイズするには？

CSS変数とShadow DOM partsを使用してドラッグ時のスタイルをカスタマイズします：

```css
/* ドラッグ中のスタイルをカスタマイズ */
ha-file-upload {
  --file-upload-dropzone-drag-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --file-upload-dropzone-drag-border-color: #667eea;
  --file-upload-dropzone-drag-border-width: 4px;
}

ha-file-upload::part(dropzone)[data-drag-active] {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

ha-file-upload::part(dropzone-icon)[data-drag-active] {
  animation: bounce 0.5s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### ファイル選択後に自動的にアップロードするには？

`file-select`イベントを監視して、ファイル選択後すぐにアップロード処理を開始します：

```tsx
// React: 自動アップロード
function AutoUploadExample() {
  const handleFileSelect = async (files: File[]) => {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          console.log(`${file.name} uploaded successfully`);
        } else {
          console.error(`Failed to upload ${file.name}`);
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    }
  };

  return (
    <FileUpload
      multiple
      onFileSelect={handleFileSelect}
      label="ファイルをアップロード（自動アップロード）"
      helper-text="ファイル選択後、自動的にアップロードされます"
    />
  );
}
```

## 関連コンポーネント

- [Button](/components/button) - ファイル選択ダイアログを開くボタン
- [Form Group](/components/form-group) - フォームフィールドのグループ化
- [Progress](/components/progress) - アップロード進捗の表示

## APIリファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { FileUploadProps, FileSelectDetail, FileRemoveDetail } from '@hidearea-design/core';

/**
 * File Upload コンポーネントのプロパティ
 */
interface FileUploadProps {
  /** 表示スタイル */
  variant?: 'default' | 'compact' | 'button';

  /** 複数ファイルの選択を許可するか */
  multiple?: boolean;

  /** 許可するファイルタイプ（例: "image/*,application/pdf"） */
  accept?: string;

  /** 最大ファイルサイズ（バイト単位） */
  maxSize?: number;

  /** 最大ファイル数 */
  maxFiles?: number;

  /** 無効状態 */
  disabled?: boolean;

  /** 必須フィールド */
  required?: boolean;

  /** エラー状態 */
  error?: boolean;

  /** アップロードされたファイルのリストを表示するか */
  showFileList?: boolean;

  /** 画像ファイルのプレビューを表示するか */
  showPreview?: boolean;

  /** コンポーネントのラベルテキスト */
  label?: string;

  /** ドラッグ＆ドロップゾーンのプレースホルダーテキスト */
  placeholder?: string;

  /** ドラッグ中のドロップゾーンに表示されるテキスト */
  dragDropText?: string;

  /** ヘルパーテキスト */
  helperText?: string;

  /** エラーメッセージ */
  errorText?: string;
}

/**
 * file-select イベントの詳細
 */
interface FileSelectDetail {
  /** 選択されたすべてのファイル */
  files: File[];

  /** バリデーションに合格したファイル */
  validFiles: File[];

  /** バリデーションに失敗したファイルとエラー理由 */
  invalidFiles: Array<{
    file: File;
    error: string;
  }>;
}

/**
 * file-remove イベントの詳細
 */
interface FileRemoveDetail {
  /** 削除されたファイル */
  file: File;

  /** 残っているファイル */
  remainingFiles: File[];
}

/**
 * validation-error イベントの詳細
 */
interface ValidationErrorDetail {
  /** バリデーションに失敗したファイルとエラー理由 */
  invalidFiles: Array<{
    file: File;
    error: string;
  }>;
}

/**
 * File Upload Ref インターフェース
 */
interface FileUploadRef {
  /** 現在選択されているすべてのファイルを取得 */
  getFiles(): File[];

  /** プログラム的にファイルを追加 */
  addFiles(files: File[]): void;

  /** 指定されたファイルまたはIDのファイルを削除 */
  removeFile(fileOrId: File | string): void;

  /** すべての選択されたファイルをクリア */
  clearFiles(): void;

  /** 現在のファイルがバリデーションルールを満たしているか確認 */
  validate(): boolean;

  /** ファイル選択ダイアログを開く */
  openFilePicker(): void;
}
```

## トラブルシューティング

### ファイルが選択できない

**問題**: File Uploadをクリックしてもファイル選択ダイアログが開かない

**原因**:
1. `disabled`属性が設定されている
2. JavaScriptエラーによりコンポーネントが正しく初期化されていない
3. ブラウザのファイル選択機能がブロックされている

**解決策**:

```html
<!-- disabled属性を確認 -->
<ha-file-upload disabled label="ファイルをアップロード"></ha-file-upload>
<!-- ✓ disabled を削除 -->
<ha-file-upload label="ファイルをアップロード"></ha-file-upload>
```

ブラウザの開発者コンソールでJavaScriptエラーを確認してください。

### ドラッグ＆ドロップが機能しない

**問題**: ファイルをドラッグ＆ドロップしても反応しない

**原因**:
1. ブラウザがFile APIをサポートしていない（古いブラウザ）
2. 親要素のイベントハンドラがドラッグイベントを妨害している
3. CORSポリシーにより別のドメインからのドラッグがブロックされている

**解決策**:

```javascript
// 親要素でドラッグイベントの伝播を防ぐ
document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  e.preventDefault();
});
```

### ファイルバリデーションエラーが表示されない

**問題**: 無効なファイルを選択してもエラーメッセージが表示されない

**原因**:
1. `validation-error`イベントを監視していない
2. `error`属性と`error-text`属性が設定されていない

**解決策**:

```tsx
// React
const [error, setError] = useState('');

<FileUpload
  accept="image/*"
  maxSize={5242880}
  error={!!error}
  errorText={error}
  onValidationError={(invalidFiles) => {
    const errors = invalidFiles.map(f => `${f.file.name}: ${f.error}`).join(', ');
    setError(errors);
  }}
/>
```

```vue
<!-- Vue -->
<template>
  <HaFileUpload
    accept="image/*"
    :max-size="5242880"
    :error="!!error"
    :error-text="error"
    @validation-error="handleValidationError"
  />
</template>

<script setup>
const error = ref('');

const handleValidationError = (invalidFiles) => {
  const errors = invalidFiles.map(f => `${f.file.name}: ${f.error}`).join(', ');
  error.value = errors;
};
</script>
```

### プレビュー画像が表示されない

**問題**: `show-preview`を設定しても画像プレビューが表示されない

**原因**:
1. 選択されたファイルが画像ファイルではない
2. ファイルサイズが大きすぎてブラウザがプレビューを生成できない
3. ファイルの読み込みに失敗している

**解決策**:

画像ファイルのみを許可し、適切なサイズ制限を設定：

```html
<ha-file-upload
  accept="image/*"
  max-size="10485760"
  show-preview
  label="画像をアップロード"
  helper-text="画像ファイルのみ、最大10MB"
></ha-file-upload>
```

ブラウザの開発者コンソールでエラーメッセージを確認してください。
