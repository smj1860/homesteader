"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { useCollection } from "@/supabase"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, ExternalLink, ThumbsUp, Filter, ShoppingCart, Plus, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ToolReviewsPage() {
  const [search, setSearch] = useState("")

  const { data: reviews, isLoading } = useCollection('tool_reviews', {
    orderBy: 'created_at',
    ascending: false,
  })

  const filtered = reviews?.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.brand.toLowerCase().includes(search.toLowerCase()) ||
    tool.category.toLowerCase().includes(search.toLowerCase())
  ) || []

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-headline text-3xl font-bold text-foreground">Tool & Equipment Reviews</h1>
            <p className="text-muted-foreground">Honest assessments of tools that stand up to homesteading life.</p>
          </div>
          <Button className="bg-primary text-card-foreground font-bold" asChild>
            <Link href="/tools/new">
              <Plus className="mr-2 h-4 w-4" /> Publish Review
            </Link>
          </Button>
        </header>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search tools, brands, or categories..." 
              className="pl-10 border-border/40"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex gap-2 border-border/40">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <Card key={tool.id} className="overflow-hidden group hover:shadow-lg transition-all border-border/40 bg-card text-card-foreground">
                <div className="relative h-48 w-full bg-black/10">
                  <Image 
                    src={tool.image_url || "https://picsum.photos/seed/tool/400/300"} 
                    alt={tool.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform"
                    data-ai-hint="tools hardware"
                  />
                  <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">{tool.category}</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(tool.rating) ? 'fill-current' : ''}`} />
                    ))}
                    <span className="ml-1 text-sm font-bold text-card-foreground">{tool.rating}</span>
                  </div>
                  <CardTitle className="font-headline text-card-foreground">{tool.name}</CardTitle>
                  <CardDescription className="text-card-foreground/70">By {tool.brand}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-card-foreground">{tool.price}</span>
                    <span className="text-xs opacity-70">{tool.reviews_count || 0} Verified Reviews</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase text-accent">Pros</div>
                    <ul className="text-xs space-y-1 opacity-90">
                      {tool.pros?.map((p: string) => (
                        <li key={p} className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button className="flex-1 bg-accent text-accent-foreground font-bold hover:bg-accent/90" asChild>
                    <a href={tool.affiliate_url || `https://www.amazon.com/s?k=${encodeURIComponent(tool.name)}`} target="_blank" rel="noopener noreferrer">
                      <ShoppingCart className="mr-2 h-4 w-4" /> Check Price
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="border-border/40 hover:bg-white/10" asChild>
                    <a href={tool.affiliate_url || "#"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-border/40 rounded-3xl bg-card/5">
            <p className="text-muted-foreground">No tool reviews found. Be the first to publish one!</p>
          </div>
        )}
      </main>
    </div>
  )
}