"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, MapPin, Phone, ExternalLink, ShieldCheck, TrendingUp } from "lucide-react"

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'

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

  const filtered = mockContractors.filter(c => activeTab === 'all' || c.type === activeTab)

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-6xl">

        <header className="mb-8">
          <h1 className="font-headline text-3xl font-bold text-foreground">Recommended Local Pros</h1>
          <p className="text-muted-foreground mt-1">
            Vetted contractors ranked by real community feedback — not just star averages.
          </p>
        </header>

        {/* Search card */}
        <Card className="mb-8 border-border/40 bg-card/30">
          <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-card-foreground">Your Zip Code</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter zip code..."
                  className="pl-10 bg-background border-border/40"
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-card-foreground">Service Type</label>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all"       className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="plumbing"  className="flex-1">Plumbing</TabsTrigger>
                  <TabsTrigger value="electrical" className="flex-1">Electric</TabsTrigger>
                  <TabsTrigger value="handyman"  className="flex-1">Handyman</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button className="bg-primary px-8 font-bold">Search Pros</Button>
          </CardContent>
        </Card>

        {/* Contractor cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {filtered.map((pro, index) => (
            <Card
              key={pro.id}
              className="relative overflow-hidden hover:shadow-lg transition-all border-border/30 bg-card"
            >
              {/* AI Top Choice ribbon */}
              {index === 0 && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-lg flex items-center gap-1"
                  style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
                >
                  <TrendingUp className="h-3 w-3" /> Top Choice
                </div>
              )}

              <CardHeader>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{
                        fill: i < Math.floor(pro.rating) ? GOLD : 'transparent',
                        color: GOLD,
                      }}
                    />
                  ))}
                  <span className="ml-1 text-sm font-bold text-card-foreground">{pro.rating}</span>
                  <span className="text-xs text-card-foreground/60">({pro.reviews} reviews)</span>
                </div>

                <CardTitle className="font-headline text-card-foreground">{pro.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-card-foreground/60">
                  <MapPin className="h-3 w-3" /> {pro.address}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* ── FIX: keyword ovals now use explicit colors that work on dark cards ── */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pro.keywords.map(kw => (
                    <span
                      key={kw}
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${GOLD}18`,
                        color: GOLD,
                        border: `1px solid ${GOLD}33`,
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* ── FIX: trust sentence — no AI/NLP language ── */}
                <p className="text-xs leading-relaxed text-card-foreground/70">
                  Community reviewers specifically called out{" "}
                  <span className="font-semibold" style={{ color: GOLD }}>{pro.keywords[0]}</span>
                  {" "}as a standout quality — and that's exactly the kind of feedback we use to build this list.
                </p>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1 border-border/30 text-card-foreground hover:bg-card-foreground/10" size="sm">
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
                <Button className="flex-1 font-bold" size="sm" style={{ backgroundColor: GOLD, color: '#1a1a1a' }}>
                  Get Quote <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* ── FIX: Why Trust section — honest plain language, no tech jargon ── */}
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
                We don't just pull names out of a hat. Every contractor on this list has been
                evaluated against real feedback from real customers — not just their overall star rating,
                but what people in your community actually said about their experience and results.
                We look for consistent praise around the things that matter most on a homestead:
                showing up when they say they will, doing the job right, being straight with you on
                price, and understanding the kind of work you're asking for.
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: `${FOREST}cc` }}>
                If a contractor has 200 reviews that say &ldquo;great for apartments&rdquo; but none that mention
                well systems, off-grid setups, or rural properties — they don&apos;t make this list.
                The ones who do have earned it by doing the work, repeatedly, for people who live the same
                kind of life you do.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest" style={{ color: `${FOREST}88` }}>
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
