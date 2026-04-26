'use server';

import { generateObject } from 'ai';
import { z } from 'zod';
import { scout, geminiFlashLite, withFallback } from '@/ai/providers';

// ── Schemas ───────────────────────────────────────────────────────────────

export const DetectInventoryItemInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "Photo of tools or supplies as a data URI. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectInventoryItemInput = z.infer<typeof DetectInventoryItemInputSchema>;

export const DetectInventoryItemOutputSchema = z.object({
  items: z.array(
    z.object({
      name: z.string().describe('Common name of the item (e.g. "Ball-peen hammer", "5-gallon bucket").'),
      category: z
        .enum([
          'Hand Tools',
          'Power Tools',
          'Fasteners & Hardware',
          'Plumbing',
          'Electrical',
          'Garden & Irrigation',
          'Seeds & Plants',
          'Canning & Preservation',
          'Livestock & Animal Care',
          'Building Materials',
          'Kitchen & Food Prep',
          'Safety & PPE',
          'Cleaning & Maintenance',
          'Supplies & Consumables',
          'Other',
        ])
        .describe('The homesteading category this item belongs to.'),
      quantity: z
        .string()
        .describe('Visible quantity or best estimate (e.g. "1", "3", "1 box", "partial roll").'),
      confidence: z
        .enum(['high', 'medium', 'low'])
        .describe(
          'How clearly identifiable this item is in the photo. ' +
          '"high" = unmistakable. "medium" = likely but partially obscured. ' +
          '"low" = best guess — user should verify.'
        ),
      notes: z
        .string()
        .optional()
        .describe(
          'Brand, model, or condition details if clearly visible ' +
          '(e.g. "DeWalt 20V", "appears worn", "sealed/unused"). Omit if nothing notable.'
        ),
    })
  ).describe('Items identified in the image, ordered from most to least confident.'),
});
export type DetectInventoryItemOutput = z.infer<typeof DetectInventoryItemOutputSchema>;


// ── Prompt ────────────────────────────────────────────────────────────────

/**
 * PROMPT NOTES (what changed from the original and why):
 *
 * 1. CONSERVATIVE IDENTIFICATION — original had no guidance on uncertainty.
 *    Models hallucinate plausible items. The new prompt explicitly tells the
 *    model to only list what it can clearly see, and to use the confidence
 *    field rather than omitting uncertain items.
 *
 * 2. EXPANDED CATEGORY TAXONOMY — original had 6 generic categories. The
 *    new schema has 15 homesteading-specific categories that map to how
 *    Rootstock's inventory page actually groups items.
 *
 * 3. CONFIDENCE FIELD — consumers (the inventory page) can now filter out
 *    low-confidence detections rather than adding garbage to the user's
 *    inventory silently.
 *
 * 4. BRAND/MODEL NOTES — original ignored visible branding. Knowing it's a
 *    "DeWalt 20V MAX" not just a "drill" is a real inventory improvement.
 *
 * 5. QUANTITY HANDLING — original didn't address bulk/partial items.
 *    The prompt now guides estimation of partial rolls, boxes, bags.
 *
 * 6. EXPLICIT EMPTY STATE — original would error if the model returned an
 *    empty array. The prompt now validates this is a valid response so the
 *    model doesn't invent items to fill the output.
 */
function buildDetectionPrompt(): string {
  return `You are a homesteading inventory specialist helping a farmer catalog their supplies and equipment from a photo.

TASK: Identify every distinct tool, supply, or material you can see in this image.

RULES:
- Only list items you can clearly or reasonably identify from the image.
- If an item is blurry, partially hidden, or ambiguous, still include it but set confidence to "low" so the user can verify.
- Do NOT invent items. If nothing is identifiable, return an empty items array.
- Order items from most to least confident.
- For quantity: count individual units, estimate bulk items (e.g. "~20 boards", "partial bag"), and use "Multiple" only when counting is impossible.
- For brand/model: include it in notes if a label or logo is legible. Never guess a brand.

CATEGORY GUIDANCE:
- Use "Hand Tools" for non-powered manual tools (hammers, wrenches, hand saws).
- Use "Power Tools" for anything with a motor or battery pack.
- Use "Fasteners & Hardware" for screws, bolts, hinges, brackets, nails, wire.
- Use "Supplies & Consumables" for tape, rope, twine, lubricants, adhesives, sandpaper.
- When uncertain between two categories, pick the more specific one.`;
}

// ── Flow ──────────────────────────────────────────────────────────────────

async function runDetection(
  input: DetectInventoryItemInput,
  model: Parameters<typeof generateObject>[0]['model'],
): Promise<DetectInventoryItemOutput> {
  const { object } = await generateObject({
    model,
    schema: DetectInventoryItemOutputSchema,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: buildDetectionPrompt() },
          {
            type: 'image',
            image: input.photoDataUri,
          },
        ],
      },
    ],
  });
  return object;
}

export async function detectInventoryItems(
  input: DetectInventoryItemInput,
): Promise<DetectInventoryItemOutput> {
  return withFallback(
    () => runDetection(input, scout),
    () => runDetection(input, geminiFlashLite),
    'detect-inventory',
  );
}
