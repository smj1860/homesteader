'use client';

import { useState, useEffect, useRef } from 'react';
import { useSupabaseClient } from './provider';

export type WithId<T> = T & { id: string };

export interface UseCollectionResult<T> {
  data: WithId<T>[] | null;
  isLoading: boolean;
  error: Error | null;
}

export interface CollectionOptions {
  /** Column = value filter pairs */
  filters?: Record<string, string | number | boolean>;
  /** Column to order by */
  orderBy?: string;
  ascending?: boolean;
}

/**
 * Subscribe to a Supabase table (or filtered subset) in real-time.
 * @param table    Table name
 * @param options  Optional filters and ordering
 */
export function useCollection<T = any>(
  table: string | null | undefined,
  options: CollectionOptions = {}
): UseCollectionResult<T> {
  const supabase = useSupabaseClient();
  const [data, setData] = useState<WithId<T>[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Stable key for effect dependency
  const filtersKey = JSON.stringify(options.filters ?? {});

  useEffect(() => {
    if (!table) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const fetchData = async () => {
      let query = supabase.from(table).select('*');

      if (options.filters) {
        for (const [col, val] of Object.entries(options.filters)) {
          query = query.eq(col, val);
        }
      }
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? false });
      }

      const { data: rows, error: err } = await query;
      if (err) {
        setError(new Error(err.message));
        setData(null);
      } else {
        setData(rows as WithId<T>[]);
        setError(null);
      }
      setIsLoading(false);
    };

    fetchData();

    // Realtime subscription (re-fetches on any change)
    const channel = supabase
      .channel(`${table}:collection:${filtersKey}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => { fetchData(); }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, filtersKey, options.orderBy, options.ascending, supabase]);

  return { data, isLoading, error };
}