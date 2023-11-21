/// <reference types="vitest"/>
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths(),
    AutoImport({
      // So that vitest recognizes definestore()
      imports: ['vue', 'vue/macros', 'pinia']
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    deps: {
      inline: ['vuetify']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      '~': fileURLToPath(new URL('.', import.meta.url)),
      '#imports': '<rootDir>/.nuxt/imports.d.ts'
    }
  }
})
