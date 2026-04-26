"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { useUser } from "@/supabase"
import { createCheckoutSession } from "@/app/actions/stripe"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2, X, Leaf, Zap, Loader2, ShieldCheck,
  Wrench, Camera, MessageSquare, BookOpen, Sprout
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Add your Stripe Pro Price ID to your .env.local and Vercel environment variables:
// NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_xxxxxxxxxxxxx
// Create this price in your Stripe dashboard under Products.
const PRO_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || ""

const PRO_MONTHLY_PRICE = "$7"

const FREE_FEATURES = [
  { text: "2 AI project guides", included: true },
  { text: "All 10 project categories", included: true },
  { text: "Step-by-step AI instructions", included: true },
  { text: "Safety & tool lists", included: true },
  { text: "Community build feed", included: true },
  { text: "Unlimited project guides", included: false },
  { text: "AI inventory detection from photos", included: false },
  { text: "AI photo enhancement", included: false },
  { text: "Unlimited build log entries", included: false },
  { text: "Public & private build logs", included: false },
  { text: "Step clarification Q&A", included: false },
]

const PRO_FEATURES = [
  { text: "Unlimited AI project guides", included: true },
  { text: "All 10 project categories", included: true },
  { text: "Step-by-step AI instructions", included: true },
  { text: "Safety & tool lists", included: true },
  { text: "Community build feed", included: true },
  { text: "AI inventory detection from photos", included: true },
  { text: "AI photo enhancement", included: true },
  { text: "Unlimited build log entries", included: true },
  { text: "Public & private build logs", included: true },
  { text: "Step clarification Q&A", included: true },
]

const PRO_HIGHLIGHTS = [
  { icon: Zap, label: "Unlimited guides", desc: "Generate as many DIY guides as you need, any time." },
  { icon: Camera, label: "Inventory AI", desc: "Photograph your supplies and let AI catalog them instantly." },
  { icon: MessageSquare, label: "Ask Rootstock", desc: "Get AI answers to any question on any step of your project." },
  { icon: BookOpen, label: "Build journal", desc: "Document every project with notes, photos, and shareable logs." },
  { icon: ShieldCheck, label: "MacGyver mode", desc: "Generate improvised solutions using what you already own." },
  { icon: Wrench, label: "Inventory sync", desc: "Your inventory is cross-referenced in every guide you generate." },
]

export default function PricingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useUser()
  const { tier } = useSustainData()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!user) {
      router.push("/signup")
      return
    }

    if (!PRO_PRICE_ID) {
      toast({
        title: "Not configured",
        description: "Stripe price ID is not set up yet. Check back soon.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const { url } = await createCheckoutSession(PRO_PRICE_ID, "subscription")
      if (url) {
        window.location.href = url
      }
    } catch (err: any) {
      toast({
        title: "Could not start checkout",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <Navigation />
      <main className="container mx-auto max-w-5xl px-4 pt-12">

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Leaf className="h-7 w-7 fill-current" />
            </div>
          </div>
          <h1 className="font-headline text-4xl font-bold text-foreground md:text-5xl">
            Simple, honest pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you&apos;re ready to build without limits.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-20">

          {/* Free */}
          <Card className="relative border-border/40 bg-card shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-xl text-card-foreground">Free</CardTitle>
                {tier === "free" && user && (
                  <Badge variant="secondary" className="text-xs">Current plan</Badge>
                )}
              </div>
              <div className="flex items-end gap-1 pt-2">
                <span className="font-headline text-4xl font-bold text-card-foreground">$0</span>
                <span className="mb-1 text-sm text-muted-foreground">/ forever</span>
              </div>
              <CardDescription className="text-card-foreground/70">
                Perfect for getting started and exploring what Rootstock can do.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {FREE_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {f.included ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <X className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                  )}
                  <span className={f.included ? "text-card-foreground" : "text-muted-foreground/50"}>
                    {f.text}
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-6">
              {user ? (
                <Button variant="outline" className="w-full border-border/40" disabled>
                  {tier === "free" ? "Your current plan" : "Free plan"}
                </Button>
              ) : (
                <Button variant="outline" className="w-full border-border/40" asChild>
                  <Link href="/signup">Get started free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Pro */}
          <Card className="relative border-primary/40 bg-card shadow-lg ring-1 ring-primary/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-bold uppercase tracking-widest shadow">
                Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-xl text-card-foreground">Pro</CardTitle>
                {tier === "paid" && (
                  <Badge className="bg-primary/20 text-primary text-xs border border-primary/30">
                    Current plan
                  </Badge>
                )}
              </div>
              <div className="flex items-end gap-1 pt-2">
                <span className="font-headline text-4xl font-bold text-card-foreground">{PRO_MONTHLY_PRICE}</span>
                <span className="mb-1 text-sm text-muted-foreground">/ month</span>
              </div>
              <CardDescription className="text-card-foreground/70">
                Everything you need to run a serious homestead operation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {PRO_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-card-foreground">{f.text}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-6">
              {tier === "paid" ? (
                <Button className="w-full bg-primary/20 text-primary border border-primary/30 font-bold" disabled>
                  You&apos;re on Pro ✓
                </Button>
              ) : (
                <Button
                  className="w-full bg-primary text-primary-foreground font-bold h-12 text-sm uppercase tracking-wider hover:bg-primary/90"
                  onClick={handleUpgrade}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Upgrade to Pro"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Pro highlights */}
        <div className="mb-20">
          <h2 className="font-headline text-2xl font-bold text-foreground text-center mb-10">
            Everything in Pro, explained
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRO_HIGHLIGHTS.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-border/40 bg-card p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-headline font-bold text-sm text-card-foreground mb-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20 max-w-2xl mx-auto">
          <h2 className="font-headline text-2xl font-bold text-foreground text-center mb-10">
            Common questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I cancel any time?",
                a: "Yes. Cancel from your account settings at any time. Your Pro access continues until the end of the billing period — no partial refunds, no surprises."
              },
              {
                q: "What happens to my projects if I cancel?",
                a: "Your saved projects, build logs, and inventory are yours and stay in your account. You just lose the ability to generate new unlimited guides — you return to the 2-credit free tier."
              },
              {
                q: "Is my payment information safe?",
                a: "Payments are handled entirely by Stripe, a PCI-compliant payment processor. Rootstock never stores your credit card number, expiry date, or CVV."
              },
              {
                q: "Do I need a paid account to browse projects?",
                a: "No. You can explore all categories, view the community build feed, and use the app as a guest or free account without paying anything."
              },
              {
                q: "What AI models power Rootstock?",
                a: "Project guides and inventory detection are powered by Llama 4 Scout running on Groq, with Gemini 2.5 Flash-Lite as a fallback. Both are state-of-the-art models optimised for speed and accuracy."
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-border/40 pb-6">
                <p className="font-headline font-bold text-sm text-foreground mb-2">{item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {tier !== "paid" && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center">
            <Sprout className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="font-headline text-2xl font-bold text-foreground mb-3">
              Ready to build without limits?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join homesteaders who are using Rootstock Pro to tackle every project with confidence.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-bold px-10 h-12 uppercase tracking-wider hover:bg-primary/90"
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : `Get Pro for ${PRO_MONTHLY_PRICE}/mo`}
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">Cancel any time. No long-term commitment.</p>
          </div>
        )}

      </main>
    </div>
  )
}