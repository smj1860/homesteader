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
              <p className="font-bold text-sm mb-