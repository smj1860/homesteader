"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"
import { Search, ArrowLeft, CheckCircle2, XCircle } from "lucide-react"

const FOREST  = '#264228'
const GOLD    = '#A88032'
const PARCH   = '#F7F3EB'
const LEATHER = '#7C4B2A'

interface CompanionRow {
  plant: string
  good: string[]
  bad: string[]
  benefits: string
}

const COMPANIONS: CompanionRow[] = [
  {
    plant: "Tomatoes",
    good: ["Basil", "Borage", "Carrots", "Marigolds", "Parsley"],
    bad: ["Brassicas", "Corn", "Fennel", "Potatoes"],
    benefits: "Basil repels thrips & hornworms; marigolds deter nematodes; borage attracts pollinators and confuses hornworm moths",
  },
  {
    plant: "Corn",
    good: ["Beans", "Cucumber", "Pumpkins", "Squash", "Sunflowers"],
    bad: ["Celery", "Tomatoes"],
    benefits: "Three Sisters: beans fix nitrogen for corn; squash shades soil to hold moisture and suppress weeds",
  },
  {
    plant: "Beans",
    good: ["Carrots", "Corn", "Cucumbers", "Marigolds", "Squash"],
    bad: ["Chives", "Fennel", "Garlic", "Onions"],
    benefits: "Nitrogen fixers — improve soil for heavy feeders; marigolds deter bean beetles",
  },
  {
    plant: "Squash",
    good: ["Beans", "Corn", "Nasturtiums", "Radishes"],
    bad: ["Fennel", "Potatoes"],
    benefits: "Broad leaves shade soil and retain moisture; nasturtiums deter squash bugs and vine borers",
  },
  {
    plant: "Peppers",
    good: ["Basil", "Carrots", "Marigolds", "Oregano", "Tomatoes"],
    bad: ["Apricots", "Fennel"],
    benefits: "Basil repels spider mites; oregano deters aphids; marigolds protect roots from nematodes",
  },
  {
    plant: "Carrots",
    good: ["Lettuce", "Onions", "Rosemary", "Sage", "Tomatoes"],
    bad: ["Dill", "Fennel"],
    benefits: "Onions and rosemary repel carrot fly; tomatoes provide shade that slows bolting",
  },
  {
    plant: "Basil",
    good: ["Oregano", "Peppers", "Tomatoes"],
    bad: ["Rue", "Sage", "Thyme"],
    benefits: "Repels thrips, aphids, and whiteflies; improves flavor of nearby tomatoes and peppers",
  },
  {
    plant: "Lettuce",
    good: ["Carrots", "Chives", "Radishes", "Strawberries", "Tall flowers"],
    bad: ["Celery", "Parsley"],
    benefits: "Radishes loosen soil around roots; chives deter aphids; tall companions provide welcome afternoon shade",
  },
  {
    plant: "Cucumbers",
    good: ["Beans", "Corn", "Dill", "Marigolds", "Radishes", "Sunflowers"],
    bad: ["Melons", "Potatoes", "Sage"],
    benefits: "Radishes deter cucumber beetles; beans fix nitrogen; sunflowers attract predatory insects",
  },
  {
    plant: "Garlic",
    good: ["Fruit trees", "Peppers", "Roses", "Tomatoes"],
    bad: ["Beans", "Peas", "Sage"],
    benefits: "Natural fungicide and aphid deterrent; repels Japanese beetles and root maggots",
  },
  {
    plant: "Onions",
    good: ["Beets", "Carrots", "Chamomile", "Lettuce", "Tomatoes"],
    bad: ["Beans", "Peas"],
    benefits: "Repels carrot fly and aphids; chamomile said to improve onion flavor and growth",
  },
  {
    plant: "Potatoes",
    good: ["Beans", "Cabbage", "Horseradish", "Marigolds"],
    bad: ["Cucumbers", "Fennel", "Raspberries", "Tomatoes", "Squash"],
    benefits: "Horseradish deters potato beetles; marigolds repel nematodes; beans fix nitrogen in surrounding soil",
  },
  {
    plant: "Cabbage",
    good: ["Celery", "Dill", "Marigolds", "Nasturtiums", "Onions"],
    bad: ["Fennel", "Garlic", "Strawberries", "Tomatoes"],
    benefits: "Dill and nasturtiums repel cabbage worm; onions deter cabbage moth; celery improves overall growth",
  },
  {
    plant: "Peas",
    good: ["Carrots", "Corn", "Mint", "Radishes", "Turnips"],
    bad: ["Chives", "Garlic", "Leeks", "Onions"],
    benefits: "Nitrogen fixers that benefit the whole garden bed; mint deters pests and attracts pollinators",
  },
  {
    plant: "Strawberries",
    good: ["Borage", "Garlic", "Lettuce", "Spinach", "Thyme"],
    bad: ["Cabbage", "Fennel", "Brassicas"],
    benefits: "Borage deters worms and attracts pollinators; thyme repels worms; garlic deters gray mold",
  },
  {
    plant: "Sunflowers",
    good: ["Corn", "Cucumbers", "Melons", "Squash", "Tomatoes"],
    bad: ["Potatoes"],
    benefits: "Attract predatory insects that eat aphids; provide vertical support and dappled shade for heat-sensitive neighbors",
  },
]

