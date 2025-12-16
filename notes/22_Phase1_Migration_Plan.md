# Phase 1: トークン移行作業計画

**日付:** 2025-12-16
**フェーズ:** Phase 1 - 簡単なトークン置換
**優先度:** HIGH
**推定作業時間:** 4時間
**ブランチ:** `refactor/token-migration-phase1`

---

## 概要

Phase 1では、以下の3コンポーネントをレガシートークンからセマンティックトークンに移行します:

1. **Pagination** - 8箇所のレガシートークン参照
2. **Switch** - 6箇所のレガシートークン参照
3. **Breadcrumb** - 4箇所のレガシートークン参照 (要検証)

これらのコンポーネントは `.styles.ts` ファイルを持ち、インラインスタイル抽出は不要なため、比較的簡単に移行できます。

---

## 作業手順

### ステップ1: 準備 (15分)

1. **ブランチを作成:**
   ```bash
   git checkout -b refactor/token-migration-phase1
   ```

2. **トークンマッピング参照を確認:**
   - `/home/neko/workspaces/design/notes/20_Core_Package_Remediation_Plan.md` のセクション9.1を参照
   - セマンティックトークンの一覧を確認

3. **ベースラインテストを実行:**
   ```bash
   cd /home/neko/workspaces/design/packages/core
   pnpm test
   ```

---

### ステップ2: Pagination コンポーネント移行 (1時間)

#### 2.1 ファイルを特定

**注意:** Paginationコンポーネントのスタイルは**tokensパッケージ**で生成されています。
ソースファイルを探す必要があります。

1. パターン2 (HTML用) のソースを探す:
   ```bash
   # tokensパッケージ内を検索
   cd /home/neko/workspaces/design/packages/tokens
   find . -name "*pagination*" -type f
   ```

2. 想定される場所:
   - `/packages/tokens/src/patterns/pattern2/` (HTML用CSS生成スクリプト)
   - または `/packages/tokens/src/components/` (コンポーネント定義)

#### 2.2 トークン置換

**移行前 → 移行後:**

```css
/* ボーダーカラー */
border: 1px solid var(--color-gray-300)
→ border: 1px solid var(--border-default)

/* テキストカラー */
color: var(--color-gray-700)
→ color: var(--foreground-primary)

/* ホバー背景 */
background: var(--color-gray-50)
→ background: var(--background-tertiary)

/* 省略記号カラー */
color: var(--color-gray-500)
→ color: var(--foreground-tertiary)

/* 情報テキストカラー */
color: var(--color-gray-600)
→ color: var(--foreground-secondary)
```

#### 2.3 検証

1. **ビルドを実行:**
   ```bash
   cd /home/neko/workspaces/design/packages/tokens
   pnpm build
   ```

2. **生成されたCSSを確認:**
   ```bash
   # Pattern 2 (HTML用) の出力を確認
   cat build/css/pattern2/pagination.css | grep "var(--"
   ```

3. **テストを実行:**
   ```bash
   cd /home/neko/workspaces/design/packages/core
   pnpm test -- pagination.test.ts
   ```

4. **ビジュアルチェック:**
   - 開発サーバーを起動
   - Paginationコンポーネントをブラウザで確認
   - ライトモード/ダークモードを切り替えて確認

#### 2.4 コミット

```bash
git add .
git commit -m "refactor(tokens): Paginationコンポーネントをセマンティックトークンに移行

- var(--color-gray-300) → var(--border-default)
- var(--color-gray-700) → var(--foreground-primary)
- var(--color-gray-50) → var(--background-tertiary)
- var(--color-gray-500) → var(--foreground-tertiary)
- var(--color-gray-600) → var(--foreground-secondary)

8箇所のレガシートークン参照を削除"
```

---

### ステップ3: Switch コンポーネント移行 (1時間)

#### 3.1 ファイルを特定

同様に、Switchコンポーネントのソースファイルを探す:

```bash
cd /home/neko/workspaces/design/packages/tokens
find . -name "*switch*" -type f
```

#### 3.2 トークン置換

**移行前 → 移行後:**

```css
/* 背景カラー */
background-color: var(--color-neutral-300, #d1d5db)
→ background-color: var(--background-tertiary)

/* ホバー状態 */
background-color: var(--color-neutral-200, #e5e7eb)
→ background-color: var(--background-secondary)

/* エラー状態 */
background-color: var(--color-neutral-400, #9ca3af)
→ background-color: var(--border-hover)
```

