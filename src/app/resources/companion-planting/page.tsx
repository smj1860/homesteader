"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

type CompanionRow = {
  crop: string
  companions: string[]
  avoid: string[]
  notes: string
}

const COMPANION_DATA: CompanionRow[] = [
  { crop: 'Tomatoes',      companions: ['Basil','Marigolds','Carrots','Parsley','Garlic','Borage','Asparagus'], avoid: ['Fennel','Brassicas','Corn','Potatoes'], notes: 'Basil repels aphids and spider mites and may improve flavor. Marigolds deter nematodes. Keep away from corn (attracts same pests) and potatoes (share blight).' },
  { crop: 'Peppers',       companions: ['Basil','Carrots','Tomatoes','Marigolds','Spinach','Okra'], avoid: ['Fennel','Brassicas'], notes: 'Same family as tomatoes â€” similar companions and pests. Basil and marigolds provide pest suppression.' },
  { crop: 'Cucumbers',     companions: ['Beans','Peas','Sunflowers','Radishes','Dill (young)','Marigolds'], avoid: ['Sage','Potatoes','Melons (same pests)'], notes: 'Beans and peas fix nitrogen. Radishes deter cucumber beetles when interplanted. Dill attracts beneficial insects but avoid mature dill which inhibits cucumber growth.' },
  { crop: 'Squash/Zucchini', companions: ['Corn','Beans','Nasturtiums','Radishes','Borage'], avoid: ['Potatoes','Fennel'], notes: 'Classic Three Sisters companion with corn and beans. Nasturtiums act as trap crop for aphids. Radishes deter squash vine borers.' },
  { crop: 'Beans',         companions: ['Corn','Squash','Carrots','Cucumbers','Marigolds','Rosemary'], avoid: ['Onions','Garlic','Fennel','Beets'], notes: 'Fixes atmospheric nitrogen â€” benefits all neighboring plants. Alliums (onions, garlic) inhibit nitrogen fixation. Core of the Three Sisters guild.' },
  { crop: 'Peas',          companions: ['Carrots','Radishes','Turnips','Mint','Beans','Lettuce'], avoid: ['Onions','Garlic','Leeks'], notes: 'Nitrogen-fixer. Alliums stunt growth. Mint deters aphids but contain it â€” it spreads aggressively.' },
  { crop: 'Corn',          companions: ['Beans','Squash','Cucumber','Sunflowers','Melons'], avoid: ['Tomatoes','Fennel'], notes: 'Three Sisters: beans fix nitrogen corn uses, squash shades ground suppressing weeds and retaining moisture. Tomatoes share pests.' },
  { crop: 'Lettuce',       companions: ['Radishes','Carrots','Strawberries','Chives','Garlic','Tall crops for shade'], avoid: ['Celery','Fennel'], notes: 'Benefits from light shade of taller plants in hot weather â€” plant on north side of tomatoes or beans. Radishes deter leaf miners.' },
  { crop: 'Spinach',       companions: ['Strawberries','Peas','Beans','Brassicas'], avoid: ['Potatoes'], notes: 'Thrives in shade of taller plants. Good ground cover under legumes. Strawberries and spinach are mutually beneficial.' },
  { crop: 'Kale/Brassicas', companions: ['Dill','Marigolds','Nasturtiums','Onions','Garlic','Chamomile','Celery'], avoid: ['Strawberries','Tomatoes','Fennel','Other Brassicas (same pests)'], notes: 'Nasturtiums trap aphids away from kale. Dill attracts parasitic wasps that prey on cabbage worms. Alliums repel pests. Do not cluster brassicas together.' },
  { crop: 'Carrots',       companions: ['Tomatoes','Rosemary','Sage','Onions','Chives','Lettuce','Beans'], avoid: ['Dill','Fennel'], notes: 'Tomatoes shade carrot tops while carrots aerate soil around tomato roots. Rosemary and sage repel carrot fly. Dill inhibits carrot growth.' },
  { crop: 'Radishes',      companions: ['Cucumbers','Squash','Brassicas','Lettuce','Beans'], avoid: ['Hyssop'], notes: 'Excellent trap crop â€” plant around cucumbers and squash to lure cucumber beetles away. Fast growth makes them good row markers for slow crops.' },
  { crop: 'Onions/Garlic', companions: ['Tomatoes','Carrots','Beets','Lettuce','Chamomile','Roses','Fruit trees'], avoid: ['Beans','Peas','Asparagus','Sage'], notes: 'General pest repellent â€” excellent throughout garden. Inhibit nitrogen fixation in legumes so keep away from beans and peas. Garlic near fruit trees deters borers.' },
  { crop: 'Potatoes',      companions: ['Horseradish','Beans','Marigolds','Nasturtiums','Catmint'], avoid: ['Tomatoes','Squash','Cucumbers','Sunflowers','Raspberries'], notes: 'Horseradish planted at corners repels potato beetles. Keep away from all nightshades â€” share blight disease. Sunflowers inhibit potato growth.' },
  { crop: 'Basil',         companions: ['Tomatoes','Peppers','Asparagus','Oregano','Marigolds'], avoid: ['Sage','Fennel'], notes: 'Most powerful near tomatoes â€” repels aphids, spider mites, and tomato hornworm. May improve tomato flavor (widely reported, debated scientifically).' },
  { crop: 'Marigolds',     companions: ['Almost everything (universal companion)'], avoid: ['Beans (in large quantities)'], notes: 'One of the most effective companion plants. Root secretions deter nematodes â€” most effective when grown for a full season then turned in. Also deters whitefly, aphids, and Mexican bean beetle.' },
  { crop: 'Dill',          companions: ['Cucumbers (young dill only)','Cabbages','Lettuce','Onions','Corn'], avoid: ['Carrots','Tomatoes','Fennel (cross-pollinates)'], notes: 'Attracts parasitic wasps, lacewings, and hoverflies that prey on aphids and caterpillars. Allow to flower for maximum beneficial insect attraction. Mature dill inhibits some neighbors.' },
  { crop: 'Nasturtiums',   companions: ['Tomatoes','Cucumbers','Squash','Brassicas','Fruit trees'], avoid: ['â€”'], notes: 'Outstanding trap crop â€” aphids, whiteflies, and squash bugs flock to nasturtiums away from main crops. Edible flowers and leaves. Attracts predatory insects.' },
  { crop: 'Strawberries',  companions: ['Spinach','Lettuce','Beans','Borage','Thyme','Sage'], avoid: ['Brassicas','Fennel'], notes: 'Borage is strawberry\'s best companion â€” deters worms and attracts pollinators. Thyme and sage repel pests. Do not plant near brassicas.' },
  { crop: 'Blueberries',   companions: ['Azaleas','Rhododendrons','Thyme','Basil','Strawberries'], avoid: ['Nightshades','Melons','Anything needing high pH'], notes: 'Require acidic soil (pH 4.5â€“5.5) â€” companions must tolerate same conditions. Acid-loving ornamentals like azaleas are natural neighbors. Thyme and basil may deter blueberry maggot.' },
  { crop: 'Raspberries',   companions: ['Marigolds','Garlic','Tansy','Yarrow'], avoid: ['Potatoes','Tomatoes (verticillium wilt)','Blackberries (same diseases)'], notes: 'Garlic deters aphids and cane borers. Keep away from potatoes and tomatoes which harbor verticillium wilt that devastates raspberries.' },
]

