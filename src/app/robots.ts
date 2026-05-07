import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block auth-gated and admin-only routes from indexing
        disallow: [
          '/account',
          '/account/',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://thesteadcraft.com/sitemap.xml',
  };
}
