"use client"

import { useState, useTransition, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { generateProjectInstructions } from "@/ai/flows/generate-project-instructions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldAlert, Loader2, Sparkles, Wand2, Info, AlertTriangle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PricingModal } from "@/components/PricingModal"

function GenerateProjectContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category    = searchParams.get('category')    || 'Custom'
  const subcategory = searchParams.get('subcategory') || 'General'

  const { tier, inventory, spendCredit, upgradeToPaid, credits } = useSustainData()
  const { toast } = useToast()

  const [description, setDescription]   = useState("")
  const [mode, setMode]                  = useState<"byTheBook" | "macgyver">("byTheBook")
  const [isPending, startTransition]     = useTransition()
  const [showPricing, setShowPricing]    = useState(false)
  const [error, setError]                = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({ title: "Please describe your project first." })
      return
    }

    if (mode === 'macgyver' && tier === 'free') {
      setShowPricing(true)
      return
    }

    if (tier === 'free' && credits <= 0) {
      setShowPricing(true)
      return
    }

    setError(null)

    startTransition(async () => {
      try {
        const inventoryString = inventory.map(i => `${i.name} (${i.quantity})`).join(', ')
        const result = await generateProjectInstructions({
          projectDescription: description,
          instructionMode: mode,
          category,
          subcategory,
          userInventory: inventoryString,
        })

        sessionStorage.setItem('current_project', JSON.stringify(result))
        spendCredit()
        router.push('/projects/view')
      } catch (err: any) {
        // Show inline error state instead of just a toast
        setError(
          err?.message?.includes('rate limit')
            ? "The AI is a little busy right now. Wait a moment and try again."
            : err?.message?.includes('network') || err?.message?.includes('fetch')
            ? "Could not reach the AI — check your connection and try again."
            : "Something went wrong generating your guide. Please try again."
        )
      }
    })
  }

  const handleRetry = () => {
    setError(null)
    handleGenerate()
  }

  const inventoryPreview = inventory.slice(0, 2).map(i => i.name).join(', ')

  return (
    <main className="container mx-auto max-w-2xl px-4">
      <header className="mb-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          ← Back
        </Button>
        <h1 className="font-headline text-3xl font-bold text-primary">SteadCraft Project Guide</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="capitalize">{category}</Badge>
          <Badge variant="outline"  className="capitalize">{subcategory}</Badge>
        </div>
      </header>

      {/* ── Error state ──────────────────────────────────────────────── */}
      {error && (
        <Card className="mb-6 border-destructive/40 bg-destructive/5">
          <CardContent className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-headline font-bold text-sm text-foreground mb-0.5">Guide generation failed</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10 gap-2"
              onClick={handleRetry}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5" />
              )}
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Project Details
          </CardTitle>
          <CardDescription>
            Provide details for your project in the{" "}
            <span className="font-bold text-primary">{subcategory}</span> category.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">What are you working on?</Label>
            <Textarea
              id="description"
              placeholder={`Describe your ${subcategory.toLowerCase()} project in as much detail as you like…`}
              className="min-h-[150px] text-base bg-background border-border/40"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                if (error) setError(null) // clear error when user edits
              }}
            />
          </div>

          {/* MacGyver mode toggle */}
          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4 border border-border/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="macgyver-mode" className="font-bold">MacGyver Mode</Label>
                <Badge variant="outline" className="bg-accent text-accent-foreground border-accent text-[10px]">
                  Pro
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground max-w-[220px]">
                Resourceful, improvised solutions using your existing inventory.
              </p>
            </div>
            <Switch
              id="macgyver-mode"
              checked={mode === 'macgyver'}
              onCheckedChange={(checked) => setMode(checked ? 'macgyver' : 'byTheBook')}
            />
          </div>

          {mode === 'macgyver' && (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Liability Warning</AlertTitle>
              <AlertDescription className="text-xs">
                MacGyver instructions are improvised and potentially risky. SteadCraft assumes no
                liability for outcomes. Proceed at your own risk and always prioritize safety.
              </AlertDescription>
            </Alert>
          )}

          {inventoryPreview && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-primary mb-1">Active Inventory Match</p>
                AI will prioritize tools you already own like{" "}
                <span className="font-bold text-foreground">{inventoryPreview}</span>.
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <Button
            className="w-full h-12 text-lg font-headline bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleGenerate}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Crafting your guide…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Expert Instructions
              </>
            )}
          </Button>

          {tier === 'free' && (
            <p className="text-xs text-muted-foreground text-center">
              {credits > 0
                ? <>You have <span className="font-bold text-foreground">{credits}</span> free guide remaining.</>
                : <>No guides remaining. <button onClick={() => setShowPricing(true)} className="text-primary font-semibold hover:underline">Try Pro free →</button></>
              }
            </p>
          )}
        </CardFooter>
      </Card>

      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        onUpgrade={() => {
          upgradeToPaid()
          setShowPricing(false)
        }}
      />
    </main>
  )
}

export default function GenerateProjectPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <Suspense fallback={
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }>
        <GenerateProjectContent />
      </Suspense>
    </div>
  )
}
