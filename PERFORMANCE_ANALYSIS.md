# Performance Analysis Report

This document outlines performance anti-patterns, inefficiencies, and recommendations found in the hidearea-design codebase.

## Executive Summary

| Category | Issues Found | Severity |
|----------|-------------|----------|
| Event Listener Memory Leaks | 5 | **Critical** |
| React Memoization Missing | 41+ components | **High** |
| Inefficient Data Structures | 4 | **High** |
| DOM Thrashing (innerHTML) | 6 files | **High** |
| Large useEffect Dependencies | 7 components | **Medium** |
| Chained Array Operations | 3 | **Low** |

**N+1 Queries**: Not applicable - this is a UI component library with no backend data fetching.

---

## Critical Issues

### 1. Event Listener Memory Leaks

Event listeners are added in render methods without cleanup, causing memory leaks and duplicate handlers.

#### 1.1 Slider Component
**File:** `packages/core/src/components/slider/slider.ts`
**Lines:** 723-730

```typescript
// Called every time render() is called - MEMORY LEAK
const track = this._shadowRoot.querySelector('.slider__track');
if (track) {
    track.addEventListener('pointerdown', this.handlePointerDown);
    track.addEventListener('pointermove', this.handlePointerMove);
    track.addEventListener('pointerup', this.handlePointerUp);
    track.addEventListener('pointercancel', this.handlePointerUp);
}
```

**Fix:** Remove listeners before adding, or use event delegation:
```typescript
private cleanupTrackListeners() {
    const track = this._shadowRoot.querySelector('.slider__track');
    if (track) {
        track.removeEventListener('pointerdown', this.handlePointerDown);
        // ... remove others
    }
}

private render() {
    this.cleanupTrackListeners();
    // ... then add listeners
}
```

#### 1.2 Pagination Component
**File:** `packages/core/src/components/pagination/pagination.ts`
**Lines:** 148-201

```typescript
// Every render() adds NEW listeners without removing old ones
const firstButton = this.createButton("««", "first", currentPage === 1);
firstButton.addEventListener("click", () => this.handlePageChange(1));
```

**Fix:** Use event delegation on the container:
```typescript
connectedCallback() {
    this.addEventListener('click', this.handleClick);
}

private handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const action = target.dataset.action;
    if (action === 'first') this.handlePageChange(1);
    // ... handle other actions
}
```

#### 1.3 File Upload Component
**File:** `packages/core/src/components/file-upload/file-upload.ts`
**Lines:** 481-489

```typescript
// Called on every updateFileList() - duplicates accumulate
removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const fileId = (e.currentTarget as HTMLElement).dataset.fileId;
        if (fileId) this.removeFile(fileId);
    });
});
```

#### 1.4 TimePicker Component
**File:** `packages/core/src/components/time-picker/time-picker.ts`
**Lines:** 982-1027

```typescript
// attachPanelEventListeners() called from render()
const items = this._shadowRoot.querySelectorAll(".item");
items.forEach((item) => {
    item.addEventListener("click", () => { /* handler */ });
});
```

#### 1.5 DatePicker Component
**File:** `packages/core/src/components/date-picker/date-picker.ts`
**Lines:** 321, 851-852

Document click listener and input click listener added without proper tracking.

---

## High Priority Issues

### 2. No React Memoization Hooks

**Impact:** 41+ React wrapper components have zero `useCallback`, `useMemo`, or `React.memo` usage.

#### 2.1 Callback Props in useEffect Dependencies

When parent components re-render, new callback references trigger unnecessary effect re-runs.

