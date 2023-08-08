import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/setupTests.ts']
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
