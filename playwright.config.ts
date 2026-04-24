import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    // Set the base URL for tests to simplify the TodoPage goto method
    baseURL: 'http://localhost:8080',
    // Disable headless mode to see the browser window
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
});