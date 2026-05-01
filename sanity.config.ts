import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemas';

const projectId =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.PUBLIC_SANITY_PROJECT_ID ??
  process.env.PUBLIC_SANITY_PROJECT_ID ??
  'placeholder';

const dataset =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.PUBLIC_SANITY_DATASET ??
  process.env.PUBLIC_SANITY_DATASET ??
  'production';

export default defineConfig({
  name: 'dlatego-wierze',
  title: '15 Konstelacji — Studio',
  projectId,
  dataset,
  basePath: '/admin',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
