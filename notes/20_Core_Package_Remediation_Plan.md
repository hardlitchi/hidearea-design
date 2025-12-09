# Core Package Remediation Plan

**Date:** 2025-12-09
**Project:** @hidearea-design/core Token Migration
**Priority:** High
**Estimated Effort:** 2-3 days

---

## Executive Summary

This document outlines a comprehensive remediation plan to address the primary issue identified in the core package review: **inconsistent design token usage across 23 components**.

### Objectives

1. **Standardize token usage** across all 35 components
2. **Migrate from legacy tokens** (`--color-gray-*`, `--color-neutral-*`) to semantic tokens
3. **Remove hardcoded color fallbacks** that bypass the semantic token system
4. **Ensure theme consistency** across all components
5. **Improve maintainability** through consistent token patterns

### Success Criteria

- ✅ All 23 affected components migrated to semantic tokens
- ✅ Zero hardcoded color references (except in tokens package)
- ✅ 100% theme consistency across light and dark modes
- ✅ All tests passing
- ✅ Token consistency score: 10/10

---

## 1. Current State Analysis

### 1.1 Token Systems

#### Available Token Categories

**Semantic Tokens (Target):**
```css
/* Foreground */
--foreground-primary      /* Primary text */
--foreground-secondary    /* Secondary/muted text */
--foreground-tertiary     /* Disabled/placeholder text */
--foreground-inverse      /* Text on colored backgrounds */
--foreground-on-primary   /* Text on primary color */
--foreground-error        /* Error text */
--foreground-warning      /* Warning text */
--foreground-success      /* Success text */

/* Background */
--background-primary      /* Main background */
--background-secondary    /* Card/panel background */
--background-tertiary     /* Hover/subtle background */
--background-inverse      /* Dark mode primary */
--background-error        /* Error background */
--background-warning      /* Warning background */
--background-success      /* Success background */

/* Border */
--border-default          /* Default border color */
--border-hover            /* Border on hover */
--border-focus            /* Border on focus */
--border-error            /* Error border */

/* Interactive */
--interactive-primary     /* Primary buttons/links */
--interactive-hover       /* Hover state */
--interactive-active      /* Active/pressed state */
--interactive-disabled    /* Disabled state */

/* Spacing, Typography, etc. */
--spacing-1 through --spacing-12
--font-size-xs through --font-size-4xl
--border-radius-sm through --border-radius-full
--shadow-sm through --shadow-2xl
```

#### Legacy Tokens (Current, Problematic)

```css
/* Raw color tokens (should not be used directly in components) */
--color-gray-50 through --color-gray-900
--color-neutral-0 through --color-neutral-900
--color-primary-500
--color-success-500
--color-warning-500
--color-error-500
--color-white
```

### 1.2 Affected Components (23)

#### Category 1: Navigation Components (3)
- `pagination` - 8 hardcoded color references
- `breadcrumb` - 4 hardcoded color references
- `tabs` - 6 hardcoded color references

#### Category 2: Form Components (3)
- `switch` - 4 hardcoded color references
- `select` - 5 hardcoded color references
- `slider` - 3 hardcoded color references (inline styles)

#### Category 3: Data Display (7)
- `avatar` - 5 hardcoded color references
- `avatar-group` - 8 hardcoded color references
- `spinner` - 2 hardcoded color references
- `skeleton` - 4 hardcoded color references
- `table` - 7 hardcoded color references
- `datagrid` - 8 hardcoded color references
- `progress` - 3 hardcoded color references

#### Category 4: Overlay/Feedback (4)
- `drawer` - 6 hardcoded color references
- `menu` - 5 hardcoded color references
- `toast` - 4 hardcoded color references
- `tooltip` - 3 hardcoded color references

#### Category 5: Complex Components (3)
- `accordion` - 4 hardcoded color references
- `list` - 5 hardcoded color references
- `file-upload` - 4 hardcoded color references

#### Category 6: Pickers (3)
- `date-picker` - 12 hardcoded color references
- `time-picker` - 9 hardcoded color references
- `color-picker` - 6 hardcoded color references (inline styles)

**Total Issues:** ~128 hardcoded color token references across 23 components

---

