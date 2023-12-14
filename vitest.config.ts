/// <reference types="vitest"/>
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vuetify']
    }
  },
  plugins: [
    vue(),
    tsconfigPaths(),
    AutoImport({
      // So that vitest recognizes definestore()
      imports: ['vue', 'vue/macros', 'pinia']
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      '~': fileURLToPath(new URL('.', import.meta.url)),
      '#imports': '<rootDir>/.nuxt/imports.d.ts'
    }
  }
})
