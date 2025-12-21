# @hidearea-design/plugin-system

拡張可能なプラグインシステムで、Hidearea Design Systemにカスタムコンポーネント、テーマ、機能を追加できます。

## 特徴

- **カスタムコンポーネント**: Web Componentsを登録して新しいUI要素を追加
- **カスタムテーマ**: 独自のデザイントークンとスタイルでテーマを作成
- **トークン拡張**: 既存のデザイントークンを拡張
- **ライフサイクル管理**: プラグインのインストール、アクティブ化、非アクティブ化、アンインストール
- **依存関係管理**: プラグイン間の依存関係をサポート
- **イベントシステム**: プラグイン間の通信用イベントバス
- **TypeScript完全サポート**: 完全な型定義

## インストール

```bash
pnpm add @hidearea-design/plugin-system
```

## 基本的な使い方

### プラグインの作成

```typescript
import { createPlugin } from '@hidearea-design/plugin-system';

export const myPlugin = createPlugin({
  metadata: {
    id: 'my-plugin',
    name: 'My Plugin',
    version: '1.0.0',
    description: 'カスタムプラグインの説明',
    author: 'Your Name',
  },

  install(context) {
    context.logger.info('プラグインがインストールされました');
  },

  onActivate(context) {
    context.logger.info('プラグインがアクティブ化されました');
  },

  onDeactivate(context) {
    context.logger.info('プラグインが非アクティブ化されました');
  },
});
```

### プラグインの登録と使用

```typescript
import { PluginManager } from '@hidearea-design/plugin-system';
import { myPlugin } from './my-plugin';

const manager = PluginManager.getInstance();

// プラグインを登録してインストール
await manager.register(myPlugin, {
  autoActivate: true, // 自動的にアクティブ化
});

// プラグインをアクティブ化
await manager.activate('my-plugin');

// プラグインを非アクティブ化
await manager.deactivate('my-plugin');

// プラグインをアンインストール
await manager.uninstall('my-plugin');
```

## カスタムコンポーネントプラグイン

カスタムWeb Componentsを追加するプラグインの例:

```typescript
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { createPlugin } from '@hidearea-design/plugin-system';

class RatingComponent extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 5;
  @property({ type: Boolean }) readonly = false;

  static styles = css`
    .rating {
      display: inline-flex;
      gap: 4px;
    }
    .star {
      cursor: pointer;
      font-size: 24px;
      color: var(--ha-color-text-tertiary);
      transition: color 0.2s;
    }
    .star.filled {
      color: var(--ha-color-warning);
    }
  `;

  render() {
    return html`
      <div class="rating">
        ${Array.from({ length: this.max }, (_, i) => i + 1).map(
          star => html`
            <span
              class="star ${star <= this.value ? 'filled' : ''}"
              @click=${() => !this.readonly && this._handleClick(star)}
            >
              ${star <= this.value ? '★' : '☆'}
            </span>
          `
        )}
      </div>
    `;
  }

  private _handleClick(star: number) {
    this.value = star;
    this.dispatchEvent(new CustomEvent('change', { detail: { value: star } }));
  }
}

export const ratingPlugin = createPlugin({
  metadata: {
    id: 'rating-component',
    name: 'Rating Component Plugin',
    version: '1.0.0',
    description: 'スター評価コンポーネント',
  },

  install(context) {
    context.registerComponent('ha-rating', RatingComponent);
    context.logger.info('Rating component registered');
  },
});
```

使用方法:

```html
<ha-rating value="3" max="5"></ha-rating>
```

## カスタムテーマプラグイン

独自のテーマを追加するプラグインの例:

