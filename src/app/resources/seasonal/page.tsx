"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"
import { ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react"

const FOREST  = '#264228'
const GOLD    = '#A88032'
const PARCH   = '#F7F3EB'
const LEATHER = '#7C4B2A'

// Season accent colors
const SEASON_COLORS: Record<string, { bg: string; text: string; activeBg: string; activeText: string }> = {
  spring: { bg: 'transparent', text: `${FOREST}80`, activeBg: FOREST,     activeText: PARCH   },
  summer: { bg: 'transparent', text: `${FOREST}80`, activeBg: GOLD,       activeText: '#1a1a1a' },
  fall:   { bg: 'transparent', text: `${FOREST}80`, activeBg: '#8B4513',  activeText: PARCH   },
  winter: { bg: 'transparent', text: `${FOREST}80`, activeBg: '#3d5a80',  activeText: PARCH   },
}

interface Section { title: string; tasks: string[] }
interface SeasonData { label: string; emoji: string; sections: Section[] }

const SEASONS: Record<string, SeasonData> = {
  spring: {
    label: "Spring",
    emoji: "🌱",
    sections: [
      {
        title: "Garden Prep & Planting",
        tasks: [
          "Test and amend soil before planting — add compost, adjust pH",
          "Start warm-season seeds indoors 6–8 weeks before last frost",
          "Transplant cold-hardy starts (broccoli, cabbage, lettuce) after last frost",
          "Direct sow peas, spinach, carrots, radishes, and beets as soon as soil is workable",
          "Plant potatoes when soil reaches 45°F",
          "Set up drip irrigation or soaker hoses before beds fill in",
          "Apply 2–3 inches of mulch to all beds after soil warms",
          "Install row covers for early brassicas to prevent pest damage",
        ],
      },
      {
        title: "Orchard & Perennials",
        tasks: [
          "Prune fruit trees before bud break — remove crossing branches and water sprouts",
          "Apply dormant oil spray to fruit trees for overwintering pest control",
          "Fertilize berry bushes with balanced fertilizer as new growth emerges",
          "Divide and replant overcrowded perennial herbs (chives, mint, oregano)",
          "Check grape vines and tie new canes to trellis",
        ],
      },
      {
        title: "Animals & Structures",
        tasks: [
          "Deep clean coops and replace all bedding — sanitize waterers and feeders",
          "Check fencing for winter damage — tighten wire, replace damaged posts",
          "Deworm and vaccinate livestock per your vet schedule",
          "Inspect roofs on all outbuildings — repair any winter damage before rain season",
          "Clean and calibrate rain gauges, weather instruments",
          "Service tillers, mowers, and other power equipment before the season starts",
        ],
      },
    ],
  },

  summer: {
    label: "Summer",
    emoji: "☀️",
    sections: [
      {
        title: "Growing & Maintenance",
        tasks: [
          "Water deeply and infrequently — 1–2 inches per week for most crops",
          "Succession sow beans, lettuce (in shade), and greens every 2–3 weeks",
          "Tie and stake tomatoes, peppers, and climbing crops as they grow",
          "Side-dress heavy feeders (corn, tomatoes, squash) with compost or fertilizer",
          "Scout for pests weekly — hand-pick large insects, treat with neem oil early",
          "Cut spent flowers on herbs to delay bolting and maintain leaf production",
          "Monitor for signs of disease — remove affected leaves promptly",
        ],
      },
      {
        title: "Harvest & Preservation",
        tasks: [
          "Harvest zucchini and cucumbers every 2 days — overgrown fruit stops production",
          "Begin canning tomatoes, pickles, and jam as produce peaks",
          "Freeze excess beans, corn, and berries at peak ripeness",
          "Dry herbs (basil, oregano, thyme) by hanging in a shaded dry location",
          "Begin dehydrating excess tomatoes, peppers, and herbs",
          "Label and date all preserved foods immediately",
        ],
      },
      {
        title: "Animals",
        tasks: [
          "Ensure all animals have access to fresh, cool water at all times",
          "Provide shade structures for outdoor animals during peak heat",
          "Collect eggs twice daily in hot weather to prevent spoilage",
          "Watch for heat stress in poultry — add electrolytes to water if needed",
          "Clip pasture and rotate grazing areas to prevent parasite build-up",
        ],
      },
    ],
  },

  fall: {
    label: "Fall",
    emoji: "🍂",
    sections: [
      {
        title: "Growing & Harvest",
        tasks: [
          "Harvest all frost-sensitive crops before first frost warning",
          "Dig root vegetables — leave in ground until soil temp drops to 40°F",
          "Cut back and clean up spent annuals — add to compost",
          "Leave seed heads for birds — sunflowers, echinacea, rudbeckia",
          "Plant garlic after first frost — 6 weeks before ground freezes",
          "Apply 3–4 inch layer of compost to all garden beds",
          "Plant cover crops in empty beds — winter rye, crimson clover",
          "Collect and store seeds in labeled jars",
          "Clean and oil all hand tools before storage",
        ],
      },
      {
        title: "Orchard",
        tasks: [
          "Complete all apple and pear harvest before heavy frost",
          "Rake and compost fallen fruit to break disease and pest cycles",
          "Apply lime sulfur or copper spray after leaf drop for disease control",
          "Mulch around base of fruit trees with 4 inches of wood chips",
          "Take hardwood cuttings from fruit trees for propagation",
          "Plant new bare-root trees and shrubs while soil is still workable",
        ],
      },
      {
        title: "Animals & Structures",
        tasks: [
          "Add extra bedding to coops and barns as temperatures drop",
          "Check and repair any gaps or drafts in animal shelters",
          "Drain and store hoses, irrigation lines, and outdoor water features",
          "Stock up on hay, feed, and animal supplements for winter",
          "Service and winterize all power equipment before storage",
          "Test and clean chimney/woodstove before heating season",
          "Split and stack firewood — should be covered and dry before use",
        ],
      },
    ],
  },

  winter: {
    label: "Winter",
    emoji: "❄️",
    sections: [
      {
        title: "Planning & Seeds",
        tasks: [
          "Order seeds for next season — prioritize heirlooms and disease-resistant varieties",
          "Review previous year's garden notes — what worked, what failed",
          "Map out crop rotations and new bed placements on paper",
          "Start a soil amendment plan — order compost, lime, or minerals in advance",
          "Research new techniques to try — new crops, irrigation upgrades",
          "Organize seed storage — check germination rates on older seeds",
        ],
      },
      {
        title: "Maintenance & Projects",
        tasks: [
          "Sharpen, clean, and oil all garden tools before spring",
          "Repair or build raised beds, cold frames, and trellises",
          "Clean and inventory canning jars — replace cracked lids and rings",
          "Sort and organize the seed-saving collection",
          "Deep clean and disinfect all animal waterers and feeders",
          "Audit pantry and preserved goods — use oldest stock first",
          "Review fencing condition and order repair supplies before spring rush",
        ],
      },
      {
        title: "Animals",
        tasks: [
          "Monitor water sources daily — prevent freezing with heaters or checking twice a day",
          "Increase feed rations for outdoor animals — cold weather burns more calories",
          "Check animals regularly for signs of cold stress or illness",
          "Collect eggs more frequently to prevent freezing",
          "Provide extra bedding and dry nesting material in all shelters",
        ],
      },
    ],
  },
}

export default function SeasonalChecklistPage() {
  const [activeSeason, setActiveSeason] = useState<string>("spring")
  const [checked,      setChecked]      = useState<Record<string, boolean>>({})

  const season = SEASONS[activeSeason]
  const colors = SEASON_COLORS[activeSeason]

  const totalTasks = season.sections.reduce((sum, s) => sum + s.tasks.length, 0)
  const doneCount  = season.sections.reduce((sum, s, si) =>
    sum + s.tasks.filter((_, ti) => checked[`${activeSeason}-${si}-${ti}`]).length, 0
  )

  const toggle = (key: string) => setChecked(c => ({ ...c, [key]: !c[key] }))
  const resetSeason = () => {
    const next = { ...checked }
    season.sections.forEach((s, si) => {
      s.tasks.forEach((_, ti) => { delete next[`${activeSeason}-${si}-${ti}`] })
    })
    setChecked(next)
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-5xl">

        {/* Back link */}
        <Link
          href="/resources"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
          style={{ color: FOREST }}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Resources
        </Link>

        {/* ── Resource description card — dark green ────────────────────── */}
        <div
          className="mb-8 rounded-2xl overflow-hidden"
          style={{ backgroundColor: FOREST }}
        >
          {/* Title & description */}
          <div className="px-7 pt-7 pb-5">
            <h1
              className="font-serif text-2xl font-bold mb-1.5"
              style={{ color: PARCH }}
            >
              Homestead Seasonal Checklists
            </h1>
            <p className="text-sm" style={{ color: `${PARCH}99` }}>
              What to do each season to keep a homestead running smoothly —
              garden, animals, structures, and equipment.
            </p>
          </div>

          {/* Season tabs */}
          <div className="px-7 pb-5 flex flex-wrap gap-2">
            {Object.entries(SEASONS).map(([key, val]) => {
              const c = SEASON_COLORS[key]
              const isActive = activeSeason === key
              return (
                <button
                  key={key}
                  onClick={() => { setActiveSeason(key); setChecked({}) }}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize flex items-center gap-1.5"
                  style={
                    isActive
                      ? { backgroundColor: c.activeBg, color: c.activeText }
                      : { backgroundColor: `${PARCH}18`, color: `${PARCH}99`, border: `1px solid ${PARCH}30` }
                  }
                >
                  <span>{val.emoji}</span> {val.label}
                </button>
              )
            })}
          </div>

          {/* Progress bar — inside the card, white/parchment bg */}
          <div
            className="mx-5 mb-5 rounded-xl px-5 py-3.5 flex items-center gap-4"
            style={{ backgroundColor: `${PARCH}18` }}
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold" style={{ color: PARCH }}>Progress</span>
                <span className="text-xs" style={{ color: `${PARCH}99` }}>
                  {doneCount} / {totalTasks} tasks
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: `${PARCH}30` }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0}%`,
                    backgroundColor: GOLD,
                  }}
                />
              </div>
            </div>
            <button
              onClick={resetSeason}
              className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70 shrink-0"
              style={{ color: `${PARCH}99` }}
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* ── Checklist sections — white/parchment with full-width dividers ── */}
        <div className="space-y-6">
          {season.sections.map((section, si) => (
            <div key={si}>
              {/* Full-width section divider */}
              <div className="relative flex items-center mb-4">
                <div className="flex-1 h-px" style={{ backgroundColor: `${FOREST}25` }} />
                <span
                  className="mx-4 text-xs font-bold uppercase tracking-widest shrink-0"
                  style={{ color: LEATHER }}
                >
                  {section.title}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: `${FOREST}25` }} />
              </div>

              {/* Task list — white/parchment background */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: PARCH,
                  border: `1.5px solid ${FOREST}18`,
                }}
              >
                <ul>
                  {section.tasks.map((task, ti) => {
                    const key = `${activeSeason}-${si}-${ti}`
                    const isDone = !!checked[key]
                    return (
                      <li
                        key={ti}
                        style={{
                          borderBottom: ti < section.tasks.length - 1
                            ? `1px solid ${FOREST}12`
                            : 'none',
                        }}
                      >
                        <button
                          className="flex items-start gap-3.5 w-full text-left px-5 py-3.5 transition-colors"
                          style={{
                            backgroundColor: isDone ? `${FOREST}08` : 'transparent',
                          }}
                          onClick={() => toggle(key)}
                        >
                          {/* Checkbox */}
                          <div
                            className="mt-0.5 h-4.5 w-4.5 shrink-0 rounded flex items-center justify-center transition-all"
                            style={{
                              minWidth: '18px',
                              minHeight: '18px',
                              backgroundColor: isDone ? FOREST : 'transparent',
                              border: `2px solid ${isDone ? FOREST : `${FOREST}40`}`,
                            }}
                          >
                            {isDone && (
                              <CheckCircle2
                                className="h-3 w-3"
                                style={{ color: PARCH }}
                              />
                            )}
                          </div>

                          {/* Task text */}
                          <span
                            className="text-sm leading-relaxed transition-all"
                            style={{
                              color: isDone ? `${FOREST}50` : FOREST,
                              textDecoration: isDone ? 'line-through' : 'none',
                            }}
                          >
                            {task}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
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
