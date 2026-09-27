import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ⚠️ Change this to your real domain once it's live.
// It powers the sitemap, RSS feed, canonical URLs and social previews.
export default defineConfig({
  site: 'https://www.ankurtripathi.net',
  integrations: [sitemap()],
});
