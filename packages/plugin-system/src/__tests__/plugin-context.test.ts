import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { PluginContextImpl, DefaultLogger } from '../plugin-context.js';
import type { PluginMetadata, ThemeDefinition } from '../types.js';

describe('PluginContextImpl', () => {
  let context: PluginContextImpl;
  let metadata: PluginMetadata;
  let logger: DefaultLogger;

  beforeEach(() => {
    metadata = {
      id: 'test-plugin',
      name: 'Test Plugin',
      version: '1.0.0',
    };
    logger = new DefaultLogger('test-plugin', true);
    context = new PluginContextImpl(metadata, {}, logger);
  });

  afterEach(() => {
    // クリーンアップ
    context.cleanup();
  });

  describe('registerComponent', () => {
    it('should register a custom element', () => {
      class TestComponent extends HTMLElement {}

      context.registerComponent('test-element', TestComponent);

      expect(customElements.get('test-element')).toBe(TestComponent);
      expect(context.getRegisteredComponents().has('test-element')).toBe(true);
    });

    it('should warn when overwriting existing component', () => {
      const warnSpy = vi.spyOn(logger, 'warn');
      class TestComponent extends HTMLElement {}

      context.registerComponent('test-element-2', TestComponent);
      context.registerComponent('test-element-2', TestComponent);

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('already registered')
      );
    });

    it('should not register if already in customElements registry', () => {
      class TestComponent extends HTMLElement {}
      customElements.define('pre-existing', TestComponent);

      const warnSpy = vi.spyOn(logger, 'warn');
      context.registerComponent('pre-existing', TestComponent);

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('already defined')
      );
    });
  });

  describe('registerTheme', () => {
    it('should register and apply a theme', () => {
      const theme: ThemeDefinition = {
        name: 'test-theme',
        tokens: {
          '--test-color': '#ff0000',
          '--test-spacing': '1rem',
        },
      };

      context.registerTheme('test-theme', theme);

      const root = document.documentElement;
      expect(root.style.getPropertyValue('--test-color')).toBe('#ff0000');
      expect(root.style.getPropertyValue('--test-spacing')).toBe('1rem');
      expect(context.getRegisteredThemes().has('test-theme')).toBe(true);
    });

    it('should apply theme styles', () => {
      const theme: ThemeDefinition = {
        name: 'test-theme',
        tokens: {},
        styles: '.test-class { color: red; }',
      };

      context.registerTheme('test-theme', theme);

      const styleElements = document.querySelectorAll(
        `style[data-plugin="${metadata.id}"]`
      );
      expect(styleElements.length).toBeGreaterThan(0);
    });

    it('should apply dark mode tokens', () => {
      const theme: ThemeDefinition = {
        name: 'test-theme',
        tokens: {
          '--test-color': '#ffffff',
        },
        dark: {
          tokens: {
            '--test-color-dark': '#000000',
          },
        },
      };

      context.registerTheme('test-theme', theme);

      // ダークモード用のスタイルが追加されているか確認
      const styleElements = document.querySelectorAll(
        `style[data-plugin="${metadata.id}"]`
      );
      const hasMediaQuery = Array.from(styleElements).some(el =>
        el.textContent?.includes('@media (prefers-color-scheme: dark)')
      );
      expect(hasMediaQuery).toBe(true);
    });
  });

  describe('extendTokens', () => {
    it('should extend design tokens', () => {
      const tokens = {
        '--custom-token-1': 'value1',
        '--custom-token-2': 'value2',
      };

      context.extendTokens(tokens);

      const root = document.documentElement;
      expect(root.style.getPropertyValue('--custom-token-1')).toBe('value1');
      expect(root.style.getPropertyValue('--custom-token-2')).toBe('value2');
      expect(context.getExtendedTokens()).toEqual(tokens);
    });

    it('should merge multiple token extensions', () => {
      context.extendTokens({ '--token-1': 'value1' });
      context.extendTokens({ '--token-2': 'value2' });

      const extendedTokens = context.getExtendedTokens();
      expect(extendedTokens).toEqual({
        '--token-1': 'value1',
        '--token-2': 'value2',
      });
    });
  });

  describe('addGlobalStyles', () => {
    it('should add global styles to document', () => {
      const styles = '.test { color: blue; }';

      context.addGlobalStyles(styles);

      const styleElement = document.querySelector(
        `style[data-plugin="${metadata.id}"]`
      );
      expect(styleElement).toBeDefined();
      expect(styleElement?.textContent).toBe(styles);
    });

    it('should add multiple style elements', () => {
      context.addGlobalStyles('.style1 { color: red; }');
      context.addGlobalStyles('.style2 { color: blue; }');

      const styleElements = document.querySelectorAll(
        `style[data-plugin="${metadata.id}"]`
      );
      expect(styleElements.length).toBe(2);
    });
  });

  describe('event system', () => {
    it('should register and emit events', () => {
      const handler = vi.fn();

      context.on('test-event', handler);
      context.emit('test-event', 'arg1', 'arg2');

      expect(handler).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should support multiple handlers for same event', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      context.on('test-event', handler1);
      context.on('test-event', handler2);
      context.emit('test-event');

      expect(handler1).toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
    });

    it('should remove event handler', () => {
      const handler = vi.fn();

      context.on('test-event', handler);
      context.off('test-event', handler);
      context.emit('test-event');

      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle errors in event handlers', () => {
      const errorSpy = vi.spyOn(logger, 'error');
      const failingHandler = vi.fn(() => {
        throw new Error('Handler error');
      });
      const successHandler = vi.fn();

      context.on('test-event', failingHandler);
      context.on('test-event', successHandler);
      context.emit('test-event');

      expect(errorSpy).toHaveBeenCalled();
      expect(successHandler).toHaveBeenCalled();
    });

    it('should not emit to non-existent event', () => {
      // エラーが発生しないことを確認
      expect(() => context.emit('non-existent')).not.toThrow();
    });
  });

  describe('cleanup', () => {
    it('should remove all style elements', () => {
      context.addGlobalStyles('.style1 {}');
      context.addGlobalStyles('.style2 {}');

      expect(
        document.querySelectorAll(`style[data-plugin="${metadata.id}"]`).length
      ).toBeGreaterThan(0);

      context.cleanup();

      expect(
        document.querySelectorAll(`style[data-plugin="${metadata.id}"]`).length
      ).toBe(0);
    });

    it('should clear all event handlers', () => {
      const handler = vi.fn();

      context.on('test-event', handler);
      context.cleanup();
      context.emit('test-event');

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('getters', () => {
    it('should get registered components', () => {
      class TestComponent extends HTMLElement {}
      context.registerComponent('test-comp', TestComponent);

      const components = context.getRegisteredComponents();
      expect(components.has('test-comp')).toBe(true);
      expect(components.get('test-comp')).toBe(TestComponent);
    });

    it('should get registered themes', () => {
      const theme: ThemeDefinition = {
        name: 'test-theme',
        tokens: {},
      };
      context.registerTheme('test-theme', theme);

      const themes = context.getRegisteredThemes();
      expect(themes.has('test-theme')).toBe(true);
      expect(themes.get('test-theme')).toBe(theme);
    });

    it('should get extended tokens', () => {
      const tokens = { '--token': 'value' };
      context.extendTokens(tokens);

      const extendedTokens = context.getExtendedTokens();
      expect(extendedTokens).toEqual(tokens);
    });
  });
});

describe('DefaultLogger', () => {
  let logger: DefaultLogger;
  let consoleSpy: {
    log: ReturnType<typeof vi.spyOn>;
    warn: ReturnType<typeof vi.spyOn>;
    error: ReturnType<typeof vi.spyOn>;
  };

  beforeEach(() => {
    logger = new DefaultLogger('test-plugin', true);
    consoleSpy = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    consoleSpy.log.mockRestore();
    consoleSpy.warn.mockRestore();
    consoleSpy.error.mockRestore();
  });

  it('should log info messages', () => {
    logger.info('Test message');

    expect(consoleSpy.log).toHaveBeenCalledWith(
      '[Plugin:test-plugin]',
      'Test message'
    );
  });

  it('should log warning messages', () => {
    logger.warn('Warning message');

    expect(consoleSpy.warn).toHaveBeenCalledWith(
      '[Plugin:test-plugin]',
      'Warning message'
    );
  });

  it('should log error messages', () => {
    logger.error('Error message');

    expect(consoleSpy.error).toHaveBeenCalledWith(
      '[Plugin:test-plugin]',
      'Error message'
    );
  });

  it('should not log when disabled', () => {
    logger.setEnabled(false);
    logger.info('Test message');

    expect(consoleSpy.log).not.toHaveBeenCalled();
  });

  it('should log with additional arguments', () => {
    logger.info('Message', { key: 'value' }, 123);

    expect(consoleSpy.log).toHaveBeenCalledWith(
      '[Plugin:test-plugin]',
      'Message',
      { key: 'value' },
      123
    );
  });
});
