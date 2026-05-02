'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Sprout, Home, Users, Egg, MapPin, AlertCircle } from 'lucide-react'
import { getZoneFromZip } from '@/lib/zone-lookup'

export interface QuestionnaireData {
  acreage: number
  familySize: number
  zipCode: string
  zone: string
  state: string
  wantsChickens: boolean
}

interface HomesteadingQuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void
  isLoading?: boolean
}

export function HomesteadingQuestionnaire({
  onComplete,
  isLoading = false
}: HomesteadingQuestionnaireProps) {
  const [acreage, setAcreage] = useState<string>('')
  const [familySize, setFamilySize] = useState<number>(4)
  const [zipCode, setZipCode] = useState<string>('')
  const [zone, setZone] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [wantsChickens, setWantsChickens] = useState<boolean>(true)
  const [zoneLoading, setZoneLoading] = useState(false)
  const [zoneError, setZoneError] = useState<string | null>(null)
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
          setZoneError(null)
        } else {
          setZoneError('Zone not found for this zip code')
          setZone('')
          setState('')
        }
      } catch (err) {
        setZoneError('Could not look up zone for this zip code')
        setZone('')
        setState('')
      } finally {
        setZoneLoading(false)
      }
    } else if (value.length > 0) {
      setZone('')
      setState('')
    }
  }

  const handleSubmit = async () => {
    // Validate acreage
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

    if (!zipCode || zipCode.length !== 5) {
      setZoneError('Zip code must be 5 digits')
      return
    }

    onComplete({
      acreage: acreageNum,
      familySize,
      zipCode,
      zone,
      state,
      wantsChickens,
    })
  }

  const isValid = zone && state && zipCode.length === 5 && acreage && !isLoading && parseFloat(acreage) > 0

  return (
    <Card className="w-full max-w-2xl mx-auto border-border/40">
      <CardHeader className="bg-gradient-to-r from-card to-card/50">
        <div className="flex items-center gap-3 mb-2">
          <Sprout className="h-6 w-6 text-accent" />
          <CardTitle className="text-2xl">Your Homestead Profile</CardTitle>
        </div>
        <CardDescription>
          Answer a few questions to get a personalized homesteading plan tailored to your space and family.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">
        {/* Acreage Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-accent" />
            <Label htmlFor="acreage" className="text-base font-semibold">How much land do you have?</Label>
          </div>
          <div className="bg-card/50 rounded-lg p-6 space-y-4">
            <Input
              id="acreage"
              type="number"
              placeholder="0.25"
              value={acreage}
              onChange={(e) => {
                setAcreage(e.target.value)
                setAcreageError(null)
              }}
              step="0.1"
              min="0.1"
              max="100"
              disabled={isLoading}
              className="text-lg font-semibold"
            />
            <div className="text-xs text-muted-foreground">
              {!acreage
                ? 'Enter your acreage (e.g., 0.25 for a quarter acre, 1 for one acre)'
                : parseFloat(acreage) < 0.25
                ? 'Perfect for apartment/small patio growing'
                : parseFloat(acreage) < 1
                ? 'Great for suburban homesteading'
                : parseFloat(acreage) < 5
                ? 'Excellent space for diverse projects'
                : 'Plenty of room for full-scale operations'}
            </div>
            {acreageError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{acreageError}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Family Size Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            <Label className="text-base font-semibold">How many people in your family?</Label>
          </div>
          <div className="bg-card/50 rounded-lg p-6 space-y-4">
            <Slider
              value={[familySize]}
              onValueChange={(val) => setFamilySize(val[0])}
              min={1}
              max={8}
              step={1}
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Just you</span>
              <div className="text-2xl font-bold text-accent">{familySize}</div>
              <span className="text-sm text-muted-foreground">8+ people</span>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              We'll adjust garden size and yield targets based on family consumption.
            </div>
          </div>
        </div>

        {/* Zip Code Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent" />
            <Label htmlFor="zip" className="text-base font-semibold">
              Where do you live? (5-digit zip code)
            </Label>
          </div>
          <div className="bg-card/50 rounded-lg p-6 space-y-3">
            <Input
              id="zip"
              type="text"
              placeholder="12345"
              value={zipCode}
              onChange={(e) => handleZipChange(e.target.value)}
              maxLength={5}
              disabled={isLoading || zoneLoading}
              className="text-lg font-semibold"
              inputMode="numeric"
            />

            {zoneLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Detecting your growing zone...
              </div>
            )}

            {zoneError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{zoneError}</AlertDescription>
              </Alert>
            )}

            {zone && state && !zoneError && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    {zone}
                  </Badge>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    {state}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  We'll recommend crops that thrive in your climate zone.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Chickens Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Egg className="h-5 w-5 text-accent" />
            <Label className="text-base font-semibold">Are you interested in raising chickens?</Label>
          </div>
          <div className="bg-card/50 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {wantsChickens
                  ? 'We\'ll recommend a coop size and provide build guides.'
                  : 'Focus on gardening and food preservation.'}
              </p>
            </div>
            <Switch
              checked={wantsChickens}
              onCheckedChange={setWantsChickens}
              disabled={isLoading}
              className="ml-4"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          size="lg"
          className="w-full bg-accent hover:bg-accent/90 text-black font-semibold py-6 text-base"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Your Plan...
            </>
          ) : (
            <>
              Generate My Homestead Plan
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Your zip code is used only to determine your growing zone. It won't be stored.
        </p>
      </CardContent>
    </Card>
  )
}
