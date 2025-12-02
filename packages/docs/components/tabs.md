# Tabs

タブコンポーネント。キーボードナビゲーションと動的タブをサポートします。

## 基本的な使い方

```html
<ha-tabs>
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2">タブ2</ha-tab-item>
  <ha-tab-item value="tab3">タブ3</ha-tab-item>
</ha-tabs>

<ha-tab-panel value="tab1">
  <p>タブ1のコンテンツ</p>
</ha-tab-panel>

<ha-tab-panel value="tab2">
  <p>タブ2のコンテンツ</p>
</ha-tab-panel>

<ha-tab-panel value="tab3">
  <p>タブ3のコンテンツ</p>
</ha-tab-panel>
```

## バリアント

2種類のバリアントが利用可能です：

### Default

```html
<ha-tabs variant="default">
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2">タブ2</ha-tab-item>
</ha-tabs>
```

### Pills

```html
<ha-tabs variant="pills">
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2">タブ2</ha-tab-item>
</ha-tabs>
```

## 無効化

```html
<ha-tabs>
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2" disabled>タブ2（無効）</ha-tab-item>
  <ha-tab-item value="tab3">タブ3</ha-tab-item>
</ha-tabs>
```

## プロパティ

### ha-tabs

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `variant` | `'default' \| 'pills'` | `'default'` | バリアント |
| `value` | `string` | `''` | 選択中のタブ値 |

### ha-tab-item

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `value` | `string` | `''` | タブの値 |
| `disabled` | `boolean` | `false` | 無効状態 |

### ha-tab-panel

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `value` | `string` | `''` | 対応するタブの値 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `tab-change` | タブが変更された時 | `CustomEvent<string>` |

## React

```tsx
import { Tabs, TabItem, TabPanel } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <>
      <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
        <TabItem value="tab1">タブ1</TabItem>
        <TabItem value="tab2">タブ2</TabItem>
        <TabItem value="tab3">タブ3</TabItem>
      </Tabs>

      <TabPanel value="tab1" active={activeTab === 'tab1'}>
        <p>タブ1のコンテンツ</p>
      </TabPanel>

      <TabPanel value="tab2" active={activeTab === 'tab2'}>
        <p>タブ2のコンテンツ</p>
      </TabPanel>

      <TabPanel value="tab3" active={activeTab === 'tab3'}>
        <p>タブ3のコンテンツ</p>
      </TabPanel>
    </>
  );
}
```

## Vue

```vue
<template>
  <div>
    <HaTabs v-model="activeTab">
      <HaTabItem value="tab1">タブ1</HaTabItem>
      <HaTabItem value="tab2">タブ2</HaTabItem>
      <HaTabItem value="tab3">タブ3</HaTabItem>
    </HaTabs>

    <HaTabPanel value="tab1" :active="activeTab === 'tab1'">
      <p>タブ1のコンテンツ</p>
    </HaTabPanel>

    <HaTabPanel value="tab2" :active="activeTab === 'tab2'">
      <p>タブ2のコンテンツ</p>
    </HaTabPanel>

    <HaTabPanel value="tab3" :active="activeTab === 'tab3'">
      <p>タブ3のコンテンツ</p>
    </HaTabPanel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Tabs as HaTabs,
  TabItem as HaTabItem,
  TabPanel as HaTabPanel,
} from '@hidearea-design/vue';

const activeTab = ref('tab1');
</script>
```

## 使用例

### シンプルなタブ

```html
<ha-tabs value="profile">
  <ha-tab-item value="profile">プロフィール</ha-tab-item>
  <ha-tab-item value="settings">設定</ha-tab-item>
  <ha-tab-item value="notifications">通知</ha-tab-item>
</ha-tabs>

<ha-tab-panel value="profile">
  <ha-card>
    <h3>プロフィール</h3>
    <p>ユーザーのプロフィール情報</p>
  </ha-card>
</ha-tab-panel>

<ha-tab-panel value="settings">
  <ha-card>
    <h3>設定</h3>
    <p>アカウント設定</p>
  </ha-card>
</ha-tab-panel>

<ha-tab-panel value="notifications">
  <ha-card>
    <h3>通知</h3>
    <p>通知設定</p>
  </ha-card>
</ha-tab-panel>
```

