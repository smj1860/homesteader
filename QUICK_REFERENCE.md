# Quick Reference: File Locations & Dependencies

## 📁 File Structure

```
homesteader-main/
├── src/
│   ├── lib/
│   │   ├── pdf-generator.ts ..................... ✨ NEW - HTML/PDF generation
│   │   ├── homestead-plan-generator.ts ......... ✨ NEW - Plan logic & data
│   │   └── zone-lookup.ts ...................... EXISTING - Used by questionnaire
│   │
│   ├── components/
│   │   ├── homesteading/ ........................ ✨ NEW FOLDER
│   │   │   ├── questionnaire.tsx ............... ✨ NEW - Questionnaire form
│   │   │   └── outputs.tsx ..................... ✨ NEW - Results display
│   │   │
│   │   ├── Navigation.tsx ....................... UPDATE - Add /homesteading link
│   │   └── ui/ ................................. EXISTING - Shadcn components
│   │
│   ├── app/
│   │   ├── actions/
│   │   │   ├── homesteading.ts ................. ✨ NEW - Server actions
│   │   │   └── newsletter.ts ................... EXISTING
│   │   │
│   │   ├── homesteading/ ........................ ✨ NEW FOLDER
│   │   │   ├── page.tsx ........................ ✨ NEW - Hub page
│   │   │   └── beginners/
│   │   │       └── page.tsx ................... ✨ NEW - Questionnaire page
│   │   │
│   │   ├── layout.tsx ........................... EXISTING
│   │   ├── page.tsx ............................ EXISTING
│   │   └── globals.css ......................... EXISTING
│   │
│   ├── supabase/ ............................... EXISTING
│   └── hooks/ .................................. EXISTING
│
├── public/ ..................................... EXISTING
│
├── SETUP_homestead_plans_table.sql ............ ✨ NEW - Database setup
├── BEGINNERS_IMPLEMENTATION_GUIDE.md ........ ✨ NEW - Setup instructions
├── BUILD_SUMMARY.md ........................... ✨ NEW - Overview
├── package.json ............................... EXISTING
└── tsconfig.json ............................. EXISTING
```

---

## 🔄 Data Flow Diagram

```
User visits /homesteading/beginners
           ↓
[HomesteadingQuestionnaire Component]
           ↓
    User fills form:
    - acreage (slider)
    - familySize (slider)
    - zipCode (text input)
    - wantsChickens (toggle)
           ↓
    [Zone auto-detected via getZoneFromZip()]
           ↓
    User clicks "Generate My Homestead Plan"
           ↓
[generateHomesteadPlan() function]
    - Gets crops for zone
    - Calculates yields
    - Generates soil mix
    - Creates coop recommendation
           ↓
[HomesteadPlanData object created]
           ↓
[HomesteadingOutputs Component]
    - Displays crops
    - Shows yields
    - Soil mix recipe
    - Coop info (if selected)
    - Next steps
           ↓
User can:
   • Download PDF → [generateHomesteadPlanHTML() + downloadPDFAsPrint()]
   • Save to account → [saveHomesteadPlan() server action → Supabase]
   • Start over → Returns to questionnaire
```

---

## 📦 Component Dependencies

### `HomesteadingQuestionnaire`
```
Imports:
  - @/components/ui/card, button, label, input, slider, switch, badge, alert
  - @/lib/zone-lookup (for getZoneFromZip)
  
Exports:
  - Component: HomesteadingQuestionnaire
  - Type: QuestionnaireData

Calls:
  → onComplete(QuestionnaireData)
```

### `HomesteadingOutputs`
```
Imports:
  - @/components/ui/* (card, button, badge, alert)
  - @/lib/pdf-generator (generateHomesteadPlanHTML, downloadPDFAsPrint)
  - @/app/actions/homesteading (saveHomesteadPlan)

Exports:
  - Component: HomesteadingOutputs

Props:
  - planData: HomesteadPlanData
  - userId?: string
  - onBack?: () => void
```

### `beginners/page.tsx`
```
Imports:
  - @/components/homesteading/questionnaire
  - @/components/homesteading/outputs
  - @/lib/homestead-plan-generator (generateHomesteadPlan)
  - @/supabase (useUser)

Handles:
  - State: step ('questionnaire' | 'results')
  - State: planData (HomesteadPlanData | null)
  - Calls generateHomesteadPlan() on questionnaire complete
  - Passes planData & userId to outputs
```

---

## 🗄️ Database Schema

### `homestead_plans` Table

