# Quick Reference: Updated Files (Build 2)

## Files Modified (4)

### 1. `src/components/homesteading/questionnaire.tsx`

**Changes:**
- Line 10: `acreage` state changed from `number` to `string`
- Added `acreageError` state for validation
- Removed `<Slider>` component (lines 40-63)
- Added `<Input type="number">` component
- Updated validation in `handleSubmit()` to check numeric value
- Updated `isValid` check to include acreage validation

**What User Sees:** Text input instead of slider for acreage

---

### 2. `src/lib/homestead-plan-generator.ts`

**Changes:**
- Completely replaced `CROPS_BY_ZONE` object (lines 7-16)
  - Changed from `Record<string, string[]>` to `Record<string, Array<{name, caloriesPerPound, yearsToProduction}>>`
  - Added caloric values for each crop
  - Added 8 zones (3-10) with crop lists
  
- Replaced `getRecommendedCrops()` function (lines 193-200)
  - Now sorts crops by calories (highest first)
  - Returns top 5 instead of top 3
  - Returns string array of crop names

- Updated `generateSoilMix()` function (lines 138-171)
  - Changed ratio from "2-2-4" to "4-3-2-1"
  - Updated ingredients with new formula:
    - 4 parts: Miracle-Gro base
    - 3 parts: Sta-Green soil conditioner
    - 2 parts: 50/50 manure + mushroom compost
    - 1 part: Vigoro perlite
  - Added detailed description with roles for each component

**What User Sees:** 5 crops by caloric value + your proprietary soil mix recipe

---

### 3. `src/components/homesteading/outputs.tsx`

**Changes:**
- Updated interface to add `onNeedAuth?: () => void` prop
- Updated initial `expandedSections` state: Only opens crops by default if not logged in
- Updated `toggleSection()` to check auth before allowing soil/chickens sections to expand
  - Calls `onNeedAuth()` if user tries to access locked sections
- Updated `handleDownloadPDF()` to require auth
  - Calls `onNeedAuth()` if user not logged in
- Added auth requirement message at top of results (after line 81)
  - Shows blue alert if not logged in
  - Includes "Sign up now" button that calls `onNeedAuth()`
- Updated soil mix `<Card>` to show opacity-60 + "Premium" badge if not logged in
  - Shows preview message: "Sign in to unlock your customized soil mix recipe"
- Updated chickens `<Card>` to show opacity-60 + "Premium" badge if not logged in
  - Shows preview message: "Sign in to unlock your customized coop recommendations"

**What User Sees:** 
- Locked sections with "Premium" badges
- Blue alert encouraging signup
- Locked content appears faded
- Clicking locked sections shows signup prompt

---

### 4. `src/app/homesteading/beginners/page.tsx`

**Changes:**
- Added `Button` import from UI components
- Added `showAuthModal` state (line 18)
- Added `handleNeedAuth()` function that sets modal to true
- Updated `HomesteadingOutputs` component call to include `onNeedAuth={handleNeedAuth}`
- Added full modal component before closing `</main>` tag:
  - Fixed overlay (dark background with z-index: 50)
  - Card with 3 benefits listed
  - "Create Free Account" button → `/auth/signup?offer=free-trial`
  - "Already have account?" button → `/auth/login`
  - "Continue without signing in" button → closes modal
  - Info text about no credit card required + trial offer

**What User Sees:** Beautiful modal when they try to access locked content

---

## Data Types Updated

### Crop Type (Before → After)

```typescript
// Before
Record<string, string[]>
// Example: 'Zone 5': ['Tomatoes', 'Peppers', ...]

// After
Record<string, Array<{name: string; caloriesPerPound: number; yearsToProduction: number}>>
// Example: 'Zone 5': [{name: 'Beans', caloriesPerPound: 320, ...}, ...]
```

---

## User Flow Changes

### Before (All Public)
```
Questionnaire → Results (all visible)
  - Crops ✓
  - Yields ✓  
  - Soil ✓
  - Coop ✓
  - PDF ✓
```

### After (Freemium)
```
Questionnaire → Results (partial)
  - Crops ✓ (always visible)
  - Yields ✓ (always visible)
  - Soil 🔒 (premium, locked)
  - Coop 🔒 (premium, locked)
  - PDF 🔒 (premium, locked)
  - Try to access → Signup Modal
```

---

## Configuration URLs

When user clicks "Create Free Account":
- **Destination:** `/auth/signup?offer=free-trial`
- **Parameter:** `offer=free-trial` (allows your auth page to default trial option)

When user clicks "Log in":
- **Destination:** `/auth/login`

---

## Testing Scenarios

**Scenario 1: Anonymous User**
1. Take questionnaire (acreage as text input)
2. See results with crops + yields
3. Soil mix shows "Premium" badge, faded
4. Click soil mix → auth modal appears
5. Click "Create Free Account" → redirects to signup
6. After signup → returns to results with all content unlocked

**Scenario 2: Logged-in User**
1. Take questionnaire 
2. See all results immediately unlocked
3. Download PDF directly
4. Save plan to account

**Scenario 3: Edge Cases**
- Enter acreage "abc" → validation error
- Enter acreage "0" → validation error  
- Enter acreage "0.5" → accepted ✓
- Enter acreage "50" → accepted ✓
- Leave acreage blank → validation error

---

## Breaking Changes

**None!** All changes are additive or improvements:
- Text input is backward compatible (accepts same numeric values)
- Soil mix is a new formula (old data not used)
- Crops are now 5 instead of 3 (better recommendations)
- Auth gates don't break existing logged-in users

---

## Ready to Deploy ✅

All 4 modified files are in `/home/claude/homesteader-main/`:
1. Copy them to your project at the paths shown
2. No migrations needed
3. No env vars to update
4. Works immediately

**Deployment time:** < 15 minutes
