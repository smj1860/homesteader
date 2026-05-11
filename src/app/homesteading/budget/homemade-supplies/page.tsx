// src/app/homesteading/budget/homemade-supplies/page.tsx

import Link from 'next/link'

const FOREST  = '#264228'
const GOLD    = '#A88032'
const PARCH   = '#F7F3EB'
const PARCH2  = '#EDE8DE'
const LEATHER = '#7C4B2A'
const RED     = '#8B2E2E'
const GREEN   = '#2D7A4F'

export const metadata = {
  title: 'Homemade Supplies — Homesteading on a Budget | SteadCraft',
  description: 'Make your own cleaners, pest sprays, personal care products, and keep a real first aid kit — all for a fraction of what the store charges.',
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>{label}</p>
      <h2 className="text-2xl font-bold" style={{ color: FOREST, fontFamily: 'Georgia, serif' }}>{title}</h2>
    </div>
  )
}

function Divider() {
  return <div className="my-10" style={{ borderTop: `1px solid ${FOREST}18` }} />
}

function Callout({ children, icon }: { children: React.ReactNode; icon?: string }) {
  return (
    <div className="rounded-2xl p-5 my-6" style={{ backgroundColor: `${GOLD}10`, border: `1.5px solid ${GOLD}30` }}>
      {icon && <p className="text-lg mb-2">{icon}</p>}
      <div className="text-sm leading-relaxed" style={{ color: FOREST, fontFamily: 'Georgia, serif' }}>
        {children}
      </div>
    </div>
  )
}

function WarningCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 my-6" style={{ backgroundColor: `${RED}08`, border: `1.5px solid ${RED}30` }}>
      <div className="text-sm leading-relaxed" style={{ color: FOREST, fontFamily: 'Georgia, serif' }}>
        {children}
      </div>
    </div>
  )
}

