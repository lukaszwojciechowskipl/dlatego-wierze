import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site ?? 'https://dlatego-wierze.vercel.app');
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api',
    '',
    `Sitemap: ${sitemapUrl.toString()}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain' } });
};
