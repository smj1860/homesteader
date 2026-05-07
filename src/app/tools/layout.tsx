import type { Metadata } from 'next';

// ⚠️  This file belongs at: src/app/tools/layout.tsx

export const metadata: Metadata = {
  title:       'Homestead Tool Reviews',
  description:
    'Honest reviews of homesteading tools and gear — hand tools, power tools, garden equipment, and more. Budget, mid-range, and premium picks for every task.',
  openGraph: {
    title:       'Homestead Tool Reviews | SteadCraft',
    description:
      'Honest reviews of homesteading tools and gear — budget, mid-range, and premium picks for every task on the homestead.',
    url:         'https://thesteadcraft.com/tools',
  },
  twitter: {
    title:       'Homestead Tool Reviews | SteadCraft',
    description:
      'Honest reviews of homesteading tools and gear — find the right tool at the right price.',
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
