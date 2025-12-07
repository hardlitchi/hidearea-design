import { spyOn } from "storybook/test";
import type { Preview, Decorator } from "@storybook/web-components-vite";
import "@hidearea-design/tokens/build/css/variables.css";
import { initTheme, setTheme } from "@hidearea-design/core";

// Initialize theme on load
if (typeof window !== 'undefined') {
  initTheme();
}

// Theme decorator to apply theme changes
const withTheme: Decorator = (story, context) => {
  const theme = context.globals.theme || 'light';

  // Apply theme to document
  if (typeof window !== 'undefined') {
    setTheme(theme as 'light' | 'dark' | 'auto');
  }

  return story();
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#171717' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'auto'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

export const beforeEach = function beforeEach() {
  spyOn(console, "log").mockName("console.log");
  spyOn(console, "warn").mockName("console.warn");
  spyOn(console, "error").mockName("console.error");
  spyOn(console, "info").mockName("console.info");
  spyOn(console, "debug").mockName("console.debug");
  spyOn(console, "trace").mockName("console.trace");
  spyOn(console, "count").mockName("console.count");
  spyOn(console, "dir").mockName("console.dir");
  spyOn(console, "assert").mockName("console.assert");
};
