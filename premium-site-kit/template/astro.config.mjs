// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  // Real public URL: used for canonical links and social previews. Update on deploy.
  site: 'https://vertice-realestate.com',
  integrations: [react()],
  image: { layout: 'constrained' },
});