## 2. Migration Strategy

### 2.1 Token Mapping Rules

#### Rule 1: Text Colors

```css
/* BEFORE (Legacy) */
color: var(--color-gray-700);
color: var(--color-gray-600);
color: var(--color-gray-500);
color: var(--color-neutral-600, #4b5563);

/* AFTER (Semantic) */
color: var(--foreground-primary);      /* Primary text */
color: var(--foreground-secondary);    /* Secondary text */
color: var(--foreground-tertiary);     /* Muted text */
color: var(--foreground-secondary);    /* No hardcoded fallback */
```

#### Rule 2: Background Colors

```css
/* BEFORE (Legacy) */
background: var(--color-gray-50);
background: var(--color-gray-100);
background: var(--color-gray-200);
background: var(--color-neutral-100, #f3f4f6);
background: var(--color-white);

/* AFTER (Semantic) */
background: var(--background-tertiary);   /* Subtle hover background */
background: var(--background-secondary);  /* Card/panel background */
background: var(--background-tertiary);   /* Light neutral background */
background: var(--background-secondary);  /* No hardcoded fallback */
background: var(--background-primary);    /* Primary background */
```

#### Rule 3: Border Colors

```css
/* BEFORE (Legacy) */
border: 1px solid var(--color-gray-300);
border: 1px solid var(--color-gray-400);
border: 2px solid var(--color-neutral-200, #e5e7eb);

/* AFTER (Semantic) */
border: 1px solid var(--border-default);
border: 1px solid var(--border-hover);
border: 2px solid var(--border-default);
```

#### Rule 4: State Colors

```css
/* BEFORE (Legacy) */
background: var(--color-primary-500);
color: var(--color-success-500);
background: var(--color-error-500);
background: var(--color-warning-500);

/* AFTER (Semantic) */
background: var(--interactive-primary);
color: var(--foreground-success);
background: var(--background-error);
background: var(--background-warning);
```

#### Rule 5: Component-Specific Tokens

```css
/* Components should define their own semantic CSS variables */
/* that reference the global semantic tokens */

/* BEFORE (Direct usage) */
.button {
  background: var(--color-gray-100);
  color: var(--color-gray-700);
}

/* AFTER (Component semantic tokens) */
.button {
  background: var(--button-bg, var(--background-tertiary));
  color: var(--button-color, var(--foreground-primary));
}
```

### 2.2 Migration Phases

#### Phase 1: Preparation (2 hours)

**Tasks:**
1. Create token mapping reference document
2. Set up automated testing for visual regression
3. Create branch: `refactor/semantic-tokens-migration`
4. Back up current implementation

**Deliverables:**
- Token mapping guide
- Test baseline screenshots
- Git branch ready for changes

#### Phase 2: Navigation Components (4 hours)

**Components:**
- pagination (8 references)
- breadcrumb (4 references)
- tabs (6 references)

**Steps per component:**
1. Open component `.styles.ts` file
2. Identify all `--color-*` references
3. Replace with semantic equivalents
4. Remove hardcoded fallbacks
5. Run component tests
6. Visual verification in light/dark modes
7. Commit changes

**Verification:**
```bash
# Run tests
npm run test -- pagination.test.ts
npm run test -- breadcrumb.test.ts
npm run test -- tabs.test.ts

# Visual check
npm run dev
# Test in browser with light/dark mode toggle
```

#### Phase 3: Form Components (4 hours)

**Components:**
- switch (4 references)
- select (5 references)
- slider (3 references + extract inline styles)

**Additional task for slider:**
1. Extract inline styles to `slider.styles.ts`
2. Then apply token migration

**Verification:**
```bash
npm run test -- switch.test.ts
npm run test -- select.test.ts
npm run test -- slider.test.ts
```

#### Phase 4: Data Display Components (6 hours)

**Components:**
- avatar (5 references)
- avatar-group (8 references)
- spinner (2 references)
- skeleton (4 references)
- table (7 references)
- datagrid (8 references)
- progress (3 references)

**High-impact components:** avatar, avatar-group, table, datagrid

**Verification:**
```bash
npm run test -- avatar.test.ts
npm run test -- table.test.ts
npm run test -- datagrid.test.ts
# etc.
```

