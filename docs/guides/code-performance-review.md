# パフォーマンス分析レポート

このドキュメントは、hidearea-designコードベースで見つかったパフォーマンスのアンチパターン、非効率性、および推奨事項を概説します。

## 要約

| カテゴリ | 発見された問題 | 重大度 |
|----------|-------------|----------|
| イベントリスナーのメモリリーク | 5 | **重大** |
| Reactメモ化の欠落 | 41+コンポーネント | **高** |
| 非効率なデータ構造 | 4 | **高** |
| DOMスラッシング（innerHTML） | 6ファイル | **高** |
| 大きなuseEffect依存配列 | 7コンポーネント | **中** |
| 連鎖配列操作 | 3 | **低** |

**N+1クエリ**: 適用外 - これはバックエンドデータ取得を持たないUIコンポーネントライブラリです。

---

## 重大な問題

### 1. イベントリスナーのメモリリーク

イベントリスナーがクリーンアップなしでrenderメソッドに追加され、メモリリークと重複ハンドラーを引き起こしています。

#### 1.1 Sliderコンポーネント
**ファイル:** `packages/core/src/components/slider/slider.ts`
**行:** 723-730

```typescript
// render()が呼び出されるたびに呼び出される - メモリリーク
const track = this._shadowRoot.querySelector('.slider__track');
if (track) {
    track.addEventListener('pointerdown', this.handlePointerDown);
    track.addEventListener('pointermove', this.handlePointerMove);
    track.addEventListener('pointerup', this.handlePointerUp);
    track.addEventListener('pointercancel', this.handlePointerUp);
}
```

**修正方法:** リスナーを追加する前に削除するか、イベント委譲を使用:
```typescript
private cleanupTrackListeners() {
    const track = this._shadowRoot.querySelector('.slider__track');
    if (track) {
        track.removeEventListener('pointerdown', this.handlePointerDown);
        // ... 他のリスナーも削除
    }
}

private render() {
    this.cleanupTrackListeners();
    // ... その後リスナーを追加
}
```

#### 1.2 Paginationコンポーネント
**ファイル:** `packages/core/src/components/pagination/pagination.ts`
**行:** 148-201

```typescript
// すべてのrender()で古いリスナーを削除せずに新しいリスナーを追加
const firstButton = this.createButton("««", "first", currentPage === 1);
firstButton.addEventListener("click", () => this.handlePageChange(1));
```

**修正方法:** コンテナでイベント委譲を使用:
```typescript
connectedCallback() {
    this.addEventListener('click', this.handleClick);
}

private handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const action = target.dataset.action;
    if (action === 'first') this.handlePageChange(1);
    // ... 他のアクションを処理
}
```

#### 1.3 FileUploadコンポーネント
**ファイル:** `packages/core/src/components/file-upload/file-upload.ts`
**行:** 481-489

```typescript
// updateFileList()が呼び出されるたびに呼び出される - 重複が蓄積
removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const fileId = (e.currentTarget as HTMLElement).dataset.fileId;
        if (fileId) this.removeFile(fileId);
    });
});
```

#### 1.4 TimePickerコンポーネント
**ファイル:** `packages/core/src/components/time-picker/time-picker.ts`
**行:** 982-1027

```typescript
// attachPanelEventListeners()がrender()から呼び出される
const items = this._shadowRoot.querySelectorAll(".item");
items.forEach((item) => {
    item.addEventListener("click", () => { /* ハンドラー */ });
});
```

#### 1.5 DatePickerコンポーネント
**ファイル:** `packages/core/src/components/date-picker/date-picker.ts`
**行:** 321, 851-852

ドキュメントクリックリスナーと入力クリックリスナーが適切なトラッキングなしで追加されています。

---

## 優先度の高い問題

### 2. Reactメモ化フックなし

**影響:** 41+のReactラッパーコンポーネントで`useCallback`、`useMemo`、`React.memo`の使用がゼロです。

#### 2.1 useEffect依存配列内のコールバックProps

親コンポーネントが再レンダリングされると、新しいコールバック参照が不要なエフェクトの再実行をトリガーします。

