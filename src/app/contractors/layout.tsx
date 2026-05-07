import type { Metadata } from 'next';

// ⚠️  This file belongs at: src/app/contractors/layout.tsx

export const metadata: Metadata = {
  title:       'Find Local Homestead Contractors',
  description:
    'Connect with contractors who understand homestead projects — well drilling, septic systems, barn building, fencing, and rural property work.',
  openGraph: {
    title:       'Find Local Homestead Contractors | SteadCraft',
    description:
      'Connect with contractors who understand homestead projects — well drilling, septic systems, barn building, and rural property work.',
    url:         'https://thesteadcraft.com/contractors',
  },
  twitter: {
    title:       'Find Local Homestead Contractors | SteadCraft',
    description:
      'Connect with contractors who specialize in homestead and rural property projects.',
  },
};

export default function ContractorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
