import { createClient } from '@/supabase/config'

export interface ZoneInfo {
  zone: string       // e.g. '6b'
  zone_num: number   // e.g. 6
  state: string
  region: string
}

export const ZONE_DESCRIPTIONS: Record<number, { label: string; temps: string }> = {
  3:  { label: 'Zone 3', temps: '-40°F to -30°F' },
  4:  { label: 'Zone 4', temps: '-30°F to -20°F' },
  5:  { label: 'Zone 5', temps: '-20°F to -10°F' },
  6:  { label: 'Zone 6', temps: '-10°F to 0°F'   },
  7:  { label: 'Zone 7', temps: '0°F to 10°F'    },
  8:  { label: 'Zone 8', temps: '10°F to 20°F'   },
  9:  { label: 'Zone 9', temps: '20°F to 30°F'   },
  10: { label: 'Zone 10', temps: '30°F to 40°F'  },
  11: { label: 'Zone 11', temps: '40°F to 50°F'  },
}

export async function getZoneFromZip(zip: string): Promise<ZoneInfo | null> {
  if (!zip || zip.length < 3) return null

  const prefix = zip.slice(0, 3)
  const supabase = createClient()

  const { data, error } = await supabase
    .from('zip_zones')
    .select('zone, zone_num, state, region')
    .eq('zip_prefix', prefix)
    .maybeSingle()

  if (error || !data) return null
  return data as ZoneInfo
}

// Parse zone_num from zone string like '6b' → 6
export function parseZoneNum(zone: string): number {
  const num = parseInt(zone)
  return isNaN(num) ? 6 : num
}

// Get the nearest zone we have data for (zones 3–10)
export function clampZone(num: number): number {
  return Math.max(3, Math.min(10, num))
}
