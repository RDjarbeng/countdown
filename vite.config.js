import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: "./",
  build: {
    lib: {
      entry: resolve(__dirname, 'rcountdown.js'),
      name: "rcountdown",
      fileName: "rcountdown"
    },
    rollupOptions: {
    },
  },
});