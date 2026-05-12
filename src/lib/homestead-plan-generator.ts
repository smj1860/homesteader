import { HomesteadPlanData, SoilMixRecipe, VegetableYield } from '@/lib/pdf-generator'

/**
 * Maps hardiness zone numbers to recommended crops with caloric value
 * Calories per pound helps users prioritize high-yield, nutrient-dense crops
 * Data based on USDA plant hardiness zones and USDA nutrition database
 */
const CROPS_BY_ZONE: Record<string, Array<{name: string; caloriesPerPound: number; yearsToProduction: number}>> = {
  'Zone 3': [
    { name: 'Potatoes', caloriesPerPound: 375, yearsToProduction: 1 },
    { name: 'Kale', caloriesPerPound: 120, yearsToProduction: 1 },
    { name: 'Carrots', caloriesPerPound: 175, yearsToProduction: 1 },
    { name: 'Beets', caloriesPerPound: 180, yearsToProduction: 1 },
    { name: 'Beans', caloriesPerPound: 320, yearsToProduction: 1 },
    { name: 'Peas', caloriesPerPound: 340, yearsToProduction: 1 },
    { name: 'Spinach', caloriesPerPound: 110, yearsToProduction: 1 },
    { name: 'Lettuce', caloriesPerPound: 70, yearsToProduction: 1 },
  ],
  'Zone 4': [
    { name: 'Tomatoes', caloriesPerPound: 100, yearsToProduction: 1 },
    { name: 'Potatoes', caloriesPerPound: 375, yearsToProduction: 1 },
    { name: 'Beans', caloriesPerPound: 320, yearsToProduction: 1 },
    { name: 'Broccoli', caloriesPerPound: 140, yearsToProduction: 1 },
    { name: 'Cabbage', caloriesPerPound: 110, yearsToProduction: 1 },
    { name: 'Carrots', caloriesPerPound: 175, yearsToProduction: 1 },
    { name: 'Kale', caloriesPerPound: 120, yearsToProduction: 1 },
    { name: 'Peas', caloriesPerPound: 340, yearsToProduction: 1 },
  ],
  'Zone 5': [
    { name: 'Tomatoes', caloriesPerPound: 100, yearsToProduction: 1 },
    { name: 'Beans', caloriesPerPound: 320, yearsToProduction: 1 },
    { name: 'Squash', caloriesPerPound: 95, yearsToProduction: 1 },
    { name: 'Cucumbers', caloriesPerPound: 65, yearsToProduction: 1 },
    { name: 'Peppers', caloriesPerPound: 80, yearsToProduction: 1 },
    { name: 'Carrots', caloriesPerPound: 175, yearsToProduction: 1 },
    { name: 'Lettuce', caloriesPerPound: 70, yearsToProduction: 1 },
    { name: 'Kale', caloriesPerPound: 120, yearsToProduction: 1 },
  ],
  'Zone 6': [
    { name: 'Tomatoes', caloriesPerPound: 100, yearsToProduction: 1 },
    { name: 'Peppers', caloriesPerPound: 80, yearsToProduction: 1 },
    { name: 'Eggplant', caloriesPerPound: 85, yearsToProduction: 1 },
    { name: 'Squash', caloriesPerPound: 95, yearsToProduction: 1 },
    { name: 'Beans', caloriesPerPound: 320, yearsToProduction: 1 },
    { name: 'Carrots', caloriesPerPound: 175, yearsToProduction: 1 },
    { name: 'Lettuce', caloriesPerPound: 70, yearsToProduction: 1 },
    { name: 'Basil', caloriesPerPound: 50, yearsToProduction: 1 },
  ],
  'Zone 7': [
    { name: 'Tomatoes', caloriesPerPound: 100, yearsToProduction: 1 },
    { name: 'Peppers', caloriesPerPound: 80, yearsToProduction: 1 },
    { name: 'Eggplant', caloriesPerPound: 85, yearsToProduction: 1 },
    { name: 'Okra', caloriesPerPound: 140, yearsToProduction: 1 },
    { name: 'Squash', caloriesPerPound: 95, yearsToProduction: 1 },
    { name: 'Sweet Corn', caloriesPerPound: 400, yearsToProduction: 1 },
    { name: 'Basil', caloriesPerPound: 50, yearsToProduction: 1 },
    { name: 'Swiss Chard', caloriesPerPound: 120, yearsToProduction: 1 },
  ],
  'Zone 8': [
    { name: 'Tomatoes', caloriesPerPound: 100, yearsToProduction: 1 },
    { name: 'Peppers', caloriesPerPound: 80, yearsToProduction: 1 },
    { name: 'Eggplant', caloriesPerPound: 85, yearsToProduction: 1 },
    { name: 'Okra', caloriesPerPound: 140, yearsToProduction: 1 },
    { name: 'Sweet Potato', caloriesPerPound: 350, yearsToProduction: 1 },
    { name: 'Basil', caloriesPerPound: 50, yearsToProduction: 1 },
    { name: 'Lettuce', caloriesPerPound: 70, yearsToProduction: 1 },
    { name: 'Spinach', caloriesPerPound: 110, yearsToProduction: 1 },
  ],
  'Zone 9': [
    { name: 'Tomatoes', caloriesPerPound: 100, yearsToProduction: 1 },
    { name: 'Peppers', caloriesPerPound: 80, yearsToProduction: 1 },
    { name: 'Eggplant', caloriesPerPound: 85, yearsToProduction: 1 },
    { name: 'Okra', caloriesPerPound: 140, yearsToProduction: 1 },
    { name: 'Sweet Potato', caloriesPerPound: 350, yearsToProduction: 1 },
    { name: 'Garlic', caloriesPerPound: 580, yearsToProduction: 1 },
    { name: 'Onions', caloriesPerPound: 320, yearsToProduction: 1 },
    { name: 'Basil', caloriesPerPound: 50, yearsToProduction: 1 },
  ],
  'Zone 10': [
    { name: 'Lettuce', caloriesPerPound: 70, yearsToProduction: 1 },
    { name: 'Spinach', caloriesPerPound: 110, yearsToProduction: 1 },
    { name: 'Garlic', caloriesPerPound: 580, yearsToProduction: 1 },
    { name: 'Onions', caloriesPerPound: 320, yearsToProduction: 1 },
    { name: 'Herbs', caloriesPerPound: 50, yearsToProduction: 1 },
    { name: 'Tomatoes', caloriesPerPound: 100, yearsToProduction: 1 },
    { name: 'Peppers', caloriesPerPound: 80, yearsToProduction: 1 },
    { name: 'Beans', caloriesPerPound: 320, yearsToProduction: 1 },
  ],
}

