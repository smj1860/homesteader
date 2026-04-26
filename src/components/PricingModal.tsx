
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
import { Check, Loader2 } from "lucide-react"
import { createCheckoutSession } from "@/app/actions/stripe"
import { useToast } from "@/hooks/use-toast"

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void // This remains for local fallback/demo state
}

// These should be replaced with actual Stripe Price IDs from your dashboard
const STRIPE_PRICE_IDS = {
  MONTHLY_PRO: "price_monthly_id_placeholder",
  SINGLE_PROJECT: "price_single_id_placeholder",
}

export function PricingModal({ isOpen, onClose, onUpgrade }: PricingModalProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const handleStripeCheckout = async (priceId: string, mode: 'subscription' | 'payment') => {
    setIsLoading(priceId)
    try {
      const result = await createCheckoutSession(priceId, mode)
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center font-headline text-2xl">Upgrade Rootstock</DialogTitle>
          <DialogDescription className="text-center">
            You've used your free credits. Choose a plan to continue your homesteading journey.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="rounded-xl border-2 border-primary bg-primary/5 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-lg font-bold">Pro Monthly</h3>
              <span className="text-xl font-bold">$8/mo</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited DIY Project Guides</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlock "MacGyver" Mode</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Expert Clarifications AI</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Priority Contractor Matching</li>
            </ul>
            <Button 
              className="mt-6 w-full" 
              onClick={() => handleStripeCheckout(STRIPE_PRICE_IDS.MONTHLY_PRO, 'subscription')}
              disabled={!!isLoading}
            >
              {isLoading === STRIPE_PRICE_IDS.MONTHLY_PRO ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Subscribe Now"
              )}
            </Button>
          </div>
          
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-lg font-medium">Single Project</h3>
              <span className="text-xl font-medium">$3</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Unlock one specific project guide including MacGyver mode instructions.</p>
            <Button 
              variant="outline" 
              className="mt-4 w-full" 
              onClick={() => handleStripeCheckout(STRIPE_PRICE_IDS.SINGLE_PROJECT, 'payment')}
              disabled={!!isLoading}
            >
               {isLoading === STRIPE_PRICE_IDS.SINGLE_PROJECT ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Unlock Project"
              )}
            </Button>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          Yearly subscription available for $80/year (Save 17%)
        </div>
      </DialogContent>
    </Dialog>
  )
}
