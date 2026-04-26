'use server';

/**
 * IMPORTANT — WHY THIS FLOW DOES NOT USE SCOUT:
 *
 * Image enhancement requires a model that can both *receive* an image and
 * *output* an image. Llama 4 Scout is a vision understanding model — it can
 * analyse images and produce text, but it cannot generate or edit images.
 * This flow must use a Gemini model with responseModalities: ['IMAGE'].
 *
 * There is no fallback path here. If Gemini fails, we throw and let the
 * caller handle it gracefully (e.g. skip enhancement and use the original).
 */

import { z } from 'zod';

export const EnhancePhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe("Original photo as a data URI. Format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type EnhancePhotoInput = z.infer<typeof EnhancePhotoInputSchema>;

export const EnhancePhotoOutputSchema = z.object({
  enhancedPhotoDataUri: z.string().describe('Enhanced photo as a data URI.'),
});
export type EnhancePhotoOutput = z.infer<typeof EnhancePhotoOutputSchema>;


// ── Prompt ────────────────────────────────────────────────────────────────

/**
 * PROMPT NOTES (what changed from the original and why):
 *
 * 1. CONTENT PRESERVATION — original had no instruction to preserve the
 *    scene content. Without this, Gemini may "improve" the image by
 *    replacing a muddy tool with an AI-generated clean studio prop.
 *
 * 2. ARTIFACT AVOIDANCE — explicitly tells the model to avoid over-
 *    sharpening and HDR halos, which are the most common failure modes
 *    of AI image enhancement prompts.
 *
 * 3. PHOTO CONTEXT — telling the model it's a homestead/farm photo
 *    prevents it from applying office or portrait enhancement presets.
 *    "Earthy tones" and "authentic imperfections" are intentional.
 */
function buildEnhancePrompt(): string {
  return `Enhance this homestead or farm photograph for use in a project build log.

Apply these adjustments:
- Improve exposure and lift shadows so dark areas are clearly visible.
- Increase micro-contrast and local sharpness so tools, materials, and textures read crisply.
- Warm the colour temperature slightly to reinforce the natural, earthy aesthetic.
- Gently boost saturation, keeping colours realistic (no HDR oversaturation).

Hard constraints — do NOT:
- Change, replace, add, or remove any objects, people, or structural elements.
- Apply AI hallucinated backgrounds or scenes.
- Over-sharpen to the point of halos or noise amplification.
- Make the image look like a stock photo or studio shot — authentic imperfections are desirable.

Output the enhanced image only. No captions or text overlays.`;
}


// ── Flow ──────────────────────────────────────────────────────────────────

export async function enhancePhoto(input: EnhancePhotoInput): Promise<EnhancePhotoOutput> {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_GENAI_API_KEY is not configured.');

  // Extract the base64 data and MIME type from the data URI
  const match = input.photoDataUri.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid photoDataUri format.');
  const [, mimeType, base64Data] = match;

  // Call Gemini directly via REST for image→image generation.
  // The Vercel AI SDK's generateText/generateObject routes don't yet expose
  // responseModalities for image output — use the raw API until support lands.
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inline_data: { mime_type: mimeType, data: base64Data },
              },
              { text: buildEnhancePrompt() },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
        },
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Gemini image API error ${response.status}: ${body}`);
  }

  const data = await response.json();

  // Find the image part in the response
  const parts: any[] = data?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p: any) => p.inline_data?.mime_type?.startsWith('image/'));

  if (!imagePart) {
    throw new Error('Gemini did not return an image in the response.');
  }

  const { mime_type, data: imageData } = imagePart.inline_data;
  return {
    enhancedPhotoDataUri: `data:${mime_type};base64,${imageData}`,
  };
}
