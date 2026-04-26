```typescript
import { createClient } from './config';

const supabase = createClient();

/** Fire-and-forget upsert */
export function upsertNonBlocking(table: string, data: Record<string, any>) {
  supabase
    .from(table)
    .upsert(data)
    .then(({ error }) => {
      if (error) console.error(`[upsert:${table}]`, error.message);
    });
}

/** Fire-and-forget update by id */
export function updateNonBlocking(
  table: string,
  id: string,
  data: Record<string, any>
) {
  supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .then(({ error }) => {
      if (error) console.error(`[update:${table}:${id}]`, error.message);
    });
}

/** Fire-and-forget insert */
export function insertNonBlocking(table: string, data: Record<string, any>) {
  supabase
    .from(table)
    .insert(data)
    .then(({ error }) => {
      if (error) console.error(`[insert:${table}]`, error.message);
    });
}

/** Fire-and-forget delete by id */
export function deleteNonBlocking(table: string, id: string) {
  supabase
    .from(table)
    .delete()
    .eq('id', id)
    .then(({ error }) => {
      if (error) console.error(`[delete:${table}:${id}]`, error.message);
    });
}
```
