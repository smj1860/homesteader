"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PricingModal } from "@/components/PricingModal"
import { useSustainData } from "@/hooks/use-sustain-data"
import {
  Search, ChevronRight, Sprout, Flame, Package, Wrench, Droplets, Zap,
  Wind, Sun, Beef, Hammer, BookOpen, Leaf, ShieldAlert, Sparkles, Loader2,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "landscaping", name: "Garden & Land", icon: Sprout,
    desc: "Everything from seed to harvest — vegetables, fruit, soil, and landscaping.",
    subcategories: ["Vegetable gardening","Fruit trees & orchards","Soil building & composting","Raised beds & container gardens","Lawn & pasture management","Irrigation & watering systems","Pest & weed control","Permaculture & food forests"],
  },
  {
    id: "cooking", name: "Cooking & Baking", icon: Flame,
    desc: "From-scratch cooking, sourdough, fermentation, and preserving the harvest.",
    subcategories: ["Sourdough & bread baking","Fermentation & culturing","Cooking from scratch","Canning & water bath","Pressure canning","Dehydrating & freeze-drying","Cheese & dairy","Butchering & meat prep"],
  },
  {
    id: "canning", name: "Canning & Preservation", icon: Package,
    desc: "Safe long-term food storage for every season.",
    subcategories: ["Water bath canning","Pressure canning","Jams, jellies & preserves","Pickling & brining","Freeze-drying","Root cellar & cold storage","Vacuum sealing","Lacto-fermentation"],
  },
  {
    id: "auto", name: "Auto & Small Engine", icon: Wrench,
    desc: "Keep tractors, ATVs, generators, and power tools running.",
    subcategories: ["Tractors & farm equipment","ATVs & UTVs","Generators & engines","Chainsaws & power tools","Lawn mowers & tillers","Trucks & trailers","Welding & metalwork"],
  },
  {
    id: "plumbing", name: "Plumbing", icon: Droplets,
    desc: "Well systems, septic, and off-grid water management.",
    contractorOnly: true,
    subcategories: ["Well systems & pumps","Pipe repair & replacement","Water heater install & repair","Irrigation & outdoor water lines","Septic & greywater systems","Rainwater harvesting","Fixtures & faucets"],
  },
  {
    id: "electrical", name: "Electrical", icon: Zap,
    desc: "Wiring, power distribution, and safety-first outbuilding power.",
    contractorOnly: true,
    subcategories: ["Panel upgrades & breakers","Outlets, switches & wiring","Generator hookups & transfer switches","Outbuilding & barn wiring","Low-voltage & lighting","EV & equipment charging"],
  },
  {
    id: "hvac", name: "HVAC", icon: Wind,
    desc: "Heating, cooling, and ventilation — from wood stoves to mini-splits.",
    contractorOnly: true,
    subcategories: ["Wood stoves & pellet stoves","Propane & fuel oil heating","Mini-split installation & repair","Central HVAC maintenance","Ductwork & ventilation","Whole-house fans & attic ventilation","Heat pumps & geothermal","Air quality & filtration"],
  },
  {
    id: "solar", name: "Solar & Off-Grid", icon: Sun,
    desc: "Harness off-grid energy with solar and battery systems.",
    subcategories: ["Solar panel installation","Battery banks & storage","Inverters & charge controllers","Wind & micro-hydro power","Off-grid cabin power systems","Propane & backup fuel systems","Energy efficiency & insulation"],
  },
  {
    id: "livestock", name: "Animals & Livestock", icon: Beef,
    desc: "Comprehensive care for every animal on your acreage.",
    subcategories: ["Chickens & poultry","Goats & sheep","Cattle & pigs","Rabbits & small animals","Beekeeping","Fencing & pasture management","Barn & shelter building","Animal health & first aid"],
  },
  {
    id: "building", name: "Building & Renovation", icon: Hammer,
    desc: "Structures built to last — from sheds to full renovations.",
    subcategories: ["Sheds & outbuildings","Fencing & gates","Decks & porches","Roofing & gutters","Framing & foundations","Flooring & interior finishes","Concrete & masonry","Insulation & weatherproofing"],
  },
  {
    id: "resources", name: "Resources", icon: BookOpen,
    desc: "Reference guides, charts, and field-tested knowledge.",
    subcategories: ["Planting calendars","Soil & composting guides","Animal care references","Building code summaries","Canning safety tables","Seed saving guides","Pest identification charts"],
  },
  {
    id: "self-sufficiency", name: "Self-Sufficiency", icon: Leaf,
    desc: "The essential skills for a truly independent homestead.",
    subcategories: ["Natural medicine & herbalism","Water storage & filtration","Home energy audits","Sewing & fiber arts","Soap & candle making","Natural cleaning products","Emergency preparedness","Homestead financial planning"],
  },
]

