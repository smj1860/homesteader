"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { useUser, useSupabaseClient } from "@/supabase"
import { getZoneFromZip, clampZone, ZONE_DESCRIPTIONS, type ZoneInfo } from "@/lib/zone-lookup"
import { PricingModal } from "@/components/PricingModal"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sprout, Archive, Scissors, Heart, Layers, PawPrint,
  UtensilsCrossed, Hammer, Calendar, Search, Lock,
  MapPin, ChevronRight, Loader2
} from "lucide-react"
import Link from "next/link"

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Sprout, Archive, Scissors, Heart, Layers, PawPrint,
  UtensilsCrossed, Hammer, Calendar,
}

interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  sort_order: number
}

function ResourcesContent() {
  const router      = useRouter()
  const { tier, upgradeToPaid, isLoading: tierLoading } = useSustainData()
  const { user }    = useUser()
  const supabase    = useSupabaseClient()

  const [categories,   setCategories]   = useState<Category[]>([])
  const [zoneInfo,     setZoneInfo]      = useState<ZoneInfo | null>(null)
  const [manualZone,   setManualZone]    = useState<number | null>(null)
  const [zoneInput,    setZoneInput]     = useState("")
  const [search,       setSearch]        = useState("")
  const [loading,      setLoading]       = useState(true)
  const [showPricing,  setShowPricing]   = useState(false)

  const activeZone = manualZone ?? (zoneInfo ? clampZone(zoneInfo.zone_num) : null)

  // Auto-detect zone from user's zip code
  useEffect(() => {
    if (!user) return
    supabase
      .from("users")
      .select("zip_code")
      .eq("id", user.id)
      .single()
      .then(async ({ data }) => {
        if (data?.zip_code) {
          const info = await getZoneFromZip(data.zip_code)
          if (info) setZoneInfo(info)
        }
      })
  }, [user, supabase])

  // Load categories
  useEffect(() => {
    if (tier !== "paid") { setLoading(false); return }
    supabase
      .from("resource_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        setCategories(data ?? [])
        setLoading(false)
      })
  }, [tier, supabase])

  const handleManualZone = () => {
    const n = parseInt(zoneInput)
    if (!isNaN(n) && n >= 2 && n <= 12) {
      setManualZone(clampZone(n))
    }
  }

  const filteredCategories = categories.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  // ── Paywall ───────────────────────────────────────────────────────────────
  if (!tierLoading && tier !== "paid") {
    return (
      <div className="min-h-screen bg-background pb-20 pt-20">
        <Navigation />
        <main className="container mx-auto max-w-4xl px-4 pt-12">
          <div className="text-center mb-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Archive className="h-9 w-9" />
            </div>
            <h1 className="font-headline text-4xl font-bold text-foreground mb-3">
              SteadCraft Resource Library
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Your all-in-one homestead reference — planting schedules by zone, seed saving guides,
              pruning calendars, canning charts, and more. Pro exclusive.
            </p>
          </div>

          {/* Preview cards — locked */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 opacity-60 pointer-events-none select-none">
            {PREVIEW_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon] ?? Archive
              return (
                <Card key={cat.slug} className="border-border/40 bg-card relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Lock className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                  <CardHeader className="pb-2 blur-[2px]">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-sm font-headline">{cat.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="blur-[2px]">
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <h2 className="font-headline text-2xl font-bold text-foreground mb-2">
              Unlock the Full Library
            </h2>
            <p className="text-muted-foreground mb-6">
              Zone-aware planting schedules, seed saving for 25 crops, pruning calendars with
              technique guides, companion planting, canning reference, and more.
              All included in SteadCraft Pro.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-bold px-10 h-12"
              onClick={() => setShowPricing(true)}
            >
              Try Pro Free for 30 Days
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">No charge until day 31. Cancel any time.</p>
          </div>
        </main>
        <PricingModal
          isOpen={showPricing}
          onClose={() => setShowPricing(false)}
          onUpgrade={() => { upgradeToPaid(); setShowPricing(false) }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto max-w-5xl px-4 pt-10">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-headline text-3xl font-bold text-foreground">Resource Library</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your homestead reference — all in one place.
            </p>
          </div>

          {/* Zone indicator */}
          {activeZone && (
            <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 shrink-0">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Zone {activeZone}
                {zoneInfo && ` — ${zoneInfo.state}`}
              </span>
              <button
                onClick={() => setManualZone(null)}
                className="text-xs text-muted-foreground hover:text-primary underline underline-offset-2 ml-1"
              >
                {manualZone ? "clear override" : ""}
              </button>
            </div>
          )}
        </div>

        {/* Zone selector */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources…"
                className="pl-9 bg-background border-border/40"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground shrink-0">Override zone:</span>
            <Input
              placeholder="e.g. 6"
              className="w-20 bg-background border-border/40 text-center"
              value={zoneInput}
              onChange={(e) => setZoneInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualZone()}
            />
            <Button size="sm" variant="outline" onClick={handleManualZone} className="border-border/40">
              Set
            </Button>
          </div>
        </div>

        {/* Zone description strip */}
        {activeZone && ZONE_DESCRIPTIONS[activeZone] && (
          <div className="mb-8 rounded-lg border border-border/40 bg-card/50 px-4 py-3 flex items-center gap-3">
            <Badge className="bg-primary/15 text-primary border border-primary/30 text-xs">
              {ZONE_DESCRIPTIONS[activeZone].label}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Average minimum winter temperature: <strong className="text-foreground">{ZONE_DESCRIPTIONS[activeZone].temps}</strong>
            </span>
            {!activeZone && (
              <span className="text-xs text-muted-foreground ml-auto">
                Add your zip code in Account settings to auto-detect
              </span>
            )}
          </div>
        )}

        {/* Category grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCategories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon] ?? Archive
              return (
                <Link key={cat.id} href={`/resources/${cat.slug}?zone=${activeZone ?? 6}`}>
                  <Card className="h-full border-border/40 bg-card hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
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
                      <p className="text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
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
    </div>
  )
}

// Preview categories shown to free users behind blur/lock
const PREVIEW_CATEGORIES = [
  { slug: "planting",     name: "Planting Schedules",    icon: "Sprout",         description: "Zone-aware sow and transplant dates for 30 vegetables" },
  { slug: "seed-saving",  name: "Seed Saving",           icon: "Archive",        description: "Process and store seeds from 25 common crops" },
  { slug: "pruning",      name: "Pruning & Orchard Care", icon: "Scissors",      description: "When and how to prune every tree and shrub" },
  { slug: "companion",    name: "Companion Planting",    icon: "Heart",          description: "What grows well together and what doesn't" },
  { slug: "animals",      name: "Livestock Feeding",     icon: "PawPrint",       description: "Daily feed amounts for 13 homestead animals" },
  { slug: "preservation", name: "Preservation",          icon: "UtensilsCrossed", description: "Safe canning times, freezing, and fermentation" },
]

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
