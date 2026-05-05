// Re-exports from the context provider so all existing imports work unchanged.
// The actual logic lives in sustain-data-provider.tsx — hoisted to layout level
// so useDoc('users', userId) only ever creates ONE realtime subscription
// regardless of how many components call useSustainData().
export { useSustainData } from './sustain-data-provider';
export type { UserTier, InventoryItem } from './sustain-data-provider';
