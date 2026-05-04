import { Navigation } from "@/components/Navigation"
import { ArrowLeft, ArrowRight, Sprout } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "The Suburban Garden | SteadCraft",
  description: "Raised beds, vertical growing, container gardens, and seed starting — how to grow more food than you think your space allows.",
}

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export default function SuburbanGardenPage() {
  return (
    <div className="min-h-screen pb-24 pt-20" style={{ backgroundColor: PARCH }}>
      <Navigation />

      <main className="container mx-auto max-w-3xl px-4 pt-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: `${FOREST}88` }}>
          <Link href="/homesteading" style={{ color: `${FOREST}88` }} className="hover:underline">Homesteading</Link>
          <span>/</span>
          <Link href="/homesteading/suburban" style={{ color: `${FOREST}88` }} className="hover:underline">Suburban</Link>
          <span>/</span>
          <span style={{ color: FOREST }}>The Garden</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex gap-2 mb-5">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${GOLD}20`, color: GOLD }}>
              Suburban Series
            </span>
            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${FOREST}12`, color: FOREST, border: `1px solid ${FOREST}22` }}>
              Guide 1 of 6
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: FOREST }}>
            The Suburban Garden
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: `${FOREST}99` }}>
            Small space is a design problem, not a limitation. Here&apos;s how to grow
            a genuinely productive garden on a patio, in raised beds, or in containers —
            starting from seed.
          </p>
        </div>

        {/* Body */}
        <div className="space-y-5 text-base leading-relaxed" style={{ color: `${FOREST}dd` }}>

          <h2 className="font-serif text-2xl font-bold pt-4" style={{ color: FOREST }}>
            Raised beds: your highest-yield move
          </h2>
          <p>
            If you have any ground access at all — even a small strip of yard, a patio
            corner, or a slab — a raised bed is the single most productive thing you can
            build. You control the soil completely, drainage is never a problem, and
            you can plant significantly more densely than in-ground rows allow because
            you&apos;re not leaving space for walking between plants.
          </p>
          <p>
            A single 4×8 raised bed — 32 square feet — can realistically produce
            30+ pounds of tomatoes, continuous salad greens from spring through fall,
            a full herb section, and a succession of root vegetables in the same season
            if you plan it right. That&apos;s not theory — that&apos;s what dense planting in
            quality soil actually produces.
          </p>

          {/* Raised bed sizing */}
          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-3" style={{ color: FOREST }}>Raised bed sizing guide</h3>
            <div className="space-y-2 text-sm">
              {[
                ['4×4 ft', 'Starter bed. One person, herbs + salad greens + 2 tomato plants.'],
                ['4×8 ft', 'The sweet spot. Best use of lumber lengths, highly productive, manageable.'],
                ['4×12 ft', 'Serious output. Add another row of crops without adding complexity.'],
                ['2×4 ft', 'Patio/balcony option. Fits on most patios, moveable if needed.'],
              ].map(([size, desc]) => (
                <div key={String(size)} className="flex gap-3">
                  <span className="font-bold shrink-0 w-16" style={{ color: GOLD }}>{size}</span>
                  <span style={{ color: `${FOREST}99` }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <p>
            Never make a raised bed wider than 4 feet if you&apos;re accessing it from both
            sides, or 2 feet if it&apos;s against a wall or fence. You need to reach the
            center without stepping in — stepping compacts the soil and defeats the
            purpose.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Staggered planting: the multiplier most beginners miss
          </h2>
          <p>
            Planting everything at once is how you end up with 50 heads of lettuce in
            the same week and nothing for the rest of the season. Stagger your plantings
            every 2–3 weeks instead.
          </p>
          <p>
            For lettuce, radishes, spinach, and other fast crops: sow a short row, wait
            2–3 weeks, sow another. You get a continuous harvest for months from the same
            bed space. For tomatoes and peppers you generally only need one succession
            unless you&apos;re growing a lot — focus the stagger on your greens and roots.
          </p>
          <p>
            Also think vertically in your bed layout. Put tall plants (tomatoes,
            pole beans, cucumbers) on the north side so they don&apos;t shade shorter crops.
            Then medium plants, then low growers at the south edge. Every square foot
            gets full light.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Vertical growing: the space multiplier
          </h2>
          <p>
            Wall space and vertical structures are completely underused in small gardens.
            Any vining crop — cucumbers, pole beans, peas, squash, even some tomato
            varieties — can grow up instead of out, which means the ground footprint
            of that plant becomes almost nothing.
          </p>
          <ul className="space-y-3 list-none pl-0">
            {[
              ['A-frame trellis', 'Plant crops on both sides, get double the production from the same footprint. Works in a raised bed or in-ground.'],
              ['Wall-mounted panels', 'Attach cattle panel or wire mesh to a fence or wall. Cucumbers up a fence are one of the most productive space-to-yield setups you can do.'],
              ['Teepee poles', 'Three or four bamboo stakes tied at the top. Pole beans love them, takes 10 minutes to set up, costs almost nothing.'],
              ['Tower planters', 'Stacked pocket planters for strawberries, herbs, or lettuce. Takes 2 square feet of ground space, plants 20+ plants.'],
            ].map(([title, desc]) => (
              <li key={String(title)} className="flex gap-3 items-start">
                <span style={{ color: GOLD, fontWeight: 700 }}>→</span>
                <span><strong>{String(title)}</strong> — {String(desc)}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Small-space container gardening
          </h2>
          <p>
            Whether you&apos;re on a balcony, a screen porch, a small concrete slab, or
            a townhome backyard that barely fits a grill — container gardening works,
            and it works well when you choose the right plants and containers.
          </p>
          <p>
            The two things that kill container gardens are undersized pots and bad
            drainage. Almost everything else is fixable.
          </p>

          {/* Container sizing */}
          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-3" style={{ color: FOREST }}>Minimum container sizes by crop</h3>
            <div className="space-y-2 text-sm">
              {[
                ['Herbs', '6–8" pot. Most herbs thrive in small containers. Basil, thyme, rosemary, parsley.'],
                ['Lettuce / greens', '8–12" wide, 6" deep minimum. Shallow roots, spreads wide.'],
                ['Radishes / carrots', '12" deep. Root vegetables need depth more than width.'],
                ['Peppers', '3–5 gallon pot. Compact plants, high producers in containers.'],
                ['Tomatoes (patio varieties)', '5 gallon minimum. Determinates like Patio, Tumbling Tom work well.'],
                ['Tomatoes (full size)', '10–15 gallon. Big roots, needs space — do this only if you have room.'],
                ['Cucumbers', '5 gallon + trellis. Train them up and they produce prolifically.'],
                ['Beans', '12"+ wide, 8"+ deep per plant. Bush beans easier than pole in containers.'],
              ].map(([crop, desc]) => (
                <div key={String(crop)} className="flex gap-3 items-start">
                  <span className="font-bold shrink-0 w-32" style={{ color: GOLD }}>{crop}</span>
                  <span style={{ color: `${FOREST}99` }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <p>
            For drainage, every container needs holes and you need to keep them clear.
            If you&apos;re on a balcony or patio and don&apos;t want water draining onto the floor,
            use a saucer — but empty it after watering. Sitting water in the saucer will
            eventually rot roots.
          </p>
          <p>
            Container plants need watering more frequently than in-ground because the
            soil volume is smaller. In summer heat, daily watering is often necessary.
            A moisture meter takes the guesswork out of it completely — check before
            you water, not on a schedule.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Seed starting in limited space
          </h2>
          <p>
            You don&apos;t need a greenhouse. You don&apos;t need a dedicated room. A baker&apos;s rack
            on a porch or a couple of shelves in a spare corner is completely workable.
            What you need is consistent light — and that&apos;s where most people go wrong.
            A windowsill isn&apos;t enough. Natural light from a window, even a south-facing
            one, produces leggy, weak seedlings because it&apos;s not intense enough and
            it only hits one side of the plant.
          </p>

          {/* Grow light setup */}
          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-3" style={{ color: FOREST }}>Basic shelf seed-starting setup</h3>
            <ul className="space-y-2 text-sm">
              {[
                'A baker\'s rack or wire shelf — 2 to 4 tiers',
                'Full-spectrum LED grow lights on each shelf (affiliate links coming)',
                'Lights 2–4" above seedling trays, raised as plants grow',
                '16 hours on, 8 hours off — plug into a simple outlet timer',
                'Seedling heat mat under trays for germination (most seeds want 65–75°F soil)',
                'Standard 72-cell seedling trays with a clear dome until germination',
                'Seedling mix only — not your garden soil or raised bed mix',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: GOLD, fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p>
            For a slightly larger setup — say a full 4-shelf baker&apos;s rack — you can
            run one light per shelf and start 3–4 trays per shelf, which is
            200+ seedlings at a time. That&apos;s more than enough for a serious suburban
            garden and enough surplus to trade with neighbors.
          </p>
          <p>
            Start tomatoes and peppers 6–8 weeks before your last frost date.
            Brassicas (broccoli, cabbage, kale) 4–6 weeks. Herbs can be started
            anytime but most are fast enough to direct sow outdoors once temps allow.
            Cucumbers, squash, and beans don&apos;t transplant well — direct sow those
            after your last frost.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Extending the season
          </h2>
          <p>
            Two to four extra weeks at each end of the growing season is achievable
            with almost zero investment. In spring, a row cover or simple cold frame
            over your raised bed lets you plant 3–4 weeks earlier than your last frost
            date. In fall, the same cover extends your greens and root crops well into
            the cold months.
          </p>
          <ul className="space-y-2 list-none pl-0 text-sm">
            {[
              'Row cover fabric (garden fleece) — drape directly over plants, holds several degrees of frost off',
              'Cold frame — four sides and a glass or polycarbonate top, no heating needed, passive solar works well',
              'Low tunnel — wire hoops over a raised bed with row cover over them, easy to vent on warm days',
              'Dark-colored raised bed walls absorb heat during the day and release it at night — a small but real effect',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: GOLD, fontWeight: 700 }}>→</span>
                {item}
              </li>
            ))}
          </ul>

        </div>

        {/* Series nav */}
        <div className="mt-14 flex justify-between items-center pt-8" style={{ borderTop: `1px solid ${FOREST}18` }}>
          <Link href="/homesteading/suburban" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: `${FOREST}88` }}>
            <ArrowLeft className="h-4 w-4" /> Series Overview
          </Link>
          <Link href="/homesteading/suburban/soil" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: FOREST }}>
            Next: Building Your Soil <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </main>
    </div>
  )
}
