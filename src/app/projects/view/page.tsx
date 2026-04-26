"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { ProjectInstructionGeneratorOutput } from "@/ai/flows/generate-project-instructions"
import { clarifyProjectStep } from "@/ai/flows/clarify-step"
import { useUser, useSupabaseClient } from "@/supabase"
import { enhancePhoto } from "@/ai/flows/enhance-image"
import { insertNonBlocking } from "@/supabase/non-blocking-writes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { 
  Clock, Hammer, ShieldCheck, Zap, CheckCircle2, 
  ArrowLeft, ShieldAlert, Camera, X, Loader2, BookOpen, Plus, Calendar,
  BarChart, Share2, MessageSquare, Wand2, ShoppingCart
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { compressImage } from "@/lib/image-utils"
import { ToolMatchWidget } from "@/components/affiliate/tool-match-widget"

type ProjectWithMeta = ProjectInstructionGeneratorOutput & {
  id?: string
  category?: string
  subcategory?: string
}

export default function ProjectViewPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = useSupabaseClient()
  const { user } = useUser()
  
  const [project, setProject] = useState<ProjectWithMeta | null>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [clarificationQuestion, setClarificationQuestion] = useState("")
  const [isClarifying, setIsClarifying] = useState(false)
  const [clarificationResult, setClarificationResult] = useState<{ answer: string, tips?: string[] } | null>(null)

  const [logNote, setLogNote] = useState("")
  const [logImage, setLogImage] = useState<string | null>(null)
  const [isPublic, setIsPublic] = useState(true)
  const [buildLogs, setBuildLogs] = useState<{id: string, note: string, photo?: string, date: string, isPublic: boolean, shareUrl: string}[]>([])
  const [isSavingLog, setIsSavingLog] = useState(false)
  const [isCompressing, setIsCompressing] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)

  const logImageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('current_project')
    if (!saved) {
      router.push('/projects')
      return
    }

    const parsed: ProjectWithMeta = JSON.parse(saved)
    setProject(parsed)

    // Save to Supabase if user is logged in and project hasn't been saved yet
    if (user && !parsed.id) {
      const saveProject = async () => {
        const { data, error } = await supabase
          .from('projects')
          .insert({
            user_id: user.id,
            title: parsed.projectName,
            category: parsed.category ?? 'General',
            subcategory: parsed.subcategory ?? 'Other',
            difficulty: parsed.difficultyLevel,
            estimated_time: parsed.estimatedTime,
            safety_precautions: parsed.safetyPrecautions,
            tools_and_items: parsed.toolsAndItemsNeeded,
            pro_tips: parsed.proTips,
            steps: parsed.steps,
          })
          .select('id')
          .single()

        if (!error && data) {
          const projectWithId = { ...parsed, id: data.id }
          setProject(projectWithId)
          sessionStorage.setItem('current_project', JSON.stringify(projectWithId))
        }
      }

      saveProject()
    }
  }, [user, supabase, router])

  const handleAskAI = async () => {
    if (!clarificationQuestion.trim() || activeStep === null || !project) return
    setIsClarifying(true)
    try {
      const step = project.steps.find(s => s.stepNumber === activeStep)
      const result = await clarifyProjectStep({
        projectContext: project.projectName,
        currentStepInstructions: step?.description || "",
        userQuestion: clarificationQuestion
      })
      setClarificationResult({
        answer: result.clarification,
        tips: result.helpfulTips
      })
    } catch (err) {
      toast({ title: "Clarification Failed", description: "AI couldn't process your question. Please try again.", variant: "destructive" })
    } finally {
      setIsClarifying(false)
    }
  }

  const handleAddBuildLog = async () => {
    if (!logNote.trim() || !user || !project?.id) return
    setIsSavingLog(true)

    try {
      const { data, error } = await supabase
        .from('build_logs')
        .insert({
          project_id: project.id,
          user_id: user.id,
          username: user.user_metadata?.username
            || user.user_metadata?.full_name
            || user.email?.split('@')[0]
            || 'Homesteader',
          project_title: project.projectName,
          note: logNote,
          photo_url: logImage,
          is_public: isPublic,
          category: project.category ?? 'General',
          subcategory: project.subcategory ?? 'Other',
        })
        .select('id')
        .single()

      if (error) throw error

      const shareUrl = `${window.location.origin}/share/${user.id}/${project.id}/${data.id}`

      setBuildLogs([{
        id: data.id,
        note: logNote,
        photo: logImage || undefined,
        date: new Date().toLocaleDateString(),
        isPublic,
        shareUrl
      }, ...buildLogs])

      setLogNote("")
      setLogImage(null)
      toast({ title: "Log Entry Saved", description: "Your progress has been documented." })
    } catch (err) {
      toast({ title: "Error", description: "Could not save log entry.", variant: "destructive" })
    } finally {
      setIsSavingLog(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsCompressing(true)
    try {
      const compressed = await compressImage(file, 1280, 720, 0.6)
      setLogImage(compressed)
    } catch (err) {
      toast({ title: "Compression Error", description: "Failed to optimize image.", variant: "destructive" })
    } finally {
      setIsCompressing(false)
    }
  }

  const handleAutoEnhance = async () => {
    if (!logImage) return
    setIsEnhancing(true)
    try {
      const result = await enhancePhoto({ photoDataUri: logImage })
      setLogImage(result.enhancedPhotoDataUri)
      toast({ title: "Photo Enhanced", description: "Rootstock AI adjusted lighting and clarity." })
    } catch (err) {
      toast({ title: "Enhance Failed", description: "AI couldn't enhance this image.", variant: "destructive" })
    } finally {
      setIsEnhancing(false)
    }
  }

  const copyShareLink = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({ title: "Link Copied!", description: "Shareable URL copied to clipboard." })
  }

  if (!project) return null

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto max-w-5xl px-4">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Button variant="ghost" size="sm" className="mb-2" onClick={() => router.push('/projects')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hub
            </Button>
            <h1 className="font-headline text-3xl font-bold text-primary">{project.projectName}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {project.estimatedTime}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 border-primary/40 text-primary">
                <BarChart className="h-3 w-3" /> {project.difficultyLevel}
              </Badge>
              {project.disclaimer && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" /> MacGyver Mode
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="hidden sm:flex" onClick={() => window.print()}>Print Guide</Button>
            <Button className="bg-primary text-background font-bold hover:bg-primary/90">Save Project</Button>
          </div>
        </header>

        <Tabs defaultValue="guide" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Instruction Guide
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Project Journal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-12">
            {project.disclaimer && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive font-medium flex gap-3">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <p>{project.disclaimer}</p>
              </div>
            )}

            <section className="space-y-6">
              <h2 className="font-headline text-2xl font-bold border-b pb-2">Preparation & Safety</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="border-l-4 border-l-destructive shadow-sm bg-card/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-headline flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-destructive" /> Safety & PPE
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {project.safetyPrecautions?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary shadow-sm bg-card/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-headline flex items-center gap-2">
                      <Hammer className="h-5 w-5 text-primary" /> Tools & Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      {project.toolsAndItemsNeeded?.map((item, idx) => (
                        <li key={idx} className="flex flex-col gap-1">
                          <div className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <span>{item}</span>
                          </div>
                          <Button variant="link" size="sm" className="h-auto p-0 text-[10px] text-muted-foreground w-fit hover:text-primary" asChild>
                            <a href={`https://www.amazon.com/s?k=${encodeURIComponent(item.replace('[In Inventory]', ''))}`} target="_blank" rel="noopener noreferrer">
                              <ShoppingCart className="mr-1 h-3 w-3" /> Check Price & Specs
                            </a>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* ── Affiliate Shop Widget ───────────────────────────────────────
                  Matches each tool in the list against your affiliate_products
                  database and shows Budget / Best Value / Pro Choice options.
                  Renders nothing if no matches are found, so it's always safe.
              ─────────────────────────────────────────────────────────────── */}
              <ToolMatchWidget toolTerms={project.toolsAndItemsNeeded ?? []} />

            </section>

            <section className="space-y-6 pb-12">
              <h2 className="font-headline text-2xl font-bold border-b pb-2">Expert Steps</h2>
              <div className="grid grid-cols-1 gap-4">
                {project.steps?.map((step) => (
                  <Card key={step.stepNumber} className="border-l-4 border-l-primary hover:shadow-md transition-all group bg-card/40">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Step {step.stepNumber}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:bg-primary/10"
                        onClick={() => {
                          setActiveStep(step.stepNumber)
                          setClarificationResult(null)
                          setClarificationQuestion("")
                        }}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" /> Ask Rootstock
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-base leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="journal" className="space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-headline text-primary">Add Progress Update</CardTitle>
                    <CardDescription>Document milestones and cross-post to Rootstock feeds.</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="public-toggle" className="text-xs">{isPublic ? 'Public Post' : 'Private Note'}</Label>
                      <Switch id="public-toggle" checked={isPublic} onCheckedChange={setIsPublic} />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="What did you accomplish?" 
                  className="min-h-[100px] bg-background"
                  value={logNote}
                  onChange={(e) => setLogNote(e.target.value)}
                />
                <div className="flex items-center gap-4">
                  {logImage ? (
                    <div className="group relative h-24 w-24 rounded-lg overflow-hidden border">
                      <Image src={logImage} alt="Progress Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                        <button onClick={handleAutoEnhance} disabled={isEnhancing} className="bg-primary text-background rounded-full p-1.5">
                          {isEnhancing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
                        </button>
                        <button onClick={() => setLogImage(null)} className="bg-destructive text-white rounded-full p-1.5">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="h-24 w-24 flex-col gap-2 border-dashed bg-background"
                      onClick={() => logImageInputRef.current?.click()}
                      disabled={isCompressing}
                    >
                      {isCompressing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Camera className="h-6 w-6" />}
                      <span className="text-[10px]">Add Photo</span>
                    </Button>
                  )}
                  <input type="file" accept="image/*" className="hidden" ref={logImageInputRef} onChange={handleImageUpload} />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-primary text-background font-bold" 
                  onClick={handleAddBuildLog} 
                  disabled={isSavingLog || !logNote.trim() || isCompressing || isEnhancing || !project?.id}
                >
                  {isSavingLog ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Save Entry
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <h3 className="font-headline text-xl font-bold flex items-center gap-2 text-primary">
                <Calendar className="h-5 w-5" /> Build Timeline
              </h3>
              {buildLogs.map((log) => (
                <Card key={log.id} className="overflow-hidden bg-card/40 border-border/40">
                  <div className="flex flex-col md:flex-row">
                    {log.photo && (
                      <div className="relative h-48 md:w-48 shrink-0">
                        <Image src={log.photo} alt="Progress" fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-2">
                          <Badge variant="outline">{log.date}</Badge>
                          <Badge variant="secondary" className="text-[10px]">{log.isPublic ? 'Public' : 'Private'}</Badge>
                        </div>
                        {log.isPublic && (
                          <Button variant="ghost" size="sm" onClick={() => copyShareLink(log.shareUrl)}>
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </Button>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{log.note}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Clarification Dialog */}
        <Dialog open={activeStep !== null} onOpenChange={(open) => !open && setActiveStep(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-headline text-primary">
                <Wand2 className="h-5 w-5" />
                Ask Rootstock: Step {activeStep}
              </DialogTitle>
              <DialogDescription>
                Need technical clarification? Ask our AI expert for specialized help.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {!clarificationResult ? (
                <>
                  <Label>What is confusing about this step?</Label>
                  <Textarea 
                    placeholder="e.g. I don't have the specific sealant mentioned, what's a safe alternative?" 
                    value={clarificationQuestion}
                    onChange={(e) => setClarificationQuestion(e.target.value)}
                  />
                </>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                    <p className="text-sm leading-relaxed">{clarificationResult.answer}</p>
                  </div>
                  {clarificationResult.tips && clarificationResult.tips.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">Pro Tips</p>
                      <ul className="text-xs space-y-1">
                        {clarificationResult.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              {clarificationResult ? (
                <Button onClick={() => setActiveStep(null)} className="w-full">Got it!</Button>
              ) : (
                <Button 
                  onClick={handleAskAI} 
                  disabled={isClarifying || !clarificationQuestion.trim()} 
                  className="w-full bg-primary text-background font-bold"
                >
                  {isClarifying ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <MessageSquare className="h-4 w-4 mr-2" />}
                  Get Advice
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}