function RecipeCard({ title, yield: yieldAmt, costPerOz, commercial, ingredients, instructions, notes }: {
  title: string
  yield?: string
  costPerOz?: string
  commercial?: string
  ingredients: string[]
  instructions: string[]
  notes?: string
}) {
  return (
    <div className="rounded-2xl overflow-hidden my-6" style={{ border: `1.5px solid ${FOREST}20` }}>
      <div className="px-6 py-4" style={{ backgroundColor: FOREST }}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-bold text-base" style={{ color: PARCH, fontFamily: 'Georgia, serif' }}>{title}</h3>
          {costPerOz && (
            <div className="flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: `${GREEN}30`, color: '#7AE0A0' }}>
                ~{costPerOz}/oz homemade
              </span>
              {commercial && (
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: `${RED}30`, color: '#F4A0A0' }}>
                  {commercial}/oz store-bought
                </span>
              )}
            </div>
          )}
        </div>
        {yieldAmt && <p className="text-xs mt-1" style={{ color: `${PARCH}77` }}>Yield: {yieldAmt}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-0" style={{ backgroundColor: PARCH2 }}>
        <div className="p-5" style={{ borderRight: `1px solid ${FOREST}12` }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GOLD }}>Ingredients</p>
          <ul className="space-y-1.5">
            {ingredients.map((ing, i) => (
              <li key={i} className="text-sm flex items-start gap-2" style={{ color: FOREST }}>
                <span style={{ color: GOLD, marginTop: 2 }}>·</span> {ing}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GOLD }}>Instructions</p>
          <ol className="space-y-2">
            {instructions.map((step, i) => (
              <li key={i} className="text-sm flex items-start gap-2.5" style={{ color: FOREST }}>
                <span className="shrink-0 font-bold" style={{ color: GOLD }}>{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {notes && (
        <div className="px-6 py-3" style={{ backgroundColor: `${GOLD}08`, borderTop: `1px solid ${GOLD}20` }}>
          <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>
            <span className="font-semibold" style={{ color: GOLD }}>Note: </span>{notes}
          </p>
        </div>
      )}
    </div>
  )
}

function KitItem({ item, notes }: { item: string; notes?: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5" style={{ borderBottom: `1px solid ${FOREST}10` }}>
      <span style={{ color: GOLD, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>✓</span>
      <div>
        <p className="text-sm font-semibold" style={{ color: FOREST }}>{item}</p>
        {notes && <p className="text-xs leading-relaxed mt-0.5" style={{ color: LEATHER }}>{notes}</p>}
      </div>
    </div>
  )
}

export default function HomemadeSuppliesPage() {
  return (
    <main style={{ backgroundColor: PARCH, minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8 flex items-center gap-2" style={{ color: `${FOREST}66` }}>
          <Link href="/homesteading" style={{ color: `${FOREST}66` }} className="hover:underline">Homesteading</Link>
          <span>›</span>
          <Link href="/homesteading/budget" style={{ color: `${FOREST}66` }} className="hover:underline">On a Budget</Link>
          <span>›</span>
          <span style={{ color: FOREST }}>Homemade Supplies</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Module 02</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: FOREST }}>
            Homemade Supplies
          </h1>

          <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
            <p>
              Walk through any cleaning products aisle and you'll find a different product for
              every single surface in your home. One for the toilet. One for the tub. One for
              glass. One for granite. One for stainless steel. Each one in a plastic bottle you
              throw away when it's empty, each one with a list of ingredients that reads like a
              chemistry exam. And you're paying a premium for all of it.
            </p>
            <p>
              Here's the reality: most of those products are doing the same basic job with the
              same basic chemistry, just packaged and marketed differently. Once you understand
              what actually does the cleaning — the acids, the surfactants, the abrasives — you
              can make versions of most of them yourself for pennies on the dollar.
            </p>
            <p>
              This section covers cleaning, garden and pest control, personal care, and two kits
              that every household should have but most don't think to build intentionally. All
              of the full recipes also live in the{' '}
              <Link href="/resources/cleaning-recipes" style={{ color: GOLD, textDecoration: 'underline' }}>
                DIY Recipes section of Resources
              </Link>{' '}
              if you want a quick-reference version without all the explanation.
            </p>
          </div>
        </div>

        <Divider />

        {/* CLEANING */}
        <SectionHeader label="Cleaning" title="What You're Really Paying For at the Store" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            When you buy a name-brand cleaner, you're paying for the formula, the marketing,
            the bottle, and the shelf space. The actual cleaning agents in most of them are
            inexpensive commodity chemicals. Vinegar is acetic acid. Baking soda is sodium
            bicarbonate. Castile soap is a plant-based surfactant. That's it. That's most of
            what's in there.
          </p>
          <p>
            The six recipes below cover the vast majority of what a household actually needs.
            I've included cost-per-ounce comparisons so you can see exactly what you're saving.
          </p>
        </div>

        <RecipeCard
          title="All-Purpose Kitchen Spray"
          yield="~16 fl oz"
          costPerOz="$0.03"
          commercial="$0.27"
          ingredients={[
            '1 cup distilled water',
            '¼ cup white vinegar (standard 5%)',
            '¼ cup rubbing alcohol (70%)',
            '15 drops tea tree essential oil',
            '10 drops lemon or orange essential oil',
          ]}
          instructions={[
            'Combine all ingredients in a 16oz spray bottle.',
            'Shake gently to combine. Label the bottle.',
            'Spray surfaces and wipe clean. No rinsing needed.',
          ]}
          notes="Uses standard 5% white vinegar — not the 45% horticultural vinegar, which is for the weed killer recipe. The alcohol is what gives this real disinfecting power."
        />

        <RecipeCard
          title="Glass & Mirror Cleaner"
          yield="~16 fl oz"
          costPerOz="$0.02"
          commercial="$0.24"
          ingredients={[
            '1 cup distilled water',
            '¼ cup white vinegar (5%)',
            '¼ cup rubbing alcohol (70%)',
          ]}
          instructions={[
            'Combine all three ingredients in a spray bottle.',
            'Shake to mix. Spray on glass or mirrors.',
            'Wipe with a microfiber cloth or crumpled newspaper for streak-free results.',
          ]}
          notes="The alcohol is what prevents streaking. If you're getting streaks, you may have hard water — try distilled water instead of tap."
        />

        <RecipeCard
          title="Shower, Tile & Grout Paste"
          yield="~6 oz paste (one treatment)"
          costPerOz="$0.18"
          commercial="$0.27"
          ingredients={[
            '½ cup baking soda',
            '¼ cup hydrogen peroxide (3%)',
          ]}
          instructions={[
            'Mix baking soda and hydrogen peroxide into a paste.',
            'Apply directly to tile, grout, or shower surfaces.',
            'Let sit 10-15 minutes, then scrub and rinse.',
          ]}
          notes="Make fresh each time — this one doesn't store well once mixed. The hydrogen peroxide activates against the baking soda on contact."
        />

        <RecipeCard
          title="Dish Soap"
          yield="~20 fl oz"
          costPerOz="$0.11"
          commercial="$0.25"
          ingredients={[
            '½ cup liquid Castile soap',
            '1 tbsp washing soda',
            '10 drops lemon essential oil',
            '5 drops orange essential oil',
            '1-2 tsp vegetable glycerin (optional — adds thickness)',
            'Distilled water to fill',
          ]}
          instructions={[
            'Add washing soda to a small amount of warm water and stir to dissolve.',
            'Combine with Castile soap in a 20oz bottle.',
            'Add essential oils and glycerin if using.',
            'Fill remaining space with distilled water. Shake gently.',
          ]}
          notes="Castile soap doesn't lather the way commercial dish soap does — that's normal. It still cleans effectively. If you want more lather, increase the Castile soap ratio slightly."
        />

        <RecipeCard
          title="Powdered Laundry Detergent"
          yield="~25 oz / ~35 loads"
          costPerOz="$0.26"
          commercial="$0.16"
          ingredients={[
            '1 cup borax',
            '1 cup washing soda',
            '½ cup baking soda',
            '1 bar Zote or Fels-Naptha soap, grated',
          ]}
          instructions={[
            'Grate the Zote or Fels-Naptha bar using a cheese grater. Smaller shreds dissolve better.',
            'Combine all dry ingredients in an airtight container.',
            'Mix thoroughly until evenly distributed.',
            'Use 1-2 tablespoons per load.',
          ]}
          notes="Use 1 tbsp for regular loads, 2 tbsp for heavily soiled. This is a low-suds formula — safe for HE machines. Zote is the better budget pick; Fels-Naptha is slightly more aggressive on grease stains."
        />

        <RecipeCard
          title="Liquid Laundry Detergent"
          yield="~5 gallons / ~200 loads"
          costPerOz="$0.01"
          commercial="$0.08"
          ingredients={[
            '1 bar Zote or Fels-Naptha soap, grated',
            '1 cup borax',
            '1 cup washing soda',
            '½ cup baking soda',
            '5 gallons hot water (divided)',
          ]}
          instructions={[
            'Melt grated soap in 4 cups of hot water on the stovetop over medium-low heat, stirring until fully dissolved.',
            'Fill a 5-gallon bucket halfway with hot water.',
            'Add melted soap mixture, borax, washing soda, and baking soda. Stir well.',
            'Fill bucket to the top with hot water and stir again.',
            'Cover and let cool overnight — it will gel. Stir before each use.',
            'Use ¼ to ½ cup per load.',
          ]}
          notes="The gel consistency after cooling is normal. If it's too thick, add more water and stir. The cost-per-load here is genuinely remarkable — a batch this size costs about $6-7 total."
        />

        <Divider />

        {/* GARDEN & OUTDOOR */}
        <SectionHeader label="Garden & Outdoor" title="Pest Control That Doesn't Cost the Earth — Literally" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Chemical pesticides work. I'm not going to pretend they don't. But they also kill
            beneficial insects alongside the pests, leave residue on food you're planning to eat,
            and cost money on an ongoing basis. The DIY alternatives below are effective against
            most common garden pests when applied correctly — and "applied correctly" is doing
            a lot of work in that sentence, so read the application notes before you spray
            anything.
          </p>
        </div>

        {/* Natural Weed Killer */}
        <RecipeCard
          title="Natural Weed Killer"
          yield="1 gallon"
          costPerOz="$0.08"
          commercial="$0.23"
          ingredients={[
            '½ gallon 45% horticultural vinegar',
            '¼ cup borax',
            '½ gallon water',
            '3-4 drops dish soap (surfactant to help it stick)',
          ]}
          instructions={[
            'Combine all ingredients in a 1-gallon sprayer.',
            'Shake to mix.',
            'Spray directly on weeds during the hottest part of the day for maximum effectiveness.',
            'Avoid spraying on windy days — this will kill any plant it contacts.',
          ]}
          notes="The 45% vinegar is critical — standard 5% white vinegar from the grocery store is not strong enough. This is non-selective, meaning it kills everything it touches. Keep it off your garden plants."
        />

        {/* Essential Oil Pest Spray */}
        <div className="my-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: FOREST }}>Essential Oil Pest Sprays</h3>

          <div className="space-y-4 text-base leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
            <p>
              Essential oils work as pest deterrents because of the aromatic compounds they contain —
              the same compounds that make them smell good to us are genuinely irritating or
              disorienting to many insects. Different oils target different pests, so knowing
              which one to reach for matters.
            </p>
          </div>

          {/* Oil targets table */}
          <div className="rounded-2xl overflow-hidden mb-6" style={{ border: `1px solid ${FOREST}18` }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: LEATHER }}>
                  {['Essential Oil', 'Targets'].map(col => (
                    <th key={col} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: PARCH }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { oil: 'Peppermint', targets: 'Ants, Aphids, Whiteflies, Beetles, Spiders' },
                  { oil: 'Cedarwood', targets: 'Slugs, Snails, Ants' },
                  { oil: 'Lemongrass', targets: 'Mosquitoes, Ticks' },
                  { oil: 'Lavender', targets: 'Moths, Fleas, Flies' },
                  { oil: 'Tea Tree', targets: 'Fungus, Mites, Mildew' },
                ].map((row, i) => (
                  <tr key={row.oil} style={{ backgroundColor: PARCH2, borderBottom: `1px solid ${FOREST}10` }}>
                    <td className="px-5 py-3 font-semibold" style={{ color: FOREST }}>{row.oil}</td>
                    <td className="px-5 py-3" style={{ color: LEATHER }}>{row.targets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <WarningCallout>
            <p className="font-bold mb-3" style={{ color: RED }}>⚠️ Three Things to Know Before You Spray</p>
            <div className="space-y-2">
              <p><span className="font-semibold" style={{ color: FOREST }}>The burn factor:</span> Essential oils are highly concentrated. Use too much and you'll burn your plant's leaves — the oil will break down the cell walls. Never exceed 1-2% dilution, which works out to about 20-40 drops per quart of water. When in doubt, use less.</p>
              <p><span className="font-semibold" style={{ color: FOREST }}>Reapply regularly:</span> Unlike chemical pesticides that leave a residue, essential oils evaporate. You need to reapply every 3-5 days and after every rain. If you're not doing that, don't expect results.</p>
              <p><span className="font-semibold" style={{ color: FOREST }}>Protect your pollinators:</span> Even though these are natural, they can still irritate bees and other beneficial insects. Spray in the early morning or evening when pollinators aren't active, and avoid spraying directly on flowers.</p>
            </div>
          </WarningCallout>
        </div>

        {/* Neem Oil Spray */}
        <RecipeCard
          title="Neem Oil Spray (Broad Spectrum)"
          yield="1 quart"
          ingredients={[
            '1 quart warm water (warm helps the oil emulsify)',
            '1-2 tsp pure cold-pressed neem oil',
            '½ tsp liquid Castile soap (essential — acts as the emulsifier)',
          ]}
          instructions={[
            'Mix warm water and Castile soap first.',
            'Slowly stir in the neem oil until fully combined.',
            'Transfer to a spray bottle and apply immediately.',
            'Spray the entire plant thoroughly, including the undersides of leaves.',
          ]}
          notes="Use within 8 hours of mixing — neem loses potency quickly once mixed with water. This is one of the most effective broad-spectrum natural pest controls available. Works on aphids, mites, whiteflies, and many fungal issues."
        />

        {/* Castile Soap Spray */}
        <RecipeCard
          title="Castile Soap Insecticidal Spray (Soft-Bodied Pests)"
          yield="1 quart"
          ingredients={[
            '1 quart water',
            '1 tsp liquid Castile soap (Dr. Bronner\'s Peppermint works great — the mint adds natural repellent)',
            '1 tsp vegetable oil (optional — helps it stick to leaves)',
          ]}
          instructions={[
            'Mix soap and water in a spray bottle. Shake gently — avoid creating too many suds.',
            'Add vegetable oil if using and shake again.',
            'Spray directly onto the pests. Target the undersides of leaves where most insects hide.',
          ]}
          notes="This is a contact killer — you have to actually hit the bugs for it to work. It's particularly effective on aphids, spider mites, whiteflies, and mealybugs. Not a preventative spray."
        />

        {/* Garlic Cayenne Spray */}
        <RecipeCard
          title="Garlic & Cayenne Spray (Larger Pests)"
          yield="1 quart"
          ingredients={[
            '2 bulbs garlic',
            '2 tbsp cayenne pepper (or 4-5 hot peppers, chopped)',
            '1 quart water',
            '½ tsp liquid soap (to help it stick)',
          ]}
          instructions={[
            'Blend garlic and peppers with the water until smooth.',
            'Let the mixture steep overnight — at least 12 hours — to maximize potency.',
            'Strain through cheesecloth or a fine mesh strainer into a spray bottle.',
            'Spray on the foliage of plants being targeted. Reapply after rain.',
          ]}
          notes="This one targets larger pests — grasshoppers, beetles, and even browsing animals like rabbits and deer. It makes your plants taste and smell offensive. Not harmful to the plant, just deeply unpleasant for whatever is trying to eat it."
        />

        <Divider />

        {/* PERSONAL CARE */}
        <SectionHeader label="Personal Care" title="What You're Putting on Your Body Matters Too" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Personal care is where a lot of people draw a line at DIY — and I get it. Cleaning
            your counters with homemade spray feels low-stakes. Washing your hair with something
            you made yourself feels different. But the reality is that the personal care industry
            is full of products with long ingredient lists that mostly exist to justify a price
            point, and the functional core of most of them is pretty simple.
          </p>
        </div>

        <RecipeCard
          title="Shampoo Base"
          yield="~8 fl oz"
          costPerOz="$0.13"
          commercial="$0.67"
          ingredients={[
            '¼ cup liquid Castile soap',
            '¼ cup distilled water',
            '½-1 tsp carrier oil (castor oil for thickness, coconut for moisture, grapeseed for lightweight)',
            '10-15 drops essential oil of choice (lavender, peppermint, or rosemary are all good)',
          ]}
          instructions={[
            'Combine all ingredients in a squeeze bottle or small pump bottle.',
            'Shake gently before each use.',
            'Apply a small amount — this doesn\'t lather like commercial shampoo, so use less than you think you need.',
          ]}
          notes="There's a 2-4 week adjustment period when switching from commercial shampoo. Your scalp has been trained to overproduce oil to compensate for the stripping effect of commercial formulas. Stick with it — it levels out."
        />

        <RecipeCard
          title="Body Wash"
          yield="~12 fl oz"
          costPerOz="$0.35"
          commercial="$0.45"
          ingredients={[
            '¾ cup liquid Castile soap',
            '¼-⅓ cup raw honey (natural humectant — draws moisture to skin)',
            '¼ cup carrier oil (coconut, olive, or sweet almond)',
            '~40 drops essential oil of choice',
          ]}
          instructions={[
            'Combine Castile soap and honey first and stir gently.',
            'Add carrier oil and essential oils.',
            'Transfer to a pump bottle. Shake before each use.',
          ]}
          notes="Raw honey is the most expensive ingredient here — it's what keeps this recipe closest to commercial pricing per ounce. You can reduce the honey if you want to bring the cost down, though you'll lose some of the moisturizing quality."
        />

        {/* Toothpaste */}
        <div className="rounded-2xl p-5 my-6" style={{ backgroundColor: PARCH2, border: `1.5px solid ${FOREST}20` }}>
          <h3 className="font-bold text-base mb-3" style={{ color: FOREST, fontFamily: 'Georgia, serif' }}>
            DIY Toothpaste
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: `${FOREST}cc` }}>
            Commercial toothpaste is mostly water, abrasive, and flavoring — with fluoride added
            for cavity prevention. This recipe covers the cleaning and whitening side well.
            Worth noting: this does not contain fluoride. If that's a consideration for your
            household, especially for children, keep that in mind.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Ingredients</p>
              <ul className="space-y-1.5">
                {[
                  '2 tbsp bentonite clay (detoxifies and polishes)',
                  '¼ cup softened coconut oil (antibacterial binder)',
                  '2 tsp baking soda (neutralizes acids, whitening)',
                  '½ tsp xylitol (improves taste, inhibits cavity bacteria)',
                  '15-20 drops peppermint essential oil',
                  'Optional: ¼ cup filtered water for creamier texture',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ color: FOREST }}>
                    <span style={{ color: GOLD }}>·</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Instructions</p>
              <ol className="space-y-2">
                {[
                  'Combine clay, baking soda, and xylitol in a glass bowl.',
                  'Add softened coconut oil and mix to a paste.',
                  'Stir in peppermint oil. Add water if you prefer a softer texture.',
                  'Store in a small glass jar. Use a small spoon or toothpick to dispense — avoid putting a wet toothbrush directly in the jar.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5" style={{ color: FOREST }}>
                    <span className="font-bold shrink-0" style={{ color: GOLD }}>{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="text-xs mt-4 leading-relaxed" style={{ color: LEATHER }}>
            <span className="font-semibold" style={{ color: GOLD }}>Note: </span>
            Don't use metal utensils with bentonite clay — it can reduce the clay's effectiveness. Glass or wood only.
          </p>
        </div>

        {/* Deodorant */}
        <div className="rounded-2xl p-5 my-6" style={{ backgroundColor: PARCH2, border: `1.5px solid ${FOREST}20` }}>
          <h3 className="font-bold text-base mb-3" style={{ color: FOREST, fontFamily: 'Georgia, serif' }}>
            DIY Deodorant (Two Versions)
          </h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
            One thing to know upfront: this is deodorant, not antiperspirant. It controls odor —
            it doesn't stop you from sweating, because sweating is something your body is supposed
            to do. If you're switching from an aluminum-based antiperspirant, expect a 1-2 week
            adjustment period where you may sweat more than usual while your body recalibrates.
            It levels out.
          </p>

          <div className="space-y-6">
            {/* Standard */}
            <div>
              <p className="font-semibold text-sm mb-3" style={{ color: GOLD }}>Standard Formula</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: `${FOREST}88` }}>Ingredients</p>
                  <ul className="space-y-1.5">
                    {[
                      '¼ cup baking soda',
                      '¼ cup arrowroot powder or cornstarch',
                      '4-6 tbsp virgin coconut oil',
                      '10-15 drops essential oil (tea tree + lavender is the powerhouse combo)',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2" style={{ color: FOREST }}>
                        <span style={{ color: GOLD }}>·</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: `${FOREST}88` }}>Instructions</p>
                  <ol className="space-y-2">
                    {[
                      'Whisk baking soda and arrowroot until no clumps remain.',
                      'Cut in coconut oil like pie crust if solid, or stir in if liquid.',
                      'Mix to a smooth paste. Add essential oils and stir vigorously.',
                      'Store in a small glass jar. Apply a pea-sized amount with fingertips.',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5" style={{ color: FOREST }}>
                        <span className="font-bold shrink-0" style={{ color: GOLD }}>{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${FOREST}15` }} className="pt-5">
              <p className="font-semibold text-sm mb-1" style={{ color: GOLD }}>Sensitive Skin Formula</p>
              <p className="text-xs mb-3" style={{ color: LEATHER }}>For those who find baking soda irritating — some people do, especially with frequent use.</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: `${FOREST}88` }}>Ingredients</p>
                  <ul className="space-y-1.5">
                    {[
                      '2 tbsp shea butter',
                      '3 tbsp coconut oil',
                      '2 tbsp magnesium hydroxide powder or kaolin clay',
                      '1 tbsp arrowroot powder',
                      '1 tsp beeswax pellets (optional — for firmer stick consistency)',
                      '10 drops cedarwood or bergamot essential oil',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2" style={{ color: FOREST }}>
                        <span style={{ color: GOLD }}>·</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: `${FOREST}88` }}>Instructions</p>
                  <ol className="space-y-2">
                    {[
                      'Melt shea butter, coconut oil, and beeswax in a double boiler.',
                      'Remove from heat. Whisk in magnesium and arrowroot until smooth.',
                      'Cool slightly, then stir in essential oils.',
                      'Pour into a deodorant tube or tin. Refrigerate 1 hour to set.',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5" style={{ color: FOREST }}>
                        <span className="font-bold shrink-0" style={{ color: GOLD }}>{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* FIRST AID KITS */}
        <SectionHeader label="First Aid" title="Two Kits Every Household Should Have Built" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Most people have a first aid kit that amounts to a box of old Band-Aids and a bottle
            of expired Tylenol shoved in a bathroom cabinet. That's not a first aid kit. A real
            first aid kit is something you've thought about in advance, assembled intentionally,
            and know how to use. And I'd argue that a homesteader specifically needs two of them —
            one for people and one for the house.
          </p>
          <p>
            Neither of these needs to cost a lot. Most of what's on the list you either already
            have or can pick up for a few dollars. The point is having it before you need it,
            not scrambling for it when something goes wrong.
          </p>
        </div>

        {/* Human First Aid Kit */}
        <div className="rounded-2xl overflow-hidden my-6" style={{ border: `1.5px solid ${FOREST}20` }}>
          <div className="px-6 py-4" style={{ backgroundColor: FOREST }}>
            <h3 className="font-bold text-base" style={{ color: PARCH, fontFamily: 'Georgia, serif' }}>
              🩺 Human First Aid Kit
            </h3>
          </div>
          <div className="px-6 py-4" style={{ backgroundColor: PARCH2 }}>
            <KitItem item="Rubbing Alcohol (70%)" notes="Wound cleaning, surface disinfection. The 70% concentration is more effective than 91% for killing bacteria — counterintuitive but true." />
            <KitItem item="Hydrogen Peroxide (3%)" notes="Wound cleaning, especially for deeper punctures. Don't use on healing wounds — it damages new tissue. Use once for initial cleaning." />
            <KitItem item="Neosporin or Triple Antibiotic Ointment" notes="Standard wound care. Apply after cleaning and before bandaging." />
            <KitItem item="Witch Hazel" notes="Natural astringent. Good for minor cuts, insect bites, bruising, and skin irritation. Lasts indefinitely." />
            <KitItem item="Calamine Lotion" notes="Poison ivy, poison oak, insect bites, chicken pox. If you're homesteading outdoors, this earns its spot." />
            <KitItem item="Castor Oil" notes="Draws out splinters and minor infections when applied and covered overnight. Old remedy that works." />
            <KitItem item="Activated Charcoal" notes="For suspected poisoning or stomach upset from bad food. Keep this in the kit and know when to use it vs. when to call 911." />
            <KitItem item="Arnica Cream or Gel" notes="Bruising, muscle soreness, swelling from impact injuries. One of the more effective natural topicals." />
            <KitItem item="Epsom Salt" notes="Drawing out splinters and deep infections, reducing inflammation. Soak affected area in warm Epsom salt water." />
            <KitItem item="Medical Grade / Manuka Honey" notes="Antimicrobial wound dressing for burns and difficult-to-heal wounds. Keeps the wound moist, fights infection, and doesn't stick when you remove the dressing." />
            <KitItem item="Tea Tree Essential Oil" notes="Antiseptic, antifungal. Dilute before applying to skin — a few drops in a carrier oil for topical use." />
            <KitItem item="Lavender Essential Oil" notes="Burn relief, minor wound care, calming. One of the few essential oils gentle enough to apply without dilution in small amounts." />
            <KitItem item="Gauze Pads (assorted sizes)" notes="Wound coverage and dressing." />
            <KitItem item="Medical Tape and Wrap" notes="Securing gauze, wrapping sprains. Cohesive bandage wrap (like Coban) sticks to itself without adhesive." />
            <KitItem item="Lamb's Ear Plant (Stachys byzantina)" notes="Grow this one. The leaves are soft, naturally antibacterial, and have been used as emergency bandages for centuries. If you've got it in your garden, you've got a natural wound covering that actually works." />
            <KitItem item="Aloe Vera Plant (live)" notes="Burns, sunburn, minor skin irritation. The gel from a fresh-cut leaf is superior to anything in a bottle. Keep one growing on your windowsill." />
          </div>
        </div>

        <Callout>
          <p style={{ color: `${FOREST}cc` }}>
            The lamb's ear and aloe vera are worth growing specifically for first aid purposes —
            both are low-maintenance, both are genuinely useful, and having a live plant means
            you always have a fresh supply without worrying about expiration dates. They also tie
            directly into the herb and food production sections of this guide.
          </p>
        </Callout>

        {/* Household Kit */}
        <div className="rounded-2xl overflow-hidden my-6" style={{ border: `1.5px solid ${FOREST}20` }}>
          <div className="px-6 py-4" style={{ backgroundColor: FOREST }}>
            <h3 className="font-bold text-base" style={{ color: PARCH, fontFamily: 'Georgia, serif' }}>
              🔧 Household Temporary Fix Kit
            </h3>
            <p className="text-xs mt-1" style={{ color: `${PARCH}77` }}>
              Things break. Sometimes at midnight. This kit means you can stop the bleeding until you can fix it properly.
            </p>
          </div>
          <div className="px-6 py-4" style={{ backgroundColor: PARCH2 }}>
            <KitItem item="Duct Tape" notes="The universal fix. Holds things together temporarily longer than it has any right to." />
            <KitItem item="Flex Seal Spray" notes="Rubberized spray coating that seals cracks, gaps, and small leaks on roofs, gutters, pipes, and more. The red can. Dries waterproof." />
            <KitItem item="Flex Tape" notes="Heavy-duty waterproof tape. Patches leaks and holes that need something physical to hold — where Flex Seal spray isn't enough." />
            <KitItem item="Silicone Tape (Self-Fusing)" notes="Wraps around pipe joints and fittings to stop leaks. Fuses to itself with no adhesive, so it's waterproof and removable." />
            <KitItem item="Plumber's Teflon Tape" notes="Wrap threaded pipe connections to stop slow leaks at joints. Every homeowner needs this." />
            <KitItem item="Electrical Tape" notes="Temporary wire insulation, splices, and minor electrical fixes. Not a permanent solution but buys you time." />
            <KitItem item="Wire Nuts (assorted)" notes="Connecting or capping electrical wires safely. Keep a variety pack — different sizes for different wire gauges." />
            <KitItem item="Expanding Foam Spray (Right Stuff or Great Stuff)" notes="Seals gaps, cracks, and drafts around windows, pipes, and foundations. Expands to fill irregular shapes." />
            <KitItem item="Silicone Caulk" notes="Waterproof sealing around sinks, tubs, windows, and exterior gaps. Paintable versions available." />
            <KitItem item="Silicone Adhesive" notes="Bonds almost anything — glass, metal, ceramic, rubber. Waterproof. Stays flexible after curing." />
            <KitItem item="JB Weld" notes="Two-part epoxy that bonds metal to metal with remarkable strength. For repairs where you need structural hold, not just sealing." />
            <KitItem item="Screen Patches or Roll of Screen" notes="Window and door screens tear. Having a roll of screen mesh and some patch adhesive means a 5-minute fix instead of a replacement." />
            <KitItem item="Wire (assorted gauge)" notes="Temporary structural fixes, lashing things together, holding things in place. Galvanized fence wire is endlessly useful." />
            <KitItem item="Rope" notes="Keep at least 50ft of quality rope on hand. Paracord for light duty, manila or braided nylon for real work." />
            <KitItem item="Chain (short length)" notes="Towing, securing, hanging weight. A few feet of medium-gauge chain covers most situations." />
            <KitItem item="Assorted Common Nails" notes="Keep a small assortment — 16d framing nails, 8d common, and a box of finish nails cover 90% of what comes up." />
            <KitItem item="Assorted Common Screws" notes="1¼-inch and 3-inch coarse-thread deck screws handle most structural needs. Add a box of fine-thread drywall screws." />
            <KitItem item="Shims (assorted wood)" notes="Leveling appliances, shimming doors and windows, filling gaps. Cedar shims are cheap and widely available." />
          </div>
        </div>

        <Divider />

        {/* Cost comparison callout */}
        <Callout icon="💰">
          <p className="font-semibold mb-2" style={{ color: FOREST }}>The Ingredient Sourcing Advantage</p>
          <p style={{ color: `${FOREST}cc` }}>
            The biggest cost savings in homemade supplies come from buying key ingredients in
            bulk — washing soda, baking soda, Castile soap, borax, and essential oils are all
            dramatically cheaper per ounce when purchased in larger quantities. The affiliate
            links throughout this section are curated for the best price-per-ounce we've found,
            from sources that are consistent in quality. Once you have the base ingredients,
            most of these recipes cost pennies per batch.
          </p>
        </Callout>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 flex items-center justify-between text-sm" style={{ borderTop: `1px solid ${FOREST}20` }}>
          <Link href="/homesteading/budget/tools" className="flex items-center gap-2 font-medium" style={{ color: FOREST }}>
            ← Tools
          </Link>
          <Link
            href="/homesteading/budget/food-production"
            className="flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: FOREST, color: PARCH }}
          >
            Next: Food Production →
          </Link>
        </div>

      </div>
    </main>
  )
}
