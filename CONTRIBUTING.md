# hidearea-design への貢献

hidearea-design への貢献に興味を持っていただき、ありがとうございます！このドキュメントは、貢献のためのガイドラインと手順を提供します。

## 目次

- [行動規範](#行動規範)
- [はじめに](#はじめに)
- [開発ワークフロー](#開発ワークフロー)
- [プロジェクト構造](#プロジェクト構造)
- [コーディング規約](#コーディング規約)
- [テスト](#テスト)
- [変更の提出](#変更の提出)
- [リリースプロセス](#リリースプロセス)

## 行動規範

このプロジェクトは、すべての貢献者にとって歓迎的で包括的な環境を確保するための行動規範に従います。すべてのやり取りにおいて、敬意を持ち、プロフェッショナルであることをお願いします。

## はじめに

### 必要要件

- Node.js 18.x 以上
- pnpm 10.x 以上
- Git

### セットアップ

1. GitHub でリポジトリをフォーク
2. ローカルにフォークをクローン：

```bash
git clone https://github.com/YOUR_USERNAME/hidearea-design.git
cd hidearea-design
```

3. 依存関係をインストール：

```bash
pnpm install
```

4. すべてのパッケージをビルド：

```bash
pnpm build
```

5. すべてが動作することを確認するためテストを実行：

```bash
pnpm test
```

## 開発ワークフロー

### ブランチの作成

機能やバグ修正のために新しいブランチを作成：

```bash
git checkout -b feature/your-feature-name
# または
git checkout -b fix/your-bug-fix
```

ブランチ命名規則：

- `feature/` - 新機能
- `fix/` - バグ修正
- `docs/` - ドキュメントの変更
- `test/` - テストの追加または変更
- `refactor/` - コードのリファクタリング

### 開発コマンド

```bash
# 開発モード開始（ウォッチモード）
pnpm dev

# テスト実行
pnpm test

# UI付きテスト実行
pnpm --filter @hidearea-design/core test:ui

# Lint実行
pnpm lint

# すべてのパッケージをビルド
pnpm build

# コードフォーマット
pnpm format
```

### 特定のパッケージで作業

```bash
# core パッケージで作業
cd packages/core
pnpm dev

# 特定パッケージのテスト実行
pnpm --filter @hidearea-design/core test

# 特定パッケージをビルド
pnpm --filter @hidearea-design/react build
```

## プロジェクト構造

```
hidearea-design/
├── packages/
│   ├── core/           # Web Components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── react/          # React ラッパー
│   ├── vue/            # Vue ラッパー
│   ├── tokens/         # デザイントークン
│   ├── storybook/      # コンポーネントドキュメント
│   └── docs/           # VitePress ドキュメント
├── docs/               # Markdown ドキュメント
├── .changeset/         # バージョニング用 Changesets
└── .github/            # GitHub Actions ワークフロー
```

## コーディング規約

### TypeScript

- すべてのコードに TypeScript を使用
- 適切な型定義を提供
- 可能な限り `any` 型を避ける
- パブリック API にはインターフェースを使用

### Web Components

- Web Components のベストプラクティスに従う
- カプセル化には Shadow DOM を使用
- テーマ用の CSS カスタムプロパティを提供
- 適切な ARIA 属性を含める

コンポーネント構造の例：

```typescript
export class HaMyComponent extends HTMLElement {
  static get observedAttributes() {
    return ["prop1", "prop2"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.render();
  }

  // パブリック API
  get prop1(): string {
    return this.getAttribute("prop1") || "";
  }

  set prop1(value: string) {
    this.setAttribute("prop1", value);
  }

  // メソッド
  private render() {
    // レンダリングロジック
  }
}
```

### React ラッパー

```typescript
export const MyComponent = forwardRef<MyComponentRef, MyComponentProps>(
  ({ prop1, prop2, children, ...props }, ref) => {
    const elementRef = useRef<HaMyComponent>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      // その他のメソッド
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      element.prop1 = prop1;
      element.prop2 = prop2;
    }, [prop1, prop2]);

    return (
      <ha-my-component ref={elementRef} {...props}>
        {children}
      </ha-my-component>
    );
  }
);
```

### Vue ラッパー

```vue
<template>
  <ha-my-component
    ref="componentRef"
    :prop1="prop1"
    :prop2="prop2"
    @custom-event="handleEvent"
  >
    <slot />
  </ha-my-component>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import "@hidearea-design/core";

interface Props {
  prop1?: string;
  prop2?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  prop1: "default",
  prop2: false,
});

const componentRef = ref<HTMLElement | null>(null);

watch(
  () => props.prop1,
  (newValue) => {
    if (componentRef.value) {
      (componentRef.value as any).prop1 = newValue;
    }
  },
);
</script>
```

### コードスタイル

- ESLint と Prettier を使用（プロジェクトで設定済み）
- インデントは2スペース
- 文字列にはシングルクォート
- セミコロン必須
- 複数行のオブジェクト/配列には末尾カンマ

フォーマット実行：

```bash
pnpm format
```

## テスト

### テストの作成

すべての新機能とバグ修正にはテストを含める必要があります。

#### ユニットテスト（Core パッケージ）

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { HaMyComponent } from "./my-component";

describe("HaMyComponent", () => {
  let component: HaMyComponent;

  beforeEach(() => {
    component = document.createElement("ha-my-component") as HaMyComponent;
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it("デフォルトプロパティでレンダリングする", () => {
    expect(component.prop1).toBe("default");
  });

  it("プロパティ変更時に更新する", () => {
    component.prop1 = "new value";
    expect(component.prop1).toBe("new value");
  });
});
```

#### React コンポーネントテスト

```typescript
import { render } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('プロパティ付きでレンダリングする', () => {
    render(<MyComponent prop1="test">内容</MyComponent>);
    const element = document.querySelector('ha-my-component');
    expect(element).toBeInTheDocument();
  });
});
```

### テストの実行

```bash
# すべてのテスト実行
pnpm test

# カバレッジ付きでテスト実行
pnpm test:coverage

# ウォッチモードでテスト実行
pnpm --filter @hidearea-design/core test

# 特定のテストファイルを実行
pnpm --filter @hidearea-design/core test src/components/button/button.test.ts
```

#### Tokensパッケージのテスト

Tokensパッケージには、ビルドシステムとドキュメントの品質を保証する包括的なテストスイートがあります：

```bash
# Tokensパッケージのテスト実行
pnpm --filter @hidearea-design/tokens test

# UIダッシュボード付きでテスト実行
pnpm --filter @hidearea-design/tokens test:ui

# 特定のテストスイートを実行
pnpm --filter @hidearea-design/tokens test tests/build.test.js
pnpm --filter @hidearea-design/tokens test tests/css-validation.test.js
pnpm --filter @hidearea-design/tokens test tests/token-consistency.test.js
pnpm --filter @hidearea-design/tokens test tests/documentation-consistency.test.js
```

**Tokensテストの種類:**

1. **ビルドシステムテスト** (`tests/build.test.js`)
   - 4つのビルドパターンの生成を検証
   - ファイル数とディレクトリ構造を確認
   - デザイントークンの出力を検証

2. **CSS検証テスト** (`tests/css-validation.test.js`)
   - CSS構文の正しさを検証
   - セレクタの使用（`:host` vs `.ha-*`）を確認
   - デザイントークン参照を検証

3. **トークン整合性テスト** (`tests/token-consistency.test.js`)
   - トークン参照の解決可能性を確認
   - 循環参照を検出
   - ライト/ダークテーマの対称性を検証

4. **ドキュメント整合性テスト** (`tests/documentation-consistency.test.js`)
   - コンポーネントドキュメントの存在を確認
   - Pattern 2実装例を検証
   - CSS実装との整合性を確認

**新しいコンポーネントを追加する場合:**

1. CSSファイルを `src/css/components/` に追加
2. `docs/components/` に対応するMarkdownドキュメントを作成
3. Pattern 2の実装例をドキュメントに含める
4. `.ha-{component}` ラッパークラスを使用
5. テストを実行して整合性を確認：
   ```bash
   pnpm --filter @hidearea-design/tokens build
   pnpm --filter @hidearea-design/tokens test
   ```

### カバレッジ要件

- **Core/React/Vue**: すべてのメトリクス（行、関数、分岐、ステートメント）で最低80%のカバレッジ
- **Tokens**: ビルド出力検証テストのため、カバレッジ要件は適用されません
- すべての新しいコードにはテストを含める
- 既存のコードを変更する場合はテストを更新

## 変更の提出

### コミットメッセージ

Conventional Commits 仕様に従う：

```
type(scope): description

[オプション本文]

[オプションフッター]
```

タイプ：

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: コードスタイル変更（フォーマットなど）
- `refactor`: コードのリファクタリング
- `test`: テストの追加または変更
- `chore`: メンテナンスタスク

例：

```
feat(button): ローディング状態を追加
fix(input): バリデーションエラー表示を修正
docs: インストールガイドを更新
test(checkbox): 不確定状態のテストを追加
```

### プルリクエストの作成

1. すべてのテストが通ることを確認：

```bash
pnpm test
pnpm lint
pnpm build
```

2. changeset を作成（バージョンバンプ用）：

```bash
pnpm changeset
```

バージョン変更するパッケージを選択し、変更の要約を提供します。

3. ブランチをプッシュ：

```bash
git push origin feature/your-feature-name
```

4. GitHub でプルリクエストを作成：
   - 明確なタイトルと説明
   - 関連する issue を参照
   - UI変更のスクリーンショット/GIF
   - テスト結果

### プルリクエストチェックリスト

- [ ] コードがプロジェクトのコーディング規約に従っている
- [ ] テストが追加/更新され、通過している
- [ ] ドキュメントが更新されている
- [ ] Changeset が作成されている（該当する場合）
- [ ] Lint エラーがない
- [ ] すべての CI チェックが通過している

## リリースプロセス

<<<<<<< HEAD
Releases are automated using Changesets and GitHub Actions:

### For Contributors
=======
リリースは Changesets を使用して自動化されています：
>>>>>>> aa11b29ebaa6ea0f39db30688b5f7e0bd90ab3b7

1. 開発中に changesets を作成：

```bash
pnpm changeset
```

<<<<<<< HEAD
Follow the prompts to:
- Select which packages have changed (use space to select, enter to confirm)
- Choose the version bump type:
  - `major`: Breaking changes (1.0.0 → 2.0.0)
  - `minor`: New features (1.0.0 → 1.1.0)
  - `patch`: Bug fixes (1.0.0 → 1.0.1)
- Write a summary of changes (this appears in CHANGELOG.md)

2. Commit the changeset file:

```bash
git add .changeset/
git commit -m "chore: add changeset for release"
```

3. Include the changeset in your pull request

### Automated Release Flow

When changesets are merged to main:

1. **GitHub Actions** detects changesets and creates a "Version Packages" PR containing:
   - Updated package.json versions
   - Generated CHANGELOG.md entries
   - All accumulated changesets

2. **Review** the Version Packages PR to ensure:
   - Version bumps are correct
   - Changelog entries are accurate
   - All packages are properly updated

3. **Merge** the Version Packages PR

4. **Automatic Publication**:
   - GitHub Actions builds all packages
   - Runs validation checks
   - Publishes to npm registry
   - Creates GitHub releases
   - Tags the repository

### Pre-publication Validation

The MCP server package includes automatic validation before publishing:

```bash
# Validates presence of:
# - build/index.js (compiled code)
# - build/index.d.ts (TypeScript definitions)
# - README.md (documentation)
# - LICENSE (MIT license)
```
=======
2. Release ワークフローが：
   - "Version Packages" PR を作成
   - package.json のバージョンを更新
   - CHANGELOG.md エントリーを生成

3. "Version Packages" PR をマージして npm パブリッシュをトリガー
>>>>>>> aa11b29ebaa6ea0f39db30688b5f7e0bd90ab3b7

### 手動リリース（メンテナーのみ）

If automated release fails or manual intervention is needed:

```bash
<<<<<<< HEAD
# 1. Update versions based on changesets
pnpm changeset version

# 2. Review changes in package.json and CHANGELOG.md

# 3. Commit version changes
git add .
git commit -m "chore: version packages"

# 4. Build all packages
pnpm build

# 5. Publish to npm (requires NPM_TOKEN)
=======
# バージョン更新
pnpm changeset version

# パッケージをビルド
pnpm build

# npm に公開
>>>>>>> aa11b29ebaa6ea0f39db30688b5f7e0bd90ab3b7
pnpm release

# 6. Create Git tag
git tag @hidearea-design/mcp-server@0.2.0
git push --tags
```

### Release Checklist

Before merging Version Packages PR:

- [ ] All CI checks passing
- [ ] Version bumps are appropriate
- [ ] CHANGELOG entries are clear and accurate
- [ ] Documentation is up to date
- [ ] No breaking changes in minor/patch releases
- [ ] README reflects new features (if applicable)

### Emergency Hotfix Process

For critical bugs requiring immediate release:

```bash
# 1. Create hotfix branch from main
git checkout -b hotfix/critical-bug

# 2. Fix the bug and add tests

# 3. Create changeset (patch version)
pnpm changeset
# Select: patch

# 4. Push and create PR
git push origin hotfix/critical-bug

# 5. Fast-track review and merge

# 6. Automated release will follow
```

## 追加リソース

- [コンポーネント API ドキュメント](./docs/ja/components/README.md)
- [使用例](./docs/ja/guides/examples.md)
- [プロジェクトノート](./notes/README.md)

## 質問がありますか？

質問がある場合は、お気軽に：

- GitHub で issue を開く
- GitHub Discussions でディスカッションを開始
- メンテナーに連絡

貢献いただきありがとうございます！
