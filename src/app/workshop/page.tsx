"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PricingModal } from "@/components/PricingModal"
import { useSustainData } from "@/hooks/use-sustain-data"
import { Lock, PlayCircle, Clock, BookOpen, Sparkles, TrendingUp, Crown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

// Brand tokens — explicit to avoid CSS variable bleed
const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'

const workshops = [
  {
    id: 1,
    title: "Backyard Chicken Keeping: From Chick to Coop",
    description: "Everything you need to raise healthy backyard chickens — brooding setup, feed systems, coop design, predator-proofing, and egg production management.",
    duration: "45 mins",
    difficulty: "Beginner",
    tag: "Livestock",
    image: "https://picsum.photos/seed/chickens/800/400",
  },
  {
    id: 2,
    title: "Pressure Canning Fundamentals",
    description: "Master the pressure canner: safe processing times for low-acid foods, understanding headspace, testing seals, and troubleshooting failed batches.",
    duration: "60 mins",
    difficulty: "Intermediate",
    tag: "Preservation",
    image: "https://picsum.photos/seed/canning/800/400",
  },
  {
    id: 3,
    title: "Off-Grid Solar System Design",
    description: "Size and install a complete off-grid solar setup — calculating energy needs, selecting panels and batteries, wiring safely, and managing the charge controller.",
    duration: "90 mins",
    difficulty: "Advanced",
    tag: "Energy",
    image: "https://picsum.photos/seed/solar/800/400",
  },
  {
    id: 4,
    title: "Timber Frame Basics: Build Your First Structure",
    description: "Hand-cut joinery, layout, raising a bent, and finishing a small timber frame outbuilding from site prep to ridge beam.",
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

// ── Badge color helpers — designed for dark card backgrounds ─────────────
const DIFFICULTY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Beginner:     { bg: '#16a34a22', text: '#4ade80', border: '#16a34a44' },
  Intermediate: { bg: '#2563eb22', text: '#93c5fd', border: '#2563eb44' },
  Advanced:     { bg: '#d9770622', text: '#fcd34d', border: '#d9770644' },
}

export default function WorkshopPage() {
  const { tier, upgradeToPaid } = useSustainData()
  const { toast }               = useToast()
  const [showPricing, setShowPricing] = useState(false)

  const handleWatch = (title: string) => {
    if (tier === 'free') {
      setShowPricing(true)
    } else {
      toast({ title: `Opening: ${title}`, description: "Video player coming in the next update. Stay tuned!" })
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-5xl">

        <header className="mb-10">
          {/* Pro badge */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}44` }}
            >
              <Crown className="h-3 w-3" /> Pro Series
            </span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-foreground">SteadCraft Workshop</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Deep-dive video guides on specialized homesteading skills — taught by practitioners who actually live it.
          </p>
        </header>

        {/* Upgrade banner for free users */}
        {tier === 'free' && (
          <div
            className="mb-10 rounded-2xl overflow-hidden"
            style={{ backgroundColor: `${FOREST}15`, border: `1.5px solid ${FOREST}30` }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 p-6">
              <div
                className="rounded-2xl p-4 shrink-0"
                style={{ backgroundColor: `${FOREST}20` }}
              >
                <Sparkles className="h-8 w-8" style={{ color: GOLD }} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-headline text-xl font-bold text-foreground">Unlock the Full Workshop Library</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {workshops.length} expert-led videos, downloadable notes, and early access to new sessions — included in SteadCraft Pro.
                </p>
              </div>
              <Button
                onClick={() => setShowPricing(true)}
                size="lg"
                className="bg-primary text-primary-foreground font-bold shrink-0"
              >
                Try Pro Free — 30 Days
              </Button>
            </div>
          </div>
        )}

        {/* Workshop grid */}
        <div className="grid grid-cols-1 gap-8">
          {workshops.map((ws) => {
            const diffStyle = DIFFICULTY_STYLES[ws.difficulty] ?? DIFFICULTY_STYLES.Intermediate

            return (
              <div
                key={ws.id}
                className="overflow-hidden rounded-2xl flex flex-col md:flex-row hover:shadow-lg transition-shadow"
                style={{ backgroundColor: FOREST }}
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
                    {/* ── FIX: ovals now use explicit on-dark-card colors ── */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {/* Topic oval */}
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}44` }}
                      >
                        {ws.tag}
                      </span>
                      {/* Skill level oval */}
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: diffStyle.bg, color: diffStyle.text, border: `1px solid ${diffStyle.border}` }}
                      >
                        {ws.difficulty}
                      </span>
                      {/* Duration oval */}
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: `${PARCH}15`, color: `${PARCH}cc`, border: `1px solid ${PARCH}22` }}
                      >
                        <Clock className="h-3 w-3" /> {ws.duration}
                      </span>
                    </div>

                    {/* ── FIX: title and description use card-foreground colors ── */}
                    <h3 className="font-headline text-xl font-bold mb-2" style={{ color: PARCH }}>
                      {ws.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: `${PARCH}aa` }}>
                      {ws.description}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => handleWatch(ws.title)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-bold text-sm transition-opacity hover:opacity-90"
                      style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
                    >
                      {tier === 'free'
                        ? <><Lock className="h-4 w-4" /> Unlock to Watch</>
                        : <><PlayCircle className="h-4 w-4" /> Watch Workshop</>
                      }
                    </button>
                    <button
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: `${PARCH}15`, color: `${PARCH}cc`, border: `1px solid ${PARCH}20` }}
                    >
                      <BookOpen className="h-4 w-4" /> Notes
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Coming soon */}
        <section
          className="mt-16 rounded-2xl p-8"
          style={{ backgroundColor: FOREST }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${GOLD}22` }}
            >
              <TrendingUp className="h-5 w-5" style={{ color: GOLD }} />
            </div>
            <div>
              <h2 className="font-headline text-lg font-bold mb-2" style={{ color: PARCH }}>Coming Soon</h2>
              <p className="text-sm leading-relaxed" style={{ color: `${PARCH}aa` }}>
                Currently filming: <strong style={{ color: PARCH }}>Hydroponics for Small Spaces</strong> and{" "}
                <strong style={{ color: PARCH }}>Winter Livestock Care</strong>. Pro subscribers get early access to raw
                footage and live Q&amp;A sessions before public release.
              </p>
            </div>
          </div>
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
