'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { HomesteadingQuestionnaire, QuestionnaireData } from '@/components/homesteading/questionnaire'
import { HomesteadingOutputs } from '@/components/homesteading/outputs'
import { useUser } from '@/supabase'
import { generateHomesteadPlan } from '@/lib/homestead-plan-generator'
import { HomesteadPlanData } from '@/lib/pdf-generator'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Leaf, Zap, Sprout } from 'lucide-react'

export default function BeginnersPage() {
  const { user } = useUser()
  const [step, setStep] = useState<'questionnaire' | 'results'>('questionnaire')
  const [planData, setPlanData] = useState<HomesteadPlanData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleQuestionnaireComplete = async (data: QuestionnaireData) => {
    setIsGenerating(true)
    try {
      // Simulate slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))

      // Generate the plan
      const generated = generateHomesteadPlan(
        data.acreage,
        data.familySize,
        data.zone,
        data.state,
        data.wantsChickens
      )

      setPlanData(generated)
      setStep('results')
    } catch (err) {
      console.error('Error generating plan:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleBack = () => {
    setStep('questionnaire')
    setPlanData(null)
  }

  const handleNeedAuth = () => {
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{color:"#264228"}}>
              Welcome to Your Homesteading Journey
            </h1>
            <p className="text-xl text-muted-foreground">
              Answer a few simple questions and get a personalized homestead plan tailored to your space, family, and goals.
            </p>
          </div>

          {/* Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="border-border/40 bg-card/50">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Sprout className="h-8 w-8 mb-3" style={{color:"#A88032"}}" />
                <h3 className="font-semibold text-sm">Personalized Plans</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Custom recommendations based on your space and climate
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Zap className="h-8 w-8 mb-3" style={{color:"#A88032"}}" />
                <h3 className="font-semibold text-sm">Realistic Yields</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  See what you can actually grow and harvest each year
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Leaf className="h-8 w-8 mb-3" style={{color:"#A88032"}}" />
                <h3 className="font-semibold text-sm">Expert Guides</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Step-by-step instructions to bring your plan to life
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content */}
        {step === 'questionnaire' ? (
          <HomesteadingQuestionnaire
            onComplete={handleQuestionnaireComplete}
            isLoading={isGenerating}
          />
        ) : planData ? (
          <HomesteadingOutputs
            planData={planData}
            userId={user?.id}
            onBack={handleBack}
            onNeedAuth={handleNeedAuth}
          />
        ) : null}

        {/* Info Section */}
        {step === 'questionnaire' && (
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{color:"#264228"}}">
              What You'll Get
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/40">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-lg">🥗</span> Soil Mix Recipe
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    An elite, scalable soil recipe that works for any sized garden. Perfect for raised beds, containers, or in-ground gardens.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-lg">📊</span> Yield Targets
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Realistic estimates for what you can grow based on your family size and available space. No false promises.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-lg">🌾</span> Crop Recommendations
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Vegetables that thrive in your hardiness zone. Start with these and expand as your confidence grows.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-lg">🐓</span> Coop Recommendation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    If you want chickens, get a customized coop design and flock size recommendation for your property.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-lg">📋</span> Printable PDF
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Download your complete plan as a beautiful, printable PDF. Save it to your account or share with others.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-lg">🔗</span> Next Steps
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Links to guides, tools, and resources to start building your homestead right now.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="pt-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2" style={{color:"#264228"}}">
                    Unlock Your Complete Homestead Plan
                  </h2>
                  <p className="text-muted-foreground">
                    Create a free account to access your personalized soil mix recipe, coop recommendations, and printable PDF.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Scalable Soil Mix Recipe</p>
                      <p className="text-xs text-muted-foreground">The Base, Lung, Engine & Filter — a proven 4-part mix built for real results</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Coop Recommendations</p>
                      <p className="text-xs text-muted-foreground">Customized size & breed suggestions for your space</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Printable PDF</p>
                      <p className="text-xs text-muted-foreground">Beautiful, shareable plan you can download & print</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <Button 
                    onClick={() => {
                      // Navigate to signup with trial offer
                      window.location.href = '/auth/signup?offer=free-trial'
                    }}
                    className="w-full text-black hover:opacity-90" style={{backgroundColor:"#A88032"}} font-semibold py-6"
                  >
                    Create Free Account
                  </Button>
                  <Button 
                    onClick={() => {
                      // Navigate to login
                      window.location.href = '/auth/login'
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Already have an account? Log in
                  </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground mb-4">
                  No credit card required. Includes optional 30-day free premium trial.
                </p>

                <Button 
                  onClick={() => setShowAuthModal(false)}
                  variant="ghost"
                  className="w-full"
                >
                  Continue browsing without signing in
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
