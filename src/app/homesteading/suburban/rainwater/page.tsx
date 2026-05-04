import { Navigation } from "@/components/Navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Collecting Rainwater | SteadCraft",
  description: "Set up a rain barrel system that captures free water for your garden. Covers what to check before you start, sizing, and connecting multiple barrels.",
}

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export default function SuburbanRainwaterPage() {
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
          <span style={{ color: FOREST }}>Collecting Rainwater</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex gap-2 mb-5">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${GOLD}20`, color: GOLD }}>
              Suburban Series
            </span>
            <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${FOREST}12`, color: FOREST, border: `1px solid ${FOREST}22` }}>
              Guide 4 of 6
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: FOREST }}>
            Collecting Rainwater
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: `${FOREST}99` }}>
            Every inch of rain that falls on a 1,000 square foot roof produces over
            600 gallons of water. Most of it goes down the drain. A rain barrel
            system captures that free resource and puts it directly into your garden.
          </p>
        </div>

        <div className="space-y-5 text-base leading-relaxed" style={{ color: `${FOREST}dd` }}>

          {/* Legal check — important first */}
          <div className="rounded-xl p-5" style={{ backgroundColor: `${GOLD}12`, border: `1.5px solid ${GOLD}33` }}>
            <h2 className="font-serif text-xl font-bold mb-3" style={{ color: FOREST }}>
              Check your state&apos;s rules first
            </h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: `${FOREST}cc` }}>
              Rainwater collection is legal in most states, but a few have restrictions
              on how much you can collect or how it can be used. Check before you buy
              anything. A quick search for &ldquo;[your state] rainwater collection laws&rdquo;
              will give you a clear answer in under two minutes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg p-3" style={{ backgroundColor: '#16a34a12', border: '1px solid #16a34a30' }}>
                <p className="font-semibold mb-1" style={{ color: '#16a34a' }}>Unrestricted or encouraged:</p>
                <p style={{ color: `${FOREST}99` }}>Most US states. No limits on collection volume for residential garden use.</p>
              </div>
              <div className="rounded-lg p-3" style={{ backgroundColor: '#d9770612', border: '1px solid #d9770630' }}>
                <p className="font-semibold mb-1" style={{ color: '#d97706' }}>Check carefully:</p>
                <p style={{ color: `${FOREST}99` }}>A small number of states have had historical restrictions — particularly western states where water rights are complex. Most have loosened these laws in recent years but verify your current state status.</p>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-2xl font-bold pt-4" style={{ color: FOREST }}>
            How a rain barrel system works
          </h2>
          <p>
            The basic setup is simple: a downspout from your roof carries rainwater
            into a barrel with a spigot at the bottom. You draw water from the spigot
            by gravity — no pump needed — and use it to fill watering cans or
            connect a soaker hose directly to the barrel.
          </p>
          <p>
            Most barrels include a diverter kit that installs inline with your
            existing downspout. The diverter automatically sends overflow back to
            the downspout once the barrel is full, so you don&apos;t have to manage it.
            Installation takes about 30 minutes with basic tools.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            What size do you need?
          </h2>
          <p>
            The honest answer: more than one barrel. A single 55-gallon barrel is a
            good start and it fills up fast in a decent rainstorm — a half-inch of
            rain on a 1,000 sq ft roof generates over 300 gallons, which means your
            barrel fills completely and you&apos;re losing the rest down the drain.
          </p>

          <div className="rounded-xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
            <h3 className="font-semibold mb-3" style={{ color: FOREST }}>Sizing by garden size</h3>
            <div className="space-y-2 text-sm">
              {[
                ['Container garden / small raised bed', '1 barrel (55 gal)', 'Enough for several days of watering between rains for a small setup.'],
                ['2–3 raised beds', '2–3 barrels (110–165 gal)', 'A linked series gives you a week of watering capacity in most climates.'],
                ['Large garden or dry climate', '4–6 barrels (220–330 gal)', 'Serious storage. Covers longer dry spells without running out.'],
              ].map(([situation, capacity, note]) => (
                <div key={String(situation)} className="rounded-lg p-3" style={{ backgroundColor: `${FOREST}07` }}>
                  <div className="flex justify-between items-start gap-3 mb-1">
                    <span className="font-semibold text-xs" style={{ color: FOREST }}>{situation}</span>
                    <span className="text-xs font-bold shrink-0" style={{ color: GOLD }}>{capacity}</span>
                  </div>
                  <p className="text-xs" style={{ color: `${FOREST}88` }}>{note}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Connecting multiple barrels
          </h2>
          <p>
            Linking barrels together multiplies your storage without needing multiple
            downspout locations. The most common method is a daisy-chain overflow setup.
          </p>
          <ol className="space-y-3 list-none pl-0">
            {[
              'Install the first barrel at your downspout with the diverter kit as normal.',
              'Drill a 3/4" hole near the top of barrel 1 on the side facing barrel 2.',
              'Install a bulkhead fitting in that hole and connect a length of 3/4" flexible hose to barrel 2\'s inlet.',
              'When barrel 1 fills, water overflows through the connecting hose into barrel 2.',
              'Continue the chain as needed — each additional barrel adds to your storage.',
              'Make sure barrel 2 (and any subsequent barrels) are at the same height or lower than the previous one — water won\'t flow uphill.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: FOREST, color: PARCH }}>{i + 1}</span>
                <span className="text-sm" style={{ color: `${FOREST}dd` }}>{step}</span>
              </li>
            ))}
          </ol>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Screening and mosquito prevention
          </h2>
          <p>
            Any opening in the barrel needs a screen to keep debris and mosquitoes out.
            Most barrels come with a screen over the inlet, but check and replace it
            if it&apos;s damaged. If you&apos;re building your own setup from a salvage barrel,
            cover every opening with fine mesh window screen and secure it with a hose
            clamp or bungee cord.
          </p>
          <p>
            Mosquitoes can&apos;t breed in water that moves or that&apos;s properly covered.
            As long as your barrel is sealed and screened, it&apos;s not a mosquito risk.
            If you&apos;re concerned, Bti dunks (Bacillus thuringiensis israelensis) are
            a non-toxic biological larvicide that can be dropped into any open water.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Getting water out: gravity flow and hose connection
          </h2>
          <p>
            Most barrels have a 3/4" spigot near the bottom. For gravity flow to work
            with any pressure, the barrel needs to be elevated — even 6–12 inches on
            cinder blocks makes a real difference in flow rate to a hose or soaker line.
          </p>
          <p>
            For a soaker hose directly off the barrel, you&apos;ll need the barrel elevated
            at least 12–18 inches and the hose run downhill or flat — soaker hoses
            don&apos;t work well uphill against gravity pressure. For a drip system,
            elevation of 2–3 feet gives reasonable pressure.
          </p>
          <p>
            If you want to run a longer hose or fill a watering can faster, a small
            submersible pump ($25–40) placed inside the barrel runs off a standard
            extension cord and pumps water significantly faster than gravity alone.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            A note on water filtration
          </h2>
          <p>
            Rainwater collected off a roof is great for garden irrigation — it&apos;s
            naturally soft, unchlorinated, and slightly acidic in a way plants like.
            It is not, however, drinking water. Don&apos;t use it for drinking or food
            prep without proper filtration and testing.
          </p>
          <p>
            For garden use, basic screening is sufficient. If you want to build a
            simple DIY filtration system to remove sediment and organic material
            before the water reaches your barrel, we cover that in a separate
            guide — a layered sand, gravel, and activated charcoal filter that can
            be built from hardware store materials for under $15.
          </p>

          <h2 className="font-serif text-2xl font-bold pt-6" style={{ color: FOREST }}>
            Winter prep
          </h2>
          <p>
            If you&apos;re in a climate that freezes, drain and disconnect your barrels
            before the first hard freeze. Water expands when it freezes and will crack
            a plastic barrel or burst a metal one. Disconnect from the downspout,
            open the spigot to drain completely, and store indoors or under cover
            until spring.
          </p>

        </div>

        {/* Series nav */}
        <div className="mt-14 flex justify-between items-center pt-8" style={{ borderTop: `1px solid ${FOREST}18` }}>
          <Link href="/homesteading/suburban/composting" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: `${FOREST}88` }}>
            <ArrowLeft className="h-4 w-4" /> Composting
          </Link>
          <Link href="/homesteading/suburban/cleaning-supplies" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: FOREST }}>
            Next: Cleaning Supplies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </main>
    </div>
  )
}
