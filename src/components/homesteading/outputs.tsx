'use client'

import { useState } from 'react'
import {
  Leaf, Zap, ChevronDown, ChevronUp,
  Download, Save, BookOpen, ShoppingCart, AlertCircle, Lock,
} from 'lucide-react'
import { HomesteadPlanData } from '@/lib/pdf-generator'
import { downloadPDFAsPrint } from '@/lib/pdf-generator'
import { saveHomesteadPlan } from '@/app/actions/homesteading'

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

interface Props {
  planData:    HomesteadPlanData
  userId?:     string | null
  onBack?:     () => void
  onNeedAuth?: () => void
}

export function HomesteadingOutputs({ planData, userId, onBack, onNeedAuth }: Props) {
  const [expanded,  setExpanded]  = useState<Set<string>>(new Set(['crops']))
  const [saving,    setSaving]    = useState(false)
  const [saved,     setSaved]     = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const toggle = (key: string) => {
    const locked = !userId && (key === 'soil' || key === 'chickens')
    if (locked) { onNeedAuth?.(); return }
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const handleDownload = () => {
    if (!userId) { onNeedAuth?.(); return }
    downloadPDFAsPrint(planData)
  }

  const handleSave = async () => {
    if (!userId) { onNeedAuth?.(); return }
    setSaving(true)
    setSaveError(null)
    try {
      await saveHomesteadPlan(userId, planData)
      setSaved(true)
    } catch {
      setSaveError('Could not save plan. Try again.')
    } finally {
      setSaving(false)
    }
  }

  // ── Shared style helpers ──────────────────────────────────────────────
  const card = (extra?: React.CSSProperties): React.CSSProperties => ({
    backgroundColor: '#ffffff',
    border: `1.5px solid ${FOREST}18`,
    borderRadius: '0.875rem',
    overflow: 'hidden',
    ...extra,
  })

  const sectionBtn = (locked?: boolean): React.CSSProperties => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.25rem',
    background: 'none',
    border: 'none',
    cursor: locked ? 'pointer' : 'pointer',
    textAlign: 'left',
    gap: '0.75rem',
  })

  const sectionTitle: React.CSSProperties = {
    fontFamily: 'Georgia, serif',
    fontSize: '1.0625rem',
    fontWeight: 700,
    color: FOREST,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  }

  const body: React.CSSProperties = {
    padding: '0 1.25rem 1.25rem',
  }

  const pillStyle = (color: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '0.25rem 0.625rem',
    borderRadius: '9999px',
    fontSize: '0.6875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    backgroundColor: `${color}20`,
    color,
    border: `1px solid ${color}50`,
  })

  return (
    <div style={{ width: '100%', maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Summary header */}
      <div style={{ backgroundColor: FOREST, borderRadius: '0.875rem', padding: '1.5rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: GOLD, marginBottom: '0.375rem' }}>
          Your Personalized Plan
        </p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: PARCH, margin: '0 0 0.5rem' }}>
          {planData.acreage < 1
            ? `${(planData.acreage * 43560).toFixed(0)} sq ft Homestead`
            : `${planData.acreage}-Acre Homestead`}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            `${planData.hardinessZone}`,
            `${planData.state}`,
            `Family of ${planData.familySize}`,
            planData.wantsChickens ? 'Chickens ✓' : null,
          ].filter(Boolean).map(tag => (
            <span key={tag!} style={pillStyle(GOLD)}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Auth nudge for guests */}
      {!userId && (
        <div style={{ backgroundColor: `${GOLD}12`, border: `1.5px solid ${GOLD}40`, borderRadius: '0.875rem', padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <AlertCircle style={{ width: '1.125rem', height: '1.125rem', color: GOLD, flexShrink: 0, marginTop: '0.125rem' }} />
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.875rem', color: FOREST, margin: '0 0 0.25rem' }}>
              Crops & yields are visible — soil mix, coop guide, and PDF require a free account.
            </p>
            <button
              onClick={onNeedAuth}
              style={{ fontSize: '0.8125rem', fontWeight: 700, color: GOLD, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Sign up free →
            </button>
          </div>
        </div>
      )}

      {/* ── Recommended Crops ─────────────────────────────────────────── */}
      <div style={card()}>
        <button style={sectionBtn()} onClick={() => toggle('crops')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <Leaf style={{ width: '1.125rem', height: '1.125rem', color: GOLD }} />
            <span style={sectionTitle}>🌱 Recommended Crops</span>
          </div>
          {expanded.has('crops')
            ? <ChevronUp style={{ width: '1.125rem', height: '1.125rem', color: `${FOREST}60`, flexShrink: 0 }} />
            : <ChevronDown style={{ width: '1.125rem', height: '1.125rem', color: `${FOREST}60`, flexShrink: 0 }} />}
        </button>

        {expanded.has('crops') && (
          <div style={body}>
            <p style={{ fontSize: '0.875rem', color: `${FOREST}99`, marginBottom: '0.875rem' }}>
              Top picks for {planData.hardinessZone} in {planData.state}, sorted by caloric value per square foot:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {planData.recommendedCrops.map((crop, i) => (
                <div
                  key={crop}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.625rem 0.875rem',
                    backgroundColor: PARCH2,
                    borderRadius: '0.5rem',
                    border: `1px solid ${FOREST}12`,
                  }}
                >
                  <span style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: GOLD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 700, flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: FOREST }}>{crop}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.875rem', padding: '0.75rem', backgroundColor: `${FOREST}08`, borderRadius: '0.5rem', fontSize: '0.8125rem', color: `${FOREST}99` }}>
              💡 Start with 2–3 of these your first season. It's easier to expand than to overwhelm yourself.
            </div>
          </div>
        )}
      </div>

      {/* ── Vegetable Yields ──────────────────────────────────────────── */}
      <div style={card()}>
        <button style={sectionBtn()} onClick={() => toggle('yields')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <Zap style={{ width: '1.125rem', height: '1.125rem', color: GOLD }} />
            <span style={sectionTitle}>📊 Realistic Yields for Your Family</span>
          </div>
          {expanded.has('yields')
            ? <ChevronUp style={{ width: '1.125rem', height: '1.125rem', color: `${FOREST}60`, flexShrink: 0 }} />
            : <ChevronDown style={{ width: '1.125rem', height: '1.125rem', color: `${FOREST}60`, flexShrink: 0 }} />}
        </button>

        {expanded.has('yields') && (
          <div style={body}>
            <p style={{ fontSize: '0.875rem', color: `${FOREST}99`, marginBottom: '0.875rem' }}>
              With {planData.acreage} acres and a family of {planData.familySize}, expect these annual yields:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {planData.vegetableYields.map(item => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: PARCH2,
                    borderRadius: '0.5rem',
                    border: `1px solid ${FOREST}12`,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', color: FOREST, margin: '0 0 0.25rem' }}>{item.name}</p>
                    <p style={{ fontSize: '0.75rem', color: `${FOREST}88`, margin: 0 }}>{item.notes}</p>
                  </div>
                  <span style={{ ...pillStyle(FOREST), whiteSpace: 'nowrap' }}>{item.yield}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.875rem', padding: '0.75rem', backgroundColor: `${GOLD}10`, borderRadius: '0.5rem', border: `1px solid ${GOLD}30`, fontSize: '0.8125rem', color: `${FOREST}bb` }}>
              <AlertCircle style={{ display: 'inline', width: '0.875rem', height: '0.875rem', marginRight: '0.375rem', verticalAlign: 'middle' }} />
              These are conservative estimates. Your actual yields depend on soil quality, weather, and experience.
            </div>
          </div>
        )}
      </div>

      {/* ── Soil Mix ──────────────────────────────────────────────────── */}
      <div style={card(!userId ? { opacity: 0.7 } : {})}>
        <button style={sectionBtn()} onClick={() => toggle('soil')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <Leaf style={{ width: '1.125rem', height: '1.125rem', color: GOLD }} />
            <span style={sectionTitle}>
              🥗 Elite DIY Soil Mix Recipe
              {!userId && (
                <span style={pillStyle(GOLD)}>
                  <Lock style={{ display: 'inline', width: '0.625rem', height: '0.625rem', marginRight: '0.25rem', verticalAlign: 'middle' }} />
                  Premium
                </span>
              )}
            </span>
          </div>
          {expanded.has('soil')
            ? <ChevronUp style={{ width: '1.125rem', height: '1.125rem', color: `${FOREST}60`, flexShrink: 0 }} />
            : <ChevronDown style={{ width: '1.125rem', height: '1.125rem', color: `${FOREST}60`, flexShrink: 0 }} />}
        </button>

        {!userId && (
          <div style={{ padding: '0 1.25rem 1rem', fontSize: '0.875rem', color: `${FOREST}88`, fontStyle: 'italic' }}>
            Sign in to unlock your customized soil mix recipe
          </div>
        )}

        {expanded.has('soil') && userId && (
          <div style={body}>
            <p style={{ fontSize: '0.875rem', color: `${FOREST}99`, marginBottom: '0.875rem' }}>{planData.soilMix.description}</p>
            <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: FOREST, marginBottom: '0.625rem' }}>Scalable Ingredient Ratios:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '0.875rem' }}>
              {planData.soilMix.ingredients.map(ing => (
                <div
                  key={ing.name}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: PARCH2, borderRadius: '0.5rem', border: `1px solid ${FOREST}12` }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: FOREST }}>{ing.name}</span>
                  <span style={pillStyle(FOREST)}>{ing.ratio}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: `${FOREST}08`, borderRadius: '0.5rem', fontSize: '0.8125rem', color: `${FOREST}99` }}>
              <strong>Pro Tip:</strong> These ratios scale linearly. For 8 raised beds, multiply each by 8 and order in bulk — you'll save money.
            </div>
          </div>
        )}
      </div>

      {/* ── Chickens ──────────────────────────────────────────────────── */}
      {planData.wantsChickens && (
        <div style={card(!userId ? { opacity: 0.7 } : {})}>
          <button style={sectionBtn()} onClick={() => toggle('chickens')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <span style={{ fontSize: '1.125rem' }}>🐔</span>
              <span style={sectionTitle}>
                Coop Recommendations
                {!userId && (
                  <span style={pillStyle(GOLD)}>
                    <Lock style={{ display: 'inline', width: '0.625rem', height: '0.625rem', marginRight: '0.25rem', verticalAlign: 'middle' }} />
                    Premium
                  </span>
                )}
              </span>
            </div>
            {expanded.has('chickens')
              ? <ChevronUp style={{ width: '1.125rem', height: '1.125rem', color: `${FOREST}60`, flexShrink: 0 }} />
              : <ChevronDown style={{ width: '1.125rem', height: '1.125rem', color: `${FOREST}60`, flexShrink: 0 }} />}
          </button>

          {!userId && (
            <div style={{ padding: '0 1.25rem 1rem', fontSize: '0.875rem', color: `${FOREST}88`, fontStyle: 'italic' }}>
              Sign in to unlock your customized coop recommendations
            </div>
          )}

          {expanded.has('chickens') && userId && (
            <div style={body}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {[
                  { label: 'Coop Size', value: planData.coopSize },
                  { label: 'Family of', value: `${planData.familySize} people` },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: PARCH2, borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: `${FOREST}88` }}>{row.label}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: FOREST }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: `${FOREST}99`, marginBottom: '0.875rem' }}>
                Explore our step-by-step guides and curated suppliers:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { icon: <BookOpen style={{ width: '1rem', height: '1rem' }} />, label: 'Chicken Coop Builder Guide' },
                  { icon: <ShoppingCart style={{ width: '1rem', height: '1rem' }} />, label: 'Browse Coop Kits & Supplies' },
                ].map(btn => (
                  <button
                    key={btn.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.625rem 0.875rem',
                      borderRadius: '0.5rem',
                      border: `1.5px solid ${FOREST}25`,
                      backgroundColor: 'transparent',
                      color: FOREST,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {btn.icon} {btn.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Next Steps ────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: `${FOREST}08`, border: `1.5px solid ${FOREST}15`, borderRadius: '0.875rem', padding: '1.25rem' }}>
        <h3 style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '1.0625rem', color: FOREST, margin: '0 0 0.875rem' }}>
          📋 Your Next Steps
        </h3>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {[
            { label: 'Prepare your soil', sub: 'Order components for your soil mix before planting season' },
            { label: 'Plan your garden layout', sub: 'Map out where each crop will go based on sunlight & water' },
            { label: 'Start a garden journal', sub: 'Track dates, yields, and lessons learned each season' },
            ...(planData.wantsChickens ? [{ label: 'Plan your coop', sub: 'Finalize dimensions and construction timeline' }] : []),
          ].map((step, i) => (
            <li key={step.label} style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: GOLD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 700, flexShrink: 0, marginTop: '0.125rem' }}>
                {i + 1}
              </span>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: FOREST, margin: '0 0 0.125rem' }}>{step.label}</p>
                <p style={{ fontSize: '0.75rem', color: `${FOREST}88`, margin: 0 }}>{step.sub}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Action buttons ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleDownload}
          style={{
            flex: 1,
            minWidth: '8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            borderRadius: '0.625rem',
            border: `1.5px solid ${FOREST}30`,
            backgroundColor: 'transparent',
            color: FOREST,
            fontWeight: 700,
            fontSize: '0.9375rem',
            cursor: 'pointer',
          }}
        >
          <Download style={{ width: '1rem', height: '1rem' }} />
          {userId ? 'Download PDF' : '🔒 Download PDF'}
        </button>

        <button
          onClick={handleSave}
          disabled={saving || saved || !userId}
          style={{
            flex: 1,
            minWidth: '8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            borderRadius: '0.625rem',
            border: 'none',
            backgroundColor: saved ? `${FOREST}60` : FOREST,
            color: PARCH,
            fontWeight: 700,
            fontSize: '0.9375rem',
            cursor: saving || !userId ? 'not-allowed' : 'pointer',
            opacity: !userId ? 0.6 : 1,
          }}
        >
          <Save style={{ width: '1rem', height: '1rem' }} />
          {saved ? 'Saved ✓' : saving ? 'Saving…' : userId ? 'Save to Account' : '🔒 Save to Account'}
        </button>
      </div>

      {saveError && (
        <p style={{ fontSize: '0.8125rem', color: '#c0392b', textAlign: 'center' }}>{saveError}</p>
      )}

      {onBack && (
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: `${FOREST}88`, fontSize: '0.875rem', fontWeight: 600, padding: '0.25rem 0' }}
        >
          ← Start Over
        </button>
      )}
    </div>
  )
}
