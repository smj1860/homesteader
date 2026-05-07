"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Star, MapPin, Phone, ExternalLink, ShieldCheck, TrendingUp } from "lucide-react"

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'

const SERVICE_TYPES = [
  { label: "All",      value: "all" },
  { label: "Plumbing", value: "plumbing" },
  { label: "Electric", value: "electrical" },
  { label: "Handyman", value: "handyman" },
]

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
  const [zip,       setZip]       = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filtered = mockContractors.filter(
    c => activeTab === "all" || c.type === activeTab
  )

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-6xl">

        <header className="mb-8">
          <h1 className="font-headline text-3xl font-bold" style={{ color: FOREST }}>
            Recommended Local Pros
          </h1>
          <p className="mt-1 text-sm" style={{ color: `${FOREST}88` }}>
            Vetted contractors ranked by real community feedback — not just star averages.
          </p>
        </header>

        {/* ── Search box — white background, dark green lettering ──────── */}
        <div
          className="mb-8 rounded-xl p-6"
          style={{
            backgroundColor: '#ffffff',
            border: `1.5px solid ${FOREST}28`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end">

            {/* Zip code */}
            <div className="flex-1 space-y-1.5">
              <label className="block text-sm font-semibold" style={{ color: FOREST }}>
                Your Zip Code
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: `${FOREST}60` }}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="Enter zip code…"
                  value={zip}
                  onChange={e => setZip(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    backgroundColor: '#ffffff',
                    border: `1.5px solid ${FOREST}30`,
                    color: FOREST,
                  }}
                  onFocus={e => (e.target.style.borderColor = FOREST)}
                  onBlur={e => (e.target.style.borderColor = `${FOREST}30`)}
                />
              </div>
            </div>

            {/* Service type tabs */}
            <div className="flex-1 space-y-1.5">
              <label className="block text-sm font-semibold" style={{ color: FOREST }}>
                Service Type
              </label>
              <div
                className="flex rounded-lg p-1 gap-1"
                style={{ backgroundColor: `${FOREST}12` }}
              >
                {SERVICE_TYPES.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setActiveTab(value)}
                    className="flex-1 py-2 rounded-md text-xs font-semibold transition-all"
                    style={
                      activeTab === value
                        ? { backgroundColor: FOREST, color: PARCH }
                        : { backgroundColor: 'transparent', color: `${FOREST}80` }
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search button */}
            <button
              className="px-8 py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90 shrink-0"
              style={{ backgroundColor: FOREST, color: PARCH }}
            >
              Search Pros
            </button>
          </div>
        </div>

        {/* ── Contractor cards — dark forest green, white + gold text ───── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {filtered.map((pro, index) => (
            <div
              key={pro.id}
              className="relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{
                backgroundColor: FOREST,
                borderRadius: '0.75rem',
                border: `1px solid ${FOREST}`,
              }}
            >
              {/* Top Choice ribbon */}
              {index === 0 && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-lg flex items-center gap-1"
                  style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
                >
                  <TrendingUp className="h-3 w-3" /> Top Choice
                </div>
              )}

              {/* Header */}
              <div className="p-6 pb-3">
                {/* Stars + rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{
                        fill:  i < Math.floor(pro.rating) ? GOLD : 'transparent',
                        color: i < Math.floor(pro.rating) ? GOLD : `${PARCH}40`,
                      }}
                    />
                  ))}
                  <span className="ml-1 text-sm font-bold" style={{ color: PARCH }}>
                    {pro.rating}
                  </span>
                  <span className="text-xs" style={{ color: `${PARCH}70` }}>
                    ({pro.reviews} reviews)
                  </span>
                </div>

                {/* Name */}
                <p className="font-headline text-base font-bold leading-snug mb-1" style={{ color: PARCH }}>
                  {pro.name}
                </p>

                {/* Address */}
                <p className="flex items-center gap-1 text-xs" style={{ color: `${PARCH}80` }}>
                  <MapPin className="h-3 w-3 shrink-0" /> {pro.address}
                </p>
              </div>

              {/* Content */}
              <div className="px-6 pb-4">
                {/* Keyword pills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {pro.keywords.map(kw => (
                    <span
                      key={kw}
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${GOLD}28`,
                        color: GOLD,
                        border: `1px solid ${GOLD}50`,
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Trust sentence */}
                <p className="text-xs leading-relaxed" style={{ color: `${PARCH}80` }}>
                  Community reviewers specifically called out{" "}
                  <span className="font-semibold" style={{ color: GOLD }}>
                    {pro.keywords[0]}
                  </span>{" "}
                  as a standout quality — and that&apos;s exactly the kind of feedback we use to build
                  this list.
                </p>
              </div>

              {/* Footer */}
              <div className="flex gap-2 px-6 pb-6">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all hover:bg-white/10"
                  style={{
                    border: `1px solid ${PARCH}40`,
                    color: PARCH,
                    backgroundColor: 'transparent',
                  }}
                >
                  <Phone className="h-4 w-4" /> Call
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-bold transition-all hover:opacity-90"
                  style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
                >
                  Get Quote <ExternalLink className="h-4 w-4" />
                </button>
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
              <h2 className="font-headline text-xl font-bold mb-3" style={{ color: FOREST }}>
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
                The ones who do have earned it by doing the work, repeatedly, for people who live the
                same kind of life you do.
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
