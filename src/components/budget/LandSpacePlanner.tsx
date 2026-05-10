'use client'

import { useState } from 'react'
import { generateLandPlan, generateSpacePlan } from '@/app/actions/budget-planner'

// ─── Brand constants ──────────────────────────────────────────────────────────
const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold mb-2" style={{ color: FOREST }}>
      {children}
    </p>
  )
}

function Input({ value, onChange, placeholder, type = 'text' }: {
  value: string | number
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
      style={{
        backgroundColor: PARCH2,
        border: `1.5px solid ${FOREST}30`,
        color: FOREST,
        fontFamily: 'Georgia, serif',
      }}
      onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
      onBlur={e => (e.currentTarget.style.borderColor = `${FOREST}30`)}
    />
  )
}

function RadioGroup({ label, options, value, onChange }: {
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: value === opt.value ? FOREST : PARCH2,
              color: value === opt.value ? PARCH : FOREST,
              border: `1.5px solid ${value === opt.value ? FOREST : `${FOREST}25`}`,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function YieldDots({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: i <= rating ? GOLD : `${FOREST}20` }}
        />
      ))}
    </div>
  )
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {text}
    </span>
  )
}

function EasyWins({ wins }: { wins: string[] }) {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: `${GOLD}10`, border: `1.5px solid ${GOLD}30` }}>
      <h3 className="font-bold text-base mb-3" style={{ color: FOREST }}>⚡ Easy Wins — Start Here</h3>
      <ol className="space-y-2">
        {wins.map((win, i) => (
          <li key={i} className="flex items-start gap-3 text-sm" style={{ color: FOREST }}>
            <span className="font-bold shrink-0 mt-0.5" style={{ color: GOLD }}>{i + 1}.</span>
            <span>{win}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function CropTable({ crops, type }: {
  crops: any[]
  type: 'land' | 'space'
}) {
  const [expandedSeed, setExpandedSeed] = useState<number | null>(null)

  return (
    <div>
      <h3 className="font-bold text-base mb-3" style={{ color: FOREST }}>
        Recommended Crops ({crops.length})
      </h3>
      <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${FOREST}18` }}>
        {/* Header */}
        <div
          className="grid text-xs font-bold uppercase tracking-wider px-4 py-3"
          style={{
            backgroundColor: FOREST,
            color: PARCH,
            gridTemplateColumns: type === 'land'
              ? '2fr 1.5fr 1fr 1fr 1fr'
              : '2fr 1.5fr 1.5fr 1fr 1fr',
          }}
        >
          <span>Crop</span>
          <span>{type === 'land' ? 'Variety' : 'Container'}</span>
          {type === 'space' && <span>Variety</span>}
          <span>Yield</span>
          <span>Traits</span>
          <span>Seeds</span>
        </div>

        {/* Rows */}
        {crops.map((crop, i) => (
          <div key={i}>
            <div
              className="grid items-center px-4 py-3 text-sm cursor-pointer"
              style={{
                backgroundColor: PARCH2,
                gridTemplateColumns: type === 'land'
                  ? '2fr 1.5fr 1fr 1fr 1fr'
                  : '2fr 1.5fr 1.5fr 1fr 1fr',
                borderBottom: `1px solid ${FOREST}10`,
              }}
              onClick={() => setExpandedSeed(expandedSeed === i ? null : i)}
            >
              {/* Name + category */}
              <div>
                <p className="font-semibold" style={{ color: FOREST }}>{crop.name}</p>
                <p className="text-xs capitalize" style={{ color: `${FOREST}66` }}>{crop.category}</p>
              </div>

              {/* Container or Variety */}
              <div className="text-xs" style={{ color: `${FOREST}88` }}>
                {type === 'space' ? crop.container_size : (crop.variety || '—')}
              </div>

              {/* Space planner: also show variety */}
              {type === 'space' && (
                <div className="text-xs" style={{ color: `${FOREST}88` }}>
                  {crop.variety || '—'}
                </div>
              )}

              {/* Yield dots */}
              <YieldDots rating={crop.yield_rating} />

              {/* Trait badges */}
              <div className="flex flex-wrap gap-1">
                {crop.is_heirloom && <Badge text="Heirloom" color={GOLD} />}
                {crop.is_vertical && <Badge text="Vertical" color={FOREST} />}
                {crop.dual_use?.medicinal && <Badge text="Medicinal" color="#6B3E8A" />}
                {crop.easy_win && <Badge text="Easy" color="#2D7A4F" />}
              </div>

              {/* Seed saving difficulty */}
              <div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor:
                      crop.seed_saving_difficulty === 'easy' ? '#2D7A4F18' :
                      crop.seed_saving_difficulty === 'medium' ? `${GOLD}18` : '#8B2E2E18',
                    color:
                      crop.seed_saving_difficulty === 'easy' ? '#2D7A4F' :
                      crop.seed_saving_difficulty === 'medium' ? GOLD : '#8B2E2E',
                  }}
                >
                  {crop.seed_saving_difficulty}
                </span>
              </div>
            </div>

            {/* Expanded seed saving notes */}
            {expandedSeed === i && (
              <div
                className="px-4 py-3 text-sm"
                style={{ backgroundColor: PARCH, borderBottom: `1px solid ${FOREST}10` }}
              >
                <p className="font-semibold mb-1" style={{ color: GOLD }}>🌱 Seed Saving</p>
                <p style={{ color: FOREST }}>{crop.seed_saving_notes}</p>
                {crop.planting_notes && (
                  <>
                    <p className="font-semibold mt-2 mb-1" style={{ color: GOLD }}>📋 Planting Notes</p>
                    <p style={{ color: FOREST }}>{crop.planting_notes}</p>
                  </>
                )}
                <p className="mt-2 text-xs italic" style={{ color: `${FOREST}66` }}>
                  {crop.affiliate_placeholder}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs mt-2" style={{ color: `${FOREST}55` }}>
        Click any row to see seed saving and planting notes.
      </p>
    </div>
  )
}

function PlanOutput({ plan, type }: { plan: any; type: 'land' | 'space' }) {
  const ai = plan.ai_plan || {}

  return (
    <div className="space-y-6 mt-6">
      {/* Zone badge (land only) */}
      {type === 'land' && plan.zone && (
        <div className="flex items-center gap-3">
          <div
            className="px-4 py-2 rounded-full text-sm font-bold"
            style={{ backgroundColor: FOREST, color: PARCH }}
          >
            Zone {plan.zone}
          </div>
          <p className="text-sm" style={{ color: `${FOREST}88` }}>
            Your USDA hardiness zone — all crop recommendations are filtered to this zone.
          </p>
        </div>
      )}

      {/* Capacity summary (space only) */}
      {type === 'space' && (
        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: FOREST, color: PARCH }}>
            ~{plan.container_capacity} containers
          </div>
          {plan.shelf_capacity && (
            <div className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: GOLD, color: PARCH }}>
              +{plan.shelf_capacity} shelf spots
            </div>
          )}
          {plan.vertical_viable && (
            <div className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: '#2D7A4F', color: PARCH }}>
              Vertical growing viable
            </div>
          )}
        </div>
      )}

      {/* AI Intro */}
      {ai.intro && (
        <div className="rounded-2xl p-5" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}18` }}>
          <p className="text-sm leading-relaxed" style={{ color: FOREST, fontFamily: 'Georgia, serif' }}>
            {ai.intro}
          </p>
        </div>
      )}

      {/* Easy wins */}
      {ai.easy_wins && Array.isArray(ai.easy_wins) && ai.easy_wins.length > 0 && (
        <EasyWins wins={ai.easy_wins} />
      )}

      {/* Crop table */}
      <CropTable crops={plan.recommended_crops} type={type} />

      {/* AI notes */}
      <div className="grid md:grid-cols-2 gap-4">
        {ai.layout_summary && (
          <div className="rounded-2xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Layout</p>
            <p className="text-sm leading-relaxed" style={{ color: FOREST }}>{ai.layout_summary}</p>
          </div>
        )}
        {(ai.heirloom_note || ai.herb_focus) && (
          <div className="rounded-2xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>
              {ai.herb_focus ? 'Herb Focus' : 'Heirloom & Seed Saving'}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: FOREST }}>
              {ai.herb_focus || ai.heirloom_note}
            </p>
          </div>
        )}
        {(ai.vertical_note || ai.shelving_note) && (
          <div className="rounded-2xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>
              Vertical Growing
            </p>
            <p className="text-sm leading-relaxed" style={{ color: FOREST }}>
              {ai.vertical_note || ai.shelving_note}
            </p>
          </div>
        )}
        {(ai.seasonal_tip || ai.grow_light_caveat) && (
          <div className="rounded-2xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>
              {ai.seasonal_tip ? 'Seasonal Tip' : 'Grow Lights'}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: FOREST }}>
              {ai.seasonal_tip || ai.grow_light_caveat}
            </p>
          </div>
        )}
        {ai.seed_saving_note && (
          <div className="rounded-2xl p-4" style={{ backgroundColor: PARCH2, border: `1px solid ${FOREST}15` }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: GOLD }}>Seed Saving</p>
            <p className="text-sm leading-relaxed" style={{ color: FOREST }}>{ai.seed_saving_note}</p>
          </div>
        )}
      </div>

      {/* Affiliate placeholders */}
      {ai.affiliate_categories && (
        <div className="rounded-2xl p-5" style={{ border: `1.5px dashed ${GOLD}50`, backgroundColor: `${GOLD}06` }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: GOLD }}>
            Affiliate Links — Placeholders
          </p>
          <div className="flex flex-wrap gap-2">
            {ai.affiliate_categories.map((cat: string, i: number) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ backgroundColor: PARCH2, color: `${FOREST}88`, border: `1px dashed ${FOREST}30` }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs" style={{ color: `${FOREST}44` }}>
        Plan generated {new Date(plan.generated_at).toLocaleDateString()} · Saved to your account
      </p>
    </div>
  )
}

