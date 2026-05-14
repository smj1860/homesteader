// src/app/homesteading/budget/food-make-dont-buy/page.tsx

import Link from 'next/link'

const FOREST  = '#264228'
const GOLD    = '#A88032'
const PARCH   = '#F7F3EB'
const PARCH2  = '#EDE8DE'
const LEATHER = '#7C4B2A'
const GREEN   = '#2D7A4F'
const RED     = '#8B2E2E'

export const metadata = {
  title: "Food: Make Don't Buy — Homesteading on a Budget | SteadCraft",
  description: 'Bread, pasta, fermented foods, sauces, stocks, and dressings — what to make yourself, why it matters, and what it actually costs.',
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

function RecipeCard({
  title, yield: yieldAmt, costPerBatch, storeCost, ingredients, instructions, notes, affiliate,
}: {
  title: string
  yield?: string
  costPerBatch?: string
  storeCost?: string
  ingredients: string[]
  instructions: string[]
  notes?: string
  affiliate?: string
}) {
  return (
    <div className="rounded-2xl overflow-hidden my-5" style={{ border: `1.5px solid ${FOREST}20` }}>
      <div className="px-6 py-4" style={{ backgroundColor: FOREST }}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <h3 className="font-bold text-base" style={{ color: PARCH, fontFamily: 'Georgia, serif' }}>{title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {costPerBatch && (
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: `${GREEN}30`, color: '#7AE0A0' }}>
                ~{costPerBatch} homemade
              </span>
            )}
            {storeCost && (
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: `${RED}25`, color: '#F4A0A0' }}>
                {storeCost} store
              </span>
            )}
          </div>
        </div>
        {yieldAmt && <p className="text-xs mt-1" style={{ color: `${PARCH}66` }}>Yield: {yieldAmt}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-0" style={{ backgroundColor: PARCH2 }}>
        <div className="p-5" style={{ borderRight: `1px solid ${FOREST}10` }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GOLD }}>Ingredients</p>
          <ul className="space-y-1.5">
            {ingredients.map((ing, i) => (
              <li key={i} className="text-sm flex items-start gap-2" style={{ color: FOREST }}>
                <span style={{ color: GOLD, marginTop: 2, flexShrink: 0 }}>·</span> {ing}
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

      {(notes || affiliate) && (
        <div className="px-6 py-3 space-y-1.5" style={{ backgroundColor: `${GOLD}08`, borderTop: `1px solid ${GOLD}20` }}>
          {notes && (
            <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>
              <span className="font-semibold" style={{ color: GOLD }}>Note: </span>{notes}
            </p>
          )}
          {affiliate && (
            <p className="text-xs" style={{ color: `${FOREST}66`, fontStyle: 'italic' }}>{affiliate}</p>
          )}
        </div>
      )}
    </div>
  )
}

function CostTable({ rows }: {
  rows: { item: string; homemade: string; store: string; savings: string }[]
}) {
  return (
    <div className="rounded-2xl overflow-hidden my-6" style={{ border: `1px solid ${FOREST}18` }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: LEATHER }}>
            {['Item', 'Homemade Cost', 'Store Price', 'Savings'].map(col => (
              <th key={col} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: PARCH }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ backgroundColor: PARCH2, borderBottom: `1px solid ${FOREST}10` }}>
              <td className="px-4 py-3 font-semibold text-sm" style={{ color: FOREST }}>{row.item}</td>
              <td className="px-4 py-3 text-sm font-semibold" style={{ color: GREEN }}>{row.homemade}</td>
              <td className="px-4 py-3 text-sm" style={{ color: LEATHER }}>{row.store}</td>
              <td className="px-4 py-3 text-sm font-bold" style={{ color: GOLD }}>{row.savings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function FoodMakeDontBuyPage() {
  return (
    <main style={{ backgroundColor: PARCH, minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8 flex items-center gap-2" style={{ color: `${FOREST}66` }}>
          <Link href="/homesteading" style={{ color: `${FOREST}66` }} className="hover:underline">Homesteading</Link>
          <span>›</span>
          <Link href="/homesteading/budget" style={{ color: `${FOREST}66` }} className="hover:underline">On a Budget</Link>
          <span>›</span>
          <span style={{ color: FOREST }}>Food: Make Don't Buy</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Module 04</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: FOREST }}>
            Food: Make Don't Buy
          </h1>

          <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
            <p>
              There's a straightforward financial argument for making food yourself instead of buying
              it — the homemade version almost always costs less, often dramatically less. A loaf of
              artisan bread at the grocery store runs $6-10. Made at home, the same loaf costs under
              a dollar in ingredients. A quart of sauerkraut goes for $6-8 at the store. Make it
              yourself and you're looking at the cost of one head of cabbage and a little salt.
            </p>
            <p>
              But here's the part the price tag doesn't show you: the store-bought version has things
              in it that the homemade version doesn't. Commercial bread often contains azodicarbonamide
              — the same compound used in yoga mats — added to improve texture and shelf life.
              Ketchup is sweetened with high fructose corn syrup. Packaged dressings and sauces are
              full of artificial dyes, chemical preservatives, and stabilizers with names nobody
              can pronounce. None of that is in your kitchen when you make it yourself.
            </p>
            <p>
              I'm not here to tell you that you need to make everything from scratch every day of
              your life. That's not realistic for most people and I know it. But picking even three
              or four items off this list and making them yourself consistently will put real money
              back in your pocket and real food on your table.
            </p>
          </div>

          {/* Health callout */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { title: 'No preservatives', desc: 'Homemade food goes bad faster — because it has no artificial preservatives keeping it alive on a shelf for months.' },
              { title: 'No artificial dyes', desc: 'The color in commercial ranch dressing, ketchup, and barbecue sauce often comes from dyes rather than actual ingredients.' },
              { title: 'No mystery compounds', desc: 'You know everything that went into it because you put it there. That alone is worth something.' },
            ].map(item => (
              <div key={item.title} className="rounded-2xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${GREEN}25` }}>
                <p className="font-bold text-xs mb-1.5" style={{ color: GREEN }}>✓ {item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── BREADS ─────────────────────────────────────────────────── */}
        <SectionHeader label="Breads" title="Start Here — Seriously" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Bread is the single best entry point for making food yourself. Three ingredients —
            flour, yeast, salt — plus water, and you've made something that costs under a dollar
            and tastes better than most of what you'll find on a store shelf. If you've never
            made bread before, start with this recipe. It's the one I keep coming back to.
          </p>
        </div>

        {/* 3-Ingredient Bread */}
        <div className="rounded-2xl overflow-hidden my-5" style={{ border: `1.5px solid ${FOREST}20` }}>
          <div className="px-6 py-4" style={{ backgroundColor: FOREST }}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-bold text-base" style={{ color: PARCH, fontFamily: 'Georgia, serif' }}>
                  The 3-Ingredient Bread
                </h3>
                <p className="text-xs mt-1" style={{ color: `${PARCH}66` }}>Yield: 1 loaf</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: `${GREEN}30`, color: '#7AE0A0' }}>~$0.75 homemade</span>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ backgroundColor: `${RED}25`, color: '#F4A0A0' }}>$6-10 store</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0" style={{ backgroundColor: PARCH2 }}>
            <div className="p-5" style={{ borderRight: `1px solid ${FOREST}10` }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GOLD }}>Ingredients</p>
              <ul className="space-y-1.5 mb-4">
                {[
                  '3 cups all-purpose flour',
                  '2¼ tsp instant yeast (1 standard packet)',
                  '1 tsp salt',
                  '1¼ cups warm water (~105°F)',
                ].map((ing, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: FOREST }}>
                    <span style={{ color: GOLD, marginTop: 2, flexShrink: 0 }}>·</span> {ing}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl p-3" style={{ backgroundColor: `${GOLD}12`, border: `1px solid ${GOLD}25` }}>
                <p className="text-xs font-semibold mb-1" style={{ color: GOLD }}>Temperature matters</p>
                <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>
                  105°F is the sweet spot for yeast. Too cold and the yeast won't activate.
                  Too hot and you'll kill it. If you don't have a thermometer, it should feel
                  warm on your wrist — like bath water, not hot water.
                </p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GOLD }}>Instructions</p>
              <ol className="space-y-3">
                {[
                  'Add salt and yeast to a large bowl. Pour the warm water directly on top.',
                  'Add all the flour at once. Mix with a dough whisk, wooden spoon, spatula, or your hands until everything comes together. The dough will be sticky — that\'s correct. Don\'t be tempted to add more flour.',
                  'Cover the bowl with a clean towel or plastic wrap and let it rise at room temperature for 2-3 hours until roughly doubled in size.',
                  'Turn the dough out, shape it however you want — a round boule, an oval, a rough rectangle for sandwich slices. Place on parchment paper and let it rest 30 minutes.',
                  'While the dough rests, place your baking stone, pizza stone, or cast iron skillet in the oven and preheat to 450°F. Getting the surface hot before the dough goes on is what gives you the crust.',
                  'Carefully transfer the dough (on the parchment) onto the hot surface. Bake until the top is deep golden brown and sounds hollow when you tap it — usually 25-30 minutes.',
                ].map((step, i) => (
                  <li key={i} className="text-sm flex items-start gap-2.5" style={{ color: FOREST }}>
                    <span className="shrink-0 font-bold" style={{ color: GOLD }}>{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="px-6 py-3" style={{ backgroundColor: `${GOLD}08`, borderTop: `1px solid ${GOLD}20` }}>
            <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>
              <span className="font-semibold" style={{ color: GOLD }}>Note: </span>
              A dough whisk makes mixing significantly easier and cleaner. The sticky dough releases from it in a way it won't from a wooden spoon.
              {' '}[AFFILIATE: Dough whisk]
            </p>
          </div>
        </div>

        <div className="space-y-4 text-base leading-relaxed my-6" style={{ color: `${FOREST}cc` }}>
          <h3 className="text-lg font-bold" style={{ color: FOREST }}>Basic Sourdough</h3>
          <p>
            Sourdough is the long game of bread baking — and the most budget-friendly once you've
            got an active starter going, because the starter replaces the commercial yeast entirely.
            You're using wild yeast you captured yourself, fed with nothing but flour and water,
            to leaven bread indefinitely. The startup cost is effectively zero.
          </p>
          <p>
            <strong style={{ color: FOREST }}>Starting a starter:</strong> Combine equal parts (by weight) whole wheat or rye flour and water in a jar. Stir well, loosely cover, and leave at room temperature. Every 24 hours, discard half and feed with equal parts fresh flour and water. In 5-7 days you'll have a bubbly, active starter that's ready to bake with. It will smell sour and slightly funky — that's exactly what you want.
          </p>
          <p>
            <strong style={{ color: FOREST }}>Maintaining it:</strong> If you bake regularly (weekly), keep your starter on the counter and feed it daily. If you bake less often, store it in the refrigerator and feed it once a week. Before baking, take it out 4-8 hours ahead and feed it to wake it up. A healthy starter that's properly maintained will last indefinitely — I've talked to folks who have starters that are decades old.
          </p>
          <p>
            <strong style={{ color: FOREST }}>The no-knead sourdough method:</strong> Mix 450g bread flour, 325g water, 100g active starter, and 9g salt. Stretch and fold the dough 4 times over 4 hours (30-minute intervals, not kneading). Shape, refrigerate overnight, then bake in a Dutch oven at 500°F — lid on for 20 minutes, lid off for 20 more. The Dutch oven traps steam which is what gives sourdough its signature chewy interior and crackly crust.
          </p>
        </div>

        {/* Sandwich Bread */}
        <RecipeCard
          title="Sandwich Bread"
          yield="1 standard loaf"
          costPerBatch="$0.90"
          storeCost="$3-5"
          ingredients={[
            '3 cups all-purpose flour',
            '2¼ tsp instant yeast',
            '1 tsp salt',
            '1 tbsp sugar',
            '1 tbsp butter or oil',
            '1 cup warm milk or water',
          ]}
          instructions={[
            'Combine flour, yeast, salt, and sugar in a large bowl.',
            'Add butter and warm liquid. Mix until a soft dough forms.',
            'Knead 8-10 minutes until smooth and elastic, or 5 minutes with a stand mixer.',
            'Cover and rise until doubled — about 1 hour.',
            'Punch down, shape into a log, place in a greased loaf pan.',
            'Rise again 30-45 minutes until dough crowns above the pan.',
            'Bake at 375°F for 25-30 minutes until golden and hollow-sounding when tapped.',
          ]}
          notes="The sugar and fat are what differentiate this from the 3-ingredient loaf — they tenderize the crumb and give you that soft sandwich bread texture. Brush the top with butter right out of the oven for a softer crust."
        />

        {/* Flatbreads */}
        <div className="my-5 space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <h3 className="text-lg font-bold" style={{ color: FOREST }}>Flatbreads — Tortillas, Pita, Naan</h3>
          <p>
            Flatbreads are the most accessible thing on this list. Flour tortillas are two
            ingredients and fifteen minutes. Pita and naan take a little longer but not much.
            Store-bought flour tortillas run $3-5 for a pack of eight. A batch of homemade
            tortillas costs under fifty cents and tastes noticeably better.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 my-4">
          {[
            {
              name: 'Flour Tortillas',
              cost: '~$0.40 / 8 tortillas',
              store: '$3-5 / 8 store',
              recipe: '2 cups flour · 1 tsp salt · ½ tsp baking powder · ¾ cup warm water · 3 tbsp lard or oil — Mix, rest 30 min, divide into 8 balls, roll thin, cook dry skillet 60 sec per side on high heat.',
            },
            {
              name: 'Pita',
              cost: '~$0.60 / 6 pitas',
              store: '$3-4 / 6 store',
              recipe: '2 cups flour · 2¼ tsp yeast · 1 tsp salt · ¾ cup warm water · 1 tsp olive oil — Mix, rise 1 hour, divide, roll ¼ inch thick, bake at 475°F on hot stone 3-4 min until puffed.',
            },
            {
              name: 'Naan',
              cost: '~$0.75 / 4 pieces',
              store: '$4-5 / 4 store',
              recipe: '2 cups flour · 1 tsp yeast · 1 tsp salt · ½ tsp sugar · ½ cup warm water · ¼ cup plain yogurt — Mix, rise 1 hour, roll thick, cook in very hot cast iron with butter. Brush with garlic butter.',
            },
          ].map(fb => (
            <div key={fb.name} className="rounded-2xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
              <p className="font-bold text-sm mb-1.5" style={{ color: FOREST }}>{fb.name}</p>
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${GREEN}18`, color: GREEN }}>{fb.cost}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${RED}12`, color: RED }}>{fb.store}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>{fb.recipe}</p>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── PASTA ─────────────────────────────────────────────────── */}
        <SectionHeader label="Pasta" title="Two Ingredients. That's It." />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Fresh pasta is two ingredients — flour and eggs — and it's dramatically better
            than anything in a box. The dried pasta at the grocery store is fine for a weeknight,
            but if you've eaten fresh pasta you know it's not the same food. The texture is
            different, the way it holds sauce is different, the flavor is different. And it costs
            about fifty cents a pound to make versus five to eight dollars for the same thing
            packaged as "fresh pasta" at the store.
          </p>
          <p>
            The tool that changes the game here is a pasta roller attachment for a stand mixer.
            Rolling pasta by hand is doable but tedious. The attachment does it in minutes and
            cuts it evenly. If you have a stand mixer and you're making pasta with any regularity,
            it pays for itself fast.
          </p>
        </div>

        <Callout icon="🍝">
          <p className="font-semibold mb-1" style={{ color: FOREST }}>KitchenAid Pasta Roller & Cutter Attachment (3-Piece Set)</p>
          <p style={{ color: `${FOREST}cc` }}>
            The attachment we use and recommend — rolls sheets and cuts fettuccine and spaghetti.
            At $49.99 it's the kind of tool that sounds like a splurge but becomes one of the
            most-used things in the kitchen. If you already own a KitchenAid, this is a straightforward add.
          </p>
          <a
            href="https://amzn.to/3P2Hb1X"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 rounded-lg text-xs font-bold"
            style={{ backgroundColor: FOREST, color: PARCH }}
          >
            View Pasta Attachment — $49.99 →
          </a>
        </Callout>

        <RecipeCard
          title="Basic Egg Pasta"
          yield="~1 lb fresh pasta (serves 3-4)"
          costPerBatch="$0.50/lb"
          storeCost="$5-8/lb fresh"
          ingredients={[
            '2 cups (250g) all-purpose or 00 flour',
            '2 large eggs',
            '1 tbsp olive oil (optional — adds richness)',
            'Pinch of salt',
          ]}
          instructions={[
            'Mound flour on a clean surface or in a large bowl. Make a well in the center.',
            'Crack eggs into the well. Add oil if using. Beat eggs with a fork, gradually incorporating flour from the inner wall of the well.',
            'Once the dough comes together, knead by hand 8-10 minutes until smooth and elastic. It should feel like Play-Doh. Cover with plastic wrap and rest 30 minutes.',
            'Divide dough into 4 pieces. Roll each piece through a pasta roller starting at the widest setting, folding and re-rolling 2-3 times before progressing through settings.',
            'Cut into desired shape. Cook immediately in well-salted boiling water for 2-3 minutes — fresh pasta cooks much faster than dried.',
          ]}
          notes="Fresh pasta freezes well. Flour the cut pasta lightly, form into nests, freeze on a sheet pan, then transfer to bags. Cook from frozen — just add a minute or two to the cook time."
        />

        <Divider />

        {/* ── FERMENTED FOODS ─────────────────────────────────────── */}
        <SectionHeader label="Fermented Foods" title="The Cheapest Preservation Method There Is" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Fermentation is the original food preservation — people were doing it long before
            refrigerators, canning, or freezing existed. It's also one of the cheapest things
            on this entire list because the main ingredients are often just vegetables and salt,
            and the process is powered by wild bacteria that do the work for free.
          </p>
          <p>
            The other thing fermentation has going for it that other preservation methods don't
            is that it actually improves the nutritional profile of the food. Fermented vegetables
            contain live cultures — probiotics — that support gut health. The store-bought versions
            of most fermented foods are heat-pasteurized after fermentation, which kills those
            cultures. Homemade is genuinely better in this case, not just cheaper.
          </p>
        </div>

        <RecipeCard
          title="Sauerkraut"
          yield="1 quart"
          costPerBatch="~$0.50"
          storeCost="$6-8/quart"
          ingredients={[
            '1 medium head green cabbage (~2 lbs)',
            '1 tbsp non-iodized salt (kosher or sea salt — iodized salt inhibits fermentation)',
          ]}
          instructions={[
            'Remove outer leaves. Quarter and core the cabbage, then slice very thin.',
            'Place cabbage in a large bowl. Add salt and massage firmly for 5-10 minutes until significant liquid releases.',
            'Pack tightly into a clean quart mason jar, pressing down so the cabbage is submerged under its own liquid.',
            'If needed, add a small amount of salted water to ensure cabbage stays submerged. Weigh it down with a smaller jar or a zip-lock bag filled with water.',
            'Cover loosely (not airtight) with a cloth or loose lid. Ferment at room temperature away from direct sunlight.',
            'Taste starting at day 5. It\'s ready when it tastes pleasantly sour to you — anywhere from 1-4 weeks. Refrigerate when done.',
          ]}
          notes="Bubbles forming are normal and good — that's the fermentation working. If you see mold on the surface, skim it off and make sure the cabbage is fully submerged. Pink or fuzzy mold means discard and start over. White kahm yeast on the surface is harmless."
          affiliate="[AFFILIATE: Fermentation weights and mason jar lids]"
        />

        <RecipeCard
          title="Fridge Pickles (Quick)"
          yield="1 quart"
          costPerBatch="~$0.40"
          storeCost="$3-5/quart"
          ingredients={[
            '4-5 small cucumbers, sliced',
            '1 cup white or apple cider vinegar',
            '1 cup water',
            '1 tbsp salt',
            '1 tsp sugar (optional)',
            '2 cloves garlic, smashed',
            'Dill, peppercorns, red pepper flakes to taste',
          ]}
          instructions={[
            'Pack cucumbers and aromatics into a clean quart jar.',
            'Combine vinegar, water, salt, and sugar in a saucepan. Heat to dissolve — don\'t boil.',
            'Pour hot brine over cucumbers. Let cool to room temperature.',
            'Refrigerate at least 24 hours before eating. Best after 48-72 hours.',
          ]}
          notes="Fridge pickles are not shelf-stable — keep refrigerated and use within 2-3 weeks. For shelf-stable pickles, process filled jars in a water bath canner for 10 minutes."
        />

        <div className="rounded-2xl p-5 my-5" style={{ backgroundColor: PARCH2, border: `1.5px solid ${FOREST}20` }}>
          <h3 className="font-bold text-base mb-3" style={{ color: FOREST, fontFamily: 'Georgia, serif' }}>Kombucha</h3>
          <p className="text-sm leading-relaxed mb-3" style={{ color: `${FOREST}cc` }}>
            Kombucha is fermented sweet tea driven by a SCOBY — a symbiotic culture of bacteria
            and yeast. Store-bought kombucha runs $3-5 per bottle. A gallon of homemade kombucha
            costs about $0.50 in tea and sugar, and once you have a SCOBY going it produces
            indefinitely. The SCOBY grows with each batch and can be divided and given away.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>You Need</p>
              <ul className="space-y-1.5">
                {[
                  '1 gallon brewed black or green tea, cooled',
                  '1 cup white sugar',
                  '1 SCOBY + 1-2 cups starter liquid (from previous batch or purchased)',
                  'A glass gallon jar',
                  'Cloth cover and rubber band',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ color: FOREST }}>
                    <span style={{ color: GOLD }}>·</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Process</p>
              <ol className="space-y-2">
                {[
                  'Dissolve sugar in hot tea. Cool completely — never add SCOBY to hot liquid.',
                  'Add starter liquid and SCOBY to the jar. Pour in cooled sweet tea.',
                  'Cover with cloth, secure with rubber band. Ferment at room temp 7-14 days.',
                  'Taste at day 7. When it\'s pleasantly tart, bottle and refrigerate, or do a second ferment with fruit for carbonation.',
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

        <Divider />

        {/* ── SAUCES & CONDIMENTS ────────────────────────────────── */}
        <SectionHeader label="Sauces & Condiments" title="What You're Actually Paying For in a Bottle" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Condiments and sauces have some of the highest markups of anything in a grocery store.
            You're paying for the bottle, the label, the shelf space, and the high fructose corn syrup
            holding it all together. The homemade versions cost a fraction of the price, contain
            none of the additives, and in almost every case taste noticeably better.
          </p>
        </div>

        <RecipeCard
          title="Garden Tomato Sauce"
          yield="~4 quarts"
          costPerBatch="$1-2 from garden"
          storeCost="$12-20 for 4 quarts"
          ingredients={[
            '10-12 lbs ripe tomatoes (any variety)',
            '1 large onion, diced',
            '6-8 garlic cloves, minced',
            '¼ cup olive oil',
            'Fresh basil, oregano to taste',
            'Salt and pepper',
            '1 tsp sugar (balances acidity)',
          ]}
          instructions={[
            'Score an X in the bottom of each tomato. Blanch in boiling water 60 seconds, then ice bath. Peel, core, and roughly chop.',
            'Sauté onion in olive oil until soft. Add garlic and cook 2 minutes.',
            'Add tomatoes and herbs. Simmer uncovered 45-60 minutes until thickened to your liking.',
            'Blend partially or fully with an immersion blender. Season with salt, pepper, and sugar.',
            'Use immediately, refrigerate up to a week, freeze in quart bags, or water bath can for shelf stability.',
          ]}
          notes="From the garden, a 10x10 bed of tomatoes can produce 50-100 lbs in a season. That's 20-40 quarts of sauce — enough to never buy canned tomatoes for a year."
        />

        <RecipeCard
          title="Mayonnaise"
          yield="~1 cup"
          costPerBatch="$0.60"
          storeCost="$4-6/jar"
          ingredients={[
            '2 egg yolks (room temperature)',
            '1 tbsp lemon juice or white vinegar',
            '1 tsp Dijon mustard',
            '1 cup neutral oil (avocado, light olive, or vegetable)',
            'Salt to taste',
          ]}
          instructions={[
            'Place egg yolks, lemon juice, and Dijon in a bowl or immersion blender cup. Mix to combine.',
            'Add oil drop by drop at first while whisking constantly (or running the immersion blender). This is what creates the emulsion.',
            'Once it begins to thicken and emulsify, add remaining oil in a thin, steady stream.',
            'Season with salt. Refrigerate immediately. Use within 1 week.',
          ]}
          notes="The immersion blender method is nearly foolproof — add all ingredients to a tall cup, place the blender at the bottom, blend without moving for 15-20 seconds, then slowly pull it up. Done in under a minute."
        />

        <RecipeCard
          title="Ketchup"
          yield="~2 cups"
          costPerBatch="$0.50"
          storeCost="$3-4/bottle"
          ingredients={[
            '1 can (28oz) crushed tomatoes or 2 lbs fresh',
            '¼ cup apple cider vinegar',
            '3 tbsp brown sugar (or maple syrup)',
            '½ tsp onion powder',
            '¼ tsp garlic powder',
            '¼ tsp allspice',
            '¼ tsp cloves',
            'Salt to taste',
          ]}
          instructions={[
            'Combine all ingredients in a saucepan over medium heat.',
            'Simmer 30-45 minutes, stirring occasionally, until reduced and thickened.',
            'Blend smooth with an immersion blender.',
            'Taste and adjust — more vinegar for tang, more sugar for sweetness.',
            'Refrigerate up to 3 weeks or process in water bath canner for shelf stability.',
          ]}
          notes="Commercial ketchup uses high fructose corn syrup. This version uses real sugar or maple syrup and tastes cleaner for it. It won't be as artificially bright red — that's normal."
        />

        <RecipeCard
          title="Hot Sauce"
          yield="~2 cups"
          costPerBatch="$1-2 from garden"
          storeCost="$4-6/bottle"
          ingredients={[
            '1 lb hot peppers (any variety — jalapeño, cayenne, habanero, or a mix)',
            '4-6 garlic cloves',
            '½ cup white vinegar',
            '1 tsp salt',
          ]}
          instructions={[
            'Roughly chop peppers and garlic. For less heat, remove seeds.',
            'Combine all ingredients in a saucepan. Bring to a boil, reduce heat, simmer 15 minutes until peppers are soft.',
            'Cool slightly, then blend completely smooth.',
            'Strain through fine mesh for a smoother sauce or leave it chunky.',
            'Bottle and refrigerate. Gets better with age.',
          ]}
          notes="Wear gloves when handling hot peppers — especially habaneros. The capsaicin will stay on your hands for hours and transfer to anything you touch, including your eyes."
        />

        <RecipeCard
          title="Salsa"
          yield="~4 cups"
          costPerBatch="$0.75-1.50 from garden"
          storeCost="$4-6/jar"
          ingredients={[
            '6-8 ripe tomatoes, diced',
            '1 medium onion, diced',
            '2-3 jalapeños (seeded for mild, unseeded for hot)',
            '3-4 garlic cloves, minced',
            'Juice of 2 limes',
            '½ cup fresh cilantro, chopped',
            '1 tsp cumin',
            'Salt to taste',
          ]}
          instructions={[
            'Dice all vegetables roughly the same size.',
            'Combine everything in a bowl. Stir to mix.',
            'Taste and adjust salt, lime, and heat.',
            'Rest at least 30 minutes before serving — flavors develop as it sits.',
          ]}
          notes="For shelf-stable salsa, use a tested canning recipe with precise ratios — homemade salsa acidity varies and isn't always safe for water bath canning without adjustment. Freeze it instead for long-term storage."
        />

        {/* BBQ Sauces */}
        <div className="my-6">
          <h3 className="text-lg font-bold mb-2" style={{ color: FOREST }}>BBQ Sauces — The Big Four</h3>
          <p className="text-base leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
            BBQ sauce is one of those things where regional identity runs deep and people have
            opinions. So rather than give you one sauce and call it done, here are the four
            major American styles. Each one costs less than a dollar to make and stores well
            in the refrigerator for several weeks.
          </p>

          <div className="space-y-4">
            {[
              {
                name: 'Sweet BBQ (Kansas City Style)',
                desc: 'Thick, sweet, tomato-forward. The one most people picture when they think BBQ sauce.',
                ingredients: ['1 cup ketchup', '½ cup apple cider vinegar', '¼ cup brown sugar', '2 tbsp molasses', '1 tbsp Worcestershire', '1 tsp smoked paprika', '1 tsp garlic powder', '½ tsp onion powder', '¼ tsp cayenne'],
                method: 'Combine all ingredients in a saucepan. Simmer 15-20 minutes, stirring often.',
              },
              {
                name: 'Vinegar BBQ (Eastern Carolina Style)',
                desc: 'Thin, tangy, no tomato. The oldest American BBQ style and the one that makes pulled pork sing.',
                ingredients: ['1 cup apple cider vinegar', '1 cup white vinegar', '1 tbsp brown sugar', '1 tbsp red pepper flakes', '1 tsp black pepper', '1 tsp salt', '¼ tsp cayenne'],
                method: 'Combine all ingredients and stir until sugar and salt dissolve. No cooking required.',
              },
              {
                name: 'Mustard BBQ (South Carolina Style)',
                desc: 'Tangy, bold, uniquely Southern. Outstanding on grilled chicken and pork.',
                ingredients: ['1 cup yellow mustard', '¼ cup apple cider vinegar', '¼ cup honey or brown sugar', '2 tbsp Worcestershire', '1 tsp garlic powder', '½ tsp black pepper', '¼ tsp cayenne'],
                method: 'Whisk all ingredients together. Warm in a saucepan 5 minutes to meld flavors.',
              },
              {
                name: 'White BBQ (Alabama Style)',
                desc: 'Mayo-based, peppery, tangy. If you haven\'t had white BBQ sauce on smoked chicken, that\'s something you need to fix.',
                ingredients: ['1 cup mayonnaise', '¼ cup apple cider vinegar', '1 tbsp lemon juice', '1 tsp prepared horseradish', '1 tsp black pepper', '½ tsp garlic powder', '½ tsp salt', '¼ tsp cayenne'],
                method: 'Whisk all ingredients together. Refrigerate at least 1 hour before using.',
              },
            ].map((sauce, i) => (
              <div key={sauce.name} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${FOREST}15` }}>
                <div className="px-5 py-3" style={{ backgroundColor: i % 2 === 0 ? FOREST : LEATHER }}>
                  <p className="font-bold text-sm" style={{ color: PARCH, fontFamily: 'Georgia, serif' }}>{sauce.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: `${PARCH}77` }}>{sauce.desc}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-0" style={{ backgroundColor: PARCH2 }}>
                  <div className="p-4" style={{ borderRight: `1px solid ${FOREST}10` }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Ingredients</p>
                    <ul className="space-y-1">
                      {sauce.ingredients.map((ing, j) => (
                        <li key={j} className="text-xs flex items-start gap-1.5" style={{ color: FOREST }}>
                          <span style={{ color: GOLD }}>·</span> {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Method</p>
                    <p className="text-xs leading-relaxed" style={{ color: FOREST }}>{sauce.method}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── DRESSINGS ──────────────────────────────────────────── */}
        <SectionHeader label="Dressings" title="The Master Ratio and Three You'll Actually Use" />

        <Callout icon="📐">
          <p className="font-semibold mb-2" style={{ color: FOREST }}>The Vinaigrette Master Ratio</p>
          <p style={{ color: `${FOREST}cc` }}>
            Every vinaigrette follows the same ratio: <strong style={{ color: FOREST }}>3 parts oil to 1 part acid.</strong> The acid is
            vinegar or citrus juice. Add a teaspoon of Dijon mustard as an emulsifier to keep
            it from separating, salt, and pepper. That's it. Everything else is a variation
            on this formula. Once you know the ratio, you don't need a recipe — you can make
            a vinaigrette out of whatever's in the pantry in two minutes.
          </p>
        </Callout>

        <div className="grid md:grid-cols-3 gap-4 my-5">
          {[
            {
              name: 'Ranch',
              cost: '~$0.60/cup vs. $3-5',
              recipe: '½ cup mayo · ½ cup buttermilk (or milk + 1 tsp vinegar) · 1 tsp dill · ½ tsp garlic powder · ½ tsp onion powder · ½ tsp dried chives · Salt and pepper — Whisk together, refrigerate 30 min.',
            },
            {
              name: 'Classic Vinaigrette',
              cost: '~$0.30/cup vs. $3-4',
              recipe: '¾ cup olive oil · ¼ cup red wine vinegar · 1 tsp Dijon · 1 tsp honey · 1 clove garlic, minced · Salt and pepper — Shake in a jar or whisk together.',
            },
            {
              name: 'Caesar',
              cost: '~$0.75/cup vs. $4-6',
              recipe: '2 garlic cloves minced · 2 anchovy fillets (or 1 tsp paste) · Juice of 1 lemon · 1 tsp Worcestershire · 1 tsp Dijon · ½ cup olive oil · ¼ cup Parmesan, grated · Salt and pepper — Whisk all together.',
            },
          ].map(d => (
            <div key={d.name} className="rounded-2xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
              <p className="font-bold text-sm mb-1" style={{ color: FOREST }}>{d.name}</p>
              <p className="text-xs font-semibold mb-3" style={{ color: GOLD }}>{d.cost}</p>
              <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>{d.recipe}</p>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── STOCKS & BROTHS ─────────────────────────────────────── */}
        <SectionHeader label="Stocks & Broths" title="Nothing Wasted" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Stock is the ultimate zero-waste kitchen project. You're taking what would otherwise
            go in the trash — vegetable scraps, meat bones, herb stems — and turning it into
            one of the most useful things in a cook's kitchen. A quart of decent stock at the
            store is $4-5. A quart of homemade stock made from scraps costs essentially nothing.
          </p>
        </div>

        <RecipeCard
          title="Scrap Stock (Vegetable)"
          yield="~2 quarts"
          costPerBatch="~$0 (kitchen scraps)"
          storeCost="$8-10 for 2 quarts"
          ingredients={[
            'Saved vegetable scraps — onion skins and ends, carrot tops and peels, celery leaves, garlic skins, herb stems',
            'Water to cover (about 3 quarts)',
            '1 tsp salt',
            'Peppercorns, bay leaf (optional)',
          ]}
          instructions={[
            'Keep a bag or container in the freezer and add vegetable scraps as you cook — this is the system. When it\'s full, make stock.',
            'Add frozen scraps to a large pot with water, salt, and any aromatics.',
            'Bring to a boil, reduce heat, simmer 1-2 hours.',
            'Strain through a fine mesh strainer. Discard solids.',
            'Use immediately, refrigerate up to a week, or freeze in quart bags.',
          ]}
          notes="Avoid scraps from cruciferous vegetables (broccoli, cabbage, Brussels sprouts) — they make stock bitter. Starchy vegetables like potatoes make it cloudy. Onion, carrot, and celery are the backbone of a good scrap stock."
        />

        <RecipeCard
          title="Bone Broth"
          yield="~2 quarts"
          costPerBatch="~$2-4"
          storeCost="$10-15 for 2 quarts"
          ingredients={[
            '2-3 lbs bones (beef knuckles, chicken carcass, pork — roasted first for better flavor)',
            '2 tbsp apple cider vinegar (draws minerals from the bones)',
            '1 onion, quartered',
            '2-3 carrots, broken up',
            '2-3 celery stalks',
            'Water to cover',
            'Salt, peppercorns, bay leaves',
          ]}
          instructions={[
            'Roast bones at 400°F for 30 minutes until browned — this step makes a significant difference in flavor.',
            'Add bones and all other ingredients to a large pot or slow cooker.',
            'Bring to a boil, skim foam from the surface, then reduce to the lowest possible simmer.',
            'Cook 12-24 hours for beef bones, 6-12 hours for chicken. The longer the better.',
            'Strain, season with salt. Refrigerate overnight — the fat will solidify on top and can be skimmed off.',
          ]}
          notes="Good bone broth will gel when refrigerated — that gelatin is the collagen from the bones and is what gives it both its body and its nutritional value. If yours doesn't gel, cook longer next time."
        />

        <Divider />

        {/* ── BATCH COOKING ───────────────────────────────────────── */}
        <SectionHeader label="Batch Cooking" title="Make Once, Eat for Weeks" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            The economics of homemade food get even better when you're making things in bulk
            and preserving them. The time investment per serving drops dramatically, the cost
            per serving drops further, and you always have something on hand without having
            to cook from scratch every night.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
            <p className="font-bold text-sm mb-3" style={{ color: FOREST }}>🧊 Freeze These</p>
            <div className="space-y-2">
              {[
                { item: 'Bread and rolls', note: 'Slice before freezing so you can pull individual pieces' },
                { item: 'Pasta (fresh)', note: 'Flour lightly, freeze flat, then bag' },
                { item: 'Tomato sauce', note: 'Quart bags laid flat freeze efficiently' },
                { item: 'Stock and broth', note: 'Freeze in ice cube trays for small portions' },
                { item: 'BBQ sauce', note: 'Freezes better than you\'d expect, 3-6 months' },
                { item: 'Tortillas', note: 'Stack with parchment between, wrap and freeze' },
              ].map(item => (
                <div key={item.item}>
                  <p className="text-sm font-semibold" style={{ color: FOREST }}>{item.item}</p>
                  <p className="text-xs" style={{ color: LEATHER }}>{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
            <p className="font-bold text-sm mb-3" style={{ color: FOREST }}>☀️ Dehydrate These</p>
            <div className="space-y-2">
              {[
                { item: 'Herbs', note: 'Dry at 95°F — anything higher damages aromatic oils' },
                { item: 'Tomatoes', note: '135°F, 8-10 hours. Dried tomatoes are worth more per ounce than almost anything else you can grow' },
                { item: 'Hot peppers', note: '135°F until brittle. Grind into chili flakes or powder' },
                { item: 'Fruit slices', note: 'Apples, pears, peaches — 135°F, 6-8 hours. Natural snack with no additives' },
                { item: 'Meat (jerky)', note: '165°F minimum for food safety. Marinate 6-24 hours first. A pound of beef turns into roughly 4-6 oz of jerky' },
              ].map(item => (
                <div key={item.item}>
                  <p className="text-sm font-semibold" style={{ color: FOREST }}>{item.item}</p>
                  <p className="text-xs" style={{ color: LEATHER }}>{item.note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 italic" style={{ color: `${FOREST}66` }}>[AFFILIATE: Food dehydrator — budget and mid tier]</p>
          </div>
        </div>

        {/* Cost comparison table */}
        <Divider />
        <SectionHeader label="The Numbers" title="Cost Comparison by Category" />
        <CostTable
          rows={[
            { item: 'Artisan bread (1 loaf)', homemade: '~$0.75', store: '$6-10', savings: '~90%' },
            { item: 'Fresh pasta (1 lb)', homemade: '~$0.50', store: '$5-8 (fresh)', savings: '~90%' },
            { item: 'Sauerkraut (1 quart)', homemade: '~$0.50', store: '$6-8', savings: '~93%' },
            { item: 'Tomato sauce (1 quart)', homemade: '~$0.75 (garden)', store: '$4-6', savings: '~85%' },
            { item: 'Ketchup (1 cup)', homemade: '~$0.50', store: '$3-4/bottle', savings: '~80%' },
            { item: 'Mayonnaise (1 cup)', homemade: '~$0.60', store: '$4-6/jar', savings: '~85%' },
            { item: 'BBQ sauce (1 cup)', homemade: '~$0.75', store: '$3-5/bottle', savings: '~80%' },
            { item: 'Ranch dressing (1 cup)', homemade: '~$0.60', store: '$3-5/bottle', savings: '~80%' },
            { item: 'Vegetable stock (1 quart)', homemade: '~$0 (scraps)', store: '$4-5', savings: '~100%' },
            { item: 'Kombucha (1 gallon)', homemade: '~$0.50', store: '$16-20 (4 bottles)', savings: '~97%' },
          ]}
        />

        {/* Bottom nav */}
        <div className="mt-12 pt-8 flex items-center justify-between text-sm" style={{ borderTop: `1px solid ${FOREST}20` }}>
          <Link href="/homesteading/budget/food-production" className="flex items-center gap-2 font-medium" style={{ color: FOREST }}>
            ← Food Production
          </Link>
          <Link
            href="/homesteading/budget/soil-and-seeds"
            className="flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl"
            style={{ backgroundColor: FOREST, color: PARCH }}
          >
            Next: Soil & Seeds →
          </Link>
        </div>

      </div>
    </main>
  )
}
