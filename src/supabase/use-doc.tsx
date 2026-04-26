```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSupabaseClient } from './provider';

export interface UseDocResult<T> {
  data: (T & { id: string }) | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Subscribe to a single row in real-time.
 * @param table  Supabase table name
 * @param id     Row primary key (uuid). Pass null/undefined to skip.
 */
export function useDoc<T = any>(
  table: string,
  id: string | null | undefined
): UseDocResult<T> {
  const supabase = useSupabaseClient();
  const [data, setData] = useState<(T & { id: string }) | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Initial fetch
    supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data: row, error: err }) => {
        if (err) {
          setError(new Error(err.message));
          setData(null);
        } else {
          setData(row as T & { id: string });
          setError(null);
        }
        setIsLoading(false);
      });

    // Realtime subscription
    const channel = supabase
      .channel(`${table}:${id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table, filter: `id=eq.${id}` },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setData(null);
          } else {
            setData(payload.new as T & { id: string });
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, id, supabase]);

  return { data, isLoading, error };
}
```