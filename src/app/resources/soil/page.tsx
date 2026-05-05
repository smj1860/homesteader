"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

const TABS = ['Amendments', 'Soil Mixes', 'Deficiencies', 'pH Guide']

export default function SoilResourcePage() {
  const [tab, setTab] = useState('Amendments')

  return (
    <div className="min-h-screen pb-24 pt-20" style={{ backgroundColor: PARCH }}>
      <Navigation />

      <main className="container mx-auto max-w-5xl px-4 pt-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: `${FOREST}88` }}>
          <Link href="/homesteading" style={{ color: `${FOREST}88` }} className="hover:underline">Homesteading</Link>
          <span>/</span>
          <Link href="/resources" style={{ color: `${FOREST}88` }} className="hover:underline">Resources</Link>
          <span>/</span>
          <span style={{ color: FOREST }}>Soil & Amendments</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2" style={{ color: FOREST }}>
            Soil &amp; Amendments
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: `${FOREST}99` }}>
            A complete soil reference — amendments and what they do, proven mix recipes for every context,
            how to identify and fix nutrient deficiencies, and why pH controls everything.
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex rounded-xl overflow-hidden mb-8" style={{ border: `1.5px solid ${FOREST}20` }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2.5 text-sm font-semibold transition-colors"
              style={tab === t
                ? { backgroundColor: FOREST, color: PARCH }
                : { backgroundColor: 'transparent', color: `${FOREST}88` }
              }
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── AMENDMENTS TAB ─────────────────────────────────────────────────── */}
        {tab === 'Amendments' && (
          <div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: `${FOREST}99` }}>
              Soil amendments change the physical structure, chemistry, or biology of your soil.
              Knowing what each one does — and when to use it — prevents expensive mistakes.
            </p>

            {[
              {
                category: 'Organic Matter & Compost',
                color: '#16a34a',
                items: [
                  { name: 'Compost (homemade or municipal)', what: 'Adds organic matter, feeds soil biology, improves drainage in clay, improves water retention in sand. The most universally beneficial amendment.', rate: '2–4 inches worked in annually, or as needed', when: 'Spring before planting, fall after harvest' },
                  { name: 'Aged Manure', what: 'High nitrogen, improves structure, feeds microbial life. Must be fully composted before use — fresh manure burns plants and carries pathogens.', rate: '1–3 inches worked in', when: 'Fall application preferred — composting continues over winter' },
                  { name: 'Coop Litter (composted chicken litter)', what: 'Superior to bagged manure — higher nutrient density (especially nitrogen and phosphorus), richer microbial population, more diverse biology. Use over purchased manure whenever you have access to it. Also superior to mushroom compost for nitrogen content.', rate: '1–2 inches worked in', when: 'Compost for 90+ days before use. Do not apply fresh to edible crops.' },
                  { name: 'Mushroom Compost', what: 'Byproduct of mushroom farming — spent mycelium substrate. Excellent if coop litter is unavailable. High in calcium, improves water retention, adds fungal networks to soil. Slightly alkaline — not ideal for acid-loving plants.', rate: '2–3 inches worked in', when: 'Spring or fall' },
                  { name: 'Worm Castings', what: 'The highest-quality, most biologically active compost available. Exceptional for containers and seedling mixes. Expensive at scale but worth it for high-value applications.', rate: '10–25% by volume in mixes, or 1 inch as top dressing', when: 'At planting or as tea drench anytime' },
                  { name: 'Peat Moss', what: 'Excellent water retention, slightly acidic. Sustainable concerns — slow to regenerate. Coir is a more sustainable alternative for most uses.', rate: '25–30% by volume in mixes', when: 'Mix into potting media or raised bed mix' },
                  { name: 'Coir (Coconut Fiber)', what: 'Sustainable alternative to peat. Similar water retention, neutral pH, excellent aeration. Better drainage than peat.', rate: '20–30% by volume in mixes', when: 'Mix into potting or raised bed mixes' },
                ]
              },
              {
                category: 'Drainage & Aeration',
                color: '#2563eb',
                items: [
                  { name: 'Perlite', what: 'Volcanic glass expanded by heat. Improves drainage and aeration, never breaks down, pH neutral. Non-negotiable in container mixes. Prevents compaction over time in raised beds.', rate: '10–20% by volume in raised beds; 20–30% in containers', when: 'Mix into media at setup — add more to existing beds as top dressing worked in' },
                  { name: 'Vermiculite', what: 'Mica mineral expanded by heat. Better water and nutrient retention than perlite but less drainage. Better for seedling mixes. Perlite is preferred for mature garden beds.', rate: '10–20% by volume in seedling or seed-starting mixes', when: 'Seedling mixes, not primary garden mixes' },
                  { name: 'Coarse Sand', what: 'Improves drainage in clay soils. Must be coarse/horticultural sand — fine sand (play sand or beach sand) compacts with clay and creates concrete-like conditions.', rate: '25–30% for clay amendment, 10–15% in general mixes', when: 'Mix into heavy clay soils to improve drainage' },
                  { name: 'Biochar', what: 'Charcoal created by pyrolysis of organic material. Improves water retention, increases cation exchange capacity (CEC), provides long-term carbon storage. Charge with compost or fertilizer before use — raw biochar absorbs nutrients from soil temporarily.', rate: '5–10% by volume', when: 'Mix in at planting. Effects build over multiple seasons.' },
                ]
              },
              {
                category: 'Nutrients & Fertilizers',
                color: GOLD,
                items: [
                  { name: 'Blood Meal', what: 'Very high nitrogen (12–13%). Fast release. Use sparingly — easy to over-apply. Deters deer.', rate: '1–2 lbs per 100 sq ft', when: 'Early spring when nitrogen is needed fast. Not for fall application.' },
                  { name: 'Bone Meal', what: 'High phosphorus (15–27%) and calcium. Promotes root development, flowering, and fruiting. Slow release.', rate: '2–4 lbs per 100 sq ft', when: 'At planting for root crops, bulbs, and fruiting plants' },
                  { name: 'Kelp Meal', what: 'Full spectrum of trace minerals, natural growth hormones (cytokinins), improves stress resistance. Low NPK but excellent as a supplement for micronutrients.', rate: '1–2 lbs per 100 sq ft', when: 'Spring at planting or as foliar spray (kelp extract)' },
                  { name: 'Greensand', what: 'Mined marine sediment. Very slow-release potassium and trace minerals. Excellent long-term soil builder — can take a full season to show effects.', rate: '5–10 lbs per 100 sq ft', when: 'Fall application preferred for spring benefit' },
                  { name: 'Fish Emulsion', what: 'Fast-acting liquid nitrogen with trace minerals. Excellent as a quick feed mid-season. Distinctive smell — normal and temporary.', rate: 'Dilute 2–3 tbsp per gallon water, apply as drench', when: 'Mid-season boost for heavy feeders (corn, tomatoes, leafy greens)' },
                ]
              },
              {
                category: 'pH Adjustment',
                color: '#7c3aed',
                items: [
                  { name: 'Agricultural Lime (Calcitic)', what: 'Raises pH in acidic soils. Also adds calcium. Slow-acting — apply months ahead of planting season for best results.', rate: '5–10 lbs per 100 sq ft to raise pH by ~1 point (varies by soil type)', when: 'Fall application for spring gardens' },
                  { name: 'Dolomitic Lime', what: 'Raises pH and adds both calcium and magnesium. Use when magnesium deficiency is also present. Do not overuse if soil already has adequate magnesium.', rate: '5–10 lbs per 100 sq ft', when: 'Fall application' },
                  { name: 'Wood Ash', what: 'Raises pH. Also adds potassium and calcium. Fast-acting compared to lime. Do not use near acid-loving plants. Use sparingly — easy to over-alkalinize.', rate: '5–10 lbs per 100 sq ft — less is more', when: 'Spring or fall, not in contact with seeds or seedlings' },
                  { name: 'Elemental Sulfur', what: 'Lowers pH in alkaline soils. Soil bacteria convert it to sulfuric acid over weeks to months — plan ahead. Best long-term solution for acidifying soil.', rate: '1–2 lbs per 100 sq ft to lower pH by ~1 point', when: 'Fall application for spring effect' },
                  { name: 'Pine Bark / Pine Needles', what: 'Mildly lowers pH over time. Excellent mulch for blueberries, azaleas, and acid-loving plants. More moderate and slower than elemental sulfur.', rate: '2–4 inch mulch layer', when: 'Any time as mulch. Decomposes slowly — reapply as needed.' },
                  { name: 'Coffee Grounds', what: 'Slightly acidic (pH 6.0–6.5, not as acidic as often claimed). Better contribution is nitrogen and organic matter than pH shift. Good addition to compost.', rate: 'Mix into compost or apply as ¼ inch layer around acid-loving plants', when: 'Any time — do not apply thick layers, molds easily' },
                ]
              },
            ].map(({ category, color, items }) => (
              <div key={category} className="mb-8">
                <h2
                  className="font-serif text-xl font-bold mb-3 pb-2"
                  style={{ color: FOREST, borderBottom: `2px solid ${color}40` }}
                >
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map(({ name, what, rate, when }) => (
                    <div key={name} className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
                      <h3 className="font-semibold mb-1.5" style={{ color: FOREST }}>{name}</h3>
                      <p className="text-sm leading-relaxed mb-2" style={{ color: `${FOREST}cc` }}>{what}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg px-3 py-1.5" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}25` }}>
                          <span className="font-bold" style={{ color }}>Rate: </span>
                          <span style={{ color: `${FOREST}99` }}>{rate}</span>
                        </div>
                        <div className="rounded-lg px-3 py-1.5" style={{ backgroundColor: `${FOREST}08`, border: `1px solid ${FOREST}15` }}>
                          <span className="font-bold" style={{ color: FOREST }}>When: </span>
                          <span style={{ color: `${FOREST}99` }}>{when}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SOIL MIXES TAB ─────────────────────────────────────────────────── */}
        {tab === 'Soil Mixes' && (
          <div className="space-y-8">
            <p className="text-sm leading-relaxed" style={{ color: `${FOREST}99` }}>
              Proven mix recipes for three growing contexts. Ratios are by volume. For a quick note on sourcing:
              if you have access to composted coop litter, use it in place of purchased manure or mushroom compost
              wherever those appear — coop litter is superior in nitrogen content and biological diversity.
              Similarly, if you have your own mushroom compost, it outperforms most bagged alternatives.
            </p>

            {/* SteadCraft raised bed mix — featured */}
            <div className="rounded-2xl overflow-hidden" style={{ border: `2.5px solid ${GOLD}` }}>
              <div className="px-5 py-3 flex items-center justify-between" style={{ backgroundColor: GOLD }}>
                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#1a1a1a' }}>
                  ★ SteadCraft Raised Bed Mix — Our Personal Go-To
                </span>
              </div>
              <div className="p-5" style={{ backgroundColor: PARCH2 }}>
                <p className="text-sm mb-4" style={{ color: `${FOREST}99` }}>
                  This is the mix we use. Four components, each with a specific role.
                  Together they produce loose, biologically rich, well-draining soil that gets better every season.
                </p>
                <div className="space-y-3 mb-4">
                  {[
                    { ratio: '4 Parts', role: 'The Base', product: 'Miracle-Gro Performance Organics', why: 'High-quality organic base that provides mineral structure and initial nutrient load without harsh synthetic salts.' },
                    { ratio: '3 Parts', role: 'The Lung', product: 'Soil Conditioner', why: 'Aerates the mix so roots can breathe. Prevents the bed from compacting into a brick over time and through seasons.' },
                    { ratio: '2 Parts', role: 'The Engine', product: 'Black Kow + Mushroom Compost (50/50) — or composted coop litter', why: 'The biological fuel. Black Kow adds aged manure with nitrogen-fixing bacteria. Mushroom compost adds calcium and fungal life. Coop litter is superior to both if you have it.' },
                    { ratio: '1 Part', role: 'The Filter', product: 'Vigoro Perlite', why: 'Improves drainage, prevents waterlogging after heavy rain, and keeps oxygen flowing to roots through the whole growing season.' },
                  ].map(({ ratio, role, product, why }) => (
                    <div key={role} className="rounded-lg p-3 flex gap-3" style={{ backgroundColor: `${FOREST}0a` }}>
                      <div className="shrink-0 text-right w-16">
                        <div className="text-xs font-bold" style={{ color: GOLD }}>{ratio}</div>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: GOLD }}>{role}</span>
                          <span className="text-sm font-semibold" style={{ color: FOREST }}>{product}</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: `${FOREST}88` }}>{why}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs" style={{ color: `${FOREST}77` }}>
                  Mix thoroughly before filling beds. Refresh each season by top-dressing with 1–2 inches of compost or coop litter — no need to replace the full mix annually.
                </p>
              </div>
            </div>

            {/* Container mix */}
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${FOREST}25` }}>
              <div className="px-5 py-3" style={{ backgroundColor: FOREST }}>
                <span className="text-sm font-semibold" style={{ color: PARCH }}>Container &amp; Pot Mix</span>
              </div>
              <div className="p-5" style={{ backgroundColor: PARCH2 }}>
                <p className="text-sm mb-4" style={{ color: `${FOREST}99` }}>
                  Container mixes must drain faster and be lighter than raised bed mixes. Pots have no drainage escape — waterlogging and root rot are real risks.
                  Never use straight garden soil or raised bed mix in containers.
                </p>
                <div className="space-y-3 mb-4">
                  {[
                    { tier: 'Balanced (Quality + Cost)', ratio: '50% quality potting mix / 30% perlite / 20% worm castings', why: 'FoxFarm Ocean Forest or Miracle-Gro Performance Organics as the base. Perlite is non-negotiable for drainage. Worm castings are lighter and more concentrated than bagged compost — ideal for containers.' },
                    { tier: 'Budget Mix', ratio: '60% store-brand potting mix / 30% perlite / 10% any compost', why: 'The cheap potting mix alone compacts badly and holds too much water. The perlite addition is what makes this work. Do not skip it.' },
                  ].map(({ tier, ratio, why }) => (
                    <div key={tier} className="rounded-lg p-4" style={{ backgroundColor: `${FOREST}08`, border: `1px solid ${FOREST}18` }}>
                      <div className="font-semibold text-sm mb-1.5" style={{ color: FOREST }}>{tier}</div>
                      <div className="font-mono text-xs mb-2 rounded px-2 py-1 inline-block" style={{ backgroundColor: `${GOLD}15`, color: FOREST }}>{ratio}</div>
                      <p className="text-xs leading-relaxed" style={{ color: `${FOREST}88` }}>{why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* In-ground */}
            <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${FOREST}25` }}>
              <div className="px-5 py-3" style={{ backgroundColor: FOREST }}>
                <span className="text-sm font-semibold" style={{ color: PARCH }}>In-Ground Improvement</span>
              </div>
              <div className="p-5" style={{ backgroundColor: PARCH2 }}>
                <p className="text-sm mb-4" style={{ color: `${FOREST}99` }}>
                  You don&apos;t replace in-ground soil — you build it over time. Consistent organic matter additions over 2–3 seasons transform almost any suburban soil into a productive growing medium.
                </p>
                <div className="space-y-2">
                  {[
                    { soil: 'Clay soil', fix: 'Add coarse sand + compost in equal parts (not fine sand — creates concrete). Work in 3–4 inches at a time. Takes 2–3 seasons of amendment to become fully workable.' },
                    { soil: 'Sandy soil', fix: 'Add compost heavily — 3–4 inches worked in each season. Sandy soil is nutrient-poor and does not hold water. Compost fixes both problems.' },
                    { soil: 'Compacted soil', fix: 'Fork deeply with a broadfork or digging fork to break structure before adding amendments. Lift and loosen — do not invert layers.' },
                    { soil: 'Average suburban soil', fix: 'Top-dress with 2 inches of compost or coop litter each spring and fall. Work in lightly. Consistent annual additions build an excellent growing medium within 2–3 years.' },
                  ].map(({ soil, fix }) => (
                    <div key={soil} className="rounded-lg p-3 flex gap-3" style={{ backgroundColor: `${FOREST}08` }}>
                      <span className="font-bold text-xs w-24 shrink-0 mt-0.5" style={{ color: GOLD }}>{soil}</span>
                      <span className="text-xs leading-relaxed" style={{ color: `${FOREST}cc` }}>{fix}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DEFICIENCIES TAB ───────────────────────────────────────────────── */}
        {tab === 'Deficiencies' && (
          <div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: `${FOREST}99` }}>
              Nutrient deficiencies are often misdiagnosed — the symptoms below overlap with other problems
              (pests, disease, overwatering). When in doubt, get a soil test before spending money on amendments.
              A $15–25 test from your county extension office identifies exactly what&apos;s missing.
            </p>

            <div className="space-y-5">
              {[
                {
                  nutrient: 'Nitrogen (N)', role: 'Leaf and stem growth, green color, protein production',
                  symptoms: [
                    'Yellowing that starts on older (lower) leaves first and moves upward — this upward progression is the key indicator',
                    'Overall pale green or yellow-green color across the whole plant',
                    'Stunted, slow growth',
                    'Small leaves',
                    'Premature leaf drop starting from bottom',
                  ],
                  causes: 'Leached by heavy rain, low organic matter, compacted soil limiting root uptake, cold soil (slows microbial activity that releases nitrogen)',
                  fixes: ['Blood meal — fastest nitrogen source, apply immediately', 'Fish emulsion drench — quick and gentle', 'Compost or coop litter top dress — slower but longer lasting', 'Cover crops (legumes) turned in — long-term building'],
                  note: 'Nitrogen is the most commonly deficient nutrient. It moves through soil quickly, especially in sandy or heavily watered beds.',
                },
                {
                  nutrient: 'Phosphorus (P)', role: 'Root development, flowering, fruiting, energy transfer',
                  symptoms: [
                    'Purplish or reddish-purple color on undersides of leaves and stems — especially visible in cool weather',
                    'Dark green leaves that then turn purple (distinguishes from nitrogen which yellows)',
                    'Delayed maturity — plants take longer to flower and fruit',
                    'Weak root systems',
                    'Poor seed germination',
                  ],
                  causes: 'Cold soil (phosphorus uptake shuts down below 55°F), acidic soil below pH 6 locks phosphorus out, overwatering, compaction',
                  fixes: ['Bone meal — high phosphorus, slow release, ideal at planting', 'Rock phosphate — very slow release, long-term fix', 'Warm the soil — many "deficiencies" resolve when temperature rises', 'Adjust pH into the 6.0–7.0 range where phosphorus is most available'],
                  note: 'Cold temperature phosphorus lockout is often mistaken for a true deficiency. If you see purple leaves in spring, wait for soil to warm before amending.',
                },
                {
                  nutrient: 'Potassium (K)', role: 'Water regulation, disease resistance, fruit and root quality',
                  symptoms: [
                    'Brown scorched edges and tips on leaves — "leaf scorch" — beginning on older leaves',
                    'Yellowing between the veins (interveinal chlorosis) with green veins remaining visible',
                    'Weak stems that lodge or fall over',
                    'Poor fruit quality — bland flavor, poor storage',
                    'Increased susceptibility to disease and drought',
                  ],
                  causes: 'Sandy soils (potassium leaches easily), acidic soil, excess calcium or magnesium competing for uptake',
                  fixes: ['Greensand — slow but long-lasting potassium source', 'Wood ash — fast acting, use carefully (also raises pH)', 'Kelp meal — potassium plus trace minerals', 'Compost — moderate potassium plus improved overall soil health'],
                  note: 'Potassium deficiency is often missed because it starts at the leaf margins and is sometimes confused with drought stress or pest damage.',
                },
                {
                  nutrient: 'Calcium (Ca)', role: 'Cell wall integrity, root tip development, fruit development',
                  symptoms: [
                    'Blossom end rot on tomatoes, peppers, squash — dark, sunken, leathery patch at the base of fruit',
                    'Tip burn on inner leaves of lettuce and cabbage (new growth affected, not old growth — opposite of nitrogen)',
                    'Distorted, cupped, or crinkled new leaves',
                    'Stunted, dead root tips',
                    'Hollow stems in brassicas',
                  ],
                  causes: 'Irregular watering (most common cause — calcium is water-transported, inconsistent moisture means inconsistent delivery), acidic soil, high humidity, excess potassium or magnesium blocking uptake',
                  fixes: ['Consistent watering — most blossom end rot resolves with even moisture, not calcium amendments', 'Agricultural lime or gypsum — adds calcium without affecting pH (gypsum) or raises pH (lime)', 'Crushed eggshells — very slow but free if you have them', 'Foliar calcium spray (calcium chloride or calcium nitrate) for fast response'],
                  note: 'Blossom end rot is almost always a watering consistency problem, not a calcium-deficient soil. Test your soil before adding calcium amendments.',
                },
              ].map(({ nutrient, role, symptoms, causes, fixes, note }) => (
                <div key={nutrient} className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${FOREST}20` }}>
                  <div className="px-5 py-3" style={{ backgroundColor: FOREST }}>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-base" style={{ color: PARCH }}>{nutrient}</span>
                      <span className="text-xs" style={{ color: `${PARCH}88` }}>{role}</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-4" style={{ backgroundColor: PARCH2 }}>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: `${FOREST}88` }}>What It Looks Like</h4>
                      <ul className="space-y-1.5">
                        {symptoms.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: `${FOREST}cc` }}>
                            <span style={{ color: '#dc2626', fontWeight: 700, marginTop: 1 }}>•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: `${FOREST}88` }}>Common Causes</h4>
                      <p className="text-sm" style={{ color: `${FOREST}cc` }}>{causes}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: `${FOREST}88` }}>Organic Fixes</h4>
                      <ul className="space-y-1">
                        {fixes.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: `${FOREST}cc` }}>
                            <span style={{ color: GOLD, fontWeight: 700 }}>→</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg p-3" style={{ backgroundColor: `${GOLD}12`, border: `1px solid ${GOLD}25` }}>
                      <p className="text-xs" style={{ color: `${FOREST}cc` }}>
                        <strong style={{ color: GOLD }}>Note: </strong>{note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── pH GUIDE TAB ────────────────────────────────────────────────────── */}
        {tab === 'pH Guide' && (
          <div className="space-y-8">

            {/* Why pH matters */}
            <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: FOREST }}>Why pH Controls Everything</h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: `${FOREST}cc` }}>
                Soil pH is a measure of acidity or alkalinity on a scale of 1–14. Seven is neutral.
                Below 7 is acidic. Above 7 is alkaline. Most garden plants thrive in the 6.0–7.0 range.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: `${FOREST}cc` }}>
                pH matters because it controls <strong style={{ color: FOREST }}>nutrient availability</strong>.
                Even if your soil is full of nutrients, the wrong pH locks them out entirely.
                Phosphorus, for example, is almost completely unavailable below pH 5.5 or above pH 7.5.
                Iron becomes toxic in very acidic soil. Molybdenum is only available in neutral to alkaline conditions.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: `${FOREST}cc` }}>
                This is why adding fertilizer to a plant with a pH problem rarely works —
                the plant can&apos;t access what&apos;s already there. Fix pH first, then fertilize.
              </p>

              {/* pH nutrient availability visual */}
              <div className="mt-4 rounded-lg p-4" style={{ backgroundColor: `${FOREST}0a` }}>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: `${FOREST}88` }}>Optimal pH for Nutrient Availability</h3>
                <div className="space-y-1.5 text-xs">
                  {[
                    { nutrient: 'Nitrogen, Phosphorus, Potassium', best: '6.0–7.0', worst: 'Below 5.5 or above 7.5' },
                    { nutrient: 'Calcium, Magnesium', best: '6.5–8.5', worst: 'Below 5.5' },
                    { nutrient: 'Iron, Manganese, Zinc, Copper', best: '5.0–7.0', worst: 'Above 7.5 (locked out)' },
                    { nutrient: 'Boron', best: '5.0–7.0', worst: 'Above 7.5' },
                    { nutrient: 'Molybdenum', best: '6.5–8.0', worst: 'Below 5.5' },
                  ].map(({ nutrient, best, worst }) => (
                    <div key={nutrient} className="flex items-center gap-3">
                      <span className="w-44 shrink-0" style={{ color: FOREST }}>{nutrient}</span>
                      <span className="rounded px-2 py-0.5" style={{ backgroundColor: '#16a34a18', color: '#15803d' }}>Best: {best}</span>
                      <span className="rounded px-2 py-0.5" style={{ backgroundColor: '#dc262618', color: '#b91c1c' }}>Problem: {worst}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How to adjust */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${FOREST}25` }}>
                <div className="px-4 py-3 text-center" style={{ backgroundColor: '#16a34a' }}>
                  <span className="text-sm font-bold" style={{ color: '#f0fdf4' }}>Raising pH (Making More Alkaline)</span>
                </div>
                <div className="p-4" style={{ backgroundColor: PARCH2 }}>
                  <p className="text-xs mb-3" style={{ color: `${FOREST}88` }}>Use when soil is too acidic (pH below 6.0 for most crops)</p>
                  {[
                    { method: 'Agricultural Lime (calcitic)', speed: 'Slow (3–6 months)', notes: 'Standard choice. Apply fall for spring effect.' },
                    { method: 'Dolomitic Lime', speed: 'Slow (3–6 months)', notes: 'Use if magnesium is also low.' },
                    { method: 'Wood Ash', speed: 'Fast (2–4 weeks)', notes: 'Use sparingly — easy to over-apply.' },
                    { method: 'Oyster Shell Flour', speed: 'Slow', notes: 'Gentle, long-lasting calcium and pH raise.' },
                  ].map(({ method, speed, notes }) => (
                    <div key={method} className="mb-2.5">
                      <div className="font-semibold text-xs" style={{ color: FOREST }}>{method}</div>
                      <div className="text-xs" style={{ color: `${FOREST}88` }}>⏱ {speed} · {notes}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${FOREST}25` }}>
                <div className="px-4 py-3 text-center" style={{ backgroundColor: '#dc2626' }}>
                  <span className="text-sm font-bold" style={{ color: '#fff1f2' }}>Lowering pH (Making More Acidic)</span>
                </div>
                <div className="p-4" style={{ backgroundColor: PARCH2 }}>
                  <p className="text-xs mb-3" style={{ color: `${FOREST}88` }}>Use when soil is too alkaline (pH above 7.0, or for blueberries needing 4.5–5.5)</p>
                  {[
                    { method: 'Elemental Sulfur', speed: 'Slow (1–3 months)', notes: 'Most effective long-term solution. Bacteria convert it to acid.' },
                    { method: 'Acidic Fertilizers (ammonium sulfate)', speed: 'Moderate', notes: 'Fertilizes and acidifies simultaneously.' },
                    { method: 'Pine Bark Mulch', speed: 'Very slow', notes: 'Gentle, ideal for blueberry beds as mulch.' },
                    { method: 'Coffee Grounds', speed: 'Very slow', notes: 'Mild effect — better as compost addition than soil amendment.' },
                  ].map(({ method, speed, notes }) => (
                    <div key={method} className="mb-2.5">
                      <div className="font-semibold text-xs" style={{ color: FOREST }}>{method}</div>
                      <div className="text-xs" style={{ color: `${FOREST}88` }}>⏱ {speed} · {notes}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Plant pH preference lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${FOREST}25` }}>
                <div className="px-4 py-3" style={{ backgroundColor: FOREST }}>
                  <span className="text-sm font-bold" style={{ color: GOLD }}>Acid-Loving Plants (pH 4.5–6.0)</span>
                </div>
                <div className="p-4" style={{ backgroundColor: PARCH2 }}>
                  <div className="space-y-2">
                    {[
                      { plant: 'Blueberries', ph: '4.5–5.5', note: 'Strict — will not thrive outside this range' },
                      { plant: 'Azaleas & Rhododendrons', ph: '4.5–6.0', note: 'Chlorosis and death above pH 6.5' },
                      { plant: 'Potatoes', ph: '4.8–5.5', note: 'Lower pH also suppresses scab disease' },
                      { plant: 'Strawberries', ph: '5.5–6.0', note: 'Moderate acid preference' },
                      { plant: 'Raspberries', ph: '5.5–6.5', note: 'Fence-sitter but leans acidic' },
                      { plant: 'Eggplant', ph: '5.5–6.5', note: 'Slight acid preference' },
                      { plant: 'Peppers', ph: '5.5–6.5', note: 'Slight acid preference' },
                      { plant: 'Sweet potatoes', ph: '5.5–6.0', note: 'Performs better in acid soil' },
                      { plant: 'Rhubarb', ph: '5.5–6.5', note: 'Tolerant but prefers slightly acid' },
                      { plant: 'Parsley', ph: '5.0–7.0', note: 'Wide tolerance, leans slightly acid' },
                      { plant: 'Radishes', ph: '5.5–6.8', note: 'Slight acid preference' },
                      { plant: 'Watermelon', ph: '5.5–6.5', note: 'Moderate preference' },
                    ].map(({ plant, ph, note }) => (
                      <div key={plant} className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-sm shrink-0" style={{ color: FOREST }}>{plant}</span>
                        <div className="text-right">
                          <span className="block text-xs font-bold" style={{ color: '#dc2626' }}>pH {ph}</span>
                          <span className="text-xs" style={{ color: `${FOREST}77` }}>{note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${FOREST}25` }}>
                <div className="px-4 py-3" style={{ backgroundColor: FOREST }}>
                  <span className="text-sm font-bold" style={{ color: GOLD }}>Alkaline-Tolerant Plants (pH 7.0–8.0)</span>
                </div>
                <div className="p-4" style={{ backgroundColor: PARCH2 }}>
                  <div className="space-y-2">
                    {[
                      { plant: 'Asparagus', ph: '7.0–8.0', note: 'One of the few vegetables preferring alkaline' },
                      { plant: 'Beets', ph: '6.5–8.0', note: 'Tolerates alkaline well, wide range' },
                      { plant: 'Cabbage', ph: '6.5–7.5', note: 'Slightly alkaline preferred' },
                      { plant: 'Cauliflower', ph: '6.5–7.5', note: 'Same as cabbage' },
                      { plant: 'Swiss Chard', ph: '6.5–8.0', note: 'Wide tolerance, alkaline friendly' },
                      { plant: 'Lavender', ph: '6.5–8.0', note: 'Thrives in alkaline — Mediterranean origin' },
                      { plant: 'Rosemary', ph: '6.5–8.0', note: 'Mediterranean — handles alkaline well' },
                      { plant: 'Sage', ph: '6.5–7.0', note: 'Slight alkaline lean' },
                      { plant: 'Spinach', ph: '6.5–7.5', note: 'Alkaline tolerant' },
                      { plant: 'Okra', ph: '6.5–7.5', note: 'Prefers neutral to slightly alkaline' },
                      { plant: 'Leeks', ph: '6.5–8.0', note: 'Wide range, handles alkaline' },
                      { plant: 'Garlic', ph: '6.0–7.5', note: 'Fence-sitter, tolerates both well' },
                    ].map(({ plant, ph, note }) => (
                      <div key={plant} className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-sm shrink-0" style={{ color: FOREST }}>{plant}</span>
                        <div className="text-right">
                          <span className="block text-xs font-bold" style={{ color: '#16a34a' }}>pH {ph}</span>
                          <span className="text-xs" style={{ color: `${FOREST}77` }}>{note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Testing note */}
            <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
              <h3 className="font-semibold mb-2" style={{ color: FOREST }}>Testing Your pH</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${FOREST}cc` }}>
                Home pH test kits (~$10–15) give a rough reading and are fine for general monitoring.
                For precision — especially before amending or planting acid-loving crops like blueberries —
                send a sample to your county extension office. Cost is $15–25 and they&apos;ll tell you exactly
                how much lime or sulfur to add for your specific soil type. Do this before spending money on amendments.
              </p>
            </div>

          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: `${FOREST}88` }}>
            <ArrowLeft className="h-4 w-4" /> All Resources
          </Link>
        </div>

      </main>
    </div>
  )
}
