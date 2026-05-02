'use server'

import { createClient } from '@/supabase/config'
import { HomesteadPlanData } from '@/lib/pdf-generator'

export async function saveHomesteadPlan(
  userId: string,
  planData: HomesteadPlanData,
  pdfUrl?: string
) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('homestead_plans')
      .insert({
        user_id: userId,
        acreage: planData.acreage,
        family_size: planData.familySize,
        hardiness_zone: planData.zone,
        state: planData.state,
        wants_chickens: planData.wantsChickens,
        coop_size_recommendation: planData.coopRecommendation,
        soil_mix_recipe: planData.soilMix,
        vegetable_yield_targets: planData.vegetableYields,
        recommended_crops: planData.recommendedCrops,
        pdf_url: pdfUrl || null,
      })
      .select('id, created_at')
      .single()

    if (error) {
      console.error('Error saving homestead plan:', error)
      throw new Error(error.message)
    }

    return { success: true, planId: data.id, createdAt: data.created_at }
  } catch (err) {
    console.error('Failed to save homestead plan:', err)
    throw err
  }
}

export async function getHomesteadPlans(userId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('homestead_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching homestead plans:', error)
      throw new Error(error.message)
    }

    return data || []
  } catch (err) {
    console.error('Failed to fetch homestead plans:', err)
    throw err
  }
}

export async function deleteHomesteadPlan(planId: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('homestead_plans')
      .delete()
      .eq('id', planId)

    if (error) {
      throw new Error(error.message)
    }

    return { success: true }
  } catch (err) {
    console.error('Failed to delete homestead plan:', err)
    throw err
  }
}
