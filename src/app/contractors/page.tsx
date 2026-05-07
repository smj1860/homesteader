"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, ExternalLink, ShieldCheck, TrendingUp, Star, MapPin } from "lucide-react"

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'

const SERVICE_TYPES = ["All", "Plumbing", "Electrical", "Handyman"] as const
type ServiceType = typeof SERVICE_TYPES[number]

const mockContractors = [
  {
    id: 1,
    name: "Evergreen Homestead Plumbing",
    rating: 4.9,
    reviews: 128,
    keywords: ["reliable", "honest", "emergency", "well-pumps"],
    address: "123 Green Lane, Localville",
    zip: "12345",
    type: "plumbing",
  },
  {
    id: 2,
    name: "SafeWire Electricians",
    rating: 4.8,
    reviews: 215,
    keywords: ["certified", "safety-first", "efficient", "solar"],
    address: "45 Spark Rd, Volt Town",
    zip: "12345",
    type: "electrical",
  },
  {
    id: 3,
    name: "Neighborly Handyman Co.",
    rating: 4.7,
    reviews: 89,
    keywords: ["versatile", "fair pricing", "prompt", "fencing"],
    address: "88 Fixer Upper Way",
    zip: "12345",
    type: "handyman",
  },
]

export default function ContractorsPage() {
  const [zip,         setZip]         = useState("")
  const [activeTab,   setActiveTab]   = useState<ServiceType>("All")

  const filtered = mockContractors.filter(
    c => activeTab === "All" || c.type === activeTab.toLowerCase()
  )

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-6xl">

        <header className="mb-8">
          <h1
            className="font-serif text-3xl font-bold mb-1"
            style={{ color: FOREST }}
          >
            Recommended Local Pros
          </h1>
          <p className="text-sm" style={{ color: `${FOREST}88` }}>
            Vetted contractors ranked by real community feedback — not just star averages.
          </p>
        </header>

        {/* ── Search / Filter Card — brand-colored ─────────────────────── */}
        <div
          className="mb-8 rounded-2xl p-6"
          style={{
            backgroundColor: `${FOREST}0e`,
            border: `1.5px solid ${FOREST}28`,
          }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end">

            {/* Zip code input */}
            <div className="flex-1 space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: FOREST }}>
                Your Zip Code
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: `${FOREST}70` }}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="Enter zip code…"
                  value={zip}
                  onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    backgroundColor: PARCH,
                    border: `1.5px solid ${FOREST}30`,
                    color: FOREST,
                  }}
                  onFocus={e => (e.target.style.borderColor = GOLD)}
                  onBlur={e => (e.target.style.borderColor = `${FOREST}30`)}
                />
              </div>
            </div>

            {/* Service type tabs — no Shadcn */}
            <div className="flex-1 space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: FOREST }}>
                Service Type
              </label>
              <div
                className="flex rounded-lg p-1 gap-1"
                style={{ backgroundColor: `${FOREST}14` }}
              >
                {SERVICE_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className="flex-1 py-2 rounded-md text-xs font-semibold transition-all"
                    style={
                      activeTab === type
                        ? { backgroundColor: FOREST, color: PARCH }
                        : { backgroundColor: 'transparent', color: `${FOREST}99` }
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Search button */}
            <button
              className="px-8 py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90 shrink-0"
              style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
            >
              Search Pros
            </button>
          </div>
        </div>

        {/* ── Contractor cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {filtered.map((pro, index) => (
            <div
              key={pro.id}
              className="relative rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: PARCH,
                border: `1.5px solid ${FOREST}20`,
              }}
            >
              {/* Top Choice ribbon */}
              {index === 0 && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl flex items-center gap-1"
                  style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
                >
                  <TrendingUp className="h-3 w-3" /> Top Choice
                </div>
              )}

              <div className="p-5">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5"
                      style={{
                        fill: i < Math.floor(pro.rating) ? GOLD : 'transparent',
                        color: i < Math.floor(pro.rating) ? GOLD : `${FOREST}40`,
                      }}
                    />
                  ))}
                  <span className="text-xs font-bold ml-1" style={{ color: FOREST }}>
                    {pro.rating}
                  </span>
                  <span className="text-xs" style={{ color: `${FOREST}60` }}>
                    ({pro.reviews} reviews)
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base mt-2 mb-1" style={{ color: FOREST }}>
                  {pro.name}
                </h3>
                <p className="text-xs mb-3" style={{ color: `${FOREST}80` }}>
                  {pro.address}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pro.keywords.map(kw => (
                    <span
                      key={kw}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${FOREST}12`, color: FOREST }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-3" style={{ borderTop: `1px solid ${FOREST}18` }}>
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                    style={{ border: `1.5px solid ${FOREST}30`, color: FOREST }}
                  >
                    <Phone className="h-3.5 w-3.5" /> Call
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
                  >
                    Get Quote <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Why Trust section ────────────────────────────────────────── */}
        <section
          className="rounded-2xl p-8"
          style={{ backgroundColor: `${FOREST}10`, border: `1.5px solid ${FOREST}25` }}
        >
          <div className="flex items-start gap-5">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${FOREST}18` }}
            >
              <ShieldCheck className="h-6 w-6" style={{ color: FOREST }} />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: FOREST }}>
                Why trust our recommendations?
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: `${FOREST}cc` }}>
                We don&apos;t just pull names out of a hat. Every contractor on this list has been
                evaluated against real feedback from real customers — not just their overall star rating,
                but what people in your community actually said about their experience and results.
                We look for consistent praise around the things that matter most on a homestead:
                showing up when they say they will, doing the job right, being straight with you on
                price, and understanding the kind of work you&apos;re asking for.
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
                If a contractor has 200 reviews that say &ldquo;great for apartments&rdquo; but none that mention
                well systems, off-grid setups, or rural properties — they don&apos;t make this list.
                The ones who do have earned it by doing the work, repeatedly, for people who live the same
                kind of life you do.
              </p>
              <div
                className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest"
                style={{ color: `${FOREST}88` }}
              >
                <span>✓ Aggregated review scores</span>
                <span>✓ Community-verified results</span>
                <span>✓ Homestead-relevant experience</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
