"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { useSupabaseClient } from "@/supabase"
import { clampZone } from "@/lib/zone-lookup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft, Search, Loader2, ChevronDown, ChevronUp,
  MapPin, CheckCircle2, Info, AlertTriangle
} from "lucide-react"

interface Resource {
  id: string
  slug: string
  title: string
  description: string
  content_type: string
  content: any
  zone_specific: boolean
  image_hint: string | null
}

function ResourceCategoryContent() {
  const params       = useParams()
  const searchParams = useSearchParams()
  const router       = useRouter()
  const supabase     = useSupabaseClient()
  const slug         = params.slug as string
  const zoneParam    = parseInt(searchParams.get("zone") ?? "6")
  const zone         = clampZone(isNaN(zoneParam) ? 6 : zoneParam)

  const [resources,  setResources]  = useState<Resource[]>([])
  const [catName,    setCatName]    = useState("")
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState("")
  const [expanded,   setExpanded]   = useState<Record<string, boolean>>({})

  useEffect(() => {
    const load = async () => {
      const { data: cat } = await supabase
        .from("resource_categories")
        .select("id, name")
        .eq("slug", slug)
        .single()
      if (!cat) { setLoading(false); return }
      setCatName(cat.name)

      const { data: res } = await supabase
        .from("resources")
        .select("*")
        .eq("category_id", cat.id)
        .eq("is_active", true)
        .order("sort_order")
      setResources(res ?? [])
      // Auto-expand first resource
      if (res && res.length > 0) {
        setExpanded({ [res[0].id]: true })
      }
      setLoading(false)
    }
    load()
  }, [slug, supabase])

  const toggle = (id: string) => setExpanded(e => ({ ...e, [id]: !e[id] }))

  const filtered = resources.filter(r =>
    !search ||
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20">
      <Navigation />
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto max-w-5xl px-4 pt-8">

        {/* Breadcrumb / header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="mb-3 -ml-2" onClick={() => router.push(`/resources?zone=${zone}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Resource Library
          </Button>
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-headline text-2xl font-bold text-foreground">{catName}</h1>
            {resources.some(r => r.zone_specific) && (
              <Badge className="bg-primary/15 text-primary border border-primary/30 gap-1 shrink-0">
                <MapPin className="h-3 w-3" /> Showing Zone {zone}
              </Badge>
            )}
          </div>
          {resources.some(r => r.zone_specific) && (
            <p className="text-xs text-muted-foreground mt-1">
              Zone-specific content shown for Zone {zone}.{" "}
              <button
                onClick={() => router.push(`/resources?zone=${zone}`)}
                className="text-primary hover:underline underline-offset-2"
              >
                Change zone →
              </button>
            </p>
          )}
        </div>

        {/* Search */}
        {resources.length > 1 && (
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search this section…"
              className="pl-9 bg-background border-border/40"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Resources */}
        <div className="space-y-4">
          {filtered.map((resource) => (
            <Card key={resource.id} className="border-border/40 bg-card overflow-hidden">
              <button
                className="w-full text-left"
                onClick={() => toggle(resource.id)}
              >
                <CardHeader className="pb-3 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle className="font-headline text-base text-card-foreground">
                        {resource.title}
                      </CardTitle>
                      {resource.description && (
                        <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                      )}
                    </div>
                    {expanded[resource.id]
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    }
                  </div>
                </CardHeader>
              </button>

              {expanded[resource.id] && (
                <CardContent className="pt-0">
                  <ResourceRenderer resource={resource} zone={zone} />
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-12 text-muted-foreground">No results for &ldquo;{search}&rdquo;</p>
        )}
      </main>
    </div>
  )
}

// ── Resource content renderers ────────────────────────────────────────────────

function ResourceRenderer({ resource, zone }: { resource: Resource; zone: number }) {
  switch (resource.content_type) {
    case 'table':     return <TableRenderer resource={resource} zone={zone} />
    case 'calendar':  return <CalendarRenderer resource={resource} />
    case 'checklist': return <ChecklistRenderer resource={resource} />
    case 'reference': return <ReferenceRenderer resource={resource} />
    default:          return <pre className="text-xs">{JSON.stringify(resource.content, null, 2)}</pre>
  }
}

// ── Table renderer (with zone-aware switching) ────────────────────────────────
function TableRenderer({ resource, zone }: { resource: Resource; zone: number }) {
  const content = resource.content
  const [search, setSearch] = useState("")

  // Zone-specific tables have a "zones" key
  if (resource.zone_specific && content.zones) {
    const zoneKey = String(zone)
    const zoneData = content.zones[zoneKey] ?? content.zones["6"]
    const rows: string[][] = zoneData?.rows ?? []
    const columns: string[] = content.columns ?? []
    const filtered = rows.filter(row =>
      !search || row.some(cell => cell.toLowerCase().includes(search.toLowerCase()))
    )

    return (
      <div>
        {zoneData?.last_frost && (
          <div className="mb-4 flex flex-wrap gap-3">
            <Badge variant="outline" className="text-xs border-border/40">
              Last Frost: <strong className="ml-1">{zoneData.last_frost}</strong>
            </Badge>
            <Badge variant="outline" className="text-xs border-border/40">
              First Frost: <strong className="ml-1">{zoneData.first_frost === "none" ? "Rare/None" : zoneData.first_frost}</strong>
            </Badge>
          </div>
        )}
        <div className="relative mb-3 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Filter crops…"
            className="pl-8 h-8 text-xs bg-background border-border/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto rounded-lg border border-border/30">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-muted/50 border-b border-border/30">
                {columns.map((col, i) => (
                  <th key={i} className="px-3 py-2 text-left font-bold text-foreground whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-muted-foreground border-b border-border/20 whitespace-nowrap">
                      {cell === "—" ? <span className="text-muted-foreground/40">—</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{filtered.length} crops shown</p>
      </div>
    )
  }

  // Non-zone table
  const rows: (string[] | Record<string, any>)[] = content.rows ?? []
  const columns: string[] = content.columns ?? Object.keys(rows[0] ?? {})
  const filtered = rows.filter((row: any) =>
    !search || Object.values(row).some((v: any) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <div>
      {rows.length > 8 && (
        <div className="relative mb-3 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Filter…"
            className="pl-8 h-8 text-xs bg-background border-border/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-border/30">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/50 border-b border-border/30">
              {columns.map((col, i) => (
                <th key={i} className="px-3 py-2 text-left font-bold text-foreground">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(filtered as any[]).map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                {(Array.isArray(row) ? row : columns.map(c => row[c])).map((cell: any, ci: number) => (
                  <td key={ci} className="px-3 py-2 text-muted-foreground border-b border-border/20">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Extra notes/tips if present */}
      {content.storage_tips && (
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">Storage Tips</p>
          <ul className="space-y-1">
            {content.storage_tips.map((tip: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" /> {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── Calendar renderer (pruning) ───────────────────────────────────────────────
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const DIFFICULTY_COLOR = {
  Easy:     "bg-green-500/15 text-green-700 border-green-500/30",
  Moderate: "bg-amber-500/15 text-amber-700 border-amber-500/30",
  Difficult:"bg-red-500/15 text-red-700 border-red-500/30",
}

function CalendarRenderer({ resource }: { resource: Resource }) {
  const entries = resource.content.entries ?? []
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("all")

  const types = Array.from(new Set(entries.map((e: any) => e.type))) as string[]
  const filtered = entries.filter((e: any) =>
    (!search || e.plant.toLowerCase().includes(search.toLowerCase())) &&
    (filter === "all" || e.type === filter)
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search plants…" className="pl-8 h-8 text-xs bg-background border-border/40"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1 flex-wrap">
          <button onClick={() => setFilter("all")}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            All
          </button>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${filter === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((entry: any, i: number) => (
          <div key={i} className="rounded-xl border border-border/40 bg-background overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 bg-muted/30 flex flex-wrap items-center gap-3">
              <h3 className="font-headline font-bold text-sm text-foreground">{entry.plant}</h3>
              <Badge variant="outline" className="text-[10px] border-border/40">{entry.type}</Badge>
              {entry.difficulty && (
                <Badge variant="outline"
                  className={`text-[10px] ${DIFFICULTY_COLOR[entry.difficulty as keyof typeof DIFFICULTY_COLOR] ?? ""}`}>
                  {entry.difficulty}
                </Badge>
              )}
            </div>

            {/* Month chart */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-12 gap-0.5 mb-2">
                {MONTH_NAMES.map((m, mi) => {
                  const monthNum = mi + 1
                  const isBest  = entry.best_months?.includes(monthNum)
                  const isOkay  = entry.okay_months?.includes(monthNum)
                  const isAvoid = entry.avoid_months?.includes(monthNum)
                  return (
                    <div key={m} className="flex flex-col items-center gap-0.5">
                      <div className={`w-full h-5 rounded-sm text-[8px] font-bold flex items-center justify-center ${
                        isBest ? "bg-primary text-primary-foreground" :
                        isOkay ? "bg-primary/30 text-primary" :
                        isAvoid? "bg-muted/50 text-muted-foreground/40" :
                                 "bg-border/20 text-muted-foreground/30"
                      }`}>
                        {isBest ? "✓" : isOkay ? "~" : ""}
                      </div>
                      <span className="text-[8px] text-muted-foreground/60">{m}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded-sm bg-primary" /> Best time</span>
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded-sm bg-primary/30" /> Acceptable</span>
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded-sm bg-muted/50" /> Avoid</span>
              </div>
            </div>

            {/* Details */}
            <div className="px-4 pb-4 space-y-3">
              {entry.timing_note && (
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{entry.timing_note}</span>
                </div>
              )}
              {entry.goal && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Goal Shape</p>
                  <p className="text-xs text-muted-foreground">{entry.goal}</p>
                </div>
              )}
              {entry.cuts && entry.cuts.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-1.5">Cuts to Make</p>
                  <ul className="space-y-1">
                    {entry.cuts.map((cut: string, ci: number) => (
                      <li key={ci} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {cut}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Checklist renderer (seasonal) ────────────────────────────────────────────
function ChecklistRenderer({ resource }: { resource: Resource }) {
  const seasons = resource.content.seasons ?? {}
  const [activeSeason, setActiveSeason] = useState(Object.keys(seasons)[0] ?? "spring")
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const season = seasons[activeSeason]
  if (!season) return null

  const toggleTask = (key: string) => setChecked(c => ({ ...c, [key]: !c[key] }))
  const totalTasks = season.sections.reduce((acc: number, s: any) => acc + s.tasks.length, 0)
  const doneCount  = Object.values(checked).filter(Boolean).length

  return (
    <div>
      {/* Season tabs */}
      <div className="flex gap-1 mb-6 flex-wrap">
        {Object.entries(seasons).map(([key, val]: [string, any]) => (
          <button
            key={key}
            onClick={() => { setActiveSeason(key); setChecked({}) }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors capitalize ${
              activeSeason === key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-5 rounded-lg border border-border/40 bg-muted/20 px-4 py-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium text-foreground">Progress</span>
            <span className="text-muted-foreground">{doneCount} / {totalTasks} tasks</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0}%` }}
            />
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-xs shrink-0" onClick={() => setChecked({})}>
          Reset
        </Button>
      </div>

      {season.sections.map((section: any, si: number) => (
        <div key={si} className="mb-6">
          <h3 className="font-headline font-bold text-sm text-foreground mb-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-border/40" />
            {section.title}
            <span className="h-px flex-1 bg-border/40" />
          </h3>
          <ul className="space-y-2">
            {section.tasks.map((task: string, ti: number) => {
              const key = `${si}-${ti}`
              return (
                <li key={key}>
                  <button
                    className="flex items-start gap-3 w-full text-left group"
                    onClick={() => toggleTask(key)}
                  >
                    <div className={`mt-0.5 h-4 w-4 shrink-0 rounded border flex items-center justify-center transition-colors ${
                      checked[key]
                        ? "bg-primary border-primary"
                        : "border-border/60 group-hover:border-primary/50"
                    }`}>
                      {checked[key] && <CheckCircle2 className="h-3 w-3 text-primary-foreground fill-current" />}
                    </div>
                    <span className={`text-sm transition-colors ${
                      checked[key] ? "line-through text-muted-foreground/50" : "text-muted-foreground"
                    }`}>
                      {task}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

// ── Reference renderer (soil, building, canning) ──────────────────────────────
function ReferenceRenderer({ resource }: { resource: Resource }) {
  const content = resource.content

  // Canning reference has special structure
  if (content.warning) {
    return (
      <div className="space-y-6">
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-400">{content.warning}</p>
        </div>
        {content.water_bath && <CanningSection section={content.water_bath} />}
        {content.pressure_canning && <CanningSection section={content.pressure_canning} />}
        {content.freezing_guide && <FreezingSection section={content.freezing_guide} />}
      </div>
    )
  }

  // Building reference
  if (content.lumber) {
    return (
      <div className="space-y-8">
        {content.lumber && <RefSection title={content.lumber.title} note={content.lumber.note}
          columns={["Nominal Size", "Actual Size"]}
          rows={content.lumber.rows.map((r: any) => [r.nominal, r.actual])} />}
        {content.concrete && <RefSection title={content.concrete.title} note={content.concrete.coverage}
          columns={["Use","Mix Ratio","PSI","Notes"]}
          rows={content.concrete.rows.map((r: any) => [r.use, r.mix, r.psi, r.notes])} />}
        {content.post_depth && <PostDepthSection section={content.post_depth} />}
        {content.wire_gauge && <RefSection title={content.wire_gauge.title} note={content.wire_gauge.note}
          columns={["Gauge","Max Amps","Breaker","Common Uses","Cable Color"]}
          rows={content.wire_gauge.rows.map((r: any) => [r.gauge, r.amps, r.breaker, r.uses, r.wire_color])} />}
        {content.fasteners && <RefSection title={content.fasteners.title}
          columns={["Application","Fastener","Notes"]}
          rows={content.fasteners.rows.map((r: any) => [r.use, r.fastener, r.notes])} />}
      </div>
    )
  }

  // Soil deficiency reference
  if (content.deficiencies) {
    return (
      <div className="space-y-6">
        {content.ph_guide && (
          <div className="rounded-xl border border-border/40 bg-background p-4">
            <h3 className="font-headline font-bold text-sm text-foreground mb-3">{content.ph_guide.title}</h3>
            <div className="grid grid-cols-2 gap-1 mb-4">
              {content.ph_guide.ideal_ranges.map((r: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-xs bg-muted/30 rounded px-2 py-1">
                  <span className="text-muted-foreground">{r.crop}</span>
                  <span className="font-bold text-foreground">{r.ph}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {content.deficiencies.map((def: any, i: number) => (
          <div key={i} className="rounded-xl border border-border/40 bg-background overflow-hidden">
            <div className="px-4 py-3 bg-muted/30">
              <h3 className="font-headline font-bold text-sm text-foreground">{def.nutrient}</h3>
            </div>
            <div className="px-4 py-3 space-y-3">
              <div>
                <p className="text-[10px] font-bold uppercase text-destructive/70 mb-1">Visual Symptoms</p>
                <ul className="space-y-0.5">
                  {def.symptoms.map((s: string, si: number) => (
                    <li key={si} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-destructive/50 shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase text-amber-600 mb-1">Quick Fixes</p>
                  <ul className="space-y-0.5">
                    {def.quick_fixes.map((f: string, fi: number) => (
                      <li key={fi} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500/50 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-primary/70 mb-1">Long Term</p>
                  <ul className="space-y-0.5">
                    {def.long_term_fixes.map((f: string, fi: number) => (
                      <li key={fi} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/50 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {def.soil_test_target && (
                <p className="text-[10px] text-muted-foreground border-t border-border/30 pt-2">
                  <strong>Target:</strong> {def.soil_test_target}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return <pre className="text-xs overflow-auto">{JSON.stringify(content, null, 2)}</pre>
}

function RefSection({ title, note, columns, rows }: { title: string; note?: string; columns: string[]; rows: any[][] }) {
  return (
    <div>
      <h3 className="font-headline font-bold text-sm text-foreground mb-1">{title}</h3>
      {note && <p className="text-xs text-muted-foreground mb-2">{note}</p>}
      <div className="overflow-x-auto rounded-lg border border-border/30">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/50 border-b border-border/30">
              {columns.map((c, i) => <th key={i} className="px-3 py-2 text-left font-bold text-foreground whitespace-nowrap">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-muted-foreground border-b border-border/20">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PostDepthSection({ section }: { section: any }) {
  return (
    <div>
      <h3 className="font-headline font-bold text-sm text-foreground mb-1">{section.title}</h3>
      <p className="text-xs text-muted-foreground mb-3">{section.rule}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <RefSection title="Frost Lines by Region" columns={["Region","Frost Depth"]}
          rows={section.frost_lines.map((r: any) => [r.region, r.frost_depth])} />
        <RefSection title="Post Size by Fence Height" columns={["Fence Height","Post Length","Burial Depth"]}
          rows={section.rows.map((r: any) => [r.post_height, r.post_length, r.burial])} />
      </div>
    </div>
  )
}

function CanningSection({ section }: { section: any }) {
  return (
    <div>
      <h3 className="font-headline font-bold text-sm text-foreground mb-1">{section.title}</h3>
      {section.suitable_for && <p className="text-xs text-primary mb-1"><strong>Suitable for:</strong> {section.suitable_for}</p>}
      {section.not_suitable_for && <p className="text-xs text-destructive/70 mb-1"><strong>NOT suitable for:</strong> {section.not_suitable_for}</p>}
      {section.pressure_by_type && <p className="text-xs text-muted-foreground mb-2">{section.pressure_by_type}</p>}
      <div className="overflow-x-auto rounded-lg border border-border/30">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/50 border-b border-border/30">
              <th className="px-3 py-2 text-left font-bold">Food</th>
              <th className="px-3 py-2 text-left font-bold">Jar Size</th>
              <th className="px-3 py-2 text-left font-bold">Time</th>
              <th className="px-3 py-2 text-left font-bold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {section.items.map((item: any, i: number) => (
              <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="px-3 py-2 text-muted-foreground border-b border-border/20 whitespace-nowrap">{item.food}</td>
                <td className="px-3 py-2 text-muted-foreground border-b border-border/20">{item.jar_size}</td>
                <td className="px-3 py-2 text-muted-foreground border-b border-border/20 whitespace-nowrap">{item.time_minutes} min</td>
                <td className="px-3 py-2 text-muted-foreground border-b border-border/20">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FreezingSection({ section }: { section: any }) {
  return (
    <div>
      <h3 className="font-headline font-bold text-sm text-foreground mb-2">{section.title}</h3>
      <div className="overflow-x-auto rounded-lg border border-border/30">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/50 border-b border-border/30">
              <th className="px-3 py-2 text-left font-bold">Food</th>
              <th className="px-3 py-2 text-left font-bold">Blanch Time</th>
              <th className="px-3 py-2 text-left font-bold">Storage</th>
            </tr>
          </thead>
          <tbody>
            {section.items.map((item: any, i: number) => (
              <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="px-3 py-2 text-muted-foreground border-b border-border/20">{item.food}</td>
                <td className="px-3 py-2 text-muted-foreground border-b border-border/20">{typeof item.blanch_minutes === "number" ? `${item.blanch_minutes} min` : item.blanch_minutes}</td>
                <td className="px-3 py-2 text-muted-foreground border-b border-border/20">{item.storage_months} months</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


// ── Recipe renderer ───────────────────────────────────────────────────────────
function RecipeRenderer({ resource }: { resource: Resource }) {
  const content = resource.content
  const recipes: any[] = Array.isArray(content.recipes) ? content.recipes : [content]

  return (
    <div className="space-y-8">
      {recipes.map((recipe: any, ri: number) => (
        <div key={ri} className={ri > 0 ? "pt-6 border-t border-border/30" : ""}>
          {recipe.name && recipes.length > 1 && (
            <h3 className="font-headline font-bold text-base text-foreground mb-3">{recipe.name}</h3>
          )}

          {recipe.intro && (
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{recipe.intro}</p>
          )}

          {recipe.yield && (
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-primary/10 text-primary border border-primary/20">
              Makes: {recipe.yield}
            </div>
          )}

          {/* Ingredients */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Ingredients</h4>
              <ul className="space-y-1.5">
                {recipe.ingredients.map((ing: any, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="text-primary font-bold shrink-0">✓</span>
                    <span className="text-muted-foreground">
                      {ing.amount && <strong className="text-foreground">{ing.amount} </strong>}
                      {ing.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {recipe.steps && recipe.steps.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Directions</h4>
              <ol className="space-y-2.5 list-none pl-0">
                {recipe.steps.map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-primary text-primary-foreground mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Tips */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Tips</p>
              <ul className="space-y-1">
                {recipe.tips.map((tip: string, i: number) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="mt-1 h-1 w-1 rounded-full bg-primary/50 shrink-0" />{tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Caution */}
          {recipe.caution && (
            <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
              <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                <strong>⚠ Caution: </strong>{recipe.caution}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ResourceCategoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ResourceCategoryContent />
    </Suspense>
  )
}
