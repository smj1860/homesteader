'use client'

import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sprout, BookOpen, Leaf, Egg, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomesteadingHub() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <Badge className="bg-accent/20 text-accent border-accent/30">🌱 Homesteading Guides</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
              Build Your Self-Sufficient Life
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you have a balcony or acres, we'll guide you toward abundant food, cleaner living, and true homestead independence.
            </p>
          </div>
        </section>

        {/* Main CTA Card - Beginners Intro */}
        <section className="mb-16">
          <Card className="border-accent/30 overflow-hidden bg-gradient-to-r from-accent/10 to-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <Badge className="bg-accent text-black mb-4">Start Here</Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Begin Your Homestead
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  Take our personalized quiz and get a custom homestead plan tailored to your space, family size, and climate zone. Includes crop recommendations, soil mix recipes, and realistic yield targets.
                </p>
                <Link href="/homesteading/beginners">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-black font-semibold w-fit">
                    Start the Quiz <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <div className="aspect-square bg-accent/20 rounded-2xl border-2 border-accent/30 flex items-center justify-center">
                    <Sprout className="h-32 w-32 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Sections Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Explore Our Guides
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Suburban Homesteading */}
            <Card className="border-border/40 hover:border-accent/40 transition-colors group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">🏡</span>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">
                    Small Space
                  </Badge>
                </div>
                <CardTitle>Suburban Homesteading</CardTitle>
                <CardDescription>
                  Maximize your small lot with efficient gardens, container farming, and micro-livestock.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ Raised bed gardening in limited space</p>
                  <p>✓ Vertical growing techniques</p>
                  <p>✓ Composting & rainwater collection</p>
                  <p>✓ Food preservation & storage</p>
                  <p>✓ Homemade cleaning & personal care</p>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:text-accent">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Beginner Series */}
            <Card className="border-border/40 hover:border-accent/40 transition-colors group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">📚</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                    Foundational
                  </Badge>
                </div>
                <CardTitle>Beginner Series</CardTitle>
                <CardDescription>
                  Core concepts every homesteader should know to get started confidently.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ What homesteading really means</p>
                  <p>✓ Setting realistic first-year goals</p>
                  <p>✓ Essential tools & where to start</p>
                  <p>✓ Common mistakes to avoid</p>
                  <p>✓ Building community & learning networks</p>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:text-accent">
                  Read <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Building Plans */}
            <Card className="border-border/40 hover:border-accent/40 transition-colors group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">📐</span>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                    DIY
                  </Badge>
                </div>
                <CardTitle>Building Plans</CardTitle>
                <CardDescription>
                  Step-by-step plans for coops, sheds, storage, and garden structures.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ Customized to your space</p>
                  <p>✓ Generated by our AI system</p>
                  <p>✓ Curated with mockup photos</p>
                  <p>✓ Tool & material lists included</p>
                  <p>✓ Difficulty ratings & time estimates</p>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:text-accent">
                  Browse <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Tool Resources */}
            <Card className="border-border/40 hover:border-accent/40 transition-colors group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">🛠️</span>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/30">
                    Equipment
                  </Badge>
                </div>
                <CardTitle>Tools & Resources</CardTitle>
                <CardDescription>
                  Curated recommendations for tools, seeds, supplies, and equipment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ Budget, mid, and premium options</p>
                  <p>✓ Affiliate reviews & recommendations</p>
                  <p>✓ Beginner-friendly tool guides</p>
                  <p>✓ Comparison by category</p>
                  <p>✓ Where to shop locally vs. online</p>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:text-accent">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Community Projects */}
            <Card className="border-border/40 hover:border-accent/40 transition-colors group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">👥</span>
                  <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30">
                    Community
                  </Badge>
                </div>
                <CardTitle>Community Builds</CardTitle>
                <CardDescription>
                  Learn from real homesteaders sharing their projects and progress.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ Real user projects & photos</p>
                  <p>✓ What worked (and what didn't)</p>
                  <p>✓ Share your own builds</p>
                  <p>✓ Ask questions & get answers</p>
                  <p>✓ Celebrate wins together</p>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:text-accent">
                  Join <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Coming Soon: Apothecary */}
            <Card className="border-border/40 opacity-60">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">🌿</span>
                  <Badge variant="outline" className="bg-teal-500/10 text-teal-600 border-teal-500/30">
                    Coming Soon
                  </Badge>
                </div>
                <CardTitle>Apothecary</CardTitle>
                <CardDescription>
                  Growing, harvesting, and making natural remedies and tinctures.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ Medicinal herb gardening</p>
                  <p>✓ Tincture & remedy recipes</p>
                  <p>✓ Drying & preservation</p>
                  <p>✓ Safety & dosing</p>
                </div>
                <Button variant="ghost" disabled className="w-full justify-between">
                  Coming Soon <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 max-w-3xl mx-auto">
          <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-transparent">
            <CardContent className="pt-8 pb-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-3">
                Join Grain & Grit
              </h3>
              <p className="text-muted-foreground mb-6">
                Our weekly newsletter for homesteaders. Tips, stories, and resources delivered to your inbox.
              </p>
              <Link href="/">
                <Button className="bg-accent hover:bg-accent/90 text-black font-semibold">
                  Subscribe to Newsletter
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
