import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { rehypeImageCaption } from './packages/astro-maroon/src/ec-plugins/rehype-image-caption.js';

export default defineConfig({
  site: 'https://kurikana.cn',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: ['github-dark'],
      plugins: [pluginLineNumbers()],
      defaultProps: {
        wrap: true,
      },
      styleOverrides: {
        frames: {
          editorBackground: 'var(--code-bg)',
          terminalBackground: 'var(--code-bg)',
          terminalTitlebarBackground: 'var(--code-bg)',
          editorTabBarBackground: 'var(--code-bg)',
          editorTabBarBorderBottomColor: 'transparent',
          terminalTitlebarBorderBottomColor: 'transparent',
        },
        borderRadius: '12px',
        borderColor: 'var(--border)',
        codeFontSize: '0.875rem',
        codeFontFamily: "'JetBrains Mono Variable', 'Cascadia Code', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      },

    }),
  ],
  markdown: {
    rehypePlugins: [rehypeImageCaption],
  },
  vite: {
    ssr: {
      noExternal: ['astro-maroon'],
    },
  },
});
