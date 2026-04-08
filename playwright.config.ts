import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: process.env.CI ? [['github'], ['list']] : 'html',

  // Longer timeouts in CI — cold webpack compilation on first page visit
  timeout: process.env.CI ? 60_000 : 30_000,

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: process.env.CI ? 60_000 : 30_000,
    actionTimeout: process.env.CI ? 30_000 : 15_000,
  },

  projects: [
    // Desktop browsers
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },

    // Mobile
    { name: 'Mobile Chrome', use: { ...devices['Pixel 7'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 14'] } },
  ],

  webServer: {
    // Use plain webpack dev server in CI (no turbopack) — more stable for cold starts
    command: process.env.CI ? 'npx next dev' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    // Extra time in CI for webpack initial compilation
    timeout: process.env.CI ? 180_000 : 120_000,
  },
});
