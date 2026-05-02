import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const externalSource = z.object({
  type: z.enum(['youtube', 'book', 'article', 'podcast', 'documentary', 'website']),
  title: z.string(),
  author: z.string().optional(),
  url: z.url(),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  year: z.number().int().optional(),
  language: z.enum(['pl', 'en', 'it', 'fr', 'de']).default('en'),
  description: z.string().optional(),
});

const argumentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  constellationId: z.number().int().min(1).max(15),
  category: z.enum(['rozum', 'doswiadczenie']),
  subtitle: z.string().optional(),
  lead: z.string(),
  readingTimeMin: z.number().int().positive().optional(),
  keyClaim: z.string().optional(),
  philosophers: z.array(z.string()).default([]),
  heroImage: z.string().optional(),
  primarySource: externalSource.optional(),
  backupSources: z.array(externalSource).max(4).optional(),
});

export const collections = {
  arguments: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/arguments' }),
    schema: argumentSchema,
  }),
  resources: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
    schema: z.object({
      title: z.string(),
      kind: z.enum(['ksiazka', 'kanal-yt', 'podcast', 'artykul', 'film']),
      author: z.string().optional(),
      url: z.url(),
      lang: z.enum(['pl', 'en']).default('pl'),
      level: z.enum(['początkujący', 'średni', 'zaawansowany']).optional(),
      summary: z.string(),
    }),
  }),
};

export type ExternalSource = z.infer<typeof externalSource>;
