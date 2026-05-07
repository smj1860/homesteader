import type { Metadata } from 'next';

// ⚠️  This file belongs at: src/app/homesteading/suburban/garden/layout.tsx

export const metadata: Metadata = {
  title:       'The Suburban Garden',
  description:
    'Raised beds, vertical growing, small-space containers, and seed starting — how to grow more food than you think your suburban yard allows.',
  openGraph: {
    title:       'The Suburban Garden | SteadCraft',
    description:
      'Raised beds, vertical growing, and container gardening — grow more food in less space.',
    url:         'https://thesteadcraft.com/homesteading/suburban/garden',
  },
};

export default function GardenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
