import Button from './Button.vue';
import type { ButtonProps } from './Button.vue';

export { Button };
export type { ButtonProps };

// Vue plugin for installing all components
export default {
  install(app: any) {
    app.component('HaButton', Button);
  },
};
