import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    sequence: {
      hooks: "stack", // Хуки выполняются последовательно
      tests: "list",  // Тесты выполняются в порядке объявления
    },
    globals: true,
    environment: 'jsdom',
    reporters: ['default', 'html'],
    outputFile: {
      html: './.vitest-reports/report.html'
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './.vitest-reports/coverage'
    },
    setupFiles: ['./vitest.setup.js']
  },
  assetsInclude: ['**/*.html']
})