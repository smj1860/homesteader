import type { Metadata } from 'next';

// This layout exists specifically to inject metadata for /homesteading,
// which is a 'use client' component and therefore cannot export its own metadata.
// Child routes (e.g. /homesteading/suburban) that need their own metadata
// should define it in their own layout.tsx or page.tsx.

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
