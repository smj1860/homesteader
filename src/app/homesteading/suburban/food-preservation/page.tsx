import { Navigation } from "@/components/Navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Preserving the Harvest | SteadCraft",
  description: "When the garden produces more than you can eat — pickling, canning, jellies, flash freezing, dehydrating, and when freeze drying makes sense.",
}

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export default function SuburbanFoodPreservationPage() {
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
          <span style={{ color: FOREST }}>Preserving the Harvest</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex gap-2 mb-5">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${GOLD}20`, color: GOLD }}>
              Suburban Series
            </span>
            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${FOREST}12`, color: FOREST, border: `1px solid ${FOREST}22` }}>
              Guide 6 of 6
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: FOREST }}>
            Preserving the Harvest
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: `${FOREST}99` }}>
            This is the problem you want to have: more food than you can eat right now.
            The garden produced. Now the job is making sure none of it goes to waste —
            and building a real pantry that carries you through the off-season.
          </p>
        </div>

        <div className="space-y-5 text-base leading-relaxed" style={{ color: `${FOREST}dd` }}>

          <h2 className="font-serif text-2xl font-bold pt-2" style={{ color: FOREST }}>
            Don&apos;t wait until you&apos;re drowning in zucchini
          </h2>
          <p>
            The biggest preservation mistake is learning these methods during the
            harvest instead of before it. The week you have 40 pounds of tomatoes
            is not the week to figure out canning for the first time.
            Learn the process, gather your equipment, and do a small trial batch
            in the weeks before peak harvest. Then when the abundance hits, you&apos;re ready.
          </p>

          {/* Flash freezing */}
          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Flash freezing
          </h2>
          <p>
            Start here. Flash freezing is the lowest-barrier preservation method and
            works for an enormous range of produce. The reason it&apos;s called flash freezing
            rather than just &ldquo;freezing&rdquo; is the technique — you freeze items individually
            on a tray first, then bag them together. This prevents a solid frozen clump
            that&apos;s impossible to use partially.
          </p>
          <div className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-2" style={{ color: FOREST }}>Flash freezing process</h3>
            <ol className="space-y-2 text-sm list-none pl-0">
              {[
                'Wash and dry produce completely — wet items freeze in a solid mass.',
                'Cut into usable portions (halve peppers, slice squash, shuck and cut corn, etc.).',
                'Blanch vegetables first if they\'re going to be stored more than a month: 2–3 minutes in boiling water, then immediately into ice water to stop cooking. This deactivates enzymes that cause deterioration in the freezer.',
                'Spread in a single layer on a baking sheet lined with parchment.',
                'Freeze solid — usually 2–4 hours.',
                'Transfer to labeled freezer bags or containers, squeeze out as much air as possible, and seal.',
                'Label with contents and date. Properly frozen produce lasts 8–12 months.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: FOREST, color: PARCH }}>{i + 1}</span>
                  <span style={{ color: `${FOREST}cc` }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <p>
            Works well for: corn, peas, beans, peppers, berries, herbs, spinach, kale,
            broccoli, cauliflower, summer squash, sliced tomatoes for cooking.
          </p>

          {/* Pickling */}
          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Pickling
          </h2>
          <p>
            Quick pickling (refrigerator pickles) requires no special equipment and
            takes about 20 minutes. You&apos;re not canning these — they go in the fridge
            and stay good for 4–6 weeks. Perfect for cucumbers, green beans, onions,
            jalapeños, radishes, and a long list of other vegetables.
          </p>
          <div className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-2" style={{ color: FOREST }}>Basic quick pickle brine</h3>
            <p className="text-sm mb-3" style={{ color: `${FOREST}99` }}>
              This ratio works for almost any vegetable. Scale up or down as needed.
            </p>
            <ul className="space-y-1.5 text-sm" style={{ color: `${FOREST}cc` }}>
              <li>• 1 cup white or apple cider vinegar (5% acidity)</li>
              <li>• 1 cup water</li>
              <li>• 1 tablespoon salt (pickling salt or kosher — not iodized, which clouds the brine)</li>
              <li>• 1 tablespoon sugar (optional, rounds out the sharpness)</li>
              <li>• Spices of choice: dill, garlic, peppercorns, red pepper flakes, mustard seed</li>
            </ul>
            <p className="text-xs mt-3" style={{ color: `${FOREST}88` }}>
              Heat brine until salt and sugar dissolve. Pour over prepared vegetables in clean jars.
              Let cool, then refrigerate. Ready in 24 hours, peak flavor at 48–72 hours.
            </p>
          </div>

          {/* Canning */}
          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Water bath canning
          </h2>
          <p>
            Water bath canning creates shelf-stable jars that store for a year or
            more without refrigeration. It works for high-acid foods: tomatoes,
            most fruits, jams, jellies, pickles, and anything with added lemon juice
            or vinegar to bring the pH down.
          </p>
          <p>
            Low-acid foods — vegetables, meat, beans — require a pressure canner,
            which operates at higher temperatures. Water bath canning is not safe
            for low-acid foods. This is the one food safety rule that matters and
            can&apos;t be bent.
          </p>
          <div className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-2" style={{ color: FOREST }}>Water bath canning basics</h3>
            <ol className="space-y-2 text-sm list-none pl-0">
              {[
                'Sterilize jars by running through the dishwasher or submerging in boiling water for 10 minutes.',
                'Heat lids in hot (not boiling) water to soften the sealing compound.',
                'Fill hot jars with prepared food, leaving the headspace specified by the recipe (usually ¼" to ½"). Headspace matters — too much or too little affects the seal.',
                'Wipe the jar rims clean with a damp cloth before putting on the lids.',
                'Apply lids and screw bands to fingertip tight — not cranked down hard.',
                'Process in a boiling water bath for the time specified by the recipe. Times vary by food and jar size.',
                'Remove jars and let cool undisturbed for 12–24 hours. You\'ll hear the satisfying pop as lids seal.',
                'Check seals — the lid center should be concave and firm. Any jar that didn\'t seal goes in the fridge and gets used first.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: FOREST, color: PARCH }}>{i + 1}</span>
                  <span style={{ color: `${FOREST}cc` }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <p>
            For processing times and tested recipes, the Ball Blue Book and the
            National Center for Home Food Preservation (nchfp.uga.edu) are the
            authoritative sources. Don&apos;t wing processing times — use a tested recipe.
          </p>

          {/* Jams and jellies */}
          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Jams and jellies
          </h2>
          <p>
            Jams and jellies are the most approachable entry point into water bath
            canning. The acid content is naturally high, the process is forgiving,
            and a batch of strawberry jam from your own garden is one of the most
            satisfying things you&apos;ll produce.
          </p>
          <p>
            The basic formula for most fruit jams: fruit + sugar + pectin + lemon
            juice. Pectin is what causes the jam to set — without it you get a thick
            sauce, not a spreadable jam. Standard commercial pectin (Ball or Pomona&apos;s)
            comes with detailed instructions for dozens of fruits.
          </p>
          <p>
            Jelly differs from jam in that it uses only the strained juice of the
            fruit, not the pulp. Clearer, firmer, slightly more work. Both process
            identically in the water bath.
          </p>

          {/* Dehydrating */}
          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Dehydrating
          </h2>
          <p>
            A food dehydrator runs at 95–165°F and removes moisture from food slowly
            over 6–24 hours, producing shelf-stable dried food that retains most of
            its nutrition. Entry-level dehydrators start around $40–60 and work well
            for most home use.
          </p>
          <div className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-2" style={{ color: FOREST }}>Best candidates for dehydrating</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm" style={{ color: `${FOREST}99` }}>
              {[
                'Herbs (fastest, best flavor)', 'Tomatoes (sun-dried style)',
                'Apples and pears', 'Bananas',
                'Mushrooms', 'Zucchini chips',
                'Hot peppers', 'Berries',
                'Garlic (makes homemade garlic powder)', 'Onions',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ color: GOLD }}>✓</span> {item}
                </div>
              ))}
            </div>
          </div>
          <p>
            Dried food stores at room temperature in airtight containers for
            6–12 months. In a vacuum-sealed container or Mylar bag with an oxygen
            absorber, dried vegetables and herbs can last 3–5 years or more.
          </p>

          {/* Freeze drying */}
          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Freeze drying: the gold standard
          </h2>
          <p>
            Freeze drying removes moisture through sublimation — the food is frozen
            first, then exposed to a vacuum that causes the ice to convert directly
            to vapor without melting. The result is food that retains 97%+ of its
            nutritional content, rehydrates almost perfectly, and stores for
            20–25 years in proper packaging.
          </p>
          <p>
            It&apos;s the most impressive preservation method available to home producers,
            and the results genuinely are remarkable — freeze-dried strawberries taste
            like fresh strawberries months or years later in a way that no other method
            achieves.
          </p>
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: `${GOLD}10`, border: `1.5px solid ${GOLD}30` }}
          >
            <h3 className="font-semibold mb-2" style={{ color: FOREST }}>The cost reality</h3>
            <p className="text-sm leading-relaxed" style={{ color: `${FOREST}cc` }}>
              A quality home freeze dryer from Harvest Right — the main manufacturer
              worth buying — runs $2,200–$4,800 depending on size. It&apos;s a serious
              investment, and it&apos;s not the right first step.
            </p>
            <p className="text-sm leading-relaxed mt-2" style={{ color: `${FOREST}cc` }}>
              If you&apos;re already preserving consistently through canning, dehydrating,
              and freezing and want to take it to the next level — or if you&apos;re building
              a serious long-term food storage program — a freeze dryer pays for itself
              over time and produces food that no other method can match.
              If you&apos;re just getting started, master the accessible methods first.
            </p>
          </div>

          {/* Closing — the cycle */}
          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Close the loop
          </h2>
          <p>
            You&apos;ve made it through the full cycle. You started seeds, built soil to
            grow them in, collected water to sustain them, and now you have the tools
            to preserve everything they produced so nothing goes to waste.
          </p>
          <p>
            The last step — before it all starts again — is saving seeds from your
            best-performing plants. Open-pollinated and heirloom varieties will come
            back true to type. Let your best tomato fully ripen past what you&apos;d eat,
            scoop the seeds, ferment them for 2–3 days in water to remove the gel
            coating, rinse, dry on a coffee filter, and store in a labeled envelope
            in a cool dry place. Next spring: start again.
          </p>
          <p>
            That&apos;s the homestead cycle. You don&apos;t need acres. You need the knowledge,
            the habit, and the willingness to start.
          </p>

          {/* Series complete */}
          <div
            className="rounded-2xl p-8 text-center mt-8"
            style={{ backgroundColor: FOREST }}
          >
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `${GOLD}22` }}>
                <span className="text-2xl">🌱</span>
              </div>
            </div>
            <h3 className="font-serif text-xl font-bold mb-2" style={{ color: PARCH }}>
              You&apos;ve completed the Suburban Homesteading Series
            </h3>
            <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: `${PARCH}aa` }}>
              Garden. Soil. Compost. Water. Cleaning. Preservation. The cycle is yours now.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/homesteading/suburban">
                <button className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80 border" style={{ borderColor: `${PARCH}33`, color: PARCH }}>
                  Back to Series Overview
                </button>
              </Link>
              <Link href="/homesteading/beginners">
                <button className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-90" style={{ backgroundColor: GOLD, color: '#1a1a1a' }}>
                  Try the Homestead Planner
                </button>
              </Link>
            </div>
          </div>

        </div>

        {/* Series nav */}
        <div className="mt-10 flex justify-between items-center pt-8" style={{ borderTop: `1px solid ${FOREST}18` }}>
          <Link href="/homesteading/suburban/cleaning-supplies" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: `${FOREST}88` }}>
            <ArrowLeft className="h-4 w-4" /> Cleaning Supplies
          </Link>
          <Link href="/homesteading/suburban" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: FOREST }}>
            Back to Series Overview
          </Link>
        </div>

      </main>
    </div>
  )
}
