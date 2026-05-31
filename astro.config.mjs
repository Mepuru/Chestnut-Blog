import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://kurikana.cn',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        borderRadius: '0',
        borderWidth: '0',
      },
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['astro-maroon'],
    },
  },
});