#### Phase 5: Overlay/Feedback Components (5 hours)

**Components:**
- drawer (6 references)
- menu (5 references)
- toast (4 references)
- tooltip (3 references)

**Verification:**
```bash
npm run test -- drawer.test.ts
npm run test -- menu.test.ts
npm run test -- toast.test.ts
npm run test -- tooltip.test.ts
```

#### Phase 6: Complex Components (5 hours)

**Components:**
- accordion (4 references)
- list (5 references)
- file-upload (4 references)

**Verification:**
```bash
npm run test -- accordion.test.ts
npm run test -- list.test.ts
npm run test -- file-upload.test.ts
```

#### Phase 7: Picker Components (6 hours)

**Components:**
- date-picker (12 references)
- time-picker (9 references)
- color-picker (6 references + extract inline styles)

**Largest components:** date-picker (1,030 lines), color-picker (796 lines)

**Additional task for color-picker:**
1. Extract inline styles to `color-picker.styles.ts`
2. Then apply token migration

**Verification:**
```bash
npm run test -- date-picker.test.ts
npm run test -- time-picker.test.ts
npm run test -- color-picker.test.ts
```

#### Phase 8: Testing and Validation (4 hours)

**Tasks:**
1. Run full test suite
2. Run coverage report
3. Visual regression testing (all components)
4. Theme switching verification
5. Accessibility verification
6. Performance testing

**Verification:**
```bash
# Full test suite
npm run test

# Coverage
npm run test:coverage

# Lint
npm run lint

# Build
npm run build
```

#### Phase 9: Documentation (2 hours)

**Tasks:**
1. Update component metadata files with new tokens
2. Update base.ts documentation
3. Create token usage guide
4. Update CHANGELOG.md

#### Phase 10: Review and Merge (2 hours)

**Tasks:**
1. Self-review all changes
2. Create pull request
3. Request team review
4. Address feedback
5. Merge to main branch

---

## 3. Detailed Component Migration Guide

### 3.1 Example: Pagination Component

#### Before Migration

**File:** `src/components/pagination/pagination.styles.ts`

```css
.button {
  background: var(--pagination-button-bg, transparent);
  border: 1px solid var(--pagination-button-border, var(--color-gray-300));
  color: var(--pagination-button-color, var(--color-gray-700));
  /* ... */
}

.button:hover:not(:disabled):not(.active) {
  background: var(--pagination-button-hover-bg, var(--color-gray-50));
  border-color: var(--pagination-button-hover-border, var(--color-primary-500));
  color: var(--pagination-button-hover-color, var(--color-primary-500));
}

.button.active {
  background: var(--pagination-active-bg, var(--color-primary-500));
  border-color: var(--pagination-active-border, var(--color-primary-500));
  color: var(--pagination-active-color, var(--color-white));
}

.ellipsis {
  color: var(--color-gray-500);
}

.info {
  color: var(--color-gray-600);
}
```

#### After Migration

```css
.button {
  background: var(--pagination-button-bg, transparent);
  border: 1px solid var(--pagination-button-border, var(--border-default));
  color: var(--pagination-button-color, var(--foreground-primary));
  /* ... */
}

.button:hover:not(:disabled):not(.active) {
  background: var(--pagination-button-hover-bg, var(--background-tertiary));
  border-color: var(--pagination-button-hover-border, var(--interactive-primary));
  color: var(--pagination-button-hover-color, var(--interactive-primary));
}

.button.active {
  background: var(--pagination-active-bg, var(--interactive-primary));
  border-color: var(--pagination-active-border, var(--interactive-primary));
  color: var(--pagination-active-color, var(--foreground-inverse));
}

.ellipsis {
  color: var(--foreground-tertiary);
}

.info {
  color: var(--foreground-secondary);
}
```

#### Changes Summary

- `var(--color-gray-300)` → `var(--border-default)`
- `var(--color-gray-700)` → `var(--foreground-primary)`
- `var(--color-gray-50)` → `var(--background-tertiary)`
- `var(--color-primary-500)` → `var(--interactive-primary)`
- `var(--color-white)` → `var(--foreground-inverse)`
- `var(--color-gray-500)` → `var(--foreground-tertiary)`
- `var(--color-gray-600)` → `var(--foreground-secondary)`

