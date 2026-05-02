# 🌱 SteadCraft Beginners Intro to Homesteading — Implementation Guide

This guide walks you through integrating the complete questionnaire, plan generation, and results system into your SteadCraft codebase.

---

## 📋 What Was Built

### **1. New Files Created**

#### **Database Setup**
- `SETUP_homestead_plans_table.sql` — SQL to create the `homestead_plans` table in Supabase

#### **Utilities & Logic**
- `src/lib/pdf-generator.ts` — HTML/PDF generation for printable plans
- `src/lib/homestead-plan-generator.ts` — Logic to generate personalized plan data from questionnaire inputs
- `src/app/actions/homesteading.ts` — Server actions to save/fetch/delete plans

#### **Components**
- `src/components/homesteading/questionnaire.tsx` — Interactive questionnaire form
- `src/components/homesteading/outputs.tsx` — Results display with expandable sections

#### **Pages**
- `src/app/homesteading/page.tsx` — Main homesteading hub (navigation to all sections)
- `src/app/homesteading/beginners/page.tsx` — Beginners Intro page with questionnaire flow

---

## 🚀 Implementation Steps

### **Step 1: Create the Supabase Table**

1. Go to your Supabase dashboard → **SQL Editor**
2. Create a new query and paste the contents of `SETUP_homestead_plans_table.sql`
3. Run the query
4. Verify the table exists and RLS policies are in place

**Expected result**: A new `homestead_plans` table with proper indexes and row-level security.

---

### **Step 2: Add Files to Your Project**

Copy these files into your project at the paths shown:

```
src/
├── lib/
│   ├── pdf-generator.ts (NEW)
│   └── homestead-plan-generator.ts (NEW)
├── components/
│   └── homesteading/ (NEW FOLDER)
│       ├── questionnaire.tsx
│       └── outputs.tsx
├── app/
│   ├── actions/
│   │   └── homesteading.ts (NEW)
│   └── homesteading/ (NEW FOLDER)
│       ├── page.tsx (main hub)
│       └── beginners/
│           └── page.tsx (questionnaire)
```

---

### **Step 3: Update Navigation**

Add a link to the homesteading section in your main navigation. Update `src/components/Navigation.tsx`:

```typescript
// In your Navigation menu, add:
<Link href="/homesteading" className="...">
  🌱 Homesteading Guides
</Link>
```

**Or** just in the hero/home page under key links.

---

### **Step 4: Test the Flow**

1. Navigate to `/homesteading` → You should see the hub page
2. Click "Start the Quiz" → Goes to `/homesteading/beginners`
3. Fill in the questionnaire:
   - Acreage slider
   - Family size slider
   - 5-digit zip code
   - Toggle for chickens
4. Click "Generate My Homestead Plan"
5. See personalized outputs with expandable sections
6. Download PDF (if you want to test)
7. Save to account (if logged in—will save to `homestead_plans` table)

---

## 🎨 Customization Notes

### **Brand Colors**
The PDF generator uses your brand colors:
- Primary: `#264228` (forest green)
- Accent: `#A88032` (warm gold)
- Background: `#F7F3EB` (parchment)

If you change these, update `src/lib/pdf-generator.ts` line ~67-71.

### **Recommended Crops by Zone**
The zones are hardcoded in `src/lib/homestead-plan-generator.ts`. You can expand or tweak these lists based on regional feedback.

### **Soil Mix Recipe**
Currently set to a 2-2-4 ratio (customizable in `src/lib/homestead-plan-generator.ts`). Adjust based on your preferences.

### **Yield Calculations**
Yields are estimated based on acreage and family size. See `calculateYieldTargets()` in `src/lib/homestead-plan-generator.ts` for the logic.

---

## 📊 Database Schema

### `homestead_plans` Table

