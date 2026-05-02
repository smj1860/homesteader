'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Loader2, Download, Share2, Eye, ChevronDown, ChevronUp,
  CheckCircle2, Sprout, Zap, Leaf, AlertCircle
} from 'lucide-react'
import { HomesteadPlanData, generateHomesteadPlanHTML, downloadPDFAsPrint } from '@/lib/pdf-generator'
import { saveHomesteadPlan } from '@/app/actions/homesteading'

interface HomesteadingOutputsProps {
  planData: HomesteadPlanData
  userId?: string
  onBack?: () => void
  onNeedAuth?: () => void
}

export function HomesteadingOutputs({ planData, userId, onBack, onNeedAuth }: HomesteadingOutputsProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(userId ? ['crops', 'yields', 'soil'] : ['crops'])
  )
  const [saveSuccess, setSaveSuccess] = useState(false)

  const toggleSection = (section: string) => {
    // If user isn't logged in and trying to access protected sections, show auth prompt
    if (!userId && (section === 'soil' || section === 'chickens')) {
      onNeedAuth?.()
      return
    }

    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const handleDownloadPDF = async () => {
    if (!userId) {
      onNeedAuth?.()
      return
    }
    setIsDownloading(true)
    try {
      const html = generateHomesteadPlanHTML(planData)
      downloadPDFAsPrint(html, 'homestead-plan.pdf')
    } catch (err) {
      console.error('Error generating PDF:', err)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleSavePlan = async () => {
    if (!userId) {
      alert('Please sign in to save your plan')
      return
    }

    setIsSaving(true)
    try {
      await saveHomesteadPlan(userId, planData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      console.error('Error saving plan:', err)
      alert('Could not save your plan. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Auth Required Message */}
      {!userId && (
        <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-700">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Create a free account</strong> to unlock your complete homestead plan: printable PDF, scalable soil mix recipe, and coop recommendations.
            <Button 
              onClick={onNeedAuth}
              variant="link" 
              className="text-blue-700 hover:text-blue-800 p-0 ml-2 underline"
            >
              Sign up now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {saveSuccess && (
        <Alert className="bg-green-500/10 border-green-500/30 text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Your homestead plan has been saved to your account!
          </AlertDescription>
        </Alert>
      )}

      {/* Header Card */}
      <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-transparent">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2 text-primary">
                Your Personalized Homestead Plan
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-accent/10">
                  {planData.acreage} acres
                </Badge>
                <Badge variant="outline" className="bg-accent/10">
                  {planData.zone}
                </Badge>
                <Badge variant="outline" className="bg-accent/10">
                  {planData.state}
                </Badge>
                <Badge variant="outline" className="bg-accent/10">
                  Family of {planData.familySize}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              variant="default"
              className="bg-accent hover:bg-accent/90 text-black font-semibold"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
            {userId && (
              <Button
                onClick={handleSavePlan}
                disabled={isSaving}
                variant="outline"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Save to Account
                  </>
                )}
              </Button>
            )}
            <Button
              onClick={onBack}
              variant="ghost"
            >
              Start Over
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Crops */}
      <Card className="border-border/40">
        <button
          onClick={() => toggleSection('crops')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Sprout className="h-5 w-5 text-accent" />
            <CardTitle>🌱 Best Crops for {planData.zone}</CardTitle>
          </div>
          {expandedSections.has('crops') ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        {expandedSections.has('crops') && (
          <CardContent className="pt-0 pb-6">
            <p className="text-sm text-muted-foreground mb-4">
              These vegetables thrive in your hardiness zone and are perfect for your climate:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {planData.recommendedCrops.map((crop) => (
                <li key={crop} className="flex items-center gap-2 p-2 rounded bg-card/50 border border-border/30">
                  <span className="text-lg">🌾</span>
                  <span className="font-medium">{crop}</span>
                </li>
              ))}
            </ul>
            <Alert className="mt-4 bg-blue-500/10 border-blue-500/30">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Start with 2-3 crops your first year. It's easier to expand than overwhelm yourself!
              </AlertDescription>
            </Alert>
          </CardContent>
        )}
      </Card>

      {/* Vegetable Yields */}
      <Card className="border-border/40">
        <button
          onClick={() => toggleSection('yields')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-accent" />
            <CardTitle>📊 Realistic Yields for Your Family</CardTitle>
          </div>
          {expandedSections.has('yields') ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        {expandedSections.has('yields') && (
          <CardContent className="pt-0 pb-6">
            <p className="text-sm text-muted-foreground mb-4">
              With {planData.acreage} acres and a family of {planData.familySize}, expect these annual yields:
            </p>
            <div className="space-y-3">
              {planData.vegetableYields.map((yield) => (
                <div
                  key={yield.name}
                  className="p-3 rounded border border-border/30 bg-card/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{yield.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{yield.notes}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {yield.yield}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Alert className="mt-4 bg-amber-500/10 border-amber-500/30">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                These are conservative estimates. Your actual yields depend on soil quality, weather, and experience.
              </AlertDescription>
            </Alert>
          </CardContent>
        )}
      </Card>

      {/* Soil Mix */}
      <Card className={`border-border/40 ${!userId ? 'opacity-60' : ''}`}>
        <button
          onClick={() => toggleSection('soil')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Leaf className="h-5 w-5 text-accent" />
            <CardTitle className="flex items-center gap-2">
              🥗 Elite DIY Soil Mix Recipe
              {!userId && <Badge variant="outline" className="ml-2 text-xs">Premium</Badge>}
            </CardTitle>
          </div>
          {expandedSections.has('soil') ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        {!userId && !expandedSections.has('soil') && (
          <CardContent className="pt-0 pb-4 text-sm text-muted-foreground italic">
            Sign in to unlock your customized soil mix recipe
          </CardContent>
        )}
        {expandedSections.has('soil') && (
          <CardContent className="pt-0 pb-6">
            <p className="text-sm text-muted-foreground mb-4">
              {planData.soilMix.description}
            </p>

            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-3">Scalable Ingredient Ratios:</h4>
              <div className="space-y-2">
                {planData.soilMix.ingredients.map((ingredient) => (
                  <div
                    key={ingredient.name}
                    className="flex items-center justify-between p-2 rounded bg-card/50 border border-border/30"
                  >
                    <span className="text-sm font-medium">{ingredient.name}</span>
                    <Badge variant="secondary">{ingredient.ratio}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <Alert className="bg-green-500/10 border-green-500/30">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Pro Tip:</strong> These ratios scale linearly. For 8 raised beds, multiply each ratio by 8 and order in bulk—you'll save money!
              </AlertDescription>
            </Alert>

            <div className="mt-4 p-3 rounded bg-accent/5 border border-accent/20">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Next step:</strong> Order these components in bulk from local garden suppliers or online retailers. Check our tool resources for recommended suppliers.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Chicken Section (if applicable) */}
      {planData.wantsChickens && (
        <Card className={`border-border/40 border-amber-500/30 bg-amber-500/5 ${!userId ? 'opacity-60' : ''}`}>
          <button
            onClick={() => toggleSection('chickens')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-amber-500/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🐓</span>
              <CardTitle className="flex items-center gap-2">
                Chicken Coop & Flock Recommendation
                {!userId && <Badge variant="outline" className="ml-2 text-xs">Premium</Badge>}
              </CardTitle>
            </div>
            {expandedSections.has('chickens') ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          {!userId && !expandedSections.has('chickens') && (
            <CardContent className="pt-0 pb-4 text-sm text-muted-foreground italic">
              Sign in to unlock your customized coop recommendations
            </CardContent>
          )}
          {expandedSections.has('chickens') && (
            <CardContent className="pt-0 pb-6">
              <div className="p-4 rounded-lg bg-card border border-border/30 mb-4">
                <p className="text-sm leading-relaxed">{planData.coopRecommendation}</p>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                Ready to build? Explore our step-by-step guides and curated suppliers:
              </p>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Chicken Coop Builder Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Browse Coop Kits & Supplies
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Next Steps */}
      <Card className="border-border/40 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle>📋 Your Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="font-bold text-accent shrink-0">1</span>
              <div>
                <p className="font-medium text-sm">Prepare your soil</p>
                <p className="text-xs text-muted-foreground">Order components for your soil mix before planting season</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent shrink-0">2</span>
              <div>
                <p className="font-medium text-sm">Plan your garden layout</p>
                <p className="text-xs text-muted-foreground">Map out where each crop will go based on sunlight & water</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent shrink-0">3</span>
              <div>
                <p className="font-medium text-sm">Start a garden journal</p>
                <p className="text-xs text-muted-foreground">Track dates, yields, and lessons learned each season</p>
              </div>
            </li>
            {planData.wantsChickens && (
              <li className="flex gap-3">
                <span className="font-bold text-accent shrink-0">4</span>
                <div>
                  <p className="font-medium text-sm">Plan your coop</p>
                  <p className="text-xs text-muted-foreground">Finalize dimensions and construction timeline</p>
                </div>
              </li>
            )}
            <li className="flex gap-3">
              <span className="font-bold text-accent shrink-0">{planData.wantsChickens ? '5' : '4'}</span>
              <div>
                <p className="font-medium text-sm">Join the SteadCraft community</p>
                <p className="text-xs text-muted-foreground">Share progress & learn from other homesteaders</p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="border-border/40">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Ready to dive deeper? Explore our complete guides and tools.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-black font-semibold w-full md:w-auto">
              Explore Suburban Homesteading Guides
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { BookOpen, ShoppingCart } from 'lucide-react'
