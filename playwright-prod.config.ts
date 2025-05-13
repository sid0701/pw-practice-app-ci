import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './test-options';

require('dotenv').config()

export default defineConfig<TestOptions>({

  use: {
    baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://globalsqa.com/demo-site/draganddrop/',
  },

  projects: [
    {
      name: 'chromium'
    }
  ],
});
