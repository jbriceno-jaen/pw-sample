import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined, // adjust if needed

  // Logs in once using SAUCE_USER/SAUCE_PASS and writes storage/auth.json
  globalSetup: './global-setup',

  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'storage/auth.json',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // Uncomment to add WebKit:
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});

