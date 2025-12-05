# Phase 9 - TimePicker Component

## Overview
Implement a fully-featured TimePicker component for selecting time values with support for 12-hour and 24-hour formats, minute step configuration, and multiple input methods.

## Component API

### Properties

```typescript
interface TimePickerProps {
  // Value
  value?: string;                    // Time value in HH:mm or HH:mm:ss format
  format?: '12' | '24';              // Time format (default: '24')
  showSeconds?: boolean;             // Show seconds picker (default: false)

  // Configuration
  hourStep?: number;                 // Hour increment step (default: 1)
  minuteStep?: number;               // Minute increment step (default: 1)
  secondStep?: number;               // Second increment step (default: 1)
  minTime?: string;                  // Minimum selectable time
  maxTime?: string;                  // Maximum selectable time
  disabledHours?: number[];          // Disabled hours array
  disabledMinutes?: number[];        // Disabled minutes array

  // Display
  inline?: boolean;                  // Display inline (always visible)
  placeholder?: string;              // Placeholder text
  label?: string;                    // Label text
  helperText?: string;               // Helper text

  // States
  disabled?: boolean;                // Disabled state
  required?: boolean;                // Required state
  error?: boolean;                   // Error state
  readonly?: boolean;                // Readonly state
  errorText?: string;                // Error message

  // Features
  showNowButton?: boolean;           // Show "Now" button
  showClearButton?: boolean;         // Show clear button
  use12Hours?: boolean;              // Use 12-hour format (alias for format='12')
}
```

### Events

```typescript
// Time selection event
interface TimeSelectEvent extends CustomEvent {
  detail: {
    value: string;           // Selected time (HH:mm or HH:mm:ss)
    hour: number;            // Hour value (0-23 or 1-12)
    minute: number;          // Minute value (0-59)
    second?: number;         // Second value (0-59)
    period?: 'AM' | 'PM';   // AM/PM for 12-hour format
  };
}

// Time clear event
interface TimeClearEvent extends CustomEvent {
  detail: null;
}

// Picker open/close events
interface PickerOpenEvent extends CustomEvent { detail: null; }
interface PickerCloseEvent extends CustomEvent { detail: null; }
```

### Methods

```typescript
class HaTimePicker {
  // Value management
  getValue(): string | null;
  setValue(value: string): void;
  clear(): void;

  // Picker control
  open(): void;
  close(): void;
  toggle(): void;

  // Time control
  setNow(): void;
  setTime(hour: number, minute: number, second?: number): void;

  // Validation
  validate(): boolean;
  isTimeDisabled(hour: number, minute: number, second?: number): boolean;
}
```

## UI Structure

### Input Display
```
┌─────────────────────────────┐
│ Label                       │
├─────────────────────────────┤
│ [🕐] HH:MM [AM/PM] [▼]     │
├─────────────────────────────┤
│ Helper text                 │
└─────────────────────────────┘
```

### Picker Panel (24-hour)
```
┌─────────────────────────────┐
│  Hour  │ Minute │ Second    │
├────────┼────────┼───────────┤
│   00   │   00   │    00     │
│   01   │   01   │    01     │
│   02   │   02   │    02     │
│  ...   │  ...   │   ...     │
│   23   │   59   │    59     │
├────────┴────────┴───────────┤
│     [Now]        [Clear]    │
└─────────────────────────────┘
```

### Picker Panel (12-hour)
```
┌─────────────────────────────┐
│  Hour  │ Minute │ AM/PM     │
├────────┼────────┼───────────┤
│   12   │   00   │    AM     │
│   01   │   01   │    PM     │
│   02   │   02   │           │
│  ...   │  ...   │           │
│   11   │   59   │           │
├────────┴────────┴───────────┤
│     [Now]        [Clear]    │
└─────────────────────────────┘
```

## CSS Parts

