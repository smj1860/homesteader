"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { useUser, useSupabaseClient } from "@/supabase"
import { createBillingPortalSession } from "@/app/actions/stripe"
import { getZoneFromZip } from "@/lib/zone-lookup"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2, Crown, Loader2, User,
  CreditCard, Gift, AlertTriangle, Leaf, MapPin
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

function AccountContent() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const { toast }    = useToast()
  const { user, isUserLoading } = useUser() as any
  const supabase     = useSupabaseClient()
  const { tier, credits, isLoading } = useSustainData()

  const [username,         setUsername]         = useState("")
  const [zipCode,          setZipCode]          = useState("")
  const [detectedZone,     setDetectedZone]     = useState<string | null>(null)
  const [isSavingProfile,  setIsSavingProfile]  = useState(false)
  const [isPortalLoading,  setIsPortalLoading]  = useState(false)
  const [trialEndsAt,      setTrialEndsAt]      = useState<string | null>(null)
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null)

  // Success toast after upgrade redirect
  useEffect(() => {
    if (searchParams.get("upgraded") === "true") {
      toast({
        title: "Welcome to SteadCraft Pro! 🎉",
        description: "Your account has been upgraded. Build without limits.",
      })
    }
  }, [searchParams, toast])

  // Load user profile from Supabase
  useEffect(() => {
    if (!user) return
    supabase
      .from("users")
      .select("username, zip_code, trial_ends_at, stripe_customer_id")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (!data) return
        setUsername(data.username || "")
        setZipCode(data.zip_code || "")
        setTrialEndsAt(data.trial_ends_at || null)
        setStripeCustomerId(data.stripe_customer_id || null)
        if (data.zip_code) {
          getZoneFromZip(data.zip_code).then(info => {
            if (info) setDetectedZone(`Zone ${info.zone_num} — ${info.state}`)
          })
        }
      })
  }, [user, supabase])

  // Only redirect once BOTH loading states are done and user is confirmed null
  // This prevents premature redirect while the session is being restored
  useEffect(() => {
    const authLoading = isUserLoading ?? isLoading
    if (!authLoading && !isLoading && !user) {
      router.push("/signup")
    }
  }, [user, isLoading, isUserLoading, router])

  const handleZipChange = async (val: string) => {
    setZipCode(val)
    if (val.length >= 5) {
      const info = await getZoneFromZip(val)
      setDetectedZone(info ? `Zone ${info.zone_num} — ${info.state}` : "Zone not found")
    } else {
      setDetectedZone(null)
    }
  }

  const handleSaveProfile = async () => {
    if (!user) return
    setIsSavingProfile(true)
    const { error } = await supabase
      .from("users")
      .update({ username: username.trim() || null, zip_code: zipCode.trim() || null })
      .eq("id", user.id)
    if (error) {
      toast({ title: "Could not save profile", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Profile saved!" })
    }
    setIsSavingProfile(false)
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

  const trialDaysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / 86400000))
    : null
  const isOnTrial = tier === "paid" && trialDaysLeft !== null && trialDaysLeft > 0

  // Show spinner while loading — prevents premature redirect flash
  if (isLoading || isUserLoading || !user) {
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

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-6 w-6 fill-current" />
          </div>
          <div>
            <h1 className="font-headline text-2xl font-bold text-foreground">Your Account</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* ── Subscription ────────────────────────────────────────────── */}
        <Card className="border-border/40 bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline text-lg text-card-foreground">Subscription</CardTitle>
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
            {tier === "free" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-card-foreground/70">Project guides remaining</span>
                  <span className="font-bold text-card-foreground">{credits} / 1</span>
                </div>
                {credits === 0 && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-xs text-card-foreground/70">
                      You&apos;ve used your free guide.{" "}
                      <Link href="/pricing" className="text-accent font-semibold hover:underline">
                        Try Pro free for 30 days →
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            )}
            {tier === "paid" && !isOnTrial && (
              <div className="flex items-center gap-2 text-sm text-card-foreground/70">
                <CheckCircle2 className="h-4 w-4 text-accent" />
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
                className="border-card-foreground/20 text-card-foreground gap-2 hover:bg-card-foreground/10"
                onClick={handleManageBilling}
                disabled={isPortalLoading}
              >
                {isPortalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                Manage Billing
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* ── Profile ─────────────────────────────────────────────────── */}
        <Card className="border-border/40 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-lg text-card-foreground flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </CardTitle>
            <CardDescription className="text-card-foreground/60">
              Your display name, location zone, and account email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-card-foreground">Username</Label>
              <Input
                id="username"
                placeholder="e.g. BackyardBuilder"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-card-foreground/5 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/40"
                maxLength={32}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="zipcode" className="text-card-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-card-foreground/60" />
                Zip Code
                <span className="text-xs font-normal text-card-foreground/50 ml-1">
                  — sets your USDA growing zone in Resources
                </span>
              </Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="zipcode"
                  placeholder="e.g. 37064"
                  value={zipCode}
                  onChange={(e) => handleZipChange(e.target.value)}
                  className="bg-card-foreground/5 border-card-foreground/20 text-card-foreground placeholder:text-card-foreground/40 max-w-[160px]"
                  maxLength={10}
                />
                {detectedZone && (
                  <Badge variant="outline" className="border-accent/40 text-accent gap-1 text-xs">
                    <MapPin className="h-3 w-3" /> {detectedZone}
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-card-foreground">Email</Label>
              <Input
                value={user.email || ""}
                disabled
                className="bg-card-foreground/5 border-card-foreground/20 text-card-foreground/50"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
              className="bg-primary-foreground text-primary font-bold hover:bg-primary-foreground/90"
            >
              {isSavingProfile && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Save Profile
            </Button>
          </CardFooter>
        </Card>

        {/* ── Security ────────────────────────────────────────────────── */}
        <Card className="border-border/40 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-lg text-card-foreground">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="border-card-foreground/20 text-card-foreground hover:bg-card-foreground/10 w-full sm:w-auto"
              asChild
            >
              <Link href="/reset-password">Change Password</Link>
            </Button>
          </CardContent>
        </Card>

      </main>
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <AccountContent />
    </Suspense>
  )
}