```typescript
import { createPlugin, ThemeDefinition } from '@hidearea-design/plugin-system';

const oceanTheme: ThemeDefinition = {
  name: 'ocean',
  tokens: {
    // プライマリカラー - 青系
    '--ha-color-primary': '#0077be',
    '--ha-color-primary-hover': '#005fa3',
    '--ha-color-primary-active': '#004d8a',

    // セカンダリカラー - 水色系
    '--ha-color-secondary': '#00a8e8',
    '--ha-color-secondary-hover': '#0096d1',
    '--ha-color-secondary-active': '#0084ba',

    // 背景カラー - 涼しげな色調
    '--ha-color-background-primary': '#f0f8ff',
    '--ha-color-background-secondary': '#e3f2fd',
    '--ha-color-background-tertiary': '#d1ecf9',
  },
  dark: {
    tokens: {
      '--ha-color-primary': '#29b6f6',
      '--ha-color-secondary': '#4fc3f7',
      '--ha-color-background-primary': '#0a1929',
      '--ha-color-background-secondary': '#132f4c',
      '--ha-color-background-tertiary': '#1e4976',
    },
  },
  styles: `
    :root[data-theme="ocean"] {
      --ha-shadow-sm: 0 1px 2px 0 rgba(0, 119, 190, 0.05);
      --ha-shadow-md: 0 4px 6px -1px rgba(0, 119, 190, 0.1);
      --ha-shadow-lg: 0 10px 15px -3px rgba(0, 119, 190, 0.15);
    }
  `,
};

export const oceanThemePlugin = createPlugin({
  metadata: {
    id: 'ocean-theme',
    name: 'Ocean Theme Plugin',
    version: '1.0.0',
    description: '爽やかな青系のOceanテーマ',
  },

  install(context) {
    context.registerTheme('ocean', oceanTheme);
    context.logger.info('Ocean theme registered');
  },

  onActivate(context) {
    document.documentElement.setAttribute('data-theme', 'ocean');
    context.logger.info('Ocean theme activated');
  },

  onDeactivate(context) {
    document.documentElement.removeAttribute('data-theme');
    context.logger.info('Ocean theme deactivated');
  },
});
```

## トークン拡張プラグイン

既存のデザイントークンを拡張するプラグイン:

```typescript
import { createPlugin } from '@hidearea-design/plugin-system';

export const customTokensPlugin = createPlugin({
  metadata: {
    id: 'custom-tokens',
    name: 'Custom Tokens Plugin',
    version: '1.0.0',
  },

  install(context) {
    // カスタムトークンを追加
    context.extendTokens({
      '--custom-gradient-sunset': 'linear-gradient(135deg, #ff6b35 0%, #ff8a80 100%)',
      '--custom-gradient-ocean': 'linear-gradient(135deg, #0077be 0%, #00a8e8 100%)',
      '--custom-spacing-xl': '3rem',
      '--custom-spacing-2xl': '4rem',
    });

    // カスタムスタイルを追加
    context.addGlobalStyles(`
      .gradient-sunset {
        background: var(--custom-gradient-sunset);
      }
      .gradient-ocean {
        background: var(--custom-gradient-ocean);
      }
    `);
  },
});
```

## イベントシステム

プラグイン間で通信するためのイベントシステム:

```typescript
// プラグインA: イベントを発火
export const pluginA = createPlugin({
  metadata: { id: 'plugin-a', name: 'Plugin A', version: '1.0.0' },

  install(context) {
    // イベントを発火
    context.emit('theme-changed', { theme: 'dark' });
  },
});

// プラグインB: イベントをリッスン
export const pluginB = createPlugin({
  metadata: { id: 'plugin-b', name: 'Plugin B', version: '1.0.0' },

  install(context) {
    // イベントをリッスン
    context.on('theme-changed', (data) => {
      console.log('Theme changed to:', data.theme);
    });
  },
});
```

## 依存関係管理

他のプラグインに依存するプラグイン:

```typescript
export const dependentPlugin = createPlugin({
  metadata: {
    id: 'dependent-plugin',
    name: 'Dependent Plugin',
    version: '1.0.0',
    dependencies: ['ocean-theme'], // ocean-themeプラグインが必要
  },

  install(context) {
    // ocean-themeがインストールされていることが保証される
    context.logger.info('Dependent plugin installed');
  },
});

// 使用方法
const manager = PluginManager.getInstance();

// 依存関係がない場合はエラー
await manager.register(dependentPlugin); // Error: Plugin depends on "ocean-theme"

// 正しい順序で登録
await manager.register(oceanThemePlugin);
await manager.register(dependentPlugin); // OK
```

## API リファレンス

