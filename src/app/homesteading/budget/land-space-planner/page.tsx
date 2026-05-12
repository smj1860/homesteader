'use client'

// src/app/homesteading/budget/land-space-planner/page.tsx

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser } from '@/supabase'
import { getSavedBudgetPlans } from '@/app/actions/budget-planner'
import LandSpacePlanner from '@/components/budget/LandSpacePlanner'

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export default function LandSpacePlannerPage() {
  const { user, loading: authLoading } = useUser()
  const [savedPlans, setSavedPlans]   = useState<{ landPlan: unknown; spacePlan: unknown } | null>(null)
  const [plansLoading, setPlansLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    setPlansLoading(true)
    getSavedBudgetPlans()
      .then(setSavedPlans)
      .catch(() => setSavedPlans(null))
      .finally(() => setPlansLoading(false))
  }, [user])

  // Show nothing while auth resolves — avoids flash of the sign-in tile
  if (authLoading) {
    return (
      <main style={{ backgroundColor: PARCH, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: `3px solid ${GOLD}`, borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </main>
    )
  }

  return (
    <main style={{ backgroundColor: PARCH, minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8 flex items-center gap-2" style={{ color: `${FOREST}66` }}>
          <a href="/homesteading" style={{ color: `${FOREST}66` }} className="hover:underline">Homesteading</a>
          <span>›</span>
          <a href="/homesteading/budget" style={{ color: `${FOREST}66` }} className="hover:underline">On a Budget</a>
          <span>›</span>
          <span style={{ color: FOREST }}>Land & Space Planner</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GOLD }}>
            Start Here
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: FOREST }}>
            Land & Space Planner
          </h1>
          <p className="text-base leading-relaxed" style={{ color: `${FOREST}99` }}>
            Tell us about your available space and we&apos;ll build a personalized growing plan — weighted toward
            heirloom varieties, high-yield crops, and vertical growing to maximize every square foot.
            Your plan is saved to your account and referenced throughout the rest of this guide.
          </p>
        </div>

        {/* How it works */}
        <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: FOREST }}>How it works</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Enter your space', desc: 'Square footage, sun exposure, and zip code for outdoor — or dimensions and ceiling height for indoor.' },
              { step: '2', title: 'Get your plan', desc: 'We filter crops by your zone, weight toward heirloom and vertical varieties, and generate your personalized guide.' },
              { step: '3', title: 'Reference it throughout', desc: "Your plan stays saved on your account. You'll use it in the Food Production, Soil & Seeds, and Money Generation sections." },
            ].map(item => (
              <div key={item.step} className="flex gap-3">
                <div
                  className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: GOLD, color: PARCH }}
                >
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: FOREST }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: `${FOREST}77` }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auth gate — only shows if truly logged out */}
        {!user ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: FOREST, border: `2px solid ${GOLD}` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
              Free Account Required
            </p>
            <h2 className="text-xl font-bold mb-3" style={{ color: PARCH }}>
              Sign in to build your plan
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: `${PARCH}cc` }}>
              The Land & Space Planner saves your results to your account so every other section of
              this guide can reference them. Creating an account is free — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/signup"
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ backgroundColor: GOLD, color: '#1a1a1a' }}
              >
                Create Free Account
              </Link>
              <Link
                href="/signup?mode=signin"
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ backgroundColor: 'transparent', color: PARCH, border: `1.5px solid ${PARCH}40` }}
              >
                Sign In
              </Link>
            </div>
          </div>
        ) : plansLoading ? (
          <div className="flex items-center justify-center py-16" style={{ color: `${FOREST}88` }}>
            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', border: `2px solid ${GOLD}`, borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', marginRight: '0.75rem' }} />
            Loading your saved plans…
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : (
          <LandSpacePlanner
            savedLandPlan={savedPlans?.landPlan ?? null}
            savedSpacePlan={savedPlans?.spacePlan ?? null}
          />
        )}

        {/* Bottom nav */}
        <div
          className="mt-12 pt-8 flex items-center justify-between text-sm"
          style={{ borderTop: `1px solid ${FOREST}20` }}
        >
          <a href="/homesteading/budget" className="flex items-center gap-2 font-medium" style={{ color: FOREST }}>
            ← Overview
          </a>
          <a
            href="/homesteading/budget/tools"
            className="flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl transition-all"
            style={{ backgroundColor: FOREST, color: PARCH }}
          >
            Next: Tools →
          </a>
        </div>

      </div>
    </main>
  )
}
