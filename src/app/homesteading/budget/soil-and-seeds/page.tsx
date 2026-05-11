// src/app/homesteading/budget/soil-and-seeds/page.tsx

import Link from 'next/link'

const FOREST  = '#264228'
const GOLD    = '#A88032'
const PARCH   = '#F7F3EB'
const PARCH2  = '#EDE8DE'
const LEATHER = '#7C4B2A'

export const metadata = {
  title: 'Soil & Seeds — Homesteading on a Budget | SteadCraft',
  description: 'Build better soil for less, compost from what you already have, and save seeds so your second season costs almost nothing.',
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

function RecipeCard({ title, badge, layers, notes }: {
  title: string
  badge: string
  layers: { label: string; detail: string; free?: boolean }[]
  notes?: string
}) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${FOREST}25` }}>
      <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: FOREST }}>
        <h3 className="font-bold text-base" style={{ color: PARCH, fontFamily: 'Georgia, serif' }}>{title}</h3>
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${GOLD}30`, color: GOLD }}>
          {badge}
        </span>
      </div>
      <div style={{ backgroundColor: PARCH2 }}>
        {layers.map((layer, i) => (
          <div
            key={i}
            className="flex items-start gap-4 px-6 py-4"
            style={{ borderBottom: i < layers.length - 1 ? `1px solid ${FOREST}12` : 'none' }}
          >
            <div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
              style={{ backgroundColor: FOREST, color: PARCH }}
            >
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-sm" style={{ color: FOREST }}>{layer.label}</p>
                {layer.free && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: '#2D7A4F18', color: '#2D7A4F' }}>
                    Free
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>{layer.detail}</p>
            </div>
          </div>
        ))}
      </div>
      {notes && (
        <div className="px-6 py-4" style={{ backgroundColor: `${GOLD}08`, borderTop: `1px solid ${GOLD}20` }}>
          <p className="text-xs leading-relaxed" style={{ color: LEATHER }}><span className="font-semibold" style={{ color: GOLD }}>Note: </span>{notes}</p>
        </div>
      )}
    </div>
  )
}