**重要:** ハードコードされた16進数フォールバック (`#d1d5db`, `#e5e7eb`, `#9ca3af`) も削除すること

#### 3.3 検証

1. **ビルドを実行:**
   ```bash
   cd /home/neko/workspaces/design/packages/tokens
   pnpm build
   ```

2. **生成されたCSSを確認:**
   ```bash
   cat build/css/pattern2/switch.css | grep "var(--"
   ```

3. **テストを実行:**
   ```bash
   cd /home/neko/workspaces/design/packages/core
   pnpm test -- switch.test.ts
   ```

4. **ビジュアルチェック:**
   - 開発サーバーで確認
   - 全ての状態をチェック (デフォルト、チェック済み、無効、エラー)
   - ライトモード/ダークモードを切り替えて確認

#### 3.4 コミット

```bash
git add .
git commit -m "refactor(tokens): Switchコンポーネントをセマンティックトークンに移行

- var(--color-neutral-300, #d1d5db) → var(--background-tertiary)
- var(--color-neutral-200, #e5e7eb) → var(--background-secondary)
- var(--color-neutral-400, #9ca3af) → var(--border-hover)

6箇所のレガシートークン参照を削除
ハードコードされた16進数フォールバックを削除"
```

---

### ステップ4: Breadcrumb コンポーネント移行 (1時間)

#### 4.1 現状確認

まず、Breadcrumbコンポーネントが実際にレガシートークンを使用しているか確認:

```bash
cd /home/neko/workspaces/design/packages/tokens
cat build/js/styles/breadcrumb.js | grep "color-gray\|color-neutral"
```

#### 4.2 トークン置換

レビュードキュメントによると4箇所のレガシートークン参照があるはずです。
実際の内容を確認してから、Pagination/Switchと同様のパターンで置換します。

**一般的なマッピング:**
- `--color-gray-*` → 適切なセマンティックトークン
- ハードコードされた16進数フォールバックを削除

#### 4.3 検証

1. ビルド実行
2. 生成されたCSSを確認
3. テスト実行
4. ビジュアルチェック (ライト/ダークモード)

#### 4.4 コミット

```bash
git add .
git commit -m "refactor(tokens): Breadcrumbコンポーネントをセマンティックトークンに移行

[具体的な変更内容を記載]

4箇所のレガシートークン参照を削除"
```

---

### ステップ5: 統合テストと検証 (1時間)

#### 5.1 全テストを実行

```bash
# Coreパッケージの全テスト
cd /home/neko/workspaces/design/packages/core
pnpm test

# Tokensパッケージの全テスト
cd /home/neko/workspaces/design/packages/tokens
pnpm test
```

#### 5.2 ビルド検証

```bash
# 全パッケージをビルド
cd /home/neko/workspaces/design
pnpm build
```

#### 5.3 ビジュアルリグレッションチェック

**チェックリスト (各コンポーネント):**

- [ ] ライトモードの外観
- [ ] ダークモードの外観
- [ ] ホバー状態
- [ ] アクティブ状態
- [ ] 無効状態
- [ ] フォーカス状態
- [ ] 全バリアント (該当する場合)
- [ ] ボーダーの可視性
- [ ] テキストの可読性
- [ ] コントラスト比 (WCAG AA)

#### 5.4 テーマ切り替えテスト

1. ブラウザでコンポーネントを開く
2. テーマを切り替え: ライト → ダーク
3. スムーズな遷移を確認
4. 全カラーが正しく更新されることを確認
5. テーマを切り替え: ダーク → ライト
6. ビジュアルアーティファクトがないことを確認

---

### ステップ6: プルリクエスト作成 (15分)

#### 6.1 最終コミット

全ての変更が完了したら、最終的な確認コミット:

```bash
git add .
git commit -m "test(tokens): Phase 1移行後のテスト検証を完了

- Pagination, Switch, Breadcrumbの全テストが成功
- ライト/ダークモード両方で動作確認
- ビジュアルリグレッションなし"
```

#### 6.2 プルリクエスト作成

