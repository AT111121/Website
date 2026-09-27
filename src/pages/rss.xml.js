import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'Ankur Tripathi — Writing',
    description: 'Essays and playbooks on growth, content, SEO and AEO.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/articles/${p.id}/`,
    })),
  });
}
