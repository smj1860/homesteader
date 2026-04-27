'use server';

import { generateObject } from 'ai';
import { z } from 'zod';
import { scout, geminiFlashLite, withFallback } from '@/ai/providers';

// ── Schemas ───────────────────────────────────────────────────────────────

export const StepClarificationInputSchema = z.object({
  projectContext: z
    .string()
    .optional()
    .describe('The overall goal of the project (e.g. "Installing a drip irrigation system for raised beds").'),
  currentStepInstructions: z
    .string()
    .describe('The full text of the step the user is asking about.'),
  userQuestion: z
    .string()
    .describe('The user\'s specific question or what they are stuck on.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "Optional photo of the user's actual situation as a data URI. " +
      "Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type StepClarificationInput = z.infer<typeof StepClarificationInputSchema>;

export const StepClarificationOutputSchema = z.object({
  clarification: z
    .string()
    .describe(
      'Direct answer to the user\'s question. 2–5 sentences for simple questions, ' +
      'up to a short paragraph for complex ones. Use plain language.'
    ),
  helpfulTips: z
    .array(z.string())
    .optional()
    .describe(
      'Optional 1–3 additional tips directly related to this specific step. ' +
      'Only include if they genuinely add value. Omit for simple clarifications.'
    ),
});
export type StepClarificationOutput = z.infer<typeof StepClarificationOutputSchema>;


// ── Prompt ────────────────────────────────────────────────────────────────

/**
 * PROMPT NOTES (what changed from the original and why):
 *
 * 1. PERSONA CONSISTENCY — the original used a generic "expert DIY assistant"
 *    persona that was inconsistent with the SteadCraft brand established in
 *    the project instruction generator. Users experience these as the same
 *    "SteadCraft" assistant, so the voice should match.
 *
 * 2. "EXPLAIN LIKE A TEENAGER" REMOVED — this was the biggest quality issue
 *    in the original. It produced condescending, over-simplified answers for
 *    users who just wanted a direct answer to a specific technical question.
 *    Replaced with calibrated guidance: start accessible, match the
 *    technicality of the user's own question.
 *
 * 3. LEGACY "Clarification:" SUFFIX REMOVED — ending a prompt with a
 *    completion cue is a GPT-3-era pattern. With chat models and structured
 *    output via generateObject, it adds nothing and can bias the response.
 *
 * 4. ANSWER STRUCTURE — original gave no guidance on length or format.
 *    The schema now specifies a range and the prompt reinforces "direct
 *    answer first, context second". This prevents the model from giving
 *    a 5-paragraph essay for "what size wrench do I need?"
 *
 * 5. IMAGE USAGE — original said "visually diagnose the issue". That's too
 *    vague. The new prompt tells the model to describe what it sees
 *    specifically (position, orientation, condition) before giving advice,
 *    and to reference the visible state explicitly so the user knows the
 *    model is actually using the image.
 *
 * 6. SCOPE ANCHORING — the original had no instruction to stay on-topic.
 *    Added explicit instruction to answer the question asked, not volunteer
 *    an entire re-explanation of the step.
 */
function buildClarificationPrompt(input: StepClarificationInput): string {
  const { projectContext, currentStepInstructions, userQuestion, photoDataUri } = input;

  const contextSection = projectContext?.trim()
    ? `PROJECT GOAL: ${projectContext}`
    : '';

  const imageSection = photoDataUri
    ? `The user has attached a photo of their actual situation.
Look at it carefully. Before answering, acknowledge what you can see (e.g. "I can see your pipe fitting is positioned at about a 45° angle..."). This confirms to the user that you're responding to their specific situation, not a generic version of the step.`
    : '';

  return `You are SteadCraft, a patient and knowledgeable homesteading expert helping a user through a DIY project step-by-step.

${contextSection}

CURRENT STEP:
"${currentStepInstructions}"

USER'S QUESTION:
"${userQuestion}"

${imageSection}

YOUR TASK:
Answer the user's specific question directly and concisely. Lead with the answer, then add context or reasoning if it helps.

Tone and language:
- Match the technical level of the user's question. If they use trade terms, use them back. If they don't, use plain language and explain any jargon you introduce.
- Do NOT re-explain the entire step unless that is specifically what they asked.
- Keep the main clarification to 2–5 sentences for simple questions. More complex questions can have up to a short paragraph.
- Helpful tips are optional — only include them if they directly reduce the chance of a mistake on this specific step.`;
}


// ── Flow ──────────────────────────────────────────────────────────────────

async function runClarification(
  input: StepClarificationInput,
  model: Parameters<typeof generateObject>[0]['model'],
): Promise<StepClarificationOutput> {
  const hasImage = Boolean(input.photoDataUri);

  const userContent: any[] = [
    { type: 'text', text: buildClarificationPrompt(input) },
  ];

  if (hasImage) {
    userContent.push({
      type: 'image',
      image: input.photoDataUri!,
    });
  }

  const { object } = await generateObject({
    model,
    schema: StepClarificationOutputSchema,
    messages: [
      {
        role: 'user',
        content: userContent,
      },
    ],
  });

  return object;
}

export async function clarifyProjectStep(
  input: StepClarificationInput,
): Promise<StepClarificationOutput> {
  return withFallback(
    () => runClarification(input, scout),
    () => runClarification(input, geminiFlashLite),
    'clarify-step',
  );
}
