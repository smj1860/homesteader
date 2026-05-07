import type { Metadata } from 'next';

// ⚠️  This file belongs at: src/app/inventory/layout.tsx

export const metadata: Metadata = {
  title:       'Homestead Inventory',
  description:
    'Track your homestead inventory — seeds, supplies, tools, and pantry stock. Know what you have and what you need before you need it.',
  openGraph: {
    title:       'Homestead Inventory | SteadCraft',
    description:
      'Track your homestead inventory — seeds, supplies, tools, and pantry stock.',
    url:         'https://thesteadcraft.com/inventory',
  },
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
