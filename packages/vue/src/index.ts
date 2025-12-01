import type { App } from 'vue';
import Button from './Button.vue';
import Input from './Input.vue';
import Checkbox from './Checkbox.vue';
import Container from './Container.vue';
import Grid from './Grid.vue';
import Stack from './Stack.vue';
import Alert from './Alert.vue';
import Badge from './Badge.vue';

export { Button, Input, Checkbox, Container, Grid, Stack, Alert, Badge };
export type {
  ButtonProps,
  InputProps,
  CheckboxProps,
  ContainerProps,
  GridProps,
  StackProps,
  AlertProps,
  BadgeProps,
} from './types';

// Vue plugin for installing all components
export default {
  install(app: App) {
    app.component('HaButton', Button);
    app.component('HaInput', Input);
    app.component('HaCheckbox', Checkbox);
    app.component('HaContainer', Container);
    app.component('HaGrid', Grid);
    app.component('HaStack', Stack);
    app.component('HaAlert', Alert);
    app.component('HaBadge', Badge);
  },
};
