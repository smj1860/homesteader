import type { Metadata } from 'next';

// ⚠️  This file belongs at: src/app/projects/layout.tsx

export const metadata: Metadata = {
  title:       'My Projects',
  description:
    'Your AI-generated homestead project guides — step-by-step instructions for every build, repair, and growing task on your property.',
  openGraph: {
    title:       'My Projects | SteadCraft',
    description:
      'Your AI-generated homestead project guides — step-by-step instructions for every build, repair, and growing task.',
    url:         'https://thesteadcraft.com/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