```bash
git push -u origin refactor/token-migration-phase1
gh pr create --title "Phase 1: 3コンポーネントのセマンティックトークン移行" --body "$(cat <<'EOF'
## 概要

Phase 1として、以下の3コンポーネントをレガシートークンからセマンティックトークンに移行しました:

1. **Pagination** - 8箇所のレガシートークン参照を削除
2. **Switch** - 6箇所のレガシートークン参照を削除
3. **Breadcrumb** - 4箇所のレガシートークン参照を削除

## 変更内容

### トークン置換パターン

- `var(--color-gray-300)` → `var(--border-default)`
- `var(--color-gray-700)` → `var(--foreground-primary)`
- `var(--color-gray-50)` → `var(--background-tertiary)`
- `var(--color-gray-500)` → `var(--foreground-tertiary)`
- `var(--color-gray-600)` → `var(--foreground-secondary)`
- `var(--color-neutral-300, #d1d5db)` → `var(--background-tertiary)`
- `var(--color-neutral-200, #e5e7eb)` → `var(--background-secondary)`
- `var(--color-neutral-400, #9ca3af)` → `var(--border-hover)`

### 削除事項

- 全てのハードコードされた16進数フォールバック
- 18箇所のレガシートークン参照

## テスト

- ✅ 全ユニットテストが成功
- ✅ ビルドが成功
- ✅ ライトモードでのビジュアルチェック完了
- ✅ ダークモードでのビジュアルチェック完了
- ✅ テーマ切り替えが正常に動作

## 関連ドキュメント

- `/notes/19_Core_Package_Comprehensive_Review.md` - 包括的レビュー
- `/notes/20_Core_Package_Remediation_Plan.md` - 修正計画
- `/notes/21_Core_Package_Current_Status.md` - 現状分析
- `/notes/22_Phase1_Migration_Plan.md` - Phase 1作業計画

## 次のステップ

- [ ] Phase 2: Slider/Color-Pickerのインラインスタイル抽出
- [ ] Phase 3: 残りコンポーネントの検証と移行

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

---

## トラブルシューティング

### 問題1: ソースファイルが見つからない

**症状:** tokensパッケージ内でコンポーネントのソースファイルが見つからない

**解決策:**
1. `/packages/tokens/src/` 全体を検索
2. コンポーネント名でgrep検索
3. ビルドスクリプトを確認してファイル生成ロジックを理解

### 問題2: ビルド後もレガシートークンが残る

**症状:** ソースを変更したがビルド出力に反映されない

**解決策:**
1. ビルドキャッシュをクリア: `pnpm clean && pnpm build`
2. node_modules を再インストール: `pnpm install`
3. ビルドスクリプトのロジックを確認

### 問題3: テストが失敗する

**症状:** トークン変更後にテストが失敗

**解決策:**
1. テストがハードコードされたカラー値をチェックしている可能性
2. テストスナップショットを更新: `pnpm test -- -u`
3. テストロジックを確認して必要に応じて修正

### 問題4: ビジュアルリグレッション

**症状:** トークン変更後に見た目が変わってしまう

**解決策:**
1. セマンティックトークンマッピングが正しいか確認
2. 元のレガシートークンの実際の値を確認
3. セマンティックトークンの定義を確認
4. 必要に応じてデザイナーに相談

---

## チェックリスト

### Phase 1完了チェックリスト

- [ ] ブランチ作成: `refactor/token-migration-phase1`
- [ ] Pagination移行完了
  - [ ] ソースファイル特定
  - [ ] 8箇所のトークン置換
  - [ ] ビルド成功
  - [ ] テスト成功
  - [ ] ビジュアルチェック完了
  - [ ] コミット作成
- [ ] Switch移行完了
  - [ ] ソースファイル特定
  - [ ] 6箇所のトークン置換
  - [ ] ハードコードされたフォールバック削除
  - [ ] ビルド成功
  - [ ] テスト成功
  - [ ] ビジュアルチェック完了
  - [ ] コミット作成
- [ ] Breadcrumb移行完了
  - [ ] 現状確認
  - [ ] レガシートークン置換
  - [ ] ビルド成功
  - [ ] テスト成功
  - [ ] ビジュアルチェック完了
  - [ ] コミット作成
- [ ] 統合テスト完了
  - [ ] 全テスト成功
  - [ ] 全ビルド成功
  - [ ] ビジュアルリグレッションなし
  - [ ] テーマ切り替え動作確認
- [ ] プルリクエスト作成
- [ ] レビュー対応
- [ ] mainにマージ

---

**ドキュメントバージョン:** 1.0
**作成日:** 2025-12-16
**作成者:** Claude Code
**ステータス:** 実行準備完了
