# File Upload (ファイルアップロード) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/file-upload.css`
**ステータス:** ✅ 実装済み

---

## 概要

File Uploadコンポーネントは、ユーザーがファイルを選択・アップロードするための直感的なインターフェースを提供します。ドラッグ&ドロップ、ファイルプレビュー、複数ファイル対応など、現代的なファイルアップロード機能を備えています。

### 用途

- プロフィール画像のアップロード
- ドキュメントファイルの添付
- 画像ギャラリーへのアップロード
- CSV/Excelファイルのインポート
- 複数ファイルの一括アップロード

---

## 機能

### 1. ドロップゾーン

ファイルをドラッグ&ドロップまたはクリックして選択できる領域。

**特徴:**
- 最小高さ: `120px`
- 破線ボーダー（デフォルト）
- ドラッグ時に実線に変化
- ホバーエフェクト
- フォーカス可能（キーボード対応）

### 2. ファイルプレビュー

アップロードされたファイルのリスト表示。

**特徴:**
- 画像のサムネイル表示
- ファイル名と容量の表示
- ファイルアイコン（非画像ファイル）
- 削除ボタン
- エラー表示

### 3. バリアント

#### Default（デフォルト）
- 標準的なドロップゾーンスタイル
- アイコン + テキスト表示
- 最小高さ: `120px`

#### Compact（コンパクト）
- 小型のドロップゾーン
- 最小高さ: `80px`
- アイコンサイズ縮小

#### Button（ボタン）
- ボタン風のスタイル
- 塗りつぶし背景
- 横並びレイアウト

### 4. 状態管理

- **通常**: デフォルトの状態
- **ドラッグ中**: ファイルがドロップゾーン上にある状態
- **エラー**: ファイルサイズや形式のエラー
- **無効**: アップロード不可の状態

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/file-upload.css">
</head>
<body>
  <!-- 基本的な使用 -->
  <div class="ha-file-upload file-upload">
    <label class="file-upload__label">
      プロフィール画像
      <span class="required">*</span>
    </label>

    <div class="file-upload__dropzone" tabindex="0">
      <input
        type="file"
        class="file-upload__input"
        accept="image/*"
        aria-label="ファイルを選択"
      >
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <path d="M12 12v9" />
        </svg>
        <p class="file-upload__placeholder">
          ファイルをドラッグ&ドロップ、またはクリックして選択
        </p>
      </div>
    </div>

    <p class="file-upload__helper-text">
      PNG, JPG, GIF形式（最大5MB）
    </p>
  </div>

  <!-- 複数ファイル対応 -->
  <div class="ha-file-upload file-upload">
    <label class="file-upload__label">添付ファイル</label>

    <div class="file-upload__dropzone" tabindex="0">
      <input
        type="file"
        class="file-upload__input"
        multiple
        accept=".pdf,.doc,.docx"
      >
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <path d="M12 12v9" />
        </svg>
        <p class="file-upload__placeholder">
          複数のファイルを選択できます
        </p>
      </div>
    </div>

    <div class="file-upload__file-list">
      <div class="file-upload__file-item">
        <div class="file-upload__file-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          </svg>
        </div>
        <div class="file-upload__file-info">
          <div class="file-upload__file-name">document.pdf</div>
          <div class="file-upload__file-size">2.3 MB</div>
        </div>
        <button class="file-upload__remove-button" aria-label="ファイルを削除">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
      </div>

      <div class="file-upload__file-item">
        <img
          src="photo.jpg"
          class="file-upload__file-preview"
          alt="アップロードされた画像"
        >
        <div class="file-upload__file-info">
          <div class="file-upload__file-name">photo.jpg</div>
          <div class="file-upload__file-size">1.8 MB</div>
        </div>
        <button class="file-upload__remove-button" aria-label="ファイルを削除">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- ドラッグ中の状態 -->
  <div class="ha-file-upload file-upload">
    <label class="file-upload__label">画像をアップロード</label>

    <div class="file-upload__dropzone file-upload__dropzone--dragging" tabindex="0">
      <input type="file" class="file-upload__input" accept="image/*">
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <path d="M12 12v9" />
        </svg>
        <p class="file-upload__placeholder">
          ここにドロップしてアップロード
        </p>
      </div>
    </div>
  </div>

  <!-- エラー状態 -->
  <div class="ha-file-upload file-upload file-upload--error">
    <label class="file-upload__label">ドキュメント</label>

    <div class="file-upload__dropzone" tabindex="0">
      <input type="file" class="file-upload__input">
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <path d="M12 12v9" />
        </svg>
        <p class="file-upload__placeholder">
          ファイルを選択してください
        </p>
      </div>
    </div>

    <p class="file-upload__error-message">
      ファイルを選択してください
    </p>
  </div>

  <!-- ファイルエラー（サイズ超過） -->
  <div class="ha-file-upload file-upload">
    <label class="file-upload__label">画像アップロード</label>

    <div class="file-upload__dropzone" tabindex="0">
      <input type="file" class="file-upload__input">
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <path d="M12 12v9" />
        </svg>
        <p class="file-upload__placeholder">
          ファイルをドラッグ&ドロップ
        </p>
      </div>
    </div>

    <div class="file-upload__file-list">
      <div class="file-upload__file-item file-upload__file-item--error">
        <img src="large-photo.jpg" class="file-upload__file-preview" alt="">
        <div class="file-upload__file-info">
          <div class="file-upload__file-name">large-photo.jpg</div>
          <div class="file-upload__file-size">12.5 MB</div>
          <div class="file-upload__file-error">
            ファイルサイズが大きすぎます（最大5MB）
          </div>
        </div>
        <button class="file-upload__remove-button" aria-label="ファイルを削除">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- コンパクトバリアント -->
  <div class="ha-file-upload file-upload file-upload--compact">
    <label class="file-upload__label">アイコン画像</label>

    <div class="file-upload__dropzone" tabindex="0">
      <input type="file" class="file-upload__input" accept="image/*">
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <path d="M12 12v9" />
        </svg>
        <p class="file-upload__placeholder">画像を選択</p>
      </div>
    </div>
  </div>

  <!-- ボタンバリアント -->
  <div class="ha-file-upload file-upload file-upload--button">
    <div class="file-upload__dropzone" tabindex="0">
      <input type="file" class="file-upload__input">
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
        </svg>
        <p class="file-upload__placeholder">ファイルを選択</p>
      </div>
    </div>
  </div>

  <!-- 無効状態 -->
  <div class="ha-file-upload file-upload file-upload--disabled">
    <label class="file-upload__label">アップロード</label>

    <div class="file-upload__dropzone" tabindex="-1">
      <input type="file" class="file-upload__input" disabled>
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <path d="M12 12v9" />
        </svg>
        <p class="file-upload__placeholder">
          アップロードは現在無効です
        </p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `accept` | MIME type | - | 受け入れるファイル形式（例: `image/*`, `.pdf`） |
