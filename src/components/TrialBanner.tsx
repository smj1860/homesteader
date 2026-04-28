'use client'

import { useSustainData } from '@/hooks/use-sustain-data'
import { Gift, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function TrialBanner() {
  const { trialDaysLeft } = useSustainData()
  const [dismissed, setDismissed] = useState(false)

  // Only render if actively on trial with days remaining
  if (!trialDaysLeft || dismissed) return null

  const isUrgent = trialDaysLeft <= 3

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-40 px-4 py-2 flex items-center justify-center gap-3 text-sm
        ${isUrgent
          ? 'bg-amber-500/95 text-amber-950'
          : 'bg-primary/95 text-primary-foreground'
        } backdrop-blur-sm shadow-sm`}
    >
      <Gift className="h-4 w-4 shrink-0" />

      {isUrgent ? (
        <span className="font-medium">
          Your free trial ends in{' '}
          <strong>{trialDaysLeft} day{trialDaysLeft !== 1 ? 's' : ''}</strong>.{' '}
          <Link href="/account" className="underline underline-offset-2 font-bold hover:opacity-80">
            Manage billing →
          </Link>
        </span>
      ) : (
        <span className="font-medium">
          Free trial active —{' '}
          <strong>{trialDaysLeft} day{trialDaysLeft !== 1 ? 's' : ''} remaining</strong>.
          No charge until your trial ends.{' '}
          <Link href="/account" className="underline underline-offset-2 hover:opacity-80">
            Manage billing
          </Link>
        </span>
      )}

      <button
        onClick={() => setDismissed(true)}
        className="ml-auto shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
