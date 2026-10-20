// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // <-- Import the glob loader

const blogCollection = defineCollection({
  // Use the loader to point to your collection folder and file pattern
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(), // coerce handles string dates safely
  }),
});

export const collections = {
  blog: blogCollection,
};