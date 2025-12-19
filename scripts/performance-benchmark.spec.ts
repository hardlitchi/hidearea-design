/**
 * Playwright Browser Performance Benchmark
 * Runs automated performance tests in a real browser
 */

import { test, expect } from '@playwright/test';

const BENCHMARK_URL = 'http://localhost:5173/scripts/performance-benchmark.html';

test.describe('Browser Performance Benchmark', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BENCHMARK_URL);
    // Wait for components to load
    await page.waitForLoadState('networkidle');
  });

  test('should load page within acceptable time', async ({ page }) => {
    const loadTime = await page.evaluate(() => performance.now());
    console.log(`Page load time: ${loadTime.toFixed(2)} ms`);

    // Page should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should render components efficiently', async ({ page }) => {
    // Click the render benchmark button
    await page.click('button:has-text("Run Render Benchmark")');

    // Wait for results
    await page.waitForSelector('#render-results .result', { timeout: 10000 });

    // Get all result elements
    const results = await page.locator('#render-results .result').all();

    expect(results.length).toBeGreaterThan(0);

    // Extract and log results
    for (const result of results) {
      const text = await result.textContent();
      const isFast = await result.evaluate((el) => el.classList.contains('fast'));
      const isMedium = await result.evaluate((el) => el.classList.contains('medium'));

      console.log(`  ${text} - ${isFast ? '🟢 Fast' : isMedium ? '🟡 Medium' : '🔴 Slow'}`);

      // Most components should be fast or medium
      const isSlow = await result.evaluate((el) => el.classList.contains('slow'));
      if (isSlow) {
        console.warn(`  ⚠️  Slow render detected: ${text}`);
      }
    }
  });

  test('should handle re-renders efficiently', async ({ page }) => {
    await page.click('button:has-text("Run Re-render Benchmark")');

    await page.waitForSelector('#rerender-results .result', { timeout: 10000 });

    const results = await page.locator('#rerender-results .result').all();

    expect(results.length).toBeGreaterThan(0);

    for (const result of results) {
      const text = await result.textContent();
      const isFast = await result.evaluate((el) => el.classList.contains('fast'));

      console.log(`  ${text} - ${isFast ? '🟢 Fast' : '🟡 Needs optimization'}`);
    }
  });

  test('should monitor memory usage', async ({ page }) => {
    await page.click('button:has-text("Run Memory Benchmark")');

    // Wait for results (longer timeout for memory benchmark)
    await page.waitForSelector('#memory-results .result', { timeout: 15000 });

    const results = await page.locator('#memory-results .result').all();

    if (results.length === 0) {
      console.log('  ⚠️  Memory API not available in this browser');
      return;
    }

    for (const result of results) {
      const text = await result.textContent();
      console.log(`  ${text}`);
    }

    // Check memory increase is reasonable
    const memoryIncreaseText = await page
      .locator('#memory-results .result:has-text("Memory Increase")')
      .textContent();

    if (memoryIncreaseText) {
      console.log(`  Memory increase for 1000 components: ${memoryIncreaseText}`);
    }
  });

  test('should measure Core Web Vitals', async ({ page }) => {
    // Measure CLS (Cumulative Layout Shift)
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 2000);
      });
    });

    console.log(`  CLS: ${cls}`);
    expect(cls).toBeLessThan(0.1); // CLS should be under 0.1

    // Measure LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve((lastEntry as any).renderTime || (lastEntry as any).loadTime);
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });

        setTimeout(() => {
          observer.disconnect();
        }, 2000);
      });
    });

    console.log(`  LCP: ${lcp} ms`);
    expect(lcp).toBeLessThan(2500); // LCP should be under 2.5s

    // Measure FID (First Input Delay) - simulated
    await page.click('button:has-text("Run Render Benchmark")');

    const fidStart = Date.now();
    await page.waitForSelector('#render-results .result:first-child');
    const fid = Date.now() - fidStart;

    console.log(`  FID (simulated): ${fid} ms`);
    expect(fid).toBeLessThan(100); // FID should be under 100ms
  });

  test('should export benchmark results', async ({ page }) => {
    // Run all benchmarks
    await page.click('button:has-text("Run Render Benchmark")');
    await page.waitForSelector('#render-results .result');

    await page.click('button:has-text("Run Re-render Benchmark")');
    await page.waitForSelector('#rerender-results .result');

    await page.click('button:has-text("Run Memory Benchmark")');
    await page.waitForTimeout(2000);

    // Collect all results
    const results = await page.evaluate(() => {
      const renderResults = Array.from(
        document.querySelectorAll('#render-results .result')
      ).map((el) => ({
        type: 'render',
        text: el.textContent?.trim(),
        fast: el.classList.contains('fast'),
        medium: el.classList.contains('medium'),
        slow: el.classList.contains('slow'),
      }));

      const rerenderResults = Array.from(
        document.querySelectorAll('#rerender-results .result')
      ).map((el) => ({
        type: 'rerender',
        text: el.textContent?.trim(),
        fast: el.classList.contains('fast'),
        medium: el.classList.contains('medium'),
        slow: el.classList.contains('slow'),
      }));

      const memoryResults = Array.from(
        document.querySelectorAll('#memory-results .result')
      ).map((el) => ({
        type: 'memory',
        text: el.textContent?.trim(),
      }));

      return {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        renderResults,
        rerenderResults,
        memoryResults,
      };
    });

    // Save results to file
    const fs = await import('fs/promises');
    await fs.writeFile(
      'benchmark-results.json',
      JSON.stringify(results, null, 2)
    );

    console.log('\n  Benchmark results exported to benchmark-results.json');
  });
});