function SeedTable({ crops }: { crops: { crop: string; difficulty: string; notes: string; storage: string }[] }) {
  const diffColor = (d: string) => ({
    Easy: { bg: '#2D7A4F18', text: '#2D7A4F' },
    Medium: { bg: `${GOLD}18`, text: GOLD },
    Hard: { bg: '#8B2E2E18', text: '#8B2E2E' },
  }[d] ?? { bg: `${FOREST}12`, text: FOREST })

  return (
    <div className="rounded-2xl overflow-hidden my-5" style={{ border: `1px solid ${FOREST}18` }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: LEATHER }}>
            {['Crop', 'Difficulty', 'How to Save', 'Storage Life'].map(col => (
              <th key={col} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: PARCH }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {crops.map((row, i) => {
            const dc = diffColor(row.difficulty)
            return (
              <tr key={i} style={{ backgroundColor: PARCH2, borderBottom: `1px solid ${FOREST}10` }}>
                <td className="px-4 py-3 font-semibold text-sm" style={{ color: FOREST }}>{row.crop}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ backgroundColor: dc.bg, color: dc.text }}>
                    {row.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs leading-relaxed" style={{ color: LEATHER }}>{row.notes}</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color: FOREST }}>{row.storage}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function SoilAndSeedsPage() {
  return (
    <main style={{ backgroundColor: PARCH, minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8 flex items-center gap-2" style={{ color: `${FOREST}66` }}>
          <Link href="/homesteading" style={{ color: `${FOREST}66` }} className="hover:underline">Homesteading</Link>
          <span>›</span>
          <Link href="/homesteading/budget" style={{ color: `${FOREST}66` }} className="hover:underline">On a Budget</Link>
          <span>›</span>
          <span style={{ color: FOREST }}>Soil & Seeds</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>Module 05</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: FOREST }}>
            Soil & Seeds
          </h1>

          <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
            <p>
              Here's a framing I want you to hold onto as you work through this section: the soil is
              the investment and the seeds are the dividend. Most people think about it the other way
              around — they obsess over which seeds to buy while they're growing in garbage soil and
              wondering why their yield is disappointing. The truth is a mediocre seed in excellent
              soil will outperform an excellent seed in poor soil almost every single time.
            </p>
            <p>
              Get the soil right first. Everything else follows from that.
            </p>
            <p>
              The good news is that building great soil doesn't require a big budget — it requires
              understanding what your soil actually needs and being willing to put in some time. And
              on the seed side, once you learn to save seed from your own heirloom plants, your
              second season costs you almost nothing. That's the kind of compounding return that
              makes homesteading genuinely sustainable long-term.
            </p>
          </div>
        </div>

        <Divider />

        {/* Soil Mixes */}
        <SectionHeader label="Soil Mixes" title="The SteadCraft Recipes" />

        <div className="space-y-4 text-base leading-relaxed mb-8" style={{ color: `${FOREST}cc` }}>
          <p>
            I'm going to give you three separate mixes because the application matters. What goes
            in a container is different from what goes in a raised bed, and both of those are
            different from how you'd approach amending in-ground soil. Using the wrong mix for the
            application is a real way to waste money, so let's be specific.
          </p>
          <p>
            These are the exact mixes I use. Where I call out a specific brand, it's because that's
            what I've had success with — primarily Cowart's products, which is what we have access
            to in the Southeast. If you're not in an area where Cowart's is available, look for a
            locally-sourced soil conditioner from a regional brand. The function is the same: it's
            there to improve drainage, add organic matter, and keep your mix from compacting.
          </p>
        </div>

        <div className="space-y-6">
          <RecipeCard
            title="SteadCraft Raised Bed Mix"
            badge="Raised Beds"
            layers={[
              {
                label: 'Layer 1 — The Base (Bottom of Bed)',
                detail: 'Broken-down limbs, small to medium sticks and twigs, and dried leaves. All of this came off my own property — mostly magnolia leaves, whatever sticks came down in a storm. Break larger limbs into smaller pieces before laying them down. This layer is essentially free and it does two things: it improves drainage at the bottom of the bed and it slowly breaks down into nutrients over time.',
                free: true,
              },
              {
                label: 'Layer 2 — The Activator',
                detail: "Cowart's mushroom compost OR coop litter (or both if you have it) — laid about 1 to 2 inches deep over the base layer. This isn't a growing medium at this stage, it's a biological activator. The compost introduces the microorganisms that will start breaking down your bottom layer and building soil biology from the ground up.",
                free: false,
              },
              {
                label: 'Layer 3 — The Growing Medium (Top Mix)',
                detail: '1 part compost (Cowart\'s mushroom compost) + 1 part raised bed soil (Miracle-Gro Raised Bed) + 2 parts Cowart\'s Soil Conditioner. This is what your plants are actually growing in. The soil conditioner is the dominant ingredient for a reason — it keeps the mix aerated and draining well through the season, which is critical in summer heat.',
                free: false,
              },
            ]}
            notes="The soil conditioner being at a 2:1 ratio to everything else is not a typo. In hot climates especially, compaction is the enemy. The conditioner keeps air and water moving through the mix all season long."
          />

          <RecipeCard
            title="SteadCraft Potting Mix"
            badge="Containers & Pots"
            layers={[
              {
                label: '0.5 parts Perlite',
                detail: 'Perlite is the small white volcanic glass pieces you see in potting mixes. Its job is drainage and aeration — it creates air pockets in the mix so roots can breathe and water doesn\'t pool at the bottom of a container. Do not skip this.',
              },
              {
                label: '0.5 parts Peat Moss',
                detail: 'Peat moss holds moisture and creates a light, workable texture. It also contributes to a slightly acidic pH, which most vegetables and herbs prefer. If you\'re environmentally conscious about peat harvesting, coco coir is a solid substitute at a similar ratio.',
              },
              {
                label: '0.5 parts Compost',
                detail: "Cowart's mushroom compost is what I use. This is your nutrition source. The compost feeds the plant and supports the microbial life in the container.",
              },
              {
                label: '1 part Soil Conditioner',
                detail: "Cowart's Soil Conditioner is the dominant ingredient here, same principle as the raised bed mix. Containers have no natural drainage below them — the conditioner compensates for that by keeping the mix loose and draining well.",
              },
            ]}
            notes="Mix thoroughly before filling containers. This mix works for vegetables, herbs, and most flowers. For containers specifically, I recommend topdressing with a thin layer of compost mid-season since containers don't have the soil biology that naturally replenishes nutrients."
          />
        </div>

        <div className="space-y-4 text-base leading-relaxed mt-8" style={{ color: `${FOREST}cc` }}>
          <h3 className="text-lg font-bold" style={{ color: FOREST }}>In-Ground Amendment — For Larger Spaces</h3>
          <p>
            If you're working with a large in-ground garden, building raised bed mix at scale gets
            expensive fast. The more practical approach is to amend what you already have. Get your
            soil tested first — your local extension office can do this cheaply or even free. Once
            you know what you're working with, you can add targeted amendments rather than guessing.
          </p>
          <p>
            In most cases, the two most impactful things you can add to in-ground soil are compost
            (always) and a soil conditioner or aged wood chips (for drainage and organic matter).
            Till these in 6-8 inches deep and you'll see a noticeable improvement in your first season.
          </p>

          <h3 className="text-lg font-bold mt-6" style={{ color: FOREST }}>What Not to Buy</h3>
          <p>
            This one will save you money immediately. Bagged topsoil — the cheap stuff in the
            40-pound bags at the hardware store — is almost always a disappointment. It's often
            mostly clay or subsoil with very little organic matter, it compacts badly, and it
            drains poorly. The words "topsoil" on the bag tell you almost nothing about quality.
          </p>
          <p>
            Pre-mixed "garden soils" from the big box stores can be fine as a component in a mix,
            but using them straight out of the bag as your only growing medium is usually not
            enough. They often lack sufficient aeration for containers and can be inconsistent
            batch to batch.
          </p>
        </div>

        <Divider />

        {/* Composting */}
        <SectionHeader label="Composting" title="Turn What You Have Into What Your Garden Needs" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Compost is decomposed organic matter — kitchen scraps, yard waste, leaves, manure —
            that's been broken down by microorganisms into a dark, crumbly, nutrient-rich material
            that's essentially the best thing you can add to any soil. It improves drainage in
            clay soils, improves water retention in sandy soils, feeds soil biology, and adds
            nutrients that plants can actually use.
          </p>
          <p>
            The beauty of composting on a budget is that the raw materials are mostly things you're
            already throwing away.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
            <p className="font-bold text-sm mb-3" style={{ color: FOREST }}>✅ Compost These</p>
            <div className="space-y-1.5">
              {[
                'Fruit and vegetable scraps',
                'Coffee grounds and paper filters',
                'Eggshells',
                'Dry leaves (brown material)',
                'Grass clippings (green material)',
                'Straw and hay',
                'Paper and cardboard (non-glossy)',
                'Garden trimmings',
                'Coop litter and manure (aged)',
              ].map(item => (
                <p key={item} className="text-xs flex items-start gap-2" style={{ color: LEATHER }}>
                  <span style={{ color: '#2D7A4F' }}>✓</span> {item}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
            <p className="font-bold text-sm mb-3" style={{ color: FOREST }}>❌ Leave These Out</p>
            <div className="space-y-1.5">
              {[
                'Meat, fish, or bones',
                'Dairy products',
                'Oils and fats',
                'Diseased plant material',
                'Dog or cat waste',
                'Glossy or coated paper',
                'Treated or painted wood',
                'Invasive weeds that have gone to seed',
                'Anything with pesticide residue',
              ].map(item => (
                <p key={item} className="text-xs flex items-start gap-2" style={{ color: LEATHER }}>
                  <span style={{ color: '#8B2E2E' }}>✗</span> {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <h3 className="text-lg font-bold" style={{ color: FOREST }}>The Brown to Green Ratio</h3>
          <p>
            Compost needs two types of material to break down properly: browns and greens. Browns
            are carbon-rich materials — dry leaves, straw, cardboard, paper. Greens are
            nitrogen-rich — food scraps, grass clippings, fresh plant material. The sweet spot
            is roughly 3 parts brown to 1 part green by volume. Too many greens and your pile
            gets wet, matted, and starts to smell. Too many browns and decomposition slows to
            a crawl. Most people have the opposite problem of what they expect — usually too many
            greens and not enough browns. Save your dry leaves in the fall specifically for this.
          </p>

          <h3 className="text-lg font-bold mt-2" style={{ color: FOREST }}>Hot vs. Cold Composting</h3>
          <p>
            Hot composting means actively managing your pile — turning it regularly, monitoring
            moisture, and maintaining the right ratio — to generate internal heat that speeds up
            decomposition. A well-managed hot pile can produce finished compost in 4-8 weeks. It
            requires more attention but it's faster and kills weed seeds and pathogens.
          </p>
          <p>
            Cold composting is the set-it-and-mostly-forget-it approach. You add material when
            you have it, turn it occasionally, and compost is ready in 6-12 months. Less work,
            slower results. For most budget homesteaders, cold composting is the realistic starting
            point — it still produces excellent compost, it just takes longer.
          </p>
        </div>

        <Callout icon="📐">
          <p className="font-semibold mb-2" style={{ color: FOREST }}>How Big Should Your Compost Bin Be?</p>
          <div className="space-y-2 text-sm" style={{ color: `${FOREST}cc` }}>
            <p>A good rule of thumb: for every 100 sq ft of garden space, you want roughly 1 cubic yard (3x3x3 ft) of compost capacity. This gives you enough finished compost for a meaningful top-dress each season without overbuilding.</p>
            <p>For a 200 sq ft garden — about the size of a 10x20 bed system — two 3x3x3 bins (one active, one curing) is the practical setup. One takes new material while the other finishes breaking down.</p>
            <p>You can build a simple bin from four wooden pallets stood on their sides and wired together at the corners. Free, functional, and durable enough to last several seasons.</p>
          </div>
        </Callout>

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <h3 className="text-lg font-bold" style={{ color: FOREST }}>Compost Tea — Liquid Gold for Free</h3>
          <p>
            Compost tea is exactly what it sounds like: finished compost steeped in water to create
            a liquid that's rich in the microorganisms and soluble nutrients from the compost itself.
            You're essentially brewing a concentrate of soil biology that you can apply directly to
            plant roots or spray on leaves.
          </p>
          <p>
            The simplest method: fill a five-gallon bucket about one-third with finished compost,
            fill the rest with water (dechlorinated if you're on city water — let it sit 24 hours
            or use an aerator), let it steep for 24-48 hours while stirring occasionally, then
            strain out the solids and apply the liquid directly to the base of your plants.
          </p>
          <p>
            It won't replace fertilizer entirely for heavy feeders, but it's a genuinely useful
            mid-season boost that costs you nothing if you're already composting. I use it on my
            tomatoes and peppers every couple of weeks through the peak of the growing season.
          </p>

          <h3 className="text-lg font-bold mt-2" style={{ color: FOREST }}>Small Space Option: Worm Bin</h3>
          <p>
            If you're in an apartment, a small home with no yard, or you just don't have space for
            a traditional compost pile, a worm bin (vermicomposting) is the answer. Red wiggler
            worms consume kitchen scraps and produce worm castings — which are, ounce for ounce,
            some of the most nutrient-dense compost material you can add to containers or small beds.
          </p>
          <p>
            A basic worm bin can be built from two nested plastic storage bins for under $20. Worms
            are cheap to source and easy to maintain. The castings they produce are worth more per
            pound than almost any bagged amendment you can buy. It's quiet, it doesn't smell when
            managed correctly, and it fits under a kitchen sink or in a closet.
          </p>
        </div>

        <Divider />

        {/* Free Soil Inputs */}
        <SectionHeader label="Free Inputs" title="What to Source Before You Buy Anything" />

        <div className="space-y-4 text-base leading-relaxed mb-6" style={{ color: `${FOREST}cc` }}>
          <p>
            Before you spend a dollar on soil amendments, work through this list. These are all
            genuinely free or nearly free sources of high-quality organic material that most people
            walk right past.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              source: 'Coffee Grounds',
              icon: '☕',
              how: 'Ask your local coffee shop. Most are thrilled to give them away rather than throw them out — some shops bag them specifically for gardeners. High in nitrogen, slightly acidic, and excellent for working into beds or adding to compost.',
              caveat: "Don't use them straight as a mulch — they can compact and repel water. Mix into compost or work directly into soil.",
            },
            {
              source: 'Wood Chips (Chip Drop)',
              icon: '🌳',
              how: "Tree service companies and arborists need to dump fresh wood chips constantly — it costs them to haul chips to a disposal site. Many will deliver a whole truck-load to your property for free through services like ChipDrop.com. Fresh wood chips are excellent as a garden path material, sheet mulch base, or as a brown carbon source for composting.",
              caveat: "Don't till fresh wood chips directly into soil — they'll tie up nitrogen as they break down. Use them on top as mulch or compost them first.",
            },
            {
              source: 'Cardboard (Sheet Mulching)',
              icon: '📦',
              how: "Lay cardboard directly on the ground over grass or weeds, wet it thoroughly, then cover with 4-6 inches of wood chips, compost, or your bed mix. The cardboard smothers what's underneath and breaks down over the season, adding carbon to the soil. Appliance stores and moving companies give away large pieces for free.",
              caveat: "Remove any tape and avoid glossy or heavily printed cardboard. Plain brown corrugated is what you want.",
            },
            {
              source: 'Grass Clippings',
              icon: '🌿',
              how: "High in nitrogen — a valuable green material for your compost pile. If you have neighbors who bag their clippings, offer to take them off their hands. Don't use clippings from lawns that have been treated with herbicides.",
              caveat: "Layer thin — thick layers of grass mat together, block air, and start to smell. Mix with browns in compost or spread no more than an inch thick as mulch.",
            },
            {
              source: 'Leaf Mold',
              icon: '🍂',
              how: "Pile up dried leaves, wet them down, and let them sit for 6-12 months. What you get is leaf mold — a dark, crumbly, low-nutrient but excellent soil conditioner that improves water retention and texture dramatically. Completely free if you have trees on or near your property.",
              caveat: "Leaf mold is low in nutrients but high in value as a soil amendment. Think of it as improving soil structure rather than feeding plants.",
            },
          ].map(input => (
            <div key={input.source} className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{input.icon}</span>
                <p className="font-bold text-sm" style={{ color: FOREST }}>{input.source}</p>
              </div>
              <p className="text-sm leading-relaxed mb-2" style={{ color: `${FOREST}cc` }}>{input.how}</p>
              <p className="text-xs leading-relaxed" style={{ color: LEATHER }}>
                <span className="font-semibold">Keep in mind: </span>{input.caveat}
              </p>
            </div>
          ))}
        </div>

        <Divider />

        {/* Seed Saving */}
        <SectionHeader label="Seed Saving" title="How Your Second Season Costs Almost Nothing" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            Seed saving is the long game of the budget homesteader. Your first season, you buy seeds.
            Your second season — if you've been intentional about saving from heirloom plants — you
            buy almost nothing. By year three, you're trading seeds with other gardeners, passing
            them on, and your growing operation has become largely self-sustaining on the seed side.
          </p>
          <p>
            But before we get into how to save seeds, we need to talk about which seeds are worth saving.
          </p>

          <h3 className="text-lg font-bold" style={{ color: FOREST }}>Open-Pollinated vs. Heirloom vs. Hybrid — Why It Matters</h3>
          <p>
            <strong style={{ color: FOREST }}>Open-pollinated (OP)</strong> means the plant was pollinated naturally — by wind, insects, or hand — and the seed will produce a plant true to the parent. Save the seed, plant it next year, get the same plant. This is what you want for seed saving.
          </p>
          <p>
            <strong style={{ color: FOREST }}>Heirloom</strong> varieties are open-pollinated varieties that have been passed down for at least 50 years (though many definitions vary). They're OP by definition, which means they're seed-saveable. They also tend to have superior flavor and were selected over generations for qualities that matter to actual gardeners and cooks.
          </p>
          <p>
            <strong style={{ color: FOREST }}>Hybrid (F1)</strong> varieties are crosses between two different parent plants, specifically bred to combine desirable traits. The resulting seeds will not grow true to the parent — you'll get something unpredictable, often reverting toward one of the original parent plants. Don't save seed from hybrids. Buy them again each year if you grow them, or switch to OP varieties.
          </p>
          <p>
            This is why the Land & Space Planner weights heirloom varieties heavily. It's not just about flavor — it's about giving you seeds worth saving.
          </p>
        </div>

        <SeedTable
          crops={[
            { crop: 'Tomatoes', difficulty: 'Easy', notes: 'Ferment seeds in water 2-3 days, rinse thoroughly, dry flat on a paper plate for 1 week.', storage: '4-6 years' },
            { crop: 'Beans & Peas', difficulty: 'Easy', notes: 'Leave pods on vine until completely dry and rattling. Shell and store immediately.', storage: '3-5 years' },
            { crop: 'Peppers', difficulty: 'Easy', notes: 'Let fruit ripen fully to red on the plant. Scoop seeds, rinse, dry 2 weeks.', storage: '2-3 years' },
            { crop: 'Squash & Zucchini', difficulty: 'Medium', notes: 'Let one fruit mature past eating stage — it should be large and hard. Scoop seeds, rinse, dry flat.', storage: '4-6 years' },
            { crop: 'Cucumbers', difficulty: 'Easy', notes: 'Allow one cucumber to fully yellow and mature on vine. Scoop, rinse, dry.', storage: '5-7 years' },
            { crop: 'Kale / Chard', difficulty: 'Medium', notes: 'Biennial — requires overwintering. Let stalks bolt and flower second year. Harvest dry seed pods.', storage: '4-5 years' },
            { crop: 'Lettuce', difficulty: 'Medium', notes: 'Allow to bolt and flower. Shake dried seed heads into paper bag when fluffy and dry.', storage: '2-3 years' },
            { crop: 'Herbs (Basil, Chamomile)', difficulty: 'Easy', notes: 'Allow flower spikes to dry fully on plant. Shake seeds into paper bag.', storage: '3-5 years' },
          ]}
        />

        <Callout icon="🔄">
          <p className="font-semibold mb-2" style={{ color: FOREST }}>Seed Swaps — The Community Side of Seed Saving</p>
          <p style={{ color: `${FOREST}cc` }}>
            Once you're saving seed with any regularity, you'll have more than you can use. Seed swaps
            — both local events and online communities — are how homesteaders and gardeners trade
            varieties they've saved for ones they want to try. You can get access to a remarkably
            wide range of heirloom varieties this way for nothing more than seeds you grew yourself.
            Look for local seed library programs at public libraries, county extension offices,
            and homesteading groups. Online, the Seed Savers Exchange community is the most
            established resource in the country for this.
          </p>
        </Callout>

        <Divider />

        {/* Buying Seeds */}
        <SectionHeader label="Buying Seeds" title="Getting the Most for Your Seed Budget" />

        <div className="space-y-4 text-base leading-relaxed" style={{ color: `${FOREST}cc` }}>
          <p>
            When you do buy seeds, buy smart. A $4 packet of tomato seeds contains 25-30 seeds.
            One tomato plant in good soil can produce 10-15 pounds of tomatoes over a season — or
            considerably more. Do that math. The seed cost per pound of food produced is so small
            it barely registers. The lesson is: don't cut corners on quality to save a dollar on
            a seed packet. The seed is the cheapest part of the whole operation.
          </p>
          <p>
            That said, there are absolutely ways to stretch your seed budget when you're starting out.
          </p>
        </div>

        <div className="space-y-4 my-6">
          {[
            {
              title: 'Starting from seed vs. buying transplants',
              content: "A pack of 25 tomato seeds costs $3-5. A single tomato transplant at a nursery in spring costs $4-8. If you can start seeds indoors 6-8 weeks before your last frost date, you're multiplying your investment by 20 or more. The only cost is a grow light or a sunny window, some small containers, and seed starting mix. For crops like peppers and tomatoes where you only need a handful of plants, starting from seed makes financial sense almost immediately.",
            },
            {
              title: 'Where to buy affordable heirloom seeds',
              content: "Baker Creek Heirloom Seeds, Seed Savers Exchange, Southern Exposure Seed Exchange (especially good for the Southeast), and High Mowing Organic Seeds are all reputable sources with strong heirloom selections at reasonable prices. Avoid the seed displays at big box stores for anything you plan to save — they're almost entirely hybrids. Your local feed store or farm supply often carries better options and supports a local business at the same time.",
            },
            {
              title: 'Seed packet cost vs. yield math',
              content: "Run this exercise before you buy: estimate how many plants you need, look at what the seed packet yields in plant count, and calculate your cost per plant. Then estimate yield per plant and your cost per pound of food. You'll quickly realize that seeds are almost never where you're losing money. Time, soil quality, and water management are usually the real variables that determine your return.",
            },
          ].map(item => (
            <div key={item.title} className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
              <p className="font-bold text-sm mb-3" style={{ color: FOREST }}>{item.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: `${FOREST}cc` }}>{item.content}</p>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 flex items-center justify-between text-sm" style={{ borderTop: `1px solid ${FOREST}20` }}>
          <Link href="/homesteading/budget/food-make-dont-buy" className="flex items-center gap-2 font-medium" style={{ color: FOREST }}>
            ← Food: Make Don't Buy
          </Link>
          <Link
            href="/homesteading/budget/money-generation"
            className="flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-all"
            style={{ backgroundColor: FOREST, color: PARCH }}
          >
            Next: Money Generation →
          </Link>
        </div>

      </div>
    </main>
  )
}
