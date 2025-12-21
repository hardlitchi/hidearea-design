# アクセシビリティガイド

Hidearea Design Systemは、アクセシビリティを核となる原則として構築されています。このガイドでは、アクセシブルなWebアプリケーションを作成するためのベストプラクティスと実装の詳細を提供します。

## 目次

- [概要](#概要)
- [WCAG準拠](#wcag準拠)
- [キーボードナビゲーション](#キーボードナビゲーション)
- [スクリーンリーダーサポート](#スクリーンリーダーサポート)
- [色とコントラスト](#色とコントラスト)
- [コンポーネント別ガイドライン](#コンポーネント別ガイドライン)
- [アクセシビリティのテスト](#アクセシビリティのテスト)
- [一般的なパターン](#一般的なパターン)

---

## 概要

### アクセシビリティ標準

Hidearea Design Systemは以下に準拠しています：
- **WCAG 2.1 Level AA** 準拠
- **WAI-ARIA 1.2** オーサリングプラクティス
- **Section 508** 要件

### 基本原則

1. **知覚可能**: コンテンツはすべてのユーザーが利用可能
2. **操作可能**: ユーザーはキーボードと支援技術で操作可能
3. **理解可能**: 明確で一貫性のあるインターフェースと動作
4. **堅牢**: 現在および将来の支援技術で動作

---

## WCAG準拠

### 達成基準カバレッジ

| レベル | カバレッジ | ステータス |
|-------|----------|--------|
| A | 100% | ✅ 準拠 |
| AA | 100% | ✅ 準拠 |
| AAA | 部分的 | 🚧 進行中 |

### 満たしている主要な要件

#### 1.4.3 コントラスト（最小） - Level AA
すべてのテキストとインタラクティブ要素は最小コントラスト比を満たしています：
- **通常のテキスト**: 4.5:1
- **大きなテキスト**: 3:1
- **UIコンポーネント**: 3:1

#### 2.1.1 キーボード - Level A
すべての機能はキーボードから利用可能：
```html
<!-- Tabナビゲーションはデフォルトで動作 -->
<ha-button>Tabでアクセス可能</ha-button>
<ha-input label="Tabでアクセス可能" />

<!-- カスタムフォーカス管理 -->
<ha-modal id="modal">
  <!-- モーダルが開いている時はフォーカスがトラップされる -->
  <ha-button>モーダル内のボタン</ha-button>
</ha-modal>
```

#### 4.1.2 名前（name）、役割（role）、値（value） - Level A
すべてのコンポーネントは適切なARIA属性を持っています：
```html
<!-- セマンティックロール -->
<ha-button role="button">アクション</ha-button>

<!-- アクセシブルネーム -->
<ha-input aria-label="検索" placeholder="検索..." />

<!-- 状態情報 -->
<ha-checkbox checked aria-checked="true">同意する</ha-checkbox>
```

---

## キーボードナビゲーション

### 標準キーボードショートカット

| キー | アクション |
|-----|--------|
| `Tab` | フォーカスを前方に移動 |
| `Shift + Tab` | フォーカスを後方に移動 |
| `Enter` | ボタン/リンクを実行 |
| `Space` | ボタンを実行/チェックボックスを切り替え |
| `Esc` | モーダル/ドロワー/ドロップダウンを閉じる |
| `矢印キー` | コンポーネント内を移動（タブ、メニューなど） |

### フォーカス管理

#### フォーカスインジケーター
すべてのコンポーネントは視認可能なフォーカスインジケーターを持っています：
```css
/* フォーカススタイルは組み込み済み */
ha-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

#### フォーカストラップ
モーダルとドロワーは自動的にフォーカスをトラップします：
```html
<ha-modal id="dialog" open>
  <!-- フォーカスはこれらの要素内を循環 -->
  <ha-input label="名前" />
  <ha-button>保存</ha-button>
  <ha-button>キャンセル</ha-button>
</ha-modal>
```

#### スキップリンク
より良いナビゲーションのためにスキップリンクを実装：
```html
<a href="#main-content" class="skip-link">
  メインコンテンツへスキップ
</a>

<main id="main-content">
  <!-- メインコンテンツ -->
</main>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

---

## スクリーンリーダーサポート

### セマンティックHTML

常にセマンティック要素を使用：
```html
<!-- 良い例: セマンティック構造 -->
<nav aria-label="メインナビゲーション">
  <ha-menu>
    <ha-menu-item>ホーム</ha-menu-item>
    <ha-menu-item>概要</ha-menu-item>
  </ha-menu>
</nav>

<main>
  <ha-card>
    <h2 slot="title">記事タイトル</h2>
    <p>記事の内容...</p>
  </ha-card>
</main>
```

### ARIAラベル

#### aria-label
視覚的なラベルが不十分な場合にアクセシブルネームを提供：
```html
<!-- アイコンのみのボタン -->
<ha-button aria-label="ダイアログを閉じる">
  <svg><!-- X アイコン --></svg>
</ha-button>

<!-- 検索入力 -->
<ha-input
  type="search"
  aria-label="商品を検索"
  placeholder="検索..."
/>
```

#### aria-labelledby
既存のテキストをラベルとして参照：
```html
<h2 id="dialog-title">アクションの確認</h2>
<ha-modal aria-labelledby="dialog-title">
  <p>続行してもよろしいですか？</p>
</ha-modal>
```

#### aria-describedby
追加の文脈を提供：
```html
<ha-form-group
  label="パスワード"
  helper-text="8文字以上"
>
  <ha-input
    type="password"
    aria-describedby="password-hint"
  />
</ha-form-group>
<span id="password-hint" class="sr-only">
  大文字、小文字、数字を含める必要があります
</span>
```

### ライブリージョン

動的な変更を通知：
```html
<!-- 丁寧なアナウンス（中断しない） -->
<div aria-live="polite" aria-atomic="true">
  <!-- 更新されたコンテンツは現在の読み上げの後に通知される -->
</div>

<!-- 積極的なアナウンス（中断する） -->
<div aria-live="assertive" aria-atomic="true">
  <!-- 重要な更新は即座に通知される -->
</div>
```

Toastの例：
```html
<ha-toast
  variant="success"
  aria-live="polite"
  role="status"
>
  変更が正常に保存されました
</ha-toast>
```

### スクリーンリーダー専用テキスト

視覚的に隠してもアクセシブルな状態を保つ：
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

使用例：
```html
<ha-button>
  削除
  <span class="sr-only">ユーザーアカウント</span>
</ha-button>
<!-- 読み上げ: "ユーザーアカウントを削除" -->
```

---

## 色とコントラスト

### コントラスト比

Hidearea Designトークンは適切なコントラストを保証：
```css
/* 背景上のテキスト */
--color-text-primary: #1a1a1a;      /* 白上で15.8:1 */
--color-text-secondary: #666666;    /* 白上で5.7:1 */

/* インタラクティブ要素 */
--color-primary: #0066cc;           /* 白上で4.5:1 */
--color-primary-hover: #0052a3;     /* 白上で5.9:1 */

/* ボーダーと区切り線 */
--color-border: #d1d5db;            /* 白上で3:1 */
```

### 色だけに頼らない

常に追加のインジケーターを提供：
```html
<!-- 悪い例: 色のみ -->
<ha-alert variant="error">
  エラーが発生しました
</ha-alert>

<!-- 良い例: アイコン + 色 -->
<ha-alert variant="error">
  <svg slot="prefix"><!-- エラーアイコン --></svg>
  エラーが発生しました: メールアドレスの形式が無効です
</ha-alert>

<!-- フォームバリデーション -->
<ha-form-group
  label="メールアドレス"
  error="有効なメールアドレスを入力してください"
  required
>
  <ha-input
    type="email"
    invalid
    aria-invalid="true"
  />
</ha-form-group>
```

### 色覚障害へのアクセシビリティ

色覚異常シミュレーターでテストし、以下を確保：
- 赤/緑の組み合わせは十分な明度差がある
- 重要な情報は色だけで伝えない
- 色と一緒にパターン、アイコン、またはテキストを使用

---

## コンポーネント別ガイドライン

### ボタン

```html
<!-- テキストボタン -->
<ha-button variant="primary">
  変更を保存
</ha-button>

<!-- アイコンボタンにはラベルが必要 -->
<ha-button variant="ghost" aria-label="アイテムを削除">
  <svg><!-- ゴミ箱アイコン --></svg>
</ha-button>

<!-- ローディング状態 -->
<ha-button loading disabled aria-busy="true">
  処理中...
</ha-button>
```

### フォーム

```html
<form>
  <!-- 常にラベルを使用 -->
  <ha-form-group label="氏名" required>
    <ha-input
      name="name"
      required
      aria-required="true"
    />
  </ha-form-group>

  <!-- エラー状態 -->
  <ha-form-group
    label="メールアドレス"
    error="有効なメールアドレスを入力してください"
  >
    <ha-input
      type="email"
      invalid
      aria-invalid="true"
      aria-describedby="email-error"
    />
  </ha-form-group>
  <span id="email-error" role="alert">
    有効なメールアドレスを入力してください
  </span>

  <!-- グループ化にはfieldsetを使用 -->
  <fieldset>
    <legend>通知設定</legend>
    <ha-checkbox name="email">メール通知</ha-checkbox>
    <ha-checkbox name="sms">SMS通知</ha-checkbox>
  </fieldset>
</form>
```

### モーダルとダイアログ

```html
<ha-modal
  id="confirmDialog"
  title="アクションの確認"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title" slot="title">アカウントの削除</h2>
  <p id="dialog-description">
    この操作は取り消せません。よろしいですか？
  </p>

  <div slot="footer">
    <ha-button variant="secondary">キャンセル</ha-button>
    <ha-button variant="danger">削除</ha-button>
  </div>
</ha-modal>

<script>
// フォーカス管理
const modal = document.getElementById('confirmDialog');
const previousFocus = document.activeElement;

modal.addEventListener('close', () => {
  // トリガー要素にフォーカスを戻す
  previousFocus?.focus();
});
</script>
```

### テーブル

```html
<ha-table>
  <table>
    <caption>ユーザーリスト</caption>
    <thead>
      <tr>
        <th scope="col">名前</th>
        <th scope="col">メール</th>
        <th scope="col">役割</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">山田太郎</th>
        <td>yamada@example.com</td>
        <td>管理者</td>
      </tr>
    </tbody>
  </table>
</ha-table>
```

### タブ

```html
<ha-tabs>
  <ha-tab-item
    slot="tabs"
    panel="panel1"
    role="tab"
    aria-selected="true"
  >
    プロフィール
  </ha-tab-item>
  <ha-tab-item
    slot="tabs"
    panel="panel2"
    role="tab"
    aria-selected="false"
  >
    設定
  </ha-tab-item>

  <ha-tab-panel id="panel1" role="tabpanel">
    プロフィールの内容
  </ha-tab-panel>
  <ha-tab-panel id="panel2" role="tabpanel">
    設定の内容
  </ha-tab-panel>
</ha-tabs>
```

---

## アクセシビリティのテスト

### 自動テスト

組み込みのアクセシビリティテストユーティリティを使用：
```typescript
import { expectNoA11yViolations } from '@hidearea-design/core/test-utils';

it('アクセシビリティ違反がないこと', async () => {
  const button = document.createElement('ha-button');
  button.textContent = 'クリックしてください';
  document.body.appendChild(button);

  await expectNoA11yViolations(button);
});
```

### 手動テストチェックリスト

- [ ] キーボードのみでページ全体をナビゲート
- [ ] スクリーンリーダーでテスト（NVDA、JAWS、VoiceOver）
- [ ] ツールで色のコントラストを確認
- [ ] フォーカスインジケーターが見えることを確認
- [ ] ブラウザのズームを200%でテスト
- [ ] モバイルでレスポンシブ動作を確認
- [ ] フォームバリデーションメッセージが通知されることを確認

### テストツール

1. **axe DevTools**: 自動チェック用ブラウザ拡張
2. **Lighthouse**: Chrome DevToolsに組み込み
3. **WAVE**: Webアクセシビリティ評価ツール
4. **スクリーンリーダー**:
   - Windows: NVDA（無料）、JAWS
   - macOS: VoiceOver（組み込み）
   - Linux: Orca

---

## 一般的なパターン

### ローディング状態

```html
<!-- ボタンのローディング -->
<ha-button loading disabled aria-busy="true">
  <span aria-live="polite">読み込み中...</span>
</ha-button>

<!-- コンテンツのローディング -->
<div role="status" aria-live="polite" aria-busy="true">
  <ha-spinner></ha-spinner>
  <span class="sr-only">コンテンツを読み込んでいます...</span>
</div>
```

### エラーメッセージ

```html
<!-- インラインバリデーション -->
<ha-form-group
  label="ユーザー名"
  error="このユーザー名は既に使用されています"
>
  <ha-input
    invalid
    aria-invalid="true"
    aria-describedby="username-error"
  />
</ha-form-group>
<div id="username-error" role="alert" aria-live="assertive">
  このユーザー名は既に使用されています
</div>

<!-- トースト通知 -->
<ha-toast
  variant="error"
  role="alert"
  aria-live="assertive"
>
  変更の保存に失敗しました
</ha-toast>
```

### プログレッシブディスクロージャー

```html
<!-- アコーディオン -->
<ha-accordion>
  <ha-accordion-item
    aria-expanded="false"
    aria-controls="panel1"
  >
    <span slot="title">セクション1</span>
    <div id="panel1">展開されるまで隠されている内容</div>
  </ha-accordion-item>
</ha-accordion>

<!-- 展開可能な詳細 -->
<details>
  <summary>
    <ha-button variant="ghost">もっと見る</ha-button>
  </summary>
  <p>追加コンテンツ...</p>
</details>
```

### ソート可能なデータテーブル

```html
<ha-table>
  <table>
    <thead>
      <tr>
        <th scope="col">
          <ha-button
            variant="ghost"
            aria-sort="ascending"
            aria-label="名前で昇順にソート"
          >
            名前
          </ha-button>
        </th>
      </tr>
    </thead>
  </table>
</ha-table>
```

---

## リソース

### ガイドラインと標準
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Section 508](https://www.section508.gov/)

### ツール
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 参考資料
- [アクセシビリティテストガイド](./accessibility-testing.md)
- [インラインスタイルの根拠](./inline-styles-rationale.md)
- [移行ガイド](./migration-guide.md)

---

## サポートを受ける

アクセシビリティの問題に遭遇した場合：

1. コンポーネントドキュメントでARIA属性を確認
2. 一般的なパターンについてこのガイドを確認
3. GitHubで以下の情報と共に問題を報告：
   - コンポーネント名
   - 使用したスクリーンリーダーとブラウザ
   - 期待される動作と実際の動作
4. サポートのためにコミュニティディスカッションに参加
