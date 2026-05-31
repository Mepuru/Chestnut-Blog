import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://kurikana.cn',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: ['github-dark'],
      defaultProps: {
        wrap: true,
        showLanguage: true,
      },
      styleOverrides: {
        borderRadius: '12px',
        borderColor: 'var(--border)',
        codeFontSize: '0.875rem',
        codeFontFamily: "'JetBrains Mono Variable', 'Cascadia Code', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      },
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['astro-maroon'],
    },
  },
});
