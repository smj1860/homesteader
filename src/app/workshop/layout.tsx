import type { Metadata } from 'next';

// ⚠️  This file belongs at: src/app/workshop/layout.tsx

export const metadata: Metadata = {
  title:       'The Workshop',
  description:
    'Hands-on homesteading tutorials and video guides — learn the skills to build, repair, and maintain every part of your homestead.',
  openGraph: {
    title:       'The Workshop | SteadCraft',
    description:
      'Hands-on homesteading tutorials — learn the skills to build, repair, and maintain every part of your homestead.',
    url:         'https://thesteadcraft.com/workshop',
  },
};

export default function WorkshopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
