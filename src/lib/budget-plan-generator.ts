// src/lib/budget-plan-generator.ts

import { CROPS, Crop } from './budget-crop-data'

// ─── Zone Utilities ─────────────────────────────────────────────────────────

// Converts zone string to integer (e.g. "6b" → 6, "7a" → 7)
export function parseZone(zone: string): number {
  const num = parseInt(zone.replace(/[ab]/i, ''))
  return isNaN(num) ? 6 : Math.max(2, Math.min(11, num))
}

// ─── Crop Filtering ─────────────────────────────────────────────────────────

export function filterLandCrops(
  zone: number,
  sunIntensity: 'full' | 'partial'
): Crop[] {
  return CROPS.filter(crop => {
    if (zone < crop.zone_min || zone > crop.zone_max) return false
    if (crop.sun_requirement !== 'both' && crop.sun_requirement !== sunIntensity) return false
    return true
  })
}

export function filterSpaceCrops(ceilingHeight: number): Crop[] {
  return CROPS.filter(crop => {
    if (ceilingHeight < crop.min_ceiling_height) return false
    return true
  })
}

// ─── Crop Ranking ───────────────────────────────────────────────────────────
//
// Weighting priority:
//   1. Heirloom (seed saving = long-term budget benefit)   → +30
//   2. Vertical growing (space efficiency)                  → +20
//   3. Yield rating                                         → +5 per point
//   4. Dual use (culinary + medicinal)                     → +10
//   5. Easy seed saving                                    → +5
//   6. Easy win (beginner-friendly)                        → +5

export function rankCrops(crops: Crop[], preferVertical = true): Crop[] {
  return [...crops].sort((a, b) => {
    const score = (c: Crop) => {
      let s = 0
      if (c.is_heirloom) s += 30
      if (preferVertical && c.is_vertical) s += 20
      s += c.yield_rating * 5
      if (c.dual_use.medicinal && c.dual_use.culinary) s += 10
      if (c.seed_saving_difficulty === 'easy') s += 5
      if (c.easy_win) s += 5
      return s
    }
    return score(b) - score(a)
  })
}

// ─── Plant Count Estimate ────────────────────────────────────────────────────

// Distributes available sq footage across top crops
// Reserves 30% for pathways on land plan
export function estimatePlantCount(crop: Crop, totalSqFt: number, cropRank: number, totalCrops: number): number {
  const usable = totalSqFt * 0.70
  const sharePerCrop = usable / totalCrops
  const effectiveSpace = crop.is_vertical
    ? crop.space_per_plant_sqft * 0.6  // vertical crops take less ground space
    : crop.space_per_plant_sqft
  return Math.max(1, Math.floor(sharePerCrop / effectiveSpace))
}

// ─── AI Prompt Builders ──────────────────────────────────────────────────────

export function buildLandPlanPrompt(
  sqFootage: number,
  sunTiming: string,
  sunIntensity: string,
  zone: number,
  zoneString: string,
  topCrops: Crop[]
): string {
  const cropList = topCrops.slice(0, 12).map(c =>
    `${c.name}${c.heirloom_variety ? ` (${c.heirloom_variety}${c.is_heirloom ? ', heirloom' : ''})` : ''} — ${c.category}, yield ${c.yield_rating}/5${c.is_vertical ? ', vertical grower' : ''}`
  ).join('\n')

  return `You are a homesteading advisor helping someone on a budget plan their outdoor growing space.

GROWING SPACE DETAILS:
- Square footage: ${sqFootage} sq ft
- Sun: ${sunIntensity} sun, ${sunTiming === 'unknown' ? 'sun timing unknown' : sunTiming + ' sun exposure'}
- USDA Hardiness Zone: ${zoneString} (zone ${zone})

TOP RECOMMENDED CROPS (already filtered and ranked for this zone and sun):
${cropList}

Create a practical, grounded growing plan for this person. They are budget-conscious and new or intermediate homesteaders.

Respond ONLY with valid JSON — no preamble, no markdown, no backticks. Exact format:
{
  "intro": "2–3 sentences acknowledging their specific space and zone. Encouraging but realistic.",
  "layout_summary": "2–3 sentences on how to efficiently lay out this space. Mention vertical growing where applicable. Be specific to their sq footage.",
  "easy_wins": [
    "Specific actionable first step 1",
    "Specific actionable first step 2",
    "Specific actionable first step 3",
    "Specific actionable first step 4",
    "Specific actionable first step 5"
  ],
  "heirloom_note": "1–2 sentences on why heirloom varieties are prioritized and the seed saving advantage for keeping costs down year over year.",
  "vertical_note": "1–2 sentences specific to maximizing their ${sqFootage} sq ft through vertical growing — mention trellises, poles, or netting.",
  "seasonal_tip": "1 sentence on succession planting or seasonal timing specific to zone ${zone}.",
  "affiliate_categories": ["heirloom seed packets", "trellises and plant supports", "grow bags", "raised bed soil mix", "row cover and frost protection"]
}`
}

