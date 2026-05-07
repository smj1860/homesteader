"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { useSupabaseClient } from "@/supabase"
import { clampZone } from "@/lib/zone-lookup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft, Search, Loader2, ChevronDown, ChevronUp,
  MapPin, CheckCircle2, Info, AlertTriangle, RotateCcw
} from "lucide-react"

const FOREST  = '#264228'
const GOLD    = '#A88032'
const PARCH   = '#F7F3EB'
const LEATHER = '#7C4B2A'

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

  const [resources, setResources] = useState<Resource[]>([])
  const [catName,   setCatName]   = useState("")
  const [loading,   setLoading]   = useState(true)
  const [search,    setSearch]    = useState("")
  const [expanded,  setExpanded]  = useState<Record<string, boolean>>({})

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
      if (res && res.length > 0) setExpanded({ [res[0].id]: true })
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
      <Loader2 className="h-8 w-8 animate-spin" style={{ color: FOREST }} />
    </div>
  )

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto max-w-5xl px-4 pt-8">

        {/* Breadcrumb */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-3 -ml-2"
            onClick={() => router.push(`/resources?zone=${zone}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Resource Library
          </Button>
          <div className="flex items-center justify-between gap-4">
            <h1
              className="font-headline text-2xl font-bold"
              style={{ color: FOREST }}
            >
              {catName}
            </h1>
            {resources.some(r => r.zone_specific) && (
              <Badge
                className="gap-1 shrink-0"
                style={{
                  backgroundColor: `${FOREST}15`,
                  color: FOREST,
                  border: `1px solid ${FOREST}30`,
                }}
              >
                <MapPin className="h-3 w-3" /> Showing Zone {zone}
              </Badge>
            )}
          </div>
          {resources.some(r => r.zone_specific) && (
            <p className="text-xs mt-1" style={{ color: `${FOREST}70` }}>
              Zone-specific content shown for Zone {zone}.{" "}
              <button
                className="underline hover:no-underline"
                style={{ color: GOLD }}
                onClick={() => router.push("/resources")}
              >
                Update zone
              </button>
            </p>
          )}
        </div>

        {/* Search */}
        {resources.length > 2 && (
          <div className="relative mb-6 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: `${FOREST}60` }}
            />
            <input
              placeholder="Search within this category…"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                border: `1.5px solid ${FOREST}25`,
                color: FOREST,
                backgroundColor: '#ffffff',
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Resource accordion cards */}
        <div className="space-y-4">
          {filtered.map(resource => (
            <Card key={resource.id} className="border-border/30 overflow-hidden">
              <button
                className="w-full text-left"
                onClick={() => toggle(resource.id)}
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
                  <div>
                    <CardTitle
                      className="font-headline text-lg font-bold mb-1"
                      style={{ color: 'var(--card-foreground)' }}
                    >
                      {resource.title}
                    </CardTitle>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'rgba(var(--card-foreground-rgb, 247 243 235) / 0.7)' }}
                    >
                      {resource.description}
                    </p>
                  </div>
                  <div className="shrink-0 mt-1">
                    {expanded[resource.id]
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
          <p
            className="text-center py-12 text-sm"
            style={{ color: `${FOREST}60` }}
          >
            No results for &ldquo;{search}&rdquo;
          </p>
        )}

        {/* Back link */}
        <div className="mt-10 pt-6" style={{ borderTop: `1px solid ${FOREST}15` }}>
          <button
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider hover:opacity-70"
            style={{ color: FOREST }}
            onClick={() => router.push(`/resources?zone=${zone}`)}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Resources
          </button>
        </div>

      </main>
    </div>
  )
}

// ── Resource renderer (switch) ─────────────────────────────────────────────────
function ResourceRenderer({ resource, zone }: { resource: Resource; zone: number }) {
  switch (resource.content_type) {
    case 'table':     return <TableRenderer resource={resource} zone={zone} />
    case 'calendar':  return <CalendarRenderer resource={resource} />
    case 'checklist': return <ChecklistRenderer resource={resource} />
    case 'reference': return <ReferenceRenderer resource={resource} />
    case 'recipe':    return <RecipeRenderer resource={resource} />
    case 'external':  return (
      <div className="py-4">
        <a
          href={(resource.content as any).path ?? '#'}
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all hover:opacity-80"
          style={{ backgroundColor: FOREST, color: PARCH }}
        >
          View full guide →
        </a>
      </div>
    )
    default: return (
      <pre
        className="text-xs overflow-auto rounded-lg p-4"
        style={{ backgroundColor: `${FOREST}08`, color: FOREST }}
      >
        {JSON.stringify(resource.content, null, 2)}
      </pre>
    )
  }
}

// ── Table renderer ─────────────────────────────────────────────────────────────
function TableRenderer({ resource, zone }: { resource: Resource; zone: number }) {
  const content = resource.content
  const [search, setSearch] = useState("")

  // Zone-specific (planting calendar, etc.)
  if (resource.zone_specific && content.zones) {
    const zoneKey  = String(zone)
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
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: `${FOREST}12`, color: FOREST, border: `1px solid ${FOREST}25` }}
            >
              Last Frost: <strong className="ml-1">{zoneData.last_frost}</strong>
            </span>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: `${FOREST}12`, color: FOREST, border: `1px solid ${FOREST}25` }}
            >
              First Frost:{" "}
              <strong className="ml-1">
                {zoneData.first_frost === "none" ? "Rare/None" : zoneData.first_frost}
              </strong>
            </span>
          </div>
        )}

        <div className="relative mb-3 max-w-xs">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
            style={{ color: `${FOREST}60` }}
          />
          <input
            placeholder="Filter crops…"
            className="w-full pl-8 pr-3 h-8 rounded-lg text-xs outline-none"
            style={{ border: `1.5px solid ${FOREST}25`, color: FOREST, backgroundColor: '#ffffff' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${FOREST}20` }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ backgroundColor: `${FOREST}12`, borderBottom: `1px solid ${FOREST}25` }}>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="px-3 py-2.5 text-left font-bold whitespace-nowrap"
                    style={{ color: FOREST }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, ri) => (
                <tr
                  key={ri}
                  style={{
                    backgroundColor: ri % 2 === 0 ? '#ffffff' : PARCH,
                    borderBottom: `1px solid ${FOREST}10`,
                  }}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-2 whitespace-nowrap"
                      style={{ color: ci === 0 ? FOREST : LEATHER }}
                    >
                      {cell === "—" ? <span style={{ color: `${FOREST}30` }}>—</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-2" style={{ color: `${FOREST}60` }}>
          {filtered.length} crops shown
        </p>
      </div>
    )
  }

  // Non-zone table (seed saving, livestock, etc.)
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
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
            style={{ color: `${FOREST}60` }}
          />
          <input
            placeholder="Filter…"
            className="w-full pl-8 pr-3 h-8 rounded-lg text-xs outline-none"
            style={{ border: `1.5px solid ${FOREST}25`, color: FOREST, backgroundColor: '#ffffff' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}
      <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${FOREST}20` }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: `${FOREST}12`, borderBottom: `1px solid ${FOREST}25` }}>
              {columns.map((col, i) => (
                <th key={i} className="px-3 py-2.5 text-left font-bold" style={{ color: FOREST }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(filtered as any[]).map((row, ri) => (
              <tr
                key={ri}
                style={{
                  backgroundColor: ri % 2 === 0 ? '#ffffff' : PARCH,
                  borderBottom: `1px solid ${FOREST}10`,
                }}
              >
                {(Array.isArray(row) ? row : columns.map(c => row[c])).map((cell: any, ci: number) => (
                  <td
                    key={ci}
                    className="px-3 py-2"
                    style={{ color: ci === 0 ? FOREST : LEATHER }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {content.storage_tips && (
        <div
          className="mt-4 rounded-lg p-4"
          style={{ backgroundColor: `${GOLD}10`, border: `1px solid ${GOLD}28` }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>
            Storage Tips
          </p>
          <ul className="space-y-1">
            {content.storage_tips.map((tip: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs" style={{ color: LEATHER }}>
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: GOLD }} />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── Calendar renderer (pruning) ────────────────────────────────────────────────
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const DIFFICULTY_STYLE: Record<string, React.CSSProperties> = {
  Easy:      { backgroundColor: '#22c55e18', color: '#15803d', border: '1px solid #22c55e35' },
  Moderate:  { backgroundColor: '#f59e0b18', color: '#b45309', border: '1px solid #f59e0b35' },
  Difficult: { backgroundColor: '#ef444418', color: '#b91c1c', border: '1px solid #ef444435' },
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
        {/* Search */}
        <div className="relative max-w-xs flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
            style={{ color: `${FOREST}60` }}
          />
          <input
            placeholder="Search plants…"
            className="w-full pl-8 pr-3 h-8 rounded-lg text-xs outline-none"
            style={{ border: `1.5px solid ${FOREST}25`, color: FOREST, backgroundColor: '#ffffff' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Type filters */}
        <div className="flex gap-1 flex-wrap">
          {["all", ...types].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-2 py-1 rounded text-xs font-medium transition-all capitalize"
              style={
                filter === t
                  ? { backgroundColor: FOREST, color: PARCH }
                  : { backgroundColor: `${FOREST}12`, color: `${FOREST}80` }
              }
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((entry: any, i: number) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${FOREST}20`, backgroundColor: '#ffffff' }}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between px-4 py-3"
              style={{ borderBottom: `1px solid ${FOREST}12` }}
            >
              <div>
                <p className="font-headline font-bold text-sm" style={{ color: FOREST }}>
                  {entry.plant}
                </p>
                <p className="text-xs capitalize" style={{ color: `${FOREST}70` }}>
                  {entry.type}
                </p>
              </div>
              {entry.difficulty && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={DIFFICULTY_STYLE[entry.difficulty] ?? {}}
                >
                  {entry.difficulty}
                </span>
              )}
            </div>

            {/* Month grid */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-12 gap-0.5 mb-2">
                {MONTH_NAMES.map((m, mi) => {
                  const isBest  = entry.best?.includes(mi + 1)
                  const isOkay  = entry.acceptable?.includes(mi + 1)
                  const isAvoid = entry.avoid?.includes(mi + 1)
                  return (
                    <div key={mi} className="flex flex-col items-center gap-0.5">
                      <div
                        className="h-6 w-full rounded-sm flex items-center justify-center text-[10px] font-bold"
                        style={
                          isBest  ? { backgroundColor: FOREST, color: PARCH } :
                          isOkay  ? { backgroundColor: `${FOREST}35`, color: FOREST } :
                          isAvoid ? { backgroundColor: '#00000010', color: '#00000030' } :
                                    { backgroundColor: '#00000006', color: '#00000018' }
                        }
                      >
                        {isBest ? "✓" : isOkay ? "~" : ""}
                      </div>
                      <span className="text-[8px]" style={{ color: `${FOREST}60` }}>{m}</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-4 text-[10px]" style={{ color: `${FOREST}70` }}>
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block w-3 h-2 rounded-sm"
                    style={{ backgroundColor: FOREST }}
                  />
                  Best time
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block w-3 h-2 rounded-sm"
                    style={{ backgroundColor: `${FOREST}35` }}
                  />
                  Acceptable
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="inline-block w-3 h-2 rounded-sm"
                    style={{ backgroundColor: '#00000015' }}
                  />
                  Avoid
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="px-4 pb-4 space-y-3">
              {entry.timing_note && (
                <div className="flex items-start gap-2 text-xs" style={{ color: LEATHER }}>
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <span>{entry.timing_note}</span>
                </div>
              )}
              {entry.goal && (
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: GOLD }}
                  >
                    Goal Shape
                  </p>
                  <p className="text-xs" style={{ color: LEATHER }}>{entry.goal}</p>
                </div>
              )}
              {entry.cuts?.length > 0 && (
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: FOREST }}
                  >
                    Cuts to Make
                  </p>
                  <ul className="space-y-1">
                    {entry.cuts.map((cut: string, ci: number) => (
                      <li key={ci} className="flex items-start gap-2 text-xs" style={{ color: LEATHER }}>
                        <span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: FOREST }}
                        />
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

// ── Checklist renderer (seasonal) ─────────────────────────────────────────────
const SEASON_COLORS: Record<string, { activeBg: string; activeText: string }> = {
  spring: { activeBg: FOREST,    activeText: PARCH },
  summer: { activeBg: GOLD,      activeText: '#1a1a1a' },
  fall:   { activeBg: '#8B4513', activeText: PARCH },
  winter: { activeBg: '#3d5a80', activeText: PARCH },
}

function ChecklistRenderer({ resource }: { resource: Resource }) {
  const seasons = resource.content.seasons ?? {}
  const [activeSeason, setActiveSeason] = useState(Object.keys(seasons)[0] ?? "spring")
  const [checked,      setChecked]      = useState<Record<string, boolean>>({})

  const season = seasons[activeSeason]
  if (!season) return null

  const toggleTask = (key: string) => setChecked(c => ({ ...c, [key]: !c[key] }))
  const totalTasks = season.sections.reduce((acc: number, s: any) => acc + s.tasks.length, 0)
  const doneCount  = Object.values(checked).filter(Boolean).length
  const sc         = SEASON_COLORS[activeSeason] ?? SEASON_COLORS.spring

  return (
    <div>
      {/* Season tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {Object.keys(seasons).map(key => {
          const c = SEASON_COLORS[key] ?? SEASON_COLORS.spring
          return (
            <button
              key={key}
              onClick={() => { setActiveSeason(key); setChecked({}) }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize"
              style={
                activeSeason === key
                  ? { backgroundColor: c.activeBg, color: c.activeText }
                  : { backgroundColor: `${FOREST}15`, color: `${FOREST}80` }
              }
            >
              {key}
            </button>
          )
        })}
      </div>

      {/* Progress */}
      <div
        className="mb-5 rounded-lg px-4 py-3 flex items-center gap-4"
        style={{ backgroundColor: `${FOREST}10`, border: `1px solid ${FOREST}20` }}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold" style={{ color: FOREST }}>Progress</span>
            <span className="text-xs" style={{ color: `${FOREST}80` }}>
              {doneCount} / {totalTasks} tasks
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: `${FOREST}20` }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0}%`,
                backgroundColor: GOLD,
              }}
            />
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 text-xs font-semibold shrink-0 transition-opacity hover:opacity-70"
          style={{ color: `${FOREST}80` }}
          onClick={() => setChecked({})}
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* Sections */}
      {season.sections.map((section: any, si: number) => (
        <div key={si} className="mb-6">
          {/* Full-width divider */}
          <div className="relative flex items-center mb-3">
            <div className="flex-1 h-px" style={{ backgroundColor: `${FOREST}25` }} />
            <span
              className="mx-4 text-xs font-bold uppercase tracking-widest shrink-0"
              style={{ color: LEATHER }}
            >
              {section.title}
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: `${FOREST}25` }} />
          </div>

          {/* Task list — parchment background */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: PARCH, border: `1.5px solid ${FOREST}18` }}
          >
            <ul>
              {section.tasks.map((task: string, ti: number) => {
                const key  = `${si}-${ti}`
                const done = !!checked[key]
                return (
                  <li
                    key={ti}
                    style={{
                      borderBottom: ti < section.tasks.length - 1
                        ? `1px solid ${FOREST}12`
                        : 'none',
                    }}
                  >
                    <button
                      className="flex items-start gap-3.5 w-full text-left px-5 py-3.5 transition-colors"
                      style={{ backgroundColor: done ? `${FOREST}08` : 'transparent' }}
                      onClick={() => toggleTask(key)}
                    >
                      <div
                        className="shrink-0 rounded flex items-center justify-center transition-all mt-0.5"
                        style={{
                          minWidth: '18px',
                          minHeight: '18px',
                          backgroundColor: done ? FOREST : 'transparent',
                          border: `2px solid ${done ? FOREST : `${FOREST}40`}`,
                        }}
                      >
                        {done && (
                          <CheckCircle2 className="h-3 w-3" style={{ color: PARCH }} />
                        )}
                      </div>
                      <span
                        className="text-sm leading-relaxed transition-all"
                        style={{
                          color: done ? `${FOREST}50` : FOREST,
                          textDecoration: done ? 'line-through' : 'none',
                        }}
                      >
                        {task}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Reference renderer ─────────────────────────────────────────────────────────
function ReferenceRenderer({ resource }: { resource: Resource }) {
  const content = resource.content

  // Preservation / canning
  if (content.warning) {
    return (
      <div className="space-y-6">
        <div
          className="flex items-start gap-2 rounded-lg p-3"
          style={{ backgroundColor: '#f59e0b15', border: '1px solid #f59e0b40' }}
        >
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: '#b45309' }} />
          <p className="text-xs" style={{ color: '#92400e' }}>{content.warning}</p>
        </div>
        {content.water_bath      && <CanningSection section={content.water_bath} />}
        {content.pressure_canning && <CanningSection section={content.pressure_canning} />}
        {content.freezing_guide  && <FreezingSection section={content.freezing_guide} />}
      </div>
    )
  }

  // Building reference
  if (content.lumber) {
    return (
      <div className="space-y-8">
        {content.lumber && (
          <RefSection
            title={content.lumber.title}
            note={content.lumber.note}
            columns={["Nominal Size", "Actual Size"]}
            rows={content.lumber.rows.map((r: any) => [r.nominal, r.actual])}
          />
        )}
        {content.concrete && (
          <RefSection
            title={content.concrete.title}
            note={content.concrete.coverage}
            columns={["Use", "Mix Ratio", "PSI", "Notes"]}
            rows={content.concrete.rows.map((r: any) => [r.use, r.mix, r.psi, r.notes])}
          />
        )}
        {content.post_depth && <PostDepthSection section={content.post_depth} />}
        {content.wire_gauge && (
          <RefSection
            title={content.wire_gauge.title}
            note={content.wire_gauge.note}
            columns={["Gauge", "Max Amps", "Breaker", "Common Uses", "Cable Color"]}
            rows={content.wire_gauge.rows.map((r: any) => [r.gauge, r.amps, r.breaker, r.uses, r.wire_color])}
          />
        )}
        {content.fasteners && (
          <RefSection
            title={content.fasteners.title}
            columns={["Application", "Fastener", "Notes"]}
            rows={content.fasteners.rows.map((r: any) => [r.use, r.fastener, r.notes])}
          />
        )}
      </div>
    )
  }

  // Soil deficiency reference
  if (content.deficiencies) {
    return (
      <div className="space-y-6">
        {content.ph_guide && (
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: '#ffffff', border: `1px solid ${FOREST}20` }}
          >
            <h3
              className="font-headline font-bold text-sm mb-3"
              style={{ color: FOREST }}
            >
              {content.ph_guide.title}
            </h3>
            <div className="grid grid-cols-2 gap-1 mb-2">
              {content.ph_guide.ideal_ranges.map((r: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-xs rounded px-2 py-1"
                  style={{ backgroundColor: `${FOREST}08` }}
                >
                  <span style={{ color: LEATHER }}>{r.crop}</span>
                  <span className="font-bold" style={{ color: FOREST }}>{r.ph}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {content.deficiencies.map((def: any, i: number) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${FOREST}20`, backgroundColor: '#ffffff' }}
          >
            <div className="px-4 py-3" style={{ backgroundColor: `${FOREST}10` }}>
              <h3 className="font-headline font-bold text-sm" style={{ color: FOREST }}>
                {def.nutrient}
              </h3>
            </div>
            <div className="px-4 py-3 space-y-3">
              <div>
                <p
                  className="text-[10px] font-bold uppercase mb-1"
                  style={{ color: '#b91c1c' }}
                >
                  Visual Symptoms
                </p>
                <ul className="space-y-0.5">
                  {def.symptoms.map((s: string, si: number) => (
                    <li key={si} className="text-xs" style={{ color: LEATHER }}>• {s}</li>
                  ))}
                </ul>
              </div>
              {def.causes && (
                <div>
                  <p
                    className="text-[10px] font-bold uppercase mb-1"
                    style={{ color: GOLD }}
                  >
                    Common Causes
                  </p>
                  <ul className="space-y-0.5">
                    {def.causes.map((c: string, ci: number) => (
                      <li key={ci} className="text-xs" style={{ color: LEATHER }}>• {c}</li>
                    ))}
                  </ul>
                </div>
              )}
              {def.fix && (
                <div>
                  <p
                    className="text-[10px] font-bold uppercase mb-1"
                    style={{ color: FOREST }}
                  >
                    Fix
                  </p>
                  <p className="text-xs" style={{ color: LEATHER }}>{def.fix}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <pre className="text-xs overflow-auto rounded-lg p-4" style={{ backgroundColor: `${FOREST}08`, color: FOREST }}>
      {JSON.stringify(content, null, 2)}
    </pre>
  )
}

// ── Sub-renderers ──────────────────────────────────────────────────────────────
function RefSection({
  title,
  note,
  columns,
  rows,
}: {
  title: string
  note?: string
  columns: string[]
  rows: string[][]
}) {
  return (
    <div>
      <h3 className="font-headline font-bold text-sm mb-1" style={{ color: FOREST }}>
        {title}
      </h3>
      {note && (
        <p className="text-xs mb-3 leading-relaxed" style={{ color: LEATHER }}>{note}</p>
      )}
      <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${FOREST}20` }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: `${FOREST}12`, borderBottom: `1px solid ${FOREST}25` }}>
              {columns.map((col, i) => (
                <th key={i} className="px-3 py-2.5 text-left font-bold" style={{ color: FOREST }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  backgroundColor: ri % 2 === 0 ? '#ffffff' : PARCH,
                  borderBottom: `1px solid ${FOREST}10`,
                }}
              >
                {row.map((cell: any, ci: number) => (
                  <td
                    key={ci}
                    className="px-3 py-2"
                    style={{ color: ci === 0 ? FOREST : LEATHER }}
                  >
                    {cell}
                  </td>
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
      <h3 className="font-headline font-bold text-sm mb-1" style={{ color: FOREST }}>
        {section.title}
      </h3>
      <p className="text-xs mb-3" style={{ color: LEATHER }}>{section.rule}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <RefSection
          title="Frost Lines by Region"
          columns={["Region", "Frost Depth"]}
          rows={section.frost_lines.map((r: any) => [r.region, r.frost_depth])}
        />
        <RefSection
          title="Post Size by Fence Height"
          columns={["Fence Height", "Post Length", "Burial Depth"]}
          rows={section.rows.map((r: any) => [r.post_height, r.post_length, r.burial])}
        />
      </div>
    </div>
  )
}

function CanningSection({ section }: { section: any }) {
  return (
    <div>
      <h3 className="font-headline font-bold text-sm mb-1" style={{ color: FOREST }}>
        {section.title}
      </h3>
      {section.suitable_for && (
        <p className="text-xs mb-1">
          <strong style={{ color: FOREST }}>Suitable for:</strong>{" "}
          <span style={{ color: LEATHER }}>{section.suitable_for}</span>
        </p>
      )}
      {section.not_suitable_for && (
        <p className="text-xs mb-1">
          <strong style={{ color: '#b91c1c' }}>NOT suitable for:</strong>{" "}
          <span style={{ color: LEATHER }}>{section.not_suitable_for}</span>
        </p>
      )}
      {section.pressure_by_type && (
        <p className="text-xs mb-3" style={{ color: LEATHER }}>{section.pressure_by_type}</p>
      )}
      <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${FOREST}20` }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: `${FOREST}12`, borderBottom: `1px solid ${FOREST}25` }}>
              {["Food", "Jar Size", "Time", "Notes"].map(h => (
                <th key={h} className="px-3 py-2.5 text-left font-bold" style={{ color: FOREST }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.items.map((item: any, i: number) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? '#ffffff' : PARCH,
                  borderBottom: `1px solid ${FOREST}10`,
                }}
              >
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: FOREST }}>{item.food}</td>
                <td className="px-3 py-2" style={{ color: LEATHER }}>{item.jar_size}</td>
                <td className="px-3 py-2 whitespace-nowrap font-semibold" style={{ color: FOREST }}>
                  {item.time_minutes} min
                </td>
                <td className="px-3 py-2 leading-relaxed" style={{ color: LEATHER }}>{item.notes}</td>
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
      <h3 className="font-headline font-bold text-sm mb-2" style={{ color: FOREST }}>
        {section.title}
      </h3>
      <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${FOREST}20` }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: `${FOREST}12`, borderBottom: `1px solid ${FOREST}25` }}>
              {["Food", "Blanch Time", "Freezer Storage"].map(h => (
                <th key={h} className="px-3 py-2.5 text-left font-bold" style={{ color: FOREST }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.items.map((item: any, i: number) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? '#ffffff' : PARCH,
                  borderBottom: `1px solid ${FOREST}10`,
                }}
              >
                <td className="px-3 py-2" style={{ color: FOREST }}>{item.food}</td>
                <td className="px-3 py-2" style={{ color: LEATHER }}>
                  {typeof item.blanch_minutes === "number"
                    ? `${item.blanch_minutes} min`
                    : item.blanch_minutes}
                </td>
                <td className="px-3 py-2 font-semibold" style={{ color: FOREST }}>
                  {item.storage_months} months
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Recipe renderer ────────────────────────────────────────────────────────────
function RecipeRenderer({ resource }: { resource: Resource }) {
  const content = resource.content
  const recipes: any[] = Array.isArray(content.recipes) ? content.recipes : [content]

  return (
    <div className="space-y-8">
      {recipes.map((recipe: any, ri: number) => (
        <div
          key={ri}
          className={ri > 0 ? "pt-6" : ""}
          style={ri > 0 ? { borderTop: `1px solid ${FOREST}20` } : {}}
        >
          {recipe.name && recipes.length > 1 && (
            <h3 className="font-headline font-bold text-base mb-3" style={{ color: FOREST }}>
              {recipe.name}
            </h3>
          )}

          {recipe.intro && (
            <p className="text-sm mb-4 leading-relaxed" style={{ color: LEATHER }}>
              {recipe.intro}
            </p>
          )}

          {recipe.yield && (
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-4"
              style={{ backgroundColor: `${FOREST}10`, color: FOREST, border: `1px solid ${FOREST}25` }}
            >
              Makes: {recipe.yield}
            </div>
          )}

          {recipe.ingredients?.length > 0 && (
            <div className="mb-5">
              <h4
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: `${FOREST}80` }}
              >
                Ingredients
              </h4>
              <ul className="space-y-1.5">
                {recipe.ingredients.map((ing: any, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="font-bold shrink-0" style={{ color: GOLD }}>✓</span>
                    <span style={{ color: FOREST }}>
                      {ing.amount && <strong>{ing.amount} </strong>}
                      {ing.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.steps?.length > 0 && (
            <div className="mb-5">
              <h4
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: `${FOREST}80` }}
              >
                Directions
              </h4>
              <ol className="space-y-2.5 list-none pl-0">
                {recipe.steps.map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5"
                      style={{ backgroundColor: FOREST, color: PARCH }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: FOREST }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {recipe.tips?.length > 0 && (
            <div
              className="rounded-lg p-4 space-y-1.5"
              style={{ backgroundColor: `${GOLD}10`, border: `1px solid ${GOLD}28` }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: GOLD }}
              >
                Tips
              </p>
              {recipe.tips.map((tip: string, i: number) => (
                <p key={i} className="text-xs leading-relaxed" style={{ color: LEATHER }}>
                  • {tip}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Page export ────────────────────────────────────────────────────────────────
export default function ResourceSlugPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Navigation />
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: FOREST }} />
      </div>
    }>
      <ResourceCategoryContent />
    </Suspense>
  )
}