function ProjectsContent() {
  const router        = useRouter()
  const searchParams  = useSearchParams()
  const { tier, upgradeToPaid, credits } = useSustainData()

  const [search,           setSearch]           = useState("")
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[0] | null>(null)
  const [showPricing,      setShowPricing]       = useState(false)

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  )

  const handleProjectStart = (categoryId: string, subcategory: string) => {
    if (tier === "free" && credits <= 0) { setShowPricing(true); return }
    setSelectedCategory(null)
    router.push(`/projects/generate?category=${categoryId}&subcategory=${encodeURIComponent(subcategory)}`)
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-6xl">

        <header className="mb-10">
          <h1 className="font-headline text-3xl font-bold text-foreground">Project Guides</h1>
          <p className="text-muted-foreground mt-1">
            Choose a category and SteadCraft AI will generate step-by-step instructions tailored to your homestead.
          </p>
        </header>

        {/* Search */}
        <div className="relative mb-8 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-10 border-border/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Credits banner */}
        {tier === "free" && (
          <div className="mb-8 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {credits > 0 ? `${credits} free guide remaining` : "No guides remaining"}
              </p>
              <p className="text-xs text-muted-foreground">
                {credits > 0 ? "Use it on any category below." : "Upgrade to unlock unlimited guides."}
              </p>
            </div>
            <Button size="sm" className="bg-primary text-primary-foreground font-bold shrink-0" onClick={() => setShowPricing(true)}>
              Try Pro Free
            </Button>
          </div>
        )}

        {/* Category grid */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => (
            <Card
              key={cat.id}
              className="group hover:border-primary transition-all overflow-hidden flex flex-col h-full cursor-pointer bg-card text-card-foreground shadow-sm"
              onClick={() => setSelectedCategory(cat)}
            >
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  {/* ── FIX: icon circle now uses leather color, not white ── */}
                  <div className="rounded-xl bg-leather/15 p-3 text-leather group-hover:bg-leather/25 transition-colors">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  {cat.contractorOnly && (
                    <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground text-[10px]">
                      Pro Verified
                    </Badge>
                  )}
                </div>
                <CardTitle className="font-headline text-xl text-card-foreground">{cat.name}</CardTitle>
                <CardDescription className="line-clamp-2 text-card-foreground/70">{cat.desc}</CardDescription>
              </CardHeader>
              <CardFooter className="bg-black/10 mt-auto pt-4 pb-4 flex justify-between items-center text-xs font-bold text-card-foreground">
                <span>{cat.subcategories.length} Subcategories</span>
                <ChevronRight className="h-4 w-4" />
              </CardFooter>
            </Card>
          ))}
        </section>

        {/* Subcategory dialog */}
        <Dialog open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl flex items-center gap-2">
                {selectedCategory?.icon && <selectedCategory.icon className="h-6 w-6 text-leather" />}
                {selectedCategory?.name}
              </DialogTitle>
              <DialogDescription>
                Select a specific niche to get the most accurate AI guidance.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {selectedCategory?.subcategories.map((sub) => (
                <Button
                  key={sub}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 text-left whitespace-normal hover:border-primary hover:bg-primary/5"
                  onClick={() => handleProjectStart(selectedCategory.id, sub)}
                >
                  {sub}
                </Button>
              ))}
            </div>
            {selectedCategory?.contractorOnly && (
              <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20 flex gap-3">
                <ShieldAlert className="h-5 w-5 text-leather shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Projects in this category are high-risk. We strongly recommend viewing our vetted contractor list for professional help.
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Bottom CTA */}
        <section className="mt-12 rounded-2xl bg-card p-8 text-center border border-border/40 text-card-foreground">
          <Sparkles className="mx-auto h-12 w-12 text-leather opacity-50 mb-4" />
          <h2 className="font-headline text-2xl font-bold mb-2">Expert AI Guidance</h2>
          <p className="opacity-80 max-w-2xl mx-auto mb-6">
            SteadCraft AI is trained on thousands of technical homesteading documents.
            Choose your niche and build something lasting today.
          </p>
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link href="/projects/generate?category=custom">Custom Project Guide</Link>
          </Button>
        </section>

      </main>

      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        onUpgrade={() => { upgradeToPaid(); setShowPricing(false) }}
      />
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  )
}
