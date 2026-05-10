// src/app/homesteading/budget/page.tsx

import Link from 'next/link'

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export const metadata = {
  title: 'Homesteading on a Budget | SteadCraft',
  description: 'A practical, modular guide to homesteading without breaking the bank. Tools, homemade supplies, food production, and more.',
}

const SECTIONS = [
  {
    num: '00',
    emoji: '🗺️',
    title: 'Land & Space Planner',
    subtitle: 'Start here',
    desc: 'Input your available outdoor or indoor space and get a personalized growing plan — zone-matched, heirloom-weighted, and built for maximum yield per square foot.',
    href: '/homesteading/budget/land-space-planner',
    highlight: true,
  },
  {
    num: '01',
    emoji: '🔧',
    title: 'Tools',
    subtitle: 'What to buy, what to skip',
    desc: 'The essential tools worth investing in, the ones worth skipping, multi-use tools that cover three or four jobs, and where buying used is a safe bet.',
    href: '/homesteading/budget/tools',
    highlight: false,
  },
  {
    num: '02',
    emoji: '🧹',
    title: 'Homemade Supplies',
    subtitle: 'Make what you used to buy',
    desc: 'Cleaners, weed killer, personal care products — recipes that cost pennies per ounce compared to store-bought, with affiliate picks for ingredients.',
    href: '/homesteading/budget/homemade-supplies',
    highlight: false,
  },
  {
    num: '03',
    emoji: '🌿',
    title: 'Food Production',
    subtitle: 'Grow what you eat most',
    desc: 'Regardless of how much space you have, grow the fruits, vegetables, and herbs that your household uses most — guided by your zone and prioritized by yield.',
    href: '/homesteading/budget/food-production',
    highlight: false,
  },
  {
    num: '04',
    emoji: '🍞',
    title: 'Food: Make Don\'t Buy',
    subtitle: 'Breads, pasta, sauces, dressings',
    desc: 'Items that are meaningfully cheaper to make than purchase — breads, pasta, fermented foods, sauces, and dressings — with cost comparisons for each.',
    href: '/homesteading/budget/food-make-dont-buy',
    highlight: false,
  },
  {
    num: '05',
    emoji: '🌾',
    title: 'Soil & Seeds',
    subtitle: 'Build your foundation for free',
    desc: 'Budget-friendly soil mixes, composting from what you already have, and seed saving — so after your first season, your inputs cost almost nothing.',
    href: '/homesteading/budget/soil-and-seeds',
    highlight: false,
  },
  {
    num: '06',
    emoji: '💰',
    title: 'Money Generation',
    subtitle: 'Turn your homestead into income',
    desc: 'Realistic ways your homestead can generate money — from eggs and produce to cottage food sales, herbal products, seedlings, and more.',
    href: '/homesteading/budget/money-generation',
    highlight: false,
  },
]

export default function BudgetHubPage() {
  return (
    <main style={{ backgroundColor: PARCH, minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8 flex items-center gap-2" style={{ color: `${FOREST}66` }}>
          <a href="/homesteading" style={{ color: `${FOREST}66` }} className="hover:underline">Homesteading</a>
          <span>›</span>
          <span style={{ color: FOREST }}>Homesteading on a Budget</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
            Homesteading on a Budget
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: FOREST }}>
            The Homestead Is Our Craft.<br />The Budget Is Our Challenge.
          </h1>

          {/* Intro copy */}
          <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
            <p>
              Homesteading is hard work but deeply rewarding — a lifestyle worth committing to regardless of
              how much land or money you have. But there are real barriers to entry. Land is usually the first
              one people think about, but the cost of getting started — especially from nothing — can be just
              as daunting.
            </p>
            <p>
              Everyone can and should incorporate some aspect of homesteading into their life — no matter how
              much time, space, or money they have. Self-sufficiency isn't an all-or-nothing commitment.
              That's exactly why this guide exists.
            </p>
            <p>
              What you'll find here is homesteading trimmed down to its most practical, actionable form —
              broken into seven sections you can work through in full or pick from based on what makes sense
              for your situation right now. Start with one. Start with all of them. Either way you're moving
              in the right direction.
            </p>
            <p>
              We recommend starting with the Land & Space Planner. It takes a few minutes, it's free, and it
              gives you a personalized growing plan you'll reference throughout every other section here.
            </p>
            <p className="font-semibold" style={{ color: FOREST }}>
              A hybrid homestead is better than no homestead — and it can always grow.
            </p>
          </div>
        </div>

        {/* Start Here CTA */}
        <div
          className="rounded-2xl p-6 mb-10"
          style={{ backgroundColor: FOREST, border: `2px solid ${GOLD}` }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: GOLD }}>
                Start Here
              </p>
              <h2 className="text-xl font-bold mb-2" style={{ color: PARCH }}>Land & Space Planner</h2>
              <p className="text-sm leading-relaxed" style={{ color: `${PARCH}cc` }}>
                Free for all members. Enter your space, get your personalized growing plan. Takes about 2 minutes.
              </p>
            </div>
            <Link
              href="/homesteading/budget/land-space-planner"
              className="shrink-0 px-5 py-3 rounded-xl font-bold text-sm transition-all"
              style={{ backgroundColor: GOLD, color: PARCH }}
            >
              Build My Plan →
            </Link>
          </div>
        </div>

        {/* Section table */}
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: `${FOREST}66` }}>
            All Sections
          </p>
          <div className="space-y-2">
            {SECTIONS.map((section, i) => (
              <Link
                key={section.href}
                href={section.href}
                className="flex items-start gap-4 rounded-2xl px-5 py-4 transition-all group"
                style={{
                  backgroundColor: section.highlight ? `${GOLD}12` : PARCH2,
                  border: `1.5px solid ${section.highlight ? GOLD : `${FOREST}15`}`,
                  display: 'flex',
                }}
              >
                <span className="text-xl shrink-0 mt-0.5">{section.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold" style={{ color: GOLD }}>
                      {section.highlight ? 'START HERE' : `0${i}`}
                    </span>
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color: FOREST }}>{section.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: `${FOREST}77` }}>{section.desc}</p>
                </div>
                <span
                  className="shrink-0 mt-1 text-sm transition-transform group-hover:translate-x-1"
                  style={{ color: GOLD }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
