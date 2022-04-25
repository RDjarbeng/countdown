import { resolve } from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        about: resolve(__dirname, '/about.html'),
        main: resolve(__dirname, 'index.html'),
        myabout: resolve(__dirname, './myabout/about.html'),

        // aboutjs: resolve(__dirname, 'about.js')
      },
    },
  },
});