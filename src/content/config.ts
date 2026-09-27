import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CATEGORIES = ['SEO & AEO', 'Content', 'Growth', 'Lifecycle', 'Wealth & Fintech'] as const;

// Written blog posts (banner, headings, bullets, images — all in Markdown)
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum(CATEGORIES),
      pubDate: z.coerce.date(),
      author: z.string().default('Ankur Tripathi'),
      readTime: z.string().optional(),
      cover: z.string().optional(),     // top banner image, e.g. "/images/aeo.jpg"
      draft: z.boolean().default(false),
    }),
});

// Carousels & infographics (image-led)
const visuals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/visuals' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(CATEGORIES),
    type: z.enum(['carousel', 'infographic']),
    pubDate: z.coerce.date(),
    cover: z.string().optional(),       // card thumbnail
    images: z.array(z.string()).default([]), // 1 image = infographic, many = carousel
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, visuals };