export function buildSpacePlanPrompt(
  sqFootage: number,
  ceilingHeight: number,
  hasShelving: boolean,
  shelfCount: number | null,
  topCrops: Crop[]
): string {
  const cropList = topCrops.slice(0, 10).map(c =>
    `${c.name}${c.heirloom_variety ? ` (${c.heirloom_variety})` : ''} — ${c.category}, container: ${c.container_size}${c.dual_use.medicinal ? ', medicinal' : ''}`
  ).join('\n')

  const shelvingContext = hasShelving
    ? `They have ${shelfCount} shelf${shelfCount === 1 ? '' : 's'} available for tiered growing.`
    : 'No shelving currently available.'

  const verticalContext = ceilingHeight >= 6
    ? 'Ceiling height allows for vertical growing towers or tall plant supports.'
    : 'Low ceiling — focus on compact, horizontal container layouts.'

  return `You are a homesteading advisor helping someone grow indoors or in a small contained space on a budget.

SPACE DETAILS:
- Square footage: ${sqFootage} sq ft
- Ceiling height: ${ceilingHeight} feet
- ${shelvingContext}
- ${verticalContext}

TOP RECOMMENDED CROPS (already filtered for ceiling height):
${cropList}

Create a practical indoor/container growing plan. Budget-conscious audience.

Respond ONLY with valid JSON — no preamble, no markdown, no backticks. Exact format:
{
  "intro": "2–3 sentences acknowledging their specific space. Encouraging — emphasize that meaningful growing is possible in any space.",
  "layout_summary": "2–3 sentences on how to arrange containers efficiently in ${sqFootage} sq ft with ${ceilingHeight}ft ceilings.",
  "easy_wins": [
    "Specific actionable first step 1",
    "Specific actionable first step 2",
    "Specific actionable first step 3",
    "Specific actionable first step 4",
    "Specific actionable first step 5"
  ],
  "herb_focus": "2 sentences on why herbs are the highest-value crops for indoor/container growing — cover both culinary and medicinal value.",
  "grow_light_caveat": "1–2 sentences recommending a budget-friendly grow light as a supplement if natural light is limited. Mention that a basic full-spectrum LED is under $30.",
  "shelving_note": ${hasShelving ? '"1–2 sentences on maximizing their ' + shelfCount + ' shelf' + (shelfCount === 1 ? '' : 's') + ' for tiered container growing — herbs on top, larger containers below."' : 'null'},
  "seed_saving_note": "1 sentence identifying which of their recommended crops are heirloom and seed-saveable to reduce future costs.",
  "affiliate_categories": ["grow lights", "containers and grow bags", "indoor potting mix", "herb seed collections", "vertical wall planters"]
}`
}

// ─── AI Caller (Groq Scout 4 → Gemini fallback) ─────────────────────────────

export async function callAI(prompt: string): Promise<string> {
  // ── Groq: Llama 4 Scout ──────────────────────────────────────────────────
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.65,
        max_tokens: 1200,
      }),
    })
    if (!res.ok) throw new Error(`Groq ${res.status}`)
    const data = await res.json()
    const text = data.choices?.[0]?.message?.content
    if (!text) throw new Error('Empty Groq response')
    return text
  } catch (groqErr) {
    console.error('[budget-plan-generator] Groq failed, using Gemini fallback:', groqErr)
  }

  // ── Gemini fallback ──────────────────────────────────────────────────────
  const gemRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.65, maxOutputTokens: 1200 },
      }),
    }
  )
  if (!gemRes.ok) throw new Error(`Gemini ${gemRes.status}`)
  const gemData = await gemRes.json()
  const gemText = gemData.candidates?.[0]?.content?.parts?.[0]?.text
  if (!gemText) throw new Error('Empty Gemini response')
  return gemText
}

// ─── Response Parser ─────────────────────────────────────────────────────────

export function parseAIResponse(text: string): Record<string, unknown> {
  try {
    const clean = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()
    return JSON.parse(clean)
  } catch {
    console.error('[budget-plan-generator] Failed to parse AI response:', text.slice(0, 200))
    return {}
  }
}
