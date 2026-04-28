"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PricingModal } from "@/components/PricingModal"
import { useToast } from "@/hooks/use-toast"
import { PlayCircle, Lock, Clock, BookOpen, Sparkles, TrendingUp, Crown } from "lucide-react"
import Image from "next/image"

const workshops = [
  {
    id: 1,
    title: "Mastering the Garden Forge",
    description: "Learn fundamental blacksmithing techniques to craft your own essential homestead tools — from hooks and hinges to custom garden implements.",
    duration: "45 mins",
    difficulty: "Advanced",
    tag: "Metalwork",
    image: "https://picsum.photos/seed/forge/800/400",
  },
  {
    id: 2,
    title: "Off-Grid Solar Integration",
    description: "Step-by-step installation for a 2kW off-grid system — sizing, wiring, battery banks, and charge controllers for your workshop and outbuildings.",
    duration: "60 mins",
    difficulty: "Intermediate",
    tag: "Electrical",
    image: "https://picsum.photos/seed/solar/800/400",
  },
  {
    id: 3,
    title: "Advanced Preservation Techniques",
    description: "Beyond basic canning: cold smoking, salt curing, lacto-fermentation, and long-term root cellar management for year-round food security.",
    duration: "35 mins",
    difficulty: "Beginner",
    tag: "Food & Harvest",
    image: "https://picsum.photos/seed/smoke/800/400",
  },
  {
    id: 4,
    title: "Timber Framing Fundamentals",
    description: "Traditional joinery without power tools — layout, mortise and tenon, dovetail cuts, and raising a small structure from raw lumber.",
    duration: "75 mins",
    difficulty: "Advanced",
    tag: "Building",
    image: "https://picsum.photos/seed/timber/800/400",
  },
  {
    id: 5,
    title: "Water Systems & Rainwater Harvesting",
    description: "Design and install a complete gravity-fed water system: catchment, filtration, storage tanks, and distribution lines for a self-sufficient property.",
    duration: "50 mins",
    difficulty: "Intermediate",
    tag: "Infrastructure",
    image: "https://picsum.photos/seed/water/800/400",
  },
]

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner:     "bg-green-500/15 text-green-600 border-green-500/30",
  Intermediate: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  Advanced:     "bg-amber-500/15 text-amber-700 border-amber-500/30",
}

export default function WorkshopPage() {
  const { tier, upgradeToPaid } = useSustainData()
  const { toast } = useToast()
  const [showPricing, setShowPricing] = useState(false)

  const handleWatch = (title: string) => {
    if (tier === 'free') {
      setShowPricing(true)
    } else {
      toast({
        title: `Opening: ${title}`,
        description: "Video player coming in the next update. Stay tuned!",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-5xl">

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-accent/15 text-accent-foreground border-accent/40 gap-1">
              <Crown className="h-3 w-3" /> Pro Series
            </Badge>
          </div>
          <h1 className="font-headline text-3xl font-bold text-foreground">SteadCraft Workshop</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Deep-dive video guides on specialized homesteading skills — taught by practitioners who
            actually live it.
          </p>
        </header>

        {/* Upgrade banner for free users */}
        {tier === 'free' && (
          <Card className="mb-10 border-primary/30 bg-primary/5 overflow-hidden">
            <CardContent className="flex flex-col md:flex-row items-center gap-6 pt-6 pb-6">
              <div className="rounded-2xl bg-primary/15 p-4 text-primary shrink-0">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-headline text-xl font-bold text-foreground">
                  Unlock the Full Workshop Library
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {workshops.length} expert-led videos, downloadable notes, and early access to new
                  sessions — included in SteadCraft Pro.
                </p>
              </div>
              <Button
                onClick={() => setShowPricing(true)}
                size="lg"
                className="bg-primary text-primary-foreground font-bold shrink-0"
              >
                Try Pro Free — 30 Days
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Workshop grid */}
        <div className="grid grid-cols-1 gap-8">
          {workshops.map((ws) => (
            <Card
              key={ws.id}
              className="overflow-hidden flex flex-col md:flex-row border-border/40 bg-card hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative h-56 md:w-72 shrink-0">
                <Image
                  src={ws.image}
                  alt={ws.title}
                  fill
                  className="object-cover"
                  data-ai-hint="homesteading workshop"
                />
                {tier === 'free' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[3px]">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Lock className="h-10 w-10 opacity-90" />
                      <span className="text-xs font-bold uppercase tracking-wider opacity-80">Pro Only</span>
                    </div>
                  </div>
                )}
                {tier === 'paid' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                    <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="text-xs border-border/40">{ws.tag}</Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${DIFFICULTY_COLOR[ws.difficulty] ?? ''}`}
                    >
                      {ws.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {ws.duration}
                    </Badge>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-foreground mb-2">{ws.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ws.description}</p>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={() => handleWatch(ws.title)}
                    className="flex-1 bg-primary text-primary-foreground gap-2 font-bold"
                  >
                    {tier === 'free'
                      ? <><Lock className="h-4 w-4" /> Unlock to Watch</>
                      : <><PlayCircle className="h-4 w-4" /> Watch Workshop</>
                    }
                  </Button>
                  <Button variant="outline" className="gap-2 border-border/40">
                    <BookOpen className="h-4 w-4" /> Notes
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Coming soon */}
        <section className="mt-16 rounded-2xl bg-card border border-border/40 p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-headline text-lg font-bold text-foreground">Coming Soon</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Currently filming: <strong>Hydroponics for Small Spaces</strong> and{" "}
                <strong>Winter Livestock Care</strong>. Pro subscribers get early access to raw
                footage and live Q&amp;A sessions before public release.
              </p>
            </div>
          </div>
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
