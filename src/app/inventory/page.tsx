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
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, Trash2, Camera, Loader2, Wand2, Sparkles, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { compressImage } from "@/lib/image-utils"
import Image from "next/image"

export default function InventoryPage() {
  const { inventory, addInventoryItem, removeInventoryItem } = useSustainData()
  const { toast } = useToast()
  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null)
  const [newItem, setNewItem] = useState({ name: "", quantity: "", category: "General" })
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
      const compressedBase64 = await compressImage(file, 1024, 1024, 0.7);
      setPendingPhoto(compressedBase64)
      
      const result = await detectInventoryItems({ photoDataUri: compressedBase64 })
      if (result.items.length > 0) {
        const item = result.items[0]
        setNewItem({
          name: item.name,
          quantity: item.quantity,
          category: item.category
        })
        toast({
          title: "Item Detected",
          description: `SteadCraft AI identified a ${item.name}.`,
        })
        setIsAddOpen(true)
      } else {
        toast({
          title: "No items detected",
          description: "AI couldn't identify any homesteading assets in that photo.",
          variant: "destructive"
        })
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Detection failed",
        description: "There was an error analyzing the image.",
        variant: "destructive"
      })
    } finally {
      setIsDetecting(false)
    }
  }

  const handleAutoEnhance = async () => {
    if (!pendingPhoto) return
    setIsEnhancing(true)
    try {
      const result = await enhancePhoto({ photoDataUri: pendingPhoto })
      setPendingPhoto(result.enhancedPhotoDataUri)
      toast({ title: "Photo Enhanced", description: "Image optimized for better detection." })
    } catch (err) {
      toast({ title: "Enhance Failed", description: "AI couldn't enhance this specific image.", variant: "destructive" })
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4">
        <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h1 className="font-headline text-3xl font-bold">Inventory Manager</h1>
            <p className="text-muted-foreground">Manage your on-hand tools, parts, and SteadCraft assets.</p>
          </div>
          <div className="flex gap-2">
             <Dialog open={isAddOpen} onOpenChange={(open) => {
               setIsAddOpen(open)
               if (!open) setPendingPhoto(null)
             }}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-background font-bold">
                  <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add to Inventory</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  {pendingPhoto && (
                    <div className="relative h-40 w-full rounded-md overflow-hidden border">
                      <Image src={pendingPhoto} alt="Detection Preview" fill className="object-cover" />
                      <button 
                        type="button"
                        onClick={handleAutoEnhance}
                        disabled={isEnhancing}
                        className="absolute bottom-2 right-2 bg-primary text-background rounded-full p-2 shadow-lg hover:bg-primary/90 flex items-center gap-1 text-xs font-bold"
                      >
                        {isEnhancing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                        AI Enhance
                      </button>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input id="name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} placeholder="e.g. Garden Rake" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: e.target.value})} placeholder="e.g. 1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} placeholder="Tools, Supplies..." />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-4">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                    />
                    <Button 
                      variant="outline" 
                      className="w-full border-primary/50 text-primary" 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isDetecting}
                    >
                      {isDetecting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Camera className="mr-2 h-4 w-4" />
                      )}
                      AI Photo Detection
                    </Button>
                  </div>
                  <Button type="submit" className="w-full bg-primary text-background font-bold">Save Asset</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <Card className="mb-8 bg-card/40 border-border/40">
          <CardContent className="pt-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Filter by name or category..." 
                className="pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="rounded-md border border-border/40">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/40">
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length > 0 ? filtered.map((item) => (
                    <TableRow key={item.id} className="border-border/40">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
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
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
           <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-primary">
                <Wand2 className="h-5 w-5" /> AI Inventory Sync
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Snap a photo of your shed or pantry! SteadCraft AI will automatically detect tools and items to populate your database. Use <b>AI Enhance</b> for better accuracy in dark areas.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-primary flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Supply Store
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Need to restock? Visit our curated homesteading marketplace for vetted gear and supplies.</p>
              <Button className="w-full bg-primary text-background font-bold" asChild>
                <a href="https://www.amazon.com/b?node=2972638011" target="_blank" rel="noopener noreferrer">
                  View Partner Marketplace
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