const mechanisms = [
  {
    title: 'Nitrogen Fixation',
    icon: 'ðŸŒ¿',
    desc: 'Legumes (beans, peas, clover) form a symbiotic relationship with Rhizobium bacteria in their root nodules. The bacteria convert atmospheric nitrogen into a form plants can use. When legume roots die, that nitrogen becomes available to neighboring plants. This is the basis of the Three Sisters system â€” beans feed the nitrogen that corn demands.',
    examples: 'Beans, peas, clover, vetch, lupins',
  },
  {
    title: 'Pest Deterrence (Chemical)',
    icon: 'ðŸ›¡',
    desc: 'Many plants release volatile compounds or root secretions that confuse, repel, or deter pest insects. Marigolds (Tagetes species) release alpha-terthienyl from their roots, which is toxic to nematodes. Alliums (garlic, onions, chives) emit sulfur compounds that repel a wide range of insects. Basil emits linalool and estragole which deter aphids and spider mites.',
    examples: 'Marigolds (nematodes), garlic (general repellent), basil (aphids/mites), lavender (moths), mint (aphids)',
  },
  {
    title: 'Trap Cropping',
    icon: 'ðŸª¤',
    desc: 'Some plants are so attractive to specific pests that they can be used as sacrificial plants to lure pests away from your main crop. The trap crop is then removed or treated without harming your primary plants. This is a physical pest management strategy rather than a chemical one.',
    examples: 'Nasturtiums (aphids, whitefly), radishes (cucumber beetles, flea beetles), dill (tomato hornworm)',
  },
  {
    title: 'Beneficial Insect Attraction',
    icon: 'ðŸ¦‹',
    desc: 'Parasitic wasps, predatory beetles, lacewings, and hoverflies are natural predators of common garden pests. Many of them also require nectar and pollen as adults â€” they hunt pests but feed on flowers. Planting flowering herbs and companion plants nearby creates a habitat that attracts and retains these allies.',
    examples: 'Dill, fennel, yarrow (parasitic wasps), marigolds (hoverflies), borage (predatory insects + pollinators)',
  },
  {
    title: 'Allelopathy',
    icon: 'âš—ï¸',
    desc: 'Allelopathy is the chemical suppression of one plant\'s growth by another. Some plants release compounds that inhibit germination or growth of neighboring plants. This can work against you (fennel inhibits almost everything nearby) or for you (marigold root secretions suppress weed germination). Understanding allelopathy explains many of the "keep away" relationships.',
    examples: 'Fennel (inhibits most plants), black walnut (juglone toxin), sunflowers (inhibit potatoes and some beans)',
  },
  {
    title: 'Physical Structure & Microclimate',
    icon: 'ðŸ—',
    desc: 'Tall plants provide shade for heat-sensitive neighbors. Low ground-cover plants suppress weeds and retain soil moisture beneath taller crops. Dense-leaved plants create humidity. Trellised crops create vertical growing opportunities below them. The Three Sisters system leverages all of this â€” corn provides structure for beans to climb, squash leaves shade the ground to retain moisture and suppress weeds.',
    examples: 'Three Sisters (corn/beans/squash), lettuce under tomatoes, nasturtiums as living mulch',
  },
  {
    title: 'Root Interaction',
    icon: 'ðŸŒ±',
    desc: 'Different plants have different root depths â€” deep-rooted plants bring up minerals from lower soil layers that shallow-rooted plants can then access. Some root structures also break up compacted layers, improving drainage and aeration for everything nearby. Carrots planted near tomatoes are thought to benefit from this â€” carrot roots aerate the soil around tomato roots.',
    examples: 'Deep-rooted comfrey (dynamic accumulator), carrots near tomatoes, daikon radish as tillage radish',
  },
  {
    title: 'Pollination Support',
    icon: 'ðŸ',
    desc: 'Crops that require pollination â€” squash, cucumbers, melons, beans, tomatoes â€” produce more reliably when pollinator populations are healthy. Flowering companion plants that bloom over a long season attract and retain pollinators in the garden. This is especially critical for cucumbers and squash which are pollinated almost exclusively by bees.',
    examples: 'Borage (bees), lavender (bees and butterflies), marigolds (general pollinators), phacelia (bees)',
  },
]