// ─── Land Planner Form ────────────────────────────────────────────────────────

function LandPlannerForm({ savedPlan, onPlanGenerated }: {
  savedPlan: any
  onPlanGenerated: (plan: any) => void
}) {
  const [sqFootage, setSqFootage] = useState('')
  const [sunTiming, setSunTiming] = useState<'morning' | 'afternoon' | 'unknown'>('morning')
  const [sunIntensity, setSunIntensity] = useState<'full' | 'partial'>('full')
  const [zipCode, setZipCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [plan, setPlan] = useState<any>(savedPlan?.plan_output || null)

  const handleSubmit = async () => {
    if (!sqFootage || !zipCode || zipCode.length < 5) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await generateLandPlan({
        sqFootage: parseFloat(sqFootage),
        sunTiming,
        sunIntensity,
        zipCode,
      })
      setPlan(result.plan)
      onPlanGenerated(result.plan)
    } catch (e: any) {
      setError('Something went wrong generating your plan. Please try again.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Form */}
      <div className="space-y-5 mb-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Label>Usable square footage</Label>
            <Input
              type="number"
              value={sqFootage}
              onChange={setSqFootage}
              placeholder="e.g. 500"
            />
          </div>
          <div>
            <Label>ZIP code</Label>
            <Input
              value={zipCode}
              onChange={setZipCode}
              placeholder="e.g. 37601"
            />
          </div>
        </div>

        <RadioGroup
          label="Sun timing"
          value={sunTiming}
          onChange={v => setSunTiming(v as any)}
          options={[
            { value: 'morning', label: '☀️ Morning sun' },
            { value: 'afternoon', label: '🌤️ Afternoon sun' },
            { value: 'unknown', label: "🤷 I'm not sure" },
          ]}
        />

        <RadioGroup
          label="Sun intensity"
          value={sunIntensity}
          onChange={v => setSunIntensity(v as any)}
          options={[
            { value: 'full', label: '☀️ Full sun (6+ hrs)' },
            { value: 'partial', label: '⛅ Partial sun (3–6 hrs)' },
          ]}
        />

        {error && (
          <p className="text-sm" style={{ color: '#8B2E2E' }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-sm transition-all"
          style={{
            backgroundColor: loading ? `${FOREST}60` : FOREST,
            color: PARCH,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '🌱 Building your plan...' : plan ? '🔄 Regenerate Land Plan' : '🌱 Generate My Land Plan'}
        </button>
      </div>

      {/* Output */}
      {plan && <PlanOutput plan={plan} type="land" />}
    </div>
  )
}

// ─── Space Planner Form ───────────────────────────────────────────────────────

function SpacePlannerForm({ savedPlan, onPlanGenerated }: {
  savedPlan: any
  onPlanGenerated: (plan: any) => void
}) {
  const [sqFootage, setSqFootage] = useState('')
  const [ceilingHeight, setCeilingHeight] = useState('')
  const [hasShelving, setHasShelving] = useState(false)
  const [shelfCount, setShelfCount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [plan, setPlan] = useState<any>(savedPlan?.plan_output || null)

  const handleSubmit = async () => {
    if (!sqFootage || !ceilingHeight) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await generateSpacePlan({
        sqFootage: parseFloat(sqFootage),
        ceilingHeight: parseFloat(ceilingHeight),
        hasShelving,
        shelfCount: hasShelving && shelfCount ? parseInt(shelfCount) : null,
      })
      setPlan(result.plan)
      onPlanGenerated(result.plan)
    } catch (e: any) {
      setError('Something went wrong generating your plan. Please try again.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="space-y-5 mb-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Label>Usable square footage</Label>
            <Input
              type="number"
              value={sqFootage}
              onChange={setSqFootage}
              placeholder="e.g. 80"
            />
          </div>
          <div>
            <Label>Ceiling height (feet)</Label>
            <Input
              type="number"
              value={ceilingHeight}
              onChange={setCeilingHeight}
              placeholder="e.g. 8"
            />
          </div>
        </div>

        {/* Shelving toggle */}
        <div>
          <Label>Do you have shelving available?</Label>
          <div className="flex gap-3">
            {[true, false].map(val => (
              <button
                key={String(val)}
                type="button"
                onClick={() => setHasShelving(val)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: hasShelving === val ? FOREST : PARCH2,
                  color: hasShelving === val ? PARCH : FOREST,
                  border: `1.5px solid ${hasShelving === val ? FOREST : `${FOREST}25`}`,
                }}
              >
                {val ? '✅ Yes' : '❌ No'}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional shelf count */}
        {hasShelving && (
          <div>
            <Label>How many shelves?</Label>
            <Input
              type="number"
              value={shelfCount}
              onChange={setShelfCount}
              placeholder="e.g. 4"
            />
          </div>
        )}

        {error && (
          <p className="text-sm" style={{ color: '#8B2E2E' }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold text-sm transition-all"
          style={{
            backgroundColor: loading ? `${FOREST}60` : FOREST,
            color: PARCH,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '🌿 Building your plan...' : plan ? '🔄 Regenerate Space Plan' : '🌿 Generate My Space Plan'}
        </button>
      </div>

      {plan && <PlanOutput plan={plan} type="space" />}
    </div>
  )
}

// ─── Main Planner Component ───────────────────────────────────────────────────

export default function LandSpacePlanner({ savedLandPlan, savedSpacePlan }: {
  savedLandPlan: any
  savedSpacePlan: any
}) {
  const [activeTab, setActiveTab] = useState<'land' | 'space'>('land')

  const tabs = [
    { id: 'land',  label: '🌱 Land / Ground Space' },
    { id: 'space', label: '🏠 Indoor / Container Space' },
  ]

  return (
    <div>
      {/* Saved plan notice */}
      {(savedLandPlan || savedSpacePlan) && (
        <div
          className="rounded-2xl px-5 py-3 mb-6 text-sm"
          style={{ backgroundColor: `${GOLD}12`, border: `1px solid ${GOLD}30`, color: FOREST }}
        >
          📋 Your saved {savedLandPlan && savedSpacePlan ? 'plans are' : 'plan is'} loaded below. Fill in new inputs and regenerate anytime.
        </div>
      )}

      {/* Tab navigation */}
      <div className="flex gap-2 mb-6 p-1 rounded-2xl" style={{ backgroundColor: PARCH2 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'land' | 'space')}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              backgroundColor: activeTab === tab.id ? FOREST : 'transparent',
              color: activeTab === tab.id ? PARCH : `${FOREST}88`,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Forms */}
      {activeTab === 'land' && (
        <LandPlannerForm
          savedPlan={savedLandPlan}
          onPlanGenerated={() => {}}
        />
      )}
      {activeTab === 'space' && (
        <SpacePlannerForm
          savedPlan={savedSpacePlan}
          onPlanGenerated={() => {}}
        />
      )}
    </div>
  )
}
