import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api/v3': {
        target: 'https://ark.cn-beijing.volces.com',
        changeOrigin: true,
        timeout: 60000,  
        // rewrite: (path) => path.replace(/^\/api/, '')  // 如果需要重写路径，取消注释这行
      }
    }
  }
})
