import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PluginManager } from '../plugin-manager.js';
import { createPlugin } from '../helpers.js';
import type { Plugin } from '../types.js';

describe('PluginManager', () => {
  let manager: PluginManager;

  beforeEach(() => {
    // 各テストの前にシングルトンをリセット
    PluginManager.resetInstance();
    // 新しいインスタンスを取得
    manager = PluginManager.getInstance({ enableLogging: false });
  });

  describe('register', () => {
    it('should register and install a plugin', async () => {
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      await manager.register(plugin);

      expect(manager.isInstalled('test-plugin')).toBe(true);
      expect(plugin.install).toHaveBeenCalled();
    });

    it('should auto-activate plugin when autoActivate is true', async () => {
      const onActivate = vi.fn();
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
        onActivate,
      });

      await manager.register(plugin, { autoActivate: true });

      expect(manager.isActive('test-plugin')).toBe(true);
      expect(onActivate).toHaveBeenCalled();
    });

    it('should not auto-activate plugin when autoActivate is false', async () => {
      const onActivate = vi.fn();
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
        onActivate,
      });

      await manager.register(plugin, { autoActivate: false });

      expect(manager.isActive('test-plugin')).toBe(false);
      expect(onActivate).not.toHaveBeenCalled();
    });

    it('should throw error if plugin with same id already registered', async () => {
      const plugin1 = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      const plugin2 = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin 2',
          version: '2.0.0',
        },
        install: vi.fn(),
      });

      await manager.register(plugin1);
      await expect(manager.register(plugin2)).rejects.toThrow('already registered');
    });

    it('should throw error if dependency is not installed', async () => {
      const plugin = createPlugin({
        metadata: {
          id: 'dependent-plugin',
          name: 'Dependent Plugin',
          version: '1.0.0',
          dependencies: ['missing-plugin'],
        },
        install: vi.fn(),
      });

      await expect(manager.register(plugin)).rejects.toThrow('depends on');
    });

    it('should register plugin with dependencies', async () => {
      const basePlugin = createPlugin({
        metadata: {
          id: 'base-plugin',
          name: 'Base Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      const dependentPlugin = createPlugin({
        metadata: {
          id: 'dependent-plugin',
          name: 'Dependent Plugin',
          version: '1.0.0',
          dependencies: ['base-plugin'],
        },
        install: vi.fn(),
      });

      await manager.register(basePlugin);
      await manager.register(dependentPlugin);

      expect(manager.isInstalled('base-plugin')).toBe(true);
      expect(manager.isInstalled('dependent-plugin')).toBe(true);
    });
  });

  describe('install', () => {
    it('should call install and onInstall hooks', async () => {
      const install = vi.fn();
      const onInstall = vi.fn();
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install,
        onInstall,
      });

      await manager.register(plugin, { autoActivate: false });

      expect(install).toHaveBeenCalled();
      expect(onInstall).toHaveBeenCalled();
    });

    it('should transition to installed state', async () => {
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      await manager.register(plugin, { autoActivate: false });

      const entry = manager.getPlugin('test-plugin');
      expect(entry?.state).toBe('installed');
    });
  });

  describe('activate', () => {
    it('should call onActivate hook', async () => {
      const onActivate = vi.fn();
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
        onActivate,
      });

      await manager.register(plugin);
      await manager.activate('test-plugin');

      expect(onActivate).toHaveBeenCalled();
      expect(manager.isActive('test-plugin')).toBe(true);
    });

    it('should transition to active state', async () => {
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      await manager.register(plugin);
      await manager.activate('test-plugin');

      const entry = manager.getPlugin('test-plugin');
      expect(entry?.state).toBe('active');
    });

    it('should throw error if plugin not found', async () => {
      await expect(manager.activate('non-existent')).rejects.toThrow('not registered');
    });
  });

  describe('deactivate', () => {
    it('should call onDeactivate hook', async () => {
      const onDeactivate = vi.fn();
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
        onDeactivate,
      });

      await manager.register(plugin, { autoActivate: true });
      await manager.deactivate('test-plugin');

      expect(onDeactivate).toHaveBeenCalled();
      expect(manager.isActive('test-plugin')).toBe(false);
    });

    it('should transition to inactive state', async () => {
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      await manager.register(plugin, { autoActivate: true });
      await manager.deactivate('test-plugin');

      const entry = manager.getPlugin('test-plugin');
      expect(entry?.state).toBe('inactive');
    });
  });

  describe('uninstall', () => {
    it('should call onUninstall hook and cleanup', async () => {
      const onUninstall = vi.fn();
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
        onUninstall,
      });

      await manager.register(plugin);
      await manager.uninstall('test-plugin');

      expect(onUninstall).toHaveBeenCalled();
      expect(manager.isInstalled('test-plugin')).toBe(false);
    });

    it('should deactivate plugin before uninstalling', async () => {
      const onDeactivate = vi.fn();
      const onUninstall = vi.fn();
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
        onDeactivate,
        onUninstall,
      });

      await manager.register(plugin, { autoActivate: true });
      await manager.uninstall('test-plugin');

      expect(onDeactivate).toHaveBeenCalled();
      expect(onUninstall).toHaveBeenCalled();
    });

    it('should remove plugin from registry', async () => {
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      await manager.register(plugin);
      await manager.uninstall('test-plugin');

      expect(manager.getPlugin('test-plugin')).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('should transition to error state on install failure', async () => {
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn().mockRejectedValue(new Error('Install failed')),
      });

      await expect(manager.register(plugin)).rejects.toThrow('Install failed');

      const entry = manager.getPlugin('test-plugin');
      expect(entry?.state).toBe('error');
    });

    it('should transition to error state on activate failure', async () => {
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
        onActivate: vi.fn().mockRejectedValue(new Error('Activate failed')),
      });

      await manager.register(plugin, { autoActivate: false });
      await expect(manager.activate('test-plugin')).rejects.toThrow('Activate failed');

      const entry = manager.getPlugin('test-plugin');
      expect(entry?.state).toBe('error');
    });
  });

  describe('getPlugin and getAllPlugins', () => {
    it('should get plugin by id', async () => {
      const plugin = createPlugin({
        metadata: {
          id: 'test-plugin',
          name: 'Test Plugin',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      await manager.register(plugin);
      const entry = manager.getPlugin('test-plugin');

      expect(entry).toBeDefined();
      expect(entry?.plugin.metadata.id).toBe('test-plugin');
    });

    it('should return undefined for non-existent plugin', () => {
      const entry = manager.getPlugin('non-existent');
      expect(entry).toBeUndefined();
    });

    it('should get all plugins', async () => {
      const plugin1 = createPlugin({
        metadata: {
          id: 'plugin-1',
          name: 'Plugin 1',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      const plugin2 = createPlugin({
        metadata: {
          id: 'plugin-2',
          name: 'Plugin 2',
          version: '1.0.0',
        },
        install: vi.fn(),
      });

      await manager.register(plugin1);
      await manager.register(plugin2);

      const allPlugins = manager.getAllPlugins();
      expect(allPlugins.size).toBe(2);
      expect(allPlugins.has('plugin-1')).toBe(true);
      expect(allPlugins.has('plugin-2')).toBe(true);
    });
  });
});
