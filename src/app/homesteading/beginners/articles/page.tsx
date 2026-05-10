// src/app/homesteading/beginners/articles/page.tsx

import Link from 'next/link'

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export const metadata = {
  title: "Beginner's Guide to Homesteading | SteadCraft",
  description:
    'A five-part series covering everything you need to know to start your homestead the right way — from what homesteading actually means to building the community around it.',
}

const ARTICLES = [
  {
    num: '01',
    title: "What Does It Actually Mean to Homestead?",
    desc: "Homesteading isn't a single thing — it's a spectrum. We break down what it really means, what it isn't, and how to find your own version of it.",
    href: '/homesteading/beginners/articles/what-is-homesteading',
    readTime: '5 min read',
  },
  {
    num: '02',
    title: "Your First Year: Realistic Goals",
    desc: "The biggest mistake new homesteaders make is trying to do everything at once. Here's how to set goals that actually stick and build momentum into year two.",
    href: '/homesteading/beginners/articles/first-year',
    readTime: '6 min read',
  },
  {
    num: '03',
    title: "Essential Tools Every Homesteader Needs",
    desc: "Not every tool matters equally. We cover the ones worth buying, the ones worth skipping, and where to find good deals on used equipment.",
    href: '/homesteading/beginners/articles/essential-tools',
    readTime: '7 min read',
  },
  {
    num: '04',
    title: "Mistakes First-Year Homesteaders Make",
    desc: "Learn from the people who've already made them. These are the most common first-year pitfalls — and exactly how to avoid each one.",
    href: '/homesteading/beginners/articles/common-mistakes',
    readTime: '6 min read',
  },
  {
    num: '05',
    title: "Building Your Homestead Community",
    desc: "No homestead thrives in isolation. From local swap meets to online groups, here's how to find your people and why it matters more than most things.",
    href: '/homesteading/beginners/articles/building-community',
    readTime: '5 min read',
  },
]

export default function BeginnerArticlesPage() {
  return (
    <main
      style={{ backgroundColor: PARCH, minHeight: '100vh', fontFamily: 'Georgia, serif' }}
    >
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8 flex items-center gap-2" style={{ color: `${FOREST}66` }}>
          <Link href="/homesteading" style={{ color: `${FOREST}66` }} className="hover:underline">
            Homesteading
          </Link>
          <span>›</span>
          <Link href="/homesteading/beginners" style={{ color: `${FOREST}66` }} className="hover:underline">
            Beginners
          </Link>
          <span>›</span>
          <span style={{ color: FOREST }}>Article Series</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
            Beginner Series
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: FOREST }}>
            A Beginner's Introduction to Homesteading
          </h1>
          <p className="text-base leading-relaxed" style={{ color: `${FOREST}99` }}>
            Five articles to read before you plant your first seed, buy your first tool, or
            make your first mistake. Start at the beginning or jump to what's most relevant
            for where you are right now.
          </p>
        </div>

        {/* Articles list */}
        <div className="space-y-3 mb-12">
          {ARTICLES.map((article, i) => (
            <Link
              key={article.href}
              href={article.href}
              className="group flex items-start gap-4 rounded-2xl px-5 py-5 transition-all"
              style={{
                backgroundColor: PARCH2,
                border: `1.5px solid ${FOREST}15`,
                display: 'flex',
              }}
            >
              {/* Number */}
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
                style={{ backgroundColor: FOREST, color: PARCH }}
              >
                {article.num}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm mb-1.5 leading-snug" style={{ color: FOREST }}>
                  {article.title}
                </p>
                <p className="text-xs leading-relaxed mb-2" style={{ color: `${FOREST}77` }}>
                  {article.desc}
                </p>
                <p className="text-xs font-medium" style={{ color: GOLD }}>
                  {article.readTime}
                </p>
              </div>

              {/* Arrow */}
              <span
                className="shrink-0 mt-1 text-sm transition-transform group-hover:translate-x-1"
                style={{ color: GOLD }}
              >
                →
              </span>
            </Link>
          ))}
        </div>

        {/* CTA to questionnaire */}
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: FOREST }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>
            Ready for the next step?
          </p>
          <h2 className="text-lg font-bold mb-2" style={{ color: PARCH }}>
            Build Your Personalized Homestead Plan
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: `${PARCH}cc` }}>
            Answer a few questions about your space and goals — we'll generate a custom plan with
            crop recommendations, soil mix recipes, and realistic yield targets.
          </p>
          <Link
            href="/homesteading/beginners"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
            style={{ backgroundColor: GOLD, color: PARCH }}
          >
            Start the Quiz →
          </Link>
        </div>

        {/* Bottom nav */}
        <div
          className="mt-10 pt-8 flex items-center justify-between text-sm"
          style={{ borderTop: `1px solid ${FOREST}20` }}
        >
          <Link
            href="/homesteading"
            className="font-medium"
            style={{ color: FOREST }}
          >
            ← All Guides
          </Link>
          <Link
            href="/homesteading/beginners"
            className="font-medium"
            style={{ color: FOREST }}
          >
            Beginners Hub →
          </Link>
        </div>

      </div>
    </main>
  )
}
