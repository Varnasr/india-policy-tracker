import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://varnasr.github.io',
  base: '/PolicyDhara',
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]'
        }
      }
    }
  }
});
