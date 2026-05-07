import type { Metadata } from 'next';

// ⚠️  This file belongs at: src/app/resources/[slug]/layout.tsx
//     Note the folder name has square brackets: [slug]

const CATEGORY_META: Record<string, { name: string; description: string }> = {
  'planting-calendar': {
    name:        'Planting Calendar',
    description: 'Zone-aware sow and transplant dates for 30 vegetables — know exactly when to start seeds and move transplants outdoors.',
  },
  'soil': {
    name:        'Soil & Amendments',
    description: 'Soil mix guides, amendment ratios, and soil health references — build the foundation every productive garden needs.',
  },
  'companion': {
    name:        'Companion Planting',
    description: "What grows well together and what doesn't — a complete companion planting reference for the kitchen garden.",
  },
  'seed-saving': {
    name:        'Seed Saving',
    description: 'How to process and store seeds from 25 common crops — save money and preserve the varieties that perform in your garden.',
  },
  'pruning': {
    name:        'Pruning & Orchard Care',
    description: 'When and how to prune every tree and shrub on the homestead — timing charts and cut-by-cut guides.',
  },
  'animals': {
    name:        'Livestock & Animal Care',
    description: 'Daily feed amounts and care references for homestead animals — chickens, rabbits, goats, and more.',
  },
  'preservation': {
    name:        'Preservation & Pantry',
    description: 'Safe canning times, freezing guides, and fermentation references — preserve your harvest with confidence.',
  },
  'seasonal': {
    name:        'Seasonal Checklists',
    description: 'What to do each season to keep your homestead running smoothly — spring, summer, fall, and winter task lists.',
  },
  'building': {
    name:        'Building Reference',
    description: 'Quick references for coop, shed, and raised bed construction — lumber sizes, fastener specs, and build guides.',
  },
  'cleaning-recipes': {
    name:        'Homemade Cleaning Recipes',
    description: 'Simple, effective homemade cleaning recipes that cost a fraction of store-bought — all-purpose cleaners, weed killers, and more.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_META[slug];

  const name = cat?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const description =
    cat?.description ??
    `Homestead reference guides for ${name.toLowerCase()} — part of the SteadCraft resource library.`;

  return {
    title:       `${name} — Homestead Reference`,
    description,
    openGraph: {
      title:       `${name} | SteadCraft Resource Library`,
      description,
      url:         `https://thesteadcraft.com/resources/${slug}`,
    },
    twitter: {
      title:       `${name} | SteadCraft`,
      description,
    },
  };
}

export default function ResourceSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
