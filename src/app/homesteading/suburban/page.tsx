import { Navigation } from "@/components/Navigation"
import { ArrowRight, Sprout, Droplets, Leaf, FlaskConical, Archive, ChevronRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Suburban Homesteading | SteadCraft",
  description: "You don't need acres to build a self-sufficient life. A complete guide to growing food, building soil, collecting water, and preserving your harvest — wherever you live.",
}

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

const guides = [
  {
    number: 1,
    title: "The Garden",
    description: "Raised beds, vertical growing, small-space containers, seed starting, and how to grow more food than you think your space allows.",
    href: "/homesteading/suburban/garden",
    icon: Sprout,
    time: "10 min read",
  },
  {
    number: 2,
    title: "Building Your Soil",
    description: "Why DIY soil mixes outperform bagged all-in-ones — and the exact mixes for pots, raised beds, and in-ground planting at every budget.",
    href: "/homesteading/suburban/soil",
    icon: Leaf,
    time: "8 min read",
  },
  {
    number: 3,
    title: "Composting",
    description: "Turn your kitchen scraps and garden waste into the best free fertilizer you'll ever use. Includes a DIY bin build and a patio-friendly option.",
    href: "/homesteading/suburban/composting",
    icon: Archive,
    time: "7 min read",
  },
  {
    number: 4,
    title: "Collecting Rainwater",
    description: "Set up a rain barrel system that captures free water for your garden. Covers sizing, connecting multiple barrels, and what to check before you start.",
    href: "/homesteading/suburban/rainwater",
    icon: Droplets,
    time: "6 min read",
  },
  {
    number: 5,
    title: "Homemade Cleaning Supplies",
    description: "Cut household chemical costs with simple, effective homemade cleaners. Includes a natural weed killer that actually works.",
    href: "/homesteading/suburban/cleaning-supplies",
    icon: FlaskConical,
    time: "6 min read",
  },
  {
    number: 6,
    title: "Preserving the Harvest",
    description: "When the garden produces more than you can eat — pickling, canning, jellies, flash freezing, dehydrating, and when freeze drying makes sense.",
    href: "/homesteading/suburban/food-preservation",
    icon: Archive,
    time: "9 min read",
  },
]

export default function SuburbanHubPage() {
  return (
    <div className="min-h-screen pb-24 pt-20" style={{ backgroundColor: PARCH }}>
      <Navigation />

      <main className="container mx-auto max-w-4xl px-4 pt-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: `${FOREST}88` }}>
          <Link href="/homesteading" className="hover:underline" style={{ color: `${FOREST}88` }}>Homesteading</Link>
          <span>/</span>
          <span style={{ color: FOREST }}>Suburban Homesteading</span>
        </nav>

        {/* Hero */}
        <section className="rounded-2xl overflow-hidden mb-12" style={{ backgroundColor: FOREST }}>
          <div className="px-8 py-12 md:px-14 md:py-16">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6"
              style={{ backgroundColor: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}44` }}
            >
              <Sprout className="h-3.5 w-3.5" /> Suburban Series
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: PARCH }}>
              You Don&apos;t Need Acres to{' '}
              <span style={{ color: GOLD }}>Live Self-Sufficiently</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: `${PARCH}cc` }}>
              A balcony. A patio. A small backyard. That&apos;s enough. This series
              covers everything you need to grow real food, build living soil, collect
              free water, and preserve a genuine harvest — wherever you live.
            </p>
          </div>
        </section>

        {/* The Cycle */}
        <section className="mb-14">
          <div className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: PARCH2, border: `1.5px solid ${FOREST}20` }}>
            <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: FOREST }}>
              Everything in this series is connected
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
              This isn&apos;t a random collection of guides. These six topics form a
              complete cycle — one feeds into the next, and when you close the loop
              you&apos;re running a genuinely self-sustaining system regardless of how
              much space you have.
            </p>

            {/* Cycle visual */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              {[
                { step: '01', label: 'Start your seeds', sub: 'Garden guide' },
                { step: '02', label: 'Build your soil', sub: 'Soil guide' },
                { step: '03', label: 'Collect free water', sub: 'Rainwater guide' },
                { step: '04', label: 'Harvest abundantly', sub: 'Garden guide' },
                { step: '05', label: 'Preserve everything', sub: 'Preservation guide' },
                { step: '06', label: 'Save seeds. Repeat.', sub: 'Back to step 01' },
              ].map(({ step, label, sub }) => (
                <div
                  key={step}
                  className="rounded-xl p-3 text-center"
                  style={{ backgroundColor: `${FOREST}0e` }}
                >
                  <div className="text-xs font-bold mb-1" style={{ color: GOLD }}>{step}</div>
                  <div className="text-sm font-semibold" style={{ color: FOREST }}>{label}</div>
                  <div className="text-xs mt-0.5" style={{ color: `${FOREST}77` }}>{sub}</div>
                </div>
              ))}
            </div>

            <p className="text-sm leading-relaxed" style={{ color: `${FOREST}99` }}>
              Compost feeds your soil. Your soil feeds your plants. Rainwater feeds your
              soil and plants. Your harvest feeds your family — and the scraps go back
              into the compost. Nothing is wasted. That&apos;s the whole point.
            </p>
          </div>
        </section>

        {/* Guide list */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: FOREST }}>
            The Series
          </h2>

          <div className="space-y-3">
            {guides.map((guide) => {
              const Icon = guide.icon
              return (
                <Link key={guide.href} href={guide.href} className="block group">
                  <div
                    className="rounded-xl p-5 flex items-start gap-4 transition-all group-hover:-translate-y-0.5"
                    style={{ backgroundColor: PARCH2, border: `1.5px solid ${FOREST}18` }}
                  >
                    {/* Number + icon */}
                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                        style={{ backgroundColor: FOREST, color: PARCH }}
                      >
                        {guide.number}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-lg mb-1" style={{ color: FOREST }}>
                        {guide.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-1.5" style={{ color: `${FOREST}99` }}>
                        {guide.description}
                      </p>
                      <span className="text-xs" style={{ color: `${FOREST}66` }}>{guide.time}</span>
                    </div>

                    <ArrowRight
                      className="h-5 w-5 shrink-0 mt-1 transition-transform group-hover:translate-x-1"
                      style={{ color: GOLD }}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Start CTA */}
        <section className="rounded-2xl p-8 text-center" style={{ backgroundColor: FOREST }}>
          <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: PARCH }}>
            Ready to start?
          </h2>
          <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: `${PARCH}aa` }}>
            Begin with the Garden guide and follow the series in order —
            each one builds on the last.
          </p>
          <Link href="/homesteading/suburban/garden">
            <button
              className="inline-flex items-center gap-2 rounded-lg px-8 py-3 font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
            >
              Start with the Garden <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </section>

      </main>
    </div>
  )
}
