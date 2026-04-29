
"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PricingModal } from "@/components/PricingModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { 
  Sprout, 
  Flame, 
  Droplets, 
  Zap, 
  Hammer, 
  Package, 
  Search, 
  Sparkles, 
  Sun, 
  Beef, 
  Leaf, 
  ChevronRight,
  ShieldAlert,
  Wrench,
Wind } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const categories = [
  {
    id: "landscaping",
    name: "Landscape & Gardening",
    icon: Sprout,
    desc: "Built for every corner of your land — from food forests to raised beds.",
    subcategories: [
      "Raised bed & container gardens",
      "Soil & composting",
      "Irrigation & watering systems",
      "Fruit trees & food forests",
      "Pest & weed control",
      "Greenhouse & cold frames",
      "Lawn care & pasture",
      "Seed saving & propagation"
    ]
  },
  {
    id: "cooking",
    name: "Cooking & Baking",
    icon: Flame,
    desc: "Master hearth and home with scratch-made meals and baking.",
    subcategories: [
      "Cast iron & wood stove cooking",
      "Bread & sourdough baking",
      "Fermentation & cultures",
      "Outdoor & open-fire cooking",
      "Dairy — butter, cheese, yogurt",
      "Meal planning from scratch",
      "Dehydrating & drying food"
    ]
  },
  {
    id: "canning",
    name: "Canning",
    icon: Package,
    desc: "Preserve the harvest with professional-grade canning techniques.",
    subcategories: [
      "Water bath canning",
      "Pressure canning",
      "Pickling & brining",
      "Jams, jellies & preserves",
      "Freezing & vacuum sealing",
      "Root cellar & cold storage",
      "Smoking & curing meats"
    ]
  },
  {
    id: "auto",
    name: "Auto & Small Engine Repair",
    icon: Wrench,
    desc: "Maintain the machines that run your homestead.",
    subcategories: [
      "Tractors & farm equipment",
      "ATVs & UTVs",
      "Generators & engines",
      "Chainsaws & power tools",
      "Lawn mowers & tillers",
      "Trucks & trailers",
      "Welding & metalwork"
    ]
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Droplets,
    desc: "Well systems, septic, and off-grid water management.",
    contractorOnly: true,
    subcategories: [
      "Well systems & pumps",
      "Pipe repair & replacement",
      "Water heater install & repair",
      "Irrigation & outdoor water lines",
      "Septic & greywater systems",
      "Rainwater harvesting",
      "Fixtures & faucets"
    ]
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
    desc: "Wiring, power distribution, and safety-first outbuilding power.",
    contractorOnly: true,
    subcategories: [
      "Panel upgrades & breakers",
      "Outlets, switches & wiring",
      "Generator hookups & transfer switches",
      "Outbuilding & barn wiring",
      "Low-voltage & lighting",
      "EV & equipment charging"
    ]
  },
  {
    id: "hvac",
    name: "HVAC",
    icon: Wind,
    desc: "Heating, cooling, and ventilation — from wood stoves to mini-splits and propane systems.",
    contractorOnly: true,
    subcategories: [
      "Wood stoves & pellet stoves",
      "Propane & fuel oil heating",
      "Mini-split installation & repair",
      "Central HVAC maintenance",
      "Ductwork & ventilation",
      "Whole-house fans & attic ventilation",
      "Heat pumps & geothermal",
      "Air quality & filtration"
    ]
  },
  {
    id: "solar",
    name: "Solar",
    icon: Sun,
    desc: "Harness off-grid energy with solar and battery systems.",
    subcategories: [
      "Solar panel installation",
      "Battery banks & storage",
      "Inverters & charge controllers",
      "Wind & micro-hydro power",
      "Off-grid cabin power systems",
      "Propane & backup fuel systems",
      "Energy efficiency & insulation"
    ]
  },
  {
    id: "livestock",
    name: "Animals & Livestock",
    icon: Beef,
    desc: "Comprehensive care for every animal on your acreage.",
    subcategories: [
      "Chickens & poultry",
      "Goats & sheep",
      "Cattle & pigs",
      "Rabbits & small animals",
      "Beekeeping",
      "Fencing & pasture management",
      "Barn & shelter building",
      "Animal health & first aid"
    ]
  },
  {
    id: "building",
    name: "Building & Renovation",
    icon: Hammer,
    desc: "Structures built to last — from sheds to master renovations.",
    subcategories: [
      "Sheds & outbuildings",
      "Fencing & gates",
      "Decks & porches",
      "Roofing & gutters",
      "Framing & foundations",
      "Flooring & interior finishes",
      "Concrete & masonry",
      "Insulation & weatherproofing"
    ]
  },
  {
    id: "self-sufficiency",
    name: "Other Self-Sufficiency",
    icon: Leaf,
    desc: "The essential skills for a truly independent homestead.",
    subcategories: [
      "Herbal medicine & first aid",
      "Hunting & fishing",
      "Foraging & wild edibles",
      "Fiber arts — spinning & weaving",
      "Candle & soap making",
      "Water filtration & storage",
      "Emergency preparedness",
      "Natural building materials"
    ]
  }
]

