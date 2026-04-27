"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Gift } from "lucide-react"
import { createCheckoutSession } from "@/app/actions/stripe"
import { useToast } from "@/hooks/use-toast"

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
}

const STRIPE_PRICE_IDS = {
  MONTHLY_PRO: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_monthly_id_placeholder",
  SINGLE_PROJECT: "price_single_id_placeholder",
}

export function PricingModal({ isOpen, onClose, onUpgrade }: PricingModalProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const handleStripeCheckout = async (
    priceId: string,
    mode: 'subscription' | 'payment',
    withTrial = false,
  ) => {
    const key = withTrial ? `${priceId}_trial` : priceId
    setIsLoading(key)
    try {
      const result = await createCheckoutSession(priceId, mode, withTrial)
      if (result.url) {
        window.location.href = result.url
      }
    } catch (error: any) {
      toast({
        title: "Checkout Error",
        description: error.message || "Could not initiate Stripe checkout.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  const trialKey = `${STRIPE_PRICE_IDS.MONTHLY_PRO}_trial`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-center font-headline text-2xl">Upgrade SteadCraft</DialogTitle>
          <DialogDescription className="text-center">
            You&apos;ve used your free project. Choose a plan to keep building.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          {/* Trial CTA — primary option */}
          <div className="rounded-xl border-2 border-primary bg-primary/5 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-lg font-bold">Try Pro Free — 30 Days</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              No charge for 30 days. Cancel any time before day 31 and pay nothing. After that, $7/mo.
            </p>
            <ul className="mb-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited DIY Project Guides</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> MacGyver Mode</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> AI Step Clarifications</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> AI Inventory Detection</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Build Logs</li>
            </ul>
            <Button
              className="w-full bg-primary text-primary-foreground font-bold"
              onClick={() => handleStripeCheckout(STRIPE_PRICE_IDS.MONTHLY_PRO, 'subscription', true)}
              disabled={!!isLoading}
            >
              {isLoading === trialKey ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Start Free Trial"
              )}
            </Button>
          </div>

          {/* Skip trial — subscribe now */}
          <div className="rounded-xl border border-border/40 p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-headline text-base font-medium">Subscribe Now</h3>
              <span className="text-base font-bold">$7/mo</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Skip the trial and start Pro immediately.</p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleStripeCheckout(STRIPE_PRICE_IDS.MONTHLY_PRO, 'subscription', false)}
              disabled={!!isLoading}
            >
              {isLoading === STRIPE_PRICE_IDS.MONTHLY_PRO ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Subscribe at $7/mo"
              )}
            </Button>
          </div>

          {/* Single project unlock */}
          <div className="rounded-xl border border-border/40 p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-headline text-base font-medium">Single Project</h3>
              <span className="text-base font-bold">$3</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Unlock one project guide including MacGyver mode.</p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleStripeCheckout(STRIPE_PRICE_IDS.SINGLE_PROJECT, 'payment', false)}
              disabled={!!isLoading}
            >
              {isLoading === STRIPE_PRICE_IDS.SINGLE_PROJECT ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Unlock This Project"
              )}
            </Button>
          </div>

        </div>

        <div className="text-center text-xs text-muted-foreground">
          Yearly subscription available for $80/year — save 17%
        </div>
      </DialogContent>
    </Dialog>
  )
}