### 3.2 Example: Avatar Component

#### Before Migration

**File:** `src/components/avatar/avatar.styles.ts`

```css
.container {
  background: var(--avatar-bg, var(--color-gray-200));
  color: var(--avatar-color, var(--color-gray-700));
  /* ... */
}

.status {
  border: 2px solid var(--avatar-status-border, var(--color-white));
  background: var(--avatar-status-bg, var(--color-gray-400));
}

:host([status="offline"]) .status {
  background: var(--color-gray-400);
}
```

#### After Migration

```css
.container {
  background: var(--avatar-bg, var(--background-tertiary));
  color: var(--avatar-color, var(--foreground-primary));
  /* ... */
}

.status {
  border: 2px solid var(--avatar-status-border, var(--background-primary));
  background: var(--avatar-status-bg, var(--foreground-tertiary));
}

:host([status="offline"]) .status {
  background: var(--foreground-tertiary);
}
```

#### Changes Summary

- `var(--color-gray-200)` → `var(--background-tertiary)`
- `var(--color-gray-700)` → `var(--foreground-primary)`
- `var(--color-white)` → `var(--background-primary)`
- `var(--color-gray-400)` → `var(--foreground-tertiary)`

### 3.3 Example: Avatar Group Component

#### Before Migration

**File:** `src/components/avatar/avatar-group.styles.ts`

```css
.avatar {
  border: 2px solid var(--color-neutral-0, #ffffff);
  box-shadow: 0 0 0 1px var(--color-neutral-200, #e5e7eb);
}

.more {
  background: var(--color-neutral-100, #f3f4f6);
  color: var(--color-neutral-600, #4b5563);
  border: 2px solid var(--color-neutral-0, #ffffff);
  box-shadow: 0 0 0 1px var(--color-neutral-200, #e5e7eb);
}
```

#### After Migration

```css
.avatar {
  border: 2px solid var(--background-primary);
  box-shadow: 0 0 0 1px var(--border-default);
}

.more {
  background: var(--background-secondary);
  color: var(--foreground-secondary);
  border: 2px solid var(--background-primary);
  box-shadow: 0 0 0 1px var(--border-default);
}
```

#### Changes Summary

- `var(--color-neutral-0, #ffffff)` → `var(--background-primary)`
- `var(--color-neutral-200, #e5e7eb)` → `var(--border-default)`
- `var(--color-neutral-100, #f3f4f6)` → `var(--background-secondary)`
- `var(--color-neutral-600, #4b5563)` → `var(--foreground-secondary)`
- **Removed all hardcoded hex fallbacks**

---

## 4. Testing Strategy

### 4.1 Unit Testing

**For each migrated component:**

```bash
# Run component-specific tests
npm run test -- [component].test.ts

# Verify no regressions
npm run test:coverage
```

**Acceptance criteria:**
- ✅ All existing tests pass
- ✅ No decrease in coverage
- ✅ Component functionality unchanged

### 4.2 Visual Testing

**Manual verification checklist per component:**

```markdown
- [ ] Light mode appearance
- [ ] Dark mode appearance
- [ ] Hover states
- [ ] Active states
- [ ] Disabled states
- [ ] Focus states
- [ ] All variants (if applicable)
- [ ] All sizes (if applicable)
- [ ] Border visibility
- [ ] Text readability
- [ ] Contrast ratios (WCAG AA)
```

**Tools:**
- Browser DevTools
- Theme toggle utility (`toggleTheme()`)
- Accessibility inspector

### 4.3 Theme Switching Testing

**Test procedure:**

1. Open component in browser
2. Toggle theme: light → dark
3. Verify smooth transition
4. Verify all colors update correctly
5. Toggle theme: dark → light
6. Verify no visual artifacts

```typescript
// Test script
import { toggleTheme, getEffectiveTheme } from '@hidearea-design/core';

// Start in light mode
console.log('Current theme:', getEffectiveTheme()); // 'light'

// Toggle to dark
toggleTheme();
console.log('Current theme:', getEffectiveTheme()); // 'dark'

// Verify component colors updated
// Visual inspection required
```