export default function ProjectsPage() {
  const router = useRouter()
  const { credits, tier, spendCredit, upgradeToPaid } = useSustainData()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null)
  const [showPricing, setShowPricing] = useState(false)

  const handleProjectStart = (catId: string, sub: string) => {
    const cat = categories.find(c => c.id === catId)
    if (cat?.contractorOnly) {
      router.push(`/contractors?type=${catId}`)
      return
    }

    if (tier === 'free' && credits === 0) {
      setShowPricing(true)
      return
    }

    router.push(`/projects/generate?category=${catId}&subcategory=${encodeURIComponent(sub)}`)
  }

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subcategories.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4">
        <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h1 className="font-headline text-3xl font-bold text-primary">SteadCraft Project Hub</h1>
            <p className="text-muted-foreground">Built for every corner of your land.</p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search categories or skills..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>


        {/* Free guide activation banner */}
        {tier === 'free' && credits > 0 && (
          <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-headline font-bold text-foreground text-sm">You have 1 free project guide waiting</p>
                <p className="text-xs text-muted-foreground">Pick any category below and build something — no card required.</p>
              </div>
            </div>
            <Badge className="bg-primary text-primary-foreground shrink-0">Free</Badge>
          </div>
        )}

        {tier === 'free' && credits === 0 && (
          <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-amber-600 shrink-0" />
              <div>
                <p className="font-headline font-bold text-foreground text-sm">You have used your free guide</p>
                <p className="text-xs text-muted-foreground">Try Pro free for 30 days — no charge until day 31.</p>
              </div>
            </div>
            <Button size="sm" className="bg-primary text-primary-foreground font-bold shrink-0" onClick={() => setShowPricing(true)}>
              Try Pro Free
            </Button>
          </div>
        )}

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => (
            <Card key={cat.id} className="group hover:border-primary transition-all overflow-hidden flex flex-col h-full cursor-pointer bg-card text-card-foreground shadow-sm" onClick={() => setSelectedCategory(cat)}>
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                   <div className="rounded-xl bg-primary-foreground/10 p-3 text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary transition-colors">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  {cat.contractorOnly && <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">Pro Verified</Badge>}
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

        {/* Subcategory Dialog */}
        <Dialog open={!!selectedCategory} onOpenChange={(open) => !open && setSelectedCategory(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl flex items-center gap-2">
                {selectedCategory?.icon && <selectedCategory.icon className="h-6 w-6 text-primary" />}
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
                <ShieldAlert className="h-5 w-5 text-accent-foreground shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Projects in this category are high-risk. We strongly recommend viewing our vetted contractor list for professional help.
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <section className="mt-12 rounded-2xl bg-card p-8 text-center border border-border/40 text-card-foreground">
          <Sparkles className="mx-auto h-12 w-12 text-accent opacity-50 mb-4" />
          <h2 className="font-headline text-2xl font-bold mb-2">Expert AI Guidance</h2>
          <p className="opacity-80 max-w-2xl mx-auto mb-6">
            SteadCraft's AI is trained on thousands of technical homesteading documents. 
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
        onUpgrade={() => {
          upgradeToPaid()
          setShowPricing(false)
        }} 
      />
    </div>
  )
}