```sql
id (UUID) — Primary key
user_id (UUID) — References auth.users, nullable for anonymous plans
acreage (DECIMAL) — Lot size in acres
family_size (INT) — Number of family members
hardiness_zone (VARCHAR) — e.g., "Zone 5"
state (VARCHAR) — 2-letter state code
wants_chickens (BOOLEAN) — Whether they're interested in raising chickens
coop_size_recommendation (TEXT) — Generated recommendation text
soil_mix_recipe (JSONB) — Full recipe with ingredients & ratios
vegetable_yield_targets (JSONB) — Array of yield estimates
recommended_crops (TEXT[]) — Array of crop names
pdf_url (TEXT) — Future: URL to stored PDF if you implement cloud storage
created_at (TIMESTAMP) — Auto-set
updated_at (TIMESTAMP) — Auto-set
```

---

## 🔧 Future Enhancements

### **Phase 2 Features** (not built yet, but designed for)

1. **PDF Cloud Storage**
   - Currently, PDFs download via browser print dialog
   - Next phase: Upload to Vercel Blob Storage or S3, save URL to `pdf_url`
   - Allow re-download from account

2. **Beginner Series Integration**
   - Links from outputs → "Learn More" → Beginner Series articles
   - Articles you'll write as separate content pieces

3. **Suburban Homesteading Guides**
   - 5-6 detailed guides (garden, composting, rainwater, cleaning, preservation)
   - Affiliate tool matching integrated
   - Cross-referenced from beginners intro

4. **Building Plans**
   - Curated plans generated from your AI system
   - Mockup photos required
   - Downloadable PDFs with tool lists & materials

5. **Apothecary Section**
   - Guides on medicinal herbs, tinctures, natural remedies
   - No sales component (informational only, for now)

---

## 🐛 Troubleshooting

### **Zip Code Lookup Not Working**
- Ensure `getZoneFromZip()` is working in `src/lib/zone-lookup.ts`
- This function should return zone number and state from a 5-digit zip code
- If it fails, the questionnaire won't let users submit

### **PDF Not Downloading**
- The PDF is generated as HTML and triggers browser print dialog
- Works in Chrome, Firefox, Safari. Edge may behave differently.
- Future: implement proper PDF library (jsPDF, etc.) if print dialog is problematic

### **Plan Not Saving to Account**
- Verify user is logged in (check `user` object)
- Check Supabase RLS policies allow insert for the user
- Check browser console for error messages
- Verify `homestead_plans` table exists and is accessible

### **Styles Look Wrong**
- Ensure Tailwind CSS is processing new component files
- New components use Shadcn/ui + Tailwind
- If colors aren't right, check that your Tailwind config includes all Shadcn/ui utilities

---

## 📝 Files Provided

You have these files ready to copy into your project:

1. ✅ `SETUP_homestead_plans_table.sql` — Database setup
2. ✅ `src/lib/pdf-generator.ts` — PDF generation
3. ✅ `src/lib/homestead-plan-generator.ts` — Plan logic
4. ✅ `src/app/actions/homesteading.ts` — Server actions
5. ✅ `src/components/homesteading/questionnaire.tsx` — Form component
6. ✅ `src/components/homesteading/outputs.tsx` — Results component
7. ✅ `src/app/homesteading/page.tsx` — Hub page
8. ✅ `src/app/homesteading/beginners/page.tsx` — Questionnaire page

---

## 🎯 Next Steps After Setup

1. **Test the full flow** end-to-end
2. **Verify Supabase integration** — Check that plans save correctly
3. **Write the Beginner Series articles** (5-6 foundational pieces)
4. **Build the Suburban Homesteading section** (content guides + affiliate tools)
5. **Create the Building Plans section** (with mockup photos)

---

## 📞 Questions or Issues?

If something isn't working:
1. Check the browser console for errors
2. Check Supabase logs for database issues
3. Verify all files are in the correct paths
4. Ensure Tailwind is processing the new CSS classes

---

**Ready to ship!** 🚀
