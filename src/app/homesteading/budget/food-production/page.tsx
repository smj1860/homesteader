// src/app/homesteading/budget/food-production/page.tsx

import Link from 'next/link'

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'
const LEATHER = '#7C4B2A'

export const metadata = {
  title: 'Food Production — Homesteading on a Budget | SteadCraft',
  description: 'Grow what your family actually eats. Zone-aware crop priorities, vertical growing, companion planting, and season extension on a budget.',
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

function CropTable({ crops, columns }: { crops: string[][]; columns: string[] }) {
  return (
    <div className="rounded-2xl overflow-hidden my-5" style={{ border: `1px solid ${FOREST}18` }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: LEATHER }}>
            {columns.map(col => (
              <th key={col} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: PARCH }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {crops.map((row, i) => (
            <tr key={i} style={{ backgroundColor: PARCH2, borderBottom: `1px solid ${FOREST}10` }}>
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3 text-sm" style={{ color: j === 0 ? FOREST : LEATHER, fontWeight: j === 0 ? 600 : 400 }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function HerbCard({ name, culinary, medicinal, startFrom, notes }: {
  name: string
  culinary: string
  medicinal: string
  startFrom: 'seed' | 'transplant' | 'either'
  notes: string
}) {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
      <div className="flex items-center justify-between mb-3">
        <p className="font-bold text-sm" style={{ color: FOREST, fontFamily: 'Georgia, serif' }}>{name}</p>
        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{
          backgroundColor: startFrom === 'seed' ? `${FOREST}15` : startFrom === 'transplant' ? `${GOLD}18` : `${LEATHER}15`,
          color: startFrom === 'seed' ? FOREST : startFrom === 'transplant' ? GOLD : LEATHER,
        }}>
          Start from {startFrom}
        </span>
      </div>
      <div className="space-y-1.5 mb-3">
        <p className="text-xs" style={{ color: FOREST }}><span className="font-semibold">Kitchen use:</span> {culinary}</p>
        <p className="text-xs" style={{ color: FOREST }}><span className="font-semibold">Medicinal use:</span> {medicinal}</p>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>{notes}</p>
    </div>
  )
}

export default function FoodProductionPage() {
  return (
    <main style={{ backgroundColor: PARCH, minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8 flex items-center gap-2" style={{ color: `${FOREST}66` }}>
          <Link href="/homesteading" style={{ color: `${FOREST}66` }} className="hover:underline">Homesteading</Link>
          <span>›</span>
          <Link href="/homesteading/budget" style={{ color: `${FOREST}66` }} className="hover:underline">On a Budget</Link>
          <span>›</span>
          <span style={{ color: FOREST }}>Food Production</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Module 03</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: FOREST }}>
            Food Production
          </h1>

          {/* Intro */}
          <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
            <p>
              Let me be straight with you about something — most people who start a garden do it by picking
              what looks cool, what won a ribbon at some county fair, or what they saw in a seed catalog
              with a real attractive photo on the front. And then six months later they've got more lemon
              cucumbers than any household should ever have to deal with, and nobody wanted lemon cucumbers
              in the first place. I've been there. I've talked to folks who've been there. It's a real
              common first-timer mistake.
            </p>
            <p>
              If you're homesteading on a budget, you don't have the luxury of growing food you're not
              going to use. Every square foot of growing space needs to earn its spot. That means we're
              starting with one simple rule: <strong style={{ color: FOREST }}>grow what y'all actually eat.</strong>
            </p>
            <p>
              That sounds obvious until you're standing in a nursery in April and everything looks good.
              Then discipline becomes a real thing. So let's build your decision-making framework before
              you ever pick up a seed packet.
            </p>
          </div>
        </div>

        {/* Land & Space Planner callout */}
        <Callout icon="🗺️">
          <p className="font-semibold mb-1" style={{ color: FOREST }}>Did you complete your Land & Space Planner?</p>
          <p style={{ color: `${FOREST}cc` }}>
            If you did, your personalized crop list is already built around your zone, sun exposure, and
            available space. Use this module to go deeper on the crops that were recommended to you —
            the why behind each pick, how to get the most out of them, and how to set your growing
            season up so you're never sitting on empty beds.
            If you haven't done the planner yet, <Link href="/homesteading/budget/land-space-planner" style={{ color: GOLD, textDecoration: 'underline' }}>start there first</Link>.
            It changes the way you approach everything in this section.
          </p>
        </Callout>

        <Divider />

        {/* Priority Framework */}
        <SectionHeader label="The Framework" title="How to Decide What to Grow" />
        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Before we get into specific crops, here's the framework I use for deciding what's worth
            the space. Every crop you consider should pass at least two of these three tests:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 my-6">
          {[
            {
              title: 'Calories per sq ft',
              desc: 'How much food energy does this plant produce relative to the ground it takes up? Zucchini and sweet potatoes crush it here. Watermelon, not so much.',
              icon: '⚡',
            },
            {
              title: 'Versatility',
              desc: "Can you eat it multiple ways? Fresh, cooked, fermented, dried? Tomatoes pass this test ten times over. A single-use specialty crop is a harder sell when you're watching the budget.",
              icon: '🔄',
            },
            {
              title: 'Preservation potential',
              desc: "Can you put it up for winter? Canning, freezing, drying, fermenting — if the answer is yes, you're getting value from this plant well past the last harvest of the season.",
              icon: '🫙',
            },
          ].map(item => (
            <div key={item.title} className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
              <p className="text-xl mb-3">{item.icon}</p>
              <p className="font-bold text-sm mb-2" style={{ color: FOREST }}>{item.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Run your crop list through that filter and you'll cut it down real quick. What's left is
            what belongs in your garden.
          </p>
        </div>

        <Divider />

        {/* Vegetables */}
        <SectionHeader label="Vegetables" title="What to Prioritize and Why" />

        <div className="space-y-8">

          {/* High Yield */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: FOREST }}>High Yield — These Earn Their Space</h3>
            <div className="space-y-4 text-base leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
              <p>
                These four crops consistently produce more food per square foot than nearly anything
                else you can plant. If you're starting out and working with limited space or a limited
                budget, this is your core four.
              </p>
            </div>
            <CropTable
              columns={['Crop', 'Why It Earns Its Space', 'Preservation Options']}
              crops={[
                ['Zucchini', 'One plant can genuinely feed a family. Two plants and you\'re giving bags away to neighbors — which is also fine.', 'Freeze, pickle, dehydrate, bread'],
                ['Pole Beans', 'Highest yield per square foot of any vegetable when trellised. They also fix nitrogen in your soil, which means your beds get better the more you grow them.', 'Blanch and freeze, dry as shell beans, can'],
                ['Tomatoes', 'Calorie-dense, incredibly versatile, and one of the few crops where the homegrown version is so superior to store-bought that it\'ll ruin you for the grocery store permanently.', 'Can, sauce, paste, dehydrate, freeze'],
                ['Sweet Potatoes', 'Calorie king. They produce a serious amount of food in a relatively small footprint, store beautifully without any processing, and they\'ll grow in heat that would cook most other crops. Zones 7 and up, y\'all.', 'Cure and store at room temp up to a year'],
              ]}
            />
          </div>

          {/* Preservation Friendly */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: FOREST }}>Preservation-Friendly — Grow It Once, Eat It All Year</h3>
            <div className="space-y-4 text-base leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
              <p>
                The whole point of preservation is extending value past the growing season. These crops
                are worth growing in quantity specifically because you can put them up and eat them
                through winter without ever setting foot in a grocery store produce section.
              </p>
            </div>
            <CropTable
              columns={['Crop', 'Best Preservation Method', 'Notes']}
              crops={[
                ['Tomatoes', 'Water bath canning — sauce, diced, whole', 'Grow more than you think. You\'ll use every jar.'],
                ['Peppers', 'Freeze (no blanching needed), pickle, dry', 'Bell peppers freeze beautifully. Hot peppers dry and store for years.'],
                ['Beans', 'Pressure canning, blanch-freeze, dry as shell beans', 'Dry beans store at room temp for years. Worth growing intentionally for long-term storage.'],
                ['Beets', 'Pickled water bath, roasted and frozen', 'Greens are edible too. Dual-use plant.'],
              ]}
            />
          </div>

          {/* Cool Season */}
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: FOREST }}>Cool Season Gap-Fillers — Never Leave a Bed Empty</h3>
            <div className="space-y-4 text-base leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
              <p>
                This is where a lot of beginner gardeners leave money on the table — literally. Your
                beds are sitting empty in early spring and late fall while you're waiting on tomatoes
                or after you've pulled them. Cool season crops fill those gaps and keep your garden
                producing food twelve months out of the year in most zones.
              </p>
              <p>
                These aren't glamorous crops. Nobody's putting kale on a Pinterest board in 2025.
                But kale in February when nothing else is growing? That's worth a lot.
              </p>
            </div>
            <CropTable
              columns={['Crop', 'When to Plant', 'Why It Matters']}
              crops={[
                ['Kale', 'Early spring, late summer for fall harvest', 'Frost improves the flavor. One of the most cold-hardy vegetables you can grow.'],
                ['Spinach', 'Early spring, fall', 'Ready in 40-50 days. High-value nutrient density for the space it takes.'],
                ['Lettuce', 'Early spring, fall, even winter with cover', 'Cut-and-come-again. One planting can feed you for weeks.'],
                ['Radishes', '22-25 days from seed to harvest', 'Fastest crop in the garden. Great for interplanting with slower crops.'],
              ]}
            />
          </div>
        </div>

        <Divider />

        {/* Fruits */}
        <SectionHeader label="Fruits" title="Worth the Space — If You Think Long Term" />
        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Fruit is a different conversation than vegetables because most of it involves planting
            something this year that won't pay you back until next year or the year after. For a
            budget homesteader, that requires a different kind of thinking. You're not spending money
            on something that produces this season — you're making an investment that compounds over time.
          </p>
          <p>
            The ones worth making that investment on are perennials — plants that come back year after
            year and produce more as they mature.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 my-6">
          {[
            {
              name: 'Strawberries',
              payback: 'Year 2',
              notes: 'Everbearing varieties give you two harvests per season. They spread via runners, so your first-year investment multiplies itself for free every year after.',
              icon: '🍓',
            },
            {
              name: 'Blueberries',
              payback: 'Years 3-4',
              notes: "Long setup time but the payoff is remarkable. A mature blueberry bush produces for 20+ years. Plant two different varieties for cross-pollination and you'll get significantly better yield.",
              icon: '🫐',
            },
            {
              name: 'Raspberries & Blackberries',
              payback: 'Year 2',
              notes: "Aggressive spreaders — which is both a feature and a thing to manage. Blackberries especially will produce heavily with minimal care. Native varieties in your region will outperform anything from a catalog.",
              icon: '🌿',
            },
          ].map(fruit => (
            <div key={fruit.name} className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
              <p className="text-2xl mb-3">{fruit.icon}</p>
              <p className="font-bold text-sm mb-1" style={{ color: FOREST }}>{fruit.name}</p>
              <p className="text-xs font-semibold mb-2" style={{ color: GOLD }}>Payback: {fruit.payback}</p>
              <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>{fruit.notes}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Tree fruit — apples, pears, peaches, figs — is the long game. We're talking 3-7 years
            before meaningful production in most cases. It belongs in your plan eventually, but it
            probably shouldn't be your first budget priority. Get your annuals and perennial berries
            established first, then start adding tree fruit as your confidence and available space
            grows. Figs are an exception — they're fast, prolific, and unfairly underrated in the
            homesteading world.
          </p>
        </div>

        <Divider />

        {/* Vertical Growing */}
        <SectionHeader label="Vertical Growing" title="The Best Return on Space You're Not Using" />
        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Vertical growing is the single biggest multiplier available to a budget homesteader with
            limited space. Instead of one dimension of growing — the ground — you're using two. The
            crops that climb, vine, or trail can produce two to three times more food per square foot
            of ground when they're trained upward versus left to sprawl.
          </p>
          <p>
            And here's the part I really want y'all to hear: you don't need to spend money on this.
          </p>
        </div>

        <Callout icon="💡">
          <p className="font-semibold mb-2" style={{ color: FOREST }}>The Free Pallet Trellis — My Favorite Budget Vertical Hack</p>
          <p style={{ color: `${FOREST}cc` }}>
            Wooden pallets are one of the most underutilized free materials in homesteading. Most
            businesses are glad to give them away — lumber yards, hardware stores, garden centers,
            grocery stores. Lean a pallet against a fence or secure both ends with stakes driven into
            the ground at an angle, and you've got an instant vertical planter. I've used this setup
            specifically for strawberries — plant right into the gaps between the slats with a little
            soil and compost, and they'll trail down and produce beautifully. It costs you nothing
            but the time it takes to haul the pallet home.
          </p>
        </Callout>

        <div className="space-y-4 text-base leading-relaxed my-4" style={{ color: `${FOREST}cc` }}>
          <p>
            Beyond pallets, you can use cattle panels (an investment but incredibly durable and they
            last decades), rebar and twine, bamboo poles lashed together, or just a row of tall
            wooden stakes with wire or netting strung between them. The structure doesn't need to be
            pretty. It needs to be sturdy enough to support the weight of whatever you're growing.
          </p>
        </div>

        <CropTable
          columns={['Crop', 'Why Go Vertical', 'Support Needed']}
          crops={[
            ['Pole Beans', 'Non-negotiable. Bush beans are fine, but pole beans on a trellis will outproduce them by a factor of two or three for the same footprint.', 'Poles, netting, or string — 6-8 ft height'],
            ['Cucumbers', 'Trellised cucumbers produce cleaner fruit, are easier to harvest, and take up a fraction of the ground space of sprawling vines.', 'Netting or cattle panel — 5-6 ft'],
            ['Tomatoes', 'Indeterminate varieties will grow until frost stops them. Stake or cage them and train them up — they\'ll produce far more fruit than a sprawling plant.', 'Heavy stakes or cage — 5-6 ft minimum'],
            ['Peas', 'They want to climb. Give them something to grab and they\'ll produce more heavily than any pea left to fall over.', 'Netting, string, or brush — 4-5 ft'],
            ['Winter Squash', 'Vines can be trained up a sturdy trellis. Large fruit may need a sling support (old pantyhose work perfectly).', 'Heavy cattle panel or fence — 6+ ft'],
          ]}
        />

        <Divider />

        {/* Companion Planting */}
        <SectionHeader label="Companion Planting" title="Let Your Garden Work Together" />
        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Companion planting is the practice of growing certain plants near each other on purpose
            because they actively benefit one another — whether that's repelling pests, attracting
            pollinators, fixing nutrients in the soil, or providing shade at just the right time of day.
          </p>
          <p>
            I want to be clear about what companion planting is and isn't. It's not magic, and it's
            not a replacement for good soil, proper watering, and knowing your zone. But when you layer
            it on top of solid growing fundamentals, it's a genuinely useful tool — and it costs you
            nothing extra since you're growing these plants anyway.
          </p>
          <p>
            The classic example everyone knows is the Three Sisters — corn, beans, and squash grown
            together. The corn gives the beans something to climb. The beans fix nitrogen for the
            corn. The squash spreads along the ground, shading out weeds and holding moisture with
            its broad leaves. Indigenous farmers developed this system centuries ago and it works
            exactly as well today. That's not a coincidence.
          </p>
        </div>

        <Callout>
          <p style={{ color: `${FOREST}cc` }}>
            For a full companion planting reference — including what grows well together, what to keep
            apart, and the science behind why — check out the{' '}
            <Link href="/resources/companion-planting" style={{ color: GOLD, textDecoration: 'underline' }}>
              Companion Planting Guide
            </Link>{' '}
            in the Resources section. It's built as a searchable quick-reference so you can look up
            any crop before you plant it.
          </p>
        </Callout>

        <Divider />

        {/* Herbs */}
        <SectionHeader label="Herbs" title="The Dual-Use Priority List" />
        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Herbs are where the budget homesteader gets a genuine two-for-one deal. Most of the herbs
            worth growing have both culinary and medicinal value, and most of them cost almost nothing
            to grow from seed. A $2.50 seed packet of basil will produce more basil than you can use
            in a season. A $3 packet of chamomile will grow enough for herbal tea all winter and
            self-seed so heavily you'll never have to buy it again.
          </p>
          <p>
            These are the ones I'd prioritize. The "start from" column matters — some herbs are
            genuinely difficult to germinate from seed and are better bought as a small transplant once.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <HerbCard
            name="Basil (Genovese)"
            culinary="Pasta, sauces, pesto, salads, pizza"
            medicinal="Anti-inflammatory, mild antimicrobial, digestive support"
            startFrom="seed"
            notes="Direct sow after last frost. Pinch flowers as they appear to extend production. Goes to seed fast in heat — succession plant every 3-4 weeks."
          />
          <HerbCard
            name="Spearmint"
            culinary="Tea, cocktails, sauces, salads, lamb"
            medicinal="Digestive aid, headache relief, nausea"
            startFrom="transplant"
            notes="Always grow in a container. Always. It will take over a garden bed with absolutely no remorse. Once you have it, you'll have it forever — it spreads by root."
          />
          <HerbCard
            name="German Chamomile"
            culinary="Tea — that's mainly it, but it's a very good tea"
            medicinal="Sleep aid, anti-inflammatory, digestive support, anxiety relief"
            startFrom="seed"
            notes="Surface sow — don't cover the seeds, they need light to germinate. Self-seeds so aggressively that after year one you essentially never have to plant it again."
          />
          <HerbCard
            name="Thyme (German)"
            culinary="Poultry, soups, roasted vegetables, marinades"
            medicinal="Antimicrobial, respiratory support, cough relief"
            startFrom="seed"
            notes="Perennial in zones 4-9. Drought tolerant once established. One plant provides more than enough for a household."
          />
          <HerbCard
            name="Rosemary"
            culinary="Lamb, chicken, potatoes, bread, olive oil"
            medicinal="Circulation support, memory and focus, antimicrobial"
            startFrom="transplant"
            notes="Germination from seed is notoriously slow and unreliable. Buy one small transplant, establish it, and take cuttings to propagate. Perennial in zones 6+."
          />
          <HerbCard
            name="Calendula (Resina)"
            culinary="Edible flowers in salads, natural food dye, tea"
            medicinal="Skin healing, anti-inflammatory, wound care, salves"
            startFrom="seed"
            notes="Heirloom variety. Frost-resistant and one of the easiest flowers to grow from seed. Deadhead regularly for continuous bloom. Seeds are easy to save."
          />
          <HerbCard
            name="Echinacea"
            culinary="Tea from flowers and leaves"
            medicinal="Immune support — roots, leaves, and flowers all usable"
            startFrom="transplant"
            notes="Perennial. Takes 2 years to really establish but then produces indefinitely. Roots are the most medicinally potent part — harvest sparingly from mature plants."
          />
          <HerbCard
            name="Lemon Balm"
            culinary="Tea, lemonade, desserts, fish"
            medicinal="Stress and anxiety relief, antiviral, sleep support"
            startFrom="seed"
            notes="Tolerates partial shade better than most herbs — good for lower-light spots. Self-seeds moderately. Grows almost anywhere with almost no attention."
          />
        </div>

        <Divider />

        {/* Succession Planting */}
        <SectionHeader label="Succession Planting" title="Never Have an Empty Bed" />
        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Succession planting is simple: instead of planting all of a crop at once, you stagger
            your plantings every 2-3 weeks so you're harvesting a steady supply over a long period
            rather than an overwhelming glut all at once. It's the difference between having fresh
            lettuce for three months and having sixty heads of lettuce ripen in the same week.
          </p>
          <p>
            The other side of succession planting is thinking about what goes into a bed after you
            pull a crop. When your spring lettuce bolts in June, what's going in that space? If the
            answer is "nothing," you're leaving food production and money on the table. Have your
            next planting ready — whether that's a warm season crop taking the place of a cool
            season one, or a fall planting following a summer harvest.
          </p>
        </div>

        <Callout>
          <p className="font-semibold mb-2" style={{ color: FOREST }}>A Simple Succession Framework</p>
          <div className="space-y-1 text-sm" style={{ color: `${FOREST}cc` }}>
            <p>🌱 <strong>Early spring:</strong> Peas, lettuce, spinach, radishes, kale</p>
            <p>🌿 <strong>After last frost:</strong> Tomatoes, peppers, beans, cucumbers, squash, basil</p>
            <p>☀️ <strong>Midsummer:</strong> Succession sow beans and cucumbers every 3 weeks for continuous harvest</p>
            <p>🍂 <strong>Late summer:</strong> Start fall crops — kale, spinach, carrots, beets, garlic</p>
            <p>❄️ <strong>Fall:</strong> Cover cool-season crops for extended harvest into winter</p>
          </div>
        </Callout>

        <Divider />

        {/* Season Extension */}
        <SectionHeader label="Season Extension" title="Getting More Out of What You Already Have" />
        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Season extension is exactly what it sounds like — stretching your growing season past
            what the calendar says is possible. You're not fighting nature here, you're just creating
            a slightly more favorable microclimate for your plants so they can keep producing a few
            extra weeks on either end of the season.
          </p>
          <p>
            The good news is that you don't need a greenhouse to do this. Indeed, some of the most
            effective season extension methods cost almost nothing.
          </p>
        </div>

        <div className="space-y-4 my-6">
          {[
            {
              method: 'Row Cover (Floating)',
              cost: '$15-30 for a full bed',
              how: 'Lightweight fabric laid directly over plants or supported by hoops. Lets in light and rain, protects against frost, and creates a few degrees of warmth underneath.',
              best_for: 'Spring frost protection, fall extension, protecting brassicas from pests',
            },
            {
              method: 'Cold Frame',
              cost: '$0-30 depending on materials',
              how: 'A bottomless box with a transparent lid — glass, polycarbonate, or even an old window. Set over a bed and you\'ve created a mini greenhouse. Can be built from scrap lumber and salvaged windows for essentially nothing.',
              best_for: 'Winter greens, hardening off seedlings in spring, starting seeds early',
            },
            {
              method: 'Low Tunnel',
              cost: '$20-50 per bed',
              how: 'PVC hoops or wire bent into arches over a bed, covered with row cover or clear plastic. Creates a protected growing environment for the whole bed.',
              best_for: 'Spring and fall growing, overwintering root vegetables, extending tomatoes into fall',
            },
          ].map(item => (
            <div key={item.method} className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-sm" style={{ color: FOREST }}>{item.method}</p>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${GOLD}18`, color: GOLD }}>
                  {item.cost}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-2" style={{ color: `${FOREST}cc` }}>{item.how}</p>
              <p className="text-xs" style={{ color: LEATHER }}><span className="font-semibold">Best for:</span> {item.best_for}</p>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 flex items-center justify-between text-sm" style={{ borderTop: `1px solid ${FOREST}20` }}>
          <Link href="/homesteading/budget/homemade-supplies" className="flex items-center gap-2 font-medium" style={{ color: FOREST }}>
            ← Homemade Supplies
          </Link>
          <Link
            href="/homesteading/budget/food-make-dont-buy"
            className="flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-all"
            style={{ backgroundColor: FOREST, color: PARCH }}
          >
            Next: Food: Make Don't Buy →
          </Link>
        </div>

      </div>
    </main>
  )
}
