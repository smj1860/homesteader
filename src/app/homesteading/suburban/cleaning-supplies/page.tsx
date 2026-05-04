import { Navigation } from "@/components/Navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Homemade Cleaning Supplies | SteadCraft",
  description: "Cut household chemical costs with simple, effective homemade cleaners — starting with a natural weed killer that actually works.",
}

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export default function SuburbanCleaningPage() {
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
          <span style={{ color: FOREST }}>Cleaning Supplies</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex gap-2 mb-5">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${GOLD}20`, color: GOLD }}>
              Suburban Series
            </span>
            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${FOREST}12`, color: FOREST, border: `1px solid ${FOREST}22` }}>
              Guide 5 of 6
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: FOREST }}>
            Homemade Cleaning Supplies
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: `${FOREST}99` }}>
            The cleaning products under your sink are mostly water, a handful of
            active ingredients, and a significant markup. Most can be replaced with
            simple homemade versions that cost a fraction of the price and work just
            as well — often better.
          </p>
        </div>

        <div className="space-y-5 text-base leading-relaxed" style={{ color: `${FOREST}dd` }}>

          <h2 className="font-serif text-2xl font-bold pt-2" style={{ color: FOREST }}>
            Why make your own?
          </h2>
          <p>
            There are three real reasons to make your own cleaning supplies, and
            &ldquo;it&apos;s more natural&rdquo; is actually the least compelling of them.
          </p>
          <ul className="space-y-2 list-none pl-0">
            {[
              ['Cost', 'A gallon of homemade all-purpose cleaner costs under $1 in ingredients. A commercial equivalent runs $4–8. Laundry detergent savings are even more dramatic — 100+ loads for what you&d pay for 20.'],
              ['Ingredients you understand', 'Vinegar, baking soda, castile soap, borax. You know what these things are. The ingredient list on most commercial cleaners requires a chemistry degree to parse.'],
              ['Customizable', 'Add the essential oils you like, adjust the strength for the job, make a concentrated version for storage. The recipe is yours to modify.'],
            ].map(([title, desc]) => (
              <li key={String(title)} className="flex gap-3 items-start">
                <span style={{ color: GOLD, fontWeight: 700 }}>→</span>
                <span><strong>{String(title)}</strong> — {String(desc)}</span>
              </li>
            ))}
          </ul>

          {/* Weed killer — the full recipe */}
          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Natural weed killer
          </h2>
          <p>
            This is the recipe we use and can personally vouch for. It works — and
            it works well on actively growing weeds in full sun. It&apos;s not selective
            like commercial herbicides, so don&apos;t spray near plants you want to keep.
          </p>

          {/* Recipe card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: `2px solid ${GOLD}44` }}
          >
            <div className="px-5 py-3" style={{ backgroundColor: FOREST }}>
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                Natural Weed Killer — 1 Gallon Sprayer
              </span>
            </div>
            <div className="p-5" style={{ backgroundColor: PARCH2 }}>
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: `${FOREST}88` }}>
                  A note on the vinegar
                </p>
                <p className="text-sm leading-relaxed" style={{ color: `${FOREST}cc` }}>
                  Results depend heavily on vinegar strength. Grocery store white vinegar
                  (5% acidity) gives weak results. Cleaning vinegar (6–8%) is better.
                  Horticultural or industrial white vinegar (20–30% acidity) gives the
                  strongest kill and is what this recipe is based on. Find it at farm
                  supply stores or online. Handle with care — at that concentration it
                  can irritate skin and eyes.
                </p>
              </div>

              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: `${FOREST}88` }}>Ingredients</p>
                <ul className="space-y-2 text-sm">
                  {[
                    '½ gallon horticultural/industrial white vinegar (20–30% acidity)',
                    '½ gallon warm water',
                    '¼ cup borax',
                    '3–4 drops of Dawn dish soap',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span style={{ color: GOLD, fontWeight: 700 }}>✓</span>
                      <span style={{ color: FOREST }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: `${FOREST}88` }}>Directions</p>
                <ol className="space-y-2.5 list-none pl-0">
                  {[
                    'Measure ¼ cup of borax into a container. Dissolve it thoroughly in warm or hot water before adding anything else — undissolved borax clogs the sprayer.',
                    'Pour the borax solution into your 1-gallon sprayer.',
                    'Add the white vinegar to bring the total liquid volume to 1 gallon (roughly half and half with the water).',
                    'Add 3–4 drops of Dawn dish soap. The soap acts as a surfactant — it helps the solution stick to waxy leaf surfaces instead of beading off.',
                    'Cap the sprayer and swirl gently to mix. Shake before each use.',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: FOREST, color: PARCH }}>{i + 1}</span>
                      <span className="text-sm" style={{ color: `${FOREST}cc` }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div
                className="rounded-lg p-3"
                style={{ backgroundColor: `${GOLD}12`, border: `1px solid ${GOLD}25` }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: GOLD }}>Best results</p>
                <p className="text-xs leading-relaxed" style={{ color: `${FOREST}cc` }}>
                  Spray on a sunny day with no rain in the forecast for at least 24 hours.
                  Sunshine accelerates the burn significantly — spraying in the morning
                  and letting a full day of sun work gives the best results. Weeds will
                  show visible damage within hours on a hot sunny day. Repeat applications
                  may be needed for established perennial weeds with deep root systems.
                </p>
              </div>

              <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: '#c0392b0a', border: '1px solid #c0392b20' }}>
                <p className="text-xs leading-relaxed" style={{ color: '#c0392b' }}>
                  <strong>Caution:</strong> This spray will kill or damage any plant it contacts.
                  Apply carefully around garden beds and avoid spray drift onto plants you want to keep.
                  Do not use near water sources. Horticultural vinegar can cause skin and eye irritation
                  — wear gloves and eye protection when mixing and spraying.
                </p>
              </div>
            </div>
          </div>

          {/* Essential oils note */}
          <div className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-2" style={{ color: FOREST }}>Optional: essential oils</h3>
            <p className="text-sm leading-relaxed" style={{ color: `${FOREST}99` }}>
              Many homemade cleaning recipes call for essential oils — primarily for scent,
              though some have mild antimicrobial properties. Tea tree, lavender, eucalyptus,
              and lemon are the most commonly used. A few drops per batch goes a long way.
              They&apos;re completely optional — the recipes work without them.
            </p>
          </div>

          {/* Link to more recipes */}
          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            More homemade cleaning recipes
          </h2>
          <p>
            We have full tested recipes for laundry detergent, dish soap, bar soap,
            shampoo, body wash, and all-purpose cleaner in our Resources section.
            These are recipes we&apos;ve used personally — not scraped from the internet.
          </p>

          <Link href="/resources/cleaning-recipes">
            <div
              className="rounded-xl p-5 flex items-center justify-between group transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: FOREST }}
            >
              <div>
                <p className="font-semibold" style={{ color: PARCH }}>Homemade Cleaning Recipes</p>
                <p className="text-sm mt-0.5" style={{ color: `${PARCH}aa` }}>
                  Laundry detergent, dish soap, bar soap, shampoo, body wash, all-purpose cleaner
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 ml-4 transition-transform group-hover:translate-x-1" style={{ color: GOLD }} />
            </div>
          </Link>

        </div>

        {/* Series nav */}
        <div className="mt-14 flex justify-between items-center pt-8" style={{ borderTop: `1px solid ${FOREST}18` }}>
          <Link href="/homesteading/suburban/rainwater" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: `${FOREST}88` }}>
            <ArrowLeft className="h-4 w-4" /> Collecting Rainwater
          </Link>
          <Link href="/homesteading/suburban/food-preservation" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: FOREST }}>
            Next: Preserving the Harvest <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </main>
    </div>
  )
}