### PluginManager

プラグインのライフサイクルを管理するシングルトンクラス。

```typescript
class PluginManager {
  static getInstance(): PluginManager;

  register(plugin: Plugin, options?: PluginOptions): Promise<void>;
  install(pluginId: string): Promise<void>;
  uninstall(pluginId: string): Promise<void>;
  activate(pluginId: string): Promise<void>;
  deactivate(pluginId: string): Promise<void>;

  getPlugin(pluginId: string): PluginEntry | undefined;
  getAllPlugins(): Map<string, PluginEntry>;
  isInstalled(pluginId: string): boolean;
  isActive(pluginId: string): boolean;
}
```

### PluginContext

プラグイン内で使用できるコンテキストAPI。

```typescript
interface PluginContext {
  metadata: PluginMetadata;
  options: PluginOptions;
  logger: PluginLogger;

  registerComponent(name: string, constructor: CustomElementConstructor): void;
  registerTheme(name: string, theme: ThemeDefinition): void;
  extendTokens(tokens: Record<string, string>): void;
  addGlobalStyles(styles: string): void;

  on(event: string, handler: (...args: unknown[]) => void): void;
  off(event: string, handler: (...args: unknown[]) => void): void;
  emit(event: string, ...args: unknown[]): void;
}
```

### Plugin Interface

プラグインが実装する必要があるインターフェース。

```typescript
interface Plugin {
  metadata: PluginMetadata;

  install(context: PluginContext): void | Promise<void>;

  onInstall?(context: PluginContext): void | Promise<void>;
  onUninstall?(context: PluginContext): void | Promise<void>;
  onActivate?(context: PluginContext): void | Promise<void>;
  onDeactivate?(context: PluginContext): void | Promise<void>;
}
```

### PluginMetadata

プラグインのメタデータ。

```typescript
interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  dependencies?: string[];
}
```

### ThemeDefinition

カスタムテーマの定義。

```typescript
interface ThemeDefinition {
  name: string;
  tokens: Record<string, string>;
  dark?: {
    tokens: Record<string, string>;
    styles?: string;
  };
  styles?: string;
}
```

## ベストプラクティス

### 1. プラグインIDは一意にする

```typescript
// ✓ Good - スコープ付きID
metadata: {
  id: '@mycompany/custom-theme',
  name: 'Custom Theme',
}

// ✗ Bad - 汎用的すぎるID
metadata: {
  id: 'theme',
  name: 'Theme',
}
```

### 2. クリーンアップを適切に実装

```typescript
export const myPlugin = createPlugin({
  metadata: { id: 'my-plugin', name: 'My Plugin', version: '1.0.0' },

  install(context) {
    // イベントリスナーを追加
    const handler = () => console.log('Event fired');
    context.on('custom-event', handler);
  },

  onDeactivate(context) {
    // クリーンアップ - イベントリスナーを削除
    context.off('custom-event', handler);
  },
});
```

### 3. エラーハンドリング

```typescript
export const myPlugin = createPlugin({
  metadata: { id: 'my-plugin', name: 'My Plugin', version: '1.0.0' },

  async install(context) {
    try {
      // 何らかの処理
      await someAsyncOperation();
      context.logger.info('Successfully installed');
    } catch (error) {
      context.logger.error('Installation failed:', error);
      throw error;
    }
  },
});
```

### 4. セマンティックバージョニング

```typescript
// メジャーバージョン: 破壊的変更
metadata: { version: '2.0.0' }

// マイナーバージョン: 新機能追加
metadata: { version: '1.1.0' }

// パッチバージョン: バグ修正
metadata: { version: '1.0.1' }
```

## 例

完全な例は `examples/` ディレクトリを参照してください:

- **custom-component-plugin.ts**: 評価コンポーネントの例
- **custom-theme-plugin.ts**: Sunsetテーマの例

## ライセンス

このパッケージはHidearea Design Systemモノレポの一部です。

## 関連パッケージ

- [@hidearea-design/core](../core) - コアコンポーネント
- [@hidearea-design/tokens](../tokens) - デザイントークン
- [@hidearea-design/react](../react) - Reactラッパー
