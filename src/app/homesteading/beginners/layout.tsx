import type { Metadata } from 'next';

// ⚠️  This file belongs at: src/app/homesteading/beginners/layout.tsx
//     It REPLACES the file currently there (which has the wrong metadata).

export const metadata: Metadata = {
  title:       'Homestead Plan Generator',
  description:
    'Answer a few questions and get a personalized homestead plan — zone-specific crop recommendations, soil mix recipes, and chicken coop sizing tailored to your land and family.',
  openGraph: {
    title:       'Homestead Plan Generator | SteadCraft',
    description:
      'Get a personalized homestead plan in minutes — crop picks, soil recipes, and coop sizing for your exact zone and acreage.',
    url:         'https://thesteadcraft.com/homesteading/beginners',
  },
  twitter: {
    title:       'Homestead Plan Generator | SteadCraft',
    description:
      'Get a personalized homestead plan in minutes — crop picks, soil recipes, and coop sizing for your exact zone and acreage.',
  },
};

export default function BeginnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
