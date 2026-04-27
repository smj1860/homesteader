"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PricingModal } from "@/components/PricingModal"
import { PlayCircle, Lock, Clock, BookOpen, Sparkles, TrendingUp } from "lucide-react"
import Image from "next/image"

const workshops = [
  {
    id: 1,
    title: "Mastering the Garden Forge",
    description: "Learn basic blacksmithing to create your own essential homestead tools.",
    duration: "45 mins",
    difficulty: "Advanced",
    instructor: "Silas Thorne",
    image: "https://picsum.photos/seed/forge/800/400"
  },
  {
    id: 2,
    title: "Off-Grid Solar Integration",
    description: "Step-by-step setup for a 2kW system to power your workshop and storage sheds.",
    duration: "60 mins",
    difficulty: "Intermediate",
    instructor: "Elena Vance",
    image: "https://picsum.photos/seed/solar/800/400"
  },
  {
    id: 3,
    title: "Advanced Preservation Techniques",
    description: "Beyond basic canning: smoking, curing, and long-term root cellar storage.",
    duration: "35 mins",
    difficulty: "Beginner",
    instructor: "Martha Green",
    image: "https://picsum.photos/seed/smoke/800/400"
  }
]

export default function WorkshopPage() {
  const { tier, upgradeToPaid } = useSustainData()
  const [showPricing, setShowPricing] = useState(false)

  const handleWatch = () => {
    if (tier === 'free') {
      setShowPricing(true)
    } else {
      // In a real app, this would open the video player
      alert("Opening Workshop Video...")
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent">Pro Series</Badge>
          </div>
          <h1 className="font-headline text-3xl font-bold">SteadCraft Workshop Series</h1>
          <p className="text-muted-foreground">Premium video deep-dives into specialized homesteading skills.</p>
        </header>

        {tier === 'free' && (
          <Card className="mb-12 border-primary/40 bg-primary/5">
            <CardContent className="flex flex-col md:flex-row items-center gap-6 pt-6">
              <div className="rounded-full bg-primary/20 p-4 text-primary">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-headline text-xl font-bold">Unlock the Full Workshop Library</h2>
                <p className="text-sm text-muted-foreground mt-1">Get unlimited access to expert-led video tutorials and downloadable blueprints.</p>
              </div>
              <Button onClick={() => setShowPricing(true)} size="lg" className="bg-primary hover:bg-primary/90">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-8">
          {workshops.map((ws) => (
            <Card key={ws.id} className="overflow-hidden flex flex-col md:flex-row border-accent/20">
              <div className="relative h-64 md:w-1/3 shrink-0">
                <Image src={ws.image} alt={ws.title} fill className="object-cover" />
                {tier === 'free' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                    <Lock className="h-12 w-12 text-white opacity-80" />
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {ws.duration}
                    </Badge>
                    <Badge variant="outline">{ws.difficulty}</Badge>
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-2">{ws.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{ws.description}</p>
                  <div className="text-sm font-medium flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] border">PRO</div>
                    Instructor: {ws.instructor}
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <Button onClick={handleWatch} className="flex-1 bg-primary text-primary-foreground gap-2">
                    {tier === 'free' ? <Lock className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                    Watch Workshop
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="h-4 w-4" /> View Notes
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <section className="mt-16 rounded-2xl bg-muted/30 p-8 border border-border">
          <div className="flex items-start gap-4">
            <TrendingUp className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h2 className="font-headline text-xl font-bold">Coming Soon to the Workshop</h2>
              <p className="text-muted-foreground mt-2">
                We're currently filming our next series on "Hydroponics for Small Spaces" and "Winter Livestock Care". 
                Pro subscribers get early access to raw footage and live Q&A sessions.
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