```sql
id: UUID (PK)
user_id: UUID (FK → auth.users) [nullable]
acreage: DECIMAL(5,2)
family_size: INT
hardiness_zone: VARCHAR(10) — e.g., "Zone 5"
state: VARCHAR(2) — e.g., "NY"
wants_chickens: BOOLEAN
coop_size_recommendation: TEXT
soil_mix_recipe: JSONB
  {
    ratio: string,
    ingredients: [{name, ratio}],
    description: string
  }
vegetable_yield_targets: JSONB
  [{name, yield, notes}, ...]
recommended_crops: TEXT[] — ["Tomato", "Pepper", ...]
pdf_url: TEXT [nullable] — Future use
created_at: TIMESTAMP
updated_at: TIMESTAMP

Indexes:
  - idx_homestead_plans_user_id
  - idx_homestead_plans_created_at (DESC)

RLS Policies:
  - SELECT: WHERE auth.uid() = user_id
  - INSERT: WITH CHECK auth.uid() = user_id
  - UPDATE: USING auth.uid() = user_id
  - DELETE: USING auth.uid() = user_id
```

---

## 🔌 API Dependencies

### `getZoneFromZip(zipCode: string)`
Location: `src/lib/zone-lookup.ts` (EXISTING)

Returns: `Promise<{ zone_num: string; state: string } | null>`

Used by: Questionnaire component to auto-detect hardiness zone

---

### `saveHomesteadPlan(userId, planData, pdfUrl?)`
Location: `src/app/actions/homesteading.ts` (NEW)

Params:
- userId: string
- planData: HomesteadPlanData
- pdfUrl?: string (optional, for future cloud storage)

Returns: `Promise<{ success: boolean; planId: string; createdAt: string }>`

---

### `generateHomesteadPlan(...)`
Location: `src/lib/homestead-plan-generator.ts` (NEW)

Params:
- acreage: number
- familySize: number
- zone: string
- state: string
- wantsChickens: boolean

Returns: `HomesteadPlanData`

---

## 🎨 Styling

All components use:
- **Tailwind CSS** — Utility classes
- **Shadcn/ui** — Prebuilt components
- **Brand Colors** (in PDF generator):
  - Primary: `#264228`
  - Accent: `#A88032`
  - Background: `#F7F3EB`

No additional CSS files needed — all styles are inline Tailwind classes.

---

## 🚀 Route Summary

### New Routes Created:

| Route | Page | Purpose |
|-------|------|---------|
| `/homesteading` | `page.tsx` | Hub — all sections overview |
| `/homesteading/beginners` | `beginners/page.tsx` | Questionnaire & results |

### Navigation Links to Add:

In `Navigation.tsx`, add a link to `/homesteading`:
```tsx
<Link href="/homesteading">🌱 Homesteading Guides</Link>
```

Or on home page under key CTA buttons.

---

## ⚙️ Configuration

No environment variables needed for this build.

Future phases will need:
- `VERCEL_BLOB_API_TOKEN` (for PDF cloud storage)
- `AWS_S3_BUCKET` (alternative PDF storage)

---

## 🧪 Testing Checklist

- [ ] Questionnaire form validates correctly
- [ ] Zip code lookup returns correct zone & state
- [ ] Plan generates successfully
- [ ] PDF downloads from browser
- [ ] Plan saves to Supabase when user is logged in
- [ ] Expandable sections toggle correctly
- [ ] Mobile responsive design works
- [ ] All links work (back button, etc.)

---

## 📊 File Sizes (Rough Estimates)

| File | Size | Notes |
|------|------|-------|
| questionnaire.tsx | ~4 KB | Interactive form |
| outputs.tsx | ~8 KB | Results display |
| pdf-generator.ts | ~10 KB | HTML template + utilities |
| homestead-plan-generator.ts | ~6 KB | Logic & data |
| homesteading.ts (actions) | ~2 KB | Server functions |
| page.tsx (hub) | ~8 KB | Navigation page |
| beginners/page.tsx | ~3 KB | Questionnaire wrapper |

**Total new code: ~41 KB** (very lightweight)

---

## 🔒 Security Notes

✅ **RLS Enabled** — Users can only see their own plans  
✅ **Input Validation** — Questionnaire validates all inputs  
✅ **No API Keys Exposed** — All Supabase calls server-side  
✅ **Authentication Required** — Only logged-in users can save plans  
✅ **JSONB Storage** — Structured data in Supabase, no XSS risk  

---

## 📝 Environment Variables

**No new env vars needed** for core functionality.

Optional future additions:
- `NEXT_PUBLIC_PDF_DOWNLOAD_ENABLED` (feature flag)
- `SUPABASE_STORAGE_BUCKET` (for cloud PDF storage)

---

## 🚢 Deployment Notes

✅ **Vercel-Ready** — No special config needed  
✅ **Supabase-Ready** — Just run the SQL  
✅ **Next.js 15 Compatible** — Uses latest features  
✅ **Zero Breaking Changes** — Only adds new routes/components  

---

## 🎯 What's Missing (For Later Phases)

- Beginner Series articles (5-6 blog posts)
- Suburban Homesteading guides (5-6 detailed guides)
- Building plans (with mockup photos)
- Apothecary section (guides + possibly tincture sales)
- PDF cloud storage (Vercel Blob or S3)
- Email notifications (when plan is saved)
- Social sharing (generate shareable plan links)

---

**Ready to integrate?** Copy these files and run the Supabase SQL. You'll be live in under an hour!