/**
 * Calculates realistic vegetable yields based on family size and acreage
 * Estimates based on typical backyard garden productivity
 */
function calculateYieldTargets(acreage: number, familySize: number): VegetableYield[] {
  // Adjust baseline yields based on acreage
  const yieldMultiplier = Math.min(acreage / 0.25, 4) // Cap at 4x for 1 acre+

  const baseYields: VegetableYield[] = [
    {
      name: 'Tomatoes',
      yield: `${Math.round(100 * yieldMultiplier)} lbs`,
      notes: 'Start with 3-4 plants. Yields increase with caging and pruning.'
    },
    {
      name: 'Squash & Zucchini',
      yield: `${Math.round(80 * yieldMultiplier)} lbs`,
      notes: 'Just 2-3 plants can feed a family. Plant every 3 weeks for continuous harvest.'
    },
    {
      name: 'Beans',
      yield: `${Math.round(40 * yieldMultiplier)} lbs`,
      notes: 'Bush beans mature faster. Pole beans produce longer.'
    },
    {
      name: 'Leafy Greens',
      yield: `${Math.round(60 * yieldMultiplier)} lbs`,
      notes: 'Continuous planting every 2-3 weeks extends season. Quick harvesters are key.'
    },
    {
      name: 'Root Vegetables',
      yield: `${Math.round(75 * yieldMultiplier)} lbs`,
      notes: 'Carrots, beets, turnips store well. Direct seed for best results.'
    },
    {
      name: 'Herbs',
      yield: `${Math.round(50 * yieldMultiplier)} lbs`,
      notes: 'Fresh herbs are expensive to buy. 5-6 plants cover most cooking needs.'
    },
  ]

  return baseYields
}

/**
 * Generates soil mix recipe scalable to garden size
 */
function generateSoilMix(): SoilMixRecipe {
  return {
    ratio: '4-3-2-1',
    ingredients: [
      {
        name: 'The Base: Miracle-Gro Performance Organics All-Purpose In-Ground Soil',
        ratio: 4,
      },
      {
        name: 'The Lung: Soil Conditioner (e.g., Sta-Green)',
        ratio: 3,
      },
      {
        name: 'The Engine: 50/50 Black Kow Manure + Mushroom Compost',
        ratio: 2,
      },
      {
        name: 'The Filter: Vigoro Perlite',
        ratio: 1,
      },
    ],
    description: `This is our go-to soil mix for raised beds — a proven 4-part formula that creates the perfect balance of structure, aeration, microbiology, and drainage for any climate.

**The Base** (4 parts) — Miracle-Gro Performance Organics: provides the primary organic matter foundation and initial nutrient load without harsh synthetic salts.

**The Lung** (3 parts) — Soil Conditioner: essential for long-term aeration and internal drainage. Keeps the bed loose and workable season after season instead of compacting into a brick.

**The Engine** (2 parts) — 50/50 Black Kow + Mushroom Compost: the biological fuel of the mix. Black Kow brings nitrogen-fixing bacteria and aged manure; mushroom compost adds calcium, fungal life, and slow-release nutrients.

**The Filter** (1 part) — Vigoro Perlite: provides immediate drainage and keeps oxygen flowing to the roots, preventing waterlogging after heavy rain.

This formula scales linearly. Multiply each ratio number by the number of beds you're filling and order in bulk to save money.`,
  }
}

