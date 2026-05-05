"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, MapPin, Lock, ChevronRight, Archive, Sprout, Scissors, Heart, PawPrint, UtensilsCrossed, FlaskConical } from "lucide-react"
import Link from "next/link"
import { PricingModal } from "@/components/PricingModal"
import { useSustainData } from "@/hooks/use-sustain-data"
import { getZoneFromZip } from "@/lib/zone-lookup"

const FOREST = '#264228'
const GOLD   = '#A88032'

const CATEGORY_ICONS: Record<string, any> = {
  Sprout, Scissors, Heart, PawPrint, UtensilsCrossed, Archive, FlaskConical,
}

const ZONE_DESCRIPTIONS: Record<number, { label: string; temps: string }> = {
  3:  { label: "Zone 3",  temps: "-40°F to -30°F" },
  4:  { label: "Zone 4",  temps: "-30°F to -20°F" },
  5:  { label: "Zone 5",  temps: "-20°F to -10°F" },
  6:  { label: "Zone 6",  temps: "-10°F to 0°F" },
  7:  { label: "Zone 7",  temps: "0°F to 10°F" },
  8:  { label: "Zone 8",  temps: "10°F to 20°F" },
  9:  { label: "Zone 9",  temps: "20°F to 30°F" },
  10: { label: "Zone 10", temps: "30°F to 40°F" },
}

const RESOURCE_CATEGORIES = [
  { id: "planting",     slug: "planting",     name: "Planting Schedules",    icon: "Sprout",          description: "Zone-aware sow and transplant dates for 30 vegetables" },
  { id: "seed-saving",  slug: "seed-saving",  name: "Seed Saving",           icon: "Archive",         description: "Process and store seeds from 25 common crops" },
  { id: "pruning",      slug: "pruning",      name: "Pruning & Orchard Care", icon: "Scissors",       description: "When and how to prune every tree and shrub" },
  { id: "companion",    slug: "companion",    name: "Companion Planting",    icon: "Heart",           description: "What grows well together and what doesn't" },
  { id: "animals",      slug: "animals",      name: "Livestock Feeding",     icon: "PawPrint",        description: "Daily feed amounts for 13 homestead animals" },
  { id: "preservation", slug: "preservation", name: "Preservation",          icon: "UtensilsCrossed", description: "Safe canning times, freezing, and fermentation" },
  { id: "cleaning-recipes", slug: "cleaning-recipes", name: "Cleaning Recipes",  icon: "FlaskConical",    description: "Tested homemade recipes for laundry, cleaning, and garden use" },
]

function ResourcesContent() {
  const searchParams = useSearchParams()
  const { tier, upgradeToPaid } = useSustainData()

  const [search,      setSearch]      = useState("")
  const [activeZone,  setActiveZone]  = useState<number | null>(null)
  const [zipInput,    setZipInput]    = useState("")
  const [zoneInput,   setZoneInput]   = useState("")
  const [loading,     setLoading]     = useState(false)
  const [showPricing, setShowPricing] = useState(false)

  const handleZipLookup = async () => {
    if (zipInput.length !== 5) return
    setLoading(true)
    try {
      const result = await getZoneFromZip(zipInput)
      if (result?.zone) setActiveZone(result.zone)
    } catch {}
    setLoading(false)
  }

  const handleManualZone = () => {
    const n = parseInt(zoneInput)
    if (n >= 3 && n <= 10) setActiveZone(n)
  }

  const filteredCategories = RESOURCE_CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-5xl">

        <header className="mb-8">
          <h1 className="font-headline text-3xl font-bold text-foreground">Homestead References</h1>
          <p className="text-muted-foreground mt-1">
            Planting calendars, livestock guides, and preservation tables — all zone-aware.
          </p>
        </header>

        {/* Zone selector row — inline, no grey box */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 relative">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              placeholder="Zip code"
              className="w-28 border-border/40 text-sm"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleZipLookup()}
              maxLength={5}
            />
            <Button size="sm" variant="outline" onClick={handleZipLookup} disabled={loading} className="border-border/40">
              {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Find Zone"}
            </Button>
          </div>

          <span className="text-muted-foreground text-sm">or set manually:</span>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Zone 3–10"
              className="w-20 border-border/40 text-sm text-center"
              value={zoneInput}
              onChange={(e) => setZoneInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualZone()}
            />
            <Button size="sm" variant="outline" onClick={handleManualZone} className="border-border/40">
              Set
            </Button>
          </div>

          {/* ── FIX: zone info displayed inline as a small badge, no grey box ── */}
          {activeZone && ZONE_DESCRIPTIONS[activeZone] && (
            <div className="flex items-center gap-2 ml-auto">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
                style={{ backgroundColor: `${FOREST}12`, color: FOREST, border: `1px solid ${FOREST}25` }}
              >
                {ZONE_DESCRIPTIONS[activeZone].label}
              </span>
              <span className="text-xs text-muted-foreground">
                Avg min winter temp: <strong className="text-foreground">{ZONE_DESCRIPTIONS[activeZone].temps}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search references..."
            className="pl-10 border-border/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCategories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon] ?? Archive
              const locked = tier === 'free'
              return (
                <Link key={cat.id} href={locked ? "#" : `/resources/${cat.slug}?zone=${activeZone ?? 6}`}>
                  <Card
                    className="h-full border-border/40 bg-card hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden"
                    onClick={locked ? () => setShowPricing(true) : undefined}
                  >
                    {locked && (
                      <div className="absolute top-3 right-3">
                        <Lock className="h-3.5 w-3.5 text-muted-foreground/40" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        {/* ── FIX: icon uses leather color consistent with projects page ── */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leather/15 text-leather group-hover:bg-leather/25 transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="font-headline text-base text-card-foreground leading-tight">
                            {cat.name}
                          </CardTitle>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* ── FIX: description text is now card-foreground/70, readable on dark cards ── */}
                      <p className="text-xs text-card-foreground/70 leading-relaxed">{cat.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        {!loading && filteredCategories.length === 0 && search && (
          <div className="text-center py-16 text-muted-foreground">
            No resources found for &ldquo;{search}&rdquo;
          </div>
        )}

      </main>

      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        onUpgrade={() => { upgradeToPaid(); setShowPricing(false) }}
      />
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ResourcesContent />
    </Suspense>
  )
}