| `multiple` | `boolean` | `false` | 複数ファイルの選択を許可 |

---

## CSS変数

```css
/* サイズ */
--fileupload-min-height: 120px;                         /* ドロップゾーンの最小高さ */
--fileupload-padding: var(--spacing-4);                 /* ドロップゾーンのパディング */
--fileupload-gap: var(--spacing-3);                     /* 要素間の間隔 */
--fileupload-preview-size: 48px;                        /* プレビューサイズ */
--fileupload-icon-size: 48px;                           /* アイコンサイズ */

/* 色 */
--fileupload-bg: var(--color-neutral-50);               /* 背景色 */
--fileupload-border-color: var(--color-neutral-300);    /* ボーダー色 */
--fileupload-border-width: 2px;                         /* ボーダー幅 */
--fileupload-text-color: var(--color-neutral-600);      /* テキスト色 */
--fileupload-icon-color: var(--color-neutral-400);      /* アイコン色 */

/* ドラッグ状態 */
--fileupload-drag-bg: var(--primary-default);           /* ドラッグ時の背景色 */
--fileupload-drag-border-color: var(--primary-default); /* ドラッグ時のボーダー色 */

/* エラー状態 */
--fileupload-error-border-color: var(--error-default);  /* エラーボーダー色 */
--fileupload-error-text-color: var(--error-default);    /* エラーテキスト色 */

/* ファイルアイテム */
--fileupload-item-padding: var(--spacing-2);            /* アイテムパディング */
--fileupload-item-gap: var(--spacing-2);                /* アイテム内の間隔 */
--fileupload-item-bg: var(--foreground-inverse);        /* アイテム背景色 */
--fileupload-item-border-radius: var(--border-radius-sm); /* アイテム角丸 */

/* その他 */
--fileupload-border-radius: var(--border-radius-md);    /* 全体の角丸 */
```

---

## レスポンシブ対応

### モバイル最適化 (@media max-width: 640px)

```css
/* ドロップゾーンサイズの調整 */
最小高さ: 100px
パディング: var(--spacing-3)

/* アイコンサイズの縮小 */
アイコンサイズ: 40px

/* テキストサイズの調整 */
プレースホルダー: 0.8125rem

/* プレビューサイズの縮小 */
プレビュー/アイコン: 40px
```

---

## アクセシビリティ

### ARIA属性の使用