**Affected Files:**
| File | Line | Callbacks in Dependencies |
|------|------|---------------------------|
| `Modal.tsx` | 160 | `onOpen`, `onClose` |
| `Dropdown.tsx` | 120, 159, 198 | `onOpen`, `onClose`, `onItemClick`, `onClick` |
| `Input.tsx` | 349 | `onInput`, `onChange`, `onFocus`, `onBlur` |
| `FileUpload.tsx` | 298 | `onFileSelect`, `onFileRemove`, `onFileClear`, `onValidationError` |
| `DataGrid.tsx` | 119 | `onSortChange`, `onSelectionChange`, `onPageChange` |
| `TimePicker.tsx` | 307+ | Multiple callbacks |
| `Drawer.tsx` | 148 | `onOpen`, `onClose`, `onBackdropClick` |
| `Accordion.tsx` | 181 | `onToggle`, `onOpen`, `onClose` |

**Fix Example:**
```typescript
// Before - creates new function on every parent render
<Modal onClose={() => setOpen(false)} />

// After - stable reference
const handleClose = useCallback(() => setOpen(false), []);
<Modal onClose={handleClose} />
```

#### 2.2 Large Dependency Arrays

**File:** `packages/react/src/Input.tsx` (Lines 279-298)
```typescript
// 18 dependencies - high chance of unintended re-runs
useEffect(() => {
    // sync all props
}, [variant, size, type, value, placeholder, disabled, readonly,
    required, error, fullWidth, name, autocomplete, maxlength,
    minlength, pattern, min, max, step]);
```

**Fix:** Split into multiple focused effects:
```typescript
useEffect(() => { /* sync visual props */ }, [variant, size, fullWidth]);
useEffect(() => { /* sync validation props */ }, [required, error, pattern]);
useEffect(() => { /* sync input attributes */ }, [type, placeholder, name]);
```

#### 2.3 Missing React.memo

List item components like `MenuItem` and `ListItem` are not memoized despite being rendered in loops.

**Fix:**
```typescript
export const MenuItem = React.memo(({ children, ...props }) => {
    // component implementation
});
```

---

### 3. Inefficient Data Structures (O(n) → O(1))

Arrays are used for lookups where Sets would provide O(1) performance.

#### 3.1 DatePicker Disabled Dates
**File:** `packages/core/src/components/date-picker/date-picker.ts`
**Lines:** 26, 395

```typescript
// Current - O(n) lookup on every date check
private _disabledDates: Date[] = [];

if (this._disabledDates.some((d) => this.isSameDay(d, date))) return true;
```

**Fix:**
```typescript
// Use Set with string keys for O(1) lookup
private _disabledDatesSet: Set<string> = new Set();

private dateToKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

if (this._disabledDatesSet.has(this.dateToKey(date))) return true;
```

#### 3.2 DatePicker Disabled Days of Week
**File:** `packages/core/src/components/date-picker/date-picker.ts`
**Lines:** 27, 396

```typescript
// Current - O(n) lookup
private _disabledDaysOfWeek: number[] = [];
if (this._disabledDaysOfWeek.includes(date.getDay())) return true;

// Fix - O(1) lookup
private _disabledDaysOfWeekSet: Set<number> = new Set();
if (this._disabledDaysOfWeekSet.has(date.getDay())) return true;
```

#### 3.3 TimePicker Disabled Hours/Minutes
**File:** `packages/core/src/components/time-picker/time-picker.ts`
**Lines:** 66-67, 357-358

```typescript
// Current - O(n) for each hour/minute check during render
public disabledHours: number[] = [];
public disabledMinutes: number[] = [];

if (this.disabledHours.includes(hour24)) return true;

// Fix
private _disabledHoursSet: Set<number> = new Set();
private _disabledMinutesSet: Set<number> = new Set();
```

---

### 4. DOM Thrashing with innerHTML

Using `innerHTML = ""` destroys all child elements, their event listeners, and state.

#### 4.1 DataGrid Component
**File:** `packages/core/src/components/datagrid/datagrid.ts`
**Lines:** 176, 230, 278

```typescript
// Every sort, page change, or selection triggers full rebuild
private renderHeader() {
    this.theadElement.innerHTML = "";  // Destroys everything
    // ... rebuild from scratch
}

private renderBody() {
    this.tbodyElement.innerHTML = "";  // O(n) DOM destruction + creation
    // ... rebuild all rows
}
```

