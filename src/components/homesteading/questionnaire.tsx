'use client'

import { useState } from 'react'
import { Home, Users, MapPin, Egg, Sprout, Loader2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { getZoneFromZip } from '@/lib/zone-lookup'

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export interface QuestionnaireData {
  acreage:      number
  familySize:   number
  zipCode:      string
  zone:         string
  state:        string
  wantsChickens: boolean
}

interface Props {
  onComplete: (data: QuestionnaireData) => void
  isLoading?: boolean
}

export function HomesteadingQuestionnaire({ onComplete, isLoading = false }: Props) {
  const [acreage,      setAcreage]      = useState('')
  const [familySize,   setFamilySize]   = useState(4)
  const [zipCode,      setZipCode]      = useState('')
  const [zone,         setZone]         = useState('')
  const [state,        setState]        = useState('')
  const [wantsChickens, setWantsChickens] = useState(true)
  const [zoneLoading,  setZoneLoading]  = useState(false)
  const [zoneError,    setZoneError]    = useState<string | null>(null)
  const [acreageError, setAcreageError] = useState<string | null>(null)

  const handleZipChange = async (value: string) => {
    setZipCode(value)
    setZoneError(null)
    if (value.length === 5) {
      setZoneLoading(true)
      try {
        const info = await getZoneFromZip(value)
        if (info) {
          setZone(`Zone ${info.zone_num}`)
          setState(info.state)
        } else {
          setZoneError('Zone not found for this zip code')
          setZone('')
          setState('')
        }
      } catch {
        setZoneError('Could not look up zone for this zip code')
        setZone('')
        setState('')
      } finally {
        setZoneLoading(false)
      }
    } else {
      setZone('')
      setState('')
    }
  }

  const handleSubmit = () => {
    if (!acreage || acreage.trim() === '') {
      setAcreageError('Please enter your acreage')
      return
    }
    const acreageNum = parseFloat(acreage)
    if (isNaN(acreageNum) || acreageNum <= 0) {
      setAcreageError('Please enter a valid number greater than 0')
      return
    }
    if (acreageNum > 100) {
      setAcreageError('Please enter acreage less than 100')
      return
    }
    if (!zone || !state) {
      setZoneError('Please enter a valid 5-digit zip code')
      return
    }
    onComplete({ acreage: acreageNum, familySize, zipCode, zone, state, wantsChickens })
  }

  const isValid = zone && state && zipCode.length === 5 && acreage && !isLoading && parseFloat(acreage) > 0

  const fieldBox: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: `1.5px solid ${FOREST}28`,
    borderRadius: '0.75rem',
    padding: '1.25rem',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    borderRadius: '0.5rem',
    border: `1.5px solid ${FOREST}30`,
    backgroundColor: '#ffffff',
    color: FOREST,
    fontSize: '1rem',
    fontWeight: 600,
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 700,
    fontSize: '0.9375rem',
    color: FOREST,
    marginBottom: '0.75rem',
  }

  const helperStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: `${FOREST}88`,
    marginTop: '0.5rem',
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '42rem',
        margin: '0 auto',
        backgroundColor: PARCH,
        borderRadius: '1rem',
        border: `1.5px solid ${FOREST}20`,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '1.75rem 2rem 1.25rem', borderBottom: `1px solid ${FOREST}15` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Sprout style={{ color: GOLD, width: '1.5rem', height: '1.5rem' }} />
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, color: FOREST, margin: 0 }}>
            Your Homestead Profile
          </h2>
        </div>
        <p style={{ fontSize: '0.875rem', color: `${FOREST}99`, margin: 0 }}>
          Answer a few questions to get a personalized homesteading plan tailored to your space and family.
        </p>
      </div>

      {/* Form body */}
      <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Acreage */}
        <div>
          <p style={labelStyle}>
            <Home style={{ width: '1.125rem', height: '1.125rem', color: GOLD }} />
            How much land do you have?
          </p>
          <div style={fieldBox}>
            <input
              type="number"
              placeholder="0.25"
              value={acreage}
              onChange={e => { setAcreage(e.target.value); setAcreageError(null) }}
              step="0.1"
              min="0.1"
              max="100"
              disabled={isLoading}
              style={inputStyle}
            />
            <p style={helperStyle}>
              {!acreage
                ? 'Enter your acreage (e.g., 0.25 for a quarter acre, 1 for one acre)'
                : parseFloat(acreage) < 0.25
                ? 'Perfect for apartment / small patio growing'
                : parseFloat(acreage) < 1
                ? 'Great for suburban homesteading'
                : parseFloat(acreage) < 5
                ? 'Excellent space for diverse projects'
                : 'Plenty of room for full-scale operations'}
            </p>
            {acreageError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: '#c0392b', fontSize: '0.8125rem' }}>
                <AlertCircle style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
                {acreageError}
              </div>
            )}
          </div>
        </div>

        {/* Family Size */}
        <div>
          <p style={labelStyle}>
            <Users style={{ width: '1.125rem', height: '1.125rem', color: GOLD }} />
            How many people in your family?
          </p>
          <div style={fieldBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={familySize}
                onChange={e => setFamilySize(Number(e.target.value))}
                disabled={isLoading}
                style={{ flex: 1, accentColor: FOREST }}
              />
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: GOLD, minWidth: '2rem', textAlign: 'center' }}>
                {familySize}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: `${FOREST}88` }}>Just you</span>
              <span style={{ fontSize: '0.75rem', color: `${FOREST}88` }}>8+ people</span>
            </div>
            <p style={helperStyle}>We'll adjust garden size and yield targets based on family consumption.</p>
          </div>
        </div>

        {/* Zip Code */}
        <div>
          <p style={labelStyle}>
            <MapPin style={{ width: '1.125rem', height: '1.125rem', color: GOLD }} />
            Where do you live? (5-digit zip code)
          </p>
          <div style={fieldBox}>
            <input
              type="text"
              placeholder="12345"
              value={zipCode}
              onChange={e => handleZipChange(e.target.value.replace(/\D/g, '').slice(0, 5))}
              maxLength={5}
              disabled={isLoading || zoneLoading}
              inputMode="numeric"
              style={inputStyle}
            />

            {zoneLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.8125rem', color: `${FOREST}88` }}>
                <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin 1s linear infinite' }} />
                Detecting your growing zone…
              </div>
            )}

            {zoneError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: '#c0392b', fontSize: '0.8125rem' }}>
                <AlertCircle style={{ width: '1rem', height: '1rem', flexShrink: 0 }} />
                {zoneError}
              </div>
            )}

            {zone && state && !zoneError && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.375rem' }}>
                  {[zone, state].map(tag => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: `${GOLD}20`,
                        color: GOLD,
                        border: `1px solid ${GOLD}50`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p style={helperStyle}>We'll recommend crops that thrive in your climate zone.</p>
              </div>
            )}
          </div>
        </div>

        {/* Chickens */}
        <div>
          <p style={labelStyle}>
            <Egg style={{ width: '1.125rem', height: '1.125rem', color: GOLD }} />
            Are you interested in raising chickens?
          </p>
          <div style={{ ...fieldBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: `${FOREST}cc`, margin: 0 }}>
              {wantsChickens
                ? "We'll recommend a coop size and provide build guides."
                : 'Focus on gardening and food preservation.'}
            </p>
            {/* Toggle switch */}
            <button
              onClick={() => setWantsChickens(!wantsChickens)}
              disabled={isLoading}
              style={{
                position: 'relative',
                width: '3rem',
                height: '1.625rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: wantsChickens ? FOREST : `${FOREST}30`,
                flexShrink: 0,
                transition: 'background-color 0.2s',
                padding: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '0.1875rem',
                  left: wantsChickens ? '1.4375rem' : '0.1875rem',
                  width: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          style={{
            width: '100%',
            padding: '0.875rem',
            borderRadius: '0.625rem',
            border: 'none',
            cursor: isValid ? 'pointer' : 'not-allowed',
            backgroundColor: isValid ? FOREST : `${FOREST}50`,
            color: PARCH,
            fontSize: '1rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'opacity 0.2s',
          }}
        >
          {isLoading
            ? <><Loader2 style={{ width: '1.125rem', height: '1.125rem', animation: 'spin 1s linear infinite' }} /> Generating Your Plan…</>
            : 'Generate My Homestead Plan'
          }
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: `${FOREST}66`, margin: 0 }}>
          Your zip code is used only to determine your growing zone. It won't be stored.
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
