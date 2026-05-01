import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

const SANITY_PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID ?? 'placeholder';
const SANITY_DATASET = process.env.PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  site: 'https://dlatego-wierze.vercel.app',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
    imageService: true,
    isr: { expiration: 60 * 60 * 24 },
    maxDuration: 30,
  }),
  integrations: [
    react(),
    mdx(),
    sitemap(),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      useCdn: true,
      apiVersion: '2025-01-28',
      studioBasePath: '/admin',
      stega: { studioUrl: '/admin' },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: { noExternal: ['three', '@react-three/fiber', '@react-three/drei'] },
  },
  experimental: {
    contentIntellisense: true,
  },
  env: {
    schema: {
      PUBLIC_SANITY_PROJECT_ID: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_SANITY_DATASET: envField.string({ context: 'client', access: 'public', default: 'production' }),
      PUBLIC_SANITY_API_VERSION: envField.string({ context: 'client', access: 'public', default: '2025-01-28' }),
      SANITY_API_READ_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      SANITY_REVALIDATE_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      VERCEL_DEPLOY_HOOK: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