**Fix:** Implement DOM diffing or targeted updates:
```typescript
private updateRow(index: number, data: DataGridRow) {
    const row = this.tbodyElement.children[index];
    if (row) {
        // Update existing row cells
        Array.from(row.children).forEach((cell, i) => {
            const newContent = data[this._columns[i].key];
            if (cell.textContent !== newContent) {
                cell.textContent = newContent;
            }
        });
    }
}
```

#### Other Affected Files:
- `packages/core/src/components/pagination/pagination.ts:144`
- `packages/core/src/components/date-picker/date-picker.ts:646, 757`
- `packages/core/src/components/file-upload/file-upload.ts:244, 452`
- `packages/core/src/components/time-picker/time-picker.ts:823`
- `packages/core/src/components/slider/slider.ts:532`

---

## Medium Priority Issues

### 5. Chained Array Operations

**File:** `packages/core/src/components/slider/slider.ts:197`
```typescript
// Creates 3 intermediate arrays
return marksAttr.split(',').map(m => parseFloat(m.trim())).filter(m => !isNaN(m));

// Better - single iteration
const result: number[] = [];
for (const m of marksAttr.split(',')) {
    const num = parseFloat(m.trim());
    if (!isNaN(num)) result.push(num);
}
return result;
```

### 6. Repeated String Operations

**File:** `packages/core/src/metadata-index.ts:97-110`
```typescript
// toLowerCase() called 4x per metadata item on every search
return ALL_COMPONENT_METADATA.filter((c) =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.tagName.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.category.toLowerCase().includes(lowerQuery)
);

// Fix: Pre-compute lowercase versions at initialization
interface ComponentMetadataIndexed extends ComponentMetadata {
    _nameLower: string;
    _tagNameLower: string;
    _descriptionLower: string;
    _categoryLower: string;
}
```

### 7. Template Recomputation in Render

**File:** `packages/core/src/components/slider/slider.ts:513-530`
```typescript
// Marks HTML recreated on every render even if data unchanged
marksHtml = `<div class="slider__marks">
    ${markValues.map((mark) => `<div>${mark}</div>`).join('')}
</div>`;
```

---

## Recommendations Summary

### Immediate Actions (Critical)

1. **Fix event listener leaks** in Slider, Pagination, FileUpload, TimePicker, DatePicker
   - Implement cleanup before re-adding listeners OR
   - Use event delegation pattern

2. **Add React memoization** to all wrapper components:
   - Wrap callback props with `useCallback`
   - Add `React.memo` to list item components
   - Split large `useEffect` dependency arrays

### Short-term Actions (High)

3. **Replace arrays with Sets** for disabled dates/hours/minutes lookups

4. **Implement targeted DOM updates** instead of innerHTML rebuilds in DataGrid

### Long-term Actions (Medium)

5. **Consider virtual scrolling** for DataGrid with large datasets

6. **Add performance monitoring** with bundle size tracking (already configured in tokens)

7. **Pre-compute search indices** for metadata lookups

---

## Files Requiring Changes (Priority Order)

| Priority | File | Issues |
|----------|------|--------|
| 1 | `packages/core/src/components/datagrid/datagrid.ts` | innerHTML, full re-render |
| 2 | `packages/core/src/components/slider/slider.ts` | Event leak, chained arrays |
| 3 | `packages/core/src/components/pagination/pagination.ts` | Event leak, innerHTML |
| 4 | `packages/core/src/components/time-picker/time-picker.ts` | Event leak, array lookups |
| 5 | `packages/core/src/components/date-picker/date-picker.ts` | Array lookups, innerHTML |
| 6 | `packages/core/src/components/file-upload/file-upload.ts` | Event leak, innerHTML |
| 7 | `packages/react/src/Input.tsx` | Large dependency array |
| 8 | `packages/react/src/FileUpload.tsx` | Large dependency array |
| 9 | `packages/react/src/TimePicker.tsx` | Large dependency array |
| 10 | All React components | Missing memoization |
