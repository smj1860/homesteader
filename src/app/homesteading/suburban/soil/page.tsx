import { Navigation } from "@/components/Navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Building Your Soil | SteadCraft",
  description: "Why DIY soil mixes outperform bagged all-in-ones — and the exact mixes for pots, raised beds, and in-ground planting at every budget.",
}

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export default function SuburbanSoilPage() {
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
          <span style={{ color: FOREST }}>Building Your Soil</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex gap-2 mb-5">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${GOLD}20`, color: GOLD }}>
              Suburban Series
            </span>
            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${FOREST}12`, color: FOREST, border: `1px solid ${FOREST}22` }}>
              Guide 2 of 6
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: FOREST }}>
            Building Your Soil
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: `${FOREST}99` }}>
            The bagged all-in-one mix at the garden center is convenient. It&apos;s also usually
            inferior, overpriced for what you get, and inconsistent between bags. Here&apos;s
            why building your own soil is better — and exactly how to do it.
          </p>
        </div>

        <div className="space-y-5 text-base leading-relaxed" style={{ color: `${FOREST}dd` }}>

          <h2 className="font-serif text-2xl font-bold pt-2" style={{ color: FOREST }}>
            Why DIY beats the bag
          </h2>
          <p>
            A bag of premixed garden soil from a big box store typically contains
            a low-grade topsoil base, a small amount of peat or bark, maybe some
            perlite, and fertilizer salts that give your plants a short burst and then
            run out. The ratios are inconsistent. The sourcing is opaque. And when
            you&apos;re filling a raised bed or multiple containers, you&apos;re buying a lot of it.
          </p>
          <p>
            When you mix your own, you know exactly what&apos;s going in. You control the
            drainage, the water retention, the organic matter content, and the
            nutrient balance. You can scale up or down as needed, and you can adjust
            for what you&apos;re growing. A mix that&apos;s perfect for tomatoes is not
            necessarily perfect for carrots — and a custom mix lets you account for that.
          </p>
          <p>
            On cost: for a 4×8 raised bed at 12 inches deep, you need roughly 32 cubic
            feet of soil. At big box store pricing that&apos;s $80–$120 in premixed bags.
            A DIY mix using the components below runs $40–$75 for the same volume and
            produces meaningfully better results. At scale — multiple beds, multiple
            seasons — the savings compound significantly.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Three contexts, three approaches
          </h2>
          <p>
            Pots, raised beds, and in-ground planting each have different needs. The
            same mix doesn&apos;t serve all three equally well.
          </p>

          {/* ── RAISED BEDS ─────────────────────────────────────── */}
          <h3 className="font-serif text-xl font-bold pt-4" style={{ color: FOREST }}>
            Raised Beds
          </h3>
          <p>
            Raised beds need excellent drainage, strong water retention, and a high
            organic matter content. Unlike pots, they&apos;re not being moved — so weight
            is less of a concern. Unlike in-ground, you don&apos;t need to worry about
            breaking up hardpan or clay — you&apos;re building from scratch.
          </p>

          {/* SteadCraft Personal Mix — featured */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: `2px solid ${GOLD}` }}
          >
            <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: GOLD }}>
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#1a1a1a' }}>
                ★ SteadCraft Personal Raised Bed Mix
              </span>
              <span className="ml-auto text-xs font-semibold" style={{ color: '#1a1a1a80' }}>
                Our go-to recommendation
              </span>
            </div>
            <div className="p-5" style={{ backgroundColor: PARCH2 }}>
              <p className="text-sm mb-4" style={{ color: `${FOREST}99` }}>
                This is the mix we use. Each component has a job — and together they
                produce the kind of soil that makes plants visibly happier.
              </p>
              <div className="space-y-3">
                {[
                  {
                    ratio: '4 Parts',
                    role: 'The Base',
                    product: 'Miracle-Gro Performance Organics',
                    why: 'High-quality organic base that provides structure and initial nutrient load without harsh synthetic salts.',
                  },
                  {
                    ratio: '3 Parts',
                    role: 'The Lung',
                    product: 'Soil Conditioner',
                    why: 'Aerates the mix so roots can breathe. Prevents compaction over time. The soil stays loose season after season.',
                  },
                  {
                    ratio: '2 Parts',
                    role: 'The Engine',
                    product: 'Black Kow + Mushroom Compost (50/50)',
                    why: 'The biological fuel. Black Kow provides aged manure with excellent microbial activity. Mushroom compost adds slow-release nutrients and improves moisture retention.',
                  },
                  {
                    ratio: '1 Part',
                    role: 'The Filter',
                    product: 'Vigoro Perlite',
                    why: 'Improves drainage and prevents waterlogging. Especially important in raised beds after rain events.',
                  },
                ].map(({ ratio, role, product, why }) => (
                  <div key={role} className="rounded-lg p-3 flex gap-3" style={{ backgroundColor: `${FOREST}0a` }}>
                    <div className="shrink-0 text-center w-16">
                      <div className="text-xs font-bold" style={{ color: GOLD }}>{ratio}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: GOLD }}>{role}</span>
                        <span className="text-sm font-semibold" style={{ color: FOREST }}>{product}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: `${FOREST}88` }}>{why}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4" style={{ color: `${FOREST}77` }}>
                Mix thoroughly before filling your beds. This mix can be refreshed each season by top-dressing
                with 1–2 inches of fresh compost rather than replacing the whole volume.
              </p>
            </div>
          </div>

          {/* Budget raised bed mix */}
          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ backgroundColor: '#16a34a18', color: '#16a34a', border: '1px solid #16a34a30' }}>
                Budget Mix
              </span>
              <span className="text-sm font-semibold" style={{ color: FOREST }}>Raised Bed</span>
            </div>
            <div className="space-y-2 text-sm" style={{ color: `${FOREST}99` }}>
              <p><strong style={{ color: FOREST }}>50%</strong> — Topsoil (store brand or bulk yard delivery)</p>
              <p><strong style={{ color: FOREST }}>30%</strong> — Compost (municipal compost, Black Kow, or homemade)</p>
              <p><strong style={{ color: FOREST }}>20%</strong> — Coarse sand or perlite for drainage</p>
            </div>
            <p className="text-xs mt-3" style={{ color: `${FOREST}77` }}>
              This works well and costs significantly less. Plants will grow. The limiting factor is compost quality — the better your compost, the better this mix performs.
            </p>
          </div>

          {/* Premium raised bed mix */}
          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ backgroundColor: `${GOLD}18`, color: GOLD, border: `1px solid ${GOLD}30` }}>
                Premium Mix
              </span>
              <span className="text-sm font-semibold" style={{ color: FOREST }}>Raised Bed</span>
            </div>
            <div className="space-y-2 text-sm" style={{ color: `${FOREST}99` }}>
              <p><strong style={{ color: FOREST }}>40%</strong> — Mel&apos;s Mix base: 1/3 vermiculite, 1/3 peat moss, 1/3 compost blend</p>
              <p><strong style={{ color: FOREST }}>30%</strong> — Premium compost blend (worm castings + Black Kow + mushroom compost in equal parts)</p>
              <p><strong style={{ color: FOREST }}>20%</strong> — Coir fiber (replaces peat, more sustainable, better water retention)</p>
              <p><strong style={{ color: FOREST }}>10%</strong> — Perlite</p>
            </div>
            <p className="text-xs mt-3" style={{ color: `${FOREST}77` }}>
              This is the highest-performing raised bed mix you can build. Worm castings and coir drive the cost up but the results are exceptional.
            </p>
          </div>

          {/* ── POTS & CONTAINERS ────────────────────────────────── */}
          <h3 className="font-serif text-xl font-bold pt-6" style={{ color: FOREST }}>
            Pots &amp; Containers
          </h3>
          <p>
            Container mixes need to be lighter and drain faster than raised bed mixes
            because water dynamics in a pot are more intense — overwatering and
            root rot are real risks, and heavy soil in a container gets compacted
            by repeated watering much faster than in a bed.
            Never use straight garden soil or raised bed mix in containers.
          </p>

          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ backgroundColor: '#2563eb18', color: '#3b82f6', border: '1px solid #2563eb30' }}>
                Balanced Mix
              </span>
              <span className="text-sm font-semibold" style={{ color: FOREST }}>Containers — Quality &amp; Cost</span>
            </div>
            <div className="space-y-2 text-sm" style={{ color: `${FOREST}99` }}>
              <p><strong style={{ color: FOREST }}>50%</strong> — Quality potting mix (Miracle-Gro Performance Organics or FoxFarm Ocean Forest)</p>
              <p><strong style={{ color: FOREST }}>30%</strong> — Perlite — non-negotiable in containers for drainage</p>
              <p><strong style={{ color: FOREST }}>20%</strong> — Compost (worm castings work especially well here — adds nutrients without bulk)</p>
            </div>
            <p className="text-xs mt-3" style={{ color: `${FOREST}77` }}>
              FoxFarm Ocean Forest is worth the price for containers — it&apos;s well-balanced out of the bag and the perlite addition fixes its only real weakness (drainage). Worm castings outperform bagged compost in containers because they&apos;re lighter and more concentrated.
            </p>
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ backgroundColor: '#16a34a18', color: '#16a34a', border: '1px solid #16a34a30' }}>
                Budget Mix
              </span>
              <span className="text-sm font-semibold" style={{ color: FOREST }}>Containers</span>
            </div>
            <div className="space-y-2 text-sm" style={{ color: `${FOREST}99` }}>
              <p><strong style={{ color: FOREST }}>60%</strong> — Store-brand potting mix</p>
              <p><strong style={{ color: FOREST }}>30%</strong> — Perlite</p>
              <p><strong style={{ color: FOREST }}>10%</strong> — Any available compost</p>
            </div>
            <p className="text-xs mt-3" style={{ color: `${FOREST}77` }}>
              The cheap potting mix alone compacts badly and holds too much water. The perlite addition is what makes this work. Don&apos;t skip it.
            </p>
          </div>

          {/* ── IN-GROUND ───────────────────────────────────────── */}
          <h3 className="font-serif text-xl font-bold pt-6" style={{ color: FOREST }}>
            In-Ground Planting
          </h3>
          <p>
            In-ground gardening means working with what you have — and most suburban
            soils are somewhere between mediocre and genuinely bad. Clay, hardpan, or
            sandy soil with no organic matter are the most common situations. The good
            news is that soil improves significantly with consistent organic matter
            additions over 2–3 seasons.
          </p>
          <p>
            You don&apos;t replace in-ground soil — you build it up over time.
            Start with a soil test from your county extension office ($15–25) to know
            exactly what you&apos;re working with, then amend accordingly.
          </p>

          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-3" style={{ color: FOREST }}>In-ground improvement approach</h3>
            <div className="space-y-3 text-sm">
              {[
                ['Clay soil', 'Add coarse sand (not fine sand — it makes concrete) + compost in equal parts. Work in 3–4 inches at a time. Clay takes 2–3 seasons of consistent amendment to become workable.'],
                ['Sandy soil', 'Add compost heavily — 3–4 inches worked in each season. Sandy soil is nutrient-poor and doesn\'t hold water. Compost fixes both problems.'],
                ['Compacted soil', 'Fork deeply to break structure before adding amendments. A broadfork or digging fork used without turning (just lifting and loosening) preserves soil layers better than rototilling.'],
                ['Average suburban soil', 'Top-dress with 2 inches of compost each spring. Work it in lightly. Consistent annual additions build an excellent growing medium within 2–3 years.'],
              ].map(([type, desc]) => (
                <div key={String(type)} className="flex gap-3 items-start">
                  <span className="font-bold shrink-0 w-32 text-xs" style={{ color: GOLD }}>{type}</span>
                  <span style={{ color: `${FOREST}99` }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <p>
            For in-ground planting, your compost bin (covered in the next guide) is
            the single most valuable long-term investment. Free, unlimited compost
            from your own yard and kitchen waste is how you build exceptional
            in-ground soil without ongoing cost.
          </p>

        </div>

        {/* Series nav */}
        <div className="mt-14 flex justify-between items-center pt-8" style={{ borderTop: `1px solid ${FOREST}18` }}>
          <Link href="/homesteading/suburban/garden" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: `${FOREST}88` }}>
            <ArrowLeft className="h-4 w-4" /> The Garden
          </Link>
          <Link href="/homesteading/suburban/composting" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: FOREST }}>
            Next: Composting <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </main>
    </div>
  )
}
