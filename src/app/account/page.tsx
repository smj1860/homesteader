"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { useUser, useSupabaseClient } from "@/supabase"
import { createBillingPortalSession } from "@/app/actions/stripe"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2, Crown, Loader2, LogOut, User,
  CreditCard, Gift, AlertTriangle, Leaf
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { user } = useUser()
  const supabase = useSupabaseClient()
  const { tier, credits, isLoading } = useSustainData()

  const [username, setUsername] = useState("")
  const [isSavingUsername, setIsSavingUsername] = useState(false)
  const [isPortalLoading, setIsPortalLoading] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null)
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null)

  // Show success toast if redirected here after upgrade
  useEffect(() => {
    if (searchParams.get("upgraded") === "true") {
      toast({
        title: "Welcome to SteadCraft Pro! 🎉",
        description: "Your account has been upgraded. Build without limits.",
      })
    }
  }, [searchParams, toast])

  // Load user data from Supabase
  useEffect(() => {
    if (!user) return
    supabase
      .from("users")
      .select("username, trial_ends_at, stripe_customer_id")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setUsername(data.username || "")
          setTrialEndsAt(data.trial_ends_at || null)
          setStripeCustomerId(data.stripe_customer_id || null)
        }
      })
  }, [user, supabase])

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) router.push("/signup")
  }, [user, isLoading, router])

  const handleSaveUsername = async () => {
    if (!user || !username.trim()) return
    setIsSavingUsername(true)
    const { error } = await supabase
      .from("users")
      .update({ username: username.trim() })
      .eq("id", user.id)
    if (error) {
      toast({ title: "Could not save username", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Username saved!" })
    }
    setIsSavingUsername(false)
  }

  const handleManageBilling = async () => {
    if (!stripeCustomerId) {
      toast({
        title: "No billing record found",
        description: "Subscribe to a plan first to manage billing.",
        variant: "destructive",
      })
      return
    }
    setIsPortalLoading(true)
    try {
      const { url } = await createBillingPortalSession(stripeCustomerId)
      if (url) window.location.href = url
    } catch (err: any) {
      toast({ title: "Could not open billing portal", description: err.message, variant: "destructive" })
    } finally {
      setIsPortalLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await supabase.auth.signOut()
    router.push("/")
  }

  // Trial days remaining
  const trialDaysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / 86400000))
    : null

  const isOnTrial = tier === "paid" && trialDaysLeft !== null && trialDaysLeft > 0

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24 pt-20">
      <Navigation />
      <main className="container mx-auto max-w-2xl px-4 pt-10 space-y-6">

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-6 w-6 fill-current" />
          </div>
          <div>
            <h1 className="font-headline text-2xl font-bold text-foreground">Your Account</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* ── Subscription Status ─────────────────────────────────────── */}
        <Card className="border-border/40 bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline text-lg">Subscription</CardTitle>
              {tier === "paid" ? (
                <Badge className="bg-primary/15 text-primary border border-primary/30 gap-1">
                  <Crown className="h-3 w-3" /> Pro
                </Badge>
              ) : (
                <Badge variant="secondary">Free</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Trial banner */}
            {isOnTrial && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 flex items-start gap-3">
                <Gift className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                    Free trial — {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} remaining
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your card will be charged after the trial ends. Cancel any time before then in Manage Billing.
                  </p>
                </div>
              </div>
            )}

            {/* Free tier status */}
            {tier === "free" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Project guides remaining</span>
                  <span className="font-bold text-foreground">{credits} / 1</span>
                </div>
                {credits === 0 && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      You&apos;ve used your free guide.{" "}
                      <Link href="/pricing" className="text-primary font-semibold hover:underline">
                        Try Pro free for 30 days →
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Pro status */}
            {tier === "paid" && !isOnTrial && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Unlimited project guides, all Pro features active
              </div>
            )}
          </CardContent>
          <CardFooter className="gap-3 flex-wrap">
            {tier === "free" ? (
              <Button className="bg-primary text-primary-foreground font-bold" asChild>
                <Link href="/pricing">Try Pro Free for 30 Days</Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-border/40 gap-2"
                onClick={handleManageBilling}
                disabled={isPortalLoading}
              >
                {isPortalLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="h-4 w-4" />
                )}
                Manage Billing
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* ── Profile ─────────────────────────────────────────────────── */}
        <Card className="border-border/40 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-lg flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </CardTitle>
            <CardDescription>Your public display name on build logs and the community feed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <div className="flex gap-2">
                <Input
                  id="username"
                  placeholder="e.g. BackyardBuilder"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background border-border/40"
                  maxLength={32}
                />
                <Button
                  onClick={handleSaveUsername}
                  disabled={isSavingUsername || !username.trim()}
                  className="shrink-0"
                >
                  {isSavingUsername ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                </Button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={user.email || ""} disabled className="bg-background border-border/40 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* ── Security ────────────────────────────────────────────────── */}
        <Card className="border-border/40 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-lg">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="border-border/40 w-full sm:w-auto" asChild>
              <Link href="/reset-password">Change Password</Link>
            </Button>
          </CardContent>
        </Card>

        {/* ── Sign Out ─────────────────────────────────────────────────── */}
        <div className="pt-2">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-destructive gap-2 w-full sm:w-auto"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            Sign Out
          </Button>
        </div>

      </main>
    </div>
  )
}
