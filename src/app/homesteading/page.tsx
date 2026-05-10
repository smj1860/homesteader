'use client'

import { Navigation } from '@/components/Navigation'
import { ArrowRight, Sprout, BookOpen, Home, Hammer, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Brand tokens — explicit hex so CSS variable resolution never bleeds in
const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export default function HomesteadingHub() {
  return (
    <div className="min-h-screen pb-20 pt-20" style={{ backgroundColor: PARCH }}>
      <Navigation />

      <main className="container mx-auto px-4 max-w-6xl">

        {/* ── Page Hero ───────────────────────────────────────────────── */}
        <section
          className="mb-12 rounded-2xl overflow-hidden relative"
          style={{ backgroundColor: FOREST }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)',
              backgroundSize: '12px 12px',
            }}
          />
          <div className="relative z-10 px-8 py-14 md:px-16 md:py-20">
            <div className="mb-6">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                style={{ backgroundColor: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}44` }}
              >
                <Sprout className="h-3.5 w-3.5" />
                Homesteading Guides
              </span>
            </div>
            <h1
              className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl"
              style={{ color: PARCH }}
            >
              Build Your{' '}
              <span style={{ color: GOLD }}>Self-Sufficient</span>{' '}
              Life
            </h1>
            <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10" style={{ color: `${PARCH}cc` }}>
              Whether you have a balcony or acres, we&apos;ll guide you toward abundant food,
              cleaner living, and true homestead independence.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Beginner Series',      href: '/homesteading/beginners/articles' },
                { label: 'Take the Quiz',         href: '/homesteading/beginners' },
                { label: 'Suburban Homesteading', href: '/homesteading/suburban' },
              ].map(({ label, href }) => (
                <Link key={href} href={href}>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
                  >
                    {label} <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Beginners Quiz CTA ──────────────────────────────────────── */}
        <section className="mb-12">
          <div
            className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            style={{ backgroundColor: PARCH2, border: `1.5px solid ${GOLD}44` }}
          >
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 w-fit"
                style={{ backgroundColor: `${GOLD}20`, color: GOLD }}
              >
                Start Here
              </span>
              <h2
                className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight"
                style={{ color: FOREST }}
              >
                Build Your Personalized Homestead Plan
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: `${FOREST}bb` }}>
                Answer a few questions about your space, family size, and climate zone.
                We&apos;ll generate a custom plan with crop recommendations, soil mix recipes,
                and realistic yield targets.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  'Crops matched to your hardiness zone',
                  '4-3-2-1 soil mix recipe',
                  'Coop sizing if you want chickens',
                  'Printable PDF plan (free account)',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-medium"
                    style={{ color: FOREST }}
                  >
                    <span style={{ color: GOLD, fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/homesteading/beginners">
                <button
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: FOREST, color: PARCH }}
                >
                  Start the Quiz <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
            <div
              className="hidden md:flex items-center justify-center p-12"
              style={{ backgroundColor: `${FOREST}10` }}
            >
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${FOREST}18`, border: `2px dashed ${GOLD}44` }}
              >
                <Sprout style={{ color: GOLD, width: 80, height: 80, opacity: 0.7 }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Guide Cards ─────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2
            className="font-serif text-3xl font-bold text-center mb-8"
            style={{ color: FOREST }}
          >
            Explore Our Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Suburban Homesteading */}
            <Link href="/homesteading/suburban" className="group block">
              <div
                className="rounded-2xl p-7 h-full flex flex-col transition-transform group-hover:-translate-y-1"
                style={{ backgroundColor: FOREST }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${GOLD}22` }}
                  >
                    <Home style={{ color: GOLD, width: 24, height: 24 }} />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: `${GOLD}22`, color: GOLD }}
                  >
                    Small Space
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2" style={{ color: PARCH }}>
                  Suburban Homesteading
                </h3>
                <p className="text-sm mb-5 flex-1" style={{ color: `${PARCH}99` }}>
                  Maximize your small lot with efficient gardens, container farming, and micro-livestock.
                </p>
                <ul className="space-y-1.5 mb-5">
                  {[
                    'Raised bed gardening in limited space',
                    'Vertical growing techniques',
                    'Composting & rainwater collection',
                    'Food preservation & storage',
                    'Homemade cleaning & personal care',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: `${PARCH}99` }}>
                      <span style={{ color: GOLD }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: GOLD }}>
                  Explore guides <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>

            {/* Beginner Series */}
            <Link href="/homesteading/beginners/articles" className="group block">
              <div
                className="rounded-2xl p-7 h-full flex flex-col transition-transform group-hover:-translate-y-1"
                style={{ backgroundColor: FOREST }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${GOLD}22` }}
                  >
                    <BookOpen style={{ color: GOLD, width: 24, height: 24 }} />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: `${GOLD}22`, color: GOLD }}
                  >
                    Foundational
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2" style={{ color: PARCH }}>
                  Beginner Series
                </h3>
                <p className="text-sm mb-5 flex-1" style={{ color: `${PARCH}99` }}>
                  Core concepts every homesteader should know to get started confidently.
                </p>
                <ul className="space-y-1.5 mb-5">
                  {[
                    'What homesteading really means',
                    'Setting realistic first-year goals',
                    'Essential tools & where to start',
                    'Common mistakes to avoid',
                    'Building community & learning networks',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: `${PARCH}99` }}>
                      <span style={{ color: GOLD }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: GOLD }}>
                  Read the series <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>

            {/* Homesteading on a Budget */}
            <Link href="/homesteading/budget" className="group block">
              <div
                className="rounded-2xl p-7 h-full flex flex-col transition-all duration-200 group-hover:-translate-y-1"
                style={{
                  backgroundColor: FOREST,
                  border: `1.5px solid ${FOREST}20`,
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${GOLD}22` }}
                  >
                    <span style={{ fontSize: 24 }}>💰</span>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: `${GOLD}22`, color: GOLD }}
                  >
                    Budget Guide
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2" style={{ color: PARCH }}>
                  Homesteading on a Budget
                </h3>
                <p className="text-sm mb-5 flex-1" style={{ color: ``${PARCH}99`` }}>
                  Tools, homemade supplies, food production, and income generation —
                  practical homesteading for any budget, any space, any starting point.
                </p>
                <ul className="space-y-1.5 mb-5">
                  {[
                    'Personalized land & space growing plan',
                    'Heirloom crops weighted for seed saving',
                    'Homemade cleaners & supplies',
                    'Ways to generate income from your homestead',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: `${FOREST}99` }}>
                      <span style={{ color: GOLD }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: GOLD }}>
                  Explore guide <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>

            {/* Building Plans — coming soon */}
            <div
              className="rounded-2xl p-7 h-full flex flex-col relative overflow-hidden"
              style={{ backgroundColor: FOREST }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center rounded-2xl z-10"
                style={{ backgroundColor: `${FOREST}e0` }}
              >
                <div className="text-center px-6">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ backgroundColor: `${GOLD}30`, color: GOLD }}
                  >
                    Coming Soon
                  </span>
                  <p className="text-sm font-semibold" style={{ color: PARCH }}>
                    Building Plans are in development.
                  </p>
                </div>
              </div>
              <div className="flex items-start justify-between mb-5">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${GOLD}22` }}
                >
                  <Hammer style={{ color: GOLD, width: 24, height: 24 }} />
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ backgroundColor: `${GOLD}22`, color: GOLD }}
                >
                  DIY
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: PARCH }}>
                Building Plans
              </h3>
              <p className="text-sm mb-5 flex-1" style={{ color: `${PARCH}99` }}>
                Step-by-step plans for coops, sheds, storage, and garden structures.
              </p>
              <ul className="space-y-1.5 mb-5">
                {[
                  'Customized to your space',
                  'Generated by our AI system',
                  'Curated with mockup photos',
                  'Tool & material lists included',
                  'Difficulty ratings & time estimates',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: `${PARCH}99` }}>
                    <span style={{ color: GOLD }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* ── Newsletter strip ─────────────────────────────────────────── */}
        <section
          className="rounded-2xl px-8 py-10 text-center mb-8"
          style={{ backgroundColor: `${GOLD}18`, border: `1.5px solid ${GOLD}33` }}
        >
          <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: FOREST }}>
            Grain &amp; Grit Newsletter
          </h2>
          <p className="text-sm mb-5 max-w-md mx-auto" style={{ color: `${FOREST}aa` }}>
            Weekly homesteading knowledge — seasonal projects, growing tips, tool reviews,
            and stories from people who actually do the work.
          </p>
          <Link href="/#newsletter">
            <button
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
            >
              Subscribe Free <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </section>

      </main>
    </div>
  )
}