**影響を受けるファイル:**
| ファイル | 行 | 依存配列内のコールバック |
|------|------|---------------------------|
| `Modal.tsx` | 160 | `onOpen`, `onClose` |
| `Dropdown.tsx` | 120, 159, 198 | `onOpen`, `onClose`, `onItemClick`, `onClick` |
| `Input.tsx` | 349 | `onInput`, `onChange`, `onFocus`, `onBlur` |
| `FileUpload.tsx` | 298 | `onFileSelect`, `onFileRemove`, `onFileClear`, `onValidationError` |
| `DataGrid.tsx` | 119 | `onSortChange`, `onSelectionChange`, `onPageChange` |
| `TimePicker.tsx` | 307+ | 複数のコールバック |
| `Drawer.tsx` | 148 | `onOpen`, `onClose`, `onBackdropClick` |
| `Accordion.tsx` | 181 | `onToggle`, `onOpen`, `onClose` |

**修正例:**
```typescript
// 修正前 - 親の再レンダリングごとに新しい関数を作成
<Modal onClose={() => setOpen(false)} />

// 修正後 - 安定した参照
const handleClose = useCallback(() => setOpen(false), []);
<Modal onClose={handleClose} />
```

#### 2.2 大きな依存配列

**ファイル:** `packages/react/src/Input.tsx` (行 279-298)
```typescript
// 18個の依存関係 - 意図しない再実行の可能性が高い
useEffect(() => {
    // すべてのpropsを同期
}, [variant, size, type, value, placeholder, disabled, readonly,
    required, error, fullWidth, name, autocomplete, maxlength,
    minlength, pattern, min, max, step]);
```

**修正方法:** 複数の焦点を絞ったエフェクトに分割:
```typescript
useEffect(() => { /* ビジュアルpropsを同期 */ }, [variant, size, fullWidth]);
useEffect(() => { /* バリデーションpropsを同期 */ }, [required, error, pattern]);
useEffect(() => { /* 入力属性を同期 */ }, [type, placeholder, name]);
```

#### 2.3 React.memoの欠落

`MenuItem`や`ListItem`などのリストアイテムコンポーネントはループでレンダリングされているにもかかわらず、メモ化されていません。

**修正方法:**
```typescript
export const MenuItem = React.memo(({ children, ...props }) => {
    // コンポーネントの実装
});
```

---

### 3. 非効率なデータ構造（O(n) → O(1)）

配列が検索に使用されていますが、SetはO(1)のパフォーマンスを提供します。

#### 3.1 DatePicker 無効日付
**ファイル:** `packages/core/src/components/date-picker/date-picker.ts`
**行:** 26, 395

```typescript
// 現在 - すべての日付チェックでO(n)の検索
private _disabledDates: Date[] = [];

if (this._disabledDates.some((d) => this.isSameDay(d, date))) return true;
```

**修正方法:**
```typescript
// O(1)検索のため文字列キーを持つSetを使用
private _disabledDatesSet: Set<string> = new Set();

private dateToKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

if (this._disabledDatesSet.has(this.dateToKey(date))) return true;
```

#### 3.2 DatePicker 無効な曜日
**ファイル:** `packages/core/src/components/date-picker/date-picker.ts`
**行:** 27, 396

```typescript
// 現在 - O(n)検索
private _disabledDaysOfWeek: number[] = [];
if (this._disabledDaysOfWeek.includes(date.getDay())) return true;

// 修正 - O(1)検索
private _disabledDaysOfWeekSet: Set<number> = new Set();
if (this._disabledDaysOfWeekSet.has(date.getDay())) return true;
```

#### 3.3 TimePicker 無効な時間/分
**ファイル:** `packages/core/src/components/time-picker/time-picker.ts`
**行:** 66-67, 357-358

```typescript
// 現在 - レンダリング中の各時間/分チェックでO(n)
public disabledHours: number[] = [];
public disabledMinutes: number[] = [];

if (this.disabledHours.includes(hour24)) return true;

// 修正
private _disabledHoursSet: Set<number> = new Set();
private _disabledMinutesSet: Set<number> = new Set();
```

---

### 4. innerHTMLによるDOMスラッシング

`innerHTML = ""`を使用すると、すべての子要素、それらのイベントリスナー、および状態が破壊されます。

#### 4.1 DataGridコンポーネント
**ファイル:** `packages/core/src/components/datagrid/datagrid.ts`
**行:** 176, 230, 278

```typescript
// すべてのソート、ページ変更、または選択で完全な再構築をトリガー
private renderHeader() {
    this.theadElement.innerHTML = "";  // すべてを破壊
    // ... ゼロから再構築
}

private renderBody() {
    this.tbodyElement.innerHTML = "";  // O(n) DOM破壊 + 作成
    // ... すべての行を再構築
}
```

