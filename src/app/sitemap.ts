import type { MetadataRoute } from 'next';

// All resource category slugs — keep in sync with src/app/resources/page.tsx
const RESOURCE_SLUGS = [
  'planting-calendar',
  'soil',
  'companion',
  'seed-saving',
  'pruning',
  'animals',
  'preservation',
  'seasonal',
  'building',
  'cleaning-recipes',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://thesteadcraft.com';
  const now  = new Date();

  return [
    // ── Core pages ────────────────────────────────────────────────────────────
    {
      url:              base,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         1.0,
    },
    {
      url:              `${base}/projects`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.9,
    },
    {
      url:              `${base}/workshop`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.8,
    },

    // ── Homesteading hub + guides ─────────────────────────────────────────────
    {
      url:              `${base}/homesteading`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.9,
    },
    {
      url:              `${base}/homesteading/beginners`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.8,
    },
    {
      url:              `${base}/homesteading/suburban`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.8,
    },
    {
      url:              `${base}/homesteading/suburban/garden`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
    {
      url:              `${base}/homesteading/suburban/soil`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
    {
      url:              `${base}/homesteading/suburban/composting`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
    {
      url:              `${base}/homesteading/suburban/rainwater`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
    {
      url:              `${base}/homesteading/suburban/cleaning-supplies`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
    {
      url:              `${base}/homesteading/suburban/preserving`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },

    // ── Resources library ─────────────────────────────────────────────────────
    {
      url:              `${base}/resources`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.8,
    },
    ...RESOURCE_SLUGS.map((slug) => ({
      url:              `${base}/resources/${slug}`,
      lastModified:     now,
      changeFrequency:  'monthly' as const,
      priority:         0.7,
    })),

    // ── Tools & community ─────────────────────────────────────────────────────
    {
      url:              `${base}/tools`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.8,
    },
    {
      url:              `${base}/contractors`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
    {
      url:              `${base}/inventory`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.6,
    },

    // ── Auth (lower priority — not indexed for content) ───────────────────────
    {
      url:              `${base}/signup`,
      lastModified:     now,
      changeFrequency:  'yearly',
      priority:         0.3,
    },
  ];
}
