"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { useUser, useSupabaseClient } from "@/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, Save, Loader2, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewToolReviewPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = useSupabaseClient()
  const { user, isUserLoading } = useUser()

  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    rating: 5,
    affiliate_url: "",
    image_url: "",
  })

  const [pros, setPros] = useState<string[]>([""])
  const [cons, setCons] = useState<string[]>([""])
  // Admin-only page — redirect anyone who isn't marked as admin
  useEffect(() => {
    if (isUserLoading) return
    if (!user) { router.push("/signup"); return }
    // Check is_admin from users table
    supabase
      .from("users")
      .select("is_admin")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (!data?.is_admin) router.push("/tools")
      })
  }, [user, isUserLoading, supabase, router])



  const handleProsChange = (index: number, value: string) => {
    const newPros = [...pros]
    newPros[index] = value
    setPros(newPros)
  }

  const handleConsChange = (index: number, value: string) => {
    const newCons = [...cons]
    newCons[index] = value
    setCons(newCons)
  }

  const addPro = () => setPros([...pros, ""])
  const addCon = () => setCons([...cons, ""])
  const removePro = (index: number) => setPros(pros.filter((_, i) => i !== index))
  const removeCon = (index: number) => setCons(cons.filter((_, i) => i !== index))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({ title: "Authentication required", description: "Please sign in to publish reviews.", variant: "destructive" })
      return
    }

    if (!formData.name || !formData.brand || !formData.category) {
      toast({ title: "Missing fields", description: "Please fill in the tool name, brand, and category.", variant: "destructive" })
      return
    }

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('tool_reviews')
        .insert({
          name: formData.name,
          brand: formData.brand,
          category: formData.category,
          price: formData.price,
          rating: Number(formData.rating),
          affiliate_url: formData.affiliate_url,
          image_url: formData.image_url,
          pros: pros.filter(p => p.trim() !== ""),
          cons: cons.filter(c => c.trim() !== ""),
          reviews_count: 0,
        })

      if (error) throw error

      toast({ title: "Review Published", description: "Your tool assessment is now live." })
      router.push("/tools")
    } catch (err) {
      toast({ title: "Publish failed", description: "Could not save review. Check permissions.", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  if (isUserLoading) return null

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto max-w-2xl px-4">
        <header className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reviews
          </Button>
          <h1 className="font-headline text-3xl font-bold text-foreground">Write a Review</h1>
          <p className="text-muted-foreground">Share your expert assessment of homesteading gear.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <Card className="border-border/40 bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="font-headline text-card-foreground">Tool Essentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Tool Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. 20V Cordless Drill"
                    className="bg-background border-border/40"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="e.g. DeWalt"
                    className="bg-background border-border/40"
                    value={formData.brand}
                    onChange={e => setFormData({...formData, brand: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g. Power Tools"
                    className="bg-background border-border/40"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price Estimate</Label>
                  <Input
                    id="price"
                    placeholder="e.g. $129.00"
                    className="bg-background border-border/40"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Expert Rating (1-5)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    className="w-24 bg-background border-border/40"
                    value={formData.rating}
                    onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                  />
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(formData.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="affiliate">Affiliate/Partner Link</Label>
                <Input
                  id="affiliate"
                  placeholder="https://amazon.com/..."
                  className="bg-background border-border/40"
                  value={formData.affiliate_url}
                  onChange={e => setFormData({...formData, affiliate_url: e.target.value})}
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <Label className="text-accent">Pros</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addPro} className="h-8 text-[10px] uppercase font-bold tracking-widest">
                    <Plus className="mr-1 h-3 w-3" /> Add Pro
                  </Button>
                </div>
                {pros.map((pro, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      placeholder="e.g. Robust battery life"
                      className="bg-background border-border/40"
                      value={pro}
                      onChange={e => handleProsChange(idx, e.target.value)}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removePro(idx)} disabled={pros.length === 1}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <Label className="text-destructive">Cons</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addCon} className="h-8 text-[10px] uppercase font-bold tracking-widest">
                    <Plus className="mr-1 h-3 w-3" /> Add Con
                  </Button>
                </div>
                {cons.map((con, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      placeholder="e.g. High noise levels"
                      className="bg-background border-border/40"
                      value={con}
                      onChange={e => handleConsChange(idx, e.target.value)}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeCon(idx)} disabled={cons.length === 1}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary text-card-foreground font-bold h-12" disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                Publish Tool Assessment
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  )
}