/**
 * Generates chicken coop recommendation based on family size
 */
// src/lib/homestead-plan-generator.ts
// REPLACE the generateCoopData function (and remove old generateCoopRecommendation if still present)
// with this version. generateHomesteadPlan stays the same as the previous patch.

// ─── Standard sizing constants ────────────────────────────────────────────────
// 4 sq ft per bird inside the coop (minimum comfortable standard)
// 10 sq ft per bird in the outdoor run

const SQ_FT_PER_BIRD_INSIDE = 4
const SQ_FT_PER_BIRD_RUN    = 10

/**
 * Returns the standard coop label and its interior sq ft for a given chicken count.
 * Each size is chosen so interior sq ft >= chickenCount * 4.
 */
function coopSizeForCount(chickenCount: number): { label: string; sqFt: number } {
  if (chickenCount <= 4)  return { label: '4×6 Coop',   sqFt: 24  }
  if (chickenCount <= 6)  return { label: '6×6 Coop',   sqFt: 36  }
  if (chickenCount <= 8)  return { label: '6×8 Coop',   sqFt: 48  }
  if (chickenCount <= 10) return { label: '8×8 Coop',   sqFt: 64  }
  if (chickenCount <= 12) return { label: '8×10 Coop',  sqFt: 80  }
  return                         { label: '10×12 Coop', sqFt: 120 }
}

/**
 * Generates structured coop data from family size.
 * Chicken count = familySize * 2 (minimum recommendation).
 * Coop size is derived from chicken count using 4 sq ft/bird interior standard.
 */
function generateCoopData(
  familySize: number,
  acreage: number
): { sizeLabel: string; chickenCount: number; description: string } {
  const chickenCount = familySize * 2
  const runSize      = chickenCount * SQ_FT_PER_BIRD_RUN
  const { label: sizeLabel, sqFt } = coopSizeForCount(chickenCount)

  const spaceNote = acreage < 0.25
    ? `On a smaller lot, a portable or modular coop design lets you rotate the run weekly to keep the ground from getting torn up.`
    : acreage < 0.5
    ? `A fixed coop with a dedicated predator-proof run works well for your lot size. Leave room to expand the run as your flock grows.`
    : `You've got enough room to build a fixed structure with multiple run sections, which lets you rotate grazing and keep the ground healthier year-round.`

  const description =
    `For a family of ${familySize}, we recommend at least ${chickenCount} chickens — ` +
    `roughly 2 birds per person to cover daily egg needs with a comfortable surplus. ` +
    `At 4 sq ft per bird inside, that puts your minimum coop interior at ${chickenCount * SQ_FT_PER_BIRD_INSIDE} sq ft. ` +
    `A ${sizeLabel} (${sqFt} sq ft interior) meets that comfortably and gives your birds room to move. ` +
    `Plan your outdoor run at a minimum of ${runSize} sq ft — ${SQ_FT_PER_BIRD_RUN} sq ft per bird. ` +
    spaceNote

  return { sizeLabel, chickenCount, description }
}

// ─── generateHomesteadPlan stays the same as the previous patch ───────────────
// (no changes needed there — it already calls generateCoopData and maps the fields correctly)

/**
 * Gets recommended crops for a zone, prioritizing calorie-dense varieties
 * Returns top 5 crops by caloric value per pound
 */
function getRecommendedCrops(zone: string): string[] {
  const cropList = CROPS_BY_ZONE[zone] || CROPS_BY_ZONE['Zone 5']
  // Sort by calories per pound (highest first) and take top 5
  return cropList
    .sort((a, b) => b.caloriesPerPound - a.caloriesPerPound)
    .slice(0, 5)
    .map(c => c.name)
}

/**
 * Main function: generates complete homestead plan data from questionnaire answers
 */
export function generateHomesteadPlan(
  acreage:      number,
  familySize:   number,
  zone:         string,
  state:        string,
  wantsChickens: boolean
): HomesteadPlanData {
  const coop = generateCoopData(familySize, acreage)

  return {
    acreage,
    familySize,
    zone,
    state,
    wantsChickens,
    coopRecommendation: coop.description,   // full text (used in PDF)
    coopSizeLabel:      coop.sizeLabel,     // short label (used in UI)
    coopChickenCount:   coop.chickenCount,  // flock count (used in UI)
    soilMix:            generateSoilMix(),
    vegetableYields:    calculateYieldTargets(acreage, familySize),
    recommendedCrops:   getRecommendedCrops(zone),
  }
}