```css
::part(container)         /* Main container */
::part(input-wrapper)     /* Input wrapper */
::part(input)             /* Time input field */
::part(icon)              /* Clock icon */
::part(toggle)            /* Dropdown toggle */
::part(label)             /* Label element */
::part(helper-text)       /* Helper text */
::part(error-text)        /* Error message */

::part(panel)             /* Picker panel */
::part(column-header)     /* Column header */
::part(column)            /* Time column */
::part(item)              /* Time item */
::part(item-selected)     /* Selected time item */
::part(item-disabled)     /* Disabled time item */
::part(period-toggle)     /* AM/PM toggle */
::part(actions)           /* Action buttons container */
::part(now-button)        /* Now button */
::part(clear-button)      /* Clear button */
```

## CSS Custom Properties

```css
/* Container */
--ha-time-picker-width: 280px;
--ha-time-picker-border-radius: var(--ha-border-radius);

/* Input */
--ha-time-picker-input-height: 40px;
--ha-time-picker-input-padding: var(--ha-spacing-2);
--ha-time-picker-input-border: 1px solid var(--ha-color-border);
--ha-time-picker-input-bg: var(--ha-color-background);
--ha-time-picker-input-color: var(--ha-color-text);

/* Panel */
--ha-time-picker-panel-width: 280px;
--ha-time-picker-panel-max-height: 300px;
--ha-time-picker-panel-bg: var(--ha-color-surface);
--ha-time-picker-panel-shadow: var(--ha-shadow-lg);

/* Column */
--ha-time-picker-column-width: 80px;
--ha-time-picker-item-height: 32px;
--ha-time-picker-item-padding: var(--ha-spacing-2);

/* Item states */
--ha-time-picker-item-hover-bg: var(--ha-color-primary-50);
--ha-time-picker-item-selected-bg: var(--ha-color-primary);
--ha-time-picker-item-selected-color: var(--ha-color-primary-contrast);
--ha-time-picker-item-disabled-color: var(--ha-color-text-disabled);
--ha-time-picker-item-disabled-bg: var(--ha-color-background);

/* Error state */
--ha-time-picker-error-border: var(--ha-color-error);
--ha-time-picker-error-color: var(--ha-color-error);
```

## Implementation Details

### Time Format Handling
- **24-hour format**: 00:00 - 23:59
- **12-hour format**: 12:00 AM - 11:59 PM
- Support both with/without seconds
- Parse and format correctly for both modes

### Scroll Behavior
- Columns should be scrollable
- Auto-scroll selected item to center
- Smooth scrolling animation
- Keyboard navigation support

### Time Validation
```typescript
isTimeDisabled(hour: number, minute: number, second?: number): boolean {
  // Check minTime and maxTime
  // Check disabledHours array
  // Check disabledMinutes array
  // Return true if disabled
}
```

### Value Synchronization
```typescript
// Internal state
private _hour: number = 0;
private _minute: number = 0;
private _second: number = 0;
private _period: 'AM' | 'PM' = 'AM';

// Parse input value
private parseValue(value: string): void {
  // Parse HH:mm or HH:mm:ss format
  // Update internal state
  // Handle 12/24 hour conversion
}

// Format output value
private formatValue(): string {
  // Format based on showSeconds
  // Return HH:mm or HH:mm:ss
}
```

### Keyboard Navigation
- **Arrow Up/Down**: Increment/decrement current column
- **Page Up/Down**: Increment/decrement by larger step
- **Home/End**: Go to min/max value
- **Tab**: Move between columns
- **Escape**: Close picker
- **Enter**: Confirm selection

## Test Requirements

### Unit Tests (70+ tests)

1. **Component Registration** (3 tests)
   - Should be defined as custom element
   - Should create instance
   - Should have correct tag name

2. **Default Values** (10 tests)
   - Default format is 24-hour
   - Default showSeconds is false
   - Default steps are 1
   - Default state properties
   - Null initial value

3. **Attributes** (10 tests)
   - All attributes can be set
   - Attribute changes reflect to properties
   - Boolean attributes work correctly

4. **Time Selection** (8 tests)
   - Can select hour
   - Can select minute
   - Can select second (when enabled)
   - Can select AM/PM (12-hour mode)
   - Time-select event is fired
   - Event detail contains correct values

5. **Time Formatting** (8 tests)
   - 24-hour format displays correctly
   - 12-hour format displays correctly
   - Seconds display when enabled
   - Value parsing works correctly
   - 12/24 hour conversion works

