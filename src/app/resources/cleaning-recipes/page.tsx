"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"
import { ArrowLeft, ChevronDown, ChevronUp, Beaker } from "lucide-react"

const FOREST  = '#264228'
const GOLD    = '#A88032'
const PARCH   = '#F7F3EB'
const LEATHER = '#7C4B2A'

interface Ingredient { amount: string; item: string }
interface Recipe {
  name: string
  category: string
  emoji: string
  yield?: string
  intro?: string
  ingredients: Ingredient[]
  steps: string[]
  tips?: string[]
}

const RECIPES: Recipe[] = [
  // ── Laundry ────────────────────────────────────────────────────────────────
  {
    name: "Powdered Laundry Detergent",
    category: "Laundry",
    emoji: "🧺",
    yield: "About 3½ cups (~35 loads)",
    intro: "A no-fuss dry detergent that's effective in hot or warm water. Use 1–2 tablespoons per load.",
    ingredients: [
      { amount: "1 cup",    item: "Borax" },
      { amount: "1 cup",    item: "Washing soda" },
      { amount: "½ cup",   item: "Baking soda" },
      { amount: "1 bar",    item: "Fels-Naptha soap, finely grated" },
    ],
    steps: [
      "Grate the Fels-Naptha bar using a box grater or food processor. The finer the grate, the better it dissolves.",
      "Combine all ingredients in a large bowl and mix thoroughly until evenly distributed.",
      "Transfer to an airtight container — a wide-mouth quart jar or repurposed laundry container works well.",
      "Use 1 tablespoon for small or lightly soiled loads, 2 tablespoons for large or heavily soiled loads.",
    ],
    tips: [
      "For HE machines: This detergent is low-sudsing and safe to use — stick to 1 tablespoon.",
      "If clothes feel stiff, try adding ½ cup white vinegar to the rinse cycle.",
      "Store in a dry place; moisture can clump the powder over time.",
    ],
  },
  {
    name: "Liquid Laundry Detergent",
    category: "Laundry",
    emoji: "🧺",
    yield: "~5 gallons (~80 loads)",
    intro: "A concentrated gel detergent that works in all water temperatures. Use ¼ to ½ cup per load.",
    ingredients: [
      { amount: "1 bar",   item: "Fels-Naptha soap, grated" },
      { amount: "1 cup",   item: "Borax" },
      { amount: "1 cup",   item: "Washing soda" },
      { amount: "½ cup",  item: "Baking soda" },
      { amount: "4 cups",  item: "Water (for initial dissolving)" },
      { amount: "enough to fill", item: "5-gallon bucket with hot water" },
    ],
    steps: [
      "Bring 4 cups of water to a low simmer in a large pot. Add the grated Fels-Naptha and stir until fully melted and smooth.",
      "Remove from heat. Stir in the borax, washing soda, and baking soda until completely dissolved.",
      "Fill a 5-gallon bucket halfway with hot water. Pour in the soap mixture and stir well.",
      "Fill the remainder of the bucket with more hot water while continuing to stir.",
      "Let it sit uncovered for 24 hours — it will thicken into a gel-like consistency as it cools.",
      "Stir again before using. It may separate slightly; that's normal. Use ¼–½ cup per load.",
    ],
    tips: [
      "Add 10–15 drops of your preferred essential oil (lavender, lemon, or tea tree) for a light scent.",
      "A long-handled stir stick or paint mixer drill attachment makes the initial mixing much easier.",
      "Decant into smaller containers for daily use; keep the bulk bucket sealed.",
    ],
  },

  // ── Bathroom ────────────────────────────────────────────────────────────────
  {
    name: "Shower, Tile & Grout Cleaner",
    category: "Bathroom",
    emoji: "🚿",
    yield: "One treatment",
    intro: "A non-abrasive paste that lifts soap scum, mold, and grout staining without harsh fumes.",
    ingredients: [
      { amount: "½ cup",  item: "Baking soda" },
      { amount: "¼ cup",  item: "Hydrogen peroxide (3%)" },
    ],
    steps: [
      "Mix baking soda and hydrogen peroxide together in a small bowl until it forms a thick paste.",
      "Spread the paste over tile, grout, and shower surfaces using a sponge or old toothbrush.",
      "Let it sit for 10–15 minutes. Don't let it dry out completely on the surface.",
      "Scrub with a stiff brush, paying extra attention to grout lines.",
      "Rinse thoroughly with clean water.",
    ],
    tips: [
      "For stubborn grout stains, apply the paste and cover with plastic wrap to keep it moist. Leave for 30–60 minutes before scrubbing.",
      "Hydrogen peroxide naturally whitens grout without bleach fumes — safe for colored grout too.",
      "Mix fresh each time; the paste loses effectiveness once the bubbling reaction completes.",
    ],
  },

  // ── Kitchen ────────────────────────────────────────────────────────────────
  {
    name: "Dish Soap",
    category: "Kitchen",
    emoji: "🍽️",
    yield: "16–24 oz bottle",
    intro: "A plant-based dish soap with real cutting power. Glycerin keeps hands from drying out.",
    ingredients: [
      { amount: "½ cup",       item: "Liquid Castile soap (unscented)" },
      { amount: "1 tbsp",      item: "Washing soda" },
      { amount: "10 drops",    item: "Lemon essential oil" },
      { amount: "5 drops",     item: "Orange essential oil" },
      { amount: "1–2 tsp",     item: "Vegetable glycerin" },
      { amount: "to fill",     item: "Distilled water" },
    ],
    steps: [
      "Add the washing soda to ¼ cup of warm distilled water and stir until dissolved.",
      "Pour the Castile soap into your bottle first, then add the washing soda water.",
      "Add glycerin and essential oils.",
      "Top off with distilled water to fill the bottle. Cap and gently tip to combine — do not shake vigorously, as this creates excess foam.",
    ],
    tips: [
      "Tap water can react with Castile soap over time and leave a film. Distilled water prevents this.",
      "For extra grease-cutting power, add ½ teaspoon of white vinegar. Note: don't use vinegar and Castile soap together without diluting first or it will soap scum.",
      "Increase glycerin to 1 tablespoon if you notice your hands drying out in winter.",
    ],
  },
  {
    name: "All-Purpose Kitchen Spray",
    category: "Kitchen",
    emoji: "🍽️",
    yield: "16 oz spray bottle",
    intro: "A fast, effective spray for counters, stovetops, and most kitchen surfaces. Safe around food prep areas after a wipe-down.",
    ingredients: [
      { amount: "1 cup",    item: "Distilled water" },
      { amount: "¼ cup",   item: "White vinegar (5% acidity)" },
      { amount: "¼ cup",   item: "Rubbing alcohol (70%)" },
      { amount: "15 drops", item: "Tea tree essential oil" },
      { amount: "10 drops", item: "Lemon or orange essential oil" },
    ],
    steps: [
      "Combine all ingredients in a 16-oz spray bottle.",
      "Cap and shake gently to combine.",
      "Spray on surface, let sit 30 seconds for disinfection, then wipe with a clean cloth.",
    ],
    tips: [
      "Do not use on natural stone countertops (marble, granite) — vinegar etches the surface.",
      "Excellent for stainless steel appliances: spray, wipe in the direction of the grain.",
      "Rubbing alcohol is the true disinfecting agent here. Don't substitute with water.",
    ],
  },

  // ── Personal Care ──────────────────────────────────────────────────────────
  {
    name: "Shampoo Base",
    category: "Personal Care",
    emoji: "🧴",
    yield: "~8 oz",
    intro: "A gentle, customizable liquid shampoo base. Adjust the oil selection for your hair type.",
    ingredients: [
      { amount: "¼ cup",   item: "Castile soap (unscented)" },
      { amount: "¼ cup",   item: "Distilled water" },
      { amount: "½–1 tsp", item: "Oil of choice (grapeseed for fine hair, coconut for dry, castor for thickness)" },
      { amount: "to preference", item: "Essential oils (optional)" },
    ],
    steps: [
      "Combine Castile soap and distilled water in a squeeze bottle or pump bottle.",
      "Add the oil of your choice based on your hair type (see tips).",
      "Add 10–20 drops of essential oils if desired. Lavender, rosemary, and peppermint are popular choices.",
      "Cap and gently tip to blend. Use a small amount — it's more concentrated than commercial shampoo.",
    ],
    tips: [
      "Grapeseed oil: lightweight, ideal for fine or oily hair.",
      "Coconut oil: moisturizing, best for dry or coarse hair. Use sparingly — a little goes a long way.",
      "Castor oil: promotes thickness and scalp health. Use ¼ tsp max or it can feel heavy.",
      "Rosemary essential oil supports scalp circulation and is traditionally associated with hair growth.",
    ],
  },
  {
    name: "Body Wash",
    category: "Personal Care",
    emoji: "🧴",
    yield: "~12 oz",
    intro: "A rich, moisturizing body wash that leaves skin soft without a synthetic residue.",
    ingredients: [
      { amount: "¾ cup",      item: "Liquid Castile soap" },
      { amount: "¼–⅓ cup",   item: "Raw honey" },
      { amount: "¼ cup",      item: "Coconut oil or olive oil (your preference)" },
      { amount: "~40 drops",  item: "Essential oils of choice (optional)" },
    ],
    steps: [
      "Gently warm the coconut oil until just melted if solid, then let it cool slightly.",
      "Combine Castile soap and honey in a pump bottle or squeeze bottle.",
      "Add the oil and essential oils.",
      "Cap and tip gently to blend. Shake before each use as the honey and oil can settle.",
    ],
    tips: [
      "Honey acts as a natural humectant — it draws moisture into skin.",
      "Olive oil: richer, better for dry or mature skin. Coconut oil: lighter feel, better for normal skin.",
      "Popular essential oil blends: lavender + vanilla (relaxing), peppermint + eucalyptus (invigorating), citrus blend (uplifting).",
    ],
  },

  // ── Floors & Glass ─────────────────────────────────────────────────────────
  {
    name: "Glass & Mirror Cleaner",
    category: "Floors & Glass",
    emoji: "🪟",
    yield: "16 oz spray bottle",
    intro: "Streak-free glass cleaner with no ammonia fumes. Works on windows, mirrors, and glass stovetops.",
    ingredients: [
      { amount: "1 cup",   item: "Distilled water" },
      { amount: "¼ cup",  item: "White vinegar" },
      { amount: "¼ cup",  item: "Rubbing alcohol (70%)" },
    ],
    steps: [
      "Combine all ingredients in a spray bottle and shake gently.",
      "Spray onto glass surface.",
      "Wipe immediately with a lint-free microfiber cloth or crumpled newspaper (old newspaper works remarkably well on glass).",
      "Buff in circular motions for a streak-free finish.",
    ],
    tips: [
      "Avoid cleaning windows in direct sunlight — the spray dries too quickly and streaks.",
      "Distilled water prevents the mineral deposits that tap water leaves on glass.",
      "For exceptionally grimy windows, pre-wipe with a damp cloth before spraying.",
    ],
  },
  {
    name: "Hardwood Floor Cleaner",
    category: "Floors & Glass",
    emoji: "🪵",
    yield: "One mop bucket (about 1 gallon)",
    intro: "A gentle cleaner that lifts dirt without soaking wood or leaving a residue. Safe for finished hardwood and laminate.",
    ingredients: [
      { amount: "1 gallon",  item: "Warm water" },
      { amount: "¼ cup",    item: "White vinegar" },
      { amount: "1 tbsp",   item: "Liquid Castile soap" },
      { amount: "5–10 drops", item: "Essential oil of choice (optional)" },
    ],
    steps: [
      "Combine all ingredients in a mop bucket.",
      "Dampen a microfiber mop head — wring it out very well so it's barely damp, not wet.",
      "Mop in the direction of the wood grain.",
      "No rinsing needed. Allow to air dry completely before walking on.",
    ],
    tips: [
      "Never saturate hardwood — excess water causes warping and swelling over time.",
      "The vinegar-to-water ratio here is low enough to be safe for most finishes. If you have unfinished or wax-finished floors, omit the vinegar.",
      "Add 10 drops of lemon or orange essential oil for a fresh scent that masks the vinegar smell while mopping.",
    ],
  },
]

