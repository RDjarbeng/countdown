import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
// import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    VitePWA({
      // includeAssets: ['img/icons/favicon.png', 'img/icons/maskable_icon.png'],
      manifest: {
        name: 'Final Countdown',
        start_url: "/",
        id: "/",
        short_name: 'Final Countdown',
        description: 'Awesome countdown App',
        theme_color: '#031c36',
        icons: [
          {
            src:  '/img/icons/chrome192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/icons/chrome512.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ]
      }
    })
      
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'html/about.html'),
        countdownList: resolve(__dirname, 'html/countdown-list.html'),
        fallback: resolve(__dirname, 'html/fallback.html'),
        today: resolve(__dirname, 'html/today.html'),
        formupload: resolve(__dirname, 'html/form-upload.html'),

        // aboutjs: resolve(__dirname, 'about.js')
      },
    },
  },
});