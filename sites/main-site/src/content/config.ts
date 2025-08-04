import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    thumbnail: z.string().optional(),
    description: z.string(),
    hasMore: z.boolean().default(false),
    type: z.string(),
    externalUrl: z.string().optional(),
    hasDarkImage: z.boolean().default(false),
  }),
});

const diy = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = {
  work: caseStudies,
  diy: diy,
};
