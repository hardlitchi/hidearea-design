import { describe, it, expect, vi } from 'vitest';
import { createPlugin } from '../helpers.js';
import type { PluginContext } from '../types.js';

describe('createPlugin', () => {
  it('should create a plugin with metadata', () => {
    const plugin = createPlugin({
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
      },
      install: vi.fn(),
    });

    expect(plugin.metadata.id).toBe('test-plugin');
    expect(plugin.metadata.name).toBe('Test Plugin');
    expect(plugin.metadata.version).toBe('1.0.0');
  });

  it('should create a plugin with install method', () => {
    const install = vi.fn();
    const plugin = createPlugin({
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
      },
      install,
    });

    const mockContext = {} as PluginContext;
    plugin.install(mockContext);

    expect(install).toHaveBeenCalledWith(mockContext);
  });

  it('should create a plugin with lifecycle hooks', () => {
    const onInstall = vi.fn();
    const onUninstall = vi.fn();
    const onActivate = vi.fn();
    const onDeactivate = vi.fn();

    const plugin = createPlugin({
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
      },
      install: vi.fn(),
      onInstall,
      onUninstall,
      onActivate,
      onDeactivate,
    });

    expect(plugin.onInstall).toBe(onInstall);
    expect(plugin.onUninstall).toBe(onUninstall);
    expect(plugin.onActivate).toBe(onActivate);
    expect(plugin.onDeactivate).toBe(onDeactivate);
  });

  it('should create a plugin with optional metadata fields', () => {
    const plugin = createPlugin({
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
        description: 'Test description',
        author: 'Test Author',
        dependencies: ['dep1', 'dep2'],
      },
      install: vi.fn(),
    });

    expect(plugin.metadata.description).toBe('Test description');
    expect(plugin.metadata.author).toBe('Test Author');
    expect(plugin.metadata.dependencies).toEqual(['dep1', 'dep2']);
  });

  it('should create a plugin without optional hooks', () => {
    const plugin = createPlugin({
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
      },
      install: vi.fn(),
    });

    expect(plugin.onInstall).toBeUndefined();
    expect(plugin.onUninstall).toBeUndefined();
    expect(plugin.onActivate).toBeUndefined();
    expect(plugin.onDeactivate).toBeUndefined();
  });

  it('should support async install method', async () => {
    const install = vi.fn().mockResolvedValue(undefined);
    const plugin = createPlugin({
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
      },
      install,
    });

    const mockContext = {} as PluginContext;
    await plugin.install(mockContext);

    expect(install).toHaveBeenCalledWith(mockContext);
  });

  it('should support async lifecycle hooks', async () => {
    const onActivate = vi.fn().mockResolvedValue(undefined);
    const plugin = createPlugin({
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
      },
      install: vi.fn(),
      onActivate,
    });

    const mockContext = {} as PluginContext;
    await plugin.onActivate?.(mockContext);

    expect(onActivate).toHaveBeenCalledWith(mockContext);
  });
});
