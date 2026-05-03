"use client"

import { useState, useRef } from "react"
import { Navigation } from "@/components/Navigation"
import { useSustainData } from "@/hooks/use-sustain-data"
import { detectInventoryItems } from "@/ai/flows/detect-inventory-item"
import { enhancePhoto } from "@/ai/flows/enhance-image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, Trash2, Camera, Loader2, Wand2, Sparkles, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { compressImage } from "@/lib/image-utils"
import Image from "next/image"

const FOREST = '#264228'
const GOLD   = '#A88032'
const PARCH  = '#F7F3EB'
const PARCH2 = '#EDE8DE'

export default function InventoryPage() {
  const { inventory, addInventoryItem, removeInventoryItem } = useSustainData()
  const { toast }    = useToast()
  const [search,        setSearch]        = useState("")
  const [isAddOpen,     setIsAddOpen]     = useState(false)
  const [isDetecting,   setIsDetecting]   = useState(false)
  const [isEnhancing,   setIsEnhancing]   = useState(false)
  const [pendingPhoto,  setPendingPhoto]  = useState<string | null>(null)
  const [newItem,       setNewItem]       = useState({ name: "", quantity: "", category: "General" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filtered = inventory.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.name || !newItem.quantity) return
    addInventoryItem(newItem)
    setNewItem({ name: "", quantity: "", category: "General" })
    setPendingPhoto(null)
    setIsAddOpen(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsDetecting(true)
    try {
      const compressedBase64 = await compressImage(file, 1024, 1024, 0.7)
      setPendingPhoto(compressedBase64)
      const result = await detectInventoryItems({ photoDataUri: compressedBase64 })
      if (result.items.length > 0) {
        const item = result.items[0]
        setNewItem({ name: item.name, quantity: item.quantity, category: item.category })
        toast({ title: "Item Detected", description: `SteadCraft AI identified a ${item.name}.` })
        setIsAddOpen(true)
      } else {
        toast({ title: "No items detected", description: "AI couldn't identify any homesteading assets in that photo." })
      }
    } catch {
      toast({ title: "Detection failed", description: "Couldn't process the image.", variant: "destructive" })
    } finally {
      setIsDetecting(false)
    }
  }

  const handleEnhance = async () => {
    if (!pendingPhoto) return
    setIsEnhancing(true)
    try {
      const enhanced = await enhancePhoto({ photoDataUri: pendingPhoto })
      if (enhanced.enhancedDataUri) {
        setPendingPhoto(enhanced.enhancedDataUri)
        toast({ title: "Photo enhanced", description: "Re-detecting items with the improved image." })
        const result = await detectInventoryItems({ photoDataUri: enhanced.enhancedDataUri })
        if (result.items.length > 0) {
          const item = result.items[0]
          setNewItem({ name: item.name, quantity: item.quantity, category: item.category })
        }
      }
    } catch {
      toast({ title: "Enhancement failed", variant: "destructive" })
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold text-foreground">Inventory Manager</h1>
            <p className="text-muted-foreground mt-1">Manage your on-hand tools, parts, and SteadCraft assets.</p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground font-bold gap-2">
                <Plus className="h-4 w-4" /> Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-headline">Add Inventory Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                {pendingPhoto && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border/40">
                    <Image src={pendingPhoto} alt="Detected item" fill className="object-cover" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" placeholder="e.g. DeWalt circular saw" className="border-border/40" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qty">Quantity</Label>
                  <Input id="qty" placeholder="e.g. 1, 3, partial roll" className="border-border/40" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cat">Category</Label>
                  <Input id="cat" placeholder="e.g. Power Tools" className="border-border/40" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
                </div>
                <div className="flex gap-2">
                  {pendingPhoto && (
                    <Button type="button" variant="outline" className="flex-1 border-border/40" onClick={handleEnhance} disabled={isEnhancing}>
                      {isEnhancing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      AI Enhance
                    </Button>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  <Button type="button" variant="outline" className="flex-1 border-border/40" onClick={() => fileInputRef.current?.click()} disabled={isDetecting}>
                    {isDetecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Camera className="mr-2 h-4 w-4" />}
                    AI Photo Detection
                  </Button>
                </div>
                <Button type="submit" className="w-full bg-primary text-background font-bold">Save Asset</Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* ── FIX: Removed the bg-card/40 Card wrapper — table now sits cleanly
               on the page background with just a simple rounded border ── */}
        <div className="mb-8">
          {/* Search bar */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filter by name or category..."
              className="pl-10 border-border/40 bg-background"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Table — clean border only, no grey fill */}
          <div className="rounded-xl border border-border/40 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/40 bg-muted/30">
                  <TableHead className="text-foreground font-semibold">Asset Name</TableHead>
                  <TableHead className="text-foreground font-semibold">Category</TableHead>
                  <TableHead className="text-foreground font-semibold">Stock Level</TableHead>
                  <TableHead className="text-right text-foreground font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? filtered.map((item) => (
                  <TableRow key={item.id} className="border-border/30 hover:bg-muted/20">
                    <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                    <TableCell>
                      {/* ── FIX: category badge uses leather color for consistency ── */}
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: `${GOLD}18`, color: GOLD, border: `1px solid ${GOLD}30` }}
                      >
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => removeInventoryItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      No items found. Start adding your tools and supplies.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Bottom info cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: `${FOREST}0c`, border: `1.5px solid ${FOREST}20` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Wand2 className="h-5 w-5" style={{ color: FOREST }} />
              <h3 className="font-headline font-bold text-foreground">AI Inventory Sync</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Snap a photo of your shed or pantry. SteadCraft AI will automatically detect tools
              and items to populate your database. Use <strong>AI Enhance</strong> for better accuracy in dark areas.
            </p>
          </div>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: `${FOREST}0c`, border: `1.5px solid ${FOREST}20` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="h-5 w-5" style={{ color: FOREST }} />
              <h3 className="font-headline font-bold text-foreground">Supply Store</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Need to restock? Visit our curated homesteading marketplace for vetted gear and supplies.
            </p>
            <Button className="w-full bg-primary text-background font-bold" asChild>
              <a href="https://www.amazon.com/b?node=2972638011" target="_blank" rel="noopener noreferrer">
                View Partner Marketplace
              </a>
            </Button>
          </div>
        </div>

      </main>
    </div>
  )
}
