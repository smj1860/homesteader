"use client"

import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, MapPin, Phone, ExternalLink, ShieldCheck, TrendingUp } from "lucide-react"

const mockContractors = [
  {
    id: 1,
    name: "Evergreen Homestead Plumbing",
    rating: 4.9,
    reviews: 128,
    keywords: ["reliable", "honest", "emergency", "well-pumps"],
    address: "123 Green Lane, Localville",
    zip: "12345",
    type: "plumbing"
  },
  {
    id: 2,
    name: "SafeWire Electricians",
    rating: 4.8,
    reviews: 215,
    keywords: ["certified", "safety-first", "efficient", "solar"],
    address: "45 Spark Rd, Volt Town",
    zip: "12345",
    type: "electrical"
  },
  {
    id: 3,
    name: "Neighborly Handyman Co.",
    rating: 4.7,
    reviews: 89,
    keywords: ["versatile", "fair pricing", "prompt", "fencing"],
    address: "88 Fixer Upper Way",
    zip: "12345",
    type: "handyman"
  }
]

export default function ContractorsPage() {
  const [zip, setZip] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <Navigation />
      <main className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="font-headline text-3xl font-bold">Recommended Local Pros</h1>
          <p className="text-muted-foreground">AI-verified top 3 contractors based on Yelp/Google aggregate scores and reviewer analysis.</p>
        </header>

        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Your Zip Code</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Enter zip code..." 
                  className="pl-10"
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Service Type</label>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="plumbing" className="flex-1">Plumbing</TabsTrigger>
                  <TabsTrigger value="electrical" className="flex-1">Electric</TabsTrigger>
                  <TabsTrigger value="handyman" className="flex-1">Handyman</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button className="bg-primary px-8">Search Pros</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockContractors
            .filter(c => activeTab === 'all' || c.type === activeTab)
            .map((pro, index) => (
            <Card key={pro.id} className="relative overflow-hidden hover:shadow-lg transition-all border-accent/20">
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-accent px-3 py-1 text-[10px] font-bold uppercase text-accent-foreground rounded-bl-lg flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> AI Top Choice
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-1 text-accent-foreground mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(pro.rating) ? 'fill-current' : ''}`} />
                  ))}
                  <span className="ml-1 text-sm font-bold text-foreground">{pro.rating}</span>
                  <span className="text-xs text-muted-foreground">({pro.reviews} reviews)</span>
                </div>
                <CardTitle className="font-headline">{pro.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {pro.address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {pro.keywords.map(kw => (
                    <Badge key={kw} variant="outline" className="text-[10px] uppercase">{kw}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  "SteadCraft analysis found high sentiment for <span className="text-primary font-medium">{pro.keywords[0]}</span> and specialized experience with homestead systems."
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
                <Button className="flex-1 bg-primary" size="sm">
                  Get Quote <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mt-12 rounded-2xl bg-muted/30 p-8 border border-border">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h2 className="font-headline text-xl font-bold">Why trust our recommendations?</h2>
              <p className="text-muted-foreground mt-2 max-w-3xl">
                We use advanced NLP to parse thousands of reviews on Yelp and Google. We don't just look at the average score; 
                we look for keywords like "homestead", "well pump", "off-grid", and "honest pricing" to ensure they're the right fit for your self-sufficiency projects.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                 <span>• Yelp Aggregate API</span>
                 <span>• Google Review Parsing</span>
                 <span>• Verified Local Licenses</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
