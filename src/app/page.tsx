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
  Sprout, 
  Wrench, 
  Package, 
  Users, 
  ArrowRight, 
  Lightbulb, 
  Sun, 
  Beef, 
  Hammer, 
  PlayCircle, 
  Star, 
  Mail, 
  Leaf, 
  Calendar, 
  MessageSquare, 
  Loader2,
  Flame,
  Zap,
  ShieldCheck,
  ListOrdered,
  Droplets
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

  useEffect(() => {
    setMounted(true)
  }, [])

  // Real-time Community Feed
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
      toast({
        title: "Welcome to Rootstock!",
        description: "Your subscription to the Homestead Weekly is active.",
      })
      setEmail("")
    } catch (err) {
      toast({
        title: "Subscription failed",
        description: "We couldn't add you to the list right now.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!mounted) return ""
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (e) {
      return "Recently"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-12 overflow-hidden rounded-3xl bg-card border border-border/40 text-card-foreground shadow-sm relative">
          <div className="relative min-h-[450px] w-full flex items-center">
            <div className="absolute inset-0 z-0">
               <Image 
                src="https://picsum.photos/seed/homestead1/1200/600" 
                alt="Rootstock Hero" 
                fill 
                className="object-cover opacity-10"
                data-ai-hint="homestead garden"
              />
            </div>
            <div className="relative z-10 w-full p-8 md:p-16">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground text-primary">
                <Leaf className="h-8 w-8 fill-current" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">Master your homestead with precision.</p>
              <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl leading-[1.1] max-w-4xl">
                Rootstock: Homesteading and <br /><span className="text-accent">DIY for Everyone.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg opacity-80 leading-relaxed">
                Expert DIY instructions, tool lists, and pro-contractor referrals for every project — from building a shed to canning your harvest.
              </p>
              <div className="mt-10 flex gap-4">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8" asChild>
                  <Link href="/projects">Start a Project</Link>
                </Button>
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
        </div>
        </section>

        {/* How it Works Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold text-foreground">How it works</h2>
            <p className="text-primary font-bold mt-2 uppercase tracking-widest text-xs">Stop guessing. Start growing.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {[
              {
                title: "Safety first",
                desc: "Critical warnings and environment prep before you ever pick up a tool.",
                icon: ShieldCheck
              },
              {
                title: "Master tool list",
                desc: "Precise hardware and tool recommendations with direct links to top-rated supplies.",
                icon: Hammer
              },
              {
                title: "Step-by-step execution",
                desc: "AI instructions tailored to your specific skill level, start to finish.",
                icon: ListOrdered
              },
              {
                title: "Pro hand-off",
                desc: "One-click referrals to licensed local contractors for complex builds.",
                icon: Users
              },
              {
                title: "Pro feedback loop",
                desc: "Ask follow-up questions in real time if you get stuck on any step.",
                icon: MessageSquare
              }
            ].map((item, i) => (
              <Card key={i} className="bg-card text-card-foreground border-border/40 shadow-sm hover:shadow-md transition-all">
                <CardContent className="pt-8 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-primary-foreground/10 p-4 text-accent">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-headline font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-[11px] opacity-70 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-20">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold text-foreground">Built for every corner of your land</h2>
            <Link href="/projects" className="text-xs font-bold uppercase text-primary hover:underline">View Hub</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[
              { name: "Landscape & Gardening", icon: Sprout, id: "landscaping" },
              { name: "Cooking & Baking", icon: Flame, id: "cooking" },
              { name: "Canning", icon: Package, id: "canning" },
              { name: "Auto & Repair", icon: Wrench, id: "auto" },
              { name: "Plumbing", icon: Droplets, id: "plumbing" },
              { name: "Electrical", icon: Zap, id: "electrical" },
              { name: "Solar", icon: Sun, id: "solar" },
              { name: "Animals & Livestock", icon: Beef, id: "livestock" },
              { name: "Building & Renovation", icon: Hammer, id: "building" },
              { name: "Other Self-Sufficiency", icon: Leaf, id: "self-sufficiency" },
            ].map((cat) => (
              <Link key={cat.id} href={`/projects?category=${cat.id}`}>
                <Card className="hover:ring-2 hover:ring-accent transition-all hover:shadow-md h-full bg-card text-card-foreground border-border/40 shadow-sm">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className={`mb-3 rounded-full p-4 bg-primary-foreground text-primary`}>
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-[10px] uppercase tracking-widest text-center text-card-foreground">{cat.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Community Feed Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold text-foreground">Community Build Feed</h2>
            <Link href="/projects" className="text-xs font-bold uppercase text-primary hover:underline">View All Projects</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {logsLoading ? (
              [...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse h-[300px] bg-card" />
              ))
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
                        <Badge variant="secondary" className="text-[10px] bg-primary-foreground/10 text-primary-foreground">{log.subcategory}</Badge>
                        <span className="text-[10px] opacity-70">{formatDate(log.created_at)}</span>
                      </div>
                      <CardTitle className="text-base font-headline line-clamp-1">{log.project_title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-xs text-card-foreground/70">{log.note}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] opacity-70">
                        <Users className="h-3 w-3" /> {log.username}
                      </div>
                      <ArrowRight className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardFooter>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-primary border-2 border-dashed border-primary/20 rounded-2xl bg-card/10">
                No public logs yet. Be the first to share your progress!
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link href="/workshop">
                <Card className="group hover:ring-2 hover:ring-accent transition-all bg-card text-card-foreground border-border/40 shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <div className="rounded-lg bg-primary-foreground p-2 text-primary">
                      <PlayCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-card-foreground">Pro Workshop</CardTitle>
                      <CardDescription className="text-card-foreground/70">Expert video series</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/tools">
                <Card className="group hover:ring-2 hover:ring-accent transition-all bg-card text-card-foreground border-border/40 shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <div className="rounded-lg bg-primary-foreground p-2 text-primary">
                      <Star className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-card-foreground">Tool Reviews</CardTitle>
                      <CardDescription className="text-card-foreground/70">Real-world assessments</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="border-primary/20 bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-lg text-card-foreground">
                  <Mail className="h-5 w-5 text-accent" />
                  Homestead Weekly
                </CardTitle>
                <CardDescription className="text-card-foreground/70">Get tips, guides, and tool deals in your inbox.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold uppercase tracking-wider text-xs h-12">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join Community'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-sm uppercase tracking-[0.2em] text-accent">
                  <Lightbulb className="h-4 w-4" />
                  Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed opacity-80 italic">
                  "When canning acidic fruits like tomatoes, adding a pinch of citric acid ensures the pH levels stay safe."
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline text-lg text-card-foreground">Your Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">Plan</span>
                  <Badge variant="outline" className="text-accent border-accent/40">{tier === 'paid' ? 'Pro' : 'Free'}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">Credits</span>
                  <span className="font-bold">{tier === 'paid' ? 'Unlimited' : credits}</span>
                </div>
                <Button className="w-full border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground" variant="outline" size="sm" asChild>
                  <Link href="/inventory">Manage Assets</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}