# AI Layer Migration: Package Changes & Env Vars

## package.json changes

### Remove (Genkit)
```
"genkit": "^1.28.0"
"@genkit-ai/google-genai": "^1.28.0"
```
```
devDependencies:
"genkit-cli": "^1.28.0"
```
Also remove the `"genkit:dev"` and `"genkit:watch"` scripts.

### Add (Vercel AI SDK)
```
npm install ai @ai-sdk/groq @ai-sdk/google
```

---

## New environment variables (.env.local)

```env
# Already exists — rename from GOOGLE_GENAI_API_KEY if needed
GOOGLE_GENAI_API_KEY=your_google_ai_studio_key

# New
GROQ_API_KEY=your_groq_api_key
```

Both keys must also be added as Vercel Environment Variables in your
project dashboard (Settings → Environment Variables).

---

## Import path changes in pages

| Old import | New import |
|---|---|
| `@/ai/flows/detect-inventory-item-flow` | `@/ai/flows/detect-inventory-item` |
| `@/ai/flows/enhance-image-flow` | `@/ai/flows/enhance-image` |
| `@/ai/flows/project-instruction-generator-flow` | `@/ai/flows/generate-project-instructions` |
| `@/ai/flows/step-clarification-ai` | `@/ai/flows/clarify-step` |

Function names are unchanged, so only the import paths need updating.

---

## Files to delete

```
src/ai/genkit.ts
src/ai/dev.ts
src/ai/flows/detect-inventory-item-flow.ts
src/ai/flows/enhance-image-flow.ts
src/ai/flows/project-instruction-generator-flow.ts
src/ai/flows/step-clarification-ai.ts
```

## Files to create

```
src/ai/providers.ts               ← Scout + Gemini instances + withFallback()
src/ai/index.ts                   ← Re-exports all flows
src/ai/flows/detect-inventory-item.ts
src/ai/flows/enhance-image.ts
src/ai/flows/generate-project-instructions.ts
src/ai/flows/clarify-step.ts
```

---

## DetectInventoryItemOutput schema change

The output schema gained two new fields. Update any UI code that reads
detection results:

```typescript
// New fields
confidence: 'high' | 'medium' | 'low'  // was absent
notes?: string                           // was absent

// Recommendation: filter low-confidence items in the inventory UI
// before auto-populating the add-item form:
const reliableItems = result.items.filter(i => i.confidence !== 'low');
```

The inventory page currently takes only the first item (`result.items[0]`).
Consider showing all detected items with checkboxes so users can bulk-add
from a single photo.
