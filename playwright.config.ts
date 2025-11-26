import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  globalSetup: './global-setup',
  reporter: [
    ['html'],                          // existing HTML report
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'storage/auth.json',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',     // good for Allure attachments
    video: 'retain-on-failure',        // optional; also goes to Allure
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