### アイコン付きタブ

```html
<ha-tabs variant="pills">
  <ha-tab-item value="home">🏠 ホーム</ha-tab-item>
  <ha-tab-item value="profile">👤 プロフィール</ha-tab-item>
  <ha-tab-item value="settings">⚙️ 設定</ha-tab-item>
</ha-tabs>
```

### カウンター付きタブ

```html
<ha-tabs>
  <ha-tab-item value="all">
    すべて
    <ha-badge variant="secondary" size="sm" style="margin-left: 4px;">24</ha-badge>
  </ha-tab-item>
  <ha-tab-item value="unread">
    未読
    <ha-badge variant="error" size="sm" style="margin-left: 4px;">5</ha-badge>
  </ha-tab-item>
  <ha-tab-item value="archived">
    アーカイブ
    <ha-badge variant="secondary" size="sm" style="margin-left: 4px;">19</ha-badge>
  </ha-tab-item>
</ha-tabs>
```

### 動的タブ

```tsx
import { Tabs, TabItem, TabPanel, Button, Stack } from '@hidearea-design/react';
import { useState } from 'react';

function DynamicTabs() {
  const [tabs, setTabs] = useState([
    { id: '1', label: 'タブ1', content: 'コンテンツ1' },
    { id: '2', label: 'タブ2', content: 'コンテンツ2' },
  ]);
  const [activeTab, setActiveTab] = useState('1');

  const addTab = () => {
    const newId = String(tabs.length + 1);
    setTabs([...tabs, {
      id: newId,
      label: `タブ${newId}`,
      content: `コンテンツ${newId}`,
    }]);
    setActiveTab(newId);
  };

  const removeTab = (id: string) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <Stack direction="vertical" gap="3">
      <Stack direction="horizontal" gap="2" align="center">
        <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
          {tabs.map(tab => (
            <TabItem key={tab.id} value={tab.id}>
              {tab.label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                style={{ marginLeft: '8px', cursor: 'pointer' }}
              >
                ×
              </button>
            </TabItem>
          ))}
        </Tabs>
        <Button variant="outline" size="sm" onClick={addTab}>
          + タブ追加
        </Button>
      </Stack>

      {tabs.map(tab => (
        <TabPanel key={tab.id} value={tab.id} active={activeTab === tab.id}>
          <p>{tab.content}</p>
        </TabPanel>
      ))}
    </Stack>
  );
}
```

### フォームタブ

```html
<ha-tabs value="step1">
  <ha-tab-item value="step1">1. 基本情報</ha-tab-item>
  <ha-tab-item value="step2">2. 住所</ha-tab-item>
  <ha-tab-item value="step3">3. 確認</ha-tab-item>
</ha-tabs>

<ha-tab-panel value="step1">
  <ha-card>
    <ha-stack direction="vertical" gap="3">
      <ha-form-group label="お名前" required>
        <ha-input full-width></ha-input>
      </ha-form-group>
      <ha-form-group label="メールアドレス" required>
        <ha-input type="email" full-width></ha-input>
      </ha-form-group>
      <ha-button variant="primary">次へ</ha-button>
    </ha-stack>
  </ha-card>
</ha-tab-panel>

<ha-tab-panel value="step2">
  <ha-card>
    <ha-stack direction="vertical" gap="3">
      <ha-form-group label="郵便番号">
        <ha-input full-width></ha-input>
      </ha-form-group>
      <ha-form-group label="住所">
        <ha-input full-width></ha-input>
      </ha-form-group>
      <ha-stack direction="horizontal" gap="2">
        <ha-button variant="outline">戻る</ha-button>
        <ha-button variant="primary">次へ</ha-button>
      </ha-stack>
    </ha-stack>
  </ha-card>
</ha-tab-panel>

<ha-tab-panel value="step3">
  <ha-card>
    <h3>入力内容の確認</h3>
    <p>入力内容を確認してください</p>
    <ha-stack direction="horizontal" gap="2">
      <ha-button variant="outline">戻る</ha-button>
      <ha-button variant="primary">送信</ha-button>
    </ha-stack>
  </ha-card>
</ha-tab-panel>
```

