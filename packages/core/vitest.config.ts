import { defineConfig } from 'vitest/config'
import { VIEWPORT } from './src/__internal/const'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      // https://playwright.dev
      providerOptions: {},
      viewport: VIEWPORT,
    },
    coverage: {
      provider: 'istanbul',
    },
  },
})
