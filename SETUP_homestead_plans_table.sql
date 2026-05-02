-- Create homestead_plans table
-- Run this in your Supabase SQL editor (Database → SQL)

CREATE TABLE homestead_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  acreage DECIMAL(5,2) NOT NULL,
  family_size INT NOT NULL,
  hardiness_zone VARCHAR(10),
  state VARCHAR(2),
  wants_chickens BOOLEAN NOT NULL DEFAULT false,
  coop_size_recommendation TEXT,
  soil_mix_recipe JSONB,
  vegetable_yield_targets JSONB,
  recommended_crops TEXT[],
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policy so users can only see their own plans
ALTER TABLE homestead_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own homestead plans"
  ON homestead_plans
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own homestead plans"
  ON homestead_plans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own homestead plans"
  ON homestead_plans
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own homestead plans"
  ON homestead_plans
  FOR DELETE
  USING (auth.uid() = user_id);

-- Index for fast lookups by user
CREATE INDEX idx_homestead_plans_user_id ON homestead_plans(user_id);
CREATE INDEX idx_homestead_plans_created_at ON homestead_plans(created_at DESC);
