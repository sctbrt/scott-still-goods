import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8003,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
      },
    },
  },
});
