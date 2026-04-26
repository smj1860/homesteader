```typescript
'use client';

import { useUser, useSupabaseClient } from '@/supabase';
import { useDoc } from '@/supabase/use-doc';

export type UserTier = 'free' | 'paid';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
}

interface UserRow {
  id: string;
  email: string;
  username: string;
  zip_code: string;
  is_premium: boolean;
  credits: number;
  inventory: InventoryItem[];
}

export function useSustainData() {
  const { user } = useUser();
  const supabase = useSupabaseClient();

  // Real-time subscription to the user's row
  const { data: userData, isLoading } = useDoc<UserRow>('users', user?.id ?? null);

  const tier: UserTier = userData?.is_premium ? 'paid' : 'free';
  const credits = userData?.credits ?? 0;
  const inventory: InventoryItem[] = userData?.inventory ?? [];

  // ── Inventory helpers ─────────────────────────────────────────────────
  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    if (!user) return;
    const newItem: InventoryItem = { ...item, id: Math.random().toString(36).slice(2, 11) };
    const updated = [...inventory, newItem];
    supabase
      .from('users')
      .update({ inventory: updated })
      .eq('id', user.id)
      .then(({ error }) => { if (error) console.error(error); });
  };

  const removeInventoryItem = (id: string) => {
    if (!user) return;
    const updated = inventory.filter((i) => i.id !== id);
    supabase
      .from('users')
      .update({ inventory: updated })
      .eq('id', user.id)
      .then(({ error }) => { if (error) console.error(error); });
  };

  // ── Credits ───────────────────────────────────────────────────────────
  const spendCredit = () => {
    if (tier === 'paid') return true;
    if (credits > 0 && user) {
      supabase
        .from('users')
        .update({ credits: credits - 1 })
        .eq('id', user.id)
        .then(({ error }) => { if (error) console.error(error); });
      return true;
    }
    return false;
  };

  const upgradeToPaid = () => {
    if (!user) return;
    supabase
      .from('users')
      .update({ is_premium: true })
      .eq('id', user.id)
      .then(({ error }) => { if (error) console.error(error); });
  };

  return {
    tier,
    credits,
    inventory,
    isLoading,
    addInventoryItem,
    removeInventoryItem,
    spendCredit,
    upgradeToPaid,
  };
}
```

---