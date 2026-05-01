import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const argumentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  constellationId: z.number().int().min(1).max(15),
  subtitle: z.string().optional(),
  lead: z.string(),
  readingTimeMin: z.number().int().positive(),
  keyClaim: z.string(),
  philosophers: z.array(z.string()).default([]),
  heroImage: z.string().optional(),
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
      url: z.string().url(),
      lang: z.enum(['pl', 'en']).default('pl'),
      level: z.enum(['początkujący', 'średni', 'zaawansowany']).optional(),
      summary: z.string(),
    }),
  }),
};