**修正方法:** DOM差分または対象を絞った更新を実装:
```typescript
private updateRow(index: number, data: DataGridRow) {
    const row = this.tbodyElement.children[index];
    if (row) {
        // 既存の行セルを更新
        Array.from(row.children).forEach((cell, i) => {
            const newContent = data[this._columns[i].key];
            if (cell.textContent !== newContent) {
                cell.textContent = newContent;
            }
        });
    }
}
```

#### その他の影響を受けるファイル:
- `packages/core/src/components/pagination/pagination.ts:144`
- `packages/core/src/components/date-picker/date-picker.ts:646, 757`
- `packages/core/src/components/file-upload/file-upload.ts:244, 452`
- `packages/core/src/components/time-picker/time-picker.ts:823`
- `packages/core/src/components/slider/slider.ts:532`

---

## 優先度が中程度の問題

### 5. 連鎖配列操作

**ファイル:** `packages/core/src/components/slider/slider.ts:197`
```typescript
// 3つの中間配列を作成
return marksAttr.split(',').map(m => parseFloat(m.trim())).filter(m => !isNaN(m));

// より良い方法 - 単一の反復
const result: number[] = [];
for (const m of marksAttr.split(',')) {
    const num = parseFloat(m.trim());
    if (!isNaN(num)) result.push(num);
}
return result;
```

### 6. 繰り返し文字列操作

**ファイル:** `packages/core/src/metadata-index.ts:97-110`
```typescript
// すべての検索でメタデータアイテムごとにtoLowerCase()が4回呼び出される
return ALL_COMPONENT_METADATA.filter((c) =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.tagName.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.category.toLowerCase().includes(lowerQuery)
);

// 修正: 初期化時に小文字バージョンを事前計算
interface ComponentMetadataIndexed extends ComponentMetadata {
    _nameLower: string;
    _tagNameLower: string;
    _descriptionLower: string;
    _categoryLower: string;
}
```

### 7. render内でのテンプレート再計算

**ファイル:** `packages/core/src/components/slider/slider.ts:513-530`
```typescript
// データが変更されていない場合でも、すべてのrenderでマークHTMLが再作成される
marksHtml = `<div class="slider__marks">
    ${markValues.map((mark) => `<div>${mark}</div>`).join('')}
</div>`;
```

---

## 推奨事項の要約

### 即座のアクション（重大）

1. **イベントリスナーリークを修正** Slider、Pagination、FileUpload、TimePicker、DatePickerで
   - リスナーを再追加する前にクリーンアップを実装 または
   - イベント委譲パターンを使用

2. **Reactメモ化を追加** すべてのラッパーコンポーネントに:
   - コールバックpropsを`useCallback`でラップ
   - リストアイテムコンポーネントに`React.memo`を追加
   - 大きな`useEffect`依存配列を分割

### 短期的なアクション（高）

3. **配列をSetに置き換える** 無効な日付/時間/分の検索用

4. **対象を絞ったDOM更新を実装** DataGridでinnerHTMLの再構築の代わりに

### 長期的なアクション（中）

5. **仮想スクロールを検討** 大きなデータセットを持つDataGrid用

6. **パフォーマンス監視を追加** バンドルサイズトラッキング付き（tokensで既に構成済み）

7. **検索インデックスを事前計算** メタデータ検索用

---

## 変更が必要なファイル（優先順位順）

| 優先度 | ファイル | 問題 |
|----------|------|--------|
| 1 | `packages/core/src/components/datagrid/datagrid.ts` | innerHTML、完全な再レンダリング |
| 2 | `packages/core/src/components/slider/slider.ts` | イベントリーク、連鎖配列 |
| 3 | `packages/core/src/components/pagination/pagination.ts` | イベントリーク、innerHTML |
| 4 | `packages/core/src/components/time-picker/time-picker.ts` | イベントリーク、配列検索 |
| 5 | `packages/core/src/components/date-picker/date-picker.ts` | 配列検索、innerHTML |
| 6 | `packages/core/src/components/file-upload/file-upload.ts` | イベントリーク、innerHTML |
| 7 | `packages/react/src/Input.tsx` | 大きな依存配列 |
| 8 | `packages/react/src/FileUpload.tsx` | 大きな依存配列 |
| 9 | `packages/react/src/TimePicker.tsx` | 大きな依存配列 |
| 10 | すべてのReactコンポーネント | メモ化の欠落 |
