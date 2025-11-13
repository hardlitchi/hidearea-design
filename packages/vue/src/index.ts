import Button from './Button.vue';
import Input from './Input.vue';
import Checkbox from './Checkbox.vue';

export { Button, Input, Checkbox };
export type { ButtonProps, InputProps, CheckboxProps } from './types';

// Vue plugin for installing all components
export default {
  install(app: any) {
    app.component('HaButton', Button);
    app.component('HaInput', Input);
    app.component('HaCheckbox', Checkbox);
  },
};
