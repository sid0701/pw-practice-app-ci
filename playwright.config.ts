import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './test-options';

require('dotenv').config()

export default defineConfig<TestOptions>({
  timeout: 40000,
  // globalTimeout: 60000,
  expect: {
    timeout: 2000,
    toMatchSnapshot: { maxDiffPixels: 50 }
  },

  retries: 0,
  reporter: 'html',

  use: {
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
      : process.env.STAGING == '1' ? 'http://localhost:4202/'
        : 'http://localhost:4200/',
    globalsQaURL: 'https://globalsqa.com/demo-site/draganddrop/',

    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    }
  },

  projects: [
    {
      name: 'chromium'
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      },
    },
    {
      name: 'pageObjectsFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        // this is a setting for running in full screen
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro Max']
      },
    },
    //we can metion the dimenions in viewport instead of mentioning the mobile device as well
    {
      name: 'mobile using viewport',
      testMatch: 'testMobile.spec.ts',
      use: {
        viewport: { width: 414, height: 800 }
      },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }

});
