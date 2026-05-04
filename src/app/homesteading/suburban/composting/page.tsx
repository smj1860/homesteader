import { Navigation } from "@/components/Navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Composting | SteadCraft",
  description: "Turn kitchen scraps and garden waste into the best free fertilizer you'll ever use. Includes a DIY bin build and a patio-friendly option.",
}

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export default function SuburbanCompostingPage() {
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
          <span style={{ color: FOREST }}>Composting</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex gap-2 mb-5">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${GOLD}20`, color: GOLD }}>
              Suburban Series
            </span>
            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${FOREST}12`, color: FOREST, border: `1px solid ${FOREST}22` }}>
              Guide 3 of 6
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: FOREST }}>
            Composting
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: `${FOREST}99` }}>
            Composting turns what you&apos;d throw away into the best soil amendment
            you can give your garden — and it costs nothing once you&apos;re set up.
            Here&apos;s how to do it right from the start.
          </p>
        </div>

        <div className="space-y-5 text-base leading-relaxed" style={{ color: `${FOREST}dd` }}>

          <h2 className="font-serif text-2xl font-bold pt-2" style={{ color: FOREST }}>
            What composting actually is
          </h2>
          <p>
            Composting is controlled decomposition. You&apos;re creating conditions where
            microorganisms, fungi, and invertebrates break down organic matter into
            a stable, nutrient-rich material that improves soil structure, feeds plants,
            and supports the biology that makes soil alive.
          </p>
          <p>
            A well-managed compost pile can turn kitchen and garden waste into finished
            compost in 6–12 weeks. A neglected pile takes much longer but still works —
            composting is hard to actually fail at. You can get it wrong and it just
            gets slower. Rarely does it truly not work.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Browns and greens: the ratio that matters
          </h2>
          <p>
            Compost needs two types of material: carbon-rich &ldquo;browns&rdquo; and
            nitrogen-rich &ldquo;greens.&rdquo; The ideal ratio is roughly <strong>3 parts browns
            to 1 part greens</strong> by volume. This is the most important thing to get right.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: FOREST }}>
                <span style={{ color: GOLD }}>🍂</span> Browns (Carbon)
              </h3>
              <ul className="space-y-1.5 text-sm" style={{ color: `${FOREST}99` }}>
                {['Dried leaves','Cardboard (torn up, no glossy coating)','Brown paper bags','Straw or hay','Wood chips or sawdust (untreated)','Paper egg cartons','Newspaper (black ink only)','Dry plant stalks'].map(i => (
                  <li key={i} className="flex items-center gap-2">
                    <span style={{ color: GOLD }}>✓</span> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
              <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: FOREST }}>
                <span style={{ color: '#4ade80' }}>🌿</span> Greens (Nitrogen)
              </h3>
              <ul className="space-y-1.5 text-sm" style={{ color: `${FOREST}99` }}>
                {['Vegetable and fruit scraps','Coffee grounds and filters','Tea bags (remove staple)','Fresh grass clippings','Plant trimmings and deadheads','Eggshells (rinse first)','Spent garden plants','Seaweed'].map(i => (
                  <li key={i} className="flex items-center gap-2">
                    <span style={{ color: '#4ade80' }}>✓</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What NOT to compost */}
          <div className="rounded-xl p-4" style={{ backgroundColor: '#c0392b08', border: '1px solid #c0392b20' }}>
            <h3 className="font-semibold mb-2" style={{ color: '#c0392b' }}>Do not compost:</h3>
            <div className="grid grid-cols-2 gap-1 text-sm" style={{ color: `${FOREST}99` }}>
              {['Meat or fish','Dairy products','Oils and fats','Dog or cat waste','Diseased plants','Weeds gone to seed','Treated or painted wood','Anything with synthetic chemicals'].map(i => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ color: '#c0392b' }}>✗</span> {i}
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Setting up your pile
          </h2>
          <p>
            Choose a spot that gets partial sun — full shade slows decomposition, full
            sun dries the pile out too fast. You want the pile to stay moist (like a
            wrung-out sponge) and warm. At least 3×3×3 feet in size generates enough
            internal heat to decompose efficiently. Smaller piles can work but take longer.
          </p>
          <ul className="space-y-2 list-none pl-0 text-sm">
            {[
              'Start with a 4-inch layer of browns at the bottom for drainage and airflow',
              'Add 1–2 inches of greens on top',
              'Repeat the layering as you add material — always finish with browns on top to reduce smell and pests',
              'Water lightly if the pile is dry — moisture is essential for microbial activity',
              'Turn the pile every 1–2 weeks with a pitchfork to add oxygen and speed decomposition',
              'A pile that isn\'t heating up is too dry or lacks nitrogen — add water or greens',
              'A pile that smells bad is too wet or has too much nitrogen — add browns and turn it',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: GOLD, fontWeight: 700 }}>→</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Build your own compost bin
          </h2>
          <p>
            A purchased bin works fine — we have one linked in our affiliate store.
            But if you want free and you have a few hours, here are two simple builds.
          </p>

          {/* Pallet bin */}
          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-3" style={{ color: FOREST }}>Option 1: 4-Pallet Bin (Free)</h3>
            <p className="text-sm mb-3" style={{ color: `${FOREST}99` }}>
              Shipping pallets are often free from hardware stores, nurseries, or Facebook Marketplace.
              This build takes about an hour and holds a full cubic yard.
            </p>
            <ol className="space-y-2 text-sm list-none pl-0">
              {[
                'Source 4 matching pallets (same size makes a cleaner box)',
                'Stand three pallets on edge to form a U shape — two sides and a back',
                'Secure the corners with zip ties, wire, or screws through the pallet boards',
                'The fourth pallet is your front gate — attach with wire on one side as a hinge so it opens to access the pile',
                'Optional: line the inside with hardware cloth to keep the pile contained',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="shrink-0 font-bold w-5 text-center" style={{ color: GOLD }}>{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Wire mesh bin */}
          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-3" style={{ color: FOREST }}>Option 2: Wire Cylinder (Under $20)</h3>
            <p className="text-sm mb-3" style={{ color: `${FOREST}99` }}>
              Hardware cloth or welded wire fencing formed into a cylinder. Quick to make, easy to move.
            </p>
            <ol className="space-y-2 text-sm list-none pl-0">
              {[
                'Buy a 10-foot length of 36" tall hardware cloth or welded wire fencing',
                'Form it into a circle approximately 3 feet in diameter',
                'Secure the ends together with wire or zip ties',
                'Set it on the ground — you\'re done',
                'To turn the pile, lift the cylinder off, set it next to the pile, and fork the material back in',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="shrink-0 font-bold w-5 text-center" style={{ color: GOLD }}>{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Patio-friendly composting
          </h2>
          <p>
            No yard, no problem. These options work in a small outdoor space or even
            inside with no smell when managed correctly.
          </p>

          <div className="space-y-4">
            {[
              {
                title: 'Worm bin (vermicomposting)',
                desc: 'A tote or purpose-built bin with red wiggler worms. Fits under a sink or on a balcony. Feed scraps directly, harvest worm castings every few months. Produces the highest-quality compost of any method — worm castings are exceptional. Odorless when managed correctly. Worms are available online or at bait shops.',
              },
              {
                title: 'Bokashi system',
                desc: 'A sealed bucket system that ferments rather than decomposes. Accepts things a worm bin won\'t — meat, dairy, cooked food. Fast (2–4 weeks to fermented material), compact, no smell outside the bucket. The fermented material then gets buried in soil or added to an outdoor pile to finish composting.',
              },
              {
                title: 'Tumbler bin',
                desc: 'A sealed rotating drum on a stand. Works on a small patio, no ground contact needed, turns easily, and keeps pests out completely. Slightly slower than an open pile but clean and tidy. The Vevor bin in our store works well as a conventional bin — for a true tumbler, look for a dual-chamber rotating model.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
                <h3 className="font-semibold mb-1.5" style={{ color: FOREST }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${FOREST}99` }}>{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            When is it ready?
          </h2>
          <p>
            Finished compost is dark brown, crumbly, and smells like earth — not like
            rotting food. You shouldn&apos;t be able to identify what went in. If you can
            still see distinct pieces of material, it needs more time.
          </p>
          <p>
            Most backyard piles are ready in 3–6 months with regular turning, or
            6–12 months if left to work slowly. Worm castings and bokashi finish faster.
            When it&apos;s ready, screen out any large unfinished pieces (toss them back in
            for the next batch), and use the finished compost as a top dressing or
            mixed directly into your soil.
          </p>

        </div>

        {/* Series nav */}
        <div className="mt-14 flex justify-between items-center pt-8" style={{ borderTop: `1px solid ${FOREST}18` }}>
          <Link href="/homesteading/suburban/soil" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: `${FOREST}88` }}>
            <ArrowLeft className="h-4 w-4" /> Building Your Soil
          </Link>
          <Link href="/homesteading/suburban/rainwater" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: FOREST }}>
            Next: Collecting Rainwater <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </main>
    </div>
  )
}