### 4.4 Automated Testing Script

**Create test script:** `scripts/test-token-migration.mjs`

```javascript
import { execSync } from 'child_process';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const componentsDir = './src/components';

// Get all component directories
const components = readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Testing ${components.length} components...\n`);

let passed = 0;
let failed = 0;
const failures = [];

for (const component of components) {
  try {
    // Run tests for component
    execSync(`npm run test -- ${component}.test.ts`, {
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    console.log(`✅ ${component}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${component}`);
    failed++;
    failures.push(component);
  }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`Total: ${components.length} | Passed: ${passed} | Failed: ${failed}`);

if (failed > 0) {
  console.log(`\nFailed components:`);
  failures.forEach(c => console.log(`  - ${c}`));
  process.exit(1);
}

console.log('\n✅ All tests passed!');
```

**Run script:**
```bash
node scripts/test-token-migration.mjs
```

### 4.5 Regression Testing

**Before migration:**
```bash
# Create baseline
npm run test:coverage
npm run build

# Save results
cp coverage/coverage-summary.json baseline-coverage.json
cp dist/index.es.js baseline-bundle.js
```

**After migration:**
```bash
# Compare results
npm run test:coverage
npm run build

# Verify no regressions
diff baseline-coverage.json coverage/coverage-summary.json
```

---

## 5. Risk Assessment and Mitigation

### 5.1 Identified Risks

#### Risk 1: Visual Regressions

**Impact:** High
**Probability:** Medium

**Description:**
Semantic token mappings may not perfectly match legacy colors, causing visual differences.

**Mitigation:**
1. Side-by-side visual comparison (before/after)
2. Theme switching verification
3. User acceptance testing
4. Staged rollout (one category at a time)
5. Easy rollback via Git

#### Risk 2: Breaking Changes

**Impact:** High
**Probability:** Low

**Description:**
Token changes could break component functionality or tests.

**Mitigation:**
1. Comprehensive unit tests before migration
2. Test each component immediately after changes
3. Automated test suite runs for all components
4. Feature branch with easy rollback

#### Risk 3: Theme Inconsistency

**Impact:** Medium
**Probability:** Low

**Description:**
Mixed legacy and semantic tokens during migration phase.

**Mitigation:**
1. Migrate components in logical groups (by category)
2. Complete one category before starting next
3. Daily integration testing during migration
4. Documented migration status

#### Risk 4: Performance Impact

**Impact:** Low
**Probability:** Very Low

**Description:**
Additional CSS variable lookups could impact performance.

**Mitigation:**
1. Performance benchmarks before/after
2. Browser DevTools performance profiling
3. Bundle size comparison
4. CSS variable resolution is highly optimized in modern browsers

### 5.2 Rollback Plan

**If critical issues discovered:**

```bash
# Immediate rollback
git checkout main
git branch -D refactor/semantic-tokens-migration

# Partial rollback (revert specific components)
git revert <commit-hash>
```

**Rollback triggers:**
- Failing tests that cannot be fixed quickly
- Critical visual regressions
- Performance degradation >10%
- Accessibility issues (WCAG failures)

---

## 6. Timeline and Resource Allocation

### 6.1 Estimated Timeline

| Phase | Duration | Components | Total Hours |
|-------|----------|------------|-------------|
| Phase 1: Preparation | 2 hours | - | 2 |
| Phase 2: Navigation | 4 hours | 3 | 4 |
| Phase 3: Form | 4 hours | 3 | 4 |
| Phase 4: Data Display | 6 hours | 7 | 6 |
| Phase 5: Overlay/Feedback | 5 hours | 4 | 5 |
| Phase 6: Complex | 5 hours | 3 | 5 |
| Phase 7: Pickers | 6 hours | 3 | 6 |
| Phase 8: Testing | 4 hours | - | 4 |
| Phase 9: Documentation | 2 hours | - | 2 |
| Phase 10: Review | 2 hours | - | 2 |
| **Total** | **40 hours** | **23** | **40** |

**Calendar time:** 5 working days (assuming 8 hours/day)

### 6.2 Resource Requirements

**Personnel:**
- 1 Senior Frontend Developer (full-time, 5 days)
- 1 QA Engineer (part-time, 2 days for testing phases)
- 1 Designer (consultation, 4 hours for visual approval)

**Tools:**
- Development environment
- Browser DevTools
- Git version control
- npm test runners

---

## 7. Success Metrics

### 7.1 Quantitative Metrics

**Before Migration:**
- Token consistency score: 7.0/10
- Components using semantic tokens: 12/35 (34.3%)
- Components using legacy tokens: 23/35 (65.7%)
- Hardcoded color references: ~128

**After Migration (Target):**
- Token consistency score: 10.0/10
- Components using semantic tokens: 35/35 (100%)
- Components using legacy tokens: 0/35 (0%)
- Hardcoded color references: 0

### 7.2 Qualitative Metrics

**Success criteria:**
- ✅ All tests passing (100%)
- ✅ No visual regressions
- ✅ Smooth theme transitions
- ✅ Improved maintainability
- ✅ Consistent token patterns
- ✅ Updated documentation
- ✅ Team approval

---

## 8. Post-Migration Tasks

### 8.1 Immediate Tasks

1. **Update documentation**
   - Component metadata files
   - Token usage guide
   - Migration notes in CHANGELOG.md

2. **Team communication**
   - Announce completion
   - Share before/after comparisons
   - Document lessons learned

3. **Monitoring**
   - Watch for bug reports
   - Monitor theme switching issues
   - Track user feedback

### 8.2 Follow-up Tasks

4. **Style extraction** (Medium priority)
   - Extract inline styles from slider
   - Extract inline styles from color-picker
   - Maintain consistency

5. **ESLint rules** (Medium priority)
   - Add rule to prevent `--color-*` usage
   - Enforce semantic token patterns
   - Add to pre-commit hooks

6. **Token documentation** (Low priority)
   - Create visual token guide
   - Add usage examples
   - Document best practices

---

## 9. Appendix

### 9.1 Token Reference Table

| Legacy Token | Semantic Token | Usage Context |
|--------------|---------------|---------------|
| `--color-gray-50` | `--background-tertiary` | Subtle hover backgrounds |
| `--color-gray-100` | `--background-secondary` | Card/panel backgrounds |
| `--color-gray-200` | `--background-tertiary` | Disabled/inactive backgrounds |
| `--color-gray-300` | `--border-default` | Default borders |
| `--color-gray-400` | `--border-hover` | Hover borders |
| `--color-gray-500` | `--foreground-tertiary` | Muted/disabled text |
| `--color-gray-600` | `--foreground-secondary` | Secondary text |
| `--color-gray-700` | `--foreground-primary` | Primary text |
| `--color-gray-900` | `--foreground-primary` | Emphasis text |
| `--color-neutral-0` | `--background-primary` | White/primary background |
| `--color-neutral-100` | `--background-secondary` | Light neutral background |
| `--color-neutral-200` | `--border-default` | Light borders |
| `--color-neutral-300` | `--border-default` | Medium borders |
| `--color-neutral-400` | `--border-hover` | Hover borders |
| `--color-neutral-500` | `--foreground-tertiary` | Muted text |
| `--color-neutral-600` | `--foreground-secondary` | Secondary text |
| `--color-neutral-700` | `--foreground-primary` | Primary text |
| `--color-primary-500` | `--interactive-primary` | Primary interactive color |
| `--color-success-500` | `--foreground-success` | Success text/icons |
| `--color-warning-500` | `--foreground-warning` | Warning text/icons |
| `--color-error-500` | `--foreground-error` | Error text/icons |
| `--color-white` | `--foreground-inverse` | Text on colored backgrounds |

### 9.2 Automated Search and Replace

**Script:** `scripts/migrate-tokens.sh`

```bash
#!/bin/bash

# Migrate color-gray tokens
find src/components -name "*.styles.ts" -o -name "*.ts" | xargs sed -i \
  -e 's/var(--color-gray-50[^)]*)/var(--background-tertiary)/g' \
  -e 's/var(--color-gray-100[^)]*)/var(--background-secondary)/g' \
  -e 's/var(--color-gray-200[^)]*)/var(--background-tertiary)/g' \
  -e 's/var(--color-gray-300[^)]*)/var(--border-default)/g' \
  -e 's/var(--color-gray-400[^)]*)/var(--border-hover)/g' \
  -e 's/var(--color-gray-500[^)]*)/var(--foreground-tertiary)/g' \
  -e 's/var(--color-gray-600[^)]*)/var(--foreground-secondary)/g' \
  -e 's/var(--color-gray-700[^)]*)/var(--foreground-primary)/g'

# Migrate color-neutral tokens
find src/components -name "*.styles.ts" -o -name "*.ts" | xargs sed -i \
  -e 's/var(--color-neutral-0[^)]*)/var(--background-primary)/g' \
  -e 's/var(--color-neutral-100[^)]*)/var(--background-secondary)/g' \
  -e 's/var(--color-neutral-200[^)]*)/var(--border-default)/g' \
  -e 's/var(--color-neutral-300[^)]*)/var(--border-default)/g' \
  -e 's/var(--color-neutral-400[^)]*)/var(--border-hover)/g' \
  -e 's/var(--color-neutral-500[^)]*)/var(--foreground-tertiary)/g' \
  -e 's/var(--color-neutral-600[^)]*)/var(--foreground-secondary)/g' \
  -e 's/var(--color-neutral-700[^)]*)/var(--foreground-primary)/g'

# Migrate state colors
find src/components -name "*.styles.ts" -o -name "*.ts" | xargs sed -i \
  -e 's/var(--color-primary-500)/var(--interactive-primary)/g' \
  -e 's/var(--color-success-500)/var(--foreground-success)/g' \
  -e 's/var(--color-warning-500)/var(--foreground-warning)/g' \
  -e 's/var(--color-error-500)/var(--foreground-error)/g'

# Migrate color-white
find src/components -name "*.styles.ts" -o -name "*.ts" | xargs sed -i \
  -e 's/var(--color-white)/var(--foreground-inverse)/g'

echo "✅ Token migration complete"
echo "⚠️  Manual review required for context-specific tokens"
```

**Usage:**
```bash
chmod +x scripts/migrate-tokens.sh
./scripts/migrate-tokens.sh
```

**Note:** Automated replacement is a starting point. Manual review required for context-specific optimizations.

### 9.3 Verification Checklist

**Per-component checklist:**

```markdown
## [Component Name] Migration Checklist

### Code Changes
- [ ] All `--color-gray-*` tokens replaced
- [ ] All `--color-neutral-*` tokens replaced
- [ ] All state colors updated
- [ ] Hardcoded hex fallbacks removed
- [ ] Component tokens use semantic fallbacks

### Testing
- [ ] Unit tests passing
- [ ] Visual test in light mode
- [ ] Visual test in dark mode
- [ ] Theme switching works
- [ ] All variants tested
- [ ] All sizes tested
- [ ] Hover states verified
- [ ] Active states verified
- [ ] Disabled states verified
- [ ] Focus states verified

### Accessibility
- [ ] Contrast ratios meet WCAG AA
- [ ] Text readable in both themes
- [ ] Border visibility maintained
- [ ] No accessibility regressions

### Documentation
- [ ] Metadata updated with new tokens
- [ ] Component tokens documented
- [ ] Examples updated

### Review
- [ ] Code self-review completed
- [ ] Designer approval obtained
- [ ] Changes committed to Git
```

---

## 10. Conclusion

This remediation plan provides a comprehensive, phased approach to migrating all 23 affected components from legacy color tokens to semantic tokens. By following this plan, the core package will achieve:

- **100% token consistency** across all components
- **Improved theme switching** and dark mode support
- **Better maintainability** through standardized token usage
- **Enhanced developer experience** with clear token patterns

### Next Steps

1. **Review and approve** this remediation plan
2. **Allocate resources** (developer, QA, designer)
3. **Schedule migration** in project timeline
4. **Create Git branch** for migration work
5. **Begin Phase 1** (Preparation)

**Estimated completion:** 5 working days from start

---

**Document Version:** 1.0
**Last Updated:** 2025-12-09
**Author:** Claude Code
**Status:** Ready for Implementation
