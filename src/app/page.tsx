"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { useCollection } from "@/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Sprout, Wrench, Package, Users, ArrowRight, Lightbulb,
  Sun, Beef, Hammer, PlayCircle, Star, Mail, Leaf, Calendar,
  MessageSquare, Loader2, Flame, Zap, Droplets, BookOpen, Wind
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { subscribeToNewsletter } from "@/app/actions/newsletter"

export default function Home() {
  const { tier, credits } = useSustainData()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const { data: recentLogs, isLoading: logsLoading } = useCollection('build_logs', {
    filters: { is_public: true },
    orderBy: 'created_at',
    ascending: false,
  })

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    try {
      await subscribeToNewsletter(email)
      toast({ title: "Welcome to Grain & Grit!", description: "You're on the list. First issue coming soon." })
      setEmail("")
    } catch {
      toast({ title: "Subscription failed", description: "We couldn't add you to the list right now.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!mounted) return ""
    try { return new Date(dateString).toLocaleDateString() }
    catch { return "Recently" }
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />

      <main className="container mx-auto px-4">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="mb-12 overflow-hidden rounded-3xl bg-card border border-border/40 text-card-foreground shadow-sm relative">
          <div className="relative min-h-[480px] w-full flex items-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://picsum.photos/seed/homestead1/1200/600"
                alt="SteadCraft — homesteaders at work"
                fill
                className="object-cover opacity-10"
                data-ai-hint="homestead farm community"
              />
            </div>
            <div className="relative z-10 w-full p-8 md:p-16">
              {/* Logo — uses actual logo file */}
              <div className="mb-6 h-16 w-16">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="SteadCraft"
                  width={64}
                  height={64}
                  className="rounded-xl shadow-md"
                />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
                The homestead is our craft.
              </p>

              <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl leading-[1.1] max-w-3xl">
                Where homesteaders{" "}
                <span className="text-accent">build, grow,</span>
                <br />and figure it out together.
              </h1>

              <p className="mt-6 max-w-2xl text-lg opacity-80 leading-relaxed">
                Step-by-step project guides for any job on your land — from fixing a fence to putting up a harvest. Real knowledge from a community that actually does the work.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 font-bold"
                  asChild
                >
                  <Link href="/projects">Start a Project</Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 font-bold"
                  asChild
                >
                  <Link href="/signup">Join the Community</Link>
                </Button>
              </div>

              {/* Stats strip */}
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-card-foreground/60">
                <span><strong className="text-card-foreground">11</strong> project categories</span>
                <span><strong className="text-card-foreground">Free</strong> to get started</span>
                <span><strong className="text-card-foreground">AI-powered</strong> step-by-step guides</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it Works ─────────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold text-foreground">How SteadCraft works</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Pick a project, get a guide built around what you own and what you know. No fluff, no jargon.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Pick your project",
                desc: "Choose from 11 categories covering everything on the homestead — or describe something custom.",
                color: "bg-primary/10 text-primary",
              },
              {
                step: "02",
                title: "Get a real guide",
                desc: "AI builds a step-by-step plan with safety notes, a tool list, and instructions matched to your skill level.",
                color: "bg-leather\/10 text-leather",
              },
              {
                step: "03",
                title: "Ask questions as you go",
                desc: "Stuck on a step? Ask SteadCraft. Get a direct answer in plain language without starting over.",
                color: "bg-accent/20 text-accent-foreground",
              },
              {
                step: "04",
                title: "Share what you built",
                desc: "Log your progress, post photos, and share with a community that appreciates honest work.",
                color: "bg-primary/10 text-primary",
              },
            ].map((item) => (
              <Card key={item.step} className="bg-card text-card-foreground border-border/40 shadow-sm hover:shadow-md transition-all">
                <CardContent className="pt-8 pb-6 flex flex-col gap-3">
                  <span className="font-headline text-4xl font-bold text-leather opacity-40">{item.step}</span>
                  <h3 className="font-headline font-bold text-base text-card-foreground">{item.title}</h3>
                  <p className="text-sm text-card-foreground/70 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Categories ───────────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold text-foreground">Built for every corner of your land</h2>
            <Link href="/projects" className="text-xs font-bold uppercase text-primary hover:underline tracking-wider">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Garden & Land",      icon: Sprout,    id: "landscaping" },
              { name: "Cooking & Baking",   icon: Flame,     id: "cooking" },
              { name: "Canning",            icon: Package,   id: "canning" },
              { name: "Auto & Small Engine",icon: Wrench,    id: "auto" },
              { name: "Plumbing",           icon: Droplets,  id: "plumbing" },
              { name: "Electrical",         icon: Zap,       id: "electrical" },
              { name: "HVAC",               icon: Wind,      id: "hvac" },
              { name: "Solar & Off-Grid",   icon: Sun,       id: "solar" },
              { name: "Animals & Livestock",icon: Beef,      id: "livestock" },
              { name: "Building",           icon: Hammer,    id: "building" },
              { name: "Resources",          icon: BookOpen,  id: "resources" },
              { name: "Self-Sufficiency",   icon: Leaf,      id: "self-sufficiency" },
            ].map((cat) => (
              <Link key={cat.id} href={`/projects?category=${cat.id}`}>
                <Card className="hover:ring-2 hover:ring-accent transition-all hover:shadow-md h-full bg-card text-card-foreground border-border/40 shadow-sm group">
                  <CardContent className="flex flex-col items-center justify-center p-5">
                    <div className="mb-3 rounded-full p-3 bg-primary-foreground/10 text-primary-foreground group-hover:bg-primary-foreground/20 transition-colors">
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-[10px] uppercase tracking-widest text-center text-card-foreground leading-tight">{cat.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Community Feed ───────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold text-foreground">Community Build Feed</h2>
            <Link href="/projects" className="text-xs font-bold uppercase text-primary hover:underline tracking-wider">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {logsLoading ? (
              [...Array(3)].map((_, i) => <Card key={i} className="animate-pulse h-[300px] bg-card" />)
            ) : recentLogs?.length ? (
              recentLogs.slice(0, 6).map((log) => (
                <Link key={log.id} href={`/share/${log.user_id}/${log.project_id}/${log.id}`}>
                  <Card className="h-full group hover:ring-2 hover:ring-accent transition-all overflow-hidden bg-card border-border/40 shadow-sm text-card-foreground">
                    {log.photo_url && (
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image src={log.photo_url} alt={log.project_title} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    )}
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-[10px]">{log.subcategory}</Badge>
                        <span className="text-[10px] text-card-foreground/50">{formatDate(log.created_at)}</span>
                      </div>
                      <CardTitle className="text-base font-headline line-clamp-1 text-card-foreground">{log.project_title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-xs text-card-foreground/60">{log.note}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-card-foreground/50">
                        <Users className="h-3 w-3" /> {log.username}
                      </div>
                      <ArrowRight className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardFooter>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-card-foreground/60 border-2 border-dashed border-border rounded-2xl">
                No public logs yet. Be the first to share your progress!
              </div>
            )}
          </div>
        </section>

        {/* ── Bottom grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/workshop">
              <Card className="group hover:ring-2 hover:ring-accent transition-all bg-card text-card-foreground border-border/40 shadow-sm">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="rounded-lg bg-primary-foreground/10 p-3 text-primary-foreground">
                    <PlayCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-card-foreground font-headline">Pro Workshop</CardTitle>
                    <CardDescription className="text-card-foreground/60">Deep-dive video guides on specialized homestead skills</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/tools">
              <Card className="group hover:ring-2 hover:ring-accent transition-all bg-card text-card-foreground border-border/40 shadow-sm">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="rounded-lg bg-primary-foreground/10 p-3 text-primary-foreground">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-card-foreground font-headline">Tool Reviews</CardTitle>
                    <CardDescription className="text-card-foreground/60">Honest assessments of tools that hold up to homestead life</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/resources">
              <Card className="group hover:ring-2 hover:ring-accent transition-all bg-card text-card-foreground border-border/40 shadow-sm">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="rounded-lg bg-primary-foreground/10 p-3 text-primary-foreground">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-card-foreground font-headline">Resource Library</CardTitle>
                    <CardDescription className="text-card-foreground/60">Planting schedules, seed saving, pruning guides, and more — by zone</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>

          <aside className="space-y-6">
            {/* Newsletter */}
            <Card className="border-border/40 bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-lg text-card-foreground">
                  <Mail className="h-5 w-5 text-accent" /> Grain & Grit
                </CardTitle>
                <CardDescription className="text-card-foreground/60">
                  Tips, guides, and seasonal wisdom in your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold uppercase tracking-wider text-xs h-12"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe Free"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Pro tip */}
            <Card className="border-border/40 bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-sm uppercase tracking-[0.2em] text-accent">
                  <Lightbulb className="h-4 w-4" /> Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-card-foreground/70 italic">
                  "When canning tomatoes, adding two tablespoons of lemon juice per quart isn't optional — it's what keeps the pH safe."
                </p>
              </CardContent>
            </Card>

            {/* Your status */}
            <Card className="border-border/40 bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline text-lg text-card-foreground">Your Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-card-foreground/60">Plan</span>
                  <Badge variant="outline" className="text-accent border-accent/40">
                    {tier === 'paid' ? 'Pro' : 'Free'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-card-foreground/60">Guides</span>
                  <span className="font-bold text-card-foreground">{tier === 'paid' ? 'Unlimited' : credits}</span>
                </div>
                <Button
                  className="w-full border-card-foreground/20 hover:bg-card-foreground/10 text-card-foreground"
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href="/account">My Account</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
