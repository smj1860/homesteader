"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import {
  Star, MapPin, Phone, ExternalLink,
  ShieldCheck, TrendingUp, Loader2, AlertCircle,
} from "lucide-react"

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'

const SERVICE_TYPES = [
  { label: "All",        value: "all" },
  { label: "Plumbing",   value: "plumbing" },
  { label: "Electric",   value: "electrical" },
  { label: "Handyman",   value: "handyman" },
  { label: "Septic",     value: "septic" },
  { label: "Well/Drill", value: "welldrill" },
  { label: "Fencing",    value: "fencing" },
]

interface Contractor {
  id:       string
  name:     string
  rating:   number | null
  reviews:  number
  address:  string
  open:     boolean | null
  keywords: string[]
  mapsUrl:  string
}

export default function ContractorsPage() {
  const [zip,         setZip]         = useState("")
  const [activeTab,   setActiveTab]   = useState("all")
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState<string | null>(null)
  const [searched,    setSearched]    = useState(false)

  async function handleSearch() {
    if (zip.length !== 5) {
      setError("Enter a full 5-digit zip code first.")
      return
    }

    setLoading(true)
    setError(null)
    setContractors([])

    try {
      const res  = await fetch(`/api/contractors?zip=${zip}&service=${activeTab}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.")
        return
      }

      setContractors(data.contractors)
      setSearched(true)

      if (data.contractors.length === 0) {
        setError("No contractors found in that area for this service type. Try widening your search or picking a different category.")
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pb-20 pt-20" style={{ backgroundColor: PARCH }}>
      <Navigation />
      <main className="container mx-auto px-4 max-w-6xl">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="mb-8">
          <h1 className="font-headline text-3xl font-bold" style={{ color: FOREST }}>
            Recommended Local Pros
          </h1>
          <p className="mt-1 text-sm" style={{ color: `${FOREST}88` }}>
            Vetted contractors ranked by real community feedback — not just star averages.
          </p>
        </header>

        {/* ── Search box ─────────────────────────────────────────────────── */}
        <div
          className="mb-8 rounded-xl p-6"
          style={{
            backgroundColor: '#ffffff',
            border: `1.5px solid ${FOREST}28`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end">

            {/* Zip input */}
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
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
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
                className="flex flex-wrap rounded-lg p-1 gap-1"
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
              onClick={handleSearch}
              disabled={loading || zip.length !== 5}
              className="px-8 py-2.5 rounded-lg font-bold text-sm transition-all hover:opacity-90 shrink-0 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: FOREST, color: PARCH }}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Searching…" : "Search Pros"}
            </button>
          </div>
        </div>

        {/* ── Error state ─────────────────────────────────────────────────── */}
        {error && (
          <div
            className="mb-6 flex items-start gap-3 rounded-lg p-4"
            style={{ backgroundColor: '#fff3f3', border: '1.5px solid #f5c6c6' }}
          >
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: '#c0392b' }} />
            <p className="text-sm" style={{ color: '#7b241c' }}>{error}</p>
          </div>
        )}

        {/* ── Empty pre-search state ──────────────────────────────────────── */}
        {!searched && !loading && contractors.length === 0 && !error && (
          <div
            className="mb-12 rounded-xl p-10 text-center"
            style={{ backgroundColor: `${FOREST}08`, border: `1.5px dashed ${FOREST}25` }}
          >
            <MapPin className="mx-auto h-10 w-10 mb-3" style={{ color: `${FOREST}40` }} />
            <p className="font-semibold text-base mb-1" style={{ color: FOREST }}>
              Enter your zip code to find contractors near you
            </p>
            <p className="text-sm" style={{ color: `${FOREST}70` }}>
              We pull from real reviews to surface pros who actually know homestead work.
            </p>
          </div>
        )}

        {/* ── Contractor cards ─────────────────────────────────────────────── */}
        {contractors.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {contractors.map((pro, index) => (
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
                  {pro.rating !== null && (
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          style={{
                            fill:  i < Math.floor(pro.rating!) ? GOLD : 'transparent',
                            color: i < Math.floor(pro.rating!) ? GOLD : `${PARCH}40`,
                          }}
                        />
                      ))}
                      <span className="ml-1 text-sm font-bold" style={{ color: PARCH }}>
                        {pro.rating.toFixed(1)}
                      </span>
                      <span className="text-xs" style={{ color: `${PARCH}70` }}>
                        ({pro.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  )}

                  {/* Open/closed badge */}
                  {pro.open !== null && (
                    <span
                      className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mb-2"
                      style={{
                        backgroundColor: pro.open ? `${GOLD}28` : `${PARCH}18`,
                        color:           pro.open ? GOLD        : `${PARCH}60`,
                        border:          `1px solid ${pro.open ? GOLD + '50' : PARCH + '30'}`,
                      }}
                    >
                      {pro.open ? "Open Now" : "Closed"}
                    </span>
                  )}

                  {/* Name */}
                  <p className="font-headline text-base font-bold leading-snug mb-1" style={{ color: PARCH }}>
                    {pro.name}
                  </p>

                  {/* Address */}
                  <p className="flex items-center gap-1 text-xs" style={{ color: `${PARCH}80` }}>
                    <MapPin className="h-3 w-3 shrink-0" /> {pro.address}
                  </p>
                </div>

                {/* Keyword pills */}
                {pro.keywords.length > 0 && (
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
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
                  </div>
                )}

                {/* Footer */}
                <div className="flex gap-2 px-6 pb-6">
                  <a
                    href={`tel:`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all hover:bg-white/10"
                    style={{ border: `1px solid ${PARCH}40`, color: PARCH }}
                  >
                    <Phone className="h-4 w-4" /> Call
                  </a>
                  <a
                    href={pro.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
                  >
                    View on Maps <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Why Trust section ────────────────────────────────────────────── */}
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
                We pull real contractors with real Google reviews — not a directory someone paid to be
                in. The results you see are sorted by rating and review count, so the folks at the top
                have earned it through consistent work in your community.
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
                For any big project — well drilling, septic work, electrical — call two or three of
                these and get quotes. A good contractor won&apos;t flinch at that. The ones who do
                are telling you something.
              </p>
              <div
                className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest"
                style={{ color: `${FOREST}88` }}
              >
                <span>✓ Real Google reviews</span>
                <span>✓ Sorted by rating</span>
                <span>✓ Local to your zip code</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