export default function CompanionPlantingPage() {
  const [search, setSearch] = useState('')

  const filtered = COMPANION_DATA.filter(r =>
    r.crop.toLowerCase().includes(search.toLowerCase()) ||
    r.companions.some(c => c.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen pb-24 pt-20" style={{ backgroundColor: PARCH }}>
      <Navigation />

      <main className="container mx-auto max-w-6xl px-4 pt-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: `${FOREST}88` }}>
          <Link href="/homesteading" style={{ color: `${FOREST}88` }} className="hover:underline">Homesteading</Link>
          <span>/</span>
          <Link href="/resources" style={{ color: `${FOREST}88` }} className="hover:underline">Resources</Link>
          <span>/</span>
          <span style={{ color: FOREST }}>Companion Planting</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2" style={{ color: FOREST }}>
            Companion Planting
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: `${FOREST}99` }}>
            What to plant together, what to keep apart, and the science behind why it works.
            Quick reference chart first â€” detailed mechanisms below.
          </p>
        </div>

        {/* Three Sisters callout */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ backgroundColor: FOREST }}
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl shrink-0">ðŸŒ½</span>
            <div>
              <h2 className="font-serif text-xl font-bold mb-2" style={{ color: GOLD }}>
                The Three Sisters â€” The Most Famous Companion Guild
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: `${PARCH}cc` }}>
                Developed by Indigenous North American peoples over centuries, the Three Sisters is the most well-documented companion planting system in agricultural history.
                Corn, beans, and squash are planted together in mounds â€” each supporting the others.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {[
                  { name: 'Corn', role: 'The Structure', desc: 'Provides tall stalks for beans to climb. Demands nitrogen from soil.' },
                  { name: 'Beans', role: 'The Engine', desc: 'Fixes atmospheric nitrogen, replenishing what corn depletes. Climbs corn stalks.' },
                  { name: 'Squash', role: 'The Ground Cover', desc: 'Large leaves shade soil, suppressing weeds and locking in moisture. Deters pests with rough leaf texture.' },
                ].map(({ name, role, desc }) => (
                  <div key={name} className="rounded-lg p-3" style={{ backgroundColor: `${PARCH}12` }}>
                    <div className="font-bold mb-0.5" style={{ color: GOLD }}>{name} â€” {role}</div>
                    <div style={{ color: `${PARCH}aa` }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search + print */}
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: `${FOREST}66` }} />
            <input
              type="text"
              placeholder="Search by crop or companion..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg pl-9 pr-3 py-2 text-sm outline-none"
              style={{ backgroundColor: PARCH2, border: `1.5px solid ${FOREST}20`, color: FOREST }}
            />
          </div>
          <button
            onClick={() => window.print()}
            className="rounded-lg px-4 py-2 text-sm font-semibold hidden md:block"
            style={{ backgroundColor: `${FOREST}15`, color: FOREST, border: `1.5px solid ${FOREST}25` }}
          >
            ðŸ–¨ Print
          </button>
        </div>

        {/* Quick Reference Table */}
        <div className="rounded-xl overflow-hidden mb-12" style={{ border: `1.5px solid ${FOREST}20` }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: FOREST }}>
                  <th className="text-left px-4 py-3 font-semibold w-32" style={{ color: PARCH }}>Crop</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: PARCH }}>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400" /> Good Companions
                    </span>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: PARCH }}>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400" /> Keep Away
                    </span>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold hidden xl:table-cell" style={{ color: PARCH }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row.crop}
                    style={{ backgroundColor: i % 2 === 0 ? PARCH : PARCH2, borderBottom: `1px solid ${FOREST}12` }}
                  >
                    <td className="px-4 py-3 font-semibold" style={{ color: FOREST }}>{row.crop}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.companions.map(c => (
                          <span key={c} className="inline-block rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: '#16a34a18', color: '#15803d', border: '1px solid #16a34a30' }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.avoid.map(a => (
                          <span key={a} className="inline-block rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: '#dc262618', color: '#b91c1c', border: '1px solid #dc262630' }}>
                            {a}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs hidden xl:table-cell" style={{ color: `${FOREST}88` }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Divider */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: FOREST }}>
            Why It Works â€” The Mechanisms
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: `${FOREST}88` }}>
            Companion planting isn&apos;t gardening superstition. Most of the well-documented pairings have real, explainable mechanisms behind them.
          </p>
        </div>

        {/* Mechanisms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {mechanisms.map(({ title, icon, desc, examples }) => (
            <div key={title} className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
              <h3 className="font-serif font-bold mb-2 flex items-center gap-2" style={{ color: FOREST }}>
                <span>{icon}</span> {title}
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: `${FOREST}cc` }}>{desc}</p>
              <p className="text-xs" style={{ color: `${FOREST}88` }}>
                <strong style={{ color: FOREST }}>Examples:</strong> {examples}
              </p>
            </div>
          ))}
        </div>

        {/* General principles */}
        <div className="rounded-xl p-6 mb-10" style={{ backgroundColor: FOREST }}>
          <h2 className="font-serif text-xl font-bold mb-4" style={{ color: PARCH }}>
            General Principles
          </h2>
          <div className="space-y-3">
            {[
              ['Diversity is the point', 'A monoculture (all the same crop) is a feast for any pest that targets that crop. Diversity confuses pests, attracts a wider range of beneficial insects, and builds soil health through varied root and leaf chemistry.'],
              ['Fennel is a difficult neighbor', 'Fennel inhibits growth of most vegetables through allelopathy. Grow it in containers or its own dedicated bed, away from the main garden.'],
              ['Not all companion effects are dramatic', 'Some pairings show strong evidence (marigolds and nematodes). Others show modest or inconsistent results depending on conditions. Treat companion planting as an additional layer of strategy, not a guaranteed solution.'],
              ['Rotate companions with your crops', 'Companion planting should be combined with crop rotation â€” moving plant families to different beds each season â€” for best pest and disease management.'],
            ].map(([title, body]) => (
              <div key={String(title)} className="flex gap-3 items-start">
                <span style={{ color: GOLD, fontWeight: 700, marginTop: 2 }}>â†’</span>
                <span className="text-sm leading-relaxed" style={{ color: `${PARCH}cc` }}>
                  <strong style={{ color: PARCH }}>{title}: </strong>{body}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/resources" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: `${FOREST}88` }}>
          <ArrowLeft className="h-4 w-4" /> All Resources
        </Link>

      </main>
    </div>
  )
}
