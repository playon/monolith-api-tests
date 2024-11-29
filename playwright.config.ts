import { defineConfig } from '@playwright/test';
import ApiCoverageReporter from './src/reporter/reporter';

require('dotenv').config({ path: `.env.${process.env.ENV}` });

const config = defineConfig({
  testDir: './src/spec',
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  workers: 5,
  forbidOnly: !!process.env.CI,
  reporter: [
    ['html', { outputFolder: 'test-results/html/', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit-report.xml' }],
    ['dot'],
    ['./src/reporter/reporter.ts'],
  ],
});

export default config;
