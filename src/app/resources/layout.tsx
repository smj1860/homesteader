import type { Metadata } from 'next';

// ⚠️  This file belongs at: src/app/resources/layout.tsx

export const metadata: Metadata = {
  title:       'Homestead Resource Library',
  description:
    'Quick-reference guides for homesteaders — planting calendars, soil mixes, companion planting charts, seed saving, livestock care, seasonal checklists, and more.',
  openGraph: {
    title:       'Homestead Resource Library | SteadCraft',
    description:
      'Quick-reference guides for homesteaders — planting calendars, soil charts, seed saving, livestock care, and seasonal checklists.',
    url:         'https://thesteadcraft.com/resources',
  },
  twitter: {
    title:       'Homestead Resource Library | SteadCraft',
    description:
      'Quick-reference guides for every part of the homestead — from planting calendars to livestock care.',
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