const CATEGORIES = ["All", ...Array.from(new Set(RECIPES.map(r => r.category)))]

export default function CleaningRecipesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [expanded, setExpanded]             = useState<Record<string, boolean>>({})

  const filtered = RECIPES.filter(
    r => activeCategory === "All" || r.category === activeCategory
  )

  const toggle = (name: string) =>
    setExpanded(e => ({ ...e, [name]: !e[name] }))

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-4xl">

        {/* Back link */}
        <Link
          href="/resources"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
          style={{ color: FOREST }}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Resources
        </Link>

        {/* ── Resource header card ─────────────────────────────────────── */}
        <div
          className="mb-8 rounded-2xl px-7 py-7"
          style={{ backgroundColor: FOREST }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
              style={{ backgroundColor: `${PARCH}18` }}
            >
              <Beaker className="h-5 w-5" style={{ color: GOLD }} />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold mb-1" style={{ color: PARCH }}>
                Homemade Cleaning Recipes
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: `${PARCH}99` }}>
                Effective, non-toxic recipes for every room — made from ingredients
                you can find at any hardware or grocery store.
              </p>
            </div>
          </div>
        </div>

        {/* ── Category filter ─────────────────────────────────────────── */}
        <div
          className="mb-6 flex flex-wrap gap-2 rounded-xl p-1.5"
          style={{ backgroundColor: `${FOREST}10` }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={
                activeCategory === cat
                  ? { backgroundColor: FOREST, color: PARCH }
                  : { backgroundColor: 'transparent', color: `${FOREST}80` }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Recipe cards ────────────────────────────────────────────── */}
        <div className="space-y-4">
          {filtered.map(recipe => {
            const isOpen = !!expanded[recipe.name]
            return (
              <div
                key={recipe.name}
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  border: `1.5px solid ${isOpen ? FOREST : `${FOREST}20`}`,
                  backgroundColor: isOpen ? PARCH : '#ffffff',
                }}
              >
                {/* Header / toggle */}
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                  onClick={() => toggle(recipe.name)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{recipe.emoji}</span>
                    <div>
                      <p className="font-serif font-bold text-sm" style={{ color: FOREST }}>
                        {recipe.name}
                      </p>
                      <p className="text-xs" style={{ color: `${FOREST}70` }}>
                        {recipe.category}
                        {recipe.yield ? ` · ${recipe.yield}` : ""}
                      </p>
                    </div>
                  </div>
                  {isOpen
                    ? <ChevronUp className="h-4 w-4 shrink-0" style={{ color: FOREST }} />
                    : <ChevronDown className="h-4 w-4 shrink-0" style={{ color: `${FOREST}60` }} />
                  }
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-6 pb-6 space-y-5">

                    {recipe.intro && (
                      <p className="text-sm leading-relaxed" style={{ color: LEATHER }}>
                        {recipe.intro}
                      </p>
                    )}

                    {/* Ingredients */}
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
                        style={{ color: `${FOREST}80` }}
                      >
                        Ingredients
                      </p>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm">
                            <span className="font-bold shrink-0 mt-0.5" style={{ color: GOLD }}>✓</span>
                            <span style={{ color: FOREST }}>
                              <strong>{ing.amount}</strong>{" "}{ing.item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Divider */}
                    <div className="h-px" style={{ backgroundColor: `${FOREST}15` }} />

                    {/* Steps */}
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
                        style={{ color: `${FOREST}80` }}
                      >
                        Directions
                      </p>
                      <ol className="space-y-3 list-none pl-0">
                        {recipe.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold mt-0.5"
                              style={{ backgroundColor: FOREST, color: PARCH }}
                            >
                              {i + 1}
                            </span>
                            <span className="text-sm leading-relaxed" style={{ color: FOREST }}>
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Tips */}
                    {recipe.tips && recipe.tips.length > 0 && (
                      <div
                        className="rounded-xl p-4 space-y-2"
                        style={{
                          backgroundColor: `${GOLD}12`,
                          border: `1px solid ${GOLD}30`,
                        }}
                      >
                        <p
                          className="text-[10px] font-bold uppercase tracking-widest mb-1"
                          style={{ color: GOLD }}
                        >
                          Tips
                        </p>
                        {recipe.tips.map((tip, i) => (
                          <p key={i} className="text-xs leading-relaxed" style={{ color: LEATHER }}>
                            • {tip}
                          </p>
                        ))}
                      </div>
                    )}

                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Back to resources */}
        <div className="mt-12 pt-6" style={{ borderTop: `1px solid ${FOREST}18` }}>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
            style={{ color: FOREST }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Resources
          </Link>
        </div>

      </main>
    </div>
  )
}