6. **Picker Open/Close** (8 tests)
   - Opens on input click
   - Opens on toggle click
   - Closes on outside click
   - Closes on Escape key
   - Does not open when disabled
   - Does not open when readonly
   - Events are fired

7. **Time Restrictions** (8 tests)
   - minTime restricts selection
   - maxTime restricts selection
   - disabledHours work
   - disabledMinutes work
   - isTimeDisabled method works

8. **Validation** (5 tests)
   - Valid time passes validation
   - Empty required field fails
   - Time outside min/max fails
   - Disabled time fails
   - validate() method works

9. **Inline Mode** (2 tests)
   - Inline mode always shows picker
   - Inline mode doesn't close

10. **Step Configuration** (5 tests)
    - Hour step works
    - Minute step works
    - Second step works
    - Only valid values are shown

11. **Public API** (12 tests)
    - getValue returns correct value
    - setValue updates display
    - clear() clears value
    - open() opens picker
    - close() closes picker
    - toggle() toggles picker
    - setNow() sets current time
    - setTime() sets specific time
    - validate() returns boolean
    - isTimeDisabled() checks restriction

12. **Edge Cases** (6 tests)
    - Invalid value format
    - Midnight (00:00 vs 12:00 AM)
    - Noon (12:00 vs 12:00 PM)
    - Value out of range
    - Hour step edge cases
    - Minute step edge cases

## Implementation Phases

### Phase 1: Core Component
- [ ] Create time-picker.ts
- [ ] Implement basic structure
- [ ] Add value management
- [ ] Add time parsing/formatting
- [ ] Add 24-hour support

### Phase 2: 12-Hour Format
- [ ] Add 12-hour mode
- [ ] Implement AM/PM toggle
- [ ] Add conversion logic

### Phase 3: Picker UI
- [ ] Create column layout
- [ ] Add scrollable columns
- [ ] Implement item selection
- [ ] Add scroll-to-center behavior

### Phase 4: Features
- [ ] Add step configuration
- [ ] Add time restrictions
- [ ] Add Now button
- [ ] Add Clear button
- [ ] Add seconds support

### Phase 5: Styling
- [ ] Create time-picker.styles.ts
- [ ] Add responsive layout
- [ ] Add state styles
- [ ] Add animations

### Phase 6: Testing
- [ ] Write all unit tests
- [ ] Test keyboard navigation
- [ ] Test edge cases
- [ ] Ensure 100% coverage

### Phase 7: Framework Integration
- [ ] Create React wrapper
- [ ] Create Vue wrapper
- [ ] Add TypeScript types
- [ ] Update exports

### Phase 8: Documentation
- [ ] Create Storybook stories
- [ ] Add usage examples
- [ ] Document all features

## Technical Considerations

1. **No External Dependencies**: Use native Date API only
2. **Accessibility**: Full keyboard navigation and ARIA support
3. **Performance**: Efficient column rendering (virtualization if needed)
4. **Responsive**: Works on mobile and desktop
5. **Themeable**: Uses CSS custom properties
6. **Framework Agnostic**: Core is pure Web Component

## Success Criteria

- [ ] All 70+ tests passing
- [ ] Both 12-hour and 24-hour formats work
- [ ] Keyboard navigation fully functional
- [ ] All time restrictions work correctly
- [ ] React and Vue wrappers complete
- [ ] Storybook stories comprehensive
- [ ] No accessibility violations
- [ ] TypeScript types complete
- [ ] Documentation complete

## Files to Create/Modify

### New Files
- `/packages/core/src/components/time-picker/time-picker.ts`
- `/packages/core/src/components/time-picker/time-picker.styles.ts`
- `/packages/core/src/components/time-picker/time-picker.test.ts`
- `/packages/core/src/components/time-picker/index.ts`
- `/packages/react/src/TimePicker.tsx`
- `/packages/vue/src/TimePicker.vue`
- `/packages/storybook/src/stories/TimePicker.stories.ts`

### Modified Files
- `/packages/core/src/index.ts` (add exports)
- `/packages/react/src/index.ts` (add exports)
- `/packages/react/src/custom-elements.d.ts` (add JSX type)
- `/packages/vue/src/index.ts` (add exports)
- `/packages/vue/src/types.ts` (add props interface)
