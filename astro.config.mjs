import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://impactmojo.in',
  base: '/policy-tracker',
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
