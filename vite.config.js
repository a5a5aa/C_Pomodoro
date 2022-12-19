// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'
import ViteRadar from 'vite-plugin-radar'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true
    }),
    ViteRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-E5Z3VCKX36'
      }
    }),
    VitePWA({
      // 設定快取自動更新
      registerType: 'autoUpdate',
      workbox: {
        // 清除過期的快取
        cleanupOutdatedCaches: true,
        // 忽略網址參數
        ignoreURLParametersMatching: [/^[0-9a-zA-Z]*$/],
        // 快取檔案格式
        globPatterns: [
          // 大括號裡面放副檔名
          // ** 後面接任意字元
          '**/*.{js,css,html,mp3,woff,eot,ttf,woff2,ico,png,jpg,jpeg,svg,gif}**'
        ]
      },
      // PWA 的應用程式資料
      manifest: {
        name: 'Pomodoro',
        short_name: 'Pomodoro',
        description: 'Vuetify 3 Pomodoro',
        // 工具列顏色
        theme_color: '#1867C0',
        // 手機開啟時 icon 後面的背景色
        background_color: '#1867C0',
        // PWA 顯示路徑範圍
        scope: './',
        // PWA 開啟的網址
        start_url: '/',
        // 顯示模式，只顯示工具列
        display: 'standalone'
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue'
    ]
  },
  server: {
    port: 3000
  }
})
