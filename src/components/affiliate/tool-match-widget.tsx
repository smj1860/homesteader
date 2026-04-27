'use client'

import { useEffect, useState } from 'react'
import { matchToolsToAffiliates, ToolMatch } from '@/lib/affiliate-matcher'
import { ExternalLink, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const TIER_LABELS: Record<string, { label: string; color: string }> = {
  budget:  { label: 'Budget Pick', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  mid:     { label: 'Best Value',  color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  premium: { label: 'Pro Choice',  color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
}

interface Props {
  toolTerms: string[]
}

export function ToolMatchWidget({ toolTerms }: Props) {
  const [matches, setMatches]   = useState<ToolMatch[]>([])
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    matchToolsToAffiliates(toolTerms).then(results => {
      setMatches(results)
      setLoading(false)
    })
  }, [toolTerms])

  if (loading || matches.length === 0) return null

  const visible = expanded ? matches : matches.slice(0, 3)

  return (
    <div className="mt-6 rounded-2xl border border-border/40 bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border/40 flex items-center gap-2">
        <ShoppingCart className="h-4 w-4 text-accent" />
        <span className="text-sm font-bold uppercase tracking-widest text-accent">
          Shop This Project
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          {matches.length} tool{matches.length !== 1 ? 's' : ''} found
        </span>
      </div>

      <div className="divide-y divide-border/30">
        {visible.map((match) => (
          <div key={match.originalTerm} className="px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              {match.originalTerm}
            </p>
            <div className="flex flex-col gap-2">
              {match.products.map((product) => {
                const tier = TIER_LABELS[product.tier]
                return (
                  <a
                    key={product.id}
                    href={product.affiliate_url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-between gap-3 rounded-lg border border-border/30 bg-background/50 px-3 py-2 hover:border-accent/40 hover:bg-accent/5 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-card-foreground">
                          {product.brand}
                          {product.model && (
                            <span className="text-muted-foreground font-normal"> {product.model}</span>
                          )}
                        </span>
                        {product.price_display && (
                          <p className="text-xs text-muted-foreground">{product.price_display}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className={`text-[10px] ${tier.color}`}>
                        {tier.label}
                      </Badge>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {matches.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-5 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent flex items-center justify-center gap-1 border-t border-border/40 transition-colors"
        >
          {expanded ? (
            <><ChevronUp className="h-3 w-3" /> Show Less</>
          ) : (
            <><ChevronDown className="h-3 w-3" /> Show {matches.length - 3} More Tools</>
          )}
        </button>
      )}
    </div>
  )
}
