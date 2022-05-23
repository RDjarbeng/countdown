// import { resolve } from 'path';
// import { defineConfig } from 'vite';
// // import legacy from '@vitejs/plugin-legacy';

// export default defineConfig({
//   plugins: [
//     // legacy({
//     //   targets: ['defaults', 'not IE 11'],
//     // }),
//   ],
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html'),
//         about: resolve(__dirname, './html/about.html'),
//         countdownList: resolve(__dirname, './html/countdown-list.html'),
//         fallback: resolve(__dirname, './html/fallback.html'),
//         today: resolve(__dirname, './html/today.html'),

//         // aboutjs: resolve(__dirname, 'about.js')
//       },
//     },
//   },
// });

const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html')
      }
    }
  }
})