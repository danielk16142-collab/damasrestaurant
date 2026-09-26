// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.damas.ca',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/style/'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-CA', en: 'en-CA' } },
    }),
  ],
  devToolbar: { enabled: false },
});