export default function CompanionPlantingPage() {
  const [search, setSearch] = useState("")

  const filtered = COMPANIONS.filter(row =>
    !search ||
    row.plant.toLowerCase().includes(search.toLowerCase()) ||
    row.good.some(g => g.toLowerCase().includes(search.toLowerCase())) ||
    row.bad.some(b => b.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-6xl">

        {/* Back link */}
        <Link
          href="/resources"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
          style={{ color: FOREST }}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Resources
        </Link>

        {/* ── Resource description card — dark green header ────────────── */}
        <div
          className="mb-8 rounded-2xl overflow-hidden"
          style={{ backgroundColor: FOREST }}
        >
          {/* Header */}
          <div className="px-7 pt-7 pb-5">
            <h1
              className="font-serif text-2xl font-bold mb-1"
              style={{ color: PARCH }}
            >
              Companion Planting Guide
            </h1>
            <p className="text-sm" style={{ color: `${PARCH}99` }}>
              Quick-reference chart of what to plant together and what to keep apart —
              plus the science behind why it works.
            </p>
          </div>

          {/* Search — inside the green card */}
          <div className="px-7 pb-7">
            <div className="relative max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: `${PARCH}60` }}
              />
              <input
                type="text"
                placeholder="Search any plant…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                style={{
                  backgroundColor: `${PARCH}18`,
                  border: `1.5px solid ${PARCH}30`,
                  color: PARCH,
                }}
                onFocus={e => (e.target.style.borderColor = GOLD)}
                onBlur={e => (e.target.style.borderColor = `${PARCH}30`)}
              />
            </div>
          </div>
        </div>

        {/* ── Companion planting table ──────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1.5px solid ${FOREST}25` }}
        >
          {/* Table — horizontally scrollable on mobile */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">

              {/* Gold header row matching Canva mockup */}
              <thead>
                <tr style={{ backgroundColor: GOLD }}>
                  {["Plant", "Good Companions", "Bad Companions", "Benefits"].map(col => (
                    <th
                      key={col}
                      className="px-5 py-3.5 text-left text-sm font-bold uppercase tracking-wide"
                      style={{ color: '#1a1a1a' }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row.plant}
                    style={{
                      backgroundColor: i % 2 === 0 ? '#ffffff' : PARCH,
                      borderBottom: `1px solid ${FOREST}12`,
                    }}
                  >
                    {/* Plant name */}
                    <td className="px-5 py-4">
                      <span
                        className="font-serif font-bold text-sm"
                        style={{ color: FOREST }}
                      >
                        {row.plant}
                      </span>
                    </td>

                    {/* Good companions */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {row.good.map(g => (
                          <span
                            key={g}
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                            style={{
                              backgroundColor: `${FOREST}12`,
                              color: FOREST,
                            }}
                          >
                            <CheckCircle2 className="h-3 w-3" style={{ color: FOREST }} />
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Bad companions */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {row.bad.map(b => (
                          <span
                            key={b}
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                            style={{
                              backgroundColor: `#c0392b12`,
                              color: '#b83232',
                            }}
                          >
                            <XCircle className="h-3 w-3" style={{ color: '#b83232' }} />
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Benefits */}
                    <td
                      className="px-5 py-4 text-xs leading-relaxed"
                      style={{ color: LEATHER }}
                    >
                      {row.benefits}
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-12 text-center text-sm"
                      style={{ color: `${FOREST}60` }}
                    >
                      No plants matching &ldquo;{search}&rdquo; — try a broader search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-5 text-xs" style={{ color: `${FOREST}88` }}>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" style={{ color: FOREST }} />
            Beneficial companion
          </span>
          <span className="flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5" style={{ color: '#b83232' }} />
            Avoid planting together
          </span>
        </div>

        {/* Back to resources */}
        <div className="mt-10 pt-6" style={{ borderTop: `1px solid ${FOREST}18` }}>
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
