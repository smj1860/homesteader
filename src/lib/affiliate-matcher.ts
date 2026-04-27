import { createClient } from '@/supabase/config'

export type AffiliateTier = 'budget' | 'mid' | 'premium'

export interface AffiliateProduct {
  id: string
  canonical_name: string
  brand: string
  model: string | null
  tier: AffiliateTier
  affiliate_url: string
  price_display: string | null
  image_url: string | null
  tool_type: string | null
}

export interface ToolMatch {
  originalTerm: string
  canonicalName: string
  products: AffiliateProduct[]
}

// ─── Cache so we don't hammer Supabase on every render ───────────────────────
let cachedProducts: AffiliateProduct[] | null = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function getAllProducts(): Promise<AffiliateProduct[]> {
  if (cachedProducts && Date.now() - cacheTime < CACHE_TTL) {
    return cachedProducts
  }
  const supabase = createClient()
  const { data, error } = await supabase
    .from('affiliate_products')
    .select('*')
    .eq('is_active', true)

  if (error || !data) return []
  cachedProducts = data
  cacheTime = Date.now()
  return data
}

// ─── Normalize text for matching ─────────────────────────────────────────────
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// ─── Score how well a term matches a product's keywords ──────────────────────
function matchScore(term: string, product: AffiliateProduct & { keywords?: string[] }): number {
  const normalizedTerm = normalize(term)
  const termWords = normalizedTerm.split(' ')

  let score = 0

  const canonicalWords = normalize(product.canonical_name).split(' ')
  const canonicalMatches = termWords.filter(w => canonicalWords.includes(w)).length
  score += canonicalMatches * 3

  for (const keyword of (product.keywords ?? [])) {
    const kw = normalize(keyword)
    if (normalizedTerm.includes(kw) || kw.includes(normalizedTerm)) {
      score += 2
    }
    const kwWords = kw.split(' ')
    const partialMatches = termWords.filter(w => kwWords.includes(w)).length
    score += partialMatches * 1
  }

  if (normalizedTerm.includes(normalize(product.brand))) {
    score += 4
  }

  if (product.model && normalizedTerm.includes(normalize(product.model))) {
    score += 5
  }

  return score
}

// ─── Main export: match a list of tool terms against the database ─────────────
export async function matchToolsToAffiliates(
  toolTerms: string[]
): Promise<ToolMatch[]> {
  const products = await getAllProducts()
  const results: ToolMatch[] = []

  for (const term of toolTerms) {
    const scored = products
      .map(p => ({ product: p, score: matchScore(term, p) }))
      .filter(({ score }) => score >= 2)
      .sort((a, b) => b.score - a.score)

    if (scored.length === 0) continue

    const topCanonical = scored[0].product.canonical_name
    const matchedProducts = scored
      .filter(({ product }) => product.canonical_name === topCanonical)
      .map(({ product }) => product)
      .sort((a, b) => {
        const order = { budget: 0, mid: 1, premium: 2 }
        return order[a.tier] - order[b.tier]
      })

    results.push({
      originalTerm: term,
      canonicalName: topCanonical,
      products: matchedProducts,
    })
  }

  return results
}

// ─── For tool review pages: find products by exact brand + model ──────────────
export async function findProductForReview(
  brand: string,
  model?: string
): Promise<AffiliateProduct[]> {
  const products = await getAllProducts()
  const normalizedBrand = normalize(brand)
  const normalizedModel = model ? normalize(model) : null

  return products.filter(p => {
    const brandMatch = normalize(p.brand) === normalizedBrand
    if (!brandMatch) return false
    if (normalizedModel && p.model) {
      return normalize(p.model).includes(normalizedModel)
    }
    return brandMatch
  })
}