### ダッシュボードタブ

```tsx
import { Tabs, TabItem, TabPanel, Card, Grid } from '@hidearea-design/react';
import { useState } from 'react';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
        <TabItem value="overview">概要</TabItem>
        <TabItem value="analytics">分析</TabItem>
        <TabItem value="reports">レポート</TabItem>
      </Tabs>

      <TabPanel value="overview" active={activeTab === 'overview'}>
        <Grid columns="1" mdColumns="2" lgColumns="4" gap="4">
          <Card>
            <h4>総売上</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>¥1,234,567</p>
          </Card>
          <Card>
            <h4>訪問者数</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>12,345</p>
          </Card>
          <Card>
            <h4>コンバージョン率</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>3.45%</p>
          </Card>
          <Card>
            <h4>平均注文額</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>¥8,900</p>
          </Card>
        </Grid>
      </TabPanel>

      <TabPanel value="analytics" active={activeTab === 'analytics'}>
        <Card>
          <h3>分析データ</h3>
          <p>詳細な分析情報がここに表示されます</p>
        </Card>
      </TabPanel>

      <TabPanel value="reports" active={activeTab === 'reports'}>
        <Card>
          <h3>レポート</h3>
          <p>各種レポートがここに表示されます</p>
        </Card>
      </TabPanel>
    </div>
  );
}
```

### 遅延読み込み

```tsx
import { Tabs, TabItem, TabPanel, Spinner } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function LazyTabs() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set(['tab1']));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loadedTabs.has(activeTab)) {
      setLoading(true);
      setTimeout(() => {
        setLoadedTabs(new Set([...loadedTabs, activeTab]));
        setLoading(false);
      }, 1000);
    }
  }, [activeTab]);

  return (
    <>
      <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
        <TabItem value="tab1">タブ1</TabItem>
        <TabItem value="tab2">タブ2</TabItem>
        <TabItem value="tab3">タブ3</TabItem>
      </Tabs>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spinner />
        </div>
      ) : (
        <>
          {loadedTabs.has('tab1') && (
            <TabPanel value="tab1" active={activeTab === 'tab1'}>
              <p>タブ1のコンテンツ</p>
            </TabPanel>
          )}
          {loadedTabs.has('tab2') && (
            <TabPanel value="tab2" active={activeTab === 'tab2'}>
              <p>タブ2のコンテンツ（遅延読み込み）</p>
            </TabPanel>
          )}
          {loadedTabs.has('tab3') && (
            <TabPanel value="tab3" active={activeTab === 'tab3'}>
              <p>タブ3のコンテンツ（遅延読み込み）</p>
            </TabPanel>
          )}
        </>
      )}
    </>
  );
}
```

## キーボード操作

- `Tab`: タブリストにフォーカス
- `←/→`: 前後のタブに移動
- `Home`: 最初のタブに移動
- `End`: 最後のタブに移動
- `Enter/Space`: タブを選択

## アクセシビリティ

- `role="tablist"` がタブコンテナに設定されます
- `role="tab"` が各タブに設定されます
- `role="tabpanel"` がパネルに設定されます
- `aria-selected` で選択状態が管理されます
- `aria-controls` でタブとパネルが関連付けられます
- キーボードナビゲーションに完全対応

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-tabs {
  --tabs-border-color: var(--color-gray-200);
  --tabs-active-color: var(--color-primary-500);
  --tabs-active-border-width: 2px;
}

ha-tab-item {
  --tab-padding: 12px 16px;
  --tab-font-size: 14px;
  --tab-font-weight: 500;
}
```

## バリアント別の使い分け

| バリアント | 用途 | 特徴 |
|-----------|------|------|
| `default` | 標準的なタブ | アンダーライン表示 |
| `pills` | コンパクトなタブ | ボタン風デザイン |
