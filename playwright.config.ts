import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,

  outputDir: '.artifacts/test-results',

  reporter: [['html', { outputFolder: '.artifacts//html-report' }]],

  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
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
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
