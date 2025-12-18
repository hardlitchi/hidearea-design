const mappings = {
  // Radius mappings
  '--radius-sm': '--border-radius-sm',
  '--radius-base': '--border-radius-base',
  '--radius-md': '--border-radius-md',
  '--radius-lg': '--border-radius-lg',
  '--radius-full': '--border-radius-full',

  // Duration/animation mappings
  '--duration-fast': '--duration-150',
  '--duration-base': '--duration-200',
  '--ease': '--easing-ease',
  '--ease-in': '--easing-ease-in',
  '--ease-out': '--easing-ease-out',

  // Font mappings
  '--font-family-base': '--font-family-sans',
  '--font-weight-regular': '--font-weight-normal',
  '--line-height-normal': '--line-height-normal',

  // Color mappings (legacy to semantic)
  '--color-text-primary': '--foreground-primary',
  '--color-text-secondary': '--foreground-secondary',
  '--color-text-disabled': '--foreground-disabled',
  '--color-background': '--background-primary',
  '--color-error': '--error-default',
  '--color-danger-600': '--error-default',
  '--color-danger-700': '--error-emphasis',
  '--color-danger-200': '--error-subtle',

  // Background/foreground
  '--background-disabled': '--background-disabled',
  '--foreground-disabled': '--foreground-disabled',
  '--border-hover': '--border-emphasis',

  // Muted colors
  '--info-muted': '--info-subtle',
  '--success-muted': '--success-subtle',
  '--warning-muted': '--warning-subtle',
  '--error-muted': '--error-subtle',
};

console.log('レガシー変数 → 新しいトークンのマッピング:');
console.log('='.repeat(60));
for (const [old, newVar] of Object.entries(mappings)) {
  console.log(`${old.padEnd(30)} → ${newVar}`);
}
