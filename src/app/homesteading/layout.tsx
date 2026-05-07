import type { Metadata } from 'next';

// This layout injects metadata for /homesteading, which is a 'use client'
// component and therefore cannot export its own metadata directly.
// ⚠️  This file belongs at: src/app/homesteading/layout.tsx
//     NOT at:               src/app/homesteading/beginners/layout.tsx

export const metadata: Metadata = {
  title:       'Homesteading Guides',
  description:
    'Complete homesteading guides for every skill level — from suburban balcony gardens to off-grid acreage. Grow food, build soil, preserve the harvest, and live more self-sufficiently.',
  openGraph: {
    title:       'Homesteading Guides | SteadCraft',
    description:
      'Complete homesteading guides for every skill level. Grow food, build soil, and live more self-sufficiently — wherever you are.',
    url:         'https://thesteadcraft.com/homesteading',
  },
  twitter: {
    title:       'Homesteading Guides | SteadCraft',
    description:
      'Complete homesteading guides for every skill level. Grow food, build soil, and live more self-sufficiently.',
  },
};

export default function HomesteadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
