import React from 'react';
import { createComponent } from '@lit/react';
import { HaColorPicker } from '@hidearea-design/core';

export const ColorPicker = createComponent({
  tagName: 'ha-color-picker',
  elementClass: HaColorPicker,
  react: React,
  events: {
    onColorChange: 'color-change',
    onColorInput: 'color-input',
  },
});
