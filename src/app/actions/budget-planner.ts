// src/app/actions/budget-planner.ts
'use server'

import { createClient } from '@/supabase/ssr'
import { redirect } from 'next/navigation'
import { getZoneFromZip } from '@/lib/zone-lookup'
import {
  filterLandCrops,
  filterSpaceCrops,
  rankCrops,
  buildLandPlanPrompt,
  buildSpacePlanPrompt,
  callAI,
  parseAIResponse,
  parseZone,
} from '@/lib/budget-plan-generator'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LandPlanInput {
  sqFootage: number
  sunTiming: 'morning' | 'afternoon' | 'unknown'
  sunIntensity: 'full' | 'partial'
  zipCode: string
}

export interface SpacePlanInput {
  sqFootage: number
  ceilingHeight: number
  hasShelving: boolean
  shelfCount: number | null
}

// ─── Generate Land Plan ──────────────────────────────────────────────────────

export async function generateLandPlan(input: LandPlanInput) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Zone lookup
  const zoneString = await getZoneFromZip(input.zipCode) ?? '6'
  const zone = parseZone(zoneString)

  // Filter → rank → slice top crops
  const filtered = filterLandCrops(zone, input.sunIntensity)
  const ranked = rankCrops(filtered, true)
  const topCrops = ranked.slice(0, 15)

  // AI narrative
  const prompt = buildLandPlanPrompt(
    input.sqFootage,
    input.sunTiming,
    input.sunIntensity,
    zone,
    zoneString,
    topCrops
  )
  const aiText = await callAI(prompt)
  const aiPlan = parseAIResponse(aiText)

  // Build full plan output
  const planOutput = {
    zone: zoneString,
    zone_number: zone,
    recommended_crops: topCrops.map((crop, i) => ({
      name: crop.name,
      variety: crop.heirloom_variety,
      is_heirloom: crop.is_heirloom,
      is_vertical: crop.is_vertical,
      yield_rating: crop.yield_rating,
      category: crop.category,
      dual_use: crop.dual_use,
      seed_saving_difficulty: crop.seed_saving_difficulty,
      seed_saving_notes: crop.seed_saving_notes,
      planting_notes: crop.planting_notes,
      space_per_plant_sqft: crop.space_per_plant_sqft,
      easy_win: crop.easy_win,
      affiliate_placeholder: `[AFFILIATE: ${crop.name}${crop.heirloom_variety ? ` ${crop.heirloom_variety}` : ''} heirloom seeds]`,
    })),
    ai_plan: aiPlan,
    inputs_used: input,
    generated_at: new Date().toISOString(),
  }

  // Upsert — one land plan per user
  const { data: existing } = await supabase
    .from('budget_land_plans')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('budget_land_plans')
      .update({
        sq_footage: input.sqFootage,
        sun_timing: input.sunTiming,
        sun_intensity: input.sunIntensity,
        zip_code: input.zipCode,
        hardiness_zone: zoneString,
        plan_output: planOutput,
      })
      .eq('user_id', user.id)
    if (error) throw new Error(`Failed to update land plan: ${error.message}`)
  } else {
    const { error } = await supabase
      .from('budget_land_plans')
      .insert({
        user_id: user.id,
        sq_footage: input.sqFootage,
        sun_timing: input.sunTiming,
        sun_intensity: input.sunIntensity,
        zip_code: input.zipCode,
        hardiness_zone: zoneString,
        plan_output: planOutput,
      })
    if (error) throw new Error(`Failed to save land plan: ${error.message}`)
  }

  return { success: true, plan: planOutput }
}

// ─── Generate Space Plan ─────────────────────────────────────────────────────

export async function generateSpacePlan(input: SpacePlanInput) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Filter → rank → slice
  const filtered = filterSpaceCrops(input.ceilingHeight)
  const ranked = rankCrops(filtered, input.ceilingHeight >= 6)
  const topCrops = ranked.slice(0, 12)

  // AI narrative
  const prompt = buildSpacePlanPrompt(
    input.sqFootage,
    input.ceilingHeight,
    input.hasShelving,
    input.shelfCount,
    topCrops
  )
  const aiText = await callAI(prompt)
  const aiPlan = parseAIResponse(aiText)

  // Capacity estimates
  const containerCapacity = Math.floor(input.sqFootage / 2)
  const shelfCapacity = input.hasShelving && input.shelfCount
    ? input.shelfCount * 4
    : null

  const planOutput = {
    container_capacity: containerCapacity,
    shelf_capacity: shelfCapacity,
    vertical_viable: input.ceilingHeight >= 6,
    recommended_crops: topCrops.map(crop => ({
      name: crop.name,
      variety: crop.heirloom_variety,
      is_heirloom: crop.is_heirloom,
      container_size: crop.container_size,
      yield_rating: crop.yield_rating,
      category: crop.category,
      dual_use: crop.dual_use,
      seed_saving_difficulty: crop.seed_saving_difficulty,
      seed_saving_notes: crop.seed_saving_notes,
      planting_notes: crop.planting_notes,
      easy_win: crop.easy_win,
      affiliate_placeholder: `[AFFILIATE: ${crop.name} container growing kit]`,
    })),
    ai_plan: aiPlan,
    inputs_used: input,
    generated_at: new Date().toISOString(),
  }

  // Upsert — one space plan per user
  const { data: existing } = await supabase
    .from('budget_space_plans')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('budget_space_plans')
      .update({
        sq_footage: input.sqFootage,
        ceiling_height: input.ceilingHeight,
        has_shelving: input.hasShelving,
        shelf_count: input.shelfCount,
        plan_output: planOutput,
      })
      .eq('user_id', user.id)
    if (error) throw new Error(`Failed to update space plan: ${error.message}`)
  } else {
    const { error } = await supabase
      .from('budget_space_plans')
      .insert({
        user_id: user.id,
        sq_footage: input.sqFootage,
        ceiling_height: input.ceilingHeight,
        has_shelving: input.hasShelving,
        shelf_count: input.shelfCount,
        plan_output: planOutput,
      })
    if (error) throw new Error(`Failed to save space plan: ${error.message}`)
  }

  return { success: true, plan: planOutput }
}

// ─── Load Saved Plans ─────────────────────────────────────────────────────────

export async function getSavedBudgetPlans() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { landPlan: null, spacePlan: null }

  const [{ data: landPlan }, { data: spacePlan }] = await Promise.all([
    supabase
      .from('budget_land_plans')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle(),
    supabase
      .from('budget_space_plans')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle(),
  ])

  return { landPlan, spacePlan }
}
