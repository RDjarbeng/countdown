import { resolve } from 'path';
import { defineConfig } from 'vite';
// import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
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