```html
<div class="ha-file-upload file-upload">
  <label class="file-upload__label" for="file-input">
    プロフィール画像
    <span class="required">*</span>
  </label>

  <div
    class="file-upload__dropzone"
    role="button"
    tabindex="0"
    aria-label="ファイルをアップロード。ドラッグ&ドロップまたはクリックして選択"
  >
    <input
      id="file-input"
      type="file"
      class="file-upload__input"
      accept="image/*"
      aria-required="true"
      aria-describedby="file-helper"
    >
    <div class="file-upload__content">
      <svg class="file-upload__icon" aria-hidden="true">
        <!-- アイコン -->
      </svg>
      <p class="file-upload__placeholder">
        ファイルをドラッグ&ドロップ、またはクリックして選択
      </p>
    </div>
  </div>

  <p class="file-upload__helper-text" id="file-helper">
    PNG, JPG, GIF形式（最大5MB）
  </p>
</div>

<!-- エラー状態 -->
<div class="ha-file-upload file-upload file-upload--error">
  <label class="file-upload__label">ドキュメント</label>

  <div class="file-upload__dropzone" aria-invalid="true" role="button" tabindex="0">
    <input
      type="file"
      class="file-upload__input"
      aria-invalid="true"
      aria-describedby="file-error"
    >
    <!-- コンテンツ -->
  </div>

  <p class="file-upload__error-message" id="file-error" role="alert">
    ファイルを選択してください
  </p>
</div>

<!-- ファイルリスト -->
<div class="file-upload__file-list" role="list">
  <div class="file-upload__file-item" role="listitem">
    <img
      src="photo.jpg"
      class="file-upload__file-preview"
      alt="アップロードされた画像: photo.jpg"
    >
    <div class="file-upload__file-info">
      <div class="file-upload__file-name">photo.jpg</div>
      <div class="file-upload__file-size">1.8 MB</div>
    </div>
    <button
      class="file-upload__remove-button"
      aria-label="photo.jpgを削除"
    >
      <svg aria-hidden="true">
        <!-- 削除アイコン -->
      </svg>
    </button>
  </div>
</div>
```

### キーボード操作

- **Enter/Space**: ドロップゾーンをクリック（ファイル選択ダイアログを開く）
- **Tab**: フォーカス移動
- **Escape**: ファイル選択ダイアログを閉じる
- **Enter/Space**: 削除ボタンでファイルを削除

---

## ベストプラクティス

### ✅ 推奨

```html
<!-- 受け入れるファイル形式を明示 -->
<div class="ha-file-upload file-upload">
  <label class="file-upload__label">画像をアップロード</label>
  <div class="file-upload__dropzone">
    <input type="file" class="file-upload__input" accept="image/png,image/jpeg,image/gif">
    <!-- コンテンツ -->
  </div>
  <p class="file-upload__helper-text">
    PNG, JPG, GIF形式（最大5MB）
  </p>
</div>

<!-- 明確なフィードバックを提供 -->
<div class="file-upload__file-item file-upload__file-item--error">
  <div class="file-upload__file-info">
    <div class="file-upload__file-name">large-file.jpg</div>
    <div class="file-upload__file-error">
      ファイルサイズが大きすぎます（最大5MB）
    </div>
  </div>
</div>

<!-- プレビューでユーザビリティ向上 -->
<img
  src="preview.jpg"
  class="file-upload__file-preview"
  alt="アップロードされた画像のプレビュー"
>
```

### ❌ 避けるべき

```html
<!-- ファイル形式の制限なし -->
<input type="file" class="file-upload__input">

<!-- ヘルパーテキストなし -->
<div class="ha-file-upload file-upload">
  <div class="file-upload__dropzone">
    <input type="file" class="file-upload__input">
  </div>
</div>

<!-- 曖昧なエラーメッセージ -->
<p class="file-upload__error-message">エラー</p>

<!-- alt属性のない画像プレビュー -->
<img src="preview.jpg" class="file-upload__file-preview">
```

---

## 使用例

### プロフィール画像アップロード

```html
<form>
  <div class="ha-file-upload file-upload">
    <label class="file-upload__label">
      プロフィール画像
      <span class="required">*</span>
    </label>

    <div class="file-upload__dropzone" tabindex="0">
      <input
        type="file"
        class="file-upload__input"
        accept="image/*"
        aria-required="true"
      >
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <path d="M12 12v9" />
        </svg>
        <p class="file-upload__placeholder">
          画像をドラッグ&ドロップ、またはクリックして選択
        </p>
      </div>
    </div>

    <p class="file-upload__helper-text">
      推奨サイズ: 400x400px、PNG/JPG形式、最大2MB
    </p>
  </div>
</form>
```

### 複数ドキュメントのアップロード

```html
<form>
  <div class="ha-file-upload file-upload">
    <label class="file-upload__label">契約書類</label>

    <div class="file-upload__dropzone" tabindex="0">
      <input
        type="file"
        class="file-upload__input"
        multiple
        accept=".pdf,.doc,.docx"
      >
      <div class="file-upload__content">
        <svg class="file-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
          <polyline points="9 15 12 12 15 15" />
          <path d="M12 12v9" />
        </svg>
        <p class="file-upload__placeholder">
          複数のドキュメントをアップロード
        </p>
      </div>
    </div>

    <p class="file-upload__helper-text">
      PDF, Word文書（最大10MB/ファイル、最大5ファイル）
    </p>
  </div>
</form>
```

---

## 関連コンポーネント

- [Form Group](./form-group.md) - フォームグループコンテナ
- [Input](./input.md) - テキスト入力フィールド
- [Button](../layout/button.md) - アクションボタン
- [Progress](../feedback/progress.md) - アップロード進捗表示

---

**最終更新:** 2025-12-12
