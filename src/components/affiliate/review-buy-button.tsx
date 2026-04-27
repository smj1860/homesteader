'use client'

import { useEffect, useState } from 'react'
import { findProductForReview, AffiliateProduct, AffiliateTier } from '@/lib/affiliate-matcher'
import { ExternalLink, Tag } from 'lucide-react'

const TIER_CONFIG = {
  budget:  { label: 'Budget',  bg: 'bg-green-500',  text: 'text-white' },
  mid:     { label: 'Mid',     bg: 'bg-blue-500',   text: 'text-white' },
  premium: { label: 'Premium', bg: 'bg-amber-500',  text: 'text-white' },
}

interface Props {
  brand: string
  model?: string
  reviewTitle?: string
}

export function ReviewBuyButton({ brand, model, reviewTitle }: Props) {
  const [products, setProducts] = useState<AffiliateProduct[]>([])

  useEffect(() => {
    findProductForReview(brand, model).then(setProducts)
  }, [brand, model])

  if (products.length === 0) return null

  // Single exact match — prominent CTA button
  if (products.length === 1) {
    const p = products[0]
    return (
      <a
        href={p.affiliate_url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        <Tag className="h-4 w-4" />
        {p.price_display ? `Check Price — ${p.price_display}` : 'Check Price on Amazon'}
        <ExternalLink className="h-3.5 w-3.5 opacity-70" />
      </a>
    )
  }

  // Multiple tiers — show all options
  return (
    <div className="not-prose rounded-xl border border-border/40 bg-card p-4 my-4">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
        <Tag className="h-3 w-3" /> Shop {reviewTitle ?? brand}
      </p>
      <div className="flex flex-wrap gap-2">
        {products.map((p) => {
          const cfg = TIER_CONFIG[p.tier as AffiliateTier]
          return (
            <a
              key={p.id}
              href={p.affiliate_url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ${cfg.bg} ${cfg.text} hover:opacity-90 transition-opacity`}
            >
              {p.brand} {p.model ?? ''}
              {p.price_display && (
                <span className="opacity-80 text-xs">· {p.price_display}</span>
              )}
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          )
        })}
      </div>
    </div>
  )
}
