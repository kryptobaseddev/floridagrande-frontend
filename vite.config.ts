import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      // Handle Node.js built-in modules
      'node:events': 'events',
      'node:path': 'path-browserify',
      'node:process': 'process/browser',
      'node:util': 'util'
    }
  },
  define: {
    // Define global values
    'process.env': process.env
  },
  build: {
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: ['fsevents'],
      output: {
        // Global variables for external dependencies
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
}) 