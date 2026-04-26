'use server';

import { createGroq } from '@ai-sdk/groq';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// ── Client instances ──────────────────────────────────────────────────────
const groqClient = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const googleClient = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// ── Model exports ─────────────────────────────────────────────────────────

/**
 * Primary model: Llama 4 Scout on Groq.
 * Handles both vision (inventory detection) and text (DIY guide generation).
 * 460+ t/s, $0.11/$0.34 per 1M tokens.
 */
export const scout = groqClient('meta-llama/llama-4-scout-17b-16e-instruct');

/**
 * Fallback model: Gemini 2.5 Flash-Lite on Google AI.
 * Drop-in replacement for Gemini 2.0 Flash at the same price point.
 * Used when Scout errors, times out, or produces a schema violation.
 *
 * NOTE: Verify the exact model ID in Google AI Studio if calls fail —
 * preview IDs (e.g. gemini-2.5-flash-lite-preview-06-17) rotate periodically.
 */
export const geminiFlashLite = googleClient('gemini-2.5-flash-lite');

/**
 * Image-editing model: only Gemini supports input-image → output-image.
 * Used exclusively by the enhance-image flow.
 * Llama 4 Scout is a vision *understanding* model and cannot generate images.
 */
export const geminiImageModel = googleClient('gemini-2.0-flash-exp');


// ── Fallback wrapper ──────────────────────────────────────────────────────

/**
 * Non-retryable errors — these indicate a problem with our request, not the
 * model. Falling back to Gemini won't fix them, so we re-throw immediately.
 */
const NON_RETRIABLE_CODES = new Set([
  'INVALID_ARGUMENT',  // Bad schema / request format
  'PERMISSION_DENIED', // API key problem
  'UNAUTHENTICATED',   // API key problem
]);

/**
 * Runs `primary()` (Scout) and, if it fails with a retriable error, runs
 * `fallback()` (Gemini Flash-Lite). Logs which path was taken.
 *
 * @param primary  Function that calls Scout
 * @param fallback Function that calls Gemini Flash-Lite
 * @param flowName Label for log messages (e.g. 'detect-inventory')
 */
export async function withFallback<T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T>,
  flowName: string,
): Promise<T> {
  try {
    const result = await primary();
    return result;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    const code    = (error as any)?.code ?? '';

    if (NON_RETRIABLE_CODES.has(code)) {
      console.error(`[AI:${flowName}] Non-retriable error, not falling back:`, message);
      throw error;
    }

    console.warn(`[AI:${flowName}] Scout failed (${message}), falling back to Gemini Flash-Lite`);

    return fallback();
  }
}
