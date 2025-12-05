import React from 'react';
import { createComponent } from '@lit/react';
import { HaSlider } from '@hidearea-design/core';

export const Slider = createComponent({
  tagName: 'ha-slider',
  elementClass: HaSlider,
  react: React,
  events: {
    onSliderChange: 'slider-change',
    onSliderInput: 'slider-input',
  },
});
