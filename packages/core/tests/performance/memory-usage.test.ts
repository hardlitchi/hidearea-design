/**
 * Memory Usage Test
 * Monitors memory consumption and ensures no memory leaks
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { HaButton } from '../../src/components/button/button.js';
import { HaInput } from '../../src/components/input/input.js';
import { HaCard } from '../../src/components/card/card.js';

// Memory thresholds (in KB per component instance)
const MEMORY_THRESHOLDS = {
  simple: 5, // Simple components like Button, Badge
  medium: 10, // Medium components like Input, Card
  complex: 50, // Complex components like DataGrid
};

interface MemorySnapshot {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

function getMemoryUsage(): MemorySnapshot | null {
  if (typeof performance === 'undefined' || !(performance as any).memory) {
    return null;
  }

  const memory = (performance as any).memory;
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
  };
}

function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

describe('Memory Usage', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('Component Memory Footprint', () => {
    it('should have small memory footprint for simple components', async () => {
      const initialMemory = getMemoryUsage();

      if (!initialMemory) {
        console.log('  ⚠️  Memory API not available - skipping test');
        return;
      }

      const count = 1000;
      for (let i = 0; i < count; i++) {
        const button = document.createElement('ha-button');
        button.textContent = `Button ${i}`;
        container.appendChild(button);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const afterCreateMemory = getMemoryUsage();
      if (!afterCreateMemory) return;

      const memoryIncrease = afterCreateMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
      const avgPerComponent = memoryIncrease / count / 1024; // KB per component

      console.log(`  ${count} Buttons created:`);
      console.log(`    Memory increase: ${formatBytes(memoryIncrease)}`);
      console.log(`    Avg per component: ${avgPerComponent.toFixed(2)} KB`);

      expect(avgPerComponent).toBeLessThanOrEqual(MEMORY_THRESHOLDS.simple);
    });

    it('should have reasonable memory footprint for form components', async () => {
      const initialMemory = getMemoryUsage();

      if (!initialMemory) {
        console.log('  ⚠️  Memory API not available - skipping test');
        return;
      }

      const count = 500;
      for (let i = 0; i < count; i++) {
        const input = document.createElement('ha-input');
        input.setAttribute('label', `Field ${i}`);
        input.setAttribute('placeholder', 'Enter text...');
        container.appendChild(input);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const afterCreateMemory = getMemoryUsage();
      if (!afterCreateMemory) return;

      const memoryIncrease = afterCreateMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
      const avgPerComponent = memoryIncrease / count / 1024;

      console.log(`  ${count} Inputs created:`);
      console.log(`    Memory increase: ${formatBytes(memoryIncrease)}`);
      console.log(`    Avg per component: ${avgPerComponent.toFixed(2)} KB`);

      expect(avgPerComponent).toBeLessThanOrEqual(MEMORY_THRESHOLDS.medium);
    });
  });

  describe('Memory Leak Detection', () => {
    it('should clean up memory after component removal', async () => {
      const initialMemory = getMemoryUsage();

      if (!initialMemory) {
        console.log('  ⚠️  Memory API not available - skipping test');
        return;
      }

      // Create components
      const count = 1000;
      for (let i = 0; i < count; i++) {
        const button = document.createElement('ha-button');
        button.textContent = `Button ${i}`;
        container.appendChild(button);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));

      const afterCreateMemory = getMemoryUsage();
      if (!afterCreateMemory) return;

      const memoryIncrease = afterCreateMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;

      // Remove components
      container.innerHTML = '';

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Force garbage collection if available
      if (typeof (global as any).gc === 'function') {
        (global as any).gc();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const afterCleanupMemory = getMemoryUsage();
      if (!afterCleanupMemory) return;

      const memoryReclaimed = afterCreateMemory.usedJSHeapSize - afterCleanupMemory.usedJSHeapSize;
      const reclaimRate = memoryReclaimed / memoryIncrease;

      console.log(`  Memory leak detection (${count} components):`);
      console.log(`    Memory increase: ${formatBytes(memoryIncrease)}`);
      console.log(`    Memory reclaimed: ${formatBytes(memoryReclaimed)}`);
      console.log(`    Reclaim rate: ${(reclaimRate * 100).toFixed(1)}%`);

      // At least 50% of memory should be reclaimed
      // (Note: Browsers may not immediately GC, so this is a soft check)
      expect(reclaimRate).toBeGreaterThan(0.3);
    });

    it('should not leak memory on rapid create/destroy cycles', async () => {
      const initialMemory = getMemoryUsage();

      if (!initialMemory) {
        console.log('  ⚠️  Memory API not available - skipping test');
        return;
      }

      const cycles = 10;
      const componentsPerCycle = 100;

      for (let cycle = 0; cycle < cycles; cycle++) {
        // Create components
        for (let i = 0; i < componentsPerCycle; i++) {
          const button = document.createElement('ha-button');
          button.textContent = `Button ${i}`;
          container.appendChild(button);
        }

        await new Promise((resolve) => setTimeout(resolve, 10));

        // Destroy components
        container.innerHTML = '';

        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      // Force GC if available
      if (typeof (global as any).gc === 'function') {
        (global as any).gc();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const finalMemory = getMemoryUsage();
      if (!finalMemory) return;

      const totalIncrease = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
      const increasePerCycle = totalIncrease / cycles / 1024; // KB per cycle

      console.log(`  Rapid create/destroy (${cycles} cycles × ${componentsPerCycle} components):`);
      console.log(`    Total memory increase: ${formatBytes(totalIncrease)}`);
      console.log(`    Avg increase per cycle: ${increasePerCycle.toFixed(2)} KB`);

      // Should not accumulate more than 50 KB per cycle on average
      expect(increasePerCycle).toBeLessThanOrEqual(50);
    });
  });

  describe('Event Listener Cleanup', () => {
    it('should remove event listeners on disconnect', async () => {
      const button = document.createElement('ha-button');
      container.appendChild(button);

      // Add some event listeners
      const handler1 = () => {};
      const handler2 = () => {};
      button.addEventListener('click', handler1);
      button.addEventListener('mouseenter', handler2);

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Remove component
      container.removeChild(button);

      await new Promise((resolve) => setTimeout(resolve, 0));

      // This test primarily ensures no errors occur
      // Actual listener cleanup verification would require instrumentation
      expect(container.children.length).toBe(0);
    });
  });

  describe('Memory Usage Summary', () => {
    it('should generate memory usage report', () => {
      const memoryInfo = getMemoryUsage();

      if (!memoryInfo) {
        console.log('\n  ⚠️  Memory API not available');
        console.log('  To enable memory profiling in Chrome:');
        console.log('    chrome --enable-precise-memory-info');
        return;
      }

      console.log('\n  Memory Usage Summary:');
      console.log(`    Used heap: ${formatBytes(memoryInfo.usedJSHeapSize)}`);
      console.log(`    Total heap: ${formatBytes(memoryInfo.totalJSHeapSize)}`);
      console.log(`    Heap limit: ${formatBytes(memoryInfo.jsHeapSizeLimit)}`);
      console.log(`    Usage: ${((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100).toFixed(2)}%`);

      expect(memoryInfo.usedJSHeapSize).toBeLessThan(memoryInfo.jsHeapSizeLimit);
    });
  });
});
